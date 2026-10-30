import type { MetadataRoute } from "next"
import { site } from "@/content/site"
import { locales } from "@/lib/i18n"

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((lang) => ({
    url: `${site.url}/${lang}/`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: lang === "en" ? 1 : 0.9,
    alternates: { languages: { en: `${site.url}/en/`, ar: `${site.url}/ar/` } },
  }))
}
