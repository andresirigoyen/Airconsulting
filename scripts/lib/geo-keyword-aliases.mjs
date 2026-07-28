/**
 * Keyword URL aliases for geo SEO.
 * - /desarrollo-web-en-{slug}, /agencia-web-en-{slug} → /santiago/{slug}
 * - /desarrollo-web-{slug} (short, competitor-style) → /santiago/{slug}
 * - Hub extras + regional short aliases
 *
 * Synced into vercel.json as permanent (301) redirects so GSC reports
 * "Page with redirect" instead of soft-rewrite + alternate canonical.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..', '..');
const VERCEL_PATH = path.join(root, 'vercel.json');

export const ALIAS_PREFIXES = ['desarrollo-web-en', 'agencia-web-en', 'desarrollo-web'];

export const EXTRA_HUB_ALIASES = [
  'desarrollo-web-santiago',
  'tienda-online-santiago',
  'agencia-web-santiago',
];

/** Static redirects not derived from geo comunas (real HTML elsewhere). */
export const STATIC_REWRITES = [
  { source: '/desarrollo-web-valparaiso', destination: '/diseno-desarrollo-web-valparaiso' },
];

/**
 * Paths that are real root HTML pages — never treat as managed alias wipe targets alone.
 * (desarrollo-web-concepcion.html etc.)
 */
const RESERVED_SHORT_PATHS = new Set([
  'desarrollo-web-concepcion',
  'desarrollo-web-antofagasta',
  'desarrollo-web-temuco',
  'desarrollo-web-madrid',
  'desarrollo-web-barcelona',
  'desarrollo-web-valencia',
  'web-developer-copenhagen',
  'web-developer-aarhus',
]);

/**
 * @param {import('./geo-config.mjs').GeoEntry} entry
 * @returns {string[]}
 */
export function keywordAliasPathsFor(entry) {
  if (entry.countryCode !== 'CL') return [];
  if (entry.type === 'comuna' && entry.parentSlug === 'santiago') {
    return ALIAS_PREFIXES.map((p) => `${p}-${entry.slug}`).filter(
      (a) => !RESERVED_SHORT_PATHS.has(a)
    );
  }
  if (entry.type === 'hub' && entry.slug === 'santiago') {
    return [
      ...ALIAS_PREFIXES.map((p) => `${p}-santiago`),
      ...EXTRA_HUB_ALIASES,
    ].filter((a, i, arr) => arr.indexOf(a) === i);
  }
  return [];
}

/**
 * @param {import('./geo-config.mjs').GeoEntry[]} entries
 * @returns {{ source: string, destination: string }[]}
 */
export function buildKeywordRewrites(entries) {
  /** @type {{ source: string, destination: string }[]} */
  const out = [...STATIC_REWRITES];
  for (const entry of entries) {
    const dest = `/${entry.path || entry.slug}`;
    for (const alias of keywordAliasPathsFor(entry)) {
      out.push({ source: `/${alias}`, destination: dest });
    }
  }
  // Dedupe by source
  const seen = new Set();
  const deduped = [];
  for (const r of out) {
    if (seen.has(r.source)) continue;
    seen.add(r.source);
    deduped.push(r);
  }
  deduped.sort((a, b) => a.source.localeCompare(b.source));
  return deduped;
}

function isManagedAliasSource(src) {
  if (STATIC_REWRITES.some((r) => r.source === src)) return true;
  if (EXTRA_HUB_ALIASES.some((a) => src === `/${a}`)) return true;
  if (ALIAS_PREFIXES.some((p) => src.startsWith(`/${p}-`))) {
    const bare = src.slice(1);
    if (RESERVED_SHORT_PATHS.has(bare)) return false;
    return true;
  }
  return false;
}

/**
 * Sync keyword aliases into vercel.json as permanent redirects.
 * Also strips any leftover managed alias entries from rewrites.
 * @param {import('./geo-config.mjs').GeoEntry[]} entries
 */
export function syncVercelKeywordRewrites(entries) {
  const raw = JSON.parse(fs.readFileSync(VERCEL_PATH, 'utf8'));
  const keyword = buildKeywordRewrites(entries).map((r) => ({
    source: r.source,
    destination: r.destination,
    permanent: true,
  }));
  const keywordSources = new Set(keyword.map((r) => r.source));

  const existingRewrites = Array.isArray(raw.rewrites) ? raw.rewrites : [];
  raw.rewrites = existingRewrites.filter((r) => {
    const src = String(r.source || '');
    if (isManagedAliasSource(src)) return false;
    if (keywordSources.has(src)) return false;
    return true;
  });

  const existingRedirects = Array.isArray(raw.redirects) ? raw.redirects : [];
  const keptRedirects = existingRedirects.filter((r) => {
    const src = String(r.source || '');
    if (isManagedAliasSource(src)) return false;
    if (keywordSources.has(src)) return false;
    return true;
  });

  raw.redirects = [...keptRedirects, ...keyword];
  fs.writeFileSync(VERCEL_PATH, JSON.stringify(raw, null, 2) + '\n');
  return keyword.length;
}
