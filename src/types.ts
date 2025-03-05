export interface WeatherData {
  timestamp: number;
  temperature: number;
  precipitation: number;
  description: string;
}

export interface Park {
  id: string;
  name: string;
  distance: number;
  image: string;
  latitude: number;
  longitude: number;
}

export interface Location {
  latitude: number;
  longitude: number;
}