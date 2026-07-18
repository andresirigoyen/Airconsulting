import fs from 'fs';

let html = fs.readFileSync('index.html', 'utf8');
const map = {
  'RLU Abogados Corporate Platform': 'Ruiz Leiva Abogados — vista previa',
  'Familia Internacional Law Firm Platform': 'Familia Internacional — vista previa',
  'DragonMart Corporate Platform': 'Dragonmart — vista previa',
  'Retorica Platform thumbnail': 'Retórica — vista previa',
  'Floreria Platform thumbnail': 'Florería El Nuevo Pensamiento — vista previa',
  'Radio Chicureo Platform': 'Radio Chicureo — vista previa',
};

for (const [a, b] of Object.entries(map)) {
  const from = `alt="${a}"`;
  const to = `alt="${b}"`;
  if (html.includes(from)) {
    html = html.split(from).join(to);
    console.log('fixed', a);
  } else {
    console.log('miss', a);
  }
}

fs.writeFileSync('index.html', html);
