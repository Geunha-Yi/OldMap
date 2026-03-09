"use client";

const MIN_YEAR = 1600;
const MAX_YEAR = 2000;

interface YearBarProps {
  selectedYear: number;
  onChange: (year: number) => void;
}

export default function YearBar({ selectedYear, onChange }: YearBarProps) {
  return (
    <div className="px-4 py-3">
      <div className="flex items-center gap-4">
        <span className=" shrink-0 text-sm font-medium text-gray-700">
          연도
        </span>
        <input
          type="range"
          min={MIN_YEAR}
          max={MAX_YEAR}
          value={selectedYear}
          onChange={(e) => onChange(Number(e.target.value))}
          className="h-3 flex-1 cursor-pointer appearance-none rounded-lg bg-gray-200 accent-blue-600"
        />
        <span className="w-16 shrink-0 rounded bg-gray-100 px-2 py-1 text-center font-mono text-sm text-gray-800">
          {selectedYear}
        </span>
      </div>
      <div className="mt-1 flex justify-between text-xs text-gray-400">
        <span>{MIN_YEAR}</span>
        <span>{MAX_YEAR}</span>
      </div>
    </div>
  );
}
