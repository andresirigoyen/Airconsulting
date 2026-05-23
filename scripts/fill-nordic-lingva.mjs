/**
 * Fill da, no, sv using Lingva translate API (en -> target).
 * Preserves existing partial translations.
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

let hostIndex = 0;

async function translateText(text, target) {
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
      /* try next host */
    }
  }
  return text;
}

const cache = new Map();

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function loadPartial(code) {
  try {
    return JSON.parse(fs.readFileSync(path.join(localesDir, `${code}.json`), 'utf8'));
  } catch {
    return {};
  }
}

const targets = process.argv.slice(2).length
  ? process.argv.slice(2)
  : ['da', 'no', 'sv'];

for (const code of targets) {
  console.log(`\n=== ${code} ===`);
  const partial = loadPartial(code);
  const out = {};
  let kept = 0;
  let done = 0;

  for (const key of keys) {
    if (partial[key] && partial[key] !== en[key]) {
      out[key] = partial[key];
      kept++;
      continue;
    }
    out[key] = await translateText(en[key], code);
    done++;
    if (done % 15 === 0) {
      console.log(`  ${done} translated, ${kept} kept`);
      await sleep(800);
    } else {
      await sleep(400);
    }
  }

  fs.writeFileSync(path.join(localesDir, `${code}.json`), JSON.stringify(out, null, 2) + '\n');
  const sameEn = keys.filter((k) => out[k] === en[k]).length;
  console.log(`  written ${keys.length} keys (${kept} kept, ${sameEn} still EN)`);
}

console.log('\nDone.');
