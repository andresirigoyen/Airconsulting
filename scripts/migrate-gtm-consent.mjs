/**
 * Replace classic/eager GTM installs with consent-gated analytics across HTML pages.
 * Run: node scripts/migrate-gtm-consent.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ensureGtm, GTM_HEAD } from './lib/page-chrome.mjs';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.git') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

function ensureConsentCss(html) {
  if (html.includes('/css/consent.css')) return html;
  if (html.includes('href="/css/style.css"')) {
    return html.replace(
      'href="/css/style.css">',
      'href="/css/style.css">\n    <link rel="stylesheet" href="/css/consent.css">'
    );
  }
  return html;
}

function ensureFooterCookiesLink(html) {
  if (html.includes('data-consent-open')) return html;
  return html.replace(
    /(<li><a href="\/llms\.txt">llms\.txt<\/a><\/li>)/,
    '<li><a href="#" data-consent-open data-i18n="consent.settings">Cookies</a></li>\n                    $1'
  );
}

let n = 0;
for (const file of walk(root)) {
  const before = fs.readFileSync(file, 'utf8');
  if (!/googletagmanager|consent-analytics|GTM-KD3BBZ78|Analytics consent/i.test(before)) {
    continue;
  }
  let html = ensureGtm(before);
  html = ensureConsentCss(html);
  html = ensureFooterCookiesLink(html);
  // Drop empty GTM_NOSCRIPT leftover blank lines after body
  html = html.replace(/<body([^>]*)>\s*\n+/i, '<body$1>\n');
  if (html !== before) {
    fs.writeFileSync(file, html);
    n++;
    console.log('updated', path.relative(root, file));
  }
}

console.log(`Done. Migrated ${n} HTML files to consent-gated analytics.`);
console.log('Head snippet preview:\n', GTM_HEAD.slice(0, 120), '...');
