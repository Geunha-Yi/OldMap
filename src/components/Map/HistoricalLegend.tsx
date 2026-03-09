"use client";

import { formatYear } from "@/lib/historicalBasemaps";
import type { LegendRegion } from "@/lib/types";

interface HistoricalLegendProps {
  selectedYear: number;
  regions: LegendRegion[];
}

export default function HistoricalLegend({
  selectedYear,
  regions,
}: HistoricalLegendProps) {
  return (
    <div className="max-h-[40vh] min-w-[180px] overflow-y-auto rounded-lg border border-gray-200 bg-white/95 px-4 py-3 shadow-lg backdrop-blur-sm">
      <p className="mb-2 text-xs font-medium text-gray-700">
        {formatYear(selectedYear)} 범례
      </p>
      <ul className="space-y-1.5">
        {regions.slice(0, 50).map((r) => (
          <li key={r.name} className="flex items-center gap-2 text-xs">
            <span
              className="h-3 w-3 shrink-0 rounded"
              style={{ backgroundColor: r.color }}
            />
            <span className="truncate text-gray-700">{r.name}</span>
          </li>
        ))}
      </ul>
      {regions.length > 50 && (
        <p className="mt-1 text-xs text-gray-400">외 {regions.length - 50}개</p>
      )}
      <p className="mt-3 border-t border-gray-100 pt-2 text-xs text-gray-500">
        세계 규모용 단순화된 경계선입니다.
      </p>
      <p className="mt-0.5 text-xs text-gray-500">
        출처:{" "}
        <a
          href="https://github.com/aourednik/historical-basemaps"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          historical-basemaps
        </a>
      </p>
    </div>
  );
}
