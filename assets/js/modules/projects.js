import { getProjects } from '../modules/api.js';
import { applyFilters, sortProjects, collectFacets } from '../modules/filters.js';
import { paginate } from '../modules/pagination.js';
import { renderProjectGrid, renderSkeletonGrid, renderChips, renderPagination } from '../modules/render.js';
import { initReveal } from '../modules/animations.js';
import { CONFIG } from '../config.js';
import { qs, debounce } from '../modules/utils.js';
import { toast } from '../modules/toast.js';

const state = {
  query: '',
  category: '',
  year: '',
  status: '',
  tech: '',
  sort: 'newest',
  page: 1
};

export async function initProjects() {
  const grid = qs('[data-projects]');
  const paginationEl = qs('[data-pagination]');
  const countEl = qs('[data-result-count]');
  const countInline = qs('[data-result-count-inline]');

  const filtersForm = qs('[data-filters]');
  const searchInput = qs('#filter-q');
  const techSelect = qs('#filter-tech');
  const sortSelect = qs('[data-sort]');

  const catWrap = qs('[data-filter-categories]');
  const yearWrap = qs('[data-filter-years]');
  const statusWrap = qs('[data-filter-status]');

  renderSkeletonGrid(grid, CONFIG.perPage);

  let all = [];
  try {
    all = await getProjects();
  } catch (err) {
    console.error(err);
    toast('Failed to load projects.', 'error');
    return;
  }

  const facets = collectFacets(all);

  // Populate tech select
  if (techSelect) {
    techSelect.innerHTML =
      `<option value="">All technologies</option>` +
      facets.techs.map(({ value, count }) => `<option value="${value}">${value} (${count})</option>`).join('');
  }

  // Hydrate state from URL
  const params = new URLSearchParams(location.search);
  state.query = params.get('q') || '';
  state.category = params.get('category') || '';
  state.year = params.get('year') || '';
  state.status = params.get('status') || '';
  state.tech = params.get('tech') || '';
  state.sort = params.get('sort') || 'newest';
  state.page = Number(params.get('page')) || 1;

  if (searchInput) searchInput.value = state.query;
  if (techSelect) techSelect.value = state.tech;
  if (sortSelect) sortSelect.value = state.sort;

  // Filter chips
  renderChips(catWrap, facets.categories, state.category, { allLabel: 'All categories' });
  renderChips(yearWrap, facets.years, state.year, { allLabel: 'All batches' });
  renderChips(statusWrap, facets.statuses, state.status, { allLabel: 'All statuses' });

  const update = () => {
    let list = applyFilters(all, state);
    list = sortProjects(list, state.sort);

    const paged = paginate(list, state.page, CONFIG.perPage);

    renderProjectGrid(grid, paged.items, {
      empty: { title: 'No matching projects', text: 'Try changing the filters or search query.' }
    });
    renderPagination(paginationEl, paged);

    const label = `${paged.total} project${paged.total === 1 ? '' : 's'}`;
    if (countEl) countEl.textContent = label;
    if (countInline) {
      countInline.textContent = paged.total
        ? `Showing ${paged.rangeStart}–${paged.rangeEnd} of ${paged.total}`
        : 'No results';
    }

    syncURL();
    initReveal(grid);
  };

  const syncURL = () => {
    const p = new URLSearchParams();
    if (state.query) p.set('q', state.query);
    if (state.category) p.set('category', state.category);
    if (state.year) p.set('year', state.year);
    if (state.status) p.set('status', state.status);
    if (state.tech) p.set('tech', state.tech);
    if (state.sort && state.sort !== 'newest') p.set('sort', state.sort);
    if (state.page > 1) p.set('page', String(state.page));

    const qs = p.toString();
    history.replaceState(null, '', qs ? `?${qs}` : location.pathname);
  };

  const rerender = (patch = {}, resetPage = true) => {
    Object.assign(state, patch);
    if (resetPage) state.page = 1;
    update();
  };

  // Events
  const onSearch = debounce((value) => rerender({ query: value }), CONFIG.debounceMs);
  searchInput?.addEventListener('input', (e) => onSearch(e.target.value));

  techSelect?.addEventListener('change', (e) => rerender({ tech: e.target.value }));
  sortSelect?.addEventListener('change', (e) => rerender({ sort: e.target.value }, false));

  catWrap?.addEventListener('click', (e) => {
    const btn = e.target.closest('.chip');
    if (!btn) return;
    rerender({ category: btn.dataset.value });
    renderChips(catWrap, facets.categories, state.category, { allLabel: 'All categories' });
  });

  yearWrap?.addEventListener('click', (e) => {
    const btn = e.target.closest('.chip');
    if (!btn) return;
    rerender({ year: btn.dataset.value });
    renderChips(yearWrap, facets.years, state.year, { allLabel: 'All batches' });
  });

  statusWrap?.addEventListener('click', (e) => {
    const btn = e.target.closest('.chip');
    if (!btn) return;
    rerender({ status: btn.dataset.value });
    renderChips(statusWrap, facets.statuses, state.status, { allLabel: 'All statuses' });
  });

  filtersForm?.addEventListener('reset', (e) => {
    e.preventDefault();
    if (searchInput) searchInput.value = '';
    if (techSelect) techSelect.value = '';
    rerender({ query: '', category: '', year: '', status: '', tech: '' });
    renderChips(catWrap, facets.categories, '', { allLabel: 'All categories' });
    renderChips(yearWrap, facets.years, '', { allLabel: 'All batches' });
    renderChips(statusWrap, facets.statuses, '', { allLabel: 'All statuses' });
  });

  paginationEl?.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-page]');
    if (!btn || btn.disabled) return;
    const page = Number(btn.dataset.page);
    if (!page || page === state.page) return;
    state.page = page;
    update();
    window.scrollTo({ top: grid.offsetTop - 120, behavior: 'smooth' });
  });

  update();
}