import fs from 'fs';
import path from 'path';

const dir = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'));
const enPath = path.join(dir, 'en.json');
const enRaw = fs.readFileSync(enPath, 'utf8');
const enOrder = [...enRaw.matchAll(/^\s*"([^"]+)":/gm)].map((m) => m[1]);
const en = JSON.parse(enRaw);

for (const lang of ['de', 'da', 'no', 'sv']) {
  const pack = JSON.parse(fs.readFileSync(path.join(dir, `_pack-${lang}.json`), 'utf8'));
  const missing = enOrder.filter((k) => !(k in pack));
  if (missing.length) throw new Error(`${lang} missing keys: ${missing.join(', ')}`);
  const extra = Object.keys(pack).filter((k) => !enOrder.includes(k));
  if (extra.length) throw new Error(`${lang} extra keys: ${extra.join(', ')}`);
  const ordered = {};
  for (const k of enOrder) ordered[k] = pack[k];
  const out = path.join(dir, `${lang}.json`);
  fs.writeFileSync(out, JSON.stringify(ordered, null, 2) + '\n', 'utf8');
  console.log(`${lang}.json: ${Object.keys(ordered).length} keys`);
}
