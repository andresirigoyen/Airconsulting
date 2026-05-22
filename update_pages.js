const fs = require('fs');

const selectorHTML = `
                <a href="index.html#projects" data-i18n="nav.projects">Projects</a>
                <a href="index.html#contact" data-i18n="nav.contact">Contact</a>
                <div class="lang-selector-container">
                    <button id="lang-menu-btn" class="lang-btn" aria-label="Select Language">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="2" y1="12" x2="22" y2="12"></line>
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                        </svg>
                    </button>
                    <div id="lang-dropdown" class="lang-dropdown hidden">
                        <label class="lang-option"><span class="lang-name">English</span><input type="radio" name="lang" value="en" class="lang-radio"><div class="toggle-switch"></div></label>
                        <label class="lang-option"><span class="lang-name">Español</span><input type="radio" name="lang" value="es" class="lang-radio"><div class="toggle-switch"></div></label>
                        <label class="lang-option"><span class="lang-name">Deutsch</span><input type="radio" name="lang" value="de" class="lang-radio"><div class="toggle-switch"></div></label>
                        <label class="lang-option"><span class="lang-name">Dansk</span><input type="radio" name="lang" value="da" class="lang-radio"><div class="toggle-switch"></div></label>
                        <label class="lang-option"><span class="lang-name">Norsk</span><input type="radio" name="lang" value="no" class="lang-radio"><div class="toggle-switch"></div></label>
                        <label class="lang-option"><span class="lang-name">Svenska</span><input type="radio" name="lang" value="sv" class="lang-radio"><div class="toggle-switch"></div></label>
                        <label class="lang-option"><span class="lang-name">Italiano</span><input type="radio" name="lang" value="it" class="lang-radio"><div class="toggle-switch"></div></label>
                        <label class="lang-option"><span class="lang-name">Français</span><input type="radio" name="lang" value="fr" class="lang-radio"><div class="toggle-switch"></div></label>
                        <label class="lang-option"><span class="lang-name">Português</span><input type="radio" name="lang" value="pt" class="lang-radio"><div class="toggle-switch"></div></label>
                    </div>
                </div>`;

const files = ['thebeebaby.html', 'dahuss.html', 'floreria.html', 'retorica.html'];

for(let f of files) {
  let content = fs.readFileSync(f, 'utf8');
  
  // Replace nav links
  content = content.replace(/<a href="index\.html#projects">Projects<\/a>\s*<a href="index\.html#contact">Contact<\/a>/g, selectorHTML);

  // Replace common tags
  content = content.replace(/<span>Role: Full-stack Developer<\/span>/g, '<span data-i18n="common.role">Role: Full-stack Developer</span>');
  content = content.replace(/<span>Timeline:\s*([^<]+)<\/span>/g, '<span data-i18n="common.timeline">Timeline: $1</span>');
  content = content.replace(/<h2>1\. Project Overview and Objectives<\/h2>/g, '<h2 data-i18n="common.overview">1. Project Overview and Objectives</h2>');
  content = content.replace(/<strong>Key Objectives:<\/strong>/g, '<strong data-i18n="common.objectives">Key Objectives:</strong>');
  content = content.replace(/<h2>2\. Interface &amp; Galleries<\/h2>/g, '<h2 data-i18n="common.mockups">2. Interface & Galleries</h2>');
  content = content.replace(/<h2>2\. Interface & Galleries<\/h2>/g, '<h2 data-i18n="common.mockups">2. Interface & Galleries</h2>');
  content = content.replace(/<h2>3\. Technical Implementation<\/h2>/g, '<h2 data-i18n="common.tech">3. Technical Implementation</h2>');
  content = content.replace(/<h2>4\. Results and Deliverables<\/h2>/g, '<h2 data-i18n="common.results">4. Results and Deliverables</h2>');
  content = content.replace(/Back to Projects/g, '<span data-i18n="common.back">Back to Projects</span>');
  content = content.replace(/<p>&copy; 2026 DevPortfolio\. All rights reserved\.<\/p>/g, '<p data-i18n="footer">&copy; 2026 DevPortfolio. All rights reserved.</p>');

  fs.writeFileSync(f, content);
}
console.log("Updated all project pages.");
