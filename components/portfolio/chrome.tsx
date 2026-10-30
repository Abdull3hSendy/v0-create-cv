"use client"

import { AnimatePresence, motion, useScroll, useSpring } from "motion/react"
import { Download, Menu, Moon, Sun, X } from "lucide-react"
import { useTheme } from "next-themes"
import { useCallback, useEffect, useState } from "react"
import { site } from "@/content/site"
import { cn, withBase } from "@/lib/utils"
import { useI18n } from "./i18n"
import { EASE, useBootReady } from "./primitives"

const SECTION_IDS = ["top", "about", "experience", "work", "skills", "education", "contact"] as const

export function currentSection() {
  let current: string = "top"
  for (const id of SECTION_IDS) {
    const el = document.getElementById(id)
    if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) current = id
  }
  return current
}

function useActiveSection() {
  const [active, setActive] = useState("top")
  useEffect(() => {
    const onScroll = () => setActive(currentSection())
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])
  return active
}

/** Switches to the other locale behind a curtain, then restores the reader's section on the new page. */
export function useLangSwitch() {
  const { lang, dir } = useI18n()
  return useCallback(() => {
    const next = lang === "en" ? "ar" : "en"
    document.cookie = `lang=${next}; path=/; max-age=31536000; samesite=lax`
    try {
      sessionStorage.setItem("as-wipe", JSON.stringify({ dir, section: currentSection() }))
    } catch {}
    const go = () => window.location.assign(withBase(`/${next}/`))
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return go()
    const root = document.documentElement
    root.setAttribute("data-wipe-dir", dir)
    root.classList.add("wipe-cover")
    window.setTimeout(go, 640)
  }, [lang, dir])
}

export function Monogram({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[image:var(--btn-grad)] font-mono text-[0.72rem] font-semibold tracking-tight text-white shadow-[0_8px_24px_-10px_rgb(37_150_190/0.8)]",
        className,
      )}
    >
      AS
    </span>
  )
}

export function BootScreen() {
  const { t } = useI18n()
  useEffect(() => {
    try {
      sessionStorage.setItem("as-booted", "1")
    } catch {}
  }, [])
  return (
    <div id="boot" aria-hidden>
      <div className="w-[min(86vw,340px)]">
        <div className="flex items-end justify-between">
          <Monogram className="h-12 w-12 rounded-2xl text-sm" />
          <span className="boot-pct font-mono text-xs text-dim" />
        </div>
        <div className="boot-bar mt-5 h-px w-full overflow-hidden bg-line">
          <i />
        </div>
        <p className="mono-label mt-3 flex justify-between gap-4">
          <span>{t.boot}</span>
          <span className="keep-mono font-mono">21.4225°N 39.8262°E</span>
        </p>
      </div>
    </div>
  )
}

export function LangWipe() {
  const { t, lang } = useI18n()

  useEffect(() => {
    let raw: string | null = null
    try {
      raw = sessionStorage.getItem("as-wipe")
      sessionStorage.removeItem("as-wipe")
    } catch {}
    if (!raw) return
    const { section } = JSON.parse(raw) as { section?: string }
    if (section && section !== "top") document.getElementById(section)?.scrollIntoView({ behavior: "instant", block: "start" })
    const root = document.documentElement
    if (!root.classList.contains("wiping")) return
    // Two frames so the restored position is painted under the curtain before it lifts.
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        root.classList.remove("wiping")
        root.classList.add("wipe-out")
        window.setTimeout(() => {
          root.classList.remove("wipe-out")
          root.removeAttribute("data-wipe-dir")
        }, 800)
      }),
    )
  }, [])

  const label = "display text-[clamp(2.6rem,9vw,6.5rem)] font-semibold leading-none"
  return (
    <div id="lang-wipe" aria-hidden>
      <div className="wipe-panel">
        <span className="wipe-edge" />
        <div className="text-center">
          <p className={cn("wipe-label wipe-label-next text-grad", label, lang === "en" && "font-arabic")}>{t.nav.otherLangName}</p>
          <p className={cn("wipe-label wipe-label-self text-grad", label)}>{t.nav.selfLangName}</p>
          <p className="mono-label keep-mono mt-5 font-mono">{lang === "en" ? "en → ar" : "ar → en"}</p>
        </div>
      </div>
    </div>
  )
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 })
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-[image:var(--grad)] rtl:origin-right"
    />
  )
}

type ViewTransitionDoc = Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } }

function ThemeToggle() {
  const { t } = useI18n()
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const isDark = !mounted || resolvedTheme !== "light"

  function toggle(e: React.MouseEvent<HTMLButtonElement>) {
    const next = isDark ? "light" : "dark"
    const apply = () => {
      const root = document.documentElement
      root.classList.remove("light", "dark")
      root.classList.add(next)
      root.style.colorScheme = next
      setTheme(next)
    }
    const doc = document as ViewTransitionDoc
    if (!doc.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return apply()

    // Circular reveal of the new theme, growing from the toggle itself.
    const rect = e.currentTarget.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2
    const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
    doc.startViewTransition(apply).ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 700, easing: "cubic-bezier(0.76, 0, 0.24, 1)", pseudoElement: "::view-transition-new(root)" },
      )
    })
  }

  return (
    <button type="button" className="icon-btn overflow-hidden" onClick={toggle} aria-label={isDark ? t.nav.toLight : t.nav.toDark}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "sun" : "moon"}
          initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="grid place-items-center"
        >
          {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </motion.span>
      </AnimatePresence>
    </button>
  )
}

export function Nav() {
  const { t, lang } = useI18n()
  const active = useActiveSection()
  const ready = useBootReady()
  const switchLang = useLangSwitch()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const links: [string, string][] = [
    ["about", t.nav.about],
    ["experience", t.nav.experience],
    ["work", t.nav.work],
    ["skills", t.nav.skills],
    ["education", t.nav.education],
    ["contact", t.nav.contact],
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    const onResize = () => window.innerWidth >= 1024 && setOpen(false)
    window.addEventListener("keydown", onKey)
    window.addEventListener("resize", onResize)
    return () => {
      window.removeEventListener("keydown", onKey)
      window.removeEventListener("resize", onResize)
    }
  }, [open])

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={ready ? { y: 0, opacity: 1 } : { y: -24, opacity: 0 }}
      transition={{ duration: 0.9, ease: EASE }}
      className="fixed inset-x-0 top-3 z-50 flex justify-center px-4 md:top-4"
    >
      <nav
        aria-label={lang === "ar" ? "التنقل الرئيسي" : "Primary"}
        className={cn(
          "relative flex w-full max-w-[1120px] items-center gap-2 rounded-full border border-line bg-[var(--nav-bg)] pe-2 ps-2.5 shadow-[0_10px_40px_-12px_rgb(0_0_0/0.35)] backdrop-blur-xl backdrop-saturate-150 transition-[padding] duration-500",
          scrolled ? "py-1.5" : "py-2",
        )}
      >
        <a href="#top" aria-label={t.nav.home} className="flex items-center gap-2.5 rounded-full pe-2" onClick={() => setOpen(false)}>
          <Monogram />
          <span className="hidden text-[0.95rem] font-semibold tracking-tight sm:block">
            {t.hero.first} <span className="serif-em text-grad text-[1.08em]">{t.hero.last}</span>
          </span>
        </a>

        <ul className="ms-auto hidden items-center lg:flex">
          {links.map(([id, label]) => (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={active === id ? "location" : undefined}
                className={cn(
                  "relative isolate block rounded-full px-3.5 py-2 text-[0.8rem] font-medium transition-colors",
                  active === id ? "text-ink" : "text-dim hover:text-ink",
                )}
              >
                {active === id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full border border-line bg-surface-3"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="ms-auto flex items-center gap-1.5 lg:ms-3">
          <button
            type="button"
            onClick={switchLang}
            aria-label={t.nav.switchLang}
            className={cn("icon-btn text-[0.78rem] font-semibold", lang === "en" ? "font-arabic text-[0.95rem]" : "font-mono")}
          >
            {t.nav.langShort}
          </button>
          <ThemeToggle />
          <a href={site.cv} download="Abdullah-Sendy-CV.pdf" className="btn btn-primary btn-sm hidden sm:inline-flex">
            <Download aria-hidden />
            <span>{t.nav.cv}</span>
          </a>
          <button
            type="button"
            className="icon-btn lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.nav.closeMenu : t.nav.menu}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="absolute inset-x-0 top-[calc(100%+0.6rem)] origin-top rounded-[1.75rem] border border-line bg-bg-2/95 p-3 shadow-[var(--shadow)] backdrop-blur-xl lg:hidden"
            >
              <ul className="grid">
                {links.map(([id, label], i) => (
                  <motion.li
                    key={id}
                    initial={{ opacity: 0, x: lang === "ar" ? 12 : -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.4, ease: EASE }}
                  >
                    <a
                      href={`#${id}`}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "flex items-center justify-between rounded-2xl px-4 py-3.5 text-lg font-medium",
                        active === id ? "bg-surface-3 text-ink" : "text-ink-2",
                      )}
                    >
                      {label}
                      <span className="font-mono text-xs text-dim">0{i + 1}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
              <a href={site.cv} download="Abdullah-Sendy-CV.pdf" className="btn btn-primary mt-2 w-full sm:hidden">
                <Download aria-hidden />
                {t.nav.downloadCv}
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  )
}
