const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'dragonmart.html');
let html = fs.readFileSync(filePath, 'utf8');

// Title and metas
html = html.replace(/<title>TheBeeBaby.*?<\/title>/, '<title>Dragonmart.hk | Plataforma Corporativa de Sourcing</title>');
html = html.replace(/content="TheBeeBaby: Digital marketplace.*?"/, 'content="Dragonmart.hk conecta empresas importadoras con proveedores en Asia."');
html = html.replace(/content="Case study: TheBeeBaby.*?"/, 'content="Case study: Dragonmart.hk Sourcing Platform"');

// Header
html = html.replace(/data-i18n="proj.thebeebaby.h1">.*?<\/h1>/, 'data-i18n="proj.dragonmart.h1">Plataforma corporativa para sourcing internacional: Dragonmart</h1>');
html = html.replace(/data-i18n="proj.thebeebaby.subtitle">.*?<\/p>/, 'data-i18n="proj.dragonmart.valueProp">Dragonmart.hk conecta empresas importadoras con proveedores, materiales y procesos logísticos en Asia, reduciendo incertidumbre técnica, comercial y operativa mediante validación de proveedores, control documental, cotizaciones estructuradas y comunicación directa.</p>');
html = html.replace(/data-i18n="proj.thebeebaby.role">.*?<\/span>/, 'data-i18n="proj.dragonmart.role">Rol: Desarrollador web responsable de la arquitectura frontend, implementación responsive, formularios de cotización, función serverless de envío de solicitudes, validación técnica del sitio, SEO estructurado y preparación para despliegue en Vercel.</span>');
html = html.replace(/<span data-i18n="proj.thebeebaby.scope">.*?<\/span>/, '');

html = html.replace(/<ul class="project-stack-list">[\s\S]*?<\/ul>/, `<ul class="project-stack-list">
            <li>HTML5 · CSS3 · Vanilla JS</li>
            <li>Node.js 20 · Vercel · Serverless</li>
            <li>Resend API · JSON-LD</li>
            <li>GitHub Actions</li>
        </ul>`);
html = html.replace(/href="https:\/\/www.thebeebaby.com"/, 'href="https://dragonmart.hk"');
html = html.replace(/data-i18n="proj.thebeebaby.liveBtn">.*?<\/a>/, 'data-i18n="proj.dragonmart.name">Dragonmart.hk →</a>');

// Business Value section (Remove or change)
// Actually we can map "Planteamiento del problema" to problem section.
// The template has "Business value" and "The problem". I'll replace Business value with Problem 1, and The problem with Problem 2.
html = html.replace(/data-i18n="proj.thebeebaby.valueTitle">.*?<\/h2>/, 'data-i18n="proj.dragonmart.problemTitle">Planteamiento Del Problema</h2>');
html = html.replace(/data-i18n="proj.thebeebaby.valueDesc">.*?<\/p>/, 'data-i18n="proj.dragonmart.problem1">El proyecto resuelve la necesidad de presentar Dragon Mart Trading Inc como una plataforma profesional de sourcing...</p>');

// "The problem" block -> "La solución"
html = html.replace(/data-i18n="proj.thebeebaby.problemTitle">.*?<\/h2>/, 'data-i18n="proj.dragonmart.name">Dragonmart.hk</h2>');
html = html.replace(/data-i18n="proj.thebeebaby.problemDesc">.*?<\/p>/, 'data-i18n="proj.dragonmart.problem2">La solución no se limita a una landing page informativa. Integra formularios especializados, rutas limpias, contenido bilingüe, estructura SEO, validación de fuentes estáticas y una API serverless para convertir solicitudes comerciales en correos operativos enviados al equipo de Dragon Mart.</p>');
html = html.replace(/<p><strong data-i18n="proj.thebeebaby.capabilitiesLabel">.*?<\/strong><\/p>\s*<ul class="project-results-list">[\s\S]*?<\/ul>/, ''); // Remove the list in problem

// Process
html = html.replace(/data-i18n="proj.thebeebaby.processTitle">.*?<\/h2>/, 'data-i18n="proj.dragonmart.methodTitle">Metodología Y Desarrollo Paso A Paso</h2>');
html = html.replace(/data-i18n="proj.thebeebaby.processIntro">.*?<\/p>/, 'data-i18n="proj.dragonmart.name">Dragonmart.hk</p>');

html = html.replace(/data-i18n="proj.thebeebaby.step1Title">.*?<\/h3>/, 'data-i18n="proj.dragonmart.method1Title">1. Definición de arquitectura</h3>');
html = html.replace(/data-i18n="proj.thebeebaby.step1Desc">.*?<\/p>/, 'data-i18n="proj.dragonmart.method1Desc">Desc</p>');

html = html.replace(/data-i18n="proj.thebeebaby.step2Title">.*?<\/h3>/, 'data-i18n="proj.dragonmart.method2Title">2. Construcción del frontend</h3>');
html = html.replace(/data-i18n="proj.thebeebaby.step2Desc">.*?<\/p>/, 'data-i18n="proj.dragonmart.method2Desc">Desc</p>');

html = html.replace(/data-i18n="proj.thebeebaby.step3Title">.*?<\/h3>/, 'data-i18n="proj.dragonmart.method3Title">3. Implementación de formularios comerciales</h3>');
html = html.replace(/data-i18n="proj.thebeebaby.step3Desc">.*?<\/p>/, 'data-i18n="proj.dragonmart.method3Desc">Desc</p>');

html = html.replace(/data-i18n="proj.thebeebaby.step4Title">.*?<\/h3>/, 'data-i18n="proj.dragonmart.method4Title">4. Desarrollo del backend serverless</h3>');
html = html.replace(/data-i18n="proj.thebeebaby.step4Desc">.*?<\/p>/, 'data-i18n="proj.dragonmart.method4Desc">Desc</p>');

html = html.replace(/data-i18n="proj.thebeebaby.step5Title">.*?<\/h3>/, 'data-i18n="proj.dragonmart.method5Title">5. Internacionalización y contenido estructurado</h3>');
html = html.replace(/data-i18n="proj.thebeebaby.step5Desc">.*?<\/p>/, 'data-i18n="proj.dragonmart.method5Desc">Desc</p>');

// Gallery
const galleryHTML = `
            <div class="mockup-grid">
                <div class="mockup-desktop" style="margin-bottom: var(--spacing-lg);">
                    <h3 class="mockup-caption">Dragonmart.hk Platform</h3>
                    <img loading="lazy" decoding="async" src="images/Dragon Mart/desktop-mockup.png" alt="DragonMart Corporate Platform" id="dragonmart-hero-img">
                </div>
                ${[1,2,3,4,5,6,7,8,9].map(i => `
                <div class="mockup-desktop" style="margin-bottom: var(--spacing-lg);">
                    <img loading="lazy" decoding="async" src="images/Dragon Mart/dragonmart-gallery-${i}.png" alt="DragonMart screen ${i}">
                </div>`).join('')}
            </div>
`;
html = html.replace(/<div class="mockup-grid">[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/, galleryHTML + `\n        </section>`);
// Tech Challenges
html = html.replace(/data-i18n="proj.thebeebaby.techTitle">.*?<\/h2>/, 'data-i18n="proj.dragonmart.techTitle">Retos Técnicos Y Optimización</h2>');
html = html.replace(/data-i18n="proj.thebeebaby.techIntro">.*?<\/p>/, 'data-i18n="proj.dragonmart.name">Dragonmart.hk</p>');

html = html.replace(/data-i18n="proj.thebeebaby.feat1Title">.*?<\/h3>/, 'data-i18n="proj.dragonmart.feat1Title">Control de CPU del servidor</h3>');
html = html.replace(/data-i18n="proj.thebeebaby.feat1Desc">.*?<\/p>/, 'data-i18n="proj.dragonmart.feat1Desc">Desc</p>');

html = html.replace(/data-i18n="proj.thebeebaby.feat2Title">.*?<\/h3>/, 'data-i18n="proj.dragonmart.feat2Title">Validación rigurosa de datasources</h3>');
html = html.replace(/data-i18n="proj.thebeebaby.feat2Desc">.*?<\/p>/, 'data-i18n="proj.dragonmart.feat2Desc">Desc</p>');

html = html.replace(/data-i18n="proj.thebeebaby.feat3Title">.*?<\/h3>/, 'data-i18n="proj.dragonmart.feat3Title">Autenticación, seguridad y cookies</h3>');
html = html.replace(/data-i18n="proj.thebeebaby.feat3Desc">.*?<\/p>/, 'data-i18n="proj.dragonmart.feat3Desc">Desc</p>');

// Results
html = html.replace(/data-i18n="proj.thebeebaby.resultsTitle">.*?<\/h2>/, 'data-i18n="proj.dragonmart.resultsTitle">Conclusión Y Resultados</h2>');
html = html.replace(/data-i18n="proj.thebeebaby.resultsDesc">.*?<\/p>/, 'data-i18n="proj.dragonmart.resultsDesc">Desc</p>');
html = html.replace(/data-i18n="proj.thebeebaby.res1">.*?<\/li>/, 'data-i18n="proj.dragonmart.res1">Plataforma mejora la comunicación con importadores</li>');
html = html.replace(/data-i18n="proj.thebeebaby.res2">.*?<\/li>/, 'data-i18n="proj.dragonmart.res2">Ordena solicitudes desde el primer contacto</li>');
html = html.replace(/data-i18n="proj.thebeebaby.res3">.*?<\/li>/, 'data-i18n="proj.dragonmart.res3">Reduce errores operativos exigiendo información clara</li>');

// Fix the mockup grid regex replacement issue by simply keeping the section tag correct
// Since I did a broad replace, I'll write the whole file to make sure it's valid.

fs.writeFileSync(filePath, html, 'utf8');
console.log('dragonmart.html structured.');
