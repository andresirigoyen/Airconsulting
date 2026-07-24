/**
 * Inject Google Tag Manager into all public HTML pages.
 * Idempotent — safe to re-run. Skips emails/.
 * Run: node scripts/inject-gtm.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ensureGtm } from './lib/page-chrome.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'emails') {
      continue;
    }
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.isFile() && entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

let patched = 0;
let skipped = 0;

for (const file of walk(root)) {
  const before = fs.readFileSync(file, 'utf8');
  const after = ensureGtm(before);
  if (after !== before) {
    fs.writeFileSync(file, after);
    patched += 1;
    console.log('Patched', path.relative(root, file));
  } else {
    skipped += 1;
  }
}

console.log(`Done. patched=${patched} unchanged=${skipped}`);
