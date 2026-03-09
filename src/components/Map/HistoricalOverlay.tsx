"use client";

import { useEffect, useState } from "react";
import { GeoJSON, useMap } from "react-leaflet";
import L from "leaflet";
import type { GeoJsonObject } from "geojson";
import type { FeatureCollection } from "geojson";
import { getGeoJsonUrlForYear, formatYear } from "@/lib/historicalBasemaps";

interface HistoricalOverlayProps {
  selectedYear: number;
}

/** 국가명으로 일관된 색상 생성 */
function getColorForName(name: string): string {
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

export default function HistoricalOverlay({
  selectedYear,
}: HistoricalOverlayProps) {
  const map = useMap();
  const [geojson, setGeojson] = useState<GeoJsonObject | null>(null);
  const [displayYear, setDisplayYear] = useState<number>(selectedYear);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    getGeoJsonUrlForYear(selectedYear)
      .then(async ({ url, year }) => {
        if (cancelled) return;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Failed to load: ${res.status}`);
        const data: GeoJsonObject = await res.json();
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

  useEffect(() => {
    const fc = geojson as FeatureCollection | null;
    if (fc?.features?.length) {
      const allCoords: [number, number][] = [];
      for (const f of fc.features) {
        const geom = f.geometry;
        if (geom?.type === "MultiPolygon") {
          for (const ring of geom.coordinates) {
            for (const coord of ring[0]) {
              allCoords.push([coord[1], coord[0]]);
            }
          }
        } else if (geom?.type === "Polygon") {
          for (const coord of geom.coordinates[0]) {
            allCoords.push([coord[1], coord[0]]);
          }
        }
      }
      if (allCoords.length > 0) {
        const bounds = L.latLngBounds(allCoords);
        map.fitBounds(bounds, { padding: [20, 20], maxZoom: 3 });
      }
    }
  }, [geojson, map]);

  if (loading || error || !geojson) {
    return null;
  }

  return (
    <GeoJSON
      key={displayYear}
      data={geojson}
      style={(feature) => {
        const name =
          (feature?.properties as { NAME?: string })?.NAME ?? "Unknown";
        const color = getColorForName(name);
        return {
          fillColor: color,
          color: "#1f2937",
          weight: 0.5,
          fillOpacity: 0.5,
        };
      }}
      onEachFeature={(feature, layer) => {
        const props = feature.properties as { NAME?: string };
        const name = props?.NAME ?? "Unknown";
        layer.bindPopup(
          `<div class="min-w-[160px]">
            <p class="font-semibold text-gray-900">${name}</p>
            <p class="text-sm text-gray-600">${formatYear(displayYear)}</p>
          </div>`
        );
      }}
    />
  );
}
