import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { YandexMetrika } from "@/components/YandexMetrika";
import Script from "next/script";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://3d-panels-penza.ru"),
  title: {
    default: "MoskWin | Премиальные 3D панели в Пензе",
    template: "%s | MoskWin"
  },
  description: "Производство и продажа декоративных 3D панелей в Пензе. Гипсовые, реечные и SPC панели с бесплатной доставкой и профессиональным монтажом.",
  keywords: ["3d панели", "стеновые панели", "дизайн интерьера", "Пенза", "отделка стен", "гипсовые панели", "реечные панели", "купить панели"],
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
    url: "https://3d-panels-penza.ru", // Замените на ваш реальный домен
    siteName: "MoskWin",
    title: "MoskWin | Премиальные 3D панели в Пензе",
    description: "Декоративные панели для вашего интерьера. Бесплатная доставка и гарантия на монтаж.",
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
        <Script 
          src="https://integrationjs.tbank.ru/integration.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
