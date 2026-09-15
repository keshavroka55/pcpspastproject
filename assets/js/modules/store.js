const listeners = new Set();

const state = {
  query: '',
  category: '',
  year: '',
  status: '',
  tech: '',
  sort: 'newest',
  page: 1
};

export function getState() {
  return { ...state };
}

export function setState(patch) {
  Object.assign(state, patch);
  emit();
}

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function emit() {
  const snapshot = getState();
  listeners.forEach((fn) => fn(snapshot));
}