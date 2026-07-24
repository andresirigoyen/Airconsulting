/**
 * Single source of truth for entity / NAP consistency (site + GBP + schema).
 * AI engines and Google reward identical name / phone / email across surfaces.
 * Do NOT hardcode these strings in templates — import from here or geo-config.localBusinessSchema.
 */
export const ENTITY = Object.freeze({
  legalName: 'IrigoyenDev',
  alternateName: 'Irigoyen Dev',
  founder: 'Andrés Irigoyen',
  email: 'andres@irigoyendev.com',
  telephone: '+45-5024-9855',
  telephoneDisplay: '+45 50 24 98 55',
  url: 'https://www.irigoyendev.com',
  priceRange: '$$-$$$',
  /** Indicative entry prices — cite in FAQs for unique extractable facts */
  indicativePricing: {
    landingFromUsd: 600,
    seoFromUsd: 199,
    /** ~CLP 1.200.000 at FX_RATES.CLP (920) */
    productFromUsd: 1304,
    productRangeUsd: 'desde ~1.304',
    platformFromUsd: 10000,
    careFromUsd: 200,
  },
  sameAs: [
    'https://www.irigoyendev.com/',
    'https://github.com/andresirigoyen',
  ],
  contactPath: '/#contact',
  pricingPath: '/precios',
});
