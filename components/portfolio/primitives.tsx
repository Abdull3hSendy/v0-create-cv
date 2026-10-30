"use client"

import { animate, motion, useInView, useReducedMotion, useSpring, type Variants } from "motion/react"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

export const EASE = [0.16, 1, 0.3, 1] as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
}

/** True once the intro screen has finished (immediately for returning visitors). */
export function useBootReady() {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const booted = document.documentElement.classList.contains("booted")
    const id = window.setTimeout(() => setReady(true), booted ? 60 : 1150)
    return () => window.clearTimeout(id)
  }, [])
  return ready
}

/** Renders *accent* segments of a string with the given class. */
export function Rich({ text, accent = "font-medium text-ink" }: { text: string; accent?: string }) {
  return (
    <>
      {text.split("*").map((part, i) =>
        i % 2 ? (
          <span key={i} className={accent}>
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  )
}

const titleContainer: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.055 } } }
const titleWord: Variants = {
  hidden: { y: "108%" },
  show: { y: "0%", transition: { duration: 1, ease: EASE } },
}

/** Heading whose words rise out of a mask; *accent* words get the gradient serif treatment. */
export function SplitTitle({ text, className }: { text: string; className?: string }) {
  return (
    <motion.h2
      className={cn("display", className)}
      variants={titleContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
    >
      {text.split("*").map((segment, si) =>
        segment.split(/(\s+)/).map((word, wi) =>
          !word || /^\s+$/.test(word) ? (
            word
          ) : (
            <span key={`${si}-${wi}`} className="-mb-[0.18em] inline-block overflow-hidden pb-[0.18em] align-bottom">
              <motion.span variants={titleWord} className={cn("inline-block", si % 2 === 1 && "serif-em text-grad pe-[0.06em]")}>
                {word}
              </motion.span>
            </span>
          ),
        ),
      )}
    </motion.h2>
  )
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  lede,
  compact,
  className,
}: {
  index: string
  eyebrow: string
  title: string
  lede?: string
  compact?: boolean
  className?: string
}) {
  return (
    <header className={cn("mb-12 max-w-3xl md:mb-16", className)}>
      <motion.p
        className="eyebrow mb-5"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        <span className="font-mono text-[0.72rem] tracking-[0.2em]">{index}</span>
        <span aria-hidden className="h-px w-8 bg-[image:var(--grad)]" />
        {eyebrow}
      </motion.p>
      <SplitTitle
        text={title}
        // Size first: tailwind-merge drops a leading-* that precedes a text-[size].
        className={cn(
          compact ? "text-[clamp(1.9rem,4vw,3rem)]" : "text-[clamp(2.3rem,5.4vw,4.3rem)]",
          "font-semibold leading-[1.02] tracking-[-0.045em] text-balance rtl:leading-[1.3]",
        )}
      />
      {lede && (
        <motion.p
          className="mt-6 max-w-2xl text-[1.02rem] leading-relaxed text-dim"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
        >
          {lede}
        </motion.p>
      )}
    </header>
  )
}

export function Reveal({
  children,
  className,
  style,
  delay = 0,
  as = "div",
}: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  delay?: number
  as?: "div" | "li" | "article"
}) {
  const Comp = as === "li" ? motion.li : as === "article" ? motion.article : motion.div
  return (
    <Comp
      className={className}
      style={style}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </Comp>
  )
}

/** Pulls its child toward the pointer (mouse only). */
export function Magnetic({ children, strength = 0.3, className }: { children: React.ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const x = useSpring(0, { stiffness: 180, damping: 14, mass: 0.4 })
  const y = useSpring(0, { stiffness: 180, damping: 14, mass: 0.4 })

  function onMove(e: React.PointerEvent) {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }

  function reset() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div ref={ref} style={{ x, y }} onPointerMove={onMove} onPointerLeave={reset} className={cn("inline-flex", className)}>
      {children}
    </motion.div>
  )
}

export function CountUp({ to, className }: { to: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" })
  const reduce = useReducedMotion()

  // The server renders the real value (for crawlers and no-JS); the client zeroes it until it counts.
  useEffect(() => {
    if (!reduce && ref.current && !inView) ref.current.textContent = "0"
  }, [])

  useEffect(() => {
    const node = ref.current
    if (!inView || !node) return
    if (reduce) {
      node.textContent = String(to)
      return
    }
    const controls = animate(0, to, {
      duration: 1.8,
      ease: EASE,
      onUpdate: (v) => {
        node.textContent = String(Math.round(v))
      },
    })
    return () => controls.stop()
  }, [inView, reduce, to])

  return (
    <span ref={ref} className={className}>
      {to}
    </span>
  )
}

/** Blueprint-style registration marks at the corners of the parent. */
export function CropMarks({ className }: { className?: string }) {
  const mark = "absolute h-3 w-3 border-line-2"
  return (
    <span aria-hidden className={cn("pointer-events-none absolute -inset-3 hidden md:block", className)}>
      <span className={cn(mark, "start-0 top-0 border-s border-t")} />
      <span className={cn(mark, "end-0 top-0 border-e border-t")} />
      <span className={cn(mark, "bottom-0 start-0 border-b border-s")} />
      <span className={cn(mark, "bottom-0 end-0 border-b border-e")} />
    </span>
  )
}
