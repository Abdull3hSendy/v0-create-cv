"use client"

import { BadgeCheck, GraduationCap } from "lucide-react"
import { useI18n } from "./i18n"
import { CropMarks, Reveal, SectionHeading } from "./primitives"

export function Education() {
  const { t } = useI18n()
  const e = t.education

  return (
    <section id="education" className="relative py-28 md:py-36">
      <div className="wrap">
        <SectionHeading index="05" eyebrow={e.eyebrow} title={e.title} />

        <div className="relative grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <CropMarks />
          <Reveal className="panel spot relative flex flex-col overflow-hidden p-8 md:p-10 lg:sticky lg:top-28 lg:min-h-[22rem] lg:self-start">
            <span
              aria-hidden
              className="display pointer-events-none absolute -bottom-6 end-4 select-none font-mono text-[7rem] font-bold leading-none tracking-[-0.06em] text-transparent [-webkit-text-stroke:1px_var(--line-2)]"
            >
              ’25
            </span>
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[image:var(--btn-grad)] text-white shadow-[var(--glow)]">
              <GraduationCap className="h-6 w-6" aria-hidden />
            </span>
            <h3 className="display mt-7 text-[clamp(1.6rem,3vw,2.1rem)] font-semibold leading-tight text-ink">{e.degree}</h3>
            <p className="mt-2 text-[1.02rem] font-medium text-ocean">{e.school}</p>
            <p className="mt-1 font-mono text-[0.78rem] text-dim rtl:font-arabic rtl:text-[0.85rem]">
              {e.period} · {e.place}
            </p>
          </Reveal>

          <Reveal delay={0.08} className="panel p-3 md:p-4">
            <p className="mono-label px-4 pb-2 pt-4 md:px-5">
              {e.certsTitle} · <span className="keep-mono font-mono">{String(e.certs.length).padStart(2, "0")}</span>
            </p>
            <ol className="grid">
              {e.certs.map((c, i) => (
                <li key={c.name} className="group relative rounded-2xl px-4 py-4 transition-colors hover:bg-surface-2 md:px-5">
                  <div className="flex items-start gap-4">
                    <span className="mt-0.5 font-mono text-[0.68rem] text-dim">{String(i + 1).padStart(2, "0")}</span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <p className="font-semibold leading-snug text-ink">{c.name}</p>
                        <span className="whitespace-nowrap font-mono text-[0.7rem] text-dim rtl:font-arabic rtl:text-[0.78rem]">{c.date}</span>
                      </div>
                      <p className="mt-1 flex items-center gap-1.5 text-[0.82rem] text-ocean">
                        <BadgeCheck className="h-3.5 w-3.5" aria-hidden />
                        {c.issuer}
                      </p>
                      {c.note && <p className="mt-1.5 text-[0.84rem] leading-relaxed text-dim">{c.note}</p>}
                    </div>
                  </div>
                  {i < e.certs.length - 1 && <span aria-hidden className="absolute inset-x-5 bottom-0 h-px bg-line group-hover:opacity-0" />}
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
