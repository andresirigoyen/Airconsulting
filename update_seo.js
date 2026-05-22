const fs = require('fs');
const path = require('path');

const enPath = path.join(__dirname, 'locales', 'en.json');
const esPath = path.join(__dirname, 'locales', 'es.json');

const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const esData = JSON.parse(fs.readFileSync(esPath, 'utf8'));

const newKeys = {
    "proj.thebeebaby.h1": ["Custom E-commerce Development: Thebeebaby", "Desarrollo de E-commerce a Medida: Caso Thebeebaby"],
    "proj.dahuss.h1": ["Admin Dashboard & Web Platform: Dahuss", "Panel Administrativo y App Web: Caso Dahuss"],
    "proj.retorica.h1": ["High-Performance Landing Page: Retorica", "Landing Page de Alto Rendimiento: Caso Retorica"],
    "proj.floreria.h1": ["Online Store & Custom Checkout: Floreria", "Tienda Online y Checkout a Medida: Caso Floreria"],
    
    "about.title2": ["Meet the Developer", "Conoce al Desarrollador"],
    "about.bio": ["I'm Andrés Irigoyen, a full-stack developer specialized in transforming traditional businesses into digital powerhouses. With experience building e-commerce, admin platforms, and high-converting landings, my goal is to deliver code that directly increases your sales and reduces operational costs.", "Soy Andrés Irigoyen, desarrollador full-stack especializado en transformar negocios tradicionales en potencias digitales. Con experiencia construyendo e-commerce, plataformas administrativas y landings de alta conversión, mi objetivo es entregar código que directamente aumenta tus ventas y reduce tus costos operativos."],
    
    "testimonials.title": ["What my clients say", "Lo que dicen mis clientes"],
    "testimonials.1.text": ["Andrés delivered the e-commerce in record time. Sales increased by 30% in the first month thanks to the new checkout.", "Andrés entregó el e-commerce en tiempo récord. Las ventas aumentaron un 30% en el primer mes gracias al nuevo checkout."],
    "testimonials.1.author": ["María López, CEO - Thebeebaby", "María López, CEO - Thebeebaby"],
    "testimonials.2.text": ["We needed a secure and fast admin dashboard. The result exceeded our expectations, cutting our management time in half.", "Necesitábamos un panel administrativo seguro y rápido. El resultado superó nuestras expectativas, reduciendo nuestro tiempo de gestión a la mitad."],
    "testimonials.2.author": ["Carlos Ramírez, Operations - Dahuss", "Carlos Ramírez, Operaciones - Dahuss"],
    
    "contact.budget": ["Investment Range (Optional)", "Rango de Inversión (Opcional)"],
    "contact.budget.opt1": ["Exploring options / Startup", "Explorando opciones / Startup"],
    "contact.budget.opt2": ["$1,500 - $3,000 USD", "$1,500 - $3,000 USD"],
    "contact.budget.opt3": ["$3,000 - $10,000 USD", "$3,000 - $10,000 USD"],
    "contact.budget.opt4": ["More than $10,000 USD", "Más de $10,000 USD"],
    
    "cta.calendly": ["Book a quick call (15m) 🗓️", "Agendar llamada rápida (15m) 🗓️"]
};

for (const [key, values] of Object.entries(newKeys)) {
    enData[key] = values[0];
    esData[key] = values[1];
}

fs.writeFileSync(enPath, JSON.stringify(enData, null, 2), 'utf8');
fs.writeFileSync(esPath, JSON.stringify(esData, null, 2), 'utf8');

console.log('Successfully added SEO and business keys to locales.');
