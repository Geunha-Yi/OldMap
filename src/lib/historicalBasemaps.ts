/**
 * historical-basemaps 연동
 * @see https://github.com/aourednik/historical-basemaps
 * 육지 형태 폴리곤, 전 세계, 기원전~현대 데이터
 */

const INDEX_URL =
  "https://raw.githubusercontent.com/aourednik/historical-basemaps/master/index.json";
const GEOJSON_BASE =
  "https://raw.githubusercontent.com/aourednik/historical-basemaps/master/geojson";

export interface YearEntry {
  year: number;
  filename: string;
  countries: string[];
}

export interface HistoricalBasemapsIndex {
  years: YearEntry[];
}

let cachedIndex: HistoricalBasemapsIndex | null = null;

export async function getHistoricalIndex(): Promise<HistoricalBasemapsIndex> {
  if (cachedIndex) return cachedIndex;
  const res = await fetch(INDEX_URL, { cache: "force-cache" });
  if (!res.ok) throw new Error("Failed to fetch historical index");
  cachedIndex = await res.json();
  return cachedIndex!;
}

/** 선택 연도에 해당하는 GeoJSON URL 반환 (가장 가까운 연도 선택) */
export async function getGeoJsonUrlForYear(
  year: number
): Promise<{ url: string; year: number }> {
  const index = await getHistoricalIndex();
  const years = [...index.years].sort((a, b) => a.year - b.year);

  if (years.length === 0) throw new Error("No year data");

  // selectedYear 이하이면서 가장 가까운 연도
  let best = years[0];
  for (const entry of years) {
    if (entry.year <= year) {
      best = entry;
    } else {
      break;
    }
  }

  // selectedYear가 모든 연도보다 크면 마지막 사용
  if (year > years[years.length - 1].year) {
    best = years[years.length - 1];
  }

  return {
    url: `${GEOJSON_BASE}/${best.filename}`,
    year: best.year,
  };
}

export const MIN_YEAR = -5000; // BC 5000
export const MAX_YEAR = 2023;

export function formatYear(year: number): string {
  if (year < 0) return `BC ${Math.abs(year)}`;
  return `AD ${year}`;
}
