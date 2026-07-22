/**
 * Clean-URL aware site audit: broken links, aliases, sitemap, assets, i18n.
 * Run: node scripts/audit-site-health.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

const errors = [];
const warnings = [];

function existsHtml(pub) {
  const p = String(pub).replace(/^\/+|\/+$/g, '');
  if (!p) return fs.existsSync(path.join(ROOT, 'index.html'));
  const parts = p.split('/');
  const nested =
    parts.length === 1
      ? path.join(ROOT, `${parts[0]}.html`)
      : path.join(ROOT, ...parts.slice(0, -1), `${parts[parts.length - 1]}.html`);
  return (
    fs.existsSync(nested) ||
    fs.existsSync(path.join(ROOT, p, 'index.html')) ||
    fs.existsSync(path.join(ROOT, p))
  );
}

function resolveLocal(ref) {
  let clean = ref.split('#')[0].split('?')[0];
  try {
    clean = decodeURIComponent(clean);
  } catch {
    /* keep */
  }
  if (!clean.startsWith('/')) return { ok: true };
  if (clean === '/') return { ok: fs.existsSync(path.join(ROOT, 'index.html')) };
  const noSlash = clean.slice(1);
  const abs = path.join(ROOT, noSlash);
  if (path.extname(noSlash)) return { ok: fs.existsSync(abs) };
  return { ok: existsHtml(clean) };
}

function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['node_modules', '.git', '.vercel', 'scripts', 'agent-tools'].includes(e.name)) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, acc);
    else if (e.name.endsWith('.html')) acc.push(full);
  }
  return acc;
}

const htmlFiles = walk(ROOT);
const missing = new Map();

for (const file of htmlFiles) {
  const rel = path.relative(ROOT, file).replace(/\\/g, '/');
  const html = fs.readFileSync(file, 'utf8');
  const re = /(?:href|src)="([^"]+)"/g;
  let m;
  while ((m = re.exec(html))) {
    const val = m[1];
    if (/^(https?:|data:|#|mailto:|tel:)/i.test(val)) continue;
    if (!val.startsWith('/')) continue;
    if (!resolveLocal(val).ok) {
      const k = val.split('#')[0].split('?')[0];
      if (!missing.has(k)) missing.set(k, { count: 0, samples: [] });
      const o = missing.get(k);
      o.count += 1;
      if (o.samples.length < 3) o.samples.push(rel);
    }
  }
}

console.log('=== Clean-URL link audit ===');
console.log('HTML files:', htmlFiles.length);
console.log('Broken unique refs:', missing.size);
for (const [ref, o] of [...missing.entries()].sort((a, b) => b[1].count - a[1].count)) {
  console.log(`MISS ${o.count}x ${ref} ← ${o.samples.join(', ')}`);
  errors.push(`Broken link ${ref} (${o.count} refs)`);
}

const vercel = JSON.parse(fs.readFileSync(path.join(ROOT, 'vercel.json'), 'utf8'));
const badAlias = [];
for (const r of vercel.rewrites || []) {
  if (!resolveLocal(r.destination).ok) badAlias.push(r);
}
console.log('\n=== Alias rewrites ===');
console.log('total', (vercel.rewrites || []).length, 'broken dest', badAlias.length);
for (const r of badAlias) {
  console.log('BAD', r);
  errors.push(`Alias destination missing: ${r.source} → ${r.destination}`);
}

const geo = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'geo-config.json'), 'utf8'));
const slugSet = new Set(geo.entries.map((e) => e.slug));
let badRelated = 0;
for (const e of geo.entries) {
  for (const s of e.content?.relatedSlugs || []) {
    if (!slugSet.has(s)) {
      console.log('BAD related', e.slug, '→', s);
      errors.push(`relatedSlug missing: ${e.slug} → ${s}`);
      badRelated += 1;
    }
  }
}
console.log('bad relatedSlugs', badRelated);

const sm = fs.readFileSync(path.join(ROOT, 'sitemap.xml'), 'utf8');
const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
let smMiss = 0;
for (const loc of locs) {
  const u = new URL(loc);
  if (!resolveLocal(u.pathname).ok) {
    console.log('SITEMAP MISS', u.pathname);
    errors.push(`Sitemap URL missing file: ${u.pathname}`);
    smMiss += 1;
  }
}
console.log('sitemap misses', smMiss);

const imgs = [
  'images/markets/chile.jpg',
  'images/markets/spain.jpg',
  'images/markets/denmark.jpg',
  'images/markets/norway.jpg',
  'favicon.svg',
  'css/style.css',
  'js/script.js',
  'locales/es.json',
  'locales/en.json',
  '404.html',
  'servicios.html',
  'crear-tienda-online.html',
  'landing-pages.html',
  'precios.html',
  'faq.html',
  'santiago.html',
  'chile.html',
];
console.log('\n=== Critical assets ===');
for (const i of imgs) {
  const ok = fs.existsSync(path.join(ROOT, i));
  console.log(ok ? 'OK' : 'MISS', i);
  if (!ok) errors.push(`Missing asset: ${i}`);
}

const es = JSON.parse(fs.readFileSync(path.join(ROOT, 'locales', 'es.json'), 'utf8'));
const en = JSON.parse(fs.readFileSync(path.join(ROOT, 'locales', 'en.json'), 'utf8'));
const critical = [
  'hero.title',
  'home.metaTitle',
  'home.metaDesc',
  'nav.services',
  'nav.pricing',
  'nav.contact',
  'nav.projects',
];
console.log('\n=== i18n critical ===');
for (const k of critical) {
  const okEs = Boolean(es[k]);
  const okEn = Boolean(en[k]);
  console.log(okEs ? 'esOK' : 'esMISS', okEn ? 'enOK' : 'enMISS', k);
  if (!okEs) errors.push(`es.json missing ${k}`);
  if (!okEn) warnings.push(`en.json missing ${k}`);
}

// Lang "flags" / selector: ensure radios exist for locales shipped
const localeFiles = fs
  .readdirSync(path.join(ROOT, 'locales'))
  .filter((f) => f.endsWith('.json') && !f.startsWith('_'))
  .map((f) => f.replace(/\.json$/, ''));
const indexHtml = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
console.log('\n=== Lang selector vs locale files ===');
console.log('locale files:', localeFiles.join(', '));
for (const code of localeFiles) {
  const hasRadio = indexHtml.includes(`value="${code}"`);
  console.log(hasRadio ? 'OK' : 'MISS radio', code);
  if (!hasRadio) warnings.push(`index.html missing lang radio for ${code}`);
}

// Spot-check keyword aliases resolve
for (const a of [
  '/desarrollo-web-santiago',
  '/tienda-online-santiago',
  '/agencia-web-en-las-condes',
  '/desarrollo-web-en-providencia',
]) {
  const rw = (vercel.rewrites || []).find((r) => r.source === a);
  if (!rw) {
    errors.push(`Expected rewrite missing: ${a}`);
    console.log('MISS rewrite', a);
  } else if (!resolveLocal(rw.destination).ok) {
    errors.push(`Rewrite dest broken: ${a} → ${rw.destination}`);
  } else {
    console.log('OK rewrite', a, '→', rw.destination);
  }
}

console.log('\n=== Summary ===');
console.log('errors', errors.length);
console.log('warnings', warnings.length);
errors.forEach((e) => console.log('✖', e));
warnings.forEach((w) => console.log('⚠', w));

if (errors.length) process.exit(1);
console.log('✔ Site health OK (clean URLs + aliases + assets)');
