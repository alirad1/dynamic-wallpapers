import { parseDate } from "@/lib/dates";
import { buildGoalSvg, errorResponse, parseAccent, parseDimensions, parseTheme, pngResponse, svgToPng } from "@/lib/wallpaper";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dims = parseDimensions(searchParams);
  if ("error" in dims) return errorResponse(dims.error);

  const goal = searchParams.get("goal")?.trim();
  if (!goal) return errorResponse("goal is required");

  const goalDateRaw = searchParams.get("goal_date");
  if (!goalDateRaw) return errorResponse("goal_date is required (YYYY-MM-DD)");
  const goalDate = parseDate(goalDateRaw);
  if (!goalDate) return errorResponse("goal_date must be YYYY-MM-DD");

  const startRaw = searchParams.get("start_date");
  let startDate: Date | undefined;
  if (startRaw) {
    const parsed = parseDate(startRaw);
    if (!parsed) return errorResponse("start_date must be YYYY-MM-DD");
    startDate = parsed;
  }

  const theme = parseTheme(searchParams);
  const svg = buildGoalSvg({
    width: dims.width,
    height: dims.height,
    goal,
    goalDate,
    startDate,
    theme,
    accent: parseAccent(searchParams),
  });
  const png = await svgToPng(svg);
  return pngResponse(png);
}
