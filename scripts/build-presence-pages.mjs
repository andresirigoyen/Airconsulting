/**
 * Build Chile presence pages (Temuco and other stubs not yet in geo-config).
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
  }
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

  const marketHub = '/chile';
  const marketLabel = 'Chile';

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

  const footerMarketLinks = [{ href: '/chile', label: 'Chile' }];

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
