"use client";

import type { HistoricalMap } from "@/lib/types";

interface MapListItemProps {
  map: HistoricalMap;
  onClick: () => void;
}

function getThumbnailUrl(map: HistoricalMap): string | null {
  const thumb = map.thumbnail?.thumbnails;
  return (
    thumb?.thumbnail_150_fill_url ??
    thumb?.thumbnail_1000_url ??
    thumb?.thumbnail_16_url ??
    null
  );
}

export default function MapListItem({ map, onClick }: MapListItemProps) {
  const thumbUrl = getThumbnailUrl(map);

  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        className="flex w-full gap-3 rounded-lg border border-gray-200 bg-white p-3 text-left shadow-sm transition hover:border-blue-300 hover:shadow-md"
      >
        {thumbUrl ? (
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumbUrl}
              alt={map.title}
              className="h-full w-full object-cover"
              width={80}
              height={80}
            />
          </div>
        ) : (
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded bg-gray-100 text-xs text-gray-400">
            지도
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate font-medium text-gray-900">{map.title}</p>
          <p className="mt-1 text-xs text-gray-500">{map.attribution}</p>
        </div>
      </button>
    </li>
  );
}
