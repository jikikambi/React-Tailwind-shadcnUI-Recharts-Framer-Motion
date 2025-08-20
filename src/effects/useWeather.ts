import { useState, useEffect } from "react";
import { WeatherData } from "../models/weather";

export const useWeather = (lat: number, lon: number) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (lat: number, lon: number): Promise<WeatherData> => {
    const response = await fetch(`/api/weather?lat=${lat}&lon=${lon}`);
    if (!response.ok) {
      throw new Error("Failed to fetch weather data");
    }
    const data: WeatherData = await response.json();
    return data;
  };

  useEffect(() => {
    if (!lat || !lon) return;

    const loadWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchWeather(lat, lon);
        setWeather(data);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    loadWeather();
  }, [lat, lon]);

  return { weather, loading, error, fetchWeather }; 
};
