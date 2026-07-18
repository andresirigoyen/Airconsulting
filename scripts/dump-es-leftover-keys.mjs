import fs from 'node:fs';

const UNIQUE = /[¿¡]|\b(cuéntame|cuéntanos|reseñas|teléfono|cotizar este|desarrollamos|construimos|rango de inversión|cambiar tema|abrir menú|chatear por|saltar al|proyectos destacados|formulario de contacto|enviar mensaje|haz clic|ver caso|todos los servicios|disponible para trabajar|buscas centralizar|construyendo un sitio)\b/i;

for (const code of ['en', 'da', 'de', 'fr', 'it', 'no', 'pt', 'sv']) {
  const loc = JSON.parse(fs.readFileSync(`locales/${code}.json`, 'utf8'));
  const hits = Object.entries(loc).filter(([, v]) => typeof v === 'string' && UNIQUE.test(v));
  console.log(`\n${code}: ${hits.length}`);
  hits.forEach(([k, v]) => console.log(' ', k, '=>', v));
}

// Also show EN/ES reference for the broken keys
const es = JSON.parse(fs.readFileSync('locales/es.json', 'utf8'));
const en = JSON.parse(fs.readFileSync('locales/en.json', 'utf8'));
const keys = [
  'cta.calafate.title', 'cta.rluabogados.title',
  'svc.platformCta', 'landing.caseCta', 'shop.caseCta',
];
console.log('\n=== refs ===');
for (const k of keys) {
  console.log(k);
  console.log('  es:', es[k]);
  console.log('  en:', en[k]);
  for (const code of ['da', 'de', 'fr', 'it', 'no', 'pt', 'sv']) {
    const loc = JSON.parse(fs.readFileSync(`locales/${code}.json`, 'utf8'));
    console.log(`  ${code}:`, loc[k]);
  }
}
