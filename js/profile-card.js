// Vanilla JS Port of react-bits ProfileCard tilt engine (multi-card)
document.addEventListener('DOMContentLoaded', () => {
  const clamp = (v, min = 0, max = 100) => Math.min(Math.max(v, min), max);
  const round = (v, precision = 3) => parseFloat(v.toFixed(precision));

  const ANIMATION_CONFIG = {
    INITIAL_DURATION: 1200,
    INITIAL_X_OFFSET: 70,
    INITIAL_Y_OFFSET: 60,
    ENTER_TRANSITION_MS: 180
  };

  const preferReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const wrappers = document.querySelectorAll('.pc-card-wrapper');
  if (!wrappers.length) return;

  function initProfileCard(wrap) {
    const shell = wrap.querySelector('.pc-card-shell');
    if (!shell) return;

    if (preferReducedMotion || window.matchMedia('(max-width: 767px)').matches) {
      // Still wire video play on about card when tilt is disabled
      initVideoControls(wrap, shell);
      return;
    }

    let enterTimer = null;
    let leaveRaf = null;
    let rafId = null;
    let running = false;
    let lastTs = 0;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    const DEFAULT_TAU = 0.14;
    const INITIAL_TAU = 0.6;
    let initialUntil = 0;

    const setVarsFromXY = (x, y) => {
      const width = shell.clientWidth || 1;
      const height = shell.clientHeight || 1;
      const percentX = clamp((100 / width) * x);
      const percentY = clamp((100 / height) * y);
      const centerX = percentX - 50;
      const centerY = percentY - 50;
      wrap.style.setProperty('--pointer-x', `${percentX}%`);
      wrap.style.setProperty('--pointer-y', `${percentY}%`);
      wrap.style.setProperty('--rotate-x', `${round(-(centerY / 5))}deg`);
      wrap.style.setProperty('--rotate-y', `${round(centerX / 4)}deg`);
    };

    const step = (ts) => {
      if (!running) return;
      if (lastTs === 0) lastTs = ts;
      const dt = (ts - lastTs) / 1000;
      lastTs = ts;
      const tau = ts < initialUntil ? INITIAL_TAU : DEFAULT_TAU;
      const k = 1 - Math.exp(-dt / tau);
      currentX += (targetX - currentX) * k;
      currentY += (targetY - currentY) * k;
      setVarsFromXY(currentX, currentY);
      const stillFar = Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05;
      if (stillFar) {
        rafId = requestAnimationFrame(step);
      } else {
        running = false;
        lastTs = 0;
        rafId = null;
      }
    };

    const startEngine = () => {
      if (running) return;
      running = true;
      lastTs = 0;
      rafId = requestAnimationFrame(step);
    };

    const tiltEngine = {
      setImmediate(x, y) {
        currentX = x;
        currentY = y;
        setVarsFromXY(currentX, currentY);
      },
      setTarget(x, y) {
        targetX = x;
        targetY = y;
        startEngine();
      },
      toCenter() {
        this.setTarget(shell.clientWidth / 2, shell.clientHeight / 2);
      },
      beginInitial(durationMs) {
        initialUntil = performance.now() + durationMs;
        startEngine();
      },
      getCurrent() {
        return { x: currentX, y: currentY, tx: targetX, ty: targetY };
      }
    };

    const getOffsets = (evt, el) => {
      const rect = el.getBoundingClientRect();
      return { x: evt.clientX - rect.left, y: evt.clientY - rect.top };
    };

    shell.addEventListener('pointerenter', (event) => {
      wrap.classList.add('active');
      shell.classList.add('entering');
      if (enterTimer) window.clearTimeout(enterTimer);
      enterTimer = window.setTimeout(() => {
        shell.classList.remove('entering');
      }, ANIMATION_CONFIG.ENTER_TRANSITION_MS);
      const { x, y } = getOffsets(event, shell);
      tiltEngine.setTarget(x, y);
    });

    shell.addEventListener('pointermove', (event) => {
      const { x, y } = getOffsets(event, shell);
      tiltEngine.setTarget(x, y);
    });

    shell.addEventListener('pointerleave', () => {
      tiltEngine.toCenter();
      const checkSettle = () => {
        const { x, y, tx, ty } = tiltEngine.getCurrent();
        const settled = Math.hypot(tx - x, ty - y) < 0.6;
        if (settled) {
          wrap.classList.remove('active');
          leaveRaf = null;
        } else {
          leaveRaf = requestAnimationFrame(checkSettle);
        }
      };
      if (leaveRaf) cancelAnimationFrame(leaveRaf);
      leaveRaf = requestAnimationFrame(checkSettle);
    });

    const initialX = (shell.clientWidth || 300) - ANIMATION_CONFIG.INITIAL_X_OFFSET;
    const initialY = ANIMATION_CONFIG.INITIAL_Y_OFFSET;
    tiltEngine.setImmediate(shell.clientWidth / 2, shell.clientHeight / 2);

    // Defer intro tilt until the card is near viewport (avoids desktop TBT on load)
    const kickoffIntro = () => {
      tiltEngine.setImmediate(initialX, initialY);
      tiltEngine.toCenter();
      tiltEngine.beginInitial(ANIMATION_CONFIG.INITIAL_DURATION);
    };

    if ('IntersectionObserver' in window) {
      const introObserver = new IntersectionObserver(
        (entries) => {
          if (!entries.some((e) => e.isIntersecting)) return;
          introObserver.disconnect();
          if ('requestIdleCallback' in window) {
            requestIdleCallback(kickoffIntro, { timeout: 2000 });
          } else {
            setTimeout(kickoffIntro, 400);
          }
        },
        { rootMargin: '80px 0px', threshold: 0.15 }
      );
      introObserver.observe(wrap);
    }

    initVideoControls(wrap, shell);
  }

  function initVideoControls(wrap, shell) {
    const video = shell.querySelector('video.pc-bg-avatar');
    if (!video) return;

    const playVideo = () => {
      video.muted = false;
      video.play()
        .then(() => wrap.classList.add('is-playing'))
        .catch(() => {
          video.muted = true;
          video.play()
            .then(() => wrap.classList.add('is-playing'))
            .catch((playErr) => console.error('Video playback failed:', playErr));
        });
    };

    const pauseVideo = () => {
      video.pause();
      video.muted = true;
      wrap.classList.remove('is-playing');
    };

    wrap.addEventListener('click', (e) => {
      if (e.target.closest('.pc-contact-btn')) return;
      if (video.paused) playVideo();
      else pauseVideo();
    });

    const overlay = shell.querySelector('.pc-play-overlay');
    if (overlay) {
      overlay.addEventListener('keydown', (e) => {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        e.preventDefault();
        if (video.paused) playVideo();
        else pauseVideo();
      });
    }

    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) pauseVideo();
        });
      }, { threshold: 0.15 });
      observer.observe(aboutSection);
    }
  }

  wrappers.forEach(initProfileCard);

  const btn = document.querySelector('.pc-contact-btn');
  if (btn) {
    btn.addEventListener('click', () => {
      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
    });
  }
});
