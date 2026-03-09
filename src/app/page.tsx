import dynamic from "next/dynamic";
import YearRangeSlider from "@/components/Timeline/YearRangeSlider";

const MapView = dynamic(() => import("@/components/Map/MapView"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <header className="border-b border-gray-200 px-6 py-4">
        <h1 className="text-2xl font-bold">OldMap</h1>
        <p className="text-sm text-gray-600">역사 지도 탐색 플랫폼</p>
      </header>
      <div className="flex flex-1 flex-col md:flex-row">
        <section className="flex flex-1 border-r border-gray-200 bg-gray-50 p-6">
          <div className="h-full w-full min-h-[400px]">
            <MapView />
          </div>
        </section>
        <aside className="w-full border-t border-gray-200 bg-white p-6 md:w-80 md:border-t-0">
          <h2 className="mb-4 text-lg font-semibold text-gray-800">타임라인</h2>
          <YearRangeSlider />
        </aside>
      </div>
    </main>
  );
}
