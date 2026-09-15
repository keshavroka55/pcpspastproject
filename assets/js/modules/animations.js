import { CONFIG } from '../config.js';
import { prefersReducedMotion } from './utils.js';

export function initReveal(root = document) {
  const els = root.querySelectorAll('[data-reveal]');
  if (!els.length) return;

  if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: CONFIG.revealThreshold, rootMargin: '0px 0px -40px 0px' }
  );

  els.forEach((el) => io.observe(el));
}

export function countUp(el, target, duration = 900) {
  if (!el) return;
  if (prefersReducedMotion()) { el.textContent = String(target); return; }

  const start = performance.now();
  const from = 0;

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(from + (target - from) * eased);
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}