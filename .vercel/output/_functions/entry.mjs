import { renderers } from './renderers.mjs';
import { a as actions } from './chunks/_noop-actions_CfKMStZn.mjs';
import { c as createExports } from './chunks/entrypoint_DaVKjLQb.mjs';
import { manifest } from './manifest_DD0g9XbZ.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/about.astro.mjs');
const _page2 = () => import('./pages/admin/dashboard.astro.mjs');
const _page3 = () => import('./pages/admin/moderation.astro.mjs');
const _page4 = () => import('./pages/admin/settings.astro.mjs');
const _page5 = () => import('./pages/auth.astro.mjs');
const _page6 = () => import('./pages/events/_id_.astro.mjs');
const _page7 = () => import('./pages/events.astro.mjs');
const _page8 = () => import('./pages/map.astro.mjs');
const _page9 = () => import('./pages/pianos/_id_.astro.mjs');
const _page10 = () => import('./pages/pianos.astro.mjs');
const _page11 = () => import('./pages/user/passport.astro.mjs');
const _page12 = () => import('./pages/user/profile.astro.mjs');
const _page13 = () => import('./pages/user/settings.astro.mjs');
const _page14 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/about.astro", _page1],
    ["src/pages/admin/dashboard.astro", _page2],
    ["src/pages/admin/moderation.astro", _page3],
    ["src/pages/admin/settings.astro", _page4],
    ["src/pages/auth.astro", _page5],
    ["src/pages/events/[id].astro", _page6],
    ["src/pages/events/index.astro", _page7],
    ["src/pages/map.astro", _page8],
    ["src/pages/pianos/[id].astro", _page9],
    ["src/pages/pianos/index.astro", _page10],
    ["src/pages/user/passport.astro", _page11],
    ["src/pages/user/profile.astro", _page12],
    ["src/pages/user/settings.astro", _page13],
    ["src/pages/index.astro", _page14]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "554452f0-807c-461e-ab5d-fe4b61b9a32d",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
