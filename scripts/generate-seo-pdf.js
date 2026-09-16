/**
 * Genera docs/seo-enfoque-ejemplo.pdf desde docs/seo-enfoque-ejemplo.html
 * Usa Edge o Chrome headless (sin dependencias npm).
 */
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const htmlPath = path.join(ROOT, 'docs', 'seo-enfoque-ejemplo.html');
const pdfPath = path.join(ROOT, 'docs', 'seo-enfoque-ejemplo.pdf');

const browsers = [
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  path.join(process.env.LOCALAPPDATA || '', 'Google\\Chrome\\Application\\chrome.exe'),
];

const executablePath = browsers.find((p) => fs.existsSync(p));
if (!executablePath) {
  console.error('No se encontró Edge ni Chrome para generar el PDF.');
  process.exit(1);
}

if (!fs.existsSync(htmlPath)) {
  console.error('Falta el HTML:', htmlPath);
  process.exit(1);
}

const fileUrl = `file:///${htmlPath.replace(/\\/g, '/')}`;
const args = [
  '--headless=new',
  '--disable-gpu',
  '--no-sandbox',
  `--print-to-pdf=${pdfPath}`,
  '--print-to-pdf-no-header',
  fileUrl,
];

console.log('Generando PDF con:', executablePath);
const child = spawn(executablePath, args, { stdio: 'inherit', windowsHide: true });

child.on('close', (code) => {
  if (code !== 0) {
    console.error('Error al generar PDF, código:', code);
    process.exit(code || 1);
  }
  if (!fs.existsSync(pdfPath)) {
    console.error('No se creó el archivo PDF.');
    process.exit(1);
  }
  const kb = Math.round(fs.statSync(pdfPath).size / 1024);
  console.log(`PDF listo: ${pdfPath} (${kb} KB)`);
});
