/**
 * Regenerates sitemap.xml from known static routes + data/locations/*.json
 *
 * Keeps TTFB unaffected: sitemap is a static file served by the CDN.
 * Run after build:locations (or via npm run build:seo).
 *
 * Run: node scripts/build-sitemap.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const SITE = 'https://www.irigoyendev.com';

/** @typedef {{ loc: string, lastmod?: string, changefreq?: string, priority?: string, image?: { loc: string, title: string } }} SitemapUrl */

/** @type {SitemapUrl[]} */
const CORE = [
  { loc: '/', changefreq: 'weekly', priority: '1.0', image: { loc: `${SITE}/images/og-image.png`, title: 'IrigoyenDev — Desarrollo full stack' } },
  { loc: '/servicios', changefreq: 'weekly', priority: '0.95' },
  { loc: '/crear-tienda-online', changefreq: 'monthly', priority: '0.9' },
  { loc: '/landing-pages', changefreq: 'monthly', priority: '0.9' },
  { loc: '/precios', changefreq: 'monthly', priority: '0.85' },
  { loc: '/faq', changefreq: 'monthly', priority: '0.8' },
  { loc: '/santiago/comunas', changefreq: 'weekly', priority: '0.88' },
  { loc: '/es', changefreq: 'weekly', priority: '0.9' },
  { loc: '/en', changefreq: 'weekly', priority: '0.9' },
  { loc: '/da', changefreq: 'weekly', priority: '0.9' },
];

const PROJECTS = [
  'thebeebaby',
  'dahuss',
  'calafate',
  'dragonmart',
  'rluabogados',
  'familiainternacional',
  'radiochicureo',
  'retorica',
  'floreria',
].map((slug) => ({
  loc: `/projects/${slug}`,
  changefreq: 'monthly',
  priority: '0.75',
}));

function today() {
  return new Date().toISOString().slice(0, 10);
}

/**
 * @returns {SitemapUrl[]}
 */
function loadGeoConfigUrls() {
  const geoFile = path.join(root, 'data', 'geo-config.json');
  if (!fs.existsSync(geoFile)) return [];
  const data = JSON.parse(fs.readFileSync(geoFile, 'utf8'));
  /** @type {SitemapUrl[]} */
  const urls = [];
  for (const e of data.entries || []) {
    const loc = `/${e.path || e.slug}`;
    urls.push({
      loc,
      changefreq: e.type === 'hub' ? 'weekly' : 'monthly',
      priority: e.type === 'hub' ? '0.9' : e.type === 'region' ? '0.88' : '0.82',
    });
  }
  return urls;
}

/**
 * @returns {SitemapUrl[]}
 */
function loadBlogUrls() {
  const blogFile = path.join(root, 'data', 'blog', 'posts.json');
  if (!fs.existsSync(blogFile)) return [];
  const data = JSON.parse(fs.readFileSync(blogFile, 'utf8'));
  /** @type {SitemapUrl[]} */
  const urls = [{ loc: '/blog', changefreq: 'weekly', priority: '0.8' }];
  for (const p of data.posts || []) {
    if (!p?.slug) continue;
    urls.push({ loc: `/blog/${p.slug}`, changefreq: 'monthly', priority: '0.75' });
  }
  return urls;
}

/**
 * @param {SitemapUrl} u
 */
function renderUrl(u) {
  const lastmod = u.lastmod || today();
  let imageXml = '';
  if (u.image) {
    imageXml = `
    <image:image>
      <image:loc>${u.image.loc}</image:loc>
      <image:title>${escapeXml(u.image.title)}</image:title>
    </image:image>`;
  }
  return `  <url>
    <loc>${SITE}${u.loc === '/' ? '/' : u.loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${u.changefreq || 'monthly'}</changefreq>
    <priority>${u.priority || '0.5'}</priority>${imageXml}
  </url>`;
}

/** @param {string} s */
function escapeXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function main() {
  const n = writeSitemap();
  console.log(`sitemap.xml written (${n} URLs)`);
}

function loadPresenceUrls() {
  const file = path.join(root, 'data', 'presence-pages.json');
  if (!fs.existsSync(file)) return [];
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  return (data.pages || []).map((p) => ({
    loc: p.path,
    changefreq: 'monthly',
    priority: '0.8',
  }));
}

/**
 * Write sitemap.xml atomically (tmp + rename). Returns URL count.
 * Called by build-geo-pages after a successful HTML emit.
 * @returns {number}
 */
export function writeSitemap() {
  const urls = [
    ...CORE,
    ...PROJECTS,
    ...loadGeoConfigUrls(),
    ...loadBlogUrls(),
    ...loadPresenceUrls(),
  ];
  const seen = new Set();
  const unique = urls.filter((u) => {
    if (seen.has(u.loc)) return false;
    seen.add(u.loc);
    return true;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${unique.map(renderUrl).join('\n')}
</urlset>
`;

  const out = path.join(root, 'sitemap.xml');
  const tmp = path.join(root, 'sitemap.xml.tmp');
  fs.writeFileSync(tmp, xml, 'utf8');
  fs.renameSync(tmp, out);
  return unique.length;
}

const isCli =
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isCli) main();
