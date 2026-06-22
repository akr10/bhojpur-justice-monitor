import { google } from "@ai-sdk/google";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { CIVIC_ASSISTANT_SYSTEM_PROMPT } from "@/components/ai-assistant/civic_assistant_system_prompt";
import { buildFullSystemPrompt } from "@/lib/civic-context";

export const maxDuration = 30;

function isGeminiKeyConfigured(): boolean {
  const key = process.env.GOOGLE_GENERATIVE_AI_API_KEY?.trim();
  return Boolean(key && key !== "your_google_generative_ai_api_key_here");
}

export async function POST(req: Request) {
  if (!isGeminiKeyConfigured()) {
    return Response.json(
      {
        error:
          "GOOGLE_GENERATIVE_AI_API_KEY is not configured. Add a valid key to .env.local and restart the dev server.",
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

  const result = streamText({
    model: google("gemini-2.5-flash"),
    system: buildFullSystemPrompt(CIVIC_ASSISTANT_SYSTEM_PROMPT),
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse({
    onError: (streamError) => {
      console.error("[chat] Gemini stream error:", streamError);

      const errorText =
        streamError instanceof Error
          ? streamError.message
          : JSON.stringify(streamError);

      if (
        errorText.includes("RESOURCE_EXHAUSTED") ||
        errorText.includes("quota")
      ) {
        return "The civic assistant is paused: Gemini API quota exceeded. Check usage at ai.google.dev, then try again.";
      }

      if (process.env.NODE_ENV === "development") {
        return streamError instanceof Error
          ? streamError.message
          : "Model request failed.";
      }

      return "The civic assistant is temporarily unavailable. Please try again later.";
    },
  });
}
