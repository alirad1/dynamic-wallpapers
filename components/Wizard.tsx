"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ANDROID_DEVICES,
  DEFAULT_DEVICE,
  IPHONE_DEVICES,
  type DevicePreset,
} from "@/lib/devices";
import { Preview } from "./Preview";
import { SetupSteps } from "./SetupSteps";

export type WallpaperType = "year" | "life" | "goal" | "progress";

const TYPES: { id: WallpaperType; label: string; blurb: string }[] = [
  { id: "year", label: "Year", blurb: "Days of the year as a grid" },
  { id: "life", label: "Life", blurb: "Weeks from your birthday" },
  { id: "goal", label: "Goal", blurb: "Countdown to a date" },
  { id: "progress", label: "Progress", blurb: "Percent through a range" },
];

function todayISO(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function plusDaysISO(days: number): string {
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
  const [type, setType] = useState<WallpaperType>("year");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [deviceId, setDeviceId] = useState(DEFAULT_DEVICE.id);
  const [customWidth, setCustomWidth] = useState(1080);
  const [customHeight, setCustomHeight] = useState(2400);

  const [dob, setDob] = useState("1995-06-15");
  const [lifespan, setLifespan] = useState(90);
  const [goal, setGoal] = useState("Ship the product");
  const [goalDate, setGoalDate] = useState(plusDaysISO(90));
  const [goalStart, setGoalStart] = useState(todayISO());
  const [progressLabel, setProgressLabel] = useState("This year");
  const [progressStart, setProgressStart] = useState(yearStartISO());
  const [progressEnd, setProgressEnd] = useState(yearEndISO());
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const device: DevicePreset =
    [...IPHONE_DEVICES, ...ANDROID_DEVICES].find((d) => d.id === deviceId) ??
    DEFAULT_DEVICE;

  const width = device.platform === "custom" ? customWidth : device.width;
  const height = device.platform === "custom" ? customHeight : device.height;

  const pathAndQuery = useMemo(() => {
    const params = new URLSearchParams({
      width: String(width),
      height: String(height),
      theme,
    });

    if (type === "year") {
      return `/api/year?${params}`;
    }
    if (type === "life") {
      if (!dob) return null;
      params.set("dob", dob);
      params.set("lifespan", String(lifespan));
      return `/api/life?${params}`;
    }
    if (type === "goal") {
      if (!goal.trim() || !goalDate) return null;
      params.set("goal", goal.trim());
      params.set("goal_date", goalDate);
      if (goalStart) params.set("start_date", goalStart);
      return `/api/goal?${params}`;
    }
    if (!progressLabel.trim() || !progressStart || !progressEnd) return null;
    params.set("label", progressLabel.trim());
    params.set("start_date", progressStart);
    params.set("end_date", progressEnd);
    return `/api/progress?${params}`;
  }, [
    type,
    theme,
    width,
    height,
    dob,
    lifespan,
    goal,
    goalDate,
    goalStart,
    progressLabel,
    progressStart,
    progressEnd,
  ]);

  const previewUrl = pathAndQuery;
  const wallpaperUrl =
    pathAndQuery && origin ? `${origin}${pathAndQuery}` : null;

  return (
    <div className="mx-auto w-full max-w-6xl px-5 pb-24 pt-10 sm:px-8 sm:pt-14">
      <header className="mb-12 max-w-2xl">
        <p className="font-display text-4xl tracking-tight text-[var(--forest)] sm:text-5xl md:text-6xl">
          Dynamic Wallpapers
        </p>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
          Daily-updating lock screen images — year, life, goal, and progress —
          via a simple URL. No accounts.
        </p>
      </header>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
        <div className="space-y-10">
          <section className="space-y-4">
            <h2 className="font-display text-2xl tracking-tight text-[var(--forest)]">
              Choose a type
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {TYPES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setType(t.id)}
                  className={`rounded-xl border px-4 py-3 text-left transition ${
                    type === t.id
                      ? "border-[var(--forest)] bg-[var(--forest)]/[0.07]"
                      : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--forest-mid)]/40"
                  }`}
                >
                  <span className="block text-sm font-semibold text-[var(--ink)]">
                    {t.label}
                  </span>
                  <span className="mt-0.5 block text-xs text-[var(--muted)]">
                    {t.blurb}
                  </span>
                </button>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="font-display text-2xl tracking-tight text-[var(--forest)]">
              Options
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {type === "life" && (
                <>
                  <Field label="Date of birth">
                    <input
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="field"
                    />
                  </Field>
                  <Field label="Lifespan (years)">
                    <input
                      type="number"
                      min={1}
                      max={120}
                      value={lifespan}
                      onChange={(e) => setLifespan(Number(e.target.value) || 90)}
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
                      value={goal}
                      onChange={(e) => setGoal(e.target.value)}
                      className="field"
                      maxLength={48}
                    />
                  </Field>
                  <Field label="Goal date">
                    <input
                      type="date"
                      value={goalDate}
                      onChange={(e) => setGoalDate(e.target.value)}
                      className="field"
                    />
                  </Field>
                  <Field label="Start date">
                    <input
                      type="date"
                      value={goalStart}
                      onChange={(e) => setGoalStart(e.target.value)}
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
                      value={progressLabel}
                      onChange={(e) => setProgressLabel(e.target.value)}
                      className="field"
                      maxLength={48}
                    />
                  </Field>
                  <Field label="Start date">
                    <input
                      type="date"
                      value={progressStart}
                      onChange={(e) => setProgressStart(e.target.value)}
                      className="field"
                    />
                  </Field>
                  <Field label="End date">
                    <input
                      type="date"
                      value={progressEnd}
                      onChange={(e) => setProgressEnd(e.target.value)}
                      className="field"
                    />
                  </Field>
                </>
              )}
              {type === "year" && (
                <p className="sm:col-span-2 text-sm text-[var(--muted)]">
                  Uses the current calendar year. Past days fill in; today is
                  highlighted.
                </p>
              )}

              <Field label="Theme">
                <div className="inline-flex rounded-lg border border-[var(--border)] bg-[var(--surface)] p-1">
                  {(["light", "dark"] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTheme(t)}
                      className={`rounded-md px-3 py-1.5 text-sm capitalize transition ${
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

              <Field label="Device">
                <select
                  value={deviceId}
                  onChange={(e) => setDeviceId(e.target.value)}
                  className="field"
                >
                  <optgroup label="iPhone">
                    {IPHONE_DEVICES.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.label} ({d.width}×{d.height})
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Android">
                    {ANDROID_DEVICES.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.label}
                      </option>
                    ))}
                  </optgroup>
                </select>
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
                      onChange={(e) =>
                        setCustomHeight(Number(e.target.value) || 2400)
                      }
                      className="field"
                    />
                  </Field>
                </>
              )}
            </div>
          </section>

          <SetupSteps wallpaperUrl={wallpaperUrl} />
        </div>

        <aside className="lg:sticky lg:top-8">
          <Preview url={previewUrl} width={width} height={height} />
        </aside>
      </div>
    </div>
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
    <label className={`block space-y-1.5 ${className}`}>
      <span className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
        {label}
      </span>
      {children}
    </label>
  );
}
