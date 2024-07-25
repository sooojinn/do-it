import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/Header";
import localFont from "next/font/local";

// 폰트 불러오기
const nanumSquareR = localFont({
  src: "../../public/fonts/NanumSquareR.ttf",
  variable: "--font-nanum-square",
});

const nanumSquareB = localFont({
  src: "../../public/fonts/NanumSquareB.ttf",
  variable: "--font-nanum-square-bold",
});

const nanumSquareEB = localFont({
  src: "../../public/fonts/NanumSquareEB.ttf",
  variable: "--font-nanum-square-Extrabold",
});

export const metadata: Metadata = {
  title: "Do It",
  description: "투두 리스트",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${nanumSquareR.variable} ${nanumSquareB.variable} ${nanumSquareEB.variable}`}
    >
      <body>
        <Header></Header>
        <main>{children}</main>
      </body>
    </html>
  );
}
