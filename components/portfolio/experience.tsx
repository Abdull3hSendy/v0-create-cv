"use client"

import { AnimatePresence, motion, useInView, useScroll, useSpring } from "motion/react"
import { Briefcase, ChevronDown } from "lucide-react"
import { useRef, useState } from "react"
import type { Job } from "@/content/types"
import { cn } from "@/lib/utils"
import { useI18n } from "./i18n"
import { EASE, Reveal, SectionHeading } from "./primitives"

const VISIBLE = 5

function JobCard({ job, index }: { job: Job; index: number }) {
  const { t } = useI18n()
  const ref = useRef<HTMLLIElement>(null)
  const reached = useInView(ref, { margin: "0px 0px -45% 0px" })
  const [expanded, setExpanded] = useState(false)
  const hidden = job.items.slice(VISIBLE)
  const listId = `job-${index}-more`

  return (
    <li ref={ref} className="relative ps-10 md:ps-16">
      <span
        aria-hidden
        className={cn(
          "absolute start-[7px] top-9 z-[1] grid h-[18px] w-[18px] place-items-center rounded-full border-2 bg-bg transition-[border-color,box-shadow] duration-700 md:start-[23px]",
          reached ? "border-ocean shadow-[0_0_0_6px_rgb(var(--signal)/0.14),0_0_24px_rgb(var(--signal)/0.6)]" : "border-line-2",
        )}
      >
        <span className={cn("h-1.5 w-1.5 rounded-full transition-colors duration-700", reached ? "bg-ocean" : "bg-transparent")} />
      </span>

      <Reveal as="article" className={cn("panel spot p-6 md:p-8", job.current && "bg-[image:var(--grad-soft)] border-line-2")}>
        <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-3">
          <div>
            {/* With several roles at one employer, the employer leads and the roles follow as a ladder. */}
            <h3 className="text-[1.2rem] font-semibold leading-snug tracking-[-0.015em] text-ink md:text-[1.35rem]">
              {job.steps ? job.org : job.role}
            </h3>
            <p className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.92rem]">
              {!job.steps && (
                <>
                  <span className="font-medium text-ocean">{job.org}</span>
                  <span aria-hidden className="text-line-2">/</span>
                </>
              )}
              <span className="text-dim">{job.team}</span>
            </p>
          </div>
          <span
            className={cn(
              "chip font-mono text-[0.7rem] rtl:font-arabic rtl:text-[0.78rem]",
              job.current && "border-[rgb(74_222_128/0.35)] bg-[rgb(74_222_128/0.1)] text-[#3fbf72] dark:text-[#6fe39a]",
            )}
          >
            {job.current && <span className="ping h-1.5 w-1.5" aria-hidden />}
            {job.period}
          </span>
        </div>

        {job.steps && (
          <ol className="relative mt-6 grid gap-3.5 ps-6">
            <span aria-hidden className="absolute bottom-2 start-[5px] top-2 w-px bg-line-2" />
            {job.steps.map((step) => (
              <li key={step.role} className="relative">
                <span
                  aria-hidden
                  className={cn(
                    "absolute -start-6 top-[0.42em] h-[11px] w-[11px] rounded-full border-2 bg-bg",
                    step.current ? "border-ocean shadow-[0_0_0_4px_rgb(var(--signal)/0.15)]" : "border-dim",
                  )}
                />
                <p className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
                  <span className={cn("font-semibold", step.current ? "text-[1.05rem] text-ink" : "text-ink-2")}>{step.role}</span>
                  <span className="font-mono text-[0.72rem] text-dim rtl:font-arabic rtl:text-[0.8rem]">{step.period}</span>
                </p>
              </li>
            ))}
          </ol>
        )}

        {job.badge && (
          <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--sand)_35%,transparent)] bg-[color-mix(in_srgb,var(--sand)_10%,transparent)] px-3 py-1 text-[0.74rem] font-semibold text-sand">
            <Briefcase className="h-3.5 w-3.5" aria-hidden />
            {job.badge}
          </p>
        )}

        {job.itemsTitle && <p className="mono-label mt-6">{job.itemsTitle}</p>}

        <ul className={cn("grid gap-2.5", job.itemsTitle ? "mt-3" : "mt-5")}>
          {job.items.slice(0, VISIBLE).map((it) => (
            <Bullet key={it} text={it} />
          ))}
        </ul>
        <AnimatePresence initial={false}>
          {expanded && hidden.length > 0 && (
            <motion.ul
              id={listId}
              key="more"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="grid gap-2.5 overflow-hidden"
            >
              {hidden.map((it, i) => (
                <Bullet key={it} text={it} className={cn(i === 0 && "mt-2.5")} />
              ))}
            </motion.ul>
          )}
        </AnimatePresence>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <ul className="flex flex-wrap gap-1.5" aria-label="Tools">
            {job.tags.map((tag) => (
              <li key={tag} className="tag">
                {tag}
              </li>
            ))}
          </ul>
          {hidden.length > 0 && (
            <button
              type="button"
              aria-expanded={expanded}
              aria-controls={listId}
              onClick={() => setExpanded((e) => !e)}
              className="inline-flex items-center gap-1.5 rounded-full px-1 text-[0.8rem] font-semibold text-ocean transition-opacity hover:opacity-80"
            >
              {expanded ? t.experience.showLess : t.experience.showAll.replace("{n}", String(job.items.length))}
              <ChevronDown className={cn("h-4 w-4 transition-transform duration-500", expanded && "rotate-180")} aria-hidden />
            </button>
          )}
        </div>
      </Reveal>
    </li>
  )
}

function Bullet({ text, className }: { text: string; className?: string }) {
  return (
    <li className={cn("relative ps-5 text-[0.92rem] leading-[1.7] text-dim", className)}>
      <span aria-hidden className="absolute start-0 top-[0.62em] h-1.5 w-1.5 rotate-45 rounded-[1px] bg-[image:var(--grad)]" />
      {text}
    </li>
  )
}

export function Experience() {
  const { t } = useI18n()
  const ref = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] })
  const beam = useSpring(scrollYProgress, { stiffness: 90, damping: 24, restDelta: 0.001 })

  return (
    <section id="experience" className="relative py-28 md:py-36">
      <div className="wrap">
        <SectionHeading index="02" eyebrow={t.experience.eyebrow} title={t.experience.title} />
        <ol ref={ref} className="relative grid gap-6">
          <span aria-hidden className="absolute bottom-6 start-4 top-9 w-px bg-line md:start-8" />
          <motion.span
            aria-hidden
            style={{ scaleY: beam }}
            className="absolute bottom-6 start-4 top-9 w-px origin-top bg-[image:linear-gradient(to_bottom,var(--olive),var(--ocean))] shadow-[0_0_14px_rgb(var(--signal)/0.7)] md:start-8"
          />
          {t.experience.jobs.map((job, i) => (
            <JobCard key={job.org} job={job} index={i} />
          ))}
        </ol>
      </div>
    </section>
  )
}
