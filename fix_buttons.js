const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'style.css');
let css = fs.readFileSync(cssPath, 'utf8');

const regex = /\.btn-secondary\s*{[\s\S]*?}\s*\.btn-secondary:hover\s*{[\s\S]*?}/;

const replacement = `.btn-primary,
.btn-secondary {
    display: inline-block;
    padding: 16px 36px;
    text-decoration: none;
    border-radius: 100px;
    font-weight: 600;
    font-size: 1.05rem;
    transition: var(--transition);
}

.btn-primary {
    background: var(--text-primary);
    color: var(--bg-color);
    border: 1px solid var(--text-primary);
}

.btn-primary:hover {
    transform: translateY(-2px);
    opacity: 0.9;
    color: var(--bg-color);
}

.btn-secondary {
    background: transparent;
    color: var(--text-primary);
    border: 1px solid var(--border-color);
}

.btn-secondary:hover {
    border-color: var(--text-primary);
    transform: translateY(-2px);
}`;

css = css.replace(regex, replacement);

fs.writeFileSync(cssPath, css, 'utf8');
console.log('Button styles updated');
