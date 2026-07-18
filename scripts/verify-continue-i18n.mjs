import fs from 'node:fs';

const html = fs.readFileSync('index.html', 'utf8');
const keys = [...new Set([...html.matchAll(/data-i18n(?:-html|-placeholder|-content)?=["']([^"']+)["']/g)].map((m) => m[1]))];
const en = JSON.parse(fs.readFileSync('locales/en.json', 'utf8'));
const langs = ['da', 'no', 'de', 'sv', 'fr', 'it', 'pt'];

const critical = [
  'cta.calendly',
  'filter.all',
  'filter.local',
  'filter.events',
  'filter.realestate',
  'form.submit',
  'lead.eyebrow',
  'gbp.title',
  'gbp.score',
  'team.esteban.role',
  'footer.siteHeading',
  'proj.thebeebaby.title',
  'proj.dahuss.title',
];

console.log('=== Critical keys ===');
for (const code of langs) {
  const j = JSON.parse(fs.readFileSync(`locales/${code}.json`, 'utf8'));
  console.log(`\n-- ${code} --`);
  for (const k of critical) {
    const v = j[k] || '';
    const bad =
      /calendly|15m|15 min|opkald|samtale|Gespräch|appel|call|🗓️/i.test(v) ||
      (k.startsWith('filter.') && v === en[k]) ||
      (['form.submit', 'lead.eyebrow'].includes(k) && v === en[k]);
    console.log(`${bad ? '!!' : 'OK'} ${k}: ${v.slice(0, 90)}`);
  }
}

console.log('\n=== Homepage long EN leftovers ===');
for (const code of langs) {
  const loc = JSON.parse(fs.readFileSync(`locales/${code}.json`, 'utf8'));
  const needs = keys.filter((k) => {
    const v = loc[k];
    const e = en[k];
    if (!v || !e || v !== e) return false;
    if (e.length < 20) return false;
    if (/^(Andrés|Esteban|María|Carlos|Elena|TheBee|Dragon|Calafate|Retór|Florer|Dahuss|Radio|Ruiz|Familia)/i.test(e)) return false;
    return true;
  });
  console.log(code, needs.length, needs.slice(0, 15).join(', ') || '-');
}

// missing keys
console.log('\n=== Missing homepage keys ===');
for (const code of ['es', 'en', ...langs]) {
  const j = JSON.parse(fs.readFileSync(`locales/${code}.json`, 'utf8'));
  const miss = keys.filter((k) => !(k in j));
  console.log(code, miss.length);
}
