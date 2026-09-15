import { CONFIG } from '../config.js';
import { escapeHtml } from './utils.js';

export function toast(message, type = 'info') {
  const stack = document.querySelector('[data-toast-stack]');
  if (!stack) return;

  const el = document.createElement('div');
  el.className = `toast toast--${type}`;
  el.setAttribute('role', 'status');
  el.innerHTML = `<span>${escapeHtml(message)}</span>`;
  stack.appendChild(el);

  setTimeout(() => {
    el.classList.add('is-leaving');
    el.addEventListener('animationend', () => el.remove(), { once: true });
  }, CONFIG.toastDuration);
}