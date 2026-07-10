"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { buildWallpaperSvg, type WallpaperSpec } from "@/lib/wallpaper/build";
import { svgToDataUri } from "@/lib/wallpaper/svg-utils";

type PreviewProps = {
  spec: WallpaperSpec;
};

function formatClock(d: Date): { time: string; date: string } {
  let hours = d.getHours() % 12;
  if (hours === 0) hours = 12;
  const minutes = String(d.getMinutes()).padStart(2, "0");
  const time = `${hours}:${minutes}`;
  const date = d.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  return { time, date };
}

export function Preview({ spec }: PreviewProps) {
  const svg = useMemo(() => buildWallpaperSvg(spec), [spec]);
  const dataUri = useMemo(() => (svg ? svgToDataUri(svg) : null), [svg]);

  const [clock, setClock] = useState<{ time: string; date: string } | null>(
    null,
  );

  useEffect(() => {
    const update = () => setClock(formatClock(new Date()));
    update();
    const id = window.setInterval(update, 10000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col items-center gap-4">
      <motion.div
        initial={{ opacity: 0, y: 20, rotateX: 8 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
        style={{ perspective: 1000 }}
      >
        <div className="relative w-[230px] overflow-hidden rounded-[2.6rem] border border-[var(--border-strong)] bg-black p-[6px] shadow-[0_30px_80px_-30px_rgba(82,183,136,0.5)]">
          <div
            className="relative overflow-hidden rounded-[2.1rem] bg-black"
            style={{ aspectRatio: `${spec.width} / ${spec.height}` }}
          >
            <div className="pointer-events-none absolute left-1/2 top-[9px] z-20 h-[20px] w-[74px] -translate-x-1/2 rounded-full bg-black" />

            <AnimatePresence mode="wait">
              {dataUri ? (
                <motion.img
                  key={dataUri}
                  src={dataUri}
                  alt="Wallpaper preview"
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="h-full w-full object-cover"
                />
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex h-full w-full items-center justify-center px-8 text-center text-[13px] text-[var(--muted)]"
                >
                  Fill in the fields to preview today&apos;s wallpaper.
                </motion.div>
              )}
            </AnimatePresence>

            {clock && (
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-[8%] z-10 flex flex-col items-center"
                style={
                  spec.theme === "light"
                    ? { color: "#111827", textShadow: "0 1px 6px rgba(255,255,255,0.55)" }
                    : { color: "#ffffff", textShadow: "0 1px 8px rgba(0,0,0,0.35)" }
                }
              >
                <span
                  className="font-medium"
                  style={{ fontSize: 11, letterSpacing: 0.2 }}
                >
                  {clock.date}
                </span>
                <span
                  className="font-semibold tracking-tight"
                  style={{ fontSize: 52, lineHeight: 1.05 }}
                >
                  {clock.time}
                </span>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      <p className="text-xs text-[var(--faint)]">
        {spec.width} x {spec.height} px, live preview
      </p>
    </div>
  );
}
