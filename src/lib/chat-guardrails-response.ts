import { createUIMessageStream, createUIMessageStreamResponse } from "ai";

export const GUARDRAIL_RESPONSE =
  "I am a dedicated civic assistant for Bhojpur data and cannot answer outside topics.";

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
