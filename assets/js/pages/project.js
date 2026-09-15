// assets/js/pages/project.js
import { getProjectBySlug, getProjects } from '../modules/api.js';
import { initReveal } from '../modules/animations.js';
import { qs, escapeHtml, formatDate, initials } from '../modules/utils.js';
import { toast } from '../modules/toast.js';
import { projectCard } from '../modules/components.js';

/* ---------- Slug extraction — order matters ---------- */
function getSlugFromUrl() {
  // 1. Hash: project.html#slug=xyz   ← survives server redirects
  const hash = location.hash.replace(/^#\/?/, '');          // strip leading "#" or "#/"
  if (hash) {
    const fromHash = new URLSearchParams(hash).get('slug');
    if (fromHash) return fromHash;
    // support "#/xyz" style too
    if (!hash.includes('=')) return decodeURIComponent(hash);
  }

  // 2. Query: project.html?slug=xyz
  const fromQuery = new URLSearchParams(location.search).get('slug');
  if (fromQuery) return fromQuery;

  // 3. Path: /project/xyz or /project.html/xyz
  const m = location.pathname.match(/\/project(?:\.html)?\/([^/?#]+)\/?$/);
  if (m) return decodeURIComponent(m[1]);

  return null;
}

/* ---------- Renderers (unchanged) ---------- */
function list(items, variant = '') {
  if (!items?.length) return '<p>Not documented.</p>';
  return `<ul class="detail-list${variant ? ` detail-list--${variant}` : ''}">
    ${items.map((i) => `<li>${escapeHtml(i)}</li>`).join('')}
  </ul>`;
}

function section(icon, title, body) {
  const iconHtml = icon
    ? `<span class="detail-section__icon" aria-hidden="true">${icon}</span>`
    : '';
  return `
    <section class="detail-section">
      <h2 class="detail-section__title">${iconHtml}${escapeHtml(title)}</h2>
      ${body}
    </section>
  `;
}

function linkList(p) {
  return [
    p.links.hosted  && { href: p.links.hosted,  label: 'Live demo', icon: '🌐' },
    p.links.github  && { href: p.links.github,  label: 'GitHub',    icon: '💻' },
    p.links.contact && { href: p.links.contact, label: 'Contact',   icon: '✉️' },
    p.links.social  && { href: p.links.social,  label: 'Social',    icon: '🔗' }
  ].filter(Boolean);
}

function renderDetail(p) {
  const root = qs('[data-project-root]');
  if (!root) return;
  const links = linkList(p);

  root.innerHTML = `
    <header class="detail-hero">
      <div class="container">
        <a class="detail-back" href="projects.html">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="m15 18-6-6 6-6"/></svg>
          All projects
        </a>

        <div class="detail-hero__meta">
          <span class="badge badge--accent">${escapeHtml(p.category)}</span>
          <span class="badge badge--${p.status === 'ongoing' ? 'warning' : 'success'}">
            ${p.status === 'ongoing' ? 'In progress' : 'Completed'}
          </span>
          <span class="badge">Batch ${escapeHtml(String(p.year))}</span>
        </div>

        <h1 class="detail-hero__title">${escapeHtml(p.projectName)}</h1>

        <div class="detail-hero__student">
          <span class="card__avatar" aria-hidden="true">${escapeHtml(initials(p.fullName))}</span>
          <span><strong>${escapeHtml(p.fullName)}</strong></span>
          <span class="detail-hero__id">${escapeHtml(p.studentId)}</span>
          <span>·</span>
          <span>Added ${formatDate(p.createdAt)}</span>
        </div>

        ${links.length ? `
          <div class="detail-links">
            ${links.map((l) => `
              <a class="btn btn--secondary btn--sm" href="${escapeHtml(l.href)}" target="_blank" rel="noopener noreferrer">
                <span aria-hidden="true">${l.icon}</span> ${escapeHtml(l.label)}
              </a>
            `).join('')}
          </div>
        ` : ''}
      </div>
    </header>

    <div class="container">
      <div class="detail-grid">
        <div>
          ${section('', 'Problem statement', `<p>${escapeHtml(p.problemStatement)}</p>`)}
          ${section('', 'Aim', `<p>${escapeHtml(p.aim)}</p>`)}
          ${section('', 'Objectives', list(p.objectives, 'success'))}
          ${section('', 'Approach & how it was built', `<p>${escapeHtml(p.approach)}</p>`)}
          ${section('', 'Development challenges', list(p.developmentChallenges, 'warn'))}
          ${section('', 'Mistakes made', list(p.mistakes, 'danger'))}
          ${section('', 'Key learnings', list(p.learning, 'success'))}
          ${section('', 'Summary of learning & growth', `
            <blockquote class="detail-quote">${escapeHtml(p.summaryOfGrowth)}</blockquote>
          `)}
        </div>

        <aside class="detail-aside">
          <div class="aside-card">
            <h3 class="aside-card__title">Tech stack</h3>
            <div class="tech-list">
              ${p.techStack.map((t) => `<span class="tag">${escapeHtml(t)}</span>`).join('')}
            </div>
          </div>

          <div class="aside-card">
            <h3 class="aside-card__title">Links</h3>
            <div class="aside-card__list">
              ${links.length ? links.map((l) => `
                <a href="${escapeHtml(l.href)}" target="_blank" rel="noopener noreferrer">
                  <span aria-hidden="true">${l.icon}</span> ${escapeHtml(l.label)}
                </a>
              `).join('') : '<span>No links provided.</span>'}
            </div>
          </div>

          <div class="aside-card">
            <h3 class="aside-card__title">Student</h3>
            <div class="aside-card__list">
              <span><strong>${escapeHtml(p.fullName)}</strong></span>
              <span class="detail-hero__id">${escapeHtml(p.studentId)}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  `;

  document.title = `${p.projectName} — Project Vault`;
  initReveal();
}

function renderNotFound(root, slug) {
  root.innerHTML = `
    <div class="container" style="padding-block:var(--space-16)">
      <div class="empty-state">
        <span class="empty-state__icon" aria-hidden="true"></span>
        <h1 class="empty-state__title">Project not found</h1>
        <p class="empty-state__text">No project matches <code>${escapeHtml(slug)}</code>.</p>
        <a class="btn btn--primary" href="projects.html">Back to all projects</a>
      </div>
    </div>
  `;
}

function renderError(root, err) {
  root.innerHTML = `
    <div class="container" style="padding-block:var(--space-16)">
      <div class="empty-state">
        <span class="empty-state__icon" aria-hidden="true"></span>
        <h1 class="empty-state__title">Couldn't load this project</h1>
        <p class="empty-state__text">${escapeHtml(err?.message || 'Unknown error')}.</p>
        <a class="btn btn--primary" href="projects.html">Back to all projects</a>
      </div>
    </div>
  `;
}

async function renderPicker(root) {
  root.innerHTML = `
    <div class="container" style="padding-block:var(--space-12)">
      <div class="empty-state" style="text-align:left;align-items:flex-start;padding:var(--space-10)">
        <span class="empty-state__icon" aria-hidden="true"></span>
        <h1 class="empty-state__title">Pick a project to view</h1>
        <p class="empty-state__text">You opened the detail page without a project selected.</p>
        <a class="btn btn--primary" href="projects.html">Browse all projects</a>
      </div>
      <div class="grid grid--cards" data-picker-grid style="margin-top:var(--space-8)"></div>
    </div>
  `;
  const grid = root.querySelector('[data-picker-grid]');
  try {
    const projects = await getProjects();
    const latest = [...projects]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 6);
    grid.innerHTML = latest.map((p, i) => projectCard(p, i)).join('');
    initReveal(root);
  } catch (err) {
    console.error('[project] picker fetch failed:', err);
  }
}

/* ---------- Entry ---------- */
export async function initProject() {
  const root = qs('[data-project-root]');
  if (!root) return;

  const slug = getSlugFromUrl();
  console.debug('[project] slug from URL:', slug, '| full URL:', location.href);

  if (!slug) {
    await renderPicker(root);
    return;
  }

  try {
    const project = await getProjectBySlug(slug);
    if (!project) { renderNotFound(root, slug); return; }
    renderDetail(project);
  } catch (err) {
    console.error('[project] load failed:', err);
    renderError(root, err);
    toast('Failed to load the project.', 'error');
  }
}