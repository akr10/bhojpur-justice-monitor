"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const navLinkKeys = [
  { href: "#facts-timeline", labelKey: "factsTimeline" as const },
  { href: "#flood-impact", labelKey: "floodImpact" as const },
  { href: "#ai-assistant", labelKey: "aiAssistant" as const },
];

export default function Navigation() {
  const { t, toggleLanguage } = useLanguage();

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-md">
      <nav
        aria-label={t.nav.primaryAria}
        className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8"
      >
        <Link
          href="/"
          className="group flex shrink-0 flex-col leading-tight"
        >
          <span className="text-sm font-semibold tracking-wide text-zinc-50 sm:text-base">
            {t.nav.siteTitle}
          </span>
          <span className="hidden text-xs text-zinc-500 transition-colors group-hover:text-zinc-400 sm:block">
            {t.nav.siteTagline}
          </span>
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          <ul className="flex items-center gap-1 overflow-x-auto sm:gap-2">
            {navLinkKeys.map(({ href, labelKey }) => (
              <li key={href} className="shrink-0">
                <Link
                  href={href}
                  className="block rounded-md px-3 py-2 text-xs font-medium text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-zinc-50 sm:px-4 sm:text-sm"
                >
                  {t.nav[labelKey]}
                </Link>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={toggleLanguage}
            aria-label={`Switch language to ${t.nav.langToggle}`}
            className="ml-1 shrink-0 rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-xs font-medium text-zinc-200 transition-colors hover:border-zinc-500 hover:bg-zinc-800 sm:text-sm"
          >
            {t.nav.langToggle}
          </button>
        </div>
      </nav>
    </header>
  );
}
