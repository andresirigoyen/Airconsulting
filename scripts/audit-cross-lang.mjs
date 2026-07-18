import fs from 'node:fs';

const html = fs.readFileSync('index.html', 'utf8');
const locales = ['es', 'en', 'da', 'de', 'fr', 'it', 'no', 'pt', 'sv'];
const data = Object.fromEntries(
  locales.map((c) => [c, JSON.parse(fs.readFileSync(`locales/${c}.json`, 'utf8'))])
);

const re = /data-i18n(?:-html|-placeholder|-content|-aria)?=["']([^"']+)["']/g;
const keys = [...new Set([...html.matchAll(re)].map((m) => m[1]))];

const es = data.es;
const en = data.en;

const SPANISH_MARKERS =
  /\b(desde|hasta|nuestro|nosotros|cotizar|servicios|proyectos|contacto|escribe|formulario|contratar|desarrollamos|construimos|precios|equipo|reseñas|inicio|ver|más|todos|sobre|con|para|tu|tus|una|unas|este|esta|disponible|trabajo|plataforma|estudio|caso|inversión|rango|cuéntame|cuéntanos|enviar|mensaje|nombre|correo|teléfono|presupuesto|opcional|selecciona|seleccione|cerrar|abrir|cambiar|idioma|tema|chatear|saltar|contenido|landing|tienda|online|mantenimiento|básico|avanzado|digital|marketing|general|sitio)\b/i;

const ENGLISH_MARKERS =
  /\b(the|and|with|for|from|your|our|view|case|study|click|play|all|services|pricing|projects|contact|team|reviews|quote|get|ready|build|about|available|work|platform|investment|range|tell|send|message|name|email|phone|budget|optional|select|close|open|toggle|theme|language|chat|skip|content|shop|maintenance|basic|advanced|digital|marketing|general|site|hire|we|develop|build|price|prices)\b/i;

function looksSpanish(v) {
  if (!v) return false;
  return /[áéíóúñ¿¡]/i.test(v) || SPANISH_MARKERS.test(v);
}

function looksEnglish(v) {
  if (!v) return false;
  return ENGLISH_MARKERS.test(v) && !looksSpanish(v);
}

function isBrandOrShared(k, v) {
  if (!v) return true;
  if (v.length < 18) return true;
  if (/^(Andrés|Esteban|María|Carlos|Elena|TheBee|Dragon|Calafate|Retór|Florer|Dahuss|Radio|Ruiz|Familia|Irigoyen|WhatsApp|Google|SEO|GEO|Care|FAQ|USD|EUR|CLP|DKK|NOK)/i.test(v)) return true;
  if (/IrigoyenDev|WhatsApp|PageSpeed|Mercado Libre|Google Business|Full-Stack|Marketplaces/i.test(v) && v.length < 45) return true;
  // project titles often shared
  if (/^proj\.[^.]+\.title$/.test(k)) return true;
  if (/^team\.[^.]+\.name$/.test(k)) return true;
  if (/^lang\./.test(k)) return true;
  return false;
}

const report = {};

for (const code of locales) {
  if (code === 'es') continue;
  const loc = data[code];
  const missing = keys.filter((k) => !(k in loc) || !loc[k]);
  const identicalToEs = [];
  const identicalToEn = [];
  const spanishResidue = [];
  const englishResidue = [];

  for (const k of keys) {
    const v = loc[k];
    if (!v) continue;
    if (isBrandOrShared(k, v)) continue;

    if (code !== 'en' && es[k] && v === es[k] && looksSpanish(v)) {
      identicalToEs.push({ k, v: v.slice(0, 100) });
    }
    if (code !== 'en' && en[k] && v === en[k] && v.length > 22) {
      identicalToEn.push({ k, v: v.slice(0, 100) });
    }
    // Spanish leftovers even if not identical to es (partial mix)
    if (code !== 'en' && looksSpanish(v) && !looksEnglish(v)) {
      // Romance langs may share accents — require stronger Spanish markers
      if (/[¿¡]/.test(v) || /\b(nosotros|desarrollamos|construimos|cotizar|cuéntame|cuéntanos|reseñas|teléfono|presupuesto)\b/i.test(v)) {
        if (!identicalToEs.some((x) => x.k === k)) spanishResidue.push({ k, v: v.slice(0, 100) });
      }
    }
    // English leftovers for non-en (when not identical — rare)
    if (code !== 'en' && looksEnglish(v) && en[k] && v !== en[k] && /\b(View Case Study|Investment Range|Tell me|Get in touch|Available for work)\b/i.test(v)) {
      englishResidue.push({ k, v: v.slice(0, 100) });
    }
  }

  // EN: Spanish leftovers
  if (code === 'en') {
    for (const k of keys) {
      const v = loc[k];
      if (!v || isBrandOrShared(k, v)) continue;
      if (looksSpanish(v) && !/Florería|Retórica|Andrés|María/.test(v)) {
        spanishResidue.push({ k, v: v.slice(0, 100) });
      }
    }
  }

  report[code] = {
    missing: missing.length,
    missingKeys: missing,
    identicalToEs: identicalToEs.length,
    identicalToEsKeys: identicalToEs,
    identicalToEn: identicalToEn.length,
    identicalToEnKeys: identicalToEn.slice(0, 40),
    spanishResidue: spanishResidue.length,
    spanishResidueKeys: spanishResidue,
    englishResidue: englishResidue.length,
    englishResidueKeys: englishResidue,
  };
}

console.log('Homepage keys:', keys.length);
for (const [code, r] of Object.entries(report)) {
  console.log(`\n=== ${code.toUpperCase()} ===`);
  console.log(`missing: ${r.missing}`);
  console.log(`identical to ES (Spanish): ${r.identicalToEs}`);
  if (r.identicalToEsKeys.length) r.identicalToEsKeys.forEach((x) => console.log('  ES', x.k, '=>', x.v));
  console.log(`identical to EN (long): ${r.identicalToEn}`);
  if (r.identicalToEnKeys.length) r.identicalToEnKeys.forEach((x) => console.log('  EN', x.k, '=>', x.v));
  console.log(`Spanish residue: ${r.spanishResidue}`);
  if (r.spanishResidueKeys.length) r.spanishResidueKeys.forEach((x) => console.log('  ES?', x.k, '=>', x.v));
  console.log(`English residue: ${r.englishResidue}`);
  if (r.englishResidueKeys.length) r.englishResidueKeys.forEach((x) => console.log('  EN?', x.k, '=>', x.v));
}

fs.writeFileSync('scripts/_cross-lang-audit.json', JSON.stringify({ keys: keys.length, report }, null, 2));
