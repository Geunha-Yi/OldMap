"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import YearBar from "@/components/Timeline/YearBar";
import ClickedInfoPanel from "@/components/Map/ClickedInfoPanel";
import HistoricalLegend from "@/components/Map/HistoricalLegend";
import type { ClickedRegionInfo } from "@/components/Map/ClickedInfoPanel";
import type { LegendRegion } from "@/lib/types";

const MapView = dynamic(() => import("@/components/Map/MapView"), {
  ssr: false,
});

export default function MainContent() {
  const [selectedYear, setSelectedYear] = useState(1500);
  const [clickedRegion, setClickedRegion] = useState<ClickedRegionInfo | null>(
    null
  );
  const [legendRegions, setLegendRegions] = useState<LegendRegion[]>([]);

  const handleYearChange = useCallback((year: number) => {
    setSelectedYear(year);
  }, []);

  const handleRegionClick = useCallback((info: ClickedRegionInfo) => {
    setClickedRegion(info);
  }, []);

  const handleRegionsLoaded = useCallback((regions: LegendRegion[]) => {
    setLegendRegions(regions);
  }, []);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {/* 지도 전체 */}
      <div className="relative min-h-0 flex-1">
        <MapView
          selectedYear={selectedYear}
          onRegionClick={handleRegionClick}
          onRegionsLoaded={handleRegionsLoaded}
        />

        {/* 우측 상단: 클릭한 지역 정보 */}
        <div className="absolute right-4 top-4 z-[1000]">
          <ClickedInfoPanel region={clickedRegion} />
        </div>

        {/* 우측 하단: 범례 */}
        <div className="absolute bottom-4 right-4 z-[1000]">
          <HistoricalLegend
            selectedYear={selectedYear}
            regions={legendRegions}
          />
        </div>
      </div>

      {/* 하단 연도 바 */}
      <div className="shrink-0 border-t border-gray-200 bg-white shadow-lg">
        <YearBar selectedYear={selectedYear} onChange={handleYearChange} />
      </div>
    </div>
  );
}
