function initMobileNav() {
    const page = window.location.pathname.split('/').pop() || 'index.html';
    if (page === 'cotizacion.html') return;

    const isIndex = page === '' || page === 'index.html';
    const homeHref = isIndex ? 'index.html' : 'index.html';
    const projectsHref = isIndex ? 'index.html#projects' : 'index.html#projects';
    const contactHref = isIndex ? 'index.html#contact' : 'index.html#contact';
    const whatsappHref = 'https://wa.me/+4550249855?text=%C2%A1Hola!%20Vi%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20platicar%20sobre%20un%20posible%20proyecto.';

    let active = 'projects';
    if (isIndex) {
        const hash = window.location.hash;
        if (hash === '#projects') active = 'projects';
        else if (hash === '#contact') active = 'contact';
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
        <a href="${projectsHref}" class="mobile-tab-bar__item${active === 'projects' ? ' is-active' : ''}" data-nav="projects">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>
          <span data-i18n="nav.mobile.projects">Projects</span>
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
        if (hash === '#projects') next = 'projects';
        else if (hash === '#contact') next = 'contact';
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
        rootMargin: '0px',
        threshold: 0.15
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

    // Hero text: visible on load (orb is not inside fade-in)
    document.querySelectorAll('.hero-content.fade-in').forEach(el => {
        el.classList.add('visible');
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
const langMenuBtn = document.getElementById('lang-menu-btn');
const langDropdown = document.getElementById('lang-dropdown');
const langRadios = document.querySelectorAll('.lang-radio');

let currentTranslations = {};
let englishTranslations = {};

async function fetchLocale(lang) {
  const response = await fetch(`locales/${lang}.json`, { cache: 'no-cache' });
  if (!response.ok) throw new Error(`Locale ${lang} not found`);
  return response.json();
}

function applyTranslations(translations) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[key]) el.textContent = translations[key];
  });

  document.querySelectorAll('.mobile-tab-bar [data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[key]) el.textContent = translations[key];
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (translations[key]) el.placeholder = translations[key];
  });

  document.querySelectorAll('option[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[key]) el.textContent = translations[key];
  });

  const titleKey = document.documentElement.getAttribute('data-i18n-title');
  if (titleKey && translations[titleKey]) {
    document.title = translations[titleKey];
  }

  const metaDesc = document.querySelector('meta[name="description"][data-i18n-content]');
  if (metaDesc) {
    const key = metaDesc.getAttribute('data-i18n-content');
    if (translations[key]) metaDesc.setAttribute('content', translations[key]);
  }
}

async function loadLanguage(lang) {
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
const contactForm = document.getElementById('contact-form');
if(contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const statusDiv = document.getElementById('form-status');
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());

        const t = currentTranslations;
        const submitLabel = t['form.submit'] || 'Request my project plan';

        submitBtn.disabled = true;
        submitBtn.textContent = t['form.sending'] || 'Sending...';
        statusDiv.textContent = '';
        statusDiv.className = 'form-status';

        try {
            // To use Resend, you will send a POST request to your backend endpoint here.
            // Example:
            /*
            const response = await fetch('/api/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if(!response.ok) throw new Error('Error sending email');
            */
            
            // Simulating backend processing delay
            await new Promise(r => setTimeout(r, 1200));

            statusDiv.textContent = t['form.success'] || 'Message received.';
            statusDiv.classList.add('success');
            contactForm.reset();
        } catch (error) {
            statusDiv.textContent = t['form.error'] || 'Something went wrong. Please try again.';
            statusDiv.classList.add('error');
        } finally {
            submitBtn.disabled = false;
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
