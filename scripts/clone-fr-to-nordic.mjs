/**
 * Clone fr.json structure to da/no/sv using embedded Nordic translations.
 * Run: node scripts/clone-fr-to-nordic.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const localesDir = path.join(root, 'locales');
const en = JSON.parse(fs.readFileSync(path.join(localesDir, 'en.json'), 'utf8'));
const fr = JSON.parse(fs.readFileSync(path.join(localesDir, 'fr.json'), 'utf8'));

// Import per-language maps (generated alongside this script)
const { da, no, sv } = await import('./nordic-maps.mjs');

function writeLocale(code, map) {
  const partial = (() => {
    try {
      return JSON.parse(fs.readFileSync(path.join(localesDir, `${code}.json`), 'utf8'));
    } catch {
      return {};
    }
  })();

  const out = {};
  for (const key of Object.keys(en)) {
    out[key] = partial[key] || map[key] || en[key];
  }
  fs.writeFileSync(path.join(localesDir, `${code}.json`), JSON.stringify(out, null, 2) + '\n');
  const frFallback = Object.keys(en).filter((k) => !map[k] && out[k] === en[k]).length;
  console.log(`${code}: ${Object.keys(out).length} keys (${Object.keys(map).length} in map, ${frFallback} EN fallback)`);
}

writeLocale('da', da);
writeLocale('no', no);
writeLocale('sv', sv);
