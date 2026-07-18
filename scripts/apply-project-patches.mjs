import fs from 'node:fs';

const src = JSON.parse(fs.readFileSync('scripts/_project-en-src.json', 'utf8'));
const srcKeys = Object.keys(src).sort();
const langs = ['da', 'de', 'fr', 'it', 'no', 'pt', 'sv'];

for (const code of langs) {
  const patchPath = `scripts/_patch-${code}.json`;
  if (!fs.existsSync(patchPath)) {
    console.error('MISSING patch', patchPath);
    process.exit(1);
  }
  const patch = JSON.parse(fs.readFileSync(patchPath, 'utf8'));
  const patchKeys = Object.keys(patch).sort();
  const missing = srcKeys.filter((k) => !(k in patch));
  const extra = patchKeys.filter((k) => !(k in src));
  const empty = srcKeys.filter((k) => !patch[k] || !String(patch[k]).trim());
  const stillEn = srcKeys.filter((k) => patch[k] === src[k].en && String(patch[k]).length > 30);

  console.log(`\n${code}: keys ${patchKeys.length}, missing ${missing.length}, extra ${extra.length}, empty ${empty.length}, identicalToEN ${stillEn.length}`);
  if (missing.length) console.log('  missing', missing.slice(0, 10));
  if (stillEn.length) console.log('  still EN sample', stillEn.slice(0, 8));

  // first-person residual
  const iHits = srcKeys.filter((k) => /\b(I |I'm |I've |Ich |jeg |jeg\b)/i.test(patch[k]) && !/Irigoyen/.test(patch[k]));
  if (iHits.length) console.log('  first-person?', iHits.slice(0, 5).map((k) => `${k}: ${patch[k].slice(0, 60)}`));

  const locPath = `locales/${code}.json`;
  const loc = JSON.parse(fs.readFileSync(locPath, 'utf8'));
  let n = 0;
  for (const [k, v] of Object.entries(patch)) {
    if (loc[k] !== v) {
      loc[k] = v;
      n++;
    }
  }
  fs.writeFileSync(locPath, JSON.stringify(loc, null, 2) + '\n');
  console.log(`  applied ${n} updates to ${locPath}`);
}
