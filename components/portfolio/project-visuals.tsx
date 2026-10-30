"use client"

// Visuals for the featured projects: a coded illustration for the Hajj system (it has
// no public screens), real screenshots in browser windows, and a screenshot carousel.

import { motion, useInView, useReducedMotion } from "motion/react"
import { Check, ChevronLeft, ChevronRight, Nfc } from "lucide-react"
import { useEffect, useId, useRef, useState } from "react"
import type { ProjectMeta } from "@/content/projects"
import { cn, withBase } from "@/lib/utils"
import { useI18n } from "./i18n"
import { EASE } from "./primitives"

function useLoop(steps: number[], fallback: number) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: "-10% 0px" })
  const reduce = useReducedMotion()
  // Always start at 0 so server and client render the same frame; the effect jumps to the static frame.
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (reduce) {
      setStep(fallback)
      return
    }
    if (!inView) return
    const id = window.setTimeout(() => setStep((s) => (s + 1) % steps.length), steps[step])
    return () => window.clearTimeout(id)
  }, [step, inView, reduce, steps, fallback])

  return { ref, step }
}

/**
 * Lays a visual out at its design size and scales it down to the available width,
 * so the miniature UI shrinks as a unit on phones instead of reflowing.
 */
function Fit({ width, ratio, children }: { width: number; ratio: number; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new ResizeObserver(([entry]) => setScale(Math.min(1, entry.contentRect.width / width)))
    observer.observe(el)
    return () => observer.disconnect()
  }, [width])

  return (
    <div ref={ref} className="relative mx-auto w-full" style={{ maxWidth: width, aspectRatio: ratio }}>
      <div className="absolute left-0 top-0 origin-top-left" style={{ width, height: width / ratio, transform: `scale(${scale})` }}>
        {children}
      </div>
    </div>
  )
}

function Bar({ url }: { url: string }) {
  return (
    <div className="flex h-[22px] items-center gap-[5px] bg-[#161a13] px-2.5">
      <i className="h-[7px] w-[7px] rounded-full bg-[#e5675e]" />
      <i className="h-[7px] w-[7px] rounded-full bg-[#e2b84f]" />
      <i className="h-[7px] w-[7px] rounded-full bg-[#7fae5a]" />
      <span className="mx-auto max-w-[70%] truncate rounded bg-white/[0.08] px-2.5 py-px font-mono text-[8px] text-white/55">{url}</span>
    </div>
  )
}

/**
 * A smooth silicone NFC wristband seen in three-quarter view: the inner surface shows
 * through the opening, the two ends overlap at a seam, and the label is engraved
 * along the curve of the outer wall.
 */
function Wristband({ lit }: { lit: boolean }) {
  const id = useId().replace(/:/g, "")
  const cx = 120
  const top = 50 // centre of the top rim ellipse
  const bottom = 102 // centre of the bottom edge ellipse (band height = 52)
  const [rxo, ryo] = [112, 34] // outer surface
  const [rxi, ryi] = [102, 28] // inner surface

  const innerWall = `M ${cx - rxi} ${top} A ${rxi} ${ryi} 0 0 1 ${cx + rxi} ${top} L ${cx + rxi} ${bottom} A ${rxi} ${ryi} 0 0 0 ${cx - rxi} ${bottom} Z`
  const frontWall = `M ${cx - rxo} ${top} A ${rxo} ${ryo} 0 0 0 ${cx + rxo} ${top} L ${cx + rxo} ${bottom} A ${rxo} ${ryo} 0 0 1 ${cx - rxo} ${bottom} Z`
  const rim =
    `M ${cx - rxo} ${top} A ${rxo} ${ryo} 0 1 1 ${cx + rxo} ${top} A ${rxo} ${ryo} 0 1 1 ${cx - rxo} ${top} Z ` +
    `M ${cx - rxi} ${top + 1} A ${rxi} ${ryi} 0 1 0 ${cx + rxi} ${top + 1} A ${rxi} ${ryi} 0 1 0 ${cx - rxi} ${top + 1} Z`
  const mid = (top + bottom) / 2
  const labelPath = `M ${cx - rxo} ${mid} A ${rxo} ${ryo} 0 0 0 ${cx + rxo} ${mid}`

  return (
    <svg viewBox="0 0 240 150" width="240" height="150" aria-hidden className="overflow-visible">
      <defs>
        <linearGradient id={`${id}-front`} x1="0" x2="1">
          <stop offset="0" stopColor="#6c6d69" />
          <stop offset="0.2" stopColor="#8e8f8a" />
          <stop offset="0.5" stopColor="#a9aaa5" />
          <stop offset="0.82" stopColor="#959690" />
          <stop offset="1" stopColor="#686965" />
        </linearGradient>
        <linearGradient id={`${id}-shade`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.2" />
          <stop offset="0.45" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id={`${id}-rim`} x1="0" x2="1">
          <stop offset="0" stopColor="#a3a39f" />
          <stop offset="0.5" stopColor="#c9c9c4" />
          <stop offset="1" stopColor="#9d9d99" />
        </linearGradient>
        <linearGradient id={`${id}-inner`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#f3f1eb" />
          <stop offset="1" stopColor="#c7c4bb" />
        </linearGradient>
        <radialGradient id={`${id}-shadow`}>
          <stop offset="0" stopColor="#000" stopOpacity="0.55" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx={cx} cy={bottom + 34} rx={118} ry={14} fill={`url(#${id}-shadow)`} />
      <path d={innerWall} fill={`url(#${id}-inner)`} />
      <path d={frontWall} fill={`url(#${id}-front)`} />
      <path d={frontWall} fill={`url(#${id}-shade)`} />
      <path d={rim} fill={`url(#${id}-rim)`} fillRule="evenodd" />

      {/* Where the two ends of the band overlap. */}
      <path d="M 53 77 C 51.5 95, 51.5 112, 53 129" fill="none" stroke="#000" strokeOpacity="0.35" strokeWidth="1.3" />
      <path d="M 55 77.5 C 53.6 95, 53.6 112, 55 128.5" fill="none" stroke="#fff" strokeOpacity="0.22" strokeWidth="1" />

      <path id={`${id}-label`} d={labelPath} fill="none" />
      <text fontFamily="ui-sans-serif, system-ui, sans-serif" fontSize="11" fontWeight="600" letterSpacing="1.6" fill="#3d3e3a" fillOpacity="0.85">
        <textPath href={`#${id}-label`} startOffset="66%" textAnchor="middle">
          HAJJ ID
        </textPath>
      </text>

      <circle cx={92} cy={105} r={7} fill="#6fe39a" opacity={lit ? 0.4 : 0} style={{ transition: "opacity .5s" }} />
      <circle cx={92} cy={105} r={2.4} fill={lit ? "#6fe39a" : "#55564f"} style={{ transition: "fill .5s" }} />
    </svg>
  )
}

const HAJJ_STEPS = [1500, 1400, 2200]

/** Pilgrim taps an NFC wristband on the Raspberry Pi reader at the bus door. */
function HajjVisual() {
  const { ref, step } = useLoop(HAJJ_STEPS, 2)
  const status = ["waiting for wristband…", "reading NFC tag…", "permit verified"][step]

  return (
    <Fit width={540} ratio={4 / 3.1}>
      <div ref={ref} dir="ltr" className="relative h-full w-full select-none text-left">
        <div className="absolute right-[3%] top-[6%] h-[88%] w-[47%] rounded-[22px] border border-white/10 bg-[#10150f] p-[5%] shadow-[0_40px_80px_-30px_rgb(0_0_0/0.85)]">
          <div className="flex items-center justify-between font-mono text-[9px] text-white/40">
            <span>rpi · boarding-gate</span>
            <span
              className={cn(
                "h-2 w-2 rounded-full transition-all duration-500",
                step === 2 ? "bg-[#6fe39a] shadow-[0_0_10px_#6fe39a]" : step === 1 ? "bg-[#52b8de] shadow-[0_0_10px_#52b8de]" : "bg-white/20",
              )}
            />
          </div>
          <div className="mt-[9%] rounded-xl border border-white/10 bg-black/40 px-[8%] py-[7%] font-mono text-[9.5px] leading-[1.7]">
            <p className="text-white/35">$ python3 verify.py</p>
            <p className={cn("transition-colors", step === 2 ? "text-[#6fe39a]" : "text-[#52b8de]")}>
              {step === 2 && "✓ "}
              {status}
            </p>
            <p className={cn("text-white/35 transition-opacity", step === 2 ? "opacity-100" : "opacity-0")}>→ boarding allowed</p>
          </div>
          <div className="absolute inset-x-[10%] bottom-[7%] grid aspect-[1.25] place-items-center rounded-2xl border border-dashed border-white/15">
            {[0, 1, 2].map((ring) => (
              <motion.span
                key={ring}
                className="absolute rounded-full border border-[#52b8de]"
                style={{ width: `${30 + ring * 22}%`, aspectRatio: "1" }}
                animate={step === 1 ? { opacity: [0, 0.9, 0], scale: [0.85, 1.05, 1.15] } : { opacity: 0.12, scale: 1 }}
                transition={step === 1 ? { duration: 1.1, repeat: Infinity, delay: ring * 0.18 } : { duration: 0.4 }}
              />
            ))}
            <Nfc className="relative h-[22%] w-[22%] text-white/50" />
          </div>
        </div>

        <motion.div
          className="absolute z-[1]"
          style={{ left: 18, top: 200, width: 240, height: 150 }}
          animate={step === 0 ? { x: 0, y: 0, rotate: -10 } : { x: 259, y: 12, rotate: -3 }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <Wristband lit={step === 2} />
        </motion.div>

        <motion.div
          initial={false}
          animate={step === 2 ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.6, y: 8 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="absolute left-[7%] top-[9%] z-[2] flex items-center gap-1.5 rounded-full bg-[#6fe39a] px-3 py-1.5 text-[10px] font-semibold text-[#0b1a10] shadow-[0_10px_30px_-8px_#6fe39a]"
        >
          <Check className="h-3 w-3" strokeWidth={3} />
          Permit valid
        </motion.div>
      </div>
    </Fit>
  )
}

/** Two real screenshots in tilted browser windows that straighten on hover (see `.case:hover`). */
function BrowserShots({ meta, alts }: { meta: ProjectMeta; alts: string[] }) {
  const shots = (meta.shots ?? []).map(withBase)
  const urls = meta.shotUrls ?? []
  return (
    <Fit width={560} ratio={4 / 3.05}>
      <div dir="ltr" className="relative h-full w-full select-none">
        {[0, 1].map((i) => (
          <div key={shots[i]} className={cn("win", i === 0 ? "win-main" : "win-sub")}>
            <Bar url={urls[i] ?? ""} />
            <img src={shots[i]} alt={alts[i] ?? ""} width={1440} height={900} loading="lazy" decoding="async" className="block h-auto w-full" />
          </div>
        ))}
      </div>
    </Fit>
  )
}

const SHOT_RATIO = "16 / 10"

/** Cross-fading screenshot gallery in a browser frame, with arrows, dots and keyboard support. */
function ShotCarousel({ meta, alts }: { meta: ProjectMeta; alts: string[] }) {
  const { t, dir } = useI18n()
  const shots = (meta.shots ?? []).map(withBase)
  const n = shots.length
  const [index, setIndex] = useState(0)

  const go = (next: number) => setIndex(((next % n) + n) % n)

  function onKeyDown(e: React.KeyboardEvent) {
    const forward = dir === "rtl" ? "ArrowLeft" : "ArrowRight"
    const back = dir === "rtl" ? "ArrowRight" : "ArrowLeft"
    if (e.key === forward) go(index + 1)
    else if (e.key === back) go(index - 1)
    else return
    e.preventDefault()
  }

  const counter = `${String(index + 1).padStart(2, "0")} / ${String(n).padStart(2, "0")}`

  return (
    <div className="relative w-full" onKeyDown={onKeyDown} role="group" aria-roledescription="carousel" aria-label={t.work.screenshots}>
      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#0b0d09] shadow-[0_40px_90px_-30px_rgb(0_0_0/0.75)]">
        <Bar url={meta.shotUrls?.[index] ?? ""} />
        <div className="relative" style={{ aspectRatio: SHOT_RATIO }}>
          {shots.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={alts[i] ?? ""}
              aria-hidden={i !== index}
              width={1440}
              height={900}
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
              className={cn(
                "absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                i === index ? "scale-100 opacity-100" : "scale-[1.02] opacity-0",
              )}
            />
          ))}
        </div>
      </div>

      {n > 1 && (
        <div className="mt-4 flex items-center justify-between gap-3">
          <button type="button" onClick={() => go(index - 1)} aria-label={t.work.prev} className="icon-btn h-9 w-9">
            <ChevronLeft className="h-4 w-4 rtl:-scale-x-100" aria-hidden />
          </button>
          <div className="flex items-center gap-1.5">
            {shots.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => go(i)}
                aria-label={t.work.showShot.replace("{n}", String(i + 1))}
                aria-current={i === index ? "true" : undefined}
                className="grid h-6 place-items-center px-0.5"
              >
                <span
                  className={cn(
                    "block h-1.5 rounded-full transition-all duration-500",
                    i === index ? "w-6 bg-[image:var(--grad)]" : "w-1.5 bg-line-2 hover:bg-dim",
                  )}
                />
              </button>
            ))}
            <span dir="ltr" className="ms-2 font-mono text-[0.68rem] text-dim" aria-hidden>
              {counter}
            </span>
          </div>
          <button type="button" onClick={() => go(index + 1)} aria-label={t.work.next} className="icon-btn h-9 w-9">
            <ChevronRight className="h-4 w-4 rtl:-scale-x-100" aria-hidden />
          </button>
        </div>
      )}

      <p aria-live="polite" className="mt-3 text-center text-[0.86rem] text-dim">
        {alts[index]}
      </p>

      {n > 1 && (
        <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-7">
          {shots.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => go(i)}
              aria-label={t.work.showShot.replace("{n}", String(i + 1))}
              className={cn(
                "overflow-hidden rounded-lg border-2 transition-all",
                i === index ? "border-ocean" : "border-transparent opacity-60 hover:opacity-100",
              )}
            >
              <img src={src} alt="" loading="lazy" decoding="async" className="block w-full" style={{ aspectRatio: SHOT_RATIO, objectFit: "cover" }} />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/** The picture shown on a featured project's stage. */
export function ProjectStageVisual({ meta, alts }: { meta: ProjectMeta; alts: string[] }) {
  return meta.visual === "hajj" ? <HajjVisual /> : <BrowserShots meta={meta} alts={alts} />
}

/** The larger picture inside the case-study dialog. */
export function ProjectModalVisual({ meta, alts }: { meta: ProjectMeta; alts: string[] }) {
  if (meta.visual === "hajj") return <HajjVisual />
  return <ShotCarousel meta={meta} alts={alts} />
}
