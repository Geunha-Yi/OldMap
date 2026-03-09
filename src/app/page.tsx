import MainContent from "@/components/MainContent";

export default function Home() {
  return (
    <main className="flex h-screen flex-col overflow-hidden">
      <header className="shrink-0 border-b border-gray-200 bg-white px-4 py-3 shadow-sm">
        <h1 className="text-xl font-bold text-gray-900 md:text-2xl">OldMap</h1>
        <p className="text-sm text-gray-600">역사 지도 탐색 플랫폼</p>
      </header>
      <MainContent />
    </main>
  );
}
