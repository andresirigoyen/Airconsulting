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
    alternateName: [ENTITY.alternateName, 'IrigoyenDev con I'],
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
    description: ENTITY.descriptionOrganization,
    disambiguatingDescription: ENTITY.disambiguatingDescription,
    knowsAbout: [...ENTITY.knowsAbout],
    sameAs: [...ENTITY.sameAs],
    founder: { '@id': PERSON_ID },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: ENTITY.telephone,
      contactType: 'sales',
      areaServed: ['CL'],
      availableLanguage: ['Spanish', 'English'],
      url: `${SITE}${ENTITY.contactPath}`,
    },
  };
}

/** Person node — Andrés Irigoyen; cite as BlogPosting author / LocalBusiness provider. */
export function personLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': PERSON_ID,
    name: ENTITY.founder,
    alternateName: [
      ENTITY.legalName,
      'andresirigoyen',
      'IrigoyenDev con I',
      'Andrés Irigoyen IrigoyenDev Chile',
    ],
    url: ENTITY.url,
    image: OG_DEFAULT,
    jobTitle: 'Full-Stack Developer',
    description: ENTITY.descriptionPerson,
    disambiguatingDescription: ENTITY.disambiguatingDescription,
    knowsAbout: [...ENTITY.knowsAbout],
    sameAs: [...ENTITY.sameAs],
    worksFor: { '@id': ORG_ID },
    homeLocation: {
      '@type': 'Place',
      address: entityPostalAddress(),
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      telephone: ENTITY.telephone,
      url: `${SITE}${ENTITY.contactPath}`,
      availableLanguage: ['Spanish', 'English'],
      areaServed: 'CL',
    },
  };
}

/** Shared Chile silo links for lead/geo outros (internal linking). */
export function chileSiloRelatedHtml() {
  return `<section class="project-section fade-in" aria-labelledby="silo-related-title">
            <h2 id="silo-related-title">Enlaces relacionados</h2>
            <ul class="project-results-list">
                <li><a href="/chile">Desarrollo web Chile</a> — hub nacional por regiones</li>
                <li><a href="/santiago">Santiago</a> · <a href="/santiago/comunas">52 comunas</a> · <a href="/santiago/las-condes">Las Condes</a> · <a href="/santiago/providencia">Providencia</a></li>
                <li><a href="/crear-tienda-online">Crear tienda online</a> · <a href="/landing-pages">Landing pages</a> · <a href="/precios">Precios</a></li>
                <li><a href="/servicios/geo-optimizacion-ia">GEO para IA</a> · <a href="/casos-de-exito">Casos de éxito</a> · <a href="/blog">Blog</a></li>
                <li><a href="/diseno-desarrollo-web-valparaiso">Valparaíso</a> · <a href="/desarrollo-web-concepcion">Concepción</a> · <a href="/desarrollo-web-antofagasta">Antofagasta</a> · <a href="/desarrollo-web-temuco">Temuco</a></li>
            </ul>
        </section>`;
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
