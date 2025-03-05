import React from 'react';
import { format } from 'date-fns';
import { Cloud, Sun, CloudRain } from 'lucide-react';
import type { WeatherData } from '../types';

interface WeatherCardProps {
  weather: WeatherData;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  const isDry = weather.precipitation < 0.1;

  return (
    <div className={`p-6 rounded-lg shadow-lg ${isDry ? 'bg-secondary' : 'bg-tertiary'} text-white`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-lg font-semibold">
            {format(weather.timestamp, 'EEE, MMM d')}
          </p>
          <p className="text-sm">
            {format(weather.timestamp, 'h:mm a')}
          </p>
        </div>
        <div className="text-4xl">
          {isDry ? <Sun /> : weather.precipitation > 0.5 ? <CloudRain /> : <Cloud />}
        </div>
      </div>
      <div className="mt-4">
        <p className="text-2xl font-bold">{Math.round(weather.temperature)}°C</p>
        <p className="text-sm mt-2">{weather.description}</p>
        {isDry && (
          <div className="mt-2 bg-primary px-3 py-1 rounded-full inline-block">
            <p className="text-xs">Perfect for Walking!</p>
          </div>
        )}
      </div>
    </div>
  );
};