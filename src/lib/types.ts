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
  "@id"?: string;
  id: string;
  attribution?: string;
  attribution_link?: string;
  name?: string;
  state?: string;
  title: string;
  tracking_id?: string | null;
  is_bookmarked?: boolean;
  links?: MapLinks;
  thumbnail?: MapThumbnail;
}

/** Geosearch 검색 요청 파라미터 */
export interface GeoSearchParams {
  bbox?: {
    minLon: number;
    minLat: number;
    maxLon: number;
    maxLat: number;
  };
  fulltext?: string;
  limit?: number;
  offset?: number;
  cursor?: string;
  yearFrom?: number;
  yearTo?: number;
}

/** Geosearch API raw 응답 */
export interface GeoSearchApiResponse {
  "@list": HistoricalMap[];
  next?: string;
}

/** Geosearch 검색 결과 */
export interface GeoSearchResult {
  maps: HistoricalMap[];
  nextCursor?: string | null;
  hasMore: boolean;
}

/** 범례용 지역 (이름, 색상) */
export interface LegendRegion {
  name: string;
  color: string;
}
