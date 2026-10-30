"use client"

import { MotionConfig } from "motion/react"
import { useEffect } from "react"
import { About, Marquee } from "./about"
import { BootScreen, LangWipe, Nav, ScrollProgress } from "./chrome"
import { CircuitCanvas } from "./circuit-canvas"
import { Contact, Footer } from "./contact"
import { Education } from "./education"
import { Experience } from "./experience"
import { Hero } from "./hero"
import { useI18n } from "./i18n"
import { ProjectModalProvider } from "./project-modal"
import { Skills } from "./skills"
import { Work } from "./work"

/** One listener feeds the pointer position to whichever `.spot` card is under the cursor. */
function useSpotlight() {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return
    const onMove = (e: PointerEvent) => {
      const card = (e.target as Element | null)?.closest?.<HTMLElement>(".spot")
      if (!card) return
      const r = card.getBoundingClientRect()
      card.style.setProperty("--mx", `${e.clientX - r.left}px`)
      card.style.setProperty("--my", `${e.clientY - r.top}px`)
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    return () => window.removeEventListener("pointermove", onMove)
  }, [])
}

export function Portfolio() {
  const { t } = useI18n()
  useSpotlight()

  return (
    <MotionConfig reducedMotion="user">
      <ProjectModalProvider>
        <a
          href="#main"
          className="btn btn-primary btn-sm fixed start-4 top-4 z-[110] -translate-y-24 focus-visible:translate-y-0"
        >
          {t.nav.skip}
        </a>
        <BootScreen />
        <LangWipe />

        <div aria-hidden className="ambient pointer-events-none fixed inset-0 z-0 overflow-hidden">
          <i />
          <i />
        </div>
        <CircuitCanvas />
        <div aria-hidden className="grain pointer-events-none fixed inset-0 z-[1]" />

        <ScrollProgress />
        <Nav />

        <main id="main" className="relative z-[2]">
          <Hero />
          <Marquee />
          <About />
          <Experience />
          <Work />
          <Skills />
          <Education />
          <Contact />
        </main>
        <Footer />
      </ProjectModalProvider>
    </MotionConfig>
  )
}
