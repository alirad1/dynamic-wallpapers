import { Wizard } from "@/components/Wizard";

export default function Home() {
  return (
    <main className="flex-1">
      <Wizard />
      <footer className="border-t border-[var(--border)] px-5 py-10 text-center sm:px-8">
        <p className="text-sm text-[var(--muted)]">
          <a
            href="https://github.com/alirad1/dynamic-wallpapers"
            className="underline-offset-4 transition hover:text-[var(--forest-glow)] hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <span className="mx-2 text-[var(--faint)]">·</span>
          Made by{" "}
          <a
            href="https://alirad.dev"
            className="underline-offset-4 transition hover:text-[var(--forest-glow)] hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ali Rad
          </a>
          <span className="mx-2 text-[var(--faint)]">·</span>
          <a
            href="https://www.paypal.com/paypalme/theradicalone"
            className="underline-offset-4 transition hover:text-[var(--forest-glow)] hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Support the developer
          </a>
        </p>
        <p className="mt-2 text-xs font-light text-[var(--faint)]">
          MIT licensed · No cookies, no tracking
        </p>
      </footer>
    </main>
  );
}
