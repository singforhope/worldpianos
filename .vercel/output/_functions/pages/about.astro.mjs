import { c as createComponent, e as renderComponent, d as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_B7wYPocL.mjs';
import 'kleur/colors';
import { $ as $$MainLayout } from '../chunks/MainLayout_BkvJNTX7.mjs';
export { renderers } from '../renderers.mjs';

const $$About = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="w-full"> <!-- Hero Section --> <div class="hero min-h-[40vh] bg-base-200 rounded-box mb-12"> <div class="hero-content text-center"> <div class="max-w-2xl"> <h1 class="text-5xl font-bold mb-6">About WorldPianos</h1> <p class="text-xl mb-8">
Connecting piano enthusiasts worldwide through our
                        global piano mapping community
</p> <button class="btn btn-primary">Join Our Community</button> </div> </div> </div> <!-- Mission Section --> <div class="grid md:grid-cols-2 gap-8 mb-16 container mx-auto"> <div class="card bg-base-100 shadow-xl"> <div class="card-body"> <h2 class="card-title text-3xl mb-4">Our Mission</h2> <p class="text-lg">
WorldPianos aims to create a global community of piano
                        enthusiasts by mapping and documenting pianos around the
                        world. We believe in making music accessible to everyone
                        and connecting people through their shared love of
                        piano.
</p> </div> </div> <div class="card bg-base-100 shadow-xl"> <div class="card-body"> <h2 class="card-title text-3xl mb-4">What We Do</h2> <ul class="space-y-3 text-lg"> <li class="flex items-center gap-2"> <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path> </svg>
Map pianos worldwide
</li> <li class="flex items-center gap-2"> <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path> </svg>
Build a community of piano lovers
</li> <li class="flex items-center gap-2"> <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path> </svg>
Verify and maintain piano information
</li> </ul> </div> </div> </div> <!-- Features Section --> <div class="mb-16 container mx-auto"> <h2 class="text-3xl font-bold text-center mb-8">Key Features</h2> <div class="grid md:grid-cols-3 gap-6"> <div class="card bg-base-100 shadow-xl"> <div class="card-body"> <h3 class="card-title">Interactive Map</h3> <p>
Explore pianos around the world with our interactive
                            map interface
</p> </div> </div> <div class="card bg-base-100 shadow-xl"> <div class="card-body"> <h3 class="card-title">Piano Passport</h3> <p>Track your piano visits and build your collection</p> </div> </div> <div class="card bg-base-100 shadow-xl"> <div class="card-body"> <h3 class="card-title">Community Events</h3> <p>
Discover and join piano-related events in your area
</p> </div> </div> </div> </div> <!-- Call to Action --> <div class="bg-primary text-primary-content"> <div class="flex flex-col p-9 items-center text-center"> <h2 class="card-title text-3xl">Ready to Join?</h2> <p class="text-lg">
Start mapping pianos and connecting with fellow enthusiasts
                    today!
</p> <div class="card-actions justify-end mt-4"> <button class="btn btn-secondary">Sign Up</button> <button class="btn btn-ghost">Learn More</button> </div> </div> </div> </div> ` })}`;
}, "/Users/jhs/Projects/sfh/worldpianos-final-prod/src/pages/about.astro", void 0);

const $$file = "/Users/jhs/Projects/sfh/worldpianos-final-prod/src/pages/about.astro";
const $$url = "/about";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$About,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
