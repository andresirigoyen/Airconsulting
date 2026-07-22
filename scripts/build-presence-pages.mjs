/**
 * Build lightweight presence / city landing stubs (ES + DK cities not yet in geo-config).
 * Run: node scripts/build-presence-pages.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const SITE = 'https://www.irigoyendev.com';
const WA =
  'https://wa.me/+4550249855?text=%C2%A1Hola!%20Vi%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20platicar%20sobre%20un%20posible%20proyecto.';

/** @type {Array<object>} */
const PAGES = [
  {
    file: 'desarrollo-web-temuco.html',
    path: '/desarrollo-web-temuco',
    lang: 'es',
    city: 'Temuco',
    region: 'Araucanía',
    country: 'Chile',
    countryCode: 'CL',
    lat: -38.7359,
    lng: -72.5904,
    title: 'Desarrollo web en Temuco | IrigoyenDev',
    description:
      'Desarrollo web en Temuco: tiendas online, landings y plataformas para pymes de la Araucanía. Atención remota con IrigoyenDev.',
    h1: 'Desarrollo web profesional en Temuco',
    lead: 'Construimos canales digitales para negocios en Temuco y la Araucanía: e-commerce, landings de conversión y SEO técnico — con entrega remota y plazos claros.',
  },
  {
    file: 'desarrollo-web-madrid.html',
    path: '/desarrollo-web-madrid',
    lang: 'es',
    city: 'Madrid',
    region: 'Comunidad de Madrid',
    country: 'España',
    countryCode: 'ES',
    lat: 40.4168,
    lng: -3.7038,
    title: 'Desarrollador web Madrid | Crear tienda online España | IrigoyenDev',
    description:
      'Desarrollador web en Madrid: crear tienda online España, landings de conversión y plataformas full stack. IrigoyenDev — remoto con clientes en España.',
    h1: 'Desarrollo web profesional en Madrid',
    lead: 'Ayudamos a marcas y pymes en Madrid a lanzar tiendas online, landings y productos digitales medibles. Trabajamos remoto desde Dinamarca, en español.',
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
    city: 'Barcelona',
    region: 'Cataluña',
    country: 'España',
    countryCode: 'ES',
    lat: 41.3874,
    lng: 2.1686,
    title: 'Desarrollo web Barcelona | Tienda online y landings | IrigoyenDev',
    description:
      'Desarrollo web en Barcelona: e-commerce, landing pages y plataformas a medida. Caso TheBeeBaby y atención remota en español.',
    h1: 'Desarrollo web profesional en Barcelona',
    lead: 'Desde landings de captación hasta marketplaces: construimos producto digital para equipos en Barcelona. Referencia: TheBeeBaby.',
  },
  {
    file: 'desarrollo-web-valencia.html',
    path: '/desarrollo-web-valencia',
    lang: 'es',
    city: 'Valencia',
    region: 'Comunidad Valenciana',
    country: 'España',
    countryCode: 'ES',
    lat: 39.4699,
    lng: -0.3763,
    title: 'Desarrollo web Valencia | E-commerce y landings | IrigoyenDev',
    description:
      'Desarrollo web en Valencia: tienda online, landings de conversión y SEO técnico para pymes. IrigoyenDev — remoto en español.',
    h1: 'Desarrollo web profesional en Valencia',
    lead: 'Producto web claro y rápido para negocios en Valencia: e-commerce, landings y plataformas con medición de conversiones.',
  },
  {
    file: 'web-developer-copenhagen.html',
    path: '/web-developer-copenhagen',
    lang: 'en',
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
        a: 'Commercial products from ~USD 3,000–10,000; landing pages from ~USD 600. Details at https://www.irigoyendev.com/precios.',
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
    city: 'Aarhus',
    region: 'Central Denmark',
    country: 'Denmark',
    countryCode: 'DK',
    lat: 56.1629,
    lng: 10.2039,
    title: 'Web developer Aarhus | E-commerce Denmark | IrigoyenDev',
    description:
      'Web developer in Aarhus: e-commerce, landing pages and full-stack products for Danish SMEs. IrigoyenDev — Denmark-based.',
    h1: 'Full-stack web development in Aarhus',
    lead: 'Custom web products for Aarhus businesses: e-commerce, lead-gen landings and admin platforms with clear delivery.',
  },
];

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildHtml(p) {
  const isEn = p.lang === 'en';
  const back = isEn ? 'Back to home' : 'Volver al inicio';
  const cta = isEn ? 'Request a project plan →' : 'Pedir plan de proyecto →';
  const services = isEn ? 'Services' : 'Servicios';
  const pricing = isEn ? 'Pricing' : 'Precios';
  const related = isEn ? 'Related' : 'También te puede interesar';

  const jsonLd = {
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
  };

  const faqTitle = isEn ? 'FAQ' : 'Preguntas frecuentes';
  const topicsTitle = isEn ? 'What we focus on' : 'Enfoque local';

  const topicsHtml =
    Array.isArray(p.semanticTopics) && p.semanticTopics.length
      ? `<section class="project-section fade-in">
            <div class="content-block">
                <h2>${topicsTitle}</h2>
                <ul class="project-results-list">
                    ${p.semanticTopics.map((t) => `<li>${escapeHtml(t)}</li>`).join('\n                    ')}
                </ul>
            </div>
        </section>`
      : '';

  const faqHtml =
    Array.isArray(p.faq) && p.faq.length
      ? `<section class="project-section fade-in" aria-labelledby="faq-title">
            <div class="content-block">
                <h2 id="faq-title">${faqTitle}</h2>
                <div class="faq-list">
                    ${p.faq
                      .map(
                        (f) => `<details class="faq-item">
                        <summary>${escapeHtml(f.q)}</summary>
                        <p>${escapeHtml(f.a)}</p>
                    </details>`
                      )
                      .join('\n                    ')}
                </div>
            </div>
        </section>`
      : '';

  return `<!DOCTYPE html>
<html lang="${p.lang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapeHtml(p.title)}</title>
    <meta name="description" content="${escapeHtml(p.description)}">
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
    <link rel="canonical" href="${SITE}${p.path}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="${SITE}${p.path}">
    <meta property="og:title" content="${escapeHtml(p.title)}">
    <meta property="og:description" content="${escapeHtml(p.description)}">
    <meta property="og:image" content="${SITE}/images/og-image.png">
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <link rel="stylesheet" href="/css/style.css">
    <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
</head>
<body class="page-marketing">
    <nav class="navbar" id="navbar">
        <div class="container navbar-inner">
            <a href="/" class="logo" aria-label="IrigoyenDev — Home"><span class="logo__name">Irigoyen</span><span class="logo__accent">Dev</span><span class="logo__dot" aria-hidden="true">.</span></a>
            <div class="nav-links" id="nav-links">
                <a href="/servicios">${services}</a>
                <a href="/#projects">Projects</a>
                <a href="/precios">${pricing}</a>
                <a href="/#contact" class="nav-cta">${isEn ? 'Quote' : 'Cotizar'}</a>
            </div>
        </div>
    </nav>

    <header class="project-header container fade-in">
        <a href="/" class="back-link"><span>← ${back}</span></a>
        <p class="project-eyebrow">${escapeHtml(p.country)} · ${escapeHtml(p.city)}</p>
        <h1>${escapeHtml(p.h1)}</h1>
        <p class="project-lead">${escapeHtml(p.lead)}</p>
        <div class="project-header__actions">
            <a href="/#contact" class="btn-cta-primary">${cta}</a>
            <a href="${WA}" class="project-cta-inline" target="_blank" rel="noopener noreferrer">WhatsApp →</a>
        </div>
    </header>
    <main class="container">
        ${topicsHtml}
        ${faqHtml}
        <section class="project-section fade-in">
            <div class="content-block">
                <h2>${related}</h2>
                <ul class="project-results-list">
                    <li><a href="/crear-tienda-online">${isEn ? 'Online store / e-commerce' : 'Crear tienda online'}</a></li>
                    <li><a href="/landing-pages">${isEn ? 'Conversion landing pages' : 'Landing pages de conversión'}</a></li>
                    <li><a href="/servicios">${isEn ? 'All services' : 'Todos los servicios'}</a></li>
                    <li><a href="/#markets">${isEn ? 'Where we work' : 'Dónde trabajamos'}</a></li>
                </ul>
            </div>
        </section>
    </main>

    <footer class="footer">
        <div class="container footer-seo">
            <p>&copy; 2026 IrigoyenDev</p>
            <nav class="footer-links" aria-label="SEO">
                <a href="/servicios">${services}</a>
                <a href="/precios">${pricing}</a>
                <a href="/#contact">${isEn ? 'Contact' : 'Contacto'}</a>
            </nav>
        </div>
    </footer>
    <script src="/js/script.js"></script>
</body>
</html>
`;
}

for (const p of PAGES) {
  fs.writeFileSync(path.join(root, p.file), buildHtml(p), 'utf8');
  console.log('Wrote', p.path);
}

// Index for sitemap merge helper
fs.writeFileSync(
  path.join(root, 'data', 'presence-pages.json'),
  JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      pages: PAGES.map((p) => ({ path: p.path, file: p.file, city: p.city, countryCode: p.countryCode })),
    },
    null,
    2
  ) + '\n'
);
console.log('Done', PAGES.length, 'presence pages');
