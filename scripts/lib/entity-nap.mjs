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
    'https://github.com/andresirigoyen',
    'https://www.linkedin.com/in/andresirigoyen/',
  ],
  contactPath: '/#contact',
  pricingPath: '/precios',
  /** Studio / GBP — Américo Vespucio Norte 767, Las Condes */
  address: Object.freeze({
    streetAddress: 'Américo Vespucio Norte 767',
    addressLocality: 'Las Condes',
    addressRegion: 'Región Metropolitana',
    postalCode: '7550000',
    addressCountry: 'CL',
  }),
  geo: Object.freeze({
    latitude: -33.3915,
    longitude: -70.5462,
  }),
});

/** Schema.org PostalAddress from ENTITY.address */
export function entityPostalAddress() {
  const a = ENTITY.address;
  return {
    '@type': 'PostalAddress',
    streetAddress: a.streetAddress,
    addressLocality: a.addressLocality,
    addressRegion: a.addressRegion,
    postalCode: a.postalCode,
    addressCountry: a.addressCountry,
  };
}
