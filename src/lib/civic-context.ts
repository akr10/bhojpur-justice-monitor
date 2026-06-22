import { civicData } from "@/data/civicData";

/**
 * Serializes verified civic data for injection into the LLM system context.
 * Keeps flood records compact while preserving all fields the assistant may cite.
 */
export function buildCivicDataContext(): string {
  return JSON.stringify(civicData, null, 2);
}

export function buildFullSystemPrompt(basePrompt: string): string {
  return `${basePrompt}

## Verified civicData (JSON — sole factual source)
${buildCivicDataContext()}`;
}
