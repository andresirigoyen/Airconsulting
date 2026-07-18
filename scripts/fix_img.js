const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const p = path.join(ROOT, 'projects', 'projects/dragonmart.html');
let content = fs.readFileSync(p, 'utf8');
content = content.replace(/images\/Dragon Mart\//g, 'images/dragonmart/');
fs.writeFileSync(p, content, 'utf8');
console.log('Fixed all images');
