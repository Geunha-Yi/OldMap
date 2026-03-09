"use client";

import { useEffect, useState } from "react";
import { formatYear } from "@/lib/cliopatria";
import { fetchWikiSummary, type WikiSummary } from "@/lib/wikiApi";

export interface ClickedRegionInfo {
  name: string;
  year: number;
  latlng: [number, number];
}

interface ClickedInfoPanelProps {
  region: ClickedRegionInfo | null;
}

export default function ClickedInfoPanel({ region }: ClickedInfoPanelProps) {
  const [wiki, setWiki] = useState<WikiSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!region) {
      setWiki(null);
      setError(null);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchWikiSummary(region.name, region.year)
      .then((data) => {
        if (!cancelled) setWiki(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [region]);

  if (!region) {
    return (
      <div className="max-w-sm rounded-lg border border-gray-200 bg-white/95 px-4 py-3 shadow-lg backdrop-blur-sm">
        <p className="text-sm text-gray-500">
          지도를 클릭하여 지역을 선택하세요
        </p>
      </div>
    );
  }

  const wikiUrl = wiki?.content_urls?.desktop?.page;

  return (
    <div className="max-w-sm rounded-lg border border-gray-200 bg-white/95 px-4 py-3 shadow-lg backdrop-blur-sm">
      <p className="text-xs font-medium text-gray-500">선택된 지역</p>
      <p className="mt-1 text-lg font-semibold text-gray-900">{region.name}</p>
      <p className="text-sm text-gray-600">{formatYear(region.year)}</p>

      {loading && <p className="mt-3 text-sm text-gray-500">정보 로딩 중...</p>}
      {error && (
        <p className="mt-3 text-sm text-amber-600">
          정보를 불러오지 못했습니다.
        </p>
      )}
      {wiki?.extract && (
        <div className="mt-3 border-t border-gray-100 pt-3">
          <p className="line-clamp-4 text-sm leading-relaxed text-gray-700">
            {wiki.extract}
          </p>
          {wikiUrl && (
            <a
              href={wikiUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-sm text-blue-600 hover:underline"
            >
              Wikipedia에서 더 보기 →
            </a>
          )}
        </div>
      )}
    </div>
  );
}
