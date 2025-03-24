import{m as e}from"./mapbox-gl.DMBwQGmc.js";e.accessToken="pk.eyJ1Ijoic2ZoYWRtaW4iLCJhIjoiY2t6bWZnY2VhNWY0djJwdHZhZnpvY3prbSJ9.5vyd64pGtGwl9YfMNFH9eQ";const t={id:document.querySelector("[data-event-id]")?.getAttribute("data-event-id"),coordinates:JSON.parse(document.querySelector("[data-event-coordinates]")?.getAttribute("data-event-coordinates")||"[0,0]"),name:document.querySelector("[data-event-name]")?.getAttribute("data-event-name"),location:document.querySelector("[data-event-location]")?.getAttribute("data-event-location")},a=new e.Map({container:"event-map",style:"mapbox://styles/mapbox/navigation-day-v1",center:t.coordinates,zoom:15,pitch:60,bearing:0});a.on("load",()=>{a.addControl(new e.NavigationControl,"top-right"),new e.Marker({color:"#FF0000",scale:.8}).setLngLat(t.coordinates).addTo(a),new e.Popup({offset:25}).setLngLat(t.coordinates).setHTML(`
                <div class="p-2">
                    <h3 class="font-bold text-lg">${t.name}</h3>
                    <p class="text-sm text-base-content/70">${t.location}</p>
                </div>
            `).addTo(a)});
