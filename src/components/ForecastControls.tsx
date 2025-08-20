"use client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { RefreshCcw } from "lucide-react";

interface ForecastControlsProps {
  period: number;
  setPeriod: (d: number) => void;
  onRefresh: () => void;
  loading?: boolean;
}

export const ForecastControls = ({
  period,
  setPeriod,
  onRefresh,
  loading = false,
}: ForecastControlsProps) => {
  return (
    <div className="flex items-center gap-3">
      {/* Period of time Select */}
      <Select value={String(period)} onValueChange={(v) => setPeriod(Number(v))}>
        <SelectTrigger className="w-[160px] rounded-xl border bg-white/95 backdrop-blur shadow-sm">
          <SelectValue placeholder="Zeitraum" />
        </SelectTrigger>
        <SelectContent className="z-50 rounded-xl shadow-lg bg-white/95">
          <SelectItem value="3">3 Tage</SelectItem>
          <SelectItem value="5">5 Tage</SelectItem>
          <SelectItem value="7">7 Tage</SelectItem>
          <SelectItem value="10">10 Tage</SelectItem>
          <SelectItem value="14">14 Tage</SelectItem>
        </SelectContent>
      </Select>

      {/* Refresh Button */}
      <Button
        variant="outline"
        className="rounded-xl bg-white/80 backdrop-blur shadow-sm"
        onClick={onRefresh}
        disabled={loading}
        title="Aktualisieren"
      >
        <RefreshCcw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
        Aktualisieren
      </Button>
    </div>
  );
};