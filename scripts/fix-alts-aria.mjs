import fs from 'node:fs';

let html = fs.readFileSync('index.html', 'utf8');

const alts = [
  ['Calafate Propiedades Platform thumbnail', 'Calafate Propiedades — vista previa'],
  ['Thebeebaby Application thumbnail', 'TheBeeBaby — vista previa'],
  ['Dahuss Platform thumbnail', 'Dahuss Homes — vista previa'],
  ['Retorica Landing Page thumbnail', 'Retórica — vista previa'],
  ['Floreria El Nuevo Pensamiento E-commerce thumbnail', 'Florería El Nuevo Pensamiento — vista previa'],
  ['Radio Chicureo Platform thumbnail', 'Radio Chicureo — vista previa'],
  ['Dragonmart Platform thumbnail', 'Dragonmart — vista previa'],
  ['RLU Abogados Platform thumbnail', 'Ruiz Leiva Abogados — vista previa'],
  ['Familia Internacional Platform thumbnail', 'Familia Internacional — vista previa'],
];

for (const [a, b] of alts) {
  if (html.includes(`alt="${a}"`)) {
    html = html.split(`alt="${a}"`).join(`alt="${b}"`);
    console.log('alt fixed:', a);
  }
}

// Find remaining English-looking alts on project images
const remaining = [...html.matchAll(/alt="([^"]+)"/g)]
  .map((m) => m[1])
  .filter((t) => /thumbnail|Platform|Application|Landing Page|E-commerce/i.test(t));
console.log('remaining english-ish alts:', remaining);

html = html
  .replace(
    'aria-label="Toggle Dark Mode"',
    'aria-label="Cambiar tema" data-i18n-aria="a11y.theme"'
  )
  .replace(
    'aria-label="Select Language"',
    'aria-label="Seleccionar idioma" data-i18n-aria="a11y.lang"'
  )
  .replace(
    'aria-label="Toggle Mobile Menu"',
    'aria-label="Abrir menú" data-i18n-aria="a11y.menu"'
  )
  .replaceAll(
    'aria-label="Close"',
    'aria-label="Cerrar" data-i18n-aria="a11y.close"'
  )
  .replaceAll(
    'aria-label="Dismiss"',
    'aria-label="Cerrar" data-i18n-aria="a11y.close"'
  )
  .replace(
    'aria-label="Chat on WhatsApp"',
    'aria-label="Chatear por WhatsApp" data-i18n-aria="a11y.whatsapp"'
  )
  .replaceAll(
    'aria-label="Ver en Google"',
    'aria-label="Ver en Google" data-i18n-aria="a11y.viewGoogle"'
  )
  .replaceAll(
    'aria-label="Servicios"',
    'aria-label="Servicios" data-i18n-aria="footer.servicesHeading"'
  )
  .replaceAll(
    'aria-label="Sitio"',
    'aria-label="Sitio" data-i18n-aria="footer.siteHeading"'
  );

fs.writeFileSync('index.html', html);

const arias = {
  'a11y.theme': {
    es: 'Cambiar tema',
    en: 'Toggle theme',
    da: 'Skift tema',
    no: 'Bytt tema',
    de: 'Design umschalten',
    sv: 'Byt tema',
    fr: 'Changer le thème',
    it: 'Cambia tema',
    pt: 'Alternar tema',
  },
  'a11y.lang': {
    es: 'Seleccionar idioma',
    en: 'Select language',
    da: 'Vælg sprog',
    no: 'Velg språk',
    de: 'Sprache wählen',
    sv: 'Välj språk',
    fr: 'Choisir la langue',
    it: 'Seleziona lingua',
    pt: 'Selecionar idioma',
  },
  'a11y.menu': {
    es: 'Abrir menú',
    en: 'Open menu',
    da: 'Åbn menu',
    no: 'Åpne meny',
    de: 'Menü öffnen',
    sv: 'Öppna meny',
    fr: 'Ouvrir le menu',
    it: 'Apri menu',
    pt: 'Abrir menu',
  },
  'a11y.close': {
    es: 'Cerrar',
    en: 'Close',
    da: 'Luk',
    no: 'Lukk',
    de: 'Schließen',
    sv: 'Stäng',
    fr: 'Fermer',
    it: 'Chiudi',
    pt: 'Fechar',
  },
  'a11y.whatsapp': {
    es: 'Chatear por WhatsApp',
    en: 'Chat on WhatsApp',
    da: 'Chat på WhatsApp',
    no: 'Chat på WhatsApp',
    de: 'Chat auf WhatsApp',
    sv: 'Chatta på WhatsApp',
    fr: 'Discuter sur WhatsApp',
    it: 'Chatta su WhatsApp',
    pt: 'Conversar no WhatsApp',
  },
  'a11y.viewGoogle': {
    es: 'Ver en Google',
    en: 'View on Google',
    da: 'Se på Google',
    no: 'Se på Google',
    de: 'Auf Google ansehen',
    sv: 'Visa på Google',
    fr: 'Voir sur Google',
    it: 'Vedi su Google',
    pt: 'Ver no Google',
  },
};

for (const code of ['es', 'en', 'da', 'no', 'de', 'sv', 'fr', 'it', 'pt']) {
  const p = `locales/${code}.json`;
  const j = JSON.parse(fs.readFileSync(p, 'utf8'));
  for (const [k, map] of Object.entries(arias)) {
    j[k] = map[code];
  }
  fs.writeFileSync(p, JSON.stringify(j, null, 2) + '\n');
}
console.log('aria locale keys added');
