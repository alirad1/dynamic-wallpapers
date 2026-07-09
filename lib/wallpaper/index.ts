export { buildYearSvg } from "./year";
export { buildLifeSvg } from "./life";
export { buildGoalSvg } from "./goal";
export { buildProgressSvg } from "./progress";
export {
  svgToPng,
  pngResponse,
  errorResponse,
  parseDimensions,
  parseTheme,
  parseAccent,
} from "./render";
export { ACCENT_COLORS } from "./theme";
export type { AccentColor, WallpaperTheme } from "./theme";
