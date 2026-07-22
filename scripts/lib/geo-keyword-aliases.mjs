/**
 * Keyword URL aliases for CL geo comunas (competitive SEO).
 * Public aliases rewrite to the silo canonical /santiago/{slug} (or hub).
 *
 * Patterns:
 * - /desarrollo-web-en-{slug}, /agencia-web-en-{slug}
 * - Extra hub aliases: /desarrollo-web-santiago, /tienda-online-santiago, /agencia-web-santiago
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..', '..');
const VERCEL_PATH = path.join(root, 'vercel.json');

export const ALIAS_PREFIXES = ['desarrollo-web-en', 'agencia-web-en'];

/** Extra service×city aliases (no "en") → Santiago hub */
export const EXTRA_HUB_ALIASES = [
  'desarrollo-web-santiago',
  'tienda-online-santiago',
  'agencia-web-santiago',
];

/**
 * @param {import('./geo-config.mjs').GeoEntry} entry
 * @returns {string[]} public alias paths without leading slash
 */
export function keywordAliasPathsFor(entry) {
  if (entry.countryCode !== 'CL') return [];
  if (entry.type === 'comuna' && entry.parentSlug === 'santiago') {
    return ALIAS_PREFIXES.map((p) => `${p}-${entry.slug}`);
  }
  if (entry.type === 'hub' && entry.slug === 'santiago') {
    return [...ALIAS_PREFIXES.map((p) => `${p}-santiago`), ...EXTRA_HUB_ALIASES];
  }
  return [];
}

/**
 * @param {import('./geo-config.mjs').GeoEntry[]} entries
 * @returns {{ source: string, destination: string }[]}
 */
export function buildKeywordRewrites(entries) {
  /** @type {{ source: string, destination: string }[]} */
  const out = [];
  for (const entry of entries) {
    const dest = `/${entry.path || entry.slug}`;
    for (const alias of keywordAliasPathsFor(entry)) {
      out.push({ source: `/${alias}`, destination: dest });
    }
  }
  out.sort((a, b) => a.source.localeCompare(b.source));
  return out;
}

function isManagedAliasSource(src) {
  if (ALIAS_PREFIXES.some((p) => src.startsWith(`/${p}-`))) return true;
  if (EXTRA_HUB_ALIASES.some((a) => src === `/${a}`)) return true;
  return false;
}

/**
 * Merge keyword rewrites into vercel.json (replace previous geo-alias block).
 * @param {import('./geo-config.mjs').GeoEntry[]} entries
 */
export function syncVercelKeywordRewrites(entries) {
  const raw = JSON.parse(fs.readFileSync(VERCEL_PATH, 'utf8'));
  const keyword = buildKeywordRewrites(entries);
  const keywordSources = new Set(keyword.map((r) => r.source));

  const existing = Array.isArray(raw.rewrites) ? raw.rewrites : [];
  const kept = existing.filter((r) => {
    const src = String(r.source || '');
    if (isManagedAliasSource(src)) return false;
    if (keywordSources.has(src)) return false;
    return true;
  });

  raw.rewrites = [...kept, ...keyword];
  fs.writeFileSync(VERCEL_PATH, JSON.stringify(raw, null, 2) + '\n');
  return keyword.length;
}
