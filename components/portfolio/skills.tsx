"use client"

import { AnimatePresence, motion } from "motion/react"
import { ArrowUpRight, Bot, Boxes, Braces, ClipboardCheck, Cpu, Database, LayoutTemplate, Server, ShieldCheck, Smartphone, Wrench } from "lucide-react"
import { useRef, useState } from "react"
import { projectById, skillProjects } from "@/content/projects"
import type { SkillCategoryId } from "@/content/types"
import { cn } from "@/lib/utils"
import { useI18n } from "./i18n"
import { EASE, Reveal, SectionHeading } from "./primitives"
import { useProjectModal } from "./project-modal"
import { projectIcons } from "./work"

const categoryIcons: Record<SkillCategoryId, typeof Cpu> = {
  languages: Braces,
  backend: Server,
  frontend: LayoutTemplate,
  mobile: Smartphone,
  data: Database,
  governance: ClipboardCheck,
  security: ShieldCheck,
  systems: Cpu,
  tools: Wrench,
  ai: Bot,
  practice: Boxes,
}

export function Skills() {
  const { t, dir } = useI18n()
  const { open } = useProjectModal()
  const s = t.skills
  const [active, setActive] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const cat = s.categories[active]
  const Icon = categoryIcons[cat.id]
  const applied = skillProjects[cat.id]

  function onKeyDown(e: React.KeyboardEvent) {
    const n = s.categories.length
    const forward = dir === "rtl" ? "ArrowLeft" : "ArrowRight"
    const back = dir === "rtl" ? "ArrowRight" : "ArrowLeft"
    let next = -1
    if (e.key === "ArrowDown" || e.key === forward) next = (active + 1) % n
    else if (e.key === "ArrowUp" || e.key === back) next = (active - 1 + n) % n
    else if (e.key === "Home") next = 0
    else if (e.key === "End") next = n - 1
    if (next < 0) return
    e.preventDefault()
    setActive(next)
    tabs.current[next]?.focus()
  }

  return (
    <section id="skills" className="relative py-28 md:py-36">
      <div className="wrap">
        <SectionHeading index="04" eyebrow={s.eyebrow} title={s.title} lede={s.lede} />

        <Reveal className="grid gap-4 lg:grid-cols-[minmax(250px,320px)_1fr]">
          <div
            role="tablist"
            aria-orientation="vertical"
            aria-label={s.eyebrow}
            onKeyDown={onKeyDown}
            className="panel flex gap-1 overflow-x-auto p-2 [scrollbar-width:none] lg:flex-col lg:overflow-visible"
          >
            {s.categories.map((c, i) => {
              const selected = i === active
              return (
                <button
                  key={c.id}
                  ref={(el) => {
                    tabs.current[i] = el
                  }}
                  role="tab"
                  id={`skill-tab-${c.id}`}
                  aria-selected={selected}
                  aria-controls="skill-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  className={cn(
                    "relative isolate flex shrink-0 items-center gap-3 rounded-2xl px-3.5 py-3 text-start text-[0.88rem] font-medium transition-colors",
                    selected ? "text-ink" : "text-dim hover:text-ink",
                  )}
                >
                  {selected && (
                    <motion.span
                      layoutId="skill-active"
                      className="absolute inset-0 -z-10 rounded-2xl border border-line-2 bg-surface-3"
                      transition={{ type: "spring", stiffness: 400, damping: 34 }}
                    />
                  )}
                  <span className="font-mono text-[0.66rem] text-dim">{String(i + 1).padStart(2, "0")}</span>
                  <span className="whitespace-nowrap">{c.label}</span>
                  <span
                    aria-hidden
                    className={cn(
                      "ms-auto hidden h-1.5 w-1.5 rounded-full transition-all duration-500 lg:block",
                      selected ? "bg-ocean shadow-[0_0_10px_rgb(var(--signal))]" : "bg-line-2",
                    )}
                  />
                </button>
              )
            })}
          </div>

          <div
            role="tabpanel"
            id="skill-panel"
            aria-labelledby={`skill-tab-${cat.id}`}
            className="panel spot relative min-h-[360px] overflow-hidden p-7 md:p-10"
          >
            <div aria-hidden className="pointer-events-none absolute -end-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgb(var(--signal)/0.14),transparent_65%)]" />
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="relative"
              >
                <div className="flex items-start gap-4">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-[image:var(--btn-grad)] text-white shadow-[var(--glow)]">
                    <Icon className="h-6 w-6" aria-hidden />
                  </span>
                  <div>
                    <h3 className="display text-[1.7rem] font-semibold leading-tight text-ink">{cat.label}</h3>
                    <p className="mt-1 text-[0.95rem] text-dim">{cat.blurb}</p>
                  </div>
                </div>

                <ul className="mt-8 flex flex-wrap gap-2.5">
                  {cat.items.map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.04 * i, duration: 0.4, ease: EASE }}
                      className="group flex items-center gap-2.5 rounded-xl border border-line bg-surface-2 px-4 py-2.5 text-[0.92rem] font-medium text-ink transition-colors hover:border-ocean"
                    >
                      <span
                        aria-hidden
                        className="h-2 w-2 rounded-full bg-[image:var(--grad)] shadow-[0_0_0_3px_rgb(var(--signal)/0.12)] transition-shadow group-hover:shadow-[0_0_0_4px_rgb(var(--signal)/0.25),0_0_12px_rgb(var(--signal))]"
                      />
                      <bdi>{item}</bdi>
                    </motion.li>
                  ))}
                </ul>

                <div className="mt-10 border-t border-dashed border-line-2 pt-6">
                  <p className="mono-label mb-3">{s.appliedIn}</p>
                  {applied.length ? (
                    <ul className="flex flex-wrap gap-2">
                      {applied.map((pid) => {
                        const PIcon = projectIcons[projectById[pid].icon]
                        return (
                          <li key={pid}>
                            <button
                              type="button"
                              onClick={() => open(pid)}
                              className="chip cursor-pointer py-2 pe-3 ps-2.5 text-[0.8rem] transition-colors hover:border-ocean hover:text-ink"
                            >
                              <PIcon className="h-3.5 w-3.5 text-ocean" aria-hidden />
                              {t.work.items[pid].title}
                              <ArrowUpRight className="h-3.5 w-3.5 text-dim rtl:-scale-x-100" aria-hidden />
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                  ) : (
                    <p className="text-[0.88rem] text-dim">{s.noProjects}</p>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>

        <div className="mt-4 grid gap-4 md:grid-cols-[1.4fr_1fr]">
          <Reveal className="panel spot p-7 md:p-8">
            <p className="mono-label mb-5">{s.softTitle}</p>
            <ul className="flex flex-wrap gap-2">
              {s.soft.map((x) => (
                <li key={x} className="chip px-3.5 py-2 text-[0.84rem]">
                  {x}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.08} className="panel spot p-7 md:p-8">
            <p className="mono-label mb-5">{s.spokenTitle}</p>
            <ul className="grid gap-4">
              {s.spoken.map((l) => (
                <li key={l.name}>
                  <div className="flex items-baseline justify-between">
                    <span className="font-semibold text-ink">{l.name}</span>
                    <span className="text-[0.8rem] text-dim">{l.level}</span>
                  </div>
                  <span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-surface-3">
                    <motion.span
                      className="block h-full origin-left rounded-full bg-[image:var(--grad)] rtl:origin-right"
                      style={{ width: `${l.value}%` }}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.4, ease: EASE }}
                    />
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
