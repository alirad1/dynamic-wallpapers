import { buildYearSvg, errorResponse, parseDimensions, parseTheme, pngResponse, svgToPng } from "@/lib/wallpaper";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dims = parseDimensions(searchParams);
  if ("error" in dims) return errorResponse(dims.error);

  const theme = parseTheme(searchParams);
  const yearParam = searchParams.get("year");
  const year = yearParam ? Number(yearParam) : undefined;
  if (year !== undefined && (!Number.isFinite(year) || year < 1970 || year > 2100)) {
    return errorResponse("year must be between 1970 and 2100");
  }

  const svg = buildYearSvg({
    width: dims.width,
    height: dims.height,
    theme,
    year,
  });
  const png = await svgToPng(svg);
  return pngResponse(png);
}
