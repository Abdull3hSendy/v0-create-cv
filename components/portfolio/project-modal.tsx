"use client"

import { AnimatePresence, motion } from "motion/react"
import { ArrowUpRight, Calendar, Check, Github, Layers, Lock, X } from "lucide-react"
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react"
import { projectById, type ProjectId } from "@/content/projects"
import { useI18n } from "./i18n"
import { EASE } from "./primitives"
import { ProjectModalVisual } from "./project-visuals"

type ModalApi = { open: (id: ProjectId) => void }

const ModalContext = createContext<ModalApi>({ open: () => {} })

export const useProjectModal = () => useContext(ModalContext)

export function ProjectModalProvider({ children }: { children: React.ReactNode }) {
  const [id, setId] = useState<ProjectId | null>(null)
  const trigger = useRef<HTMLElement | null>(null)

  const open = useCallback((next: ProjectId) => {
    trigger.current = document.activeElement as HTMLElement | null
    setId(next)
  }, [])

  const close = useCallback(() => {
    setId(null)
    requestAnimationFrame(() => trigger.current?.focus({ preventScroll: true }))
  }, [])

  const api = useMemo(() => ({ open }), [open])

  return (
    <ModalContext.Provider value={api}>
      {children}
      <AnimatePresence>{id && <ProjectDialog key={id} id={id} onClose={close} />}</AnimatePresence>
    </ModalContext.Provider>
  )
}

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

function ProjectDialog({ id, onClose }: { id: ProjectId; onClose: () => void }) {
  const { t } = useI18n()
  const meta = projectById[id]
  const copy = t.work.items[id]
  const dialog = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = document.documentElement
    const gutter = window.innerWidth - root.clientWidth
    const previous = { overflow: root.style.overflow, padding: document.body.style.paddingInlineEnd }
    root.style.overflow = "hidden"
    document.body.style.paddingInlineEnd = `${gutter}px`
    dialog.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key !== "Tab" || !dialog.current) return
      const items = Array.from(dialog.current.querySelectorAll<HTMLElement>(FOCUSABLE))
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener("keydown", onKey)
    return () => {
      root.style.overflow = previous.overflow
      document.body.style.paddingInlineEnd = previous.padding
      document.removeEventListener("keydown", onKey)
    }
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-[80] overflow-y-auto overscroll-contain"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div aria-hidden className="fixed inset-0 bg-[rgb(6_8_5/0.72)] backdrop-blur-md" />
      <div className="relative flex min-h-full items-start justify-center px-4 py-[5vh]" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <motion.div
          ref={dialog}
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-title"
          initial={{ opacity: 0, y: 48, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.98 }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{ "--c1": meta.accent[0], "--c2": meta.accent[1] } as React.CSSProperties}
          className="relative w-full max-w-3xl overflow-hidden rounded-[2rem] border border-line-2 bg-bg-2 shadow-[0_50px_140px_-30px_rgb(0_0_0/0.7)]"
        >
          <header className="stage relative overflow-hidden border-b border-line px-6 pb-8 pt-7 sm:px-10">
            <button type="button" data-autofocus onClick={onClose} aria-label={t.work.close} className="icon-btn absolute end-4 top-4 z-[2] h-10 w-10 rounded-2xl">
              <X className="h-4 w-4" />
            </button>
            <p className="eyebrow relative">{copy.kind}</p>
            <h2 id="project-title" className="display relative mt-3 pe-12 text-[clamp(1.9rem,5vw,2.8rem)] font-semibold leading-[1.05] text-ink">
              {copy.title}
            </h2>
            <p className="serif-em text-grad relative mt-2 text-[1.15rem]">{copy.tagline}</p>
            {meta.visual && (
              <div className="relative mt-8">
                <ProjectModalVisual meta={meta} alts={copy.shots ?? []} />
                {meta.visual === "hajj" && <p className="mono-label mt-4 text-center">{t.work.illustration}</p>}
              </div>
            )}
          </header>

          <div className="grid gap-8 px-6 py-8 sm:px-10 sm:py-10">
            <dl className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-line bg-surface p-4">
                <dt className="mono-label flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-ocean" aria-hidden />
                  {t.work.period}
                </dt>
                <dd className="mt-1 font-medium text-ink">{copy.period}</dd>
              </div>
              <div className="rounded-2xl border border-line bg-surface p-4">
                <dt className="mono-label flex items-center gap-1.5">
                  <Layers className="h-3.5 w-3.5 text-ocean" aria-hidden />
                  {t.work.context}
                </dt>
                <dd className="mt-1 font-medium text-ink">{copy.context}</dd>
              </div>
            </dl>

            <section>
              <h3 className="mono-label mb-3">{t.work.overview}</h3>
              <p className="text-[0.98rem] leading-[1.85] text-ink-2">{copy.overview}</p>
            </section>

            <section>
              <h3 className="mono-label mb-4">{copy.highlightsTitle ?? t.work.built}</h3>
              <ul className="grid gap-3">
                {copy.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-[0.92rem] leading-[1.7] text-dim">
                    <span className="mt-[0.3em] grid h-5 w-5 shrink-0 place-items-center rounded-md bg-[image:var(--btn-grad)] text-white">
                      <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="mono-label mb-3">{t.work.stack}</h3>
              <ul className="flex flex-wrap gap-1.5">
                {meta.stack.map((s) => (
                  <li key={s} className="tag">
                    {s}
                  </li>
                ))}
              </ul>
            </section>

            {copy.note && (
              <p className="flex gap-2.5 rounded-2xl border border-line bg-surface p-4 text-[0.86rem] leading-relaxed text-dim">
                <Lock className="mt-0.5 h-4 w-4 shrink-0 text-sand" aria-hidden />
                {copy.note}
              </p>
            )}

            <div className="flex flex-wrap gap-3 border-t border-line pt-6">
              {meta.demo && (
                <a href={meta.demo} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                  <span className="ping h-2 w-2" aria-hidden />
                  {t.work.live}
                  <ArrowUpRight aria-hidden className="rtl:-scale-x-100" />
                </a>
              )}
              {meta.repo && (
                <a
                  href={meta.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={meta.demo ? "btn btn-ghost btn-sm" : "btn btn-primary btn-sm"}
                >
                  <Github aria-hidden />
                  {t.work.viewRepo}
                </a>
              )}
              <button type="button" onClick={onClose} className="btn btn-ghost btn-sm">
                {t.work.close}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
