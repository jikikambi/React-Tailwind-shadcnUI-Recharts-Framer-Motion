
interface ChartMetricSelectorProps {
  options: { label: string; value: string }[];
  selected: string[];
  setSelected: (values: string[]) => void;
}

export const ChartMetricSelector: React.FC<ChartMetricSelectorProps> = ({
  options,
  selected,
  setSelected,
}) => {
  const toggle = (value: string) => {
    setSelected(selected.includes(value)
      ? selected.filter((v) => v !== value)
      : [...selected, value]
    );
  };

  return (
    <div className="flex gap-4 mb-4 flex-wrap">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => toggle(opt.value)}
          className={`px-3 py-1 rounded-full border ${
            selected.includes(opt.value)
              ? "bg-blue-500 text-white border-blue-500"
              : "bg-white text-gray-700 border-gray-300"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
};