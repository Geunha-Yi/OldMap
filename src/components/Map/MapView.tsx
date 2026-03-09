"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import HistoricalOverlay from "./HistoricalOverlay";
import type { ClickedRegionInfo } from "./ClickedInfoPanel";
import type { LegendRegion } from "@/lib/types";

const DEFAULT_CENTER: [number, number] = [30, 0];
const DEFAULT_ZOOM = 2;

interface MapViewProps {
  selectedYear?: number;
  onRegionClick?: (info: ClickedRegionInfo) => void;
  onRegionsLoaded?: (regions: LegendRegion[]) => void;
}

function MapContent({
  selectedYear,
  onRegionClick,
  onRegionsLoaded,
}: {
  selectedYear: number;
  onRegionClick?: (info: ClickedRegionInfo) => void;
  onRegionsLoaded?: (regions: LegendRegion[]) => void;
}) {
  return (
    <>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <HistoricalOverlay
        selectedYear={selectedYear}
        onRegionClick={onRegionClick}
        onRegionsLoaded={onRegionsLoaded}
      />
    </>
  );
}

export default function MapView({
  selectedYear = 1900,
  onRegionClick,
  onRegionsLoaded,
}: MapViewProps) {
  return (
    <div className="relative h-full w-full">
      <MapContainer
        center={DEFAULT_CENTER}
        zoom={DEFAULT_ZOOM}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <MapContent
          selectedYear={selectedYear}
          onRegionClick={onRegionClick}
          onRegionsLoaded={onRegionsLoaded}
        />
      </MapContainer>
    </div>
  );
}
