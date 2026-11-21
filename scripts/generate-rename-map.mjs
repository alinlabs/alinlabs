import fs from 'node:fs';
import path from 'node:path';
import {
  PROJECT_ROOT,
  ROOT_ECOSYSTEM_FILES,
  PUBLIC_ECOSYSTEM_FILES,
  walkProjectFiles,
  toKebabCase,
} from './lib/project-utils.mjs';

const EXPLICIT_SOURCE_MAP = {
  'index.tsx': { to: 'src/main.tsx', reason: 'Standard Vite React entry point relocated to src/' },
  'App.tsx': { to: 'src/app.tsx', reason: 'Root application component relocated to src/ in kebab-case' },
  'index.css': { to: 'src/styles/index.css', reason: 'Global stylesheet relocated to src/styles/' },
  'types.ts': { to: 'src/types/index.ts', reason: 'Shared TypeScript definitions relocated to src/types/' },
  'utils/useShareableMedia.ts': { to: 'src/hooks/use-shareable-media.ts', reason: 'Custom React hook moved from utils/ to src/hooks/' },
  'utils/DynamicIcon.tsx': { to: 'src/components/ui/dynamic-icon.tsx', reason: 'Reusable React icon component moved from utils/ to src/components/ui/' },
  'components/WelcomePopup.tsx': { to: 'src/components/common/welcome-popup.tsx', reason: 'Shared popup component organized under src/components/common/' },
  'components/ui/Error.tsx': { to: 'src/components/ui/error-state.tsx', reason: 'UI error component standardized to match ErrorState responsibility' },
  'components/ui/CustomDigitalMarketingBuilder.tsx': { to: 'src/features/services/custom-digital-marketing-builder.tsx', reason: 'Domain-specific service builder moved to src/features/services/' },
  'halaman/beranda/Main.tsx': { to: 'src/pages/beranda/beranda-page.tsx', reason: 'Avoid generic Main.tsx and relocate page into src/pages/beranda/' },
  'halaman/layanan/main/Main.tsx': { to: 'src/pages/layanan/main/layanan-page.tsx', reason: 'Avoid generic Main.tsx and relocate page into src/pages/layanan/main/' },
  'halaman/layanan/paket/Main.tsx': { to: 'src/pages/layanan/paket/paket-detail-page.tsx', reason: 'Avoid generic Main.tsx and relocate page into src/pages/layanan/paket/' },
  'halaman/portofolio/Main.tsx': { to: 'src/pages/portofolio/portofolio-page.tsx', reason: 'Avoid generic Main.tsx and relocate page into src/pages/portofolio/' },
  'halaman/checkout/Checkout.tsx': { to: 'src/pages/checkout/checkout-page.tsx', reason: 'Standardize checkout entry page into src/pages/checkout/' },
};

function mapFile(oldPath) {
  if (ROOT_ECOSYSTEM_FILES.has(oldPath) || oldPath === 'bun.lock') {
    return { newPath: oldPath, reason: 'Framework/tooling root file preserved', action: 'keep' };
  }

  if (PUBLIC_ECOSYSTEM_FILES.has(oldPath)) {
    return { newPath: oldPath, reason: 'Public web/deployment file preserved', action: 'keep' };
  }

  if (oldPath.startsWith('public/data/')) {
    const ext = path.posix.extname(oldPath);
    const base = path.posix.basename(oldPath, ext);
    const newPath = `src/data/${toKebabCase(base)}${ext.toLowerCase()}`;
    return { newPath, reason: 'Imported JSON data moved from public/data/ to src/data/ in kebab-case', action: 'move' };
  }

  if (oldPath.startsWith('public/lottie/')) {
    const ext = path.posix.extname(oldPath);
    const base = path.posix.basename(oldPath, ext);
    const newPath = `public/lottie/${toKebabCase(base)}${ext.toLowerCase()}`;
    return {
      newPath,
      reason: newPath === oldPath ? 'Already standardized' : 'Standardize public Lottie asset filename to kebab-case',
      action: newPath === oldPath ? 'keep' : 'rename',
    };
  }

  if (oldPath.startsWith('public/')) {
    const isAlreadyStandard = !/[A-Z_\s]/.test(oldPath);
    if (isAlreadyStandard) {
      return { newPath: oldPath, reason: 'Public asset already standardized in lowercase kebab-case', action: 'keep' };
    }
    const parts = oldPath.split('/');
    const file = parts.pop();
    const ext = path.posix.extname(file);
    const base = path.posix.basename(file, ext);
    const kebabParts = parts.map((p) => toKebabCase(p));
    const newPath = `${kebabParts.join('/')}/${toKebabCase(base)}${ext.toLowerCase()}`;
    return {
      newPath,
      reason: 'Standardize public asset path to kebab-case',
      action: 'rename',
    };
  }

  if (EXPLICIT_SOURCE_MAP[oldPath]) {
    return {
      newPath: EXPLICIT_SOURCE_MAP[oldPath].to,
      reason: EXPLICIT_SOURCE_MAP[oldPath].reason,
      action: 'move',
    };
  }

  if (oldPath.startsWith('components/chat/')) {
    const file = path.posix.basename(oldPath);
    const ext = path.posix.extname(file);
    const base = path.posix.basename(file, ext);
    return {
      newPath: `src/features/chat/${toKebabCase(base)}${ext.toLowerCase()}`,
      reason: 'Chat domain module relocated from components/chat/ to src/features/chat/',
      action: 'move',
    };
  }

  if (oldPath.startsWith('components/')) {
    const rel = oldPath.slice('components/'.length);
    const parts = rel.split('/');
    const file = parts.pop();
    const ext = path.posix.extname(file);
    const base = path.posix.basename(file, ext);
    const kebabDirs = parts.map((p) => toKebabCase(p));
    const targetDir = kebabDirs.length ? `src/components/${kebabDirs.join('/')}` : 'src/components';
    return {
      newPath: `${targetDir}/${toKebabCase(base)}${ext.toLowerCase()}`,
      reason: 'Component relocated to src/components/ in lowercase kebab-case',
      action: 'move',
    };
  }

  if (oldPath.startsWith('halaman/')) {
    const rel = oldPath.slice('halaman/'.length);
    const parts = rel.split('/');
    const file = parts.pop();
    const ext = path.posix.extname(file);
    const base = path.posix.basename(file, ext);
    const kebabDirs = parts.map((p) => toKebabCase(p));
    const targetDir = kebabDirs.length ? `src/pages/${kebabDirs.join('/')}` : 'src/pages';
    return {
      newPath: `${targetDir}/${toKebabCase(base)}${ext.toLowerCase()}`,
      reason: 'Page module relocated from halaman/ to src/pages/ in lowercase kebab-case',
      action: 'move',
    };
  }

  const dir = path.posix.dirname(oldPath);
  const file = path.posix.basename(oldPath);
  const ext = path.posix.extname(file);
  const base = path.posix.basename(file, ext);
  const kebabDirs = dir === '.' ? [] : dir.split('/').map((p) => toKebabCase(p));
  const targetDir = kebabDirs.length ? `src/${kebabDirs.join('/')}` : 'src';
  return {
    newPath: `${targetDir}/${toKebabCase(base)}${ext.toLowerCase()}`,
    reason: 'Relocated into src/ in lowercase kebab-case',
    action: 'move',
  };
}

const files = walkProjectFiles();
const mappings = files.map((oldPath) => {
  const mapped = mapFile(oldPath);
  return {
    oldPath,
    newPath: mapped.newPath,
    action: mapped.action,
    reason: mapped.reason,
    status: mapped.oldPath === mapped.newPath ? 'Unchanged' : 'Pending',
  };
});

// Collision Detection (exact + case-insensitive)
const targetExact = new Map();
const targetLower = new Map();
const collisions = [];

for (const entry of mappings) {
  if (targetExact.has(entry.newPath)) {
    collisions.push({
      type: 'exact-collision',
      newPath: entry.newPath,
      sources: [targetExact.get(entry.newPath), entry.oldPath],
    });
  } else {
    targetExact.set(entry.newPath, entry.oldPath);
  }

  const lower = entry.newPath.toLowerCase();
  if (targetLower.has(lower)) {
    collisions.push({
      type: 'case-insensitive-collision',
      newPath: entry.newPath,
      sources: [targetLower.get(lower), entry.oldPath],
    });
  } else {
    targetLower.set(lower, entry.oldPath);
  }
}

const report = {
  generatedAt: new Date().toISOString(),
  totalFiles: mappings.length,
  changedCount: mappings.filter((m) => m.oldPath !== m.newPath).length,
  unchangedCount: mappings.filter((m) => m.oldPath === m.newPath).length,
  collisions,
  mappings,
};

const outPath = path.join(PROJECT_ROOT, 'scripts', 'rename-map.json');
fs.writeFileSync(outPath, JSON.stringify(report, null, 2));

console.log('=== PHASE 2: RENAME & RELOCATION MAPPING ===');
console.log(`Total files      : ${report.totalFiles}`);
console.log(`Files to change  : ${report.changedCount}`);
console.log(`Files unchanged  : ${report.unchangedCount}`);
console.log(`Collisions found : ${report.collisions.length}`);
if (collisions.length > 0) {
  console.error('COLLISIONS DETECTED:', JSON.stringify(collisions, null, 2));
  process.exit(1);
}
console.log(`Mapping saved    : scripts/rename-map.json`);
