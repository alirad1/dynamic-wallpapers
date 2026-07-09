import {
  dayOfYear,
  daysInYear,
  todayLocal,
} from "@/lib/dates";
import {
  type AccentColor,
  contentBand,
  escapeXml,
  getThemeColors,
  SVG_FONT_FAMILY,
  type WallpaperTheme,
} from "./theme";

export type YearWallpaperOptions = {
  width: number;
  height: number;
  theme?: WallpaperTheme;
  accent?: AccentColor;
  year?: number;
};

export function buildYearSvg(options: YearWallpaperOptions): string {
  const { width, height } = options;
  const theme = options.theme ?? "light";
  const colors = getThemeColors(theme, options.accent);
  const today = todayLocal();
  const year = options.year ?? today.getFullYear();
  const totalDays = daysInYear(year);
  const todayIndex =
    year === today.getFullYear()
      ? dayOfYear(today)
      : year < today.getFullYear()
        ? totalDays + 1
        : 0;

  const band = contentBand(height);
  const titleSize = Math.round(Math.min(width, height) * 0.045);
  const subtitleSize = Math.round(titleSize * 0.55);
  const padX = Math.round(width * 0.08);
  const gridTop = band.top + Math.round(titleSize * 2.2);
  const gridBottom = height - band.bottom - Math.round(subtitleSize * 2);
  const gridH = Math.max(100, gridBottom - gridTop);
  const gridW = width - padX * 2;

  const cols = 20;
  const rows = Math.ceil(totalDays / cols);
  const gap = Math.max(2, Math.round(Math.min(gridW / cols, gridH / rows) * 0.18));
  const cellW = (gridW - gap * (cols - 1)) / cols;
  const cellH = (gridH - gap * (rows - 1)) / rows;
  const cell = Math.min(cellW, cellH);
  const usedW = cols * cell + (cols - 1) * gap;
  const usedH = rows * cell + (rows - 1) * gap;
  const offsetX = padX + (gridW - usedW) / 2;
  const offsetY = gridTop + (gridH - usedH) / 2;

  const cells: string[] = [];
  for (let i = 0; i < totalDays; i++) {
    const dayNum = i + 1;
    const col = i % cols;
    const row = Math.floor(i / cols);
    const x = offsetX + col * (cell + gap);
    const y = offsetY + row * (cell + gap);
    let fill = colors.empty;
    if (dayNum < todayIndex) fill = colors.past;
    else if (dayNum === todayIndex) fill = colors.accent;
    cells.push(
      `<rect x="${x.toFixed(2)}" y="${y.toFixed(2)}" width="${cell.toFixed(2)}" height="${cell.toFixed(2)}" rx="${Math.max(1, cell * 0.2).toFixed(2)}" fill="${fill}"/>`,
    );
  }

  const remainingLabel =
    year === today.getFullYear()
      ? `${Math.max(0, totalDays - todayIndex)} days left in ${year}`
      : year < today.getFullYear()
        ? `${year} complete`
        : `${year} upcoming`;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="100%" height="100%" fill="${colors.bg}"/>
  <text x="${width / 2}" y="${band.top + titleSize}" text-anchor="middle" font-family="${SVG_FONT_FAMILY}" font-size="${titleSize}" font-weight="700" fill="${colors.fg}">${escapeXml(String(year))}</text>
  <text x="${width / 2}" y="${band.top + titleSize * 1.7}" text-anchor="middle" font-family="${SVG_FONT_FAMILY}" font-size="${subtitleSize}" fill="${colors.muted}">Year calendar</text>
  ${cells.join("\n  ")}
  <text x="${width / 2}" y="${height - band.bottom * 0.55}" text-anchor="middle" font-family="${SVG_FONT_FAMILY}" font-size="${subtitleSize}" fill="${colors.muted}">${escapeXml(remainingLabel)}</text>
</svg>`;
}
