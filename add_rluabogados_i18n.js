const fs = require('fs');
const path = require('path');

const esKeys = {
  "proj.rluabogados.name": "Ruiz Leiva Abogados",
  "proj.rluabogados.descCard": "Plataforma legal corporativa con Next.js App Router, captación de leads y panel de administración seguro.",
  "proj.rluabogados.eyebrow": "Caso de estudio · Plataforma Corporativa Legal",
  "proj.rluabogados.h1": "Ruiz Leiva Abogados: Plataforma Legal Corporativa",
  "proj.rluabogados.subtitle": "Una plataforma para captar leads calificados, gestionar un blog jurídico y exhibir servicios con una experiencia pública optimizada y un panel de administración seguro.",
  "proj.rluabogados.role": "Rol: Desarrollador Full-Stack",
  "proj.rluabogados.scope": "Alcance: Diseño de producto, sitio público, panel admin, captación de leads y optimización SEO",
  "proj.rluabogados.stackLabel": "Stack Tecnológico",
  "proj.rluabogados.liveBtn": "Visitar rluabogados.cl →",
  "proj.rluabogados.valueTitle": "Valor para el negocio",
  "proj.rluabogados.valueDesc": "Ruiz Leiva Abogados centraliza su catálogo de servicios, publica perspectivas legales y capta prospectos calificados directamente en un panel privado, eliminando fricciones operativas.",
  "proj.rluabogados.problemTitle": "El problema",
  "proj.rluabogados.problemDesc": "Un estudio de abogados corporativo necesita presentar sus servicios con autoridad y captar prospectos de forma segura. Antes de este desarrollo, su presencia digital carecía de un sistema unificado para gestión de contenido y seguimiento de leads.",
  "proj.rluabogados.capabilitiesLabel": "La plataforma permite:",
  "proj.rluabogados.cap1": "Publicar y gestionar artículos en el blog jurídico",
  "proj.rluabogados.cap2": "Captar leads con notificaciones automatizadas",
  "proj.rluabogados.cap3": "Gestionar un catálogo de servicios legales",
  "proj.rluabogados.cap4": "Configurar metadata SEO desde el panel",
  "proj.rluabogados.cap5": "Acceso seguro para el equipo de abogados",
  "proj.rluabogados.processTitle": "Metodología de desarrollo",
  "proj.rluabogados.processIntro": "Diseñé el producto de principio a fin, desde la arquitectura hasta el despliegue. Así se construyó:",
  "proj.rluabogados.step1Title": "1 — Arquitectura de producto",
  "proj.rluabogados.step1Desc": "Descubrimiento público, áreas privadas de administración y servicios modulares para blog, leads y SEO, organizados para escalar con flujos de trabajo claros.",
  "proj.rluabogados.step2Title": "2 — Captación de leads",
  "proj.rluabogados.step2Desc": "Flujos integrados de 'Evalúa tu caso' con notificaciones SMTP y captura directa de prospectos hacia un panel centralizado.",
  "proj.rluabogados.step3Title": "3 — Experiencia pública",
  "proj.rluabogados.step3Desc": "Inicio, catálogo de servicios, perspectivas legales y formularios de evaluación con animaciones fluidas y metadata dinámica.",
  "proj.rluabogados.step4Title": "4 — Operaciones administrativas",
  "proj.rluabogados.step4Desc": "Acceso seguro con NextAuth que permite al equipo legal publicar artículos, actualizar servicios y gestionar SEO sin depender de desarrolladores.",
  "proj.rluabogados.step5Title": "5 — Optimización SEO",
  "proj.rluabogados.step5Desc": "Implementación con Next.js App Router, metadata dinámica, sitemaps y JSON-LD para posicionamiento orgánico competitivo.",
  "proj.rluabogados.mockupsTitle": "Interfaz y pantallas del producto",
  "proj.rluabogados.mockupsDesc": "Sitio web institucional, captación de prospectos estructurada, blog jurídico y paneles de administración.",
  "proj.rluabogados.techTitle": "Retos técnicos resueltos",
  "proj.rluabogados.techIntro": "Pensado para captar clientes de alto estándar—rendimiento fluido, gestión de contenido dinámica y operación protegida.",
  "proj.rluabogados.feat1Title": "Rendimiento y SEO avanzado",
  "proj.rluabogados.feat1Desc": "Implementación con Next.js App Router, metadata dinámica, JSON-LD, sitemaps y optimización de assets para posicionamiento orgánico en el sector legal.",
  "proj.rluabogados.feat2Title": "Captación de leads cualificados",
  "proj.rluabogados.feat2Desc": "Flujo integrado de 'Evalúa tu caso' con notificaciones vía SMTP y prospectos directo hacia el panel administrativo.",
  "proj.rluabogados.feat3Title": "Operación protegida y autogestión",
  "proj.rluabogados.feat3Desc": "Acceso seguro con NextAuth, permitiendo al equipo editar contenido y configurar metadatos SEO sin exponer el sistema interno.",
  "proj.rluabogados.resultsTitle": "Conclusión y resultados",
  "proj.rluabogados.resultsDesc": "Ruiz Leiva Abogados es una plataforma legal completa y moderna—experiencia pública optimizada que transmite autoridad, más un panel funcional y seguro.",
  "proj.rluabogados.res1": "Sitio institucional, leads y admin unificados",
  "proj.rluabogados.res2": "Blog jurídico autogestionable y SEO optimizado",
  "proj.rluabogados.res3": "Operación segura y uso diario confiable",
  "cta.rluabogados.title": "¿Construyendo un sitio corporativo o plataforma interna?",
  "cta.rluabogados.desc": "Desarrollo productos full-stack como Ruiz Leiva Abogados—catálogos de servicios, captación de leads y áreas privadas de administración. Coticemos tu MVP o la actualización de tu sistema actual.",
  "cta.rluabogados.btn": "Solicitar cotización de plataforma"
};

const enKeys = {
  "proj.rluabogados.name": "Ruiz Leiva Abogados",
  "proj.rluabogados.descCard": "Corporate legal platform with Next.js App Router, lead capture, and secure admin panel.",
  "proj.rluabogados.eyebrow": "Case study · Legal Corporate Platform",
  "proj.rluabogados.h1": "Ruiz Leiva Abogados: Legal Corporate Platform",
  "proj.rluabogados.subtitle": "A platform to capture qualified leads, manage a legal blog, and showcase services with an optimized public experience and a secure admin panel.",
  "proj.rluabogados.role": "Role: Full-Stack Developer",
  "proj.rluabogados.scope": "Scope: Product design, public site, admin tools, lead capture & SEO optimization",
  "proj.rluabogados.stackLabel": "Stack",
  "proj.rluabogados.liveBtn": "Visit rluabogados.cl →",
  "proj.rluabogados.valueTitle": "Business value",
  "proj.rluabogados.valueDesc": "Ruiz Leiva Abogados centralizes their service catalog, publishes legal perspectives, and captures qualified leads directly into a private dashboard, eliminating friction and improving their digital presentation.",
  "proj.rluabogados.problemTitle": "The problem",
  "proj.rluabogados.problemDesc": "A corporate law firm needs to present their services professionally and capture leads securely. Before this build, their digital presence lacked a unified system for content management and lead tracking.",
  "proj.rluabogados.capabilitiesLabel": "The platform enables:",
  "proj.rluabogados.cap1": "Publish and manage legal blog posts",
  "proj.rluabogados.cap2": "Capture leads with automated email notifications",
  "proj.rluabogados.cap3": "Manage a catalog of legal services",
  "proj.rluabogados.cap4": "Configure SEO metadata from the admin panel",
  "proj.rluabogados.cap5": "Secure login for the firm's team",
  "proj.rluabogados.processTitle": "Development methodology",
  "proj.rluabogados.processIntro": "I owned the product end to end—from architecture to a deployment-ready platform. Here is how it was built:",
  "proj.rluabogados.step1Title": "1 — Product architecture",
  "proj.rluabogados.step1Desc": "Public discovery, private admin areas, and modular services for blog, leads, and SEO—organized for scale and a clear split between public and operational workflows.",
  "proj.rluabogados.step2Title": "2 — Capturing qualified leads",
  "proj.rluabogados.step2Desc": "Integrated 'Evalúa tu caso' flows with SMTP notifications and lead capture directly into a centralized admin panel.",
  "proj.rluabogados.step3Title": "3 — Public experience",
  "proj.rluabogados.step3Desc": "Home, services catalog, legal perspectives, and case evaluation forms—with smooth scrolling and dynamic metadata.",
  "proj.rluabogados.step4Title": "4 — Admin operations",
  "proj.rluabogados.step4Desc": "Secure access with NextAuth allowing the legal team to publish articles, update services, and manage SEO settings.",
  "proj.rluabogados.step5Title": "5 — SEO optimization",
  "proj.rluabogados.step5Desc": "Implementation of Next.js App Router, dynamic metadata, JSON-LD, sitemaps, and asset optimization for organic positioning.",
  "proj.rluabogados.mockupsTitle": "Interface & product screens",
  "proj.rluabogados.mockupsDesc": "Public website, structured lead capture, legal blog, and admin panels—designed for a modern corporate law firm and efficient internal management.",
  "proj.rluabogados.techTitle": "Technical challenges solved",
  "proj.rluabogados.techIntro": "Built to capture high-standard clients—fluid performance, dynamic content management, and protected operations.",
  "proj.rluabogados.feat1Title": "Advanced Performance and SEO",
  "proj.rluabogados.feat1Desc": "Next.js App Router, dynamic metadata, JSON-LD, sitemaps, and asset optimization for a competitive organic positioning in the legal sector.",
  "proj.rluabogados.feat2Title": "Qualified Lead Capture",
  "proj.rluabogados.feat2Desc": "Integrated 'Evalúa tu caso' flow with automated SMTP notifications and prospect capture straight into a centralized dashboard.",
  "proj.rluabogados.feat3Title": "Protected operations and self-management",
  "proj.rluabogados.feat3Desc": "Secure access to admin modules with NextAuth, allowing the legal team to publish articles and manage SEO without depending on developers.",
  "proj.rluabogados.resultsTitle": "Results & impact",
  "proj.rluabogados.resultsDesc": "Ruiz Leiva Abogados is a complete, modern corporate legal platform ready for production—an optimized public experience that conveys authority, plus a functional and secure admin panel.",
  "proj.rluabogados.res1": "Unified institutional site, lead capture, and admin in a single product",
  "proj.rluabogados.res2": "Self-manageable legal blog and comprehensive SEO optimization",
  "proj.rluabogados.res3": "Secure operations, content management, and dependable daily use",
  "cta.rluabogados.title": "Building a corporate site or internal admin platform?",
  "cta.rluabogados.desc": "I ship full-stack products like Ruiz Leiva Abogados—service catalogs, lead capture, private admin areas, and performance built for real traffic. Let's scope your MVP or upgrade your current product.",
  "cta.rluabogados.btn": "Request a platform quote"
};

const localesDir = path.join(__dirname, 'locales');
const enPath = path.join(localesDir, 'en.json');
const esPath = path.join(localesDir, 'es.json');

const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const esData = JSON.parse(fs.readFileSync(esPath, 'utf8'));

Object.assign(enData, enKeys);
Object.assign(esData, esKeys);

fs.writeFileSync(enPath, JSON.stringify(enData, null, 2), 'utf8');
fs.writeFileSync(esPath, JSON.stringify(esData, null, 2), 'utf8');

// Do the same for other languages using en as a base for missing keys if needed, 
// but since the site might handle missing keys gracefully or they translate them later, 
// I'll just write to EN and ES for now.

console.log('RLU Abogados translations added.');
