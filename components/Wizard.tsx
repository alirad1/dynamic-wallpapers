"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState, useSyncExternalStore } from "react";
import {
  ANDROID_DEVICES,
  DEFAULT_ANDROID,
  DEFAULT_DEVICE,
  DEFAULT_IPHONE,
  devicesForPlatform,
  IPHONE_DEVICES,
  type DevicePreset,
} from "@/lib/devices";
import { buildWallpaperPath, type WallpaperSpec, type WallpaperType } from "@/lib/wallpaper/build";
import { ACCENT_COLORS, type AccentColor } from "@/lib/wallpaper/theme";
import { Combobox } from "./Combobox";
import { Preview } from "./Preview";
import { SetupSteps } from "./SetupSteps";

const TYPES: {
  id: WallpaperType;
  label: string;
  blurb: string;
  icon: string;
}[] = [
  { id: "year", label: "Year", blurb: "Every day of the year as a grid", icon: "grid" },
  { id: "life", label: "Life", blurb: "One square for every week you live", icon: "life" },
  { id: "goal", label: "Goal", blurb: "Countdown to a date that matters", icon: "ring" },
  { id: "progress", label: "Progress", blurb: "Percent through any range", icon: "bar" },
];

const STEPS = ["Type", "Details", "Device", "Install"] as const;

function todayISO(): string {
  return isoOffset(0);
}

function plusDaysISO(days: number): string {
  return isoOffset(days);
}

function isoOffset(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function yearStartISO(): string {
  return `${new Date().getFullYear()}-01-01`;
}

function yearEndISO(): string {
  return `${new Date().getFullYear()}-12-31`;
}

export function Wizard() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);

  const [type, setType] = useState<WallpaperType>("year");
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [color, setColor] = useState<AccentColor>("green");
  const [platform, setPlatform] = useState<"iphone" | "android">("iphone");
  const [deviceId, setDeviceId] = useState(DEFAULT_DEVICE.id);
  const [customWidth, setCustomWidth] = useState(1080);
  const [customHeight, setCustomHeight] = useState(2400);

  const [dob, setDob] = useState("2000-01-01");
  const [lifespan, setLifespan] = useState(90);
  const [goal, setGoal] = useState("Ship the product");
  const [goalDate, setGoalDate] = useState(plusDaysISO(90));
  const [goalStart, setGoalStart] = useState(todayISO());
  const [progressLabel, setProgressLabel] = useState("This year");
  const [progressStart, setProgressStart] = useState(yearStartISO());
  const [progressEnd, setProgressEnd] = useState(yearEndISO());
  const origin = useSyncExternalStore(
    () => () => {},
    () => window.location.origin,
    () => "",
  );

  const device: DevicePreset =
    [...IPHONE_DEVICES, ...ANDROID_DEVICES].find((d) => d.id === deviceId) ??
    DEFAULT_DEVICE;

  const width = device.platform === "custom" ? customWidth : device.width;
  const height = device.platform === "custom" ? customHeight : device.height;

  const spec: WallpaperSpec = useMemo(
    () => ({
      type,
      width,
      height,
      theme,
      color,
      dob,
      lifespan,
      goal,
      goalDate,
      goalStart,
      label: progressLabel,
      start: progressStart,
      end: progressEnd,
    }),
    [
      type,
      width,
      height,
      theme,
      color,
      dob,
      lifespan,
      goal,
      goalDate,
      goalStart,
      progressLabel,
      progressStart,
      progressEnd,
    ],
  );

  const path = useMemo(() => buildWallpaperPath(spec), [spec]);
  const wallpaperUrl = path && origin ? `${origin}${path}` : null;

  const canProceed = useMemo(() => {
    if (step === 1) {
      if (type === "life") return Boolean(dob);
      if (type === "goal") return Boolean(goal.trim() && goalDate);
      if (type === "progress")
        return Boolean(progressLabel.trim() && progressStart && progressEnd);
      return true;
    }
    if (step === 2 && device.platform === "custom") {
      return (
        customWidth >= 200 &&
        customWidth <= 4000 &&
        customHeight >= 200 &&
        customHeight <= 5000
      );
    }
    return true;
  }, [
    step,
    type,
    dob,
    goal,
    goalDate,
    progressLabel,
    progressStart,
    progressEnd,
    device.platform,
    customWidth,
    customHeight,
  ]);

  function go(next: number) {
    setDirection(next > step ? 1 : -1);
    setStep(Math.max(0, Math.min(STEPS.length, next)));
  }

  function selectPlatform(p: "iphone" | "android") {
    if (p === platform) return;
    setPlatform(p);
    setDeviceId(p === "iphone" ? DEFAULT_IPHONE.id : DEFAULT_ANDROID.id);
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-5 pb-28 pt-14 sm:px-8 sm:pt-20">
      <motion.header
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mb-12 text-center"
      >
        <h1 className="font-display text-5xl tracking-tight sm:text-6xl md:text-7xl">
          <span className="text-shimmer">Dynamic Wallpapers</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
          Lock screen wallpapers that quietly track your year, your life, a goal,
          or any progress. Set it once, and it refreshes every morning.
        </p>
      </motion.header>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl border border-[var(--border)] bg-[var(--surface)]/80 p-6 backdrop-blur-sm sm:p-8"
        >
          <Stepper step={step} onJump={(s) => s < step && go(s)} />

          <div className="relative mt-8 min-h-[320px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={{
                  enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
                  center: { opacity: 1, x: 0 },
                  exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -40 : 40 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              >
                {step === 0 && <StepType type={type} onPick={setType} />}

                {step === 1 && (
                  <StepDetails
                    type={type}
                    theme={theme}
                    setTheme={setTheme}
                    color={color}
                    setColor={setColor}
                    dob={dob}
                    setDob={setDob}
                    lifespan={lifespan}
                    setLifespan={setLifespan}
                    goal={goal}
                    setGoal={setGoal}
                    goalDate={goalDate}
                    setGoalDate={setGoalDate}
                    goalStart={goalStart}
                    setGoalStart={setGoalStart}
                    progressLabel={progressLabel}
                    setProgressLabel={setProgressLabel}
                    progressStart={progressStart}
                    setProgressStart={setProgressStart}
                    progressEnd={progressEnd}
                    setProgressEnd={setProgressEnd}
                  />
                )}

                {step === 2 && (
                  <StepDevice
                    platform={platform}
                    onPlatform={selectPlatform}
                    deviceId={deviceId}
                    setDeviceId={setDeviceId}
                    device={device}
                    customWidth={customWidth}
                    setCustomWidth={setCustomWidth}
                    customHeight={customHeight}
                    setCustomHeight={setCustomHeight}
                  />
                )}

                {step === 3 && (
                  <SetupSteps wallpaperUrl={wallpaperUrl} platform={platform} />
                )}

                {step === 4 && <StepDone />}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => go(step - 1)}
              disabled={step === 0}
              className="rounded-xl px-4 py-2.5 text-sm font-medium text-[var(--muted)] transition hover:text-[var(--ink)] disabled:cursor-not-allowed disabled:opacity-0"
            >
              Back
            </button>

            {step < STEPS.length - 1 && (
              <button
                type="button"
                onClick={() => go(step + 1)}
                disabled={!canProceed}
                className="glow-pulse rounded-xl bg-[var(--forest)] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--forest-mid)] disabled:cursor-not-allowed disabled:opacity-40 disabled:animate-none"
              >
                Continue
              </button>
            )}

            {step === STEPS.length - 1 && (
              <button
                type="button"
                onClick={() => go(STEPS.length)}
                className="glow-pulse rounded-xl bg-[var(--forest)] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--forest-mid)]"
              >
                You are all set!
              </button>
            )}
          </div>
        </motion.div>

        <aside className="lg:sticky lg:top-10">
          <Preview spec={spec} />
        </aside>
      </div>
    </div>
  );
}

function Stepper({
  step,
  onJump,
}: {
  step: number;
  onJump: (s: number) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-2">
      {STEPS.map((label, i) => {
        const active = i === step;
        const done = i < step;
        return (
          <div key={label} className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onJump(i)}
              disabled={i >= step}
              className={`flex items-center gap-2 whitespace-nowrap text-xs font-medium transition ${
                active
                  ? "text-[var(--forest-glow)]"
                  : done
                    ? "text-[var(--forest-mid)] hover:text-[var(--forest-glow)]"
                    : "text-[var(--faint)]"
              }`}
            >
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full border text-[11px] transition ${
                  active
                    ? "border-[var(--forest-bright)] bg-[var(--forest)] text-white"
                    : done
                      ? "border-[var(--forest-mid)] bg-[var(--forest-deep)] text-[var(--forest-glow)]"
                      : "border-[var(--border)] text-[var(--faint)]"
                }`}
              >
                {done ? "\u2713" : i + 1}
              </span>
              <span className="hidden sm:inline">{label}</span>
            </button>
            {i < STEPS.length - 1 && (
              <div className="relative h-px w-8 bg-[var(--border)] sm:w-10">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-[var(--forest-mid)]"
                  initial={false}
                  animate={{ width: done ? "100%" : "0%" }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function StepHeading({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="mb-6">
      <h2 className="font-display text-2xl tracking-tight text-[var(--ink)]">
        {title}
      </h2>
      <p className="mt-1 text-sm text-[var(--muted)]">{sub}</p>
    </div>
  );
}

function StepDone() {
  return (
    <div className="flex flex-col items-center text-center">
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex h-16 w-16 items-center justify-center rounded-full border border-[var(--forest-bright)] bg-[var(--forest-deep)]/60 text-[var(--forest-glow)]"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8">
          <path
            d="M5 13l4 4L19 7"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>

      <h2 className="mt-6 font-display text-2xl tracking-tight text-[var(--ink)]">
        You are all set!
      </h2>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-[var(--muted)]">
        Your wallpaper will refresh on its own every morning. There is nothing
        else to do. Enjoy the little nudge each time you glance at your phone.
      </p>

      <div className="mt-7 w-full max-w-sm space-y-3 text-left">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-4 py-3.5">
          <p className="text-sm font-medium text-[var(--ink)]">
            More things I have built
          </p>
          <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">
            I make small, free tools like this one. You can find the rest at{" "}
            <a
              href="https://alirad.dev"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-[var(--forest-glow)] underline underline-offset-2 hover:text-[var(--forest-bright)]"
            >
              alirad.dev
            </a>
            .
          </p>
        </div>

        <div className="rounded-xl border border-[var(--forest-mid)]/40 bg-[var(--forest-deep)]/25 px-4 py-3.5">
          <p className="text-sm font-medium text-[var(--forest-glow)]">
            Want to chip in?
          </p>
          <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">
            This is free and always will be. If it brightens your day and you
            feel like helping me keep these projects online and updated, a small
            tip is genuinely appreciated. No pressure at all. You can{" "}
            <a
              href="https://www.paypal.com/paypalme/theradicalone"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-[var(--forest-glow)] underline underline-offset-2 hover:text-[var(--forest-bright)]"
            >
              buy me a coffee here
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

function StepType({
  type,
  onPick,
}: {
  type: WallpaperType;
  onPick: (t: WallpaperType) => void;
}) {
  return (
    <div>
      <StepHeading
        title="What do you want to track?"
        sub="Pick a style. You can change it anytime."
      />
      <motion.div
        className="grid gap-3 sm:grid-cols-2"
        initial="hidden"
        animate="show"
        variants={{
          show: { transition: { staggerChildren: 0.06 } },
        }}
      >
        {TYPES.map((t) => (
          <motion.button
            key={t.id}
            type="button"
            onClick={() => onPick(t.id)}
            variants={{
              hidden: { opacity: 0, y: 12 },
              show: { opacity: 1, y: 0 },
            }}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.98 }}
            className={`group flex items-start gap-3 rounded-2xl border p-4 text-left transition ${
              type === t.id
                ? "border-[var(--forest-bright)] bg-[var(--forest-deep)]/50"
                : "border-[var(--border)] bg-[var(--surface-2)] hover:border-[var(--border-strong)]"
            }`}
          >
            <TypeIcon name={t.icon} />
            <span>
              <span className="block text-sm font-semibold text-[var(--ink)]">
                {t.label}
              </span>
              <span className="mt-0.5 block text-xs text-[var(--muted)]">
                {t.blurb}
              </span>
            </span>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}

function TypeIcon({ name }: { name: string }) {
  const common = "h-9 w-9 shrink-0 rounded-xl bg-[var(--forest-deep)]/60 p-2 text-[var(--forest-glow)]";
  if (name === "ring") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common}>
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2.5" />
        <path d="M12 4a8 8 0 0 1 7 4.2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    );
  }
  if (name === "bar") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common}>
        <rect x="3" y="10" width="18" height="4" rx="2" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2" />
        <rect x="3" y="10" width="11" height="4" rx="2" fill="currentColor" />
      </svg>
    );
  }
  if (name === "life") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={common}>
        {[0, 1, 2].map((r) =>
          [0, 1, 2, 3].map((c) => (
            <rect
              key={`${r}-${c}`}
              x={4 + c * 4.5}
              y={5 + r * 5}
              width="3"
              height="3"
              rx="0.8"
              fill="currentColor"
              fillOpacity={r === 0 ? 1 : 0.35}
            />
          )),
        )}
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" className={common}>
      {[0, 1, 2].map((r) =>
        [0, 1, 2, 3, 4].map((c) => (
          <rect
            key={`${r}-${c}`}
            x={3 + c * 3.8}
            y={5 + r * 4.8}
            width="2.6"
            height="2.6"
            rx="0.7"
            fill="currentColor"
            fillOpacity={r * 5 + c < 7 ? 1 : 0.35}
          />
        )),
      )}
    </svg>
  );
}

type DetailsProps = {
  type: WallpaperType;
  theme: "light" | "dark";
  setTheme: (t: "light" | "dark") => void;
  color: AccentColor;
  setColor: (c: AccentColor) => void;
  dob: string;
  setDob: (v: string) => void;
  lifespan: number;
  setLifespan: (v: number) => void;
  goal: string;
  setGoal: (v: string) => void;
  goalDate: string;
  setGoalDate: (v: string) => void;
  goalStart: string;
  setGoalStart: (v: string) => void;
  progressLabel: string;
  setProgressLabel: (v: string) => void;
  progressStart: string;
  setProgressStart: (v: string) => void;
  progressEnd: string;
  setProgressEnd: (v: string) => void;
};

function StepDetails(props: DetailsProps) {
  const { type, theme, setTheme, color, setColor } = props;
  return (
    <div>
      <StepHeading
        title="Fine-tune the details"
        sub="These feed straight into your wallpaper."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {type === "year" && (
          <p className="rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-4 py-3 text-sm text-[var(--muted)] sm:col-span-2">
            The year grid uses the current calendar year. Past days fill in and
            today is highlighted. Nothing else to set.
          </p>
        )}

        {type === "life" && (
          <>
            <Field label="Date of birth">
              <input
                type="date"
                value={props.dob}
                onChange={(e) => props.setDob(e.target.value)}
                className="field"
              />
            </Field>
            <Field label="Lifespan (years)">
              <input
                type="number"
                min={1}
                max={120}
                value={props.lifespan}
                onChange={(e) => props.setLifespan(Number(e.target.value) || 90)}
                className="field"
              />
            </Field>
          </>
        )}

        {type === "goal" && (
          <>
            <Field label="Goal name" className="sm:col-span-2">
              <input
                type="text"
                value={props.goal}
                onChange={(e) => props.setGoal(e.target.value)}
                className="field"
                maxLength={48}
                placeholder="Launch day"
              />
            </Field>
            <Field label="Goal date">
              <input
                type="date"
                value={props.goalDate}
                onChange={(e) => props.setGoalDate(e.target.value)}
                className="field"
              />
            </Field>
            <Field label="Start date">
              <input
                type="date"
                value={props.goalStart}
                onChange={(e) => props.setGoalStart(e.target.value)}
                className="field"
              />
            </Field>
          </>
        )}

        {type === "progress" && (
          <>
            <Field label="Label" className="sm:col-span-2">
              <input
                type="text"
                value={props.progressLabel}
                onChange={(e) => props.setProgressLabel(e.target.value)}
                className="field"
                maxLength={48}
                placeholder="This semester"
              />
            </Field>
            <Field label="Start date">
              <input
                type="date"
                value={props.progressStart}
                onChange={(e) => props.setProgressStart(e.target.value)}
                className="field"
              />
            </Field>
            <Field label="End date">
              <input
                type="date"
                value={props.progressEnd}
                onChange={(e) => props.setProgressEnd(e.target.value)}
                className="field"
              />
            </Field>
          </>
        )}

        <Field label="Theme">
          <div className="inline-flex w-full rounded-xl border border-[var(--border)] bg-[var(--surface-2)] p-1">
            {(["dark", "light"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTheme(t)}
                className={`flex-1 rounded-lg px-4 py-1.5 text-sm capitalize transition ${
                  theme === t
                    ? "bg-[var(--forest)] text-white"
                    : "text-[var(--muted)] hover:text-[var(--ink)]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </Field>

        <Field label="Color">
          <div className="flex items-center gap-2.5 py-1">
            {ACCENT_COLORS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setColor(c)}
                aria-label={c}
                title={c[0].toUpperCase() + c.slice(1)}
                className={`h-8 w-8 rounded-full border-2 transition ${
                  color === c
                    ? "border-[var(--ink)] scale-110"
                    : "border-transparent hover:scale-105"
                }`}
                style={{ backgroundColor: ACCENT_SWATCH[c] }}
              />
            ))}
          </div>
        </Field>
      </div>
    </div>
  );
}

const ACCENT_SWATCH: Record<AccentColor, string> = {
  green: "#40916C",
  blue: "#4C86C6",
  purple: "#8B7BD8",
  red: "#CB5A54",
  black: "#3A403C",
};

function StepDevice({
  platform,
  onPlatform,
  deviceId,
  setDeviceId,
  device,
  customWidth,
  setCustomWidth,
  customHeight,
  setCustomHeight,
}: {
  platform: "iphone" | "android";
  onPlatform: (p: "iphone" | "android") => void;
  deviceId: string;
  setDeviceId: (v: string) => void;
  device: DevicePreset;
  customWidth: number;
  setCustomWidth: (v: number) => void;
  customHeight: number;
  setCustomHeight: (v: number) => void;
}) {
  const options = devicesForPlatform(platform).map((d) => ({
    id: d.id,
    label: d.label,
  }));

  return (
    <div>
      <StepHeading
        title="Match your screen"
        sub="This sets the exact resolution so nothing gets cropped."
      />

      <div className="mb-5 grid grid-cols-2 gap-3">
        <PlatformButton
          active={platform === "iphone"}
          onClick={() => onPlatform("iphone")}
          logo="apple"
          label="Apple"
          sub="iOS Shortcuts"
        />
        <PlatformButton
          active={platform === "android"}
          onClick={() => onPlatform("android")}
          logo="android"
          label="Android"
          sub="MacroDroid"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Device" className="sm:col-span-2">
          <Combobox
            options={options}
            value={deviceId}
            onChange={setDeviceId}
            placeholder="Search devices"
          />
        </Field>

        {device.platform === "custom" && (
          <>
            <Field label="Width">
              <input
                type="number"
                min={200}
                max={4000}
                value={customWidth}
                onChange={(e) => setCustomWidth(Number(e.target.value) || 1080)}
                className="field"
              />
            </Field>
            <Field label="Height">
              <input
                type="number"
                min={200}
                max={5000}
                value={customHeight}
                onChange={(e) => setCustomHeight(Number(e.target.value) || 2400)}
                className="field"
              />
            </Field>
          </>
        )}
      </div>
    </div>
  );
}

function PlatformButton({
  active,
  onClick,
  logo,
  label,
  sub,
}: {
  active: boolean;
  onClick: () => void;
  logo: "apple" | "android";
  label: string;
  sub: string;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
      className={`flex flex-row items-center justify-center gap-4 rounded-2xl border px-5 py-4 transition ${
        active
          ? "border-[var(--forest-bright)] bg-[var(--forest-deep)]/50"
          : "border-[var(--border)] bg-[var(--surface-2)] hover:border-[var(--border-strong)]"
      }`}
    >
      <span className={active ? "text-[var(--ink)]" : "text-[var(--muted)]"}>
        {logo === "apple" ? <AppleLogo /> : <AndroidLogo />}
      </span>
      <span className="flex flex-col items-start leading-tight">
        <span className="text-lg font-semibold text-[var(--ink)]">{label}</span>
        <span className="text-xs text-[var(--faint)]">{sub}</span>
      </span>
    </motion.button>
  );
}

function AppleLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-11 w-11">
      <path d="M17.05 12.53c-.02-2.2 1.8-3.26 1.88-3.31-1.03-1.5-2.62-1.7-3.19-1.73-1.36-.14-2.65.8-3.34.8-.68 0-1.75-.78-2.88-.76-1.48.02-2.85.86-3.61 2.19-1.54 2.67-.39 6.62 1.11 8.79.73 1.06 1.6 2.25 2.74 2.21 1.1-.05 1.52-.71 2.85-.71 1.33 0 1.7.71 2.86.69 1.18-.02 1.93-1.08 2.65-2.15.84-1.23 1.18-2.42 1.2-2.48-.03-.01-2.3-.88-2.32-3.51zM14.9 5.86c.6-.73 1.01-1.75.9-2.76-.87.03-1.92.58-2.54 1.31-.56.64-1.05 1.68-.92 2.67.97.07 1.96-.49 2.56-1.22z" />
    </svg>
  );
}

function AndroidLogo() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-11 w-11">
      <path d="M6 9v7.5A1.5 1.5 0 0 0 7.5 18H8v3a1 1 0 1 0 2 0v-3h4v3a1 1 0 1 0 2 0v-3h.5A1.5 1.5 0 0 0 18 16.5V9H6zM3.5 9A1.5 1.5 0 0 0 2 10.5v4a1.5 1.5 0 1 0 3 0v-4A1.5 1.5 0 0 0 3.5 9zm17 0a1.5 1.5 0 0 0-1.5 1.5v4a1.5 1.5 0 1 0 3 0v-4A1.5 1.5 0 0 0 20.5 9zM15.6 3.2l1.14-1.14a.4.4 0 0 0-.57-.57l-1.28 1.28A5.9 5.9 0 0 0 12 2.1c-.98 0-1.9.24-2.71.66L8.03 1.49a.4.4 0 1 0-.57.57L8.6 3.2A5.94 5.94 0 0 0 6.02 8h11.96c0-1.94-.94-3.66-2.38-4.8zM9.5 6.25a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5zm5 0a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5z" />
    </svg>
  );
}

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`flex flex-col gap-2 ${className}`}>
      <span className="text-xs font-medium uppercase tracking-wide text-[var(--faint)]">
        {label}
      </span>
      {children}
    </label>
  );
}
