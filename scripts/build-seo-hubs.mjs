/**
 * SEO hubs: /santiago/comunas (Chile only)
 * Run: node scripts/build-seo-hubs.mjs
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
} from './lib/page-chrome.mjs';
import { withCtrTitle, withCtrDescription } from './lib/serp-ctr.mjs';

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
    title: withCtrTitle(title),
    description: withCtrDescription(description),
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

function main() {
  writeComunasIndex();
}

main();
