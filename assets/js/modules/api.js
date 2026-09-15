import { CONFIG } from '../config.js';
import { slugify } from './utils.js';

let cache = null;

function normalize(raw) {
  return {
    id: raw.id,
    slug: raw.slug || slugify(raw.projectName),
    fullName: raw.fullName,
    studentId: raw.studentId,
    projectName: raw.projectName,
    category: raw.category,
    year: raw.year,
    status: raw.status || 'completed',
    featured: Boolean(raw.featured),
    createdAt: raw.createdAt,
    techStack: raw.techStack || [],
    problemStatement: raw.problemStatement || '',
    aim: raw.aim || '',
    objectives: raw.objectives || [],
    approach: raw.approach || '',
    developmentChallenges: raw.developmentChallenges || [],
    mistakes: raw.mistakes || [],
    learning: raw.learning || [],
    summaryOfGrowth: raw.summaryOfGrowth || '',
    links: {
      hosted: raw.links?.hosted || '',
      github: raw.links?.github || '',
      contact: raw.links?.contact || '',
      social: raw.links?.social || ''
    }
  };
}

export async function getProjects() {
  if (cache) return cache;

  const res = await fetch(CONFIG.dataUrl, { cache: 'no-cache' });
  if (!res.ok) throw new Error(`Failed to load projects (${res.status})`);

  const json = await res.json();
  const list = Array.isArray(json) ? json : json.projects || [];
  cache = list.map(normalize);
  return cache;
}

export async function getProjectBySlug(slug) {
  const all = await getProjects();
  return all.find((p) => p.slug === slug) || null;
}

export async function getMeta() {
  const res = await fetch(CONFIG.dataUrl, { cache: 'no-cache' });
  if (!res.ok) throw new Error('Failed to load meta');
  const json = await res.json();
  return json.meta || {};
}