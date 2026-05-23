const fs = require('fs');
const path = require('path');

// 1. Update CSS
const cssPath = path.join(__dirname, 'style.css');
let css = fs.readFileSync(cssPath, 'utf8');

css = css.replace(/\.testimonials-grid {[\s\S]*?@media \(min-width: 768px\) {[\s\S]*?}/, `.testimonials-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 320px), 1fr));
    gap: var(--spacing-xl);
    margin-top: var(--spacing-xl);
}`);

css = css.replace(/\.testimonial-card {[\s\S]*?}/, `.testimonial-card {
    background: var(--surface-color);
    border-radius: var(--border-radius);
    border: none;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    padding: var(--spacing-xl);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: var(--transition);
}`);

css = css.replace(/\.testimonial-card:hover {[\s\S]*?}/, `.testimonial-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}`);

fs.writeFileSync(cssPath, css, 'utf8');

// 2. Update JSON files
const enPath = path.join(__dirname, 'locales', 'en.json');
const esPath = path.join(__dirname, 'locales', 'es.json');

const enData = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const esData = JSON.parse(fs.readFileSync(esPath, 'utf8'));

esData["testimonials.3.text"] = "\"Trabajar con Andrés fue clave para estructurar nuestra presencia corporativa. Construyó nuestra plataforma web desde los cimientos y se aseguró de que cumpliera con altos estándares de optimización SEO local y performance.\"";
esData["testimonials.3.author"] = "Elena Martínez, Fundadora - Florería ENP";

enData["testimonials.3.text"] = "\"Working with Andrés was key to structuring our corporate presence. He built our web platform from the ground up and ensured it met high standards for local SEO optimization and performance.\"";
enData["testimonials.3.author"] = "Elena Martínez, Founder - Florería ENP";

fs.writeFileSync(enPath, JSON.stringify(enData, null, 2), 'utf8');
fs.writeFileSync(esPath, JSON.stringify(esData, null, 2), 'utf8');

// 3. Update HTML
const htmlPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');

const newCard = `
            <div class="testimonial-card">
                <div class="testimonial-content">
                    <p data-i18n="testimonials.3.text">"Trabajar con Andrés fue clave para estructurar nuestra presencia corporativa. Construyó nuestra plataforma web desde los cimientos y se aseguró de que cumpliera con altos estándares de optimización."</p>
                </div>
                <div class="testimonial-author">
                    <div class="author-avatar" aria-hidden="true">EM</div>
                    <strong data-i18n="testimonials.3.author">Elena Martínez, Fundadora - Florería ENP</strong>
                </div>
            </div>
        </div>`;

// Replace the closing div of the testimonials grid with the new card and closing div
html = html.replace(/<\/div>\s*<\/section>\s*<!-- Contact Section/g, newCard + '\n    </section>\n\n    <!-- Contact Section');

fs.writeFileSync(htmlPath, html, 'utf8');
console.log('Testimonials updated: grid fixed and 3rd review added');
