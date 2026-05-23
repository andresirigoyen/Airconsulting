const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// The project cards are within <div class="projects-grid">
// We can use regex to extract the articles and reorder them.

const gridStartIdx = html.indexOf('<div class="projects-grid">');
const gridEndIdx = html.indexOf('</section>', gridStartIdx);

const gridContent = html.substring(gridStartIdx, gridEndIdx);

// Extract the articles
const articles = [];
const regex = /<!-- Project Card.*?-->\s*<article class="project-card fade-in">[\s\S]*?<\/article>/g;
let match;
while ((match = regex.exec(gridContent)) !== null) {
  articles.push(match[0]);
}

if (articles.length >= 2) {
  // We need to make Thebeebaby (currently at index 1) the first card (index 0).
  // Thebeebaby is articles[1], Dragonmart is articles[0]
  
  // Let's find which one is Thebeebaby to be absolutely sure
  const thebeeIdx = articles.findIndex(a => a.includes('Thebeebaby'));
  if (thebeeIdx !== -1) {
    const thebeeCard = articles.splice(thebeeIdx, 1)[0];
    articles.unshift(thebeeCard); // put at beginning
  }
  
  // Reconstruct the grid
  const newGridContent = '<div class="projects-grid">\n            \n            ' + articles.join('\n\n            ') + '\n        </div>\n    ';
  
  const newHtml = html.substring(0, gridStartIdx) + newGridContent + html.substring(gridEndIdx);
  fs.writeFileSync(indexPath, newHtml, 'utf8');
  console.log('Reordered cards successfully.');
} else {
  console.log('Could not find enough articles.');
}
