import { AnimatePresence, motion } from "framer-motion";
import { Search, MapPin } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { GeoResult } from "../models/GeoResult";
import { Skeleton } from "./ui/skeleton";

interface Props {
  query: string;
  setQuery: (q: string) => void;
  suggestions: GeoResult[];
  setSelected: (s: GeoResult) => void;
  loadingSuggest: boolean;
}

export function SearchBar({
  query,
  setQuery,
  suggestions,
  setSelected,
  loadingSuggest,
}: Props) {
  return (
    <div className="relative w-full mb-6">
      {/* Input + Search Button */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <Input
            placeholder="Ort in Deutschland eingeben (z. B. Berlin, München, Köln)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-9 h-11 rounded-2xl border bg-white/80 backdrop-blur shadow-sm"
          />
        </div>
        <Button
          className="h-11 rounded-2xl shadow-sm bg-slate-800 hover:bg-slate-900 text-white"
          onClick={() =>
          {
            if (suggestions.length > 0) {
              setSelected(suggestions[0]);
              setQuery("");
            }
          }}
        >
          Suchen
        </Button>
      </div>

      {/* Suggestions Dropdown */}
      <AnimatePresence>
        {query && (loadingSuggest || suggestions.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="absolute z-50 mt-2 w-full overflow-hidden rounded-2xl border bg-white/95 backdrop-blur shadow-lg"
          >
            {loadingSuggest && (
              <div className="p-3">
                <Skeleton className="h-6 w-2/3 mb-2" />
                <Skeleton className="h-6 w-1/2 mb-2" />
                <Skeleton className="h-6 w-3/5" />
              </div>
            )}

            {!loadingSuggest &&
              suggestions.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    setSelected(s);
                    setQuery("");
                  }}
                  className="flex w-full items-center gap-2 px-4 py-3 text-left hover:bg-slate-100 transition-colors"
                >
                  <MapPin className="h-4 w-4 text-slate-500" />
                  <span className="font-medium">{s.name}</span>
                  {s.admin1 && (
                    <span className="text-slate-500">· {s.admin1}</span>
                  )}
                </button>
              ))}

            {!loadingSuggest && suggestions.length === 0 && (
              <div className="p-3 text-slate-500">Keine Treffer.</div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}