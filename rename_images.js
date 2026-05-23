const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, 'images', 'Dragon Mart');
const files = fs.readdirSync(dirPath);

let counter = 1;
for (const file of files) {
  if (file.startsWith('Captura de pantalla')) {
    const oldPath = path.join(dirPath, file);
    const newPath = path.join(dirPath, `dragonmart-gallery-${counter}.png`);
    fs.renameSync(oldPath, newPath);
    console.log(`Renamed: ${file} -> dragonmart-gallery-${counter}.png`);
    counter++;
  }
}
