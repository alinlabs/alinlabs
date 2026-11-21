import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

export const PROJECT_ROOT = process.cwd();

export const EXCLUDED_DIRS = new Set([
  'node_modules',
  '.git',
  'dist',
  'build',
  '.playwright-cli',
  '.tmp-refactor-backup',
  'scripts',
]);

export const ROOT_ECOSYSTEM_FILES = new Set([
  'package.json',
  'package-lock.json',
  'tsconfig.json',
  'vite.config.ts',
  'index.html',
  'metadata.json',
  'vercel.json',
  '.gitignore',
  '.env',
  '.env.example',
  'README.md',
]);

export const PUBLIC_ECOSYSTEM_FILES = new Set([
  'public/CNAME',
  'public/ads.txt',
  'public/robots.txt',
  'public/sitemap.xml',
  'public/manifest.json',
  'public/sw.js',
  'public/emailjs.html',
]);

export function toPosix(p) {
  return p.split(path.sep).join('/');
}

export function toKebabCase(name) {
  return name
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .replace(/([a-zA-Z])([0-9]+)/g, '$1-$2')
    .replace(/[_\s]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
}

export function walkProjectFiles(dir = PROJECT_ROOT, results = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relPath = toPosix(path.relative(PROJECT_ROOT, fullPath));

    if (entry.isDirectory()) {
      if (EXCLUDED_DIRS.has(entry.name) || entry.name.startsWith('.')) continue;
      walkProjectFiles(fullPath, results);
    } else {
      results.push(relPath);
    }
  }
  return results.sort();
}

export function isCodeFile(relPath) {
  return /\.(tsx?|jsx?|mjs|cjs)$/.test(relPath);
}

export function extractAstReferences(relPath, content) {
  const scriptKind = relPath.endsWith('.tsx')
    ? ts.ScriptKind.TSX
    : relPath.endsWith('.ts')
      ? ts.ScriptKind.TS
      : relPath.endsWith('.jsx')
        ? ts.ScriptKind.JSX
        : ts.ScriptKind.JS;

  const sourceFile = ts.createSourceFile(
    relPath,
    content,
    ts.ScriptTarget.Latest,
    true,
    scriptKind
  );

  const refs = [];

  function recordLiteral(literalNode, kind) {
    if (!literalNode || !ts.isStringLiteral(literalNode)) return;
    refs.push({
      kind,
      specifier: literalNode.text,
      start: literalNode.getStart(sourceFile) + 1,
      end: literalNode.getEnd() - 1,
    });
  }

  function visit(node) {
    if (ts.isImportDeclaration(node) && node.moduleSpecifier) {
      recordLiteral(node.moduleSpecifier, 'static-import');
    } else if (ts.isExportDeclaration(node) && node.moduleSpecifier) {
      recordLiteral(node.moduleSpecifier, 'export-from');
    } else if (
      ts.isImportTypeNode(node) &&
      ts.isLiteralTypeNode(node.argument) &&
      ts.isStringLiteral(node.argument.literal)
    ) {
      recordLiteral(node.argument.literal, 'type-import');
    } else if (
      ts.isCallExpression(node) &&
      node.expression.kind === ts.SyntaxKind.ImportKeyword &&
      node.arguments.length > 0 &&
      ts.isStringLiteral(node.arguments[0])
    ) {
      recordLiteral(node.arguments[0], 'dynamic-import');
    } else if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
      const text = node.text;
      if (
        text.startsWith('/lottie/') ||
        text.startsWith('/data/') ||
        text.startsWith('/gambar/') ||
        text.startsWith('/icon/')
      ) {
        refs.push({
          kind: 'public-asset-path',
          specifier: text,
          start: node.getStart(sourceFile) + 1,
          end: node.getEnd() - 1,
        });
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return refs;
}

export function resolveModulePath(importerRelPath, specifier, existingFileSet, aliasRoot = '') {
  if (!specifier.startsWith('.') && !specifier.startsWith('@/')) {
    return null;
  }

  const baseDir = path.posix.dirname(importerRelPath);
  let candidateBase;

  if (specifier.startsWith('@/')) {
    const sub = specifier.slice(2);
    candidateBase = aliasRoot ? path.posix.join(aliasRoot, sub) : sub;
  } else {
    candidateBase = path.posix.normalize(path.posix.join(baseDir, specifier));
  }

  const tryCandidates = [
    candidateBase,
    `${candidateBase}.ts`,
    `${candidateBase}.tsx`,
    `${candidateBase}.js`,
    `${candidateBase}.jsx`,
    `${candidateBase}.json`,
    `${candidateBase}.css`,
    path.posix.join(candidateBase, 'index.ts'),
    path.posix.join(candidateBase, 'index.tsx'),
    path.posix.join(candidateBase, 'index.js'),
    path.posix.join(candidateBase, 'index.jsx'),
  ];

  for (const candidate of tryCandidates) {
    const normalized = path.posix.normalize(candidate);
    if (existingFileSet.has(normalized)) {
      return normalized;
    }
  }
  return null;
}

export function formatImportSpecifier(fromRelPath, toRelPath) {
  const fromDir = path.posix.dirname(fromRelPath);
  let rel = path.posix.relative(fromDir, toRelPath);
  if (!rel.startsWith('.')) {
    rel = `./${rel}`;
  }

  if (/\.(tsx?|jsx?)$/.test(rel)) {
    rel = rel.replace(/\.(tsx?|jsx?)$/, '');
    if (rel.endsWith('/index')) {
      rel = rel.slice(0, -'/index'.length) || '.';
    }
  }
  return rel;
}
