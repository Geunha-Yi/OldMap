"use client";

import { useEffect, useState } from "react";
import { GeoJSON, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import type { GeoJsonObject } from "geojson";
import type { FeatureCollection } from "geojson";
import { getCliopatriaForYear } from "@/lib/cliopatria";
import { correctRegionName } from "@/lib/regionNameCorrections";
import type { ClickedRegionInfo } from "./ClickedInfoPanel";
import type { LegendRegion } from "@/lib/types";

interface HistoricalOverlayProps {
  selectedYear: number;
  onRegionClick?: (info: ClickedRegionInfo) => void;
  onRegionsLoaded?: (regions: LegendRegion[]) => void;
}

/** 국가명으로 일관된 색상 생성 */
export function getColorForName(name: string): string {
  const colors = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#EC4899",
    "#06B6D4",
    "#84CC16",
    "#F97316",
    "#6366F1",
    "#14B8A6",
    "#A855F7",
    "#22C55E",
    "#E11D48",
    "#0EA5E9",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash << 5) - hash + name.charCodeAt(i);
    hash |= 0;
  }
  return colors[Math.abs(hash) % colors.length];
}

const markerIcon = L.divIcon({
  className: "custom-marker",
  html: '<div style="width:12px;height:12px;border-radius:50%;background:#2563eb;border:2px solid white;box-shadow:0 1px 3px rgba(0,0,0,0.3)"></div>',
  iconSize: [12, 12],
  iconAnchor: [6, 6],
});

export default function HistoricalOverlay({
  selectedYear,
  onRegionClick,
  onRegionsLoaded,
}: HistoricalOverlayProps) {
  const [geojson, setGeojson] = useState<GeoJsonObject | null>(null);
  const [displayYear, setDisplayYear] = useState<number>(selectedYear);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [clickedPoint, setClickedPoint] = useState<[number, number] | null>(
    null
  );

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    setClickedPoint(null);

    getCliopatriaForYear(selectedYear)
      .then(({ data, year }) => {
        if (cancelled) return;
        setGeojson(data);
        setDisplayYear(year);
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
  }, [selectedYear]);

  // 연도 변경 시 지도 초기화하지 않음 (fitBounds 제거)

  useEffect(() => {
    if (geojson && onRegionsLoaded) {
      const fc = geojson as FeatureCollection;
      const seen = new Set<string>();
      const regions: LegendRegion[] = [];
      for (const f of fc.features ?? []) {
        const rawName = (f.properties as { NAME?: string })?.NAME;
        const geom = f.geometry;
        const name =
          geom && (geom.type === "MultiPolygon" || geom.type === "Polygon")
            ? correctRegionName(rawName, displayYear, geom)
            : (rawName ?? "Unknown");
        // 같은 이름(예: Joseon)이면 하나만 범례에 (겹치는 영역 통합 표시)
        if (!seen.has(name)) {
          seen.add(name);
          regions.push({ name, color: getColorForName(name) });
        }
      }
      onRegionsLoaded(regions);
    }
  }, [geojson, displayYear, onRegionsLoaded]);

  if (loading || error || !geojson) {
    return null;
  }

  return (
    <>
      <GeoJSON
        key={displayYear}
        data={geojson}
        style={(feature) => {
          const rawName = (feature?.properties as { NAME?: string })?.NAME;
          const geom = feature?.geometry;
          const name =
            geom && (geom.type === "MultiPolygon" || geom.type === "Polygon")
              ? correctRegionName(rawName, displayYear, geom)
              : (rawName ?? "Unknown");
          const color = getColorForName(name);
          return {
            fillColor: color,
            color: "#1f2937",
            weight: 0.5,
            fillOpacity: 0.5,
          };
        }}
        onEachFeature={(feature, layer) => {
          layer.on("click", (e) => {
            const rawName = (feature.properties as { NAME?: string })?.NAME;
            const geom = feature.geometry;
            const name =
              geom && (geom.type === "MultiPolygon" || geom.type === "Polygon")
                ? correctRegionName(rawName, displayYear, geom)
                : (rawName ?? "Unknown");
            const latlng = e.latlng;
            setClickedPoint([latlng.lat, latlng.lng]);
            onRegionClick?.({
              name,
              year: displayYear,
              latlng: [latlng.lat, latlng.lng],
            });
          });
        }}
      />
      {clickedPoint && <Marker position={clickedPoint} icon={markerIcon} />}
    </>
  );
}
