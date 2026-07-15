import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/site";

export const alt = `${SITE_NAME} — daily-updating lock screen wallpapers`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "edge";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#0F1410",
          color: "#e9efeb",
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 700, marginBottom: 24 }}>
          {SITE_NAME}
        </div>
        <div style={{ fontSize: 32, color: "#8a9a90", lineHeight: 1.4 }}>
          Custom iPhone and Android lock screen wallpapers that update every
          morning
        </div>
        <div style={{ fontSize: 24, color: "#74c69d", marginTop: 40 }}>
          Free · No account · No app
        </div>
      </div>
    ),
    { ...size },
  );
}
