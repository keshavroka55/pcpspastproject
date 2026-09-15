export function paginate(items, page, perPage) {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const current = Math.min(Math.max(1, page), totalPages);
  const start = (current - 1) * perPage;
  const end = start + perPage;

  return {
    items: items.slice(start, end),
    page: current,
    perPage,
    total,
    totalPages,
    hasPrev: current > 1,
    hasNext: current < totalPages,
    rangeStart: total === 0 ? 0 : start + 1,
    rangeEnd: Math.min(end, total)
  };
}

export function pageWindow(current, totalPages, span = 1) {
  const pages = new Set([1, totalPages, current]);
  for (let i = 1; i <= span; i++) {
    pages.add(current - i);
    pages.add(current + i);
  }
  return [...pages]
    .filter((p) => p >= 1 && p <= totalPages)
    .sort((a, b) => a - b);
}