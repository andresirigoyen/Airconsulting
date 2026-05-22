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

async function loadLanguage(lang) {
  try {
    const response = await fetch(`locales/${lang}.json`);
    if (!response.ok) throw new Error('Network response was not ok');
    const translations = await response.json();
    currentTranslations = translations;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[key]) {
        el.textContent = translations[key];
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (translations[key]) {
        el.placeholder = translations[key];
      }
    });

    localStorage.setItem('preferredLang', lang);
    
    // Update radio button
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

// Dark Mode Theme
const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark') {
    document.body.classList.add('dark-theme');
}

if(themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        let theme = 'light';
        if (document.body.classList.contains('dark-theme')) {
            theme = 'dark';
        }
        localStorage.setItem('theme', theme);
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
