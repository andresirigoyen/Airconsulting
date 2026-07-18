import fs from 'fs';
import path from 'path';
import http from 'http';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

function decodeRef(ref) {
  try { return decodeURIComponent(ref); } catch { return ref; }
}

function walkHtmlFiles(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory() && !['node_modules', '.git'].includes(entry.name)) walkHtmlFiles(full, acc);
    else if (entry.isFile() && entry.name.endsWith('.html')) acc.push(full);
  }
  return acc;
}

function extractRefs(html) {
  const refs = [];
  const attrRe = /(?:href|src)="([^"]+)"/g;
  let m;
  while ((m = attrRe.exec(html)) !== null) {
    const val = m[1];
    if (/^(https?:|data:|#|mailto:|tel:)/.test(val)) continue;
    refs.push(val.split('#')[0].split('?')[0]);
  }
  return refs;
}

const htmlFiles = walkHtmlFiles(ROOT);
const missing = [];
const stale = [];

const staleRes = [
  [/href="style\.css"/, 'style.css en raíz'],
  [/href="profile-card\.css"/, 'profile-card.css en raíz'],
  [/href="\/style\.css"/, '/style.css sin /css/'],
  [/src="js\//, 'JS relativo sin barra'],
  [/href="[a-z]+\.html"/, 'Enlace .html plano en raíz (case study)'],
  [/href="index\.html#/, 'index.html# en nav'],
];

for (const file of htmlFiles) {
  const rel = path.relative(ROOT, file).replace(/\\/g, '/');
  const html = fs.readFileSync(file, 'utf8');
  for (const [re, label] of staleRes) {
    if (re.test(html) && !rel.includes('scripts')) stale.push({ rel, label });
  }
  for (const ref of extractRefs(html)) {
    if (!ref.startsWith('/')) continue;
    const local = path.join(ROOT, decodeRef(ref.replace(/^\//, '')).replace(/\//g, path.sep));
    if (!fs.existsSync(local)) missing.push({ rel, ref });
  }
}

const ROUTES = ['/', '/404', '/pages/cotizacion', '/css/style.css', '/css/profile-card.css', '/js/script.js', '/js/split-text.js', '/js/orb-hero.js', '/js/profile-card.js', '/favicon.svg', '/locales/es.json', '/locales/en.json', ...['calafate','dahuss','dragonmart','familiainternacional','floreria','radiochicureo','retorica','rluabogados','thebeebaby'].map(p => `/projects/${p}`)];

function get(url) {
  return new Promise((resolve) => {
    http.get(url, (res) => { res.resume(); resolve(res.statusCode); }).on('error', () => resolve(0));
  });
}

const { spawn } = await import('child_process');
const PORT = 3461;
const srv = spawn('npx', ['serve', '.', '-l', String(PORT)], { cwd: ROOT, shell: true, stdio: 'ignore' });
await new Promise((r) => setTimeout(r, 2500));

const base = `http://localhost:${PORT}`;
const httpFail = [];
for (const route of ROUTES) {
  const status = await get(`${base}${route}`);
  if (status !== 200) httpFail.push({ route, status });
}
srv.kill();

console.log(JSON.stringify({ htmlFiles: htmlFiles.length, missing, stale, httpFail }, null, 2));
