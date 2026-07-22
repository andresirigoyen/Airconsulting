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

/** Hub packs (Santiago RM directory) — keyed by geo-config hub slug */
const HUB_PACKS = {
  santiago: {
    semanticTopics: [
      'desarrollo web full stack en Santiago',
      'e-commerce y tiendas online para pymes',
      'landing pages de conversión',
      'SEO técnico y GEO para negocios locales',
    ],
    faq: [
      {
        q: '¿Hacen desarrollo web para empresas en Santiago?',
        a: `Sí. ${ENTITY.legalName} (${ENTITY.founder}) opera desde Santiago con alcance nacional e internacional: tiendas online, landings y plataformas a medida.`,
      },
      {
        q: '¿Cuánto cuesta una tienda online en Santiago?',
        a: `Producto comercial/e-commerce orientativo USD ${ENTITY.indicativePricing.productRangeUsd}. Landings desde ~USD ${ENTITY.indicativePricing.landingFromUsd}. Detalle en ${ENTITY.url}${ENTITY.pricingPath}.`,
      },
      {
        q: '¿Atienden todo Santiago o solo comunas específicas?',
        a: 'Operamos remoto para toda la RM y Chile. También tenemos presencia en España y Dinamarca.',
      },
    ],
  },
};

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
  cerrillos: {
    semanticTopics: [
      'catálogos B2B y cotización online',
      'SEO local para proveedores industriales',
      'formularios de lead con tracking',
      'sitios rápidos en móvil',
    ],
    faq: [
      {
        q: '¿Sirve una web para un proveedor industrial en Cerrillos?',
        a: 'Sí. Priorizamos catálogo claro, zonas de atención, CTA de cotización y velocidad — el comprador B2B necesita datos, no marketing genérico.',
      },
      {
        q: '¿Pueden integrar un formulario de cotización con notificación WhatsApp?',
        a: 'Sí. Dejamos el lead medible (evento analytics) y aviso al equipo comercial. Ideal para talleres y distribuidores de Cerrillos.',
      },
      {
        q: '¿Cuál es un primer entregable razonable en Cerrillos?',
        a: 'Landing o web de servicios desde ~USD 600 orientativos; catálogo/e-commerce ligero si ya vendés online. Cotizamos en https://www.irigoyendev.com/precios.',
      },
    ],
  },
  'cerro-navia': {
    semanticTopics: [
      'SEO local barrio a barrio',
      'CTAs a WhatsApp Business',
      'horarios y mapa en el primer viewport',
      'mantenimiento Care para pymes',
    ],
    faq: [
      {
        q: '¿Una pyme de Cerro Navia necesita web si ya tiene Instagram?',
        a: 'Sí, como canal propio indexable. Instagram cambia reglas; la web concentra horarios, servicios y CTA estable con SEO local.',
      },
      {
        q: '¿Priorizan móvil para clientes en Cerro Navia?',
        a: 'Siempre. Tipografía legible, botones grandes y WhatsApp visible — la mayoría llega desde el celular.',
      },
      {
        q: '¿Cuánto cuesta una landing de servicios locales?',
        a: 'Desde ~USD 600 orientativos. Incluye estructura clara, CTA y base SEO. Detalle en https://www.irigoyendev.com/precios.',
      },
    ],
  },
  conchali: {
    semanticTopics: [
      'NAP coherente para Google',
      'landings de oferta local',
      'SEO on-page para servicios',
      'analytics de llamadas y formularios',
    ],
    faq: [
      {
        q: '¿Cómo aparecen en Google con búsquedas de servicios en Conchalí?',
        a: 'Con titles honestos, NAP idéntico, schema LocalBusiness y contenido que responde la duda real del cliente — sin keyword stuffing.',
      },
      {
        q: '¿Modernizan una web antigua de un negocio en Conchalí?',
        a: 'Sí. Migración a stack rápido, tipografía legible y CTA claro; mantenemos lo que ya ranquea si tiene valor.',
      },
      {
        q: '¿Ofrecen plan de mantenimiento?',
        a: 'Plan Care desde ~USD 50/mes orientativos (updates, seguridad, contenido). Ver https://www.irigoyendev.com/precios#care.',
      },
    ],
  },
  'el-bosque': {
    semanticTopics: [
      'e-commerce ligero para retail sur',
      'CTAs de compra y WhatsApp',
      'Core Web Vitals en móvil',
      'SEO local sur de Santiago',
    ],
    faq: [
      {
        q: '¿Pueden armar una tienda online para un retail en El Bosque?',
        a: 'Sí. Catálogo, pasarela (Mercado Pago / Transbank según giro) y checkout móvil. Rango orientativo de producto comercial en https://www.irigoyendev.com/precios.',
      },
      {
        q: '¿Qué priorizan si el negocio atiende mucho por WhatsApp?',
        a: 'Botón sticky, horarios, catálogo o lista de servicios indexable, y medición de clics a WhatsApp.',
      },
      {
        q: '¿Sirve SEO local en El Bosque?',
        a: 'Sí. Páginas de servicios + comuna, schema y velocidad ayudan a aparecer frente a vecinos que buscan en Google, no solo en Instagram.',
      },
    ],
  },
  'estacion-central': {
    semanticTopics: [
      'landings de alta conversión peatonal/digital',
      'mapas y horarios visibles',
      'performance móvil en zonas de alto tráfico',
      'SEO para retail y servicios del eje Alameda',
    ],
    faq: [
      {
        q: '¿Tiene sentido una landing si mi local está en Estación Central?',
        a: 'Sí. El flujo es alto pero la atención es corta: mensaje en 5 segundos, mapa, horarios y CTA (WhatsApp / visita / compra).',
      },
      {
        q: '¿Optimizan sitios para búsquedas cerca del intermodal?',
        a: 'Trabajamos SEO local, schema y claridad de dirección. No prometemos magia de “cerca de mí”; sí presencia técnica sólida.',
      },
      {
        q: '¿Cuánto cuesta una landing de campaña en Estación Central?',
        a: 'Desde ~USD 600 orientativos. Ideal para Ads o lanzamientos de temporada. Cotización en https://www.irigoyendev.com/#contact.',
      },
    ],
  },
  huechuraba: {
    semanticTopics: [
      'landings de demo B2B',
      'Core Web Vitals en sitios corporativos',
      'calendarios y CTAs de reunión',
      'SEO para empresas en parques de oficinas',
    ],
    faq: [
      {
        q: '¿Trabajan con empresas de Ciudad Empresarial en Huechuraba?',
        a: 'Sí. Es un caso habitual: sitio de producto o corporate con CTA a demo/reunión, analytics y velocidad a la altura de un parque de oficinas.',
      },
      {
        q: '¿Qué rango tiene un producto web comercial para un equipo en Huechuraba?',
        a: 'Orientativo USD 3.000–10.000; landings desde ~USD 600. Detalle en https://www.irigoyendev.com/precios.',
      },
      {
        q: '¿Pueden mejorar un sitio corporativo lento del norte de Santiago?',
        a: 'Sí. Auditamos LCP/CLS, imágenes y JS. En Huechuraba la percepción de marca importa tanto como el ranking.',
      },
    ],
  },
  independencia: {
    semanticTopics: [
      'UX para clínicas y centros de salud',
      'CTA de reserva y WhatsApp',
      'confianza visual en el primer viewport',
      'SEO local norte-centro',
    ],
    faq: [
      {
        q: '¿Sirve una web para una clínica o centro en Independencia?',
        a: 'Sí. Servicios, equipo, ubicación, CTA de reserva/WhatsApp y base SEO. Evitamos plantillas genéricas de “salud”.',
      },
      {
        q: '¿Ayudan con consistencia de datos de contacto (NAP)?',
        a: 'Sí. Alineamos nombre, teléfono y dirección en web y recomendaciones de Google Business Profile para que Google e IA verifiquen la entidad.',
      },
      {
        q: '¿Trabajan remoto con profesionales de Independencia?',
        a: 'Sí. IrigoyenDev opera remoto; contacto andres@irigoyendev.com / WhatsApp +45 50 24 98 55.',
      },
    ],
  },
  'la-cisterna': {
    semanticTopics: [
      'landings de oferta para retail sur',
      'pasarelas de pago en Chile',
      'SEO local nodo La Cisterna',
      'analytics de conversión',
    ],
    faq: [
      {
        q: '¿Pueden crear una landing para campañas Ads en La Cisterna?',
        a: 'Sí. Mensaje único, CTA y eventos de conversión. Evitamos mandar tráfico pagado a un home genérico.',
      },
      {
        q: '¿Integran Mercado Pago para comercios del sur?',
        a: 'Sí, u otras pasarelas según giro. Queda documentado en la cotización.',
      },
      {
        q: '¿Cuánto cuesta empezar con e-commerce ligero?',
        a: 'Producto comercial orientativo USD 3.000–10.000. Cotización en https://www.irigoyendev.com/precios.',
      },
    ],
  },
  'la-florida': {
    semanticTopics: [
      'SEO local en comunas de alto volumen',
      'e-commerce y catálogos móviles',
      'landings frente a competencia de mall',
      'embudos a WhatsApp y formularios',
    ],
    faq: [
      {
        q: '¿Cómo compite un negocio local en La Florida frente a cadenas?',
        a: 'Con claridad de oferta, prueba social, velocidad y SEO local honesto. No imitamos el look de mall: destacamos cercanía y servicio.',
      },
      {
        q: '¿Sirve una web si mi local está cerca de Plaza Vespucio?',
        a: 'Sí. El tráfico peatonal no reemplaza descubrimiento en Google ni campañas con landing propia.',
      },
      {
        q: '¿Qué entregable recomiendan para un servicio en La Florida?',
        a: 'Landing o web de servicios con CTA y base SEO desde ~USD 600 orientativos; escalamos a tienda o panel si convierte.',
      },
    ],
  },
  'la-granja': {
    semanticTopics: [
      'SEO servicio + comuna',
      'schema para negocios locales',
      'CTAs de contacto inmediato',
      'mantenimiento continuo',
    ],
    faq: [
      {
        q: '¿Cómo aparecen en búsquedas del tipo servicio + La Granja?',
        a: 'Titles honestos, NAP coherente, schema y FAQs útiles. Sin repetir la misma frase veinte veces.',
      },
      {
        q: '¿Puedo migrar desde Wix o similar?',
        a: 'Sí. Rehacemos en stack rápido, redirigimos lo necesario y dejamos analytics desde el día uno.',
      },
      {
        q: '¿Quién es IrigoyenDev y cómo contacto desde La Granja?',
        a: 'IrigoyenDev (Andrés Irigoyen). Email andres@irigoyendev.com, WhatsApp +45 50 24 98 55, web https://www.irigoyendev.com. Operamos remoto.',
      },
    ],
  },
  'la-pintana': {
    semanticTopics: [
      'embudos a WhatsApp',
      'webs de servicios simples',
      'SEO local sur de la RM',
      'actualización fácil de contenido',
    ],
    faq: [
      {
        q: '¿Una web ayuda si mi negocio en La Pintana vive de WhatsApp?',
        a: 'Sí. La web valida la oferta en Google y concentra horarios/servicios; WhatsApp sigue siendo el CTA principal.',
      },
      {
        q: '¿Priorizan sitios fáciles de mantener?',
        a: 'Sí. Estructura clara y plan Care opcional para cambios de contenido sin depender de un desarrollador cada vez.',
      },
      {
        q: '¿Cuánto cuesta una landing de servicios en La Pintana?',
        a: 'Desde ~USD 600 orientativos. Cotización en https://www.irigoyendev.com/precios.',
      },
    ],
  },
  'lo-espejo': {
    semanticTopics: [
      'formularios de cotización B2B',
      'SEO para talleres y proveedores',
      'catálogos livianos',
      'performance móvil operativa',
    ],
    faq: [
      {
        q: '¿Sirve una web para un taller o proveedor en Lo Espejo?',
        a: 'Sí. Listamos servicios, zonas, CTA de cotización y tracking. El comprador necesita datos concretos.',
      },
      {
        q: '¿Pueden dejar un formulario que avise al WhatsApp del negocio?',
        a: 'Sí. Combinamos formulario + aviso y evento analytics para no perder leads.',
      },
      {
        q: '¿Cuál es un rango inicial razonable?',
        a: 'Landing/web de servicios desde ~USD 600 orientativos. Ver https://www.irigoyendev.com/precios.',
      },
    ],
  },
  'lo-prado': {
    semanticTopics: [
      'SEO local poniente',
      'landings de oferta',
      'NAP y schema LocalBusiness',
      'CTAs unificados WhatsApp/web',
    ],
    faq: [
      {
        q: '¿Cómo mejoran la aparición en Google para un negocio en Lo Prado?',
        a: 'On-page técnico, titles locales honestos, schema y velocidad. Complementamos con recomendaciones de perfil de negocio en Google.',
      },
      {
        q: '¿Pueden unificar Instagram y web en un solo CTA?',
        a: 'Sí. Misma oferta, mismo WhatsApp/formulario, menos fricción para el cliente.',
      },
      {
        q: '¿Ofrecen mantenimiento mensual en Lo Prado?',
        a: 'Plan Care desde ~USD 50/mes orientativos. Detalle en https://www.irigoyendev.com/precios#care.',
      },
    ],
  },
  macul: {
    semanticTopics: [
      'landings para emprendedores cerca de campus',
      'webs de servicios profesionales',
      'SEO oriente-sur',
      'validación rápida con analytics',
    ],
    faq: [
      {
        q: '¿Puedo validar un servicio o producto desde Macul con una landing?',
        a: 'Sí. Propuesta de valor, CTA y medición desde ~USD 600 orientativos. Luego escalamos si convierte.',
      },
      {
        q: '¿Sirve para clínicas o centros cerca de universidades en Macul?',
        a: 'Sí. UX clara, reserva/WhatsApp y base SEO local — sin copy genérico de salud.',
      },
      {
        q: '¿Cómo evitan contenido duplicado con Ñuñoa o Peñalolén?',
        a: 'Cada comuna tiene ángulo, barrios y FAQs propias. La plantilla es compartida; el texto no.',
      },
    ],
  },
  'pedro-aguirre-cerda': {
    semanticTopics: [
      'webs para proveedores y talleres',
      'formularios de cotización',
      'SEO B2B local',
      'migración desde sitios legado',
    ],
    faq: [
      {
        q: '¿Desarrollan sitios para empresas cerca de Lo Valledor en PAC?',
        a: 'Sí. Enfoque B2B: claridad de giro, cobertura, CTA de cotización y tracking.',
      },
      {
        q: '¿Migran sitios antiguos que ya no cargan bien?',
        a: 'Sí. Rehacemos en stack moderno, conservamos URLs útiles con redirects y medimos desde el lanzamiento.',
      },
      {
        q: '¿Cuál es el rango de una web de servicios B2B en PAC?',
        a: 'Landings desde ~USD 600; productos comerciales USD 3.000–10.000 orientativos. https://www.irigoyendev.com/precios',
      },
    ],
  },
  pudahuel: {
    semanticTopics: [
      'webs para logística y servicios aeroportuarios',
      'cobertura y zonas de despacho claras',
      'leads B2B medibles',
      'performance móvil en terreno',
    ],
    faq: [
      {
        q: '¿Sirve una web para una empresa de logística en Pudahuel?',
        a: 'Sí. Cobertura, servicios, CTA de cotización y schema. El comprador B2B necesita hechos, no eslóganes.',
      },
      {
        q: '¿Trabajan con negocios cerca del aeropuerto?',
        a: 'Sí. Mismo estándar remoto: claridad, velocidad y medición — útil para servicios y retail del sector.',
      },
      {
        q: '¿Cuánto cuesta una landing de captación B2B en Pudahuel?',
        a: 'Desde ~USD 600 orientativos. Cotización en https://www.irigoyendev.com/#contact.',
      },
    ],
  },
  quilicura: {
    semanticTopics: [
      'sitios B2B industriales',
      'SEO para proveedores logísticos',
      'formularios con notificación comercial',
      'confianza visual corporativa',
    ],
    faq: [
      {
        q: '¿Desarrollan webs para empresas industriales en Quilicura?',
        a: 'Sí. Catálogo de servicios, certificaciones si aplica, CTA de cotización y velocidad. Tono B2B directo.',
      },
      {
        q: '¿Pueden conectar el formulario con email y WhatsApp del equipo?',
        a: 'Sí. Dejamos el flujo documentado y eventos de analytics para medir leads reales.',
      },
      {
        q: '¿Qué rango tiene un sitio corporativo B2B?',
        a: 'Producto comercial orientativo USD 3.000–10.000. Detalle en https://www.irigoyendev.com/precios.',
      },
    ],
  },
  'quinta-normal': {
    semanticTopics: [
      'UX y tipografía legible',
      'SEO local poniente-centro',
      'landings de servicios y agenda',
      'mantenimiento de contenido',
    ],
    faq: [
      {
        q: '¿Sirve una web moderna para un servicio cerca de Quinta Normal?',
        a: 'Sí. Credibilidad visual, horarios, mapa y CTA. Evitamos plantillas genéricas que restan confianza.',
      },
      {
        q: '¿Pueden mantener el contenido mes a mes?',
        a: 'Plan Care cubre updates y cambios de contenido desde ~USD 50/mes orientativos.',
      },
      {
        q: '¿Incluyen SEO básico al lanzar?',
        a: 'Sí: titles, meta, sitemap, velocidad y estructura. Paquete SEO orientativo desde ~USD 400 en https://www.irigoyendev.com/precios.',
      },
    ],
  },
  recoleta: {
    semanticTopics: [
      'webs para gastronomía y reservas',
      'SEO local Bellavista/Patronato',
      'optimización de imágenes y LCP',
      'CTAs de reserva y WhatsApp',
    ],
    faq: [
      {
        q: '¿Sirve una web para un restaurant o local en Bellavista (Recoleta)?',
        a: 'Sí. Menú/servicios, mapa, horarios, CTA de reserva/WhatsApp y performance — Instagram no reemplaza descubrimiento en Google.',
      },
      {
        q: '¿Optimizan sitios lentos por fotos grandes?',
        a: 'Sí. Imágenes modernas, tamaños correctos y lazy-load cuidadoso para no romper LCP.',
      },
      {
        q: '¿Cómo se diferencian de una página genérica de Providencia?',
        a: 'Ángulo, barrios y FAQs de Recoleta (Bellavista, Patronato). Misma calidad técnica; contenido distinto.',
      },
    ],
  },
  renca: {
    semanticTopics: [
      'SEO local norponiente',
      'webs para pymes en crecimiento',
      'leads con tracking',
      'confianza móvil',
    ],
    faq: [
      {
        q: '¿Atienden proyectos de pymes en Renca de forma remota?',
        a: 'Sí. Diseño, desarrollo y lanzamiento por videollamada/WhatsApp. La entrega es digital.',
      },
      {
        q: '¿Qué priorizan para un negocio que está formalizando su canal web en Renca?',
        a: 'Oferta clara, CTA, NAP coherente y base SEO. Luego iteramos con Care si hace falta contenido mes a mes.',
      },
      {
        q: '¿Cuánto cuesta una web de servicios inicial?',
        a: 'Desde ~USD 600 orientativos (landing/web simple). https://www.irigoyendev.com/precios',
      },
    ],
  },
  'san-joaquin': {
    semanticTopics: [
      'UX para servicios y educación',
      'SEO sur-oriente cercano',
      'landings de captación',
      'performance móvil',
    ],
    faq: [
      {
        q: '¿Pueden modernizar un sitio de servicios en San Joaquín?',
        a: 'Sí. Tipografía legible, menús simples, CTA y tracking — sin rediseño cosmético vacío.',
      },
      {
        q: '¿Sirve para proveedores industriales de la comuna?',
        a: 'Sí. Enfoque B2B: giro, cobertura, cotización y schema.',
      },
      {
        q: '¿Miden formularios y clics a WhatsApp en San Joaquín?',
        a: 'Sí. Definimos eventos de formulario, WhatsApp o agenda según el caso para saber qué convierte.',
      },
    ],
  },
  'san-miguel': {
    semanticTopics: [
      'SEO local Gran Avenida',
      'UX clínicas y agenda',
      'landings vs competencia de cadena',
      'e-commerce ligero',
    ],
    faq: [
      {
        q: '¿Cómo destaca un negocio local en San Miguel frente a cadenas?',
        a: 'Cercanía, prueba social, velocidad y mensaje claro. SEO local honesto + CTA de WhatsApp/reserva.',
      },
      {
        q: '¿Sirve una web para centros de salud en San Miguel?',
        a: 'Sí. Servicios, equipo, ubicación y reserva — con base SEO y móvil primero.',
      },
      {
        q: '¿Cuánto cuesta una landing de campaña en San Miguel?',
        a: 'Desde ~USD 600 orientativos. Ideal para Ads o promociones de temporada.',
      },
    ],
  },
  'san-ramon': {
    semanticTopics: [
      'webs de servicios simples',
      'SEO local sur',
      'CTAs WhatsApp',
      'analytics básico de contactos',
    ],
    faq: [
      {
        q: '¿Una pyme de San Ramón necesita web propia?',
        a: 'Si querés aparecer en Google y no depender solo de algoritmos de redes, sí. Empezamos simple: servicios, CTA y base SEO.',
      },
      {
        q: '¿Pueden dejar todo listo para WhatsApp Business?',
        a: 'Sí. Botón visible, mensaje prearmado opcional y medición de clics.',
      },
      {
        q: '¿Cuál es el costo de entrada?',
        a: 'Landing/web de servicios desde ~USD 600 orientativos. https://www.irigoyendev.com/precios',
      },
    ],
  },
  'puente-alto': {
    semanticTopics: [
      'SEO local en comunas de alto volumen',
      'e-commerce y catálogos móviles',
      'CTAs WhatsApp de alto tráfico',
      'landings frente a competencia de strip center',
    ],
    faq: [
      {
        q: '¿Desarrollan webs para negocios en Puente Alto?',
        a: 'Sí. Foco en conversión móvil, SEO local y CTAs claros para retail y servicios de la comuna más poblada del país.',
      },
      {
        q: '¿Pueden armar una tienda online para un comercio en Puente Alto?',
        a: 'Sí. Catálogo, pasarela (Mercado Pago / Transbank según giro) y checkout móvil. Rangos en https://www.irigoyendev.com/precios.',
      },
      {
        q: '¿Qué priorizan si el negocio vive de WhatsApp en Puente Alto?',
        a: 'Botón sticky, horarios, oferta indexable y medición de clics — la web valida; WhatsApp cierra.',
      },
    ],
  },
  pirque: {
    semanticTopics: [
      'webs para turismo y reservas',
      'optimización de imágenes y LCP',
      'SEO local valle del Maipo',
      'CTAs de visita y WhatsApp',
    ],
    faq: [
      {
        q: '¿Sirve una web para un viñedo o experiencia turística en Pirque?',
        a: 'Sí. Galería liviana, horarios, mapa, CTA de reserva/WhatsApp y base SEO — Instagram no reemplaza descubrimiento en Google.',
      },
      {
        q: '¿Optimizan sitios lentos por fotos de paisaje?',
        a: 'Sí. Formatos modernos, tamaños correctos y lazy-load cuidadoso para no romper LCP.',
      },
      {
        q: '¿Cuánto cuesta una landing de reservas en Pirque?',
        a: 'Desde ~USD 600 orientativos. Cotización en https://www.irigoyendev.com/#contact.',
      },
    ],
  },
  'san-jose-de-maipo': {
    semanticTopics: [
      'reservas turísticas y lodges',
      'SEO Cajón del Maipo',
      'horarios y cómo llegar claros',
      'performance móvil en zona de montaña',
    ],
    faq: [
      {
        q: '¿Hacen webs para lodges o turismo en San José de Maipo?',
        a: 'Sí. Enfoque en reserva/WhatsApp, temporada, cómo llegar y fotos optimizadas — tono claro, sin plantilla genérica de “turismo”.',
      },
      {
        q: '¿Pueden mantener el sitio entre temporadas?',
        a: 'Plan Care cubre updates de contenido y precios desde ~USD 50/mes orientativos. Ver https://www.irigoyendev.com/precios#care.',
      },
      {
        q: '¿Ayuda el SEO para búsquedas del Cajón del Maipo?',
        a: 'Sí, con titles honestos, schema y contenido útil (servicios, zona, FAQs). No prometemos ranking mágico; sí base técnica sólida.',
      },
    ],
  },
  colina: {
    semanticTopics: [
      'SEO local norte RM / Chicureo',
      'landings para servicios en condominios',
      'leads medibles',
      'webs para retail de crecimiento urbano',
    ],
    faq: [
      {
        q: '¿Atienden proyectos web en Colina y Chicureo?',
        a: 'Sí. Operamos remoto con foco en servicios, retail y captación local del crecimiento norte de la RM.',
      },
      {
        q: '¿Qué entregable recomiendan para un servicio en Colina?',
        a: 'Landing o web de servicios con CTA y base SEO desde ~USD 600 orientativos; escalamos si convierte.',
      },
      {
        q: '¿Miden formularios y WhatsApp para negocios en Colina?',
        a: 'Sí. Eventos de analytics para saber qué canal convierte de verdad.',
      },
    ],
  },
  lampa: {
    semanticTopics: [
      'webs B2B industriales y logísticas',
      'formularios de cotización',
      'cobertura y zonas claras',
      'SEO norte RM',
    ],
    faq: [
      {
        q: '¿Sirve una web para un proveedor industrial en Lampa?',
        a: 'Sí. Catálogo de servicios, cobertura, CTA de cotización y schema — tono B2B directo.',
      },
      {
        q: '¿Pueden conectar el formulario con el WhatsApp del equipo comercial?',
        a: 'Sí. Aviso al equipo + evento analytics para no perder leads.',
      },
      {
        q: '¿Cuál es el rango de un sitio corporativo B2B en Lampa?',
        a: 'Producto comercial orientativo USD 3.000–10.000. Detalle en https://www.irigoyendev.com/precios.',
      },
    ],
  },
  tiltil: {
    semanticTopics: [
      'webs de servicios simples',
      'SEO local Chacabuco',
      'CTAs WhatsApp',
      'mantenimiento Care remoto',
    ],
    faq: [
      {
        q: '¿Una pyme de Tiltil necesita web propia?',
        a: 'Si querés aparecer en Google y no depender solo de redes, sí. Empezamos simple: servicios, CTA y base SEO.',
      },
      {
        q: '¿Trabajan remoto con negocios de Tiltil?',
        a: 'Sí. IrigoyenDev opera remoto; contacto andres@irigoyendev.com / WhatsApp +45 50 24 98 55.',
      },
      {
        q: '¿Cuánto cuesta una landing de servicios en Tiltil?',
        a: 'Desde ~USD 600 orientativos. https://www.irigoyendev.com/precios',
      },
    ],
  },
  'san-bernardo': {
    semanticTopics: [
      'SEO local sur RM',
      'landings de oferta retail',
      'pasarelas de pago en Chile',
      'webs para talleres y proveedores',
    ],
    faq: [
      {
        q: '¿Desarrollan e-commerce para comercios en San Bernardo?',
        a: 'Sí. Catálogo móvil, pasarela según giro y checkout claro. Rangos en https://www.irigoyendev.com/precios.',
      },
      {
        q: '¿Sirve una landing para Ads si tengo local en San Bernardo?',
        a: 'Sí. Mensaje único, CTA y eventos — evitamos mandar tráfico pagado a un home genérico.',
      },
      {
        q: '¿Atienden también proveedores industriales del sector Nos?',
        a: 'Sí. Enfoque B2B: giro, cobertura, cotización y tracking.',
      },
    ],
  },
  buin: {
    semanticTopics: [
      'catálogos agro y B2B livianos',
      'SEO valle del Maipo',
      'CTAs de cotización y WhatsApp',
      'performance móvil',
    ],
    faq: [
      {
        q: '¿Sirve una web para un productor o pyme agro en Buin?',
        a: 'Sí. Oferta clara, zonas, CTA de cotización y base SEO — el comprador necesita datos, no eslóganes.',
      },
      {
        q: '¿Pueden integrar un formulario de cotización con aviso WhatsApp?',
        a: 'Sí. Lead medible + notificación al equipo comercial.',
      },
      {
        q: '¿Cuál es un primer entregable razonable en Buin?',
        a: 'Landing/web de servicios desde ~USD 600 orientativos. Cotizamos en https://www.irigoyendev.com/precios.',
      },
    ],
  },
  paine: {
    semanticTopics: [
      'webs agroindustriales',
      'formularios de cotización B2B',
      'SEO sur RM',
      'catálogos livianos',
    ],
    faq: [
      {
        q: '¿Desarrollan sitios para empresas agroindustriales en Paine?',
        a: 'Sí. Claridad de giro, cobertura, CTA de cotización y tracking — tono B2B operativo.',
      },
      {
        q: '¿Migran sitios antiguos de empresas en Paine que ya no cargan bien?',
        a: 'Sí. Stack moderno, redirects útiles y analytics desde el lanzamiento.',
      },
      {
        q: '¿Qué rango tiene una web de servicios B2B en Paine?',
        a: 'Landings desde ~USD 600; productos comerciales USD 3.000–10.000 orientativos.',
      },
    ],
  },
  'calera-de-tango': {
    semanticTopics: [
      'SEO local comuna residencial',
      'CTAs WhatsApp',
      'landings de servicios de barrio',
      'NAP y schema LocalBusiness',
    ],
    faq: [
      {
        q: '¿Una pyme de Calera de Tango necesita web si ya tiene Instagram?',
        a: 'Sí, como canal indexable. Instagram cambia reglas; la web concentra horarios, servicios y CTA estable.',
      },
      {
        q: '¿Priorizan móvil para clientes en Calera de Tango?',
        a: 'Siempre. Tipografía legible, botones grandes y WhatsApp visible.',
      },
      {
        q: '¿Cuánto cuesta una landing de servicios locales aquí?',
        a: 'Desde ~USD 600 orientativos. Detalle en https://www.irigoyendev.com/precios.',
      },
    ],
  },
  melipilla: {
    semanticTopics: [
      'SEO local poniente RM',
      'webs para comercio y agro',
      'landings de oferta',
      'CTAs de contacto medibles',
    ],
    faq: [
      {
        q: '¿Hacen desarrollo web para negocios en Melipilla?',
        a: 'Sí. Comercio, agro y servicios: sitio claro, SEO local y CTA medible. Operamos remoto.',
      },
      {
        q: '¿Sirve para un local en Pomaire u otra zona de Melipilla?',
        a: 'Sí. Mismo estándar: mapa, horarios, oferta y velocidad — con ángulo local, no plantilla genérica.',
      },
      {
        q: '¿Ofrecen mantenimiento mensual para sitios en Melipilla?',
        a: 'Plan Care desde ~USD 50/mes orientativos. Ver https://www.irigoyendev.com/precios#care.',
      },
    ],
  },
  curacavi: {
    semanticTopics: [
      'landings de alta conversión en ruta',
      'mapas y horarios visibles',
      'SEO Curacaví / Ruta 68',
      'performance móvil',
    ],
    faq: [
      {
        q: '¿Tiene sentido una landing si mi negocio está en Curacaví (ruta)?',
        a: 'Sí. Atención corta: mensaje en segundos, mapa, horarios y CTA (WhatsApp / visita).',
      },
      {
        q: '¿Optimizan para búsquedas locales cerca de la Ruta 68?',
        a: 'Trabajamos SEO local, schema y claridad de dirección. Base técnica sólida, sin promesas mágicas.',
      },
      {
        q: '¿Cuánto cuesta una landing de campaña en Curacaví?',
        a: 'Desde ~USD 600 orientativos. https://www.irigoyendev.com/#contact',
      },
    ],
  },
  'maria-pinto': {
    semanticTopics: [
      'webs agro y servicios rurales',
      'embudos a WhatsApp',
      'SEO local Melipilla',
      'formularios de cotización',
    ],
    faq: [
      {
        q: '¿Una web ayuda si mi negocio en María Pinto vive de WhatsApp?',
        a: 'Sí. Valida la oferta en Google y concentra horarios/servicios; WhatsApp sigue siendo el CTA principal.',
      },
      {
        q: '¿Priorizan sitios fáciles de mantener en María Pinto?',
        a: 'Sí. Estructura clara y Care opcional para cambios de contenido.',
      },
      {
        q: '¿Cuánto cuesta empezar en María Pinto?',
        a: 'Landing/web de servicios desde ~USD 600 orientativos.',
      },
    ],
  },
  alhue: {
    semanticTopics: [
      'webs mínimas para comunas rurales',
      'SEO local Alhué',
      'CTAs WhatsApp',
      'contenido claro sin relleno',
    ],
    faq: [
      {
        q: '¿Vale la pena una web para un servicio en Alhué?',
        a: 'Si querés aparecer en Google y proyectar seriedad, sí. Empezamos liviano: oferta, mapa y CTA.',
      },
      {
        q: '¿Trabajan remoto con comunas rurales de la RM?',
        a: 'Sí. Todo el ciclo es remoto; la entrega es digital.',
      },
      {
        q: '¿Cuál es el costo de entrada para Alhué?',
        a: 'Desde ~USD 600 orientativos por landing/web simple.',
      },
    ],
  },
  'san-pedro': {
    semanticTopics: [
      'webs agro rurales',
      'cotización por WhatsApp',
      'SEO local suroeste RM',
      'NAP coherente',
    ],
    faq: [
      {
        q: '¿Sirve una web para un productor o servicio en San Pedro (RM)?',
        a: 'Sí. Oferta, zona, CTA de cotización y base SEO — tono directo y operativo.',
      },
      {
        q: '¿Pueden dejar formulario + WhatsApp juntos?',
        a: 'Sí. Combinamos ambos y medimos clics/envíos.',
      },
      {
        q: '¿Quién es IrigoyenDev y cómo contacto desde San Pedro?',
        a: 'IrigoyenDev (Andrés Irigoyen). Email andres@irigoyendev.com, WhatsApp +45 50 24 98 55, web https://www.irigoyendev.com.',
      },
    ],
  },
  talagante: {
    semanticTopics: [
      'SEO local Talagante',
      'landings de oferta',
      'NAP y schema',
      'CTAs unificados WhatsApp/web',
    ],
    faq: [
      {
        q: '¿Cómo mejoran la aparición en Google para un negocio en Talagante?',
        a: 'On-page técnico, titles locales honestos, schema y velocidad — más recomendaciones de perfil de negocio en Google.',
      },
      {
        q: '¿Pueden unificar Instagram y web en un solo CTA en Talagante?',
        a: 'Sí. Misma oferta, mismo WhatsApp/formulario, menos fricción.',
      },
      {
        q: '¿Ofrecen Care mensual en Talagante?',
        a: 'Sí, desde ~USD 50/mes orientativos. https://www.irigoyendev.com/precios#care',
      },
    ],
  },
  penaflor: {
    semanticTopics: [
      'e-commerce ligero Peñaflor',
      'CTAs compra/WhatsApp',
      'Core Web Vitals móvil',
      'SEO local suroeste RM',
    ],
    faq: [
      {
        q: '¿Pueden armar una tienda online para un retail en Peñaflor?',
        a: 'Sí. Catálogo, pasarela según giro y checkout móvil. Rangos en https://www.irigoyendev.com/precios.',
      },
      {
        q: '¿Qué priorizan si el negocio atiende mucho por WhatsApp en Peñaflor?',
        a: 'Botón sticky, horarios, oferta indexable y medición de clics a WhatsApp.',
      },
      {
        q: '¿Sirve SEO local en Peñaflor?',
        a: 'Sí. Páginas de servicios + comuna, schema y velocidad ayudan frente a vecinos que buscan en Google.',
      },
    ],
  },
  'el-monte': {
    semanticTopics: [
      'SEO servicio + comuna',
      'schema negocios locales',
      'CTAs de contacto inmediato',
      'mantenimiento continuo',
    ],
    faq: [
      {
        q: '¿Cómo aparecen en búsquedas del tipo servicio + El Monte?',
        a: 'Titles honestos, NAP coherente, schema y FAQs útiles — sin keyword stuffing.',
      },
      {
        q: '¿Puedo migrar desde Wix o similar en El Monte?',
        a: 'Sí. Stack rápido, redirects necesarios y analytics desde el día uno.',
      },
      {
        q: '¿Quién es IrigoyenDev para proyectos en El Monte?',
        a: 'IrigoyenDev (Andrés Irigoyen). Email andres@irigoyendev.com, WhatsApp +45 50 24 98 55.',
      },
    ],
  },
  'isla-de-maipo': {
    semanticTopics: [
      'webs para viñas y visitas',
      'optimización de imágenes',
      'SEO valle del Maipo',
      'CTAs de reserva',
    ],
    faq: [
      {
        q: '¿Sirve una web para una viña o turismo en Isla de Maipo?',
        a: 'Sí. Visitas, horarios, mapa, CTA de reserva y performance — sin plantilla genérica de turismo.',
      },
      {
        q: '¿Optimizan galerías de fotos de viñedos?',
        a: 'Sí. Formatos modernos y tamaños correctos para no matar LCP.',
      },
      {
        q: '¿Cuánto cuesta una landing de visitas en Isla de Maipo?',
        a: 'Desde ~USD 600 orientativos. Cotización en https://www.irigoyendev.com/#contact.',
      },
    ],
  },
  'padre-hurtado': {
    semanticTopics: [
      'SEO local Padre Hurtado',
      'landings vs competencia vecina',
      'leads medibles',
      'e-commerce ligero',
    ],
    faq: [
      {
        q: '¿Atienden proyectos web en Padre Hurtado?',
        a: 'Sí. Retail y servicios con foco en SEO local y conversión móvil — remoto.',
      },
      {
        q: '¿Cómo compiten con negocios de Maipú cercanos?',
        a: 'Con claridad de oferta, cercanía, velocidad y titles locales honestos — no copiando el tono de otra comuna.',
      },
      {
        q: '¿Qué entregable inicial recomiendan en Padre Hurtado?',
        a: 'Landing/web de servicios desde ~USD 600 orientativos; tienda si ya hay catálogo listo.',
      },
    ],
  },
};

function main() {
  const raw = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  let n = 0;
  let nRegion = 0;
  let nHub = 0;

  for (const entry of raw.entries) {
    // Normalize NAP on every entry
    entry.localBusinessSchema = {
      ...entry.localBusinessSchema,
      telephone: ENTITY.telephone,
      email: ENTITY.email,
      priceRange: ENTITY.priceRange,
      name: entry.localBusinessSchema?.name || `${ENTITY.legalName} — ${entry.city}`,
    };

    if (entry.type === 'hub') {
      const pack = HUB_PACKS[entry.slug];
      if (pack) {
        entry.content = entry.content || {};
        entry.content.faq = pack.faq;
        entry.content.semanticTopics = pack.semanticTopics;
        nHub++;
      }
      continue;
    }

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
  console.log(
    `Enriched ${n} comunas + ${nRegion} regions + ${nHub} hubs + NAP normalize on all entries`
  );
}

main();
