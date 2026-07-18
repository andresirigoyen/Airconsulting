import fs from 'node:fs';

const html = fs.readFileSync('index.html', 'utf8');
const locales = ['es', 'en', 'da', 'de', 'fr', 'it', 'no', 'pt', 'sv'];
const data = Object.fromEntries(
  locales.map((c) => [c, JSON.parse(fs.readFileSync(`locales/${c}.json`, 'utf8'))])
);

const re = /data-i18n(?:-html|-placeholder|-content)?=["']([^"']+)["']/g;
const keys = [...new Set([...html.matchAll(re)].map((m) => m[1]))];

const es = data.es;
const en = data.en;

function looksSpanish(v) {
  if (!v) return true;
  return (
    /[áéíóúñ¿¡]/i.test(v) ||
    /\b(desde|hasta|nuestro|nosotros|cotizar|servicios|proyectos|contacto|escribe|formulario|contratar|desarrollamos|construimos|precios|equipo|reseñas)\b/i.test(
      v
    )
  );
}

const report = {};
for (const code of locales) {
  if (code === 'es' || code === 'en') continue;
  const loc = data[code];
  const missing = keys.filter((k) => !(k in loc));
  const sameAsEs = keys.filter((k) => loc[k] && es[k] && loc[k] === es[k] && looksSpanish(loc[k]) && loc[k].length > 12);
  const sameAsEn = keys.filter((k) => loc[k] && en[k] && loc[k] === en[k]);
  report[code] = {
    missing: missing.length,
    stillSpanish: sameAsEs.length,
    stillSpanishKeys: sameAsEs.slice(0, 30),
    identicalToEn: sameAsEn.length,
  };
}

console.log(JSON.stringify(report, null, 2));
fs.writeFileSync('scripts/_homepage-langs-audit.json', JSON.stringify({ keys: keys.length, report }, null, 2));
