"use client";

import { useMemo, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Rectangle,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { getRegionsForYear } from "@/lib/historicalRegions";
import HistoricalLegend from "./HistoricalLegend";

const DEFAULT_CENTER: [number, number] = [37.5665, 126.978];
const DEFAULT_ZOOM = 5;

interface MapViewProps {
  selectedYear?: number;
}

/** bounds: [[minLon, minLat], [maxLon, maxLat]] -> Leaflet [[south, west], [north, east]] */
function HistoricalOverlay({ selectedYear = 1900 }: { selectedYear: number }) {
  const map = useMap();
  const regions = useMemo(
    () => getRegionsForYear(selectedYear),
    [selectedYear]
  );

  useEffect(() => {
    if (regions.length > 0) {
      const allBounds = regions.flatMap((r) => {
        const [[minLon, minLat], [maxLon, maxLat]] = r.bounds;
        return [
          [minLat, minLon] as [number, number],
          [maxLat, maxLon] as [number, number],
        ];
      });
      const bounds = L.latLngBounds(allBounds);
      map.fitBounds(bounds, { padding: [30, 30], maxZoom: 5 });
    }
  }, [regions, map]);

  return (
    <>
      {regions.map((region) => {
        const [[minLon, minLat], [maxLon, maxLat]] = region.bounds;
        const leafletBounds: L.LatLngBoundsExpression = [
          [minLat, minLon],
          [maxLat, maxLon],
        ];
        return (
          <Rectangle
            key={region.id}
            bounds={leafletBounds}
            pathOptions={{
              color: region.color,
              fillColor: region.color,
              fillOpacity: 0.35,
              weight: 2,
            }}
            eventHandlers={{
              mouseover: (e) => {
                e.target.setStyle({ fillOpacity: 0.5, weight: 3 });
                e.target.bringToFront();
              },
              mouseout: (e) => {
                e.target.setStyle({ fillOpacity: 0.35, weight: 2 });
              },
            }}
          >
            <Popup>
              <div className="min-w-[180px]">
                <p className="font-semibold text-gray-900">{region.name}</p>
                <p className="text-sm text-gray-600">
                  {region.yearFrom}년 ~ {region.yearTo}년
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  {region.periodName}
                </p>
              </div>
            </Popup>
          </Rectangle>
        );
      })}
    </>
  );
}

function MapContent({ selectedYear }: { selectedYear: number }) {
  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <HistoricalOverlay selectedYear={selectedYear} />
    </>
  );
}

export default function MapView({ selectedYear = 1900 }: MapViewProps) {
  return (
    <div className="relative h-full w-full">
      <MapContainer
        center={DEFAULT_CENTER}
        zoom={DEFAULT_ZOOM}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <MapContent selectedYear={selectedYear} />
      </MapContainer>
      <HistoricalLegend selectedYear={selectedYear} />
    </div>
  );
}
