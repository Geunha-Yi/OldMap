"use client";

import { MIN_YEAR, MAX_YEAR, formatYear } from "@/lib/historicalBasemaps";

interface YearBarProps {
  selectedYear: number;
  onChange: (year: number) => void;
}

/** 1000년 단위 틱 (클릭 가능) */
const TICK_INTERVAL = 1000;
const TICK_YEARS = (() => {
  const years: number[] = [];
  for (
    let y = Math.floor(MIN_YEAR / TICK_INTERVAL) * TICK_INTERVAL;
    y <= MAX_YEAR;
    y += TICK_INTERVAL
  ) {
    if (y >= MIN_YEAR) years.push(y);
  }
  if (years[years.length - 1] !== MAX_YEAR) years.push(MAX_YEAR);
  return years;
})();

export default function YearBar({ selectedYear, onChange }: YearBarProps) {
  return (
    <div className="px-4 py-3">
      <div className="flex items-center gap-4">
        <span className="shrink-0 text-sm font-medium text-gray-700">연도</span>
        <input
          type="range"
          min={MIN_YEAR}
          max={MAX_YEAR}
          value={selectedYear}
          onChange={(e) => onChange(Number(e.target.value))}
          className="h-3 flex-1 cursor-pointer appearance-none rounded-lg bg-gray-200 accent-blue-600"
        />
        <span className="min-w-[80px] shrink-0 rounded bg-gray-100 px-2 py-1 text-center font-mono text-sm text-gray-800">
          {formatYear(selectedYear)}
        </span>
      </div>
      {/* 1000년 단위 클릭 가능 막대 */}
      <div className="mt-2 flex flex-wrap justify-between gap-1">
        {TICK_YEARS.map((year) => (
          <button
            key={year}
            type="button"
            onClick={() => onChange(year)}
            className={`rounded px-2 py-1 text-xs font-medium transition ${
              selectedYear === year
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            title={formatYear(year)}
          >
            {year}
          </button>
        ))}
      </div>
      <div className="mt-1 flex justify-between text-xs text-gray-400">
        <span>{formatYear(MIN_YEAR)}</span>
        <span>{formatYear(MAX_YEAR)}</span>
      </div>
    </div>
  );
}
