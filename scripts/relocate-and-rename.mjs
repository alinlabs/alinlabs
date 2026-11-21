import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { PROJECT_ROOT, EXCLUDED_DIRS } from './lib/project-utils.mjs';

const args = new Set(process.argv.slice(2));
const isDryRun = args.has('--dry-run');
const shouldBackup = !args.has('--no-backup');

const mapPath = path.join(PROJECT_ROOT, 'scripts', 'rename-map.json');
if (!fs.existsSync(mapPath)) {
  console.error('Missing scripts/rename-map.json. Run generate-rename-map.mjs first.');
  process.exit(1);
}

const mapData = JSON.parse(fs.readFileSync(mapPath, 'utf8'));
if (mapData.collisions && mapData.collisions.length > 0) {
  console.error('Aborting: collisions exist in rename-map.json');
  process.exit(1);
}

const pending = mapData.mappings.filter((m) => m.oldPath !== m.newPath);

console.log(`=== PHASE 3: RELOCATE & RENAME (${isDryRun ? 'DRY RUN' : 'EXECUTE'}) ===`);
console.log(`Pending file moves/renames: ${pending.length}`);

// Validate every source exists
for (const item of pending) {
  const srcAbs = path.join(PROJECT_ROOT, item.oldPath);
  if (!fs.existsSync(srcAbs)) {
    console.error(`Missing source file: ${item.oldPath}`);
    process.exit(1);
  }
}

if (isDryRun) {
  for (const item of pending) {
    console.log(`  [DRY-RUN] ${item.oldPath}  ->  ${item.newPath}`);
  }
  console.log('Dry run complete. No filesystem changes made.');
  process.exit(0);
}

// Step 1: Backup before modifying
if (shouldBackup) {
  const backupRoot = path.join(PROJECT_ROOT, '.tmp-refactor-backup');
  fs.rmSync(backupRoot, { recursive: true, force: true });
  for (const item of mapData.mappings) {
    const srcAbs = path.join(PROJECT_ROOT, item.oldPath);
    const dstAbs = path.join(backupRoot, item.oldPath);
    fs.mkdirSync(path.dirname(dstAbs), { recursive: true });
    fs.copyFileSync(srcAbs, dstAbs);
  }
  console.log(`Backup created at .tmp-refactor-backup/ (${mapData.mappings.length} files)`);
}

// Step 2: Two-phase rename (old -> temp -> new) to avoid case-insensitive FS collisions
const tempRecords = [];
const runToken = crypto.randomBytes(4).toString('hex');

for (let i = 0; i < pending.length; i++) {
  const item = pending[i];
  const srcAbs = path.join(PROJECT_ROOT, item.oldPath);
  const tmpRel = `.tmp-refactor-stage-${runToken}-${i}`;
  const tmpAbs = path.join(PROJECT_ROOT, tmpRel);
  fs.renameSync(srcAbs, tmpAbs);
  tempRecords.push({ ...item, tmpAbs });
}

for (const rec of tempRecords) {
  const dstAbs = path.join(PROJECT_ROOT, rec.newPath);
  fs.mkdirSync(path.dirname(dstAbs), { recursive: true });
  if (fs.existsSync(dstAbs)) {
    console.error(`Destination unexpectedly exists: ${rec.newPath}`);
    process.exit(1);
  }
  fs.renameSync(rec.tmpAbs, dstAbs);
  rec.status = 'Renamed';
}

// Step 3: Clean up empty legacy directories
function removeEmptyDirs(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    if (EXCLUDED_DIRS.has(entry.name)) continue;
    const sub = path.join(dir, entry.name);
    removeEmptyDirs(sub);
    if (fs.readdirSync(sub).length === 0) {
      fs.rmdirSync(sub);
      console.log(`  Removed empty directory: ${path.relative(PROJECT_ROOT, sub)}`);
    }
  }
}
removeEmptyDirs(PROJECT_ROOT);

// Update rename-map.json statuses
const statusByOld = new Map(tempRecords.map((r) => [r.oldPath, 'Completed']));
mapData.mappings = mapData.mappings.map((m) => ({
  ...m,
  status: statusByOld.get(m.oldPath) || m.status,
}));
fs.writeFileSync(mapPath, JSON.stringify(mapData, null, 2));

console.log(`Successfully relocated/renamed ${tempRecords.length} files via two-phase rename.`);
