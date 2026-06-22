import { openai } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { CIVIC_ASSISTANT_SYSTEM_PROMPT } from "@/components/ai-assistant/civic_assistant_system_prompt";
import { evaluateChatGuardrails } from "@/lib/chat-guardrails";
import { createGuardrailStreamResponse } from "@/lib/chat-guardrails-response";
import { buildFullSystemPrompt } from "@/lib/civic-context";

export const maxDuration = 30;

function isOpenAiKeyConfigured(): boolean {
  const key = process.env.OPENAI_API_KEY?.trim();
  return Boolean(key && key !== "your_openai_api_key_here");
}

export async function POST(req: Request) {
  if (!isOpenAiKeyConfigured()) {
    return Response.json(
      {
        error:
          "OPENAI_API_KEY is not configured. Add a valid key to .env.local and restart the dev server.",
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

  return result.toUIMessageStreamResponse({
    onError: (streamError) => {
      if (process.env.NODE_ENV === "development") {
        return streamError instanceof Error
          ? streamError.message
          : "Model request failed.";
      }

      return "The civic assistant is temporarily unavailable. Please try again later.";
    },
  });
}
