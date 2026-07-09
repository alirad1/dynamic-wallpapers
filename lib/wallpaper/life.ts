import {
  clamp,
  LIFE_EXPECTANCY_YEARS,
  todayLocal,
  totalLifeWeeks,
  weeksLived,
} from "@/lib/dates";
import {
  type AccentColor,
  contentBand,
  getThemeColors,
  type WallpaperTheme,
} from "./theme";
import { svgText } from "./svg-label";

export type LifeWallpaperOptions = {
  width: number;
  height: number;
  dob: Date;
  theme?: WallpaperTheme;
  accent?: AccentColor;
};

export function buildLifeSvg(options: LifeWallpaperOptions): string {
  const { width, height, dob } = options;
  const theme = options.theme ?? "light";
  const colors = getThemeColors(theme, options.accent);
  const today = todayLocal();
  const lived = weeksLived(dob, today);
  const total = totalLifeWeeks();
  const currentWeek = clamp(lived, 0, total - 1);

  const band = contentBand(height);
  const titleSize = Math.round(Math.min(width, height) * 0.04);
  const subtitleSize = Math.round(titleSize * 0.55);
  const padX = Math.round(width * 0.07);
  const gridTop = band.top + Math.round(titleSize * 2.4);
  const gridBottom = height - band.bottom - Math.round(subtitleSize * 2.2);
  const gridH = Math.max(120, gridBottom - gridTop);
  const gridW = width - padX * 2;

  const cols = 52;
  const rows = Math.ceil(total / cols);
  const gap = Math.max(1, Math.round(Math.min(gridW / cols, gridH / rows) * 0.22));
  const cellW = (gridW - gap * (cols - 1)) / cols;
  const cellH = (gridH - gap * (rows - 1)) / rows;
  const cell = Math.min(cellW, cellH);
  const usedW = cols * cell + (cols - 1) * gap;
  const usedH = rows * cell + (rows - 1) * gap;
  const offsetX = padX + (gridW - usedW) / 2;
  const offsetY = gridTop + (gridH - usedH) / 2;

  const cells: string[] = [];
  for (let i = 0; i < total; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = offsetX + col * (cell + gap);
    const y = offsetY + row * (cell + gap);
    let fill = colors.empty;
    if (i < lived) fill = colors.past;
    else if (i === currentWeek && lived < total) fill = colors.accent;
    cells.push(
      `<rect x="${x.toFixed(2)}" y="${y.toFixed(2)}" width="${cell.toFixed(2)}" height="${cell.toFixed(2)}" rx="${Math.max(0.5, cell * 0.25).toFixed(2)}" fill="${fill}"/>`,
    );
  }

  const yearsLived = (lived / 52.1429).toFixed(1);
  const pct = Math.round(clamp((lived / total) * 100, 0, 100));

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="100%" height="100%" fill="${colors.bg}"/>
  ${svgText({ x: width / 2, y: band.top + titleSize, text: "Life calendar", fontSize: titleSize, fill: colors.fg, bold: true })}
  ${svgText({ x: width / 2, y: band.top + titleSize * 1.75, text: `${yearsLived} / ${LIFE_EXPECTANCY_YEARS} years, ${pct}%`, fontSize: subtitleSize, fill: colors.muted })}
  ${cells.join("\n  ")}
  ${svgText({ x: width / 2, y: height - band.bottom * 0.55, text: "Each square is one week", fontSize: subtitleSize, fill: colors.muted })}
</svg>`;
}
