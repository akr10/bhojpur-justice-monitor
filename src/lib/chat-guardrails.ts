import type { UIMessage } from "ai";

const PROMPT_INJECTION_PATTERNS: RegExp[] = [
  /ignore\s+(all\s+)?(previous|prior|above|earlier)\s+(instructions|prompts|rules)/i,
  /system\s+override/i,
  /disregard\s+(your|the|all)\s+(instructions|rules|guidelines)/i,
  /forget\s+(everything|all|your)\s+(you|instructions|rules)/i,
  /you\s+are\s+now\s+(a|an|in)\s+/i,
  /jailbreak/i,
  /do\s+anything\s+now/i,
  /pretend\s+(you\s+are|to\s+be)/i,
  /act\s+as\s+(if\s+you\s+have\s+no|a)\s+/i,
  /reveal\s+(your|the)\s+(system|hidden)\s+(prompt|instructions)/i,
  /override\s+(safety|content|policy)\s+/i,
  /bypass\s+(your|the|all)\s+(rules|restrictions|filters)/i,
  /new\s+instructions\s*:/i,
  /\[system\]/i,
  /<\/?system>/i,
];

const CIVIC_RELEVANCE_KEYWORDS: string[] = [
  "bhojpur",
  "bihar",
  "flood",
  "rti",
  "right to information",
  "relief",
  "encounter",
  "timeline",
  "civic",
  "village",
  "bilauti",
  "jawania",
  "probe",
  "judicial",
  "police",
  "grievance",
  "compensation",
  "district",
  "administration",
  "public",
  "transparency",
  "justice",
  "monitor",
  "choudhary",
  "suspension",
  "affected",
  "family",
  "grievance",
  "disaster",
  "records",
  "accountability",
  "template",
  "information officer",
  "gaon",
  "jila",
  "barish",
  "badh",
  "sarkar",
  "nyay",
  "pan",
  "data",
];

const ALLOWED_CONVERSATION_STARTERS =
  /^(hi|hello|hey|namaste|help|thanks|thank you|who are you|what can you do)\b/i;

const DATE_PATTERN =
  /\b(?:20\d{2}[-/]\d{1,2}[-/]\d{1,2}|(?:january|february|march|april|may|june|july|august|september|october|november|december)\s+\d{1,2}(?:,\s*20\d{2})?)\b/i;

export function extractUserMessageTexts(messages: UIMessage[]): string[] {
  return messages
    .filter((message) => message.role === "user")
    .flatMap((message) =>
      message.parts
        .filter(
          (part): part is { type: "text"; text: string } =>
            part.type === "text" && typeof part.text === "string",
        )
        .map((part) => part.text.trim())
        .filter(Boolean),
    );
}

function containsPromptInjection(text: string): boolean {
  return PROMPT_INJECTION_PATTERNS.some((pattern) => pattern.test(text));
}

function isRelevantToCivicScope(text: string): boolean {
  const normalized = text.toLowerCase().trim();

  if (!normalized) {
    return false;
  }

  if (ALLOWED_CONVERSATION_STARTERS.test(normalized)) {
    return true;
  }

  if (DATE_PATTERN.test(text)) {
    return true;
  }

  return CIVIC_RELEVANCE_KEYWORDS.some((keyword) =>
    normalized.includes(keyword),
  );
}

export type GuardrailResult =
  | { allowed: true }
  | { allowed: false; reason: "prompt_injection" | "off_topic" };

export function evaluateChatGuardrails(messages: UIMessage[]): GuardrailResult {
  const userTexts = extractUserMessageTexts(messages);

  if (userTexts.length === 0) {
    return { allowed: false, reason: "off_topic" };
  }

  for (const text of userTexts) {
    if (containsPromptInjection(text)) {
      return { allowed: false, reason: "prompt_injection" };
    }
  }

  const latestUserMessage = userTexts[userTexts.length - 1];

  if (!isRelevantToCivicScope(latestUserMessage)) {
    return { allowed: false, reason: "off_topic" };
  }

  return { allowed: true };
}
