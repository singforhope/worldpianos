import 'kleur/colors';
import { h as decodeKey } from './chunks/astro/server_B7wYPocL.mjs';
import 'clsx';
import 'cookie';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_ri8401gz.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/jhs/Projects/sfh/worldpianos-final-prod/","cacheDir":"file:///Users/jhs/Projects/sfh/worldpianos-final-prod/node_modules/.astro/","outDir":"file:///Users/jhs/Projects/sfh/worldpianos-final-prod/dist/","srcDir":"file:///Users/jhs/Projects/sfh/worldpianos-final-prod/src/","publicDir":"file:///Users/jhs/Projects/sfh/worldpianos-final-prod/public/","buildClientDir":"file:///Users/jhs/Projects/sfh/worldpianos-final-prod/dist/client/","buildServerDir":"file:///Users/jhs/Projects/sfh/worldpianos-final-prod/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/Location.DRPKk7iQ.css"},{"type":"external","src":"/_astro/dashboard.q942iX8Y.css"},{"type":"inline","content":".mapboxgl-ctrl-geocoder[data-astro-cid-2bs6d2qm]{box-shadow:none!important;border:1px solid hsl(var(--bc) / .2)!important;border-radius:.5rem!important;background-color:hsl(var(--b1))!important;color:hsl(var(--bc))!important;font-family:inherit!important;width:100%!important;min-height:2.5rem!important}.mapboxgl-ctrl-geocoder[data-astro-cid-2bs6d2qm] .suggestions[data-astro-cid-2bs6d2qm]{background-color:hsl(var(--b1))!important;border:1px solid hsl(var(--bc) / .2)!important;border-radius:.5rem!important;margin-top:.5rem!important}.mapboxgl-ctrl-geocoder[data-astro-cid-2bs6d2qm] .suggestions[data-astro-cid-2bs6d2qm] .suggestion[data-astro-cid-2bs6d2qm]{padding:.5rem 1rem!important;color:hsl(var(--bc))!important}.mapboxgl-ctrl-geocoder[data-astro-cid-2bs6d2qm] .suggestions[data-astro-cid-2bs6d2qm] .suggestion[data-astro-cid-2bs6d2qm].active,.mapboxgl-ctrl-geocoder[data-astro-cid-2bs6d2qm] .suggestions[data-astro-cid-2bs6d2qm] .suggestion[data-astro-cid-2bs6d2qm]:hover{background-color:hsl(var(--b2))!important}.mapboxgl-ctrl-geocoder[data-astro-cid-2bs6d2qm] .suggestions[data-astro-cid-2bs6d2qm] .suggestion[data-astro-cid-2bs6d2qm] .address[data-astro-cid-2bs6d2qm]{color:hsl(var(--bc) / .7)!important}html[data-theme=dark]{color-scheme:dark}html[data-theme=light]{color-scheme:light}@keyframes fadeInDown{0%{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}.animate-fadeInDown{animation:fadeInDown .2s ease-out forwards}:root{color-scheme:light dark}\n"}],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/dashboard.q942iX8Y.css"}],"routeData":{"route":"/admin/dashboard","isIndex":false,"type":"page","pattern":"^\\/admin\\/dashboard\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"dashboard","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/dashboard.astro","pathname":"/admin/dashboard","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/dashboard.q942iX8Y.css"}],"routeData":{"route":"/admin/moderation","isIndex":false,"type":"page","pattern":"^\\/admin\\/moderation\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"moderation","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/moderation.astro","pathname":"/admin/moderation","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/dashboard.q942iX8Y.css"}],"routeData":{"route":"/admin/settings","isIndex":false,"type":"page","pattern":"^\\/admin\\/settings\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"settings","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/settings.astro","pathname":"/admin/settings","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/Location.DRPKk7iQ.css"},{"type":"external","src":"/_astro/dashboard.q942iX8Y.css"},{"type":"inline","content":".mapboxgl-ctrl-geocoder[data-astro-cid-2bs6d2qm]{box-shadow:none!important;border:1px solid hsl(var(--bc) / .2)!important;border-radius:.5rem!important;background-color:hsl(var(--b1))!important;color:hsl(var(--bc))!important;font-family:inherit!important;width:100%!important;min-height:2.5rem!important}.mapboxgl-ctrl-geocoder[data-astro-cid-2bs6d2qm] .suggestions[data-astro-cid-2bs6d2qm]{background-color:hsl(var(--b1))!important;border:1px solid hsl(var(--bc) / .2)!important;border-radius:.5rem!important;margin-top:.5rem!important}.mapboxgl-ctrl-geocoder[data-astro-cid-2bs6d2qm] .suggestions[data-astro-cid-2bs6d2qm] .suggestion[data-astro-cid-2bs6d2qm]{padding:.5rem 1rem!important;color:hsl(var(--bc))!important}.mapboxgl-ctrl-geocoder[data-astro-cid-2bs6d2qm] .suggestions[data-astro-cid-2bs6d2qm] .suggestion[data-astro-cid-2bs6d2qm].active,.mapboxgl-ctrl-geocoder[data-astro-cid-2bs6d2qm] .suggestions[data-astro-cid-2bs6d2qm] .suggestion[data-astro-cid-2bs6d2qm]:hover{background-color:hsl(var(--b2))!important}.mapboxgl-ctrl-geocoder[data-astro-cid-2bs6d2qm] .suggestions[data-astro-cid-2bs6d2qm] .suggestion[data-astro-cid-2bs6d2qm] .address[data-astro-cid-2bs6d2qm]{color:hsl(var(--bc) / .7)!important}html[data-theme=dark]{color-scheme:dark}html[data-theme=light]{color-scheme:light}@keyframes fadeInDown{0%{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}.animate-fadeInDown{animation:fadeInDown .2s ease-out forwards}:root{color-scheme:light dark}\n"}],"routeData":{"route":"/auth","isIndex":false,"type":"page","pattern":"^\\/auth\\/?$","segments":[[{"content":"auth","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/auth.astro","pathname":"/auth","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/Location.DRPKk7iQ.css"},{"type":"external","src":"/_astro/dashboard.q942iX8Y.css"},{"type":"inline","content":"@import\"https://unpkg.com/mapbox-gl@2.15.0/dist/mapbox-gl.css\";#event-map[data-astro-cid-xoscxyy6]{border-radius:.5rem}\n.mapboxgl-ctrl-geocoder[data-astro-cid-2bs6d2qm]{box-shadow:none!important;border:1px solid hsl(var(--bc) / .2)!important;border-radius:.5rem!important;background-color:hsl(var(--b1))!important;color:hsl(var(--bc))!important;font-family:inherit!important;width:100%!important;min-height:2.5rem!important}.mapboxgl-ctrl-geocoder[data-astro-cid-2bs6d2qm] .suggestions[data-astro-cid-2bs6d2qm]{background-color:hsl(var(--b1))!important;border:1px solid hsl(var(--bc) / .2)!important;border-radius:.5rem!important;margin-top:.5rem!important}.mapboxgl-ctrl-geocoder[data-astro-cid-2bs6d2qm] .suggestions[data-astro-cid-2bs6d2qm] .suggestion[data-astro-cid-2bs6d2qm]{padding:.5rem 1rem!important;color:hsl(var(--bc))!important}.mapboxgl-ctrl-geocoder[data-astro-cid-2bs6d2qm] .suggestions[data-astro-cid-2bs6d2qm] .suggestion[data-astro-cid-2bs6d2qm].active,.mapboxgl-ctrl-geocoder[data-astro-cid-2bs6d2qm] .suggestions[data-astro-cid-2bs6d2qm] .suggestion[data-astro-cid-2bs6d2qm]:hover{background-color:hsl(var(--b2))!important}.mapboxgl-ctrl-geocoder[data-astro-cid-2bs6d2qm] .suggestions[data-astro-cid-2bs6d2qm] .suggestion[data-astro-cid-2bs6d2qm] .address[data-astro-cid-2bs6d2qm]{color:hsl(var(--bc) / .7)!important}html[data-theme=dark]{color-scheme:dark}html[data-theme=light]{color-scheme:light}@keyframes fadeInDown{0%{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}.animate-fadeInDown{animation:fadeInDown .2s ease-out forwards}:root{color-scheme:light dark}\n"}],"routeData":{"route":"/events/[id]","isIndex":false,"type":"page","pattern":"^\\/events\\/([^/]+?)\\/?$","segments":[[{"content":"events","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/events/[id].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/Location.DRPKk7iQ.css"},{"type":"external","src":"/_astro/dashboard.q942iX8Y.css"},{"type":"inline","content":".fc-event[data-astro-cid-oygtpqo5]{cursor:pointer;transition:transform .2s}.fc-event[data-astro-cid-oygtpqo5]:hover{transform:scale(1.02)}\n.mapboxgl-ctrl-geocoder[data-astro-cid-2bs6d2qm]{box-shadow:none!important;border:1px solid hsl(var(--bc) / .2)!important;border-radius:.5rem!important;background-color:hsl(var(--b1))!important;color:hsl(var(--bc))!important;font-family:inherit!important;width:100%!important;min-height:2.5rem!important}.mapboxgl-ctrl-geocoder[data-astro-cid-2bs6d2qm] .suggestions[data-astro-cid-2bs6d2qm]{background-color:hsl(var(--b1))!important;border:1px solid hsl(var(--bc) / .2)!important;border-radius:.5rem!important;margin-top:.5rem!important}.mapboxgl-ctrl-geocoder[data-astro-cid-2bs6d2qm] .suggestions[data-astro-cid-2bs6d2qm] .suggestion[data-astro-cid-2bs6d2qm]{padding:.5rem 1rem!important;color:hsl(var(--bc))!important}.mapboxgl-ctrl-geocoder[data-astro-cid-2bs6d2qm] .suggestions[data-astro-cid-2bs6d2qm] .suggestion[data-astro-cid-2bs6d2qm].active,.mapboxgl-ctrl-geocoder[data-astro-cid-2bs6d2qm] .suggestions[data-astro-cid-2bs6d2qm] .suggestion[data-astro-cid-2bs6d2qm]:hover{background-color:hsl(var(--b2))!important}.mapboxgl-ctrl-geocoder[data-astro-cid-2bs6d2qm] .suggestions[data-astro-cid-2bs6d2qm] .suggestion[data-astro-cid-2bs6d2qm] .address[data-astro-cid-2bs6d2qm]{color:hsl(var(--bc) / .7)!important}html[data-theme=dark]{color-scheme:dark}html[data-theme=light]{color-scheme:light}@keyframes fadeInDown{0%{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}.animate-fadeInDown{animation:fadeInDown .2s ease-out forwards}:root{color-scheme:light dark}\n"}],"routeData":{"route":"/events","isIndex":true,"type":"page","pattern":"^\\/events\\/?$","segments":[[{"content":"events","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/events/index.astro","pathname":"/events","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/Location.DRPKk7iQ.css"},{"type":"external","src":"/_astro/dashboard.q942iX8Y.css"},{"type":"inline","content":"@import\"https://unpkg.com/mapbox-gl@2.15.0/dist/mapbox-gl.css\";.mapboxgl-popup-content[data-astro-cid-y6dp7ad7]{padding:0;border-radius:.5rem;background:hsl(var(--b1));color:hsl(var(--bc))}.mapboxgl-popup-close-button[data-astro-cid-y6dp7ad7],.mapboxgl-popup-close-button[data-astro-cid-y6dp7ad7]:focus,.mapboxgl-popup-close-button[data-astro-cid-y6dp7ad7]:focus-visible,.mapboxgl-popup-close-button[data-astro-cid-y6dp7ad7]:active,.mapboxgl-popup-close-button[data-astro-cid-y6dp7ad7]:hover{outline:none!important;box-shadow:none!important;-webkit-tap-highlight-color:transparent!important;-webkit-touch-callout:none!important;-webkit-user-select:none!important;user-select:none!important;background:transparent!important;border:none!important;padding:.5rem!important;color:hsl(var(--bc))!important}#map[data-astro-cid-y6dp7ad7]{min-height:500px}.mapboxgl-marker[data-astro-cid-y6dp7ad7]{cursor:pointer;transition:transform .2s ease}.mapboxgl-marker[data-astro-cid-y6dp7ad7]:hover{transform:scale(1.1)}.bg-maroon[data-astro-cid-y6dp7ad7]{background-color:maroon!important;border:2px solid white!important;box-shadow:0 0 4px #0000004d!important;position:relative!important;z-index:1!important}.mapboxgl-marker[data-astro-cid-y6dp7ad7] .bg-maroon[data-astro-cid-y6dp7ad7]{display:block!important;visibility:visible!important;opacity:1!important}\n.mapboxgl-ctrl-geocoder[data-astro-cid-2bs6d2qm]{box-shadow:none!important;border:1px solid hsl(var(--bc) / .2)!important;border-radius:.5rem!important;background-color:hsl(var(--b1))!important;color:hsl(var(--bc))!important;font-family:inherit!important;width:100%!important;min-height:2.5rem!important}.mapboxgl-ctrl-geocoder[data-astro-cid-2bs6d2qm] .suggestions[data-astro-cid-2bs6d2qm]{background-color:hsl(var(--b1))!important;border:1px solid hsl(var(--bc) / .2)!important;border-radius:.5rem!important;margin-top:.5rem!important}.mapboxgl-ctrl-geocoder[data-astro-cid-2bs6d2qm] .suggestions[data-astro-cid-2bs6d2qm] .suggestion[data-astro-cid-2bs6d2qm]{padding:.5rem 1rem!important;color:hsl(var(--bc))!important}.mapboxgl-ctrl-geocoder[data-astro-cid-2bs6d2qm] .suggestions[data-astro-cid-2bs6d2qm] .suggestion[data-astro-cid-2bs6d2qm].active,.mapboxgl-ctrl-geocoder[data-astro-cid-2bs6d2qm] .suggestions[data-astro-cid-2bs6d2qm] .suggestion[data-astro-cid-2bs6d2qm]:hover{background-color:hsl(var(--b2))!important}.mapboxgl-ctrl-geocoder[data-astro-cid-2bs6d2qm] .suggestions[data-astro-cid-2bs6d2qm] .suggestion[data-astro-cid-2bs6d2qm] .address[data-astro-cid-2bs6d2qm]{color:hsl(var(--bc) / .7)!important}html[data-theme=dark]{color-scheme:dark}html[data-theme=light]{color-scheme:light}@keyframes fadeInDown{0%{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}.animate-fadeInDown{animation:fadeInDown .2s ease-out forwards}:root{color-scheme:light dark}\n"}],"routeData":{"route":"/map","isIndex":false,"type":"page","pattern":"^\\/map\\/?$","segments":[[{"content":"map","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/map.astro","pathname":"/map","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/Location.DRPKk7iQ.css"},{"type":"external","src":"/_astro/dashboard.q942iX8Y.css"},{"type":"inline","content":"@import\"https://unpkg.com/mapbox-gl@2.15.0/dist/mapbox-gl.css\";#piano-map[data-astro-cid-e7plxkdk]{border-radius:.5rem}\n.mapboxgl-ctrl-geocoder[data-astro-cid-2bs6d2qm]{box-shadow:none!important;border:1px solid hsl(var(--bc) / .2)!important;border-radius:.5rem!important;background-color:hsl(var(--b1))!important;color:hsl(var(--bc))!important;font-family:inherit!important;width:100%!important;min-height:2.5rem!important}.mapboxgl-ctrl-geocoder[data-astro-cid-2bs6d2qm] .suggestions[data-astro-cid-2bs6d2qm]{background-color:hsl(var(--b1))!important;border:1px solid hsl(var(--bc) / .2)!important;border-radius:.5rem!important;margin-top:.5rem!important}.mapboxgl-ctrl-geocoder[data-astro-cid-2bs6d2qm] .suggestions[data-astro-cid-2bs6d2qm] .suggestion[data-astro-cid-2bs6d2qm]{padding:.5rem 1rem!important;color:hsl(var(--bc))!important}.mapboxgl-ctrl-geocoder[data-astro-cid-2bs6d2qm] .suggestions[data-astro-cid-2bs6d2qm] .suggestion[data-astro-cid-2bs6d2qm].active,.mapboxgl-ctrl-geocoder[data-astro-cid-2bs6d2qm] .suggestions[data-astro-cid-2bs6d2qm] .suggestion[data-astro-cid-2bs6d2qm]:hover{background-color:hsl(var(--b2))!important}.mapboxgl-ctrl-geocoder[data-astro-cid-2bs6d2qm] .suggestions[data-astro-cid-2bs6d2qm] .suggestion[data-astro-cid-2bs6d2qm] .address[data-astro-cid-2bs6d2qm]{color:hsl(var(--bc) / .7)!important}html[data-theme=dark]{color-scheme:dark}html[data-theme=light]{color-scheme:light}@keyframes fadeInDown{0%{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}.animate-fadeInDown{animation:fadeInDown .2s ease-out forwards}:root{color-scheme:light dark}\n"}],"routeData":{"route":"/pianos/[id]","isIndex":false,"type":"page","pattern":"^\\/pianos\\/([^/]+?)\\/?$","segments":[[{"content":"pianos","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}]],"params":["id"],"component":"src/pages/pianos/[id].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/Location.DRPKk7iQ.css"},{"type":"external","src":"/_astro/dashboard.q942iX8Y.css"},{"type":"inline","content":".mapboxgl-ctrl-geocoder[data-astro-cid-2bs6d2qm]{box-shadow:none!important;border:1px solid hsl(var(--bc) / .2)!important;border-radius:.5rem!important;background-color:hsl(var(--b1))!important;color:hsl(var(--bc))!important;font-family:inherit!important;width:100%!important;min-height:2.5rem!important}.mapboxgl-ctrl-geocoder[data-astro-cid-2bs6d2qm] .suggestions[data-astro-cid-2bs6d2qm]{background-color:hsl(var(--b1))!important;border:1px solid hsl(var(--bc) / .2)!important;border-radius:.5rem!important;margin-top:.5rem!important}.mapboxgl-ctrl-geocoder[data-astro-cid-2bs6d2qm] .suggestions[data-astro-cid-2bs6d2qm] .suggestion[data-astro-cid-2bs6d2qm]{padding:.5rem 1rem!important;color:hsl(var(--bc))!important}.mapboxgl-ctrl-geocoder[data-astro-cid-2bs6d2qm] .suggestions[data-astro-cid-2bs6d2qm] .suggestion[data-astro-cid-2bs6d2qm].active,.mapboxgl-ctrl-geocoder[data-astro-cid-2bs6d2qm] .suggestions[data-astro-cid-2bs6d2qm] .suggestion[data-astro-cid-2bs6d2qm]:hover{background-color:hsl(var(--b2))!important}.mapboxgl-ctrl-geocoder[data-astro-cid-2bs6d2qm] .suggestions[data-astro-cid-2bs6d2qm] .suggestion[data-astro-cid-2bs6d2qm] .address[data-astro-cid-2bs6d2qm]{color:hsl(var(--bc) / .7)!important}html[data-theme=dark]{color-scheme:dark}html[data-theme=light]{color-scheme:light}@keyframes fadeInDown{0%{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}.animate-fadeInDown{animation:fadeInDown .2s ease-out forwards}:root{color-scheme:light dark}\n"}],"routeData":{"route":"/pianos","isIndex":true,"type":"page","pattern":"^\\/pianos\\/?$","segments":[[{"content":"pianos","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/pianos/index.astro","pathname":"/pianos","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/Location.DRPKk7iQ.css"},{"type":"external","src":"/_astro/dashboard.q942iX8Y.css"},{"type":"inline","content":".mapboxgl-ctrl-geocoder[data-astro-cid-2bs6d2qm]{box-shadow:none!important;border:1px solid hsl(var(--bc) / .2)!important;border-radius:.5rem!important;background-color:hsl(var(--b1))!important;color:hsl(var(--bc))!important;font-family:inherit!important;width:100%!important;min-height:2.5rem!important}.mapboxgl-ctrl-geocoder[data-astro-cid-2bs6d2qm] .suggestions[data-astro-cid-2bs6d2qm]{background-color:hsl(var(--b1))!important;border:1px solid hsl(var(--bc) / .2)!important;border-radius:.5rem!important;margin-top:.5rem!important}.mapboxgl-ctrl-geocoder[data-astro-cid-2bs6d2qm] .suggestions[data-astro-cid-2bs6d2qm] .suggestion[data-astro-cid-2bs6d2qm]{padding:.5rem 1rem!important;color:hsl(var(--bc))!important}.mapboxgl-ctrl-geocoder[data-astro-cid-2bs6d2qm] .suggestions[data-astro-cid-2bs6d2qm] .suggestion[data-astro-cid-2bs6d2qm].active,.mapboxgl-ctrl-geocoder[data-astro-cid-2bs6d2qm] .suggestions[data-astro-cid-2bs6d2qm] .suggestion[data-astro-cid-2bs6d2qm]:hover{background-color:hsl(var(--b2))!important}.mapboxgl-ctrl-geocoder[data-astro-cid-2bs6d2qm] .suggestions[data-astro-cid-2bs6d2qm] .suggestion[data-astro-cid-2bs6d2qm] .address[data-astro-cid-2bs6d2qm]{color:hsl(var(--bc) / .7)!important}html[data-theme=dark]{color-scheme:dark}html[data-theme=light]{color-scheme:light}@keyframes fadeInDown{0%{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}.animate-fadeInDown{animation:fadeInDown .2s ease-out forwards}:root{color-scheme:light dark}\n"}],"routeData":{"route":"/user/passport","isIndex":false,"type":"page","pattern":"^\\/user\\/passport\\/?$","segments":[[{"content":"user","dynamic":false,"spread":false}],[{"content":"passport","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/user/passport.astro","pathname":"/user/passport","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/Location.DRPKk7iQ.css"},{"type":"external","src":"/_astro/dashboard.q942iX8Y.css"},{"type":"inline","content":".mapboxgl-ctrl-geocoder[data-astro-cid-2bs6d2qm]{box-shadow:none!important;border:1px solid hsl(var(--bc) / .2)!important;border-radius:.5rem!important;background-color:hsl(var(--b1))!important;color:hsl(var(--bc))!important;font-family:inherit!important;width:100%!important;min-height:2.5rem!important}.mapboxgl-ctrl-geocoder[data-astro-cid-2bs6d2qm] .suggestions[data-astro-cid-2bs6d2qm]{background-color:hsl(var(--b1))!important;border:1px solid hsl(var(--bc) / .2)!important;border-radius:.5rem!important;margin-top:.5rem!important}.mapboxgl-ctrl-geocoder[data-astro-cid-2bs6d2qm] .suggestions[data-astro-cid-2bs6d2qm] .suggestion[data-astro-cid-2bs6d2qm]{padding:.5rem 1rem!important;color:hsl(var(--bc))!important}.mapboxgl-ctrl-geocoder[data-astro-cid-2bs6d2qm] .suggestions[data-astro-cid-2bs6d2qm] .suggestion[data-astro-cid-2bs6d2qm].active,.mapboxgl-ctrl-geocoder[data-astro-cid-2bs6d2qm] .suggestions[data-astro-cid-2bs6d2qm] .suggestion[data-astro-cid-2bs6d2qm]:hover{background-color:hsl(var(--b2))!important}.mapboxgl-ctrl-geocoder[data-astro-cid-2bs6d2qm] .suggestions[data-astro-cid-2bs6d2qm] .suggestion[data-astro-cid-2bs6d2qm] .address[data-astro-cid-2bs6d2qm]{color:hsl(var(--bc) / .7)!important}html[data-theme=dark]{color-scheme:dark}html[data-theme=light]{color-scheme:light}@keyframes fadeInDown{0%{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}.animate-fadeInDown{animation:fadeInDown .2s ease-out forwards}:root{color-scheme:light dark}\n"}],"routeData":{"route":"/user/profile","isIndex":false,"type":"page","pattern":"^\\/user\\/profile\\/?$","segments":[[{"content":"user","dynamic":false,"spread":false}],[{"content":"profile","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/user/profile.astro","pathname":"/user/profile","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/Location.DRPKk7iQ.css"},{"type":"external","src":"/_astro/dashboard.q942iX8Y.css"},{"type":"inline","content":".mapboxgl-ctrl-geocoder[data-astro-cid-2bs6d2qm]{box-shadow:none!important;border:1px solid hsl(var(--bc) / .2)!important;border-radius:.5rem!important;background-color:hsl(var(--b1))!important;color:hsl(var(--bc))!important;font-family:inherit!important;width:100%!important;min-height:2.5rem!important}.mapboxgl-ctrl-geocoder[data-astro-cid-2bs6d2qm] .suggestions[data-astro-cid-2bs6d2qm]{background-color:hsl(var(--b1))!important;border:1px solid hsl(var(--bc) / .2)!important;border-radius:.5rem!important;margin-top:.5rem!important}.mapboxgl-ctrl-geocoder[data-astro-cid-2bs6d2qm] .suggestions[data-astro-cid-2bs6d2qm] .suggestion[data-astro-cid-2bs6d2qm]{padding:.5rem 1rem!important;color:hsl(var(--bc))!important}.mapboxgl-ctrl-geocoder[data-astro-cid-2bs6d2qm] .suggestions[data-astro-cid-2bs6d2qm] .suggestion[data-astro-cid-2bs6d2qm].active,.mapboxgl-ctrl-geocoder[data-astro-cid-2bs6d2qm] .suggestions[data-astro-cid-2bs6d2qm] .suggestion[data-astro-cid-2bs6d2qm]:hover{background-color:hsl(var(--b2))!important}.mapboxgl-ctrl-geocoder[data-astro-cid-2bs6d2qm] .suggestions[data-astro-cid-2bs6d2qm] .suggestion[data-astro-cid-2bs6d2qm] .address[data-astro-cid-2bs6d2qm]{color:hsl(var(--bc) / .7)!important}html[data-theme=dark]{color-scheme:dark}html[data-theme=light]{color-scheme:light}@keyframes fadeInDown{0%{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}.animate-fadeInDown{animation:fadeInDown .2s ease-out forwards}:root{color-scheme:light dark}\n"}],"routeData":{"route":"/user/settings","isIndex":false,"type":"page","pattern":"^\\/user\\/settings\\/?$","segments":[[{"content":"user","dynamic":false,"spread":false}],[{"content":"settings","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/user/settings.astro","pathname":"/user/settings","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/Location.DRPKk7iQ.css"},{"type":"external","src":"/_astro/dashboard.q942iX8Y.css"},{"type":"inline","content":".mapboxgl-ctrl-geocoder[data-astro-cid-2bs6d2qm]{box-shadow:none!important;border:1px solid hsl(var(--bc) / .2)!important;border-radius:.5rem!important;background-color:hsl(var(--b1))!important;color:hsl(var(--bc))!important;font-family:inherit!important;width:100%!important;min-height:2.5rem!important}.mapboxgl-ctrl-geocoder[data-astro-cid-2bs6d2qm] .suggestions[data-astro-cid-2bs6d2qm]{background-color:hsl(var(--b1))!important;border:1px solid hsl(var(--bc) / .2)!important;border-radius:.5rem!important;margin-top:.5rem!important}.mapboxgl-ctrl-geocoder[data-astro-cid-2bs6d2qm] .suggestions[data-astro-cid-2bs6d2qm] .suggestion[data-astro-cid-2bs6d2qm]{padding:.5rem 1rem!important;color:hsl(var(--bc))!important}.mapboxgl-ctrl-geocoder[data-astro-cid-2bs6d2qm] .suggestions[data-astro-cid-2bs6d2qm] .suggestion[data-astro-cid-2bs6d2qm].active,.mapboxgl-ctrl-geocoder[data-astro-cid-2bs6d2qm] .suggestions[data-astro-cid-2bs6d2qm] .suggestion[data-astro-cid-2bs6d2qm]:hover{background-color:hsl(var(--b2))!important}.mapboxgl-ctrl-geocoder[data-astro-cid-2bs6d2qm] .suggestions[data-astro-cid-2bs6d2qm] .suggestion[data-astro-cid-2bs6d2qm] .address[data-astro-cid-2bs6d2qm]{color:hsl(var(--bc) / .7)!important}html[data-theme=dark]{color-scheme:dark}html[data-theme=light]{color-scheme:light}@keyframes fadeInDown{0%{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}.animate-fadeInDown{animation:fadeInDown .2s ease-out forwards}:root{color-scheme:light dark}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/jhs/Projects/sfh/worldpianos-final-prod/src/pages/admin/dashboard.astro",{"propagation":"none","containsHead":true}],["/Users/jhs/Projects/sfh/worldpianos-final-prod/src/pages/admin/moderation.astro",{"propagation":"none","containsHead":true}],["/Users/jhs/Projects/sfh/worldpianos-final-prod/src/pages/admin/settings.astro",{"propagation":"none","containsHead":true}],["/Users/jhs/Projects/sfh/worldpianos-final-prod/src/pages/about.astro",{"propagation":"none","containsHead":true}],["/Users/jhs/Projects/sfh/worldpianos-final-prod/src/pages/auth.astro",{"propagation":"none","containsHead":true}],["/Users/jhs/Projects/sfh/worldpianos-final-prod/src/pages/events/[id].astro",{"propagation":"none","containsHead":true}],["/Users/jhs/Projects/sfh/worldpianos-final-prod/src/pages/events/index.astro",{"propagation":"none","containsHead":true}],["/Users/jhs/Projects/sfh/worldpianos-final-prod/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/jhs/Projects/sfh/worldpianos-final-prod/src/pages/map.astro",{"propagation":"none","containsHead":true}],["/Users/jhs/Projects/sfh/worldpianos-final-prod/src/pages/pianos/[id].astro",{"propagation":"none","containsHead":true}],["/Users/jhs/Projects/sfh/worldpianos-final-prod/src/pages/pianos/index.astro",{"propagation":"none","containsHead":true}],["/Users/jhs/Projects/sfh/worldpianos-final-prod/src/pages/user/passport.astro",{"propagation":"none","containsHead":true}],["/Users/jhs/Projects/sfh/worldpianos-final-prod/src/pages/user/profile.astro",{"propagation":"none","containsHead":true}],["/Users/jhs/Projects/sfh/worldpianos-final-prod/src/pages/user/settings.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:src/pages/about@_@astro":"pages/about.astro.mjs","\u0000@astro-page:src/pages/admin/dashboard@_@astro":"pages/admin/dashboard.astro.mjs","\u0000@astro-page:src/pages/admin/moderation@_@astro":"pages/admin/moderation.astro.mjs","\u0000@astro-page:src/pages/admin/settings@_@astro":"pages/admin/settings.astro.mjs","\u0000@astro-page:src/pages/auth@_@astro":"pages/auth.astro.mjs","\u0000@astro-page:src/pages/events/[id]@_@astro":"pages/events/_id_.astro.mjs","\u0000@astro-page:src/pages/events/index@_@astro":"pages/events.astro.mjs","\u0000@astro-page:src/pages/map@_@astro":"pages/map.astro.mjs","\u0000@astro-page:src/pages/pianos/[id]@_@astro":"pages/pianos/_id_.astro.mjs","\u0000@astro-page:src/pages/pianos/index@_@astro":"pages/pianos.astro.mjs","\u0000@astro-page:src/pages/user/passport@_@astro":"pages/user/passport.astro.mjs","\u0000@astro-page:src/pages/user/profile@_@astro":"pages/user/profile.astro.mjs","\u0000@astro-page:src/pages/user/settings@_@astro":"pages/user/settings.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","/Users/jhs/Projects/sfh/worldpianos-final-prod/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_C8sTwz4x.mjs","\u0000@astrojs-manifest":"manifest_DD0g9XbZ.mjs","/Users/jhs/Projects/sfh/worldpianos-final-prod/src/pages/events/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.iSf78Dew.js","/Users/jhs/Projects/sfh/worldpianos-final-prod/src/pages/map.astro?astro&type=script&index=0&lang.ts":"_astro/map.astro_astro_type_script_index_0_lang.BUgSQiJw.js","/Users/jhs/Projects/sfh/worldpianos-final-prod/src/pages/events/[id].astro?astro&type=script&index=0&lang.ts":"_astro/_id_.astro_astro_type_script_index_0_lang.GHgXGzSK.js","/Users/jhs/Projects/sfh/worldpianos-final-prod/src/pages/pianos/[id].astro?astro&type=script&index=0&lang.ts":"_astro/_id_.astro_astro_type_script_index_0_lang.BDoKlVTn.js","/Users/jhs/Projects/sfh/worldpianos-final-prod/src/components/layout/Header.astro?astro&type=script&index=0&lang.ts":"_astro/Header.astro_astro_type_script_index_0_lang.BbwdFYUf.js","/Users/jhs/Projects/sfh/worldpianos-final-prod/src/components/search/Location.astro?astro&type=script&index=0&lang.ts":"_astro/Location.astro_astro_type_script_index_0_lang.nb8sIWGW.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/jhs/Projects/sfh/worldpianos-final-prod/src/components/layout/Header.astro?astro&type=script&index=0&lang.ts","const r=document.getElementById(\"theme-toggle\"),o=r?.querySelector(\".theme-text\"),c=document.documentElement;if(r&&o){r.addEventListener(\"click\",()=>{const a=c.getAttribute(\"data-theme\")===\"light\"?\"dark\":\"light\";c.setAttribute(\"data-theme\",a),localStorage.setItem(\"theme\",a),o.textContent=a===\"light\"?\"Dark Mode\":\"Light Mode\"});const e=c.getAttribute(\"data-theme\")||\"light\";o.textContent=e===\"light\"?\"Dark Mode\":\"Light Mode\"}const n=document.getElementById(\"search-input\"),t=document.querySelector(\".search-results\"),i=document.getElementById(\"search-form\");n&&t&&i&&(n.addEventListener(\"focus\",()=>{t.classList.remove(\"opacity-0\",\"-translate-y-2\",\"pointer-events-none\"),t.classList.add(\"opacity-100\",\"translate-y-0\")}),i.addEventListener(\"submit\",e=>{e.preventDefault();const s=n.value.trim();s&&(window.location.href=`/?q=${encodeURIComponent(s)}`)}),document.addEventListener(\"click\",e=>{!n.contains(e.target)&&!t?.contains(e.target)&&(t.classList.remove(\"opacity-100\",\"translate-y-0\"),t.classList.add(\"opacity-0\",\"-translate-y-2\",\"pointer-events-none\"))}),t.addEventListener(\"click\",e=>{e.target.closest(\"a\")&&(t.classList.remove(\"opacity-100\",\"translate-y-0\"),t.classList.add(\"opacity-0\",\"-translate-y-2\",\"pointer-events-none\"))}));"]],"assets":["/_astro/dashboard.q942iX8Y.css","/favicon.svg","/_astro/Location.DRPKk7iQ.css","/_astro/Location.astro_astro_type_script_index_0_lang.nb8sIWGW.js","/_astro/_id_.astro_astro_type_script_index_0_lang.BDoKlVTn.js","/_astro/_id_.astro_astro_type_script_index_0_lang.GHgXGzSK.js","/_astro/index.astro_astro_type_script_index_0_lang.iSf78Dew.js","/_astro/map.astro_astro_type_script_index_0_lang.BUgSQiJw.js","/_astro/mapbox-gl.DMBwQGmc.js"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"xl6djRHmFR/8mDo8o1biQYjasszZRsFcmPv5/rFJ84g="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
