"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  getLocale,
  type LocaleLang,
  type LocaleStrings,
} from "@/lib/locales";

const STORAGE_KEY = "bjm-lang";

type LanguageContextValue = {
  currentLang: LocaleLang;
  t: LocaleStrings;
  setLanguage: (lang: LocaleLang) => void;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLang, setCurrentLang] = useState<LocaleLang>("en");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "hi") {
      setCurrentLang(stored);
      document.documentElement.lang = stored;
    }
  }, []);

  const setLanguage = useCallback((lang: LocaleLang) => {
    setCurrentLang(lang);
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  }, []);

  const toggleLanguage = useCallback(() => {
    setCurrentLang((previous) => {
      const next: LocaleLang = previous === "en" ? "hi" : "en";
      localStorage.setItem(STORAGE_KEY, next);
      document.documentElement.lang = next;
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({
      currentLang,
      t: getLocale(currentLang),
      setLanguage,
      toggleLanguage,
    }),
    [currentLang, setLanguage, toggleLanguage],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }

  return context;
}
