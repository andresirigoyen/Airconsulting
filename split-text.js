import { gsap } from 'https://esm.sh/gsap@3.12.7';
import { ScrollTrigger } from 'https://esm.sh/gsap@3.12.7/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const instances = new Map();

const DEFAULTS = {
  delay: 50,
  duration: 1.25,
  ease: 'power3.out',
  splitType: 'chars',
  from: { opacity: 0, y: 40 },
  to: { opacity: 1, y: 0 },
  threshold: 0.1,
  rootMargin: '-100px'
};

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function parseOptions(el) {
  const delay = Number(el.dataset.splitDelay ?? DEFAULTS.delay);
  const duration = Number(el.dataset.splitDuration ?? DEFAULTS.duration);
  const splitType = el.dataset.splitType || DEFAULTS.splitType;
  const ease = el.dataset.splitEase || DEFAULTS.ease;
  const threshold = Number(el.dataset.splitThreshold ?? DEFAULTS.threshold);
  const rootMargin = el.dataset.splitRootMargin ?? DEFAULTS.rootMargin;

  let from = DEFAULTS.from;
  let to = DEFAULTS.to;

  if (el.dataset.splitFrom) {
    try {
      from = { ...from, ...JSON.parse(el.dataset.splitFrom) };
    } catch (_) { /* keep defaults */ }
  }

  if (el.dataset.splitTo) {
    try {
      to = { ...to, ...JSON.parse(el.dataset.splitTo) };
    } catch (_) { /* keep defaults */ }
  }

  return { delay, duration, ease, splitType, from, to, threshold, rootMargin };
}

function destroyInstance(el) {
  const ctx = instances.get(el);
  if (!ctx) return;

  ctx.scrollTrigger?.kill();
  ctx.tween?.kill();
  el.textContent = ctx.sourceText;
  el.removeAttribute('aria-label');
  instances.delete(el);
}

function splitElement(el, splitType) {
  const sourceText = el.textContent;
  el.setAttribute('aria-label', sourceText);

  const inner = document.createElement('span');
  inner.className = 'split-text__inner';
  inner.setAttribute('aria-hidden', 'true');

  const units = [];

  if (splitType === 'words') {
    const parts = sourceText.split(/(\s+)/);
    parts.forEach((part) => {
      if (!part) return;
      if (/^\s+$/.test(part)) {
        inner.appendChild(document.createTextNode(part));
        return;
      }
      const word = document.createElement('span');
      word.className = 'split-text__unit split-text__word';
      word.textContent = part;
      inner.appendChild(word);
      units.push(word);
    });
  } else {
    const parts = sourceText.split(/(\s+)/);
    parts.forEach((part) => {
      if (!part) return;
      if (/^\s+$/.test(part)) {
        // Handle newlines and spaces within white space
        if (part.includes('\n')) {
          const subparts = part.split(/(\n)/);
          subparts.forEach((sub) => {
            if (sub === '\n') {
              inner.appendChild(document.createElement('br'));
            } else if (sub) {
              inner.appendChild(document.createTextNode(sub));
            }
          });
        } else {
          inner.appendChild(document.createTextNode(part));
        }
        return;
      }

      // Wrap each word in a non-breaking inline-block span
      const wordWrap = document.createElement('span');
      wordWrap.className = 'split-text__word-wrap';
      wordWrap.style.display = 'inline-block';
      wordWrap.style.whiteSpace = 'nowrap';

      [...part].forEach((char) => {
        const unit = document.createElement('span');
        unit.className = 'split-text__unit split-text__char';
        unit.textContent = char;
        wordWrap.appendChild(unit);
        units.push(unit);
      });

      inner.appendChild(wordWrap);
    });
  }

  el.replaceChildren(inner);
  return { units, sourceText };
}

function animateElement(el) {

  destroyInstance(el);

  const options = parseOptions(el);
  const { units, sourceText } = splitElement(el, options.splitType);

  if (!units.length) return;

  gsap.set(units, options.from);

  const tween = gsap.to(units, {
    ...options.to,
    duration: options.duration,
    ease: options.ease,
    stagger: options.delay / 1000,
    scrollTrigger: {
      trigger: el,
      start: 'top bottom-=100',
      toggleActions: 'play none none none',
      once: true,
      invalidateOnRefresh: true
    }
  });

  const scrollTrigger = tween.scrollTrigger;

  instances.set(el, { tween, scrollTrigger, sourceText });
}

export function refreshSplitTextAnimations() {
  document.querySelectorAll('.split-text').forEach((el) => {
    animateElement(el);
  });

  ScrollTrigger.refresh();
}

window.refreshSplitTextAnimations = refreshSplitTextAnimations;
