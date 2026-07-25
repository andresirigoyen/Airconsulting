/**
 * Complete locale keys and document-title wiring for primary static pages.
 * Safe to run repeatedly.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const common = {
  es: {
    'meta.servicesTitle': 'Desarrollo web a medida, tiendas online y landings | IrigoyenDev',
    'meta.pricingTitle': 'Cuánto cuesta una tienda online | Precios desarrollo web Chile | IrigoyenDev',
    'meta.landingTitle': 'Landing Page de Conversión Chile | Diseño que Vende — IrigoyenDev',
    'meta.shopTitle': 'Crear tienda online Chile | Shopify, WooCommerce y a medida | IrigoyenDev',
    'geo.cl.metaTitle': 'Desarrollo Web Chile | E-commerce y Plataformas — IrigoyenDev',
    'geo.cl.metaDesc': 'Desarrollo web, e-commerce y plataformas a medida para empresas en Santiago, Valparaíso, Concepción, Antofagasta y todo Chile. Atención remota con foco regional.',
    'geo.cl.eyebrow': 'Chile · Cobertura nacional',
    'geo.cl.h1': 'Desarrollo web para empresas en todo Chile',
    'geo.cl.lead': 'No competimos solo por “desarrollo web Chile”: publicamos páginas regionales con copy e industria local. En Santiago priorizamos startups, tecnología y servicios de la capital — sin excluir comercio, industria ni pymes — y en regiones el tono sigue la economía local.',
    'geo.cl.ctaPrimary': 'Cotizar proyecto en Chile →',
    'geo.cl.ctaSecondary': 'Ver servicios →',
    'geo.cl.intro1': 'Trabajamos 100 % remoto con clientes en regiones, con comunicación en español, plazos claros y entrega en la nube.',
    'geo.cl.intro2': 'Elige tu región o revisa Santiago para un enfoque alineado a tu mercado.',
    'geo.cl.region1Desc': 'Para comercios, turismo, inmobiliarias y pymes creativas de la Quinta Región que necesitan vender o captar leads online sin depender solo de Instagram.',
    'geo.cl.region2Desc': 'Para empresas de manufactura, forestal, educación y servicios B2B que necesitan catálogos, paneles internos o sitios corporativos serios.',
    'geo.cl.region3Desc': 'Para proveedores mineros, contratistas y empresas de servicios industriales que necesitan portales internos, gestión de proveedores o presencia digital confiable.',
    'geo.cl.faq1q': '¿Atienden fuera de Santiago?',
    'geo.cl.faq1a': 'Sí. Desarrollamos de forma remota para Valparaíso, Viña del Mar, Concepción, Antofagasta, Puerto Montt y el resto de Chile, además de clientes internacionales.',
    'geo.cl.faq2q': '¿Tienen oficina física en cada región?',
    'geo.cl.faq2a': 'No. Operamos como área de servicio remota. La calidad del producto y la comunicación importan más que una dirección local inventada.',
    'blog.metaTitle': 'Blog IrigoyenDev | E-commerce, leads y desarrollo web en Chile',
    'blog.metaDesc': 'Artículos prácticos sobre e-commerce en Chile, captación de leads, pasarelas de pago y desarrollo web para empresas en regiones.',
    'blog.eyebrow': 'Recursos · Chile',
    'blog.h1': 'Blog: desarrollo web, e-commerce y leads en Chile',
    'blog.lead': 'Contenido informacional para empresas que investigan cómo digitalizarse — antes de contratar. Enfoque práctico, sin relleno.',
    'blog.readArticle': 'Leer artículo →',
    'blog.noticeEs': 'Los artículos de este blog están disponibles en español.',
  },
  en: {
    'meta.servicesTitle': 'Custom web development, online stores and landing pages | IrigoyenDev',
    'meta.pricingTitle': 'Web development and online store pricing | IrigoyenDev',
    'meta.landingTitle': 'Conversion Landing Pages in Chile | IrigoyenDev',
    'meta.shopTitle': 'Create an Online Store in Chile | Shopify, WooCommerce & Custom | IrigoyenDev',
    'geo.cl.metaTitle': 'Web Development in Chile | E-commerce & Platforms — IrigoyenDev',
    'geo.cl.metaDesc': 'Custom web development, e-commerce and platforms for companies across Santiago, Valparaíso, Concepción, Antofagasta and Chile.',
    'geo.cl.eyebrow': 'Chile · Nationwide coverage',
    'geo.cl.h1': 'Web development for companies across Chile',
    'geo.cl.lead': 'Regional web development shaped around each market. In Santiago we prioritize startups, technology and professional services; in other regions, the approach follows the local economy.',
    'geo.cl.ctaPrimary': 'Request a project quote in Chile →',
    'geo.cl.ctaSecondary': 'View services →',
    'geo.cl.intro1': 'We work fully remotely with clients across Chile, with clear communication, defined timelines and cloud delivery.',
    'geo.cl.intro2': 'Choose your region or explore Santiago for an approach aligned with your market.',
    'geo.cl.region1Desc': 'For retail, tourism, real estate and creative SMEs in Valparaíso that need online sales or lead generation beyond Instagram.',
    'geo.cl.region2Desc': 'For manufacturing, forestry, education and B2B service companies that need catalogs, internal dashboards or credible corporate websites.',
    'geo.cl.region3Desc': 'For mining suppliers, contractors and industrial service companies that need internal portals, supplier management or a credible digital presence.',
    'geo.cl.faq1q': 'Do you work outside Santiago?',
    'geo.cl.faq1a': 'Yes. We work remotely with clients in Valparaíso, Viña del Mar, Concepción, Antofagasta, Puerto Montt and throughout Chile, as well as internationally.',
    'geo.cl.faq2q': 'Do you have a physical office in every region?',
    'geo.cl.faq2a': 'No. We operate remotely. Product quality and clear communication matter more than claiming a local address.',
    'blog.metaTitle': 'IrigoyenDev Blog | E-commerce, leads and web development in Chile',
    'blog.metaDesc': 'Practical articles about e-commerce, lead generation, payment gateways and web development for companies in Chile.',
    'blog.eyebrow': 'Resources · Chile',
    'blog.h1': 'Blog: web development, e-commerce and leads in Chile',
    'blog.lead': 'Practical content for companies researching how to go digital before hiring a provider.',
    'blog.readArticle': 'Read article →',
    'blog.noticeEs': 'Articles in this blog are available in Spanish.',
  },
  da: {
    'meta.servicesTitle': 'Skræddersyet webudvikling, webshops og landingssider | IrigoyenDev',
    'meta.pricingTitle': 'Priser på webudvikling og webshop | IrigoyenDev',
    'meta.landingTitle': 'Konverterende landingssider i Chile | IrigoyenDev',
    'meta.shopTitle': 'Opret en webshop i Chile | Shopify, WooCommerce og specialudvikling | IrigoyenDev',
    'geo.cl.metaTitle': 'Webudvikling i Chile | E-commerce og platforme — IrigoyenDev',
    'geo.cl.metaDesc': 'Skræddersyet webudvikling, e-commerce og platforme til virksomheder i Santiago, Valparaíso, Concepción, Antofagasta og resten af Chile.',
    'geo.cl.eyebrow': 'Chile · Landsdækkende service',
    'geo.cl.h1': 'Webudvikling til virksomheder i hele Chile',
    'geo.cl.lead': 'Regional webudvikling tilpasset hvert marked. I Santiago prioriterer vi startups, teknologi og professionelle tjenester; i regionerne følger tilgangen den lokale økonomi.',
    'geo.cl.ctaPrimary': 'Få et tilbud på et projekt i Chile →',
    'geo.cl.ctaSecondary': 'Se tjenester →',
    'geo.cl.intro1': 'Vi arbejder 100 % remote med kunder i hele Chile med tydelig kommunikation, faste tidsplaner og levering i skyen.',
    'geo.cl.intro2': 'Vælg din region, eller udforsk Santiago for en tilgang, der passer til dit marked.',
    'geo.cl.region1Desc': 'Til handel, turisme, ejendom og kreative SMV’er i Valparaíso, som vil sælge eller skaffe leads online uden kun at være afhængige af Instagram.',
    'geo.cl.region2Desc': 'Til virksomheder inden for produktion, skovbrug, uddannelse og B2B, som har brug for kataloger, interne dashboards eller troværdige firmwebsites.',
    'geo.cl.region3Desc': 'Til mineleverandører, entreprenører og industriservicevirksomheder, som har brug for interne portaler, leverandørstyring eller en troværdig digital tilstedeværelse.',
    'geo.cl.faq1q': 'Arbejder I uden for Santiago?',
    'geo.cl.faq1a': 'Ja. Vi arbejder remote med kunder i Valparaíso, Viña del Mar, Concepción, Antofagasta, Puerto Montt og resten af Chile samt internationalt.',
    'geo.cl.faq2q': 'Har I et fysisk kontor i hver region?',
    'geo.cl.faq2a': 'Nej. Vi arbejder remote. Produktkvalitet og tydelig kommunikation betyder mere end en opdigtet lokal adresse.',
    'blog.metaTitle': 'IrigoyenDev Blog | E-commerce, leads og webudvikling i Chile',
    'blog.metaDesc': 'Praktiske artikler om e-commerce, leadgenerering, betalingsløsninger og webudvikling for virksomheder i Chile.',
    'blog.eyebrow': 'Ressourcer · Chile',
    'blog.h1': 'Blog: webudvikling, e-commerce og leads i Chile',
    'blog.lead': 'Praktisk indhold til virksomheder, der undersøger digitalisering, før de vælger en leverandør.',
    'blog.readArticle': 'Læs artikel →',
    'blog.noticeEs': 'Artiklerne på denne blog er tilgængelige på spansk.',
    'services.cta': 'Se tjenester',
    'services.ctaShop': 'Se e-commerce',
    'services.ctaLand': 'Se landingssider',
    'services.ctaSeo': 'Se basis-SEO',
    'services.ctaGeo': 'Se SEO & GEO',
    'services.ctaMkt': 'Se marketing',
    'services.ctaWm': 'Se Care-planer',
    'proj.calafate.problemTitle': 'Problemet',
    'proj.calafate.feat2Title': 'Ensartede data',
    'proj.calafate.adminShowcaseTitle': 'Administrationspanel',
    'proj.rluabogados.valueTitle': 'Forretningsværdi',
    'proj.rluabogados.problemTitle': 'Problemet',
    'proj.familiainternacional.liveBtn': 'Besøg website →',
    'proj.familiainternacional.problemTitle': 'Problemet',
    'proj.familiainternacional.valueTitle': 'Forretningsværdi',
    'proj.ava7.problemTitle': 'Problemet',
  },
  no: {
    'meta.servicesTitle': 'Skreddersydd webutvikling, nettbutikker og landingssider | IrigoyenDev',
    'meta.pricingTitle': 'Priser på webutvikling og nettbutikk | IrigoyenDev',
    'meta.landingTitle': 'Konverterende landingssider i Chile | IrigoyenDev',
    'meta.shopTitle': 'Opprett nettbutikk i Chile | Shopify, WooCommerce og skreddersøm | IrigoyenDev',
    'geo.cl.metaTitle': 'Webutvikling i Chile | E-handel og plattformer — IrigoyenDev',
    'geo.cl.metaDesc': 'Skreddersydd webutvikling, e-handel og plattformer for bedrifter i Santiago, Valparaíso, Concepción, Antofagasta og resten av Chile.',
    'geo.cl.eyebrow': 'Chile · Landsdekkende service',
    'geo.cl.h1': 'Webutvikling for bedrifter i hele Chile',
    'geo.cl.lead': 'Regional webutvikling tilpasset hvert marked. I Santiago prioriterer vi oppstartsbedrifter, teknologi og profesjonelle tjenester; i regionene følger tilnærmingen den lokale økonomien.',
    'geo.cl.ctaPrimary': 'Be om tilbud på et prosjekt i Chile →',
    'geo.cl.ctaSecondary': 'Se tjenester →',
    'geo.cl.intro1': 'Vi jobber 100 % eksternt med kunder i hele Chile, med tydelig kommunikasjon, avtalte tidsplaner og levering i skyen.',
    'geo.cl.intro2': 'Velg regionen din, eller utforsk Santiago for en tilnærming tilpasset markedet ditt.',
    'geo.cl.region1Desc': 'For handel, turisme, eiendom og kreative småbedrifter i Valparaíso som vil selge eller skaffe leads på nett uten bare å være avhengige av Instagram.',
    'geo.cl.region2Desc': 'For bedrifter innen produksjon, skogbruk, utdanning og B2B som trenger kataloger, interne dashbord eller troverdige bedriftsnettsteder.',
    'geo.cl.region3Desc': 'For gruveleverandører, entreprenører og industriservicebedrifter som trenger interne portaler, leverandørstyring eller en troverdig digital tilstedeværelse.',
    'geo.cl.faq1q': 'Jobber dere utenfor Santiago?',
    'geo.cl.faq1a': 'Ja. Vi jobber eksternt med kunder i Valparaíso, Viña del Mar, Concepción, Antofagasta, Puerto Montt og resten av Chile, samt internasjonalt.',
    'geo.cl.faq2q': 'Har dere et fysisk kontor i hver region?',
    'geo.cl.faq2a': 'Nei. Vi jobber eksternt. Produktkvalitet og tydelig kommunikasjon betyr mer enn en oppdiktet lokal adresse.',
    'blog.metaTitle': 'IrigoyenDev-blogg | E-handel, leads og webutvikling i Chile',
    'blog.metaDesc': 'Praktiske artikler om e-handel, leadgenerering, betalingsløsninger og webutvikling for bedrifter i Chile.',
    'blog.eyebrow': 'Ressurser · Chile',
    'blog.h1': 'Blogg: webutvikling, e-handel og leads i Chile',
    'blog.lead': 'Praktisk innhold for bedrifter som undersøker digitalisering før de velger leverandør.',
    'blog.readArticle': 'Les artikkel →',
    'blog.noticeEs': 'Artiklene i denne bloggen er tilgjengelige på spansk.',
    'services.cta': 'Se tjenester',
    'services.ctaShop': 'Se e-handel',
    'services.ctaLand': 'Se landingssider',
    'services.ctaSeo': 'Se grunnleggende SEO',
    'services.ctaGeo': 'Se SEO & GEO',
    'services.ctaMkt': 'Se markedsføring',
    'services.ctaWm': 'Se Care-planer',
    'proj.calafate.problemTitle': 'Problemet',
    'proj.calafate.feat2Title': 'Konsistente data',
    'proj.calafate.adminShowcaseTitle': 'Administrasjonspanel',
    'proj.rluabogados.valueTitle': 'Forretningsverdi',
    'proj.rluabogados.problemTitle': 'Problemet',
    'proj.familiainternacional.liveBtn': 'Besøk nettstedet →',
    'proj.familiainternacional.problemTitle': 'Problemet',
    'proj.familiainternacional.valueTitle': 'Forretningsverdi',
    'proj.ava7.problemTitle': 'Problemet',
  },
};

const projectTitles = {
  es: {
    thebeebaby: 'Proyecto tienda online TheBeeBaby | Caso e-commerce IrigoyenDev',
    dahuss: 'Dahuss Homes — Plataforma inmobiliaria digital | Caso IrigoyenDev',
    retorica: 'Retórica Company — Web de eventos y marketing | Caso IrigoyenDev',
    floreria: 'Florería en Valparaíso — Caso de éxito Quinta Región | IrigoyenDev',
    dragonmart: 'Dragonmart — Desarrollo web para negocios B2B | Caso IrigoyenDev',
    radiochicureo: 'Radio Chicureo — Plataforma de radio online | Caso IrigoyenDev',
    calafate: 'Plataforma inmobiliaria Calafate Propiedades | Caso IrigoyenDev',
    rluabogados: 'RLU Abogados — Plataforma legal corporativa | Caso IrigoyenDev',
    familiainternacional: 'Familia Internacional — Web estudio jurídico | Caso IrigoyenDev',
    ava7: 'AVA7 Propiedades — Web inmobiliaria Viña del Mar | Caso IrigoyenDev',
  },
  en: {
    thebeebaby: 'TheBeeBaby Online Store Project | IrigoyenDev E-commerce Case Study',
    dahuss: 'Dahuss Homes — Digital Real Estate Platform | IrigoyenDev Case Study',
    retorica: 'Retórica Company — Events and Marketing Website | IrigoyenDev Case Study',
    floreria: 'Valparaíso Flower Shop — IrigoyenDev Case Study',
    dragonmart: 'Dragonmart — B2B Web Development | IrigoyenDev Case Study',
    radiochicureo: 'Radio Chicureo — Online Radio Platform | IrigoyenDev Case Study',
    calafate: 'Calafate Propiedades Real Estate Platform | IrigoyenDev Case Study',
    rluabogados: 'RLU Abogados — Corporate Legal Platform | IrigoyenDev Case Study',
    familiainternacional: 'Familia Internacional — Law Firm Website | IrigoyenDev Case Study',
    ava7: 'AVA7 Propiedades — Viña del Mar Real Estate Website | IrigoyenDev Case Study',
  },
  da: {
    thebeebaby: 'TheBeeBaby-webshop | IrigoyenDev e-commerce-case',
    dahuss: 'Dahuss Homes — Digital ejendomsplatform | IrigoyenDev-case',
    retorica: 'Retórica Company — Event- og marketingwebsite | IrigoyenDev-case',
    floreria: 'Blomsterbutik i Valparaíso — IrigoyenDev-case',
    dragonmart: 'Dragonmart — B2B-webudvikling | IrigoyenDev-case',
    radiochicureo: 'Radio Chicureo — Online radioplatform | IrigoyenDev-case',
    calafate: 'Calafate Propiedades ejendomsplatform | IrigoyenDev-case',
    rluabogados: 'RLU Abogados — Juridisk virksomhedsplatform | IrigoyenDev-case',
    familiainternacional: 'Familia Internacional — Website til advokatfirma | IrigoyenDev-case',
    ava7: 'AVA7 Propiedades — Ejendomswebsite i Viña del Mar | IrigoyenDev-case',
  },
  no: {
    thebeebaby: 'TheBeeBaby-nettbutikk | IrigoyenDev e-handelscase',
    dahuss: 'Dahuss Homes — Digital eiendomsplattform | IrigoyenDev-case',
    retorica: 'Retórica Company — Arrangements- og markedsføringsnettsted | IrigoyenDev-case',
    floreria: 'Blomsterbutikk i Valparaíso — IrigoyenDev-case',
    dragonmart: 'Dragonmart — B2B-webutvikling | IrigoyenDev-case',
    radiochicureo: 'Radio Chicureo — Nettradioplattform | IrigoyenDev-case',
    calafate: 'Calafate Propiedades eiendomsplattform | IrigoyenDev-case',
    rluabogados: 'RLU Abogados — Juridisk bedriftsplattform | IrigoyenDev-case',
    familiainternacional: 'Familia Internacional — Nettsted for advokatfirma | IrigoyenDev-case',
    ava7: 'AVA7 Propiedades — Eiendomsnettsted i Viña del Mar | IrigoyenDev-case',
  },
};

for (const lang of ['es', 'en', 'da', 'no', 'de', 'fr', 'it', 'pt', 'sv']) {
  const file = path.join(root, 'locales', `${lang}.json`);
  const locale = JSON.parse(fs.readFileSync(file, 'utf8'));
  const source = common[lang] || common.en;
  Object.assign(locale, source);
  const titles = projectTitles[lang] || projectTitles.en;
  for (const [slug, title] of Object.entries(titles)) {
    locale[`proj.${slug}.metaTitle`] = title;
  }
  fs.writeFileSync(file, `${JSON.stringify(locale, null, 2)}\n`);
}

const staticPages = {
  'servicios.html': 'meta.servicesTitle',
  'precios.html': 'meta.pricingTitle',
  'landing-pages.html': 'meta.landingTitle',
  'crear-tienda-online.html': 'meta.shopTitle',
};

for (const [relative, key] of Object.entries(staticPages)) {
  const file = path.join(root, relative);
  let html = fs.readFileSync(file, 'utf8');
  html = html.replace(
    /<html lang="([^"]+)"(?: data-i18n-title="[^"]+")?>/,
    `<html lang="$1" data-i18n-title="${key}">`
  );
  fs.writeFileSync(file, html);
}

for (const slug of Object.keys(projectTitles.es)) {
  const file = path.join(root, 'projects', `${slug}.html`);
  let html = fs.readFileSync(file, 'utf8');
  html = html.replace(
    /<html lang="([^"]+)"(?: data-i18n-title="[^"]+")?>/,
    `<html lang="$1" data-i18n-title="proj.${slug}.metaTitle">`
  );
  html = html
    .replace(/<button id="theme-toggle"[^>]*>/, (tag) => {
      const withLabel = tag.replace(/aria-label="[^"]*"/, 'aria-label="Cambiar tema"');
      return withLabel.includes('data-i18n-aria=')
        ? withLabel
        : withLabel.replace('aria-label=', 'data-i18n-aria="a11y.theme" aria-label=');
    })
    .replace(/<button id="lang-menu-btn"[^>]*>/, (tag) => {
      const withLabel = tag.replace(/aria-label="[^"]*"/, 'aria-label="Seleccionar idioma"');
      return withLabel.includes('data-i18n-aria=')
        ? withLabel
        : withLabel.replace('aria-label=', 'data-i18n-aria="a11y.lang" aria-label=');
    })
    .replace(/<a[^>]*class="whatsapp-widget"[^>]*>/, (tag) => {
      const withLabel = tag.replace(/aria-label="[^"]*"/, 'aria-label="Chatear por WhatsApp"');
      return withLabel.includes('data-i18n-aria=')
        ? withLabel
        : withLabel.replace('aria-label=', 'data-i18n-aria="a11y.whatsapp" aria-label=');
    })
    .replace(
      '<nav class="site-footer__col" aria-label="Servicios">',
      '<nav class="site-footer__col" aria-label="Servicios" data-i18n-aria="footer.servicesHeading">'
    )
    .replace(
      '<nav class="site-footer__col" aria-label="Sitio">',
      '<nav class="site-footer__col" aria-label="Sitio" data-i18n-aria="footer.siteHeading">'
    );
  fs.writeFileSync(file, html);
}

console.log('Primary i18n gaps patched.');
