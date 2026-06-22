"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden border-b border-zinc-800">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(59,130,246,0.08)_0%,_transparent_55%)]"
      />

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-blue-400">
            {t.hero.eyebrow}
          </p>

          <h1 className="text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl lg:text-5xl lg:leading-tight">
            {t.hero.title}
          </h1>

          <p className="mt-6 text-base leading-relaxed text-zinc-400 sm:text-lg sm:leading-8">
            {t.hero.description}
          </p>

          <ul className="mt-8 flex flex-wrap gap-2">
            {t.hero.highlights.map((item) => (
              <li
                key={item}
                className="rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-300 sm:text-sm"
              >
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="#facts-timeline"
              className="inline-flex items-center justify-center rounded-lg bg-zinc-50 px-5 py-3 text-sm font-semibold text-zinc-950 transition-colors hover:bg-zinc-200"
            >
              {t.hero.ctaTimeline}
            </Link>
            <Link
              href="#flood-impact"
              className="inline-flex items-center justify-center rounded-lg border border-zinc-700 px-5 py-3 text-sm font-medium text-zinc-50 transition-colors hover:border-zinc-500 hover:bg-zinc-900"
            >
              {t.hero.ctaFlood}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
