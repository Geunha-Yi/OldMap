/**
 * Cliopatria API - 연도별 역사적 국경 GeoJSON
 * @see https://github.com/Seshat-Global-History-Databank/cliopatria
 */

import { NextResponse } from "next/server";
import type { Feature, FeatureCollection } from "geojson";
import JSZip from "jszip";
import path from "path";
import fs from "fs";
import os from "os";

const CLIOPATRIA_ZIP_URL =
  "https://github.com/Seshat-Global-History-Databank/cliopatria/raw/main/cliopatria.geojson.zip";

// 서버 메모리 캐시 (같은 인스턴스 내 요청 간 공유)
let cachedGeoJson: FeatureCollection | null = null;

interface CliopatriaFeature extends Feature {
  properties: {
    Name?: string;
    FromYear?: number;
    ToYear?: number;
    Area?: number;
    Type?: string;
    Wikipedia?: string;
    SeshatID?: string;
    [key: string]: unknown;
  };
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ year: string }> }
) {
  const yearParam = (await params).year;
  const year = parseInt(yearParam, 10);
  if (isNaN(year)) {
    return NextResponse.json({ error: "Invalid year" }, { status: 400 });
  }

  try {
    let geojson = cachedGeoJson;

    if (!geojson) {
      const cachePath = path.join(os.tmpdir(), "oldmap-cliopatria-cache.json");

      if (fs.existsSync(cachePath)) {
        const cached = fs.readFileSync(cachePath, "utf-8");
        geojson = JSON.parse(cached) as FeatureCollection;
      } else {
        const res = await fetch(CLIOPATRIA_ZIP_URL);
        if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
        const zipBuffer = await res.arrayBuffer();
        const zip = await JSZip.loadAsync(zipBuffer);
        const geojsonFile =
          zip.file("cliopatria.geojson") ??
          Object.values(zip.files).find(
            (f) => !f.dir && f.name.endsWith(".geojson")
          );
        if (!geojsonFile) throw new Error("No GeoJSON file found in zip");
        const text = await geojsonFile.async("string");
        geojson = JSON.parse(text) as FeatureCollection;

        try {
          fs.writeFileSync(cachePath, text);
        } catch {
          // 캐시 디렉터리가 없거나 권한 문제
        }
      }

      cachedGeoJson = geojson;
    }

    const filteredFeatures = (geojson.features ?? []).filter((f) => {
      const props = (f as CliopatriaFeature).properties;
      const from = props.FromYear ?? -9999;
      const to = props.ToYear ?? 9999;
      return year >= from && year <= to;
    });

    const result: FeatureCollection = {
      type: "FeatureCollection",
      features: filteredFeatures.map((f) => ({
        ...f,
        properties: {
          ...f.properties,
          NAME: (f as CliopatriaFeature).properties.Name,
        },
      })),
    };

    return NextResponse.json(result, {
      headers: {
        "Cache-Control":
          "public, s-maxage=86400, stale-while-revalidate=604800",
      },
    });
  } catch (err) {
    console.error("Cliopatria API error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to load data" },
      { status: 500 }
    );
  }
}
