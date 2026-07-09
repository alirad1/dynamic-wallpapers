"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

type SetupStepsProps = {
  wallpaperUrl: string | null;
};

const IPHONE_STEPS: { title: string; body: string }[] = [
  {
    title: "Open Shortcuts",
    body: "In the Shortcuts app, go to the Automation tab and tap New Automation.",
  },
  {
    title: "Create a daily trigger",
    body: "Choose Time of Day, set 6:00 AM, Repeat Daily, then select Run Immediately and Create New Shortcut.",
  },
  {
    title: "Get Contents of URL",
    body: "Add the Get Contents of URL action and paste your wallpaper URL from above.",
  },
  {
    title: "Set Wallpaper Photo",
    body: "Add Set Wallpaper Photo and choose Lock Screen.",
  },
  {
    title: "Turn off cropping",
    body: "Tap the arrow to show options, then disable both Crop to Subject and Show Preview so iOS stops cropping and asking for confirmation.",
  },
];

const ANDROID_STEPS: { title: string; body: string }[] = [
  {
    title: "Install MacroDroid",
    body: "Grab MacroDroid from the Play Store (or any automation app that can download an image and set the wallpaper).",
  },
  {
    title: "Add a daily trigger",
    body: "Create a new Macro with a Day/Time trigger set to run once a day, for example 6:00 AM.",
  },
  {
    title: "Download the wallpaper",
    body: "Add an HTTP Request (GET) action using your wallpaper URL and save the response as an image file.",
  },
  {
    title: "Set the wallpaper",
    body: "Add a Set Wallpaper action pointing at the downloaded image and choose the lock screen.",
  },
  {
    title: "Turn off cropping",
    body: "Disable any crop, zoom, or preview options so the full image is used, then save and enable the macro.",
  },
];

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

  const steps = platform === "iphone" ? IPHONE_STEPS : ANDROID_STEPS;

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-display text-2xl tracking-tight text-[var(--ink)]">
          Put it on your phone
        </h2>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Copy your URL, then set a daily automation.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
        <div className="min-w-0 flex-1 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-3.5 py-3">
          <p className="truncate font-mono text-xs text-[var(--forest-glow)] sm:text-sm">
            {wallpaperUrl ?? "Finish the earlier steps to generate a URL"}
          </p>
        </div>
        <motion.button
          type="button"
          onClick={copyUrl}
          disabled={!wallpaperUrl}
          whileTap={{ scale: 0.96 }}
          className="shrink-0 rounded-xl bg-[var(--forest)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--forest-mid)] disabled:cursor-not-allowed disabled:opacity-40"
        >
          {copied ? "Copied" : "Copy URL"}
        </motion.button>
      </div>

      <div className="mt-4 rounded-xl border border-[var(--forest-mid)]/40 bg-[var(--forest-deep)]/25 px-4 py-3 text-sm">
        <p className="font-semibold text-[var(--forest-glow)]">
          Important: turn off cropping
        </p>
        <p className="mt-1 text-[var(--muted)]">
          When setting the lock screen, disable{" "}
          <span className="font-medium text-[var(--ink)]">Crop to Subject</span>{" "}
          and <span className="font-medium text-[var(--ink)]">Show Preview</span>{" "}
          (or any depth and zoom effects). They crop or blur the layout and break
          the design.
        </p>
      </div>

      <div className="mt-6 inline-flex rounded-xl border border-[var(--border)] bg-[var(--surface-2)] p-1">
        {(["iphone", "android"] as const).map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setPlatform(p)}
            className={`rounded-lg px-4 py-1.5 text-sm transition ${
              platform === p
                ? "bg-[var(--forest)] text-white"
                : "text-[var(--muted)] hover:text-[var(--ink)]"
            }`}
          >
            {p === "iphone" ? "iPhone" : "Android"}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.ol
          key={platform}
          initial="hidden"
          animate="show"
          exit={{ opacity: 0 }}
          variants={{ show: { transition: { staggerChildren: 0.07 } } }}
          className="mt-5 space-y-3"
        >
          {steps.map((s, i) => (
            <motion.li
              key={s.title}
              variants={{
                hidden: { opacity: 0, x: -12 },
                show: { opacity: 1, x: 0 },
              }}
              className="flex gap-3"
            >
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--forest-mid)] bg-[var(--forest-deep)] text-xs font-semibold text-[var(--forest-glow)]">
                {i + 1}
              </span>
              <div className="pt-0.5">
                <p className="text-sm font-medium text-[var(--ink)]">{s.title}</p>
                <p className="mt-0.5 text-sm leading-relaxed text-[var(--muted)]">
                  {s.body}
                </p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </AnimatePresence>
    </div>
  );
}
