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
  const event = mockData.events.find((e) => e.id === id);
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "data-astro-cid-xoscxyy6": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container mx-auto px-4 py-8" data-astro-cid-xoscxyy6> ${event ? renderTemplate`<div class="grid grid-cols-1 lg:grid-cols-2 gap-8" data-astro-cid-xoscxyy6>  <div class="card bg-base-100 shadow-xl" data-astro-cid-xoscxyy6> <div class="card-body" data-astro-cid-xoscxyy6> <h1 class="card-title text-3xl" data-astro-cid-xoscxyy6>${event.name}</h1> <div class="flex flex-wrap gap-2 mt-4" data-astro-cid-xoscxyy6> <div class="badge badge-primary" data-astro-cid-xoscxyy6> ${event.type} </div> <div class="badge badge-success" data-astro-cid-xoscxyy6> ${event.date} </div> <div class="badge badge-info" data-astro-cid-xoscxyy6>${event.time}</div> </div> <div class="mt-6 space-y-4" data-astro-cid-xoscxyy6> <div data-astro-cid-xoscxyy6> <h2 class="text-xl font-semibold" data-astro-cid-xoscxyy6>
Location
</h2> <p class="text-base-content/70" data-astro-cid-xoscxyy6> ${event.location} </p> </div> <div data-astro-cid-xoscxyy6> <h2 class="text-xl font-semibold" data-astro-cid-xoscxyy6>
Description
</h2> <p class="text-base-content/70" data-astro-cid-xoscxyy6> ${event.description} </p> </div> <div data-astro-cid-xoscxyy6> <h2 class="text-xl font-semibold" data-astro-cid-xoscxyy6>
Related Piano
</h2> <p class="text-base-content/70" data-astro-cid-xoscxyy6> ${event.pianoId} </p> </div> </div> <div class="card-actions justify-end mt-6" data-astro-cid-xoscxyy6> <a${addAttribute(`/map?pianoId=${event.pianoId}`, "href")} class="btn btn-primary" data-astro-cid-xoscxyy6>
View Piano on Map
</a> </div> </div> </div>  <div class="card bg-base-100 shadow-xl" data-astro-cid-xoscxyy6> <div class="card-body" data-astro-cid-xoscxyy6> <h2 class="card-title" data-astro-cid-xoscxyy6>Location Map</h2> <div id="event-map" class="w-full h-[600px] rounded-lg" data-astro-cid-xoscxyy6></div> </div> </div> </div>` : renderTemplate`<div class="alert alert-error" data-astro-cid-xoscxyy6> <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24" data-astro-cid-xoscxyy6> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" data-astro-cid-xoscxyy6></path> </svg> <span data-astro-cid-xoscxyy6>Event not found</span> </div>`} </div> ` })} ${renderScript($$result, "/Users/jhs/Projects/sfh/worldpianos-final-prod/src/pages/events/[id].astro?astro&type=script&index=0&lang.ts")}   ${event && renderTemplate`<div${addAttribute(event.id, "data-event-id")}${addAttribute(JSON.stringify(event.coordinates), "data-event-coordinates")}${addAttribute(event.name, "data-event-name")}${addAttribute(event.location, "data-event-location")} class="hidden" data-astro-cid-xoscxyy6></div>`}`;
}, "/Users/jhs/Projects/sfh/worldpianos-final-prod/src/pages/events/[id].astro", void 0);

const $$file = "/Users/jhs/Projects/sfh/worldpianos-final-prod/src/pages/events/[id].astro";
const $$url = "/events/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$id,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
