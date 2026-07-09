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
    title: "Open the Shortcuts app",
    body: "Open Shortcuts, tap the Automation tab at the bottom, then tap the plus button to start a new automation.",
  },
  {
    title: "Set it to run every morning",
    body: "Pick Time of Day as the trigger, set a time like 6:00 AM, and choose Daily. Turn on Run Immediately so it applies the wallpaper without asking you first, then continue and choose New Blank Automation.",
  },
  {
    title: "Add Get Contents of URL",
    body: "Search for the Get Contents of URL action, add it, and paste your wallpaper URL from above into the URL field.",
  },
  {
    title: "Add Set Wallpaper Photo",
    body: "Add the Set Wallpaper Photo action below it. It will use the downloaded image automatically. Set the location to Lock Screen.",
  },
  {
    title: "Turn off cropping",
    body: "On the Set Wallpaper Photo action, tap the arrow to reveal its options and turn off both Crop to Subject and Show Preview. This stops iOS from zooming the image or asking you to confirm each morning. Tap Done to save.",
  },
];

const ANDROID_STEPS: Step[] = [
  {
    title: "Install MacroDroid",
    body: "Get MacroDroid from the Google Play Store. The free version is enough for this.",
  },
  {
    title: "Create a new macro",
    body: "Open MacroDroid, tap Add Macro, and give it a name you will recognize, such as Daily Wallpaper.",
  },
  {
    title: "Set a daily trigger",
    body: "Add a trigger, choose Date/Time then Day of Week / Time, set the time to 12:01 AM, and turn on every day of the week.",
  },
  {
    title: "Download the image",
    body: "Add an action, choose Connectivity then HTTP Request. Set the method to GET, paste your wallpaper URL from above, turn on Block next actions until complete, tick Save HTTP response to file, and set the folder and file name to /Download/wallpaper.png.",
  },
  {
    title: "Set the wallpaper",
    body: "Add a second action, choose Device Settings then Set Wallpaper. Pick Image, choose which screen to set, and point it at the same file, /Download/wallpaper.png.",
  },
  {
    title: "Save and test",
    body: "Save the macro. To check it works, open Macros, tap your macro, open the menu, and choose Test Macro. To pause it, toggle it off. To change the URL later, open the HTTP Request action, update the URL, and save.",
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
          {platform === "iphone" ? "Apple device" : "Android"}.
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
