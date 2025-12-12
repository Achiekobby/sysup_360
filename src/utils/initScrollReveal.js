import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EASE = 'power3.out';

function prefersReducedMotion() {
  if (typeof window === 'undefined') return true;
  return window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;
}

const PRESETS = {
  fade: {
    from: { autoAlpha: 0 },
    to: { autoAlpha: 1, duration: 0.7, ease: EASE, clearProps: 'opacity,visibility' },
  },
  up: {
    from: { autoAlpha: 0, y: 28, filter: 'blur(6px)' },
    to: { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.8, ease: EASE, clearProps: 'transform,filter,opacity,visibility' },
  },
  left: {
    from: { autoAlpha: 0, x: -34, filter: 'blur(6px)' },
    to: { autoAlpha: 1, x: 0, filter: 'blur(0px)', duration: 0.85, ease: EASE, clearProps: 'transform,filter,opacity,visibility' },
  },
  right: {
    from: { autoAlpha: 0, x: 34, filter: 'blur(6px)' },
    to: { autoAlpha: 1, x: 0, filter: 'blur(0px)', duration: 0.85, ease: EASE, clearProps: 'transform,filter,opacity,visibility' },
  },
  scale: {
    from: { autoAlpha: 0, scale: 0.97, filter: 'blur(6px)' },
    to: { autoAlpha: 1, scale: 1, filter: 'blur(0px)', duration: 0.85, ease: EASE, clearProps: 'transform,filter,opacity,visibility' },
  },
  clip: {
    from: { autoAlpha: 0, y: 18, clipPath: 'inset(12% 0% 88% 0% round 18px)', filter: 'blur(8px)' },
    to: {
      autoAlpha: 1,
      y: 0,
      clipPath: 'inset(0% 0% 0% 0% round 18px)',
      filter: 'blur(0px)',
      duration: 0.95,
      ease: 'power4.out',
      clearProps: 'clip-path,transform,filter,opacity,visibility',
    },
  },
  tilt: {
    from: { autoAlpha: 0, y: 20, rotationX: 10, transformPerspective: 1000, transformOrigin: '50% 0%' },
    to: { autoAlpha: 1, y: 0, rotationX: 0, duration: 0.95, ease: 'power4.out', clearProps: 'transform,opacity,visibility' },
  },
};

function setInitial(el, type) {
  const preset = PRESETS[type] || PRESETS.up;
  gsap.set(el, preset.from);
}

function animateIn(batch, type) {
  const preset = PRESETS[type] || PRESETS.up;
  gsap.to(batch, { ...preset.to, stagger: 0.08, overwrite: 'auto' });
}

function setInitialStagger(container) {
  const children = container.querySelectorAll('[data-reveal-child]');
  if (!children.length) return;
  gsap.set(children, { autoAlpha: 0, y: 22, filter: 'blur(6px)' });
}

function animateInStagger(container) {
  const children = container.querySelectorAll('[data-reveal-child]');
  if (!children.length) return;
  gsap.to(children, {
    autoAlpha: 1,
    y: 0,
    filter: 'blur(0px)',
    duration: 0.85,
    ease: EASE,
    stagger: 0.08,
    clearProps: 'transform,filter,opacity,visibility',
    overwrite: 'auto',
  });
}

/**
 * Initializes an advanced, batched scroll reveal system.
 * Usage: const cleanup = initScrollReveal(rootEl); cleanup();
 */
export function initScrollReveal(rootEl = document.body) {
  if (prefersReducedMotion()) {
    // Keep content visible; no reveal animations.
    return () => {};
  }

  const ctx = gsap.context(() => {
    const elements = gsap.utils.toArray(rootEl.querySelectorAll('[data-reveal]'));

    // 1) Pre-set initial states (prevents popping)
    elements.forEach((el) => {
      const type = el.getAttribute('data-reveal');
      if (type === 'stagger') setInitialStagger(el);
      else setInitial(el, type);
    });

    // 2) Stagger containers (run once; no reverse)
    elements
      .filter((el) => el.getAttribute('data-reveal') === 'stagger')
      .forEach((container) => {
        ScrollTrigger.create({
          trigger: container,
          start: 'top 85%',
          once: true,
          onEnter: () => animateInStagger(container),
        });
      });

    // 3) Batch per type for consistent motion
    const types = Object.keys(PRESETS);
    types.forEach((type) => {
      const group = elements.filter((el) => el.getAttribute('data-reveal') === type);
      if (!group.length) return;

      ScrollTrigger.batch(group, {
        start: 'top 85%',
        once: true,
        interval: 0.12,
        batchMax: 10,
        onEnter: (batch) => animateIn(batch, type),
      });
    });

    // Ensure correct trigger positions
    ScrollTrigger.refresh();
  }, rootEl);

  return () => ctx.revert();
}


