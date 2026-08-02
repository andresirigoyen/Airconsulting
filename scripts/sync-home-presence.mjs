/**
 * Sync homepage #markets Chile directory from geo-config (+ presence stubs).
 * Idempotent: replaces content between AUTO markers in index.html.
 * Run: node scripts/sync-home-presence.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const indexPath = path.join(root, 'index.html');
const geoPath = path.join(root, 'data', 'geo-config.json');

const START = '<!-- AUTO:presence-chile:start -->';
const END = '<!-- AUTO:presence-chile:end -->';

function keywordAlias(slug) {
  return `/desarrollo-web-${slug}`;
}

function buildChileBlock(geo) {
  const comunas = geo.entries
    .filter((e) => e.type === 'comuna' && e.parentSlug === 'santiago')
    .map((e) => ({ city: e.city, href: keywordAlias(e.slug) }))
    .sort((a, b) => a.city.localeCompare(b.city, 'es'));

  const regions = [
    { name: 'Santiago', href: '/desarrollo-web-santiago' },
    { name: 'Valparaíso', href: '/desarrollo-web-valparaiso' },
    { name: 'Concepción', href: '/desarrollo-web-concepcion' },
    { name: 'Antofagasta', href: '/desarrollo-web-antofagasta' },
    { name: 'Temuco', href: '/desarrollo-web-temuco' },
  ];

  const regionLis = regions
    .map((r) => `                    <li><a href="${r.href}">${r.name}</a></li>`)
    .join('\n');
  const comunaLis = comunas
    .map((c) => `                    <li><a href="${c.href}">${c.city}</a></li>`)
    .join('\n');

  return `${START}
                <p class="presence__label" data-i18n="markets.cl.regionsLabel">Regiones</p>
                <ul class="presence__cities presence__cities--regions">
${regionLis}
                </ul>
                <p class="presence__label presence__label--spaced" data-i18n="markets.cl.comunasLabel">Comunas RM</p>
                <ul class="presence__cities presence__cities--scroll" data-comuna-count="${comunas.length}">
${comunaLis}
                </ul>
                ${END}`;
}

function main() {
  const geo = JSON.parse(fs.readFileSync(geoPath, 'utf8'));
  let html = fs.readFileSync(indexPath, 'utf8');
  const block = buildChileBlock(geo);

  if (html.includes(START) && html.includes(END)) {
    html = html.replace(new RegExp(`${START}[\\s\\S]*?${END}`), () => block);
  } else {
    // First run: replace curated Chile list inside first presence__col
    const needle =
      /(<div class="presence__col[^"]*"[^>]*>\s*<h3 class="presence__country"[^>]*>Chile<\/h3>\s*)([\s\S]*?)(\s*<\/div>\s*<div class="presence__col)/;
    if (!needle.test(html)) {
      throw new Error('Could not find Chile presence column in index.html — add AUTO markers first');
    }
    html = html.replace(needle, `$1\n                ${block}\n            $3`);
  }

  fs.writeFileSync(indexPath, html, 'utf8');
  const n = geo.entries.filter((e) => e.type === 'comuna' && e.parentSlug === 'santiago').length;
  console.log(`Synced homepage presence: ${n} comunas + 5 region hubs`);
}

main();
