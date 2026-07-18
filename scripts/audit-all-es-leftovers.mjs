import fs from 'node:fs';

const html = fs.readFileSync('index.html', 'utf8');
const keys = [...new Set([...html.matchAll(/data-i18n(?:-html|-placeholder|-content|-aria)?=["']([^"']+)["']/g)].map((m) => m[1]))];

const sample = [
  'cta.calendly', 'services.ctaQuote', 'services.ctaCare', 'services.ctaPrice',
  'projects.title', 'projects.subtitle', 'filter.all', 'filter.ecommerce',
  'proj.calafate.desc', 'proj.calafate.link', 'proj.dragonmart.link',
  'contact.budget', 'form.submit', 'hero.title', 'hero.desc',
];

for (const code of ['es', 'en', 'da', 'de', 'fr', 'it', 'no', 'pt', 'sv']) {
  const loc = JSON.parse(fs.readFileSync(`locales/${code}.json`, 'utf8'));
  const miss = keys.filter((k) => !loc[k]);
  console.log(`\n${code} missing ${miss.length}`);
  for (const k of sample) {
    console.log(`  ${k} => ${(loc[k] || 'MISSING').slice(0, 70)}`);
  }
}

// Full-locale Spanish leftovers (not just homepage) for secondary langs
const UNIQUE = /[¿¡]|\b(cuéntame|cuéntanos|reseñas|teléfono|cotizar este|desarrollamos|construimos|rango de inversión|cambiar tema|abrir menú|chatear por|saltar al|proyectos destacados|formulario de contacto|enviar mensaje|haz clic|ver caso|todos los servicios|disponible para trabajar)\b/i;

console.log('\n=== ALL-KEYS Spanish leftovers (non-ES) ===');
for (const code of ['en', 'da', 'de', 'fr', 'it', 'no', 'pt', 'sv']) {
  const loc = JSON.parse(fs.readFileSync(`locales/${code}.json`, 'utf8'));
  const hits = Object.entries(loc).filter(([, v]) => typeof v === 'string' && UNIQUE.test(v));
  console.log(`\n${code}: ${hits.length}`);
  hits.slice(0, 25).forEach(([k, v]) => console.log(' ', k, '=>', v.slice(0, 100)));
}
