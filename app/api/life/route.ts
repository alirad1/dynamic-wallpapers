import { parseDate } from "@/lib/dates";
import { buildLifeSvg, errorResponse, parseAccent, parseDimensions, parseTheme, pngResponse, svgToPng } from "@/lib/wallpaper";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dims = parseDimensions(searchParams);
  if ("error" in dims) return errorResponse(dims.error);

  const dobRaw = searchParams.get("dob");
  if (!dobRaw) return errorResponse("dob is required (YYYY-MM-DD)");
  const dob = parseDate(dobRaw);
  if (!dob) return errorResponse("dob must be YYYY-MM-DD");

  const theme = parseTheme(searchParams);
  try {
    const svg = buildLifeSvg({
      width: dims.width,
      height: dims.height,
      dob,
      theme,
      accent: parseAccent(searchParams),
    });
    const png = await svgToPng(svg);
    return pngResponse(png);
  } catch (err) {
    console.error("life wallpaper error:", err);
    return errorResponse("Failed to render wallpaper", 500);
  }
}
