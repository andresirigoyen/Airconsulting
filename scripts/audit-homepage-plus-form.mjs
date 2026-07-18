import fs from 'node:fs';

const html = fs.readFileSync('index.html', 'utf8');
const keys = [...new Set([...html.matchAll(/data-i18n(?:-html|-placeholder|-content|-aria)?=["']([^"']+)["']/g)].map((m) => m[1]))];
// form messages used in JS on homepage
keys.push('form.success', 'form.error', 'form.errorEmail');

const en = JSON.parse(fs.readFileSync('locales/en.json', 'utf8'));
const es = JSON.parse(fs.readFileSync('locales/es.json', 'utf8'));

for (const code of ['da', 'de', 'fr', 'it', 'no', 'pt', 'sv']) {
  const loc = JSON.parse(fs.readFileSync(`locales/${code}.json`, 'utf8'));
  const sameEn = [];
  const sameEs = [];
  for (const k of keys) {
    const v = loc[k];
    if (!v) continue;
    if (en[k] && v === en[k] && v.length > 20) sameEn.push([k, v.slice(0, 90)]);
    if (es[k] && v === es[k] && /[áéíóúñ¿¡]/i.test(v) && v.length > 12) sameEs.push([k, v.slice(0, 90)]);
  }
  console.log(`\n${code} homepage+form sameAsEN: ${sameEn.length}`);
  sameEn.forEach(([k, v]) => console.log('  EN', k, '=>', v));
  console.log(`${code} homepage+form sameAsES: ${sameEs.length}`);
  sameEs.forEach(([k, v]) => console.log('  ES', k, '=>', v));
}

console.log('\nES refs:', es['form.success'], '|', es['form.error'], '|', es['form.errorEmail']);
console.log('EN refs:', en['form.success'], '|', en['form.error'], '|', en['form.errorEmail']);
