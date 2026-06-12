const fs = require('fs');
const path = require('path');

const esKeys = {
  "proj.calafate.title": "Calafate Propiedades",
  "proj.calafate.desc": "Plataforma inmobiliaria integral con Next.js App Router: catálogo ultrarrápido, gestión de leads (correos transaccionales) y panel de administración.",
  "proj.calafate.liveBtn": "Visitar calafatepropiedades.cl →",
  "proj.calafate.eyebrow": "Caso de estudio · Plataforma Inmobiliaria y Admin",
  "proj.calafate.h1": "Calafate Propiedades: Ecosistema inmobiliario integrado en Next.js",
  "proj.calafate.subtitle": "Un proyecto completo que unifica el catálogo público de propiedades, la captación de leads mediante correos transaccionales y el manejo de inventario en un solo entorno de Next.js.",
  "proj.calafate.role": "Rol: Desarrollador Full-Stack",
  "proj.calafate.scope": "Alcance: Frontend, backend, panel admin, integración de base de datos, optimización de imágenes y caché",
  "proj.calafate.stackLabel": "Stack",
  "proj.calafate.valueTitle": "Propuesta de valor",
  "proj.calafate.valueDesc": "Calafate Propiedades une el catálogo público, correos transaccionales (leads) y manejo de propiedades en un solo entorno de Next.js, logrando una sinergia perfecta entre rendimiento, consistencia de datos y operatividad.",
  "proj.calafate.problemTitle": "El problema",
  "proj.calafate.problemDesc": "Se requería una solución tecnológica moderna que permitiera gestionar de forma centralizada el inventario de propiedades, a la vez que proporcionara un catálogo extremadamente rápido para los usuarios y un flujo confiable de captura de clientes potenciales (leads).",
  "proj.calafate.capabilitiesLabel": "La plataforma permite:",
  "proj.calafate.cap1": "Catálogo de propiedades de alta velocidad",
  "proj.calafate.cap2": "Formularios de contacto integrados con correos transaccionales",
  "proj.calafate.cap3": "Panel administrativo para el manejo de inventario completo",
  "proj.calafate.cap4": "Gestión de propiedades y leads centralizada",
  "proj.calafate.processTitle": "Metodología y desarrollo",
  "proj.calafate.processIntro": "El desarrollo se centró en aprovechar las últimas capacidades de Next.js para entregar una plataforma rápida y segura:",
  "proj.calafate.step1Title": "1 — Arquitectura con Next.js App Router",
  "proj.calafate.step1Desc": "Estructuración del proyecto utilizando el App Router de Next.js para maximizar el rendimiento y organizar claramente las rutas públicas y administrativas.",
  "proj.calafate.step2Title": "2 — Base de datos y validación",
  "proj.calafate.step2Desc": "Implementación de Prisma ORM junto con validación estricta utilizando Zod, asegurando datos consistentes entre la web pública y el administrador.",
  "proj.calafate.step3Title": "3 — Optimización de medios",
  "proj.calafate.step3Desc": "Integración con Cloudinary para la carga de imágenes, incluyendo conversión automática a formatos modernos como WebP/JPEG para un catálogo rápido.",
  "proj.calafate.step4Title": "4 — Seguridad y flujos administrativos",
  "proj.calafate.step4Desc": "Configuración de Auth.js y Next.js Middlewares para proteger las rutas operacionales y flujos administrativos del panel de control.",
  "proj.calafate.mockupsTitle": "Interfaz y pantallas del producto",
  "proj.calafate.mockupsDesc": "Diseño optimizado tanto para la navegación pública de los clientes como para la gestión operativa interna.",
  "proj.calafate.techTitle": "Retos técnicos resueltos",
  "proj.calafate.techIntro": "La implementación exigió resolver desafíos de rendimiento, consistencia de datos y seguridad.",
  "proj.calafate.feat1Title": "Rendimiento del catálogo",
  "proj.calafate.feat1Desc": "Integración con Cloudinary y conversión a WebP/JPEG, además de una configuración de caché estática incremental (ISR) de Next.js App Router para mantener el catálogo rápido.",
  "proj.calafate.feat2Title": "Datos consistentes",
  "proj.calafate.feat2Desc": "Sinergia total entre Prisma ORM y la validación estricta con Zod entre la web pública y el panel de administración, evitando inconsistencias en las propiedades.",
  "proj.calafate.feat3Title": "Operación segura",
  "proj.calafate.feat3Desc": "Configuración avanzada de Auth.js y Next.js Middlewares para garantizar que los flujos administrativos y la gestión de propiedades estén completamente protegidos.",
  "proj.calafate.resultsTitle": "Conclusión y resultados",
  "proj.calafate.resultsDesc": "Calafate Propiedades demuestra cómo es posible unir un catálogo rápido, gestión de correos transaccionales (leads) y manejo completo de propiedades en un solo entorno de Next.js. El resultado es una plataforma altamente eficiente, fácil de mantener y que escala junto con el negocio inmobiliario.",
  "proj.calafate.res1": "Catálogo público ultra-rápido impulsado por ISR y Cloudinary.",
  "proj.calafate.res2": "Base de datos y tipos consistentes gracias a Prisma y Zod.",
  "proj.calafate.res3": "Administración segura e integrada con Auth.js y Middlewares.",
  "cta.calafate.title": "¿Buscas centralizar tu operación inmobiliaria?",
  "cta.calafate.desc": "Construyo plataformas como Calafate Propiedades que unifican tu catálogo, administración y captación de leads en un ecosistema rápido y moderno.",
  "cta.calafate.btn": "Solicitar plan de plataforma",
  "proj.calafate.adminShowcaseTitle": "Panel de Administración"
};

const enKeys = {
  "proj.calafate.title": "Calafate Propiedades",
  "proj.calafate.desc": "Comprehensive real estate platform with Next.js App Router: ultra-fast catalog, lead management (transactional emails), and admin panel.",
  "proj.calafate.liveBtn": "Visit calafatepropiedades.cl →",
  "proj.calafate.eyebrow": "Case study · Real Estate & Admin Platform",
  "proj.calafate.h1": "Calafate Propiedades: Integrated real estate ecosystem in Next.js",
  "proj.calafate.subtitle": "A complete project that unifies the public property catalog, lead capture via transactional emails, and inventory management in a single Next.js environment.",
  "proj.calafate.role": "Role: Full-Stack Developer",
  "proj.calafate.scope": "Scope: Frontend, backend, admin panel, database integration, image optimization, and caching",
  "proj.calafate.stackLabel": "Stack",
  "proj.calafate.valueTitle": "Value proposition",
  "proj.calafate.valueDesc": "Calafate Propiedades unites the public catalog, transactional emails (leads), and property management in a single Next.js environment, achieving perfect synergy between performance, data consistency, and operability.",
  "proj.calafate.problemTitle": "The problem",
  "proj.calafate.problemDesc": "A modern technological solution was required to centrally manage the property inventory, while providing an extremely fast catalog for users and a reliable flow for capturing potential clients (leads).",
  "proj.calafate.capabilitiesLabel": "The platform enables:",
  "proj.calafate.cap1": "High-speed property catalog",
  "proj.calafate.cap2": "Contact forms integrated with transactional emails",
  "proj.calafate.cap3": "Administrative panel for full inventory management",
  "proj.calafate.cap4": "Centralized property and lead management",
  "proj.calafate.processTitle": "Methodology and development",
  "proj.calafate.processIntro": "Development focused on leveraging the latest Next.js capabilities to deliver a fast and secure platform:",
  "proj.calafate.step1Title": "1 — Architecture with Next.js App Router",
  "proj.calafate.step1Desc": "Project structuring using the Next.js App Router to maximize performance and clearly organize public and administrative routes.",
  "proj.calafate.step2Title": "2 — Database and validation",
  "proj.calafate.step2Desc": "Implementation of Prisma ORM along with strict validation using Zod, ensuring consistent data between the public web and the admin.",
  "proj.calafate.step3Title": "3 — Media optimization",
  "proj.calafate.step3Desc": "Integration with Cloudinary for image uploading, including automatic conversion to modern formats like WebP/JPEG for a fast catalog.",
  "proj.calafate.step4Title": "4 — Security and administrative flows",
  "proj.calafate.step4Desc": "Configuration of Auth.js and Next.js Middlewares to protect operational routes and administrative flows of the control panel.",
  "proj.calafate.mockupsTitle": "Interface & product screens",
  "proj.calafate.mockupsDesc": "Optimized design for both public customer navigation and internal operational management.",
  "proj.calafate.techTitle": "Technical challenges solved",
  "proj.calafate.techIntro": "The implementation required solving performance, data consistency, and security challenges.",
  "proj.calafate.feat1Title": "Catalog performance",
  "proj.calafate.feat1Desc": "Integration with Cloudinary and conversion to WebP/JPEG, plus an Incremental Static Regeneration (ISR) configuration of Next.js App Router to keep the catalog fast.",
  "proj.calafate.feat2Title": "Consistent data",
  "proj.calafate.feat2Desc": "Total synergy between Prisma ORM and strict validation with Zod between the public web and the admin panel, preventing inconsistencies in properties.",
  "proj.calafate.feat3Title": "Secure operation",
  "proj.calafate.feat3Desc": "Advanced configuration of Auth.js and Next.js Middlewares to ensure that administrative flows and property management are fully protected.",
  "proj.calafate.resultsTitle": "Conclusion & results",
  "proj.calafate.resultsDesc": "Calafate Propiedades demonstrates how it's possible to unite a fast catalog, transactional email (leads) management, and complete property management in a single Next.js environment. The result is a highly efficient, easy-to-maintain platform that scales alongside the real estate business.",
  "proj.calafate.res1": "Ultra-fast public catalog powered by ISR and Cloudinary.",
  "proj.calafate.res2": "Consistent database and types thanks to Prisma and Zod.",
  "proj.calafate.res3": "Secure and integrated administration with Auth.js and Middlewares.",
  "cta.calafate.title": "Looking to centralize your real estate operation?",
  "cta.calafate.desc": "I build platforms like Calafate Propiedades that unify your catalog, administration, and lead capture in a fast and modern ecosystem.",
  "cta.calafate.btn": "Request platform plan",
  "proj.calafate.adminShowcaseTitle": "Admin Dashboard"
};

const enPath = path.join(__dirname, 'locales', 'en.json');
const esPath = path.join(__dirname, 'locales', 'es.json');

const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const esData = JSON.parse(fs.readFileSync(esPath, 'utf8'));

Object.assign(enData, enKeys);
Object.assign(esData, esKeys);

fs.writeFileSync(enPath, JSON.stringify(enData, null, 2), 'utf8');
fs.writeFileSync(esPath, JSON.stringify(esData, null, 2), 'utf8');

console.log('Calafate translations added.');
