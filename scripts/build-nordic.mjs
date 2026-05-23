/**
 * Build da, no, sv from complete fr.json + Nordic string map per language.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const localesDir = path.join(root, 'locales');
const en = JSON.parse(fs.readFileSync(path.join(localesDir, 'en.json'), 'utf8'));
const fr = JSON.parse(fs.readFileSync(path.join(localesDir, 'fr.json'), 'utf8'));
const keys = Object.keys(en);

const nordic = JSON.parse(fs.readFileSync(path.join(root, 'scripts', 'nordic-translations.json'), 'utf8'));

function build(code) {
  const map = nordic[code];
  if (!map) throw new Error(`Missing nordic map: ${code}`);
  const partial = (() => {
    try {
      return JSON.parse(fs.readFileSync(path.join(localesDir, `${code}.json`), 'utf8'));
    } catch {
      return {};
    }
  })();

  const out = {};
  for (const key of keys) {
    out[key] = partial[key] || map[key] || fr[key] || en[key];
  }
  fs.writeFileSync(path.join(localesDir, `${code}.json`), JSON.stringify(out, null, 2) + '\n');
  const enCount = keys.filter((k) => out[k] === en[k]).length;
  console.log(`${code}: ${keys.length} keys (${enCount} still match EN)`);
}

['da', 'no', 'sv'].forEach(build);
