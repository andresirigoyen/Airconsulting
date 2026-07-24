/**
 * Builds indexable lead-gen pages for Google client acquisition.
 * Body copy uses data-i18n / data-i18n-html keys from locales/*.json.
 * Run: node scripts/build-lead-pages.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildFooter, waLink, GTM_HEAD, GTM_NOSCRIPT } from './lib/page-chrome.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const WA = waLink(
  '¡Hola! Vi tu portafolio y me gustaría platicar sobre un posible proyecto.'
);

const BACK_SVG = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>`;

function chrome({ title, bodyClass = 'page-marketing', mainHtml }) {
  return `<!DOCTYPE html>
<html lang="es">
<head>
${GTM_HEAD}
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script>
      try { if (localStorage.getItem('theme') === 'dark') document.documentElement.classList.add('dark-theme'); } catch (_) {}
    </script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap">
    <title>${title}</title>
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <link rel="stylesheet" href="/css/style.css">
</head>
<body class="${bodyClass}">
${GTM_NOSCRIPT}
    <a class="skip-link" href="#main-content" data-i18n="a11y.skip">Saltar al contenido</a>
    <header class="site-header">
    <nav class="navbar" id="navbar" aria-label="Navegación principal">
        <div class="container navbar-inner">
            <a href="/" class="logo" data-i18n-aria="a11y.home" aria-label="IrigoyenDev — Inicio"><span class="logo__name">Irigoyen</span><span class="logo__accent">Dev</span><span class="logo__dot" aria-hidden="true">.</span></a>
            <div class="nav-links" id="nav-links">
                <a href="/servicios" data-i18n="nav.services">Servicios</a>
                <a href="/#projects" data-i18n="nav.projects">Resultados</a>
                <a href="/precios" data-i18n="nav.pricing">Precios</a>
                <a href="/#contact" class="nav-cta" data-i18n="nav.contact">Cotizar</a>
            </div>
            <div class="nav-actions">
                <button id="theme-toggle" class="theme-toggle" type="button" data-i18n-aria="a11y.theme" aria-label="Cambiar tema">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                </button>
                <div class="lang-selector-container">
                    <button id="lang-menu-btn" class="lang-btn" type="button" data-i18n-aria="a11y.lang" aria-label="Seleccionar idioma" aria-haspopup="listbox" aria-expanded="false" aria-controls="lang-dropdown">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="2" y1="12" x2="22" y2="12"></line>
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                        </svg>
                    </button>
                    <div id="lang-dropdown" class="lang-dropdown" role="listbox" aria-label="Idiomas">
                        <label class="lang-option"><span class="lang-name">English</span><input type="radio" name="lang" value="en" class="lang-radio"><div class="toggle-switch"></div></label>
                        <label class="lang-option"><span class="lang-name">Español</span><input type="radio" name="lang" value="es" class="lang-radio"><div class="toggle-switch"></div></label>
                        <label class="lang-option"><span class="lang-name">Deutsch</span><input type="radio" name="lang" value="de" class="lang-radio"><div class="toggle-switch"></div></label>
                        <label class="lang-option"><span class="lang-name">Dansk</span><input type="radio" name="lang" value="da" class="lang-radio"><div class="toggle-switch"></div></label>
                        <label class="lang-option"><span class="lang-name">Norsk</span><input type="radio" name="lang" value="no" class="lang-radio"><div class="toggle-switch"></div></label>
                        <label class="lang-option"><span class="lang-name">Svenska</span><input type="radio" name="lang" value="sv" class="lang-radio"><div class="toggle-switch"></div></label>
                        <label class="lang-option"><span class="lang-name">Italiano</span><input type="radio" name="lang" value="it" class="lang-radio"><div class="toggle-switch"></div></label>
                        <label class="lang-option"><span class="lang-name">Français</span><input type="radio" name="lang" value="fr" class="lang-radio"><div class="toggle-switch"></div></label>
                        <label class="lang-option"><span class="lang-name">Português</span><input type="radio" name="lang" value="pt" class="lang-radio"><div class="toggle-switch"></div></label>
                    </div>
                </div>
                <button id="menu-toggle" class="menu-toggle" type="button" data-i18n-aria="a11y.menu" aria-label="Abrir menú" aria-expanded="false" aria-controls="nav-links">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                </button>
            </div>
        </div>
    </nav>
    </header>

${mainHtml}

${buildFooter({
  areas: 'Dinamarca · Chile · España · Remoto',
  marketLinks: [
    { href: '/chile', label: 'Chile' },
    { href: '/es', label: 'España' },
    { href: '/da', label: 'Danmark' },
  ],
})}

    <script src="https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.29/bundled/lenis.min.js" crossorigin="anonymous"></script>
    <script src="/js/script.js"></script>
    <a href="${WA}" target="_blank" rel="noopener noreferrer" class="whatsapp-widget" data-i18n-aria="a11y.whatsapp" aria-label="Chatear por WhatsApp">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
    </a>
</body>
</html>
`;
}

const pages = {
  'servicios.html': {
    title: 'Desarrollo web a medida, tiendas online y landings | IrigoyenDev',
    main: `
    <header class="project-header container fade-in">
        <a href="/" class="back-link">
            ${BACK_SVG}
            <span data-i18n="mkt.backHome">Volver al inicio</span>
        </a>
        <p class="project-eyebrow" data-i18n="svc.eyebrow">Servicios · IrigoyenDev</p>
        <h1 data-i18n="svc.h1">Desarrollo web a medida: tiendas online, landings y plataformas</h1>
        <p class="project-lead" data-i18n="svc.lead">Desarrollo de tiendas online, landing page de conversión, plataforma inmobiliaria digital y SEO técnico para e-commerce. Chile, España, Dinamarca y remoto.</p>
        <div class="project-header__actions">
            <a href="/#contact" class="btn-cta-primary" data-i18n="svc.ctaPlan">Pedir plan de proyecto →</a>
            <a href="${WA}" class="project-cta-inline" target="_blank" rel="noopener noreferrer" data-i18n="mkt.ctaWhatsApp">WhatsApp directo →</a>
        </div>
    </header>
    <main id="main-content" class="container">
        <section class="project-section fade-in">
            <div class="section-header">
                <h2 data-i18n="svc.sectionTitle">Qué podemos construir para tu negocio</h2>
                <p class="section-subtitle" data-i18n="svc.sectionSub">Desarrollo, SEO, GEO y marketing — orientados a ventas, leads y operación.</p>
            </div>
            <div class="service-grid">
                <article class="service-card">
                    <h3><a href="/crear-tienda-online" data-i18n="svc.shopTitle">Crear tienda online / e-commerce</a></h3>
                    <p data-i18n="svc.shopDesc">Catálogo, checkout, pagos, panel admin y base SEO para vender online con claridad y velocidad.</p>
                    <a href="/crear-tienda-online" class="project-link"><span data-i18n="mkt.seeService">Ver servicio</span></a>
                </article>
                <article class="service-card">
                    <h3><a href="/landing-pages" data-i18n="svc.landingTitle">Landing pages de conversión</a></h3>
                    <p data-i18n="svc.landingDesc">Páginas enfocadas en una oferta, con mensaje claro, prueba social y llamadas a la acción que generan leads.</p>
                    <a href="/landing-pages" class="project-link"><span data-i18n="mkt.seeService">Ver servicio</span></a>
                </article>
                <article class="service-card">
                    <h3 data-i18n="svc.platformTitle">Plataformas de negocio y admin</h3>
                    <p data-i18n="svc.platformDesc">Sistemas a medida: catálogos B2B, paneles, CMS, captación de leads y automatización operativa.</p>
                    <a href="/projects/dragonmart" class="project-link"><span data-i18n="svc.platformCta">Ver caso Dragonmart</span></a>
                </article>
                <article class="service-card" id="seo-basico">
                    <h3 data-i18n="svc.seoTitle">SEO básico</h3>
                    <p data-i18n="svc.seoDesc">Títulos, meta descriptions, sitemap, robots, velocidad, canonicals y estructura on-page para indexar limpio desde el lanzamiento.</p>
                    <a href="/?service=seo#contact" class="project-link"><span data-i18n="svc.seoCta">Cotizar SEO básico</span></a>
                </article>
                <article class="service-card" id="seo-geo">
                    <h3 data-i18n="svc.geoTitle">SEO &amp; GEO avanzado</h3>
                    <p data-i18n="svc.geoDesc">Estructura de datos Schema, llms.txt y optimización semántica avanzada para que ChatGPT, Perplexity y Gemini recomienden y enlacen a tu marca.</p>
                    <a href="/?service=geo#contact" class="project-link"><span data-i18n="svc.geoCta">Cotizar SEO &amp; GEO</span></a>
                </article>
                <article class="service-card" id="marketing">
                    <h3 data-i18n="svc.mktTitle">Campañas de marketing digital</h3>
                    <p data-i18n="svc.mktDesc">Google Ads, Meta Ads, píxeles/tracking y landings alineadas para captar leads y ventas con presupuesto controlado.</p>
                    <a href="/?service=marketing#contact" class="project-link"><span data-i18n="svc.mktCta">Cotizar campañas</span></a>
                </article>
                <article class="service-card">
                    <h3 data-i18n="svc.careCardTitle">Planes Care (suscripción mensual)</h3>
                    <p data-i18n="svc.careCardDesc">Mantenimiento continuo tras el lanzamiento: seguridad, backups, updates y soporte. Escala a Care + Growth si quieres SEO o ads mes a mes.</p>
                    <a href="#care" class="project-link"><span data-i18n="svc.careCardCta">Activar mantenimiento</span></a>
                </article>
            </div>
        </section>
        <section class="project-section fade-in" id="care">
            <div class="section-header">
                <h2 data-i18n="svc.careSectionTitle">Planes de suscripción Care</h2>
                <p class="section-subtitle" data-i18n="svc.careSectionSub">Proyecto = construir. Care = mantener y crecer sin rehacer el producto cada trimestre.</p>
            </div>
            <div class="service-grid">
                <article class="service-card">
                    <h3 data-i18n="svc.careTitle">Plan Care</h3>
                    <p class="price-range" data-i18n="mkt.priceCare">desde ~USD 200 – 350 / mes</p>
                    <p data-i18n="svc.careDesc">Mantenimiento webmaster para que tu web no se quede atrás. Mínimo 3 meses.</p>
                    <ul class="project-results-list">
                        <li data-i18n="svc.careLi1">Actualizaciones, seguridad y backups</li>
                        <li data-i18n="svc.careLi2">Monitoreo de uptime y revisión de errores</li>
                        <li data-i18n="svc.careLi3">Cambios de contenido y mejoras menores</li>
                        <li data-i18n="svc.careLi4">Soporte prioritario por WhatsApp/email</li>
                        <li data-i18n="svc.careLi5">Informe breve de estado mensual</li>
                    </ul>
                    <a href="/?service=care#contact" class="project-link"><span data-i18n="svc.careCta">Activar Plan Care</span></a>
                </article>
                <article class="service-card" id="care-growth">
                    <h3 data-i18n="svc.careGrowthTitle">Plan Care + Growth</h3>
                    <p class="price-range" data-i18n="mkt.priceCareGrowth">desde ~USD 450 – 800 / mes</p>
                    <p data-i18n="svc.careGrowthDesc">Todo Care, más crecimiento continuo con SEO/GEO o campañas. Ideal después de lanzar.</p>
                    <ul class="project-results-list">
                        <li data-i18n="svc.careGrowthLi1">Todo lo incluido en Plan Care</li>
                        <li data-i18n="svc.careGrowthLi2">SEO/GEO continuo o gestión de ads (elige el foco)</li>
                        <li data-i18n="svc.careGrowthLi3">Iteración de landings, tracking y medición</li>
                        <li data-i18n="svc.careGrowthLi4">Prioridad en mejoras que impactan leads/ventas</li>
                    </ul>
                    <a href="/?service=care-growth#contact" class="project-link"><span data-i18n="svc.careGrowthCta">Activar Care + Growth</span></a>
                </article>
            </div>
        </section>
        <section class="project-section fade-in">
            <div class="content-block">
                <h2 data-i18n="svc.seoDetailTitle">SEO básico — qué incluye</h2>
                <ul class="project-results-list">
                    <li data-i18n="svc.seoLi1">Auditoría rápida de indexación y errores técnicos</li>
                    <li data-i18n="svc.seoLi2">Title, description, headings y enlaces internos</li>
                    <li data-i18n="svc.seoLi3">Sitemap.xml, robots.txt y canonicals</li>
                    <li data-i18n="svc.seoLi4">Mejoras de velocidad móvil y Core Web Vitals básicas</li>
                    <li data-i18n="svc.seoLi5">Search Console: verificación y envío de sitemap</li>
                </ul>
                <h2 data-i18n="svc.geoDetailTitle">SEO &amp; GEO avanzado — qué incluye</h2>
                <ul class="project-results-list">
                    <li data-i18n="svc.geoLi1">Datos estructurados (Organization, Service, FAQ, Product/LocalBusiness según el caso)</li>
                    <li data-i18n="svc.geoLi2">Arquitectura de contenidos y entidades de marca</li>
                    <li data-i18n="svc.geoLi3">llms.txt / ai.txt y señales para citas en IA</li>
                    <li data-i18n="svc.geoLi4">Páginas de intención comercial (servicios, precios, geo)</li>
                    <li data-i18n="svc.geoLi5">Medición de rankings, impresiones y oportunidades</li>
                </ul>
                <h2 data-i18n="svc.mktDetailTitle">Campañas de marketing — qué incluye</h2>
                <ul class="project-results-list">
                    <li data-i18n="svc.mktLi1">Setup de Google Ads y/o Meta Ads con estructura clara</li>
                    <li data-i18n="svc.mktLi2">Tracking de conversiones (formularios, WhatsApp, compras)</li>
                    <li data-i18n="svc.mktLi3">Landings alineadas al anuncio para mejorar CPL/ROAS</li>
                    <li data-i18n="svc.mktLi4">Iteración semanal de creatividades, keywords y audiencias</li>
                </ul>
                <h2 data-i18n="svc.wmDetailTitle">Cómo encaja Care con un proyecto</h2>
                <ul class="project-results-list">
                    <li data-i18n="svc.wmLi1">Primero construimos (landing, tienda o plataforma) como proyecto puntual</li>
                    <li data-i18n="svc.wmLi2">Al lanzar, puedes activar Care para no perder velocidad ni seguridad</li>
                    <li data-i18n="svc.wmLi3">Si quieres tráfico y leads mes a mes, Care + Growth suma SEO o ads</li>
                    <li data-i18n="svc.wmLi4">Sin sorpresas: alcance mensual claro y mínimo de 3 meses</li>
                </ul>
            </div>
        </section>
        <section class="project-section fade-in">
            <div class="content-block">
                <h2 data-i18n="svc.proofTitle">Prueba con proyectos reales</h2>
                <ul class="project-results-list">
                    <li><a href="/projects/thebeebaby">TheBeeBaby</a> <span data-i18n="svc.proof1">— marketplace e-commerce</span></li>
                    <li><a href="/projects/calafate">Calafate Propiedades</a> <span data-i18n="svc.proof2">— plataforma inmobiliaria</span></li>
                    <li><a href="/projects/dragonmart">Dragonmart</a> <span data-i18n="svc.proof3">— web corporativa de conversión</span></li>
                    <li><a href="/projects/retorica">Retórica</a> <span data-i18n="svc.proof4">— negocio local + SEO</span></li>
                </ul>
                <p data-i18n-html="svc.proofCtaHtml">¿Quieres un alcance y presupuesto claros? Revisa <a href="/precios">rangos de inversión</a> o escribe en el <a href="/#contact">formulario de contacto</a>.</p>
            </div>
        </section>
    </main>`,
  },
  'crear-tienda-online.html': {
    title: 'Crear tienda online Chile | Shopify, WooCommerce y a medida | IrigoyenDev',
    main: `
    <header class="project-header container fade-in">
        <a href="/servicios" class="back-link">
            ${BACK_SVG}
            <span data-i18n="mkt.backServices">Volver a servicios</span>
        </a>
        <nav class="geo-breadcrumb" aria-label="Breadcrumb">
          <ol>
            <li><a href="/" data-i18n="footer.linkHome">Inicio</a></li>
            <li><a href="/servicios" data-i18n="nav.services">Servicios</a></li>
            <li aria-current="page" data-i18n="svc.shopTitle">Crear tienda online / e-commerce</li>
          </ol>
        </nav>
        <p class="project-eyebrow" data-i18n="shop.eyebrow">E-commerce · Servicio</p>
        <h1 data-i18n="shop.h1">Crear tienda online Chile que venda</h1>
        <p class="project-lead" data-i18n="shop.lead">E-commerce para pymes Chile y desarrollo de tienda online en Santiago: a medida, Shopify o WooCommerce — catálogo, checkout, panel admin y SEO.</p>
        <div class="project-header__actions">
            <a href="/#contact" class="btn-cta-primary" data-i18n="shop.cta">Cotizar tu tienda online →</a>
            <a href="/projects/thebeebaby" class="project-cta-inline" data-i18n="shop.caseCta">Ver caso TheBeeBaby →</a>
        </div>
    </header>
    <main id="main-content" class="container">
        <section class="project-section fade-in">
            <div class="content-block">
                <h2 data-i18n="shop.includesTitle">Qué incluye un proyecto de tienda online</h2>
                <ul class="project-results-list">
                    <li data-i18n="shop.li1">Arquitectura de catálogo, filtros y fichas de producto</li>
                    <li data-i18n="shop.li2">Flujos de compra, pagos y confirmación</li>
                    <li data-i18n="shop.li3">Panel admin para inventario, pedidos o leads</li>
                    <li data-i18n="shop.li4">Rendimiento móvil, SEO on-page y datos estructurados</li>
                    <li data-i18n="shop.li5">Despliegue en producción y handoff documentado</li>
                </ul>
                <h2 data-i18n="shop.idealTitle">Ideal si buscas</h2>
                <p data-i18n="shop.idealDesc">Crear tienda online desde cero, migrar de Instagram/WhatsApp a un canal propio, o digitalizar un catálogo B2B. Trabajamos con clientes en Chile, España, Dinamarca y de forma remota.</p>
                <h2 data-i18n="shop.casesTitle">Casos relacionados</h2>
                <ul class="project-results-list">
                    <li><a href="/projects/thebeebaby">TheBeeBaby</a> <span data-i18n="shop.case1">— marketplace con catálogo geo y pagos</span></li>
                    <li><a href="/projects/floreria">Florería El Nuevo Pensamiento</a> <span data-i18n="shop.case2">— catálogo local + WhatsApp</span></li>
                    <li><a href="/projects/dragonmart">Dragonmart</a> <span data-i18n="shop.case3">— sourcing corporativo B2B</span></li>
                </ul>
                <p data-i18n-html="shop.footerHtml"><a href="/precios">Ver rangos de inversión</a> · <a href="/landing-pages">También hacemos landing pages</a></p>
            </div>
        </section>
    </main>`,
  },
  'landing-pages.html': {
    title: 'Landing Page de Conversión Chile | Diseño que Vende — IrigoyenDev',
    main: `
    <header class="project-header container fade-in">
        <a href="/servicios" class="back-link">
            ${BACK_SVG}
            <span data-i18n="mkt.backServices">Volver a servicios</span>
        </a>
        <nav class="geo-breadcrumb" aria-label="Breadcrumb">
          <ol>
            <li><a href="/" data-i18n="footer.linkHome">Inicio</a></li>
            <li><a href="/servicios" data-i18n="nav.services">Servicios</a></li>
            <li aria-current="page" data-i18n="svc.landingTitle">Landing pages de conversión</li>
          </ol>
        </nav>
        <p class="project-eyebrow" data-i18n="landing.eyebrow">Landings · Servicio</p>
        <h1 data-i18n="landing.h1">Landing page de conversión en Chile</h1>
        <p class="project-lead money-copy" data-i18n="landing.lead">Diseño de landing page Chile para campañas publicitarias: una oferta, un mensaje, un CTA. Landings que convierten leads o ventas — desde ~USD 600.</p>
        <div class="project-header__actions">
            <a href="/#contact" class="btn-cta-primary" data-i18n="landing.cta">Pedir propuesta de landing →</a>
            <a href="/projects/retorica" class="project-cta-inline" data-i18n="landing.caseCta">Ver caso Retórica →</a>
        </div>
    </header>
    <main id="main-content" class="container">
        <section class="project-section fade-in">
            <div class="content-block">
                <h2 data-i18n="landing.whyTitle">Qué hace que una landing page convierta</h2>
                <ul class="project-results-list">
                    <li data-i18n="landing.li1">Propuesta de valor visible en el primer viewport</li>
                    <li data-i18n="landing.li2">Prueba social, beneficios y objeciones resueltas</li>
                    <li data-i18n="landing.li3">CTA a WhatsApp, formulario o agenda</li>
                    <li data-i18n="landing.li4">SEO on-page, velocidad móvil y tracking listo</li>
                </ul>
                <h2 data-i18n="landing.casesTitle">Casos relacionados</h2>
                <ul class="project-results-list">
                    <li><a href="/projects/retorica">Retórica</a> <span data-i18n="landing.case1">— marca + captación de leads</span></li>
                    <li><a href="/projects/floreria">Florería El Nuevo Pensamiento</a> <span data-i18n="landing.case2">— conversión local por WhatsApp</span></li>
                    <li><a href="/projects/familiainternacional">Familia Internacional</a> <span data-i18n="landing.case3">— autoridad + contacto</span></li>
                </ul>
                <p data-i18n-html="landing.footerHtml">¿Necesitas también tienda o plataforma? Mira <a href="/crear-tienda-online">crear tienda online</a> o todos los <a href="/servicios">servicios</a>.</p>
            </div>
        </section>
    </main>`,
  },
  'precios.html': {
    title: 'Cuánto cuesta una tienda online | Precios desarrollo web Chile | IrigoyenDev',
    main: `
    <header class="project-header container fade-in">
        <a href="/servicios" class="back-link">
            ${BACK_SVG}
            <span data-i18n="mkt.backServices">Volver a servicios</span>
        </a>
        <nav class="geo-breadcrumb" aria-label="Breadcrumb">
          <ol>
            <li><a href="/" data-i18n="footer.linkHome">Inicio</a></li>
            <li><a href="/servicios" data-i18n="nav.services">Servicios</a></li>
            <li aria-current="page" data-i18n="nav.pricing">Precios</li>
          </ol>
        </nav>
        <p class="project-eyebrow" data-i18n="price.eyebrow">Inversión · Transparencia</p>
        <h1 data-i18n="price.h1">Cuánto cuesta una tienda online y el desarrollo web en Chile</h1>
        <p class="project-lead" data-i18n="price.lead">Tarifas de desarrollo web y presupuesto e-commerce con rangos claros. Precio de desarrollo web en Chile como referencia antes de cotizar.</p>
        <div class="project-header__actions">
            <a href="/#contact" class="btn-cta-primary" data-i18n="price.cta">Solicitar cotización personalizada →</a>
        </div>
    </header>
    <main id="main-content" class="container">
        <section class="project-section fade-in">
            <div class="service-grid">
                <article class="service-card">
                    <h3 data-i18n="price.landingTitle">Landing page</h3>
                    <p class="price-range" data-i18n="mkt.priceFrom600">desde ~USD 600</p>
                    <p data-i18n="price.landingDesc">Página de conversión con mensaje claro, CTA y base SEO. Ideal para campañas, lanzamientos y negocios locales.</p>
                </article>
                <article class="service-card">
                    <h3 data-i18n="price.seoTitle">SEO básico</h3>
                    <p class="price-range" data-i18n="mkt.priceFrom199">desde ~USD 199</p>
                    <p data-i18n="price.seoDesc">Títulos, meta, sitemap, velocidad, canonicals y estructura on-page para indexar limpio desde el día uno.</p>
                </article>
                <article class="service-card">
                    <h3 data-i18n="price.geoTitle">SEO &amp; GEO avanzado</h3>
                    <p class="price-range" data-i18n="mkt.priceFrom499">desde ~USD 499</p>
                    <p data-i18n="price.geoDesc">Schema, entidades, llms.txt, contenido citables y optimización para Google y motores generativos.</p>
                </article>
                <article class="service-card">
                    <h3 data-i18n="price.productTitle">Producto comercial</h3>
                    <p class="price-range" data-i18n="mkt.priceProduct">desde ~USD 1.304</p>
                    <p data-i18n="price.productDesc">Tienda online, plataforma con admin, o web corporativa con flujos de leads y contenido estructurado.</p>
                </article>
                <article class="service-card">
                    <h3 data-i18n="price.platformTitle">Plataforma a medida</h3>
                    <p class="price-range" data-i18n="mkt.pricePlatform">más de USD 10.000</p>
                    <p data-i18n="price.platformDesc">Marketplaces, sistemas multi-rol, integraciones complejas y operación continua.</p>
                </article>
            </div>
            <div class="section-header" style="margin-top: var(--spacing-xl);">
                <h2 data-i18n="price.careSectionTitle">Suscripción mensual — planes Care</h2>
                <p class="section-subtitle" data-i18n="price.careSectionSub">Después del lanzamiento: mantenimiento (y opcionalmente crecimiento) con precio claro mes a mes. Mínimo 3 meses.</p>
            </div>
            <div class="service-grid">
                <article class="service-card" id="care">
                    <h3 data-i18n="price.careTitle">Plan Care</h3>
                    <p class="price-range" data-i18n="mkt.priceCare">desde ~USD 200 – 350 / mes</p>
                    <p data-i18n="price.careDesc">Webmaster &amp; mantenimiento: updates, seguridad, backups, cambios de contenido, monitoreo y soporte.</p>
                    <a href="/?service=care#contact" class="project-link"><span data-i18n="price.careCta">Activar mantenimiento</span></a>
                </article>
                <article class="service-card" id="care-growth">
                    <h3 data-i18n="price.careGrowthTitle">Plan Care + Growth</h3>
                    <p class="price-range" data-i18n="mkt.priceCareGrowth">desde ~USD 450 – 800 / mes</p>
                    <p data-i18n="price.careGrowthDesc">Todo Care + SEO/GEO continuo o gestión de campañas (Ads). Para seguir captando clientes después de lanzar.</p>
                    <a href="/?service=care-growth#contact" class="project-link"><span data-i18n="price.careGrowthCta">Activar Care + Growth</span></a>
                </article>
            </div>
            <div class="content-block" style="margin-top: var(--spacing-xl);">
                <h2 data-i18n="price.factorsTitle">Qué influye en el precio</h2>
                <ul class="project-results-list">
                    <li data-i18n="price.factor1">Número de pantallas, roles e integraciones (pagos, email, CRM)</li>
                    <li data-i18n="price.factor2">Diseño desde cero vs. sistema existente</li>
                    <li data-i18n="price.factor3">SEO, i18n, paneles admin y migración de datos</li>
                    <li data-i18n="price.factor4">Plazo y nivel de soporte post-lanzamiento (Care / Care + Growth)</li>
                </ul>
                <p data-i18n-html="price.footerHtml">Respuesta típica en 48 horas con plan, plazos y estimación. <a href="/faq">Más respuestas en el FAQ</a> · <a href="/servicios#care">Detalle de planes Care</a>.</p>
            </div>
        </section>
    </main>`,
  },
  'faq.html': {
    title: 'FAQ — Desarrollo web | IrigoyenDev',
    main: `
    <header class="project-header container fade-in">
        <a href="/" class="back-link">
            ${BACK_SVG}
            <span data-i18n="mkt.backHome">Volver al inicio</span>
        </a>
        <p class="project-eyebrow" data-i18n="faqPage.eyebrow">Preguntas frecuentes</p>
        <h1 data-i18n="faqPage.h1">FAQ: contratar desarrollo full stack con IrigoyenDev</h1>
        <p class="project-lead" data-i18n="faqPage.lead">Respuestas directas sobre plazos, precios, stack y cómo trabajamos juntos.</p>
    </header>
    <main id="main-content" class="container">
        <section class="project-section fade-in">
            <div class="faq-list">
                <details class="faq-item" open>
                    <summary data-i18n="faqPage.q1">¿Qué servicios ofrece IrigoyenDev?</summary>
                    <p data-i18n-html="faqPage.a1Html">Desarrollo full stack: tiendas online, landings, plataformas con admin, SEO/GEO, marketing digital y <a href="/servicios#care">planes Care</a> de mantenimiento mensual.</p>
                </details>
                <details class="faq-item">
                    <summary data-i18n="faqPage.q2">¿Cuánto cuesta una web o tienda online?</summary>
                    <p class="money-copy" data-i18n-html="faqPage.a2Html">Rangos orientativos: landings desde ~USD 600, SEO desde ~USD 199, productos comerciales ~desde ~USD 1.304 y plataformas a medida desde ~USD 10.000. Detalle en <a href="/precios">precios</a>.</p>
                </details>
                <details class="faq-item">
                    <summary data-i18n="faqPage.q3">¿Ofrecen suscripción o mantenimiento mensual?</summary>
                    <p class="money-copy" data-i18n-html="faqPage.a3Html">Sí. <strong>Plan Care</strong> (webmaster/mantenimiento) desde ~USD 200–350/mes y <strong>Care + Growth</strong> (Care + SEO o ads) desde ~USD 450–800/mes, con mínimo 3 meses. Ideal después de lanzar. Ver <a href="/precios#care">precios Care</a>.</p>
                </details>
                <details class="faq-item">
                    <summary data-i18n="faqPage.q4">¿Trabajan con clientes en Chile, España o Dinamarca?</summary>
                    <p data-i18n="faqPage.a4">Sí. Atendemos clientes en Dinamarca (WhatsApp +45), Chile, España y proyectos remotos internacionales. La comunicación puede ser en español o inglés.</p>
                </details>
                <details class="faq-item">
                    <summary data-i18n="faqPage.q5">¿En cuánto tiempo entregan?</summary>
                    <p data-i18n="faqPage.a5">Depende del alcance. Una landing acotada puede salir en pocas semanas; un e-commerce o plataforma con admin suele requerir un plan por fases. Tras el contacto inicial recibes plazos estimados en ~48 horas.</p>
                </details>
                <details class="faq-item">
                    <summary data-i18n="faqPage.q6">¿Qué tecnologías usan?</summary>
                    <p data-i18n="faqPage.a6">Stack moderno según el caso: Next.js, Astro, HTML/CSS/JS de alto rendimiento, bases de datos, auth, cloud (Vercel, AWS, Azure) y buenas prácticas de SEO/GEO.</p>
                </details>
                <details class="faq-item">
                    <summary data-i18n="faqPage.q7">¿Cómo empezamos?</summary>
                    <p data-i18n-html="faqPage.a7Html">Usa el <a href="/#contact">formulario de contacto</a> o escribe por WhatsApp. Cuéntanos el objetivo de negocio, plazo y presupuesto aproximado.</p>
                </details>
            </div>
            <p style="margin-top: var(--spacing-xl);"><a href="/servicios" data-i18n="faqPage.more">Ver todos los servicios →</a></p>
        </section>
    </main>`,
  },
};

for (const [file, conf] of Object.entries(pages)) {
  const html = chrome({ title: conf.title, mainHtml: conf.main });
  fs.writeFileSync(path.join(root, file), html);
  console.log('Wrote', file);
}
