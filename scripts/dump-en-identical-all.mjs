import fs from 'node:fs';

const es = JSON.parse(fs.readFileSync('locales/es.json', 'utf8'));
const en = JSON.parse(fs.readFileSync('locales/en.json', 'utf8'));

// Find keys identical to EN across secondary langs (likely untranslated)
for (const code of ['da', 'de', 'fr', 'it', 'no', 'pt', 'sv']) {
  const loc = JSON.parse(fs.readFileSync(`locales/${code}.json`, 'utf8'));
  const hits = Object.entries(loc).filter(([k, v]) => {
    if (typeof v !== 'string' || !en[k]) return false;
    if (v !== en[k]) return false;
    if (v.length < 28) return false;
    if (v === es[k]) return false; // shared intentionally
    // skip names/brands
    if (/^(Andrés|Esteban|María|Carlos|Elena|TheBee|Dragon|Calafate|Retór|Florer|Dahuss|Radio|Ruiz|Familia|Irigoyen)/i.test(v)) return false;
    if (/IrigoyenDev|WhatsApp|PageSpeed|Mercado Libre|Google Business|Full-Stack Developer|USD|SEO|GEO|Care \+|FAQ/i.test(v) && v.length < 50) return false;
    return true;
  });
  console.log(`\n${code} identical-to-EN long: ${hits.length}`);
  hits.slice(0, 40).forEach(([k, v]) => console.log(' ', k, '=>', v.slice(0, 100)));
}
