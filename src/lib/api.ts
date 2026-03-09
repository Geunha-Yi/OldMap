/**
 * OldMapsOnline Geosearch API 연동
 * @see https://demo.oldmapsonline.org/docs/geosearch
 * @see https://demo.oldmapsonline.org/api/v1/maps
 */

import type {
  GeoSearchParams,
  GeoSearchResult,
  GeoSearchApiResponse,
  HistoricalMap,
} from "./types";

const BASE_URL = "https://demo.oldmapsonline.org/api/v1";

/** API 기본 URL (환경 변수로 오버라이드 가능) */
export function getApiBaseUrl(): string {
  return process.env.NEXT_PUBLIC_OLDMAPSONLINE_API_URL ?? BASE_URL;
}

/**
 * GeoSearchParams를 쿼리 스트링으로 변환
 */
function buildSearchParams(params: GeoSearchParams): URLSearchParams {
  const searchParams = new URLSearchParams();

  if (params.bbox) {
    const { minLon, minLat, maxLon, maxLat } = params.bbox;
    searchParams.set("bbox", `${minLon},${minLat},${maxLon},${maxLat}`);
  }
  if (params.limit !== undefined) {
    searchParams.set("limit", String(params.limit));
  }
  if (params.offset !== undefined) {
    searchParams.set("offset", String(params.offset));
  }
  if (params.cursor) {
    searchParams.set("cursor", params.cursor);
  }
  if (params.fulltext) {
    searchParams.set("fulltext", params.fulltext);
  }
  if (params.yearFrom !== undefined) {
    searchParams.set("year_from", String(params.yearFrom));
  }
  if (params.yearTo !== undefined) {
    searchParams.set("year_to", String(params.yearTo));
  }

  return searchParams;
}

/**
 * Geosearch API 호출 - 지역(bbox) 또는 텍스트 기반 역사 지도 검색
 */
export async function geosearch(
  params: GeoSearchParams = {}
): Promise<GeoSearchResult> {
  const baseUrl = getApiBaseUrl();
  const searchParams = buildSearchParams(params);
  const url = `${baseUrl}/maps?${searchParams.toString()}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(
      `Geosearch API error: ${response.status} ${response.statusText}`
    );
  }

  const data: GeoSearchApiResponse = await response.json();
  const next = data.next ?? null;

  return {
    maps: data["@list"] ?? [],
    nextCursor: next ? extractCursorFromUrl(next) : null,
    hasMore: Boolean(next),
  };
}

/** next URL에서 cursor 값 추출 */
function extractCursorFromUrl(nextUrl: string): string | null {
  try {
    const url = new URL(nextUrl);
    return url.searchParams.get("cursor");
  } catch {
    return null;
  }
}

/**
 * 커서를 사용한 다음 페이지 조회
 */
export async function geosearchNextPage(
  cursor: string,
  limit = 10
): Promise<GeoSearchResult> {
  return geosearch({ cursor, limit });
}

/**
 * 단일 지도 상세 조회 (id 기반)
 * 참고: 개별 지도 메타데이터는 /maps/{id} 형태로 제공될 수 있음
 */
export async function getMapById(id: string): Promise<HistoricalMap | null> {
  const baseUrl = getApiBaseUrl();
  const url = `${baseUrl}/maps/${id}`;

  const response = await fetch(url, {
    method: "GET",
    headers: { Accept: "application/json" },
    next: { revalidate: 300 },
  });

  if (!response.ok) {
    if (response.status === 404) return null;
    throw new Error(`Map API error: ${response.status}`);
  }

  return response.json();
}
