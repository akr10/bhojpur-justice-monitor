"use client";

import CaseTimelineTracker from "@/components/CaseTimelineTracker";
import CivicAssistantChat from "@/components/ai-assistant/CivicAssistantChat";
import FloodAidAccountabilityTable, {
  type AccountabilityRecord,
} from "@/components/FloodAidAccountabilityTable";
import Hero from "@/components/Hero";
import { useLanguage } from "@/context/LanguageContext";
import type { NewsFeedItem } from "@/lib/news-feed";

type HomePageContentProps = {
  newsItems: NewsFeedItem[];
  communityRecords: AccountabilityRecord[];
};

export default function HomePageContent({
  newsItems,
  communityRecords,
}: HomePageContentProps) {
  const { t } = useLanguage();

  return (
    <main className="flex flex-1 flex-col">
      <Hero />

      <section
        id="facts-timeline"
        aria-labelledby="facts-timeline-heading"
        className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="mb-6 sm:mb-8">
          <h2
            id="facts-timeline-heading"
            className="text-lg font-semibold text-zinc-50 sm:text-xl"
          >
            {t.sections.factsTitle}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
            {t.sections.factsDescription}
          </p>
        </div>

        <CaseTimelineTracker newsItems={newsItems} />
      </section>

      <section
        id="flood-impact"
        aria-labelledby="flood-impact-heading"
        className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6 lg:px-8"
      >
        <div className="mb-6 sm:mb-8">
          <h2
            id="flood-impact-heading"
            className="text-lg font-semibold text-zinc-50 sm:text-xl"
          >
            {t.sections.floodTitle}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
            {t.sections.floodDescription}
          </p>
        </div>

        <FloodAidAccountabilityTable communityRecords={communityRecords} />
      </section>

      <section
        id="ai-assistant"
        aria-labelledby="ai-assistant-heading"
        className="mx-auto w-full max-w-6xl px-4 pb-20 sm:px-6 lg:px-8"
      >
        <div className="mb-6 sm:mb-8">
          <h2
            id="ai-assistant-heading"
            className="text-lg font-semibold text-zinc-50 sm:text-xl"
          >
            {t.sections.aiTitle}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
            {t.sections.aiDescription}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-5 lg:items-start">
          <div className="lg:col-span-3">
            <CivicAssistantChat />
          </div>
          <aside className="lg:col-span-2">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 sm:p-5">
              <h3 className="text-sm font-semibold text-zinc-50">
                {t.sections.verifiedSourcesTitle}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-zinc-400 sm:text-sm">
                {t.sections.verifiedSourcesBody}
              </p>
              <ul className="mt-4 space-y-2 text-xs sm:text-sm">
                <li>
                  <a
                    href="#facts-timeline"
                    className="text-blue-400 transition-colors hover:text-blue-300"
                  >
                    {t.sections.linkTimeline}
                  </a>
                </li>
                <li>
                  <a
                    href="#flood-impact"
                    className="text-blue-400 transition-colors hover:text-blue-300"
                  >
                    {t.sections.linkFloodTable}
                  </a>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
