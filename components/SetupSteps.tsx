"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

type SetupStepsProps = {
  wallpaperUrl: string | null;
  platform: "iphone" | "android";
};

type Step = { title: string; body: string };

const IPHONE_STEPS: Step[] = [
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

const ANDROID_STEPS: Step[] = [
  {
    title: "Prerequisites",
    body: "Install MacroDroid from the Google Play Store.",
  },
  {
    title: "Setup Macro",
    body: "Open MacroDroid and tap Add Macro. Set the trigger to Date/Time, Day/Time, set the time to 00:01:00, then activate all weekdays.",
  },
  {
    title: "Download image",
    body: "In Configure Actions, go to Web Interactions then HTTP Request. Set the method to GET, paste your wallpaper URL from above, enable Block next actions until complete, tick Save HTTP response to file, and set the folder and filename to /Download/wallpaper.png.",
  },
  {
    title: "Set wallpaper",
    body: "Add another action: Device Settings then Set Wallpaper. Choose Image and Screen, and enter the exact same folder and filename, /Download/wallpaper.png.",
  },
  {
    title: "Finalize",
    body: "Give the macro a name and tap Create Macro.",
  },
  {
    title: "Test and manage",
    body: "Test it via MacroDroid, Macros, select your macro, More options, Test macro. Toggle it off or delete it to stop. To change the URL later, tap the HTTP Request action, update the URL, and Save.",
  },
];

export function SetupSteps({ wallpaperUrl, platform }: SetupStepsProps) {
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
          Copy your URL, then set a daily automation on your{" "}
          {platform === "iphone" ? "iPhone" : "Android"}.
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

      {platform === "iphone" && (
        <div className="mt-4 rounded-xl border border-[var(--forest-mid)]/40 bg-[var(--forest-deep)]/25 px-4 py-3 text-sm leading-relaxed text-[var(--muted)]">
          <p className="font-semibold text-[var(--forest-glow)]">
            Important: turn off cropping
          </p>
          <p className="mt-1">
            When setting the lock screen, disable{" "}
            <span className="font-medium text-[var(--ink)]">Crop to Subject</span>{" "}
            and{" "}
            <span className="font-medium text-[var(--ink)]">Show Preview</span>{" "}
            (or any depth and zoom effects). They crop or blur the layout and
            break the design.
          </p>
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.ol
          key={platform}
          initial="hidden"
          animate="show"
          exit={{ opacity: 0 }}
          variants={{ show: { transition: { staggerChildren: 0.06 } } }}
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
                <p className="text-sm font-medium text-[var(--ink)]">
                  {s.title}
                </p>
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
