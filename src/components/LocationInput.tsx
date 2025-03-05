import React, { useState } from "react";
import { MapPin } from "lucide-react";
import type { Location } from "../types";

interface LocationInputProps {
  onLocationSubmit: (location: Location) => void;
}

export const LocationInput: React.FC<LocationInputProps> = ({
  onLocationSubmit,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCurrentLocation = () => {
    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=9babef2ed22447ffa46195e589d1c06b`
          );
          const data = await response.json();

          if (data.results.length > 0) {
            const components = data.results[0].components;
            const city =
              components.city || components.town || components.village;
            const country = components.country;

            onLocationSubmit({
              latitude,
              longitude,
              city,
              country,
            });
          } else {
            setError(
              "Could not get your location. Please try entering it manually."
            );
          }
        } catch (err) {
          setError(
            "Could not get your location. Please try entering it manually."
          );
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        setError(
          "Could not get your location. Please try entering it manually."
        );
        setLoading(false);
      }
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-primary mb-4">
        Set Your Location
      </h2>

      <button
        onClick={getCurrentLocation}
        disabled={loading}
        className="w-full bg-secondary text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-primary transition-colors disabled:opacity-50"
      >
        <MapPin className="w-5 h-5" />
        {loading ? "Getting location..." : "Use Current Location"}
      </button>

      {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          We need your location to show you nearby parks and accurate weather
          forecasts
        </p>
      </div>
    </div>
  );
};
