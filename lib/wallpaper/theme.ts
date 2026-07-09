export type WallpaperTheme = "light" | "dark";

export type ThemeColors = {
  bg: string;
  fg: string;
  muted: string;
  accent: string;
  accentSoft: string;
  empty: string;
  past: string;
};

export function getThemeColors(theme: WallpaperTheme): ThemeColors {
  if (theme === "dark") {
    return {
      bg: "#0F1410",
      fg: "#F3F4F6",
      muted: "#9CA3AF",
      accent: "#2D6A4F",
      accentSoft: "#40916C",
      empty: "#1F2937",
      past: "#1B4332",
    };
  }
  return {
    bg: "#F3F4F6",
    fg: "#111827",
    muted: "#6B7280",
    accent: "#2D6A4F",
    accentSoft: "#1B4332",
    empty: "#E5E7EB",
    past: "#1B4332",
  };
}

export function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** Lock-screen safe content band: below clock (~18 to 22%), above home indicator. */
export function contentBand(height: number) {
  const top = Math.round(height * 0.22);
  const bottom = Math.round(height * 0.12);
  const available = height - top - bottom;
  return { top, bottom, available, centerY: top + available / 2 };
}
