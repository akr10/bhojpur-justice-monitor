"use client";

import { FormEvent, useState } from "react";

type GrievanceSubmissionFormProps = {
  onSubmitted?: () => void;
};

export default function GrievanceSubmissionForm({
  onSubmitted,
}: GrievanceSubmissionFormProps) {
  const [villageArea, setVillageArea] = useState("");
  const [grievanceDetails, setGrievanceDetails] = useState("");
  const [evidenceLink, setEvidenceLink] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage(null);

    try {
      const response = await fetch("/api/submit-grievance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          villageArea,
          grievanceDetails,
          evidenceLink: evidenceLink.trim() || undefined,
        }),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setStatus("error");
        setMessage(data.error ?? "Submission failed.");
        return;
      }

      setStatus("success");
      setMessage(
        "Grievance submitted anonymously. It will appear in the register after the next refresh cycle.",
      );
      setVillageArea("");
      setGrievanceDetails("");
      setEvidenceLink("");
      onSubmitted?.();
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-4 sm:p-5"
    >
      <h3 className="text-sm font-semibold text-zinc-50 sm:text-base">
        Submit Anonymous Community Grievance
      </h3>
      <p className="mt-1 text-xs text-zinc-500 sm:text-sm">
        No IP addresses, cookies, or browser metadata are stored—only the fields
        below.
      </p>

      <div className="mt-4 space-y-3">
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-zinc-400">
            Village Area
          </span>
          <input
            type="text"
            required
            value={villageArea}
            onChange={(event) => setVillageArea(event.target.value)}
            placeholder="e.g. Bilauti, Jawania"
            className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-50 placeholder:text-zinc-600 focus:border-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-600"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-xs font-medium text-zinc-400">
            Grievance Details
          </span>
          <textarea
            required
            rows={3}
            value={grievanceDetails}
            onChange={(event) => setGrievanceDetails(event.target.value)}
            placeholder="Describe the relief issue or administrative delay…"
            className="w-full resize-y rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-50 placeholder:text-zinc-600 focus:border-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-600"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-xs font-medium text-zinc-400">
            Evidence Link (optional)
          </span>
          <input
            type="url"
            value={evidenceLink}
            onChange={(event) => setEvidenceLink(event.target.value)}
            placeholder="https://…"
            className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-zinc-50 placeholder:text-zinc-600 focus:border-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-600"
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-zinc-50 px-4 py-2.5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
      >
        {status === "loading" ? "Submitting…" : "Submit Grievance"}
      </button>

      {message && (
        <p
          className={`mt-3 text-xs sm:text-sm ${
            status === "error" ? "text-red-300" : "text-emerald-300"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
