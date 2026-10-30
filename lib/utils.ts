import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Prefixes a public-folder path with the base path GitHub Pages serves the site under (<Link> adds it on its own). */
export function withBase(path: string) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`
}
