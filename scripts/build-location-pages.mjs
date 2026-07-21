/**
 * Factory: generates static location pages from data/locations/*.json
 *
 * Why build-time (not SSR / client fetch)?
 * - TTFB stays CDN-static (no JSON parse on request)
 * - HTML is fully crawlable (SEO)
 * - Adding a comuna = edit JSON + re-run build (no duplicated HTML files by hand)
 *
 * Scale to a new city:
 * 1. Copy data/locations/santiago.json → data/locations/<city>.json
 * 2. Fill city + comunas (unique copy per entry — never reuse the same H1/lead)
 * 3. npm run build:locations && npm run build:sitemap
 *
 * Run: node scripts/build-location-pages.mjs
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
const dataDir = path.join(root, 'data', 'locations');

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * @param {unknown} data
 * @param {string} file
 */
function validateLocationFile(data, file) {
  const errors = [];
  if (!data || typeof data !== 'object') {
    throw new Error(`${file}: root must be an object`);
  }
  const city = /** @type {Record<string, any>} */ (data).city;
  const comunas = /** @type {Record<string, any>} */ (data).comunas;

  if (!city?.slug || !SLUG_RE.test(city.slug)) errors.push('city.slug invalid');
  if (!city?.name) errors.push('city.name required');
  if (!city?.hub?.seo?.metaTitle || !city?.hub?.seo?.metaDescription) {
    errors.push('city.hub.seo.metaTitle/metaDescription required');
  }
  if (!city?.hub?.content?.h1 || !city?.hub?.content?.lead) {
    errors.push('city.hub.content.h1/lead required');
  }
  if (!Array.isArray(comunas) || comunas.length === 0) {
    errors.push('comunas must be a non-empty array');
  }

  const slugs = new Set();
  for (const c of comunas || []) {
    if (!c?.slug || !SLUG_RE.test(c.slug)) errors.push(`comuna slug invalid: ${c?.slug}`);
    if (slugs.has(c.slug)) errors.push(`duplicate comuna slug: ${c.slug}`);
    slugs.add(c.slug);
    if (!c.name) errors.push(`${c.slug}: name required`);
    if (!c.seo?.metaTitle || !c.seo?.metaDescription) {
      errors.push(`${c.slug}: seo.metaTitle/metaDescription required`);
    }
    if (!c.content?.h1 || !c.content?.lead || !c.content?.localAngle) {
      errors.push(`${c.slug}: content.h1/lead/localAngle required`);
    }
    // Soft uniqueness: titles should not be identical across comunas
  }

  const titles = (comunas || []).map((c) => c.content?.h1).filter(Boolean);
  if (new Set(titles).size !== titles.length) {
    errors.push('Duplicate content.h1 across comunas (thin/duplicate content risk)');
  }

  if (errors.length) {
    throw new Error(`${file} validation failed:\n- ${errors.join('\n- ')}`);
  }
}

/**
 * @param {object} city
 * @param {object[]} comunas
 * @param {string} [activeSlug]
 */
function renderComunaNav(city, comunas, activeSlug = '') {
  const links = comunas
    .map((c) => {
      const href = `/${city.slug}/${c.slug}`;
      const current = c.slug === activeSlug;
      return `<a href="${href}" class="location-nav__link${current ? ' is-active' : ''}"${current ? ' aria-current="page"' : ''}>${escapeHtml(c.name)}</a>`;
    })
    .join('\n                ');

  return `
        <nav class="location-nav" aria-label="Comunas de ${escapeAttr(city.name)}">
            <a href="/${city.slug}" class="location-nav__link${activeSlug === '' ? ' is-active' : ''}"${activeSlug === '' ? ' aria-current="page"' : ''}>Todas</a>
            ${links}
        </nav>`;
}

/**
 * @param {object} city
 * @param {object} comuna
 * @param {object[]} allComunas
 */
function buildComunaJsonLd(city, comuna, allComunas) {
  const pageUrl = `${SITE}/${city.slug}/${comuna.slug}`;
  const lat = comuna.geo?.latitude ?? city.geo?.latitude;
  const lng = comuna.geo?.longitude ?? city.geo?.longitude;

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: city.name, item: `${SITE}/${city.slug}` },
        { '@type': 'ListItem', position: 3, name: comuna.name, item: pageUrl },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': ['ProfessionalService', 'LocalBusiness'],
      '@id': `${pageUrl}#localbusiness`,
      name: `IrigoyenDev — ${comuna.name}`,
      url: pageUrl,
      image: OG_DEFAULT,
      description: comuna.seo.metaDescription,
      telephone: '+45-5024-9855',
      email: 'andres@irigoyendev.com',
      priceRange: '$$-$$$',
      address: {
        '@type': 'PostalAddress',
        addressLocality: comuna.name,
        addressRegion: city.region || city.name,
        addressCountry: city.countryCode || 'CL',
      },
      areaServed: {
        '@type': 'AdministrativeArea',
        name: `${comuna.name}, ${city.name}`,
        containedInPlace: {
          '@type': 'City',
          name: city.name,
          containedInPlace: {
            '@type': 'Country',
            name: city.countryName || 'Chile',
          },
        },
      },
      geo:
        Number.isFinite(lat) && Number.isFinite(lng)
          ? { '@type': 'GeoCoordinates', latitude: lat, longitude: lng }
          : undefined,
      serviceType: [
        'Desarrollo web',
        'E-commerce',
        'Landing pages',
        'SEO',
      ],
      provider: { '@id': `${SITE}/#person` },
      parentOrganization: { '@id': `${SITE}/#business` },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${pageUrl}#service`,
      name: comuna.content.h1,
      description: comuna.content.lead,
      url: pageUrl,
      areaServed: { '@type': 'Place', name: `${comuna.name}, ${city.name}` },
      provider: { '@id': `${SITE}/#business` },
    },
    ...(comuna.faq?.length
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            '@id': `${pageUrl}#faq`,
            mainEntity: comuna.faq.map((item) => ({
              '@type': 'Question',
              name: item.q,
              acceptedAnswer: { '@type': 'Answer', text: item.a },
            })),
          },
        ]
      : []),
  ].map((block) => {
    // Strip undefined keys (e.g. geo)
    return JSON.parse(JSON.stringify(block));
  });
}

/**
 * @param {object} city
 * @param {object[]} comunas
 */
function buildHubJsonLd(city, comunas) {
  const pageUrl = `${SITE}/${city.slug}`;
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: city.name, item: pageUrl },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': `${pageUrl}#collection`,
      name: city.hub.seo.metaTitle,
      description: city.hub.seo.metaDescription,
      url: pageUrl,
      isPartOf: { '@id': `${SITE}/#website` },
      about: {
        '@type': 'City',
        name: city.name,
        containedInPlace: {
          '@type': 'Country',
          name: city.countryName || 'Chile',
        },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      '@id': `${pageUrl}#comunas`,
      name: `Comunas de ${city.name}`,
      itemListElement: comunas.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: c.name,
        url: `${SITE}/${city.slug}/${c.slug}`,
      })),
    },
    ...(city.hub.faq?.length
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            '@id': `${pageUrl}#faq`,
            mainEntity: city.hub.faq.map((item) => ({
              '@type': 'Question',
              name: item.q,
              acceptedAnswer: { '@type': 'Answer', text: item.a },
            })),
          },
        ]
      : []),
  ];
}

/**
 * Template: city hub page
 * @param {object} city
 * @param {object[]} comunas
 */
function renderHubMain(city, comunas) {
  const c = city.hub.content;
  const cards = comunas
    .map(
      (comuna) => `
            <article class="location-card">
                <h3><a href="/${city.slug}/${comuna.slug}">${escapeHtml(comuna.name)}</a></h3>
                <p>${escapeHtml(comuna.content.lead)}</p>
                <a href="/${city.slug}/${comuna.slug}" class="project-link">Ver servicios en ${escapeHtml(comuna.name)} →</a>
            </article>`
    )
    .join('\n');

  const audiences = (c.audiences || [])
    .map(
      (a) => `
                <article class="pricing-card">
                    <h3 class="pricing-card__title">${escapeHtml(a.title)}</h3>
                    <p class="pricing-card__desc">${escapeHtml(a.desc)}</p>
                </article>`
    )
    .join('\n');

  const faq =
    city.hub.faq
      ?.map(
        (item) => `
            <details class="faq-item">
                <summary>${escapeHtml(item.q)}</summary>
                <p>${escapeHtml(item.a)}</p>
            </details>`
      )
      .join('\n') || '';

  return `
    <main id="main-content">
    <header class="project-header container fade-in">
        <a href="/chile" class="back-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            <span>Chile · regiones</span>
        </a>
        <p class="project-eyebrow">${escapeHtml(c.eyebrow)}</p>
        <h1>${escapeHtml(c.h1)}</h1>
        <p class="project-lead">${escapeHtml(c.lead)}</p>
        <div class="project-header__actions">
            <a href="/#contact" class="btn-cta-primary">${escapeHtml(c.ctaPrimary)}</a>
            <a href="/servicios" class="project-cta-inline">${escapeHtml(c.ctaSecondary)}</a>
        </div>
    </header>
    <div class="container">
        ${renderComunaNav(city, comunas, '')}
        <section class="project-section fade-in">
            ${(c.intro || []).map((p) => `<p class="location-intro">${escapeHtml(p)}</p>`).join('\n            ')}
            ${
              audiences
                ? `<h2 class="location-subheading" style="margin-top:1.5rem">A quiénes ayudamos en Santiago</h2>
            <div class="pricing-grid">${audiences}</div>`
                : ''
            }
            <h2 class="location-subheading" style="margin-top:2rem">Por comuna</h2>
            <div class="location-grid">
${cards}
            </div>
            <p class="location-outro" style="margin-top:2rem">
                También: <a href="/chile">otras regiones de Chile</a>
                ·
                <a href="/blog">Blog</a>
            </p>
        </section>
        ${
          faq
            ? `<section class="project-section fade-in" aria-labelledby="location-hub-faq">
            <h2 id="location-hub-faq">Preguntas frecuentes</h2>
            <div class="faq-list">${faq}</div>
        </section>`
            : ''
        }
    </div>
    </main>`;
}

/**
 * Template: single comuna page — all strings from JSON
 * @param {object} city
 * @param {object} comuna
 * @param {object[]} allComunas
 */
function renderComunaMain(city, comuna, allComunas) {
  const content = comuna.content;
  const wa = waLink(
    `¡Hola! Me interesa un proyecto web en ${comuna.name}, Santiago.`
  );

  const pains = (content.painPoints || [])
    .map((p) => `<li>${escapeHtml(p)}</li>`)
    .join('\n                        ');

  const services = (content.services || [])
    .map(
      (s) => `
                <article class="pricing-card service-card">
                    <h3 class="pricing-card__title"><a href="${escapeAttr(s.href)}">${escapeHtml(s.title)}</a></h3>
                    <p class="pricing-card__desc">${escapeHtml(s.desc)}</p>
                    <a href="${escapeAttr(s.href)}" class="project-link">Ver más →</a>
                </article>`
    )
    .join('\n');

  const neighborhoods = (comuna.neighborhoods || [])
    .map((n) => `<li>${escapeHtml(n)}</li>`)
    .join('');

  const related = (comuna.relatedSlugs || [])
    .map((slug) => allComunas.find((x) => x.slug === slug))
    .filter(Boolean)
    .map(
      (r) =>
        `<a href="/${city.slug}/${r.slug}" class="location-related__link">${escapeHtml(r.name)}</a>`
    )
    .join('\n                ');

  const faq =
    comuna.faq
      ?.map(
        (item) => `
            <details class="faq-item">
                <summary>${escapeHtml(item.q)}</summary>
                <p>${escapeHtml(item.a)}</p>
            </details>`
      )
      .join('\n') || '';

  return `
    <main id="main-content">
    <header class="project-header container fade-in">
        <a href="/${city.slug}" class="back-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            <span>Santiago · comunas</span>
        </a>
        <p class="project-eyebrow">${escapeHtml(content.eyebrow)}</p>
        <h1>${escapeHtml(content.h1)}</h1>
        <p class="project-lead">${escapeHtml(content.lead)}</p>
        <div class="project-header__actions">
            <a href="/?service=fullstack#contact" class="btn-cta-primary">${escapeHtml(content.ctaPrimary)}</a>
            <a href="${wa}" class="project-cta-inline" target="_blank" rel="noopener noreferrer">${escapeHtml(content.ctaWhatsApp)}</a>
        </div>
    </header>
    <div class="container">
        ${renderComunaNav(city, allComunas, comuna.slug)}
        <section class="project-section fade-in">
            <h2>Enfoque en ${escapeHtml(comuna.name)}</h2>
            <p>${escapeHtml(content.localAngle)}</p>
            ${
              neighborhoods
                ? `<h3 class="location-subheading">Sectores de referencia</h3>
            <ul class="project-results-list location-neighborhoods">${neighborhoods}</ul>`
                : ''
            }
        </section>
        <section class="project-section fade-in">
            <h2>Retos habituales</h2>
            <ul class="project-results-list">
                        ${pains}
            </ul>
        </section>
        <section class="project-section fade-in">
            <h2>Servicios para ${escapeHtml(comuna.name)}</h2>
            <div class="pricing-grid pricing-grid--care">
${services}
            </div>
        </section>
        ${
          faq
            ? `<section class="project-section fade-in" aria-labelledby="comuna-faq">
            <h2 id="comuna-faq">Preguntas frecuentes</h2>
            <div class="faq-list">${faq}</div>
        </section>`
            : ''
        }
        ${
          related
            ? `<section class="project-section fade-in location-related">
            <h2>Comunas cercanas</h2>
            <div class="location-related__list">
                ${related}
            </div>
        </section>`
            : ''
        }
        <section class="project-section fade-in">
            <p class="location-outro">
                <a href="/precios">Ver precios orientativos</a>
                ·
                <a href="/#contact">Solicitar plan de proyecto</a>
            </p>
        </section>
    </div>
    </main>`;
}

/**
 * @param {string} filePath
 */
function processCityFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  let data;
  try {
    data = JSON.parse(raw);
  } catch (err) {
    throw new Error(`Invalid JSON in ${filePath}: ${err.message}`);
  }

  validateLocationFile(data, path.basename(filePath));

  const { city, comunas } = data;
  const outDir = path.join(root, city.slug);
  fs.mkdirSync(outDir, { recursive: true });

  // Hub: /santiago → santiago.html (cleanUrls) OR santiago/index.html
  // Use santiago.html at root for clean /santiago without needing index negotiation quirks.
  const hubPath = `/${city.slug}`;
  const hubHead = buildHead({
    title: city.hub.seo.metaTitle,
    description: city.hub.seo.metaDescription,
    ogTitle: city.hub.seo.ogTitle || city.hub.seo.metaTitle,
    ogDescription: city.hub.seo.ogDescription || city.hub.seo.metaDescription,
    canonicalPath: hubPath,
    hreflang: city.hreflang || 'es-CL',
    geoRegion: city.countryCode === 'CL' ? 'CL-RM' : city.countryCode,
    geoPlacename: city.name,
    icbm:
      city.geo?.latitude != null
        ? `${city.geo.latitude}, ${city.geo.longitude}`
        : undefined,
    jsonLd: buildHubJsonLd(city, comunas),
  });

  const hubHtml = renderPage({
    headHtml: hubHead,
    mainHtml: renderHubMain(city, comunas),
  });
  fs.writeFileSync(path.join(root, `${city.slug}.html`), hubHtml, 'utf8');
  console.log('Wrote', `${city.slug}.html`);

  for (const comuna of comunas) {
    const pagePath = `/${city.slug}/${comuna.slug}`;
    const head = buildHead({
      title: comuna.seo.metaTitle,
      description: comuna.seo.metaDescription,
      ogTitle: comuna.seo.ogTitle || comuna.seo.metaTitle,
      ogDescription: comuna.seo.ogDescription || comuna.seo.metaDescription,
      canonicalPath: pagePath,
      hreflang: city.hreflang || 'es-CL',
      geoRegion: city.countryCode === 'CL' ? 'CL-RM' : city.countryCode,
      geoPlacename: `${comuna.name}, ${city.name}`,
      icbm:
        comuna.geo?.latitude != null
          ? `${comuna.geo.latitude}, ${comuna.geo.longitude}`
          : city.geo?.latitude != null
            ? `${city.geo.latitude}, ${city.geo.longitude}`
            : undefined,
      jsonLd: buildComunaJsonLd(city, comuna, comunas),
    });

    const html = renderPage({
      headHtml: head,
      mainHtml: renderComunaMain(city, comuna, comunas),
    });

    const outFile = path.join(outDir, `${comuna.slug}.html`);
    fs.writeFileSync(outFile, html, 'utf8');
    console.log('Wrote', path.relative(root, outFile));
  }

  return { city: city.slug, count: comunas.length };
}

function main() {
  if (!fs.existsSync(dataDir)) {
    console.error('Missing data directory:', dataDir);
    process.exit(1);
  }

  const files = fs
    .readdirSync(dataDir)
    .filter((f) => f.endsWith('.json') && !f.includes('schema'));

  if (!files.length) {
    console.error('No location JSON files in', dataDir);
    process.exit(1);
  }

  let total = 0;
  for (const file of files) {
    const result = processCityFile(path.join(dataDir, file));
    total += result.count;
    console.log(`City ${result.city}: ${result.count} comunas`);
  }
  console.log(`Done. ${total} location pages + hubs.`);
}

main();
