// assets/js/pages/why.js
import { initReveal } from '../modules/animations.js';
import { qsa } from '../modules/utils.js';

export function initWhy() {
  // 1. Scroll reveals — every element with [data-reveal] fades in on entry.
  initReveal();

  // 2. Smooth-scroll for in-page anchor links (e.g. "Read the full story" → #the-problem)
  //    Browsers do this natively via `scroll-behavior: smooth` in base.css, but we
  //    also want to keep the URL clean — no `#the-problem` polluting the address bar.
  qsa('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href').slice(1);
      if (!id) return;

      const target = document.getElementById(id);
      if (!target) return;

      e.preventDefault();
      const headerOffset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;

      window.scrollTo({
        top,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
      });

      // Update the URL without jumping.
      history.replaceState(null, '', `#${id}`);
    });
  });

  // 3. Mark the "Why" nav link active (initHeader normally does this, but this
  //    makes the page self-sufficient if you ever load it in isolation).
  qsa('[data-nav]').forEach((el) => el.classList.remove('is-active'));
  const whyLink = document.querySelector('[data-nav="why"]');
  if (whyLink) whyLink.classList.add('is-active');

  console.debug('[why] initialised');
}