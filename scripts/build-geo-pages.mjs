/**
 * Dynamic geo page TEMPLATE (Factory) — static HTML at build time.
 *
 * Flow: validate geo-config → emit one .html per entry → prune orphans → atomic sitemap.
 * Markets (CL / NO / …) drive lang, nav, breadcrumbs, and UI strings — no Chile hardcoding.
 *
 * Run: npm run build:geo
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
import {
  loadGeoConfig,
  getGeoBySlug,
  listGeoPaths,
  resetGeoConfigCache,
} from './lib/geo-config.mjs';
import { CHILE_ADMIN_AREAS } from './lib/chile-geo.mjs';
import { ENTITY } from './lib/entity-nap.mjs';
import { marketUi, countryDisplayName, requireMarket } from './lib/geo-markets.mjs';
import { writeSitemap } from './build-sitemap.mjs';
import {
  keywordAliasPathsFor,
  syncVercelKeywordRewrites,
} from './lib/geo-keyword-aliases.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const SLUGS_INDEX = path.join(root, 'data', 'geo-slugs.json');

/** @param {import('./lib/geo-config.mjs').GeoEntry} entry */
function publicPath(entry) {
  return entry.path || entry.slug;
}

/** Absolute file path for a public geo path */
function htmlPathFor(pubPath) {
  const parts = pubPath.split('/');
  if (parts.length === 1) return path.join(root, `${parts[0]}.html`);
  return path.join(root, ...parts.slice(0, -1), `${parts[parts.length - 1]}.html`);
}

/**
 * Country hub entry for a market (by hubPath).
 * @param {string} countryCode
 * @param {import('./lib/geo-config.mjs').GeoEntry[]} all
 */
function marketHubEntry(countryCode, all) {
  const m = requireMarket(countryCode);
  return (
    all.find((e) => (e.path || e.slug) === m.hubPath || e.slug === m.hubPath) ||
    null
  );
}

/**
 * Walk parent chain for silo breadcrumbs (root → … → current).
 * @param {import('./lib/geo-config.mjs').GeoEntry} entry
 * @param {import('./lib/geo-config.mjs').GeoEntry[]} all
 */
function breadcrumbTrail(entry, all) {
  const ui = marketUi(entry.countryCode);
  const items = [{ name: ui.home, href: '/' }];
  const chain = [];
  let cur = entry;
  const seen = new Set();
  while (cur?.parentSlug && !seen.has(cur.parentSlug)) {
    seen.add(cur.parentSlug);
    const parent = getGeoBySlug(cur.parentSlug);
    // Strict silo: never cross countryCode boundaries
    if (!parent || parent.countryCode !== entry.countryCode) break;
    chain.unshift(parent);
    cur = parent;
  }
  const hub = marketHubEntry(entry.countryCode, all);
  if (
    hub &&
    hub.countryCode === entry.countryCode &&
    !chain.some((c) => c.slug === hub.slug) &&
    entry.slug !== hub.slug
  ) {
    chain.unshift(hub);
  }
  for (const c of chain) {
    if (c.countryCode !== entry.countryCode) continue;
    items.push({ name: c.city, href: `/${publicPath(c)}` });
    // Index page between Santiago hub and individual communes
    if (
      entry.type === 'comuna' &&
      c.slug === 'santiago' &&
      entry.parentSlug === 'santiago'
    ) {
      items.push({ name: 'Comunas', href: '/santiago/comunas' });
    }
  }
  items.push({ name: entry.city, href: `/${publicPath(entry)}` });
  return items.filter((it, i, arr) => i === 0 || it.href !== arr[i - 1].href);
}

/**
 * LocalBusiness — unique @id per URL; address + geo from config only.
 * @param {import('./lib/geo-config.mjs').GeoEntry} entry
 */
function buildLocalBusinessLd(entry) {
  const lb = entry.localBusinessSchema;
  const ui = marketUi(entry.countryCode);
  const url = `${SITE}/${publicPath(entry)}`;
  const lat = lb.latitude;
  const lng = lb.longitude;
  const telephone = lb.telephone || ENTITY.telephone;
  const email = lb.email || ENTITY.email;
  const priceRange = lb.priceRange || ENTITY.priceRange;

  if (entry.type === 'comuna' || entry.type === 'region') {
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
      throw new Error(`GEO_MISSING_COORDS:${entry.slug}`);
    }
  }

  const addressCountry = lb.addressCountry || entry.countryCode;
  const addressLocality = lb.addressLocality || entry.city;
  const addressRegion = lb.addressRegion || entry.region;

  /** @type {object[]} */
  const areaServed = [
    { '@type': 'City', name: addressLocality },
    {
      '@type': 'AdministrativeArea',
      name: addressRegion,
      ...(lb.regionWiki ? { sameAs: lb.regionWiki } : {}),
    },
    {
      '@type': 'Country',
      name: countryDisplayName(entry.countryCode),
    },
  ];

  const block = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'ProfessionalService'],
    '@id': `${url}#localbusiness`,
    name: lb.name || `${ENTITY.legalName} — ${entry.city}`,
    alternateName: ENTITY.alternateName,
    url,
    image: OG_DEFAULT,
    logo: `${SITE}/favicon.svg`,
    description: lb.description || entry.metaDescription,
    telephone,
    email,
    priceRange,
    currenciesAccepted: ui.currencies,
    address: {
      '@type': 'PostalAddress',
      addressLocality,
      addressRegion,
      addressCountry,
    },
    areaServed,
    serviceType: lb.serviceType || ui.serviceDefaults,
    knowsAbout: entry.content?.semanticTopics || lb.serviceType || ui.serviceDefaults,
    sameAs: ENTITY.sameAs,
    founder: {
      '@type': 'Person',
      name: ENTITY.founder,
      url: ENTITY.url,
    },
    parentOrganization: { '@id': `${SITE}/#business` },
    provider: { '@id': `${SITE}/#person` },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: ui.offerCatalog(ENTITY.legalName, entry.city),
      itemListElement: [
        {
          '@type': 'Offer',
          priceCurrency: entry.countryCode === 'NO' ? 'NOK' : 'USD',
          price: String(ENTITY.indicativePricing.landingFromUsd),
          description: ui.offerLanding,
          url: `${SITE}/landing-pages`,
          areaServed: { '@type': 'City', name: entry.city },
        },
        {
          '@type': 'Offer',
          priceCurrency: entry.countryCode === 'NO' ? 'NOK' : 'USD',
          price: String(ENTITY.indicativePricing.seoFromUsd),
          description: ui.offerSeo,
          url: `${SITE}/servicios`,
          areaServed: { '@type': 'City', name: entry.city },
        },
      ],
    },
  };

  if (Number.isFinite(lat) && Number.isFinite(lng)) {
    block.geo = {
      '@type': 'GeoCoordinates',
      latitude: lat,
      longitude: lng,
    };
  }

  return block;
}

/**
 * @param {import('./lib/geo-config.mjs').GeoEntry} entry
 * @param {import('./lib/geo-config.mjs').GeoEntry[]} all
 */
function renderBreadcrumbNav(entry, all) {
  const ui = marketUi(entry.countryCode);
  const items = breadcrumbTrail(entry, all);
  const lis = items
    .map((it, i) => {
      const last = i === items.length - 1;
      const i18n =
        i === 0 && it.href === '/'
          ? ' data-i18n="footer.linkHome"'
          : '';
      return last
        ? `<li aria-current="page">${escapeHtml(it.name)}</li>`
        : `<li><a href="${escapeAttr(it.href)}"${i18n}>${escapeHtml(it.name)}</a></li>`;
    })
    .join('\n            ');

  return `
        <nav class="geo-breadcrumb" aria-label="${escapeAttr(ui.breadcrumbLabel)}">
          <ol>
            ${lis}
          </ol>
        </nav>`;
}

/**
 * @param {import('./lib/geo-config.mjs').GeoEntry} entry
 * @param {import('./lib/geo-config.mjs').GeoEntry[]} all
 */
function buildJsonLd(entry, all) {
  const url = `${SITE}/${publicPath(entry)}`;
  const trail = breadcrumbTrail(entry, all);
  const crumbs = trail.map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: c.name,
    item: c.href.startsWith('http') ? c.href : `${SITE}${c.href === '/' ? '/' : c.href}`,
  }));

  /** @type {object[]} */
  const blocks = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: crumbs,
    },
    buildLocalBusinessLd(entry),
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${url}#service`,
      name: entry.h1Title,
      description: entry.contentSummary,
      url,
      areaServed: {
        '@type': 'Place',
        name: `${entry.city}, ${entry.region}`,
      },
      provider: { '@id': `${SITE}/#business` },
    },
  ];

  // National hub: list regions for this country
  if (entry.type === 'hub') {
    const market = requireMarket(entry.countryCode);
    const isNationalHub =
      (entry.path || entry.slug) === market.hubPath || entry.slug === market.hubPath;

    if (isNationalHub) {
      const regions = all.filter(
        (e) => e.type === 'region' && e.countryCode === entry.countryCode
      );
      if (regions.length) {
        blocks.push({
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: `${countryDisplayName(entry.countryCode)} — regions`,
          itemListElement: regions.map((e, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: e.city,
            url: `${SITE}/${publicPath(e)}`,
          })),
        });
      }
      if (entry.countryCode === 'CL') {
        blocks.push({
          '@context': 'https://schema.org',
          '@type': 'ProfessionalService',
          '@id': `${url}#coverage`,
          name: `${ENTITY.legalName} — ${countryDisplayName('CL')}`,
          areaServed: CHILE_ADMIN_AREAS,
          provider: { '@id': `${SITE}/#person` },
        });
      }
    }

    // City hub (e.g. Santiago): list child comunas
    const children = all.filter(
      (e) => e.parentSlug === entry.slug && e.type === 'comuna'
    );
    if (children.length) {
      blocks.push({
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: entry.city,
        itemListElement: children.map((e, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: e.city,
          url: `${SITE}/${publicPath(e)}`,
        })),
      });
    }
  }

  const faq = entry.content?.faq;
  if (Array.isArray(faq) && faq.length) {
    blocks.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: faq.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    });
  }

  return blocks;
}

/**
 * Nav: market hub + same-country siblings only (strict countryCode isolation).
 * @param {import('./lib/geo-config.mjs').GeoEntry} entry
 * @param {import('./lib/geo-config.mjs').GeoEntry[]} siblings
 * @param {import('./lib/geo-config.mjs').GeoEntry[]} all
 */
function renderNav(entry, siblings, all) {
  const hub = marketHubEntry(entry.countryCode, all);
  const links = [];
  const cc = entry.countryCode;

  if (hub && hub.countryCode === cc) {
    links.push(
      `<a href="/${publicPath(hub)}" class="location-nav__link${entry.slug === hub.slug ? ' is-active' : ''}">${escapeHtml(hub.city)}</a>`
    );
  }

  if (entry.parentSlug) {
    const parent = getGeoBySlug(entry.parentSlug);
    if (
      parent &&
      parent.countryCode === cc &&
      parent.type === 'hub' &&
      (!hub || parent.slug !== hub.slug)
    ) {
      links.push(
        `<a href="/${publicPath(parent)}" class="location-nav__link${entry.slug === parent.slug ? ' is-active' : ''}">${escapeHtml(parent.city)}</a>`
      );
    }
  }

  for (const s of siblings) {
    if (s.countryCode !== cc) continue;
    if (hub && s.slug === hub.slug) continue;
    const cur = s.slug === entry.slug;
    links.push(
      `<a href="/${publicPath(s)}" class="location-nav__link${cur ? ' is-active' : ''}"${cur ? ' aria-current="page"' : ''}>${escapeHtml(s.city)}</a>`
    );
  }

  const label = entry.region || countryDisplayName(cc);
  return `
        <nav class="location-nav" aria-label="${escapeAttr(label)}">
            ${links.join('\n            ')}
        </nav>`;
}

/**
 * @param {{q:string,a:string}[]|undefined} faq
 * @param {ReturnType<typeof marketUi>} ui
 */
function renderFaqSection(faq, ui) {
  if (!Array.isArray(faq) || !faq.length) return '';
  const items = faq
    .map(
      (item) => `
            <article class="faq-item faq-item--plain">
                <h3>${escapeHtml(item.q)}</h3>
                <p class="money-copy">${escapeHtml(item.a)}</p>
            </article>`
    )
    .join('');
  return `<section class="project-section fade-in" id="faq"><h2>${escapeHtml(ui.faqTitle)}</h2><div class="faq-list">${items}</div></section>`;
}

/**
 * @param {string[]|undefined} topics
 * @param {string} city
 * @param {ReturnType<typeof marketUi>} ui
 */
function renderSemanticTopics(topics, city, ui) {
  if (!Array.isArray(topics) || !topics.length) return '';
  const lis = topics.map((t) => `<li>${escapeHtml(t)}</li>`).join('');
  return `<section class="project-section fade-in" id="expertise"><h2>${escapeHtml(ui.expertiseTitle(city))}</h2><p class="location-intro">${escapeHtml(ui.expertiseIntro)}</p><ul class="project-results-list location-neighborhoods">${lis}</ul></section>`;
}

/**
 * @param {import('./lib/geo-config.mjs').GeoEntry} entry
 * @param {import('./lib/geo-config.mjs').GeoEntry[]} all
 */
function renderMain(entry, all) {
  const c = entry.content || {};
  const ui = marketUi(entry.countryCode);
  const wa = waLink(ui.waMsg(entry.city));
  const lead = entry.contentSummary;

  if (entry.type === 'hub') {
    const market = requireMarket(entry.countryCode);
    const isNationalHub =
      (entry.path || entry.slug) === market.hubPath || entry.slug === market.hubPath;

    const children = all.filter((e) => e.parentSlug === entry.slug);
    const regionChildren = isNationalHub
      ? all.filter((e) => e.type === 'region' && e.countryCode === entry.countryCode)
      : children;

    const audiences = (c.audiences || [])
      .map(
        (a) => `
                <article class="pricing-card">
                    <h3 class="pricing-card__title">${escapeHtml(a.title)}</h3>
                    <p class="pricing-card__desc">${escapeHtml(a.desc)}</p>
                </article>`
      )
      .join('\n');

    const cards = (regionChildren.length ? regionChildren : children)
      .map(
        (child) => `
            <article class="location-card">
                ${child.region && child.type === 'region' ? `<p class="location-card__eyebrow">${escapeHtml(child.region)}</p>` : ''}
                <h3><a href="/${publicPath(child)}">${escapeHtml(child.city)}</a></h3>
                <p>${escapeHtml(child.contentSummary)}</p>
                <a href="/${publicPath(child)}" class="project-link">${escapeHtml(ui.viewPage)}</a>
            </article>`
      )
      .join('\n');

    const siblings = isNationalHub
      ? all.filter((e) => e.type === 'region' && e.countryCode === entry.countryCode)
      : all.filter((e) => e.parentSlug === entry.slug);

    return `
    <main id="main-content">
    <header class="project-header container fade-in">
        <a href="/servicios" class="back-link"><span data-i18n="mkt.backServices">${escapeHtml(ui.servicesBack)}</span></a>
        ${renderBreadcrumbNav(entry, all)}
        <p class="project-eyebrow">${escapeHtml(c.eyebrow || entry.region)}</p>
        <h1>${escapeHtml(entry.h1Title)}</h1>
        <p class="project-lead">${escapeHtml(lead)}</p>
        <div class="project-header__actions">
            <a href="/#contact" class="btn-cta-primary">${escapeHtml(c.ctaPrimary || ui.ctaDefault)}</a>
            <a href="/servicios" class="project-cta-inline">${escapeHtml(c.ctaSecondary || ui.ctaServices)}</a>
        </div>
    </header>
    <div class="container">
        ${renderNav(entry, siblings, all)}
        <section class="project-section fade-in">
            ${(c.intro || []).map((p) => `<p class="location-intro">${escapeHtml(p)}</p>`).join('\n')}
            ${audiences ? `<h2 class="location-subheading">${escapeHtml(ui.audiences)}</h2><div class="pricing-grid">${audiences}</div>` : ''}
            <h2 class="location-subheading" style="margin-top:2rem">${escapeHtml(isNationalHub ? ui.regions : ui.locations)}</h2>
            ${
              entry.slug === 'santiago'
                ? `<p class="location-intro"><a href="/santiago/comunas"><strong>Índice completo de comunas</strong></a> — las ${children.filter((e) => e.type === 'comuna').length || children.length} comunas de la RM en una sola página para rastreo e indexación.</p>`
                : ''
            }
            <div class="location-grid">${cards}</div>
        </section>
        ${renderSemanticTopics(c.semanticTopics, entry.city, ui)}
        ${renderFaqSection(c.faq, ui)}
    </div>
    </main>`;
  }

  // Detail (comuna | region)
  const siblings = all.filter(
    (e) =>
      e.parentSlug === entry.parentSlug &&
      e.type === entry.type &&
      e.countryCode === entry.countryCode
  );

  const pains = (c.painPoints || [])
    .map((p) => `<li>${escapeHtml(p)}</li>`)
    .join('');
  const services = (c.focusServices || c.services || [])
    .map(
      (s) => `
                <article class="pricing-card">
                    <h3 class="pricing-card__title"><a href="${escapeAttr(s.href)}">${escapeHtml(s.title)}</a></h3>
                    <p class="pricing-card__desc">${escapeHtml(s.desc)}</p>
                </article>`
    )
    .join('');
  const neighborhoods = (c.neighborhoods || c.covers || [])
    .map((n) => `<li>${escapeHtml(n)}</li>`)
    .join('');
  const industries = (c.industries || [])
    .map((n) => `<li>${escapeHtml(n)}</li>`)
    .join('');
  const cases = (c.relatedCaseStudies || [])
    .map(
      (cs) => `
                <article class="location-card">
                    <h3><a href="/projects/${escapeAttr(cs.slug)}">${escapeHtml(cs.title)}</a></h3>
                    <p>${escapeHtml(cs.note)}</p>
                </article>`
    )
    .join('');
  const related = (c.relatedSlugs || [])
    .map((slug) => getGeoBySlug(slug))
    .filter(Boolean)
    .map(
      (r) =>
        `<a href="/${publicPath(r)}" class="location-related__link">${escapeHtml(r.city)}</a>`
    )
    .join('\n');

  const semanticIntro = c.semanticIntro
    ? `<p class="location-intro">${escapeHtml(c.semanticIntro)}</p>`
    : '';

  const hub = marketHubEntry(entry.countryCode, all);
  const back = entry.parentSlug
    ? getGeoBySlug(entry.parentSlug)
    : hub;

  return `
    <main id="main-content">
    <header class="project-header container fade-in">
        <a href="/${back ? publicPath(back) : publicPath(hub) || ''}" class="back-link"><span>← ${escapeHtml(back?.city || hub?.city || countryDisplayName(entry.countryCode))}</span></a>
        ${renderBreadcrumbNav(entry, all)}
        <p class="project-eyebrow">${escapeHtml(c.eyebrow || `${entry.region} · ${entry.city}`)}</p>
        <h1>${escapeHtml(entry.h1Title)}</h1>
        <p class="project-lead">${escapeHtml(lead)}</p>
        <div class="project-header__actions">
            <a href="/?service=fullstack#contact" class="btn-cta-primary">${escapeHtml(c.ctaPrimary || ui.ctaCity(entry.city))}</a>
            <a href="${wa}" class="project-cta-inline" target="_blank" rel="noopener noreferrer">${escapeHtml(c.ctaWhatsApp || ui.waDefault)}</a>
        </div>
    </header>
    <div class="container">
        ${renderNav(entry, siblings, all)}
        ${
          c.economicContext
            ? `<section class="project-section fade-in"><h2>${escapeHtml(ui.localContext)}</h2><p>${escapeHtml(c.economicContext)}</p>
            ${industries ? `<h3 class="location-subheading">${escapeHtml(ui.sectors)}</h3><ul class="project-results-list location-neighborhoods">${industries}</ul>` : ''}
            ${neighborhoods ? `<h3 class="location-subheading">${escapeHtml(c.covers ? ui.coverage : ui.refSectors)}</h3><ul class="project-results-list location-neighborhoods">${neighborhoods}</ul>` : ''}
            </section>`
            : neighborhoods
              ? `<section class="project-section fade-in"><h2>${escapeHtml(ui.refSectors)}</h2><ul class="project-results-list location-neighborhoods">${neighborhoods}</ul></section>`
              : ''
        }
        ${
          c.localAngle
            ? `<section class="project-section fade-in"><h2>${escapeHtml(ui.focusOn(entry.city))}</h2><p>${escapeHtml(c.localAngle)}</p>${semanticIntro}</section>`
            : semanticIntro
              ? `<section class="project-section fade-in">${semanticIntro}</section>`
              : ''
        }
        ${renderSemanticTopics(c.semanticTopics, entry.city, ui)}
        ${pains ? `<section class="project-section fade-in"><h2>${escapeHtml(ui.painPoints)}</h2><ul class="project-results-list">${pains}</ul></section>` : ''}
        ${services ? `<section class="project-section fade-in"><h2>${escapeHtml(ui.services)}</h2><div class="pricing-grid pricing-grid--care">${services}</div></section>` : ''}
        ${cases ? `<section class="project-section fade-in"><h2>${escapeHtml(ui.cases)}</h2><div class="location-grid">${cases}</div></section>` : ''}
        ${renderFaqSection(c.faq, ui)}
        ${related ? `<section class="project-section fade-in location-related"><h2>${escapeHtml(ui.nearby)}</h2><div class="location-related__list">${related}</div></section>` : ''}
        <section class="project-section fade-in"><p class="location-outro"><a href="/precios">Precios</a> · <a href="/blog">Blog</a> · <a href="/#contact">Contacto</a> · <a href="${ENTITY.url}" rel="me">${escapeHtml(ENTITY.legalName)}</a></p></section>
    </div>
    </main>`;
}

/**
 * @param {import('./lib/geo-config.mjs').GeoEntry} entry
 * @param {string} html
 */
function writeEntryHtml(entry, html) {
  const rel = publicPath(entry);
  const file = htmlPathFor(rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html, 'utf8');
  console.log('Wrote', rel);
}

/**
 * Remove HTML not in listGeoPaths() — build-time only (O(paths), never at request time).
 * Scans: previous geo-slugs index + market hub directories (e.g. santiago/, norge/).
 * @param {string[]} previousPaths
 * @param {string[]} nextPaths
 * @param {object[]} markets
 */
function pruneOrphanHtml(previousPaths, nextPaths, markets) {
  const keep = new Set(nextPaths);
  /** @type {Set<string>} */
  const candidates = new Set(previousPaths);

  for (const m of markets || []) {
    const hub = String(m.hubPath || '').replace(/^\/+|\/+$/g, '');
    if (!hub) continue;
    // Nested hub dirs: santiago/*.html, norge/oslo.html, …
    const hubDir = path.join(root, hub);
    if (fs.existsSync(hubDir) && fs.statSync(hubDir).isDirectory()) {
      collectHtmlPaths(hubDir, hub, candidates);
    }
    // Flat hub file: chile.html
    const hubFile = path.join(root, `${hub}.html`);
    if (fs.existsSync(hubFile)) candidates.add(hub);
  }

  let n = 0;
  /** Static SEO hubs that live under geo dirs but are not geo-config entries */
  const keepExtra = new Set(['santiago/comunas']);
  for (const pub of candidates) {
    if (keep.has(pub) || keepExtra.has(pub)) continue;
    const file = htmlPathFor(pub);
    if (!fs.existsSync(file)) continue;
    fs.unlinkSync(file);
    console.log('Pruned orphan', pub);
    n++;
    // Remove empty parent dirs under market hubs (best-effort)
    const dir = path.dirname(file);
    if (dir !== root) {
      try {
        if (fs.readdirSync(dir).length === 0) fs.rmdirSync(dir);
      } catch {
        /* ignore */
      }
    }
  }
  return n;
}

/**
 * @param {string} absDir
 * @param {string} urlPrefix - public path prefix without leading slash
 * @param {Set<string>} out
 */
function collectHtmlPaths(absDir, urlPrefix, out) {
  for (const name of fs.readdirSync(absDir)) {
    const abs = path.join(absDir, name);
    const st = fs.statSync(abs);
    if (st.isDirectory()) {
      collectHtmlPaths(abs, `${urlPrefix}/${name}`, out);
    } else if (name.endsWith('.html')) {
      out.add(`${urlPrefix}/${name.replace(/\.html$/, '')}`);
    }
  }
}

/**
 * Footer market links from config (only markets that have pages).
 * @param {import('./lib/geo-config.mjs').GeoEntry[]} entries
 * @param {object[]} markets
 */
function footerLinksFor(entries, markets) {
  const links = [];
  for (const m of markets) {
    const has = entries.some((e) => e.countryCode === m.code);
    if (!has) continue;
    const hub = entries.find(
      (e) => (e.path || e.slug) === m.hubPath || e.slug === m.hubPath
    );
    if (!hub) continue;
    links.push({ href: `/${publicPath(hub)}`, label: hub.city });
    // Add primary city hub if distinct (e.g. Santiago under CL)
    const cityHub = entries.find(
      (e) =>
        e.countryCode === m.code &&
        e.type === 'hub' &&
        e.slug !== hub.slug &&
        e.parentSlug === hub.slug
    );
    if (cityHub) {
      links.push({ href: `/${publicPath(cityHub)}`, label: cityHub.city });
    }
  }
  return links;
}

function main() {
  resetGeoConfigCache();

  // —— Phase 0: validate entire config BEFORE any HTML write ——
  let config;
  try {
    config = loadGeoConfig();
  } catch (err) {
    console.error('BUILD ABORTED — geo-config validation failed:\n ', err.message);
    process.exit(1);
  }

  const { entries, markets } = config;
  console.log(`Validated ${entries.length} entries across ${markets.length} markets`);

  const previousPaths = fs.existsSync(SLUGS_INDEX)
    ? JSON.parse(fs.readFileSync(SLUGS_INDEX, 'utf8')).paths || []
    : [];

  const footerMarketLinks = footerLinksFor(entries, markets);

  for (const entry of entries) {
    const ui = marketUi(entry.countryCode);
    const pub = publicPath(entry);

    const head = buildHead({
      title: entry.metaTitle,
      description: entry.metaDescription,
      ogTitle: entry.content?.ogTitle || entry.metaTitle,
      ogDescription: entry.content?.ogDescription || entry.metaDescription,
      canonicalPath: `/${pub}`,
      hreflang: ui.market.hreflang,
      ogLocale: ui.ogLocale,
      ogLocaleAlternate: ui.ogLocaleAlternate,
      geoRegion: entry.countryCode,
      geoPlacename: `${entry.city}, ${entry.region}`,
      icbm:
        entry.localBusinessSchema?.latitude != null
          ? `${entry.localBusinessSchema.latitude}, ${entry.localBusinessSchema.longitude}`
          : undefined,
      jsonLd: buildJsonLd(entry, entries),
    });

    const html = renderPage({
      headHtml: head,
      mainHtml: renderMain(entry, entries),
      htmlLang: ui.htmlLang,
      skipLink: ui.skipLink,
      footerGeo: ui.footerGeo,
      footerMarketLinks,
    });
    writeEntryHtml(entry, html);
  }

  const nextPaths = listGeoPaths();
  pruneOrphanHtml(previousPaths, nextPaths, markets);

  const aliasMap = {};
  for (const entry of entries) {
    const aliases = keywordAliasPathsFor(entry);
    if (aliases.length) aliasMap[publicPath(entry)] = aliases;
  }

  fs.writeFileSync(
    SLUGS_INDEX,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        paths: nextPaths,
        keywordAliases: aliasMap,
        note: 'Unknown paths are NOT generated → Vercel serves /404. Orphans pruned on build. Keyword aliases rewrite in vercel.json to silo paths (canonical stays /santiago/...).',
      },
      null,
      2
    ) + '\n'
  );

  const aliasCount = syncVercelKeywordRewrites(entries);
  console.log(`Synced ${aliasCount} keyword alias rewrites → vercel.json`);

  // —— Atomic sitemap (only after successful geo HTML write) ——
  const sitemapCount = writeSitemap();
  console.log(`Done. ${entries.length} geo pages · sitemap ${sitemapCount} URLs`);
}

main();
