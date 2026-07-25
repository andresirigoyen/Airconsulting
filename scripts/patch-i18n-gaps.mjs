/**
 * Patch missing markets.* keys + DA/NO chrome strings still stuck in English.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const localesDir = path.join(root, 'locales');

const marketsByLang = {
  da: {
    'markets.presenceNote':
      'Vi arbejder remote fra Santiago, Madrid og København. Ser du ikke din by, så skriv alligevel.',
    'markets.presenceCta': 'Ser du ikke din by? Kontakt os →',
    'markets.cl.regionsLabel': 'Regioner',
    'markets.cl.comunasLabel': 'Kommuner i RM',
  },
  no: {
    'markets.presenceNote':
      'Vi jobber remote fra Santiago, Madrid og København. Ser du ikke byen din, skriv likevel.',
    'markets.presenceCta': 'Ser du ikke byen din? Kontakt oss →',
    'markets.cl.regionsLabel': 'Regioner',
    'markets.cl.comunasLabel': 'Kommuner i RM',
  },
  de: {
    'markets.presenceNote':
      'Wir arbeiten remote aus Santiago, Madrid und Kopenhagen. Fehlt deine Stadt, schreib uns trotzdem.',
    'markets.presenceCta': 'Stadt nicht dabei? Schreib uns →',
    'markets.cl.regionsLabel': 'Regionen',
    'markets.cl.comunasLabel': 'RM-Gemeinden',
  },
  fr: {
    'markets.presenceNote':
      'Nous opérons à distance depuis Santiago, Madrid et Copenhague. Si votre ville manque, écrivez-nous quand même.',
    'markets.presenceCta': 'Vous ne voyez pas votre ville ? Contactez-nous →',
    'markets.cl.regionsLabel': 'Régions',
    'markets.cl.comunasLabel': 'Communes RM',
  },
  it: {
    'markets.presenceNote':
      'Operiamo da remoto da Santiago, Madrid e Copenaghen. Se manca la tua città, scrivici comunque.',
    'markets.presenceCta': 'Non vedi la tua città? Scrivici →',
    'markets.cl.regionsLabel': 'Regioni',
    'markets.cl.comunasLabel': 'Comuni RM',
  },
  pt: {
    'markets.presenceNote':
      'Operamos remotamente a partir de Santiago, Madrid e Copenhaga. Se a sua cidade não aparece, escreva-nos na mesma.',
    'markets.presenceCta': 'Não vê a sua cidade? Contacte-nos →',
    'markets.cl.regionsLabel': 'Regiões',
    'markets.cl.comunasLabel': 'Comunas RM',
  },
  sv: {
    'markets.presenceNote':
      'Vi arbetar remote från Santiago, Madrid och Köpenhamn. Ser du inte din stad, skriv ändå.',
    'markets.presenceCta': 'Ser du inte din stad? Kontakta oss →',
    'markets.cl.regionsLabel': 'Regioner',
    'markets.cl.comunasLabel': 'Kommuner i RM',
  },
};

const chromeDa = {
  'services.card4Desc': 'Tydelige intervaller fra MVP til skræddarsyede platforme. Tilbud inden 48 timer.',
  'form.service.webmaster': 'Care-plan — månedlig vedligeholdelse',
  'lead.hint.webmaster': 'Backups, sikkerhed, opdateringer og månedlig support',
  'faqPage.h1': 'FAQ: ansæt full-stack udvikling hos IrigoyenDev',
  'faqPage.q7': 'Hvordan kommer vi i gang?',
  'faqPage.a7Html':
    'Brug <a href="/#contact">kontaktformularen</a> eller skriv på WhatsApp. Fortæl os forretningsmålet, tidslinjen og et ca. budget.',
  'shop.lead':
    'Vi designer og bygger webshops og markedspladser klar til at sælge: klart katalog, smidig checkout, adminpanel og teknisk fundament til at ranke på Google.',
  'shop.cta': 'Få tilbud på din webshop →',
  'svc.eyebrow': 'Services · IrigoyenDev',
};

const chromeNo = {
  'services.card4Desc': 'Tydelige intervaller fra MVP til skreddersydde plattformer. Tilbud innen 48 timer.',
  'form.service.webmaster': 'Care-plan — månedlig vedlikehold',
  'lead.hint.webmaster': 'Backups, sikkerhet, oppdateringer og månedlig support',
  'faqPage.h1': 'FAQ: ansette full-stack utvikling hos IrigoyenDev',
  'faqPage.q7': 'Hvordan kommer vi i gang?',
  'faqPage.a7Html':
    'Bruk <a href="/#contact">kontaktskjemaet</a> eller skriv på WhatsApp. Fortell oss forretningsmålet, tidslinjen og et ca. budsjett.',
  'shop.lead':
    'Vi designer og bygger nettbutikker og markedsplasser klare til å selge: klart katalog, smidig checkout, adminpanel og teknisk fundament for å ranke på Google.',
  'shop.cta': 'Få tilbud på nettbutikken din →',
  'svc.eyebrow': 'Tjenester · IrigoyenDev',
};

function patchFile(lang, patch) {
  const file = path.join(localesDir, `${lang}.json`);
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  let n = 0;
  for (const [k, v] of Object.entries(patch)) {
    if (data[k] !== v) {
      data[k] = v;
      n++;
    }
  }
  // Stable key order: keep existing order, append new keys near markets block if needed
  fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
  return n;
}

let total = 0;
for (const [lang, patch] of Object.entries(marketsByLang)) {
  total += patchFile(lang, patch);
}
total += patchFile('da', { ...marketsByLang.da, ...chromeDa });
total += patchFile('no', { ...marketsByLang.no, ...chromeNo });

console.log(`Patched ${total} locale entries.`);
