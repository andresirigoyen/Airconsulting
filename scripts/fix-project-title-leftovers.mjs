import fs from 'node:fs';

const fixes = {
  da: {
    'proj.familiainternacional.step2Title': '2 — Interface-design (UI)',
    'proj.radiochicureo.feat1Title': 'Live-afspiller & performance',
    'proj.radiochicureo.feat2Title': 'Konsolideret database-CMS',
    'proj.radiochicureo.step3Title': '3 — Integration af audio-streaming',
    'proj.radiochicureo.step4Title': '4 — CMS & driftspanel',
  },
  no: {
    'proj.radiochicureo.step3Title': '3 — Integrasjon av lydstrømming',
  },
  sv: {
    'proj.radiochicureo.feat2Title': 'Konsoliderat databas-CMS',
    'proj.radiochicureo.step3Title': '3 — Integration av ljudströmning',
    'proj.radiochicureo.step4Title': '4 — CMS & driftspanel',
  },
};

for (const [code, map] of Object.entries(fixes)) {
  const path = `locales/${code}.json`;
  const loc = JSON.parse(fs.readFileSync(path, 'utf8'));
  for (const [k, v] of Object.entries(map)) loc[k] = v;
  fs.writeFileSync(path, JSON.stringify(loc, null, 2) + '\n');
  console.log('fixed', code, Object.keys(map).length);
}
