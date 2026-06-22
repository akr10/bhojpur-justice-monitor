"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="mt-auto border-t border-zinc-800 bg-zinc-950/80">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <nav
          aria-label={t.footer.legalNavAria}
          className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs"
        >
          <Link
            href="/privacy"
            className="text-zinc-400 transition-colors hover:text-zinc-200"
          >
            {t.footer.privacyPolicy}
          </Link>
          <span aria-hidden="true" className="text-zinc-700">
            ·
          </span>
          <Link
            href="/contact"
            className="text-zinc-400 transition-colors hover:text-zinc-200"
          >
            {t.footer.grievanceOfficer}
          </Link>
        </nav>

        <p className="text-xs leading-relaxed text-zinc-500 transition-opacity duration-200">
          {t.footer.legalDisclaimer}
        </p>
      </div>
    </footer>
  );
}
