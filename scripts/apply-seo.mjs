/**
 * Applies production SEO + GEO head tags for www.irigoyendev.com
 * Run: node scripts/apply-seo.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const SITE = 'https://www.irigoyendev.com';
const OG_DEFAULT = `${SITE}/images/og-image.png`;

const pages = [
  {
    file: 'index.html',
    path: '/',
    title: 'Desarrollador Full Stack Freelance | E-commerce y Landings — IrigoyenDev',
    description:
      'Andrés Irigoyen (IrigoyenDev): desarrollador full stack freelance para crear tienda online, landing pages de conversión y plataformas de negocio. Clientes en Chile, España, Dinamarca y remoto.',
    ogTitle: 'IrigoyenDev | Desarrollador full stack para e-commerce y landings',
    ogDescription:
      'E-commerce, plataformas y landing pages diseñadas para convertir tráfico en ingresos. Pide tu plan de proyecto.',
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
        '@type': 'ProfessionalService',
        '@id': `${SITE}/#service`,
        name: 'IrigoyenDev',
        url: `${SITE}/`,
        image: OG_DEFAULT,
        description:
          'Desarrollo web full stack freelance: tiendas online, landing pages y plataformas de negocio.',
        provider: { '@id': `${SITE}/#person` },
        telephone: '+45-5024-9855',
        areaServed: [
          { '@type': 'Country', name: 'Denmark' },
          { '@type': 'Country', name: 'Chile' },
          { '@type': 'Country', name: 'Spain' },
          'Worldwide',
        ],
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
    title: 'Servicios de desarrollo web full stack freelance | IrigoyenDev',
    description:
      'Servicios de desarrollador full stack freelance: crear tienda online, landing pages de conversión y plataformas de negocio. Chile, España, Dinamarca y remoto.',
    ogTitle: 'Servicios full stack — e-commerce, landings y plataformas | IrigoyenDev',
    ogDescription:
      'E-commerce, landings y plataformas a medida para convertir visitas en clientes. Pide tu plan de proyecto.',
    serviceName: 'Servicios de desarrollo web full stack',
  }),
  leadPage({
    file: 'crear-tienda-online.html',
    path: '/crear-tienda-online',
    title: 'Crear tienda online | E-commerce freelance | IrigoyenDev',
    description:
      'Crear tienda online a medida: catálogo, checkout, panel admin y SEO. Desarrollador e-commerce freelance para Chile, España, Dinamarca y remoto.',
    ogTitle: 'Crear tienda online que venda | IrigoyenDev',
    ogDescription:
      'E-commerce y marketplaces listos para vender, con rendimiento y SEO técnico incluidos.',
    serviceName: 'Crear tienda online / e-commerce',
  }),
  leadPage({
    file: 'landing-pages.html',
    path: '/landing-pages',
    title: 'Landing pages de conversión | Desarrollador freelance | IrigoyenDev',
    description:
      'Landing pages profesionales orientadas a conversión: mensaje claro, CTA y SEO. Ideal para campañas, lanzamientos y negocios locales.',
    ogTitle: 'Landing pages de conversión | IrigoyenDev',
    ogDescription:
      'Landings rápidas y persuasivas para captar leads o ventas. Cotiza tu página.',
    serviceName: 'Landing pages de conversión',
  }),
  leadPage({
    file: 'precios.html',
    path: '/precios',
    title: 'Precios desarrollo web y e-commerce | IrigoyenDev',
    description:
      'Precios orientativos: landings desde ~USD 600, SEO desde ~USD 199, e-commerce y plataformas. Planes Care desde ~USD 200/mes.',
    ogTitle: 'Precios de desarrollo web freelance | IrigoyenDev',
    ogDescription:
      'Landings desde ~USD 600, SEO desde ~USD 199 y rangos claros para e-commerce y plataformas. Cotización en 48h.',
    serviceName: 'Desarrollo web freelance — precios',
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
    title: 'TheBeeBaby — Marketplace e-commerce | Caso IrigoyenDev',
    description:
      'Caso real: marketplace e-commerce TheBeeBaby — catálogo geo, proveedores, pagos seguros y plataforma lista para producción, desarrollada por IrigoyenDev.',
    ogTitle: 'TheBeeBaby — Marketplace familiar | IrigoyenDev',
    ogDescription:
      'Marketplace full stack que conecta familias viajeras con proveedores locales de artículos para bebés.',
    ogImage: `${SITE}/images/Thebeebaby/thebeebabyheroe.png`,
  }),
  project({
    slug: 'dahuss',
    title: 'Dahuss Homes — Plataforma inmobiliaria | Caso IrigoyenDev',
    description:
      'Caso real: plataforma inmobiliaria Dahuss Homes — catálogo, captación de leads y panel admin para listados premium en España y Latinoamérica.',
    ogTitle: 'Dahuss Homes — Plataforma inmobiliaria | IrigoyenDev',
    ogDescription:
      'Plataforma inmobiliaria con catálogo, leads y herramientas de administración.',
    ogImage: `${SITE}/images/Dahuss/dahussheroe.png`,
  }),
  project({
    slug: 'calafate',
    title: 'Calafate Propiedades — Plataforma inmobiliaria | Caso IrigoyenDev',
    description:
      'Caso real: Calafate Propiedades — catálogo inmobiliario, leads y panel admin en Next.js, desarrollado por IrigoyenDev.',
    ogTitle: 'Calafate Propiedades — Real Estate | IrigoyenDev',
    ogDescription:
      'Plataforma inmobiliaria completa: catálogo rápido, leads y administración.',
    ogImage: `${SITE}/images/calafate-mockup.png`,
  }),
  project({
    slug: 'dragonmart',
    title: 'Dragonmart — Plataforma B2B de sourcing | Caso IrigoyenDev',
    description:
      'Caso real: Dragonmart — plataforma corporativa de sourcing B2B con flujos de catálogo y herramientas para proveedores.',
    ogTitle: 'Dragonmart — Sourcing corporativo | IrigoyenDev',
    ogDescription:
      'Plataforma B2B de sourcing con catálogo y tooling para proveedores.',
    ogImage: `${SITE}/images/dragonmart/desktop-mockup.png`,
  }),
  project({
    slug: 'rluabogados',
    title: 'RLU Abogados — Plataforma legal corporativa | Caso IrigoyenDev',
    description:
      'Caso real: RLU Abogados — sitio institucional, captación de prospectos, blog jurídico y paneles admin.',
    ogTitle: 'RLU Abogados — Plataforma legal | IrigoyenDev',
    ogDescription: 'Plataforma legal corporativa full stack para Ruiz Leiva Abogados.',
    ogImage: `${SITE}/images/rluabogados-mockup.png`,
  }),
  project({
    slug: 'familiainternacional',
    title: 'Familia Internacional — Web estudio jurídico | Caso IrigoyenDev',
    description:
      'Caso real: web para estudio de derecho de familia internacional en Chile — presencia bilingüe, autoridad y conversión de contactos.',
    ogTitle: 'Familia Internacional — Estudio jurídico | IrigoyenDev',
    ogDescription: 'Sitio web para estudio de derecho de familia internacional.',
    ogImage: `${SITE}/images/familiainternacional-mockup.png`,
  }),
  project({
    slug: 'radiochicureo',
    title: 'Radio Chicureo — Plataforma de radio online | Caso IrigoyenDev',
    description:
      'Caso real: Radio Chicureo — player en vivo, CMS, banners publicitarios y panel admin en la nube.',
    ogTitle: 'Radio Chicureo — Radio online + CMS | IrigoyenDev',
    ogDescription:
      'Plataforma de radio online con contenido editable y panel seguro.',
    ogImage: `${SITE}/images/radiochicureo-mockup.png`,
  }),
  project({
    slug: 'retorica',
    title: 'Retórica Company — Web de eventos y marketing | Caso IrigoyenDev',
    description:
      'Caso real: Retórica Company — plataforma de eventos y marketing experiencial en Astro, con captación de leads y SEO bilingüe.',
    ogTitle: 'Retórica — Eventos y marketing web | IrigoyenDev',
    ogDescription:
      'Sitio de marca inmersivo con contenido estructurado y captación de leads.',
    ogImage: `${SITE}/images/Retorica/Captura%20de%20pantalla%202026-05-22%20170423.png`,
  }),
  project({
    slug: 'floreria',
    title: 'Florería El Nuevo Pensamiento — Web local SEO | Caso IrigoyenDev',
    description:
      'Caso real: web comercial para florería en Valparaíso — SEO local, catálogo visual, WhatsApp y despliegue en Vercel.',
    ogTitle: 'Florería El Nuevo Pensamiento — Web local | IrigoyenDev',
    ogDescription:
      'Sitio estático rápido con SEO local, catálogo y conversión por WhatsApp.',
    ogImage: `${SITE}/images/Elnuevopensamiento/Captura%20de%20pantalla%202026-05-22%20171418.png`,
  }),
];

function leadPage({ file, path: pagePath, title, description, ogTitle, ogDescription, serviceName }) {
  const url = `${SITE}${pagePath}`;
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
    jsonLd: [
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
        areaServed: ['Denmark', 'Chile', 'Spain', 'Worldwide'],
      },
    ],
  };
}

function project({ slug, title, description, ogTitle, ogDescription, ogImage }) {
  const url = `${SITE}/projects/${slug}`;
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
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
          { '@type': 'ListItem', position: 2, name: 'Projects', item: `${SITE}/#projects` },
          { '@type': 'ListItem', position: 3, name: ogTitle.split(' — ')[0] || title, item: url },
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
  fs.writeFileSync(abs, html);
  console.log('Updated', page.file);
}

for (const page of pages) {
  patchFile(page);
}

console.log(`Done. Canonical host: ${SITE}`);
