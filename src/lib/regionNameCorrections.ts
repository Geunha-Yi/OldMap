/**
 * 역사적 국경 데이터의 지역명 보정
 * - historical-basemaps의 오류/누락 보완
 * - 한국: 1392~1897년 = 조선 (Joseon)
 */

/** 한반도 대략적 경계 (lon, lat) */
const KOREA_BBOX = {
  minLon: 124,
  maxLon: 131,
  minLat: 33,
  maxLat: 43,
};

import type { MultiPolygon, Polygon } from "geojson";

/** 폴리곤 중심점(lon, lat) 계산 */
function getCentroid(geom: MultiPolygon | Polygon): [number, number] | null {
  if (geom.type === "MultiPolygon") {
    const coords = geom.coordinates[0]?.[0];
    if (!coords?.length) return null;
    let sumLon = 0,
      sumLat = 0,
      n = 0;
    for (const c of coords) {
      sumLon += c[0];
      sumLat += c[1];
      n++;
    }
    return [sumLon / n, sumLat / n];
  }
  if (geom.type === "Polygon") {
    const coords = geom.coordinates[0];
    if (!coords?.length) return null;
    let sumLon = 0,
      sumLat = 0,
      n = 0;
    for (const c of coords) {
      sumLon += c[0];
      sumLat += c[1];
      n++;
    }
    return [sumLon / n, sumLat / n];
  }
  return null;
}

function isInKoreaBbox(lon: number, lat: number): boolean {
  return (
    lon >= KOREA_BBOX.minLon &&
    lon <= KOREA_BBOX.maxLon &&
    lat >= KOREA_BBOX.minLat &&
    lat <= KOREA_BBOX.maxLat
  );
}

/** 연도별 지역명 보정 */
export function correctRegionName(
  rawName: string | null | undefined,
  year: number,
  geometry?: MultiPolygon | Polygon
): string {
  const name = rawName?.trim() || null;

  // 1392~1897: 한반도 = 조선
  const isJoseonPeriod = year >= 1392 && year <= 1897;

  if (name === "Korea" && isJoseonPeriod) {
    return "Joseon";
  }

  if (!name && isJoseonPeriod && geometry) {
    const centroid = getCentroid(geometry);
    if (centroid && isInKoreaBbox(centroid[0], centroid[1])) {
      return "Joseon";
    }
  }

  return name || "Unknown";
}
