"use client";

import { useState, useCallback } from "react";

const MIN_YEAR = 1600;
const MAX_YEAR = 2000;

interface YearRangeSliderProps {
  initialMin?: number;
  initialMax?: number;
  onChange?: (min: number, max: number) => void;
}

export default function YearRangeSlider({
  initialMin = MIN_YEAR,
  initialMax = MAX_YEAR,
  onChange,
}: YearRangeSliderProps) {
  const [minYear, setMinYear] = useState(initialMin);
  const [maxYear, setMaxYear] = useState(initialMax);

  const handleMinChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(e.target.value);
      const newMin = Math.min(value, maxYear - 1);
      setMinYear(newMin);
      onChange?.(newMin, maxYear);
    },
    [maxYear, onChange]
  );

  const handleMaxChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = Number(e.target.value);
      const newMax = Math.max(value, minYear + 1);
      setMaxYear(newMax);
      onChange?.(minYear, newMax);
    },
    [minYear, onChange]
  );

  return (
    <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <label
          htmlFor="year-range"
          className="text-sm font-medium text-gray-700"
        >
          연도 범위
        </label>
        <span className="rounded-md bg-gray-100 px-2 py-0.5 font-mono text-sm text-gray-800">
          {minYear} – {maxYear}
        </span>
      </div>
      <div className="space-y-4">
        <div>
          <div className="mb-1 flex justify-between text-xs text-gray-500">
            <span>최소</span>
            <span>{minYear}</span>
          </div>
          <input
            type="range"
            id="year-min"
            min={MIN_YEAR}
            max={MAX_YEAR}
            value={minYear}
            onChange={handleMinChange}
            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-blue-600"
          />
        </div>
        <div>
          <div className="mb-1 flex justify-between text-xs text-gray-500">
            <span>최대</span>
            <span>{maxYear}</span>
          </div>
          <input
            type="range"
            id="year-max"
            min={MIN_YEAR}
            max={MAX_YEAR}
            value={maxYear}
            onChange={handleMaxChange}
            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-blue-600"
          />
        </div>
      </div>
      <div className="mt-2 flex justify-between text-xs text-gray-400">
        <span>{MIN_YEAR}</span>
        <span>{MAX_YEAR}</span>
      </div>
    </div>
  );
}
