/**
 * 역사적 지역 데이터 - 선택된 연도에 해당하는 지역을 지도에 색상으로 표시
 */

export interface HistoricalRegion {
  id: string;
  name: string;
  nameEn?: string;
  yearFrom: number;
  yearTo: number;
  periodName: string; // "일제강점기", "조선", "대한제국" 등
  color: string;
  /** GeoJSON 형식의 경계 (경위도) */
  bounds: [[number, number], [number, number]]; // [[minLon, minLat], [maxLon, maxLat]] 또는 폴리곤
  polygon?: number[][][]; // [[[lng, lat], ...]] for complex shapes
}

/** 한반도 중심 샘플 데이터 - 연도 선택 시 해당 시대 지역 표시 */
export const HISTORICAL_REGIONS: HistoricalRegion[] = [
  {
    id: "korea-joseon",
    name: "조선",
    nameEn: "Joseon",
    yearFrom: 1392,
    yearTo: 1897,
    periodName: "조선 (1392-1897)",
    color: "#3B82F6", // blue
    bounds: [
      [124.5, 33.0],
      [131.0, 43.0],
    ],
  },
  {
    id: "korea-empire",
    name: "대한제국",
    nameEn: "Korean Empire",
    yearFrom: 1897,
    yearTo: 1910,
    periodName: "대한제국 (1897-1910)",
    color: "#8B5CF6", // violet
    bounds: [
      [124.5, 33.0],
      [131.0, 43.0],
    ],
  },
  {
    id: "korea-japan",
    name: "일제강점기",
    nameEn: "Japanese Occupation",
    yearFrom: 1910,
    yearTo: 1945,
    periodName: "일제강점기 (1910-1945)",
    color: "#EF4444", // red
    bounds: [
      [124.5, 33.0],
      [131.0, 43.0],
    ],
  },
  {
    id: "korea-divided",
    name: "남북분단",
    nameEn: "Divided Korea",
    yearFrom: 1945,
    yearTo: 2100,
    periodName: "남북 분단 (1945-)",
    color: "#10B981", // emerald
    bounds: [
      [124.5, 33.0],
      [131.0, 43.0],
    ],
  },
  // 동아시아 주변 지역
  {
    id: "manchuria-japan",
    name: "만주국",
    nameEn: "Manchukuo",
    yearFrom: 1932,
    yearTo: 1945,
    periodName: "만주국 (1932-1945)",
    color: "#F59E0B", // amber
    bounds: [
      [118.0, 38.0],
      [135.0, 53.0],
    ],
  },
];

/** 선택된 연도에 표시할 지역 필터 */
export function getRegionsForYear(year: number): HistoricalRegion[] {
  return HISTORICAL_REGIONS.filter(
    (r) => year >= r.yearFrom && year <= r.yearTo
  );
}
