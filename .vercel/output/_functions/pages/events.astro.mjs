import { c as createComponent, e as renderComponent, f as renderScript, d as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_B7wYPocL.mjs';
import 'kleur/colors';
import { $ as $$MainLayout } from '../chunks/MainLayout_BkvJNTX7.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "data-astro-cid-oygtpqo5": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container mx-auto p-4" data-astro-cid-oygtpqo5> <div class="card bg-base-100" data-astro-cid-oygtpqo5> <div class="card-body" data-astro-cid-oygtpqo5> <h1 class="card-title text-2xl mb-4" data-astro-cid-oygtpqo5>Events Calendar</h1> <!-- Mobile Tabs --> <div class="tabs tabs-boxed lg:hidden mb-4" data-astro-cid-oygtpqo5> <a class="tab mobile-tab tab-active" data-tab="calendar" data-astro-cid-oygtpqo5>Calendar</a> <a class="tab mobile-tab" data-tab="events" data-astro-cid-oygtpqo5>Events List</a> </div> <!-- Split View Container --> <div class="flex flex-col lg:flex-row gap-4" data-astro-cid-oygtpqo5> <!-- Calendar View --> <div class="w-full lg:w-2/3" id="calendar-tab" data-astro-cid-oygtpqo5> <div id="calendar" class="w-full" data-astro-cid-oygtpqo5></div> </div> <!-- Events List View --> <div class="w-full lg:w-1/3 hidden lg:block" id="events-tab" data-astro-cid-oygtpqo5> <div class="bg-base-200 rounded-lg p-4" data-astro-cid-oygtpqo5> <!-- Events Type Tabs --> <div class="tabs tabs-boxed mb-4" data-astro-cid-oygtpqo5> <a class="tab event-type-tab tab-active" data-events-type="upcoming" data-astro-cid-oygtpqo5>Upcoming</a> <a class="tab event-type-tab" data-events-type="past" data-astro-cid-oygtpqo5>Past</a> </div> <div class="space-y-4" id="events-list" data-astro-cid-oygtpqo5> <!-- Events will be populated by JavaScript --> </div> </div> </div> </div> </div> </div> </div> ` })} ${renderScript($$result, "/Users/jhs/Projects/sfh/worldpianos-final-prod/src/pages/events/index.astro?astro&type=script&index=0&lang.ts")} `;
}, "/Users/jhs/Projects/sfh/worldpianos-final-prod/src/pages/events/index.astro", void 0);

const $$file = "/Users/jhs/Projects/sfh/worldpianos-final-prod/src/pages/events/index.astro";
const $$url = "/events";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
