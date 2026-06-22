function parseApiErrorMessage(message: string): string {
  try {
    const parsed = JSON.parse(message) as { error?: string };
    if (parsed.error) {
      return parsed.error;
    }
  } catch {
    // Not JSON — use the raw message below.
  }

  if (message === "An error occurred.") {
    return "The AI backend failed—usually because GOOGLE_GENERATIVE_AI_API_KEY is missing or invalid. Add a valid key to .env.local and restart the dev server.";
  }

  return message;
}

export function formatChatError(error: Error | undefined): string | null {
  if (!error?.message) {
    return null;
  }

  return parseApiErrorMessage(error.message);
}
