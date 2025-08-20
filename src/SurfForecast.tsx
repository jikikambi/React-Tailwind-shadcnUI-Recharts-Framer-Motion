"use client";
import { useState, useEffect, useCallback } from "react";
import { ForecastCard } from "./components/ForecastCard";
import { SearchBar } from "./components/SearchBar";
import { useDebounce } from "./hooks/useDebounce";
import type { GeoResult } from "./models/GeoResult";
import type { DailyForecast } from "./models/DailyForecast";
import { fetchForecast, fetchGeoSuggestions } from "./utils/api";
import { mapToDailyForecast } from "./utils/mappers";
import { ForecastIntro } from "./components/ForecastIntro";
import { ForecastChart } from "./components/ForecastChart";
import { ForecastControls } from "./components/ForecastControls";

export const SurfForecast = () => {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<GeoResult | null>(null);
  const [suggestions, setSuggestions] = useState<GeoResult[]>([]);
  const [loadingSuggest, setLoadingSuggest] = useState(false);

  const [forecast, setForecast] = useState<DailyForecast[]>([]);
  const [loadingForecast, setLoadingForecast] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [days, setDays] = useState<number>(7);

  const debouncedQuery = useDebounce(query);

  // Fetch suggestions
  useEffect(() => {
    let cancelled = false;

    async function getSuggestions() {
      setLoadingSuggest(true);
      const data = await fetchGeoSuggestions(debouncedQuery);
      if (!cancelled) setSuggestions(data);
      setLoadingSuggest(false);
    }

    if (debouncedQuery) {
      getSuggestions();
    } else {
      setSuggestions([]);
    }

    return () => {
      cancelled = true;
    };
  }, [debouncedQuery]);

  // Fetch forecast
  const loadForecast = useCallback(async () => {
    if (!selected) {
      setForecast([]);
      return;
    }

    setLoadingForecast(true);
    setError(null);

    try {
      const data = await fetchForecast(selected.latitude, selected.longitude);
      setForecast(mapToDailyForecast(data));
    } catch (e: any) {
      setError(e?.message ?? "Unbekannter Fehler");
    } finally {
      setLoadingForecast(false);
    }
  }, [selected]);

  useEffect(() => {
    loadForecast();
  }, [selected, loadForecast]);

  const daily = forecast.slice(0, days);
  const hasSelection = !!selected;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main content */}
      <div className="flex-1 max-w-5xl mx-auto p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Wetter für Deutschland</h1>
            <p className="text-slate-600">
              Suche nach einem Ort in Deutschland und erhalte eine tagesgenaue Vorschau.
            </p>
          </div>
          <ForecastControls
            period={days}
            setPeriod={setDays}
            onRefresh={loadForecast}
            loading={loadingForecast}
          />
        </div>

        {/* SearchBar (full width) */}
        <SearchBar
          query={query}
          setQuery={setQuery}
          suggestions={suggestions}
          setSelected={setSelected}
          loadingSuggest={loadingSuggest}
        />

        {error && <p className="text-red-500 text-sm mb-4">Fehler: {error}</p>}

        {!hasSelection && <ForecastIntro hasSelection={hasSelection} />}

        {loadingForecast && <p className="mt-4">Lade Vorhersage…</p>}

        {/* Forecast Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {daily.map((day, idx) => (
            <ForecastCard key={day.time} {...day} delay={idx * 0.05} />
          ))}
        </div>

        {/* Chart */}
        {hasSelection && daily.length > 0 && (
          <ForecastChart data={daily} />
        )}
      </div>

      {/* Footer */}
      <footer className="text-center text-xs text-slate-500 p-4">
        Datenquelle: open-meteo.com · Dieses UI nutzt Tailwind, shadcn/ui, Recharts & Framer Motion.
      </footer>
    </div>
  );
};