import { existsSync, readFileSync } from "fs";
import { join } from "path";
import * as opentype from "opentype.js";
import type { SvgTextOptions } from "./svg-label";

let regularFont: opentype.Font | null = null;
let boldFont: opentype.Font | null = null;

const TEXT_RE =
  /<text x="([\d.]+)" y="([\d.]+)" text-anchor="([^"]+)" font-family="[^"]*" font-size="(\d+)" font-weight="(\d+)" fill="([^"]+)">([^<]*)<\/text>/g;

function resolveFontsDir(): string {
  const candidates = [
    join(process.cwd(), "lib/wallpaper/fonts"),
    join(process.cwd(), ".next/server/lib/wallpaper/fonts"),
  ];
  for (const dir of candidates) {
    if (existsSync(join(dir, "DejaVuSans.ttf"))) return dir;
  }
  return candidates[0];
}

function loadFonts(): { regular: opentype.Font; bold: opentype.Font } {
  if (regularFont && boldFont) {
    return { regular: regularFont, bold: boldFont };
  }
  const dir = resolveFontsDir();
  regularFont = opentype.parse(
    readFileSync(join(dir, "DejaVuSans.ttf")),
  ) as opentype.Font;
  boldFont = opentype.parse(
    readFileSync(join(dir, "DejaVuSans-Bold.ttf")),
  ) as opentype.Font;
  return { regular: regularFont, bold: boldFont };
}

function svgTextPath(opts: SvgTextOptions): string {
  const { regular, bold } = loadFonts();
  const font = opts.bold ? bold : regular;
  const anchor = opts.anchor ?? "middle";
  const advance = font.getAdvanceWidth(opts.text, opts.fontSize);
  let x = opts.x;
  if (anchor === "middle") x -= advance / 2;
  else if (anchor === "end") x -= advance;
  const path = font.getPath(opts.text, x, opts.y, opts.fontSize);
  return `<path d="${path.toPathData(2)}" fill="${opts.fill}"/>`;
}

function decodeXml(text: string): string {
  return text
    .replace(/&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&gt;/g, ">")
    .replace(/&lt;/g, "<")
    .replace(/&amp;/g, "&");
}

/** Convert SVG text nodes to path outlines for sharp / librsvg PNG output. */
export function rasterizeWallpaperSvg(svg: string): string {
  return svg.replace(
    TEXT_RE,
    (
      _match,
      x,
      y,
      anchor,
      fontSize,
      fontWeight,
      fill,
      rawText,
    ) => {
      const text = decodeXml(rawText);
      return svgTextPath({
        x: Number(x),
        y: Number(y),
        text,
        fontSize: Number(fontSize),
        fill,
        bold: Number(fontWeight) >= 600,
        anchor: anchor as SvgTextOptions["anchor"],
      });
    },
  );
}
