function requireEnv(key: string): string {
  const value = import.meta.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

export const config = {
  GEOCODE_API: requireEnv("VITE_GEOCODE_API"),
  FORECAST_API: requireEnv("VITE_FORECAST_API"),
  DEFAULT_COUNTRY: requireEnv("VITE_DEFAULT_COUNTRY"),
  DEFAULT_TIMEZONE: requireEnv("VITE_DEFAULT_TIMEZONE"),
};