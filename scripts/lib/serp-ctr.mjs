/**
 * SERP title/description helpers — Chile-first CTR (benefits + prices).
 * Keeps niche uniqueness; injects a short proof only when it fits cleanly.
 */
import { ENTITY } from './entity-nap.mjs';

const LANDING = ENTITY.indicativePricing.landingFromUsd;
const PRODUCT = ENTITY.indicativePricing.productFromUsd;

const HAS_PROOF = /\bUSD\b|\bCLP\b|desde\s*~?\s*\$|\+\d+%/i;

/**
 * @param {string} title
 * @returns {string}
 */
export function withCtrTitle(title) {
  const t = String(title || '').trim();
  if (!t || HAS_PROOF.test(t)) return t;
  const next = t.replace(
    /\s*[|—–-]\s*IrigoyenDev\s*$/i,
    ` | desde USD ${LANDING} — IrigoyenDev`
  );
  // Only rewrite when the result stays SERP-friendly (no ellipsis truncation).
  if (next !== t && next.length <= 62) return next;
  return t;
}

/**
 * @param {string} description
 * @returns {string}
 */
export function withCtrDescription(description) {
  const d = String(description || '').trim();
  if (!d) return d;
  if (HAS_PROOF.test(d)) return d.length <= 160 ? d : d.slice(0, 157).trimEnd() + '…';

  const proof = ` Landings desde USD ${LANDING}; tiendas desde USD ${PRODUCT}.`;
  const base = d.replace(/\.\s*$/, '');
  const next = `${base}.${proof}`;
  if (next.length <= 160) return next;

  // Don't mangle long niche copy — leave original if it already fits.
  if (d.length <= 160) return d;
  return `${d.slice(0, 157).trimEnd()}…`;
}

export const CTR_PROOF = Object.freeze({
  landingFromUsd: LANDING,
  productFromUsd: PRODUCT,
});
