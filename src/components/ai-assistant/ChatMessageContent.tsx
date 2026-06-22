"use client";

import { useCallback, useState } from "react";

type ContentBlock =
  | { type: "text"; content: string }
  | { type: "blockquote"; content: string }
  | { type: "code"; content: string };

function parseMessageContent(text: string): ContentBlock[] {
  const blocks: ContentBlock[] = [];
  const lines = text.split("\n");
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];

    if (line.startsWith("```")) {
      const codeLines: string[] = [];
      index += 1;

      while (index < lines.length && !lines[index].startsWith("```")) {
        codeLines.push(lines[index]);
        index += 1;
      }

      if (index < lines.length) {
        index += 1;
      }

      blocks.push({ type: "code", content: codeLines.join("\n").trim() });
      continue;
    }

    if (line.startsWith(">")) {
      const quoteLines: string[] = [];

      while (index < lines.length && lines[index].startsWith(">")) {
        quoteLines.push(lines[index].replace(/^>\s?/, ""));
        index += 1;
      }

      blocks.push({ type: "blockquote", content: quoteLines.join("\n").trim() });
      continue;
    }

    const textLines: string[] = [];
    while (
      index < lines.length &&
      !lines[index].startsWith(">") &&
      !lines[index].startsWith("```")
    ) {
      textLines.push(lines[index]);
      index += 1;
    }

    const content = textLines.join("\n").trim();
    if (content) {
      blocks.push({ type: "text", content });
    }
  }

  if (blocks.length === 0 && text.trim()) {
    blocks.push({ type: "text", content: text.trim() });
  }

  return blocks;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    if (typeof navigator === "undefined" || !navigator.clipboard) {
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [text]);

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="rounded-md border border-zinc-700 bg-zinc-900 px-2.5 py-1 text-[11px] font-medium text-zinc-300 transition-colors hover:border-zinc-500 hover:text-zinc-50"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

export default function ChatMessageContent({ text }: { text: string }) {
  const blocks = parseMessageContent(text);

  return (
    <div className="space-y-3">
      {blocks.map((block, blockIndex) => {
        switch (block.type) {
          case "blockquote":
            return (
              <figure
                key={`quote-${blockIndex}`}
                className="overflow-hidden rounded-lg border border-zinc-700/80 bg-zinc-950/90"
              >
                <figcaption className="flex items-center justify-between border-b border-zinc-800 px-3 py-2 text-[11px] font-medium uppercase tracking-wide text-zinc-500">
                  RTI / Legal draft
                  <CopyButton text={block.content} />
                </figcaption>
                <blockquote className="border-l-4 border-blue-500/70 px-4 py-3 font-mono text-xs leading-relaxed text-zinc-200 sm:text-sm">
                  {block.content.split("\n").map((line, lineIndex) => (
                    <span key={lineIndex} className="block whitespace-pre-wrap">
                      {line}
                    </span>
                  ))}
                </blockquote>
              </figure>
            );
          case "code":
            return (
              <figure
                key={`code-${blockIndex}`}
                className="overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950/90"
              >
                <figcaption className="flex items-center justify-between border-b border-zinc-800 px-3 py-2 text-[11px] font-medium uppercase tracking-wide text-zinc-500">
                  Document
                  <CopyButton text={block.content} />
                </figcaption>
                <pre className="overflow-x-auto px-4 py-3 font-mono text-xs leading-relaxed text-zinc-300 sm:text-sm">
                  {block.content}
                </pre>
              </figure>
            );
          default:
            return (
              <p
                key={`text-${blockIndex}`}
                className="whitespace-pre-wrap text-sm leading-relaxed text-zinc-300 sm:text-[15px]"
              >
                {block.content}
              </p>
            );
        }
      })}
    </div>
  );
}
