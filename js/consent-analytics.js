/**
 * Consent-gated Google Tag Manager + Consent Mode v2.
 * GTM loads only after the visitor accepts analytics cookies.
 */
(function () {
  var STORAGE_KEY = 'irigoyen_analytics_consent';
  var GTM_ID = 'GTM-KD3BBZ78';
  var BANNER_ID = 'cookie-consent';
  var loaded = false;

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = window.gtag || gtag;

  // Defaults if head snippet was missing (idempotent with head defaults).
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted',
    wait_for_update: 500,
  });

  var COPY = {
    es: {
      title: 'Cookies de medición',
      text: 'Usamos Google Analytics (vía GTM) solo si lo aceptas, para entender el uso del sitio. Sin publicidad de terceros.',
      accept: 'Aceptar',
      deny: 'Rechazar',
      settings: 'Cookies',
    },
    en: {
      title: 'Analytics cookies',
      text: 'We use Google Analytics (via GTM) only if you accept, to understand how the site is used. No third-party ads.',
      accept: 'Accept',
      deny: 'Reject',
      settings: 'Cookies',
    },
    da: {
      title: 'Cookies til måling',
      text: 'Vi bruger Google Analytics (via GTM) kun hvis du accepterer, for at forstå brugen af sitet. Ingen tredjepartsannoncer.',
      accept: 'Accepter',
      deny: 'Afvis',
      settings: 'Cookies',
    },
    no: {
      title: 'Informasjonskapsler for måling',
      text: 'Vi bruker Google Analytics (via GTM) bare hvis du godtar, for å forstå bruken av nettstedet. Ingen tredjepartsannonser.',
      accept: 'Godta',
      deny: 'Avvis',
      settings: 'Informasjonskapsler',
    },
  };

  function lang() {
    var l = (document.documentElement.lang || 'es').slice(0, 2).toLowerCase();
    return COPY[l] ? l : 'es';
  }

  function t(key) {
    return COPY[lang()][key] || COPY.es[key];
  }

  function getConsent() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (_) {
      return null;
    }
  }

  function setConsent(value) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch (_) {}
  }

  function loadGTM() {
    if (loaded) return;
    loaded = true;
    window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
    var first = document.getElementsByTagName('script')[0];
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtm.js?id=' + GTM_ID;
    if (first && first.parentNode) first.parentNode.insertBefore(s, first);
    else document.head.appendChild(s);
  }

  function grant() {
    gtag('consent', 'update', { analytics_storage: 'granted' });
    setConsent('granted');
    loadGTM();
    hideBanner();
  }

  function deny() {
    gtag('consent', 'update', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });
    setConsent('denied');
    hideBanner();
  }

  function hideBanner() {
    var el = document.getElementById(BANNER_ID);
    if (el) {
      el.classList.remove('is-visible');
      el.setAttribute('hidden', '');
    }
  }

  function showBanner() {
    var el = document.getElementById(BANNER_ID);
    if (!el) el = buildBanner();
    el.removeAttribute('hidden');
    requestAnimationFrame(function () {
      el.classList.add('is-visible');
    });
  }

  function buildBanner() {
    var el = document.createElement('div');
    el.id = BANNER_ID;
    el.className = 'cookie-consent';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-modal', 'false');
    el.setAttribute('aria-labelledby', 'cookie-consent-title');
    el.setAttribute('hidden', '');
    el.innerHTML =
      '<div class="cookie-consent__inner">' +
      '<div class="cookie-consent__copy">' +
      '<p id="cookie-consent-title" class="cookie-consent__title" data-i18n="consent.title">' +
      t('title') +
      '</p>' +
      '<p class="cookie-consent__text" data-i18n="consent.text">' +
      t('text') +
      '</p>' +
      '</div>' +
      '<div class="cookie-consent__actions">' +
      '<button type="button" class="cookie-consent__btn cookie-consent__btn--ghost" data-consent="deny" data-i18n="consent.deny">' +
      t('deny') +
      '</button>' +
      '<button type="button" class="cookie-consent__btn cookie-consent__btn--primary" data-consent="accept" data-i18n="consent.accept">' +
      t('accept') +
      '</button>' +
      '</div>' +
      '</div>';

    el.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-consent]');
      if (!btn) return;
      if (btn.getAttribute('data-consent') === 'accept') grant();
      else deny();
    });

    document.body.appendChild(el);
    return el;
  }

  function openSettings(e) {
    if (e) e.preventDefault();
    showBanner();
  }

  function bindSettingsLinks() {
    document.querySelectorAll('[data-consent-open]').forEach(function (link) {
      link.addEventListener('click', openSettings);
    });
  }

  function init() {
    bindSettingsLinks();
    var choice = getConsent();
    if (choice === 'granted') {
      gtag('consent', 'update', { analytics_storage: 'granted' });
      loadGTM();
      return;
    }
    if (choice === 'denied') return;
    showBanner();
  }

  window.IrigoyenConsent = {
    open: openSettings,
    accept: grant,
    deny: deny,
    get: getConsent,
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
