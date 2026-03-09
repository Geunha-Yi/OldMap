/**
 * OldMapsOnline Geosearch API 타입 정의
 * @see https://demo.oldmapsonline.org/docs/geosearch
 * @see https://demo.oldmapsonline.org/api/v1/maps
 */

/** 지도 썸네일 메타데이터 */
export interface MapThumbnails {
  thumbnail_16_url?: string;
  thumbnail_150_fill_url?: string;
  thumbnail_1000_url?: string;
}

/** 지도 썸네일/이미지 정보 */
export interface MapThumbnail {
  gutter: number;
  height: number;
  width: number;
  tile_height: number;
  tile_width: number;
  type: string;
  url: string;
  thumbnails: MapThumbnails;
}

/** 지도 링크 모음 */
export interface MapLinks {
  compare_map: string;
  georeference: string;
  map: string;
  metadata: string;
  transcribe: string;
  view: string;
}

/** 역사 지도 개별 아이템 (API 응답 구조) */
export interface HistoricalMap {
  "@id": string;
  id: string;
  attribution: string;
  attribution_link: string;
  name: string;
  state: string;
  title: string;
  tracking_id: string | null;
  is_bookmarked: boolean;
  links: MapLinks;
  thumbnail: MapThumbnail;
}

/** Geosearch 검색 요청 파라미터 */
export interface GeoSearchParams {
  /** 경계 상자: minLon, minLat, maxLon, maxLat (WGS84) */
  bbox?: {
    minLon: number;
    minLat: number;
    maxLon: number;
    maxLat: number;
  };
  /** 전체 텍스트 검색 (제목, 저자 등) */
  fulltext?: string;
  /** 결과 개수 제한 (기본: 10) */
  limit?: number;
  /** 오프셋 (페이지네이션) */
  offset?: number;
  /** 커서 기반 페이지네이션용 */
  cursor?: string;
  /** 연도 범위 - 시작 */
  yearFrom?: number;
  /** 연도 범위 - 종료 */
  yearTo?: number;
}

/** Geosearch API raw 응답 ( maps 엔드포인트 ) */
export interface GeoSearchApiResponse {
  "@list": HistoricalMap[];
  next?: string;
}

/** Geosearch 검색 결과 (정규화된 구조) */
export interface GeoSearchResult {
  maps: HistoricalMap[];
  nextCursor?: string | null;
  hasMore: boolean;
}
