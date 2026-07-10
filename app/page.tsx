import { SeoContent } from "@/components/SeoContent";
import { Wizard } from "@/components/Wizard";

export default function Home() {
  return (
    <>
      <main className="flex-1">
        <Wizard />
        <SeoContent />
      </main>
      <footer className="border-t border-[var(--border)] px-5 py-6 text-center sm:px-8">
        <p className="text-sm text-[var(--muted)]">
          <a
            href="https://github.com/alirad1/dynamic-wallpapers"
            className="underline underline-offset-4 transition hover:text-[var(--forest-glow)]"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <span className="mx-2 text-[var(--faint)] no-underline">·</span>
          Made by{" "}
          <a
            href="https://alirad.dev"
            className="underline underline-offset-4 transition hover:text-[var(--forest-glow)]"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ali Rad
          </a>
          <span className="mx-2 text-[var(--faint)] no-underline">·</span>
          <a
            href="https://www.paypal.com/paypalme/theradicalone"
            className="underline underline-offset-4 transition hover:text-[var(--forest-glow)]"
            target="_blank"
            rel="noopener noreferrer"
          >
            Support me
          </a>
        </p>
      </footer>
    </>
  );
}
