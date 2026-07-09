import sharp from "sharp";

export async function svgToPng(svg: string): Promise<Buffer> {
  return sharp(Buffer.from(svg)).png().toBuffer();
}

export function pngResponse(buffer: Buffer, cacheSeconds = 3600): Response {
  return new Response(new Uint8Array(buffer), {
    status: 200,
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": `public, s-maxage=${cacheSeconds}, stale-while-revalidate=86400`,
    },
  });
}

export function errorResponse(message: string, status = 400): Response {
  return Response.json({ error: message }, { status });
}

export function parseDimensions(
  searchParams: URLSearchParams,
  defaults = { width: 1179, height: 2556 },
): { width: number; height: number } | { error: string } {
  const widthRaw = searchParams.get("width");
  const heightRaw = searchParams.get("height");
  const width = widthRaw ? Number(widthRaw) : defaults.width;
  const height = heightRaw ? Number(heightRaw) : defaults.height;
  if (!Number.isFinite(width) || !Number.isFinite(height)) {
    return { error: "width and height must be numbers" };
  }
  if (width < 200 || height < 200 || width > 4000 || height > 5000) {
    return { error: "width/height out of range (200–4000 × 200–5000)" };
  }
  return { width: Math.round(width), height: Math.round(height) };
}

export function parseTheme(
  searchParams: URLSearchParams,
): "light" | "dark" {
  return searchParams.get("theme") === "dark" ? "dark" : "light";
}
