"use client";

import { useChat } from "@ai-sdk/react";
import type { UIMessage } from "ai";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { formatChatError } from "@/lib/format-chat-error";
import ChatMessageContent from "./ChatMessageContent";

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

function createWelcomeMessage(text: string): UIMessage {
  return {
    id: "welcome",
    role: "assistant",
    parts: [{ type: "text", text }],
  };
}

export default function CivicAssistantChat() {
  const { t, currentLang } = useLanguage();
  const [draft, setDraft] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status, error, stop, setMessages } = useChat({
    messages: [createWelcomeMessage(t.chat.welcome)],
  });

  useEffect(() => {
    setMessages((previous) =>
      previous.map((message) =>
        message.id === "welcome"
          ? createWelcomeMessage(t.chat.welcome)
          : message,
      ),
    );
  }, [t.chat.welcome, setMessages]);

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
    lang: currentLang === "hi" ? "hi-IN" : "en-IN",
  });

  const isBusy = status === "submitted" || status === "streaming";
  const isAwaitingResponse = status === "submitted";
  const canSend = draft.trim().length > 0 && status === "ready";
  const chatError = formatChatError(error);

  const languageBadges = [
    t.chat.langBhojpuri,
    t.chat.langHindi,
    t.chat.langEnglish,
  ];

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
    <div className="flex h-full min-h-[28rem] flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/50 sm:min-h-[32rem] transition-opacity duration-200">
      <div className="flex items-start justify-between gap-4 border-b border-zinc-800 px-4 py-4 sm:px-5">
        <div>
          <div className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className={`h-2 w-2 rounded-full ${
                error || chatError
                  ? "bg-red-500"
                  : isBusy
                    ? "bg-amber-400 animate-pulse"
                    : "bg-emerald-500"
              }`}
            />
            <h3 className="text-sm font-semibold text-zinc-50 sm:text-base">
              {t.chat.name}
            </h3>
          </div>
          <p className="mt-1 text-xs text-zinc-500 sm:text-sm">
            {isBusy ? t.chat.generating : t.chat.tagline}
          </p>
        </div>
        <ul className="hidden shrink-0 flex-wrap justify-end gap-1.5 sm:flex">
          {languageBadges.map((language) => (
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
                  {isUser ? t.chat.youLabel : t.chat.assistantLabel}
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
                {t.chat.assistantLabel}
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

      {(chatError || speechError) && (
        <div className="border-t border-zinc-800 bg-red-950/20 px-4 py-2 text-xs text-red-300 sm:text-sm">
          {chatError ?? speechError}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="border-t border-zinc-800 bg-zinc-950/60 p-3 sm:p-4"
      >
        <div className="flex items-end gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-2 focus-within:border-zinc-600 focus-within:ring-1 focus-within:ring-zinc-600">
          <label htmlFor="civic-assistant-input" className="sr-only">
            {t.chat.inputAria}
          </label>
          <textarea
            id="civic-assistant-input"
            rows={1}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder={t.chat.inputPlaceholder}
            disabled={isBusy}
            className="max-h-32 min-h-[2.5rem] flex-1 resize-none bg-transparent py-2 text-sm text-zinc-50 placeholder:text-zinc-600 focus:outline-none disabled:opacity-60"
          />
          <div className="flex shrink-0 items-center gap-1 pb-1">
            <button
              type="button"
              onClick={toggleSpeech}
              disabled={!isSupported || isBusy}
              aria-label={isListening ? t.chat.micStop : t.chat.micStart}
              aria-pressed={isListening}
              title={isSupported ? undefined : t.chat.micUnsupported}
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
                aria-label={t.chat.stop}
                className="inline-flex h-9 items-center justify-center rounded-lg border border-zinc-700 px-3 text-xs font-medium text-zinc-300 transition-colors hover:border-zinc-500 hover:text-zinc-50"
              >
                {t.chat.stop}
              </button>
            ) : (
              <button
                type="submit"
                aria-label={t.chat.send}
                disabled={!canSend}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-50 text-zinc-950 transition-colors hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <SendIcon />
              </button>
            )}
          </div>
        </div>
        <p className="mt-2 text-center text-[11px] text-zinc-600 sm:text-xs">
          {isListening ? t.chat.listening : t.chat.footerIdle}
        </p>
      </form>
    </div>
  );
}
