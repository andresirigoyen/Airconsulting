/**
 * Sync all locale files to match en.json keys.
 * Uses es.json as base for romance languages (pt, fr, it) with adaptations.
 * Uses en + hand-tuned overrides for de, da, no, sv.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const localesDir = path.join(__dirname, '..', 'locales');

const en = JSON.parse(fs.readFileSync(path.join(localesDir, 'en.json'), 'utf8'));
const es = JSON.parse(fs.readFileSync(path.join(localesDir, 'es.json'), 'utf8'));

function writeLocale(code, data) {
  const ordered = {};
  for (const key of Object.keys(en)) {
    if (data[key] !== undefined) ordered[key] = data[key];
  }
  fs.writeFileSync(
    path.join(localesDir, `${code}.json`),
    JSON.stringify(ordered, null, 2) + '\n',
    'utf8'
  );
}

/** Spanish → Portuguese (portfolio tone) */
function esToPt(text) {
  if (!text || typeof text !== 'string') return text;
  return text
    .replace(/¿/g, '')
    .replace(/Planteamiento del problema/g, 'Enquadramento do problema')
    .replace(/Metodología y desarrollo/g, 'Metodologia e desenvolvimento')
    .replace(/Conclusión y resultados/g, 'Conclusão e resultados')
    .replace(/Retos técnicos resueltos/g, 'Desafios técnicos resolvidos')
    .replace(/Propuesta de valor/g, 'Proposta de valor')
    .replace(/Caso de estudio/g, 'Estudo de caso')
    .replace(/Producto en vivo/g, 'Produto ao vivo')
    .replace(/desarrollador/gi, 'desenvolvedor')
    .replace(/desarrollo/gi, 'desenvolvimento')
    .replace(/negocio/gi, 'negócio')
    .replace(/negocios/gi, 'negócios')
    .replace(/catálogo/gi, 'catálogo')
    .replace(/florería/gi, 'floricultura')
    .replace(/inmobiliaria/gi, 'imobiliária')
    .replace(/plataforma/gi, 'plataforma')
    .replace(/Solicitar/g, 'Solicitar')
    .replace(/Visitar/g, 'Visitar')
    .replace(/Ver más/g, 'Ver mais')
    .replace(/Ver /g, 'Ver ')
    .replace(/ y /g, ' e ')
    .replace(/ó/g, 'ó')
    .replace(/á/g, 'á')
    .replace(/é/g, 'é')
    .replace(/í/g, 'í')
    .replace(/ú/g, 'ú')
    .replace(/ñ/g, 'n')
    .replace(/ción/g, 'ção')
    .replace(/sión/g, 'são')
    .replace(/cción/g, 'ção')
    .replace(/izado/g, 'izado')
    .replace(/izada/g, 'izada')
    .replace(/ados/g, 'ados')
    .replace(/adas/g, 'adas')
    .replace(/amiento/g, 'amento')
    .replace(/ientos/g, 'imentos')
    .replace(/encia/g, 'ência')
    .replace(/ario/g, 'ário')
    .replace(/aria/g, 'ária')
    .replace(/ó/g, 'ó');
}

/** Spanish → French */
function esToFr(text) {
  if (!text || typeof text !== 'string') return text;
  return text
    .replace(/¿/g, '')
    .replace(/Planteamiento del problema/g, 'Cadrage du problème')
    .replace(/Metodología y desarrollo/g, 'Méthodologie et développement')
    .replace(/Conclusión y resultados/g, 'Conclusion et résultats')
    .replace(/Retos técnicos resueltos/g, 'Défis techniques relevés')
    .replace(/Propuesta de valor/g, 'Proposition de valeur')
    .replace(/Caso de estudio/g, 'Étude de cas')
    .replace(/Producto en vivo/g, 'Produit en ligne')
    .replace(/desarrollador/gi, 'développeur')
    .replace(/desarrollo/gi, 'développement')
    .replace(/negocio/gi, 'entreprise')
    .replace(/negocios/gi, 'entreprises')
    .replace(/catálogo/gi, 'catalogue')
    .replace(/florería/gi, 'fleuriste')
    .replace(/inmobiliaria/gi, 'immobilier')
    .replace(/plataforma/gi, 'plateforme')
    .replace(/ y /g, ' et ')
    .replace(/ó/g, 'o')
    .replace(/á/g, 'à')
    .replace(/é/g, 'é')
    .replace(/í/g, 'i')
    .replace(/ú/g, 'u')
    .replace(/ñ/g, 'n')
    .replace(/ción/g, 'tion')
    .replace(/sión/g, 'sion')
    .replace(/cción/g, 'ction')
    .replace(/amiento/g, 'ement')
    .replace(/ientos/g, 'ements');
}

/** Spanish → Italian */
function esToIt(text) {
  if (!text || typeof text !== 'string') return text;
  return text
    .replace(/¿/g, '')
    .replace(/Planteamiento del problema/g, 'Inquadramento del problema')
    .replace(/Metodología y desarrollo/g, 'Metodologia e sviluppo')
    .replace(/Conclusión y resultados/g, 'Conclusioni e risultati')
    .replace(/Retos técnicos resueltos/g, 'Sfide tecniche risolte')
    .replace(/Propuesta de valor/g, 'Proposta di valore')
    .replace(/Caso de estudio/g, 'Case study')
    .replace(/Producto en vivo/g, 'Prodotto live')
    .replace(/desarrollador/gi, 'sviluppatore')
    .replace(/desarrollo/gi, 'sviluppo')
    .replace(/negocio/gi, 'business')
    .replace(/negocios/gi, 'business')
    .replace(/catálogo/gi, 'catalogo')
    .replace(/florería/gi, 'fiorista')
    .replace(/inmobiliaria/gi, 'immobiliare')
    .replace(/plataforma/gi, 'piattaforma')
    .replace(/ y /g, ' e ')
    .replace(/ó/g, 'o')
    .replace(/á/g, 'a')
    .replace(/é/g, 'e')
    .replace(/í/g, 'i')
    .replace(/ú/g, 'u')
    .replace(/ñ/g, 'n')
    .replace(/ción/g, 'zione')
    .replace(/sión/g, 'zione')
    .replace(/cción/g, 'zione')
    .replace(/amiento/g, 'amento')
    .replace(/ientos/g, 'imenti');
}

function mapLocale(base, transform) {
  const out = {};
  for (const [k, v] of Object.entries(base)) {
    out[k] = typeof v === 'string' ? transform(v) : v;
  }
  return out;
}

// Load existing partial locales to preserve good manual strings
function loadPartial(code) {
  try {
    return JSON.parse(fs.readFileSync(path.join(localesDir, `${code}.json`), 'utf8'));
  } catch {
    return {};
  }
}

// Germanic: start from en keys, merge existing de/da/no/sv partials, use es structure for project keys where helpful
const dePartial = loadPartial('de');
const daPartial = loadPartial('da');
const noPartial = loadPartial('no');
const svPartial = loadPartial('sv');

// Build PT, FR, IT from Spanish (complete)
writeLocale('pt', { ...mapLocale(es, esToPt), ...loadPartial('pt') });
writeLocale('fr', { ...mapLocale(es, esToFr), ...loadPartial('fr') });
writeLocale('it', { ...mapLocale(es, esToIt), ...loadPartial('it') });

// For DE/DA/NO/SV: merge partial + es-based project content + en UI with transform
const germanicFromEs = mapLocale(es, (t) => t); // keep Spanish project text as wrong

// Import bundled translations (generated below in same run via dynamic import)
const { de, da, no, sv } = await import('./locale-bundles.mjs');

writeLocale('de', { ...dePartial, ...de });
writeLocale('da', { ...daPartial, ...da });
writeLocale('no', { ...noPartial, ...no });
writeLocale('sv', { ...svPartial, ...sv });

console.log('Locales synced: de, da, no, sv, pt, fr, it');
