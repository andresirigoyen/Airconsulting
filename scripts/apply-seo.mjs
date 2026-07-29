/**
 * Applies production SEO + GEO head tags for www.irigoyendev.com
 * Run: node scripts/apply-seo.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chileMultiregionAreaServed } from './lib/chile-geo.mjs';
import { GTM_HEAD, GTM_NOSCRIPT, stripGtm } from './lib/page-chrome.mjs';
import { ENTITY } from './lib/entity-nap.mjs';
import {
  ORG_ID,
  BUSINESS_ID,
  PERSON_ID,
  WEBSITE_ID,
  organizationLd,
  serviceOfferCatalogLd,
  speakableWebPageLd,
  openingHoursSpec,
} from './lib/schema-geo.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const SITE = 'https://www.irigoyendev.com';
const OG_DEFAULT = `${SITE}/images/og-image.png`;

const pages = [
  {
    file: 'index.html',
    path: '/',
    title: 'Desarrollador web Chile | Tiendas desde USD 1.304 — IrigoyenDev',
    description:
      'Desarrollador web freelance en Chile: tiendas online desde USD 1.304, landings desde USD 600 y plataformas full stack. Santiago, regiones y remoto — IrigoyenDev.',
    ogTitle: 'Desarrollador web Chile | Tiendas y landings — IrigoyenDev',
    ogDescription:
      'E-commerce, landings y plataformas para empresas en Chile. Precios claros, plazos definidos y SEO local incluido.',
    ogImage: OG_DEFAULT,
    ogType: 'website',
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    jsonLd: [
      organizationLd(),
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        name: 'IrigoyenDev - Estudio de Producto Digital',
        url: `${SITE}/`,
        description:
          'Portfolio y servicios de Andrés Irigoyen — desarrollador full stack freelance para e-commerce, landings y plataformas.',
        inLanguage: ['es-CL', 'en'],
        publisher: { '@id': ORG_ID },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Person',
        '@id': PERSON_ID,
        name: 'Andrés Irigoyen',
        alternateName: ['IrigoyenDev', 'andresirigoyen'],
        url: `${SITE}/`,
        image: OG_DEFAULT,
        jobTitle: 'Full-Stack Developer',
        description:
          'Desarrollador full stack freelance especializado en e-commerce, paneles admin y landing pages de conversión.',
        knowsAbout: [
          'Desarrollo full stack',
          'E-commerce',
          'Landing pages',
          'Plataformas de negocio',
          'Marketplaces',
          'SEO',
          'GEO',
        ],
        sameAs: [...ENTITY.sameAs],
        worksFor: { '@id': ORG_ID },
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'sales',
          telephone: ENTITY.telephone,
          url: `${SITE}/#contact`,
          availableLanguage: ['Spanish', 'English', 'Danish'],
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': ['ProfessionalService', 'LocalBusiness'],
        '@id': BUSINESS_ID,
        name: ENTITY.legalName,
        alternateName: ENTITY.alternateName,
        url: `${SITE}/`,
        image: OG_DEFAULT,
        logo: `${SITE}/favicon.svg`,
        description:
          'Desarrollo web full stack para Chile: e-commerce, landings y plataformas. Base en Santiago con atención remota a regiones.',
        telephone: ENTITY.telephone,
        email: ENTITY.email,
        priceRange: ENTITY.priceRange,
        founder: { '@id': PERSON_ID },
        parentOrganization: { '@id': ORG_ID },
        openingHoursSpecification: openingHoursSpec(),
        areaServed: [
          { '@type': 'Country', name: 'Chile' },
          ...chileMultiregionAreaServed(),
        ],
        sameAs: [...ENTITY.sameAs],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        '@id': `${SITE}/#service`,
        name: 'IrigoyenDev — Desarrollo de Productos Digitales',
        serviceType: 'Desarrollo de Productos Digitales',
        url: `${SITE}/`,
        image: OG_DEFAULT,
        description:
          'Desarrollo web full stack freelance: tiendas online, landing pages y plataformas de negocio con SEO y GEO integrados.',
        provider: { '@id': ORG_ID },
        parentOrganization: { '@id': ORG_ID },
        telephone: ENTITY.telephone,
        areaServed: chileMultiregionAreaServed(),
        priceRange: ENTITY.priceRange,
        hasOfferCatalog: serviceOfferCatalogLd(),
      },
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        '@id': `${SITE}/#projects`,
        name: 'Casos de estudio IrigoyenDev',
        itemListElement: [
          { '@type': 'ListItem', position: 1, url: `${SITE}/projects/ava7`, name: 'AVA7 Propiedades' },
          { '@type': 'ListItem', position: 2, url: `${SITE}/projects/thebeebaby`, name: 'TheBeeBaby' },
          { '@type': 'ListItem', position: 3, url: `${SITE}/projects/dahuss`, name: 'Dahuss Homes' },
          { '@type': 'ListItem', position: 4, url: `${SITE}/projects/calafate`, name: 'Calafate Propiedades' },
          { '@type': 'ListItem', position: 5, url: `${SITE}/projects/dragonmart`, name: 'Dragonmart' },
          { '@type': 'ListItem', position: 6, url: `${SITE}/projects/rluabogados`, name: 'RLU Abogados' },
          { '@type': 'ListItem', position: 7, url: `${SITE}/projects/familiainternacional`, name: 'Familia Internacional' },
          { '@type': 'ListItem', position: 8, url: `${SITE}/projects/radiochicureo`, name: 'Radio Chicureo' },
          { '@type': 'ListItem', position: 9, url: `${SITE}/projects/retorica`, name: 'Retórica Company' },
          { '@type': 'ListItem', position: 10, url: `${SITE}/projects/floreria`, name: 'Florería El Nuevo Pensamiento' },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        '@id': `${SITE}/#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: '¿Cuánto cuesta desarrollar una página web en Chile?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: `En IrigoyenDev, una landing page profesional optimizada para SEO y GEO cuesta desde USD ${ENTITY.indicativePricing.landingFromUsd}. Una tienda online completa con pasarela de pagos chilena desde USD ${ENTITY.indicativePricing.productFromUsd}. Los precios son transparentes y no hay costos ocultos.`,
            },
          },
          {
            '@type': 'Question',
            name: '¿Qué es el GEO y por qué mi empresa chilena lo necesita?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'GEO (Generative Engine Optimization) es la optimización para que la inteligencia artificial (ChatGPT, Gemini, Perplexity) recomiende tu empresa. Si no estás optimizado para GEO, la IA no te encontrará cuando un cliente pregunte por la mejor agencia de desarrollo web en Santiago.',
            },
          },
          {
            '@type': 'Question',
            name: '¿Cuánto tiempo tardan en entregar un proyecto web?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Una landing page optimizada se entrega en 7-10 días hábiles. Un e-commerce completo con catálogo, pasarela de pagos y SEO integrado toma entre 3 y 4 semanas. Trabajamos con metodología ágil, con avances cada 48-72 horas.',
            },
          },
          {
            '@type': 'Question',
            name: '¿Ofrecen mantenimiento y soporte después de la entrega?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Sí. Todos los proyectos incluyen 30 días de soporte post-lanzamiento. Además, el Plan Care de mantenimiento mensual (desde ~USD ${ENTITY.indicativePricing.careFromUsd}) incluye seguridad, backups, monitoreo y ajustes de SEO/GEO continuos.`,
            },
          },
          {
            '@type': 'Question',
            name: '¿Trabajan con empresas fuera de Santiago?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Sí. Cubiertos Santiago y las 52 comunas de la RM, más Valparaíso, Concepción, Antofagasta, Temuco y el resto de Chile de forma remota.',
            },
          },
          {
            '@type': 'Question',
            name: '¿Qué tecnologías utilizan para desarrollar?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Usamos tecnologías modernas y escalables: React, Next.js, Astro, Tailwind CSS, y plataformas como Shopify o WooCommerce según el caso. Webs mobile-first, Core Web Vitals optimizados y datos estructurados para SEO y GEO.',
            },
          },
        ],
      },
      speakableWebPageLd({
        name: 'IrigoyenDev - Estudio de Producto Digital',
        url: `${SITE}/`,
        description:
          'Desarrollo web full stack, SEO y GEO para empresas en Chile.',
      }),
    ],
  },
  {
    file: '404.html',
    path: '/404',
    title: '404 Not Found | IrigoyenDev',
    description: 'Page not found.',
    descriptionAttr: ' data-i18n-content="page404.metaDesc"',
    ogTitle: 'IrigoyenDev | Full-Stack Developer',
    ogDescription: 'Explore high-performance technical solutions and case studies by IrigoyenDev.',
    ogImage: OG_DEFAULT,
    ogType: 'website',
    robots: 'noindex, follow',
    jsonLd: null,
  },
  {
    file: 'pages/cotizacion.html',
    path: '/pages/cotizacion',
    title: 'Cotización — documento privado | IrigoyenDev',
    description: 'Documento de cotización privado.',
    ogTitle: 'Cotización privada | IrigoyenDev',
    ogDescription: 'Documento de cotización privado.',
    ogImage: OG_DEFAULT,
    ogType: 'website',
    robots: 'noindex, nofollow',
    jsonLd: null,
    skipFullSeo: true,
  },
  leadPage({
    file: 'servicios.html',
    path: '/servicios',
    title: 'Desarrollo web Chile | Tiendas, landings y plataformas — IrigoyenDev',
    description:
      'Servicios en Chile: tiendas online desde USD 1.304, landings desde USD 600, plataformas a medida y SEO técnico. Santiago, regiones y remoto.',
    ogTitle: 'Servicios desarrollo web Chile | IrigoyenDev',
    ogDescription:
      'Tiendas, landings y plataformas con precios claros. Cotiza tu plan de proyecto en Chile.',
    serviceName: 'Desarrollo web a medida y servicios digitales',
    faq: [
      {
        q: '¿Cuánto cuesta desarrollar una página web en Chile?',
        a: `Landing desde USD ${ENTITY.indicativePricing.landingFromUsd}; e-commerce desde USD ${ENTITY.indicativePricing.productFromUsd}. Precios transparentes en /precios.`,
      },
      {
        q: '¿Qué es el GEO y por qué lo necesito?',
        a: 'GEO optimiza tu marca para que ChatGPT, Gemini y Perplexity te citen. Detalle en /servicios/geo-optimizacion-ia.',
      },
      {
        q: '¿Incluyen SEO técnico en los proyectos?',
        a: 'Sí: titles, meta, sitemap, robots, canonicals, Schema y base GEO desde el lanzamiento.',
      },
      {
        q: '¿Ofrecen mantenimiento mensual?',
        a: `Plan Care desde ~USD ${ENTITY.indicativePricing.careFromUsd}/mes y Care + Growth con SEO/ads continuo.`,
      },
    ],
  }),
  leadPage({
    file: 'servicios/geo-optimizacion-ia.html',
    path: '/servicios/geo-optimizacion-ia',
    title: 'GEO: Optimización para Inteligencia Artificial | IrigoyenDev',
    description:
      'GEO (Generative Engine Optimization) para que ChatGPT, Gemini y Perplexity recomienden tu marca. Schema avanzado, contenido citable y llms.txt — desde USD 199.',
    ogTitle: 'GEO: Optimización para IA | IrigoyenDev',
    ogDescription:
      'Optimización para motores generativos: Schema Speakable/FAQ, contenido citable y presencia multi-canal. Desde USD 199.',
    serviceName: 'GEO — Optimización para Inteligencia Artificial',
    faq: [
      {
        q: '¿GEO reemplaza al SEO?',
        a: 'No. GEO complementa el SEO técnico con Schema, fragmentos citables y señales para modelos generativos.',
      },
      {
        q: '¿Cuánto cuesta el servicio GEO?',
        a: `Entrada desde USD ${ENTITY.indicativePricing.seoFromUsd}; paquetes avanzados desde ~USD 499 según alcance.`,
      },
      {
        q: '¿Cuánto tarda en notarse?',
        a: 'Implementación técnica en días; citación en IA suele madurar en semanas según competencia.',
      },
      {
        q: '¿Sirve fuera de Santiago?',
        a: 'Sí. GEO local y nacional para Chile (Santiago, regiones y comunas) con páginas de intención y LocalBusiness.',
      },
    ],
  }),
  {
    file: 'casos-de-exito.html',
    path: '/casos-de-exito',
    title: 'Casos de éxito Chile | +30% ventas y SEO local — IrigoyenDev',
    description:
      'Casos reales en Chile y LatAm: TheBeeBaby (+30% ventas), Dragonmart (B2B) y Florería Valparaíso (SEO local). Métricas, stack y resultados medibles.',
    ogTitle: 'Casos de éxito Chile | IrigoyenDev',
    ogDescription:
      'Resultados reales de e-commerce, B2B y SEO local. Mira cómo subimos ventas y leads con desarrollo web + GEO.',
    ogImage: OG_DEFAULT,
    ogType: 'website',
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    jsonLd: [
      organizationLd(),
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: 'Casos de éxito', item: `${SITE}/casos-de-exito` },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        '@id': `${SITE}/casos-de-exito#page`,
        name: 'Casos de éxito IrigoyenDev',
        url: `${SITE}/casos-de-exito`,
        about: { '@id': ORG_ID },
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, url: `${SITE}/projects/thebeebaby`, name: 'TheBeeBaby' },
            { '@type': 'ListItem', position: 2, url: `${SITE}/projects/dragonmart`, name: 'Dragonmart' },
            { '@type': 'ListItem', position: 3, url: `${SITE}/projects/floreria`, name: 'Florería El Nuevo Pensamiento' },
          ],
        },
      },
      speakableWebPageLd({
        name: 'Casos de éxito IrigoyenDev',
        url: `${SITE}/casos-de-exito`,
        description: 'Resultados reales de proyectos web con métricas y testimonios.',
      }),
      {
        '@context': 'https://schema.org',
        '@type': 'Review',
        '@id': `${SITE}/casos-de-exito#review-thebeebaby`,
        itemReviewed: { '@id': ORG_ID },
        reviewBody:
          'Andrés armó el e-commerce rapidísimo y el nuevo checkout fluye espectacular. En el primer mes las ventas subieron un 30%.',
        author: { '@type': 'Person', name: 'María López' },
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Review',
        '@id': `${SITE}/casos-de-exito#review-dragonmart`,
        itemReviewed: { '@id': ORG_ID },
        reviewBody:
          'Necesitábamos digitalizar todo el flujo con Asia y automatizar cotizaciones. El sistema nos ahorra horas de trabajo manual todos los días.',
        author: { '@type': 'Person', name: 'Carlos Ramírez' },
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Review',
        '@id': `${SITE}/casos-de-exito#review-floreria`,
        itemReviewed: { '@id': ORG_ID },
        reviewBody:
          'Nos entregó la tienda lista para vender. Se preocupó de que la web volara en velocidad y apareciéramos rápido en Google.',
        author: { '@type': 'Person', name: 'Elena Martínez' },
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      },
    ],
  },
  leadPage({
    file: 'crear-tienda-online.html',
    path: '/crear-tienda-online',
    title: 'Crear tienda online Chile | Shopify, WooCommerce y a medida | IrigoyenDev',
    description:
      'Crear tienda online Chile: e-commerce para pymes, desarrollo tienda online Santiago, Shopify o WooCommerce, y tienda online que venda con checkout y SEO.',
    ogTitle: 'Crear tienda online Chile que venda | IrigoyenDev',
    ogDescription:
      'E-commerce para pymes en Chile: catálogo, pagos, panel admin y SEO. Cotiza tu tienda online.',
    serviceName: 'Crear tienda online / e-commerce Chile',
  }),
  leadPage({
    file: 'landing-pages.html',
    path: '/landing-pages',
    title: 'Landing Page de Conversión Chile | Diseño que Vende — IrigoyenDev',
    description:
      'Landing page de conversión Chile: diseño que vende para Ads y Meta, con metodología, casos reales, FAQ y CTA medible. Desde ~USD 600 — IrigoyenDev.',
    ogTitle: 'Landing Page de Conversión Chile | Diseño que Vende — IrigoyenDev',
    ogDescription:
      'Metodología, casos y FAQ de landing pages que convierten. Tracking listo para campañas. Desde ~USD 600.',
    serviceName: 'Landing page de conversión',
    faq: [
      {
        q: '¿Cuánto cuesta una landing page de conversión en Chile?',
        a: 'Desde ~USD 600 para una página enfocada en un CTA. Variantes A/B, i18n o CRM se cotizan según alcance.',
      },
      {
        q: '¿Landing page o sitio web completo?',
        a: 'Si el objetivo es una campaña u oferta concreta, landing. Si necesitas catálogo, blog y múltiples servicios, un sitio o tienda. Se pueden combinar.',
      },
      {
        q: '¿Incluyen SEO y velocidad?',
        a: 'Sí: títulos, meta description, canonical, estructura semántica, imágenes optimizadas y Core Web Vitals.',
      },
      {
        q: '¿Puedo usarla con Google Ads y Meta Ads?',
        a: 'Sí. URL limpia, eventos de conversión y mensaje alineado al anuncio, lista para medir con pixel o Google Ads.',
      },
      {
        q: '¿Cuánto tarda?',
        a: 'Una landing enfocada suele salir en días cuando el mensaje y los activos (logo, fotos, oferta) están claros.',
      },
    ],
  }),
  leadPage({
    file: 'precios.html',
    path: '/precios',
    title: 'Precios web Chile | Landings USD 600 · Tienda USD 1.304 — IrigoyenDev',
    description:
      'Cuánto cuesta una web o tienda online en Chile: landings desde USD 600, e-commerce desde USD 1.304, SEO desde USD 199. Rangos claros, sin sorpresas.',
    ogTitle: 'Precios desarrollo web Chile | IrigoyenDev',
    ogDescription:
      'Landings desde USD 600, tiendas desde USD 1.304. Cotiza tu proyecto con rangos transparentes en USD.',
    serviceName: 'Precios desarrollo web y e-commerce',
  }),
  {
    file: 'faq.html',
    path: '/faq',
    title: 'FAQ — Desarrollador full stack freelance | IrigoyenDev',
    description:
      'Preguntas frecuentes sobre precios, plazos, stack y cómo contratar a IrigoyenDev para e-commerce, landings o plataformas.',
    ogTitle: 'FAQ IrigoyenDev — contratar desarrollador full stack',
    ogDescription:
      'Respuestas sobre precios, plazos, cobertura geográfica y cómo empezar tu proyecto web.',
    ogImage: OG_DEFAULT,
    ogType: 'website',
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: 'FAQ', item: `${SITE}/faq` },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        '@id': `${SITE}/faq#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: '¿Qué servicios ofrece IrigoyenDev?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Desarrollo full stack freelance: tiendas online / e-commerce, landing pages de conversión, plataformas de negocio con panel admin, y SEO técnico con despliegue en producción.',
            },
          },
          {
            '@type': 'Question',
            name: '¿Cuánto cuesta una web o tienda online?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Rangos orientativos: landings desde ~USD 600, SEO desde ~USD 199, productos comerciales ~desde ~USD 1.304 y plataformas a medida desde ~USD 10.000. Detalle en https://www.irigoyendev.com/precios',
            },
          },
          {
            '@type': 'Question',
            name: '¿Trabajas con clientes en todo Chile?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Sí. Mercado primario Chile (Santiago, regiones y remoto). Comunicación en español o inglés; WhatsApp +45 para coordinación.',
            },
          },
          {
            '@type': 'Question',
            name: '¿En cuánto tiempo entregas?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Depende del alcance. Una landing puede salir en pocas semanas; e-commerce o plataformas se planifican por fases. Tras el contacto inicial recibes plazos estimados en ~48 horas.',
            },
          },
          {
            '@type': 'Question',
            name: '¿Cómo empiezo?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Usa el formulario en https://www.irigoyendev.com/#contact o WhatsApp https://wa.me/+4550249855 contando objetivo, plazo y presupuesto aproximado.',
            },
          },
        ],
      },
    ],
  },
  project({
    slug: 'thebeebaby',
    title: 'Proyecto tienda online TheBeeBaby | Caso e-commerce IrigoyenDev',
    description:
      'Caso TheBeeBaby: marketplace e-commerce con catálogo geolocalizado, pagos seguros y panel admin — proyecto tienda online entregado por IrigoyenDev.',
    ogTitle: 'TheBeeBaby — Proyecto tienda online | IrigoyenDev',
    ogDescription:
      'Marketplace e-commerce full stack: catálogo geo, proveedores y pagos seguros.',
    ogImage: `${SITE}/images/Thebeebaby/thebeebabyheroe.png`,
  }),
  project({
    slug: 'dahuss',
    title: 'Dahuss Homes — Plataforma inmobiliaria digital | Caso IrigoyenDev',
    description:
      'Caso Dahuss Homes: plataforma inmobiliaria digital con catálogo premium, captación de leads y panel admin — desarrollo web inmobiliario IrigoyenDev.',
    ogTitle: 'Dahuss Homes — Plataforma inmobiliaria digital | IrigoyenDev',
    ogDescription:
      'Plataforma inmobiliaria con catálogo, leads y herramientas de administración.',
    ogImage: `${SITE}/images/Dahuss/dahussheroe.png`,
  }),
  project({
    slug: 'ava7',
    title: 'AVA7 Propiedades — web inmobiliaria Viña del Mar | Caso IrigoyenDev',
    description:
      'Caso AVA7 Propiedades: sitio inmobiliario para venta y arriendo en Viña del Mar y Concón, con buscador de propiedades y captación de leads — IrigoyenDev.',
    ogTitle: 'AVA7 Propiedades — Web inmobiliaria | IrigoyenDev',
    ogDescription:
      'Sitio inmobiliario para venta y arriendo en Viña del Mar y Concón, con buscador y captación de leads.',
    ogImage: `${SITE}/images/ava7-mockuo.png`,
  }),
  project({
    slug: 'calafate',
    title: 'Plataforma inmobiliaria Calafate Propiedades | Caso IrigoyenDev',
    description:
      'Caso Calafate Propiedades: plataforma inmobiliaria en Next.js con catálogo rápido, leads y admin — desarrollo web B2B e inmobiliario IrigoyenDev.',
    ogTitle: 'Calafate Propiedades — Plataforma inmobiliaria | IrigoyenDev',
    ogDescription:
      'Plataforma inmobiliaria completa: catálogo rápido, leads y administración.',
    ogImage: `${SITE}/images/calafate-mockup.png`,
  }),
  project({
    slug: 'dragonmart',
    title: 'Dragonmart — Desarrollo web para negocios B2B | Caso IrigoyenDev',
    description:
      'Caso Dragonmart: plataforma B2B de sourcing con catálogo y tooling para proveedores — desarrollo web para negocios corporativos IrigoyenDev.',
    ogTitle: 'Dragonmart — Sourcing corporativo | IrigoyenDev',
    ogDescription:
      'Plataforma B2B de sourcing con catálogo y tooling para proveedores.',
    ogImage: `${SITE}/images/dragonmart/desktop-mockup.png`,
  }),
  project({
    slug: 'rluabogados',
    title: 'RLU Abogados — Plataforma legal corporativa | Caso IrigoyenDev',
    description:
      'Caso RLU Abogados: sitio legal corporativo con captación de prospectos, blog jurídico y paneles admin — plataforma full stack IrigoyenDev.',
    ogTitle: 'RLU Abogados — Plataforma legal | IrigoyenDev',
    ogDescription: 'Plataforma legal corporativa full stack para Ruiz Leiva Abogados.',
    ogImage: `${SITE}/images/rluabogados-mockup.png`,
  }),
  project({
    slug: 'familiainternacional',
    title: 'Familia Internacional — Web estudio jurídico | Caso IrigoyenDev',
    description:
      'Caso Familia Internacional: web bilingüe para estudio de derecho de familia internacional en Chile — autoridad, SEO y conversión de contactos.',
    ogTitle: 'Familia Internacional — Estudio jurídico | IrigoyenDev',
    ogDescription: 'Sitio web para estudio de derecho de familia internacional.',
    ogImage: `${SITE}/images/familiainternacional-mockup.png`,
  }),
  project({
    slug: 'radiochicureo',
    title: 'Radio Chicureo — Plataforma de radio online | Caso IrigoyenDev',
    description:
      'Caso Radio Chicureo: player en vivo, CMS editorial, banners publicitarios y panel admin en la nube — plataforma de radio online IrigoyenDev.',
    ogTitle: 'Radio Chicureo — Radio online + CMS | IrigoyenDev',
    ogDescription:
      'Plataforma de radio online con contenido editable y panel seguro.',
    ogImage: `${SITE}/images/radiochicureo-mockup.png`,
  }),
  project({
    slug: 'retorica',
    title: 'Retórica Company — Web de eventos y marketing | Caso IrigoyenDev',
    description:
      'Caso Retórica Company: plataforma de eventos y marketing experiencial en Astro, con captación de leads y SEO bilingüe — IrigoyenDev.',
    ogTitle: 'Retórica — Eventos y marketing web | IrigoyenDev',
    ogDescription:
      'Sitio de marca inmersivo con contenido estructurado y captación de leads.',
    ogImage: `${SITE}/images/Retorica/Captura%20de%20pantalla%202026-05-22%20170423.png`,
  }),
  project({
    slug: 'floreria',
    title: 'Florería en Valparaíso — Caso de éxito Quinta Región | IrigoyenDev',
    description:
      'Caso Florería El Nuevo Pensamiento (Valparaíso): web comercial con SEO local, catálogo visual y conversión por WhatsApp — Quinta Región.',
    ogTitle: 'Florería El Nuevo Pensamiento — Valparaíso | IrigoyenDev',
    ogDescription:
      'Éxito comercial digital en la Quinta Región: sitio estático rápido, SEO local y embudo a WhatsApp.',
    ogImage: `${SITE}/images/Elnuevopensamiento/Captura%20de%20pantalla%202026-05-22%20171418.png`,
  }),
];

function leadPage({ file, path: pagePath, title, description, ogTitle, ogDescription, serviceName, faq }) {
  const url = `${SITE}${pagePath}`;
  /** @type {object[]} */
  const jsonLd = [
    organizationLd(),
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: 'Servicios', item: `${SITE}/servicios` },
        { '@type': 'ListItem', position: 3, name: serviceName, item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${url}#service`,
      name: serviceName,
      serviceType: serviceName,
      description,
      url,
      provider: { '@id': ORG_ID },
      areaServed: [
        { '@type': 'Country', name: 'Chile' },
        ...chileMultiregionAreaServed(),
      ],
      hasOfferCatalog: serviceOfferCatalogLd(),
    },
    speakableWebPageLd({ name: serviceName, url, description }),
  ];
  if (Array.isArray(faq) && faq.length) {
    jsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: faq.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    });
  }
  return {
    file,
    path: pagePath,
    title,
    description,
    ogTitle,
    ogDescription,
    ogImage: OG_DEFAULT,
    ogType: 'website',
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    jsonLd,
  };
}

function project({ slug, title, description, ogTitle, ogDescription, ogImage, crumbName }) {
  const url = `${SITE}/projects/${slug}`;
  const name = crumbName || ogTitle.split(' — ')[0] || title;
  return {
    file: `projects/${slug}.html`,
    path: `/projects/${slug}`,
    title,
    description,
    ogTitle,
    ogDescription,
    ogImage,
    ogType: 'article',
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: 'Proyectos', item: `${SITE}/#projects` },
          { '@type': 'ListItem', position: 3, name, item: url },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        '@id': `${url}#work`,
        name: ogTitle,
        headline: ogTitle,
        description,
        url,
        image: ogImage,
        inLanguage: 'es',
        author: {
          '@type': 'Person',
          name: 'Andrés Irigoyen',
          url: `${SITE}/`,
        },
        publisher: {
          '@type': 'Organization',
          '@id': ORG_ID,
          name: 'IrigoyenDev',
          url: `${SITE}/`,
        },
        isPartOf: { '@id': WEBSITE_ID },
      },
    ],
  };
}

function buildHead(page) {
  const canonical = `${SITE}${page.path === '/' ? '/' : page.path}`;
  const descAttr = page.descriptionAttr || '';
  const locales = [
    ['es_CL', true],
    ['en_US', false],
    ['da_DK', false],
    ['es_ES', false],
  ];

  const localeTags = locales
    .map(([loc, primary]) =>
      primary
        ? `    <meta property="og:locale" content="${loc}">`
        : `    <meta property="og:locale:alternate" content="${loc}">`
    )
    .join('\n');

  const jsonLd =
    page.jsonLd && page.jsonLd.length
      ? page.jsonLd
          .map((block) => {
            const body = JSON.stringify(block, null, 2)
              .split('\n')
              .map((l) => `    ${l}`)
              .join('\n');
            return `    <script type="application/ld+json">\n${body}\n    </script>`;
          })
          .join('\n')
      : '';

  const isHome = page.path === '/';
  const hreflangTags = isHome
    ? `\n    <link rel="alternate" hreflang="es-CL" href="${SITE}/">` +
      `\n    <link rel="alternate" hreflang="en" href="${SITE}/en">` +
      `\n    <link rel="alternate" hreflang="da" href="${SITE}/da">` +
      `\n    <link rel="alternate" hreflang="x-default" href="${SITE}/">`
    : page.path === '/precios' || page.path === '/casos-de-exito' || page.path === '/servicios' || page.path === '/faq'
      ? `\n    <link rel="alternate" hreflang="es-CL" href="${canonical}">` +
        `\n    <link rel="alternate" hreflang="x-default" href="${canonical}">`
      : '';

  const geoRegion = page.geoRegion || 'CL';
  const icbm = page.icbm || '-33.4489, -70.6693';

  return `    <title>${page.title}</title>
    <meta name="description" content="${escapeAttr(page.description)}"${descAttr}>
    <meta name="author" content="Andrés Irigoyen">
    <meta name="robots" content="${page.robots}">
    <meta name="googlebot" content="${page.robots}">
    <meta name="theme-color" content="#2563eb">
    <link rel="canonical" href="${canonical}">${hreflangTags}
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="manifest" href="/site.webmanifest">
    <link rel="alternate" type="text/plain" title="LLM content guide" href="${SITE}/llms.txt">
    <link rel="author" href="${SITE}/">
    <meta name="geo.region" content="${escapeAttr(geoRegion)}">
    <meta name="geo.placename" content="${escapeAttr(page.geoPlacename || 'Santiago, Chile')}">
    <meta name="ICBM" content="${escapeAttr(icbm)}">
    <meta name="ai-content-declaration" content="human-authored">

    <meta property="og:type" content="${page.ogType}">
    <meta property="og:site_name" content="IrigoyenDev">
${localeTags}
    <meta property="og:title" content="${escapeAttr(page.ogTitle)}">
    <meta property="og:description" content="${escapeAttr(page.ogDescription)}">
    <meta property="og:url" content="${canonical}">
    <meta property="og:image" content="${page.ogImage}">
    <meta property="og:image:secure_url" content="${page.ogImage}">
    <meta property="og:image:type" content="image/png">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="${escapeAttr(page.ogTitle)}">

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeAttr(page.ogTitle)}">
    <meta name="twitter:description" content="${escapeAttr(page.ogDescription)}">
    <meta name="twitter:image" content="${page.ogImage}">
    <meta name="twitter:image:alt" content="${escapeAttr(page.ogTitle)}">
${jsonLd ? `\n${jsonLd}\n` : ''}
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <link rel="apple-touch-icon" href="/favicon.svg">`;
}

function escapeAttr(s) {
  return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function patchFile(page) {
  const abs = path.join(root, page.file);
  if (!fs.existsSync(abs)) {
    console.warn('Skip missing', page.file);
    return;
  }
  let html = fs.readFileSync(abs, 'utf8');
  html = stripGtm(html);

  // Private quote doc: only inject robots noindex without rewriting the whole head.
  if (page.skipFullSeo) {
    if (!/name="robots"/i.test(html)) {
      html = html.replace(
        /<head>/i,
        `<head>\n  <meta name="robots" content="${page.robots}">\n  <link rel="canonical" href="${SITE}${page.path}">`
      );
      fs.writeFileSync(abs, html);
      console.log('Hardened', page.file);
    } else {
      console.log('Already has robots', page.file);
    }
    return;
  }

  // Keep theme script + charset/viewport + stylesheets; replace SEO block through icons.
  const headMatch = html.match(/<head>([\s\S]*?)<\/head>/i);
  if (!headMatch) throw new Error(`No <head> in ${page.file}`);

  let head = headMatch[1];

  // Extract preserved pieces
  const charset = head.match(/<meta charset="[^"]*">/i)?.[0] || '<meta charset="UTF-8">';
  const viewport =
    head.match(/<meta name="viewport"[^>]*>/i)?.[0] ||
    '<meta name="viewport" content="width=device-width, initial-scale=1.0">';
  const themeScript = head.match(/<script>[\s\S]*?dark-theme[\s\S]*?<\/script>/i)?.[0] || '';
  const styles = [...head.matchAll(/<link rel="stylesheet"[^>]*>/gi)].map((m) => m[0]);

  const newHead = `
${GTM_HEAD}
    ${charset}
    ${viewport}
    ${themeScript}
${buildHead(page)}
${styles.map((s) => `    ${s}`).join('\n')}
`;

  html = html.replace(headMatch[0], () => `<head>${newHead}\n</head>`);

  // Ensure GTM noscript is present right after <body>
  if (!html.includes('googletagmanager.com/ns.html')) {
    html = html.replace(/<body([^>]*)>/i, `<body$1>\n${GTM_NOSCRIPT}`);
  }
  // Visible breadcrumb nav for Google sitelinks / UX (schema alone is not enough).
  if (page.path?.startsWith('/projects/') && !/geo-breadcrumb/.test(html)) {
    const crumbName =
      (page.ogTitle || page.title || '').split(' — ')[0].split(' | ')[0].trim() || 'Proyecto';
    const crumbNav = `
        <nav class="geo-breadcrumb" aria-label="Breadcrumb">
          <ol>
            <li><a href="/" data-i18n="footer.linkHome">Inicio</a></li>
            <li><a href="/#projects" data-i18n="nav.projects">Proyectos</a></li>
            <li aria-current="page">${escapeHtml(crumbName)}</li>
          </ol>
        </nav>`;
    if (/<header class="project-header[^"]*"[^>]*>/.test(html)) {
      html = html.replace(
        /(<header class="project-header[^"]*"[^>]*>)/,
        `$1${crumbNav}`
      );
    }
  }

  if (page.path === '/landing-pages' && !/geo-breadcrumb/.test(html)) {
    const crumbNav = `
        <nav class="geo-breadcrumb" aria-label="Breadcrumb">
          <ol>
            <li><a href="/" data-i18n="footer.linkHome">Inicio</a></li>
            <li><a href="/servicios" data-i18n="nav.services">Servicios</a></li>
            <li aria-current="page" data-i18n="svc.landingTitle">Landing pages</li>
          </ol>
        </nav>`;
    html = html.replace(
      /(<header class="project-header[^"]*"[^>]*>)/,
      `$1${crumbNav}`
    );
  }

  fs.writeFileSync(abs, html);
  console.log('Updated', page.file);
}

for (const page of pages) {
  patchFile(page);
}

console.log(`Done. Canonical host: ${SITE}`);
