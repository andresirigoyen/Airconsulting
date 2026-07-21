/**
 * Audit geo-config.json ↔ generated HTML ↔ sitemap.
 * Unknown slugs are never built → production 404 (no blank pages).
 *
 * Run: node scripts/audit-location-sitemap.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadGeoConfig, listGeoPaths } from './lib/geo-config.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const sitemapPath = path.join(root, 'sitemap.xml');
const SITE = 'https://www.irigoyendev.com';

/** @type {string[]} */
const errors = [];
/** @type {string[]} */
const warnings = [];

function assert(cond, msg) {
  if (!cond) errors.push(msg);
}

function htmlPathFor(pubPath) {
  const parts = pubPath.split('/');
  if (parts.length === 1) return path.join(root, `${parts[0]}.html`);
  return path.join(root, ...parts.slice(0, -1), `${parts[parts.length - 1]}.html`);
}

function main() {
  assert(fs.existsSync(sitemapPath), 'sitemap.xml missing — run npm run build:sitemap');

  let config;
  try {
    config = loadGeoConfig();
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }

  const sitemap = fs.readFileSync(sitemapPath, 'utf8');
  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const locSet = new Set(locs);
  assert(locs.length === locSet.size, 'Duplicate <loc> in sitemap');

  /** @type {string[]} */
  const expectedUrls = [];

  for (const entry of config.entries) {
    const pub = entry.path || entry.slug;
    const url = `${SITE}/${pub}`;
    expectedUrls.push(url);

    const file = htmlPathFor(pub);
    assert(fs.existsSync(file), `Missing HTML for slug "${entry.slug}" → ${pub}`);
    if (!fs.existsSync(file)) continue;

    const html = fs.readFileSync(file, 'utf8');
    assert(
      html.includes(`rel="canonical" href="${url}"`),
      `${entry.slug}: canonical must be ${url}`
    );
    assert(html.includes('LocalBusiness'), `${entry.slug}: missing LocalBusiness JSON-LD`);
    assert(html.includes('<h1>'), `${entry.slug}: missing H1`);
    assert(
      html.includes(`"addressCountry": "${entry.countryCode}"`) ||
        html.includes(`"addressCountry":"${entry.countryCode}"`),
      `${entry.slug}: LocalBusiness addressCountry must match countryCode`
    );
    if (entry.type === 'comuna' || entry.type === 'region') {
      assert(html.includes('GeoCoordinates'), `${entry.slug}: missing GeoCoordinates`);
      assert(html.includes('telephone'), `${entry.slug}: missing telephone in schema`);
      assert(html.includes('priceRange'), `${entry.slug}: missing priceRange in schema`);
    }
    const market = config.markets?.find((m) => m.code === entry.countryCode);
    if (market?.htmlLang || market?.hreflang) {
      const lang = market.htmlLang || market.hreflang;
      assert(
        html.includes(`lang="${lang}"`),
        `${entry.slug}: html lang should be ${lang}`
      );
    }
    assert(
      html.includes(entry.h1Title.slice(0, Math.min(40, entry.h1Title.length))),
      `${entry.slug}: H1 should match h1Title from geo-config`
    );

    // Required master fields present in config (already validated by loader)
    for (const key of [
      'metaTitle',
      'metaDescription',
      'h1Title',
      'contentSummary',
      'localBusinessSchema',
    ]) {
      assert(entry[key] != null, `${entry.slug}: missing ${key}`);
    }
  }

  // Blog (unchanged)
  const blogFile = path.join(root, 'data', 'blog', 'posts.json');
  if (fs.existsSync(blogFile)) {
    const blog = JSON.parse(fs.readFileSync(blogFile, 'utf8'));
    expectedUrls.push(`${SITE}/blog`);
    for (const p of blog.posts || []) {
      expectedUrls.push(`${SITE}/blog/${p.slug}`);
      assert(
        fs.existsSync(path.join(root, 'blog', `${p.slug}.html`)),
        `Missing blog/${p.slug}.html`
      );
    }
  }

  for (const url of expectedUrls) {
    assert(locSet.has(url), `sitemap missing: ${url}`);
  }

  // Negative check: random fake slug must NOT have HTML
  const fake = htmlPathFor('santiago/comuna-inexistente-xyz');
  assert(!fs.existsSync(fake), 'Fake slug unexpectedly has HTML (should 404)');

  // Home entity graph: geo pages reference #business
  const indexHtml = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  assert(
    indexHtml.includes(`${SITE}/#business`) ||
      indexHtml.includes('www.irigoyendev.com/#business'),
    'index.html must define @id #business (parentOrganization target)'
  );

  console.log('=== Geo / sitemap audit ===');
  console.log(`geo-config entries: ${config.entries.length}`);
  console.log(`paths: ${listGeoPaths().length}`);
  console.log(`Sitemap URLs: ${locs.length}`);

  if (warnings.length) {
    console.log('\nWarnings:');
    warnings.forEach((w) => console.log('  ⚠', w));
  }
  if (errors.length) {
    console.log('\nFailures:');
    errors.forEach((e) => console.log('  ✖', e));
    printChecklist();
    process.exit(1);
  }

  console.log('\n✔ All automated checks passed.\n');
  printChecklist();
}

function printChecklist() {
  console.log(`Manual production checklist:
  [ ] Only edit data/geo-config.json for new cities (NO template changes)
  [ ] npm run build:geo  (validates + HTML + prune orphans + atomic sitemap)
  [ ] npm run audit:geo
  [ ] Unknown URL e.g. /santiago/fake → 404.html (no blank page)
  [ ] Canonical absolute; LocalBusiness + addressCountry match countryCode
  [ ] Norway: add hub norge + city entries (countryCode NO) then build:geo
  [ ] Search Console → resubmit sitemap
`);
}

main();
