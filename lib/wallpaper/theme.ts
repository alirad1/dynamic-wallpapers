export type WallpaperTheme = "light" | "dark";

export type AccentColor = "green" | "blue" | "purple" | "red" | "black";

export const ACCENT_COLORS: AccentColor[] = [
  "green",
  "blue",
  "purple",
  "red",
  "black",
];

export type ThemeColors = {
  bg: string;
  fg: string;
  muted: string;
  accent: string;
  empty: string;
  past: string;
};

type AccentPair = { accent: string; past: string };

const ACCENTS: Record<AccentColor, { light: AccentPair; dark: AccentPair }> = {
  green: {
    dark: { accent: "#40916C", past: "#1B4332" },
    light: { accent: "#2D6A4F", past: "#1B4332" },
  },
  blue: {
    dark: { accent: "#4C86C6", past: "#22456B" },
    light: { accent: "#3E6FA3", past: "#274B6D" },
  },
  purple: {
    dark: { accent: "#8B7BD8", past: "#3A2F63" },
    light: { accent: "#6C5CB0", past: "#3B3168" },
  },
  red: {
    dark: { accent: "#CB5A54", past: "#5C2320" },
    light: { accent: "#B24741", past: "#5C2320" },
  },
  black: {
    dark: { accent: "#E9EFEB", past: "#4B5563" },
    light: { accent: "#111827", past: "#374151" },
  },
};

export function getThemeColors(
  theme: WallpaperTheme,
  accent: AccentColor = "green",
): ThemeColors {
  const pair = (ACCENTS[accent] ?? ACCENTS.green)[theme];
  if (theme === "dark") {
    return {
      bg: "#0F1410",
      fg: "#F3F4F6",
      muted: "#9CA3AF",
      accent: pair.accent,
      empty: "#1F2937",
      past: pair.past,
    };
  }
  return {
    bg: "#F3F4F6",
    fg: "#111827",
    muted: "#6B7280",
    accent: pair.accent,
    empty: "#E5E7EB",
    past: pair.past,
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

/** Font family for SVG text (bundled DejaVu Sans via fontconfig). */
export const SVG_FONT_FAMILY = "DejaVu Sans, sans-serif";

/** Lock-screen safe content band: below clock, above home indicator. */
export function contentBand(height: number) {
  const top = Math.round(height * 0.28);
  const bottom = Math.round(height * 0.14);
  const available = height - top - bottom;
  return { top, bottom, available, centerY: top + available / 2 };
}
