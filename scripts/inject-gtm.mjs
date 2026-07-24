/**
 * Inject Google Tag Manager into all public HTML pages.
 * Idempotent — safe to re-run. Skips emails/.
 * Run: node scripts/inject-gtm.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { GTM_HEAD, GTM_NOSCRIPT, GTM_ID } from './lib/page-chrome.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === 'emails') {
      continue;
    }
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.isFile() && entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

let patched = 0;
let skipped = 0;

for (const file of walk(root)) {
  let html = fs.readFileSync(file, 'utf8');
  let changed = false;

  if (!html.includes('googletagmanager.com/gtm.js')) {
    if (!/<head>/i.test(html)) {
      console.warn('No <head>:', path.relative(root, file));
      skipped += 1;
      continue;
    }
    html = html.replace(/<head>/i, `<head>\n${GTM_HEAD}`);
    changed = true;
  }

  if (!html.includes('googletagmanager.com/ns.html')) {
    if (!/<body[^>]*>/i.test(html)) {
      console.warn('No <body>:', path.relative(root, file));
      skipped += 1;
      continue;
    }
    html = html.replace(/<body([^>]*)>/i, `<body$1>\n${GTM_NOSCRIPT}`);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, html);
    patched += 1;
    console.log('Patched', path.relative(root, file));
  } else {
    skipped += 1;
  }
}

console.log(`Done. patched=${patched} unchanged=${skipped}`);
