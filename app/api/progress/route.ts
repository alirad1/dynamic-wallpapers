import { parseDate } from "@/lib/dates";
import { buildProgressSvg, errorResponse, parseAccent, parseDimensions, parseTheme, pngResponse, svgToPng } from "@/lib/wallpaper";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dims = parseDimensions(searchParams);
  if ("error" in dims) return errorResponse(dims.error);

  const label = searchParams.get("label")?.trim();
  if (!label) return errorResponse("label is required");

  const startRaw = searchParams.get("start_date");
  const endRaw = searchParams.get("end_date");
  if (!startRaw || !endRaw) {
    return errorResponse("start_date and end_date are required (YYYY-MM-DD)");
  }
  const startDate = parseDate(startRaw);
  const endDate = parseDate(endRaw);
  if (!startDate) return errorResponse("start_date must be YYYY-MM-DD");
  if (!endDate) return errorResponse("end_date must be YYYY-MM-DD");
  if (endDate.getTime() < startDate.getTime()) {
    return errorResponse("end_date must be on or after start_date");
  }

  const theme = parseTheme(searchParams);
  try {
    const svg = buildProgressSvg({
      width: dims.width,
      height: dims.height,
      label,
      startDate,
      endDate,
      theme,
      accent: parseAccent(searchParams),
    });
    const png = await svgToPng(svg);
    return pngResponse(png);
  } catch (err) {
    console.error("progress wallpaper error:", err);
    return errorResponse("Failed to render wallpaper", 500);
  }
}
