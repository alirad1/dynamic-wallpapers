import { Buffer } from "buffer";
import * as opentype from "opentype.js";
import { DEJAVU_SANS_B64, DEJAVU_SANS_BOLD_B64 } from "./font-data";
import type { SvgTextOptions } from "./svg-label";

let regularFont: opentype.Font | null = null;
let boldFont: opentype.Font | null = null;

const TEXT_RE =
  /<text x="([\d.]+)" y="([\d.]+)" text-anchor="([^"]+)" font-family="[^"]*" font-size="(\d+)" font-weight="(\d+)" fill="([^"]+)">([^<]*)<\/text>/g;

function loadFonts(): { regular: opentype.Font; bold: opentype.Font } {
  if (regularFont && boldFont) {
    return { regular: regularFont, bold: boldFont };
  }
  regularFont = opentype.parse(
    Buffer.from(DEJAVU_SANS_B64, "base64"),
  ) as opentype.Font;
  boldFont = opentype.parse(
    Buffer.from(DEJAVU_SANS_BOLD_B64, "base64"),
  ) as opentype.Font;
  return { regular: regularFont, bold: boldFont };
}

function sanitizeText(text: string): string {
  return text.replace(/[^\x20-\x7E]/g, (ch) => {
    if (ch === "→") return " to ";
    if (ch === "·") return ", ";
    if (ch === "—" || ch === "–") return "-";
    return "";
  });
}

function svgTextPath(opts: SvgTextOptions): string {
  const { regular, bold } = loadFonts();
  const font = opts.bold ? bold : regular;
  const anchor = opts.anchor ?? "middle";
  const text = sanitizeText(opts.text);
  const scale = opts.fontSize / font.unitsPerEm;

  const glyphs = [...text].map((char) => font.charToGlyph(char));
  const totalAdvance = glyphs.reduce(
    (sum, glyph) => sum + (glyph.advanceWidth ?? 0) * scale,
    0,
  );

  let x = opts.x;
  if (anchor === "middle") x -= totalAdvance / 2;
  else if (anchor === "end") x -= totalAdvance;

  const path = new opentype.Path();
  let cursor = x;
  for (const glyph of glyphs) {
    path.extend(glyph.getPath(cursor, opts.y, opts.fontSize));
    cursor += (glyph.advanceWidth ?? 0) * scale;
  }
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
