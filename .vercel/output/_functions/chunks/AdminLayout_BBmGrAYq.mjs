import { c as createComponent, a as createAstro, r as renderHead, b as renderSlot, d as renderTemplate } from './astro/server_B7wYPocL.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                             */

const $$Astro = createAstro();
const $$AdminLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$AdminLayout;
  return renderTemplate`<html> <head><title>My Astro Site</title>${renderHead()}</head> <body> <div class="flex flex-col h-screen"> <div class="flex-1 p-3"> ${renderSlot($$result, $$slots["default"])} </div> </div> </body></html>`;
}, "/Users/jhs/Projects/sfh/worldpianos-final-prod/src/layouts/AdminLayout.astro", void 0);

export { $$AdminLayout as $ };
