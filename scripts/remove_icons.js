const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

const files = ['projects/thebeebaby.html', 'projects/dahuss.html', 'projects/retorica.html', 'projects/floreria.html'];

for (const file of files) {
  const filePath = path.join(ROOT, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    // regex to remove the entire span line with feature-card__icon
    // e.g. <span class="feature-card__icon" aria-hidden="true">⚡</span>
    content = content.replace(/<span\s+class="feature-card__icon"[^>]*>.*?<\/span>\s*\n?/g, '');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Removed icons from ${file}`);
  }
}
