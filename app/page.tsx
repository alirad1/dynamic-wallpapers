import { Wizard } from "@/components/Wizard";

export default function Home() {
  return (
    <main className="flex-1">
      <Wizard />
      <footer className="border-t border-[var(--border)] px-5 py-10 text-center text-xs text-[var(--faint)] sm:px-8">
        <p>
          Open source,{" "}
          <a
            href="https://github.com/alirad1/dynamic-wallpapers"
            className="text-[var(--forest-glow)] underline-offset-4 transition hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            view on GitHub
          </a>
          , MIT License.
        </p>
      </footer>
    </main>
  );
}
