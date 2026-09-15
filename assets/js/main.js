// assets/js/main.js
import { initThemeToggle } from './modules/theme.js';
import { initHeader } from './modules/header.js';
import { toast } from './modules/toast.js';

/* Map page → { loader, exportName } */
const PAGES = {
    home: { load: () => import('./pages/home.js'), exportName: 'initHome' },
    projects: { load: () => import('./pages/projects.js'), exportName: 'initProjects' },
    project: { load: () => import('./pages/project.js'), exportName: 'initProject' },
    why: { load: () => import('./pages/why.js'), exportName: 'initWhy' }

};

async function bootPage(page) {
    const entry = PAGES[page];
    if (!entry) return;

    let mod;
    try {
        mod = await entry.load();
    } catch (err) {
        // Import itself failed → fetch error, 404, syntax error, circular import
        console.error(`[ProjectVault] Failed to import page module for "${page}":`, err);
        toast?.(`Could not load the ${page} page module. Check the console.`, 'error');
        return;
    }

    console.debug(`[ProjectVault] "${page}" exports:`, Object.keys(mod));

    const fn = mod[entry.exportName];
    if (typeof fn !== 'function') {
        console.error(
            `[ProjectVault] Module for "${page}" does not export "${entry.exportName}".\n` +
            `Available exports: ${Object.keys(mod).join(', ') || '(none)'}\n` +
            `Hint: you probably wrote "export default" or renamed the export.`
        );
        toast?.(`The ${page} page module is missing its init function.`, 'error');
        return;
    }

    try {
        await fn();
    } catch (err) {
        console.error(`[ProjectVault] Init function for "${page}" threw:`, err);
        toast?.(`The ${page} page failed to render. Check the console.`, 'error');
    }
}

async function boot() {
    initThemeToggle();
    initHeader();

    const page = document.body.dataset.page;
    if (page) await bootPage(page);

    const updated = document.querySelector('[data-last-updated]');
    if (updated) {
        updated.textContent = new Date().toLocaleDateString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric'
        });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
} else {
    boot();
}