import fs from 'node:fs';

const html = fs.readFileSync('index.html', 'utf8');
const keys = [...new Set([...html.matchAll(/data-i18n(?:-html|-placeholder|-content)?=["']([^"']+)["']/g)].map((m) => m[1]))];

const es = JSON.parse(fs.readFileSync('locales/es.json', 'utf8'));
const en = JSON.parse(fs.readFileSync('locales/en.json', 'utf8'));

const sections = {};
for (const k of keys) {
  const sec = k.split('.')[0];
  (sections[sec] ||= []).push(k);
}

for (const code of ['da', 'no']) {
  const loc = JSON.parse(fs.readFileSync(`locales/${code}.json`, 'utf8'));
  console.log(`\n################ ${code.toUpperCase()} ################`);
  for (const [sec, ks] of Object.entries(sections)) {
    console.log(`\n---- ${sec} ----`);
    for (const k of ks) {
      const v = loc[k] || '';
      const e = en[k] || '';
      const same = v === e ? ' [EN]' : '';
      console.log(`${k}${same}`);
      console.log(`  ${v.slice(0, 140)}`);
    }
  }
}
