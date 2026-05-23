const fs = require('fs');
const path = require('path');

const esKeys = {
  "cta.dragonmart.title": "¿Necesitas digitalizar tus procesos B2B o corporativos?",
  "cta.dragonmart.desc": "Construyo plataformas operativas sólidas como Dragonmart.hk—desde la presentación comercial hasta validaciones técnicas y correos automatizados (serverless). Estructuremos tus operaciones hoy mismo.",
  "cta.dragonmart.btn": "Solicitar plan de proyecto"
};

const enKeys = {
  "cta.dragonmart.title": "Need to digitize your B2B or corporate processes?",
  "cta.dragonmart.desc": "I build solid operational platforms like Dragonmart.hk—from commercial presentation to technical validations and automated emails (serverless). Let's structure your operations today.",
  "cta.dragonmart.btn": "Request a project plan"
};

const enPath = path.join(__dirname, 'locales', 'en.json');
const esPath = path.join(__dirname, 'locales', 'es.json');

const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const esData = JSON.parse(fs.readFileSync(esPath, 'utf8'));

Object.assign(enData, enKeys);
Object.assign(esData, esKeys);

fs.writeFileSync(enPath, JSON.stringify(enData, null, 2), 'utf8');
fs.writeFileSync(esPath, JSON.stringify(esData, null, 2), 'utf8');

// Update HTML
const htmlPath = path.join(__dirname, 'dragonmart.html');
let html = fs.readFileSync(htmlPath, 'utf8');
html = html.replace(/data-i18n="cta.thebeebaby.title".*?<\/h2>/, 'data-i18n="cta.dragonmart.title">Building a B2B platform?</h2>');
html = html.replace(/data-i18n="cta.thebeebaby.desc".*?<\/p>/, 'data-i18n="cta.dragonmart.desc">I build corporate platforms like Dragonmart.hk...</p>');
html = html.replace(/data-i18n="cta.thebeebaby.btn".*?<\/a>/, 'data-i18n="cta.dragonmart.btn">Request a project plan</a>');

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('DragonMart CTA updated.');
