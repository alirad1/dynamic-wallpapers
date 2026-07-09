import { clamp, daysBetween, formatShortDate, todayLocal } from "@/lib/dates";
import {
  type AccentColor,
  contentBand,
  getThemeColors,
  type WallpaperTheme,
} from "./theme";
import { svgText } from "./svg-label";

export type GoalWallpaperOptions = {
  width: number;
  height: number;
  goal: string;
  goalDate: Date;
  startDate?: Date;
  theme?: WallpaperTheme;
  accent?: AccentColor;
};

export function buildGoalSvg(options: GoalWallpaperOptions): string {
  const { width, height, goal, goalDate } = options;
  const theme = options.theme ?? "light";
  const colors = getThemeColors(theme, options.accent);
  const today = todayLocal();
  const start = options.startDate ?? today;
  const totalSpan = Math.max(1, daysBetween(start, goalDate));
  const elapsed = clamp(daysBetween(start, today), 0, totalSpan);
  const remaining = daysBetween(today, goalDate);
  const progress = clamp(elapsed / totalSpan, 0, 1);
  const done = remaining <= 0;

  const band = contentBand(height);
  const numberSize = Math.round(Math.min(width, height) * 0.14);
  const labelSize = Math.round(numberSize * 0.28);
  const goalSize = Math.round(numberSize * 0.22);
  const mutedSize = Math.round(numberSize * 0.16);

  const cx = width / 2;
  const cy = band.centerY - numberSize * 0.15;
  const radius = Math.min(width * 0.28, band.available * 0.32);
  const stroke = Math.max(6, Math.round(radius * 0.08));
  const circumference = 2 * Math.PI * radius;
  const dash = circumference * progress;

  const daysLabel = done
    ? "0"
    : String(Math.max(0, remaining));
  const unitLabel = done ? "goal reached" : remaining === 1 ? "day left" : "days left";

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="100%" height="100%" fill="${colors.bg}"/>
  <circle cx="${cx}" cy="${cy}" r="${radius}" fill="none" stroke="${colors.empty}" stroke-width="${stroke}"/>
  <circle cx="${cx}" cy="${cy}" r="${radius}" fill="none" stroke="${colors.accent}" stroke-width="${stroke}" stroke-linecap="round" stroke-dasharray="${dash.toFixed(2)} ${circumference.toFixed(2)}" transform="rotate(-90 ${cx} ${cy})"/>
  ${svgText({ x: cx, y: cy - numberSize * 0.05, text: daysLabel, fontSize: numberSize, fill: colors.fg, bold: true })}
  ${svgText({ x: cx, y: cy + labelSize * 1.4, text: unitLabel, fontSize: labelSize, fill: colors.muted })}
  ${svgText({ x: cx, y: cy + radius + goalSize * 2.2, text: goal.slice(0, 48), fontSize: goalSize, fill: colors.fg, bold: true })}
  ${svgText({ x: cx, y: cy + radius + goalSize * 3.4, text: `${formatShortDate(goalDate)}, ${Math.round(progress * 100)}%`, fontSize: mutedSize, fill: colors.muted })}
</svg>`;
}
