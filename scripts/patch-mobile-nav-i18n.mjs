import fs from 'node:fs';

function patch(code, map) {
  const p = `locales/${code}.json`;
  const j = JSON.parse(fs.readFileSync(p, 'utf8'));
  Object.assign(j, map);
  fs.writeFileSync(p, JSON.stringify(j, null, 2) + '\n');
}

patch('da', {
  'nav.mobile.home': 'Hjem',
  'nav.mobile.projects': 'Projekter',
  'gbp.r1.role': 'Drift · TheBeeBaby',
});
patch('no', {
  'nav.mobile.home': 'Hjem',
  'nav.mobile.projects': 'Prosjekter',
  'gbp.r1.role': 'Drift · TheBeeBaby',
});
patch('de', {
  'nav.mobile.home': 'Start',
  'nav.mobile.projects': 'Projekte',
  'gbp.r1.role': 'Betrieb · TheBeeBaby',
  'form.service.careGrowth': 'Care + Growth — Wartung + SEO/Ads',
});
patch('sv', {
  'nav.mobile.home': 'Hem',
  'nav.mobile.projects': 'Projekt',
  'gbp.r1.role': 'Drift · TheBeeBaby',
});
patch('fr', {
  'nav.mobile.home': 'Accueil',
  'nav.mobile.projects': 'Projets',
  'gbp.r1.role': 'Opérations · TheBeeBaby',
  'form.service.careGrowth': 'Care + Growth — maintenance + SEO/ads',
});
patch('it', {
  'nav.mobile.home': 'Home',
  'nav.mobile.projects': 'Progetti',
  'gbp.r1.role': 'Operazioni · TheBeeBaby',
});
patch('pt', {
  'nav.mobile.home': 'Início',
  'nav.mobile.projects': 'Projetos',
  'gbp.r1.role': 'Operações · TheBeeBaby',
});

const en = JSON.parse(fs.readFileSync('locales/en.json', 'utf8'));
const html = fs.readFileSync('index.html', 'utf8');
const keys = [
  ...new Set(
    [...html.matchAll(/data-i18n(?:-html|-placeholder|-content)?=["']([^"']+)["']/g)].map((m) => m[1])
  ),
];

for (const code of ['da', 'no', 'de', 'sv', 'fr', 'it', 'pt']) {
  const loc = JSON.parse(fs.readFileSync(`locales/${code}.json`, 'utf8'));
  const needs = keys.filter((k) => {
    const v = loc[k];
    const e = en[k];
    if (!v || !e || v !== e) return false;
    if (e.length < 20) return false;
    if (/^(Andrés|Esteban|María|Carlos|Elena|TheBee|Dragon|Calafate|Retór|Florer|Dahuss|Radio|Ruiz|Familia)/i.test(e))
      return false;
    return true;
  });
  console.log(
    code,
    'leftovers',
    needs.length,
    needs.join(',') || '-',
    '|',
    loc['cta.calendly'],
    '|',
    loc['nav.mobile.home']
  );
}
