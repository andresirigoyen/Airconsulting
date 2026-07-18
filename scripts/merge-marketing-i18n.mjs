/**
 * Merge marketing-page i18n keys into all locales.
 * ES/EN from _marketing-i18n-maps.json; da/de/fr/it/no/pt/sv from _marketing-i18n-localized.json.
 * Run: node scripts/merge-marketing-i18n.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const localesDir = path.join(root, 'locales');

const maps = JSON.parse(fs.readFileSync(path.join(root, 'scripts', '_marketing-i18n-maps.json'), 'utf8'));
const localized = JSON.parse(
  fs.readFileSync(path.join(root, 'scripts', '_marketing-i18n-localized.json'), 'utf8')
);

function merge(file, keys) {
  const p = path.join(localesDir, file);
  const cur = JSON.parse(fs.readFileSync(p, 'utf8'));
  fs.writeFileSync(p, JSON.stringify({ ...cur, ...keys }, null, 2) + '\n');
}

merge('es.json', maps.es);
merge('en.json', maps.en);
for (const [code, keys] of Object.entries(localized)) {
  merge(`${code}.json`, keys);
}
console.log('Marketing keys merged:', Object.keys(maps.es).length, 'langs:', Object.keys(localized).join(','));
