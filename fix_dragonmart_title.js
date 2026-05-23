const fs = require('fs');
const path = require('path');

const enPath = path.join(__dirname, 'locales', 'en.json');
const esPath = path.join(__dirname, 'locales', 'es.json');

const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const esData = JSON.parse(fs.readFileSync(esPath, 'utf8'));

// Replace "Dragonmart.hk" with "Dragonmart" in all string values
const replaceHK = (obj) => {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = obj[key].replace(/Dragonmart\.hk/g, 'Dragonmart');
    }
  }
};

replaceHK(enData);
replaceHK(esData);

// Update H1 to match exactly the user's requested structure
esData["proj.dragonmart.h1"] = "Dragonmart: Plataforma corporativa para sourcing internacional desde Asia.";
enData["proj.dragonmart.h1"] = "Dragonmart: Corporate platform for international sourcing from Asia.";

fs.writeFileSync(enPath, JSON.stringify(enData, null, 2), 'utf8');
fs.writeFileSync(esPath, JSON.stringify(esData, null, 2), 'utf8');

// Also update index.html just in case there are static text fallback that says Dragonmart.hk
const indexPath = path.join(__dirname, 'index.html');
let indexHtml = fs.readFileSync(indexPath, 'utf8');
indexHtml = indexHtml.replace(/>Dragonmart\.hk</g, '>Dragonmart<');
indexHtml = indexHtml.replace(/>Dragonmart\.hk/g, '>Dragonmart');
fs.writeFileSync(indexPath, indexHtml, 'utf8');

// Same for dragonmart.html
const dragonPath = path.join(__dirname, 'dragonmart.html');
let dragonHtml = fs.readFileSync(dragonPath, 'utf8');
dragonHtml = dragonHtml.replace(/Dragonmart\.hk/g, 'Dragonmart');
fs.writeFileSync(dragonPath, dragonHtml, 'utf8');

console.log('Removed .hk and updated H1');
