import fs from 'node:fs';

const html = fs.readFileSync('index.html', 'utf8');
const es = JSON.parse(fs.readFileSync('locales/es.json', 'utf8'));
const en = JSON.parse(fs.readFileSync('locales/en.json', 'utf8'));

const re = /data-i18n(?:-html|-placeholder|-content)?=["']([^"']+)["']/g;
const keys = [...html.matchAll(re)].map((m) => m[1]);
const unique = [...new Set(keys)];

const missingEs = unique.filter((k) => !(k in es));
const missingEn = unique.filter((k) => !(k in en));

const sameAsEs = unique.filter((k) => {
  if (!en[k] || !es[k] || en[k] !== es[k]) return false;
  // names / brands ok to match
  if (/^(Andrés|Esteban|María|Carlos|Elena|TheBee|Dragon|Calafate|Retór|Florer|Dahuss|Radio|Ruiz|Familia)/i.test(en[k])) return false;
  if (en[k].length < 3) return false;
  return true;
});

const stillSpanish = unique.filter((k) => {
  const v = en[k] || '';
  return (
    /[áéíóúñ¿¡]/i.test(v) ||
    /\b(desde|hasta|nuestro|nosotros|cotizar|servicios|proyectos|contacto|escribe|formulario|contratar|desarrollamos|construimos)\b/i.test(v)
  );
});

const firstPerson = unique.filter((k) => {
  const v = en[k] || '';
  return /\b(I |I'm | my | me )\b/i.test(` ${v} `) && !/family|email|WhatsApp/i.test(v);
});

const report = {
  totalKeys: unique.length,
  missingEs,
  missingEn,
  sameAsEs: sameAsEs.map((k) => ({ k, v: en[k] })),
  stillSpanish: stillSpanish.map((k) => ({ k, v: en[k] })),
  firstPerson: firstPerson.map((k) => ({ k, v: en[k] })),
  pairs: unique.map((k) => ({ k, es: es[k] || null, en: en[k] || null })),
};

fs.writeFileSync('scripts/_homepage-en-audit.json', JSON.stringify(report, null, 2));
console.log(JSON.stringify({
  totalKeys: report.totalKeys,
  missingEs: missingEs.length,
  missingEn: missingEn.length,
  sameAsEs: sameAsEs.length,
  stillSpanish: stillSpanish.length,
  firstPerson: firstPerson.length,
}, null, 2));
console.log('\n--- SAME AS ES ---');
sameAsEs.forEach((k) => console.log(k, '=>', en[k]));
console.log('\n--- STILL SPANISH ---');
stillSpanish.forEach((k) => console.log(k, '=>', en[k]));
console.log('\n--- FIRST PERSON ---');
firstPerson.forEach((k) => console.log(k, '=>', en[k]));
