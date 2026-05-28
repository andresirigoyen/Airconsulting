const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const possibleBrowserPaths = [
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  path.join(process.env.USERPROFILE || '', 'AppData\\Local\\Google\\Chrome\\Application\\chrome.exe'),
  path.join(process.env.LOCALAPPDATA || '', 'Google\\Chrome\\Application\\chrome.exe')
];

let executablePath = null;
for (const p of possibleBrowserPaths) {
  if (fs.existsSync(p)) {
    executablePath = p;
    break;
  }
}

if (!executablePath) {
  console.error('No se encontró Google Chrome ni Microsoft Edge en las rutas por defecto.');
  console.error('Por favor, edita este script para especificar la ruta de tu navegador.');
  process.exit(1);
}

(async () => {
  try {
    console.log(`Iniciando Puppeteer con navegador: ${executablePath}`);
    const browser = await puppeteer.launch({
      executablePath: executablePath,
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    
    const filePath = path.resolve(__dirname, 'cotizacion.html');
    console.log(`Cargando archivo: ${filePath}`);
    await page.goto(`file://${filePath}`, { waitUntil: 'networkidle0' });
    
    console.log('Generando PDF...');
    let outputPath = 'cotizacion.pdf';
    try {
      await page.pdf({
        path: outputPath,
        format: 'A4',
        printBackground: true,
        margin: {
          top: '0px',
          bottom: '0px',
          left: '0px',
          right: '0px'
        }
      });
      console.log(`PDF generado exitosamente en: ${outputPath}`);
    } catch (e) {
      if (e.code === 'EBUSY' || e.message.includes('EBUSY') || e.message.includes('locked')) {
        outputPath = 'cotizacion_v2.pdf';
        console.warn(`cotizacion.pdf está abierto o bloqueado. Generando en su lugar: ${outputPath}`);
        await page.pdf({
          path: outputPath,
          format: 'A4',
          printBackground: true,
          margin: {
            top: '0px',
            bottom: '0px',
            left: '0px',
            right: '0px'
          }
        });
        console.log(`PDF generado exitosamente en: ${outputPath}`);
      } else {
        throw e;
      }
    }
    
    await browser.close();
  } catch (error) {
    console.error('Error al generar el PDF:', error);
    process.exit(1);
  }
})();
