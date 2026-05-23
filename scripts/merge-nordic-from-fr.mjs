/**
 * Build da/no/sv from fr.json + en key order.
 * Nordic text: translate from French reference in nordic-data/*.json patches.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const localesDir = path.join(root, 'locales');
const en = JSON.parse(fs.readFileSync(path.join(localesDir, 'en.json'), 'utf8'));
const fr = JSON.parse(fs.readFileSync(path.join(localesDir, 'fr.json'), 'utf8'));

const codes = ['da', 'no', 'sv'];
const dataDir = path.join(root, 'scripts', 'nordic-data');

for (const code of codes) {
  const patchPath = path.join(dataDir, `${code}.json`);
  const patch = fs.existsSync(patchPath)
    ? JSON.parse(fs.readFileSync(patchPath, 'utf8'))
    : {};
  const partial = (() => {
    try {
      return JSON.parse(fs.readFileSync(path.join(localesDir, `${code}.json`), 'utf8'));
    } catch {
      return {};
    }
  })();

  const out = {};
  for (const key of Object.keys(en)) {
    out[key] = partial[key] || patch[key] || fr[key] || en[key];
  }
  fs.writeFileSync(path.join(localesDir, `${code}.json`), JSON.stringify(out, null, 2) + '\n');
  const enOnly = Object.keys(en).filter((k) => out[k] === en[k]).length;
  const frOnly = Object.keys(en).filter((k) => out[k] === fr[k] && out[k] !== en[k]).length;
  console.log(`${code}: ${Object.keys(out).length} keys | patch:${Object.keys(patch).length} | still EN:${enOnly} | FR fallback:${frOnly}`);
}
