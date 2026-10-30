"use client"

import { motion, useMotionTemplate, useReducedMotion, useScroll, useSpring, useTransform, type Variants } from "motion/react"
import { ArrowDown, Download, Github, Linkedin, Mail, MapPin } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { site } from "@/content/site"
import { cn } from "@/lib/utils"
import { useI18n } from "./i18n"
import { EASE, Magnetic, useBootReady } from "./primitives"

const stack: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.55 } } }
const stackInstant: Variants = { hidden: {}, show: { transition: { staggerChildren: 0, delayChildren: 0 } } }
const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE } },
}
const letters: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.045, delayChildren: 0.05 } } }
const letter: Variants = {
  hidden: { y: "0.7em", rotate: 8, opacity: 0 },
  show: { y: "0em", rotate: 0, opacity: 1, transition: { duration: 1.1, ease: EASE } },
}

function useTypedRoles(roles: string[], enabled: boolean) {
  const reduce = useReducedMotion()
  const [text, setText] = useState(roles[0])

  useEffect(() => {
    if (!enabled || reduce) {
      setText(roles[0])
      return
    }
    let word = 0
    let i = 0
    let deleting = false
    let id = 0
    const tick = () => {
      const current = roles[word]
      setText(current.slice(0, i))
      if (!deleting && i < current.length) {
        i++
        id = window.setTimeout(tick, 55)
      } else if (!deleting) {
        deleting = true
        id = window.setTimeout(tick, 2000)
      } else if (i > 0) {
        i--
        id = window.setTimeout(tick, 26)
      } else {
        deleting = false
        word = (word + 1) % roles.length
        id = window.setTimeout(tick, 320)
      }
    }
    i = 0
    tick()
    return () => window.clearTimeout(id)
  }, [roles, enabled, reduce])

  return text
}

export function Hero() {
  const { t, lang } = useI18n()
  const ready = useBootReady()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "16%"])
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])
  const role = useTypedRoles(t.hero.roles, ready)
  const reduce = useReducedMotion()
  const state = ready ? "show" : "hidden"
  const isAr = lang === "ar"

  return (
    <section id="top" ref={ref} className="relative flex min-h-[100svh] items-center overflow-hidden pb-24 pt-32 lg:pt-28">
      <motion.div style={{ y, opacity }} className="wrap relative grid items-center gap-14 lg:grid-cols-[1.18fr_0.82fr] lg:gap-10">
        <motion.div initial="hidden" animate={state} variants={reduce ? stackInstant : stack}>
          <motion.p variants={item} className="chip gap-2.5 py-1.5 pe-3.5 ps-2.5 text-[0.76rem]">
            <span className="ping" aria-hidden />
            {t.hero.status}
          </motion.p>

          <h1 className="mt-8">
            <span className="sr-only">
              {site.fullName[lang]} — {t.hero.roles[0]}
            </span>
            <motion.span
              aria-hidden
              variants={letters}
              initial="hidden"
              animate={state}
              className={cn(
                "display block font-semibold text-ink",
                isAr
                  ? "text-[clamp(3.4rem,11vw,8rem)] leading-[1.15]"
                  : "text-[clamp(3.6rem,11.5vw,9rem)] leading-[0.88] tracking-[-0.065em]",
              )}
            >
              {/* Arabic letters join, so the first name rises as one word there. */}
              {(isAr ? [t.hero.first] : [...t.hero.first]).map((c, i) => (
                <motion.span key={i} variants={letter} className="inline-block origin-bottom-left">
                  {c}
                </motion.span>
              ))}
            </motion.span>
            <motion.span
              aria-hidden
              initial={{ clipPath: isAr ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)", opacity: 0 }}
              animate={
                ready
                  ? { clipPath: "inset(-10% -8% -40% -8%)", opacity: 1 }
                  : { clipPath: isAr ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)", opacity: 0 }
              }
              transition={{ duration: 1.3, delay: 0.35, ease: EASE }}
              className={cn(
                "serif-em text-grad block pe-[0.08em]",
                isAr ? "text-[clamp(3.4rem,11vw,8rem)] leading-[1.2]" : "-mt-[0.04em] text-[clamp(4rem,12.5vw,10rem)] leading-[0.95]",
              )}
            >
              {t.hero.last}
              <span className="not-italic text-ocean">.</span>
            </motion.span>
          </h1>

          <motion.p variants={item} className="mt-7 flex min-h-[1.9em] flex-wrap items-baseline gap-x-2 text-[clamp(1.08rem,2.2vw,1.4rem)] font-medium text-ink-2">
            <span>{t.hero.rolePrefix}</span>
            <span className="sr-only">{t.hero.roles.join("، ")}</span>
            <span aria-hidden className="text-grad font-semibold">
              {role}
            </span>
            <span aria-hidden className="caret" />
          </motion.p>

          <motion.p variants={item} className="mt-5 max-w-[37rem] text-[1.02rem] leading-[1.8] text-dim">
            {t.hero.bio}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-3">
            <Magnetic>
              <a href="#work" className="btn btn-primary">
                {t.hero.ctaWork}
                <ArrowDown aria-hidden />
              </a>
            </Magnetic>
            <Magnetic>
              <a href={site.cv} download="Abdullah-Sendy-CV.pdf" className="btn btn-ghost">
                <Download aria-hidden />
                {t.hero.ctaCv}
              </a>
            </Magnetic>
          </motion.div>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-2">
            <a className="icon-btn h-11 w-11 rounded-2xl" href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="h-[1.1rem] w-[1.1rem]" />
            </a>
            <a className="icon-btn h-11 w-11 rounded-2xl" href={site.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="h-[1.1rem] w-[1.1rem]" />
            </a>
            <a className="icon-btn h-11 w-11 rounded-2xl" href={`mailto:${site.email}`} aria-label={t.contact.labels.email}>
              <Mail className="h-[1.1rem] w-[1.1rem]" />
            </a>
            <span className="ms-2 inline-flex items-center gap-1.5 text-[0.8rem] text-dim">
              <MapPin aria-hidden className="h-3.5 w-3.5 text-ocean" />
              {t.hero.location}
            </span>
          </motion.div>
        </motion.div>

        <Terminal ready={ready} badges={t.hero.badges} />
      </motion.div>

      <motion.a
        href="#about"
        aria-hidden
        tabIndex={-1}
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className="scroll-wheel relative h-9 w-[22px] rounded-full border-[1.5px] border-line-2" />
        <span className="mono-label text-[0.6rem]">{t.hero.scroll}</span>
      </motion.a>

      <div aria-hidden className="mono-label keep-mono pointer-events-none absolute bottom-8 end-6 hidden font-mono text-[0.62rem] xl:block">
        {site.coords}
      </div>
    </section>
  )
}

type Line = { cmd?: string; out?: string; tone?: "accent" | "dim" }

const SCRIPT: Line[] = [
  { cmd: "whoami" },
  { out: "abdullah-sendy" },
  { cmd: "cat role.txt" },
  { out: "Computer & Network Engineer" },
  { out: "Full-Stack Developer · Database Admin" },
  { cmd: "ls ~/stack" },
  { out: "asp.net-core  next.js  react  flutter", tone: "dim" },
  { out: "sql-server  laravel  python  power-bi", tone: "dim" },
  { cmd: "ping makkah" },
  { out: "● online · 21.4225°N 39.8262°E", tone: "accent" },
]

function Terminal({ ready, badges }: { ready: boolean; badges: { degree: string; build: string } }) {
  const reduce = useReducedMotion()
  const [line, setLine] = useState(0)
  const [chars, setChars] = useState(0)
  const done = line >= SCRIPT.length

  useEffect(() => {
    if (!ready) return
    if (reduce) {
      setLine(SCRIPT.length)
      return
    }
    if (done) return
    const current = SCRIPT[line]
    if (current.cmd && chars < current.cmd.length) {
      const id = window.setTimeout(() => setChars((c) => c + 1), 45 + Math.random() * 50)
      return () => window.clearTimeout(id)
    }
    const id = window.setTimeout(
      () => {
        setLine((l) => l + 1)
        setChars(0)
      },
      current.cmd ? 280 : 120,
    )
    return () => window.clearTimeout(id)
  }, [ready, reduce, line, chars, done])

  // Pointer tilt with a moving glare.
  const ref = useRef<HTMLDivElement>(null)
  const rx = useSpring(0, { stiffness: 140, damping: 18 })
  const ry = useSpring(0, { stiffness: 140, damping: 18 })
  const gx = useSpring(50, { stiffness: 140, damping: 18 })
  const gy = useSpring(30, { stiffness: 140, damping: 18 })
  const glare = useMotionTemplate`radial-gradient(420px circle at ${gx}% ${gy}%, rgb(255 255 255 / 0.09), transparent 60%)`

  function onMove(e: React.PointerEvent) {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    rx.set((0.5 - py) * 10)
    ry.set((px - 0.5) * 12)
    gx.set(px * 100)
    gy.set(py * 100)
  }

  function onLeave() {
    rx.set(0)
    ry.set(0)
    gx.set(50)
    gy.set(30)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={ready ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.97 }}
      transition={{ duration: 1.2, delay: 0.7, ease: EASE }}
      className="relative mx-auto w-full max-w-[460px] [perspective:1400px] lg:mx-0 lg:justify-self-end"
      aria-hidden
    >
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{ rotateX: rx, rotateY: ry }}
        className="relative rounded-[1.6rem] bg-[image:var(--grad)] p-px shadow-[var(--glow)] [transform-style:preserve-3d]"
      >
        <div dir="ltr" className="relative overflow-hidden rounded-[calc(1.6rem-1px)] bg-[#0b0e0a] text-left text-[#dfe3d6]">
          <motion.div className="pointer-events-none absolute inset-0" style={{ background: glare }} />
          <div className="flex items-center gap-2 border-b border-white/[0.07] px-4 py-3">
            <i className="h-2.5 w-2.5 rounded-full bg-[#e5675e]" />
            <i className="h-2.5 w-2.5 rounded-full bg-[#e2b84f]" />
            <i className="h-2.5 w-2.5 rounded-full bg-[#7fae5a]" />
            <span className="mx-auto pe-10 font-mono text-[0.68rem] text-white/45">~/abdullah — zsh</span>
          </div>
          <div className="min-h-[19.5rem] px-5 py-4 font-mono text-[0.8rem] leading-[1.75] sm:text-[0.84rem]">
            {SCRIPT.map((l, i) => {
              const visible = i < line || (i === line && !!l.cmd)
              const text = l.cmd ? (i < line ? l.cmd : l.cmd.slice(0, chars)) : l.out
              return (
                <div key={i} className={cn("whitespace-pre", !visible && "invisible")}>
                  {l.cmd ? (
                    <>
                      <span className="text-[#9aa67c]">❯ </span>
                      <span className="text-white">{text}</span>
                      {i === line && <span className="caret !bg-[#52b8de]" />}
                    </>
                  ) : (
                    <span className={cn(l.tone === "accent" && "text-[#52b8de]", l.tone === "dim" && "text-white/55")}>{text}</span>
                  )}
                </div>
              )
            })}
            <div className={cn(!done && "invisible")}>
              <span className="text-[#9aa67c]">❯ </span>
              <span className="caret !bg-[#52b8de]" />
            </div>
          </div>
        </div>
        <div className="float-a absolute -top-4 end-6 rounded-full border border-line bg-bg-2 px-3 py-1.5 text-[0.7rem] font-medium text-ink-2 shadow-[var(--shadow)]">
          {badges.degree}
        </div>
        <div className="float-b absolute -bottom-4 start-6 flex items-center gap-2 rounded-full border border-line bg-bg-2 px-3 py-1.5 font-mono text-[0.7rem] text-ink-2 shadow-[var(--shadow)]">
          <span className="h-1.5 w-1.5 rounded-full bg-ocean" />
          {badges.build}
        </div>
      </motion.div>
    </motion.div>
  )
}
