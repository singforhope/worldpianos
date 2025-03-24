import{m as a}from"./mapbox-gl.DMBwQGmc.js";a.accessToken="pk.eyJ1Ijoic2ZoYWRtaW4iLCJhIjoiY2t6bWZnY2VhNWY0djJwdHZhZnpvY3prbSJ9.5vyd64pGtGwl9YfMNFH9eQ";const t={id:document.querySelector("[data-piano-id]")?.getAttribute("data-piano-id"),coordinates:JSON.parse(document.querySelector("[data-piano-coordinates]")?.getAttribute("data-piano-coordinates")||"[0,0]"),name:document.querySelector("[data-piano-name]")?.getAttribute("data-piano-name"),location:document.querySelector("[data-piano-location]")?.getAttribute("data-piano-location")},o=new a.Map({container:"piano-map",style:"mapbox://styles/mapbox/navigation-day-v1",center:t.coordinates,zoom:15,pitch:60,bearing:0});o.on("load",()=>{o.addControl(new a.NavigationControl,"top-right"),new a.Marker({color:"#FF0000",scale:.8}).setLngLat(t.coordinates).addTo(o),new a.Popup({offset:25}).setLngLat(t.coordinates).setHTML(`
                <div class="p-2">
                    <h3 class="font-bold text-lg">${t.name}</h3>
                    <p class="text-sm text-base-content/70">${t.location}</p>
                </div>
            `).addTo(o)});
