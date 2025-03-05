const WEATHER_API_KEY = '00a0b275e47846f685a155750250403';
const BASE_URL = 'https://api.weatherapi.com/v1';

export async function getForecast(latitude: number, longitude: number) {
  const response = await fetch(
    `${BASE_URL}/forecast.json?key=${WEATHER_API_KEY}&q=${latitude},${longitude}&days=3&aqi=no`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }

  const data = await response.json();
  
  return data.forecast.forecastday.map((day: any) => ({
    timestamp: new Date(day.date).getTime(),
    temperature: day.day.avgtemp_c,
    precipitation: day.day.totalprecip_mm,
    description: day.day.condition.text
  }));
}