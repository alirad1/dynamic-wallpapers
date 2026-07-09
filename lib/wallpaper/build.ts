import { parseDate } from "@/lib/dates";
import { buildGoalSvg } from "./goal";
import { buildLifeSvg } from "./life";
import { buildProgressSvg } from "./progress";
import type { AccentColor, WallpaperTheme } from "./theme";
import { buildYearSvg } from "./year";

export type WallpaperType = "year" | "life" | "goal" | "progress";

export type WallpaperSpec = {
  type: WallpaperType;
  width: number;
  height: number;
  theme: WallpaperTheme;
  color: AccentColor;
  dob?: string;
  goal?: string;
  goalDate?: string;
  goalStart?: string;
  label?: string;
  start?: string;
  end?: string;
};

/**
 * Build the wallpaper SVG entirely on the client (no sharp, no network).
 * Returns null when the spec is incomplete so callers can show a hint.
 */
export function buildWallpaperSvg(spec: WallpaperSpec): string | null {
  const { type, width, height, theme, color } = spec;

  if (type === "year") {
    return buildYearSvg({ width, height, theme, accent: color });
  }

  if (type === "life") {
    const dob = spec.dob ? parseDate(spec.dob) : null;
    if (!dob) return null;
    return buildLifeSvg({
      width,
      height,
      theme,
      accent: color,
      dob,
    });
  }

  if (type === "goal") {
    const goalDate = spec.goalDate ? parseDate(spec.goalDate) : null;
    if (!goalDate || !spec.goal?.trim()) return null;
    const startDate = spec.goalStart ? parseDate(spec.goalStart) ?? undefined : undefined;
    return buildGoalSvg({
      width,
      height,
      theme,
      accent: color,
      goal: spec.goal.trim(),
      goalDate,
      startDate,
    });
  }

  const startDate = spec.start ? parseDate(spec.start) : null;
  const endDate = spec.end ? parseDate(spec.end) : null;
  if (!startDate || !endDate || !spec.label?.trim()) return null;
  return buildProgressSvg({
    width,
    height,
    theme,
    accent: color,
    label: spec.label.trim(),
    startDate,
    endDate,
  });
}

/** Build the /api path + query the phone will fetch daily. */
export function buildWallpaperPath(spec: WallpaperSpec): string | null {
  const params = new URLSearchParams({
    width: String(spec.width),
    height: String(spec.height),
    theme: spec.theme,
    color: spec.color,
  });

  if (spec.type === "year") {
    return `/api/year?${params}`;
  }

  if (spec.type === "life") {
    if (!spec.dob) return null;
    params.set("dob", spec.dob);
    return `/api/life?${params}`;
  }

  if (spec.type === "goal") {
    if (!spec.goal?.trim() || !spec.goalDate) return null;
    params.set("goal", spec.goal.trim());
    params.set("goal_date", spec.goalDate);
    if (spec.goalStart) params.set("start_date", spec.goalStart);
    return `/api/goal?${params}`;
  }

  if (!spec.label?.trim() || !spec.start || !spec.end) return null;
  params.set("label", spec.label.trim());
  params.set("start_date", spec.start);
  params.set("end_date", spec.end);
  return `/api/progress?${params}`;
}
