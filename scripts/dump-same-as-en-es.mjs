import fs from 'node:fs';

const html = fs.readFileSync('index.html', 'utf8');
const keys = [...new Set([...html.matchAll(/data-i18n(?:-html|-placeholder|-content|-aria)?=["']([^"']+)["']/g)].map((m) => m[1]))];
const en = JSON.parse(fs.readFileSync('locales/en.json', 'utf8'));
const es = JSON.parse(fs.readFileSync('locales/es.json', 'utf8'));

const skip = (k, v) => {
  if (!v || v.length < 20) return true;
  if (/^proj\.[^.]+\.title$/.test(k)) return true;
  if (/^team\.[^.]+\.name$/.test(k)) return true;
  if (/^about\.card\.name$/.test(k)) return true;
  if (/^gbp\.r\d\.name$/.test(k)) return true;
  if (/^lang\./.test(k)) return true;
  if (/^(Andrés|Esteban|María|Carlos|Elena|TheBeeBaby|DragonMart|Calafate|Retórica|Florería|Dahuss|Radio|Ruiz|Familia|Irigoyen)/i.test(v)) return true;
  return false;
};

for (const code of ['da', 'de', 'fr', 'it', 'no', 'pt', 'sv']) {
  const loc = JSON.parse(fs.readFileSync(`locales/${code}.json`, 'utf8'));
  console.log(`\n======== ${code.toUpperCase()} identical to EN ========`);
  for (const k of keys) {
    const v = loc[k];
    if (!v || v !== en[k]) continue;
    if (skip(k, v)) continue;
    console.log(k, '=>', v.slice(0, 110));
  }
  console.log(`\n======== ${code.toUpperCase()} identical to ES ========`);
  for (const k of keys) {
    const v = loc[k];
    if (!v || v !== es[k]) continue;
    if (skip(k, v)) continue;
    if (v.length < 12) continue;
    console.log(k, '=>', v.slice(0, 110));
  }
}
