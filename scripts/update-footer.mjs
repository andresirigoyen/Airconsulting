/**
 * Replaces site footers with the structured 3-column IrigoyenDev footer.
 * Excludes social links. Skips pages/cotizacion.html
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const WA =
  'https://wa.me/+4550249855?text=%C2%A1Hola!%20Vi%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20platicar%20sobre%20un%20posible%20proyecto.';

const FOOTER = `<footer class="footer site-footer">
        <div class="container site-footer__grid">
            <div class="site-footer__brand">
                <a href="/" class="site-footer__logo" aria-label="IrigoyenDev — Home"><span class="logo__name">Irigoyen</span><span class="logo__accent">Dev</span><span class="logo__dot" aria-hidden="true">.</span></a>
                <p class="site-footer__tagline" data-i18n="footer.tagline">Desarrollo web full stack, SEO, GEO y marketing digital para conseguir clientes online.</p>
                <p class="site-footer__areas" data-i18n="footer.areas">Dinamarca · Chile · España · Remoto</p>
                <h3 class="site-footer__heading" data-i18n="footer.contactHeading">Contacto general</h3>
                <ul class="site-footer__contact">
                    <li><a href="${WA}" target="_blank" rel="noopener noreferrer">WhatsApp +45 50 24 98 55</a></li>
                    <li><a href="/#contact" data-i18n="footer.contactForm">Formulario de contacto</a></li>
                </ul>
            </div>
            <nav class="site-footer__col" aria-label="Servicios">
                <h3 class="site-footer__heading" data-i18n="footer.servicesHeading">Servicios</h3>
                <ul class="site-footer__links">
                    <li><a href="/servicios" data-i18n="footer.linkServices">Todos los servicios</a></li>
                    <li><a href="/crear-tienda-online" data-i18n="footer.linkShop">Crear tienda online</a></li>
                    <li><a href="/landing-pages" data-i18n="footer.linkLandings">Landing pages</a></li>
                    <li><a href="/servicios#seo-basico" data-i18n="footer.linkSeo">SEO básico</a></li>
                    <li><a href="/servicios#seo-geo" data-i18n="footer.linkGeo">SEO &amp; GEO avanzado</a></li>
                    <li><a href="/servicios#marketing" data-i18n="footer.linkMkt">Marketing digital</a></li>
                    <li><a href="/servicios#care" data-i18n="footer.linkWm">Planes Care / mantenimiento</a></li>
                    <li><a href="/precios" data-i18n="footer.linkPricing">Precios</a></li>
                </ul>
            </nav>
            <nav class="site-footer__col" aria-label="Sitio">
                <h3 class="site-footer__heading" data-i18n="footer.siteHeading">Sitio</h3>
                <ul class="site-footer__links">
                    <li><a href="/" data-i18n="footer.linkHome">Inicio</a></li>
                    <li><a href="/#projects" data-i18n="footer.linkProjects">Proyectos</a></li>
                    <li><a href="/#testimonials" data-i18n="footer.linkReviews">Reseñas</a></li>
                    <li><a href="/faq" data-i18n="footer.linkFaq">FAQ</a></li>
                    <li><a href="/#contact" data-i18n="footer.linkContact">Contacto</a></li>
                    <li><a href="/llms.txt">llms.txt</a></li>
                    <li><a href="/sitemap.xml">Sitemap</a></li>
                </ul>
            </nav>
        </div>
        <div class="container site-footer__bottom">
            <p data-i18n="footer">&copy; 2026 IrigoyenDev. All rights reserved.</p>
        </div>
    </footer>`;

function walk(dir) {
  const out = [];
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) {
      if (['node_modules', '.git', 'scripts', 'images', 'locales', 'css', 'js'].includes(name)) continue;
      out.push(...walk(p));
    } else if (name.endsWith('.html') && name !== 'cotizacion.html') {
      out.push(p);
    }
  }
  return out;
}

for (const file of walk(root)) {
  let html = fs.readFileSync(file, 'utf8');
  if (!/<footer[\s>]/i.test(html)) continue;

  const next = html.replace(/<footer[\s\S]*?<\/footer>/i, FOOTER);
  if (next === html) {
    console.warn('No change', path.relative(root, file));
    continue;
  }
  fs.writeFileSync(file, next);
  console.log('Footer updated', path.relative(root, file));
}
