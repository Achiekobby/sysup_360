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

/** Force-reveal any element that is still hidden — safety net for missed triggers. */
function forceRevealStuck(rootEl) {
  rootEl.querySelectorAll('[data-reveal]').forEach((el) => {
    const s = window.getComputedStyle(el);
    if (parseFloat(s.opacity) < 0.1 || s.visibility === 'hidden') {
      gsap.set(el, { clearProps: 'all' });
    }
    el.querySelectorAll('[data-reveal-child]').forEach((child) => {
      const cs = window.getComputedStyle(child);
      if (parseFloat(cs.opacity) < 0.1 || cs.visibility === 'hidden') {
        gsap.set(child, { clearProps: 'all' });
      }
    });
  });
}

/**
 * Initializes an advanced, batched scroll reveal system.
 * Usage: const cleanup = initScrollReveal(rootEl); cleanup();
 */
export function initScrollReveal(rootEl = document.body) {
  if (prefersReducedMotion()) {
    // Skip animations — keep everything visible.
    return () => {};
  }

  const ctx = gsap.context(() => {
    const elements = gsap.utils.toArray(rootEl.querySelectorAll('[data-reveal]'));

    // 1) Pre-set initial states
    elements.forEach((el) => {
      const type = el.getAttribute('data-reveal');
      if (type === 'stagger') setInitialStagger(el);
      else setInitial(el, type);
    });

    // 2) Immediately reveal elements already in the viewport (no scroll needed)
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.95) {
        const type = el.getAttribute('data-reveal');
        if (type === 'stagger') {
          animateInStagger(el);
        } else {
          animateIn([el], type);
        }
      }
    });

    // 3) Stagger containers — watch for remaining off-screen ones
    elements
      .filter((el) => {
        const rect = el.getBoundingClientRect();
        return el.getAttribute('data-reveal') === 'stagger' && rect.top >= window.innerHeight * 0.95;
      })
      .forEach((container) => {
        ScrollTrigger.create({
          trigger: container,
          start: 'top 92%',
          once: true,
          invalidateOnRefresh: true,
          onEnter: () => animateInStagger(container),
        });
      });

    // 4) Batch per type for off-screen elements
    const types = Object.keys(PRESETS);
    types.forEach((type) => {
      const group = elements.filter((el) => {
        if (el.getAttribute('data-reveal') !== type) return false;
        const rect = el.getBoundingClientRect();
        return rect.top >= window.innerHeight * 0.95;
      });
      if (!group.length) return;

      ScrollTrigger.batch(group, {
        start: 'top 92%',
        once: true,
        interval: 0.12,
        batchMax: 10,
        invalidateOnRefresh: true,
        onEnter: (batch) => animateIn(batch, type),
      });
    });

    ScrollTrigger.refresh();
  }, rootEl);

  // Layer 2: re-refresh after layout settles (fonts, images, dynamic heights)
  const refreshTimer = setTimeout(() => {
    ScrollTrigger.refresh();
  }, 400);

  // Layer 3: hard fallback — if anything is still hidden after 2.5s, force it visible
  const fallbackTimer = setTimeout(() => {
    forceRevealStuck(rootEl);
  }, 2500);

  return () => {
    clearTimeout(refreshTimer);
    clearTimeout(fallbackTimer);
    ctx.revert();
  };
}
