import { useState } from "react";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";
import type { DailyForecast } from "../models/DailyForecast";
import { Card } from "./ui/card";

interface ForecastChartProps {
    data: DailyForecast[];
}

interface Metric {
    key: keyof DailyForecast;
    label: string;
    color: string;
    unit: string;
    yAxisId: string;
}

const METRICS: Metric[] = [
    { key: "tmax", label: "Tmax", color: "#f87171", unit: "°C", yAxisId: "temp" },
    { key: "tmin", label: "Tmin", color: "#60a5fa", unit: "°C", yAxisId: "temp" },
    { key: "prcp", label: "Niederschlag", color: "#34d399", unit: "mm", yAxisId: "prcp" },
    { key: "wind", label: "Wind", color: "#facc15", unit: "km/h", yAxisId: "wind" },
];

export const ForecastChart = ({ data }: ForecastChartProps) => {
    const [selectedMetrics, setSelectedMetrics] = useState<string[]>(["tmax", "tmin"]);

    const toggleMetric = (key: string) => {
        setSelectedMetrics((prev) =>
            prev.includes(key) ? prev.filter((m) => m !== key) : [...prev, key]
        );
    };

    const chartData = data.map((d) => ({
        date: d.time,
        tmax: d.tmax,
        tmin: d.tmin,
        prcp: d.prcp,
        wind: d.wind ?? undefined,
    }));

    return (
        <Card className="mt-6 rounded-2xl border-slate-200 bg-white/90 p-4">
            <h2 className="mb-3 text-lg font-semibold">Wetter & Temperaturverlauf</h2>

            {/* Multi-select toggles */}
            <div className="mb-4 flex flex-wrap gap-2">
                {METRICS.map((metric) => {
                    const isSelected = selectedMetrics.includes(metric.key);
                    return (
                        <span
                            key={metric.key}
                            onClick={() => toggleMetric(metric.key)}
                            style={{
                                backgroundColor: isSelected ? metric.color : "white",
                                color: isSelected ? "white" : "#374151", // slate-700
                                borderColor: isSelected ? metric.color : "#d1d5db", // slate-300
                            }}
                            className="cursor-pointer px-3 py-1 rounded-full border-2 font-medium transition-colors hover:bg-slate-50"
                        //   className={`cursor-pointer px-3 py-1 rounded-full border-2 font-medium
                        //     ${isSelected ? `bg-[${metric.color}] text-white border-[${metric.color}]`
                        //                  : `bg-white text-slate-700 border-slate-300`}`}
                        >
                            {metric.label}
                        </span>
                    );
                })}
            </div>

            <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 10, right: 40, left: 0, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" tick={{ fontSize: 12 }} />

                        {/* Temperature Y-axis */}
                        {selectedMetrics.some((m) => METRICS.find((metric) => metric.key === m)?.yAxisId === "temp") && (
                            <YAxis
                                yAxisId="temp"
                                orientation="left"
                                tick={{ fontSize: 12, fill: "#f87171" }}
                                unit="°C"
                                domain={["dataMin - 2", "dataMax + 2"]}
                            />
                        )}

                        {/* Precipitation Y-axis */}
                        {selectedMetrics.some((m) => METRICS.find((metric) => metric.key === m)?.yAxisId === "prcp") && (
                            <YAxis
                                yAxisId="prcp"
                                orientation="right"
                                tick={{ fontSize: 12, fill: "#34d399" }}
                                unit="mm"
                                allowDecimals={false}
                            />
                        )}

                        {/* Wind Y-axis */}
                        {selectedMetrics.some((m) => METRICS.find((metric) => metric.key === m)?.yAxisId === "wind") && (
                            <YAxis
                                yAxisId="wind"
                                orientation="right"
                                tick={{ fontSize: 12, fill: "#facc15" }}
                                unit="km/h"
                                allowDecimals={false}
                                dx={50} // shift right to avoid overlap with prcp
                            />
                        )}

                        <Tooltip
                            formatter={(value: any, name: string) => {
                                const metric = METRICS.find((m) => m.key === name);
                                return metric ? `${value}${metric.unit}` : value;
                            }}
                        />

                        {METRICS.filter((m) => selectedMetrics.includes(m.key)).map((metric) => (
                            <Line
                                key={metric.key}
                                type="monotone"
                                dataKey={metric.key}
                                stroke={metric.color}
                                strokeWidth={2}
                                dot={false}
                                yAxisId={metric.yAxisId}
                            />
                        ))}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
};