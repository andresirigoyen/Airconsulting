/**
 * PART 2 i18n: add geo.scl.* (Santiago hub) + geo.ui.* (shared market UI) keys.
 * Run: node scripts/patch-geo-i18n-scl.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const localesDir = path.join(root, 'locales');

/** Spanish source of truth (live hub / geo-config) */
const es = {
  'geo.scl.metaTitle':
    'Desarrollo Web Santiago | Tienda Online y Landing Pages — IrigoyenDev',
  'geo.scl.metaDesc':
    'Desarrollo web Santiago: tienda online, landing pages de conversión y plataformas para startups, tech y pymes. Agencia web / freelance full stack — IrigoyenDev.',
  'geo.scl.eyebrow': 'Chile · Santiago · Capital digital',
  'geo.scl.h1': 'Desarrollo web profesional en Santiago',
  'geo.scl.lead':
    'Desarrollo web Santiago para startups, tecnología y servicios — también e-commerce y webs para comercio, industria y pymes de la capital. Canal digital medible con SEO local.',
  'geo.scl.ctaPrimary': 'Cotizar proyecto en Santiago →',
  'geo.scl.ctaSecondary': 'Ver todos los servicios →',
  'geo.scl.intro1':
    'Prioridad: equipos que necesitan velocidad de lanzamiento, SEO técnico y un producto medible (signups, demos, ventas). Trabajamos remoto, en español, con plazos claros.',
  'geo.scl.intro2':
    'No excluimos otros perfiles: retail, proveedores B2B, talleres y servicios de barrio también caben — adaptamos el tono y el alcance a cada comuna.',
  'geo.scl.audience1Title': 'Startups y scale-ups',
  'geo.scl.audience1Desc':
    'MVP web, landings de captación, waitlists y paneles ligeros para validar o escalar sin deuda técnica innecesaria.',
  'geo.scl.audience2Title': 'Empresas de tecnología',
  'geo.scl.audience2Desc':
    'Sitios de producto, docs comerciales, demos y plataformas con admin para equipos que ya viven en software.',
  'geo.scl.audience3Title': 'Servicios profesionales',
  'geo.scl.audience3Desc':
    'Consultoras, legales, salud, agencias y B2B de la capital: credibilidad, agenda de reuniones y leads cualificados.',
  'geo.scl.audience4Title': 'Comercio, industria y pymes',
  'geo.scl.audience4Desc':
    'Tiendas online, catálogos y webs locales para retail, proveedores e industrias que operan en Santiago.',
  'geo.scl.comunasIndex':
    '<a href="/santiago/comunas"><strong>Índice completo de comunas</strong></a> — las 52 comunas de la RM en una sola página para rastreo e indexación.',
  'geo.scl.faq1q': '¿Hacen desarrollo web para empresas en Santiago?',
  'geo.scl.faq1a':
    'Sí. IrigoyenDev (Andrés Irigoyen) opera desde Santiago con alcance nacional e internacional: tiendas online, landings y plataformas a medida.',
  'geo.scl.faq2q': '¿Cuánto cuesta una tienda online en Santiago?',
  'geo.scl.faq2a':
    'Producto comercial/e-commerce orientativo desde ~USD 1.304. Landings desde ~USD 600. Detalle en https://www.irigoyendev.com/precios.',
  'geo.scl.faq3q': '¿Atienden todo Santiago o solo comunas específicas?',
  'geo.scl.faq3a':
    'Operamos remoto para toda la RM y Chile. También tenemos presencia en España y Dinamarca.',

  'geo.ui.breadcrumb': 'Miga de pan',
  'geo.ui.audiences': 'A quiénes ayudamos',
  'geo.ui.locations': 'Ubicaciones',
  'geo.ui.regions': 'Regiones',
  'geo.ui.viewPage': 'Ver página →',
  'geo.ui.faqTitle': 'Preguntas frecuentes',
  'geo.ui.expertiseIntro':
    'Conceptos con los que trabajamos en este mercado (no es una lista de keywords):',
  'geo.ui.ctaDefault': 'Cotizar →',
  'geo.ui.ctaServices': 'Ver servicios →',
  'geo.ui.waDefault': 'WhatsApp',
  'geo.ui.localContext': 'Contexto local',
  'geo.ui.sectors': 'Sectores',
  'geo.ui.coverage': 'Cobertura',
  'geo.ui.refSectors': 'Sectores de referencia',
  'geo.ui.painPoints': 'Retos habituales',
  'geo.ui.services': 'Servicios',
  'geo.ui.cases': 'Casos relacionados',
  'geo.ui.nearby': 'Cercanas',
};

const en = {
  'geo.scl.metaTitle':
    'Web Development Santiago | Online Store & Landing Pages — IrigoyenDev',
  'geo.scl.metaDesc':
    'Web development in Santiago: online stores, conversion landing pages and platforms for startups, tech and SMEs. Full-stack web agency / freelance — IrigoyenDev.',
  'geo.scl.eyebrow': 'Chile · Santiago · Digital capital',
  'geo.scl.h1': 'Professional web development in Santiago',
  'geo.scl.lead':
    'Web development in Santiago for startups, technology and services — plus e-commerce and sites for commerce, industry and local SMEs in the capital. Measurable digital channel with local SEO.',
  'geo.scl.ctaPrimary': 'Get a quote for Santiago →',
  'geo.scl.ctaSecondary': 'View all services →',
  'geo.scl.intro1':
    'Priority: teams that need launch speed, technical SEO and a measurable product (signups, demos, sales). We work remotely, in Spanish, with clear timelines.',
  'geo.scl.intro2':
    'We do not exclude other profiles: retail, B2B suppliers, workshops and neighborhood services fit too — we adapt tone and scope to each commune.',
  'geo.scl.audience1Title': 'Startups and scale-ups',
  'geo.scl.audience1Desc':
    'Web MVPs, acquisition landings, waitlists and light dashboards to validate or scale without unnecessary technical debt.',
  'geo.scl.audience2Title': 'Technology companies',
  'geo.scl.audience2Desc':
    'Product sites, sales docs, demos and admin platforms for teams that already live in software.',
  'geo.scl.audience3Title': 'Professional services',
  'geo.scl.audience3Desc':
    'Consultancies, legal, health, agencies and B2B in the capital: credibility, meeting bookings and qualified leads.',
  'geo.scl.audience4Title': 'Commerce, industry and SMEs',
  'geo.scl.audience4Desc':
    'Online stores, catalogs and local sites for retail, suppliers and industries operating in Santiago.',
  'geo.scl.comunasIndex':
    '<a href="/santiago/comunas"><strong>Full communes index</strong></a> — all 52 communes of the RM on one page for crawl and indexing.',
  'geo.scl.faq1q': 'Do you do web development for companies in Santiago?',
  'geo.scl.faq1a':
    'Yes. IrigoyenDev (Andrés Irigoyen) operates from Santiago with national and international reach: online stores, landings and custom platforms.',
  'geo.scl.faq2q': 'How much does an online store in Santiago cost?',
  'geo.scl.faq2a':
    'Commercial/e-commerce product indicative from ~USD 1,304. Landings from ~USD 600. Details at https://www.irigoyendev.com/precios.',
  'geo.scl.faq3q': 'Do you cover all of Santiago or only specific communes?',
  'geo.scl.faq3a':
    'We operate remotely across the entire RM and Chile. We also have presence in Spain and Denmark.',

  'geo.ui.breadcrumb': 'Breadcrumb',
  'geo.ui.audiences': 'Who we help',
  'geo.ui.locations': 'Locations',
  'geo.ui.regions': 'Regions',
  'geo.ui.viewPage': 'View page →',
  'geo.ui.faqTitle': 'Frequently asked questions',
  'geo.ui.expertiseIntro':
    'Concepts we work with in this market (not a keyword list):',
  'geo.ui.ctaDefault': 'Get a quote →',
  'geo.ui.ctaServices': 'View services →',
  'geo.ui.waDefault': 'WhatsApp',
  'geo.ui.localContext': 'Local context',
  'geo.ui.sectors': 'Sectors',
  'geo.ui.coverage': 'Coverage',
  'geo.ui.refSectors': 'Reference sectors',
  'geo.ui.painPoints': 'Common challenges',
  'geo.ui.services': 'Services',
  'geo.ui.cases': 'Related cases',
  'geo.ui.nearby': 'Nearby',
};

const da = {
  'geo.scl.metaTitle':
    'Webudvikling Santiago | Webshop & landingssider — IrigoyenDev',
  'geo.scl.metaDesc':
    'Webudvikling i Santiago: webshop, konverterende landingssider og platforme til startups, tech og SMV’er. Full-stack webureau / freelance — IrigoyenDev.',
  'geo.scl.eyebrow': 'Chile · Santiago · Digital hovedstad',
  'geo.scl.h1': 'Professionel webudvikling i Santiago',
  'geo.scl.lead':
    'Webudvikling i Santiago til startups, teknologi og services — også e-handel og websites til handel, industri og lokale SMV’er i hovedstaden. Målbar digital kanal med lokal SEO.',
  'geo.scl.ctaPrimary': 'Få tilbud i Santiago →',
  'geo.scl.ctaSecondary': 'Se alle ydelser →',
  'geo.scl.intro1':
    'Prioritet: teams der har brug for lanceringshastighed, teknisk SEO og et målbart produkt (tilmeldinger, demoer, salg). Vi arbejder remote, på spansk, med klare deadlines.',
  'geo.scl.intro2':
    'Vi udelukker ikke andre profiler: detail, B2B-leverandører, værksteder og lokale services passer også — vi tilpasser tone og omfang til hver kommune.',
  'geo.scl.audience1Title': 'Startups og scale-ups',
  'geo.scl.audience1Desc':
    'Web-MVP’er, acquisition-landings, waitlists og lette dashboards til at validere eller skalere uden unødvendig teknisk gæld.',
  'geo.scl.audience2Title': 'Teknologivirksomheder',
  'geo.scl.audience2Desc':
    'Produktsites, salgsdocs, demoer og admin-platforme til teams der allerede lever i software.',
  'geo.scl.audience3Title': 'Professionelle services',
  'geo.scl.audience3Desc':
    'Konsulenthuse, jura, sundhed, bureauer og B2B i hovedstaden: troværdighed, mødebookinger og kvalificerede leads.',
  'geo.scl.audience4Title': 'Handel, industri og SMV’er',
  'geo.scl.audience4Desc':
    'Webshops, kataloger og lokale websites til detail, leverandører og industrier i Santiago.',
  'geo.scl.comunasIndex':
    '<a href="/santiago/comunas"><strong>Komplet index over kommuner</strong></a> — alle 52 kommuner i RM på én side til crawl og indeksering.',
  'geo.scl.faq1q': 'Laver I webudvikling til virksomheder i Santiago?',
  'geo.scl.faq1a':
    'Ja. IrigoyenDev (Andrés Irigoyen) driver forretning fra Santiago med national og international rækkevidde: webshops, landings og skræddersyede platforme.',
  'geo.scl.faq2q': 'Hvad koster en webshop i Santiago?',
  'geo.scl.faq2a':
    'Kommercielt/e-handelsprodukt vejledende fra ~USD 1.304. Landings fra ~USD 600. Detaljer på https://www.irigoyendev.com/precios.',
  'geo.scl.faq3q': 'Dækker I hele Santiago eller kun bestemte kommuner?',
  'geo.scl.faq3a':
    'Vi arbejder remote i hele RM og Chile. Vi har også tilstedeværelse i Spanien og Danmark.',

  'geo.ui.breadcrumb': 'Brødkrumme',
  'geo.ui.audiences': 'Hvem vi hjælper',
  'geo.ui.locations': 'Lokationer',
  'geo.ui.regions': 'Regioner',
  'geo.ui.viewPage': 'Se side →',
  'geo.ui.faqTitle': 'Ofte stillede spørgsmål',
  'geo.ui.expertiseIntro':
    'Begreber vi arbejder med på dette marked (ikke en keyword-liste):',
  'geo.ui.ctaDefault': 'Få tilbud →',
  'geo.ui.ctaServices': 'Se ydelser →',
  'geo.ui.waDefault': 'WhatsApp',
  'geo.ui.localContext': 'Lokal kontekst',
  'geo.ui.sectors': 'Brancher',
  'geo.ui.coverage': 'Dækning',
  'geo.ui.refSectors': 'Referencebrancher',
  'geo.ui.painPoints': 'Typiske udfordringer',
  'geo.ui.services': 'Ydelser',
  'geo.ui.cases': 'Relaterede cases',
  'geo.ui.nearby': 'I nærheden',
};

const no = {
  'geo.scl.metaTitle':
    'Webutvikling Santiago | Nettbutikk og landingssider — IrigoyenDev',
  'geo.scl.metaDesc':
    'Webutvikling i Santiago: nettbutikk, konverterende landingssider og plattformer for startups, tech og SMB. Full-stack webbyrå / freelance — IrigoyenDev.',
  'geo.scl.eyebrow': 'Chile · Santiago · Digital hovedstad',
  'geo.scl.h1': 'Profesjonell webutvikling i Santiago',
  'geo.scl.lead':
    'Webutvikling i Santiago for startups, teknologi og tjenester — også e-handel og nettsider for handel, industri og lokale SMB i hovedstaden. Målbar digital kanal med lokal SEO.',
  'geo.scl.ctaPrimary': 'Be om tilbud i Santiago →',
  'geo.scl.ctaSecondary': 'Se alle tjenester →',
  'geo.scl.intro1':
    'Prioritet: team som trenger lanseringshastighet, teknisk SEO og et målbart produkt (registreringer, demoer, salg). Vi jobber remote, på spansk, med tydelige frister.',
  'geo.scl.intro2':
    'Vi utelukker ikke andre profiler: retail, B2B-leverandører, verksteder og lokale tjenester passer også — vi tilpasser tone og omfang til hver kommune.',
  'geo.scl.audience1Title': 'Startups og scale-ups',
  'geo.scl.audience1Desc':
    'Web-MVP-er, acquisition-landinger, waitlists og lette dashboards for å validere eller skalere uten unødvendig teknisk gjeld.',
  'geo.scl.audience2Title': 'Teknologiselskaper',
  'geo.scl.audience2Desc':
    'Produktsider, salgsdokumentasjon, demoer og admin-plattformer for team som allerede lever i programvare.',
  'geo.scl.audience3Title': 'Profesjonelle tjenester',
  'geo.scl.audience3Desc':
    'Konsulentselskaper, juss, helse, byråer og B2B i hovedstaden: troverdighet, møtebooking og kvalifiserte leads.',
  'geo.scl.audience4Title': 'Handel, industri og SMB',
  'geo.scl.audience4Desc':
    'Nettbutikker, kataloger og lokale nettsider for retail, leverandører og industrier som opererer i Santiago.',
  'geo.scl.comunasIndex':
    '<a href="/santiago/comunas"><strong>Komplett indeks over kommuner</strong></a> — alle 52 kommunene i RM på én side for crawl og indeksering.',
  'geo.scl.faq1q': 'Lager dere webutvikling for bedrifter i Santiago?',
  'geo.scl.faq1a':
    'Ja. IrigoyenDev (Andrés Irigoyen) opererer fra Santiago med nasjonal og internasjonal rekkevidde: nettbutikker, landinger og skreddersydde plattformer.',
  'geo.scl.faq2q': 'Hva koster en nettbutikk i Santiago?',
  'geo.scl.faq2a':
    'Kommersielt/e-handelsprodukt veiledende fra ~USD 1 304. Landinger fra ~USD 600. Detaljer på https://www.irigoyendev.com/precios.',
  'geo.scl.faq3q': 'Dekker dere hele Santiago eller bare bestemte kommuner?',
  'geo.scl.faq3a':
    'Vi jobber remote i hele RM og Chile. Vi har også tilstedeværelse i Spania og Danmark.',

  'geo.ui.breadcrumb': 'Brødsmuler',
  'geo.ui.audiences': 'Hvem vi hjelper',
  'geo.ui.locations': 'Steder',
  'geo.ui.regions': 'Regioner',
  'geo.ui.viewPage': 'Se side →',
  'geo.ui.faqTitle': 'Vanlige spørsmål',
  'geo.ui.expertiseIntro':
    'Temaer vi jobber med i dette markedet (ikke keyword-stuffing):',
  'geo.ui.ctaDefault': 'Be om tilbud →',
  'geo.ui.ctaServices': 'Se tjenester →',
  'geo.ui.waDefault': 'WhatsApp',
  'geo.ui.localContext': 'Lokal kontekst',
  'geo.ui.sectors': 'Bransjer',
  'geo.ui.coverage': 'Dekning',
  'geo.ui.refSectors': 'Referanseområder',
  'geo.ui.painPoints': 'Vanlige utfordringer',
  'geo.ui.services': 'Tjenester',
  'geo.ui.cases': 'Relaterte case',
  'geo.ui.nearby': 'I nærheten',
};

const packs = {
  es,
  en,
  da,
  no,
  de: en,
  fr: en,
  it: en,
  pt: en,
  sv: en,
};

const KEYS = Object.keys(es);
console.log(`Adding ${KEYS.length} keys to locales…`);

for (const [lang, pack] of Object.entries(packs)) {
  const file = path.join(localesDir, `${lang}.json`);
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  let added = 0;
  for (const key of KEYS) {
    if (!(key in pack)) throw new Error(`Missing ${key} in ${lang}`);
    if (!(key in data)) added++;
    data[key] = pack[key];
  }
  fs.writeFileSync(file, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
  console.log(`  ${lang}: wrote ${KEYS.length} keys (${added} new)`);
}

// Verify es/en/da/no parity for new keys
for (const lang of ['es', 'en', 'da', 'no']) {
  const data = JSON.parse(fs.readFileSync(path.join(localesDir, `${lang}.json`), 'utf8'));
  const missing = KEYS.filter((k) => !(k in data));
  if (missing.length) throw new Error(`${lang} missing: ${missing.join(', ')}`);
}
console.log('OK — es/en/da/no all have every geo.scl.* and geo.ui.* key');
console.log(`Total new key count: ${KEYS.length} (geo.scl: ${KEYS.filter((k) => k.startsWith('geo.scl.')).length}, geo.ui: ${KEYS.filter((k) => k.startsWith('geo.ui.')).length})`);
