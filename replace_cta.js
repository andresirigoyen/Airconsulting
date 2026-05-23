const fs = require('fs');
const path = require('path');

// 1. Update JSON files
const enPath = path.join(__dirname, 'locales', 'en.json');
const esPath = path.join(__dirname, 'locales', 'es.json');

const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const esData = JSON.parse(fs.readFileSync(esPath, 'utf8'));

esData["cta.calendly"] = "Escríbeme por WhatsApp 💬";
enData["cta.calendly"] = "Chat on WhatsApp 💬";

fs.writeFileSync(enPath, JSON.stringify(enData, null, 2), 'utf8');
fs.writeFileSync(esPath, JSON.stringify(esData, null, 2), 'utf8');

// 2. Update HTML
const htmlPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

const waLink = "https://wa.me/+4550249855?text=%C2%A1Hola!%20Vi%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20platicar%20sobre%20un%20posible%20proyecto.";

// Replace the calendly link
html = html.replace(
  /<a href="https:\/\/calendly\.com\/".*?data-i18n="cta\.calendly">.*?<\/a>/, 
  `<a href="${waLink}" target="_blank" rel="noopener noreferrer" class="btn-secondary" data-i18n="cta.calendly">Chat on WhatsApp 💬</a>`
);

// Fix the typo in the bottom whatsapp widget
html = html.replace(/href="https:\/\/https:\/\/wa\.me/g, 'href="https://wa.me');

fs.writeFileSync(htmlPath, html, 'utf8');

console.log('WhatsApp CTA updated');
