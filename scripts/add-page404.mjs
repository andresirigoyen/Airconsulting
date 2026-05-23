import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'locales');
const en = JSON.parse(fs.readFileSync(path.join(dir, 'en.json'), 'utf8'));

const page404 = {
  fr: {
    'page404.desc': "Oups ! La page que vous cherchez n'existe pas.",
    'page404.back': "Retour à l'accueil",
    'page404.title': '404 Introuvable | IrigoyenDev',
    'page404.metaDesc': 'Page introuvable.',
  },
  pt: {
    'page404.desc': 'Ops! A página que procura não existe.',
    'page404.back': 'Voltar ao início',
    'page404.title': '404 Não encontrado | IrigoyenDev',
    'page404.metaDesc': 'Página não encontrada.',
  },
  it: {
    'page404.desc': 'Ops! La pagina che cerchi non esiste.',
    'page404.back': 'Torna alla home',
    'page404.title': '404 Non trovato | IrigoyenDev',
    'page404.metaDesc': 'Pagina non trovata.',
  },
};

for (const [code, extra] of Object.entries(page404)) {
  const data = { ...JSON.parse(fs.readFileSync(path.join(dir, `${code}.json`), 'utf8')), ...extra };
  const ordered = {};
  for (const key of Object.keys(en)) ordered[key] = data[key];
  fs.writeFileSync(path.join(dir, `${code}.json`), JSON.stringify(ordered, null, 2) + '\n');
  console.log(`${code}: ${Object.keys(ordered).length} keys`);
}
