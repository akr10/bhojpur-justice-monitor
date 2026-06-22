"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="mt-auto border-t border-zinc-800 bg-zinc-950/80">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <p className="text-xs leading-relaxed text-zinc-500 transition-opacity duration-200">
          {t.footer.legalDisclaimer}
        </p>
      </div>
    </footer>
  );
}
