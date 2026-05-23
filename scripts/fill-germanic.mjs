/**
 * Fill de, da, no, sv locale files from en.json + existing partials.
 * Uses MyMemory free API (en -> target). Preserves existing translations.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const localesDir = path.join(__dirname, '..', 'locales');

const en = JSON.parse(fs.readFileSync(path.join(localesDir, 'en.json'), 'utf8'));
const keys = Object.keys(en);

const argLang = process.argv[2];
const allTargets = [
  { code: 'de', pair: 'en|de' },
  { code: 'da', pair: 'en|da' },
  { code: 'no', pair: 'en|no' },
  { code: 'sv', pair: 'en|sv' },
];
const targets = argLang ? allTargets.filter((t) => t.code === argLang) : allTargets;
if (argLang && !targets.length) {
  console.error('Unknown lang:', argLang);
  process.exit(1);
}

const cache = new Map();

async function translate(text, pair) {
  if (!text || typeof text !== 'string') return text;
  const cacheKey = `${pair}::${text}`;
  if (cache.has(cacheKey)) return cache.get(cacheKey);

  // MyMemory limit ~500 bytes per query; split long strings
  if (text.length > 450) {
    const chunks = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [text];
    const parts = [];
    for (const chunk of chunks) {
      parts.push(await translate(chunk.trim(), pair));
      await sleep(350);
    }
    const result = parts.join(' ');
    cache.set(cacheKey, result);
    return result;
  }

  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${pair}`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.responseStatus !== 200) {
    console.warn(`  warn [${pair}]: ${data.responseDetails || 'failed'} — keeping EN`);
    cache.set(cacheKey, text);
    return text;
  }
  const translated = data.responseData.translatedText;
  cache.set(cacheKey, translated);
  return translated;
}

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

// Updated German card/project desc overrides (match en.json sanitized content)
const deOverrides = {
  'proj.thebeebaby.desc':
    'Globaler Marktplatz für Babyausstattungsverleih — Geo-Katalog, Anbieter-Tools, sichere Zahlungen und produktionsreife Plattform.',
  'proj.dahuss.desc':
    'Full-Stack-Immobilienplattform — Objektkatalog, Filter, Lead-Erfassung, Admin-Tools und produktionsreife Nutzererfahrung.',
  'proj.retorica.desc':
    'Corporate-Plattform für Events & Marketing — fünf Geschäftsbereiche, immersives UI, strukturierte Inhalte, zweisprachiges SEO und Lead-Erfassung.',
  'proj.floreria.desc':
    'Statische Unternehmenswebsite für eine Valparaíso-Blumenhandlung — visueller Katalog, lokales SEO, WhatsApp-Kontakt und schnelles Cloud-Deployment ohne schweres Backend.',
  'cta.thebeebaby.title': 'Bauen Sie einen Marktplatz oder eine Buchungsplattform?',
  'cta.thebeebaby.desc':
    'Ich entwerfe und liefere Full-Stack-Produkte wie TheBeeBaby — von UX und Geo-Suche bis zu Zahlungen und Admin-Dashboards. Lassen Sie uns Ihr MVP planen oder Ihr bestehendes Produkt skalieren.',
  'cta.thebeebaby.btn': 'Projektplan anfordern',
  'cta.dahuss.title': 'Bauen Sie eine Immobilienwebsite oder interne Admin-Plattform?',
  'cta.dahuss.desc':
    'Ich liefere Full-Stack-Produkte wie Dahuss Homes — Objektkataloge, Lead-Erfassung, private Admin-Bereiche und Performance für echten Traffic. Lassen Sie uns Ihr MVP planen oder Ihr Produkt verbessern.',
  'cta.dahuss.btn': 'Plattform-Angebot anfordern',
  'cta.retorica.title': 'Bauen Sie eine wirkungsstarke Marken- oder Event-Website?',
  'cta.retorica.desc':
    'Ich liefere Astro-Plattformen wie Retórica — immersives Storytelling, Content-Collections, schnelle statische Auslieferung und Kontaktflüsse, die konvertieren. Lassen Sie uns Ihre Corporate-Site planen.',
  'cta.retorica.btn': 'Marken-Website planen',
  'cta.floreria.title': 'Brauchen Sie eine schnelle Website für Ihr lokales Geschäft?',
  'cta.floreria.desc':
    'Ich baue statische Sites wie diese — lokales SEO, visueller Katalog, WhatsApp-Kontakt und schnelles Cloud-Deployment ohne unnötige Komplexität. Starten wir Ihre.',
  'cta.floreria.btn': 'Website für lokales Geschäft',
};

for (const { code, pair } of targets) {
  console.log(`\n=== ${code} ===`);
  const partial = loadPartial(code);
  const out = {};
  let translated = 0;
  let skipped = 0;

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (partial[key]) {
      out[key] = partial[key];
      skipped++;
      continue;
    }
    if (code === 'de' && deOverrides[key]) {
      out[key] = deOverrides[key];
      skipped++;
      continue;
    }
    const source = en[key];
    out[key] = await translate(source, pair);
    translated++;
    if (translated % 10 === 0) {
      console.log(`  ${translated}/${keys.length - skipped} translated...`);
      await sleep(400);
    } else {
      await sleep(350);
    }
  }

  fs.writeFileSync(
    path.join(localesDir, `${code}.json`),
    JSON.stringify(out, null, 2) + '\n',
    'utf8'
  );
  console.log(`  done: ${Object.keys(out).length} keys (${skipped} kept, ${translated} translated)`);
}

console.log('\nAll germanic locales written.');
