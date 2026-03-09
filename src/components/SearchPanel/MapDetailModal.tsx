"use client";

import type { HistoricalMap } from "@/lib/types";

interface MapDetailModalProps {
  map: HistoricalMap;
  onClose: () => void;
}

function getThumbnailUrl(map: HistoricalMap): string | null {
  const thumb = map.thumbnail?.thumbnails;
  return (
    thumb?.thumbnail_1000_url ??
    thumb?.thumbnail_150_fill_url ??
    thumb?.thumbnail_16_url ??
    null
  );
}

export default function MapDetailModal({ map, onClose }: MapDetailModalProps) {
  const thumbUrl = getThumbnailUrl(map);
  const viewUrl = map.links?.view ?? map.links?.map ?? null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="map-modal-title"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] max-w-2xl overflow-y-auto rounded-lg bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
          <h2 id="map-modal-title" className="text-lg font-semibold">
            {map.title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            aria-label="닫기"
          >
            <span className="text-xl">&times;</span>
          </button>
        </div>
        <div className="p-6">
          {thumbUrl && (
            <div className="mb-4 overflow-hidden rounded-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={thumbUrl}
                alt={map.title}
                className="w-full object-contain"
              />
            </div>
          )}
          {(map.attribution || map.attribution_link) && (
            <p className="mb-4 text-sm text-gray-600">
              {map.attribution_link ? (
                <a
                  href={map.attribution_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {map.attribution ?? "출처 보기"}
                </a>
              ) : (
                map.attribution
              )}
            </p>
          )}
          {viewUrl && (
            <a
              href={viewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              확대하여 보기
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
