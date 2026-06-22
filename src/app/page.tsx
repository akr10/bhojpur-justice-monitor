import CaseTimelineTracker from "@/components/CaseTimelineTracker";
import CivicAssistantChat from "@/components/ai-assistant/CivicAssistantChat";
import FloodAidAccountabilityTable from "@/components/FloodAidAccountabilityTable";
import Hero from "@/components/Hero";
import {
  getCommunityGrievances,
  toAccountabilityRow,
} from "@/lib/grievances";
import { fetchNewsFeed } from "@/lib/news-feed";

export const revalidate = 600;

export default async function Home() {
  const [newsItems, communityGrievances] = await Promise.all([
    fetchNewsFeed(),
    getCommunityGrievances(),
  ]);

  const communityRecords = communityGrievances.map(toAccountabilityRow);

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
            Facts & Timeline
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
            Verified public milestones plus live press syndication for Bhojpur
            encounter coverage—cached for fast loads, refreshed every 10
            minutes.
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
            Flood Impact Data
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
            Searchable grievance register with anonymous community submissions
            stored in serverless KV.
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
            AI Civic Assistant
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
            Ask about verified local facts, flood impact records, or request a
            neutral RTI template. The assistant auto-detects Bhojpuri, Hindi,
            and English—and stays grounded in objective civic data.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-5 lg:items-start">
          <div className="lg:col-span-3">
            <CivicAssistantChat />
          </div>
          <aside className="lg:col-span-2">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 sm:p-5">
              <h3 className="text-sm font-semibold text-zinc-50">
                Verified data sources
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-zinc-400 sm:text-sm">
                The assistant is configured to answer only from{" "}
                <code className="rounded bg-zinc-950 px-1 py-0.5 text-zinc-300">
                  civicData.ts
                </code>
                , including the case timeline and flood relief register shown
                above.
              </p>
              <ul className="mt-4 space-y-2 text-xs sm:text-sm">
                <li>
                  <a
                    href="#facts-timeline"
                    className="text-blue-400 transition-colors hover:text-blue-300"
                  >
                    Case Timeline Tracker →
                  </a>
                </li>
                <li>
                  <a
                    href="#flood-impact"
                    className="text-blue-400 transition-colors hover:text-blue-300"
                  >
                    Flood Aid Accountability Table →
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
