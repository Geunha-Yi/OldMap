/**
 * OldMapsOnline Geosearch 모킹 데이터
 * API 연동 전 개발용 또는 API 장애 시 폴백으로 사용
 */

import type { HistoricalMap, GeoSearchResult } from "./types";

/** 샘플 역사 지도 목록 (API 응답 구조와 호환) */
export const MOCK_HISTORICAL_MAPS: HistoricalMap[] = [
  {
    "@id": "https://demo.oldmapsonline.org/api/v1/maps/mock-1",
    id: "mock-1",
    attribution: "Demo",
    attribution_link: "https://demo.oldmapsonline.org/",
    name: "mock_seoul_1910",
    state: "active",
    title: "서울 지도 (1910)",
    tracking_id: null,
    is_bookmarked: false,
    links: {
      compare_map: "https://demo.oldmapsonline.org/maps/mock-1/compare",
      georeference: "https://demo.oldmapsonline.org/maps/mock-1/georeference",
      map: "https://demo.oldmapsonline.org/maps/mock-1/",
      metadata: "https://demo.oldmapsonline.org/maps/mock-1/edit",
      transcribe: "https://demo.oldmapsonline.org/maps/mock-1/transcribe",
      view: "https://demo.oldmapsonline.org/maps/mock-1/view",
    },
    thumbnail: {
      gutter: 0,
      height: 1024,
      width: 1024,
      tile_height: 512,
      tile_width: 512,
      type: "rip",
      url: "",
      thumbnails: {
        thumbnail_16_url: "",
        thumbnail_150_fill_url: "",
        thumbnail_1000_url: "",
      },
    },
  },
  {
    "@id": "https://demo.oldmapsonline.org/api/v1/maps/mock-2",
    id: "mock-2",
    attribution: "Demo",
    attribution_link: "https://demo.oldmapsonline.org/",
    name: "mock_korea_1894",
    state: "active",
    title: "조선 전도 (1894)",
    tracking_id: null,
    is_bookmarked: false,
    links: {
      compare_map: "https://demo.oldmapsonline.org/maps/mock-2/compare",
      georeference: "https://demo.oldmapsonline.org/maps/mock-2/georeference",
      map: "https://demo.oldmapsonline.org/maps/mock-2/",
      metadata: "https://demo.oldmapsonline.org/maps/mock-2/edit",
      transcribe: "https://demo.oldmapsonline.org/maps/mock-2/transcribe",
      view: "https://demo.oldmapsonline.org/maps/mock-2/view",
    },
    thumbnail: {
      gutter: 0,
      height: 1024,
      width: 1024,
      tile_height: 512,
      tile_width: 512,
      type: "rip",
      url: "",
      thumbnails: {
        thumbnail_16_url: "",
        thumbnail_150_fill_url: "",
        thumbnail_1000_url: "",
      },
    },
  },
];

/** 모킹 검색 결과 반환 */
export function getMockGeoSearchResult(): GeoSearchResult {
  return {
    maps: MOCK_HISTORICAL_MAPS,
    nextCursor: null,
    hasMore: false,
  };
}
