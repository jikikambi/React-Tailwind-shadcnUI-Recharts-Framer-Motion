import { DailyForecastResponse } from "../models/DailyForecastResponse";
import { GeoResult } from "../models/GeoResult";


const GEOCODE_API =
  import.meta.env.VITE_GEOCODE_API ||
  import.meta.env.NEXT_PUBLIC_GEOCODE_API ||
  "https://geocoding-api.open-meteo.com/v1/search";

const FORECAST_API =
  import.meta.env.VITE_FORECAST_API ||
  import.meta.env.NEXT_PUBLIC_FORECAST_API ||
  "https://api.open-meteo.com/v1/forecast";

const DEFAULT_COUNTRY =
  import.meta.env.VITE_DEFAULT_COUNTRY ||
  import.meta.env.NEXT_PUBLIC_DEFAULT_COUNTRY ||
  "DE";

const DEFAULT_TIMEZONE =
  import.meta.env.VITE_DEFAULT_TIMEZONE ||
  import.meta.env.NEXT_PUBLIC_DEFAULT_TIMEZONE ||
  "Europe/Berlin";

// small helper that throws for non-2xx and non-JSON responses
async function fetchJson<T>(input: RequestInfo | URL, init?: RequestInit): Promise<T> {
  const res = await fetch(input, init);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} ${res.statusText} – ${text.slice(0, 140)}`);
  }
  // If server sent HTML (e.g., SPA fallback), this will throw:
  const data = await res.json();
  return data as T;
}

export async function fetchGeoSuggestions(query: string): Promise<GeoResult[]> {
  if (!query || query.trim().length < 2) return [];

  const url = new URL(GEOCODE_API);
  url.searchParams.set("name", query.trim());
  url.searchParams.set("count", "8");
  url.searchParams.set("language", "de");
  url.searchParams.set("format", "json");
  url.searchParams.set("country", DEFAULT_COUNTRY);

  try {
    const data = await fetchJson<any>(url.toString());
    const results: GeoResult[] = (data?.results || []).map((r: any) => ({
      id: r.id,
      name: r.name,
      country: r.country,
      admin1: r.admin1,
      latitude: r.latitude,
      longitude: r.longitude,
    }));
    return results;
  } catch (e) {
    console.error("[fetchGeoSuggestions]", e);
    return [];
  }
}

export async function fetchForecast(
  lat: number,
  lon: number,
  days: number = 7,
  timezone: string = DEFAULT_TIMEZONE
): Promise<DailyForecastResponse> {
  const clampedDays = Math.min(16, Math.max(1, Number(days) || 7));

  const url = new URL(FORECAST_API);
  url.searchParams.set("latitude", String(lat));
  url.searchParams.set("longitude", String(lon));
  url.searchParams.set(
    "daily",
    [
      "temperature_2m_max",
      "temperature_2m_min",
      "precipitation_sum",
      "weathercode",
      "windspeed_10m_max",
    ].join(",")
  );
  url.searchParams.set("timezone", timezone);
  url.searchParams.set("forecast_days", String(clampedDays));

  try {
    const data = await fetchJson<DailyForecastResponse>(url.toString());
    return data; // <-- EXACT same shape your UI expects
  } catch (e) {
    console.error("[fetchForecast]", e);
    // Return an empty but typed structure so the UI can handle gracefully
    return {
      daily: {
        time: [],
        temperature_2m_max: [],
        temperature_2m_min: [],
        precipitation_sum: [],
        weathercode: [],
        windspeed_10m_max: [],
      },
      timezone,
    };
  }
}