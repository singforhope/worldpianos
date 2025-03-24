import { c as createComponent, a as createAstro, e as renderComponent, f as renderScript, g as addAttribute, d as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_B7wYPocL.mjs';
import 'kleur/colors';
import { m as mockData, $ as $$MainLayout } from '../../chunks/MainLayout_BkvJNTX7.mjs';
/* empty css                                   */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$id = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  const piano = mockData.pianos.find((p) => p.id === id);
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "data-astro-cid-e7plxkdk": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container mx-auto px-4 py-8" data-astro-cid-e7plxkdk> ${piano ? renderTemplate`<div class="grid grid-cols-1 lg:grid-cols-2 gap-8" data-astro-cid-e7plxkdk>  <div class="card bg-base-100 shadow-xl" data-astro-cid-e7plxkdk> <div class="card-body" data-astro-cid-e7plxkdk> <h1 class="card-title text-3xl" data-astro-cid-e7plxkdk>${piano.name}</h1> <div class="flex flex-wrap gap-2 mt-4" data-astro-cid-e7plxkdk> <div class="badge badge-primary" data-astro-cid-e7plxkdk> ${piano.type} </div> <div class="badge badge-success" data-astro-cid-e7plxkdk> ${piano.condition} </div> <div class="badge badge-info" data-astro-cid-e7plxkdk> ${piano.access} </div> </div> <div class="mt-6 space-y-4" data-astro-cid-e7plxkdk> <div data-astro-cid-e7plxkdk> <h2 class="text-xl font-semibold" data-astro-cid-e7plxkdk>
Location
</h2> <p class="text-base-content/70" data-astro-cid-e7plxkdk> ${piano.location} </p> </div> <div data-astro-cid-e7plxkdk> <h2 class="text-xl font-semibold" data-astro-cid-e7plxkdk>
Description
</h2> <p class="text-base-content/70" data-astro-cid-e7plxkdk> ${piano.description} </p> </div> <div data-astro-cid-e7plxkdk> <h2 class="text-xl font-semibold" data-astro-cid-e7plxkdk>
Last Maintained
</h2> <p class="text-base-content/70" data-astro-cid-e7plxkdk> ${piano.lastMaintained} </p> </div> </div> <div class="card-actions justify-end mt-6" data-astro-cid-e7plxkdk> <a${addAttribute(`/map?pianoId=${piano.id}`, "href")} class="btn btn-primary" data-astro-cid-e7plxkdk>
View on Map
</a> </div> </div> </div>  <div class="card bg-base-100 shadow-xl" data-astro-cid-e7plxkdk> <div class="card-body" data-astro-cid-e7plxkdk> <h2 class="card-title" data-astro-cid-e7plxkdk>Location Map</h2> <div id="piano-map" class="w-full h-[600px] rounded-lg" data-astro-cid-e7plxkdk></div> </div> </div> </div>` : renderTemplate`<div class="alert alert-error" data-astro-cid-e7plxkdk> <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24" data-astro-cid-e7plxkdk> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" data-astro-cid-e7plxkdk></path> </svg> <span data-astro-cid-e7plxkdk>Piano not found</span> </div>`} </div> ` })} ${renderScript($$result, "/Users/jhs/Projects/sfh/worldpianos-final-prod/src/pages/pianos/[id].astro?astro&type=script&index=0&lang.ts")}   ${piano && renderTemplate`<div${addAttribute(piano.id, "data-piano-id")}${addAttribute(JSON.stringify(piano.coordinates), "data-piano-coordinates")}${addAttribute(piano.name, "data-piano-name")}${addAttribute(piano.location, "data-piano-location")} class="hidden" data-astro-cid-e7plxkdk></div>`}`;
}, "/Users/jhs/Projects/sfh/worldpianos-final-prod/src/pages/pianos/[id].astro", void 0);

const $$file = "/Users/jhs/Projects/sfh/worldpianos-final-prod/src/pages/pianos/[id].astro";
const $$url = "/pianos/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$id,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
