import { escapeXml } from "./theme";

export type SvgTextOptions = {
  x: number;
  y: number;
  text: string;
  fontSize: number;
  fill: string;
  bold?: boolean;
  anchor?: "middle" | "start" | "end";
};

/** SVG text for browser preview (system / DejaVu in SVG viewers). */
export function svgText(opts: SvgTextOptions): string {
  const anchor = opts.anchor ?? "middle";
  const weight = opts.bold ? 700 : 400;
  return `<text x="${opts.x}" y="${opts.y}" text-anchor="${anchor}" font-family="DejaVu Sans, sans-serif" font-size="${opts.fontSize}" font-weight="${weight}" fill="${opts.fill}">${escapeXml(opts.text)}</text>`;
}
