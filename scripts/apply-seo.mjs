/**
 * Applies production SEO + GEO head tags for www.irigoyendev.com
 * Run: node scripts/apply-seo.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chileMultiregionAreaServed } from './lib/chile-geo.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const SITE = 'https://www.irigoyendev.com';
const OG_DEFAULT = `${SITE}/images/og-image.png`;

const pages = [
  {
    file: 'index.html',
    path: '/',
    title: 'Desarrollador web freelance Chile | Full stack, tiendas y landings — IrigoyenDev',
    description:
      'Desarrollador web freelance en Chile: desarrollo web full stack, crear tienda online Chile y landings de conversión. IrigoyenDev — también España, Dinamarca y remoto.',
    ogTitle: 'Desarrollador web freelance Chile | IrigoyenDev',
    ogDescription:
      'Desarrollo web full stack: e-commerce, landings y plataformas. Crea tu tienda online en Chile o cotiza tu proyecto.',
    ogImage: OG_DEFAULT,
    ogType: 'website',
    robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${SITE}/#website`,
        name: 'IrigoyenDev',
        url: `${SITE}/`,
        description:
          'Portfolio y servicios de Andrés Irigoyen — desarrollador full stack freelance para e-commerce, landings y plataformas.',
        inLanguage: ['es', 'en'],
        publisher: { '@id': `${SITE}/#person` },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Person',
        '@id': `${SITE}/#person`,
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
        ],
        sameAs: [],
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'sales',
          telephone: '+45-5024-9855',
          url: `${SITE}/#contact`,
          availableLanguage: ['Spanish', 'English', 'Danish'],
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': ['ProfessionalService', 'LocalBusiness'],
        '@id': `${SITE}/#business`,
        name: 'IrigoyenDev',
        alternateName: 'Irigoyen Dev',
        url: `${SITE}/`,
        image: OG_DEFAULT,
        logo: `${SITE}/favicon.svg`,
        description:
          'Desarrollo web full stack: e-commerce, landings y plataformas. Atención remota para Chile, Noruega y clientes internacionales.',
        telephone: '+45-5024-9855',
        email: 'andres@irigoyendev.com',
        priceRange: '$$-$$$',
        founder: { '@id': `${SITE}/#person` },
        areaServed: [
          { '@type': 'Country', name: 'Chile' },
          { '@type': 'Country', name: 'Norway' },
          { '@type': 'Country', name: 'Denmark' },
          { '@type': 'Country', name: 'Spain' },
        ],
        sameAs: [`${SITE}/`, 'https://github.com/andresirigoyen'],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        '@id': `${SITE}/#service`,
        name: 'IrigoyenDev',
        url: `${SITE}/`,
        image: OG_DEFAULT,
        description:
          'Desarrollo web full stack freelance: tiendas online, landing pages y plataformas de negocio.',
        provider: { '@id': `${SITE}/#person` },
        parentOrganization: { '@id': `${SITE}/#business` },
        telephone: '+45-5024-9855',
        areaServed: chileMultiregionAreaServed(),
        serviceType: [
          'Desarrollo web full stack',
          'E-commerce',
          'Landing pages',
          'Plataformas de negocio',
        ],
        priceRange: '$$-$$$',
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Servicios IrigoyenDev',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Crear tienda online / e-commerce',
                url: `${SITE}/crear-tienda-online`,
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Landing pages de conversión',
                url: `${SITE}/landing-pages`,
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Desarrollo full stack a medida',
                url: `${SITE}/servicios`,
              },
            },
          ],
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        '@id': `${SITE}/#projects`,
        name: 'Casos de estudio IrigoyenDev',
        itemListElement: [
          { '@type': 'ListItem', position: 1, url: `${SITE}/projects/thebeebaby`, name: 'TheBeeBaby' },
          { '@type': 'ListItem', position: 2, url: `${SITE}/projects/dahuss`, name: 'Dahuss Homes' },
          { '@type': 'ListItem', position: 3, url: `${SITE}/projects/calafate`, name: 'Calafate Propiedades' },
          { '@type': 'ListItem', position: 4, url: `${SITE}/projects/dragonmart`, name: 'Dragonmart' },
          { '@type': 'ListItem', position: 5, url: `${SITE}/projects/rluabogados`, name: 'RLU Abogados' },
          { '@type': 'ListItem', position: 6, url: `${SITE}/projects/familiainternacional`, name: 'Familia Internacional' },
          { '@type': 'ListItem', position: 7, url: `${SITE}/projects/radiochicureo`, name: 'Radio Chicureo' },
          { '@type': 'ListItem', position: 8, url: `${SITE}/projects/retorica`, name: 'Retórica Company' },
          { '@type': 'ListItem', position: 9, url: `${SITE}/projects/floreria`, name: 'Florería El Nuevo Pensamiento' },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        '@id': `${SITE}/#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: '¿Qué servicios ofreces?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Tiendas online, landing pages de conversión, plataformas con panel admin y SEO técnico. Detalle en https://www.irigoyendev.com/servicios',
            },
          },
          {
            '@type': 'Question',
            name: '¿Cuánto cuesta un proyecto?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Landings desde ~USD 600, SEO desde ~USD 199, productos comerciales ~USD 3.000–10.000 y plataformas a medida desde ~USD 10.000. Ver https://www.irigoyendev.com/precios',
            },
          },
          {
            '@type': 'Question',
            name: '¿Trabajas con Chile, España y Dinamarca?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Sí. Atiendo clientes en Dinamarca, Chile, España y proyectos remotos, en español o inglés.',
            },
          },
          {
            '@type': 'Question',
            name: '¿Cómo empiezo?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Usa el formulario en https://www.irigoyendev.com/#contact o WhatsApp https://wa.me/+4550249855 con objetivo, plazo y presupuesto aproximado.',
            },
          },
        ],
      },
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
    title: 'Desarrollo web a medida, tiendas online y landings | IrigoyenDev',
    description:
      'Servicios: desarrollo de tiendas online, landing page de conversión, plataforma inmobiliaria digital, desarrollo web a medida y SEO técnico para e-commerce. Chile y remoto.',
    ogTitle: 'Servicios de desarrollo web a medida | IrigoyenDev',
    ogDescription:
      'Tiendas online, landings de conversión, plataformas y SEO técnico. Cotiza tu plan de proyecto.',
    serviceName: 'Desarrollo web a medida y servicios digitales',
  }),
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
    title: 'Cuánto cuesta una tienda online | Precios desarrollo web Chile | IrigoyenDev',
    description:
      'Cuánto cuesta una tienda online, precio desarrollo web Chile, presupuesto web e-commerce y tarifas de desarrollador web freelance. Rangos claros en USD.',
    ogTitle: 'Precios y tarifas desarrollador web freelance | IrigoyenDev',
    ogDescription:
      'Presupuesto web e-commerce y precios de desarrollo web en Chile: landings desde ~USD 600, productos comerciales USD 3.000–10.000.',
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
              text: 'Rangos orientativos: landings desde ~USD 600, SEO desde ~USD 199, productos comerciales ~USD 3.000–10.000 y plataformas a medida desde ~USD 10.000. Detalle en https://www.irigoyendev.com/precios',
            },
          },
          {
            '@type': 'Question',
            name: '¿Trabajas con clientes en Chile, España o Dinamarca?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Sí. Atiende clientes en Dinamarca (WhatsApp +45), Chile, España y proyectos remotos. Comunicación en español o inglés.',
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
      description,
      url,
      provider: { '@id': `${SITE}/#person` },
      areaServed: chileMultiregionAreaServed(),
    },
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
          name: 'IrigoyenDev',
          url: `${SITE}/`,
        },
        isPartOf: { '@id': `${SITE}/#website` },
      },
    ],
  };
}

function buildHead(page) {
  const canonical = `${SITE}${page.path === '/' ? '/' : page.path}`;
  const descAttr = page.descriptionAttr || '';
  const locales = [
    ['es_ES', true],
    ['en_US', false],
    ['de_DE', false],
    ['da_DK', false],
    ['nb_NO', false],
    ['sv_SE', false],
    ['it_IT', false],
    ['fr_FR', false],
    ['pt_PT', false],
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

  return `    <title>${page.title}</title>
    <meta name="description" content="${escapeAttr(page.description)}"${descAttr}>
    <meta name="author" content="Andrés Irigoyen">
    <meta name="robots" content="${page.robots}">
    <meta name="googlebot" content="${page.robots}">
    <meta name="theme-color" content="#2563eb">
    <link rel="canonical" href="${canonical}">
    <link rel="manifest" href="/site.webmanifest">
    <link rel="alternate" type="text/plain" title="LLM content guide" href="${SITE}/llms.txt">
    <link rel="author" href="${SITE}/">
    <meta name="geo.region" content="EU">
    <meta name="ICBM" content="55.6761, 12.5683">
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
    ${charset}
    ${viewport}
    ${themeScript}
${buildHead(page)}
${styles.map((s) => `    ${s}`).join('\n')}
`;

  html = html.replace(headMatch[0], () => `<head>${newHead}\n</head>`);

  // Visible breadcrumb nav for Google sitelinks / UX (schema alone is not enough).
  if (page.path?.startsWith('/projects/') && !/geo-breadcrumb/.test(html)) {
    const crumbName =
      (page.ogTitle || page.title || '').split(' — ')[0].split(' | ')[0].trim() || 'Proyecto';
    const crumbNav = `
        <nav class="geo-breadcrumb" aria-label="Miga de pan">
          <ol>
            <li><a href="/">Inicio</a></li>
            <li><a href="/#projects">Proyectos</a></li>
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
        <nav class="geo-breadcrumb" aria-label="Miga de pan">
          <ol>
            <li><a href="/">Inicio</a></li>
            <li><a href="/servicios">Servicios</a></li>
            <li aria-current="page">Landing pages</li>
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
