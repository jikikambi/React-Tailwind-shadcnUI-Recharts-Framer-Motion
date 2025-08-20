export const DE_LOCALE = "de-DE";

export const forecastCodeMap: Record<number, { label: string; emoji: string }> = {
  0: { label: "Klarer Himmel", emoji: "☀️" },
  1: { label: "Überwiegend klar", emoji: "🌤️" },
  2: { label: "Teilweise bewölkt", emoji: "⛅" },
  3: { label: "Bewölkt", emoji: "☁️" },
  45: { label: "Nebel", emoji: "🌫️" },
  48: { label: "Reifnebel", emoji: "🌫️" },
  51: { label: "Nieselregen leicht", emoji: "🌧️" },
  53: { label: "Nieselregen mäßig", emoji: "🌧️" },
  55: { label: "Nieselregen stark", emoji: "🌧️" },
  56: { label: "Gefrierender Niesel leicht", emoji: "🌧️❄️" },
  57: { label: "Gefrierender Niesel stark", emoji: "🌧️❄️" },
  61: { label: "Regen leicht", emoji: "🌦️" },
  63: { label: "Regen mäßig", emoji: "🌧️" },
  65: { label: "Regen stark", emoji: "🌧️" },
  66: { label: "Gefrierender Regen leicht", emoji: "🌧️❄️" },
  67: { label: "Gefrierender Regen stark", emoji: "🌧️❄️" },
  71: { label: "Schneefall leicht", emoji: "🌨️" },
  73: { label: "Schneefall mäßig", emoji: "🌨️" },
  75: { label: "Schneefall stark", emoji: "❄️" },
  77: { label: "Schneekörner", emoji: "🌨️" },
  80: { label: "Regenschauer leicht", emoji: "🌦️" },
  81: { label: "Regenschauer mäßig", emoji: "🌧️" },
  82: { label: "Regenschauer stark", emoji: "🌧️" },
  85: { label: "Schneeschauer leicht", emoji: "🌨️" },
  86: { label: "Schneeschauer stark", emoji: "❄️" },
  95: { label: "Gewitter", emoji: "⛈️" },
  96: { label: "Gewitter mit Hagel leicht", emoji: "⛈️" },
  99: { label: "Gewitter mit Hagel stark", emoji: "⛈️" },
};

export const fmtDate = (iso: string) =>
  new Date(iso + "T12:00:00").toLocaleDateString(DE_LOCALE, {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
  });