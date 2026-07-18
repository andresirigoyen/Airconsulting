const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

const files = fs.readdirSync(ROOT).filter(f => f.endsWith('.html'));

// Strategic message: ¡Hola! Vi tu portafolio y me gustaría platicar sobre un posible proyecto.
const newHref = 'https://wa.me/+4550249855?text=%C2%A1Hola!%20Vi%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20platicar%20sobre%20un%20posible%20proyecto.';

files.forEach(file => {
    let content = fs.readFileSync(path.join(ROOT, file), 'utf8');
    if (content.includes('wa.me/+4550249855"')) {
        content = content.replace('wa.me/+4550249855"', newHref + '"');
        fs.writeFileSync(path.join(ROOT, file), content);
        console.log('Updated WhatsApp link in', file);
    }
});
