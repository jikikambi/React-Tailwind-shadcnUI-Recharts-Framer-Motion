import { Card, CardContent } from "./ui/card";

interface ForecastIntroProps {
  hasSelection: boolean;
}

export const ForecastIntro: React.FC<ForecastIntroProps> = ({ hasSelection }) => {
  if (hasSelection) return null;

  return (
    <div className="mt-10 grid gap-4 sm:grid-cols-2">
      <Card className="rounded-2xl border-dashed">
        <CardContent className="p-6">
          <h3 className="mb-2 text-lg font-semibold">Schnellstart</h3>
          <p className="text-slate-600">
            Tippe oben einen Ortsnamen ein (z. B. "Berlin"), wähle einen Vorschlag und erhalte eine Vorschau für bis zu 14 Tage.
          </p>
        </CardContent>
      </Card>
      <Card className="rounded-2xl border-dashed">
        <CardContent className="p-6">
          <h3 className="mb-2 text-lg font-semibold">Hinweise</h3>
          <ul className="list-disc pl-5 text-slate-600">
            <li>Nutzung der freien <span className="font-medium">Open‑Meteo</span> API.</li>
            <li>Zeiten in <span className="font-medium">Europe/Berlin</span>.</li>
            <li>Nur Orte innerhalb Deutschlands werden vorgeschlagen.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};