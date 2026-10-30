"use client"

import { Cpu, Database, Globe2, MapPin, Smartphone } from "lucide-react"
import { useEffect, useState } from "react"
import { marquee, site } from "@/content/site"
import { cn } from "@/lib/utils"
import { useI18n } from "./i18n"
import { CountUp, CropMarks, Reveal, Rich, SectionHeading } from "./primitives"

export function Marquee() {
  return (
    <div aria-hidden className="marquee relative z-[2] overflow-hidden border-y border-line bg-surface py-6">
      <div className="marquee-track flex w-max">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center gap-10 pe-10">
            {marquee.map((word, i) => (
              <li key={word} className="flex items-center gap-10 whitespace-nowrap">
                <span
                  dir="ltr"
                  className={cn(
                    i % 2 ? "font-serif text-[1.85rem] italic text-ink-2" : "font-sans text-[1.5rem] font-semibold tracking-[-0.03em] text-ink",
                  )}
                >
                  {word}
                </span>
                <span className="h-1.5 w-1.5 rotate-45 bg-ocean" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}

function MakkahClock() {
  const { lang } = useI18n()
  const [time, setTime] = useState("--:--")
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat(lang === "ar" ? "ar-SA-u-nu-latn" : "en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: site.timeZone,
    })
    const update = () => setTime(fmt.format(new Date()))
    update()
    const id = window.setInterval(update, 15_000)
    return () => window.clearInterval(id)
  }, [lang])
  return (
    <time dir="ltr" className="font-mono text-[2.4rem] font-medium leading-none tracking-[-0.04em] text-ink tabular-nums">
      {time}
    </time>
  )
}

const focusIcons = [Globe2, Smartphone, Database, Cpu]

export function About() {
  const { t } = useI18n()
  const a = t.about

  return (
    <section id="about" className="relative py-28 md:py-36">
      <div className="wrap">
        <SectionHeading index="01" eyebrow={a.eyebrow} title={a.title} />

        <div className="relative grid grid-cols-12 gap-4">
          <CropMarks />
          <Reveal className="panel spot col-span-12 flex flex-col justify-between gap-10 p-8 md:p-10 lg:col-span-7 lg:row-span-3">
            <div className="space-y-5 text-[1.04rem] leading-[1.85] text-ink-2">
              {a.paragraphs.map((p, i) => (
                <p key={i} className={cn(i > 0 && "text-dim")}>
                  <Rich text={p} accent="text-ink font-medium" />
                </p>
              ))}
            </div>
            <div className="flex items-end justify-between gap-4">
              <span className="serif-em text-grad text-[2rem] leading-none">{a.signature}</span>
              <span className="mono-label keep-mono font-mono">B.Eng · CE · 2025</span>
            </div>
          </Reveal>

          {a.stats.map((s, i) => (
            <Reveal key={s.label} delay={0.08 * (i + 1)} className="panel spot col-span-12 flex items-center gap-6 p-7 sm:col-span-4 lg:col-span-5">
              <span dir="ltr" className="display text-grad min-w-[2.2ch] shrink-0 text-[clamp(3rem,5vw,3.8rem)] font-semibold leading-none tracking-[-0.05em]">
                <CountUp to={s.value} />
                {s.suffix}
              </span>
              <div>
                <p className="font-semibold text-ink">{s.label}</p>
                <p className="mt-1 text-[0.84rem] leading-relaxed text-dim">{s.sub}</p>
              </div>
            </Reveal>
          ))}

          <Reveal className="panel spot col-span-12 p-7 md:p-8 lg:col-span-8">
            <p className="mono-label mb-6">{a.focusTitle}</p>
            <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {a.focus.map((f, i) => {
                const Icon = focusIcons[i]
                return (
                  <li key={f.title} className="flex gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-line bg-[image:var(--grad-soft)] text-ocean">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <div>
                      <p className="font-semibold text-ink">{f.title}</p>
                      <p className="mt-0.5 text-[0.86rem] leading-relaxed text-dim">{f.body}</p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="panel spot col-span-12 flex flex-col justify-between gap-8 overflow-hidden p-7 md:p-8 lg:col-span-4">
            <div aria-hidden className="pointer-events-none absolute -end-10 -top-10 h-44 w-44 rounded-full border border-line" />
            <div aria-hidden className="pointer-events-none absolute -end-2 -top-2 h-28 w-28 rounded-full border border-line" />
            <div>
              <p className="mono-label flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-ocean" aria-hidden />
                {a.basedIn}
              </p>
              <p className="mt-2 text-lg font-semibold text-ink">{a.city}</p>
              <p className="mono-label keep-mono mt-1 font-mono">{site.coords}</p>
            </div>
            <div>
              <p className="mono-label mb-2">{a.localTime}</p>
              <MakkahClock />
              <p className="mono-label keep-mono mt-2 font-mono">UTC+3 · AST</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
