import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const localesDir = path.join(rootDir, 'locales');

const baseCode = 'en';
const localeCodes = ['es', 'de', 'da', 'no', 'sv', 'it', 'fr', 'pt'];
const fallbackSourceByLocale = {
  es: 'es',
  de: 'en',
  da: 'en',
  no: 'en',
  sv: 'en',
  it: 'es',
  fr: 'es',
  pt: 'es',
};

function readLocale(code) {
  return JSON.parse(fs.readFileSync(path.join(localesDir, `${code}.json`), 'utf8'));
}

function writeLocale(code, data, orderedKeys) {
  const ordered = {};
  for (const key of orderedKeys) {
    ordered[key] = data[key];
  }

  fs.writeFileSync(
    path.join(localesDir, `${code}.json`),
    `${JSON.stringify(ordered, null, 2)}\n`,
    'utf8',
  );
}

const base = readLocale(baseCode);
const sources = {
  en: base,
  es: readLocale('es'),
};
const orderedKeys = Object.keys(base);

for (const code of localeCodes) {
  const current = readLocale(code);
  const fallbackSource = sources[fallbackSourceByLocale[code]] || base;
  const missing = orderedKeys.filter((key) => !(key in current));
  const completed = { ...current };

  for (const key of missing) {
    completed[key] = fallbackSource[key] ?? base[key];
  }

  writeLocale(code, completed, orderedKeys);
  console.log(`${code}.json: ${Object.keys(completed).length} keys (${missing.length} added)`);
}
