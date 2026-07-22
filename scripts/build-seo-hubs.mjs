/**
 * SEO hubs: /santiago/comunas + crawlable locale markets /es /en /da
 * Run: node scripts/build-seo-hubs.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  SITE,
  OG_DEFAULT,
  escapeHtml,
  escapeAttr,
  buildHead,
  renderPage,
  waLink,
} from './lib/page-chrome.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

function loadSantiagoComunas() {
  const file = path.join(root, 'data', 'locations', 'santiago.json');
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  return (data.comunas || [])
    .map((c) => ({ slug: c.slug, name: c.name, lead: c.content?.lead || '' }))
    .sort((a, b) => a.name.localeCompare(b.name, 'es'));
}

function writeComunasIndex() {
  const comunas = loadSantiagoComunas();
  const title =
    'Comunas de Santiago | Desarrollo web por comuna — IrigoyenDev';
  const description =
    'Índice de desarrollo web en las 52 comunas de la Región Metropolitana: Las Condes, Providencia, Ñuñoa, Maipú y más. Landings, tiendas online y plataformas.';
  const cards = comunas
    .map(
      (c) => `
            <article class="location-card">
                <h3><a href="/santiago/${escapeAttr(c.slug)}">${escapeHtml(c.name)}</a></h3>
                <p>${escapeHtml(c.lead)}</p>
                <a href="/santiago/${escapeAttr(c.slug)}" class="project-link">Ver ${escapeHtml(c.name)} →</a>
            </article>`
    )
    .join('\n');

  const listLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${SITE}/santiago/comunas#list`,
    name: 'Comunas de Santiago — desarrollo web',
    numberOfItems: comunas.length,
    itemListElement: comunas.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      url: `${SITE}/santiago/${c.slug}`,
    })),
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: 'Chile', item: `${SITE}/chile` },
      { '@type': 'ListItem', position: 3, name: 'Santiago', item: `${SITE}/santiago` },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Comunas',
        item: `${SITE}/santiago/comunas`,
      },
    ],
  };

  const headHtml = buildHead({
    title,
    description,
    canonicalPath: '/santiago/comunas',
    ogTitle: title,
    ogDescription: description,
    geoRegion: 'CL',
    geoPlacename: 'Santiago, Región Metropolitana',
    icbm: '-33.4489, -70.6693',
    hreflang: 'es-CL',
    jsonLd: [breadcrumbLd, listLd],
  });

  const mainHtml = `
    <main id="main-content">
    <header class="project-header container fade-in">
        <a href="/santiago" class="back-link"><span>← Santiago</span></a>
        <nav class="geo-breadcrumb" aria-label="Miga de pan">
          <ol>
            <li><a href="/" data-i18n="footer.linkHome">Inicio</a></li>
            <li><a href="/chile">Chile</a></li>
            <li><a href="/santiago">Santiago</a></li>
            <li aria-current="page">Comunas</li>
          </ol>
        </nav>
        <p class="project-eyebrow">Chile · Santiago · Índice geo</p>
        <h1>Desarrollo web por comuna en Santiago</h1>
        <p class="project-lead">Páginas locales para las ${comunas.length} comunas de la Región Metropolitana. Elige tu comuna para ver enfoque, servicios y CTA de cotización.</p>
        <div class="project-header__actions">
            <a href="/#contact" class="btn-cta-primary">Cotizar proyecto en Santiago →</a>
            <a href="/santiago" class="project-cta-inline">Hub Santiago →</a>
        </div>
    </header>
    <div class="container">
        <section class="project-section fade-in">
            <h2 class="location-subheading">Todas las comunas</h2>
            <div class="location-grid">
${cards}
            </div>
            <p class="location-outro" style="margin-top:2rem">
                También: <a href="/chile">regiones de Chile</a>
                · <a href="/landing-pages">landing pages</a>
                · <a href="/crear-tienda-online">tienda online</a>
            </p>
        </section>
    </div>
    </main>`;

  const html = renderPage({
    headHtml,
    mainHtml,
    htmlLang: 'es-CL',
    footerGeo: 'Chile · Santiago · WhatsApp',
    footerMarketLinks: [
      { href: '/chile', label: 'Chile' },
      { href: '/santiago', label: 'Santiago' },
      { href: '/santiago/comunas', label: 'Comunas' },
    ],
  });

  const out = path.join(root, 'santiago', 'comunas.html');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html, 'utf8');
  console.log('Wrote /santiago/comunas');
}

/**
 * @param {object} hub
 */
function writeLocaleHub(hub) {
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: hub.homeLabel, item: `${SITE}/` },
      {
        '@type': 'ListItem',
        position: 2,
        name: hub.crumbLabel,
        item: `${SITE}${hub.path}`,
      },
    ],
  };

  const collectionLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${SITE}${hub.path}#collection`,
    name: hub.title,
    description: hub.description,
    url: `${SITE}${hub.path}`,
    inLanguage: hub.lang,
    isPartOf: { '@id': `${SITE}/#website` },
  };

  const headHtml = buildHead({
    title: hub.title,
    description: hub.description,
    canonicalPath: hub.path,
    ogTitle: hub.title,
    ogDescription: hub.description,
    hreflang: hub.hreflang,
    ogLocale: hub.ogLocale,
    ogLocaleAlternate: hub.ogLocaleAlt,
    geoRegion: hub.geoRegion,
    geoPlacename: hub.geoPlacename,
    icbm: hub.icbm,
    jsonLd: [breadcrumbLd, collectionLd],
  });

  const cityCards = hub.cities
    .map(
      (c) => `
            <article class="location-card">
                <p class="location-card__eyebrow">${escapeHtml(hub.crumbLabel)}</p>
                <h3><a href="${escapeAttr(c.href)}">${escapeHtml(c.name)}</a></h3>
                <p>${escapeHtml(c.blurb)}</p>
                <a href="${escapeAttr(c.href)}" class="project-link">${escapeHtml(c.name)} →</a>
            </article>`
    )
    .join('\n');

  const serviceCards = hub.services
    .map(
      (s) => `
            <article class="location-card">
                <h3><a href="${escapeAttr(s.href)}">${escapeHtml(s.label)}</a></h3>
                <p>${escapeHtml(s.blurb || hub.servicesBlurb || '')}</p>
                <a href="${escapeAttr(s.href)}" class="project-link">${escapeHtml(s.cta || 'Ver →')}</a>
            </article>`
    )
    .join('\n');

  const mainHtml = `
    <main id="main-content">
    <header class="project-header container fade-in">
        <a href="/" class="back-link"><span data-i18n="mkt.backHome">← ${escapeHtml(hub.homeLabel)}</span></a>
        <nav class="geo-breadcrumb" aria-label="${escapeAttr(hub.breadcrumbLabel)}">
          <ol>
            <li><a href="/" data-i18n="footer.linkHome">${escapeHtml(hub.homeLabel)}</a></li>
            <li aria-current="page">${escapeHtml(hub.crumbLabel)}</li>
          </ol>
        </nav>
        <p class="project-eyebrow">${escapeHtml(hub.eyebrow)}</p>
        <h1>${escapeHtml(hub.h1)}</h1>
        <p class="project-lead">${escapeHtml(hub.lead)}</p>
        <div class="project-header__actions">
            <a href="/#contact" class="btn-cta-primary">${escapeHtml(hub.cta)}</a>
            <a href="${waLink(hub.waMessage)}" class="project-cta-inline" target="_blank" rel="noopener noreferrer">WhatsApp →</a>
        </div>
    </header>
    <div class="container">
        <section class="project-section fade-in">
            <h2 class="location-subheading">${escapeHtml(hub.citiesTitle)}</h2>
            <div class="location-grid">
${cityCards}
            </div>
        </section>
        <section class="project-section fade-in">
            <h2 class="location-subheading">${escapeHtml(hub.servicesTitle)}</h2>
            <div class="location-grid location-grid--services">
${serviceCards}
            </div>
        </section>
        <section class="project-section fade-in">
            <h2 class="location-subheading">${escapeHtml(hub.moreTitle)}</h2>
            <p class="location-outro">${hub.moreHtml}</p>
        </section>
    </div>
    </main>`;

  const html = renderPage({
    headHtml,
    mainHtml,
    htmlLang: hub.lang,
    bodyClass: 'page-marketing page-locale-hub',
    skipLink: hub.skipLink,
    footerGeo: hub.footerGeo,
    footerMarketLinks: hub.footerLinks,
  });

  const outFile = path.join(root, `${hub.file}.html`);
  fs.writeFileSync(outFile, html, 'utf8');
  console.log(`Wrote ${hub.path}`);
}

const LOCALE_HUBS = [
  {
    file: 'es',
    path: '/es',
    lang: 'es',
    hreflang: 'es',
    ogLocale: 'es_ES',
    ogLocaleAlt: 'es_CL',
    geoRegion: 'ES',
    geoPlacename: 'España',
    icbm: '40.4168, -3.7038',
    title: 'Desarrollo web España | Madrid, Barcelona y Valencia — IrigoyenDev',
    description:
      'Hub en español para clientes en España: desarrollo web, tienda online y landing pages en Madrid, Barcelona y Valencia. IrigoyenDev — remoto con base en Dinamarca.',
    homeLabel: 'Inicio',
    crumbLabel: 'España',
    breadcrumbLabel: 'Miga de pan',
    eyebrow: 'Mercado · España',
    h1: 'Desarrollo web para empresas en España',
    lead: 'Páginas locales indexables para Madrid, Barcelona y Valencia: e-commerce, landings de conversión y plataformas full stack, con atención en español.',
    cta: 'Pedir plan de proyecto →',
    waMessage: '¡Hola! Me interesa un proyecto web en España.',
    citiesTitle: 'Ciudades en España',
    cities: [
      {
        href: '/desarrollo-web-madrid',
        name: 'Madrid',
        blurb: 'tiendas online, landings y SEO para el mercado ibérico',
      },
      {
        href: '/desarrollo-web-barcelona',
        name: 'Barcelona',
        blurb: 'producto digital y e-commerce para marcas catalanas',
      },
      {
        href: '/desarrollo-web-valencia',
        name: 'Valencia',
        blurb: 'webs y landings para pymes del levante',
      },
    ],
    servicesTitle: 'Servicios',
    services: [
      {
        href: '/crear-tienda-online',
        label: 'Crear tienda online',
        blurb: 'E-commerce listo para vender, medir y escalar',
        cta: 'Ver tienda online →',
      },
      {
        href: '/landing-pages',
        label: 'Landing pages de conversión',
        blurb: 'Páginas de captación para campañas y ads',
        cta: 'Ver landings →',
      },
      {
        href: '/servicios',
        label: 'Todos los servicios',
        blurb: 'Full stack, SEO, GEO y planes Care',
        cta: 'Ver servicios →',
      },
      {
        href: '/precios',
        label: 'Precios',
        blurb: 'Rangos claros antes de comprometerte',
        cta: 'Ver precios →',
      },
    ],
    moreTitle: 'También operamos en',
    moreHtml:
      '<a href="/chile">Chile</a> · <a href="/santiago">Santiago y comunas</a> · <a href="/da">Dinamarca</a> · <a href="/en">English hub</a>',
    skipLink: 'Saltar al contenido',
    footerGeo: 'España · Dinamarca · Chile',
    footerLinks: [
      { href: '/es', label: 'España' },
      { href: '/en', label: 'English' },
      { href: '/da', label: 'Danmark' },
    ],
  },
  {
    file: 'en',
    path: '/en',
    lang: 'en',
    hreflang: 'en',
    ogLocale: 'en_US',
    ogLocaleAlt: 'en_GB',
    geoRegion: 'EU',
    geoPlacename: 'Copenhagen, Denmark',
    icbm: '55.6761, 12.5683',
    title: 'Web developer Chile, Spain & Denmark | IrigoyenDev',
    description:
      'English hub for IrigoyenDev: full-stack web development, e-commerce and conversion landings for clients in Chile, Spain and Denmark — remote delivery.',
    homeLabel: 'Home',
    crumbLabel: 'English',
    breadcrumbLabel: 'Breadcrumb',
    eyebrow: 'Market · International',
    h1: 'Full-stack web development for Chile, Spain and Denmark',
    lead: 'Crawlable English entry point to our local city pages, services and case studies. Same stack, clear timelines, remote delivery.',
    cta: 'Request a project plan →',
    waMessage: 'Hi! I am interested in a web project with IrigoyenDev.',
    citiesTitle: 'Where we work',
    cities: [
      {
        href: '/web-developer-copenhagen',
        name: 'Copenhagen',
        blurb: 'operating base — e-commerce Denmark and custom platforms',
      },
      {
        href: '/web-developer-aarhus',
        name: 'Aarhus',
        blurb: 'web developer for Jutland businesses',
      },
      {
        href: '/desarrollo-web-madrid',
        name: 'Madrid',
        blurb: 'Spain — stores, landings and full-stack products',
      },
      {
        href: '/santiago',
        name: 'Santiago',
        blurb: 'Chile hub with 52 commune pages',
      },
    ],
    servicesTitle: 'Services',
    services: [
      {
        href: '/crear-tienda-online',
        label: 'Online store / e-commerce',
        blurb: 'Stores ready to sell, measure and scale',
        cta: 'View e-commerce →',
      },
      {
        href: '/landing-pages',
        label: 'Conversion landing pages',
        blurb: 'Campaign pages built for leads and ads',
        cta: 'View landings →',
      },
      {
        href: '/servicios',
        label: 'All services',
        blurb: 'Full-stack, SEO, GEO and Care plans',
        cta: 'View services →',
      },
      {
        href: '/precios',
        label: 'Pricing',
        blurb: 'Clear ranges before you commit',
        cta: 'View pricing →',
      },
    ],
    moreTitle: 'Language / market hubs',
    moreHtml:
      '<a href="/es">España (ES)</a> · <a href="/da">Danmark (DA)</a> · <a href="/chile">Chile regions</a> · <a href="/santiago/comunas">Santiago communes</a>',
    skipLink: 'Skip to content',
    footerGeo: 'Denmark · Chile · Spain · Remote',
    footerLinks: [
      { href: '/en', label: 'English' },
      { href: '/es', label: 'España' },
      { href: '/da', label: 'Danmark' },
    ],
  },
  {
    file: 'da',
    path: '/da',
    lang: 'da',
    hreflang: 'da',
    ogLocale: 'da_DK',
    ogLocaleAlt: 'en_US',
    geoRegion: 'DK',
    geoPlacename: 'København, Danmark',
    icbm: '55.6761, 12.5683',
    title: 'Webudvikler København & Aarhus | IrigoyenDev',
    description:
      'Dansk hub for IrigoyenDev: fullstack webudvikling, e-commerce Danmark og konverterende landingsider i København og Aarhus — remote levering.',
    homeLabel: 'Forside',
    crumbLabel: 'Danmark',
    breadcrumbLabel: 'Brødkrumme',
    eyebrow: 'Marked · Danmark',
    h1: 'Webudvikling til virksomheder i Danmark',
    lead: 'Lokale sider for København og Aarhus: e-commerce, landingsider og skræddersyede platforme. Driftbase i København med remote levering.',
    cta: 'Anmod om projektplan →',
    waMessage: 'Hej! Jeg er interesseret i et webprojekt hos IrigoyenDev.',
    citiesTitle: 'Byer i Danmark',
    cities: [
      {
        href: '/web-developer-copenhagen',
        name: 'København',
        blurb: 'e-commerce Danmark, landings og fullstack',
      },
      {
        href: '/web-developer-aarhus',
        name: 'Aarhus',
        blurb: 'webudvikler til virksomheder i Jylland',
      },
    ],
    servicesTitle: 'Ydelser',
    services: [
      {
        href: '/crear-tienda-online',
        label: 'Online butik / e-commerce',
        blurb: 'Butikker klar til salg, måling og vækst',
        cta: 'Se e-commerce →',
      },
      {
        href: '/landing-pages',
        label: 'Konverterende landingsider',
        blurb: 'Kampagnesider til leads og annoncer',
        cta: 'Se landings →',
      },
      {
        href: '/servicios',
        label: 'Alle ydelser',
        blurb: 'Fullstack, SEO, GEO og Care-planer',
        cta: 'Se ydelser →',
      },
      {
        href: '/precios',
        label: 'Priser',
        blurb: 'Tydelige intervaller før du forpligter dig',
        cta: 'Se priser →',
      },
    ],
    moreTitle: 'Også til stede i',
    moreHtml:
      '<a href="/es">España</a> · <a href="/en">English</a> · <a href="/chile">Chile</a> · <a href="/santiago">Santiago</a>',
    skipLink: 'Spring til indhold',
    footerGeo: 'Danmark · Chile · Spanien',
    footerLinks: [
      { href: '/da', label: 'Danmark' },
      { href: '/en', label: 'English' },
      { href: '/es', label: 'España' },
    ],
  },
];

function main() {
  writeComunasIndex();
  for (const hub of LOCALE_HUBS) writeLocaleHub(hub);
}

main();
