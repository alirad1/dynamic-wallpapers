"use client";

import { useMemo } from "react";
import {
  buildWallpaperSvg,
  type WallpaperSpec,
  type WallpaperType,
} from "@/lib/wallpaper/build";

const SAMPLE_WIDTH = 390;
const SAMPLE_HEIGHT = 844;

const TYPES: WallpaperType[] = ["year", "life", "goal", "progress"];

const TYPE_LABELS: Record<WallpaperType, string> = {
  year: "Year",
  life: "Life",
  goal: "Goal",
  progress: "Progress",
};

function sampleSpec(type: WallpaperType): WallpaperSpec {
  const base: WallpaperSpec = {
    type,
    width: SAMPLE_WIDTH,
    height: SAMPLE_HEIGHT,
    theme: "dark",
    color: "green",
  };
  if (type === "life") return { ...base, dob: "2000-01-01" };
  if (type === "goal") {
    return {
      ...base,
      goal: "Launch day",
      goalDate: "2026-09-01",
      goalStart: "2026-01-01",
    };
  }
  if (type === "progress") {
    return {
      ...base,
      label: "This year",
      start: "2026-01-01",
      end: "2026-12-31",
    };
  }
  return base;
}

function TypeThumb({ type }: { type: WallpaperType }) {
  const dataUri = useMemo(() => {
    const svg = buildWallpaperSvg(sampleSpec(type));
    return svg
      ? `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
      : null;
  }, [type]);

  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className="w-full overflow-hidden rounded-xl border border-[var(--border)] bg-black shadow-sm"
        style={{ aspectRatio: `${SAMPLE_WIDTH} / ${SAMPLE_HEIGHT}` }}
      >
        {dataUri ? (
          <img
            src={dataUri}
            alt={`${TYPE_LABELS[type]} wallpaper example`}
            className="h-full w-full object-cover"
          />
        ) : null}
      </div>
      <span className="text-[10px] font-medium text-[var(--faint)]">
        {TYPE_LABELS[type]}
      </span>
    </div>
  );
}

export function TypePreviewGrid() {
  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-xs text-[var(--faint)]">What each style looks like</p>
      <div className="grid w-full max-w-[220px] grid-cols-2 gap-2.5">
        {TYPES.map((type) => (
          <TypeThumb key={type} type={type} />
        ))}
      </div>
    </div>
  );
}
