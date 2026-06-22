import {
  caseTimeline,
  floodReliefRecords,
  floodReliefSummary,
} from "@/data/civicData";
import type { NewsFeedItem } from "@/lib/news-feed";

const SAMPLE_RECORD_COUNT = 20;
const MAX_NEWS_CONTEXT_ITEMS = 15;

function buildVillageBreakdown() {
  const counts = new Map<string, number>();

  for (const record of floodReliefRecords) {
    counts.set(record.villageArea, (counts.get(record.villageArea) ?? 0) + 1);
  }

  return Object.fromEntries(counts);
}

/**
 * Compact dataset for LLM context — full 612 records remain on the portal UI.
 */
export function buildCivicDataContext(): string {
  const payload = {
    caseTimeline,
    floodReliefSummary,
    villageBreakdown: buildVillageBreakdown(),
    sampleFloodReliefRecords: floodReliefRecords.slice(0, SAMPLE_RECORD_COUNT),
    lookupNote:
      "The portal UI holds all 612 flood relief records. Cite familyId, villageArea, or event id when answering.",
  };

  return JSON.stringify(payload, null, 2);
}

function buildLegalNewsContext(newsItems: NewsFeedItem[]): string {
  if (newsItems.length === 0) {
    return "No legal news feed items available in this session.";
  }

  const payload = newsItems.slice(0, MAX_NEWS_CONTEXT_ITEMS).map((item) => ({
    title: item.title,
    eventDate: item.eventDate,
    summary: item.summary,
    source: item.source,
    sourceUrl: item.sourceUrl,
    legalNewsSource: true,
  }));

  return JSON.stringify(payload, null, 2);
}

export function buildFullSystemPrompt(
  basePrompt: string,
  newsItems: NewsFeedItem[] = [],
): string {
  return `${basePrompt}

## Verified civicData (JSON — sole factual source)
${buildCivicDataContext()}

## Legal news feed (JSON — factual source when source field begins with "Sourced via")
${buildLegalNewsContext(newsItems)}`;
}
