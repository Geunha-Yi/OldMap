/**
 * Cliopatria API 클라이언트
 * @see https://github.com/Seshat-Global-History-Databank/cliopatria
 */

import type { GeoJsonObject } from "geojson";

const API_BASE = "/api/cliopatria";

/** 연도별 역사적 국경 GeoJSON 조회 */
export async function getCliopatriaForYear(
  year: number
): Promise<{ data: GeoJsonObject; year: number }> {
  const res = await fetch(`${API_BASE}/${year}`);
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Cliopatria fetch failed: ${res.status} ${err}`);
  }
  const data: GeoJsonObject = await res.json();
  return { data, year };
}

/** Cliopatria 연도 범위 */
export const MIN_YEAR = -3400; // B.C. 3400
export const MAX_YEAR = 2024;

export function formatYear(year: number): string {
  if (year < 0) return `B.C. ${Math.abs(year)}`;
  return `A.D. ${year}`;
}
