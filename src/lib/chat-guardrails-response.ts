import { createUIMessageStream, createUIMessageStreamResponse } from "ai";

export const GUARDRAIL_RESPONSE =
  "I can only help with Bhojpur civic topics: the Bharat Tiwari / Bhojpur encounter timeline, flood relief records, RTI templates, and how to use this portal. Please ask about one of those.";

export function createGuardrailStreamResponse(): Response {
  const stream = createUIMessageStream({
    execute({ writer }) {
      const textId = "guardrail-response";

      writer.write({ type: "text-start", id: textId });
      writer.write({
        type: "text-delta",
        id: textId,
        delta: GUARDRAIL_RESPONSE,
      });
      writer.write({ type: "text-end", id: textId });
    },
  });

  return createUIMessageStreamResponse({ stream });
}
