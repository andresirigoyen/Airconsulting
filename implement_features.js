const fs = require('fs');
const path = require('path');

const files = ['index.html', 'thebeebaby.html', 'dahuss.html', 'floreria.html', 'retorica.html'];

const navReplacement = `
    <nav class="navbar" id="navbar">
        <div class="container" style="display:flex; justify-content:space-between; align-items:center; width:100%;">
            <a href="index.html" class="logo">DevPortfolio.</a>
            
            <div class="nav-actions">
                <button id="theme-toggle" class="theme-toggle" aria-label="Toggle Dark Mode">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                </button>

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
                </div>

                <button id="menu-toggle" class="menu-toggle" aria-label="Toggle Mobile Menu">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                </button>
            </div>
        </div>
        <div class="nav-links">
            <a href="index.html#projects" data-i18n="nav.projects">Projects</a>
            <a href="index.html#contact" data-i18n="nav.contact">Contact</a>
        </div>
    </nav>
`;

const metaTags = `
    <meta property="og:title" content="DevPortfolio | Full-Stack Developer">
    <meta property="og:description" content="Explore my high-performance technical solutions and case studies.">
    <meta property="og:image" content="https://example.com/og-image.jpg">
    <meta property="og:url" content="https://example.com">
    <meta name="twitter:card" content="summary_large_image">
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🚀</text></svg>">
`;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Add loading="lazy" to all img tags that don't have it
    content = content.replace(/<img(?!.*?loading=)[^>]*>/g, (match) => {
        return match.replace('<img', '<img loading="lazy" decoding="async"');
    });

    // Add Meta Tags
    if(!content.includes('og:title')) {
        content = content.replace('</head>', metaTags + '\n</head>');
    }

    // Replace Navbar completely
    // We use a regex that captures everything from <nav class="navbar" id="navbar"> to </nav>
    content = content.replace(/<nav class="navbar" id="navbar">[\s\S]*?<\/nav>/, navReplacement.trim());

    fs.writeFileSync(file, content);
});

// Now specific modifications for index.html
let indexContent = fs.readFileSync('index.html', 'utf8');

const contactFormHtml = `
            <form id="contact-form" class="contact-form">
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" id="name" name="name" required placeholder="John Doe">
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" required placeholder="john@example.com">
                </div>
                <div class="form-group">
                    <label for="message">Message</label>
                    <textarea id="message" name="message" rows="5" required placeholder="Tell me about your project..."></textarea>
                </div>
                <button type="submit" class="btn-submit">Send Message</button>
                <div id="form-status" class="form-status"></div>
            </form>
`;
indexContent = indexContent.replace(/<a href="mailto:hello@example\.com"[^>]*>[\s\S]*?<\/a>/, contactFormHtml);

const aboutSectionHtml = `
    <!-- About Section -->
    <section id="about" class="section container fade-in" style="padding-top: 0;">
        <div class="content-block" style="text-align: center; max-width: 800px; margin: 0 auto;">
            <h2 data-i18n="about.title">About Me</h2>
            <p data-i18n="about.desc">With over 5 years of experience in full-stack development, I build digital products that combine beautiful design with robust engineering. I specialize in modern JavaScript frameworks and serverless architectures.</p>
        </div>
    </section>
`;
if(!indexContent.includes('id="about"')) {
    indexContent = indexContent.replace('<!-- Tools Banner Section -->', aboutSectionHtml + '\n    <!-- Tools Banner Section -->');
}

fs.writeFileSync('index.html', indexContent);

// Add translation keys to locales for the new text
const localesDir = path.join(__dirname, 'locales');
const enFile = path.join(localesDir, 'en.json');
let enDict = JSON.parse(fs.readFileSync(enFile, 'utf8'));
enDict['about.title'] = 'About Me';
enDict['about.desc'] = 'With over 5 years of experience in full-stack development, I build digital products that combine beautiful design with robust engineering. I specialize in modern JavaScript frameworks and serverless architectures.';
fs.writeFileSync(enFile, JSON.stringify(enDict, null, 2));

const esFile = path.join(localesDir, 'es.json');
let esDict = JSON.parse(fs.readFileSync(esFile, 'utf8'));
esDict['about.title'] = 'Sobre Mí';
esDict['about.desc'] = 'Con más de 5 años de experiencia en desarrollo full-stack, construyo productos digitales que combinan un diseño hermoso con ingeniería robusta. Me especializo en frameworks modernos de JavaScript y arquitecturas serverless.';
fs.writeFileSync(esFile, JSON.stringify(esDict, null, 2));

console.log('Features implemented.');
