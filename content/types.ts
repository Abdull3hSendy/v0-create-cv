import type { ProjectId } from "./projects"

// Text wrapped in *asterisks* is rendered as an accent (gradient serif in headings, emphasis in body copy).

export type ProjectCopy = {
  title: string
  tagline: string
  kind: string
  context: string
  period: string
  summary: string
  overview: string
  /** Overrides the "What I built" heading, e.g. for team projects. */
  highlightsTitle?: string
  highlights: string[]
  metrics?: { value: string; label: string }[]
  note?: string
  /** Alt text / captions for the project's screenshots, in the same order as `ProjectMeta.shots`. */
  shots?: string[]
}

export type SkillCategoryId =
  | "languages"
  | "backend"
  | "frontend"
  | "mobile"
  | "data"
  | "governance"
  | "security"
  | "systems"
  | "tools"
  | "ai"
  | "practice"

export type Job = {
  role: string
  org: string
  team: string
  period: string
  current?: boolean
  badge?: string
  /** Roles held within the same organisation, newest first. */
  steps?: { role: string; period: string; current?: boolean }[]
  /** Which role the bullet points describe, when there are several steps. */
  itemsTitle?: string
  items: string[]
  tags: string[]
}

export type Dictionary = {
  meta: { title: string; description: string }
  nav: {
    about: string
    experience: string
    work: string
    skills: string
    education: string
    contact: string
    home: string
    menu: string
    closeMenu: string
    switchLang: string
    langShort: string
    otherLangName: string
    selfLangName: string
    toLight: string
    toDark: string
    downloadCv: string
    cv: string
    skip: string
  }
  boot: string
  hero: {
    status: string
    location: string
    first: string
    last: string
    rolePrefix: string
    roles: string[]
    bio: string
    ctaWork: string
    ctaCv: string
    scroll: string
    badges: { degree: string; build: string }
  }
  about: {
    eyebrow: string
    title: string
    paragraphs: string[]
    signature: string
    stats: { value: number; suffix?: string; label: string; sub: string }[]
    focusTitle: string
    focus: { title: string; body: string }[]
    basedIn: string
    city: string
    localTime: string
  }
  experience: {
    eyebrow: string
    title: string
    present: string
    showAll: string
    showLess: string
    jobs: Job[]
  }
  work: {
    eyebrow: string
    title: string
    lede: string
    moreEyebrow: string
    moreTitle: string
    moreLede: string
    caseStudy: string
    live: string
    screenshots: string
    prev: string
    next: string
    showShot: string
    code: string
    details: string
    internal: string
    illustration: string
    overview: string
    built: string
    stack: string
    period: string
    context: string
    close: string
    viewRepo: string
    items: Record<ProjectId, ProjectCopy>
  }
  skills: {
    eyebrow: string
    title: string
    lede: string
    appliedIn: string
    noProjects: string
    categories: { id: SkillCategoryId; label: string; blurb: string; items: string[] }[]
    softTitle: string
    soft: string[]
    spokenTitle: string
    spoken: { name: string; level: string; value: number }[]
  }
  education: {
    eyebrow: string
    title: string
    degree: string
    school: string
    period: string
    place: string
    certsTitle: string
    certs: { name: string; issuer: string; date: string; note?: string }[]
  }
  contact: {
    eyebrow: string
    title: string
    lede: string
    email: string
    copy: string
    copied: string
    cv: string
    labels: { email: string; phone: string; linkedin: string; github: string; location: string }
  }
  footer: { built: string; top: string; rights: string }
}
