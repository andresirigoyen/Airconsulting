/**
 * Enrich geo-config comunas with unique FAQs + semantic topics (no keyword stuffing).
 * Idempotent: overwrites content.faq / content.semanticTopics / strengthens localBusinessSchema.
 * Run: node scripts/enrich-geo-entities.mjs && npm run build:geo
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ENTITY } from './lib/entity-nap.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const configPath = path.join(__dirname, '..', 'data', 'geo-config.json');

/** Unique topical + FAQ packs per region landing slug */
const REGION_PACKS = {
  'diseno-desarrollo-web-valparaiso': {
    semanticTopics: [
      'e-commerce floral y catálogos de temporada',
      'reservas y WhatsApp para comercio local',
      'SEO para Quinta Región',
      'performance en redes móviles costeras',
    ],
    faq: [
      {
        q: '¿Hacen desarrollo web para negocios en Valparaíso y Viña del Mar?',
        a: `Sí. ${ENTITY.legalName} trabaja con comercios y servicios de la Quinta Región: catálogos, reservas y SEO local. Contacto ${ENTITY.email} / ${ENTITY.telephoneDisplay}.`,
      },
      {
        q: '¿Cuánto cuesta una landing para un local en Valparaíso?',
        a: `Las landings orientativas parten desde ~USD ${ENTITY.indicativePricing.landingFromUsd}. Detalle en ${ENTITY.url}${ENTITY.pricingPath}.`,
      },
      {
        q: '¿Tienen caso real en la región?',
        a: 'Sí: el caso Florería (Quinta Región) muestra catálogo, pedidos y foco en conversión móvil — útil como referencia de comercio local.',
      },
    ],
  },
  'desarrollo-web-concepcion': {
    semanticTopics: [
      'sitios para PyMEs del Biobío',
      'captación de leads B2B',
      'SEO on-page regional',
      'mantenimiento Care remoto',
    ],
    faq: [
      {
        q: '¿Atienden proyectos web en Concepción y el Gran Concepción?',
        a: `Sí. Operamos remoto con el mismo stack que en Santiago: HTML estático o producto a medida, NAP coherente (${ENTITY.telephoneDisplay}) y precios transparentes.`,
      },
      {
        q: '¿Qué entrega tiene más sentido para una PyME en Concepción?',
        a: `Suele ser una landing o sitio de servicios desde ~USD ${ENTITY.indicativePricing.landingFromUsd}, con CTA a WhatsApp o formulario y base SEO.`,
      },
      {
        q: '¿Incluyen mantenimiento después del lanzamiento?',
        a: `Plan Care desde ~USD ${ENTITY.indicativePricing.careFromUsd}/mes. Ver ${ENTITY.url}/precios#care.`,
      },
    ],
  },
  'desarrollo-web-antofagasta': {
    semanticTopics: [
      'webs para proveedores mineros y servicios',
      'confianza B2B en el primer viewport',
      'SEO técnico en zona norte',
      'formularios y tracking de leads',
    ],
    faq: [
      {
        q: '¿Desarrollan sitios para empresas en Antofagasta?',
        a: `Sí. ${ENTITY.legalName} (${ENTITY.founder}) construye sitios B2B y de servicios para el norte: claridad, velocidad y medición de leads.`,
      },
      {
        q: '¿Cuál es el rango de un producto web comercial?',
        a: `Orientativo USD ${ENTITY.indicativePricing.productRangeUsd}. Cotización en ${ENTITY.url}${ENTITY.contactPath}.`,
      },
      {
        q: '¿Cómo verifican la entidad del negocio para Google e IA?',
        a: `Con NAP idéntico: nombre ${ENTITY.legalName}, teléfono ${ENTITY.telephoneDisplay}, email ${ENTITY.email}, schema LocalBusiness y Google Business Profile alineados.`,
      },
    ],
  },
};

/** Unique topical + FAQ packs per comuna slug */
const COMUNA_PACKS = {
  'las-condes': {
    semanticTopics: [
      'optimización de performance (Core Web Vitals)',
      'landings de demo para SaaS y B2B',
      'paneles admin y flujos de onboarding',
      'medición de conversiones (analytics / eventos)',
    ],
    faq: [
      {
        q: '¿Cuánto cuesta una landing de captación para un equipo en Las Condes?',
        a: `Las landings orientativas parten desde ~USD ${ENTITY.indicativePricing.landingFromUsd}. Un producto comercial suele situarse en USD ${ENTITY.indicativePricing.productRangeUsd}. Cotizamos alcance exacto en ${ENTITY.url}${ENTITY.pricingPath} y el formulario de contacto.`,
      },
      {
        q: '¿Pueden mejorar la velocidad de un sitio corporativo lento en el oriente de Santiago?',
        a: 'Sí. Auditamos LCP/CLS, imágenes, fuentes y JS; priorizamos Core Web Vitals porque afectan ranking y la percepción de marca en oficinas y scale-ups de Las Condes.',
      },
      {
        q: '¿Trabajan con SaaS que necesitan una página de demos?',
        a: 'Es un caso habitual: mensaje claro, prueba social, CTA a demo o calendario, y tracking. El mismo stack sirve para servicios B2B premium del sector.',
      },
    ],
  },
  providencia: {
    semanticTopics: [
      'UX para clínicas y agenda de citas',
      'waitlists y validación de startups',
      'SEO on-page para servicios profesionales',
      'integración WhatsApp Business + formularios',
    ],
    faq: [
      {
        q: '¿Sirve una web para una clínica o centro médico en Providencia?',
        a: 'Sí. Diseñamos UX clara (servicios, equipo, ubicación), CTA de reserva o WhatsApp, y base SEO local — sin relleno genérico de “desarrollo web”.',
      },
      {
        q: '¿Qué necesitan las startups early-stage en Providencia como primer entregable?',
        a: `Suele bastar una landing de validación desde ~USD ${ENTITY.indicativePricing.landingFromUsd}: propuesta de valor, CTA y analytics. Luego escalamos a panel o e-commerce si convierte.`,
      },
      {
        q: '¿Cómo evitan el copy-paste entre comunas?',
        a: 'Cada página tiene ángulo y FAQs propias (salud, startups, retail). La estructura es compartida; el contenido no.',
      },
    ],
  },
  vitacura: {
    semanticTopics: [
      'experiencia de marca y tipografía',
      'confianza visual en el primer viewport',
      'analytics de conversión',
      'e-commerce selecto con checkout confiable',
    ],
    faq: [
      {
        q: '¿Qué diferencia un sitio “premium” en Vitacura de una plantilla?',
        a: 'Jerarquía tipográfica, performance y mensajes precisos. Evitamos plantillas genéricas: el visitante debe percibir solidez en los primeros segundos.',
      },
      {
        q: '¿Incluyen medición de conversiones?',
        a: 'Sí. Definimos eventos (demo, lead, compra) para que el equipo comercial sepa qué funciona — dato que las IA y los equipos de growth usan como señal de seriedad.',
      },
      {
        q: '¿Cuál es el rango para una plataforma o producto web?',
        a: `Productos comerciales orientativos: USD ${ENTITY.indicativePricing.productRangeUsd}; plataformas a medida desde ~USD ${ENTITY.indicativePricing.platformFromUsd}. Detalle en ${ENTITY.url}${ENTITY.pricingPath}.`,
      },
    ],
  },
  nunoa: {
    semanticTopics: [
      'validación de MVP con landing',
      'catálogos móviles para comercio local',
      'embudos a WhatsApp',
      'indexación limpia desde el día uno',
    ],
    faq: [
      {
        q: '¿Puedo validar un producto digital en Ñuñoa sin construir una app completa?',
        a: 'Sí. Una landing con CTA y medición suele ser el primer paso correcto: menos deuda técnica, más aprendizaje real.',
      },
      {
        q: '¿Sirve para un negocio de barrio que hoy solo vende por Instagram?',
        a: 'Sí. Canal propio indexable + WhatsApp reduce dependencia de algoritmos ajenos y mejora descubrimiento local.',
      },
      {
        q: '¿Cuánto cuesta el SEO básico de arranque?',
        a: `El paquete de SEO básico orientativo parte desde ~USD ${ENTITY.indicativePricing.seoFromUsd} (títulos, meta, sitemap, velocidad, estructura). Ver ${ENTITY.url}${ENTITY.pricingPath}.`,
      },
    ],
  },
  'santiago-centro': {
    semanticTopics: [
      'NAP consistente (nombre, teléfono, ubicación)',
      'sitios institucionales usables en móvil',
      'landings de campaña para equipos comerciales',
      'mantenimiento continuo (Care)',
    ],
    faq: [
      {
        q: '¿Por qué importa el NAP en Santiago Centro?',
        a: `Nombre, teléfono (${ENTITY.telephoneDisplay}) y datos de contacto idénticos en web y Google Business Profile ayudan a Google y a las IA a verificar la entidad ${ENTITY.legalName}.`,
      },
      {
        q: '¿Modernizan sitios institucionales difíciles de usar en el celular?',
        a: 'Sí. Priorizamos tipografía legible, menús simples y formularios con tracking — el centro concentra visitas móviles reales.',
      },
      {
        q: '¿Ofrecen mantenimiento mensual?',
        a: `Plan Care desde ~USD ${ENTITY.indicativePricing.careFromUsd}/mes (updates, seguridad, contenido). Detalle en ${ENTITY.url}/precios#care.`,
      },
    ],
  },
  'la-reina': {
    semanticTopics: [
      'webs de servicios profesionales',
      'contenido escaneable sin relleno',
      'SEO on-page local',
      'soporte Care para freelancers y estudios',
    ],
    faq: [
      {
        q: '¿Qué necesita un consultor o estudio en La Reina?',
        a: 'Una página que explique el servicio en 30 segundos, CTA claro y SEO básico. Evitamos repetir la misma keyword: hablamos de agenda, confianza y claridad.',
      },
      {
        q: '¿Puedo contratar solo mantenimiento de una web existente?',
        a: `Sí. Care cubre actualizaciones, backups y cambios de contenido desde ~USD ${ENTITY.indicativePricing.careFromUsd}/mes.`,
      },
      {
        q: '¿Trabajan remoto con profesionales del oriente de Santiago?',
        a: `Sí. ${ENTITY.legalName} opera remoto; contacto ${ENTITY.email} / WhatsApp ${ENTITY.telephoneDisplay}.`,
      },
    ],
  },
  'lo-barnechea': {
    semanticTopics: [
      'checkout y reservas confiables',
      'branding digital exigente',
      'SEO técnico pese a tráfico de marca',
      'lanzamientos con landing de campaña',
    ],
    faq: [
      {
        q: '¿Cómo evitan que un e-commerce se sienta “barato” en La Dehesa?',
        a: 'UX de checkout, tipografía, velocidad y microcopys claros. La confianza se diseña; no se improvisa con plantillas genéricas.',
      },
      {
        q: '¿Tiene sentido SEO si ya tengo marca conocida?',
        a: 'Sí. El tráfico de marca también necesita titles, schema y velocidad; evita canibalización y mejora rich results.',
      },
      {
        q: '¿Cuál es el rango para una tienda online?',
        a: `Un producto comercial/e-commerce orientativo está en USD ${ENTITY.indicativePricing.productRangeUsd}. Cotización en ${ENTITY.url}${ENTITY.contactPath}.`,
      },
    ],
  },
  maipu: {
    semanticTopics: [
      'pasarelas de pago en Chile',
      'catálogo móvil de alto volumen',
      'CTAs de compra y WhatsApp',
      'SEO local para retail',
    ],
    faq: [
      {
        q: '¿Integran Mercado Pago u otras pasarelas para tiendas en Maipú?',
        a: 'Sí. Elegimos pasarela según giro y volumen (Mercado Pago, Transbank, Getnet, etc.) y la dejamos documentada en la cotización.',
      },
      {
        q: '¿Qué priorizan en un retail de alto tráfico peatonal/digital?',
        a: 'Móvil primero, velocidad y CTA obvio (comprar / WhatsApp). Menos jerga startup; más conversión operativa.',
      },
      {
        q: '¿Cuánto cuesta empezar con una landing de oferta?',
        a: `Desde ~USD ${ENTITY.indicativePricing.landingFromUsd} orientativos. Ideal para campañas Ads o lanzamientos de catálogo.`,
      },
    ],
  },
  penalolen: {
    semanticTopics: [
      'SEO local y GEO (contenido citables)',
      'schema para servicios de barrio',
      'captación de leads de servicios',
      'e-commerce ligero',
    ],
    faq: [
      {
        q: '¿Cómo aparecen en búsquedas del tipo servicio + Peñalolén?',
        a: 'Con títulos honestos, NAP coherente, schema y contenido que responde la duda del vecino — no con repetir la misma frase 20 veces.',
      },
      {
        q: '¿Qué es GEO además del SEO clásico?',
        a: 'Preparar el sitio para que motores generativos (y Google) puedan citar hechos claros: servicios, zonas, precios orientativos y FAQs únicas.',
      },
      {
        q: '¿Quién es IrigoyenDev y cómo contacto?',
        a: `${ENTITY.legalName} (${ENTITY.founder}). Email ${ENTITY.email}, WhatsApp ${ENTITY.telephoneDisplay}, web ${ENTITY.url}. Operamos remoto para clientes en Chile.`,
      },
    ],
  },
};

function main() {
  const raw = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  let n = 0;
  let nRegion = 0;

  for (const entry of raw.entries) {
    // Normalize NAP on every entry
    entry.localBusinessSchema = {
      ...entry.localBusinessSchema,
      telephone: ENTITY.telephone,
      email: ENTITY.email,
      priceRange: ENTITY.priceRange,
      name: entry.localBusinessSchema?.name || `${ENTITY.legalName} — ${entry.city}`,
    };

    if (entry.type === 'region') {
      const pack = REGION_PACKS[entry.slug];
      if (pack) {
        entry.content = entry.content || {};
        entry.content.faq = pack.faq;
        entry.content.semanticTopics = pack.semanticTopics;
        nRegion++;
      } else {
        console.warn('No region pack for', entry.slug);
      }
      continue;
    }

    if (entry.type !== 'comuna') continue;
    const pack = COMUNA_PACKS[entry.slug];
    if (!pack) {
      console.warn('No pack for', entry.slug);
      continue;
    }

    entry.content = entry.content || {};
    entry.content.faq = pack.faq;
    entry.content.semanticTopics = pack.semanticTopics;
    if (entry.content.localAngle && !entry.content.localAngle.includes('temas')) {
      entry.content.semanticIntro = `En ${entry.city} trabajamos conceptos como: ${pack.semanticTopics.slice(0, 3).join('; ')}.`;
    }
    n++;
  }

  // Deduplicate FAQ questions across comunas (soft check)
  const qs = new Map();
  for (const entry of raw.entries) {
    for (const f of entry.content?.faq || []) {
      const k = f.q.toLowerCase();
      if (qs.has(k)) console.warn('Duplicate FAQ q:', f.q, '→', entry.slug, 'and', qs.get(k));
      else qs.set(k, entry.slug);
    }
  }

  fs.writeFileSync(configPath, JSON.stringify(raw, null, 2) + '\n');
  console.log(`Enriched ${n} comunas + ${nRegion} regions + NAP normalize on all entries`);
}

main();
