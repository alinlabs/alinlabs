import fs from 'node:fs';
import path from 'node:path';
import {
  PROJECT_ROOT,
  isCodeFile,
  extractAstReferences,
  resolveModulePath,
  formatImportSpecifier,
} from './lib/project-utils.mjs';

const args = new Set(process.argv.slice(2));
const isDryRun = args.has('--dry-run');

const mapPath = path.join(PROJECT_ROOT, 'scripts', 'rename-map.json');
if (!fs.existsSync(mapPath)) {
  console.error('Missing scripts/rename-map.json.');
  process.exit(1);
}

const mapData = JSON.parse(fs.readFileSync(mapPath, 'utf8'));
const oldToNew = new Map(mapData.mappings.map((m) => [m.oldPath, m.newPath]));
const newToOld = new Map(mapData.mappings.map((m) => [m.newPath, m.oldPath]));
const oldFileSet = new Set(mapData.mappings.map((m) => m.oldPath));

const publicAssetRewriteMap = new Map();
for (const m of mapData.mappings) {
  if (m.oldPath.startsWith('public/') && m.newPath.startsWith('public/') && m.oldPath !== m.newPath) {
    const oldUrl = '/' + m.oldPath.slice('public/'.length);
    const newUrl = '/' + m.newPath.slice('public/'.length);
    publicAssetRewriteMap.set(oldUrl, newUrl);
  }
}

console.log(`=== PHASE 4: AST REFERENCE SYNCHRONIZATION (${isDryRun ? 'DRY RUN' : 'EXECUTE'}) ===`);

let totalFilesUpdated = 0;
let totalImportsUpdated = 0;
let totalAssetsUpdated = 0;
const changeLog = [];

for (const m of mapData.mappings) {
  const activeRelPath = isDryRun ? m.oldPath : m.newPath;
  if (!isCodeFile(activeRelPath) || activeRelPath === 'vite.config.ts') continue;

  const absPath = path.join(PROJECT_ROOT, activeRelPath);
  const content = fs.readFileSync(absPath, 'utf8');
  const refs = extractAstReferences(activeRelPath, content);

  const edits = [];
  for (const ref of refs) {
    if (ref.kind === 'public-asset-path') {
      const replacement = publicAssetRewriteMap.get(ref.specifier);
      if (replacement && replacement !== ref.specifier) {
        edits.push({ ...ref, replacement });
        totalAssetsUpdated++;
      }
    } else if (ref.specifier.startsWith('.') || ref.specifier.startsWith('@/')) {
      const resolvedOld = resolveModulePath(m.oldPath, ref.specifier, oldFileSet, '');
      if (!resolvedOld) {
        console.warn(`  [WARN] Could not resolve "${ref.specifier}" from ${m.oldPath}`);
        continue;
      }
      const resolvedNew = oldToNew.get(resolvedOld);
      if (!resolvedNew) continue;

      const newSpecifier = formatImportSpecifier(m.newPath, resolvedNew);
      if (newSpecifier !== ref.specifier) {
        edits.push({ ...ref, replacement: newSpecifier });
        totalImportsUpdated++;
      }
    }
  }

  if (edits.length > 0) {
    edits.sort((a, b) => b.start - a.start);
    let updated = content;
    for (const edit of edits) {
      updated = updated.slice(0, edit.start) + edit.replacement + updated.slice(edit.end);
      changeLog.push({
        file: m.newPath,
        kind: edit.kind,
        from: edit.specifier,
        to: edit.replacement,
      });
    }

    if (!isDryRun) {
      fs.writeFileSync(absPath, updated);
    }
    totalFilesUpdated++;
    console.log(`  ${isDryRun ? '[DRY-RUN] ' : ''}Updated ${edits.length} ref(s) in ${m.newPath}`);
  }
}

// 2. Update index.html
const indexHtmlPath = path.join(PROJECT_ROOT, 'index.html');
if (fs.existsSync(indexHtmlPath)) {
  const html = fs.readFileSync(indexHtmlPath, 'utf8');
  let nextHtml = html
    .replace('src="/index.tsx"', 'src="/src/main.tsx"')
    .replace('href="/index.css"', 'href="/src/styles/index.css"');

  if (nextHtml !== html) {
    if (!isDryRun) fs.writeFileSync(indexHtmlPath, nextHtml);
    totalFilesUpdated++;
    changeLog.push({ file: 'index.html', kind: 'html-entry', from: '/index.tsx & /index.css', to: '/src/main.tsx & /src/styles/index.css' });
    console.log(`  ${isDryRun ? '[DRY-RUN] ' : ''}Updated entry & stylesheet paths in index.html`);
  }
}

// 3. Update tsconfig.json
const tsconfigPath = path.join(PROJECT_ROOT, 'tsconfig.json');
if (fs.existsSync(tsconfigPath)) {
  const raw = fs.readFileSync(tsconfigPath, 'utf8');
  const parsed = JSON.parse(raw);
  parsed.compilerOptions = parsed.compilerOptions || {};
  parsed.compilerOptions.paths = { '@/*': ['./src/*'] };
  parsed.include = ['src', 'vite.config.ts'];
  const nextRaw = JSON.stringify(parsed, null, 2) + '\n';
  if (nextRaw !== raw) {
    if (!isDryRun) fs.writeFileSync(tsconfigPath, nextRaw);
    totalFilesUpdated++;
    changeLog.push({ file: 'tsconfig.json', kind: 'ts-config', from: '@/* -> ./*', to: '@/* -> ./src/* (include: src, vite.config.ts)' });
    console.log(`  ${isDryRun ? '[DRY-RUN] ' : ''}Updated paths & include in tsconfig.json`);
  }
}

// 4. Update vite.config.ts
const viteConfigPath = path.join(PROJECT_ROOT, 'vite.config.ts');
if (fs.existsSync(viteConfigPath)) {
  const raw = fs.readFileSync(viteConfigPath, 'utf8');
  const nextRaw = raw.replace("'@': path.resolve('.')", "'@': path.resolve('./src')");
  if (nextRaw !== raw) {
    if (!isDryRun) fs.writeFileSync(viteConfigPath, nextRaw);
    totalFilesUpdated++;
    changeLog.push({ file: 'vite.config.ts', kind: 'vite-alias', from: "path.resolve('.')", to: "path.resolve('./src')" });
    console.log(`  ${isDryRun ? '[DRY-RUN] ' : ''}Updated @ alias in vite.config.ts`);
  }
}

const syncReportPath = path.join(PROJECT_ROOT, 'scripts', 'sync-report.json');
if (!isDryRun) {
  fs.writeFileSync(
    syncReportPath,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        totalFilesUpdated,
        totalImportsUpdated,
        totalAssetsUpdated,
        changes: changeLog,
      },
      null,
      2
    )
  );
}

console.log(`Sync summary: ${totalFilesUpdated} files, ${totalImportsUpdated} module imports, ${totalAssetsUpdated} asset paths.`);
