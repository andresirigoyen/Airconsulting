/**
 * Builds indexable lead-gen pages for Google client acquisition.
 * Run: node scripts/build-lead-pages.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const WA =
  'https://wa.me/+4550249855?text=%C2%A1Hola!%20Vi%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20platicar%20sobre%20un%20posible%20proyecto.';

function chrome({ title, bodyClass = 'page-marketing', mainHtml }) {
  return `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script>
      try { if (localStorage.getItem('theme') === 'dark') document.documentElement.classList.add('dark-theme'); } catch (_) {}
    </script>
    <title>${title}</title>
    <link rel="stylesheet" href="/css/style.css">
</head>
<body class="${bodyClass}">
    <nav class="navbar" id="navbar">
        <div class="container navbar-inner">
            <a href="/" class="logo" aria-label="IrigoyenDev — Home"><span class="logo__name">Irigoyen</span><span class="logo__accent">Dev</span><span class="logo__dot" aria-hidden="true">.</span></a>
            <div class="nav-links" id="nav-links">
                <a href="/servicios" data-i18n="nav.services">Servicios</a>
                <a href="/#projects" data-i18n="nav.projects">Projects</a>
                <a href="/precios" data-i18n="nav.pricing">Precios</a>
                <a href="/#contact" class="nav-cta" data-i18n="nav.contact">Cotizar</a>
            </div>
            <div class="nav-actions">
                <button id="theme-toggle" class="theme-toggle" aria-label="Toggle Dark Mode">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                </button>
                <div class="lang-selector-container">
                    <button id="lang-menu-btn" class="lang-btn" aria-label="Select Language">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="2" y1="12" x2="22" y2="12"></line>
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                        </svg>
                    </button>
                    <div id="lang-dropdown" class="lang-dropdown">
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
                <button id="menu-toggle" class="menu-toggle" type="button" aria-label="Toggle Mobile Menu" aria-expanded="false" aria-controls="nav-links">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                </button>
            </div>
        </div>
    </nav>

${mainHtml}

    <footer class="footer">
        <div class="container footer-seo">
            <p data-i18n="footer">&copy; 2026 IrigoyenDev. All rights reserved.</p>
            <nav class="footer-links" aria-label="Enlaces SEO">
                <a href="/servicios">Servicios</a>
                <a href="/crear-tienda-online">Tienda online</a>
                <a href="/landing-pages">Landing pages</a>
                <a href="/precios">Precios</a>
                <a href="/faq">FAQ</a>
                <a href="/#contact">Contacto</a>
            </nav>
            <p class="footer-geo">Disponible para clientes en Dinamarca, Chile, España y remoto · WhatsApp <a href="${WA}">+45 50 24 98 55</a></p>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.29/bundled/lenis.min.js" crossorigin="anonymous"></script>
    <script src="/js/script.js"></script>
    <a href="${WA}" target="_blank" rel="noopener noreferrer" class="whatsapp-widget" aria-label="Chat on WhatsApp">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
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
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            <span>Volver al inicio</span>
        </a>
        <p class="project-eyebrow">Servicios · IrigoyenDev</p>
        <h1>Desarrollo web a medida: tiendas online, landings y plataformas</h1>
        <p class="project-lead">Desarrollo de tiendas online, landing page de conversión, plataforma inmobiliaria digital y SEO técnico para e-commerce. Clientes en Chile, España, Dinamarca y remoto.</p>
        <div class="project-header__actions">
            <a href="/#contact" class="btn-cta-primary">Pedir plan de proyecto →</a>
            <a href="${WA}" class="project-cta-inline" target="_blank" rel="noopener noreferrer">WhatsApp directo →</a>
        </div>
    </header>
    <main class="container">
        <section class="project-section fade-in">
            <div class="section-header">
                <h2>Qué puedo construir para tu negocio</h2>
                <p class="section-subtitle">Servicios orientados a ventas, leads y operación — no solo “una web bonita”.</p>
            </div>
            <div class="service-grid">
                <article class="service-card">
                    <h3><a href="/crear-tienda-online">Desarrollo de tiendas online</a></h3>
                    <p>Crear tienda online Chile: catálogo, checkout, pagos, panel admin y SEO técnico para e-commerce que venda.</p>
                    <a href="/crear-tienda-online" class="project-link"><span>Ver servicio</span></a>
                </article>
                <article class="service-card">
                    <h3><a href="/landing-pages">Landing page de conversión</a></h3>
                    <p>Diseño de landing page Chile para campañas publicitarias: oferta clara, prueba social y CTA que genera leads.</p>
                    <a href="/landing-pages" class="project-link"><span>Ver servicio</span></a>
                </article>
                <article class="service-card">
                    <h3>Plataforma inmobiliaria digital</h3>
                    <p>Desarrollo web a medida para inmobiliarias: catálogo, leads y admin. Ver <a href="/projects/calafate">Calafate Propiedades</a>.</p>
                    <a href="/projects/calafate" class="project-link"><span>Ver caso Calafate</span></a>
                </article>
                <article class="service-card">
                    <h3>SEO técnico para e-commerce</h3>
                    <p>Canonicals, schema, rendimiento, sitemap y publicación para que Google indexe tu tienda y landings.</p>
                    <a href="/faq" class="project-link"><span>Preguntas frecuentes</span></a>
                </article>
            </div>
        </section>
        <section class="project-section fade-in">
            <div class="content-block">
                <h2>Prueba con proyectos reales</h2>
                <ul class="project-results-list">
                    <li><a href="/projects/thebeebaby">TheBeeBaby</a> — caso de éxito e-commerce / proyecto tienda online</li>
                    <li><a href="/projects/calafate">Calafate Propiedades</a> — plataforma inmobiliaria digital</li>
                    <li><a href="/projects/dragonmart">Dragonmart</a> — desarrollo web para negocios B2B</li>
                    <li><a href="/projects/retorica">Retórica</a> — web corporativa de conversión</li>
                </ul>
                <p>¿Quieres un alcance y presupuesto claros? Revisa <a href="/precios">rangos de inversión</a> o escribe en el <a href="/#contact">formulario de contacto</a>.</p>
            </div>
        </section>
    </main>`,
  },
  'crear-tienda-online.html': {
    title: 'Crear tienda online Chile | Shopify, WooCommerce y a medida | IrigoyenDev',
    main: `
    <header class="project-header container fade-in">
        <a href="/servicios" class="back-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            <span>Volver a servicios</span>
        </a>
        <p class="project-eyebrow">E-commerce · Servicio</p>
        <h1>Crear tienda online Chile que venda</h1>
        <p class="project-lead">E-commerce para pymes Chile y desarrollo de tienda online en Santiago: a medida, Shopify o WooCommerce — catálogo, checkout, panel admin y SEO para que tu tienda online venda de verdad.</p>
        <div class="project-header__actions">
            <a href="/#contact" class="btn-cta-primary">Cotizar mi tienda online →</a>
            <a href="/projects/thebeebaby" class="project-cta-inline">Ver caso TheBeeBaby →</a>
        </div>
    </header>
    <main class="container">
        <section class="project-section fade-in">
            <div class="content-block">
                <h2>Qué incluye un proyecto de tienda online</h2>
                <ul class="project-results-list">
                    <li>Arquitectura de catálogo, filtros y fichas de producto</li>
                    <li>Flujos de compra, pagos y confirmación</li>
                    <li>Panel admin para inventario, pedidos o leads</li>
                    <li>Rendimiento móvil, SEO on-page y datos estructurados</li>
                    <li>Despliegue en producción y handoff documentado</li>
                </ul>
                <h2>Ideal si buscas</h2>
                <p>Crear tienda online Chile desde cero, migrar de Instagram/WhatsApp a un canal propio, o digitalizar un catálogo B2B. Trabajo tienda online Shopify Chile, WooCommerce o desarrollo a medida en Santiago y remoto.</p>
                <h2>Shopify, WooCommerce o a medida</h2>
                <ul class="project-results-list">
                    <li><strong>Tienda online Shopify Chile</strong> — ideal para lanzar rápido con ecosistema de apps</li>
                    <li><strong>Tienda online WooCommerce</strong> — control total sobre WordPress y plugins</li>
                    <li><strong>E-commerce a medida</strong> — cuando necesitas flujos, roles o B2B que no caben en plantilla</li>
                </ul>
                <h2>Casos relacionados</h2>
                <ul class="project-results-list">
                    <li><a href="/projects/thebeebaby">TheBeeBaby</a> — marketplace con catálogo geo y pagos</li>
                    <li><a href="/projects/floreria">Florería El Nuevo Pensamiento</a> — catálogo local + WhatsApp</li>
                    <li><a href="/projects/dragonmart">Dragonmart</a> — sourcing corporativo B2B</li>
                </ul>
                <p><a href="/precios">Ver rangos de inversión</a> · <a href="/landing-pages">También hago landing pages</a></p>
            </div>
        </section>
    </main>`,
  },
  'landing-pages.html': {
    title: 'Landing page de conversión | Diseño landing page Chile | IrigoyenDev',
    main: `
    <header class="project-header container fade-in">
        <a href="/servicios" class="back-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            <span>Volver a servicios</span>
        </a>
        <p class="project-eyebrow">Landings · Servicio</p>
        <h1>Landing page de conversión en Chile</h1>
        <p class="project-lead">Diseño de landing page Chile para campañas publicitarias: una oferta, un mensaje, un CTA. Landings que convierten leads o ventas — desde ~USD 600.</p>
        <div class="project-header__actions">
            <a href="/#contact" class="btn-cta-primary">Pedir propuesta de landing →</a>
            <a href="/projects/retorica" class="project-cta-inline">Ver caso Retórica →</a>
        </div>
    </header>
    <main class="container">
        <section class="project-section fade-in">
            <div class="content-block">
                <h2>Qué hace que una landing page convierta</h2>
                <ul class="project-results-list">
                    <li>Propuesta de valor visible en el primer viewport</li>
                    <li>Prueba social, beneficios y objeciones resueltas</li>
                    <li>CTA a WhatsApp, formulario o agenda</li>
                    <li>SEO on-page, velocidad móvil y tracking listo para campañas publicitarias</li>
                </ul>
                <h2>Casos relacionados</h2>
                <ul class="project-results-list">
                    <li><a href="/projects/retorica">Retórica Company</a> — marca + captación de leads</li>
                    <li><a href="/projects/floreria">Florería</a> — conversión local por WhatsApp</li>
                    <li><a href="/projects/familiainternacional">Familia Internacional</a> — autoridad + contacto</li>
                </ul>
                <p>¿Necesitas también tienda o plataforma? Mira <a href="/crear-tienda-online">crear tienda online</a> o todos los <a href="/servicios">servicios</a>.</p>
            </div>
        </section>
    </main>`,
  },
  'precios.html': {
    title: 'Cuánto cuesta una tienda online | Precios desarrollo web Chile | IrigoyenDev',
    main: `
    <header class="project-header container fade-in">
        <a href="/servicios" class="back-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            <span>Volver a servicios</span>
        </a>
        <p class="project-eyebrow">Inversión · Transparencia</p>
        <h1>Cuánto cuesta una tienda online y el desarrollo web en Chile</h1>
        <p class="project-lead">Tarifas de desarrollador web freelance y presupuesto web e-commerce con rangos claros. Cada proyecto se cotiza según alcance; estos precios de desarrollo web Chile son tu referencia.</p>
        <div class="project-header__actions">
            <a href="/#contact" class="btn-cta-primary">Solicitar cotización personalizada →</a>
        </div>
    </header>
    <main class="container">
        <section class="project-section fade-in">
            <div class="service-grid">
                <article class="service-card">
                    <h3>Landing page</h3>
                    <p class="price-range">desde ~USD 600</p>
                    <p>Página de conversión con mensaje claro, CTA y base SEO. Ideal para campañas, lanzamientos y negocios locales.</p>
                </article>
                <article class="service-card">
                    <h3>SEO básico</h3>
                    <p class="price-range">desde ~USD 199</p>
                    <p>Títulos, meta, sitemap, velocidad, canonicals y estructura on-page para indexar limpio desde el día uno.</p>
                </article>
                <article class="service-card">
                    <h3>SEO &amp; GEO avanzado</h3>
                    <p class="price-range">desde ~USD 499</p>
                    <p>Schema, entidades, llms.txt, contenido citables y optimización para Google y motores generativos.</p>
                </article>
                <article class="service-card">
                    <h3>Producto comercial</h3>
                    <p class="price-range">USD 3.000 – 10.000</p>
                    <p>Tienda online, plataforma con admin, o web corporativa con flujos de leads y contenido estructurado.</p>
                </article>
                <article class="service-card">
                    <h3>Plataforma a medida</h3>
                    <p class="price-range">más de USD 10.000</p>
                    <p>Marketplaces, sistemas multi-rol, integraciones complejas y operación continua.</p>
                </article>
            </div>
            <div class="section-header" style="margin-top: var(--spacing-xl);">
                <h2>Suscripción mensual — planes Care</h2>
                <p class="section-subtitle">Después del lanzamiento: mantenimiento (y opcionalmente crecimiento) con precio claro mes a mes. Mínimo 3 meses.</p>
            </div>
            <div class="service-grid">
                <article class="service-card" id="care">
                    <h3>Plan Care</h3>
                    <p class="price-range">desde ~USD 200 – 350 / mes</p>
                    <p>Webmaster &amp; mantenimiento: updates, seguridad, backups, cambios de contenido, monitoreo y soporte.</p>
                    <a href="/?service=care#contact" class="project-link"><span>Activar mantenimiento</span></a>
                </article>
                <article class="service-card" id="care-growth">
                    <h3>Plan Care + Growth</h3>
                    <p class="price-range">desde ~USD 450 – 800 / mes</p>
                    <p>Todo Care + SEO/GEO continuo o gestión de campañas (Ads). Para seguir captando clientes después de lanzar.</p>
                    <a href="/?service=care-growth#contact" class="project-link"><span>Activar Care + Growth</span></a>
                </article>
            </div>
            <div class="content-block" style="margin-top: var(--spacing-xl);">
                <h2>Qué influye en el precio</h2>
                <ul class="project-results-list">
                    <li>Número de pantallas, roles e integraciones (pagos, email, CRM)</li>
                    <li>Diseño desde cero vs. sistema existente</li>
                    <li>SEO, i18n, paneles admin y migración de datos</li>
                    <li>Plazo y nivel de soporte post-lanzamiento (Care / Care + Growth)</li>
                </ul>
                <h2>¿Cuánto cuesta una tienda online?</h2>
                <p>El presupuesto web e-commerce suele situarse en el rango de <strong>producto comercial (USD 3.000–10.000)</strong> según catálogo, pagos y panel. Una landing de campaña parte desde ~USD 600. Las tarifas de desarrollador web freelance se confirman con alcance en la <a href="/#contact">cotización</a>.</p>
                <p>Respuesta típica en 48 horas con plan, plazos y estimación. <a href="/faq">Más respuestas en el FAQ</a> · <a href="/servicios#care">Detalle de planes Care</a>.</p>
            </div>
        </section>
    </main>`,
  },
  'faq.html': {
    title: 'FAQ — Desarrollo web freelance | IrigoyenDev',
    main: `
    <header class="project-header container fade-in">
        <a href="/" class="back-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            <span>Volver al inicio</span>
        </a>
        <p class="project-eyebrow">Preguntas frecuentes</p>
        <h1>FAQ: contratar un desarrollador full stack freelance</h1>
        <p class="project-lead">Respuestas directas sobre plazos, precios, stack y cómo trabajamos juntos.</p>
    </header>
    <main class="container">
        <section class="project-section fade-in">
            <div class="faq-list">
                <details class="faq-item" open>
                    <summary>¿Qué servicios ofrece IrigoyenDev?</summary>
                    <p>Desarrollo full stack: tiendas online, landings, plataformas con admin, SEO/GEO, marketing digital y <a href="/servicios#care">planes Care</a> de mantenimiento mensual.</p>
                </details>
                <details class="faq-item">
                    <summary>¿Cuánto cuesta una tienda online?</summary>
                    <p>Los rangos orientativos: landings desde ~USD 600, SEO desde ~USD 199, productos comerciales ~USD 3.000–10.000 y plataformas a medida desde ~USD 10.000. Detalle en <a href="/precios">precios</a>.</p>
                </details>
                <details class="faq-item">
                    <summary>¿Ofreces suscripción o mantenimiento mensual?</summary>
                    <p>Sí. <strong>Plan Care</strong> (webmaster/mantenimiento) desde ~USD 200–350/mes y <strong>Care + Growth</strong> (Care + SEO o ads) desde ~USD 450–800/mes, con mínimo 3 meses. Ideal después de lanzar. Ver <a href="/precios#care">precios Care</a>.</p>
                </details>
                <details class="faq-item">
                    <summary>¿Trabajas con clientes en Chile, España o Dinamarca?</summary>
                    <p>Sí. Atiendo clientes en Dinamarca (WhatsApp +45), Chile, España y proyectos remotos internacionales. La comunicación puede ser en español o inglés.</p>
                </details>
                <details class="faq-item">
                    <summary>¿En cuánto tiempo entregas?</summary>
                    <p>Depende del alcance. Una landing acotada puede salir en pocas semanas; un e-commerce o plataforma con admin suele requerir un plan por fases. Tras el contacto inicial recibes plazos estimados en ~48 horas.</p>
                </details>
                <details class="faq-item">
                    <summary>¿Qué tecnologías usas?</summary>
                    <p>Stack moderno según el caso: Next.js, Astro, HTML/CSS/JS de alto rendimiento, bases de datos, auth, cloud (Vercel, AWS, Azure) y buenas prácticas de SEO/GEO.</p>
                </details>
                <details class="faq-item">
                    <summary>¿Cómo empiezo?</summary>
                    <p>Usa el <a href="/#contact">formulario de contacto</a> o escribe por <a href="${WA}" target="_blank" rel="noopener noreferrer">WhatsApp</a>. Cuéntame el objetivo de negocio, plazo y presupuesto aproximado.</p>
                </details>
            </div>
            <p style="margin-top: var(--spacing-xl);"><a href="/servicios">Ver todos los servicios →</a></p>
        </section>
    </main>`,
  },
};

for (const [file, conf] of Object.entries(pages)) {
  const html = chrome({ title: conf.title, mainHtml: conf.main });
  fs.writeFileSync(path.join(root, file), html);
  console.log('Wrote', file);
}
