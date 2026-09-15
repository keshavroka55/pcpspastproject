import { getProjects } from '../modules/api.js';
import { renderProjectGrid, renderSkeletonGrid, renderCategories, renderStats } from '../modules/render.js';
import { collectFacets } from '../modules/filters.js';
import { initReveal, countUp } from '../modules/animations.js';
import { CONFIG } from '../config.js';
import { qs, unique } from '../modules/utils.js';
import { toast } from '../modules/toast.js';

export async function initHome() {
  const featuredEl = qs('[data-featured]');
  const latestEl = qs('[data-latest]');
  const categoriesEl = qs('[data-categories]');
  const heroForm = qs('[data-hero-search]');

  renderSkeletonGrid(featuredEl, CONFIG.featuredCount);
  renderSkeletonGrid(latestEl, CONFIG.latestCount);

  try {
    const projects = await getProjects();

    // Featured
    const featured = projects.filter((p) => p.featured).slice(0, CONFIG.featuredCount);
    renderProjectGrid(featuredEl, featured.length ? featured : projects.slice(0, CONFIG.featuredCount));

    // Latest
    const latest = [...projects]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, CONFIG.latestCount);
    renderProjectGrid(latestEl, latest);

    // Categories
    const facets = collectFacets(projects);
    renderCategories(categoriesEl, facets.categories.slice(0, 8));

    // Stats (with count-up)
    const stats = {
      total: projects.length,
      students: projects.length,
      tech: unique(projects.flatMap((p) => p.techStack)).length,
      years: unique(projects.map((p) => p.year)).length
    };

    renderStats(document, stats);
    document.querySelectorAll('[data-stat]').forEach((el) => {
      const key = el.dataset.stat;
      const value = stats[key];
      if (typeof value === 'number') countUp(el, value);
    });

    // Hero search → projects page
    heroForm?.addEventListener('submit', (e) => {
      e.preventDefault();
      const q = new FormData(heroForm).get('q')?.toString().trim() || '';
      const url = q ? `projects.html?q=${encodeURIComponent(q)}` : 'projects.html';
      window.location.href = url;
    });

    initReveal();
  } catch (err) {
    console.error(err);
    toast('Could not load projects. Serve the site over HTTP.', 'error');
  }
}