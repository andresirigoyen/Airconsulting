import fs from 'node:fs';

const patches = {
  da: {
    'form.success': 'Besked modtaget. Vi svarer inden for 48 timer.',
    'form.error': 'Noget gik galt. Prøv igen, eller skriv direkte til os.',
    'form.errorEmail': 'Indtast en gyldig e-mailadresse.',
    'cta.calafate.title': 'Vil du centralisere din ejendomsdrift?',
    'cta.rluabogados.title': 'Bygger du et virksomhedssite eller en intern platform?',
  },
  de: {
    'form.success': 'Nachricht erhalten. Wir antworten innerhalb von 48 Stunden.',
    'form.error': 'Etwas ist schiefgelaufen. Bitte erneut versuchen oder schreiben Sie uns direkt.',
    'form.errorEmail': 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
    'cta.calafate.title': 'Möchten Sie Ihre Immobilienverwaltung zentralisieren?',
    'cta.rluabogados.title': 'Bauen Sie eine Unternehmenswebsite oder eine interne Plattform?',
  },
  fr: {
    'form.success': 'Message reçu. Nous répondrons sous 48 heures.',
    'form.error': 'Une erreur est survenue. Réessayez ou écrivez-nous directement.',
    'form.errorEmail': 'Veuillez saisir une adresse e-mail valide.',
    'cta.calafate.title': 'Vous cherchez à centraliser votre activité immobilière ?',
    'cta.rluabogados.title': 'Vous construisez un site corporate ou une plateforme interne ?',
  },
  it: {
    'form.success': 'Messaggio ricevuto. Risponderemo entro 48 ore.',
    'form.error': 'Qualcosa è andato storto. Riprova o scrivici direttamente.',
    'form.errorEmail': 'Inserisci un indirizzo e-mail valido.',
    'cta.calafate.title': 'Vuoi centralizzare la tua operatività immobiliare?',
    'cta.rluabogados.title': 'Stai costruendo un sito corporate o una piattaforma interna?',
  },
  no: {
    'form.success': 'Melding mottatt. Vi svarer innen 48 timer.',
    'form.error': 'Noe gikk galt. Prøv igjen, eller skriv direkte til oss.',
    'form.errorEmail': 'Skriv inn en gyldig e-postadresse.',
    'cta.calafate.title': 'Vil du sentralisere eiendomsdriften din?',
    'cta.rluabogados.title': 'Bygger du et bedriftsnettsted eller en intern plattform?',
  },
  pt: {
    'form.success': 'Mensagem recebida. Responderemos em menos de 48 horas.',
    'form.error': 'Algo falhou. Tente novamente ou escreva-nos diretamente.',
    'form.errorEmail': 'Introduza um endereço de e-mail válido.',
    'cta.calafate.title': 'Procura centralizar a sua operação imobiliária?',
    'cta.rluabogados.title': 'Está a construir um site corporativo ou uma plataforma interna?',
    'svc.platformCta': 'Ver o caso Dragonmart',
    'landing.caseCta': 'Ver o caso Retórica →',
    'shop.caseCta': 'Ver o caso TheBeeBaby →',
  },
  sv: {
    'form.success': 'Meddelande mottaget. Vi svarar inom 48 timmar.',
    'form.error': 'Något gick fel. Försök igen eller skriv till oss direkt.',
    'form.errorEmail': 'Ange en giltig e-postadress.',
    'cta.calafate.title': 'Vill du centralisera din fastighetsverksamhet?',
    'cta.rluabogados.title': 'Bygger du en företagswebbplats eller en intern plattform?',
  },
  en: {
    'form.errorEmail': 'Please enter a valid email address.',
  },
  es: {
    'form.errorEmail': 'Introduce un correo electrónico válido.',
  },
};

for (const [code, map] of Object.entries(patches)) {
  const file = `locales/${code}.json`;
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  for (const [k, v] of Object.entries(map)) data[k] = v;
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
  console.log('patched', code, Object.keys(map).length);
}
