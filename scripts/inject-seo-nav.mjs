/**
 * Injects Servicios nav link + SEO footer links into site HTML pages.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

const NAV_SNIPPET = `<a href="/servicios" data-i18n="nav.services">Servicios</a>
                <a href="/precios" data-i18n="nav.pricing">Precios</a>`;

function walk(dir) {
  const out = [];
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) {
      if (name === 'node_modules' || name === '.git' || name === 'scripts') continue;
      out.push(...walk(p));
    } else if (name.endsWith('.html') && name !== 'cotizacion.html') {
      out.push(p);
    }
  }
  return out;
}

for (const file of walk(root)) {
  let html = fs.readFileSync(file, 'utf8');
  let changed = false;

  if (html.includes('id="nav-links"') && !html.includes('href="/servicios"')) {
    html = html.replace(
      /(<div class="nav-links" id="nav-links">\s*)/,
      `$1${NAV_SNIPPET}\n                `
    );
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, html);
    console.log('Nav updated', path.relative(root, file));
  }
}
