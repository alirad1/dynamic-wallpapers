import { clamp, daysBetween, formatShortDate, todayLocal } from "@/lib/dates";
import {
  type AccentColor,
  contentBand,
  escapeXml,
  getThemeColors,
  type WallpaperTheme,
} from "./theme";

export type ProgressWallpaperOptions = {
  width: number;
  height: number;
  label: string;
  startDate: Date;
  endDate: Date;
  theme?: WallpaperTheme;
  accent?: AccentColor;
};

export function buildProgressSvg(options: ProgressWallpaperOptions): string {
  const { width, height, label, startDate, endDate } = options;
  const theme = options.theme ?? "light";
  const colors = getThemeColors(theme, options.accent);
  const today = todayLocal();
  const totalSpan = Math.max(1, daysBetween(startDate, endDate));
  const elapsed = clamp(daysBetween(startDate, today), 0, totalSpan);
  const progress = clamp(elapsed / totalSpan, 0, 1);
  const pct = Math.round(progress * 100);
  const remaining = Math.max(0, daysBetween(today, endDate));

  const band = contentBand(height);
  const numberSize = Math.round(Math.min(width, height) * 0.16);
  const labelSize = Math.round(numberSize * 0.22);
  const mutedSize = Math.round(numberSize * 0.15);

  const barW = width * 0.7;
  const barH = Math.max(10, Math.round(height * 0.012));
  const barX = (width - barW) / 2;
  const barY = band.centerY + numberSize * 0.55;
  const fillW = barW * progress;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="100%" height="100%" fill="${colors.bg}"/>
  <text x="${width / 2}" y="${band.centerY - numberSize * 0.55}" text-anchor="middle" font-family="system-ui, -apple-system, Segoe UI, sans-serif" font-size="${labelSize}" font-weight="600" fill="${colors.muted}">${escapeXml(label.slice(0, 48))}</text>
  <text x="${width / 2}" y="${band.centerY + numberSize * 0.25}" text-anchor="middle" font-family="system-ui, -apple-system, Segoe UI, sans-serif" font-size="${numberSize}" font-weight="700" fill="${colors.fg}">${pct}%</text>
  <rect x="${barX}" y="${barY}" width="${barW}" height="${barH}" rx="${barH / 2}" fill="${colors.empty}"/>
  <rect x="${barX}" y="${barY}" width="${fillW}" height="${barH}" rx="${barH / 2}" fill="${colors.accent}"/>
  <text x="${width / 2}" y="${barY + barH + mutedSize * 2.2}" text-anchor="middle" font-family="system-ui, -apple-system, Segoe UI, sans-serif" font-size="${mutedSize}" fill="${colors.muted}">${escapeXml(`${formatShortDate(startDate)} → ${formatShortDate(endDate)}`)}</text>
  <text x="${width / 2}" y="${barY + barH + mutedSize * 3.6}" text-anchor="middle" font-family="system-ui, -apple-system, Segoe UI, sans-serif" font-size="${mutedSize}" fill="${colors.muted}">${remaining === 0 ? "Complete" : `${remaining} day${remaining === 1 ? "" : "s"} remaining`}</text>
</svg>`;
}
