import { motion } from "framer-motion";
import { Thermometer, Droplets, Wind } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { fmtDate, forecastCodeMap } from "../utils/forecastHelpers";

interface Props {
  time: string;
  tmax: number;
  tmin: number;
  prcp: number;
  wind?: number;
  code: number;
  delay?: number;
}

export function ForecastCard({ time: iso, tmax, tmin, prcp, wind, code, delay = 0 }: Props) {
  const info = forecastCodeMap[code] || { label: "Unbekannt", emoji: "❔" };
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}>
      <Card className="rounded-2xl border-slate-200 bg-white/90 backdrop-blur">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center justify-between text-base">
            <span>{fmtDate(iso)}</span>
            <span className="text-2xl" title={info.label}>
              {info.emoji}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center gap-2 text-2xl font-semibold">
            <Thermometer className="h-6 w-6" /> {tmax}° / {tmin}°C
          </div>
          <div className="flex items-center gap-2 text-slate-700">
            <Droplets className="h-4 w-4" /> Niederschlag: {prcp.toFixed(1)} mm
          </div>
          {typeof wind === "number" && (
            <div className="flex items-center gap-2 text-slate-700">
              <Wind className="h-4 w-4" /> Wind: {wind} km/h
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}