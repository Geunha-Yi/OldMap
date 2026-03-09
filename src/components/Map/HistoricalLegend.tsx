"use client";

import { formatYear } from "@/lib/historicalBasemaps";

interface HistoricalLegendProps {
  selectedYear: number;
}

export default function HistoricalLegend({
  selectedYear,
}: HistoricalLegendProps) {
  return (
    <div className="absolute bottom-4 left-4 rounded-lg border border-gray-200 bg-white/95 px-3 py-2 shadow-lg">
      <p className="text-xs font-medium text-gray-700">
        {formatYear(selectedYear)} – 전 세계 역사적 국경
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
