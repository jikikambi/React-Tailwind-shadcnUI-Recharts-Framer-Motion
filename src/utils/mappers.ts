import { DailyForecast } from "../models/DailyForecast";
import { DailyForecastResponse } from "../models/DailyForecastResponse";

export function mapToDailyForecast(
  forecast: DailyForecastResponse | null
): DailyForecast[] {
  if (!forecast?.daily) return [];

  return forecast.daily.time.map((time, idx): DailyForecast => ({
    time,
    tmax: forecast.daily.temperature_2m_max[idx],
    tmin: forecast.daily.temperature_2m_min[idx],
    prcp: forecast.daily.precipitation_sum[idx],
    code: forecast.daily.weathercode[idx],
    wind: forecast.daily.windspeed_10m_max?.[idx], // stays undefined if missing
  }));
}