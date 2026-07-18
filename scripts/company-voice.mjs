/**
 * Company-voice copy pass: replace freelancer/first-person with IrigoyenDev "we".
 * Run: node scripts/company-voice.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const localesDir = path.join(root, 'locales');

const es = {
  'faq.homeDesc': 'Lo que suelen preguntar antes de contratar a IrigoyenDev.',
  'faq.q1': '¿Qué servicios ofrecen?',
  'faq.q3': '¿Trabajan con Chile, España y Dinamarca?',
  'faq.a3': 'Sí. Atendemos clientes en Dinamarca, Chile, España y proyectos remotos, en español o inglés.',
  'faq.q4': '¿Ofrecen suscripción o mantenimiento mensual?',
  'faq.q5': '¿Cómo empezamos?',
  'contact.desc': 'Cuéntanos tu proyecto y recibe respuesta en 48 horas con plan, plazos y estimación de inversión. Abiertos a nuevos clientes.',
  'lead.eyebrow': '¿Cómo podemos ayudarte?',
  'lead.title': 'Elige el servicio y te preparamos un plan',
  'form.message': 'Cuéntanos tu proyecto',
  'form.success': 'Mensaje recibido. Te responderemos en menos de 48 horas.',
  'form.error': 'Algo falló. Inténtalo de nuevo o escríbenos directamente.',
  'testimonials.title': 'Lo que dicen nuestros clientes',
  'cta.thebeebaby.desc':
    'En IrigoyenDev diseñamos y desarrollamos productos full-stack como TheBeeBaby—desde UX y búsqueda geográfica hasta pagos y paneles admin. Definamos tu MVP o escalemos tu producto actual.',
  'cta.dahuss.desc':
    'En IrigoyenDev desarrollamos productos full-stack como Dahuss Homes—catálogo de propiedades, captación de consultas, áreas admin privadas y rendimiento para tráfico real. Definamos tu MVP o mejoremos tu producto actual.',
  'cta.retorica.desc':
    'En IrigoyenDev desarrollamos plataformas Astro como Retórica—storytelling inmersivo, colecciones de contenido, entrega estática rápida y formularios que convierten. Definamos tu sitio corporativo o landing.',
  'cta.retorica.btn': 'Planificar tu web de marca',
  'cta.floreria.desc':
    'Construimos sitios estáticos como este—SEO local, catálogo visual, contacto por WhatsApp y despliegue en la nube sin complejidad innecesaria. Lancemos el tuyo.',
  'cta.dragonmart.desc':
    'Construimos plataformas operativas sólidas como Dragonmart—desde la presentación comercial hasta validaciones técnicas y correos automatizados (serverless). Estructuremos tus operaciones hoy mismo.',
  'cta.radiochicureo.desc':
    'Desarrollamos portales de noticias, reproductores online y paneles de administración seguros. Diseñemos tu plataforma a medida.',
  'cta.calafate.desc':
    'Construimos plataformas como Calafate Propiedades que unifican tu catálogo, administración y captación de leads en un ecosistema rápido y moderno.',
  'cta.rluabogados.desc':
    'Desarrollamos productos full-stack como Ruiz Leiva Abogados—catálogos de servicios, captación de leads y áreas privadas de administración. Coticemos tu MVP o la actualización de tu sistema actual.',
  'cta.familiainternacional.desc':
    'Diseñamos y desarrollamos sitios web que transmiten autoridad, confianza y captan clientes para firmas legales y empresas de servicios profesionales.',
  'faqPage.h1': 'FAQ: contratar desarrollo full stack con IrigoyenDev',
  'faqPage.q5': '¿En cuánto tiempo entregan?',
  'faqPage.q6': '¿Qué tecnologías usan?',
  'faqPage.q7': '¿Cómo empezamos?',
  'faqPage.a7Html':
    'Usa el <a href="/#contact">formulario de contacto</a> o escríbenos por WhatsApp. Cuéntanos el objetivo de negocio, plazo y presupuesto aproximado.',
  'shop.cta': 'Cotizar tu tienda online →',
  'shop.lead':
    'Diseñamos y desarrollamos tiendas online y marketplaces listos para vender: catálogo claro, checkout fluido, panel de administración y base técnica para aparecer en Google.',
};

const en = {
  'faq.homeDesc': 'What people ask before hiring IrigoyenDev.',
  'faq.q1': 'What services do you offer?',
  'faq.q3': 'Do you work with Chile, Spain and Denmark?',
  'faq.a3': 'Yes. We serve clients in Denmark, Chile, Spain and remote projects, in Spanish or English.',
  'faq.q4': 'Do you offer a subscription or monthly maintenance?',
  'faq.q5': 'How do we get started?',
  'contact.desc':
    'Tell us about your project and get a reply within 48 hours with a plan, timeline and investment estimate. Open to new clients.',
  'lead.eyebrow': 'How can we help?',
  'lead.title': 'Choose a service and we will prepare a plan',
  'form.message': 'Tell us about your project',
  'form.submit': 'Request a project plan',
  'form.success': 'Message received. We will reply within 48 hours.',
  'form.error': 'Something went wrong. Try again or write to us directly.',
  'testimonials.title': 'What our clients say',
  'cta.thebeebaby.desc':
    'At IrigoyenDev we design and ship full-stack products like TheBeeBaby—from UX and geo-search to payments and admin dashboards. Let’s scope your MVP or scale your existing product.',
  'cta.dahuss.desc':
    'At IrigoyenDev we ship full-stack products like Dahuss Homes—property catalogs, lead capture, private admin areas, and performance built for real traffic. Let’s scope your MVP or upgrade your current product.',
  'cta.retorica.desc':
    'At IrigoyenDev we ship Astro platforms like Retórica—immersive storytelling, content collections, fast static delivery, and contact flows that convert. Let’s scope your corporate site or landing.',
  'cta.retorica.btn': 'Plan your brand website',
  'cta.floreria.desc':
    'We build static sites like this one—local SEO, visual catalog, WhatsApp contact, and fast cloud deployment without unnecessary complexity. Let’s launch yours.',
  'cta.dragonmart.desc':
    'We build solid operational platforms like Dragonmart—from commercial presentation to technical validations and automated emails (serverless). Let’s structure your operations today.',
  'cta.radiochicureo.desc':
    'We design full-stack audio platforms, content managers, and secure admin hubs built for traffic. Let’s talk about your next project.',
  'cta.calafate.desc':
    'We build platforms like Calafate Propiedades that unify your catalog, administration, and lead capture in a fast and modern ecosystem.',
  'cta.rluabogados.desc':
    'We ship full-stack products like Ruiz Leiva Abogados—service catalogs, lead capture, private admin areas, and performance built for real traffic. Let’s scope your MVP or upgrade your current product.',
  'cta.familiainternacional.desc':
    'We design and develop websites that convey authority, trust, and capture clients for law firms and professional services companies.',
  'faqPage.h1': 'FAQ: hiring full-stack development with IrigoyenDev',
  'faqPage.q7': 'How do we get started?',
  'faqPage.a7Html':
    'Use the <a href="/#contact">contact form</a> or write to us on WhatsApp. Tell us the business goal, timeline and approximate budget.',
  'shop.cta': 'Quote your online store →',
  'shop.lead':
    'We design and build online stores and marketplaces ready to sell: clear catalog, smooth checkout, admin panel and technical foundations to rank on Google.',
  // Case-study process intros → company voice
  'proj.thebeebaby.processIntro':
    'Our team owned the product end to end—from architecture to a production-ready marketplace. Here is how it was built:',
  'proj.dahuss.processIntro':
    'Our team owned the product end to end—from structure to a deployment-ready platform. Here is how it was built:',
  'proj.retorica.processIntro':
    'Our team delivered architecture through deployment—from static generation to the contact pipeline. Here is how it was built:',
  'proj.floreria.processIntro':
    'Our team delivered the full site from structure to production deployment. Here is how it was built:',
  'proj.radiochicureo.processIntro':
    'Our team built the product end to end—focusing on performance, advertising administration, and radio portal security:',
  'proj.rluabogados.processIntro':
    'Our team owned the product end to end—from architecture to a deployment-ready platform. Here is how it was built:',
};

function merge(file, keys) {
  const p = path.join(localesDir, file);
  const cur = JSON.parse(fs.readFileSync(p, 'utf8'));
  fs.writeFileSync(p, JSON.stringify({ ...cur, ...keys }, null, 2) + '\n');
}

merge('es.json', es);
merge('en.json', en);

// Secondary langs: apply EN company-voice for shared keys (and ES where they still had Spanish freelancer stubs)
for (const code of ['da', 'de', 'fr', 'it', 'no', 'pt', 'sv']) {
  const p = path.join(localesDir, `${code}.json`);
  const cur = JSON.parse(fs.readFileSync(p, 'utf8'));
  const next = { ...cur };
  for (const [k, v] of Object.entries(en)) {
    next[k] = v;
  }
  // Keep faq/contact tone keys that marketing maps already localized — refresh from EN company voice above
  fs.writeFileSync(p, JSON.stringify(next, null, 2) + '\n');
}

// Also update marketing maps so future merges stay company-voice
const mapsPath = path.join(root, 'scripts', '_marketing-i18n-maps.json');
if (fs.existsSync(mapsPath)) {
  const maps = JSON.parse(fs.readFileSync(mapsPath, 'utf8'));
  for (const [k, v] of Object.entries(es)) {
    if (k in maps.es) maps.es[k] = v;
  }
  for (const [k, v] of Object.entries(en)) {
    if (k in maps.en) maps.en[k] = v;
  }
  fs.writeFileSync(mapsPath, JSON.stringify(maps, null, 2) + '\n');
}

const localizedPath = path.join(root, 'scripts', '_marketing-i18n-localized.json');
if (fs.existsSync(localizedPath)) {
  const loc = JSON.parse(fs.readFileSync(localizedPath, 'utf8'));
  for (const code of Object.keys(loc)) {
    for (const [k, v] of Object.entries(en)) {
      if (k in loc[code]) loc[code][k] = v;
    }
  }
  fs.writeFileSync(localizedPath, JSON.stringify(loc, null, 2) + '\n');
}

console.log('Company voice keys updated:', Object.keys(es).length, 'ES /', Object.keys(en).length, 'EN');
