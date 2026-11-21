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

const audit = {
  generatedAt: new Date().toISOString(),
  totalFiles: files.length,
  categories: {
    rootConfig: [],
    publicStatic: [],
    publicLottie: [],
    publicData: [],
    sourceCode: [],
    other: [],
  },
  dependencies: [],
  brokenBeforeRefactor: [],
};

for (const file of files) {
  if (ROOT_ECOSYSTEM_FILES.has(file)) {
    audit.categories.rootConfig.push(file);
  } else if (file.startsWith('public/lottie/')) {
    audit.categories.publicLottie.push(file);
  } else if (file.startsWith('public/data/') || file.startsWith('src/data/')) {
    audit.categories.publicData.push(file);
  } else if (file.startsWith('public/') || PUBLIC_ECOSYSTEM_FILES.has(file)) {
    audit.categories.publicStatic.push(file);
  } else if (/\.(tsx?|jsx?|css)$/.test(file)) {
    audit.categories.sourceCode.push(file);
  } else {
    audit.categories.other.push(file);
  }

  if (isCodeFile(file)) {
    const content = fs.readFileSync(path.join(PROJECT_ROOT, file), 'utf8');
    const refs = extractAstReferences(file, content);
    for (const ref of refs) {
      if (ref.kind === 'public-asset-path') {
        const publicFile = `public${ref.specifier}`;
        const exists = fileSet.has(publicFile);
        audit.dependencies.push({
          from: file,
          kind: ref.kind,
          specifier: ref.specifier,
          resolvedTo: publicFile,
          exists,
        });
        if (!exists) {
          audit.brokenBeforeRefactor.push({ from: file, specifier: ref.specifier });
        }
      } else if (ref.specifier.startsWith('.') || ref.specifier.startsWith('@/')) {
        const resolved = resolveModulePath(file, ref.specifier, fileSet, '');
        audit.dependencies.push({
          from: file,
          kind: ref.kind,
          specifier: ref.specifier,
          resolvedTo: resolved,
          exists: Boolean(resolved),
        });
        if (!resolved) {
          audit.brokenBeforeRefactor.push({ from: file, specifier: ref.specifier });
        }
      }
    }
  }
}

const outPath = path.join(PROJECT_ROOT, 'scripts', 'audit-report.json');
fs.writeFileSync(outPath, JSON.stringify(audit, null, 2));

console.log('=== PHASE 1: PROJECT AUDIT COMPLETE ===');
console.log(`Total files scanned: ${audit.totalFiles}`);
console.log(`  Root config/docs : ${audit.categories.rootConfig.length}`);
console.log(`  Source code      : ${audit.categories.sourceCode.length}`);
console.log(`  Public data JSON : ${audit.categories.publicData.length}`);
console.log(`  Public lottie    : ${audit.categories.publicLottie.length}`);
console.log(`  Public static    : ${audit.categories.publicStatic.length}`);
console.log(`  Other            : ${audit.categories.other.length}`);
console.log(`Module/asset refs  : ${audit.dependencies.length}`);
console.log(`Unresolved before  : ${audit.brokenBeforeRefactor.length}`);
console.log(`Audit report saved : scripts/audit-report.json`);
