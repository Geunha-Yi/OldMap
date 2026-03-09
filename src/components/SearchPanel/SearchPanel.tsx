"use client";

import { useState, useCallback } from "react";
import { geosearch, getMockGeoSearchResult } from "@/lib";
import type { HistoricalMap, GeoSearchResult } from "@/lib/types";
import MapListItem from "./MapListItem";
import MapDetailModal from "./MapDetailModal";

interface SearchPanelProps {
  yearFrom?: number;
  yearTo?: number;
  bbox?: { minLon: number; minLat: number; maxLon: number; maxLat: number };
}

export default function SearchPanel({
  yearFrom,
  yearTo,
  bbox,
}: SearchPanelProps) {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<GeoSearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedMap, setSelectedMap] = useState<HistoricalMap | null>(null);

  const handleSearch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params: Parameters<typeof geosearch>[0] = {
        limit: 20,
        yearFrom,
        yearTo,
        bbox,
      };
      if (query.trim()) {
        params.fulltext = query.trim();
      }
      const data = await geosearch(params);
      setResult(data);
    } catch (err) {
      setError("API 연결에 실패했습니다. 샘플 데이터를 표시합니다.");
      setResult(getMockGeoSearchResult());
    } finally {
      setLoading(false);
    }
  }, [query, yearFrom, yearTo, bbox]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col p-4">
      <div className="mb-3 shrink-0 flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="지역 또는 키워드 검색..."
          className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "검색 중..." : "검색"}
        </button>
      </div>

      {error && <p className="mb-2 shrink-0 text-xs text-amber-600">{error}</p>}

      <div className="min-h-0 flex-1 overflow-y-auto">
        {result?.maps && result.maps.length > 0 ? (
          <ul className="space-y-3">
            {result.maps.map((map) => (
              <MapListItem
                key={map.id}
                map={map}
                onClick={() => setSelectedMap(map)}
              />
            ))}
          </ul>
        ) : result && result.maps.length === 0 ? (
          <p className="py-8 text-center text-sm text-gray-500">
            검색 결과가 없습니다.
          </p>
        ) : (
          <p className="py-8 text-center text-sm text-gray-500">
            검색 버튼을 눌러 역사 지도를 찾아보세요.
          </p>
        )}
      </div>

      {selectedMap && (
        <MapDetailModal
          map={selectedMap}
          onClose={() => setSelectedMap(null)}
        />
      )}
    </div>
  );
}
