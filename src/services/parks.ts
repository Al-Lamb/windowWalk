import { Park } from '../types';

const OVERPASS_API = 'https://overpass-api.de/api/interpreter';

export async function getNearbyParks(latitude: number, longitude: number, radius: number = 2000): Promise<Park[]> {
  const query = `
    [out:json];
    (
      way["leisure"="park"](around:${radius},${latitude},${longitude});
      relation["leisure"="park"](around:${radius},${latitude},${longitude});
    );
    out center;
  `;

  const response = await fetch(OVERPASS_API, {
    method: 'POST',
    body: `data=${encodeURIComponent(query)}`
  });

  if (!response.ok) {
    throw new Error('Failed to fetch parks data');
  }

  const data = await response.json();
  
  return data.elements
    .filter((element: any) => element.tags && element.tags.name)
    .map((element: any) => {
      const parkLat = element.center ? element.center.lat : element.lat;
      const parkLon = element.center ? element.center.lon : element.lon;
      const distance = calculateDistance(latitude, longitude, parkLat, parkLon);
      
      return {
        id: element.id.toString(),
        name: element.tags.name,
        distance: distance,
        image: `https://images.unsplash.com/photo-${getRandomParkImage()}`,
        latitude: parkLat,
        longitude: parkLon
      };
    })
    .sort((a: Park, b: Park) => a.distance - b.distance)
    .slice(0, 5);
}

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

// Curated list of park-related Unsplash images
function getRandomParkImage(): string {
  const parkImages = [
    '1507041957456-9c397ce39c97',
    '1519331379826-f10be5486c6f',
    '1534251369789-5067c8b8602a',
    '1526336179256-1347bdb17b42',
    '1505852679233-d9fd70aff56d'
  ];
  return parkImages[Math.floor(Math.random() * parkImages.length)];
}