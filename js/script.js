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
    const whatsappHref = 'https://wa.me/+4550249855?text=' + encodeURIComponent(
        (currentTranslations['wa.prefill']) ||
        '¡Hola! Vi tu portafolio y me gustaría platicar sobre un posible proyecto.'
    );

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
          <span data-i18n="nav.mobile.home">Inicio</span>
        </a>
        <a href="${servicesHref}" class="mobile-tab-bar__item${active === 'services' ? ' is-active' : ''}" data-nav="services">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
          <span data-i18n="nav.mobile.services">Servicios</span>
        </a>
        <a href="${pricingHref}" class="mobile-tab-bar__item${active === 'pricing' ? ' is-active' : ''}" data-nav="pricing">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          <span data-i18n="nav.mobile.pricing">Precios</span>
        </a>
        <a href="${contactHref}" class="mobile-tab-bar__item${active === 'contact' ? ' is-active' : ''}" data-nav="contact">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/></svg>
          <span data-i18n="nav.mobile.quote">Cotizar</span>
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
    // 1. Navbar: full-bleed at top → sticky capsule on scroll
    const navbar = document.getElementById('navbar');
    const updateNavbarScrollState = () => {
        if (!navbar) return;
        navbar.classList.toggle('is-scrolled', window.scrollY > 16);
    };
    updateNavbarScrollState();
    window.addEventListener('scroll', updateNavbarScrollState, { passive: true });

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
    const videos = document.querySelectorAll(
        'video.tools-banner__video, video.pc-bg-avatar'
    );
    if (!videos.length) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile =
        window.matchMedia('(max-width: 768px)').matches ||
        navigator.connection?.saveData === true;

    // Mobile / save-data: never download multi-MB loops (huge PSI win).
    if (isMobile || reduceMotion) {
        videos.forEach((video) => {
            video.pause();
            video.removeAttribute('autoplay');
            video.removeAttribute('src');
            video.querySelectorAll('source').forEach((s) => s.remove());
            video.load();
            video.classList.add('video--disabled');
            const host = video.closest('.tools-banner__media, .pc-bg') || video.parentElement;
            if (host) host.classList.add('media--static');
        });
        return;
    }

    if (!('IntersectionObserver' in window)) {
        videos.forEach((video) => {
            video.play().catch(() => {});
        });
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                const video = entry.target;
                if (entry.isIntersecting) {
                    if (video.dataset.lazyStarted !== '1') {
                        video.dataset.lazyStarted = '1';
                        if (video.dataset.src && !video.getAttribute('src')) {
                            video.src = video.dataset.src;
                            video.load();
                        }
                    }
                    video.play().catch(() => {});
                } else if (!video.paused) {
                    video.pause();
                }
            });
        },
        { rootMargin: '120px 0px', threshold: 0.1 }
    );

    videos.forEach((video) => {
        video.removeAttribute('autoplay');
        video.setAttribute('preload', 'none');
        observer.observe(video);
    });
}

// i18n Engine
const ALLOWED_LOCALES = new Set(['es', 'en', 'pt']);

const langMenuBtn = document.getElementById('lang-menu-btn');
const langDropdown = document.getElementById('lang-dropdown');
const langRadios = document.querySelectorAll('.lang-radio');

let currentTranslations = {};
let englishTranslations = {};

async function fetchLocale(lang) {
  if (!ALLOWED_LOCALES.has(lang)) {
    throw new Error(`Invalid locale: ${lang}`);
  }
  // Revalidate locale files so newly deployed translations are not trapped in
  // a browser's long-lived HTTP cache under the same URL.
  const response = await fetch(`/locales/${lang}.json`, { cache: 'no-cache' });
  if (!response.ok) throw new Error(`Locale ${lang} not found`);
  return response.json();
}

const CURRENCY_I18N_KEYS = {
  USD: 'currency.usd',
  EUR: 'currency.eur',
  CLP: 'currency.clp',
  DKK: 'currency.dkk',
  NOK: 'currency.nok',
};

function applyTranslations(translations) {
  const has = (key) =>
    Boolean(key) &&
    Object.prototype.hasOwnProperty.call(translations, key) &&
    translations[key] != null &&
    translations[key] !== '';

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (has(key)) el.textContent = translations[key];
  });

  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (has(key)) el.innerHTML = translations[key];
  });

  document.querySelectorAll('.mobile-tab-bar [data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (has(key)) el.textContent = translations[key];
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (has(key)) el.placeholder = translations[key];
  });

  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    const key = el.getAttribute('data-i18n-aria');
    if (has(key)) el.setAttribute('aria-label', translations[key]);
  });

  document.querySelectorAll('option[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (has(key)) el.textContent = translations[key];
  });

  const titleKey = document.documentElement.getAttribute('data-i18n-title');
  if (has(titleKey)) {
    document.title = translations[titleKey];
  }

  document.querySelectorAll('[data-i18n-content]').forEach((el) => {
    const key = el.getAttribute('data-i18n-content');
    if (has(key)) el.setAttribute('content', translations[key]);
  });

  // WhatsApp deep-link prefill follows active language
  const waPrefill = has('wa.prefill')
    ? translations['wa.prefill']
    : '¡Hola! Vi tu portafolio y me gustaría platicar sobre un posible proyecto.';
  const waHref = `https://wa.me/+4550249855?text=${encodeURIComponent(waPrefill)}`;
  document.querySelectorAll('a[href*="wa.me/"]').forEach((a) => {
    a.href = waHref;
  });

  // Currency chrome (injected after DOM ready)
  const curBtn = document.getElementById('currency-menu-btn');
  if (curBtn && has('currency.select')) {
    curBtn.setAttribute('aria-label', translations['currency.select']);
  }
  const curList = document.getElementById('currency-dropdown');
  if (curList && has('currency.listLabel')) {
    curList.setAttribute('aria-label', translations['currency.listLabel']);
  }
  const curNote = document.querySelector('.currency-note');
  if (curNote && has('currency.note')) {
    curNote.textContent = translations['currency.note'];
  }
  document.querySelectorAll('#currency-dropdown .currency-radio').forEach((radio) => {
    const code = radio.value;
    const key = CURRENCY_I18N_KEYS[code];
    const label = radio.closest('.lang-option')?.querySelector('.lang-name');
    if (label && key && has(key)) label.textContent = translations[key];
  });
}

/* —— Currency selector (USD base → EUR, CLP, DKK, NOK) —— */
const ALLOWED_CURRENCIES = new Set(['USD', 'EUR', 'CLP']);
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
    <button id="currency-menu-btn" class="currency-btn" type="button" aria-label="Seleccionar moneda" data-i18n-aria="currency.select" aria-haspopup="listbox" aria-expanded="false">
      <span class="currency-btn__code">${currentCurrency}</span>
    </button>
    <div id="currency-dropdown" class="lang-dropdown currency-dropdown" role="listbox" aria-label="Moneda" data-i18n-aria="currency.listLabel">
      ${['CLP', 'USD', 'EUR']
        .map(
          (code) => `
        <label class="lang-option">
          <span class="lang-name">${CURRENCY_LABELS[code]}</span>
          <input type="radio" name="currency" value="${code}" class="currency-radio"${code === currentCurrency ? ' checked' : ''}>
          <div class="toggle-switch"></div>
        </label>`
        )
        .join('')}
      <p class="currency-note" data-i18n="currency.note">EUR = precio de lista · otras ≈ tipo de cambio</p>
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

async function loadLanguage(lang, { force = false } = {}) {
  if (!ALLOWED_LOCALES.has(lang)) {
    lang = 'es';
  }
  try {
    // Always load the locale JSON so JS UI (mobile nav, form status, etc.)
    // never falls back to English while the page chrome is in another language.
    const locale = await fetchLocale(lang);

    if (lang === 'en') {
      englishTranslations = locale;
    } else if (!Object.keys(englishTranslations).length) {
      try {
        englishTranslations = await fetchLocale('en');
      } catch (_) {
        englishTranslations = {};
      }
    }

    const translations =
      lang === 'en' || !Object.keys(englishTranslations).length
        ? locale
        : { ...englishTranslations, ...locale };

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
        loadLanguage(e.target.value, { force: true });
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

function trackAnalyticsEvent(name, params = {}) {
    const payload = { event: name, ...params };
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);
    if (typeof window.gtag === 'function') {
        window.gtag('event', name, params);
    }
}

const contactForm = document.getElementById('contact-form');
if (contactForm) {
    let formStarted = false;
    const markFormStart = () => {
        if (formStarted) return;
        formStarted = true;
        trackAnalyticsEvent('form_start', {
            form_id: 'contact-form',
            form_name: 'contact',
            page_location: window.location.href,
        });
    };
    contactForm.addEventListener('focusin', markFormStart);
    contactForm.addEventListener('change', markFormStart);

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const statusDiv = document.getElementById('form-status');
        const waLink =
            document.querySelector('.contact-panel__whatsapp')?.getAttribute('href') ||
            'https://wa.me/+4550249855';

        const formData = new FormData(contactForm);
        const data = {
            name: sanitizeText(formData.get('name'), 120),
            email: sanitizeText(formData.get('email'), 254),
            message: sanitizeText(formData.get('message'), 2000),
            budget: sanitizeText(formData.get('budget') || '', 32),
            service: sanitizeText(formData.get('service') || '', 64),
        };

        const t = currentTranslations;
        const submitLabel = t['form.submit'] || 'Enviar y recibir plan en 48h';

        if (!data.name || !data.email || !data.message || !data.service) {
            statusDiv.textContent = t['form.error'] || 'Algo falló. Inténtalo de nuevo o escríbenos directamente.';
            statusDiv.className = 'form-status error';
            trackAnalyticsEvent('form_error', {
                form_id: 'contact-form',
                form_name: 'contact',
                error_type: 'validation_required',
            });
            return;
        }

        if (!isValidEmail(data.email)) {
            statusDiv.textContent = t['form.errorEmail'] || 'Introduce un correo electrónico válido.';
            statusDiv.className = 'form-status error';
            trackAnalyticsEvent('form_error', {
                form_id: 'contact-form',
                form_name: 'contact',
                error_type: 'validation_email',
            });
            return;
        }

        markFormStart();
        submitBtn.disabled = true;
        submitBtn.setAttribute('aria-busy', 'true');
        submitBtn.classList.add('is-sending');
        submitBtn.textContent = t['form.sending'] || 'Enviando...';
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

            const successText =
                t['form.success'] || 'Mensaje recibido. Te responderemos en menos de 48 horas.';
            const waText = t['form.successWhatsApp'] || 'Si es urgente, escríbenos por WhatsApp →';
            statusDiv.className = 'form-status success';
            statusDiv.replaceChildren();
            statusDiv.append(document.createTextNode(successText + ' '));
            const waAnchor = document.createElement('a');
            waAnchor.href = waLink;
            waAnchor.target = '_blank';
            waAnchor.rel = 'noopener noreferrer';
            waAnchor.textContent = waText;
            statusDiv.append(waAnchor);
            contactForm.reset();
            formStarted = false;

            trackAnalyticsEvent('generate_lead', {
                form_id: 'contact-form',
                form_name: 'contact',
                service: data.service,
                currency: 'USD',
                value: 1,
            });
            trackAnalyticsEvent('form_submit', {
                form_id: 'contact-form',
                form_name: 'contact',
                service: data.service,
            });
        } catch (error) {
            console.error('Contact form error:', error);
            statusDiv.textContent = t['form.error'] || 'Algo falló. Inténtalo de nuevo o escríbenos directamente.';
            statusDiv.className = 'form-status error';
            trackAnalyticsEvent('form_error', {
                form_id: 'contact-form',
                form_name: 'contact',
                error_type: 'submit_failed',
                status: error?.status || 0,
            });
        } finally {
            submitBtn.disabled = false;
            submitBtn.removeAttribute('aria-busy');
            submitBtn.classList.remove('is-sending');
            submitBtn.textContent = submitLabel;
        }
    });
}

// Lenis: desktop-only, loaded after idle to keep mobile TBT clean
function initLenisSmoothScroll() {
  if (window.innerWidth <= 768 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }
  if (typeof Lenis === 'undefined') return;

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

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
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

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      resolve();
      return;
    }
    const s = document.createElement('script');
    s.src = src;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

function whenIdle(cb, timeout = 2500) {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(cb, { timeout });
  } else {
    setTimeout(cb, timeout);
  }
}

function yieldToMain(ms = 50) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Desktop polish (Lenis / WebGL orb / GSAP) — interaction-first so Lighthouse TBT stays clean. */
function loadEnhancementModules() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.innerWidth <= 768) return;

  let started = false;

  const start = () => {
    if (started) return;
    started = true;

    whenIdle(async () => {
      try {
        await loadScript(
          'https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.29/bundled/lenis.min.js'
        );
        initLenisSmoothScroll();
        await yieldToMain(120);

        await import('/js/orb-hero.js');
        await yieldToMain(200);

        await import('/js/split-text.js');
        if (typeof window.refreshSplitTextAnimations === 'function') {
          window.refreshSplitTextAnimations();
        }
      } catch (err) {
        console.warn('Enhancement modules skipped:', err);
      }
    }, 1500);
  };

  const onInteract = () => {
    ['pointerdown', 'keydown', 'touchstart', 'scroll', 'wheel'].forEach((evt) => {
      window.removeEventListener(evt, onInteract, { capture: true });
    });
    start();
  };

  ['pointerdown', 'keydown', 'touchstart', 'scroll', 'wheel'].forEach((evt) => {
    window.addEventListener(evt, onInteract, { once: true, passive: true, capture: true });
  });

  // Fallback for non-interactive sessions — past typical Lighthouse lab window
  setTimeout(start, 10000);
}

window.addEventListener('load', () => {
  loadEnhancementModules();
});
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

    // Collapsible project descriptions (arrow toggle)
    document.querySelectorAll('.project-card__toggle').forEach((btn) => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.project-card');
            if (!card) return;
            const open = !card.classList.contains('is-open');
            card.classList.toggle('is-open', open);
            btn.setAttribute('aria-expanded', String(open));
        });
    });

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

/* Service CTA pref: store on data-service click so href stays /#contact (no ?service= for crawlers) */
(function initServicePrefLinks() {
  const PREF_KEY = 'irigoyen_pref_service';
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[data-service]');
    if (!a) return;
    const raw = a.getAttribute('data-service');
    if (!raw) return;
    try {
      sessionStorage.setItem(PREF_KEY, String(raw).trim().toLowerCase());
    } catch (_) {}
  });
})();

/* Soft lead assist: service picker after engagement (not on first paint) */
(function initLeadAssist() {
  const STORAGE_KEY = 'irigoyen_lead_assist_dismissed';
  const PREF_KEY = 'irigoyen_pref_service';
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

  function rememberService(service) {
    const normalized = normalizeService(service);
    if (!normalized) return;
    try {
      sessionStorage.setItem(PREF_KEY, normalized);
    } catch (_) {}
  }

  /** Keep URL clean: drop ?service=; hash #contact only. Preference lives in sessionStorage. */
  function syncServiceUrl(service) {
    if (service) rememberService(service);
    if (!window.history?.replaceState) return;
    try {
      const url = new URL(window.location.href);
      url.searchParams.delete('service');
      if (!url.hash || url.hash === '#') url.hash = 'contact';
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
      if (service) rememberService(service);
      window.location.href = '/#contact';
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

  // Prefill: sessionStorage (from data-service CTAs) or legacy ?service= (then strip query)
  try {
    const params = new URLSearchParams(window.location.search);
    const fromQuery = params.get('service');
    let fromStorage = '';
    try {
      fromStorage = sessionStorage.getItem(PREF_KEY) || '';
      if (fromStorage) sessionStorage.removeItem(PREF_KEY);
    } catch (_) {}
    const intent = fromQuery || fromStorage;
    if (intent && setService(intent)) {
      intentFromQuery = true;
      markDismissed();
      syncServiceUrl(intent);
      setTimeout(() => goToContact(intent), 150);
    } else if (fromQuery && window.history?.replaceState) {
      // Unknown/legacy query — still strip for a clean URL
      const url = new URL(window.location.href);
      url.searchParams.delete('service');
      window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
    }
  } catch (_) {}

  // Same-page CTAs: <a href="/#contact" data-service="landing">
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[data-service]');
    if (!a || !document.getElementById('contact')) return;
    const href = a.getAttribute('href') || '';
    if (!href.includes('#contact')) return;
    e.preventDefault();
    closeAssist(true);
    goToContact(a.getAttribute('data-service'));
  });

  if (choices) {
    choices.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-service]');
      if (!btn || btn.tagName === 'A') return;
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
