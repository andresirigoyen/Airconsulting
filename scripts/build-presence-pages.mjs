/**
 * Build presence / city landing pages (ES + DK cities not yet in geo-config).
 * Uses shared page-chrome (full nav + brand footer).
 * Run: node scripts/build-presence-pages.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  SITE,
  escapeHtml,
  escapeAttr,
  buildHead,
  renderPage,
  waLink,
} from './lib/page-chrome.mjs';
import { withCtrTitle, withCtrDescription } from './lib/serp-ctr.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

/** @type {Array<object>} */
const PAGES = [
  {
    file: 'desarrollo-web-temuco.html',
    path: '/desarrollo-web-temuco',
    lang: 'es',
    hreflang: 'es-CL',
    ogLocale: 'es_CL',
    city: 'Temuco',
    region: 'Araucanía',
    country: 'Chile',
    countryCode: 'CL',
    lat: -38.7359,
    lng: -72.5904,
    title: 'Diseño web Temuco | Landings desde USD 600 — IrigoyenDev',
    description:
      'Diseño web Temuco y desarrollo en la Araucanía: landings desde USD 600, tiendas desde USD 1.304 y SEO local para pymes. Atención remota — IrigoyenDev.',
    h1: 'Diseño y desarrollo web profesional en Temuco',
    lead: 'Diseño web y canales digitales para negocios en Temuco y la Araucanía: e-commerce, landings de conversión y SEO técnico — con entrega remota y plazos claros.',
    body: 'Trabajamos remoto con pymes y equipos de Temuco que necesitan una web que genere consultas o ventas, no solo presencia. Stack moderno, medición de conversiones y copy alineado al mercado local.',
    semanticTopics: [
      'diseño web Temuco para pymes',
      'desarrollo web Araucanía',
      'tiendas online con envíos a regiones',
      'landings de captación de leads',
      'SEO técnico para búsquedas locales',
    ],
    faq: [
      {
        q: '¿Hacen diseño y desarrollo web para empresas en Temuco?',
        a: 'Sí. Atendemos proyectos en Temuco y la Araucanía de forma remota: tiendas online, landings y plataformas con SEO técnico.',
      },
      {
        q: '¿Cuánto cuesta un proyecto web?',
        a: 'Landings desde ~USD 600; productos comerciales desde ~USD 1.304. Detalle en https://www.irigoyendev.com/precios.',
      },
    ],
  },
  {
    file: 'desarrollo-web-madrid.html',
    path: '/desarrollo-web-madrid',
    lang: 'es',
    hreflang: 'es',
    ogLocale: 'es_ES',
    city: 'Madrid',
    region: 'Comunidad de Madrid',
    country: 'España',
    countryCode: 'ES',
    noindex: true,
    lat: 40.4168,
    lng: -3.7038,
    title: 'Desarrollador web Madrid | Crear tienda online España | IrigoyenDev',
    description:
      'Desarrollador web en Madrid: crear tienda online España, landings de conversión y plataformas full stack. IrigoyenDev — remoto con clientes en España.',
    h1: 'Desarrollo web profesional en Madrid',
    lead: 'Ayudamos a marcas y pymes en Madrid a lanzar tiendas online, landings y productos digitales medibles. Trabajamos remoto desde Dinamarca, en español.',
    body: 'Misma calidad técnica que en Chile y Dinamarca, adaptada a pasarelas europeas (Stripe, Redsys) y a un mercado donde la velocidad y el SEO técnico marcan la diferencia.',
    semanticTopics: [
      'desarrollo web para empresas españolas',
      'e-commerce internacional',
      'landing pages en español de España',
      'SEO técnico para mercado ibérico',
    ],
    faq: [
      {
        q: '¿Desarrollan webs para empresas en Madrid y España?',
        a: 'Sí. IrigoyenDev tiene presencia en España: tiendas online, landings y plataformas con stack moderno y SEO técnico.',
      },
      {
        q: '¿Cuál es la diferencia entre contratar en España vs. Chile?',
        a: 'Mismo estándar técnico, adaptado a pasarelas de pago locales (Stripe, Redsys) y normativa europea. Cotización en https://www.irigoyendev.com/precios.',
      },
      {
        q: '¿Hablan español nativo para proyectos en Madrid?',
        a: 'Sí. Andrés Irigoyen es nativo en español y trabaja con equipos locales en España cuando el proyecto lo requiere.',
      },
    ],
  },
  {
    file: 'desarrollo-web-barcelona.html',
    path: '/desarrollo-web-barcelona',
    lang: 'es',
    hreflang: 'es',
    ogLocale: 'es_ES',
    city: 'Barcelona',
    region: 'Cataluña',
    country: 'España',
    countryCode: 'ES',
    noindex: true,
    lat: 41.3874,
    lng: 2.1686,
    title: 'Desarrollo web Barcelona | Tienda online y landings | IrigoyenDev',
    description:
      'Desarrollo web en Barcelona: e-commerce, landing pages y plataformas a medida. Caso TheBeeBaby y atención remota en español.',
    h1: 'Desarrollo web profesional en Barcelona',
    lead: 'Desde landings de captación hasta marketplaces: construimos producto digital para equipos en Barcelona. Referencia: TheBeeBaby.',
    body: 'Barcelona concentra marcas de producto y e-commerce. Diseñamos y desarrollamos sitios rápidos, medibles y listos para escalar ventas o leads.',
    semanticTopics: [
      'desarrollo web para marcas en Barcelona',
      'e-commerce y marketplaces',
      'landings de conversión',
      'producto digital full stack',
    ],
    faq: [
      {
        q: '¿Trabajan con empresas en Barcelona?',
        a: 'Sí. Entregamos remoto en español: tiendas online, landings y plataformas. Referencia de e-commerce: TheBeeBaby.',
      },
      {
        q: '¿Incluyen SEO técnico?',
        a: 'Sí. Canonical, schema, rendimiento y estructura indexable forman parte del entregable estándar.',
      },
    ],
  },
  {
    file: 'desarrollo-web-valencia.html',
    path: '/desarrollo-web-valencia',
    lang: 'es',
    hreflang: 'es',
    ogLocale: 'es_ES',
    city: 'Valencia',
    region: 'Comunidad Valenciana',
    country: 'España',
    countryCode: 'ES',
    noindex: true,
    lat: 39.4699,
    lng: -0.3763,
    title: 'Desarrollo web Valencia | E-commerce y landings | IrigoyenDev',
    description:
      'Desarrollo web en Valencia: tienda online, landings de conversión y SEO técnico para pymes. IrigoyenDev — remoto en español.',
    h1: 'Desarrollo web profesional en Valencia',
    lead: 'Producto web claro y rápido para negocios en Valencia: e-commerce, landings y plataformas con medición de conversiones.',
    body: 'Para pymes del levante que necesitan un canal digital serio: plazos claros, stack moderno y foco en conversión, no en plantillas genéricas.',
    semanticTopics: [
      'desarrollo web para pymes en Valencia',
      'tienda online y pasarelas europeas',
      'landings de captación',
      'SEO técnico local',
    ],
    faq: [
      {
        q: '¿Hacen webs para empresas en Valencia?',
        a: 'Sí. Trabajamos remoto en español con e-commerce, landings y plataformas a medida.',
      },
      {
        q: '¿Cómo empezamos?',
        a: 'Escríbenos por el formulario o WhatsApp con el objetivo del proyecto; respondemos con un plan y rango de inversión.',
      },
    ],
  },
  {
    file: 'web-developer-copenhagen.html',
    path: '/web-developer-copenhagen',
    lang: 'en',
    hreflang: 'en',
    ogLocale: 'en_US',
    city: 'Copenhagen',
    region: 'Capital Region',
    country: 'Denmark',
    countryCode: 'DK',
    lat: 55.6761,
    lng: 12.5683,
    title: 'Web developer Copenhagen | E-commerce Denmark | IrigoyenDev',
    description:
      'Full-stack web developer in Copenhagen: e-commerce Denmark, conversion landings and custom platforms. IrigoyenDev — based in Denmark.',
    h1: 'Full-stack web development in Copenhagen',
    lead: 'We build online stores, conversion landings and business platforms for teams in Copenhagen and across Denmark — remote-friendly, English or Spanish.',
    body: 'Based in Denmark with international delivery experience. Clear scopes, modern stack, and technical SEO built into every launch.',
    semanticTopics: [
      'web development for Danish businesses',
      'e-commerce with international shipping',
      'technical SEO for Nordic markets',
      'full stack development in English/Danish',
    ],
    faq: [
      {
        q: 'Do you work with businesses in Copenhagen and Denmark?',
        a: 'Yes. IrigoyenDev operates from Copenhagen with international experience: e-commerce, landing pages and custom platforms.',
      },
      {
        q: 'What is your pricing for web development in Denmark?',
        a: 'Commercial products from ~from ~USD 1,304; landing pages from ~USD 600. Details at https://www.irigoyendev.com/precios.',
      },
      {
        q: 'Do you speak Danish or English for local projects?',
        a: 'We work in English and Spanish. For Danish-language projects we collaborate with local copywriters to ensure cultural accuracy.',
      },
    ],
  },
  {
    file: 'web-developer-aarhus.html',
    path: '/web-developer-aarhus',
    lang: 'en',
    hreflang: 'en',
    ogLocale: 'en_US',
    city: 'Aarhus',
    region: 'Central Denmark',
    country: 'Denmark',
    countryCode: 'DK',
    lat: 56.1629,
    lng: 10.2039,
    title: 'Webudvikler Aarhus | Webshops fra USD 600 — IrigoyenDev',
    description:
      'Webudvikler i Aarhus: skræddersyede websites, webshops og landingsider — ikke Magento-bureau. Moderne stack, remote fra Danmark. IrigoyenDev.',
    h1: 'Webudvikler i Aarhus — custom websites & webshops',
    lead: 'Custom web products for Aarhus and Jutland: e-commerce, conversion landings and admin platforms — modern stack, not Magento/WordPress agency templates.',
    body: 'Copenhagen-based team with remote delivery for Jutland companies that need a measurable digital channel. We build to your product and payments stack — we are not a Magento 2 agency.',
    semanticTopics: [
      'webudvikler Aarhus',
      'custom web developer Aarhus',
      'e-commerce Denmark',
      'conversion landing pages',
      'custom business platforms',
    ],
    faq: [
      {
        q: 'Do you take projects in Aarhus?',
        a: 'Yes. We deliver remotely from Denmark: custom e-commerce, landings and platforms for Aarhus and Jutland teams.',
      },
      {
        q: 'Do you work with Magento 2?',
        a: 'No. We build custom and modern stacks (e.g. headless/Next-style product sites). For Magento maintenance, hire a dedicated Magento agency.',
      },
      {
        q: 'How do we start?',
        a: 'Send a short brief via the contact form or WhatsApp. We reply with a plan and investment range.',
      },
    ],
  },
];

function buildHtml(p) {
  const isEn = p.lang === 'en';
  const back = isEn ? 'Back to home' : 'Volver al inicio';
  const cta = isEn ? 'Request a project plan →' : 'Pedir plan de proyecto →';
  const related = isEn ? 'Related services' : 'Servicios relacionados';
  const focusTitle = isEn ? 'What we focus on' : 'Enfoque local';
  const faqTitle = isEn ? 'FAQ' : 'Preguntas frecuentes';
  const aboutTitle = isEn ? `Working with ${p.city}` : `Trabajar con ${p.city}`;
  const crumbLabel = isEn ? 'Breadcrumb' : 'Miga de pan';
  const homeLabel = isEn ? 'Home' : 'Inicio';
  const skipLink = isEn ? 'Skip to content' : 'Saltar al contenido';

  const marketHub =
    p.countryCode === 'ES' ? '/es' : p.countryCode === 'DK' ? '/da' : '/chile';
  const marketLabel =
    p.countryCode === 'ES' ? 'España' : p.countryCode === 'DK' ? 'Danmark' : 'Chile';

  const services = [
    {
      href: '/crear-tienda-online',
      name: isEn ? 'Online store' : 'Tienda online',
      nameKey: 'svc.shopTitle',
      blurb: isEn
        ? 'E-commerce ready to sell and measure'
        : 'E-commerce listo para vender y medir',
      blurbKey: 'svc.shopDesc',
    },
    {
      href: '/landing-pages',
      name: isEn ? 'Landing pages' : 'Landing pages',
      nameKey: 'svc.landingTitle',
      blurb: isEn
        ? 'Conversion pages for campaigns and ads'
        : 'Páginas de conversión para campañas',
      blurbKey: 'svc.landingDesc',
    },
    {
      href: '/servicios',
      name: isEn ? 'All services' : 'Todos los servicios',
      nameKey: 'footer.linkServices',
      blurb: isEn
        ? 'Full-stack, SEO, GEO and Care plans'
        : 'Full stack, SEO, GEO y planes Care',
    },
    {
      href: '/precios',
      name: isEn ? 'Pricing' : 'Precios',
      nameKey: 'nav.pricing',
      blurb: isEn
        ? 'Clear ranges before you commit'
        : 'Rangos claros antes de comprometerte',
    },
  ];

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: homeLabel, item: `${SITE}/` },
        {
          '@type': 'ListItem',
          position: 2,
          name: p.country,
          item: `${SITE}${marketHub}`,
        },
        { '@type': 'ListItem', position: 3, name: p.city, item: `${SITE}${p.path}` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': ['ProfessionalService', 'LocalBusiness'],
      '@id': `${SITE}${p.path}#localbusiness`,
      name: `IrigoyenDev — ${p.city}`,
      url: `${SITE}${p.path}`,
      description: p.description,
      telephone: '+45-5024-9855',
      email: 'andres@irigoyendev.com',
      priceRange: '$$-$$$',
      address: {
        '@type': 'PostalAddress',
        addressLocality: p.city,
        addressRegion: p.region,
        addressCountry: p.countryCode,
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: p.lat,
        longitude: p.lng,
      },
      areaServed: { '@type': 'City', name: p.city },
    },
  ];

  if (Array.isArray(p.faq) && p.faq.length) {
    jsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: p.faq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    });
  }

  const topicsHtml =
    Array.isArray(p.semanticTopics) && p.semanticTopics.length
      ? `<section class="project-section fade-in">
            <h2>${focusTitle}</h2>
            <p class="location-intro">${escapeHtml(p.body || p.lead)}</p>
            <ul class="project-results-list location-neighborhoods">
                ${p.semanticTopics.map((t) => `<li>${escapeHtml(t)}</li>`).join('\n                ')}
            </ul>
        </section>`
      : `<section class="project-section fade-in">
            <h2>${aboutTitle}</h2>
            <p class="location-intro">${escapeHtml(p.body || p.lead)}</p>
        </section>`;

  const servicesHtml = `<section class="project-section fade-in">
            <h2>${related}</h2>
            <div class="location-grid location-grid--services">
                ${services
                  .map(
                    (s) => `<article class="location-card">
                    <h3><a href="${escapeAttr(s.href)}"${s.nameKey ? ` data-i18n="${s.nameKey}"` : ''}>${escapeHtml(s.name)}</a></h3>
                    <p${s.blurbKey ? ` data-i18n="${s.blurbKey}"` : ''}>${escapeHtml(s.blurb)}</p>
                    <a href="${escapeAttr(s.href)}" class="project-link"><span data-i18n="mkt.seeService">${isEn ? 'View service' : 'Ver servicio'}</span></a>
                </article>`
                  )
                  .join('\n                ')}
            </div>
        </section>`;

  const faqHtml =
    Array.isArray(p.faq) && p.faq.length
      ? `<section class="project-section fade-in" aria-labelledby="faq-title" id="faq">
            <h2 id="faq-title">${faqTitle}</h2>
            <div class="faq-list">
                ${p.faq
                  .map(
                    (f) => `<details class="faq-item">
                    <summary>${escapeHtml(f.q)}</summary>
                    <p class="money-copy">${escapeHtml(f.a)}</p>
                </details>`
                  )
                  .join('\n                ')}
            </div>
        </section>`
      : '';

  const headHtml = buildHead({
    title: p.noindex ? p.title : withCtrTitle(p.title),
    description: p.noindex ? p.description : withCtrDescription(p.description),
    canonicalPath: p.path,
    ogTitle: p.title,
    ogDescription: p.description,
    hreflang: p.hreflang || p.lang,
    ogLocale: p.ogLocale,
    geoRegion: p.countryCode,
    geoPlacename: `${p.city}, ${p.region}`,
    icbm: `${p.lat}, ${p.lng}`,
    robots: p.noindex
      ? 'noindex, follow'
      : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    jsonLd,
  });

  const mainHtml = `
    <main id="main-content">
    <header class="project-header container fade-in">
        <a href="/" class="back-link"><span data-i18n="mkt.backHome">← ${back}</span></a>
        <nav class="geo-breadcrumb" aria-label="${crumbLabel}">
          <ol>
            <li><a href="/" data-i18n="footer.linkHome">${homeLabel}</a></li>
            <li><a href="${marketHub}">${escapeHtml(p.country)}</a></li>
            <li aria-current="page">${escapeHtml(p.city)}</li>
          </ol>
        </nav>
        <p class="project-eyebrow">${escapeHtml(p.country)} · ${escapeHtml(p.city)}</p>
        <h1>${escapeHtml(p.h1)}</h1>
        <p class="project-lead">${escapeHtml(p.lead)}</p>
        <div class="project-header__actions">
            <a href="/#contact" class="btn-cta-primary" data-i18n="svc.ctaPlan">${cta}</a>
            <a href="${waLink(isEn ? 'Hi! I saw your portfolio and would like to discuss a project.' : '¡Hola! Vi tu portafolio y me gustaría platicar sobre un posible proyecto.')}" class="project-cta-inline" target="_blank" rel="noopener noreferrer" data-i18n="mkt.ctaWhatsApp">WhatsApp →</a>
        </div>
    </header>
    <div class="container">
        ${topicsHtml}
        ${servicesHtml}
        ${faqHtml}
        <section class="project-section fade-in">
            <p class="location-outro">
                <a href="${marketHub}">${isEn ? 'Market hub' : 'Hub de mercado'} (${escapeHtml(marketLabel)})</a>
                · <a href="/precios" data-i18n="nav.pricing">${isEn ? 'Pricing' : 'Precios'}</a>
                · <a href="/#contact" data-i18n="nav.contact">${isEn ? 'Contact' : 'Contacto'}</a>
            </p>
        </section>
    </div>
    </main>`;

  const footerMarketLinks = [
    { href: '/chile', label: 'Chile' },
    { href: '/da', label: 'Danmark' },
    { href: '/en', label: 'English' },
  ].filter((l, i, arr) => arr.findIndex((x) => x.href === l.href) === i);

  return renderPage({
    headHtml,
    mainHtml,
    htmlLang: p.lang,
    bodyClass: 'page-marketing page-location page-presence',
    skipLink,
    footerGeo: `${p.country} · ${p.city} · Remoto`,
    footerMarketLinks,
  });
}

for (const p of PAGES) {
  fs.writeFileSync(path.join(root, p.file), buildHtml(p), 'utf8');
  console.log('Wrote', p.path);
}

fs.writeFileSync(
  path.join(root, 'data', 'presence-pages.json'),
  JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      pages: PAGES.map((p) => ({
        path: p.path,
        file: p.file,
        city: p.city,
        countryCode: p.countryCode,
        indexable: !p.noindex,
      })),
    },
    null,
    2
  ) + '\n'
);
console.log('Done', PAGES.length, 'presence pages');
