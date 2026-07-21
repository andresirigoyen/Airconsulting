/**

 * Geo config loader — build-time only (imported once when Node starts the build).

 * No runtime fetch, no DB. Adding Norway/Oslo = new objects in data/geo-config.json.

 *

 * Validates integrity BEFORE any HTML is written (fail-fast).

 *

 * @typedef {object} LocalBusinessSchema

 * @property {string} [name]

 * @property {string} [description]

 * @property {number} [latitude]

 * @property {number} [longitude]

 * @property {string} [addressLocality]

 * @property {string} [addressRegion]

 * @property {string} [addressCountry]

 * @property {string[]} [serviceType]

 * @property {string} [priceRange]

 * @property {string} [telephone]

 * @property {string} [email]

 * @property {string} [regionWiki]

 *

 * @typedef {object} GeoEntry

 * @property {string} slug

 * @property {string} [path]

 * @property {string} city

 * @property {string} region

 * @property {string} countryCode

 * @property {string} metaTitle

 * @property {string} metaDescription

 * @property {string} h1Title

 * @property {string} contentSummary

 * @property {LocalBusinessSchema} localBusinessSchema

 * @property {'hub'|'comuna'|'region'} type

 * @property {string} [parentSlug]

 * @property {object} [content]

 */



import fs from 'node:fs';

import path from 'node:path';

import { fileURLToPath } from 'node:url';



const __dirname = path.dirname(fileURLToPath(import.meta.url));

const CONFIG_PATH = path.join(__dirname, '..', '..', 'data', 'geo-config.json');



/** @type {{ version: number, markets: object[], entries: GeoEntry[] } | null} */

let cached = null;



const REQUIRED_ENTRY = [

  'slug',

  'city',

  'region',

  'countryCode',

  'type',

  'metaTitle',

  'metaDescription',

  'h1Title',

  'contentSummary',

  'localBusinessSchema',

];



const VALID_TYPES = new Set(['hub', 'comuna', 'region']);



/**

 * Load and validate geo-config once. Throws with clear GEO_* errors — never soft-fail.

 * @returns {{ version: number, markets: object[], entries: GeoEntry[] }}

 */

export function loadGeoConfig() {

  if (cached) return cached;



  if (!fs.existsSync(CONFIG_PATH)) {

    throw new Error(`GEO_CONFIG_MISSING: ${CONFIG_PATH}`);

  }



  let raw;

  try {

    raw = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));

  } catch (err) {

    throw new Error(`GEO_CONFIG_INVALID_JSON: ${err.message}`);

  }



  if (!Array.isArray(raw.markets) || raw.markets.length === 0) {

    throw new Error('GEO_CONFIG: markets[] must be a non-empty array');

  }



  const marketCodes = new Set();

  for (const m of raw.markets) {

    if (!m?.code || !m.hreflang || !m.hubPath || !m.name) {

      throw new Error(

        `GEO_CONFIG: each market needs code, name, hreflang, hubPath (got ${JSON.stringify(m?.code)})`

      );

    }

    if (marketCodes.has(m.code)) {

      throw new Error(`GEO_CONFIG: duplicate market code "${m.code}"`);

    }

    marketCodes.add(m.code);

  }



  if (!Array.isArray(raw.entries) || raw.entries.length === 0) {

    throw new Error('GEO_CONFIG: entries must be a non-empty array');

  }



  const slugs = new Set();

  const paths = new Set();

  const faqQuestions = new Map();



  for (const entry of raw.entries) {

    for (const key of REQUIRED_ENTRY) {

      if (entry[key] == null || entry[key] === '') {

        throw new Error(

          `GEO_MISSING_FIELD: entry missing "${key}" (slug=${entry.slug || '?'})`

        );

      }

    }



    if (!VALID_TYPES.has(entry.type)) {

      throw new Error(

        `GEO_BAD_TYPE: ${entry.slug} type must be hub|comuna|region (got "${entry.type}")`

      );

    }



    if (!marketCodes.has(entry.countryCode)) {

      throw new Error(

        `GEO_UNKNOWN_COUNTRY: ${entry.slug} countryCode "${entry.countryCode}" not in markets[]`

      );

    }



    if (entry.content?.lead != null) {
      throw new Error(
        `GEO_DEPRECATED_LEAD: ${entry.slug} — remove content.lead; use contentSummary only`
      );
    }

    if (typeof entry.localBusinessSchema !== 'object' || entry.localBusinessSchema === null) {

      throw new Error(`GEO_MISSING_FIELD: localBusinessSchema must be object (${entry.slug})`);

    }



    const lb = entry.localBusinessSchema;

    const needsGeo = entry.type === 'comuna' || entry.type === 'region';



    if (needsGeo) {

      if (!Number.isFinite(lb.latitude) || !Number.isFinite(lb.longitude)) {

        throw new Error(

          `GEO_MISSING_COORDS: ${entry.slug} requires localBusinessSchema.latitude/longitude`

        );

      }

      if (Math.abs(lb.latitude) > 90 || Math.abs(lb.longitude) > 180) {

        throw new Error(`GEO_BAD_COORDS: ${entry.slug} lat/lng out of range`);

      }

      if (!lb.telephone || !lb.priceRange) {

        throw new Error(

          `GEO_MISSING_NAP: ${entry.slug} requires telephone and priceRange`

        );

      }

      if (!lb.addressLocality || !lb.addressRegion || !lb.addressCountry) {

        throw new Error(

          `GEO_MISSING_ADDRESS: ${entry.slug} requires addressLocality, addressRegion, addressCountry`

        );

      }

      if (lb.addressCountry !== entry.countryCode) {

        throw new Error(

          `GEO_ADDRESS_COUNTRY_MISMATCH: ${entry.slug} addressCountry "${lb.addressCountry}" ≠ countryCode "${entry.countryCode}"`

        );

      }

      const faq = entry.content?.faq;

      if (!Array.isArray(faq) || faq.length < 3) {

        throw new Error(

          `GEO_MISSING_FAQ: ${entry.slug} needs content.faq with ≥3 Q&As`

        );

      }

      for (const item of faq) {

        if (!item?.q || !item?.a) {

          throw new Error(`GEO_BAD_FAQ: ${entry.slug} FAQ items need q and a`);

        }

        const k = String(item.q).trim().toLowerCase();

        if (faqQuestions.has(k)) {

          throw new Error(

            `GEO_DUPLICATE_FAQ: "${item.q}" on ${entry.slug} and ${faqQuestions.get(k)}`

          );

        }

        faqQuestions.set(k, entry.slug);

      }

    }



    if (slugs.has(entry.slug)) {

      throw new Error(`GEO_DUPLICATE_SLUG: "${entry.slug}"`);

    }

    slugs.add(entry.slug);



    const pubPath = entry.path || entry.slug;

    if (!pubPath || pubPath.startsWith('/') || pubPath.includes('..')) {

      throw new Error(`GEO_BAD_PATH: ${entry.slug} path="${pubPath}"`);

    }

    if (paths.has(pubPath)) {

      throw new Error(`GEO_DUPLICATE_PATH: "${pubPath}"`);

    }

    paths.add(pubPath);

  }



  // Parent integrity (after all slugs known)

  for (const entry of raw.entries) {

    if (!entry.parentSlug) continue;

    if (!slugs.has(entry.parentSlug)) {

      throw new Error(

        `GEO_BAD_PARENT: ${entry.slug} parentSlug "${entry.parentSlug}" not found`

      );

    }

    const parent = raw.entries.find((e) => e.slug === entry.parentSlug);

    if (parent && parent.countryCode !== entry.countryCode) {

      throw new Error(

        `GEO_PARENT_COUNTRY: ${entry.slug} countryCode must match parent ${entry.parentSlug}`

      );

    }

  }



  // Each market hubPath should resolve to an entry (warn via throw for active markets with entries)

  for (const m of raw.markets) {

    const hasEntries = raw.entries.some((e) => e.countryCode === m.code);

    if (!hasEntries) continue;

    const hub = raw.entries.find(

      (e) => (e.path || e.slug) === m.hubPath || e.slug === m.hubPath

    );

    if (!hub) {

      throw new Error(

        `GEO_MISSING_HUB: market ${m.code} hubPath "${m.hubPath}" has no matching entry (required when market has pages)`

      );

    }

  }



  cached = raw;

  return cached;

}



/** Clear cache (tests / multi-pass scripts). */

export function resetGeoConfigCache() {

  cached = null;

}



/** @param {string} slug */

export function getGeoBySlug(slug) {

  const { entries } = loadGeoConfig();

  return entries.find((e) => e.slug === slug) || null;

}



/**

 * @param {string} pathKey

 */

export function getGeoByPath(pathKey) {

  const key = String(pathKey || '').replace(/^\/+|\/+$/g, '');

  const { entries } = loadGeoConfig();

  return entries.find((e) => (e.path || e.slug) === key) || null;

}



/**

 * @param {string} slug

 * @returns {GeoEntry}

 */

export function requireGeoBySlug(slug) {

  const entry = getGeoBySlug(slug);

  if (!entry) {

    const err = new Error(`GEO_SLUG_NOT_FOUND:${slug}`);

    err.code = 'GEO_SLUG_NOT_FOUND';

    throw err;

  }

  return entry;

}



/** @returns {string[]} */

export function listGeoSlugs() {

  return loadGeoConfig().entries.map((e) => e.slug);

}



/** @returns {string[]} public paths without leading slash */

export function listGeoPaths() {

  return loadGeoConfig().entries.map((e) => e.path || e.slug);

}



export { CONFIG_PATH };


