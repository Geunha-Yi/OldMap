"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import YearRangeSlider from "@/components/Timeline/YearRangeSlider";
import SearchPanel from "@/components/SearchPanel/SearchPanel";

const MapView = dynamic(() => import("@/components/Map/MapView"), {
  ssr: false,
});

export default function MainContent() {
  const [yearFrom, setYearFrom] = useState(1600);
  const [yearTo, setYearTo] = useState(2000);

  const handleYearChange = useCallback((min: number, max: number) => {
    setYearFrom(min);
    setYearTo(max);
  }, []);

  return (
    <div className="flex flex-1 flex-col lg:flex-row">
      {/* 지도 영역 */}
      <section className="relative flex-1 border-b border-gray-200 lg:border-b-0 lg:border-r">
        <div className="h-[350px] w-full md:h-[450px] lg:h-full lg:min-h-[500px]">
          <MapView />
        </div>
      </section>

      {/* 오른쪽 패널: 타임라인 + 검색 */}
      <aside className="flex w-full flex-col border-t border-gray-200 bg-gray-50 lg:w-96 lg:border-t-0">
        <div className="border-b border-gray-200 bg-white p-4">
          <h2 className="mb-3 text-lg font-semibold text-gray-800">타임라인</h2>
          <YearRangeSlider onChange={handleYearChange} />
        </div>
        <div className="flex-1 overflow-hidden p-4">
          <h2 className="mb-3 text-lg font-semibold text-gray-800">
            역사 지도 검색
          </h2>
          <SearchPanel yearFrom={yearFrom} yearTo={yearTo} />
        </div>
      </aside>
    </div>
  );
}
