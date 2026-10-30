"use client"

import { useEffect, useRef } from "react"

type Pt = { x: number; y: number }
type Trace = { pts: Pt[]; segs: number[]; len: number }
type Pulse = { trace: number; t: number; speed: number }

const GRID = 44
const TILE_W = GRID * 26
const TILE_H = GRID * 18
const TAU = Math.PI * 2
const REVEAL_R = 200

function pick(n: number) {
  return Math.floor(Math.random() * n)
}

/** Orthogonal grid-snapped routes with 45° chamfered corners, like PCB traces. */
function buildTraces(count: number): Trace[] {
  const cols = TILE_W / GRID
  const rows = TILE_H / GRID
  const traces: Trace[] = []

  for (let i = 0; i < count; i++) {
    let x = pick(cols) * GRID
    let y = pick(rows) * GRID
    const raw: Pt[] = [{ x, y }]
    let horizontal = Math.random() < 0.5
    const turns = 2 + pick(4)
    for (let s = 0; s < turns; s++) {
      const step = (1 + pick(4)) * GRID * (Math.random() < 0.5 ? -1 : 1)
      if (horizontal) x = Math.max(0, Math.min(TILE_W, x + step))
      else y = Math.max(0, Math.min(TILE_H, y + step))
      const last = raw[raw.length - 1]
      if (last.x !== x || last.y !== y) raw.push({ x, y })
      horizontal = !horizontal
    }
    if (raw.length < 2) continue

    const pts: Pt[] = [raw[0]]
    for (let k = 1; k < raw.length - 1; k++) {
      const a = raw[k - 1]
      const p = raw[k]
      const b = raw[k + 1]
      const inLen = Math.hypot(p.x - a.x, p.y - a.y)
      const outLen = Math.hypot(b.x - p.x, b.y - p.y)
      const c = Math.min(GRID * 0.4, inLen / 2, outLen / 2)
      pts.push({ x: p.x - ((p.x - a.x) / inLen) * c, y: p.y - ((p.y - a.y) / inLen) * c })
      pts.push({ x: p.x + ((b.x - p.x) / outLen) * c, y: p.y + ((b.y - p.y) / outLen) * c })
    }
    pts.push(raw[raw.length - 1])

    const segs: number[] = []
    let len = 0
    for (let k = 1; k < pts.length; k++) {
      const d = Math.hypot(pts[k].x - pts[k - 1].x, pts[k].y - pts[k - 1].y)
      segs.push(d)
      len += d
    }
    if (len > GRID) traces.push({ pts, segs, len })
  }
  return traces
}

function pointAt(tr: Trace, t: number): Pt {
  let target = t * tr.len
  for (let k = 0; k < tr.segs.length; k++) {
    const seg = tr.segs[k]
    if (target <= seg) {
      const f = seg ? target / seg : 0
      const a = tr.pts[k]
      const b = tr.pts[k + 1]
      return { x: a.x + (b.x - a.x) * f, y: a.y + (b.y - a.y) * f }
    }
    target -= seg
  }
  return tr.pts[tr.pts.length - 1]
}

function renderTile(traces: Trace[], dpr: number, stroke: string, node: string, width: number) {
  const tile = document.createElement("canvas")
  tile.width = TILE_W * dpr
  tile.height = TILE_H * dpr
  const c = tile.getContext("2d")!
  c.scale(dpr, dpr)
  c.lineWidth = width
  c.lineJoin = "round"
  c.lineCap = "round"
  c.strokeStyle = stroke
  for (const tr of traces) {
    c.beginPath()
    c.moveTo(tr.pts[0].x, tr.pts[0].y)
    for (let k = 1; k < tr.pts.length; k++) c.lineTo(tr.pts[k].x, tr.pts[k].y)
    c.stroke()
  }
  c.fillStyle = node
  c.strokeStyle = node
  for (const tr of traces) {
    const ends = [tr.pts[0], tr.pts[tr.pts.length - 1]]
    for (const p of ends) {
      c.beginPath()
      c.arc(p.x, p.y, 2.2, 0, TAU)
      c.fill()
      c.beginPath()
      c.arc(p.x, p.y, 4.6, 0, TAU)
      c.stroke()
    }
  }
  return tile
}

function renderSprite(signal: string) {
  const s = document.createElement("canvas")
  s.width = s.height = 64
  const c = s.getContext("2d")!
  const g = c.createRadialGradient(32, 32, 0, 32, 32, 32)
  g.addColorStop(0, `rgb(${signal} / 0.95)`)
  g.addColorStop(0.25, `rgb(${signal} / 0.45)`)
  g.addColorStop(1, `rgb(${signal} / 0)`)
  c.fillStyle = g
  c.fillRect(0, 0, 64, 64)
  return s
}

export function CircuitCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const finePointer = window.matchMedia("(pointer: fine)").matches && !reduce
    const small = window.innerWidth < 768
    const dpr = small ? 1 : Math.min(window.devicePixelRatio || 1, 1.5)

    const traces = buildTraces(small ? 38 : 64)
    const pulses: Pulse[] = traces
      .map((tr, i) => ({ trace: i, t: Math.random(), speed: (0.05 + Math.random() * 0.08) / tr.len }))
      .filter(() => Math.random() < (small ? 0.3 : 0.38))

    let W = 0
    let H = 0
    let dim: HTMLCanvasElement
    let lit: HTMLCanvasElement
    let sprite: HTMLCanvasElement
    let signal = "82 184 222"
    const scratch = document.createElement("canvas")
    const sctx = scratch.getContext("2d")!
    scratch.width = scratch.height = REVEAL_R * 2 * dpr

    const pointer = { x: -999, y: -999, tx: -999, ty: -999, active: false, alpha: 0 }
    let raf = 0
    let last = performance.now()
    let running = false

    function paintTheme() {
      const css = getComputedStyle(document.documentElement)
      const trace = css.getPropertyValue("--trace").trim() || "rgb(150 162 120 / 0.1)"
      const node = css.getPropertyValue("--trace-node").trim() || "rgb(150 162 120 / 0.2)"
      signal = css.getPropertyValue("--signal").trim() || signal
      dim = renderTile(traces, dpr, trace, node, 1)
      lit = renderTile(traces, dpr, `rgb(${signal} / 0.55)`, `rgb(${signal} / 0.75)`, 1.2)
      sprite = renderSprite(signal)
    }

    function resize() {
      W = window.innerWidth
      H = window.innerHeight
      canvas!.width = Math.round(W * dpr)
      canvas!.height = Math.round(H * dpr)
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (!running) draw(0)
    }

    function tileOrigins() {
      const parallax = reduce ? 0 : window.scrollY * 0.12
      const offY = -(((parallax % TILE_H) + TILE_H) % TILE_H)
      const offX = -((TILE_W - (W % TILE_W)) / 2)
      const origins: Pt[] = []
      for (let ty = offY; ty < H; ty += TILE_H) for (let tx = offX; tx < W; tx += TILE_W) origins.push({ x: tx, y: ty })
      return origins
    }

    function draw(dt: number) {
      ctx!.clearRect(0, 0, W, H)
      const origins = tileOrigins()
      for (const o of origins) ctx!.drawImage(dim, o.x, o.y, TILE_W, TILE_H)

      // Cursor reveals the circuit in the signal colour, with a soft falloff.
      pointer.alpha += ((pointer.active ? 1 : 0) - pointer.alpha) * 0.08
      if (finePointer && pointer.alpha > 0.01) {
        pointer.x += (pointer.tx - pointer.x) * 0.2
        pointer.y += (pointer.ty - pointer.y) * 0.2
        const sx = pointer.x - REVEAL_R
        const sy = pointer.y - REVEAL_R
        sctx.setTransform(1, 0, 0, 1, 0, 0)
        sctx.globalCompositeOperation = "source-over"
        sctx.clearRect(0, 0, scratch.width, scratch.height)
        sctx.setTransform(dpr, 0, 0, dpr, -sx * dpr, -sy * dpr)
        for (const o of origins) {
          if (o.x > pointer.x + REVEAL_R || o.x + TILE_W < sx || o.y > pointer.y + REVEAL_R || o.y + TILE_H < sy) continue
          sctx.drawImage(lit, o.x, o.y, TILE_W, TILE_H)
        }
        sctx.setTransform(1, 0, 0, 1, 0, 0)
        sctx.globalCompositeOperation = "destination-in"
        const r = REVEAL_R * dpr
        const g = sctx.createRadialGradient(r, r, 0, r, r, r)
        g.addColorStop(0, "rgba(0,0,0,1)")
        g.addColorStop(0.55, "rgba(0,0,0,0.5)")
        g.addColorStop(1, "rgba(0,0,0,0)")
        sctx.fillStyle = g
        sctx.fillRect(0, 0, scratch.width, scratch.height)
        ctx!.globalAlpha = pointer.alpha
        ctx!.drawImage(scratch, sx, sy, REVEAL_R * 2, REVEAL_R * 2)
        ctx!.globalAlpha = 1
      }

      if (reduce) return

      // Packets travelling along the traces, each with a short fading tail.
      for (const p of pulses) {
        p.t += p.speed * dt
        if (p.t > 1) p.t -= 1
        const tr = traces[p.trace]
        const fade = Math.sin(Math.PI * p.t)
        const samples: { pt: Pt; a: number; s: number }[] = []
        for (let k = 0; k < 5; k++) {
          const tt = p.t - (k * 9) / tr.len
          if (tt < 0) break
          samples.push({ pt: pointAt(tr, tt), a: (1 - k / 5) * fade, s: k === 0 ? 30 : 22 - k * 3 })
        }
        for (const o of origins) {
          const hx = o.x + samples[0]?.pt.x
          const hy = o.y + samples[0]?.pt.y
          if (!(hx > -40 && hx < W + 40 && hy > -40 && hy < H + 40)) continue
          for (const smp of samples) {
            ctx!.globalAlpha = smp.a * 0.85
            ctx!.drawImage(sprite, o.x + smp.pt.x - smp.s / 2, o.y + smp.pt.y - smp.s / 2, smp.s, smp.s)
          }
        }
      }
      ctx!.globalAlpha = 1
    }

    function loop(now: number) {
      const dt = Math.min(48, now - last)
      last = now
      draw(dt)
      raf = requestAnimationFrame(loop)
    }

    function start() {
      if (running || reduce) return
      running = true
      last = performance.now()
      raf = requestAnimationFrame(loop)
    }

    function stop() {
      running = false
      cancelAnimationFrame(raf)
    }

    const onPointer = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return
      pointer.tx = e.clientX
      pointer.ty = e.clientY
      if (!pointer.active) {
        pointer.x = e.clientX
        pointer.y = e.clientY
      }
      pointer.active = true
    }
    const onLeave = (e: MouseEvent) => {
      if (!e.relatedTarget) pointer.active = false
    }
    const onVisibility = () => (document.hidden ? stop() : start())

    paintTheme()
    resize()
    start()

    // The html class also carries boot/wipe state, so only repaint when the theme itself flips.
    let dark = document.documentElement.classList.contains("dark")
    const themeObserver = new MutationObserver(() => {
      const next = document.documentElement.classList.contains("dark")
      if (next === dark) return
      dark = next
      paintTheme()
      if (!running) draw(0)
    })
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })

    window.addEventListener("resize", resize)
    document.addEventListener("visibilitychange", onVisibility)
    if (finePointer) {
      window.addEventListener("pointermove", onPointer, { passive: true })
      document.addEventListener("mouseout", onLeave)
    }

    return () => {
      stop()
      themeObserver.disconnect()
      window.removeEventListener("resize", resize)
      document.removeEventListener("visibilitychange", onVisibility)
      window.removeEventListener("pointermove", onPointer)
      document.removeEventListener("mouseout", onLeave)
    }
  }, [])

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-0 h-full w-full" />
}
