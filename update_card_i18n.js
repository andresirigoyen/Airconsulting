const fs = require('fs');
const path = require('path');

const enPath = path.join(__dirname, 'locales', 'en.json');
const esPath = path.join(__dirname, 'locales', 'es.json');

const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const esData = JSON.parse(fs.readFileSync(esPath, 'utf8'));

enData["about.card.name"] = "Andrés Irigoyen";
esData["about.card.name"] = "Andrés Irigoyen";

enData["about.card.title"] = "Full-Stack Developer";
esData["about.card.title"] = "Full-Stack Developer";

enData["about.card.handle"] = "andresirigoyen";
esData["about.card.handle"] = "andresirigoyen";

enData["about.card.status"] = "Available for work";
esData["about.card.status"] = "Disponible para proyectos";

enData["about.card.btn"] = "Contact Me";
esData["about.card.btn"] = "Contáctame";

fs.writeFileSync(enPath, JSON.stringify(enData, null, 2), 'utf8');
fs.writeFileSync(esPath, JSON.stringify(esData, null, 2), 'utf8');

console.log('Added ProfileCard translations');
