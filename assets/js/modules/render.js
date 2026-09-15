import { projectCard, chip, pagination, emptyState } from './components.js';

export function renderProjectGrid(container, projects, opts = {}) {
  if (!container) return;

  if (!projects.length) {
    container.innerHTML = emptyState(opts.empty);
    container.setAttribute('aria-busy', 'false');
    return;
  }

  container.innerHTML = projects.map((p, i) => projectCard(p, i)).join('');
  container.setAttribute('aria-busy', 'false');
}

export function renderSkeletonGrid(container, count = 6) {
  if (!container) return;
  container.setAttribute('aria-busy', 'true');
  container.innerHTML = Array.from({ length: count }, () => `
    <article class="card" aria-hidden="true">
      <div class="skeleton" style="height:12px;width:35%"></div>
      <div class="skeleton skeleton--title"></div>
      <div class="skeleton skeleton--text"></div>
      <div class="skeleton skeleton--text" style="width:80%"></div>
      <div class="skeleton" style="height:24px;width:60%;margin-top:auto"></div>
    </article>
  `).join('');
}

export function renderChips(container, items, activeValue = '', { allLabel = 'All' } = {}) {
  if (!container) return;
  const html = [
    chip({ label: allLabel, value: '', active: !activeValue }),
    ...items.map(({ value, count }) =>
      chip({ label: value, value, count, active: String(activeValue) === String(value) })
    )
  ].join('');
  container.innerHTML = html;
}

export function renderPagination(container, state) {
  if (!container) return;
  container.innerHTML = pagination(state);
}

export function renderStats(root, { total, students, tech, years }) {
  const map = { total, students, tech, years };
  Object.entries(map).forEach(([key, val]) => {
    const el = root.querySelector(`[data-stat="${key}"]`);
    if (el) el.textContent = String(val);
  });
}

export function renderCategories(container, categories) {
  if (!container) return;
  container.innerHTML = categories
    .map(({ value, count }) => `
      <a class="chip" href="projects.html?category=${encodeURIComponent(value)}">
        ${value} <span class="chip__count">${count}</span>
      </a>
    `)
    .join('');
}