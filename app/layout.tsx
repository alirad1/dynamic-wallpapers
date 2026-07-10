import type { Metadata, Viewport } from "next";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
});

const body = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin"],
});

const title =
  "Dynamic Wallpapers — Custom iPhone & Android Lock Screen Wallpapers That Update Daily";

export const metadata: Metadata = {
  title: {
    default: title,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "custom iPhone wallpaper",
    "custom iPhone lock screen wallpaper",
    "custom Android wallpaper",
    "custom wallpaper for Android",
    "goal setting wallpaper",
    "goal countdown wallpaper",
    "year progress wallpaper",
    "year in pixels wallpaper",
    "life in weeks wallpaper",
    "daily updating wallpaper",
    "automatic lock screen wallpaper",
    "iOS Shortcuts wallpaper",
    "MacroDroid wallpaper",
    "motivational lock screen",
    "progress tracker wallpaper",
    "custom phone wallpaper generator",
    "free lock screen wallpaper",
    "dynamic wallpaper",
    "wallpaper that changes every day",
    "Samsung Galaxy wallpaper",
    "Google Pixel wallpaper",
    "iPhone 16 wallpaper",
    "countdown wallpaper",
    "habit tracker wallpaper",
    "productivity wallpaper",
  ],
  authors: [{ name: "Ali Rad", url: "https://alirad.dev" }],
  creator: "Ali Rad",
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
  verification: {
    google: "ktVgOh9jj4MSE-nvfrRHBYUw81fNglJ3vuvzsZ_F1OU",
  },
};

export const viewport: Viewport = {
  themeColor: "#070a08",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <JsonLd />
        <div className="aurora" aria-hidden />
        {children}
      </body>
    </html>
  );
}
