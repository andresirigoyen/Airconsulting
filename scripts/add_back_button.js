const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..');

const projectFiles = [
    'projects/calafate.html',
    'projects/dahuss.html',
    'projects/dragonmart.html',
    'projects/familiainternacional.html',
    'projects/floreria.html',
    'projects/radiochicureo.html',
    'projects/retorica.html',
    'projects/rluabogados.html',
    'projects/thebeebaby.html'
];

const htmlToInsert = `        <a href="/" class="back-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
            <span data-i18n="nav.back">Back to mainpage</span>
        </a>\n`;

for (const file of projectFiles) {
    const filePath = path.join(ROOT, file);
    if (!fs.existsSync(filePath)) continue;

    let content = fs.readFileSync(filePath, 'utf8');

    // Skip if already added
    if (content.includes('nav.back')) {
        console.log(`Skipping ${file}, already has back button.`);
        continue;
    }

    const targetRegex = /<header class="project-header container fade-in">\s*/;
    if (targetRegex.test(content)) {
        content = content.replace(targetRegex, match => match + htmlToInsert);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Added back button to ${file}`);
    } else {
        console.log(`Could not find header pattern in ${file}`);
    }
}
