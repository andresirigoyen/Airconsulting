import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('.');

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) {
      if (['node_modules', '.git', 'scripts', 'locales'].includes(name)) continue;
      walk(p, out);
    } else if (name.endsWith('.html') || name.endsWith('.js')) {
      out.push(p);
    }
  }
  return out;
}

const keys = new Set();
const keyRe = /data-i18n(?:-html|-placeholder|-content|-title|-aria)?=["']([^"']+)["']/g;
const i18nTitleRe = /data-i18n-title=["']([^"']+)["']/g;

for (const file of walk(root)) {
  const text = fs.readFileSync(file, 'utf8');
  let m;
  while ((m = keyRe.exec(text))) {
    if (!m[1].includes('${')) keys.add(m[1]);
  }
  while ((m = i18nTitleRe.exec(text))) {
    if (!m[1].includes('${')) keys.add(m[1]);
  }
}

// Also include known keys from es.json that are critical for home
const es = JSON.parse(fs.readFileSync(path.join(root, 'locales/es.json'), 'utf8'));
const en = JSON.parse(fs.readFileSync(path.join(root, 'locales/en.json'), 'utf8'));

const locales = fs
  .readdirSync(path.join(root, 'locales'))
  .filter((f) => f.endsWith('.json') && !f.startsWith('_'));

const report = {};
for (const loc of locales) {
  const j = JSON.parse(fs.readFileSync(path.join(root, 'locales', loc), 'utf8'));
  const missingFromHtml = [...keys].filter((k) => !(k in j)).sort();
  const missingVsEs = Object.keys(es).filter((k) => !(k in j)).sort();
  report[loc] = {
    htmlKeys: keys.size,
    missingFromHtml: missingFromHtml.length,
    missingFromHtmlKeys: missingFromHtml,
    missingVsEs: missingVsEs.length,
    missingVsEsKeys: missingVsEs.slice(0, 80),
    extraNote: missingVsEs.length > 80 ? `...and ${missingVsEs.length - 80} more` : '',
  };
}

console.log('HTML/JS i18n keys found:', keys.size);
console.log('ES keys:', Object.keys(es).length);
console.log('EN keys:', Object.keys(en).length);
for (const [loc, r] of Object.entries(report)) {
  console.log(`\n=== ${loc} ===`);
  console.log(`missing vs HTML: ${r.missingFromHtml}`);
  if (r.missingFromHtmlKeys.length) console.log(r.missingFromHtmlKeys.join('\n'));
  console.log(`missing vs ES: ${r.missingVsEs}`);
  if (r.missingVsEsKeys.length) console.log(r.missingVsEsKeys.slice(0, 40).join('\n'));
  if (r.extraNote) console.log(r.extraNote);
}

fs.writeFileSync(
  path.join(root, 'scripts/_i18n-audit.json'),
  JSON.stringify({ htmlKeys: [...keys].sort(), report }, null, 2)
);
console.log('\nWrote scripts/_i18n-audit.json');
