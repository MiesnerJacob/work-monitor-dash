import React, { useState, useEffect } from 'react';
import { useElectronAPI } from '../hooks/useElectronAPI';
import { WeatherData } from '../types/WeatherData';

function Weather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const electronAPI = useElectronAPI();

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            const weatherData = await electronAPI.getWeather(latitude, longitude);
            setWeather(weatherData);
          }, (err) => {
            setError("Unable to retrieve your location");
            console.error(err);
          });
        } else {
          setError("Geolocation is not supported by your browser");
        }
      } catch (error) {
        setError("Failed to fetch weather data");
        console.error('Failed to fetch weather:', error);
      }
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 600000); // Update every 10 minutes

    return () => clearInterval(interval);
  }, [electronAPI]);

  if (error) {
    return (
      <div className="card w-96 bg-base-200 shadow-xl">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-2xl font-bold">Weather</h2>
          <p className="text-xl text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="card w-96 bg-base-200 shadow-xl">
        <div className="card-body items-center text-center">
          <h2 className="card-title text-2xl font-bold">Weather</h2>
          <p className="text-xl">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card w-96 bg-base-200 shadow-xl">
      <div className="card-body items-center text-center">
        <h2 className="card-title text-2xl font-bold">Weather in {weather.city}</h2>
        <img 
          src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} 
          alt={weather.description} 
          className="w-24 h-24"
        />
        <p className="text-xl">{weather.temperature.toFixed(1)}°C</p>
        <p className="text-xl capitalize">{weather.description}</p>
      </div>
    </div>
  );
}

export default Weather;