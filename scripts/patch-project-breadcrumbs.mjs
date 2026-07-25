/**
 * Parte 3: Tag project breadcrumbs with i18n keys.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const projectsDir = path.join(root, 'projects');

const breadcrumbNav = /<nav class="geo-breadcrumb" aria-label="[^"]*">\s*<ol>\s*<li><a href="\/">Inicio<\/a><\/li>\s*<li><a href="\/#projects">Proyectos<\/a><\/li>/g;

const replacement = `<nav class="geo-breadcrumb" aria-label="Miga de pan" data-i18n-aria="geo.ui.breadcrumb">
          <ol>
            <li><a href="/" data-i18n="footer.linkHome">Inicio</a></li>
            <li><a href="/#projects" data-i18n="footer.linkProjects">Proyectos</a></li>`;

let n = 0;
for (const file of fs.readdirSync(projectsDir).filter((f) => f.endsWith('.html'))) {
  const fp = path.join(projectsDir, file);
  let html = fs.readFileSync(fp, 'utf8');
  const next = html.replace(breadcrumbNav, replacement);
  if (next !== html) {
    fs.writeFileSync(fp, next, 'utf8');
    n++;
    console.log('patched', file);
  }
}
console.log(`Breadcrumb files patched: ${n}`);
