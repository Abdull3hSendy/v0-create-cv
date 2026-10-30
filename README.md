# Abdullah Sendy — Portfolio

Bilingual (English / العربية) personal portfolio and CV. Next.js 14 (App Router) · TypeScript · Tailwind CSS 4 · Motion · Lucide.

## Run it

```bash
bun install        # or: npm install
bun dev            # http://localhost:3000 → redirects to /en or /ar
bun run build && bun start
```

## Editing content

All text lives in `content/` — components never hard-code copy.

| File | What's in it |
| --- | --- |
| `content/en.ts`, `content/ar.ts` | Every visible string, per language. Both must satisfy the `Dictionary` type in `content/types.ts`, so TypeScript flags anything missing from one language. |
| `content/projects.ts` | Project metadata shared by both languages: GitHub link, stack, icon, accent colours, which projects are featured, and which skill categories link to which projects. |
| `content/site.ts` | Email, phone, social links, CV path, coordinates, marquee words. |
| `public/Abdullah-Sendy-CV.pdf` | The file behind every "Download CV" button. Replace it to update the CV. |

Wrap a word in `*asterisks*` in a heading to give it the gradient serif accent (e.g. `"Systems I've *engineered*."`).

In Arabic copy, Latin tokens that start or end with punctuation (`C#`, `.NET`) carry a `‎` mark so they don't flip inside right-to-left text.

### Adding a project

1. Add an entry to `projects` in `content/projects.ts` (set `featured: true` and a `visual` to show it as a large case study).
2. Add its text under `work.items` in **both** `en.ts` and `ar.ts`.

## How it's built

- `app/[lang]/` — one statically generated page per language with correct `lang`/`dir`, hreflang alternates, Open Graph image and JSON-LD. `middleware.ts` sends `/` to the saved or browser-preferred language.
- `components/portfolio/` — the sections (`hero`, `about`, `experience`, `work`, `skills`, `education`, `contact`) plus shared pieces:
  - `circuit-canvas.tsx` — the animated PCB/network background (pauses when the tab is hidden, static under reduced motion).
  - `chrome.tsx` — navigation, language-switch curtain, theme toggle, intro screen, scroll progress.
  - `project-visuals.tsx` — coded illustrations for the featured projects, labelled as illustrations on the page.
  - `project-modal.tsx` — accessible case-study dialog.
- `app/globals.css` — colour tokens for dark and light themes (olive `#6D765B`, ocean `#2596BE`) and the type roles that switch to Arabic fonts in RTL.

`prefers-reduced-motion` is respected throughout: no intro screen, no parallax or travelling pulses, no tilt or magnetic effects.
