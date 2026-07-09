import type { Metadata, Viewport } from "next";
import { Fraunces, Source_Sans_3 } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Dynamic Wallpapers",
  description:
    "Daily-updating lock screen wallpapers for year, life, goal, and progress, generated from a simple URL. No accounts.",
  metadataBase: new URL("https://dynamicwallpapers.alirad.dev"),
  openGraph: {
    title: "Dynamic Wallpapers",
    description:
      "Lock screen wallpapers that update themselves every day. No accounts, no app.",
    url: "https://dynamicwallpapers.alirad.dev",
    siteName: "Dynamic Wallpapers",
    type: "website",
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
        <div className="aurora" aria-hidden />
        {children}
      </body>
    </html>
  );
}
