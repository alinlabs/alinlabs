import fs from 'node:fs';
import path from 'node:path';
import {
  PROJECT_ROOT,
  ROOT_ECOSYSTEM_FILES,
  PUBLIC_ECOSYSTEM_FILES,
  walkProjectFiles,
  isCodeFile,
  extractAstReferences,
  resolveModulePath,
} from './lib/project-utils.mjs';

const files = walkProjectFiles();
const fileSet = new Set(files);

const errors = [];
const warnings = [];

const KEBAB_SEGMENT_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*(?:\.[a-z0-9]+)*$/;

// 1. Naming convention check on src/ and public/gambar, public/icon, public/lottie
for (const file of files) {
  if (ROOT_ECOSYSTEM_FILES.has(file) || PUBLIC_ECOSYSTEM_FILES.has(file) || file === 'bun.lock') {
    continue;
  }

  const segments = file.split('/');
  for (const seg of segments) {
    if (!KEBAB_SEGMENT_RE.test(seg)) {
      errors.push(`Naming violation (not lowercase kebab-case): ${file} (segment: ${seg})`);
      break;
    }
  }
}

// 2. Source code must live inside src/ (except vite.config.ts and public ecosystem files like public/sw.js)
for (const file of files) {
  if (
    /\.(tsx?|jsx?|css)$/.test(file) &&
    file !== 'vite.config.ts' &&
    !PUBLIC_ECOSYSTEM_FILES.has(file) &&
    !file.startsWith('src/')
  ) {
    errors.push(`Source file outside src/: ${file}`);
  }
}

// 3. Case-insensitive duplicate check
const lowerSet = new Map();
for (const file of files) {
  const lower = file.toLowerCase();
  if (lowerSet.has(lower)) {
    errors.push(`Case-insensitive duplicate: ${lowerSet.get(lower)} vs ${file}`);
  } else {
    lowerSet.set(lower, file);
  }
}

// 4. AST module & public asset reference validation
let checkedRefs = 0;
for (const file of files) {
  if (!isCodeFile(file) || file === 'vite.config.ts') continue;
  const content = fs.readFileSync(path.join(PROJECT_ROOT, file), 'utf8');
  const refs = extractAstReferences(file, content);

  for (const ref of refs) {
    checkedRefs++;
    if (ref.kind === 'public-asset-path') {
      const publicPath = `public${ref.specifier}`;
      if (!fileSet.has(publicPath)) {
        errors.push(`Missing public asset "${ref.specifier}" referenced in ${file}`);
      }
    } else if (ref.specifier.startsWith('.') || ref.specifier.startsWith('@/')) {
      const resolved = resolveModulePath(file, ref.specifier, fileSet, 'src');
      if (!resolved) {
        errors.push(`Broken import "${ref.specifier}" in ${file}`);
      }
    }
  }
}

// 5. Check index.html entry points
const indexHtml = fs.readFileSync(path.join(PROJECT_ROOT, 'index.html'), 'utf8');
if (!indexHtml.includes('src="/src/main.tsx"') || !fileSet.has('src/main.tsx')) {
  errors.push('index.html does not point to existing /src/main.tsx');
}
if (!indexHtml.includes('href="/src/styles/index.css"') || !fileSet.has('src/styles/index.css')) {
  errors.push('index.html does not point to existing /src/styles/index.css');
}

// 6. Check file integrity against rename-map.json (excluding intentionally removed legacy files)
const INTENTIONALLY_REMOVED = new Set([
  'bun.lock',
  'src/pages/layanan/paket/package-detail.tsx',
]);
const mapPath = path.join(PROJECT_ROOT, 'scripts', 'rename-map.json');
if (fs.existsSync(mapPath)) {
  const mapData = JSON.parse(fs.readFileSync(mapPath, 'utf8'));
  const expectedFiles = new Set(
    mapData.mappings.map((m) => m.newPath).filter((p) => !INTENTIONALLY_REMOVED.has(p))
  );
  for (const expected of expectedFiles) {
    if (!fileSet.has(expected)) {
      errors.push(`Expected file missing after refactor: ${expected}`);
    }
  }
}

console.log('=== PHASE 5: POST-REFACTOR VALIDATION ===');
console.log(`Files validated      : ${files.length}`);
console.log(`AST refs validated   : ${checkedRefs}`);
console.log(`Errors               : ${errors.length}`);
console.log(`Warnings             : ${warnings.length}`);

if (warnings.length > 0) {
  console.log('Warnings:\n  - ' + warnings.join('\n  - '));
}

if (errors.length > 0) {
  console.error('Validation FAILED:\n  - ' + errors.join('\n  - '));
  process.exit(1);
}

console.log('ALL FILESYSTEM, NAMING, AST IMPORT, AND ASSET CHECKS PASSED.');
