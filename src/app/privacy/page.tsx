"use client";

import LegalPageShell from "@/components/LegalPageShell";
import { useLanguage } from "@/context/LanguageContext";

export default function PrivacyPage() {
  const { t } = useLanguage();
  const p = t.privacy;

  return (
    <LegalPageShell title={p.title}>
      <p>{p.intro}</p>

      <section>
        <h2 className="mb-2 text-base font-semibold text-zinc-200">
          {p.dataMinimizationTitle}
        </h2>
        <p>{p.dataMinimization}</p>
      </section>

      <section>
        <h2 className="mb-2 text-base font-semibold text-zinc-200">
          {p.anonymousGrievancesTitle}
        </h2>
        <p>{p.anonymousGrievances}</p>
      </section>

      <section>
        <h2 className="mb-2 text-base font-semibold text-zinc-200">
          {p.dpdpTitle}
        </h2>
        <p>{p.dpdpBody}</p>
      </section>

      <section>
        <h2 className="mb-2 text-base font-semibold text-zinc-200">
          {p.intermediaryTitle}
        </h2>
        <p>{p.intermediaryBody}</p>
      </section>
    </LegalPageShell>
  );
}
