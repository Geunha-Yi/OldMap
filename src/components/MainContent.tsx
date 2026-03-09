"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import YearBar from "@/components/Timeline/YearBar";
import SearchPanel from "@/components/SearchPanel/SearchPanel";

const MapView = dynamic(() => import("@/components/Map/MapView"), {
  ssr: false,
});

export default function MainContent() {
  const [selectedYear, setSelectedYear] = useState(1500);

  const handleYearChange = useCallback((year: number) => {
    setSelectedYear(year);
  }, []);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {/* 지도 + 검색 패널 행 */}
      <div className="flex min-h-0 flex-1">
        {/* 지도 영역 - 고정, 스크롤 없음 */}
        <section className="relative min-w-0 flex-1 overflow-hidden">
          <MapView selectedYear={selectedYear} />
        </section>

        {/* 검색 패널 - 고정 너비, 내부 리스트만 스크롤 */}
        <aside className="flex w-80 shrink-0 flex-col overflow-hidden border-l border-gray-200 bg-white">
          <SearchPanel yearFrom={selectedYear} yearTo={selectedYear} />
        </aside>
      </div>

      {/* 하단 연도 바 - 전체 너비 */}
      <div className="shrink-0 border-t border-gray-200 bg-white shadow-lg">
        <YearBar selectedYear={selectedYear} onChange={handleYearChange} />
      </div>
    </div>
  );
}
