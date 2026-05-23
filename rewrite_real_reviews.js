const fs = require('fs');
const path = require('path');

const enPath = path.join(__dirname, 'locales', 'en.json');
const esPath = path.join(__dirname, 'locales', 'es.json');

const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const esData = JSON.parse(fs.readFileSync(esPath, 'utf8'));

// Update Testimonial 2 (Dragonmart)
esData["testimonials.2.text"] = "\"Teníamos claro nuestro negocio en Asia, pero no cómo digitalizarlo. Andrés construyó la plataforma entera desde cero, automatizó las cotizaciones y nos dejó un sistema que funciona perfecto sin darnos dolores de cabeza.\"";
enData["testimonials.2.text"] = "\"We knew our business in Asia, but not how to digitize it. Andrés built the entire platform from scratch, automated our quotes, and left us with a perfectly running system without any headaches.\"";

// Update Testimonial 3 (Floreria ENP)
esData["testimonials.3.text"] = "\"Empezó con una hoja en blanco y nos entregó una tienda lista para vender. Lo que más destaco es que se preocupó de que los clientes nos encontraran fácil en Google y que la página volara. Un alivio total.\"";
enData["testimonials.3.text"] = "\"He started with a blank page and delivered a store ready to sell. What I appreciate most is how he made sure local customers could find us easily on Google and that the site was lightning fast. A total lifesaver.\"";

fs.writeFileSync(enPath, JSON.stringify(enData, null, 2), 'utf8');
fs.writeFileSync(esPath, JSON.stringify(esData, null, 2), 'utf8');

// Update HTML Fallback for Testimonial 3
const htmlPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

// Replace the specific text string I injected previously
html = html.replace(/"Trabajar con Andrés fue clave.*? optimización\."/, '"Empezó con una hoja en blanco y nos entregó una tienda lista para vender. Lo que más destaco es que se preocupó de que los clientes nos encontraran fácil en Google y que la página volara. Un alivio total."');

fs.writeFileSync(htmlPath, html, 'utf8');

console.log('Testimonials made more realistic.');
