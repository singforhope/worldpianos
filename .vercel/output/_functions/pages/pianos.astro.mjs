import { c as createComponent, e as renderComponent, d as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_B7wYPocL.mjs';
import 'kleur/colors';
import { $ as $$MainLayout } from '../chunks/MainLayout_BkvJNTX7.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1>Pianos</h1> ` })}`;
}, "/Users/jhs/Projects/sfh/worldpianos-final-prod/src/pages/pianos/index.astro", void 0);

const $$file = "/Users/jhs/Projects/sfh/worldpianos-final-prod/src/pages/pianos/index.astro";
const $$url = "/pianos";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
