#!/usr/bin/env node
/**
 * Submit sitemap URLs to IndexNow (Bing, Yandex, Seznam, Naver).
 * Google does not support IndexNow — use Search Console for Google.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const KEY = '6pdb2ygto7mkl9ize03fhvc1x5ajrn8q';
const HOST = 'www.irigoyendev.com';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

if (!urls.length) {
  console.error('No URLs found in sitemap.xml');
  process.exit(1);
}

const body = {
  host: HOST,
  key: KEY,
  keyLocation: KEY_LOCATION,
  urlList: urls,
};

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify(body),
});

const text = await res.text();
console.log(`IndexNow → ${res.status} ${res.statusText}`);
if (text) console.log(text);
if (![200, 202].includes(res.status)) process.exit(1);
console.log(`Submitted ${urls.length} URLs`);
