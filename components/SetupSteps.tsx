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

const FILE_PATH = "/Download/wallpaper.png";

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
        <motion.div
          key={platform}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="mt-5"
        >
          {platform === "iphone" ? <IphoneGuide /> : <AndroidGuide />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function IphoneGuide() {
  return (
    <div>
      <Callout title="Important: turn off cropping">
        When setting the lock screen, disable{" "}
        <B>Crop to Subject</B> and <B>Show Preview</B> (or any depth and zoom
        effects). They crop or blur the layout and break the design.
      </Callout>

      <ol className="mt-4 space-y-3">
        {IPHONE_STEPS.map((s, i) => (
          <li key={s.title} className="flex gap-3">
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--forest-mid)] bg-[var(--forest-deep)] text-xs font-semibold text-[var(--forest-glow)]">
              {i + 1}
            </span>
            <div className="pt-0.5">
              <p className="text-sm font-medium text-[var(--ink)]">{s.title}</p>
              <p className="mt-0.5 text-sm leading-relaxed text-[var(--muted)]">
                {s.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function AndroidGuide() {
  return (
    <div className="space-y-5">
      <Section badge="1" title="Prerequisites">
        <p>
          Install <B>MacroDroid</B> from the Google Play Store.
        </p>
      </Section>

      <Section badge="2" title="Setup Macro">
        <p>
          Open <B>MacroDroid</B> and tap <B>Add Macro</B>.
        </p>
        <p className="mt-2">
          <B>Trigger:</B> Date/Time to Day/Time, set the time to{" "}
          <B>00:01:00</B>, then activate <B>all weekdays</B>.
        </p>
      </Section>

      <Section badge="3" title="Configure Actions">
        <div>
          <p className="text-sm font-medium text-[var(--ink)]">
            3.1 Download Image
          </p>
          <ul className="mt-2 space-y-1.5">
            <Bullet>
              Go to <B>Web Interactions</B> then <B>HTTP Request</B>
            </Bullet>
            <Bullet>
              Request method: <B>GET</B>
            </Bullet>
            <Bullet>Paste the URL you copied above</Bullet>
            <Bullet>
              Enable: <B>Block next actions until complete</B>
            </Bullet>
            <Bullet>
              Response: tick <B>Save HTTP response to file</B>
            </Bullet>
            <Bullet>
              Folder and filename: <Mono>{FILE_PATH}</Mono>
            </Bullet>
          </ul>
        </div>

        <div className="mt-4">
          <p className="text-sm font-medium text-[var(--ink)]">
            3.2 Set Wallpaper
          </p>
          <ul className="mt-2 space-y-1.5">
            <Bullet>
              Go to <B>Device Settings</B> then <B>Set Wallpaper</B>
            </Bullet>
            <Bullet>
              Choose <B>Image</B> and <B>Screen</B>
            </Bullet>
            <Bullet>
              Enter folder and filename: <Mono>{FILE_PATH}</Mono>
            </Bullet>
          </ul>
        </div>

        <div className="mt-4">
          <Callout title="Important">
            Use the <B>exact same folder and filename</B> in both actions.
          </Callout>
        </div>
      </Section>

      <Section badge="4" title="Finalize">
        <p>
          Give the macro a name and tap <B>Create Macro</B>.
        </p>
      </Section>

      <Section badge="?" title="Testing and Managing">
        <p>
          <B>Test:</B> MacroDroid to Macros, select your macro, More options,
          then <B>Test macro</B>.
        </p>
        <p className="mt-2">
          <B>Stop:</B> toggle off or delete the macro.
        </p>
        <p className="mt-2">
          <B>Edit URL:</B> tap the HTTP Request action, update the URL, then
          Save.
        </p>
      </Section>
    </div>
  );
}

function Section({
  badge,
  title,
  children,
}: {
  badge: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-2.5 flex items-center gap-3">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-[var(--forest-mid)] bg-[var(--forest-deep)] text-xs font-semibold text-[var(--forest-glow)]">
          {badge}
        </span>
        <h3 className="text-base font-semibold text-[var(--ink)]">{title}</h3>
      </div>
      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-4 py-3 text-sm leading-relaxed text-[var(--muted)]">
        {children}
      </div>
    </div>
  );
}

function Callout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-[var(--forest-mid)]/40 bg-[var(--forest-deep)]/25 px-4 py-3 text-sm leading-relaxed text-[var(--muted)]">
      <p className="font-semibold text-[var(--forest-glow)]">{title}</p>
      <p className="mt-1">{children}</p>
    </div>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2">
      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[var(--forest-mid)]" />
      <span>{children}</span>
    </li>
  );
}

function B({ children }: { children: React.ReactNode }) {
  return <span className="font-medium text-[var(--ink)]">{children}</span>;
}

function Mono({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded bg-[var(--surface)] px-1.5 py-0.5 font-mono text-xs text-[var(--forest-glow)]">
      {children}
    </span>
  );
}
