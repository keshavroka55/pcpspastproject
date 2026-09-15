import { escapeHtml, initials, formatDate } from './utils.js';
import { pageWindow } from './pagination.js';

export function projectCard(project, index = 0) {
  const tech = project.techStack.slice(0, 3);
  const extra = project.techStack.length - tech.length;

  return `
    <article class="card" data-animate style="--i:${index}">
      <div class="card__top">
        <span class="card__category">${escapeHtml(project.category)}</span>
        <span class="badge badge--${project.status === 'ongoing' ? 'warning' : 'success'}">
          ${project.status === 'ongoing' ? 'In progress' : 'Completed'}
        </span>
      </div>

      <h3 class="card__title">
        <a href="project.html#slug=${encodeURIComponent(project.slug)}">${escapeHtml(project.projectName)}</a>
      </h3>

      <div class="card__student">
        <span class="card__avatar" aria-hidden="true">${escapeHtml(initials(project.fullName))}</span>
        <span>${escapeHtml(project.fullName)} · <span class="detail-hero__id">${escapeHtml(project.studentId)}</span></span>
      </div>

      <p class="card__excerpt">${escapeHtml(project.problemStatement)}</p>

      <div class="card__tags">
        ${tech.map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join('')}
        ${extra > 0 ? `<span class="tag">+${extra}</span>` : ''}
      </div>

      <div class="card__footer">
        <span class="card__meta">${formatDate(project.createdAt)}</span>
        <a class="link-arrow" href="project.html?slug=${encodeURIComponent(project.slug)}">
          Read
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </a>
      </div>
    </article>
  `;
}

export function chip({ label, value, count, active }) {
  return `
    <button type="button" class="chip${active ? ' is-active' : ''}" data-value="${escapeHtml(value)}">
      ${escapeHtml(label)}
      ${typeof count === 'number' ? `<span class="chip__count">${count}</span>` : ''}
    </button>
  `;
}

export function pagination(state) {
  const { page, totalPages } = state;
  if (totalPages <= 1) return '';

  const window = pageWindow(page, totalPages);
  const parts = [];

  parts.push(`
    <button class="pagination__btn" data-page="${page - 1}" ${page <= 1 ? 'disabled' : ''} aria-label="Previous page">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="m15 18-6-6 6-6"/></svg>
    </button>
  `);

  window.forEach((p, i) => {
    const prev = window[i - 1];
    if (prev && p - prev > 1) {
      parts.push(`<span class="pagination__ellipsis">…</span>`);
    }
    parts.push(`
      <button class="pagination__btn${p === page ? ' is-active' : ''}" data-page="${p}" aria-label="Page ${p}" ${p === page ? 'aria-current="page"' : ''}>
        ${p}
      </button>
    `);
  });

  parts.push(`
    <button class="pagination__btn" data-page="${page + 1}" ${page >= totalPages ? 'disabled' : ''} aria-label="Next page">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="m9 18 6-6-6-6"/></svg>
    </button>
  `);

  return parts.join('');
}

export function emptyState({ title = 'No projects found', text = 'Try adjusting your filters or search query.' } = {}) {
  return `
    <div class="empty-state">
      <span class="empty-state__icon" aria-hidden="true">🔍</span>
      <h3 class="empty-state__title">${escapeHtml(title)}</h3>
      <p class="empty-state__text">${escapeHtml(text)}</p>
    </div>
  `;
}