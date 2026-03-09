import MainContent from "@/components/MainContent";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <header className="border-b border-gray-200 bg-white px-4 py-3 shadow-sm md:px-6">
        <h1 className="text-xl font-bold text-gray-900 md:text-2xl">OldMap</h1>
        <p className="text-sm text-gray-600">역사 지도 탐색 플랫폼</p>
      </header>
      <MainContent />
    </main>
  );
}
