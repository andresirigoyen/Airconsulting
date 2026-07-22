/**
 * Replaces site footers with the structured 3-column IrigoyenDev footer.
 * Skips pages/cotizacion.html
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildFooter } from './lib/page-chrome.mjs';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

const FOOTER = buildFooter();

function walk(dir) {
  const out = [];
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) {
      if (['node_modules', '.git', 'scripts', 'images', 'locales', 'css', 'js'].includes(name))
        continue;
      out.push(...walk(p));
    } else if (name.endsWith('.html') && name !== 'cotizacion.html') {
      out.push(p);
    }
  }
  return out;
}

for (const file of walk(root)) {
  let html = fs.readFileSync(file, 'utf8');
  if (!/<footer[\s>]/i.test(html)) continue;

  const next = html.replace(/<footer[\s\S]*?<\/footer>/i, FOOTER);
  if (next === html) {
    console.warn('No change', path.relative(root, file));
    continue;
  }
  fs.writeFileSync(file, next);
  console.log('Footer updated', path.relative(root, file));
}
