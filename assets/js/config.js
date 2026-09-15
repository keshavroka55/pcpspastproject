
const moduleUrl = new URL(import.meta.url);
if (!moduleUrl) {
    throw new Error('[ProjectVault] import.meta.url is unavailable — is this loaded as a module?');
}
const dataUrl = new URL('./data/projects.json', moduleUrl).href;
export const CONFIG = {
    dataUrl,
    perPage: 9,
    featuredCount: 3,
    latestCount: 6,
    debounceMs: 250,
    revealThreshold: 0.12,
    toastDuration: 3800
};

