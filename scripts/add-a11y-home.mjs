import fs from 'fs';
import path from 'path';

const dir = 'locales';
const values = {
  es: 'IrigoyenDev — Inicio',
  en: 'IrigoyenDev — Home',
  da: 'IrigoyenDev — Hjem',
  de: 'IrigoyenDev — Startseite',
  fr: 'IrigoyenDev — Accueil',
  it: 'IrigoyenDev — Home',
  no: 'IrigoyenDev — Hjem',
  pt: 'IrigoyenDev — Início',
  sv: 'IrigoyenDev — Startsida',
};

for (const [lang, value] of Object.entries(values)) {
  const file = path.join(dir, `${lang}.json`);
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  data['a11y.home'] = value;
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
  console.log('ok', lang);
}
