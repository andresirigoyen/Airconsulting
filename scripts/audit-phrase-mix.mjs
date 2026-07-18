import fs from 'node:fs';

const html = fs.readFileSync('index.html', 'utf8');
const keys = [...new Set([...html.matchAll(/data-i18n(?:-html|-placeholder|-content|-aria)?=["']([^"']+)["']/g)].map((m) => m[1]))];

const SPANISH_ONLY =
  /\b(cuéntame|cuéntanos|reseñas|teléfono|presupuesto|desarrollamos|construimos|cotizar|contratar|nosotros|nuestro|nuestros|escribe|aquí|también|más información|ver caso|rango de inversión|disponible para|enviar mensaje|selecciona|cambiar tema|abrir menú|chatear por|saltar al|desde ~USD|desde ~€)\b/i;

const ENGLISH_PHRASES =
  /\b(View Case Study|Investment Range|Tell me about|Get in touch|Available for work|Hire us|Click to play|All projects|Contact Me|Skip to content|Toggle theme|Open menu|Chat on WhatsApp)\b/i;

const locales = ['en', 'da', 'de', 'fr', 'it', 'no', 'pt', 'sv'];

for (const code of locales) {
  const loc = JSON.parse(fs.readFileSync(`locales/${code}.json`, 'utf8'));
  const hits = [];
  for (const k of keys) {
    const v = loc[k] || '';
    if (!v) continue;
    if (code !== 'en' && SPANISH_ONLY.test(v)) hits.push(['ES', k, v.slice(0, 120)]);
    if (code !== 'en' && ENGLISH_PHRASES.test(v)) hits.push(['EN', k, v.slice(0, 120)]);
    if (code === 'en' && SPANISH_ONLY.test(v)) hits.push(['ES', k, v.slice(0, 120)]);
  }
  console.log(`\n=== ${code.toUpperCase()} phrase hits (${hits.length}) ===`);
  hits.forEach(([lang, k, v]) => console.log(`[${lang}] ${k} => ${v}`));
}

// Also compare budget options across langs for consistency
console.log('\n=== budget opts snapshot ===');
for (const code of ['es', 'en', 'da', 'de', 'fr', 'it', 'no', 'pt', 'sv']) {
  const loc = JSON.parse(fs.readFileSync(`locales/${code}.json`, 'utf8'));
  console.log(code, '|', loc['contact.budget.opt2'], '|', loc['contact.budget.opt3'], '|', loc['team.andres.role'], '|', loc['gbp.r3.role']);
}
