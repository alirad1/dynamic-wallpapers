import { FAQ_ITEMS } from "@/components/JsonLd";

const FEATURES = [
  {
    title: "Custom iPhone & iPad wallpapers",
    body: "Pick your exact model — iPhone 16 Pro Max, iPhone 15, iPhone SE, iPad Pro, iPad Air, and more. Wallpapers render at native resolution so nothing gets cropped on your lock screen.",
  },
  {
    title: "Custom Android wallpapers",
    body: "Samsung Galaxy, Google Pixel, OnePlus, Xiaomi, Motorola, and generic resolutions. Set a wallpaper sized perfectly for your Android lock screen, then let automation refresh it every morning.",
  },
  {
    title: "Goal setting wallpaper",
    body: "Name your goal, pick a deadline, and watch a countdown ring shrink each day. Perfect for launch dates, fitness targets, exam prep, or any milestone you want on your lock screen.",
  },
  {
    title: "Year progress tracker",
    body: "See every day of the year as a grid. Past days fill in automatically and today is highlighted — a quiet reminder of how much of the year has passed.",
  },
  {
    title: "Life in weeks",
    body: "Inspired by the life-calendar concept: one square for every week you have lived up to age 80. A powerful perspective on time, right on your phone.",
  },
  {
    title: "Custom progress bar",
    body: "Track anything with a start and end date — a semester, a project sprint, a fitness challenge. The bar advances automatically each day.",
  },
];

export function SeoContent() {
  return (
    <section
      aria-label="About Dynamic Wallpapers"
      className="border-t border-[var(--border)] bg-[var(--surface)]/40"
    >
      <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl tracking-tight text-[var(--ink)] sm:text-4xl">
            Free custom lock screen wallpapers for iPhone and Android
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--muted)] sm:text-lg">
            Dynamic Wallpapers generates personalized, daily-updating lock screen
            wallpapers from a simple URL. No app to install, no account to
            create — just pick your wallpaper type, match your device, and set
            up a one-time automation with iOS Shortcuts or MacroDroid.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <article
              key={f.title}
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]/60 p-6 backdrop-blur-sm"
            >
              <h3 className="text-base font-semibold text-[var(--ink)]">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                {f.body}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-16">
          <h2 className="font-display text-2xl tracking-tight text-[var(--ink)] sm:text-3xl">
            How it works
          </h2>
          <ol className="mt-6 space-y-4 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
            <li className="flex gap-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--forest-deep)] text-xs font-semibold text-[var(--forest-glow)]">
                1
              </span>
              <span>
                <strong className="text-[var(--ink)]">Choose a wallpaper type</strong>{" "}
                — year grid, life in weeks, goal countdown, or progress bar.
              </span>
            </li>
            <li className="flex gap-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--forest-deep)] text-xs font-semibold text-[var(--forest-glow)]">
                2
              </span>
              <span>
                <strong className="text-[var(--ink)]">Customize details</strong>{" "}
                — set your goal, dates, theme, and accent color.
              </span>
            </li>
            <li className="flex gap-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--forest-deep)] text-xs font-semibold text-[var(--forest-glow)]">
                3
              </span>
              <span>
                <strong className="text-[var(--ink)]">Select your device</strong>{" "}
                — iPhone, iPad, Samsung, Pixel, or enter a custom resolution.
              </span>
            </li>
            <li className="flex gap-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--forest-deep)] text-xs font-semibold text-[var(--forest-glow)]">
                4
              </span>
              <span>
                <strong className="text-[var(--ink)]">Set up automation</strong>{" "}
                — follow the built-in guide for iOS Shortcuts or MacroDroid. Your
                wallpaper refreshes every morning on its own.
              </span>
            </li>
          </ol>
        </div>

        <div className="mt-16">
          <h2 className="font-display text-2xl tracking-tight text-[var(--ink)] sm:text-3xl">
            Frequently asked questions
          </h2>
          <dl className="mt-6 divide-y divide-[var(--border)]">
            {FAQ_ITEMS.map((item) => (
              <div key={item.question} className="py-5">
                <dt className="text-base font-medium text-[var(--ink)]">
                  {item.question}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  {item.answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <p className="mt-12 text-center text-sm text-[var(--faint)]">
          Dynamic Wallpapers — custom phone wallpaper generator for iPhone,
          iPad, and Android. Goal setting wallpaper, year tracker, life calendar,
          and progress bar — updated automatically every day.
        </p>
      </div>
    </section>
  );
}
