"use client";

import { useChat } from "@ai-sdk/react";
import type { UIMessage } from "ai";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import ChatMessageContent from "./ChatMessageContent";
import { ASSISTANT_IDENTITY, SUPPORTED_LANGUAGES } from "./prompt-config";

const WELCOME_MESSAGE =
  "Namaste. I am the Bhojpur Civic Assistant. Ask about verified local civic facts, flood impact data on this portal, or request a neutral RTI application template. I respond in Bhojpuri, Hindi, or English—whichever you use.";

function MicrophoneIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M12 2a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3Z" />
      <path d="M19 10v1a7 7 0 0 1-14 0v-1" />
      <path d="M12 18v4" />
      <path d="M8 22h8" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

function getMessageText(parts: { type: string; text?: string }[]) {
  return parts
    .filter((part) => part.type === "text" && part.text)
    .map((part) => part.text)
    .join("");
}

const INITIAL_MESSAGES: UIMessage[] = [
  {
    id: "welcome",
    role: "assistant",
    parts: [{ type: "text", text: WELCOME_MESSAGE }],
  },
];

export default function CivicAssistantChat() {
  const [draft, setDraft] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status, error, stop } = useChat({
    messages: INITIAL_MESSAGES,
  });

  const handleTranscript = useCallback((transcript: string, isFinal: boolean) => {
    if (!transcript) {
      return;
    }

    setDraft((current) => {
      if (isFinal) {
        return transcript;
      }

      const base = current.replace(/\s+$/, "");
      return base ? `${base} ${transcript}` : transcript;
    });
  }, []);

  const {
    isListening,
    isSupported,
    error: speechError,
    toggle: toggleSpeech,
  } = useSpeechRecognition({
    onTranscript: handleTranscript,
    lang: "hi-IN",
  });

  const isBusy = status === "submitted" || status === "streaming";
  const isAwaitingResponse = status === "submitted";
  const canSend = draft.trim().length > 0 && status === "ready";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, status]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const text = draft.trim();
    if (!text || status !== "ready") {
      return;
    }

    sendMessage({ text });
    setDraft("");
  }

  return (
    <div className="flex h-full min-h-[28rem] flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50 sm:min-h-[32rem]">
      <div className="flex items-start justify-between gap-4 border-b border-zinc-800 px-4 py-4 sm:px-5">
        <div>
          <div className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className={`h-2 w-2 rounded-full ${
                error ? "bg-red-500" : isBusy ? "bg-amber-400 animate-pulse" : "bg-emerald-500"
              }`}
            />
            <h3 className="text-sm font-semibold text-zinc-50 sm:text-base">
              {ASSISTANT_IDENTITY.name}
            </h3>
          </div>
          <p className="mt-1 text-xs text-zinc-500 sm:text-sm">
            {isBusy
              ? "Generating response from verified civic data…"
              : ASSISTANT_IDENTITY.tagline}
          </p>
        </div>
        <ul className="hidden shrink-0 flex-wrap justify-end gap-1.5 sm:flex">
          {SUPPORTED_LANGUAGES.map((language) => (
            <li
              key={language}
              className="rounded-full border border-zinc-800 bg-zinc-950 px-2.5 py-0.5 text-[11px] font-medium text-zinc-400"
            >
              {language}
            </li>
          ))}
        </ul>
      </div>

      <div
        role="log"
        aria-label="Chat messages"
        aria-live="polite"
        className="flex flex-1 flex-col gap-4 overflow-y-auto px-4 py-5 sm:px-5"
      >
        {messages.map((message) => {
          const text = getMessageText(message.parts);
          const isUser = message.role === "user";

          return (
            <div
              key={message.id}
              className={`flex ${isUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[90%] rounded-2xl px-4 py-3 sm:max-w-[80%] ${
                  isUser
                    ? "rounded-tr-md border border-blue-900/60 bg-blue-950/40"
                    : "rounded-tl-md border border-zinc-800 bg-zinc-950"
                }`}
              >
                <p
                  className={`mb-1 text-[11px] font-medium uppercase tracking-wide ${
                    isUser
                      ? "text-right text-blue-400/80"
                      : "text-zinc-500"
                  }`}
                >
                  {isUser ? "You" : "Assistant"}
                </p>
                {isUser ? (
                  <p className="text-right text-sm leading-relaxed text-zinc-100 sm:text-[15px]">
                    {text}
                  </p>
                ) : (
                  <ChatMessageContent text={text} />
                )}
              </div>
            </div>
          );
        })}

        {isAwaitingResponse && (
          <div className="flex justify-start">
            <div className="rounded-2xl rounded-tl-md border border-zinc-800 bg-zinc-950 px-4 py-3">
              <p className="mb-2 text-[11px] font-medium uppercase tracking-wide text-zinc-500">
                Assistant
              </p>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-500 [animation-delay:-0.3s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-500 [animation-delay:-0.15s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-500" />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {(error || speechError) && (
        <div className="border-t border-zinc-800 bg-red-950/20 px-4 py-2 text-xs text-red-300 sm:text-sm">
          {error?.message ?? speechError}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="border-t border-zinc-800 bg-zinc-950/60 p-3 sm:p-4"
      >
        <div className="flex items-end gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 focus-within:border-zinc-600 focus-within:ring-1 focus-within:ring-zinc-600">
          <label htmlFor="civic-assistant-input" className="sr-only">
            Message the civic assistant
          </label>
          <textarea
            id="civic-assistant-input"
            rows={1}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Type or speak in Bhojpuri, Hindi, or English…"
            disabled={isBusy}
            className="max-h-32 min-h-[2.5rem] flex-1 resize-none bg-transparent py-2 text-sm text-zinc-50 placeholder:text-zinc-600 focus:outline-none disabled:opacity-60"
          />
          <div className="flex shrink-0 items-center gap-1 pb-1">
            <button
              type="button"
              onClick={toggleSpeech}
              disabled={!isSupported || isBusy}
              aria-label={
                isListening ? "Stop voice input" : "Start voice input"
              }
              aria-pressed={isListening}
              title={
                isSupported
                  ? isListening
                    ? "Stop listening"
                    : "Speak in Bhojpuri, Hindi, or English"
                  : "Speech recognition not supported in this browser"
              }
              className={`inline-flex h-9 w-9 items-center justify-center rounded-lg transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                isListening
                  ? "bg-red-950 text-red-400 ring-2 ring-red-500/50"
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-50"
              }`}
            >
              <MicrophoneIcon />
            </button>
            {isBusy ? (
              <button
                type="button"
                onClick={stop}
                aria-label="Stop generating"
                className="inline-flex h-9 items-center justify-center rounded-lg border border-zinc-700 px-3 text-xs font-medium text-zinc-300 transition-colors hover:border-zinc-500 hover:text-zinc-50"
              >
                Stop
              </button>
            ) : (
              <button
                type="submit"
                aria-label="Send message"
                disabled={!canSend}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-50 text-zinc-950 transition-colors hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <SendIcon />
              </button>
            )}
          </div>
        </div>
        <p className="mt-2 text-center text-[11px] text-zinc-600 sm:text-xs">
          {isListening
            ? "Listening… speak in Bhojpuri, Hindi, or English."
            : "Responses are grounded in civicData.ts—objective facts and RTI templates only."}
        </p>
      </form>
    </div>
  );
}
