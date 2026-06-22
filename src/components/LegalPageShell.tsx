"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useLanguage } from "@/context/LanguageContext";

type LegalPageShellProps = {
  title: string;
  children: ReactNode;
};

export default function LegalPageShell({ title, children }: LegalPageShellProps) {
  const { t } = useLanguage();

  return (
    <main className="mx-auto max-w-3xl flex-1 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <Link
        href="/"
        className="text-xs font-medium text-zinc-500 transition-colors hover:text-zinc-300"
      >
        ← {t.legal.backHome}
      </Link>

      <h1 className="mt-6 text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
        {title}
      </h1>

      <article className="mt-8 space-y-6 text-sm leading-relaxed text-zinc-400 transition-opacity duration-200">
        {children}
      </article>
    </main>
  );
}
