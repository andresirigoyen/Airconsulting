const fs = require('fs');
const path = require('path');

const enPath = path.join(__dirname, 'locales', 'en.json');
const esPath = path.join(__dirname, 'locales', 'es.json');

const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const esData = JSON.parse(fs.readFileSync(esPath, 'utf8'));

const translations = {
  thebeebaby: {
    techStack: ["Tech: React, Node.js, Custom Dashboard", "Tech: React, Node.js, Panel a medida"],
    overviewDesc: ["Thebeebaby is a beautifully crafted e-commerce and catalog web application designed to provide a seamless shopping experience. It features a custom dashboard for administrative control and a secure authentication portal for users.", "Thebeebaby es una aplicación web de comercio electrónico y catálogo bellamente diseñada para brindar una experiencia de compra fluida. Cuenta con un panel de control a medida para la administración y un portal de autenticación seguro para los usuarios."],
    obj1: ["Deliver a high-quality, visually appealing catalog.", "Entregar un catálogo visualmente atractivo y de alta calidad."],
    obj2: ["Implement a robust user login and authentication flow.", "Implementar un flujo robusto de inicio de sesión y autenticación de usuarios."],
    obj3: ["Develop an intuitive dashboard for managing products and orders.", "Desarrollar un panel de control intuitivo para gestionar productos y pedidos."],
    mockupsDesc: ["Here is an in-depth look at the various platforms and interfaces developed for Thebeebaby, including the hero page, the catalog, the user login portal, and the administrative dashboard.", "A continuación se muestra un vistazo a las diversas plataformas e interfaces desarrolladas para Thebeebaby, incluyendo la página principal, el catálogo, el portal de inicio de sesión de usuario y el panel de control administrativo."],
    techDesc: ["The frontend architecture prioritizes component reusability and fast load times. We utilized modern CSS grids for the catalog layout to ensure responsiveness across all devices.", "La arquitectura frontend prioriza la reutilización de componentes y los tiempos de carga rápidos. Utilizamos cuadrículas CSS modernas para el diseño del catálogo garantizando la correcta visualización en todos los dispositivos."],
    techSubheading: ["Authentication Flow", "Flujo de Autenticación"],
    techSubDesc: ["Secure token-based authentication was implemented to protect user routes and the dashboard.", "Se implementó una autenticación segura basada en tokens para proteger las rutas de usuario y el panel de control."],
    resultsDesc: ["The launch of Thebeebaby resulted in a highly engaging platform that perfectly captures the brand's aesthetic while providing all the necessary e-commerce tools.", "El lanzamiento de Thebeebaby dio como resultado una plataforma altamente atractiva que captura perfectamente la estética de la marca mientras proporciona todas las herramientas de comercio electrónico necesarias."],
    res1: ["Achieved a 100% modern, fully responsive interface.", "Se logró una interfaz 100% moderna y completamente responsiva."],
    res2: ["Integrated a fully operational dashboard for business management.", "Se integró un panel de control completamente operativo para la gestión empresarial."]
  },
  dahuss: {
    techStack: ["Tech: React, Node.js, Admin Portal", "Tech: React, Node.js, Portal Administrativo"],
    overviewDesc: ["Dahuss is a modern administrative platform designed to manage robust user profiles and administrative settings. The focus was heavily on a clean, scalable interface design and a secure authentication flow.", "Dahuss es una plataforma administrativa moderna diseñada para gestionar perfiles de usuario robustos y configuraciones de administrador. El enfoque se centró en un diseño de interfaz limpio y escalable, y un flujo de autenticación seguro."],
    obj1: ["Build a highly secure, multi-role login system.", "Construir un sistema de inicio de sesión multi-rol altamente seguro."],
    obj2: ["Develop an intuitive administrative panel for managing data.", "Desarrollar un panel administrativo intuitivo para la gestión de datos."],
    obj3: ["Ensure a consistent, clean design language across all screens.", "Asegurar un lenguaje de diseño consistente y limpio en todas las pantallas."],
    mockupsDesc: ["Here is an in-depth look at the various platform interfaces developed for Dahuss, including the homepage, body content, login portal, and the dual administrative dashboard views.", "A continuación se muestra un vistazo a las diversas interfaces desarrolladas para Dahuss, incluyendo la página principal, el contenido, el portal de inicio de sesión y las vistas duales del panel administrativo."],
    techDesc: ["For Dahuss, the state management required a solid architecture to handle complex administrative rules seamlessly without compromising performance.", "Para Dahuss, la gestión del estado requirió una arquitectura sólida para manejar reglas administrativas complejas sin problemas ni comprometer el rendimiento."],
    techSubheading: ["Role-Based Access Control (RBAC)", "Control de Acceso Basado en Roles (RBAC)"],
    techSubDesc: ["We implemented dynamic rendering based on the user's role to securely guard the administrative routes directly on the client side, paired with robust backend checks.", "Implementamos renderizado dinámico basado en el rol del usuario para proteger las rutas administrativas directamente del lado del cliente, complementado con verificaciones robustas en el backend."],
    resultsDesc: ["Dahuss successfully met all requirements, deploying a powerful yet easy-to-navigate administrative system.", "Dahuss cumplió con éxito todos los requisitos, desplegando un sistema administrativo potente pero fácil de navegar."],
    res1: ["Security: Zero vulnerabilities reported in the role-based system.", "Seguridad: Cero vulnerabilidades reportadas en el sistema basado en roles."],
    res2: ["Usability: Reduced admin task completion time due to the streamlined UI.", "Usabilidad: Reducción del tiempo para completar tareas administrativas gracias a la UI optimizada."]
  },
  retorica: {
    techStack: ["Tech: Astro, Tailwind CSS, UI/UX", "Tech: Astro, Tailwind CSS, UI/UX"],
    overviewDesc: ["Retorica is a high-performance landing page developed in Astro, built to showcase services and engage users through an immersive interface. The project aimed to deliver a visually striking experience while maintaining excellent performance and usability.", "Retórica es una página de destino de alto rendimiento desarrollada en Astro, creada para mostrar servicios y atraer a los usuarios a través de una interfaz inmersiva. El proyecto tenía como objetivo ofrecer una experiencia visualmente impactante manteniendo un excelente rendimiento y usabilidad."],
    obj1: ["Create an engaging, highly visual landing experience.", "Crear una experiencia de landing altamente visual y atractiva."],
    obj2: ["Design clear, accessible service presentation pages.", "Diseñar páginas de presentación de servicios claras y accesibles."],
    obj3: ["Implement interactive forms for user engagement.", "Implementar formularios interactivos para la participación del usuario."],
    mockupsDesc: ["Below is a visual walkthrough of the platform, including the main hero view, service details, interactive universe section, and user forms.", "A continuación se muestra un recorrido visual de la plataforma, que incluye la vista principal, los detalles del servicio, la sección del universo interactivo y los formularios de usuario."],
    techDesc: ["The frontend was structured to allow smooth transitions between sections and handle dynamic content loading seamlessly.", "El frontend se estructuró para permitir transiciones suaves entre secciones y manejar la carga de contenido dinámico sin problemas."],
    techSubheading: ["Interactive Forms", "Formularios Interactivos"],
    techSubDesc: ["Forms were built with real-time validation and asynchronous submission logic to ensure a frictionless user experience.", "Los formularios se construyeron con validación en tiempo real y lógica de envío asíncrono para garantizar una experiencia de usuario sin fricciones."],
    resultsDesc: ["The platform successfully integrated a unique visual identity with solid technical foundations.", "La plataforma integró con éxito una identidad visual única con bases técnicas sólidas."],
    res1: ["Engagement: Enhanced user interaction times with the immersive 'Universo' section.", "Participación: Aumento de los tiempos de interacción del usuario con la sección inmersiva 'Universo'."],
    res2: ["Reliability: Robust form handling increasing successful lead conversions.", "Fiabilidad: Manejo robusto de formularios que aumentó las conversiones exitosas de leads."]
  },
  floreria: {
    techStack: ["Tech: E-commerce Web App", "Tech: Web App E-commerce"],
    overviewDesc: ["Floreria El Nuevo Pensamiento is an elegant e-commerce platform built to seamlessly connect customers with beautiful floral arrangements. The goal was to provide a fresh, inviting digital storefront with a smooth purchasing flow.", "Florería El Nuevo Pensamiento es una elegante plataforma de comercio electrónico construida para conectar a los clientes con hermosos arreglos florales. El objetivo era proporcionar una vitrina digital fresca y atractiva con un flujo de compra fluido."],
    obj1: ["Design a clean, visually appealing storefront.", "Diseñar una vitrina digital limpia y visualmente atractiva."],
    obj2: ["Implement an intuitive product catalog and cart system.", "Implementar un catálogo de productos y un sistema de carrito intuitivos."],
    obj3: ["Ensure a fully responsive and mobile-friendly shopping experience.", "Asegurar una experiencia de compra completamente responsiva y adaptada a dispositivos móviles."],
    mockupsDesc: ["Here is an in-depth look at the various views developed for the florist platform, highlighting the beautiful imagery and clean layout.", "A continuación se muestra un vistazo en profundidad a las diversas vistas desarrolladas para la plataforma de la florería, destacando las hermosas imágenes y el diseño limpio."],
    techDesc: ["The application leverages a component-based architecture for managing dynamic product listings and shopping cart state efficiently.", "La aplicación aprovecha una arquitectura basada en componentes para gestionar de manera eficiente los listados dinámicos de productos y el estado del carrito de compras."],
    techSubheading: ["State Management", "Gestión del Estado"],
    techSubDesc: ["Global state management was implemented to ensure the shopping cart remains synchronized across the entire platform.", "Se implementó una gestión de estado global para asegurar que el carrito de compras permanezca sincronizado en toda la plataforma."],
    resultsDesc: ["The final platform perfectly captured the brand's essence and provided a modern, secure, and fast shopping experience for its customers.", "La plataforma final capturó a la perfección la esencia de la marca y proporcionó una experiencia de compra moderna, segura y rápida para sus clientes."],
    res1: ["Usability: Increased customer retention due to a streamlined checkout process.", "Usabilidad: Aumento de la retención de clientes gracias a un proceso de pago optimizado."],
    res2: ["Design: A fresh and elegant aesthetic that highlights the floral products.", "Diseño: Una estética fresca y elegante que resalta los productos florales."]
  }
};

for (const [project, keys] of Object.entries(translations)) {
  for (const [key, values] of Object.entries(keys)) {
    const fullKey = `proj.${project}.${key}`;
    enData[fullKey] = values[0];
    esData[fullKey] = values[1];
  }
}

fs.writeFileSync(enPath, JSON.stringify(enData, null, 2), 'utf8');
fs.writeFileSync(esPath, JSON.stringify(esData, null, 2), 'utf8');

console.log('Successfully updated locales/en.json and locales/es.json');
