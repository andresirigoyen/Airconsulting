const fs = require('fs');
const path = require('path');

const localesDir = path.join(__dirname, 'locales');
const translations = {
    en: {
        "proj.familiainternacional.name": "Familia Internacional",
        "proj.familiainternacional.descCard": "Institutional website for a law firm specialized in International Family Law, with a premium design and bilingual support.",
        "proj.familiainternacional.eyebrow": "Case study · Law Firm Website",
        "proj.familiainternacional.h1": "Familia Internacional: Specialized Law Firm",
        "proj.familiainternacional.subtitle": "An institutional website with a premium design for a law firm focused exclusively on International Family Law, targeting a bilingual and demanding audience.",
        "proj.familiainternacional.role": "Role: UI/UX Designer & Frontend Developer",
        "proj.familiainternacional.scope": "Scope: Interface design, responsive web development, bilingual optimization, and SEO",
        "proj.familiainternacional.stackLabel": "Tech Stack",
        "proj.familiainternacional.liveBtn": "Visit website →",
        "proj.familiainternacional.problemTitle": "The Problem",
        "proj.familiainternacional.problemDesc": "The firm needed a solid and reliable digital presence communicating their unique specialization in Chile. They required a design conveying professionalism, empathy, and authority, while facilitating bilingual navigation for international clients.",
        "proj.familiainternacional.valueTitle": "Business Value",
        "proj.familiainternacional.valueDesc": "The new site positions the firm as a leader in its niche, improving the trust of international prospects and facilitating initial contact through clear and direct channels.",
        "proj.familiainternacional.capabilitiesLabel": "The platform highlights:",
        "proj.familiainternacional.cap1": "Clean and structured design facilitating the reading of complex legal services",
        "proj.familiainternacional.cap2": "Integrated bilingual support to serve cross-border families",
        "proj.familiainternacional.cap3": "Clear calls to action (schedule video call, WhatsApp chat)",
        "proj.familiainternacional.cap4": "Detailed presentation of the managing partners' profiles",
        "proj.familiainternacional.cap5": "Step-by-step working methodology explained visually",
        "proj.familiainternacional.processTitle": "Development Methodology",
        "proj.familiainternacional.processIntro": "The focus was on clarity of information and user experience. This is how the work was structured:",
        "proj.familiainternacional.step1Title": "1 — Brand analysis and UX",
        "proj.familiainternacional.step1Desc": "A sober color palette (navy blue, white) and a modern typography were defined to convey trust and seriousness, structuring the information architecture.",
        "proj.familiainternacional.step2Title": "2 — Interface Design (UI)",
        "proj.familiainternacional.step2Desc": "Creation of visual components such as service cards, timelines for the methodology, and lawyer profiles, maintaining visual consistency across all sections.",
        "proj.familiainternacional.step3Title": "3 — Frontend Development",
        "proj.familiainternacional.step3Desc": "Responsive implementation ensuring the site looks and works perfectly on both mobile devices and large desktop screens.",
        "proj.familiainternacional.step4Title": "4 — Bilingual Implementation",
        "proj.familiainternacional.step4Desc": "Configuration of the internationalization system to fluidly switch between Spanish and English, adapting legal texts without losing context.",
        "proj.familiainternacional.mockupsTitle": "Interface & product screens",
        "proj.familiainternacional.mockupsDesc": "Screenshots of the website showing the homepage, service details, methodology section, and professional profiles.",
        "proj.familiainternacional.techTitle": "Technical challenges solved",
        "proj.familiainternacional.techIntro": "Optimized to offer a fast, accessible, and professional experience to users in different parts of the world.",
        "proj.familiainternacional.feat1Title": "Flawless Adaptive Design",
        "proj.familiainternacional.feat1Desc": "Modern grids and fluid typography were used so that extensive legal information is comfortable to read on any device.",
        "proj.familiainternacional.feat2Title": "Clear Information Architecture",
        "proj.familiainternacional.feat2Desc": "Logical organization of multiple practice areas and services, using cards and visual elements to separate complex concepts.",
        "proj.familiainternacional.feat3Title": "Speed Optimization and SEO",
        "proj.familiainternacional.feat3Desc": "Fast loading of images and resources to ensure good performance in different countries, plus SEO optimization for specific legal terms.",
        "proj.familiainternacional.resultsTitle": "Conclusion & Results",
        "proj.familiainternacional.resultsDesc": "The Familia Internacional website successfully meets its goal of presenting the firm as a reference in International Family Law, with a strong corporate image and an excellent user experience.",
        "proj.familiainternacional.res1": "Solid visual identity reflecting professionalism and trust.",
        "proj.familiainternacional.res2": "Increase in international lead capture through direct channels.",
        "proj.familiainternacional.res3": "Fluid bilingual navigation facilitating interaction with global clients.",
        "cta.familiainternacional.title": "Looking to boost your law firm's digital presence?",
        "cta.familiainternacional.desc": "I design and develop websites that convey authority, trust, and capture clients for law firms and professional services companies.",
        "cta.familiainternacional.btn": "Request a website quote"
    },
    es: {
        "proj.familiainternacional.name": "Familia Internacional",
        "proj.familiainternacional.descCard": "Sitio web institucional para estudio jurídico especializado en Derecho Internacional de Familia, con diseño premium y atención bilingüe.",
        "proj.familiainternacional.eyebrow": "Caso de estudio · Sitio Web Legal",
        "proj.familiainternacional.h1": "Familia Internacional: Estudio Jurídico Especializado",
        "proj.familiainternacional.subtitle": "Un sitio web institucional con diseño premium para un estudio de abogados enfocado exclusivamente en Derecho Internacional de Familia, orientado a un público bilingüe y exigente.",
        "proj.familiainternacional.role": "Rol: Diseñador UI/UX & Desarrollador Frontend",
        "proj.familiainternacional.scope": "Alcance: Diseño de interfaz, desarrollo web responsivo, optimización bilingüe y SEO",
        "proj.familiainternacional.stackLabel": "Stack Tecnológico",
        "proj.familiainternacional.liveBtn": "Visitar sitio web →",
        "proj.familiainternacional.problemTitle": "El problema",
        "proj.familiainternacional.problemDesc": "El estudio necesitaba una presencia digital sólida y confiable que comunicara su especialización única en Chile. Requerían un diseño que transmitiera profesionalismo, empatía y autoridad, además de facilitar la navegación bilingüe para clientes internacionales.",
        "proj.familiainternacional.valueTitle": "Valor para el negocio",
        "proj.familiainternacional.valueDesc": "El nuevo sitio posiciona al estudio como líder en su nicho, mejorando la confianza de prospectos internacionales y facilitando el contacto inicial a través de canales claros y directos.",
        "proj.familiainternacional.capabilitiesLabel": "La plataforma destaca por:",
        "proj.familiainternacional.cap1": "Diseño limpio y estructurado que facilita la lectura de servicios legales complejos",
        "proj.familiainternacional.cap2": "Soporte bilingüe integrado para atender a familias transfronterizas",
        "proj.familiainternacional.cap3": "Llamados a la acción claros (agendar videollamada, chat de WhatsApp)",
        "proj.familiainternacional.cap4": "Presentación detallada de los perfiles de los abogados socios",
        "proj.familiainternacional.cap5": "Metodología de trabajo paso a paso explicada de forma visual",
        "proj.familiainternacional.processTitle": "Metodología de desarrollo",
        "proj.familiainternacional.processIntro": "El enfoque estuvo en la claridad de la información y la experiencia del usuario. Así se estructuró el trabajo:",
        "proj.familiainternacional.step1Title": "1 — Análisis de marca y UX",
        "proj.familiainternacional.step1Desc": "Se definió una paleta de colores sobria (azul marino, blanco) y una tipografía moderna para transmitir confianza y seriedad, estructurando la arquitectura de la información.",
        "proj.familiainternacional.step2Title": "2 — Diseño de interfaz (UI)",
        "proj.familiainternacional.step2Desc": "Creación de componentes visuales como tarjetas de servicios, líneas de tiempo para la metodología y perfiles de abogados, manteniendo consistencia visual en todas las secciones.",
        "proj.familiainternacional.step3Title": "3 — Desarrollo Frontend",
        "proj.familiainternacional.step3Desc": "Implementación responsiva asegurando que el sitio se vea y funcione perfectamente tanto en dispositivos móviles como en pantallas de escritorio grandes.",
        "proj.familiainternacional.step4Title": "4 — Implementación Bilingüe",
        "proj.familiainternacional.step4Desc": "Configuración del sistema de internacionalización para cambiar fluidamente entre español e inglés, adaptando los textos legales sin perder el contexto.",
        "proj.familiainternacional.mockupsTitle": "Interfaz y pantallas del producto",
        "proj.familiainternacional.mockupsDesc": "Capturas del sitio web mostrando la portada, el detalle de servicios, la sección de metodología y el perfil de los profesionales.",
        "proj.familiainternacional.techTitle": "Retos técnicos resueltos",
        "proj.familiainternacional.techIntro": "Optimizado para ofrecer una experiencia rápida, accesible y profesional a usuarios en diferentes partes del mundo.",
        "proj.familiainternacional.feat1Title": "Diseño adaptativo impecable",
        "proj.familiainternacional.feat1Desc": "Se utilizaron grillas modernas y tipografía fluida para que la extensa información legal sea cómoda de leer en cualquier dispositivo.",
        "proj.familiainternacional.feat2Title": "Arquitectura de información clara",
        "proj.familiainternacional.feat2Desc": "Organización lógica de múltiples áreas de práctica y servicios, utilizando tarjetas y elementos visuales para separar conceptos complejos.",
        "proj.familiainternacional.feat3Title": "Optimización de velocidad y SEO",
        "proj.familiainternacional.feat3Desc": "Carga rápida de imágenes y recursos para asegurar buen rendimiento en distintos países, además de optimización SEO para términos legales específicos.",
        "proj.familiainternacional.resultsTitle": "Conclusión y resultados",
        "proj.familiainternacional.resultsDesc": "El sitio web de Familia Internacional cumple con éxito su objetivo de presentar al estudio como un referente en Derecho Internacional de Familia, con una imagen corporativa fuerte y una excelente experiencia de usuario.",
        "proj.familiainternacional.res1": "Identidad visual sólida que refleja profesionalismo y confianza.",
        "proj.familiainternacional.res2": "Aumento en la captación de leads internacionales a través de canales directos.",
        "proj.familiainternacional.res3": "Navegación bilingüe fluida que facilita la interacción con clientes globales.",
        "cta.familiainternacional.title": "¿Buscas potenciar la presencia digital de tu estudio jurídico?",
        "cta.familiainternacional.desc": "Diseño y desarrollo sitios web que transmiten autoridad, confianza y captan clientes para firmas legales y empresas de servicios profesionales.",
        "cta.familiainternacional.btn": "Solicitar cotización de sitio web"
    }
};

const otherLangs = ['de', 'da', 'no', 'sv', 'it', 'fr', 'pt'];
otherLangs.forEach(lang => {
    translations[lang] = translations.en;
});

fs.readdirSync(localesDir).forEach(file => {
    if (file.endsWith('.json') && !file.startsWith('_')) {
        const langCode = file.replace('.json', '');
        const filePath = path.join(localesDir, file);
        let data = {};
        try {
            data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        } catch (e) {
            console.error('Error reading', file);
            return;
        }

        const toAdd = translations[langCode] || translations.en;
        Object.assign(data, toAdd);

        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
        console.log(`Updated ${file}`);
    }
});
