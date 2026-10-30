import { ar } from "@/content/ar"
import { en } from "@/content/en"
import type { Dictionary } from "@/content/types"

export const locales = ["en", "ar"] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = "en"

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}

export function dirOf(lang: Locale) {
  return lang === "ar" ? "rtl" : "ltr"
}

export function getDictionary(lang: Locale): Dictionary {
  return lang === "ar" ? ar : en
}
