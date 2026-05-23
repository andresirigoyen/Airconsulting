const fs = require('fs');
const path = require('path');

const enPath = path.join(__dirname, 'locales', 'en.json');
const esPath = path.join(__dirname, 'locales', 'es.json');

const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const esData = JSON.parse(fs.readFileSync(esPath, 'utf8'));

// Update Spanish
esData['about.desc'] = "Desarrollo productos digitales que funcionan como motores de crecimiento. No me limito a entregar código; construyo tecnología enfocada en resultados medibles. Desde tiendas online hasta sistemas de gestión complejos, cada desarrollo está diseñado con tres objetivos claros: aumentar tus ventas, automatizar tu operativa diaria y reducir costos.";
esData['about.bio'] = "Soy Andrés Irigoyen, Full-Stack Developer. Me especializo en convertir negocios tradicionales en plataformas digitales rentables. Combino el rigor técnico con una visión comercial directa: traduzco tus necesidades empresariales en software eficiente y escalable que mejora tus márgenes de ganancia y resuelve problemas operativos reales.";

// Update English
enData['about.desc'] = "I build digital products that function as growth engines. I don't just deliver code; I build technology focused on measurable results. From online stores to complex management systems, every development is designed with three clear goals: increase your sales, automate your daily operations, and reduce costs.";
enData['about.bio'] = "I'm Andrés Irigoyen, Full-Stack Developer. I specialize in transforming traditional businesses into profitable digital platforms. I combine technical rigor with a direct commercial vision: I translate your business needs into efficient, scalable software that improves your profit margins and solves real operational problems.";

fs.writeFileSync(enPath, JSON.stringify(enData, null, 2), 'utf8');
fs.writeFileSync(esPath, JSON.stringify(esData, null, 2), 'utf8');

console.log('Text updated successfully in both locales.');
