import { c as createComponent, e as renderComponent, d as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_B7wYPocL.mjs';
import 'kleur/colors';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_BBmGrAYq.mjs';
export { renderers } from '../../renderers.mjs';

const $$Moderation = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h1>Moderation</h1> ` })}`;
}, "/Users/jhs/Projects/sfh/worldpianos-final-prod/src/pages/admin/moderation.astro", void 0);

const $$file = "/Users/jhs/Projects/sfh/worldpianos-final-prod/src/pages/admin/moderation.astro";
const $$url = "/admin/moderation";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Moderation,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
