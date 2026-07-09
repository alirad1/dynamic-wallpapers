import { parseDate } from "@/lib/dates";
import { buildLifeSvg, errorResponse, parseDimensions, parseTheme, pngResponse, svgToPng } from "@/lib/wallpaper";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dims = parseDimensions(searchParams);
  if ("error" in dims) return errorResponse(dims.error);

  const dobRaw = searchParams.get("dob");
  if (!dobRaw) return errorResponse("dob is required (YYYY-MM-DD)");
  const dob = parseDate(dobRaw);
  if (!dob) return errorResponse("dob must be YYYY-MM-DD");

  const lifespanRaw = searchParams.get("lifespan");
  const lifespan = lifespanRaw ? Number(lifespanRaw) : 90;
  if (!Number.isFinite(lifespan) || lifespan < 1 || lifespan > 120) {
    return errorResponse("lifespan must be between 1 and 120");
  }

  const theme = parseTheme(searchParams);
  const svg = buildLifeSvg({
    width: dims.width,
    height: dims.height,
    dob,
    lifespan,
    theme,
  });
  const png = await svgToPng(svg);
  return pngResponse(png);
}
