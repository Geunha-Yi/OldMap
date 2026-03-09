"use client";

import { formatYear } from "@/lib/historicalBasemaps";

export interface ClickedRegionInfo {
  name: string;
  year: number;
  latlng: [number, number];
}

interface ClickedInfoPanelProps {
  region: ClickedRegionInfo | null;
}

export default function ClickedInfoPanel({ region }: ClickedInfoPanelProps) {
  if (!region) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white/95 px-4 py-3 shadow-lg backdrop-blur-sm">
        <p className="text-sm text-gray-500">
          지도를 클릭하여 지역을 선택하세요
        </p>
      </div>
    );
  }

  return (
    <div className="min-w-[200px] rounded-lg border border-gray-200 bg-white/95 px-4 py-3 shadow-lg backdrop-blur-sm">
      <p className="text-xs font-medium text-gray-500">선택된 지역</p>
      <p className="mt-1 text-lg font-semibold text-gray-900">{region.name}</p>
      <p className="mt-0.5 text-sm text-gray-600">{formatYear(region.year)}</p>
    </div>
  );
}
