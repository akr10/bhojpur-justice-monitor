"use client";

import { useMemo } from "react";
import { caseTimeline, type TimelineCategory } from "@/data/civicData";
import { useLanguage } from "@/context/LanguageContext";
import type { LocaleStrings } from "@/lib/locales";
import type { NewsFeedItem } from "@/lib/news-feed";

type TimelineEntry = {
  id: string;
  date: string;
  title: string;
  description: string;
  source: string;
  sourceUrl?: string;
  category: TimelineCategory | "news";
};

const categoryStyles: Record<
  TimelineCategory | "news",
  { dot: string; badge: string }
> = {
  encounter: {
    dot: "bg-red-500",
    badge: "border-red-900/50 bg-red-950/40 text-red-300",
  },
  judicial: {
    dot: "bg-blue-500",
    badge: "border-blue-900/50 bg-blue-950/40 text-blue-300",
  },
  administrative: {
    dot: "bg-amber-500",
    badge: "border-amber-900/50 bg-amber-950/40 text-amber-300",
  },
  news: {
    dot: "bg-violet-500",
    badge: "border-violet-900/50 bg-violet-950/40 text-violet-300",
  },
};

function formatDate(isoDate: string, lang: "en" | "hi") {
  return new Intl.DateTimeFormat(lang === "hi" ? "hi-IN" : "en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(new Date(`${isoDate}T00:00:00`));
}

function buildTimeline(
  newsItems: NewsFeedItem[],
  timelineLocale: LocaleStrings["timeline"],
): TimelineEntry[] {
  const staticEntries: TimelineEntry[] = caseTimeline.map((event) => {
    const localized = timelineLocale.events[event.id];

    return {
      id: event.id,
      date: event.date,
      title: localized?.title ?? event.title,
      description: localized?.description ?? event.description,
      source: localized?.source ?? event.source,
      category: event.category,
    };
  });

  const liveEntries: TimelineEntry[] = newsItems.map((item) => ({
    id: item.id,
    date: item.date,
    title: item.title,
    description: item.description,
    source: item.source,
    sourceUrl: item.sourceUrl,
    category: item.category,
  }));

  const seen = new Set<string>();

  return [...staticEntries, ...liveEntries]
    .filter((entry) => {
      const key = `${entry.date}:${entry.title}`;
      if (seen.has(key)) {
        return false;
      }

      seen.add(key);
      return true;
    })
    .sort(
      (left, right) =>
        new Date(right.date).getTime() - new Date(left.date).getTime(),
    );
}

type CaseTimelineTrackerProps = {
  newsItems?: NewsFeedItem[];
};

export default function CaseTimelineTracker({
  newsItems = [],
}: CaseTimelineTrackerProps) {
  const { t, currentLang } = useLanguage();
  const timeline = useMemo(
    () => buildTimeline(newsItems, t.timeline),
    [newsItems, t.timeline],
  );

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 sm:p-6 transition-opacity duration-200">
      <div className="mb-6">
        <h3 className="text-base font-semibold text-zinc-50 sm:text-lg">
          {t.timeline.title}
        </h3>
        <p className="mt-1 text-sm text-zinc-400">{t.timeline.description}</p>
      </div>

      <ol className="relative space-y-0">
        {timeline.length === 0 ? (
          <li className="text-sm text-zinc-500">{t.timeline.empty}</li>
        ) : (
          timeline.map((event, index) => {
            const styles = categoryStyles[event.category];
            const categoryLabel = t.timeline.categories[event.category];
            const isLast = index === timeline.length - 1;

            return (
              <li key={event.id} className="relative flex gap-4 pb-8 last:pb-0">
                {!isLast && (
                  <span
                    aria-hidden="true"
                    className="absolute left-[7px] top-3 h-[calc(100%-0.25rem)] w-px bg-zinc-800"
                  />
                )}

                <span
                  aria-hidden="true"
                  className={`relative z-10 mt-1.5 h-3.5 w-3.5 shrink-0 rounded-full ring-4 ring-zinc-900/50 ${styles.dot}`}
                />

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <time
                      dateTime={event.date}
                      className="text-xs font-medium uppercase tracking-wide text-zinc-500"
                    >
                      {formatDate(event.date, currentLang)}
                    </time>
                    <span
                      className={`rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide ${styles.badge}`}
                    >
                      {categoryLabel}
                    </span>
                  </div>

                  <h4 className="mt-1.5 text-sm font-semibold text-zinc-50 sm:text-base">
                    {event.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    {event.description}
                  </p>
                  <p className="mt-2 text-xs text-zinc-600">
                    {t.timeline.sourceLabel}:{" "}
                    {event.sourceUrl ? (
                      <a
                        href={event.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 transition-colors hover:text-blue-300"
                      >
                        {event.source}
                      </a>
                    ) : (
                      event.source
                    )}
                  </p>
                </div>
              </li>
            );
          })
        )}
      </ol>
    </div>
  );
}
