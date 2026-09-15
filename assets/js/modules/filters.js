export function applyFilters(projects, state) {
  const q = state.query.trim().toLowerCase();

  return projects.filter((p) => {
    if (state.category && p.category !== state.category) return false;
    if (state.year && String(p.year) !== String(state.year)) return false;
    if (state.status && p.status !== state.status) return false;
    if (state.tech && !p.techStack.includes(state.tech)) return false;

    if (q) {
      const haystack = [
        p.fullName,
        p.studentId,
        p.projectName,
        p.category,
        p.problemStatement,
        p.aim,
        ...p.techStack
      ]
        .join(' ')
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });
}

export function sortProjects(projects, sort) {
  const list = [...projects];
  switch (sort) {
    case 'oldest':
      return list.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    case 'name':
      return list.sort((a, b) => a.projectName.localeCompare(b.projectName));
    case 'student':
      return list.sort((a, b) => a.fullName.localeCompare(b.fullName));
    case 'newest':
    default:
      return list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
}

export function collectFacets(projects) {
  const categories = new Map();
  const years = new Map();
  const statuses = new Map();
  const techs = new Map();

  projects.forEach((p) => {
    categories.set(p.category, (categories.get(p.category) || 0) + 1);
    years.set(p.year, (years.get(p.year) || 0) + 1);
    statuses.set(p.status, (statuses.get(p.status) || 0) + 1);
    p.techStack.forEach((t) => techs.set(t, (techs.get(t) || 0) + 1));
  });

  const toSorted = (map) =>
    [...map.entries()]
      .map(([value, count]) => ({ value, count }))
      .sort((a, b) => b.count - a.count || String(a.value).localeCompare(String(b.value)));

  return {
    categories: toSorted(categories),
    years: toSorted(years),
    statuses: toSorted(statuses),
    techs: toSorted(techs)
  };
}