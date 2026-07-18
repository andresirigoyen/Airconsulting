import fs from 'node:fs';

const html = fs.readFileSync('index.html', 'utf8');

// Strip script/style
const body = html
  .replace(/<script[\s\S]*?<\/script>/gi, '')
  .replace(/<style[\s\S]*?<\/style>/gi, '')
  .replace(/<!--[\s\S]*?-->/g, '');

// Find visible text nodes-ish: content between tags that has letters
const chunks = [];
const re = />([^<]{3,})</g;
let m;
while ((m = re.exec(body))) {
  const raw = m[1].replace(/\s+/g, ' ').trim();
  if (!raw) continue;
  if (/^[\d\s.,·|+\-–—→~/USD$€%]+$/.test(raw)) continue;
  // find nearby data-i18n by looking back
  const before = body.slice(Math.max(0, m.index - 300), m.index);
  const i18n = before.match(/data-i18n(?:-html|-placeholder)?=["']([^"']+)["'][^>]{0,200}$/);
  const tag = before.match(/<([a-zA-Z0-9]+)([^>]*)$/);
  chunks.push({
    text: raw.slice(0, 120),
    key: i18n ? i18n[1] : null,
    tag: tag ? tag[1] : '?',
    attrs: tag ? tag[2].slice(0, 80) : '',
  });
}

const noI18n = chunks.filter((c) => !c.key);
const hasSpanish = (t) => /[áéíóúñ¿¡]/i.test(t) || /\b(desde|servicios|proyectos|contacto|equipo|reseñas|cotizar|precios|nosotros|desarrollamos|construimos|formulario|inicio)\b/i.test(t);
const hasEnglish = (t) => /\b(the|and|with|for|from|your|view|case|study|click|play|all|services|pricing|projects|contact|team|reviews|quote|get|ready|build)\b/i.test(t);

console.log('=== NO data-i18n (possible hardcoded mix) ===');
for (const c of noI18n) {
  if (c.text.length < 2) continue;
  if (/^(Irigoyen|Dev|\.|·|—|-|\||→|←)$/i.test(c.text)) continue;
  if (/^(Andrés|Esteban|María|Carlos|Elena|TheBee|Dragon|Calafate|Retór|Florer|Dahuss|Radio|Ruiz|Familia|ENP|WhatsApp|Google|Next\.js|Astro|Vercel|AWS|Azure|SEO|GEO|Care)/i.test(c.text) && c.text.length < 40) continue;
  const flag = hasSpanish(c.text) ? 'ES' : hasEnglish(c.text) ? 'EN' : '?';
  console.log(`[${flag}] <${c.tag}> ${c.text}`);
}

const es = JSON.parse(fs.readFileSync('locales/es.json', 'utf8'));
const en = JSON.parse(fs.readFileSync('locales/en.json', 'utf8'));
const keys = [...new Set([...html.matchAll(/data-i18n(?:-html|-placeholder|-content)?=["']([^"']+)["']/g)].map((x) => x[1]))];

console.log('\n=== Homepage keys where ES looks English ===');
for (const k of keys) {
  const v = es[k] || '';
  if (!v) continue;
  if (hasEnglish(v) && !hasSpanish(v) && v.length > 25 && !/Irigoyen|WhatsApp|SEO|GEO|Care|USD|Full-Stack|Landing|Marketplace|Google|TheBee|Dragon/i.test(v)) {
    console.log(k, '=>', v.slice(0, 100));
  }
}

console.log('\n=== Homepage keys where EN looks Spanish ===');
for (const k of keys) {
  const v = en[k] || '';
  if (!v) continue;
  if (hasSpanish(v) && v.length > 8 && !/^(Andrés|María|Carlos|Elena|Florería|Retórica)/.test(v)) {
    console.log(k, '=>', v.slice(0, 100));
  }
}

// HTML fallback language vs key language mismatch heuristics
console.log('\n=== HTML fallback vs key (ES page default) where fallback is English ===');
for (const c of chunks) {
  if (!c.key) continue;
  if (hasEnglish(c.text) && !hasSpanish(c.text) && c.text.length > 15) {
    const esVal = es[c.key] || '';
    if (hasSpanish(esVal) || /[áéíóúñ¿¡]/i.test(esVal)) {
      console.log(c.key, '| HTML:', c.text.slice(0, 70), '| ES:', esVal.slice(0, 70));
    }
  }
}
