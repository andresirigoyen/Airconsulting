/**
 * Shared HTML chrome for generated marketing / location pages.
 * Locale / market labels come from the caller (geo-markets) — no Chile hardcoding.
 */
export const SITE = 'https://www.irigoyendev.com';
export const OG_DEFAULT = `${SITE}/images/og-image.png`;

export const WA_BASE = 'https://wa.me/+4550249855?text=';

/** Google Tag Manager container ID */
export const GTM_ID = 'GTM-KD3BBZ78';

/** Consent Mode defaults + deferred consent UI (GTM loads only after accept). */
export const GTM_HEAD = `<!-- Analytics consent (GTM loads only after accept) -->
<script>
window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{
  ad_storage:'denied',
  ad_user_data:'denied',
  ad_personalization:'denied',
  analytics_storage:'denied',
  functionality_storage:'granted',
  security_storage:'granted',
  wait_for_update:500
});
</script>
<script defer src="/js/consent-analytics.js"></script>
<!-- End Analytics consent -->`;

/** No noscript GTM — analytics require consent. */
export const GTM_NOSCRIPT = '';

/**
 * Strip any existing GTM / consent snippets so install stays idempotent.
 * @param {string} html
 */
export function stripGtm(html) {
  return html
    .replace(/<!-- Analytics consent[\s\S]*?<!-- End Analytics consent -->\s*/gi, '')
    .replace(/<!-- Google Tag Manager \(deferred:[\s\S]*?<!-- End Google Tag Manager -->\s*/gi, '')
    .replace(/<!-- Google Tag Manager -->[\s\S]*?<!-- End Google Tag Manager -->\s*/gi, '')
    .replace(
      /<script>\s*\(function\(w,d,s,l,i\)\{w\[l\]=w\[l\]\|\|\[\];w\[l\]\.push\(\{'gtm\.start':[\s\S]*?googletagmanager\.com\/gtm\.js[\s\S]*?<\/script>\s*/gi,
      ''
    )
    .replace(
      /<script>\s*window\.dataLayer[\s\S]*?loadGTM[\s\S]*?<\/script>\s*<!-- End Google Tag Manager -->\s*/gi,
      ''
    )
    .replace(
      /<!-- Google Tag Manager \(noscript\) -->[\s\S]*?<!-- End Google Tag Manager \(noscript\) -->\s*/gi,
      ''
    )
    .replace(
      /<noscript>\s*<iframe[^>]*googletagmanager\.com\/ns\.html[^>]*>\s*<\/iframe>\s*<\/noscript>\s*/gi,
      ''
    )
    .replace(/<script[^>]*src="\/js\/consent-analytics\.js"[^>]*>\s*<\/script>\s*/gi, '');
}

/**
 * Ensure exactly one GTM head + body install.
 * @param {string} html
 */
export function ensureGtm(html) {
  let out = stripGtm(html);
  if (!/<head>/i.test(out) || !/<body[^>]*>/i.test(out)) return html;
  out = out.replace(/<head>/i, `<head>\n${GTM_HEAD}`);
  out = out.replace(/<body([^>]*)>/i, `<body$1>\n${GTM_NOSCRIPT}`);
  return out;
}

/** @param {string} message */
export function waLink(message) {
  return `${WA_BASE}${encodeURIComponent(message)}`;
}

/** @param {string} s */
export function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** @param {string} s */
export function escapeAttr(s) {
  return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}

/**
 * @typedef {{ hreflang: string, href: string }} HreflangAlternate
 * @typedef {object} HeadOptions
 * @property {string} title
 * @property {string} description
 * @property {string} canonicalPath
 * @property {string} [ogTitle]
 * @property {string} [ogDescription]
 * @property {string} [ogImage]
 * @property {string} [robots]
 * @property {string} [geoRegion]
 * @property {string} [geoPlacename]
 * @property {string} [geoPosition] lat;lng for geo.position meta
 * @property {string} [icbm]
 * @property {string} [hreflang]
 * @property {string} [xDefaultPath] path for hreflang x-default (default: site root `/`)
 * @property {HreflangAlternate[]} [hreflangAlternates] full alternate cluster (locale hubs)
 * @property {string} [ogLocale]
 * @property {string} [ogLocaleAlternate]
 * @property {object[]} [jsonLd]
 * @property {string} [i18nDescKey] data-i18n-content on meta description
 * @property {boolean} [preloadFonts] inject Montserrat preload hints
 */

/** Absolute URL for a site path (leading slash optional). */
function absoluteUrl(rawPath) {
  const path = (rawPath || '/').startsWith('/') ? rawPath || '/' : `/${rawPath}`;
  return `${SITE}${path === '/' ? '/' : path}`;
}

/**
 * Build <head> SEO block. Canonical is always absolute SITE + path.
 * x-default always points at the Spanish home unless overridden via xDefaultPath.
 * @param {HeadOptions} opts
 */
export function buildHead(opts) {
  const rawPath = opts.canonicalPath || '/';
  const path = rawPath.startsWith('/') ? rawPath : `/${rawPath}`;
  const canonical = `${SITE}${path === '/' ? '/' : path}`;
  const ogTitle = opts.ogTitle || opts.title;
  const ogDescription = opts.ogDescription || opts.description;
  const ogImage = opts.ogImage || OG_DEFAULT;
  const robots =
    opts.robots ||
    'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
  const hreflang = opts.hreflang || 'es-CL';
  const xDefaultHref = absoluteUrl(opts.xDefaultPath ?? '/');
  const ogLocale = opts.ogLocale || 'es_CL';
  const ogLocaleAlt = opts.ogLocaleAlternate || 'es_ES';
  const descI18n = opts.i18nDescKey
    ? ` data-i18n-content="${escapeAttr(opts.i18nDescKey)}"`
    : '';

  /** @type {HreflangAlternate[]} */
  const alternates =
    opts.hreflangAlternates && opts.hreflangAlternates.length
      ? opts.hreflangAlternates
      : [{ hreflang, href: canonical }];

  const alternateLinks = [
    ...alternates.map(
      (a) =>
        `    <link rel="alternate" hreflang="${escapeAttr(a.hreflang)}" href="${escapeAttr(a.href)}">`
    ),
    `    <link rel="alternate" hreflang="x-default" href="${escapeAttr(xDefaultHref)}">`,
  ].join('\n');

  const fontPreload =
    opts.preloadFonts !== false
      ? `    <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap">
    <link rel="preload" href="/css/style.css" as="style">`
      : '';

  const jsonLd =
    opts.jsonLd && opts.jsonLd.length
      ? opts.jsonLd
          .map((block) => {
            const body = JSON.stringify(block, null, 2)
              .split('\n')
              .map((l) => `    ${l}`)
              .join('\n');
            return `    <script type="application/ld+json">\n${body}\n    </script>`;
          })
          .join('\n')
      : '';

  return `    ${GTM_HEAD}
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script>
      try { if (localStorage.getItem('theme') === 'dark') document.documentElement.classList.add('dark-theme'); } catch (_) {}
    </script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
${fontPreload ? `${fontPreload}\n` : ''}    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap">
    <title>${escapeHtml(opts.title)}</title>
    <meta name="description" content="${escapeAttr(opts.description)}"${descI18n}>
    <meta name="author" content="Andrés Irigoyen">
    <meta name="robots" content="${robots}">
    <meta name="googlebot" content="${robots}">
    <meta name="theme-color" content="#2563eb">
    <link rel="canonical" href="${canonical}">
${alternateLinks}
    <link rel="manifest" href="/site.webmanifest">
    <link rel="alternate" type="text/plain" title="LLM content guide" href="${SITE}/llms.txt">
    <link rel="author" href="${SITE}/">
    ${opts.geoRegion ? `<meta name="geo.region" content="${escapeAttr(opts.geoRegion)}">` : ''}
    ${opts.geoPlacename ? `<meta name="geo.placename" content="${escapeAttr(opts.geoPlacename)}">` : ''}
    ${opts.geoPosition ? `<meta name="geo.position" content="${escapeAttr(opts.geoPosition)}">` : ''}
    ${opts.icbm ? `<meta name="ICBM" content="${escapeAttr(opts.icbm)}">` : ''}
    <meta name="ai-content-declaration" content="human-authored">

    <meta property="og:type" content="website">
    <meta property="og:site_name" content="IrigoyenDev">
    <meta property="og:locale" content="${escapeAttr(ogLocale)}">
    <meta property="og:locale:alternate" content="${escapeAttr(ogLocaleAlt)}">
    <meta property="og:title" content="${escapeAttr(ogTitle)}">
    <meta property="og:description" content="${escapeAttr(ogDescription)}">
    <meta property="og:url" content="${canonical}">
    <meta property="og:image" content="${ogImage}">
    <meta property="og:image:secure_url" content="${ogImage}">
    <meta property="og:image:type" content="image/png">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="${escapeAttr(ogTitle)}">

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeAttr(ogTitle)}">
    <meta name="twitter:description" content="${escapeAttr(ogDescription)}">
    <meta name="twitter:image" content="${ogImage}">
    <meta name="twitter:image:alt" content="${escapeAttr(ogTitle)}">
${jsonLd ? `\n${jsonLd}\n` : ''}
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <link rel="apple-touch-icon" href="/favicon.svg">
    <link rel="stylesheet" href="/css/style.css">
    <link rel="stylesheet" href="/css/consent.css">`;
}

/**
 * Full brand footer (matches home / projects / 404).
 * @param {object} [opts]
 * @param {string} [opts.areas]
 * @param {{href:string,label:string}[]} [opts.marketLinks]
 * @param {string} [opts.extra]
 * @param {string} [opts.copyright]
 */
export function buildFooter({
  areas = 'Dinamarca · Chile · España · Remoto',
  marketLinks = [],
  extra = '',
  copyright = '© 2026 IrigoyenDev. All rights reserved.',
} = {}) {
  const wa = waLink(
    '¡Hola! Vi tu portafolio y me gustaría platicar sobre un posible proyecto.'
  );
  const marketItems = marketLinks
    .map(
      (l) =>
        `<li><a href="${escapeAttr(l.href)}">${escapeHtml(l.label)}</a></li>`
    )
    .join('\n                    ');

  return `<footer class="footer site-footer">
        <div class="container site-footer__grid">
            <div class="site-footer__brand">
                <a href="/" class="site-footer__logo" data-i18n-aria="a11y.home" aria-label="IrigoyenDev — Home"><span class="logo__name">Irigoyen</span><span class="logo__accent">Dev</span><span class="logo__dot" aria-hidden="true">.</span></a>
                <p class="site-footer__tagline" data-i18n="footer.tagline">Desarrollo web full stack, SEO, GEO y marketing digital para conseguir clientes online.</p>
                <p class="site-footer__areas" data-i18n="footer.areas">${escapeHtml(areas)}</p>
                <h3 class="site-footer__heading" data-i18n="footer.contactHeading">Contacto general</h3>
                <ul class="site-footer__contact">
                    <li><a href="${wa}" target="_blank" rel="noopener noreferrer">WhatsApp +45 50 24 98 55</a></li>
                    <li><a href="/#contact" data-i18n="footer.contactForm">Formulario de contacto</a></li>
                </ul>
            </div>
            <nav class="site-footer__col" aria-label="Servicios" data-i18n-aria="footer.servicesHeading">
                <h3 class="site-footer__heading" data-i18n="footer.servicesHeading">Servicios</h3>
                <ul class="site-footer__links">
                    <li><a href="/servicios" data-i18n="footer.linkServices">Todos los servicios</a></li>
                    <li><a href="/crear-tienda-online" data-i18n="footer.linkShop">Crear tienda online</a></li>
                    <li><a href="/landing-pages" data-i18n="footer.linkLandings">Landing pages</a></li>
                    <li><a href="/servicios#seo-basico" data-i18n="footer.linkSeo">SEO básico</a></li>
                    <li><a href="/servicios/geo-optimizacion-ia" data-i18n="footer.linkGeo">SEO &amp; GEO avanzado</a></li>
                    <li><a href="/servicios#marketing" data-i18n="footer.linkMkt">Marketing digital</a></li>
                    <li><a href="/servicios#care" data-i18n="footer.linkWm">Planes Care / mantenimiento</a></li>
                    <li><a href="/precios" data-i18n="footer.linkPricing">Precios</a></li>
                </ul>
            </nav>
            <nav class="site-footer__col" aria-label="Sitio" data-i18n-aria="footer.siteHeading">
                <h3 class="site-footer__heading" data-i18n="footer.siteHeading">Sitio</h3>
                <ul class="site-footer__links">
                    <li><a href="/" data-i18n="footer.linkHome">Inicio</a></li>
                    <li><a href="/casos-de-exito" data-i18n="footer.linkProjects">Proyectos</a></li>
                    <li><a href="/#testimonials" data-i18n="footer.linkReviews">Reseñas</a></li>
                    <li><a href="/faq" data-i18n="footer.linkFaq">FAQ</a></li>
                    <li><a href="/blog">Blog</a></li>
                    <li><a href="/#contact" data-i18n="footer.linkContact">Contacto</a></li>
                    ${marketItems}
                    <li><a href="#" data-consent-open data-i18n="consent.settings">Cookies</a></li>
                    <li><a href="/llms.txt">llms.txt</a></li>
                    <li><a href="/sitemap.xml">Sitemap</a></li>
                </ul>
            </nav>
        </div>
        ${extra}
        <div class="container site-footer__bottom">
            <p data-i18n="footer">${escapeHtml(copyright)}</p>
        </div>
    </footer>`;
}

/**
 * @param {object} opts
 * @param {string} opts.headHtml
 * @param {string} [opts.bodyClass]
 * @param {string} opts.mainHtml
 * @param {string} [opts.footerExtra]
 * @param {string} [opts.htmlLang]
 * @param {string} [opts.i18nTitleKey] data-i18n-title on <html>
 * @param {string} [opts.dataGeoSeo] e.g. "es" when body SEO stays Spanish
 * @param {string} [opts.skipLink]
 * @param {string} [opts.footerGeo]
 * @param {{href:string,label:string}[]} [opts.footerMarketLinks]
 */
export function renderPage({
  headHtml,
  bodyClass = 'page-marketing page-location',
  mainHtml,
  footerExtra = '',
  htmlLang = 'es-CL',
  i18nTitleKey = '',
  dataGeoSeo = '',
  skipLink = 'Saltar al contenido',
  footerGeo = 'Dinamarca · Chile · España · Remoto',
  footerMarketLinks = [],
}) {
  const wa = waLink(
    '¡Hola! Vi tu portafolio y me gustaría platicar sobre un posible proyecto.'
  );
  const titleAttr = i18nTitleKey
    ? ` data-i18n-title="${escapeAttr(i18nTitleKey)}"`
    : '';
  const geoSeoAttr = dataGeoSeo
    ? ` data-geo-seo="${escapeAttr(dataGeoSeo)}"`
    : '';

  return `<!DOCTYPE html>
<html lang="${escapeAttr(htmlLang)}"${titleAttr}${geoSeoAttr}>
<head>
${headHtml}
</head>
<body class="${bodyClass}">
${GTM_NOSCRIPT}
    <a class="skip-link" href="#main-content" data-i18n="a11y.skip">${escapeHtml(skipLink)}</a>
    <header class="site-header">
    <nav class="navbar" id="navbar" aria-label="Navegación principal" data-i18n-aria="a11y.navMain">
        <div class="container navbar-inner">
            <a href="/" class="logo" data-i18n-aria="a11y.home" aria-label="IrigoyenDev — Inicio"><span class="logo__name">Irigoyen</span><span class="logo__accent">Dev</span><span class="logo__dot" aria-hidden="true">.</span></a>
            <div class="nav-links" id="nav-links">
                <a href="/servicios" data-i18n="nav.services">Servicios</a>
                <a href="/#projects" data-i18n="nav.projects">Resultados</a>
                <a href="/precios" data-i18n="nav.pricing">Precios</a>
                <a href="/blog" data-i18n="nav.blog">Blog</a>
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
  areas: footerGeo,
  marketLinks: footerMarketLinks,
  extra: footerExtra,
})}

    <script src="https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.29/bundled/lenis.min.js" crossorigin="anonymous"></script>
    <script src="/js/script.js"></script>
    <a href="${wa}" target="_blank" rel="noopener noreferrer" class="whatsapp-widget" data-i18n-aria="a11y.whatsapp" aria-label="Chatear por WhatsApp">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
    </a>
</body>
</html>
`;
}
