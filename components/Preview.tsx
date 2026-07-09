"use client";

type PreviewProps = {
  url: string | null;
  width: number;
  height: number;
};

export function Preview({ url, width, height }: PreviewProps) {
  const aspect = height / width;

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="relative w-full max-w-[280px] overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] shadow-[0_20px_50px_-28px_rgba(27,67,50,0.45)]"
        style={{ aspectRatio: `${width} / ${height}` }}
      >
        {url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={url}
            src={url}
            alt="Wallpaper preview"
            className="h-full w-full object-cover"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center px-6 text-center text-sm text-[var(--muted)]"
            style={{ minHeight: `${Math.min(420, 180 * aspect)}px` }}
          >
            Fill in the fields to preview today&apos;s wallpaper.
          </div>
        )}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-[14%] text-center text-[11px] font-medium tracking-wide text-black/25"
        >
          9:41
        </div>
      </div>
      <p className="text-xs text-[var(--muted)]">
        {width} × {height} · lock-screen safe layout
      </p>
    </div>
  );
}
