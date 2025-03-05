import React, { useState, useEffect } from 'react';
import { WeatherCard } from './components/WeatherCard';
import { ParkCarousel } from './components/ParkCarousel';
import { LocationInput } from './components/LocationInput';
import { Umbrella } from 'lucide-react';
import type { WeatherData, Park, Location } from './types';
import { getForecast } from './services/weather';
import { getNearbyParks } from './services/parks';

function App() {
  const [location, setLocation] = useState<Location | null>(null);
  const [weather, setWeather] = useState<WeatherData[]>([]);
  const [parks, setParks] = useState<Park[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      if (!location) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const [weatherData, parksData] = await Promise.all([
          getForecast(location.latitude, location.longitude),
          getNearbyParks(location.latitude, location.longitude)
        ]);
        
        setWeather(weatherData);
        setParks(parksData);
      } catch (err) {
        setError('Failed to fetch data. Please try again.');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [location]);

  const handleLocationSubmit = (newLocation: Location) => {
    setLocation(newLocation);
  };

  const handleParkNavigation = (park: Park) => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${park.latitude},${park.longitude}`,
      '_blank'
    );
  };

  if (!location) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="bg-primary inline-block p-4 rounded-full mb-4">
              <Umbrella className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-primary">Sofa to Strider</h1>
            <p className="text-gray-600 mt-2">Find the perfect time for your walk</p>
          </div>
          <LocationInput onLocationSubmit={handleLocationSubmit} />
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-primary text-xl">Loading your outdoor information...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-primary">Sofa to Strider</h1>
            <p className="text-gray-600">Perfect timing for your outdoor activities</p>
          </div>
          <button
            onClick={() => setLocation(null)}
            className="text-secondary hover:text-primary transition-colors"
          >
            Change Location
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {weather.map((data, index) => (
            <WeatherCard key={index} weather={data} />
          ))}
        </div>

        <ParkCarousel parks={parks} onNavigate={handleParkNavigation} />
      </div>
    </div>
  );
}

export default App;