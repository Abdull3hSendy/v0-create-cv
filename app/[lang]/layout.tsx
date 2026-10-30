import type { Metadata, Viewport } from "next"
import { GeistMono } from "geist/font/mono"
import { GeistSans } from "geist/font/sans"
import { IBM_Plex_Sans_Arabic, Instrument_Serif } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { site } from "@/content/site"
import { dirOf, getDictionary, isLocale, locales, type Locale } from "@/lib/i18n"
import { withBase } from "@/lib/utils"
import "../globals.css"

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
})

const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-arabic",
  display: "swap",
  preload: false,
})

export const dynamicParams = false

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
  const lang: Locale = isLocale(params.lang) ? params.lang : "en"
  const t = getDictionary(lang)
  return {
    // Origin only: the paths below already carry the base path, and a base with a path would double it.
    metadataBase: new URL("/", site.url),
    title: t.meta.title,
    description: t.meta.description,
    authors: [{ name: site.fullName.en, url: site.url }],
    keywords: [
      "Abdullah Sendy",
      "عبدالله سندي",
      "Computer Engineer",
      "Full-Stack Developer",
      "ASP.NET Core",
      "Next.js",
      "Flutter",
      "Data Governance",
      "Makkah",
    ],
    alternates: {
      canonical: withBase(`/${lang}/`),
      languages: { en: withBase("/en/"), ar: withBase("/ar/"), "x-default": withBase("/en/") },
    },
    openGraph: {
      type: "profile",
      url: withBase(`/${lang}/`),
      siteName: site.name[lang],
      title: t.meta.title,
      description: t.meta.description,
      locale: lang === "ar" ? "ar_SA" : "en_US",
      alternateLocale: lang === "ar" ? "en_US" : "ar_SA",
      images: [{ url: withBase("/og.png"), width: 1200, height: 630, alt: t.meta.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: t.meta.title,
      description: t.meta.description,
      images: [withBase("/og.png")],
    },
    robots: { index: true, follow: true },
  }
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0c09" },
    { media: "(prefers-color-scheme: light)", color: "#f3f2ec" },
  ],
}

// Runs before first paint: skips the intro for returning visitors / reduced motion,
// and keeps the language-switch curtain closed until the new page is ready to reveal.
const prePaint = `(function(){try{var d=document.documentElement,s=sessionStorage,r=matchMedia('(prefers-reduced-motion: reduce)').matches;if(s.getItem('as-booted')||r)d.classList.add('booted');var w=s.getItem('as-wipe');if(w&&!r){d.classList.add('wiping','booted');d.setAttribute('data-wipe-dir',JSON.parse(w).dir||'ltr')}}catch(e){}})()`

export default function LangLayout({ children, params }: { children: React.ReactNode; params: { lang: string } }) {
  const lang: Locale = isLocale(params.lang) ? params.lang : "en"
  return (
    <html lang={lang} dir={dirOf(lang)} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: prePaint }} />
      </head>
      <body className={`${GeistSans.variable} ${GeistMono.variable} ${serif.variable} ${arabic.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          {children}
        </ThemeProvider>
        {/* Vercel Analytics only works when Vercel hosts the site. */}
        {process.env.VERCEL && <Analytics />}
      </body>
    </html>
  )
}
