// Vanilla JS Port of react-bits ProfileCard tilt engine
document.addEventListener('DOMContentLoaded', () => {
  const clamp = (v, min = 0, max = 100) => Math.min(Math.max(v, min), max);
  const round = (v, precision = 3) => parseFloat(v.toFixed(precision));
  const adjust = (v, fMin, fMax, tMin, tMax) => round(tMin + ((tMax - tMin) * (v - fMin)) / (fMax - fMin));

  const ANIMATION_CONFIG = {
    INITIAL_DURATION: 1200,
    INITIAL_X_OFFSET: 70,
    INITIAL_Y_OFFSET: 60,
    DEVICE_BETA_OFFSET: 20,
    ENTER_TRANSITION_MS: 180
  };

  const wrap = document.querySelector('.pc-card-wrapper');
  const shell = document.querySelector('.pc-card-shell');
  if (!wrap || !shell) return;

  const enableTilt = true;
  const enableMobileTilt = false; // Setting to false initially as per requested default
  const mobileTiltSensitivity = 5;

  let enterTimer = null;
  let leaveRaf = null;

  // Tilt Engine
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
    wrap.style.setProperty('--rotate-x', `${round(-(centerY / 5))}deg`); // react code had a bug where x/y rotation axis were swapped or weird, fixing it for better 3d: rotateX is driven by Y, rotateY driven by X
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

    if (stillFar || document.hasFocus()) {
      rafId = requestAnimationFrame(step);
    } else {
      running = false;
      lastTs = 0;
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
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
    },
    cancel() {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = null;
      running = false;
      lastTs = 0;
    }
  };

  // Event Handlers
  const getOffsets = (evt, el) => {
    const rect = el.getBoundingClientRect();
    return { x: evt.clientX - rect.left, y: evt.clientY - rect.top };
  };

  const handlePointerMove = (event) => {
    const { x, y } = getOffsets(event, shell);
    tiltEngine.setTarget(x, y);
  };

  const handlePointerEnter = (event) => {
    wrap.classList.add('active');
    shell.classList.add('entering');
    if (enterTimer) window.clearTimeout(enterTimer);
    enterTimer = window.setTimeout(() => {
      shell.classList.remove('entering');
    }, ANIMATION_CONFIG.ENTER_TRANSITION_MS);

    const { x, y } = getOffsets(event, shell);
    tiltEngine.setTarget(x, y);
  };

  const handlePointerLeave = () => {
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
  };

  // Bind Events
  shell.addEventListener('pointerenter', handlePointerEnter);
  shell.addEventListener('pointermove', handlePointerMove);
  shell.addEventListener('pointerleave', handlePointerLeave);

  // Trigger initial subtle animation
  const initialX = (shell.clientWidth || 300) - ANIMATION_CONFIG.INITIAL_X_OFFSET;
  const initialY = ANIMATION_CONFIG.INITIAL_Y_OFFSET;
  tiltEngine.setImmediate(initialX, initialY);
  tiltEngine.toCenter();
  tiltEngine.beginInitial(ANIMATION_CONFIG.INITIAL_DURATION);
  
  // Contact Button Action
  const btn = document.querySelector('.pc-contact-btn');
  if(btn) {
    btn.addEventListener('click', () => {
      // scroll to contact smoothly
      document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Presentation Video Autoplay Control
  const video = shell.querySelector('video.pc-bg-avatar');
  if (video) {
    let hasInteracted = false;
    let inView = false;

    // Synchronize play state and muted state based on scroll and interaction status
    const syncVideoState = () => {
      if (inView) {
        if (hasInteracted) {
          video.muted = false;
        } else {
          video.muted = true;
        }
        video.play().catch(() => {});
      } else {
        video.pause();
        video.muted = true;
      }
    };

    // Flag interaction on the first click/touch on the document
    const handleFirstInteraction = () => {
      hasInteracted = true;
      // Remove listeners once captured
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
      document.removeEventListener('pointerdown', handleFirstInteraction);
      // Update audio status if currently in viewport
      syncVideoState();
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);
    document.addEventListener('pointerdown', handleFirstInteraction);

    // Intersection Observer to manage playback based on viewport visibility
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          inView = entry.isIntersecting;
          syncVideoState();
        });
      }, { threshold: 0.15 });

      observer.observe(aboutSection);
    }
  }
});
