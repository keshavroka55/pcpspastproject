const KEY = 'pv:theme';

export function getStoredTheme() {
  try { return localStorage.getItem(KEY); } catch { return null; }
}

export function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  try { localStorage.setItem(KEY, theme); } catch {}
  const btn = document.querySelector('[data-theme-toggle]');
  if (btn) btn.setAttribute('aria-pressed', String(theme === 'dark'));
}

export function initThemeToggle() {
  const btn = document.querySelector('[data-theme-toggle]');
  if (!btn) return;

  const current = document.documentElement.getAttribute('data-theme') || 'light';
  btn.setAttribute('aria-pressed', String(current === 'dark'));

  btn.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  });
}