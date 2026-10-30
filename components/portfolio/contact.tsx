"use client"

import { AnimatePresence, motion } from "motion/react"
import { ArrowUp, Check, Copy, Download, Github, Linkedin, Mail, MapPin, Phone } from "lucide-react"
import { useEffect, useState } from "react"
import { site } from "@/content/site"
import { useI18n } from "./i18n"
import { EASE, Magnetic, SplitTitle } from "./primitives"
import { Monogram } from "./chrome"

export function Contact() {
  const { t } = useI18n()
  const c = t.contact
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const id = window.setTimeout(() => setCopied(false), 2200)
    return () => window.clearTimeout(id)
  }, [copied])

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email)
    } catch {
      const field = document.createElement("textarea")
      field.value = site.email
      document.body.appendChild(field)
      field.select()
      document.execCommand("copy")
      field.remove()
    }
    setCopied(true)
  }

  const links = [
    { href: `mailto:${site.email}`, label: site.email, icon: Mail, external: false },
    { href: site.phone.href, label: site.phone.display, icon: Phone, external: false },
    { href: site.linkedin, label: c.labels.linkedin, icon: Linkedin, external: true },
    { href: site.github, label: c.labels.github, icon: Github, external: true },
  ]

  return (
    <section id="contact" className="relative py-28 md:py-36">
      <div className="wrap">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 1, ease: EASE }}
          className="relative isolate overflow-hidden rounded-[2.5rem] border border-line bg-card px-6 py-16 text-center sm:px-12 md:py-24"
        >
          <div
            aria-hidden
            className="conic-spin absolute -inset-[40%] -z-10 bg-[conic-gradient(from_0deg,rgb(109_118_91/0.28),transparent_22%,rgb(37_150_190/0.26)_45%,transparent_68%,rgb(216_199_156/0.14)_85%,rgb(109_118_91/0.28))] blur-[70px]"
          />
          <p className="eyebrow justify-center">
            <span className="font-mono text-[0.72rem] tracking-[0.2em]">06</span>
            <span aria-hidden className="h-px w-8 bg-[image:var(--grad)]" />
            {c.eyebrow}
          </p>
          <SplitTitle
            text={c.title}
            className="mx-auto mt-6 max-w-[17ch] text-[clamp(2.5rem,6.5vw,5rem)] font-semibold leading-[1] tracking-[-0.05em] text-balance rtl:leading-[1.3]"
          />
          <p className="mx-auto mt-6 max-w-xl text-[1.05rem] leading-relaxed text-dim">{c.lede}</p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Magnetic>
              <a href={`mailto:${site.email}`} className="btn btn-primary h-14 px-7 text-[0.95rem]">
                <Mail aria-hidden />
                {c.email}
              </a>
            </Magnetic>
            <Magnetic>
              <button type="button" onClick={copyEmail} className="btn btn-ghost h-14 min-w-[11rem] px-6">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={copied ? "done" : "copy"}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="inline-flex items-center gap-2"
                  >
                    {copied ? <Check aria-hidden className="text-[#4ade80]" /> : <Copy aria-hidden />}
                    {copied ? c.copied : c.copy}
                  </motion.span>
                </AnimatePresence>
              </button>
            </Magnetic>
            <Magnetic>
              <a href={site.cv} download="Abdullah-Sendy-CV.pdf" className="btn btn-ghost h-14 px-6">
                <Download aria-hidden />
                {c.cv}
              </a>
            </Magnetic>
          </div>
          <p role="status" aria-live="polite" className="sr-only">
            {copied ? c.copied : ""}
          </p>

          <ul className="mt-12 flex flex-wrap justify-center gap-2">
            {links.map(({ href, label, icon: Icon, external }) => (
              <li key={href}>
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="chip px-4 py-2.5 text-[0.84rem] transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-ocean"
                >
                  <Icon className="h-4 w-4 text-ocean" aria-hidden />
                  <span dir="ltr">{label}</span>
                </a>
              </li>
            ))}
            <li className="chip px-4 py-2.5 text-[0.84rem]">
              <MapPin className="h-4 w-4 text-ocean" aria-hidden />
              {c.labels.location}
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  )
}

export function Footer() {
  const { t, lang } = useI18n()
  return (
    <footer className="relative z-[2] border-t border-line">
      <div className="wrap flex flex-col items-center justify-between gap-6 py-10 sm:flex-row">
        <div className="flex items-center gap-3">
          <Monogram />
          <div>
            <p className="text-[0.88rem] font-medium text-ink">{t.footer.built}</p>
            <p className="text-[0.76rem] text-dim" suppressHydrationWarning>
              © {new Date().getFullYear()} {site.fullName[lang]} · {t.footer.rights}
            </p>
          </div>
        </div>
        <a href="#top" className="btn btn-ghost btn-sm group">
          {t.footer.top}
          <ArrowUp aria-hidden className="transition-transform duration-300 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </footer>
  )
}
