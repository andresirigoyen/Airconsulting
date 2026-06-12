const fs = require('fs');
const path = require('path');
const localesDir = path.join(__dirname, 'locales');
const enPath = path.join(localesDir, 'en.json');
const esPath = path.join(localesDir, 'es.json');

const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const esData = JSON.parse(fs.readFileSync(esPath, 'utf8'));

enData['filter.legal'] = 'Legal';
esData['filter.legal'] = 'Legal';

fs.writeFileSync(enPath, JSON.stringify(enData, null, 2), 'utf8');
fs.writeFileSync(esPath, JSON.stringify(esData, null, 2), 'utf8');
console.log('Added filter.legal to en.json and es.json');
