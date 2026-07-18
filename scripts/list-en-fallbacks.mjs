import fs from 'node:fs';

const html = fs.readFileSync('index.html', 'utf8');
const keys = [...new Set([...html.matchAll(/data-i18n(?:-html|-placeholder|-content)?=["']([^"']+)["']/g)].map((m) => m[1]))];
const en = JSON.parse(fs.readFileSync('locales/en.json', 'utf8'));

for (const code of ['da', 'de', 'no', 'sv', 'fr', 'it', 'pt']) {
  const loc = JSON.parse(fs.readFileSync(`locales/${code}.json`, 'utf8'));
  const needs = keys.filter((k) => {
    const v = loc[k];
    const e = en[k];
    if (!v || !e) return false;
    if (v !== e) return false;
    // skip short / brand / shared
    if (e.length < 25) return false;
    if (/^(Andrés|Esteban|María|Carlos|Elena|TheBee|Dragon|Calafate|Retór|Florer|Dahuss|Radio|Ruiz|Familia|Irigoyen)/i.test(e)) return false;
    if (/USD|SEO|GEO|Care|WhatsApp|FAQ|Landing pages|Full-Stack|Marketplaces/i.test(e) && e.length < 40) return false;
    return true;
  });
  console.log(`\n=== ${code} still English long strings (${needs.length}) ===`);
  needs.forEach((k) => console.log(k));
}
