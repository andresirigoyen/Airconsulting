const fs = require('fs');
const path = require('path');

const esKeys = {
  "proj.dragonmart.name": "Dragonmart.hk",
  "proj.dragonmart.desc": "Plataforma corporativa para sourcing internacional desde Asia.",
  "proj.dragonmart.h1": "Plataforma corporativa para sourcing internacional: Dragonmart",
  "proj.dragonmart.valueProp": "Dragonmart.hk conecta empresas importadoras con proveedores, materiales y procesos logísticos en Asia, reduciendo incertidumbre técnica, comercial y operativa mediante validación de proveedores, control documental, cotizaciones estructuradas y comunicación directa.",
  "proj.dragonmart.role": "Desarrollador web responsable de la arquitectura frontend, implementación responsive, formularios de cotización, función serverless de envío de solicitudes, validación técnica del sitio, SEO estructurado y preparación para despliegue en Vercel.",
  "proj.dragonmart.stack": "HTML5, CSS3, JavaScript vanilla, Node.js 20, Vercel, Serverless Functions, Resend API, JSON-LD, sitemap.xml, robots.txt, Web App Manifest, GitHub Actions.",
  "proj.dragonmart.problemTitle": "Planteamiento Del Problema",
  "proj.dragonmart.problem1": "El proyecto resuelve la necesidad de presentar Dragon Mart Trading Inc como una plataforma profesional de sourcing, procurement técnico e importación desde Asia. El sitio debía funcionar como una vitrina corporativa, pero también como una herramienta operativa: mostrar divisiones comerciales, explicar el proceso de importación, presentar evidencia visual de proyectos y permitir que un cliente solicite cotizaciones técnicas con datos completos.",
  "proj.dragonmart.problem2": "La solución no se limita a una landing page informativa. Integra formularios especializados, rutas limpias, contenido bilingüe, estructura SEO, validación de fuentes estáticas y una API serverless para convertir solicitudes comerciales en correos operativos enviados al equipo de Dragon Mart.",
  "proj.dragonmart.methodTitle": "Metodología Y Desarrollo Paso A Paso",
  "proj.dragonmart.method1Title": "1. Definición de arquitectura",
  "proj.dragonmart.method1Desc": "El proyecto fue construido como un sitio estático optimizado para despliegue en Vercel. Esta decisión permitió reducir complejidad, mejorar tiempos de carga y evitar procesamiento innecesario en servidor. La estructura separa páginas HTML principales, estilos globales, lógica JavaScript, assets visuales, scripts de validación y una función serverless bajo api/send-quote.js.",
  "proj.dragonmart.method2Title": "2. Construcción del frontend",
  "proj.dragonmart.method2Desc": "Desarrollé páginas específicas para inicio, contacto, cotizaciones, perfil corporativo, Dragon Glass y Dragon Ceramic. El frontend organiza el contenido en secciones de alto valor: propuesta comercial, proceso de importación, divisiones de sourcing, red internacional, cumplimiento, entregables, galería de proyectos y formularios. La interfaz usa JavaScript vanilla para animaciones progresivas con IntersectionObserver, navegación móvil, acordeones FAQ, modales de galería, sliders, selector personalizado de categorías y precarga automática de categorías en cotizaciones mediante parámetros de URL.",
  "proj.dragonmart.method3Title": "3. Implementación de formularios comerciales",
  "proj.dragonmart.method3Desc": "El formulario corporativo y el formulario de cotizaciones recopilan datos clave como producto, categoría, descripción técnica, volumen, puerto, nombre, empresa y correo. En el cliente, la información se empaqueta como JSON y se envía a /api/send-quote. También implementé un fallback con mailto:. Si el servicio de email no está configurado o falla, el sistema prepara automáticamente el correo en el cliente del usuario para no perder la oportunidad comercial.",
  "proj.dragonmart.method4Title": "4. Desarrollo del backend serverless",
  "proj.dragonmart.method4Desc": "La función api/send-quote.js actúa como capa segura entre el navegador y Resend. Valida método POST, lee el payload, normaliza campos, valida email, comprueba campos obligatorios, genera versión HTML y texto plano del correo, y envía la solicitud mediante la API de Resend. Las credenciales no se exponen en el navegador. La clave RESEND_API_KEY se lee desde variables de entorno y se usa únicamente en servidor mediante cabecera Authorization: Bearer.",
  "proj.dragonmart.method5Title": "5. Internacionalización y contenido estructurado",
  "proj.dragonmart.method5Desc": "El archivo i18n.js permite alternar entre español e inglés usando un diccionario de traducciones y persistencia en localStorage. Además, el sitio incluye metadatos SEO, Open Graph, Twitter Cards, JSON-LD, robots.txt, sitemap.xml, llms.txt y site.webmanifest.",
  "proj.dragonmart.techTitle": "Retos Técnicos Y Optimización",
  "proj.dragonmart.feat1Title": "Control de CPU del servidor",
  "proj.dragonmart.feat1Desc": "Para evitar saturar la CPU del servidor, la arquitectura desplaza casi todo el trabajo al modelo estático y al CDN de Vercel. Las páginas no requieren renderizado dinámico en cada visita. La función serverless solo se ejecuta cuando el usuario envía un formulario. Además, el procesamiento en servidor es deliberadamente liviano.",
  "proj.dragonmart.feat2Title": "Validación rigurosa de datasources",
  "proj.dragonmart.feat2Desc": "Implementé un script de validación que verifica que existan los archivos obligatorios, que los enlaces locales apunten a recursos reales, que cada página tenga título, descripción, canonical, robots, y que los bloques JSON-LD sean válidos. Si algo se rompe, el build falla antes del despliegue.",
  "proj.dragonmart.feat3Title": "Autenticación, seguridad y cookies",
  "proj.dragonmart.feat3Desc": "La seguridad se diseñó evitando exponer credenciales sensibles en el frontend. La autenticación real hacia el proveedor externo ocurre en servidor. Los datos enviados por el usuario se escapan con escapeHtml antes de construir el correo HTML, reduciendo riesgos de inyección.",
  "proj.dragonmart.resultsTitle": "Conclusión Y Resultados",
  "proj.dragonmart.resultsDesc": "Dragonmart.hk se consolidó como una plataforma corporativa ligera, rápida y técnicamente controlada. El resultado combina presentación comercial, captación de leads, cotización técnica, SEO estructurado, validación automatizada y despliegue serverless.",
  "proj.dragonmart.res1": "Plataforma mejora la comunicación con importadores",
  "proj.dragonmart.res2": "Ordena solicitudes desde el primer contacto",
  "proj.dragonmart.res3": "Reduce errores operativos exigiendo información clara"
};

const enKeys = {
  "proj.dragonmart.name": "Dragonmart.hk",
  "proj.dragonmart.desc": "Corporate platform for international sourcing from Asia.",
  "proj.dragonmart.h1": "Corporate platform for international sourcing: Dragonmart",
  "proj.dragonmart.valueProp": "Dragonmart.hk connects importing companies with suppliers, materials, and logistics processes in Asia, reducing technical, commercial, and operational uncertainty through supplier validation, documentary control, structured quoting, and direct communication.",
  "proj.dragonmart.role": "Web developer responsible for frontend architecture, responsive implementation, quote forms, serverless function for request submission, technical site validation, structured SEO, and preparation for Vercel deployment.",
  "proj.dragonmart.stack": "HTML5, CSS3, vanilla JavaScript, Node.js 20, Vercel, Serverless Functions, Resend API, JSON-LD, sitemap.xml, robots.txt, Web App Manifest, GitHub Actions.",
  "proj.dragonmart.problemTitle": "Problem Statement",
  "proj.dragonmart.problem1": "The project solves the need to present Dragon Mart Trading Inc as a professional sourcing, technical procurement, and import platform from Asia. The site had to work as a corporate showcase, but also as an operational tool: showing commercial divisions, explaining the import process, presenting visual evidence of projects, and allowing a client to request technical quotes with complete data.",
  "proj.dragonmart.problem2": "The solution is not limited to an informative landing page. It integrates specialized forms, clean routing, bilingual content, SEO structure, static asset validation, and a serverless API to convert commercial requests into operational emails sent to the Dragon Mart team.",
  "proj.dragonmart.methodTitle": "Methodology & Step-by-Step Development",
  "proj.dragonmart.method1Title": "1. Architecture Definition",
  "proj.dragonmart.method1Desc": "The project was built as a static site optimized for Vercel deployment. This decision reduced complexity, improved load times, and avoided unnecessary server processing. The structure separates main HTML pages, global styles, JavaScript logic, visual assets, validation scripts, and a serverless function under api/send-quote.js.",
  "proj.dragonmart.method2Title": "2. Frontend Construction",
  "proj.dragonmart.method2Desc": "I developed specific pages for home, contact, quotes, corporate profile, Dragon Glass, and Dragon Ceramic. The frontend organizes content into high-value sections: commercial proposal, import process, sourcing divisions, international network, compliance, deliverables, project gallery, and forms. The interface uses vanilla JavaScript for progressive animations with IntersectionObserver, mobile navigation, FAQ accordions, gallery modals, sliders, custom category selector, and automatic category preloading in quotes via URL parameters.",
  "proj.dragonmart.method3Title": "3. Commercial Forms Implementation",
  "proj.dragonmart.method3Desc": "The corporate and quote forms collect key data such as product, category, technical description, volume, port, name, company, and email. On the client, the information is packaged as JSON and sent to /api/send-quote. I also implemented a fallback with mailto:. If the email service is not configured or fails, the system automatically prepares the email in the user's client so the commercial opportunity is not lost.",
  "proj.dragonmart.method4Title": "4. Serverless Backend Development",
  "proj.dragonmart.method4Desc": "The api/send-quote.js function acts as a secure layer between the browser and Resend. It validates POST methods, reads the payload, normalizes fields, validates emails, checks mandatory fields, generates HTML and plain text versions of the email, and sends the request using the Resend API. Credentials are not exposed in the browser. The RESEND_API_KEY is read from environment variables and used only on the server via the Authorization: Bearer header.",
  "proj.dragonmart.method5Title": "5. Internationalization and Structured Content",
  "proj.dragonmart.method5Desc": "The i18n.js file allows switching between Spanish and English using a translation dictionary and persistence in localStorage. In addition, the site includes SEO metadata, Open Graph, Twitter Cards, JSON-LD, robots.txt, sitemap.xml, llms.txt, and site.webmanifest.",
  "proj.dragonmart.techTitle": "Technical Challenges & Optimization",
  "proj.dragonmart.feat1Title": "Server CPU Control",
  "proj.dragonmart.feat1Desc": "To avoid saturating the server's CPU, the architecture shifts almost all the work to the static model and Vercel's CDN. Pages do not require dynamic rendering on every visit. The serverless function only executes when the user submits a form. Furthermore, server processing is deliberately lightweight.",
  "proj.dragonmart.feat2Title": "Rigorous Datasource Validation",
  "proj.dragonmart.feat2Desc": "I implemented a validation script that verifies that mandatory files exist, that local links point to real resources, that each page has a title, description, canonical, robots, and that the JSON-LD blocks are valid. If anything breaks, the build fails before deployment.",
  "proj.dragonmart.feat3Title": "Authentication, Security, and Cookies",
  "proj.dragonmart.feat3Desc": "Security was designed avoiding the exposure of sensitive credentials on the frontend. Real authentication to the external provider occurs on the server. The data sent by the user is escaped with escapeHtml before building the HTML email, reducing injection risks.",
  "proj.dragonmart.resultsTitle": "Conclusion & Results",
  "proj.dragonmart.resultsDesc": "Dragonmart.hk consolidated itself as a lightweight, fast, and technically controlled corporate platform. The result combines commercial presentation, lead capture, technical quoting, structured SEO, automated validation, and serverless deployment.",
  "proj.dragonmart.res1": "Platform improves communication with importers",
  "proj.dragonmart.res2": "Organizes requests from the first contact",
  "proj.dragonmart.res3": "Reduces operational errors by requiring clear information"
};

const enPath = path.join(__dirname, 'locales', 'en.json');
const esPath = path.join(__dirname, 'locales', 'es.json');

const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const esData = JSON.parse(fs.readFileSync(esPath, 'utf8'));

Object.assign(enData, enKeys);
Object.assign(esData, esKeys);

fs.writeFileSync(enPath, JSON.stringify(enData, null, 2), 'utf8');
fs.writeFileSync(esPath, JSON.stringify(esData, null, 2), 'utf8');

console.log('DragonMart translations added.');
