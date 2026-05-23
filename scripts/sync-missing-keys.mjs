/**
 * Sync missing locale keys from en.json into all other languages.
 * Usage: node scripts/sync-missing-keys.mjs [de da no sv it fr pt]
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const localesDir = path.join(__dirname, '..', 'locales');
const en = JSON.parse(fs.readFileSync(path.join(localesDir, 'en.json'), 'utf8'));
const keys = Object.keys(en);

const hosts = [
  'https://lingva.ml',
  'https://translate.plausibility.cloud',
  'https://lingva.garudalinux.org',
];

const langPairs = {
  es: 'en|es',
  de: 'en|de',
  da: 'en|da',
  no: 'en|no',
  sv: 'en|sv',
  it: 'en|it',
  fr: 'en|fr',
  pt: 'en|pt',
};

const cache = new Map();
let hostIndex = 0;

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function translate(text, target) {
  if (!text?.trim()) return text;
  const cacheKey = `${target}:${text}`;
  if (cache.has(cacheKey)) return cache.get(cacheKey);

  for (let i = 0; i < hosts.length; i++) {
    const host = hosts[(hostIndex + i) % hosts.length];
    try {
      const url = `${host}/api/v1/en/${target}/${encodeURIComponent(text.slice(0, 2000))}`;
      const res = await fetch(url, { signal: AbortSignal.timeout(15000) });
      if (!res.ok) continue;
      const data = await res.json();
      if (data.translation) {
        cache.set(cacheKey, data.translation);
        hostIndex = (hostIndex + i) % hosts.length;
        return data.translation;
      }
    } catch {
      /* try next */
    }
  }
  return text;
}

const targets = process.argv.slice(2).length
  ? process.argv.slice(2)
  : ['es', 'de', 'da', 'no', 'sv', 'it', 'fr', 'pt'];

for (const code of targets) {
  const filePath = path.join(localesDir, `${code}.json`);
  const current = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const missing = keys.filter((k) => !current[k]);
  if (!missing.length) {
    console.log(`${code}: already complete (${keys.length} keys)`);
    continue;
  }

  console.log(`\n${code}: adding ${missing.length} keys...`);
  const esRef = code !== 'es' && fs.existsSync(path.join(localesDir, 'es.json'))
    ? JSON.parse(fs.readFileSync(path.join(localesDir, 'es.json'), 'utf8'))
    : null;

  for (let i = 0; i < missing.length; i++) {
    const key = missing[i];
    if (code === 'es' && esRef?.[key]) {
      current[key] = esRef[key];
    } else if (esRef?.[key] && ['pt', 'it', 'fr'].includes(code)) {
      // Romance langs: translate from Spanish when available
      current[key] = await translate(esRef[key], code);
    } else {
      current[key] = await translate(en[key], code);
    }
    if ((i + 1) % 5 === 0) {
      console.log(`  ${i + 1}/${missing.length}`);
      await sleep(600);
    } else {
      await sleep(350);
    }
  }

  const ordered = {};
  for (const key of keys) ordered[key] = current[key] ?? en[key];

  fs.writeFileSync(filePath, JSON.stringify(ordered, null, 2) + '\n');
  console.log(`${code}: written ${Object.keys(ordered).length} keys`);
}

console.log('\nSync complete.');
