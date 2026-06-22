import { openai } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { CIVIC_ASSISTANT_SYSTEM_PROMPT } from "@/components/ai-assistant/civic_assistant_system_prompt";
import { evaluateChatGuardrails } from "@/lib/chat-guardrails";
import { createGuardrailStreamResponse } from "@/lib/chat-guardrails-response";
import { buildFullSystemPrompt } from "@/lib/civic-context";

export const maxDuration = 30;

export async function POST(req: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return Response.json(
      {
        error:
          "OPENAI_API_KEY is not configured. Add it to .env.local to enable the civic assistant.",
      },
      { status: 503 },
    );
  }

  let messages: UIMessage[];

  try {
    const body = await req.json();
    messages = body.messages;
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!Array.isArray(messages)) {
    return Response.json({ error: "Messages must be an array." }, { status: 400 });
  }

  const guardrail = evaluateChatGuardrails(messages);
  if (!guardrail.allowed) {
    return createGuardrailStreamResponse();
  }

  const result = streamText({
    model: openai("gpt-4o-mini"),
    system: buildFullSystemPrompt(CIVIC_ASSISTANT_SYSTEM_PROMPT),
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
