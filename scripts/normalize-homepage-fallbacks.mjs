/**
 * Normalize index.html data-i18n fallbacks to Spanish (es.json).
 * Fixes mixed ES/EN visible before/during i18n load.
 */
import fs from 'node:fs';

const es = JSON.parse(fs.readFileSync('locales/es.json', 'utf8'));
let html = fs.readFileSync('index.html', 'utf8');

function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const keys = [
  ...new Set(
    [...html.matchAll(/data-i18n(?:-html|-placeholder)?=["']([^"']+)["']/g)].map((m) => m[1])
  ),
];

let updated = 0;
for (const key of keys) {
  const val = es[key];
  if (!val) continue;

  // data-i18n="key">...</any>
  const re = new RegExp(
    `(data-i18n="${escapeRe(key)}">)([\\s\\S]*?)(</)`,
    'g'
  );
  html = html.replace(re, (match, a, old, c) => {
    // Only replace if leaf-ish content (no nested tags) OR old differs
    if (old.includes('<') && old.includes('data-i18n')) return match;
    if (old.includes('<')) {
      // has nested tags without data-i18n in old — skip unsafe
      if (/<[a-z]/i.test(old)) return match;
    }
    const cleanOld = old.replace(/\s+/g, ' ').trim();
    const cleanVal = val.replace(/\s+/g, ' ').trim();
    if (cleanOld === cleanVal) return match;
    updated++;
    return a + val + c;
  });

  // data-i18n-html
  const reHtml = new RegExp(
    `(data-i18n-html="${escapeRe(key)}">)([\\s\\S]*?)(</)`,
    'g'
  );
  html = html.replace(reHtml, (match, a, old, c) => {
    if (old === val) return match;
    updated++;
    return a + val + c;
  });

  // placeholders
  const rePh = new RegExp(
    `data-i18n-placeholder="${escapeRe(key)}"([^>]*?)placeholder="[^"]*"`,
    'g'
  );
  html = html.replace(rePh, (match, mid) => {
    updated++;
    return `data-i18n-placeholder="${key}"${mid}placeholder="${val.replace(/"/g, '&quot;')}"`;
  });
}

// Skip link
html = html.replace(
  /<a class="skip-link" href="#about">[^<]*<\/a>/,
  '<a class="skip-link" href="#about" data-i18n="a11y.skip">Saltar al contenido</a>'
);

fs.writeFileSync('index.html', html);
console.log('Fallbacks updated:', updated);

// Ensure a11y.skip in locales
const skip = {
  es: 'Saltar al contenido',
  en: 'Skip to content',
  da: 'Spring til indhold',
  no: 'Hopp til innhold',
  de: 'Zum Inhalt springen',
  sv: 'Hoppa till innehållet',
  fr: 'Aller au contenu',
  it: 'Vai al contenuto',
  pt: 'Saltar para o conteúdo',
};
for (const [code, text] of Object.entries(skip)) {
  const p = `locales/${code}.json`;
  const j = JSON.parse(fs.readFileSync(p, 'utf8'));
  j['a11y.skip'] = text;
  fs.writeFileSync(p, JSON.stringify(j, null, 2) + '\n');
}
console.log('a11y.skip added to all locales');
