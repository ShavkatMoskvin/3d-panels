import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { YandexMetrika } from "@/components/YandexMetrika";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://3dpaneli-moskwin.ru"),
  title: {
    default: "MoskWin | Продажа 3D панелей в Пензе",
    template: "%s | MoskWin"
  },
  description: "Продажа и доставка декоративных 3D панелей в Пензе. Гипсовые, реечные и SPC панели с бесплатной доставкой и профессиональным монтажом по городу и области.",
  keywords: ["3d панели пенза", "купить стеновые панели", "дизайн интерьера пенза", "отделка стен пенза", "гипсовые панели пенза", "реечные панели", "магазин панелей"],
  authors: [{ name: "MoskWin" }],
  creator: "MoskWin",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://3dpaneli-moskwin.ru",
    siteName: "MoskWin",
    title: "MoskWin | Продажа 3D панелей в Пензе",
    description: "Декоративные панели в Пензе. Бесплатная доставка, большой выбор и гарантия на монтаж.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MoskWin 3D Panels",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <CartProvider>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </CartProvider>
        <YandexMetrika />
        <Analytics />
        <Script 
          src="https://integrationjs.tbank.ru/integration.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
