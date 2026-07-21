/**
 * One-shot / maintainable sync: builds data/geo-config.json from legacy
 * data/locations + data/regions (until those are fully retired).
 * Prefer editing geo-config.json directly going forward.
 *
 * Run: node scripts/sync-geo-config.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const outFile = path.join(root, 'data', 'geo-config.json');

const DEFAULT_LB = {
  telephone: '+45-5024-9855',
  email: 'andres@irigoyendev.com',
  priceRange: '$$-$$$',
  addressCountry: 'CL',
};

function main() {
  /** @type {object[]} */
  const entries = [];

  // —— Chile hub ——
  const regionsFile = path.join(root, 'data', 'regions', 'chile-capitals.json');
  const regionsData = JSON.parse(fs.readFileSync(regionsFile, 'utf8'));
  const hub = regionsData.hub;
  entries.push({
    slug: hub.path,
    path: hub.path,
    type: 'hub',
    city: 'Chile',
    region: 'Nacional',
    countryCode: 'CL',
    metaTitle: hub.seo.metaTitle,
    metaDescription: hub.seo.metaDescription,
    h1Title: hub.content.h1,
    contentSummary: hub.content.lead,
    localBusinessSchema: {
      ...DEFAULT_LB,
      name: 'IrigoyenDev — Chile',
      description: hub.seo.metaDescription,
      addressLocality: 'Chile',
      addressRegion: 'Chile',
      serviceType: ['Desarrollo web', 'E-commerce', 'Plataformas'],
    },
    content: {
      eyebrow: hub.content.eyebrow,
      lead: hub.content.lead,
      intro: hub.content.intro,
      ctaPrimary: hub.content.ctaPrimary,
      ctaSecondary: hub.content.ctaSecondary,
      faq: hub.faq,
      ogTitle: hub.seo.ogTitle,
      ogDescription: hub.seo.ogDescription,
    },
  });

  for (const r of regionsData.regions) {
    entries.push({
      slug: r.path,
      path: r.path,
      type: 'region',
      city: r.name,
      region: r.regionName,
      countryCode: 'CL',
      parentSlug: hub.path,
      metaTitle: r.seo.metaTitle,
      metaDescription: r.seo.metaDescription,
      h1Title: r.content.h1,
      contentSummary: r.content.lead,
      localBusinessSchema: {
        ...DEFAULT_LB,
        name: `IrigoyenDev — ${r.name}`,
        description: r.seo.metaDescription,
        latitude: r.geo?.latitude,
        longitude: r.geo?.longitude,
        addressLocality: r.name,
        addressRegion: r.regionName,
        regionWiki: r.regionWiki,
        serviceType: r.industries || ['Desarrollo web'],
      },
      content: {
        ...r.content,
        covers: r.covers,
        industries: r.industries,
        relatedCaseStudies: r.relatedCaseStudies,
        faq: r.faq,
        ogTitle: r.seo.ogTitle,
        ogDescription: r.seo.ogDescription,
        geo: r.geo,
      },
    });
  }

  // —— Santiago hub + comunas ——
  const stgo = JSON.parse(
    fs.readFileSync(path.join(root, 'data', 'locations', 'santiago.json'), 'utf8')
  );
  const city = stgo.city;
  entries.push({
    slug: city.slug,
    path: city.slug,
    type: 'hub',
    city: city.name,
    region: city.region,
    countryCode: city.countryCode || 'CL',
    metaTitle: city.hub.seo.metaTitle,
    metaDescription: city.hub.seo.metaDescription,
    h1Title: city.hub.content.h1,
    contentSummary: city.hub.content.lead,
    localBusinessSchema: {
      ...DEFAULT_LB,
      name: `IrigoyenDev — ${city.name}`,
      description: city.hub.seo.metaDescription,
      latitude: city.geo?.latitude,
      longitude: city.geo?.longitude,
      addressLocality: city.name,
      addressRegion: city.region,
      serviceType: ['Startups', 'Tecnología', 'Servicios', 'E-commerce'],
    },
    content: {
      ...city.hub.content,
      faq: city.hub.faq,
      ogTitle: city.hub.seo.ogTitle,
      ogDescription: city.hub.seo.ogDescription,
      geo: city.geo,
      hreflang: city.hreflang,
    },
  });

  for (const c of stgo.comunas) {
    entries.push({
      slug: c.slug,
      path: `${city.slug}/${c.slug}`,
      type: 'comuna',
      city: c.name,
      region: city.region,
      countryCode: city.countryCode || 'CL',
      parentSlug: city.slug,
      metaTitle: c.seo.metaTitle,
      metaDescription: c.seo.metaDescription,
      h1Title: c.content.h1,
      contentSummary: c.content.lead,
      localBusinessSchema: {
        ...DEFAULT_LB,
        name: `IrigoyenDev — ${c.name}`,
        description: c.seo.metaDescription,
        latitude: c.geo?.latitude,
        longitude: c.geo?.longitude,
        addressLocality: c.name,
        addressRegion: city.region,
        serviceType: ['Desarrollo web', 'SEO', 'E-commerce'],
      },
      content: {
        ...c.content,
        neighborhoods: c.neighborhoods,
        relatedSlugs: c.relatedSlugs,
        faq: c.faq,
        ogTitle: c.seo.ogTitle,
        ogDescription: c.seo.ogDescription,
        geo: c.geo,
      },
    });
  }

  // Norway placeholder market (empty entries — add Oslo/Moss objects later)
  const payload = {
    version: 1,
    $comment:
      'MASTER geo config. Template reads only this file at BUILD time. To add Norway: push objects with countryCode NO and path like "norge/oslo". Do not hardcode city copy in JS templates.',
    markets: [
      {
        code: 'CL',
        name: 'Chile',
        hreflang: 'es-CL',
        hubPath: 'chile',
      },
      {
        code: 'NO',
        name: 'Norway',
        hreflang: 'nb-NO',
        hubPath: 'norge',
        note: 'Add entries[] with countryCode NO when ready — no template changes required.',
      },
    ],
    entries,
  };

  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, JSON.stringify(payload, null, 2) + '\n', 'utf8');
  console.log(`Wrote ${outFile} (${entries.length} entries)`);
}

main();
