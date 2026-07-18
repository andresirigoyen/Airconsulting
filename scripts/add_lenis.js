const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');
const files = ['index.html', 'projects/thebeebaby.html', 'projects/dahuss.html', 'projects/floreria.html', 'projects/retorica.html', '404.html'];

files.forEach(file => {
    let content = fs.readFileSync(path.join(ROOT, file), 'utf8');
    
    // Add lenis CDN before script.js if not already there
    if (!content.includes('lenis.min.js')) {
        content = content.replace('<script src="script.js"></script>', '<script src="https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.29/bundled/lenis.min.js"></script>\n    <script src="script.js"></script>');
        fs.writeFileSync(path.join(ROOT, file), content);
    }
});
console.log("Lenis script added to all HTML files.");
