const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

const esKeys = {
  "proj.ava7.title": "AVA7 Propiedades",
  "proj.ava7.desc": "Web inmobiliaria para venta y arriendo en Viña del Mar y Concón: buscador multi-filtro, marca local costera y captación directa por WhatsApp y contacto.",
  "proj.ava7.liveBtn": "Visitar ava7propiedades.cl →",
  "proj.ava7.eyebrow": "Caso de estudio · Web inmobiliaria costera",
  "proj.ava7.h1": "AVA7 Propiedades: venta y arriendo en Viña del Mar y Concón",
  "proj.ava7.subtitle": "Sitio inmobiliario orientado a conversión: buscador de propiedades, catálogo de venta y arriendo, y canales directos (WhatsApp y contacto) para captar clientes en la costa de Valparaíso.",
  "proj.ava7.role": "Rol: Desarrollador Full-Stack",
  "proj.ava7.scope": "Alcance: Diseño UX, frontend, buscador de propiedades, SEO local y captación de leads",
  "proj.ava7.stackLabel": "Stack",
  "proj.ava7.valueTitle": "Propuesta de valor",
  "proj.ava7.valueDesc": "AVA7 Propiedades proyecta una marca inmobiliaria cercana y profesional en Viña del Mar y Concón. El sitio combina un hero visual de alto impacto con un buscador multi-filtro y rutas claras hacia venta, arriendo, blog y contacto — pensado para convertir visitas en consultas.",
  "proj.ava7.problemTitle": "El problema",
  "proj.ava7.problemDesc": "Una inmobiliaria local necesita destacar frente a portales genéricos: mostrar inventario de forma clara, filtrar por operación y tipología, y facilitar el contacto inmediato sin fricción. El desafío era construir una presencia digital propia, confiable y orientada a la costa de Valparaíso.",
  "proj.ava7.capabilitiesLabel": "La plataforma permite:",
  "proj.ava7.cap1": "Búsqueda por ubicación, operación, tipo, habitaciones, baños y estacionamientos",
  "proj.ava7.cap2": "Secciones dedicadas a venta, arriendo y “vende tu propiedad”",
  "proj.ava7.cap3": "Contacto directo por teléfono, correo y WhatsApp",
  "proj.ava7.cap4": "Presencia de marca local con blog y señales de confianza",
  "proj.ava7.processTitle": "Metodología y desarrollo",
  "proj.ava7.processIntro": "El desarrollo priorizó claridad comercial, velocidad percibida y un embudo corto hacia el contacto:",
  "proj.ava7.step1Title": "1 — Identidad y hero de conversión",
  "proj.ava7.step1Desc": "Diseño de marca con tipografía y color propios (azul marino + amarillo), hero fotográfico de la costa y mensaje centrado en Viña del Mar y Concón.",
  "proj.ava7.step2Title": "2 — Buscador inmobiliario",
  "proj.ava7.step2Desc": "Barra de filtros para ubicación, operación, tipo de propiedad, habitaciones, baños y estacionamientos, con CTA de búsqueda visible desde el primer viewport.",
  "proj.ava7.step3Title": "3 — Arquitectura de contenidos",
  "proj.ava7.step3Desc": "Navegación clara hacia inventario (en venta / en arriendo), blog, captación de propietarios y contacto, alineada a la jornada del comprador y del vendedor.",
  "proj.ava7.step4Title": "4 — Canales de captación",
  "proj.ava7.step4Desc": "Integración de WhatsApp, teléfono y correo en puntos estratégicos de la interfaz para reducir fricción entre interés y consulta comercial.",
  "proj.ava7.mockupsTitle": "Interfaz y pantallas del producto",
  "proj.ava7.mockupsDesc": "Experiencia pensada para explorar propiedades en la costa y contactar a la inmobiliaria en pocos pasos.",
  "proj.ava7.homeShowcaseTitle": "Inicio y buscador de propiedades",
  "proj.ava7.techTitle": "Retos técnicos resueltos",
  "proj.ava7.techIntro": "El proyecto equilibró impacto visual, usabilidad del buscador y conversión local.",
  "proj.ava7.feat1Title": "Búsqueda orientada a decisión",
  "proj.ava7.feat1Desc": "Filtros de operación, tipología y características clave visibles desde el hero, para que el visitante encuentre propiedades sin navegar a ciegas.",
  "proj.ava7.feat2Title": "Marca local costera",
  "proj.ava7.feat2Desc": "Mensaje y visuales anclados a Viña del Mar y Concón, reforzando posicionamiento frente a portales nacionales genéricos.",
  "proj.ava7.feat3Title": "Captación sin fricción",
  "proj.ava7.feat3Desc": "WhatsApp, teléfono y correo siempre accesibles, acortando el camino entre interés inmobiliario y conversación comercial.",
  "proj.ava7.resultsTitle": "Conclusión y resultados",
  "proj.ava7.resultsDesc": "AVA7 Propiedades demuestra cómo una web inmobiliaria local puede competir con claridad de marca, un buscador útil y canales de contacto inmediatos. El resultado es una vitrina digital que proyecta profesionalismo y facilita la captación de compradores, arrendatarios y propietarios.",
  "proj.ava7.res1": "Hero y buscador alineados a la intención de venta y arriendo.",
  "proj.ava7.res2": "Arquitectura de contenidos para compradores y propietarios.",
  "proj.ava7.res3": "Canales de contacto (WhatsApp, teléfono, correo) integrados en la experiencia.",
  "cta.ava7.title": "¿Quieres una web inmobiliaria que convierta visitas en consultas?",
  "cta.ava7.desc": "Construimos sitios como AVA7 Propiedades: marca clara, buscador útil y captación directa para inmobiliarias locales.",
  "cta.ava7.btn": "Solicitar plan de proyecto"
};

const enKeys = {
  "proj.ava7.title": "AVA7 Propiedades",
  "proj.ava7.desc": "Real estate website for sale and rent in Viña del Mar and Concón: multi-filter search, coastal local branding, and direct WhatsApp and contact lead capture.",
  "proj.ava7.liveBtn": "Visit ava7propiedades.cl →",
  "proj.ava7.eyebrow": "Case study · Coastal real estate website",
  "proj.ava7.h1": "AVA7 Propiedades: sale and rent in Viña del Mar and Concón",
  "proj.ava7.subtitle": "Conversion-focused real estate site: property search, sale and rental catalog, and direct channels (WhatsApp and contact) to capture clients on the Valparaíso coast.",
  "proj.ava7.role": "Role: Full-Stack Developer",
  "proj.ava7.scope": "Scope: UX design, frontend, property search, local SEO, and lead capture",
  "proj.ava7.stackLabel": "Stack",
  "proj.ava7.valueTitle": "Value proposition",
  "proj.ava7.valueDesc": "AVA7 Propiedades projects a close, professional real estate brand in Viña del Mar and Concón. The site combines a high-impact visual hero with a multi-filter search and clear paths to sale, rent, blog, and contact — built to turn visits into inquiries.",
  "proj.ava7.problemTitle": "The problem",
  "proj.ava7.problemDesc": "A local agency needs to stand out against generic portals: show inventory clearly, filter by operation and type, and make immediate contact frictionless. The challenge was to build a trustworthy digital presence oriented to the Valparaíso coast.",
  "proj.ava7.capabilitiesLabel": "The platform enables:",
  "proj.ava7.cap1": "Search by location, operation, type, bedrooms, bathrooms, and parking",
  "proj.ava7.cap2": "Dedicated sections for sale, rent, and “sell your property”",
  "proj.ava7.cap3": "Direct contact by phone, email, and WhatsApp",
  "proj.ava7.cap4": "Local brand presence with blog and trust signals",
  "proj.ava7.processTitle": "Methodology and development",
  "proj.ava7.processIntro": "Development prioritized commercial clarity, perceived speed, and a short funnel to contact:",
  "proj.ava7.step1Title": "1 — Identity and conversion hero",
  "proj.ava7.step1Desc": "Brand design with custom typography and color (navy + yellow), coastal photography hero, and messaging centered on Viña del Mar and Concón.",
  "proj.ava7.step2Title": "2 — Real estate search",
  "proj.ava7.step2Desc": "Filter bar for location, operation, property type, bedrooms, bathrooms, and parking, with a search CTA visible from the first viewport.",
  "proj.ava7.step3Title": "3 — Content architecture",
  "proj.ava7.step3Desc": "Clear navigation to inventory (for sale / for rent), blog, owner acquisition, and contact — aligned to buyer and seller journeys.",
  "proj.ava7.step4Title": "4 — Capture channels",
  "proj.ava7.step4Desc": "WhatsApp, phone, and email integrated at strategic UI points to reduce friction between interest and commercial inquiry.",
  "proj.ava7.mockupsTitle": "Interface & product screens",
  "proj.ava7.mockupsDesc": "Experience designed to explore coastal properties and contact the agency in a few steps.",
  "proj.ava7.homeShowcaseTitle": "Home and property search",
  "proj.ava7.techTitle": "Technical challenges solved",
  "proj.ava7.techIntro": "The project balanced visual impact, search usability, and local conversion.",
  "proj.ava7.feat1Title": "Decision-oriented search",
  "proj.ava7.feat1Desc": "Operation, typology, and key feature filters visible from the hero, so visitors find properties without blind navigation.",
  "proj.ava7.feat2Title": "Coastal local brand",
  "proj.ava7.feat2Desc": "Messaging and visuals anchored to Viña del Mar and Concón, strengthening positioning against generic national portals.",
  "proj.ava7.feat3Title": "Frictionless capture",
  "proj.ava7.feat3Desc": "WhatsApp, phone, and email always accessible, shortening the path from real estate interest to a commercial conversation.",
  "proj.ava7.resultsTitle": "Conclusion & results",
  "proj.ava7.resultsDesc": "AVA7 Propiedades shows how a local real estate website can compete with brand clarity, a useful search, and immediate contact channels. The result is a digital storefront that projects professionalism and captures buyers, renters, and property owners.",
  "proj.ava7.res1": "Hero and search aligned to sale and rent intent.",
  "proj.ava7.res2": "Content architecture for buyers and property owners.",
  "proj.ava7.res3": "Contact channels (WhatsApp, phone, email) integrated into the experience.",
  "cta.ava7.title": "Want a real estate site that turns visits into inquiries?",
  "cta.ava7.desc": "We build sites like AVA7 Propiedades: clear branding, useful search, and direct capture for local agencies.",
  "cta.ava7.btn": "Request project plan"
};

const locales = ['en', 'es', 'de', 'da', 'no', 'sv', 'it', 'fr', 'pt'];

for (const lang of locales) {
  const filePath = path.join(ROOT, 'locales', `${lang}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const keys = lang === 'es' ? esKeys : enKeys;
  Object.assign(data, keys);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
  console.log(`AVA7 keys added to ${lang}.json`);
}
