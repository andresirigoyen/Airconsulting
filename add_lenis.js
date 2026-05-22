const fs = require('fs');
const files = ['index.html', 'thebeebaby.html', 'dahuss.html', 'floreria.html', 'retorica.html', '404.html'];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Add lenis CDN before script.js if not already there
    if (!content.includes('lenis.min.js')) {
        content = content.replace('<script src="script.js"></script>', '<script src="https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.29/bundled/lenis.min.js"></script>\n    <script src="script.js"></script>');
        fs.writeFileSync(file, content);
    }
});
console.log("Lenis script added to all HTML files.");
