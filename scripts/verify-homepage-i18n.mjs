import fs from 'node:fs';

const en = JSON.parse(fs.readFileSync('locales/en.json', 'utf8'));
const html = fs.readFileSync('index.html', 'utf8');
const keys = [...new Set([...html.matchAll(/data-i18n(?:-html|-placeholder|-content)?=["']([^"']+)["']/g)].map((m) => m[1]))];

console.log('EN hero.desc:', en['hero.desc']);
console.log('EN faq.a5:', en['faq.a5']);
console.log('EN about.card.btn:', en['about.card.btn']);
console.log('EN about.card.status:', en['about.card.status']);
console.log('EN tools.title:', en['tools.title']);
console.log('EN retorica:', en['proj.retorica.title']);
console.log('EN floreria:', en['proj.floreria.title']);
console.log('EN mkt.priceFrom600:', en['mkt.priceFrom600']);

console.log('\nFR calafate:', JSON.parse(fs.readFileSync('locales/fr.json', 'utf8'))['proj.calafate.desc'].slice(0, 120));
console.log('IT rlu:', JSON.parse(fs.readFileSync('locales/it.json', 'utf8'))['proj.rluabogados.descCard'].slice(0, 120));
console.log('PT calafate:', JSON.parse(fs.readFileSync('locales/pt.json', 'utf8'))['proj.calafate.desc'].slice(0, 120));

for (const code of ['es', 'en', 'da', 'de', 'fr', 'it', 'no', 'pt', 'sv']) {
  const j = JSON.parse(fs.readFileSync(`locales/${code}.json`, 'utf8'));
  const miss = keys.filter((k) => !(k in j));
  console.log(code, 'keys', keys.length, 'missing', miss.length, 'price600', j['mkt.priceFrom600']);
}

// EN quality flags on homepage keys
const flags = [];
for (const k of keys) {
  const v = en[k] || '';
  if (/\bContact Me\b/i.test(v)) flags.push([k, 'Contact Me']);
  if (/\bAvailable for work\b/i.test(v)) flags.push([k, 'Available for work']);
  if (v === 'Retorica') flags.push([k, 'missing accent']);
  if (v.startsWith('Floreria ')) flags.push([k, 'missing accent Floreria']);
}
console.log('\nEN flags:', flags.length ? flags : 'none');
