import { notFound } from "next/navigation"
import { I18nProvider } from "@/components/portfolio/i18n"
import { Portfolio } from "@/components/portfolio/portfolio"
import { site } from "@/content/site"
import { getDictionary, isLocale } from "@/lib/i18n"

export default function Page({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) notFound()
  const lang = params.lang
  const t = getDictionary(lang)

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.fullName[lang],
    alternateName: site.fullName[lang === "ar" ? "en" : "ar"],
    jobTitle: t.hero.roles.slice(0, 2).join(" · "),
    url: `${site.url}/${lang}/`,
    email: `mailto:${site.email}`,
    address: { "@type": "PostalAddress", addressLocality: "Makkah", addressCountry: "SA" },
    alumniOf: { "@type": "CollegeOrUniversity", name: "Umm Al-Qura University" },
    worksFor: { "@type": "GovernmentOrganization", name: "Ministry of Hajj and Umrah" },
    sameAs: [site.linkedin, site.github],
    knowsLanguage: ["ar", "en"],
  }

  return (
    <I18nProvider lang={lang} t={t}>
      <Portfolio />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
    </I18nProvider>
  )
}
