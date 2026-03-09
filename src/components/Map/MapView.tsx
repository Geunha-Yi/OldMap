"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import HistoricalOverlay from "./HistoricalOverlay";
import HistoricalLegend from "./HistoricalLegend";

const DEFAULT_CENTER: [number, number] = [30, 0];
const DEFAULT_ZOOM = 2;

interface MapViewProps {
  selectedYear?: number;
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
