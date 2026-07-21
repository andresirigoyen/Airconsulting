/**
 * Market / locale helpers for geo SSG (CL, NO, …).
 * UI copy and BCP47 tags live here — not hardcoded in the HTML factory.
 */
import { loadGeoConfig } from './geo-config.mjs';

/** @typedef {{ code: string, name: string, hreflang: string, hubPath: string, ogLocale?: string, htmlLang?: string }} GeoMarket */

/**
 * @param {string} code
 * @returns {GeoMarket}
 */
export function requireMarket(code) {
  const { markets } = loadGeoConfig();
  const m = (markets || []).find((x) => x.code === code);
  if (!m) {
    throw new Error(
      `GEO_UNKNOWN_MARKET:${code} — add markets[] entry in geo-config.json`
    );
  }
  if (!m.hreflang || !m.hubPath || !m.name) {
    throw new Error(
      `GEO_INCOMPLETE_MARKET:${code} — needs name, hreflang, hubPath`
    );
  }
  return m;
}

/** @param {string} code */
export function countryDisplayName(code) {
  try {
    return requireMarket(code).name;
  } catch {
    return code;
  }
}

/**
 * Page chrome + section labels per market (agnostic factory).
 * @param {string} countryCode
 */
export function marketUi(countryCode) {
  const market = requireMarket(countryCode);
  const htmlLang = market.htmlLang || market.hreflang;
  const ogLocale = market.ogLocale || htmlLang.replace('-', '_');

  const packs = {
    CL: {
      home: 'Inicio',
      breadcrumbLabel: 'Miga de pan',
      skipLink: 'Saltar al contenido',
      servicesBack: '← Servicios',
      faqTitle: 'Preguntas frecuentes',
      expertiseTitle: (city) => `Especialización en ${city}`,
      expertiseIntro:
        'Conceptos con los que trabajamos en este mercado (no es una lista de keywords):',
      localContext: 'Contexto local',
      sectors: 'Sectores',
      coverage: 'Cobertura',
      refSectors: 'Sectores de referencia',
      focusOn: (city) => `Enfoque en ${city}`,
      painPoints: 'Retos habituales',
      services: 'Servicios',
      cases: 'Casos relacionados',
      nearby: 'Cercanas',
      audiences: 'A quiénes ayudamos',
      regions: 'Regiones',
      locations: 'Ubicaciones',
      viewPage: 'Ver página →',
      ctaDefault: 'Cotizar →',
      ctaServices: 'Ver servicios →',
      ctaCity: (city) => `Cotizar en ${city} →`,
      waDefault: 'WhatsApp',
      waMsg: (city) => `¡Hola! Me interesa un proyecto web en ${city}.`,
      offerLanding: 'Landing page — precio orientativo desde',
      offerSeo: 'SEO básico — precio orientativo desde',
      offerCatalog: (name, city) => `Servicios ${name} — ${city}`,
      currencies: 'USD, EUR, CLP, DKK, NOK',
      serviceDefaults: ['Desarrollo web', 'E-commerce', 'SEO'],
      footerGeo: 'Chile · Santiago · Remoto',
    },
    NO: {
      home: 'Hjem',
      breadcrumbLabel: 'Brødsmuler',
      skipLink: 'Hopp til innhold',
      servicesBack: '← Tjenester',
      faqTitle: 'Vanlige spørsmål',
      expertiseTitle: (city) => `Fagområder i ${city}`,
      expertiseIntro:
        'Temaer vi jobber med i dette markedet (ikke keyword-stuffing):',
      localContext: 'Lokal kontekst',
      sectors: 'Bransjer',
      coverage: 'Dekning',
      refSectors: 'Referanseområder',
      focusOn: (city) => `Fokus i ${city}`,
      painPoints: 'Vanlige utfordringer',
      services: 'Tjenester',
      cases: 'Relaterte case',
      nearby: 'I nærheten',
      audiences: 'Hvem vi hjelper',
      regions: 'Regioner',
      locations: 'Steder',
      viewPage: 'Se side →',
      ctaDefault: 'Be om tilbud →',
      ctaServices: 'Se tjenester →',
      ctaCity: (city) => `Tilbud i ${city} →`,
      waDefault: 'WhatsApp',
      waMsg: (city) => `Hei! Jeg er interessert i et nettprosjekt i ${city}.`,
      offerLanding: 'Landingsside — veiledende pris fra',
      offerSeo: 'Grunnleggende SEO — veiledende pris fra',
      offerCatalog: (name, city) => `Tjenester ${name} — ${city}`,
      currencies: 'NOK, EUR, USD, DKK',
      serviceDefaults: ['Webutvikling', 'E-handel', 'SEO'],
      footerGeo: 'Norge · Oslo · Remote',
    },
  };

  const ui = packs[countryCode] || packs.CL;
  return {
    ...ui,
    market,
    htmlLang,
    ogLocale,
    ogLocaleAlternate: countryCode === 'NO' ? 'en_GB' : 'es_ES',
  };
}
