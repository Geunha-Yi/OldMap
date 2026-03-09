"use client";

import { getRegionsForYear } from "@/lib/historicalRegions";

interface HistoricalLegendProps {
  selectedYear: number;
}

export default function HistoricalLegend({
  selectedYear,
}: HistoricalLegendProps) {
  const regions = getRegionsForYear(selectedYear);

  if (regions.length === 0) {
    return (
      <div className="absolute bottom-4 left-4 rounded-lg border border-gray-200 bg-white/95 px-3 py-2 shadow-lg">
        <p className="text-xs text-gray-500">
          {selectedYear}년 해당 지역 정보가 없습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="absolute bottom-4 left-4 rounded-lg border border-gray-200 bg-white/95 px-3 py-2 shadow-lg">
      <p className="mb-2 text-xs font-medium text-gray-700">
        {selectedYear}년 지역
      </p>
      <ul className="space-y-1">
        {regions.map((r) => (
          <li key={r.id} className="flex items-center gap-2 text-xs">
            <span
              className="h-3 w-3 shrink-0 rounded"
              style={{ backgroundColor: r.color }}
            />
            <span>
              {r.name} ({r.yearFrom}~{r.yearTo})
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
