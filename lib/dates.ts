/** Parse YYYY-MM-DD as a local calendar date (noon to avoid DST edge cases). */
export function parseDate(value: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  if (month < 1 || month > 12 || day < 1 || day > 31) return null;
  const date = new Date(year, month - 1, day, 12, 0, 0, 0);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }
  return date;
}

export function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0, 0, 0);
}

export function todayLocal(): Date {
  return startOfDay(new Date());
}

export function daysBetween(from: Date, to: Date): number {
  const ms = startOfDay(to).getTime() - startOfDay(from).getTime();
  return Math.round(ms / (1000 * 60 * 60 * 24));
}

export function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

export function formatShortDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function dayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 1, 12, 0, 0, 0);
  return daysBetween(start, date) + 1;
}

export function daysInYear(year: number): number {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 366 : 365;
}

/** Monday-based week index from DOB (0 = first week of life). */
export function weeksLived(dob: Date, asOf: Date = todayLocal()): number {
  const days = Math.max(0, daysBetween(dob, asOf));
  return Math.floor(days / 7);
}

export function totalLifeWeeks(lifespanYears: number): number {
  return Math.round(lifespanYears * 52.1429);
}
