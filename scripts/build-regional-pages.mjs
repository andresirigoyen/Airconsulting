/**
 * Factory: regional service landings for Chile (Valparaíso, Concepción, Antofagasta…).
 *
 * Data: data/regions/*.json — never hardcode regional copy in this file.
 * Output: /chile hub + root HTML files matching SEO paths
 *   e.g. diseno-desarrollo-web-valparaiso.html → /diseno-desarrollo-web-valparaiso
 *
 * Run: node scripts/build-regional-pages.mjs
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
import { CHILE_ADMIN_AREAS } from './lib/chile-geo.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const dataDir = path.join(root, 'data', 'regions');
const PATH_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * @param {object} data
 * @param {string} file
 */
function validate(data, file) {
  const errors = [];
  if (!data?.hub?.path || !PATH_RE.test(data.hub.path)) errors.push('hub.path invalid');
  if (!data?.hub?.content?.h1) errors.push('hub.content.h1 required');
  if (!Array.isArray(data.regions) || !data.regions.length) errors.push('regions required');

  const paths = new Set();
  const h1s = [];
  for (const r of data.regions || []) {
    if (!r.path || !PATH_RE.test(r.path)) errors.push(`invalid path: ${r.path}`);
    if (paths.has(r.path)) errors.push(`duplicate path: ${r.path}`);
    paths.add(r.path);
    if (!r.seo?.metaTitle || !r.content?.h1 || !r.content?.economicContext || !r.content?.localAngle) {
      errors.push(`${r.path}: seo + economicContext + localAngle + h1 required`);
    }
    h1s.push(r.content?.h1);
  }
  if (new Set(h1s).size !== h1s.length) errors.push('Duplicate H1 across regions');

  if (errors.length) throw new Error(`${file}:\n- ${errors.join('\n- ')}`);
}

/**
 * @param {object} data
 * @param {string} [activePath]
 */
function regionNav(data, activePath = '') {
  const hubActive = activePath === data.hub.path || activePath === '';
  const links = data.regions
    .map((r) => {
      const cur = r.path === activePath;
      return `<a href="/${r.path}" class="location-nav__link${cur ? ' is-active' : ''}"${cur ? ' aria-current="page"' : ''}>${escapeHtml(r.name)}</a>`;
    })
    .join('\n                ');

  return `
        <nav class="location-nav" aria-label="Regiones de Chile">
            <a href="/${data.hub.path}" class="location-nav__link${hubActive && !activePath ? ' is-active' : ''}">Chile</a>
            <a href="/santiago" class="location-nav__link">Santiago</a>
            ${links}
        </nav>`;
}

/**
 * @param {object} region
 */
function regionJsonLd(region) {
  const url = `${SITE}/${region.path}`;
  const area = {
    '@type': 'AdministrativeArea',
    name: region.regionName,
    sameAs: region.regionWiki,
  };

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: 'Chile', item: `${SITE}/chile` },
        { '@type': 'ListItem', position: 3, name: region.name, item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': ['ProfessionalService', 'LocalBusiness'],
      '@id': `${url}#localbusiness`,
      name: `IrigoyenDev — ${region.name}`,
      url,
      image: OG_DEFAULT,
      description: region.seo.metaDescription,
      telephone: '+45-5024-9855',
      email: 'andres@irigoyendev.com',
      priceRange: '$$-$$$',
      areaServed: [
        area,
        ...(region.covers || []).map((name) => ({ '@type': 'City', name })),
      ],
      geo:
        region.geo?.latitude != null
          ? {
              '@type': 'GeoCoordinates',
              latitude: region.geo.latitude,
              longitude: region.geo.longitude,
            }
          : undefined,
      serviceType: region.industries || ['Desarrollo web'],
      knowsAbout: region.industries,
      provider: { '@id': `${SITE}/#person` },
      parentOrganization: { '@id': `${SITE}/#business` },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${url}#service`,
      name: region.content.h1,
      description: region.content.lead,
      url,
      areaServed: area,
      provider: { '@id': `${SITE}/#business` },
    },
    ...(region.faq?.length
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            '@id': `${url}#faq`,
            mainEntity: region.faq.map((item) => ({
              '@type': 'Question',
              name: item.q,
              acceptedAnswer: { '@type': 'Answer', text: item.a },
            })),
          },
        ]
      : []),
  ].map((b) => JSON.parse(JSON.stringify(b)));
}

/**
 * @param {object} data
 */
function hubJsonLd(data) {
  const url = `${SITE}/${data.hub.path}`;
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: 'Chile', item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: data.hub.seo.metaTitle,
      description: data.hub.seo.metaDescription,
      url,
      about: { '@type': 'Country', name: 'Chile' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Regiones de servicio en Chile',
      itemListElement: data.regions.map((r, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: r.name,
        url: `${SITE}/${r.path}`,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      '@id': `${url}#service`,
      name: 'IrigoyenDev — Chile',
      url,
      areaServed: CHILE_ADMIN_AREAS,
      provider: { '@id': `${SITE}/#person` },
    },
  ];
}

/**
 * @param {object} data
 */
function renderHub(data) {
  const c = data.hub.content;
  const cards = data.regions
    .map(
      (r) => `
            <article class="location-card">
                <p class="location-card__eyebrow">${escapeHtml(r.regionName)}</p>
                <h3><a href="/${r.path}">${escapeHtml(r.name)}</a></h3>
                <p>${escapeHtml(r.content.lead)}</p>
                <p class="location-card__tags">${(r.industries || []).map(escapeHtml).join(' · ')}</p>
                <a href="/${r.path}" class="project-link">Ver landing regional →</a>
            </article>`
    )
    .join('\n');

  const faq =
    data.hub.faq
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
        <a href="/servicios" class="back-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            <span>Volver a servicios</span>
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
        ${regionNav(data, '')}
        <section class="project-section fade-in">
            ${(c.intro || []).map((p) => `<p class="location-intro">${escapeHtml(p)}</p>`).join('\n            ')}
            <div class="location-grid">
${cards}
            </div>
            <p class="location-outro" style="margin-top:2rem">
                También cubrimos <a href="/santiago">comunas de Santiago</a>
                ·
                <a href="/blog">Artículos sobre e-commerce y leads en Chile</a>
            </p>
        </section>
        ${
          faq
            ? `<section class="project-section fade-in"><h2>Preguntas frecuentes</h2><div class="faq-list">${faq}</div></section>`
            : ''
        }
    </div>
    </main>`;
}

/**
 * @param {object} data
 * @param {object} region
 */
function renderRegion(data, region) {
  const content = region.content;
  const wa = waLink(`¡Hola! Me interesa un proyecto web en ${region.name}, Chile.`);

  const covers = (region.covers || []).map((n) => `<li>${escapeHtml(n)}</li>`).join('');
  const industries = (region.industries || [])
    .map((n) => `<li>${escapeHtml(n)}</li>`)
    .join('');
  const pains = (content.painPoints || []).map((p) => `<li>${escapeHtml(p)}</li>`).join('\n                        ');
  const services = (content.focusServices || [])
    .map(
      (s) => `
                <article class="pricing-card">
                    <h3 class="pricing-card__title"><a href="${escapeAttr(s.href)}">${escapeHtml(s.title)}</a></h3>
                    <p class="pricing-card__desc">${escapeHtml(s.desc)}</p>
                    <a href="${escapeAttr(s.href)}" class="project-link">Ver más →</a>
                </article>`
    )
    .join('\n');

  const cases = (region.relatedCaseStudies || [])
    .map(
      (cs) => `
                <article class="location-card">
                    <h3><a href="/projects/${escapeAttr(cs.slug)}">${escapeHtml(cs.title)}</a></h3>
                    <p>${escapeHtml(cs.note)}</p>
                    <a href="/projects/${escapeAttr(cs.slug)}" class="project-link">Ver caso de estudio →</a>
                </article>`
    )
    .join('\n');

  const faq =
    region.faq
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
        <a href="/${data.hub.path}" class="back-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            <span>Chile · regiones</span>
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
        ${regionNav(data, region.path)}
        <section class="project-section fade-in">
            <h2>Economía e industria local</h2>
            <p>${escapeHtml(content.economicContext)}</p>
            <h3 class="location-subheading">Sectores que priorizamos</h3>
            <ul class="project-results-list location-neighborhoods">${industries}</ul>
            <h3 class="location-subheading">Ciudades y comunas de cobertura</h3>
            <ul class="project-results-list location-neighborhoods">${covers}</ul>
        </section>
        <section class="project-section fade-in">
            <h2>Por qué esta página no es una plantilla genérica</h2>
            <p>${escapeHtml(content.localAngle)}</p>
        </section>
        <section class="project-section fade-in">
            <h2>Retos habituales en ${escapeHtml(region.name)}</h2>
            <ul class="project-results-list">${pains}</ul>
        </section>
        <section class="project-section fade-in">
            <h2>Servicios alineados a la región</h2>
            <div class="pricing-grid pricing-grid--care">${services}</div>
        </section>
        ${
          cases
            ? `<section class="project-section fade-in"><h2>Casos de estudio en la zona</h2><div class="location-grid">${cases}</div></section>`
            : ''
        }
        ${
          faq
            ? `<section class="project-section fade-in"><h2>Preguntas frecuentes</h2><div class="faq-list">${faq}</div></section>`
            : ''
        }
        <section class="project-section fade-in">
            <p class="location-outro">
                <a href="/precios">Precios orientativos</a> ·
                <a href="/santiago">Comunas de Santiago</a> ·
                <a href="/blog">Blog Chile</a>
            </p>
        </section>
    </div>
    </main>`;
}

function processFile(filePath) {
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  validate(data, path.basename(filePath));

  const hub = data.hub;
  const hubHead = buildHead({
    title: hub.seo.metaTitle,
    description: hub.seo.metaDescription,
    ogTitle: hub.seo.ogTitle || hub.seo.metaTitle,
    ogDescription: hub.seo.ogDescription || hub.seo.metaDescription,
    canonicalPath: `/${hub.path}`,
    hreflang: 'es-CL',
    geoRegion: 'CL',
    geoPlacename: 'Chile',
    jsonLd: hubJsonLd(data),
  });
  fs.writeFileSync(
    path.join(root, `${hub.path}.html`),
    renderPage({ headHtml: hubHead, mainHtml: renderHub(data) }),
    'utf8'
  );
  console.log('Wrote', `${hub.path}.html`);

  for (const region of data.regions) {
    const head = buildHead({
      title: region.seo.metaTitle,
      description: region.seo.metaDescription,
      ogTitle: region.seo.ogTitle || region.seo.metaTitle,
      ogDescription: region.seo.ogDescription || region.seo.metaDescription,
      canonicalPath: `/${region.path}`,
      hreflang: 'es-CL',
      geoRegion: 'CL',
      geoPlacename: `${region.name}, Chile`,
      icbm:
        region.geo?.latitude != null
          ? `${region.geo.latitude}, ${region.geo.longitude}`
          : undefined,
      jsonLd: regionJsonLd(region),
    });
    const out = path.join(root, `${region.path}.html`);
    fs.writeFileSync(out, renderPage({ headHtml: head, mainHtml: renderRegion(data, region) }), 'utf8');
    console.log('Wrote', `${region.path}.html`);
  }

  return data.regions.length;
}

function main() {
  if (!fs.existsSync(dataDir)) {
    console.error('Missing', dataDir);
    process.exit(1);
  }
  let n = 0;
  for (const f of fs.readdirSync(dataDir).filter((x) => x.endsWith('.json'))) {
    n += processFile(path.join(dataDir, f));
  }
  console.log(`Done. ${n} regional landings + hubs.`);
}

main();
