"use client";

import LegalPageShell from "@/components/LegalPageShell";
import { useLanguage } from "@/context/LanguageContext";
import { GRIEVANCE_OFFICER_EMAIL } from "@/lib/legal-config";

export default function ContactPage() {
  const { t } = useLanguage();
  const c = t.contact;

  return (
    <LegalPageShell title={c.title}>
      <p>{c.intro}</p>

      <section className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 sm:p-6">
        <h2 className="text-base font-semibold text-zinc-50">
          {c.grievanceOfficerTitle}
        </h2>
        <p className="mt-3 text-zinc-400">{c.grievanceOfficerBody}</p>

        <p className="mt-4 text-xs uppercase tracking-wide text-zinc-500">
          {c.emailLabel}
        </p>
        <a
          href={`mailto:${GRIEVANCE_OFFICER_EMAIL}`}
          className="mt-1 inline-block text-sm font-medium text-blue-400 transition-colors hover:text-blue-300"
        >
          {GRIEVANCE_OFFICER_EMAIL}
        </a>
      </section>

      <section>
        <h2 className="mb-2 text-base font-semibold text-zinc-200">
          {c.scopeTitle}
        </h2>
        <p>{c.scopeBody}</p>
      </section>

      <section>
        <h2 className="mb-2 text-base font-semibold text-zinc-200">
          {c.responseTitle}
        </h2>
        <p>{c.responseBody}</p>
      </section>

      <section>
        <h2 className="mb-2 text-base font-semibold text-zinc-200">
          {c.transparencyTitle}
        </h2>
        <p>{c.transparencyBody}</p>
      </section>
    </LegalPageShell>
  );
}
