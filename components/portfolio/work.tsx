"use client"

import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BookOpen,
  Coffee,
  Fish,
  Github,
  Hourglass,
  ListChecks,
  Lock,
  Nfc,
  Radar,
  ShoppingBag,
  Smartphone,
  Stethoscope,
} from "lucide-react"
import { projects, type ProjectIcon, type ProjectMeta } from "@/content/projects"
import { cn } from "@/lib/utils"
import { useI18n } from "./i18n"
import { Reveal, SectionHeading } from "./primitives"
import { useProjectModal } from "./project-modal"
import { ProjectStageVisual } from "./project-visuals"

export const projectIcons: Record<ProjectIcon, typeof Nfc> = {
  nfc: Nfc,
  bag: ShoppingBag,
  radar: Radar,
  stethoscope: Stethoscope,
  phone: Smartphone,
  award: Award,
  hourglass: Hourglass,
  checks: ListChecks,
  fish: Fish,
  coffee: Coffee,
}

function accentStyle(meta: ProjectMeta) {
  return { "--c1": meta.accent[0], "--c2": meta.accent[1] } as React.CSSProperties
}

function FeaturedCase({ meta, reverse }: { meta: ProjectMeta; reverse: boolean }) {
  const { t } = useI18n()
  const { open } = useProjectModal()
  const copy = t.work.items[meta.id]
  const Icon = projectIcons[meta.icon]
  const openLabel = `${t.work.caseStudy}: ${copy.title}`

  return (
    <Reveal
      as="article"
      style={accentStyle(meta)}
      className={cn(
        "case panel spot grid overflow-hidden rounded-[2rem] hover:shadow-[0_40px_100px_-40px_color-mix(in_srgb,var(--c1)_55%,transparent)]",
        reverse ? "lg:grid-cols-[1fr_1.08fr]" : "lg:grid-cols-[1.08fr_1fr]",
      )}
    >
      <div className={cn("stage relative grid min-h-[340px] place-items-center overflow-hidden p-6 sm:min-h-[420px] sm:p-10", reverse && "lg:order-2")}>
        <span
          aria-hidden
          className="ghost-word display pointer-events-none absolute -bottom-[0.18em] end-[0.08em] text-[clamp(5rem,13vw,9.5rem)] font-bold leading-none tracking-[-0.06em]"
        >
          {meta.ghost}
        </span>
        <span className="mono-label absolute start-5 top-5 z-[2] rounded-full border border-line bg-bg/60 px-2.5 py-1 text-[0.6rem] backdrop-blur">
          {meta.visual === "hajj" ? t.work.illustration : t.work.screenshots}
        </span>
        <button type="button" onClick={() => open(meta.id)} aria-label={openLabel} className="relative z-[1] w-full cursor-zoom-in rounded-2xl">
          <ProjectStageVisual meta={meta} alts={copy.shots ?? []} />
        </button>
      </div>

      <div className="flex flex-col p-7 sm:p-10">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="chip border-[color-mix(in_srgb,var(--ocean)_35%,transparent)] bg-[color-mix(in_srgb,var(--ocean)_10%,transparent)] font-semibold text-ocean">
            <Icon className="h-3.5 w-3.5" aria-hidden />
            {copy.kind}
          </span>
          <span className="font-mono text-[0.72rem] text-dim rtl:font-arabic rtl:text-[0.8rem]">{copy.period}</span>
        </div>

        <h3 className="display mt-5 text-[clamp(2rem,4vw,2.9rem)] font-semibold leading-[1.04] text-ink rtl:leading-[1.25]">{copy.title}</h3>
        <p className="serif-em text-grad mt-2.5 text-[1.18rem] leading-snug">{copy.tagline}</p>
        <p className="mt-4 text-[0.95rem] leading-[1.8] text-dim">{copy.summary}</p>
        <p className="mono-label mt-3">{copy.context}</p>

        {copy.metrics && (
          <dl className="mt-6 grid grid-cols-3 gap-2">
            {copy.metrics.map((m) => (
              <div key={m.label} className="rounded-2xl border border-line bg-surface-2 p-3">
                <dt className="sr-only">{m.label}</dt>
                <dd className="display text-grad text-[1.45rem] font-semibold leading-tight">
                  <bdi>{m.value}</bdi>
                </dd>
                <dd className="mt-1 text-[0.7rem] leading-snug text-dim">{m.label}</dd>
              </div>
            ))}
          </dl>
        )}

        <ul className="mt-6 flex flex-wrap gap-1.5">
          {meta.stack.map((s) => (
            <li key={s} className="tag">
              {s}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap items-center gap-2.5 lg:mt-auto lg:pt-8">
          {meta.demo && (
            <a href={meta.demo} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
              <span className="ping h-2 w-2" aria-hidden />
              {t.work.live}
              <ArrowUpRight aria-hidden className="rtl:-scale-x-100" />
            </a>
          )}
          <button type="button" onClick={() => open(meta.id)} className={cn("btn btn-sm", meta.demo ? "btn-ghost" : "btn-primary")}>
            <BookOpen aria-hidden />
            {t.work.caseStudy}
          </button>
          {meta.repo && (
            <a href={meta.repo} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
              <Github aria-hidden />
              {t.work.code}
              <ArrowUpRight aria-hidden className="rtl:-scale-x-100" />
            </a>
          )}
          {!meta.repo && !meta.demo && (
            <span className="chip h-10 px-3.5 text-dim">
              <Lock className="h-3.5 w-3.5 text-sand" aria-hidden />
              {t.work.internal}
            </span>
          )}
        </div>
      </div>
    </Reveal>
  )
}

function ProjectCard({ meta, index }: { meta: ProjectMeta; index: number }) {
  const { t } = useI18n()
  const { open } = useProjectModal()
  const copy = t.work.items[meta.id]
  const Icon = projectIcons[meta.icon]

  return (
    <Reveal as="li" delay={(index % 3) * 0.08} className="h-full">
      <div
        style={accentStyle(meta)}
        className="panel spot group flex h-full flex-col p-6 hover:-translate-y-1.5 hover:shadow-[var(--glow)] md:p-7"
      >
        <div className="flex items-center justify-between">
          <span className="grid h-12 w-12 place-items-center rounded-2xl border border-line bg-[image:var(--grad-soft)] text-ocean transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105">
            <Icon className="h-5 w-5" aria-hidden />
          </span>
          <span className="font-mono text-[0.72rem] text-dim">{meta.year}</span>
        </div>
        <p className="mono-label mt-6 !text-ocean">{copy.kind}</p>
        <h3 className="mt-1.5 text-[1.18rem] font-semibold leading-snug tracking-[-0.015em] text-ink">{copy.title}</h3>
        <p className="mt-2.5 flex-1 text-[0.88rem] leading-[1.75] text-dim">{copy.summary}</p>
        <ul className="mt-5 flex flex-wrap gap-1.5">
          {meta.stack.slice(0, 4).map((s) => (
            <li key={s} className="tag">
              {s}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex items-center gap-4 border-t border-line pt-4">
          <button
            type="button"
            onClick={() => open(meta.id)}
            className="inline-flex items-center gap-1.5 text-[0.84rem] font-semibold text-ink transition-colors hover:text-ocean"
          >
            {t.work.details}
            <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" />
          </button>
          {meta.repo && (
            <a
              href={meta.repo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${copy.title} — ${t.work.viewRepo}`}
              className="ms-auto inline-flex items-center gap-1.5 text-[0.8rem] text-dim transition-colors hover:text-ink"
            >
              <Github className="h-4 w-4" aria-hidden />
              {t.work.code}
            </a>
          )}
        </div>
      </div>
    </Reveal>
  )
}

export function Work() {
  const { t } = useI18n()
  const featured = projects.filter((p) => p.featured)
  const rest = projects.filter((p) => !p.featured)

  return (
    <section id="work" className="relative py-28 md:py-36">
      <div className="wrap">
        <SectionHeading index="03" eyebrow={t.work.eyebrow} title={t.work.title} lede={t.work.lede} />
        <div className="grid gap-6 md:gap-8">
          {featured.map((p, i) => (
            <FeaturedCase key={p.id} meta={p} reverse={i % 2 === 1} />
          ))}
        </div>

        <div className="mt-28 md:mt-36">
          <SectionHeading index="03.1" eyebrow={t.work.moreEyebrow} title={t.work.moreTitle} lede={t.work.moreLede} compact />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((p, i) => (
              <ProjectCard key={p.id} meta={p} index={i} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
