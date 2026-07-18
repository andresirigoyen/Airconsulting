import fs from 'node:fs';

const html = fs.readFileSync('index.html', 'utf8');
const keys = [...new Set([...html.matchAll(/data-i18n(?:-html|-placeholder|-content|-aria)?=["']([^"']+)["']/g)].map((m) => m[1]))];

// Words/phrases that are Spanish and NOT normal in PT/FR/IT/DA/etc.
const UNIQUE_ES = [
  /[¿¡]/,
  /\bcuéntame\b/i,
  /\bcuéntanos\b/i,
  /\breseñas\b/i,
  /\bteléfono\b/i,
  /\btambién\b/i,
  /\baquí\b/i,
  /\bcotizar\b/i,
  /\bdesarrollamos\b/i,
  /\bconstruimos\b/i,
  /\brango de inversión\b/i,
  /\bver caso\b/i,
  /\bestudio de caso\b/i,
  /\bdisponible para\b/i,
  /\bcambiar tema\b/i,
  /\babrir menú\b/i,
  /\bchatear por\b/i,
  /\bsaltar al\b/i,
  /\bnosotros\b/i,
  /\bnuestro equipo\b/i,
  /\bproyectos destacados\b/i,
  /\btodos los servicios\b/i,
  /\bformulario de contacto\b/i,
  /\bescribe\b/i,
  /\benviar mensaje\b/i,
  /\bselecciona\b/i,
  /\bopcional\b/i,
  /\bpresupuesto\b/i,
  /\bmás info\b/i,
  /\bhaz clic\b/i,
  /\bver más\b/i,
  /\binicio\b/i,
  /\bequipo\b/i,
  /\bservicios\b/i,
  /\bproyectos\b/i,
  /\bcontacto\b/i,
  /\bprecios\b/i,
];

const UNIQUE_EN = [
  /\bView Case Study\b/i,
  /\bInvestment Range\b/i,
  /\bTell me about\b/i,
  /\bGet in touch\b/i,
  /\bAvailable for work\b/i,
  /\bHire us\b/i,
  /\bClick to play\b/i,
  /\bContact Me\b/i,
  /\bSkip to content\b/i,
  /\bToggle theme\b/i,
  /\bOpen menu\b/i,
  /\bChat on WhatsApp\b/i,
  /\bAll Projects\b/i,
  /\bOur Team\b/i,
  /\bReady to grow\b/i,
  /\bSend message\b/i,
];

for (const code of ['en', 'da', 'de', 'fr', 'it', 'no', 'pt', 'sv']) {
  const loc = JSON.parse(fs.readFileSync(`locales/${code}.json`, 'utf8'));
  const hits = [];
  for (const k of keys) {
    const v = loc[k] || '';
    if (!v) continue;
    for (const re of UNIQUE_ES) {
      if (re.test(v)) {
        // allow brand Florería / names
        if (/Florería|Retórica|Andrés/.test(v) && !/[¿¡]|cuént|reseñas|teléfono|cotizar|desarrollamos|rango de|ver caso|cambiar tema|abrir menú|chatear|saltar al|proyectos destacados|formulario de|enviar mensaje|selecciona|presupuesto|haz clic/.test(v)) {
          continue;
        }
        // PT shares some: servicios->serviços, etc. Only flag if exact Spanish form
        if (code === 'pt') {
          if (!/[¿¡]|cuént|reseñas|teléfono|cotizar|desarrollamos|construimos|rango de inversión|ver caso|disponible para|cambiar tema|abrir menú|chatear por|saltar al|nuestro equipo|proyectos destacados|todos los servicios|formulario de contacto|enviar mensaje|selecciona|presupuesto|haz clic|ver más|también|aquí/.test(v)) continue;
        }
        hits.push(['ES', k, v.slice(0, 130)]);
        break;
      }
    }
    if (code !== 'en') {
      for (const re of UNIQUE_EN) {
        if (re.test(v)) {
          hits.push(['EN', k, v.slice(0, 130)]);
          break;
        }
      }
    }
  }
  console.log(`\n=== ${code.toUpperCase()} unique-mix (${hits.length}) ===`);
  hits.forEach(([lang, k, v]) => console.log(`[${lang}] ${k} => ${v}`));
}

// Spot-check critical UI strings
const critical = [
  'nav.services', 'nav.projects', 'nav.contact', 'nav.pricing', 'hero.cta', 'hero.ctaSecondary',
  'projects.cta', 'proj.calafate.cta', 'about.card.btn', 'form.submit', 'footer.linkHome',
  'a11y.theme', 'a11y.menu', 'a11y.whatsapp', 'lead.stickyContact', 'filter.all',
];
console.log('\n=== critical UI per lang ===');
for (const code of ['es', 'en', 'da', 'de', 'fr', 'it', 'no', 'pt', 'sv']) {
  const loc = JSON.parse(fs.readFileSync(`locales/${code}.json`, 'utf8'));
  console.log('\n' + code + ':');
  for (const k of critical) {
    console.log(' ', k, '=>', (loc[k] || 'MISSING').slice(0, 80));
  }
}
