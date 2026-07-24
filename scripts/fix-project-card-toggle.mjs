/**
 * Fix project cards: h3 outside button (valid HTML); arrow-only toggle.
 * Run: node scripts/fix-project-card-toggle.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const indexPath = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

const chevron = `<svg class="project-card__chevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>`;

const re =
  /<div class="project-content">\s*<button type="button" class="project-card__toggle" aria-expanded="false" data-i18n-aria="project.toggleDesc" aria-label="Mostrar descripción">\s*<h3([^>]*)>([\s\S]*?)<\/h3>\s*<svg class="project-card__chevron"[\s\S]*?<\/svg>\s*<\/button>\s*<div class="project-card__details">/g;

let n = 0;
html = html.replace(re, (_m, h3Attrs, h3Html) => {
  n++;
  return `<div class="project-content">
                    <div class="project-card__header">
                        <h3${h3Attrs}>${h3Html}</h3>
                        <button type="button" class="project-card__toggle" aria-expanded="false" data-i18n-aria="project.toggleDesc" aria-label="Mostrar descripción">
                            ${chevron}
                        </button>
                    </div>
                    <div class="project-card__details">`;
});

fs.writeFileSync(indexPath, html);
console.log(`Fixed ${n} toggles`);
