export interface DailyForecast {
  time: string;
  tmax: number;
  tmin: number;
  prcp: number;
  code: number;
  wind?: number; // optional, can be undefined
}