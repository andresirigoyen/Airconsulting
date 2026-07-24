/**
 * Transform homepage project cards:
 * - image wraps link to case study
 * - title row toggles description
 * Run: node scripts/transform-project-cards.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const indexPath = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

const chevron = `<svg class="project-card__chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>`;

const cardRe =
  /<article class="project-card fade-in" data-category="([^"]+)">\s*<picture>([\s\S]*?)<\/picture>\s*<div class="project-content">\s*<h3([^>]*)>([\s\S]*?)<\/h3>\s*<p([^>]*)>([\s\S]*?)<\/p>\s*<a href="([^"]+)" class="project-link">[\s\S]*?<\/a>\s*<\/div>\s*<\/article>/g;

let n = 0;
html = html.replace(cardRe, (_m, cat, pictureInner, h3Attrs, h3Html, pAttrs, pHtml, href) => {
  n++;
  return `<article class="project-card fade-in" data-category="${cat}">
                <a href="${href}" class="project-card__media" data-i18n-aria="project.openCase" aria-label="Abrir caso de estudio">
                    <picture>${pictureInner}</picture>
                </a>
                <div class="project-content">
                    <button type="button" class="project-card__toggle" aria-expanded="false" data-i18n-aria="project.toggleDesc" aria-label="Mostrar descripción">
                        <h3${h3Attrs}>${h3Html}</h3>
                        ${chevron}
                    </button>
                    <div class="project-card__details">
                        <p${pAttrs}>${pHtml}</p>
                    </div>
                </div>
            </article>`;
});

if (n !== 10) {
  console.warn(`Expected 10 cards, transformed ${n}`);
}

fs.writeFileSync(indexPath, html);
console.log(`Transformed ${n} project cards`);
