/**
 * Shared Schema.org / GEO helpers for build scripts.
 * Keep @id targets stable: #organization, #website, #business, #person.
 */
import { ENTITY, entityPostalAddress } from './entity-nap.mjs';
import { SITE, OG_DEFAULT } from './page-chrome.mjs';

export const ORG_ID = `${SITE}/#organization`;
export const WEBSITE_ID = `${SITE}/#website`;
export const BUSINESS_ID = `${SITE}/#business`;
export const PERSON_ID = `${SITE}/#person`;

/** Organization node — cite from every page graph when possible. */
export function organizationLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: ENTITY.legalName,
    alternateName: ENTITY.alternateName,
    url: ENTITY.url,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE}/favicon.svg`,
      width: 512,
      height: 512,
    },
    image: OG_DEFAULT,
    email: ENTITY.email,
    telephone: ENTITY.telephone,
    address: entityPostalAddress(),
    sameAs: [...ENTITY.sameAs],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: ENTITY.telephone,
      contactType: 'sales',
      areaServed: ['CL', 'DK', 'NO'],
      availableLanguage: ['Spanish', 'English', 'Danish'],
      url: `${SITE}${ENTITY.contactPath}`,
    },
  };
}

/**
 * Speakable WebPage block for GEO / voice assistants.
 * @param {{ name: string, url: string, description?: string }} opts
 */
export function speakableWebPageLd(opts) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${opts.url}#webpage`,
    name: opts.name,
    url: opts.url,
    ...(opts.description ? { description: opts.description } : {}),
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORG_ID },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.geo-summary', '.service-value-prop', '.faq-answer'],
    },
  };
}

/**
 * Opening hours Mon–Fri 09:00–18:00 (local remote studio).
 */
export function openingHoursSpec() {
  return {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '18:00',
  };
}

/**
 * Offer catalog with transparent indicative prices (USD).
 */
export function serviceOfferCatalogLd() {
  const p = ENTITY.indicativePricing;
  return {
    '@type': 'OfferCatalog',
    name: 'Servicios de Desarrollo Web',
    itemListElement: [
      {
        '@type': 'Offer',
        price: String(p.landingFromUsd),
        priceCurrency: 'USD',
        itemOffered: {
          '@type': 'Service',
          name: 'Landing Page',
          description: 'Página de aterrizaje optimizada para conversión',
          url: `${SITE}/landing-pages`,
        },
      },
      {
        '@type': 'Offer',
        price: String(p.productFromUsd),
        priceCurrency: 'USD',
        itemOffered: {
          '@type': 'Service',
          name: 'Tienda Online',
          description: 'E-commerce completo con pasarela de pagos',
          url: `${SITE}/crear-tienda-online`,
        },
      },
      {
        '@type': 'Offer',
        price: String(p.seoFromUsd),
        priceCurrency: 'USD',
        itemOffered: {
          '@type': 'Service',
          name: 'SEO y GEO',
          description:
            'Posicionamiento orgánico y optimización para IA generativa',
          url: `${SITE}/servicios/geo-optimizacion-ia`,
        },
      },
    ],
  };
}
