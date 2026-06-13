import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');
const localesDir = path.join(rootDir, 'locales');

const htmlFiles = fs.readdirSync(rootDir).filter((file) => file.endsWith('.html'));
const localeFiles = fs
  .readdirSync(localesDir)
  .filter((file) => file.endsWith('.json') && !file.startsWith('_'))
  .sort();

const keyPatterns = [
  /\bdata-i18n="([^"]+)"/g,
  /\bdata-i18n-placeholder="([^"]+)"/g,
  /\bdata-i18n-content="([^"]+)"/g,
  /\bdata-i18n-title="([^"]+)"/g,
];

const htmlKeys = new Map();

for (const file of htmlFiles) {
  const content = fs.readFileSync(path.join(rootDir, file), 'utf8');

  for (const pattern of keyPatterns) {
    for (const match of content.matchAll(pattern)) {
      if (!htmlKeys.has(match[1])) htmlKeys.set(match[1], []);
      htmlKeys.get(match[1]).push(file);
    }
  }
}

const locales = Object.fromEntries(
  localeFiles.map((file) => [
    file,
    JSON.parse(fs.readFileSync(path.join(localesDir, file), 'utf8')),
  ]),
);

const base = locales['en.json'];
const baseKeys = Object.keys(base);
const errors = [];

for (const key of htmlKeys.keys()) {
  if (!(key in base)) {
    errors.push(`en.json missing HTML key "${key}" used in ${[...new Set(htmlKeys.get(key))].join(', ')}`);
  }
}

for (const [file, locale] of Object.entries(locales)) {
  const keys = Object.keys(locale);
  const missing = baseKeys.filter((key) => !(key in locale));
  const extra = keys.filter((key) => !(key in base));
  const empty = baseKeys.filter((key) => locale[key] === '');

  if (missing.length) errors.push(`${file} missing ${missing.length} keys: ${missing.join(', ')}`);
  if (extra.length) errors.push(`${file} has ${extra.length} extra keys: ${extra.join(', ')}`);
  if (empty.length) errors.push(`${file} has ${empty.length} empty values: ${empty.join(', ')}`);
}

if (errors.length) {
  console.error(`i18n audit failed with ${errors.length} issue(s):\n`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  `i18n audit passed: ${localeFiles.length} locale files, ${baseKeys.length} base keys, ${htmlKeys.size} HTML keys.`,
);
