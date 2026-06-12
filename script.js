document.addEventListener('DOMContentLoaded', () => {
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
    const savedLang = localStorage.getItem('preferredLang') || 'en';
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
