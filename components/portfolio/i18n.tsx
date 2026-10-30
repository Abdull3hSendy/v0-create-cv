"use client"

import { createContext, useContext, useMemo } from "react"
import type { Dictionary } from "@/content/types"
import type { Locale } from "@/lib/i18n"

type I18n = { lang: Locale; dir: "ltr" | "rtl"; t: Dictionary }

const I18nContext = createContext<I18n | null>(null)

export function I18nProvider({ lang, t, children }: { lang: Locale; t: Dictionary; children: React.ReactNode }) {
  const value = useMemo<I18n>(() => ({ lang, dir: lang === "ar" ? "rtl" : "ltr", t }), [lang, t])
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const value = useContext(I18nContext)
  if (!value) throw new Error("useI18n must be used inside <I18nProvider>")
  return value
}
