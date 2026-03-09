import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OldMap - 역사 지도 탐색",
  description: "역사 지도를 검색하고 탐색하세요",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">{children}</body>
    </html>
  );
}
