"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo } from "react";
import { buildWallpaperSvg, type WallpaperSpec } from "@/lib/wallpaper/build";

type PreviewProps = {
  spec: WallpaperSpec;
};

export function Preview({ spec }: PreviewProps) {
  const svg = useMemo(() => buildWallpaperSvg(spec), [spec]);
  const dataUri = useMemo(
    () =>
      svg
        ? `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
        : null,
    [svg],
  );

  return (
    <div className="flex flex-col items-center gap-4">
      <motion.div
        initial={{ opacity: 0, y: 20, rotateX: 8 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative"
        style={{ perspective: 1000 }}
      >
        <div
          className="relative w-[230px] overflow-hidden rounded-[2.6rem] border border-[var(--border-strong)] bg-black p-[6px] shadow-[0_30px_80px_-30px_rgba(82,183,136,0.5)]"
        >
          <div
            className="relative overflow-hidden rounded-[2.1rem] bg-black"
            style={{ aspectRatio: `${spec.width} / ${spec.height}` }}
          >
            <div className="pointer-events-none absolute left-1/2 top-2 z-10 h-[22px] w-[86px] -translate-x-1/2 rounded-full bg-black/85" />

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

            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-[15%] text-center font-medium tracking-tight text-white/85"
              style={{ fontSize: 34 }}
            >
              9:41
            </div>
          </div>
        </div>
      </motion.div>

      <p className="text-xs text-[var(--faint)]">
        {spec.width} x {spec.height} px, live preview
      </p>
    </div>
  );
}
