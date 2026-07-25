/**
 * Parte 1: Translate remaining EN-identical strings in da.json / no.json
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const localesDir = path.join(root, 'locales');

const da = {
  'services.card4Title': 'Vejledende priser',
  'footer.linkMkt': 'Digital marketing',
  'cta.retorica.btn': 'Planlæg dit brand-website',
  'testimonials.title': 'Hvad vores kunder siger',
  'proj.calafate.h1': 'Calafate Propiedades: Integreret ejendomsøkosystem i Next.js',
  'proj.calafate.valueTitle': 'Værditilbud',
  'proj.calafate.valueDesc':
    'Calafate Propiedades samler det offentlige katalog, transaktionelle e-mails (leads) og ejendomsadministration i ét Next.js-miljø og skaber synergi mellem performance, datakonsistens og driftsvenlighed.',
  'proj.calafate.capabilitiesLabel': 'Platformen gør det muligt at:',
  'proj.calafate.step3Title': '3 — Medieoptimering',
  'proj.calafate.feat1Title': 'Katalogperformance',
  'proj.calafate.feat3Title': 'Sikker drift',
  'proj.calafate.resultsTitle': 'Konklusion og resultater',
  'proj.calafate.resultsDesc':
    'Calafate Propiedades viser, hvordan man kan forene et hurtigt katalog, håndtering af transaktionelle e-mails (leads) og komplet ejendomsadministration i ét Next.js-miljø. Resultatet er en effektiv, let vedligeholdelig platform, der skalerer med ejendomsforretningen.',
  'cta.calafate.btn': 'Anmod om platformplan',
  'proj.rluabogados.h1': 'Ruiz Leiva Abogados: Juridisk virksomhedsplatform',
  'proj.rluabogados.liveBtn': 'Besøg rluabogados.cl →',
  'proj.rluabogados.valueDesc':
    'Ruiz Leiva Abogados centraliserer servicekataloget, udgiver juridiske perspektiver og indsamler kvalificerede leads direkte i et privat dashboard — uden friktion og med stærkere digital præsentation.',
  'proj.rluabogados.capabilitiesLabel': 'Platformen gør det muligt at:',
  'proj.rluabogados.processTitle': 'Udviklingsmetode',
  'proj.rluabogados.step1Title': '1 — Produktarkitektur',
  'proj.rluabogados.step3Title': '3 — Offentlig oplevelse',
  'proj.rluabogados.step4Title': '4 — Admin-drift',
  'proj.rluabogados.step5Title': '5 — SEO-optimering',
  'proj.rluabogados.feat2Title': 'Kvalificeret leadfangst',
  'proj.rluabogados.resultsTitle': 'Resultater og impact',
  'proj.rluabogados.resultsDesc':
    'Ruiz Leiva Abogados er en komplet, moderne juridisk virksomhedsplatform klar til produktion — en optimeret offentlig oplevelse med autoritet plus et funktionelt og sikkert adminpanel.',
  'cta.rluabogados.btn': 'Anmod om platformstilbud',
  'proj.familiainternacional.h1': 'Familia Internacional: Specialiseret advokatfirma',
  'proj.familiainternacional.capabilitiesLabel': 'Platformen fremhæver:',
  'proj.familiainternacional.processTitle': 'Udviklingsmetode',
  'proj.familiainternacional.step3Title': '3 — Frontend-udvikling',
  'proj.familiainternacional.feat1Title': 'Fejlfrit adaptivt design',
  'proj.familiainternacional.resultsTitle': 'Konklusion og resultater',
  'cta.familiainternacional.btn': 'Anmod om websitetilbud',
  'nav.back': 'Tilbage til forsiden',
  'svc.eyebrow': 'Services · IrigoyenDev',
  'landing.eyebrow': 'Landings · Service',
  'shop.eyebrow': 'E-commerce · Service',
  'proj.ava7.desc':
    'Ejendomswebsite til salg og udlejning i Viña del Mar og Concón: multi-filter-søgning, lokal kystbranding og direkte leadfangst via WhatsApp og kontakt.',
  'proj.ava7.liveBtn': 'Besøg ava7propiedades.cl →',
  'proj.ava7.eyebrow': 'Case study · Ejendomswebsite ved kysten',
  'proj.ava7.h1': 'AVA7 Propiedades: salg og udlejning i Viña del Mar og Concón',
  'proj.ava7.subtitle':
    'Konverteringsfokuseret ejendomssite: ejendomssøgning, salgs- og udlejningskatalog og direkte kanaler (WhatsApp og kontakt) til at fange kunder på Valparaíso-kysten.',
  'proj.ava7.role': 'Rolle: Full-stack-udvikler',
  'proj.ava7.scope': 'Omfang: UX-design, frontend, ejendomssøgning, lokal SEO og leadfangst',
  'proj.ava7.valueTitle': 'Værditilbud',
  'proj.ava7.valueDesc':
    'AVA7 Propiedades projicerer et nært, professionelt ejendomsmærke i Viña del Mar og Concón. Sitet kombinerer en visuelt stærk hero med multi-filter-søgning og klare stier til salg, udlejning, blog og kontakt — bygget til at omsætte besøg til forespørgsler.',
  'proj.ava7.problemDesc':
    'Et lokalt agentur skal skille sig ud fra generiske portaler: vise lageret klart, filtrere efter operation og type og gøre øjeblikkelig kontakt friktionsfri. Udfordringen var en troværdig digital tilstedeværelse rettet mod Valparaíso-kysten.',
  'proj.ava7.capabilitiesLabel': 'Platformen gør det muligt at:',
  'proj.ava7.cap1': 'Søge efter placering, operation, type, soveværelser, badeværelser og parkering',
  'proj.ava7.cap2': 'Dedikerede sektioner til salg, udlejning og “sælg din bolig”',
  'proj.ava7.cap3': 'Direkte kontakt via telefon, e-mail og WhatsApp',
  'proj.ava7.cap4': 'Lokal brandtilstedeværelse med blog og tillidssignaler',
  'proj.ava7.processTitle': 'Metode og udvikling',
  'proj.ava7.processIntro':
    'Udviklingen prioriterede kommerciel klarhed, oplevet hastighed og en kort tragt til kontakt:',
  'proj.ava7.step1Title': '1 — Identitet og konverteringshero',
  'proj.ava7.step1Desc':
    'Branddesign med egen typografi og farve (navy + gul), fotografisk kysthero og budskab centreret om Viña del Mar og Concón.',
  'proj.ava7.step2Title': '2 — Ejendomssøgning',
  'proj.ava7.step2Desc':
    'Filterbjælke for placering, operation, boligtype, soveværelser, badeværelser og parkering med søge-CTA synlig fra første viewport.',
  'proj.ava7.step3Title': '3 — Indholdsarkitektur',
  'proj.ava7.step3Desc':
    'Klar navigation til inventar (til salg / til leje), blog, ejerfangst og kontakt — tilpasset køber- og sælgerrejser.',
  'proj.ava7.step4Title': '4 — Fangstkanaler',
  'proj.ava7.step4Desc':
    'WhatsApp, telefon og e-mail integreret i strategiske UI-punkter for at mindske friktion mellem interesse og kommerciel forespørgsel.',
  'proj.ava7.mockupsTitle': 'Interface og produktskærme',
  'proj.ava7.mockupsDesc':
    'Oplevelse designet til at udforske kystejendomme og kontakte agenturet på få trin.',
  'proj.ava7.homeShowcaseTitle': 'Forside og ejendomssøgning',
  'proj.ava7.techTitle': 'Tekniske udfordringer løst',
  'proj.ava7.techIntro':
    'Projektet balancerede visuelt impact, søgeusability og lokal konvertering.',
  'proj.ava7.feat1Title': 'Beslutningsorienteret søgning',
  'proj.ava7.feat1Desc':
    'Filtre for operation, typologi og nøglefunktioner synlige fra heroen, så besøgende finder ejendomme uden blind navigation.',
  'proj.ava7.feat2Title': 'Lokalt kystbrand',
  'proj.ava7.feat2Desc':
    'Budskab og visuelle elementer forankret i Viña del Mar og Concón — stærkere positionering end generiske nationale portaler.',
  'proj.ava7.feat3Title': 'Friktionsfri fangst',
  'proj.ava7.feat3Desc':
    'WhatsApp, telefon og e-mail altid tilgængelige — kortere vej fra ejendomsinteresse til kommerciel samtale.',
  'proj.ava7.resultsTitle': 'Konklusion og resultater',
  'proj.ava7.resultsDesc':
    'AVA7 Propiedades viser, hvordan et lokalt ejendomswebsite kan konkurrere med brandklarhed, nyttig søgning og øjeblikkelige kontaktkanaler. Resultatet er en digital butiksfacade, der signalerer professionalisme og fanger købere, lejere og ejere.',
  'proj.ava7.res1': 'Hero og søgning tilpasset salgs- og udlejningsintention.',
  'proj.ava7.res2': 'Indholdsarkitektur til købere og boligejere.',
  'proj.ava7.res3': 'Kontaktkanaler (WhatsApp, telefon, e-mail) integreret i oplevelsen.',
  'cta.ava7.title': 'Vil du have et ejendomssite, der omsætter besøg til forespørgsler?',
  'cta.ava7.desc':
    'Vi bygger sites som AVA7 Propiedades: klart brand, nyttig søgning og direkte fangst til lokale agenturer.',
  'cta.ava7.btn': 'Anmod om projektplan',
};

const no = {
  'services.card4Title': 'Veiledende priser',
  'footer.linkMkt': 'Digital markedsføring',
  'cta.retorica.btn': 'Planlegg nettstedet for merkevaren din',
  'testimonials.title': 'Hva kundene våre sier',
  'proj.calafate.h1': 'Calafate Propiedades: Integrert eiendomsøkosystem i Next.js',
  'proj.calafate.valueTitle': 'Verdiløfte',
  'proj.calafate.valueDesc':
    'Calafate Propiedades samler det offentlige kataloget, transaksjonelle e-poster (leads) og eiendomsadministrasjon i ett Next.js-miljø og skaper synergi mellom ytelse, datakonsistens og drift.',
  'proj.calafate.capabilitiesLabel': 'Plattformen gjør det mulig å:',
  'proj.calafate.step3Title': '3 — Medieoptimalisering',
  'proj.calafate.feat1Title': 'Katalogytelse',
  'proj.calafate.feat3Title': 'Sikker drift',
  'proj.calafate.resultsTitle': 'Konklusjon og resultater',
  'proj.calafate.resultsDesc':
    'Calafate Propiedades viser hvordan man kan forene et raskt katalog, håndtering av transaksjonelle e-poster (leads) og komplett eiendomsadministrasjon i ett Next.js-miljø. Resultatet er en effektiv, lett vedlikeholdbar plattform som skalerer med eiendomsvirksomheten.',
  'cta.calafate.btn': 'Be om plattformplan',
  'proj.rluabogados.h1': 'Ruiz Leiva Abogados: Juridisk bedriftsplattform',
  'proj.rluabogados.liveBtn': 'Besøk rluabogados.cl →',
  'proj.rluabogados.valueDesc':
    'Ruiz Leiva Abogados sentraliserer tjenestekataloget, publiserer juridiske perspektiver og samler kvalifiserte leads direkte i et privat dashbord — uten friksjon og med sterkere digital presentasjon.',
  'proj.rluabogados.capabilitiesLabel': 'Plattformen gjør det mulig å:',
  'proj.rluabogados.processTitle': 'Utviklingsmetodikk',
  'proj.rluabogados.step1Title': '1 — Produktarkitektur',
  'proj.rluabogados.step3Title': '3 — Offentlig opplevelse',
  'proj.rluabogados.step4Title': '4 — Admin-drift',
  'proj.rluabogados.step5Title': '5 — SEO-optimalisering',
  'proj.rluabogados.feat2Title': 'Kvalifisert leadfangst',
  'proj.rluabogados.resultsTitle': 'Resultater og effekt',
  'proj.rluabogados.resultsDesc':
    'Ruiz Leiva Abogados er en komplett, moderne juridisk bedriftsplattform klar for produksjon — en optimalisert offentlig opplevelse med autoritet pluss et funksjonelt og sikkert adminpanel.',
  'cta.rluabogados.btn': 'Be om plattformtilbud',
  'proj.familiainternacional.h1': 'Familia Internacional: Spesialisert advokatfirma',
  'proj.familiainternacional.capabilitiesLabel': 'Plattformen fremhever:',
  'proj.familiainternacional.processTitle': 'Utviklingsmetodikk',
  'proj.familiainternacional.step3Title': '3 — Frontend-utvikling',
  'proj.familiainternacional.feat1Title': 'Feilfri adaptiv design',
  'proj.familiainternacional.resultsTitle': 'Konklusjon og resultater',
  'cta.familiainternacional.btn': 'Be om nettstedstilbud',
  'nav.back': 'Tilbake til forsiden',
  'svc.eyebrow': 'Tjenester · IrigoyenDev',
  'landing.eyebrow': 'Landings · Tjeneste',
  'shop.eyebrow': 'E-handel · Tjeneste',
  'proj.ava7.desc':
    'Eiendomsnettsted for salg og utleie i Viña del Mar og Concón: multi-filter-søk, lokal kystbranding og direkte leadfangst via WhatsApp og kontakt.',
  'proj.ava7.liveBtn': 'Besøk ava7propiedades.cl →',
  'proj.ava7.eyebrow': 'Case study · Eiendomsnettsted ved kysten',
  'proj.ava7.h1': 'AVA7 Propiedades: salg og utleie i Viña del Mar og Concón',
  'proj.ava7.subtitle':
    'Konverteringsfokusert eiendomsside: eiendomssøk, salgs- og utleiekatalog og direkte kanaler (WhatsApp og kontakt) for å fange kunder på Valparaíso-kysten.',
  'proj.ava7.role': 'Rolle: Full-stack-utvikler',
  'proj.ava7.scope': 'Omfang: UX-design, frontend, eiendomssøk, lokal SEO og leadfangst',
  'proj.ava7.valueTitle': 'Verdiløfte',
  'proj.ava7.valueDesc':
    'AVA7 Propiedades projiserer et nært, profesjonelt eiendomsmerke i Viña del Mar og Concón. Siden kombinerer en visuelt sterk hero med multi-filter-søk og klare stier til salg, utleie, blogg og kontakt — bygget for å omsette besøk til henvendelser.',
  'proj.ava7.problemDesc':
    'Et lokalt byrå må skille seg ut fra generiske portaler: vise lageret tydelig, filtrere etter operasjon og type og gjøre umiddelbar kontakt friksjonsfri. Utfordringen var en troverdig digital tilstedeværelse rettet mot Valparaíso-kysten.',
  'proj.ava7.capabilitiesLabel': 'Plattformen gjør det mulig å:',
  'proj.ava7.cap1': 'Søke etter sted, operasjon, type, soverom, bad og parkering',
  'proj.ava7.cap2': 'Egne seksjoner for salg, utleie og «selg boligen din»',
  'proj.ava7.cap3': 'Direkte kontakt via telefon, e-post og WhatsApp',
  'proj.ava7.cap4': 'Lokal merkevaretilstedeværelse med blogg og tillitssignaler',
  'proj.ava7.processTitle': 'Metodikk og utvikling',
  'proj.ava7.processIntro':
    'Utviklingen prioriterte kommersiell klarhet, opplevd hastighet og en kort trakt til kontakt:',
  'proj.ava7.step1Title': '1 — Identitet og konverteringshero',
  'proj.ava7.step1Desc':
    'Merkevaredesign med egen typografi og farge (navy + gul), fotografisk kysthero og budskap sentrert om Viña del Mar og Concón.',
  'proj.ava7.step2Title': '2 — Eiendomssøk',
  'proj.ava7.step2Desc':
    'Filterlinje for sted, operasjon, boligtype, soverom, bad og parkering med søke-CTA synlig fra første viewport.',
  'proj.ava7.step3Title': '3 — Innholdsarkitektur',
  'proj.ava7.step3Desc':
    'Klar navigasjon til inventar (til salgs / til leie), blogg, eierfangst og kontakt — tilpasset kjøper- og selgerreiser.',
  'proj.ava7.step4Title': '4 — Fangstkanaler',
  'proj.ava7.step4Desc':
    'WhatsApp, telefon og e-post integrert i strategiske UI-punkter for å redusere friksjon mellom interesse og kommersiell henvendelse.',
  'proj.ava7.mockupsTitle': 'Grensesnitt og produktskjermer',
  'proj.ava7.mockupsDesc':
    'Opplevelse designet for å utforske kysteiendommer og kontakte byrået på få steg.',
  'proj.ava7.homeShowcaseTitle': 'Forside og eiendomssøk',
  'proj.ava7.techTitle': 'Tekniske utfordringer løst',
  'proj.ava7.techIntro':
    'Prosjektet balanserte visuelt impact, søkeusability og lokal konvertering.',
  'proj.ava7.feat1Title': 'Beslutningsorientert søk',
  'proj.ava7.feat1Desc':
    'Filtre for operasjon, typologi og nøkkelfunksjoner synlige fra heroen, slik at besøkende finner eiendommer uten blind navigasjon.',
  'proj.ava7.feat2Title': 'Lokalt kystmerke',
  'proj.ava7.feat2Desc':
    'Budskap og visuelle elementer forankret i Viña del Mar og Concón — sterkere posisjonering enn generiske nasjonale portaler.',
  'proj.ava7.feat3Title': 'Friksjonsfri fangst',
  'proj.ava7.feat3Desc':
    'WhatsApp, telefon og e-post alltid tilgjengelige — kortere vei fra eiendomsinteresse til kommersiell samtale.',
  'proj.ava7.resultsTitle': 'Konklusjon og resultater',
  'proj.ava7.resultsDesc':
    'AVA7 Propiedades viser hvordan et lokalt eiendomsnettsted kan konkurrere med merkevareklarhet, nyttig søk og umiddelbare kontaktkanaler. Resultatet er en digital butikkfasade som signaliserer profesjonalitet og fanger kjøpere, leietakere og eiere.',
  'proj.ava7.res1': 'Hero og søk tilpasset salgs- og utleieintensjon.',
  'proj.ava7.res2': 'Innholdsarkitektur for kjøpere og boligeiere.',
  'proj.ava7.res3': 'Kontaktkanaler (WhatsApp, telefon, e-post) integrert i opplevelsen.',
  'cta.ava7.title': 'Vil du ha et eiendomsside som omsetter besøk til henvendelser?',
  'cta.ava7.desc':
    'Vi bygger nettsteder som AVA7 Propiedades: klart merkevare, nyttig søk og direkte fangst for lokale byråer.',
  'cta.ava7.btn': 'Be om prosjektplan',
};

function patch(lang, map) {
  const file = path.join(localesDir, `${lang}.json`);
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  let n = 0;
  for (const [k, v] of Object.entries(map)) {
    if (data[k] !== v) {
      data[k] = v;
      n++;
    }
  }
  fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
  return n;
}

const nDa = patch('da', da);
const nNo = patch('no', no);
console.log(`DA patched ${nDa}, NO patched ${nNo}`);

const en = JSON.parse(fs.readFileSync(path.join(localesDir, 'en.json'), 'utf8'));
const daFile = JSON.parse(fs.readFileSync(path.join(localesDir, 'da.json'), 'utf8'));
const left = Object.keys(en).filter((k) => daFile[k] === en[k] && String(en[k]).length > 20);
console.log('Remaining DA===EN (len>20):', left.length, left.slice(0, 20));
