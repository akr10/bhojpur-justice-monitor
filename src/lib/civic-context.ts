import {
  caseTimeline,
  floodReliefRecords,
  floodReliefSummary,
} from "@/data/civicData";

const SAMPLE_RECORD_COUNT = 20;

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

export function buildFullSystemPrompt(basePrompt: string): string {
  return `${basePrompt}

## Verified civicData (JSON — sole factual source)
${buildCivicDataContext()}`;
}
