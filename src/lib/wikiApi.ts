/**
 * Wikipedia API 연동 - 지역/국가 정보 조회
 * @see https://www.mediawiki.org/wiki/API:Main_page
 */

export interface WikiSummary {
  title: string;
  extract: string;
  extract_html?: string;
  description?: string;
  thumbnail?: {
    source: string;
    width: number;
    height: number;
  };
  content_urls?: {
    desktop?: { page: string };
    mobile?: { page: string };
  };
}

/** Wikipedia 검색 후 첫 결과의 제목 반환 */
async function searchWikiTitle(query: string): Promise<string | null> {
  const url = `https://en.wikipedia.org/w/api.php?${new URLSearchParams({
    action: "query",
    list: "search",
    srsearch: query,
    srlimit: "1",
    format: "json",
    origin: "*",
  })}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();
  const hits = data?.query?.search ?? [];
  return hits[0]?.title ?? null;
}

/** Wikipedia 페이지 요약 조회 */
export async function fetchWikiSummary(
  regionName: string,
  year?: number
): Promise<WikiSummary | null> {
  // 검색어: 지역명 + 연도 (예: "Joseon 1500")로 더 정확한 결과
  const searchQuery = year ? `${regionName} ${year}` : regionName;
  const title = await searchWikiTitle(searchQuery);

  if (!title) {
    // 연도 없이 재시도
    if (year) {
      const fallbackTitle = await searchWikiTitle(regionName);
      if (fallbackTitle) return fetchSummaryByTitle(fallbackTitle);
    }
    return null;
  }

  return fetchSummaryByTitle(title);
}

async function fetchSummaryByTitle(title: string): Promise<WikiSummary | null> {
  const encoded = encodeURIComponent(title.replace(/ /g, "_"));
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encoded}`;
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) return null;
  const data = await res.json();
  return {
    title: data.title ?? title,
    extract: data.extract ?? "",
    extract_html: data.extract_html,
    description: data.description,
    thumbnail: data.thumbnail,
    content_urls: data.content_urls,
  };
}
