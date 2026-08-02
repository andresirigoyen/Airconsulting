/**
 * Shared Chile geographic entities for JSON-LD areaServed / GEO.
 * Single source — import from apply-seo, regional builder, etc.
 * Do not hardcode region lists in HTML templates.
 */

/** @type {Array<{ '@type': string, name: string, sameAs: string }>} */
export const CHILE_ADMIN_AREAS = [
  {
    '@type': 'AdministrativeArea',
    name: 'Región Metropolitana de Santiago',
    sameAs: 'https://es.wikipedia.org/wiki/Regi%C3%B3n_Metropolitana_de_Santiago',
  },
  {
    '@type': 'AdministrativeArea',
    name: 'Región de Valparaíso',
    sameAs: 'https://es.wikipedia.org/wiki/Regi%C3%B3n_de_Valpara%C3%ADso',
  },
  {
    '@type': 'AdministrativeArea',
    name: 'Región del Biobío',
    sameAs: 'https://es.wikipedia.org/wiki/Regi%C3%B3n_del_B%C3%ADob%C3%ADo',
  },
  {
    '@type': 'AdministrativeArea',
    name: 'Región de Antofagasta',
    sameAs: 'https://es.wikipedia.org/wiki/Regi%C3%B3n_de_Antofagasta',
  },
];

/** Cities / places often used alongside AdministrativeArea */
export const CHILE_PLACES = [
  { '@type': 'City', name: 'Santiago' },
  { '@type': 'City', name: 'Valparaíso' },
  { '@type': 'City', name: 'Viña del Mar' },
  { '@type': 'City', name: 'Concepción' },
  { '@type': 'City', name: 'Antofagasta' },
];

/**
 * Full areaServed graph for national service pages.
 * @returns {Array<object|string>}
 */
export function chileMultiregionAreaServed() {
  return [
    { '@type': 'Country', name: 'Chile' },
    ...CHILE_ADMIN_AREAS,
    ...CHILE_PLACES,
  ];
}
