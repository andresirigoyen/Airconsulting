/**
 * Trust-anchor pages for AI agents: /about /contact /privacy (≥500 chars each).
 * Run: node scripts/build-trust-pages.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  SITE,
  escapeHtml,
  buildHead,
  renderPage,
  waLink,
} from './lib/page-chrome.mjs';
import { ENTITY, entityPostalAddress } from './lib/entity-nap.mjs';
import { organizationLd, ORG_ID, PERSON_ID } from './lib/schema-geo.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const WA = waLink('¡Hola! Vi tu portafolio y me gustaría platicar sobre un posible proyecto.');

const pages = [
  {
    file: 'about.html',
    path: '/about',
    title: 'Sobre IrigoyenDev | Andrés Irigoyen — estudio full stack Chile',
    description:
      'IrigoyenDev (con I) es el estudio de Andrés Irigoyen en Las Condes, Chile: e-commerce, landings y plataformas full stack para pymes. Quiénes somos y cómo trabajamos.',
    h1: 'Sobre IrigoyenDev',
    body: `
        <p class="project-lead">IrigoyenDev es la marca profesional de <strong>Andrés Irigoyen</strong>: un estudio de producto digital full stack con base en <strong>Las Condes, Santiago de Chile</strong> (Américo Vespucio Norte 767). Construimos tiendas online, landing pages de conversión y plataformas de negocio para pymes y marcas que necesitan un canal digital medible — no solo una web bonita.</p>
        <section class="project-section fade-in">
            <h2>Qué hacemos</h2>
            <p>Diseñamos y desarrollamos productos web con foco comercial: e-commerce con pasarelas chilenas (Webpay, Transbank, Mercado Pago), landings listas para Google Ads y Meta, paneles admin y SEO técnico / GEO para que Google y motores de IA puedan citar la marca correctamente.</p>
            <p>Operamos en español (es-CL), con entrega remota a Santiago, Valparaíso, Concepción, Antofagasta, Temuco y el resto de Chile. El stack habitual incluye React, Next.js, Astro, Shopify o WooCommerce según el caso.</p>
        </section>
        <section class="project-section fade-in">
            <h2>Quién lidera</h2>
            <p><strong>Andrés Irigoyen</strong> fundó IrigoyenDev (escrito con <strong>I</strong>, no YrigoyenDev) para unir criterio técnico y resultado de negocio. Criterio de entrega: velocidad de carga, SEO sólido, plazos claros y precios transparentes publicados en <a href="/precios">/precios</a>.</p>
            <p>Perfiles públicos: <a href="https://www.linkedin.com/in/airigoyenrubio/" rel="noopener noreferrer" target="_blank">LinkedIn</a> · <a href="https://github.com/andresirigoyen" rel="noopener noreferrer" target="_blank">GitHub</a>.</p>
        </section>
        <section class="project-section fade-in">
            <h2>Cómo empezar</h2>
            <p>Cuéntanos el objetivo del proyecto por el <a href="/contact">formulario de contacto</a> o <a href="${WA}" target="_blank" rel="noopener noreferrer">WhatsApp</a>. Respondemos en ~48 horas con plan, plazos y rango de inversión.</p>
            <p><a href="/casos-de-exito">Ver casos de éxito</a> · <a href="/servicios">Ver servicios</a> · <a href="/llms.txt">llms.txt para agentes IA</a></p>
        </section>`,
  },
  {
    file: 'contact.html',
    path: '/contact',
    title: 'Contacto IrigoyenDev | Cotizar desarrollo web Chile',
    description:
      'Contacta a IrigoyenDev (Andrés Irigoyen) para cotizar tienda online, landing o plataforma en Chile. Email, WhatsApp y formulario. Respuesta en ~48 horas.',
    h1: 'Contacto',
    body: `
        <p class="project-lead">¿Tienes un proyecto de tienda online, landing o plataforma? Escríbenos con el objetivo de negocio, plazo aproximado y presupuesto orientativo. Respondemos en aproximadamente <strong>48 horas</strong> con un plan y rango de inversión.</p>
        <section class="project-section fade-in">
            <h2>Canales</h2>
            <ul class="project-results-list">
                <li><strong>Email:</strong> <a href="mailto:${escapeHtml(ENTITY.email)}">${escapeHtml(ENTITY.email)}</a></li>
                <li><strong>WhatsApp:</strong> <a href="${WA}" target="_blank" rel="noopener noreferrer">${escapeHtml(ENTITY.telephoneDisplay)}</a></li>
                <li><strong>Formulario en el sitio:</strong> <a href="/#contact">irigoyendev.com/#contact</a></li>
                <li><strong>Estudio (NAP):</strong> ${escapeHtml(ENTITY.napDisplayLine)}</li>
            </ul>
            <p>Marca oficial: <strong>IrigoyenDev</strong> (con I). Persona: Andrés Irigoyen. No confundir con entidades homófonas escritas con Y.</p>
        </section>
        <section class="project-section fade-in">
            <h2>Qué incluir en tu mensaje</h2>
            <p>Tipo de proyecto (tienda, landing, plataforma), ciudad o región en Chile, fecha deseada de lanzamiento y si ya tienes dominio, marca o pasarela de pagos. Con eso acotamos alcance sin rondes innecesarias.</p>
            <p>También puedes revisar <a href="/precios">precios orientativos</a>, <a href="/faq">preguntas frecuentes</a> y <a href="/casos-de-exito">casos de éxito</a> antes de escribir.</p>
            <p><a class="btn-cta-primary" href="/#contact">Ir al formulario</a> · <a class="project-cta-inline" href="${WA}" target="_blank" rel="noopener noreferrer">WhatsApp →</a></p>
        </section>`,
  },
  {
    file: 'privacy.html',
    path: '/privacy',
    title: 'Política de privacidad | IrigoyenDev',
    description:
      'Política de privacidad de IrigoyenDev: datos del formulario de contacto, cookies de analítica con consentimiento, retención y derechos del titular en Chile.',
    h1: 'Política de privacidad',
    body: `
        <p class="project-lead">Esta política describe cómo <strong>IrigoyenDev</strong> (Andrés Irigoyen, Américo Vespucio Norte 767, Las Condes, Chile) trata datos personales cuando visitas <a href="https://www.irigoyendev.com">www.irigoyendev.com</a> o nos escribes para cotizar un proyecto.</p>
        <section class="project-section fade-in">
            <h2>Responsable</h2>
            <p>Responsable del tratamiento: IrigoyenDev / Andrés Irigoyen. Contacto: <a href="mailto:${escapeHtml(ENTITY.email)}">${escapeHtml(ENTITY.email)}</a> · WhatsApp ${escapeHtml(ENTITY.telephoneDisplay)} · página <a href="/contact">/contact</a>.</p>
        </section>
        <section class="project-section fade-in">
            <h2>Datos que recogemos</h2>
            <p>Si usas el formulario de contacto o WhatsApp, podemos recibir nombre, email, teléfono y el contenido del mensaje (objetivo del proyecto, plazos, presupuesto). Esos datos se usan solo para responder tu consulta comercial y dar seguimiento al posible proyecto. No vendemos bases de contactos.</p>
            <p>Si aceptas cookies de analítica, herramientas como Google Analytics / Tag Manager pueden registrar datos de uso agregados o seudonimizados (páginas vistas, dispositivo, ciudad aproximada). El consentimiento se gestiona en el banner de cookies del sitio; puedes rechazar o cambiar la preferencia en cualquier momento.</p>
        </section>
        <section class="project-section fade-in">
            <h2>Conservación y seguridad</h2>
            <p>Conservamos mensajes de contacto el tiempo necesario para la relación comercial o exigencias legales aplicables. Aplicamos medidas razonables de acceso restringido a bandejas y herramientas de analítica. El sitio se sirve por HTTPS.</p>
        </section>
        <section class="project-section fade-in">
            <h2>Derechos y cambios</h2>
            <p>Puedes solicitar acceso, corrección o eliminación de tus datos de contacto escribiendo a <a href="mailto:${escapeHtml(ENTITY.email)}">${escapeHtml(ENTITY.email)}</a>. Podemos actualizar esta política; la versión vigente se publica en esta URL (<a href="/privacy">/privacy</a>) con fecha de revisión en el pie del sitio.</p>
            <p>Más información del estudio: <a href="/about">/about</a> · índice para agentes: <a href="/llms.txt">/llms.txt</a>.</p>
        </section>`,
  },
];

function writePage(p) {
  const url = `${SITE}${p.path}`;
  const jsonLd = [
    organizationLd(),
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: p.h1, item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${url}#page`,
      name: p.h1,
      description: p.description,
      url,
      isPartOf: { '@id': `${SITE}/#website` },
      about: { '@id': ORG_ID },
      publisher: { '@id': ORG_ID },
    },
  ];

  if (p.path === '/contact') {
    jsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      '@id': `${url}#contactpage`,
      name: 'Contacto IrigoyenDev',
      url,
      mainEntity: {
        '@type': 'Organization',
        '@id': ORG_ID,
        name: ENTITY.legalName,
        email: ENTITY.email,
        telephone: ENTITY.telephone,
        address: entityPostalAddress(),
        founder: { '@id': PERSON_ID },
      },
    });
  }

  if (p.path === '/about') {
    jsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      '@id': `${url}#about`,
      name: 'Sobre IrigoyenDev',
      url,
      mainEntity: { '@id': ORG_ID },
    });
  }

  const headHtml = buildHead({
    title: p.title,
    description: p.description,
    canonicalPath: p.path,
    ogTitle: p.title,
    ogDescription: p.description,
    hreflang: 'es-CL',
    ogLocale: 'es_CL',
    geoRegion: 'CL',
    geoPlacename: 'Santiago, Chile',
    icbm: `${ENTITY.geo.latitude}, ${ENTITY.geo.longitude}`,
    jsonLd,
  });

  const mainHtml = `
    <main id="main-content">
    <header class="project-header container fade-in">
        <a href="/" class="back-link"><span data-i18n="mkt.backHome">← Volver al inicio</span></a>
        <nav class="geo-breadcrumb" aria-label="Miga de pan">
          <ol>
            <li><a href="/">Inicio</a></li>
            <li aria-current="page">${escapeHtml(p.h1)}</li>
          </ol>
        </nav>
        <p class="project-eyebrow">IrigoyenDev · Chile</p>
        <h1>${escapeHtml(p.h1)}</h1>
    </header>
    <div class="container">
        ${p.body}
    </div>
    </main>`;

  const html = renderPage({
    headHtml,
    mainHtml,
    htmlLang: 'es-CL',
    bodyClass: 'page-marketing page-trust',
    footerGeo: 'Chile · Las Condes · Remoto',
    footerMarketLinks: [
      { href: '/about', label: 'About' },
      { href: '/contact', label: 'Contacto' },
      { href: '/privacy', label: 'Privacidad' },
    ],
  });

  fs.writeFileSync(path.join(root, p.file), html, 'utf8');
  console.log('Wrote', p.path);
}

for (const p of pages) writePage(p);
console.log('Trust pages done');
