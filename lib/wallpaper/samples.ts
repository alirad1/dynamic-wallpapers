import { buildWallpaperSvg, type WallpaperSpec, type WallpaperType } from "./build";

const SAMPLE_WIDTH = 390;
const SAMPLE_HEIGHT = 844;

export function typeSampleSpec(type: WallpaperType): WallpaperSpec {
  const base: WallpaperSpec = {
    type,
    width: SAMPLE_WIDTH,
    height: SAMPLE_HEIGHT,
    theme: "dark",
    color: "green",
  };
  if (type === "life") return { ...base, dob: "2000-01-01" };
  if (type === "goal") {
    return {
      ...base,
      goal: "Launch day",
      goalDate: "2026-09-01",
      goalStart: "2026-01-01",
    };
  }
  if (type === "progress") {
    return {
      ...base,
      label: "This year",
      start: "2026-01-01",
      end: "2026-12-31",
    };
  }
  return base;
}

export function typeSampleDataUri(type: WallpaperType): string | null {
  const svg = buildWallpaperSvg(typeSampleSpec(type));
  return svg ? `data:image/svg+xml;utf8,${encodeURIComponent(svg)}` : null;
}
