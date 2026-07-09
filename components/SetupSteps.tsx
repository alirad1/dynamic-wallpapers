"use client";

import { useState } from "react";

type SetupStepsProps = {
  wallpaperUrl: string | null;
};

export function SetupSteps({ wallpaperUrl }: SetupStepsProps) {
  const [platform, setPlatform] = useState<"iphone" | "android">("iphone");
  const [copied, setCopied] = useState(false);

  async function copyUrl() {
    if (!wallpaperUrl) return;
    try {
      await navigator.clipboard.writeText(wallpaperUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl tracking-tight text-[var(--forest)]">
            Install
          </h2>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Copy your URL, then set a daily automation on your phone.
          </p>
        </div>
        <div className="inline-flex rounded-lg border border-[var(--border)] bg-[var(--surface)] p-1">
          <button
            type="button"
            onClick={() => setPlatform("iphone")}
            className={`rounded-md px-3 py-1.5 text-sm transition ${
              platform === "iphone"
                ? "bg-[var(--forest)] text-white"
                : "text-[var(--muted)] hover:text-[var(--ink)]"
            }`}
          >
            iPhone
          </button>
          <button
            type="button"
            onClick={() => setPlatform("android")}
            className={`rounded-md px-3 py-1.5 text-sm transition ${
              platform === "android"
                ? "bg-[var(--forest)] text-white"
                : "text-[var(--muted)] hover:text-[var(--ink)]"
            }`}
          >
            Android
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
        <div className="min-w-0 flex-1 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5">
          <p className="truncate font-mono text-xs text-[var(--ink)] sm:text-sm">
            {wallpaperUrl ?? "Configure options above to generate a URL"}
          </p>
        </div>
        <button
          type="button"
          onClick={copyUrl}
          disabled={!wallpaperUrl}
          className="shrink-0 rounded-lg bg-[var(--forest)] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[var(--forest-mid)] disabled:cursor-not-allowed disabled:opacity-40"
        >
          {copied ? "Copied" : "Copy URL"}
        </button>
      </div>

      <div
        role="note"
        className="rounded-lg border border-[var(--forest-mid)]/30 bg-[var(--forest)]/[0.06] px-4 py-3 text-sm text-[var(--ink)]"
      >
        <p className="font-medium text-[var(--forest)]">Critical wallpaper options</p>
        <p className="mt-1 text-[var(--muted)]">
          When setting the lock screen image, turn off{" "}
          <span className="font-medium text-[var(--ink)]">Crop to Subject</span> and{" "}
          <span className="font-medium text-[var(--ink)]">Show Preview</span> (or
          equivalent depth / subject effects). Those options crop or blur the
          calendar and break the layout.
        </p>
      </div>

      {platform === "iphone" ? <IphoneSteps /> : <AndroidSteps />}
    </section>
  );
}

function IphoneSteps() {
  const steps = [
    "Open the Shortcuts app and create a new Automation → Time of Day (e.g. 12:01 AM daily).",
    "Add Get Contents of URL and paste your Dynamic Wallpapers URL.",
    "Add Save to Photo Album (or Get Images from Input → Set Wallpaper if available on your iOS version).",
    "Add Set Wallpaper → Lock Screen. Choose your saved image.",
    "Disable Crop to Subject and Show Preview / depth effects so the full image is used.",
    "Allow the automation to run without asking when prompted.",
  ];

  return (
    <ol className="space-y-3">
      {steps.map((step, i) => (
        <li key={step} className="flex gap-3 text-sm leading-relaxed text-[var(--ink)]">
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--forest)] text-xs font-semibold text-white">
            {i + 1}
          </span>
          <span className="pt-0.5 text-[var(--muted)] [&_strong]:text-[var(--ink)]">
            {step}
          </span>
        </li>
      ))}
    </ol>
  );
}

function AndroidSteps() {
  const steps = [
    "Install MacroDroid (or a similar automation app that can download an image and set wallpaper).",
    "Create a macro with a Day/Time trigger (daily, early morning).",
    "Add an action to HTTP Request / Download file using your Dynamic Wallpapers URL.",
    "Add Set Wallpaper → Lock screen, pointing at the downloaded PNG.",
    "Disable any crop-to-subject, blur, or parallax options so the full image shows.",
    "Test once, then leave the macro enabled so it refreshes every day.",
  ];

  return (
    <ol className="space-y-3">
      {steps.map((step, i) => (
        <li key={step} className="flex gap-3 text-sm leading-relaxed">
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--forest)] text-xs font-semibold text-white">
            {i + 1}
          </span>
          <span className="pt-0.5 text-[var(--muted)]">{step}</span>
        </li>
      ))}
    </ol>
  );
}
