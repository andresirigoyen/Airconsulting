const fs = require('fs');
const path = require('path');

const enPath = path.join(__dirname, 'locales', 'en.json');
const esPath = path.join(__dirname, 'locales', 'es.json');

const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const esData = JSON.parse(fs.readFileSync(esPath, 'utf8'));

esData["testimonials.1.text"] = "Llegamos con solo una idea y Andrés construyó todo el marketplace desde cero. Nos entregó una plataforma completa con pasarelas de pago, bases de datos y paneles de administración robustos. Un nivel técnico excepcional.";
esData["testimonials.1.author"] = "María López, Operaciones - Thebeebaby";
esData["testimonials.2.text"] = "Le confiamos el desarrollo integral de nuestra plataforma corporativa B2B partiendo de cero absoluto. Diseñó la arquitectura y el backend serverless dejándonos con un sistema seguro, veloz y escalable.";
esData["testimonials.2.author"] = "Carlos Ramírez, Director - Dragonmart";

enData["testimonials.1.text"] = "We came with just an idea and Andrés built the entire marketplace from scratch. He delivered a complete platform with payment gateways, databases, and robust admin panels. Exceptional technical expertise.";
enData["testimonials.1.author"] = "María López, Operations - Thebeebaby";
enData["testimonials.2.text"] = "We entrusted him with the full development of our corporate B2B platform starting from absolute scratch. He designed the architecture and serverless backend, leaving us with a secure, fast, and scalable system.";
enData["testimonials.2.author"] = "Carlos Ramírez, Director - Dragonmart";

fs.writeFileSync(enPath, JSON.stringify(enData, null, 2), 'utf8');
fs.writeFileSync(esPath, JSON.stringify(esData, null, 2), 'utf8');

console.log('Testimonials updated');
