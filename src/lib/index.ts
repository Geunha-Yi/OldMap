/**
 * OldMapsOnline Geosearch API
 */

export { geosearch, geosearchNextPage, getMapById, getApiBaseUrl } from "./api";
export { getMockGeoSearchResult, MOCK_HISTORICAL_MAPS } from "./mock";
export type {
  GeoSearchParams,
  GeoSearchResult,
  HistoricalMap,
  MapThumbnail,
  MapThumbnails,
  MapLinks,
  GeoSearchApiResponse,
} from "./types";
