function initMobileNav() {
    const pathname = window.location.pathname;
    const segments = pathname.split('/').filter(Boolean);
    const page = segments[segments.length - 1] || '';
    const inProjects = segments.includes('projects');
    const isCotizacion = segments.includes('pages') && (page === 'cotizacion' || page === 'cotizacion.html');
    if (isCotizacion) return;

    const isIndex = !inProjects && (page === '' || page === 'index.html');
    const isServices = page === 'servicios' || page === 'servicios.html';
    const isPricing = page === 'precios' || page === 'precios.html';
    const isLanding = page === 'landing-pages' || page === 'landing-pages.html';
    const isShop = page === 'crear-tienda-online' || page === 'crear-tienda-online.html';
    const isFaq = page === 'faq' || page === 'faq.html';

    const homeHref = '/';
    const servicesHref = '/servicios';
    const pricingHref = '/precios';
    const contactHref = '/#contact';
    const whatsappHref = 'https://wa.me/+4550249855?text=%C2%A1Hola!%20Vi%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20platicar%20sobre%20un%20posible%20proyecto.';

    let active = 'home';
    if (inProjects) active = 'home';
    else if (isServices || isLanding || isShop) active = 'services';
    else if (isPricing) active = 'pricing';
    else if (isFaq) active = 'home';
    else if (isIndex) {
        const hash = window.location.hash;
        if (hash === '#contact') active = 'contact';
        else if (hash === '#projects') active = 'home';
        else active = 'home';
    }

    const nav = document.createElement('nav');
    nav.className = 'mobile-tab-bar';
    nav.setAttribute('aria-label', 'Mobile navigation');
    nav.innerHTML = `
      <div class="mobile-tab-bar__inner">
        <a href="${homeHref}" class="mobile-tab-bar__item${active === 'home' ? ' is-active' : ''}" data-nav="home">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 10.5L12 3l9 7.5V20a1.5 1.5 0 0 1-1.5 1.5H15v-6h-6v6H4.5A1.5 1.5 0 0 1 3 20v-9.5z"/></svg>
          <span data-i18n="nav.mobile.home">Home</span>
        </a>
        <a href="${servicesHref}" class="mobile-tab-bar__item${active === 'services' ? ' is-active' : ''}" data-nav="services">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
          <span data-i18n="nav.mobile.services">Services</span>
        </a>
        <a href="${pricingHref}" class="mobile-tab-bar__item${active === 'pricing' ? ' is-active' : ''}" data-nav="pricing">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          <span data-i18n="nav.mobile.pricing">Pricing</span>
        </a>
        <a href="${contactHref}" class="mobile-tab-bar__item${active === 'contact' ? ' is-active' : ''}" data-nav="contact">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/></svg>
          <span data-i18n="nav.mobile.quote">Get a Quote</span>
        </a>
        <a href="${whatsappHref}" class="mobile-tab-bar__item" data-nav="whatsapp" target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
          <span data-i18n="nav.mobile.whatsapp">WhatsApp</span>
        </a>
      </div>
    `;

    document.body.appendChild(nav);
    document.body.classList.add('has-mobile-tab-bar');

    if (Object.keys(currentTranslations).length) {
        nav.querySelectorAll('[data-i18n]').forEach((el) => {
            const key = el.getAttribute('data-i18n');
            if (currentTranslations[key]) el.textContent = currentTranslations[key];
        });
    }

    window.addEventListener('hashchange', () => {
        if (!isIndex) return;
        const hash = window.location.hash;
        let next = 'home';
        if (hash === '#contact') next = 'contact';
        nav.querySelectorAll('.mobile-tab-bar__item').forEach((item) => {
            item.classList.toggle('is-active', item.getAttribute('data-nav') === next);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initProjectVideos();
    initMobileNav();
    // 1. Sticky Navbar shadow on scroll
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.05)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });

    // 2. Fade-in animations on scroll using IntersectionObserver
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null,
        rootMargin: '80px 0px',
        threshold: 0.05
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        observer.observe(el);
    });

    // Above-the-fold: visible on load (home hero + marketing/project headers)
    document.querySelectorAll('.hero-content.fade-in, .project-header.fade-in').forEach(el => {
        el.classList.add('visible');
    });

    // Reveal anything already in the viewport (covers SEO/marketing sections)
    requestAnimationFrame(() => {
        fadeElements.forEach(el => {
            if (el.classList.contains('visible')) return;
            const rect = el.getBoundingClientRect();
            const vh = window.innerHeight || document.documentElement.clientHeight;
            if (rect.top < vh && rect.bottom > 0) {
                el.classList.add('visible');
                observer.unobserve(el);
            }
        });
    });

    // 3. Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

function initProjectVideos() {
    const tryPlay = (video) => video.play().catch(() => {});

    document.querySelectorAll('.project-video-wrapper video, .project-showcase-video video').forEach((video) => {
        video.addEventListener('loadeddata', () => tryPlay(video), { once: true });
        tryPlay(video);
        document.addEventListener('click', () => tryPlay(video), { once: true });
        document.addEventListener('touchstart', () => tryPlay(video), { once: true, passive: true });
    });
}

// i18n Engine
const ALLOWED_LOCALES = new Set(['en', 'es', 'de', 'da', 'no', 'sv', 'it', 'fr', 'pt']);

const langMenuBtn = document.getElementById('lang-menu-btn');
const langDropdown = document.getElementById('lang-dropdown');
const langRadios = document.querySelectorAll('.lang-radio');

let currentTranslations = {};
let englishTranslations = {};

async function fetchLocale(lang) {
  if (!ALLOWED_LOCALES.has(lang)) {
    throw new Error(`Invalid locale: ${lang}`);
  }
  const response = await fetch(`/locales/${lang}.json`, { cache: 'no-cache' });
  if (!response.ok) throw new Error(`Locale ${lang} not found`);
  return response.json();
}

function applyTranslations(translations) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[key]) el.textContent = translations[key];
  });

  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (translations[key]) el.innerHTML = translations[key];
  });

  document.querySelectorAll('.mobile-tab-bar [data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[key]) el.textContent = translations[key];
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (translations[key]) el.placeholder = translations[key];
  });

  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    const key = el.getAttribute('data-i18n-aria');
    if (translations[key]) el.setAttribute('aria-label', translations[key]);
  });

  document.querySelectorAll('option[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[key]) el.textContent = translations[key];
  });

  const titleKey = document.documentElement.getAttribute('data-i18n-title');
  if (titleKey && translations[titleKey]) {
    document.title = translations[titleKey];
  }

  document.querySelectorAll('[data-i18n-content]').forEach((el) => {
    const key = el.getAttribute('data-i18n-content');
    if (key && translations[key]) el.setAttribute('content', translations[key]);
  });
}

/* —— Currency selector (USD base → EUR, CLP, DKK, NOK) —— */
const ALLOWED_CURRENCIES = new Set(['USD', 'EUR', 'CLP', 'DKK', 'NOK']);
/** List / mid-market rates vs listed USD figures.
 * EUR uses 1:1 list pricing (landing from €600, SEO from €199, etc.).
 * Other currencies are approximate mid-market conversions. */
const FX_RATES = {
  USD: 1,
  EUR: 1,
  CLP: 920,
  DKK: 6.55,
  NOK: 9.65,
};
const CURRENCY_LABELS = {
  USD: 'USD — US Dollar',
  EUR: 'EUR — Euro',
  CLP: 'CLP — Peso chileno',
  DKK: 'DKK — Dansk krone',
  NOK: 'NOK — Norsk krone',
};
const CURRENCY_LOCALES = {
  USD: 'en-US',
  EUR: 'de-DE',
  CLP: 'es-CL',
  DKK: 'da-DK',
  NOK: 'nb-NO',
};

let currentCurrency = 'CLP';

function parseUsdAmount(raw) {
  const s = String(raw).replace(/\s/g, '');
  if (/^\d{1,3}(\.\d{3})+$/.test(s)) return parseInt(s.replace(/\./g, ''), 10);
  if (/^\d{1,3}(,\d{3})+$/.test(s)) return parseInt(s.replace(/,/g, ''), 10);
  if (/^\d+[.,]\d{1,2}$/.test(s)) return parseFloat(s.replace(',', '.'));
  return parseFloat(s.replace(/[^\d.]/g, ''));
}

function formatConvertedAmount(usdAmount, currency) {
  const rate = FX_RATES[currency] || 1;
  let value = usdAmount * rate;
  if (currency === 'CLP') value = Math.round(value / 1000) * 1000;
  else value = Math.round(value);
  return new Intl.NumberFormat(CURRENCY_LOCALES[currency] || 'en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(value);
}

function rewriteUsdInString(str, currency) {
  if (!str || typeof str !== 'string') return str;
  if (currency === 'USD') return str;

  // $2,000 - $10,000 USD | More than $10,000 USD
  let out = str.replace(
    /\$\s*([\d.,]*\d)\s*[–—-]\s*\$\s*([\d.,]*\d)\s*USD/gi,
    (_, a, b) => {
      const lo = parseUsdAmount(a);
      const hi = parseUsdAmount(b);
      if (!Number.isFinite(lo) || !Number.isFinite(hi)) return _;
      return `${formatConvertedAmount(lo, currency)} – ${formatConvertedAmount(hi, currency)}`;
    }
  );
  out = out.replace(/\$\s*([\d.,]*\d)\s*USD/gi, (match, a) => {
    const n = parseUsdAmount(a);
    return Number.isFinite(n) ? formatConvertedAmount(n, currency) : match;
  });

  // ~USD 200 – 350 | USD 3.000–10.000 | from ~USD 600
  out = out.replace(
    /(~?)USD\s*([\d.,]*\d)\s*[–—-]\s*(?:USD\s*)?([\d.,]*\d)/gi,
    (match, approx, a, b) => {
      const lo = parseUsdAmount(a);
      const hi = parseUsdAmount(b);
      if (!Number.isFinite(lo) || !Number.isFinite(hi)) return match;
      return `${approx}${formatConvertedAmount(lo, currency)} – ${formatConvertedAmount(hi, currency)}`;
    }
  );
  out = out.replace(/(~?)USD\s*([\d.,]*\d)/gi, (match, approx, a) => {
    const n = parseUsdAmount(a);
    if (!Number.isFinite(n)) return match;
    return `${approx}${formatConvertedAmount(n, currency)}`;
  });

  return out;
}

function applyCurrency(currency) {
  if (!ALLOWED_CURRENCIES.has(currency)) currency = 'CLP';
  currentCurrency = currency;
  localStorage.setItem('preferredCurrency', currency);
  document.documentElement.setAttribute('data-currency', currency);

  const codeEl = document.querySelector('.currency-btn__code');
  if (codeEl) codeEl.textContent = currency;

  document.querySelectorAll('.currency-radio').forEach((radio) => {
    radio.checked = radio.value === currency;
  });

  // Re-apply from translation sources (always USD-based), then convert
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (!key || !currentTranslations[key]) return;
    el.textContent = rewriteUsdInString(currentTranslations[key], currency);
  });

  document.querySelectorAll('[data-i18n-html]').forEach((el) => {
    const key = el.getAttribute('data-i18n-html');
    if (!key || !currentTranslations[key]) return;
    el.innerHTML = rewriteUsdInString(currentTranslations[key], currency);
  });

  // Visible copy authored in USD: pricing cards, FAQ answers, marketing prose
  document
    .querySelectorAll(
      '.price-range, .money-copy, .faq-list p, details.faq-item p, article.faq-item p'
    )
    .forEach((el) => {
      if (el.hasAttribute('data-i18n') || el.hasAttribute('data-i18n-html')) return;
      if (el.hasAttribute('data-money')) return;
      if (!el.dataset.moneySource) el.dataset.moneySource = el.innerHTML.trim();
      el.innerHTML = rewriteUsdInString(el.dataset.moneySource, currency);
    });

  document.querySelectorAll('[data-money]').forEach((el) => {
    const min = parseFloat(el.getAttribute('data-money'));
    const max = el.hasAttribute('data-money-max')
      ? parseFloat(el.getAttribute('data-money-max'))
      : NaN;
    const approx = el.hasAttribute('data-money-approx');
    if (!Number.isFinite(min)) return;
    const prefix = approx ? '~' : '';
    if (Number.isFinite(max)) {
      el.textContent = `${prefix}${formatConvertedAmount(min, currency)} – ${formatConvertedAmount(max, currency)}`;
    } else {
      el.textContent = `${prefix}${formatConvertedAmount(min, currency)}`;
    }
  });
}

function initCurrencySelector() {
  const actions = document.querySelector('.nav-actions');
  if (!actions || document.getElementById('currency-menu-btn')) return;

  const saved = localStorage.getItem('preferredCurrency') || 'CLP';
  currentCurrency = ALLOWED_CURRENCIES.has(saved) ? saved : 'CLP';

  const wrap = document.createElement('div');
  wrap.className = 'currency-selector-container';
  wrap.innerHTML = `
    <button id="currency-menu-btn" class="currency-btn" type="button" aria-label="Select currency" aria-haspopup="listbox" aria-expanded="false">
      <span class="currency-btn__code">${currentCurrency}</span>
    </button>
    <div id="currency-dropdown" class="lang-dropdown currency-dropdown" role="listbox" aria-label="Currency">
      ${['CLP', 'USD', 'EUR', 'DKK', 'NOK']
        .map(
          (code) => `
        <label class="lang-option">
          <span class="lang-name">${CURRENCY_LABELS[code]}</span>
          <input type="radio" name="currency" value="${code}" class="currency-radio"${code === currentCurrency ? ' checked' : ''}>
          <div class="toggle-switch"></div>
        </label>`
        )
        .join('')}
      <p class="currency-note">EUR = list price · other ≈ mid-market</p>
    </div>
  `;

  const langBox = actions.querySelector('.lang-selector-container');
  if (langBox) actions.insertBefore(wrap, langBox);
  else {
    const menu = actions.querySelector('#menu-toggle');
    if (menu) actions.insertBefore(wrap, menu);
    else actions.appendChild(wrap);
  }

  const btn = document.getElementById('currency-menu-btn');
  const dropdown = document.getElementById('currency-dropdown');
  if (!btn || !dropdown) return;

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const langDd = document.getElementById('lang-dropdown');
    if (langDd) langDd.classList.remove('show');
    const open = dropdown.classList.toggle('show');
    btn.setAttribute('aria-expanded', String(open));
  });

  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target) && !btn.contains(e.target)) {
      dropdown.classList.remove('show');
      btn.setAttribute('aria-expanded', 'false');
    }
  });

  dropdown.querySelectorAll('.currency-radio').forEach((radio) => {
    radio.addEventListener('change', (e) => {
      if (e.target.checked) applyCurrency(e.target.value);
    });
  });
}

async function loadLanguage(lang) {
  if (!ALLOWED_LOCALES.has(lang)) {
    lang = 'es';
  }
  try {
    if (!Object.keys(englishTranslations).length) {
      englishTranslations = await fetchLocale('en');
    }

    let translations = { ...englishTranslations };
    if (lang !== 'en') {
      const localized = await fetchLocale(lang);
      translations = { ...translations, ...localized };
    }

    currentTranslations = translations;
    document.documentElement.lang = lang;
    applyTranslations(translations);
    applyCurrency(localStorage.getItem('preferredCurrency') || currentCurrency || 'CLP');
    localStorage.setItem('preferredLang', lang);

    const radio = document.querySelector(`.lang-radio[value="${lang}"]`);
    if (radio) radio.checked = true;

    if (typeof window.refreshSplitTextAnimations === 'function') {
      window.refreshSplitTextAnimations();
    }
  } catch (error) {
    console.error('Error loading language file:', error);
  }
}

if (langMenuBtn && langDropdown) {
  langDropdown.setAttribute('data-lenis-prevent', '');
  langDropdown.setAttribute('data-lenis-prevent-wheel', '');
  langDropdown.setAttribute('data-lenis-prevent-touch', '');

  const stopScrollPropagation = (e) => e.stopPropagation();
  langDropdown.addEventListener('wheel', stopScrollPropagation, { passive: true });
  langDropdown.addEventListener('touchmove', stopScrollPropagation, { passive: true });

  langMenuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const currencyDd = document.getElementById('currency-dropdown');
    const currencyBtn = document.getElementById('currency-menu-btn');
    if (currencyDd) currencyDd.classList.remove('show');
    if (currencyBtn) currencyBtn.setAttribute('aria-expanded', 'false');
    langDropdown.classList.toggle('show');
  });

  document.addEventListener('click', (e) => {
    if (!langDropdown.contains(e.target) && !langMenuBtn.contains(e.target)) {
      langDropdown.classList.remove('show');
    }
  });

  langRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      if(e.target.checked) {
        loadLanguage(e.target.value);
        // Optional: close dropdown on selection
        // langDropdown.classList.remove('show');
      }
    });
  });
}

// Initialize language on load (split-text runs after translations apply)
document.addEventListener("DOMContentLoaded", async () => {
    initCurrencySelector();
    const savedLang = localStorage.getItem('preferredLang') || 'es';
    await loadLanguage(savedLang);
});

// Mobile Menu
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');

function setMobileMenuOpen(isOpen) {
    if (!menuToggle || !navLinks) return;
    navLinks.classList.toggle('active', isOpen);
    menuToggle.classList.toggle('active', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('nav-open', isOpen);
}

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        setMobileMenuOpen(!navLinks.classList.contains('active'));
    });

    navLinks.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => setMobileMenuOpen(false));
    });

    document.addEventListener('click', (e) => {
        if (!navLinks.classList.contains('active')) return;
        const navbar = document.getElementById('navbar');
        if (navbar && !navbar.contains(e.target)) {
            setMobileMenuOpen(false);
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            setMobileMenuOpen(false);
        }
    });
}

// Dark Mode Theme (class on <html> so mobile viewport/overscroll use the correct background)
const themeToggle = document.getElementById('theme-toggle');

function updateThemeColorMeta(isDark) {
    let meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) {
        meta = document.createElement('meta');
        meta.name = 'theme-color';
        document.head.appendChild(meta);
    }
    meta.content = isDark ? '#121212' : '#f8f9fa';
}

function applyTheme(theme) {
    const isDark = theme === 'dark';
    document.documentElement.classList.toggle('dark-theme', isDark);
    localStorage.setItem('theme', theme);
    updateThemeColorMeta(isDark);
}

const savedTheme = localStorage.getItem('theme');
applyTheme(savedTheme === 'dark' ? 'dark' : 'light');

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const nextTheme = document.documentElement.classList.contains('dark-theme') ? 'light' : 'dark';
        applyTheme(nextTheme);
    });
}

// Contact Form Handling (Configured for Resend Backend)
function sanitizeText(value, maxLen = 500) {
    if (typeof value !== 'string') return '';
    return value.trim().slice(0, maxLen).replace(/[\0-\x08\x0B\x0C\x0E-\x1F<>]/g, '');
}

function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

const contactForm = document.getElementById('contact-form');
if(contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const statusDiv = document.getElementById('form-status');
        
        const formData = new FormData(contactForm);
        const data = {
            name: sanitizeText(formData.get('name'), 120),
            email: sanitizeText(formData.get('email'), 254),
            message: sanitizeText(formData.get('message'), 2000),
            budget: sanitizeText(formData.get('budget') || '', 32),
            service: sanitizeText(formData.get('service') || '', 64),
        };

        const t = currentTranslations;
        const submitLabel = t['form.submit'] || 'Request my project plan';

        if (!data.name || !data.email || !data.message || !data.service) {
            statusDiv.textContent = t['form.error'] || 'Something went wrong. Please try again.';
            statusDiv.className = 'form-status error';
            return;
        }

        if (!isValidEmail(data.email)) {
            statusDiv.textContent = t['form.errorEmail'] || 'Please enter a valid email address.';
            statusDiv.className = 'form-status error';
            return;
        }

        submitBtn.disabled = true;
        submitBtn.setAttribute('aria-busy', 'true');
        submitBtn.classList.add('is-sending');
        submitBtn.textContent = t['form.sending'] || 'Sending...';
        statusDiv.textContent = '';
        statusDiv.className = 'form-status';

        try {
            const response = await fetch('/api/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...data,
                    website: formData.get('website') || '',
                }),
            });

            let payload = null;
            try {
                payload = await response.json();
            } catch (_) {
                payload = null;
            }

            if (!response.ok) {
                const err = new Error(payload?.error || 'Error sending email');
                err.status = response.status;
                err.code = payload?.code;
                throw err;
            }

            statusDiv.textContent = t['form.success'] || 'Message received.';
            statusDiv.className = 'form-status success';
            contactForm.reset();
        } catch (error) {
            console.error('Contact form error:', error);
            statusDiv.textContent = t['form.error'] || 'Something went wrong. Please try again.';
            statusDiv.className = 'form-status error';
        } finally {
            submitBtn.disabled = false;
            submitBtn.removeAttribute('aria-busy');
            submitBtn.classList.remove('is-sending');
            submitBtn.textContent = submitLabel;
        }
    });
}

// Lenis Smooth Scrolling Integration
if (typeof Lenis !== 'undefined') {
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
        direction: 'vertical',
        gestureDirection: 'vertical',
        smoothTouch: false,
        touchMultiplier: 2,
        prevent: (node) => node.closest && !!node.closest('#lang-dropdown'),
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    
    requestAnimationFrame(raf);

    // Update smooth scrolling for anchor links to use Lenis
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                lenis.scrollTo(targetElement);
            }
        });
    });
}

// Category Filter for Projects
document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterBtns.length > 0 && projectCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                projectCards.forEach(card => {
                    if (filterValue === 'all') {
                        card.classList.remove('hidden');
                    } else {
                        if (card.getAttribute('data-category') === filterValue) {
                            card.classList.remove('hidden');
                        } else {
                            card.classList.add('hidden');
                        }
                    }
                });
            });
        });
    }

    // Scroll indicators for filter bar
    const scrollWrapper = document.querySelector('.scroll-fade-wrapper');
    const filtersContainer = document.querySelector('.project-filters');

    if (scrollWrapper && filtersContainer) {
        const updateScrollIndicators = () => {
            const { scrollLeft, scrollWidth, clientWidth } = filtersContainer;
            
            if (scrollLeft > 5) {
                scrollWrapper.classList.add('can-scroll-left');
            } else {
                scrollWrapper.classList.remove('can-scroll-left');
            }

            if (scrollLeft + clientWidth < scrollWidth - 5) {
                scrollWrapper.classList.add('can-scroll-right');
            } else {
                scrollWrapper.classList.remove('can-scroll-right');
            }
        };

        filtersContainer.addEventListener('scroll', updateScrollIndicators);
        window.addEventListener('resize', updateScrollIndicators);
        
        // Initial check
        setTimeout(updateScrollIndicators, 100);
    }
});

/* Soft lead assist: service picker after engagement (not on first paint) */
(function initLeadAssist() {
  const STORAGE_KEY = 'irigoyen_lead_assist_dismissed';
  const SERVICE_ALIASES = {
    fullstack: 'fullstack',
    'full-stack': 'fullstack',
    platform: 'fullstack',
    plataforma: 'fullstack',
    ecommerce: 'ecommerce',
    'e-commerce': 'ecommerce',
    shop: 'ecommerce',
    tienda: 'ecommerce',
    landing: 'landing',
    landings: 'landing',
    'seo-basic': 'seo-basic',
    seo: 'seo-basic',
    'seo_basic': 'seo-basic',
    'seo-basico': 'seo-basic',
    'seo-geo': 'seo-geo',
    geo: 'seo-geo',
    'seo_geo': 'seo-geo',
    marketing: 'marketing',
    ads: 'marketing',
    care: 'care',
    'care-plan': 'care',
    mantenimiento: 'care',
    webmaster: 'care',
    maintenance: 'care',
    'care-growth': 'care-growth',
    care_growth: 'care-growth',
    growth: 'care-growth',
    other: 'other',
  };

  const assist = document.getElementById('lead-assist');
  const sticky = document.getElementById('lead-sticky');
  const serviceSelect = document.getElementById('service');
  if (!assist || !serviceSelect) return;

  const closeBtn = document.getElementById('lead-assist-close');
  const skipBtn = document.getElementById('lead-assist-skip');
  const stickyOpen = document.getElementById('lead-sticky-open');
  const stickyDismiss = document.getElementById('lead-sticky-dismiss');
  const choices = document.getElementById('lead-assist-choices');

  let shownModal = false;
  let stickyVisible = false;
  let intentFromQuery = false;

  function wasDismissed() {
    try {
      return sessionStorage.getItem(STORAGE_KEY) === '1';
    } catch (_) {
      return false;
    }
  }

  function markDismissed() {
    try {
      sessionStorage.setItem(STORAGE_KEY, '1');
    } catch (_) {}
  }

  function normalizeService(raw) {
    if (!raw) return '';
    const key = String(raw).trim().toLowerCase();
    return SERVICE_ALIASES[key] || '';
  }

  function setService(value) {
    const normalized = normalizeService(value);
    if (!normalized) return false;
    const opt = serviceSelect.querySelector(`option[value="${normalized}"]`);
    if (!opt) return false;
    // Allow selecting a previously disabled placeholder flow
    [...serviceSelect.options].forEach((o) => {
      if (o.value === '') o.selected = false;
    });
    serviceSelect.value = normalized;
    serviceSelect.dispatchEvent(new Event('change', { bubbles: true }));
    return true;
  }

  function syncServiceUrl(service) {
    const normalized = normalizeService(service);
    if (!normalized || !window.history?.replaceState) return;
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('service', normalized);
      if (!url.hash) url.hash = 'contact';
      window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
    } catch (_) {}
  }

  function goToContact(service) {
    if (service) {
      setService(service);
      syncServiceUrl(service);
    }
    const contact = document.getElementById('contact');
    if (contact) {
      contact.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => serviceSelect.focus(), 400);
    } else {
      const q = service ? `?service=${encodeURIComponent(normalizeService(service))}` : '';
      window.location.href = `/${q}#contact`;
    }
  }

  function openAssist() {
    if (intentFromQuery || wasDismissed() || shownModal) return;
    shownModal = true;
    assist.hidden = false;
    assist.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lead-assist-open');
    hideSticky();
    const focusTarget = closeBtn || assist.querySelector('.lead-assist__option');
    if (focusTarget) setTimeout(() => focusTarget.focus(), 50);
  }

  function closeAssist(persist) {
    assist.hidden = true;
    assist.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lead-assist-open');
    if (persist) markDismissed();
  }

  function showSticky() {
    if (intentFromQuery || !sticky || wasDismissed() || stickyVisible || shownModal) return;
    if (window.matchMedia('(max-width: 768px)').matches) return;
    stickyVisible = true;
    sticky.hidden = false;
    sticky.setAttribute('aria-hidden', 'false');
    document.body.classList.add('has-lead-sticky');
  }

  function hideSticky() {
    if (!sticky) return;
    stickyVisible = false;
    sticky.hidden = true;
    sticky.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('has-lead-sticky');
  }

  function maybeEngage() {
    if (intentFromQuery || wasDismissed() || shownModal) return;
    const scrolled = window.scrollY / Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    if (scrolled >= 0.4) {
      showSticky();
    }
  }

  // Prefill from URL ?service=seo-geo (aliases supported)
  try {
    const params = new URLSearchParams(window.location.search);
    const fromQuery = params.get('service');
    if (fromQuery && setService(fromQuery)) {
      intentFromQuery = true;
      markDismissed();
      syncServiceUrl(fromQuery);
      // Wait a tick so layout/fonts settle, then scroll to contact
      setTimeout(() => goToContact(fromQuery), 150);
    }
  } catch (_) {}

  if (choices) {
    choices.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-service]');
      if (!btn) return;
      closeAssist(true);
      goToContact(btn.getAttribute('data-service'));
    });
  }

  if (closeBtn) closeBtn.addEventListener('click', () => closeAssist(true));
  if (skipBtn) {
    skipBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeAssist(true);
      goToContact();
    });
  }

  assist.addEventListener('click', (e) => {
    if (e.target === assist) closeAssist(true);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !assist.hidden) closeAssist(true);
  });

  if (stickyOpen) {
    stickyOpen.addEventListener('click', () => {
      hideSticky();
      openAssist();
    });
  }
  if (stickyDismiss) {
    stickyDismiss.addEventListener('click', () => {
      hideSticky();
      markDismissed();
    });
  }

  // Soft timing: sticky after scroll on desktop; no forced modal on mobile
  window.addEventListener('scroll', maybeEngage, { passive: true });
  setTimeout(() => {
    if (intentFromQuery || wasDismissed() || shownModal) return;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) return;
    if (stickyVisible) {
      openAssist();
    } else {
      showSticky();
      setTimeout(() => {
        if (!intentFromQuery && !wasDismissed() && !shownModal) openAssist();
      }, 12000);
    }
  }, 28000);
})();
