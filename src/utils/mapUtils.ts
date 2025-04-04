// mapUtils.ts - Utility functions for map components

// Define Piano type
export interface MapPiano {
  id: string;
  name: string;
  location: string;
  coordinates: [number, number];
  description: string;
  type: string;
  condition: string;
  category: string;
  city: string;
  country: string;
}

// Create airplane SVG icon for airport pianos
export const createAirportMarker = (): HTMLElement => {
  const airplaneIcon = document.createElement("div");
  airplaneIcon.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_1_2)">
            <circle cx="31" cy="31" r="28" fill="#F8F8F8" stroke="#F8F8F8" stroke-width="6"/>
            <path d="M11.8322 30.7951L20.2283 25.7239C21.6372 24.8742 22.3417 24.4494 22.828 23.8667C24.9326 21.345 23.0792 17.6204 23.3931 14.6879C23.7179 11.6525 26.635 7.50088 29.5755 6.21377C30.4806 5.81764 31.5187 5.81764 32.4238 6.21377C35.3643 7.50088 38.2814 11.6525 38.6062 14.6879C38.92 17.6204 37.0667 21.345 39.1713 23.8667C39.6576 24.4494 40.3623 24.8742 41.7711 25.7239L50.1679 30.7949C52.7378 32.3468 53.75 34.0032 53.75 37.1189C53.75 38.8148 52.9938 39.2696 51.4687 38.9233L36.7447 35.5806L36.0836 41.3215C35.8438 43.4033 35.7241 44.444 36.0706 45.3974C36.8823 47.6304 39.6387 49.459 41.322 51.0832C42.2523 51.9809 43.2675 54.5618 42.2068 55.7354C41.5518 56.4602 40.488 55.8719 39.7558 55.5894L32.7066 52.8687C31.8638 52.5434 31.4422 52.3808 30.9998 52.3808C30.5571 52.3808 30.1357 52.5434 29.2927 52.8687L22.2436 55.5894C21.5114 55.8719 20.4475 56.4602 19.7926 55.7354C18.7318 54.5618 19.7471 51.9809 20.6774 51.0832C22.3607 49.459 25.117 47.6304 25.9288 45.3974C26.2754 44.444 26.1555 43.4033 25.9158 41.3215L25.2547 35.5806L10.5316 38.9231C9.00588 39.2693 8.24956 38.8146 8.25002 37.118C8.25086 34.0028 9.2629 32.347 11.8322 30.7951Z" fill="#6B7280"/>
        </g>
        <defs>
            <clipPath id="clip0_1_2">
                <rect width="62" height="62" fill="white"/>
            </clipPath>
        </defs>
    </svg>
  `;
  return airplaneIcon;
};

// Create piano SVG icon for city pianos
export const createCityMarker = (): HTMLElement => {
  const cityPianoMarker = document.createElement("div");
  cityPianoMarker.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_3_27)">
            <circle cx="31" cy="31" r="28" fill="#F8F8F8" stroke="#F8F8F8" stroke-width="6"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.91787 48.1686C9.9172 47.11 10.7748 46.2513 11.8333 46.2506L50.1667 46.2262C51.2252 46.2257 52.0839 47.0832 52.0845 48.1417C52.0853 49.2003 51.2277 50.059 50.1692 50.0596L11.8358 50.0839C10.7772 50.0847 9.91856 49.2272 9.91787 48.1686Z" fill="#800000"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M31.2001 18.5637C31.6712 17.6158 32.8216 17.2291 33.7696 17.7002L47.1862 24.3669C47.8379 24.6907 48.25 25.3557 48.25 26.0834V48.1667C48.25 49.2252 47.3919 50.0833 46.3333 50.0833C45.2748 50.0833 44.4167 49.2252 44.4167 48.1667V27.2712L32.0637 21.1331C31.1158 20.662 30.7292 19.5117 31.2001 18.5637Z" fill="#800000"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M34.3542 9.83334C34.3542 9.35081 34.1121 8.90047 33.7096 8.63431C33.3071 8.36814 32.7978 8.32168 32.3539 8.51057L15.1039 15.8494C14.5735 16.0751 14.2292 16.5958 14.2292 17.1722V48.1667C14.2292 48.9606 14.8728 49.6042 15.6667 49.6042H32.9167C33.7105 49.6042 34.3542 48.9606 34.3542 48.1667V9.83334ZM26.2156 26.5967C27.0095 26.5927 27.6499 25.9458 27.6458 25.1519C27.6418 24.358 26.995 23.7177 26.201 23.7217L22.3677 23.7411C21.5738 23.7452 20.9335 24.392 20.9375 25.1858C20.9415 25.9797 21.5884 26.6201 22.3823 26.6161L26.2156 26.5967ZM26.2156 34.258C27.0095 34.254 27.6499 33.6071 27.6458 32.8132C27.6418 32.0193 26.995 31.379 26.201 31.383L22.3677 31.4024C21.5738 31.4064 20.9335 32.0533 20.9375 32.8471C20.9415 33.641 21.5884 34.2814 22.3823 34.2774L26.2156 34.258ZM26.2156 41.9193C27.0095 41.9153 27.6499 41.2684 27.6458 40.4745C27.6418 39.6806 26.995 39.0403 26.201 39.0443L22.3677 39.0638C21.5738 39.0679 20.9335 39.7146 20.9375 40.5084C20.9415 41.3025 21.5884 41.9427 22.3823 41.9387L26.2156 41.9193Z" fill="#800000"/>
        </g>
        <defs>
            <clipPath id="clip0_3_27">
                <rect width="62" height="62" fill="white"/>
            </clipPath>
        </defs>
    </svg>
  `;
  return cityPianoMarker;
};

// Create popup HTML for a piano
export const createPianoPopup = (piano: MapPiano): string => {
  return `
    <div class="p-2">
        <h3 class="font-bold text-lg">${piano.name}</h3>
        <p class="text-sm text-base-content/70">${piano.location}</p>
        <p class="text-sm mt-2">${piano.description}</p>
        <div class="mt-2 flex gap-2">
            <span class="badge badge-sm">${piano.type}</span>
            <span class="badge badge-sm badge-success">${piano.condition}</span>
            <span class="badge badge-sm badge-info">${piano.category}</span>
        </div>
        <div class="mt-2 text-xs text-base-content/70">
            <p>City: ${piano.city}</p>
            <p>Country: ${piano.country}</p>
        </div>
        <a href="/pianos/${piano.id}" class="btn btn-primary btn-sm mt-2 w-full">
            View Details
        </a>
    </div>
  `;
};

// Calculate distance between two points
export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};