import { ImageResponse } from "next/og"

// The link-preview image, written to og.png at build time so static hosts serve it as image/png.
export const dynamic = "force-static"

const size = { width: 1200, height: 630 }

const traces = [
  "M40 120 H260 L300 160 H520",
  "M880 60 V200 L920 240 H1160",
  "M700 560 H900 L940 520 H1160",
  "M60 480 H200 L240 440 V360",
  "M1040 300 V420 L1000 460 H860",
]

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "radial-gradient(ellipse 70% 80% at 15% 10%, #1f2617 0%, #0a0c09 60%)",
          color: "#eef0e7",
          position: "relative",
        }}
      >
        <svg width="1200" height="630" style={{ position: "absolute", inset: 0 }}>
          {traces.map((d) => (
            <path key={d} d={d} stroke="#96a27866" strokeWidth="2" fill="none" />
          ))}
          <circle cx="520" cy="160" r="5" fill="#52b8de" />
          <circle cx="1160" cy="240" r="5" fill="#52b8de" />
        </svg>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              background: "linear-gradient(135deg, #6d765b, #2596be)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            AS
          </div>
          <div style={{ fontSize: 24, color: "#8f9683", letterSpacing: 4 }}>MAKKAH · 21.4225°N 39.8262°E</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 120, fontWeight: 700, letterSpacing: -6, lineHeight: 1 }}>Abdullah Sendy</div>
          <div
            style={{
              marginTop: 24,
              fontSize: 40,
              backgroundImage: "linear-gradient(100deg, #c6cea8, #2596be)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Computer & Network Engineer · Full-Stack Developer
          </div>
        </div>
        <div style={{ display: "flex", gap: 14, fontSize: 24, color: "#c9cdbe" }}>
          {["ASP.NET Core", "Next.js", "Flutter", "Data Governance"].map((s) => (
            <div key={s} style={{ padding: "8px 18px", border: "1px solid #ffffff26", borderRadius: 999 }}>
              {s}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  )
}
