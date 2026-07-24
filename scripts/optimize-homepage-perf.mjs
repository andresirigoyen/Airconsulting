/**
 * One-shot homepage perf helpers: picture/webp for mockups, icon dims, defer scripts.
 * Run: node scripts/optimize-homepage-perf.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const indexPath = path.join(root, 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

html = html.replace(
  /<img loading="lazy" decoding="async" width="800" height="600" src="(\/images\/[^"]+(?:-mockup|-mockuo)\.png)"([^>]*)>/g,
  (_m, src, rest) => {
    const webp = src.replace(/\.png$/, '.webp');
    return `<picture><source type="image/webp" srcset="${webp}"><img loading="lazy" decoding="async" width="800" height="600" src="${src}"${rest}></picture>`;
  }
);

html = html.replace(
  /(<span class="tool-badge"><img loading="lazy" decoding="async")( src=")/g,
  '$1 width="18" height="18"$2'
);

const oldScripts = `    <script src="https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.29/bundled/lenis.min.js" crossorigin="anonymous"></script>
    <script src="/js/pricing-card.js"></script>
    <script src="/js/script.js"></script>
    <script type="module" src="/js/split-text.js"></script>
    <script type="module" src="/js/orb-hero.js"></script>
    <script src="/js/profile-card.js"></script>`;

const newScripts = `    <script defer src="/js/pricing-card.js"></script>
    <script defer src="/js/profile-card.js"></script>
    <script defer src="/js/script.js"></script>`;

if (!html.includes(oldScripts)) {
  console.warn('Script block not found exactly — check index.html foot scripts manually');
} else {
  html = html.replace(oldScripts, newScripts);
}

fs.writeFileSync(indexPath, html);
console.log('Updated index.html', {
  pictures: (html.match(/<picture>/g) || []).length,
  toolBadgeDims: (html.match(/tool-badge"><img[^>]*width="18"/g) || []).length,
  deferred: html.includes('defer src="/js/script.js"'),
});
