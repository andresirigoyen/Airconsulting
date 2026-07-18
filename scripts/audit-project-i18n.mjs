import fs from 'node:fs';
import path from 'node:path';

const projectDir = 'projects';
const files = fs.readdirSync(projectDir).filter((f) => f.endsWith('.html'));

const keyRe = /data-i18n(?:-html|-placeholder|-content|-aria)?=["']([^"']+)["']/g;
const keys = new Set();
for (const f of files) {
  const html = fs.readFileSync(path.join(projectDir, f), 'utf8');
  for (const m of html.matchAll(keyRe)) keys.add(m[1]);
}

const keyList = [...keys].sort();
const en = JSON.parse(fs.readFileSync('locales/en.json', 'utf8'));
const es = JSON.parse(fs.readFileSync('locales/es.json', 'utf8'));

const report = { totalProjectKeys: keyList.length, byLang: {} };

for (const code of ['da', 'de', 'fr', 'it', 'no', 'pt', 'sv']) {
  const loc = JSON.parse(fs.readFileSync(`locales/${code}.json`, 'utf8'));
  const missing = [];
  const sameAsEn = [];
  for (const k of keyList) {
    const v = loc[k];
    if (!v) {
      missing.push(k);
      continue;
    }
    if (!en[k]) continue;
    if (v !== en[k]) continue;
    if (v.length < 25) continue;
    // brand/name skips
    if (/^(Andrés|Esteban|María|Carlos|Elena|TheBee|Dragon|Calafate|Retór|Florer|Dahuss|Radio|Ruiz|Familia|Irigoyen)/i.test(v)) continue;
    if (/^proj\.[^.]+\.(title|name)$/.test(k)) continue;
    sameAsEn.push(k);
  }
  report.byLang[code] = { missing: missing.length, sameAsEn: sameAsEn.length, keys: sameAsEn, missingKeys: missing };
  console.log(`${code}: missing ${missing.length}, sameAsEN ${sameAsEn.length}`);
}

fs.writeFileSync('scripts/_project-i18n-audit.json', JSON.stringify({ keys: keyList, report }, null, 2));
console.log('wrote scripts/_project-i18n-audit.json');
console.log('unique keys needing translation (union):', new Set(Object.values(report.byLang).flatMap((r) => r.keys)).size);
