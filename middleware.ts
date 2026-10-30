import { NextResponse, type NextRequest } from "next/server"

// "/" has no page of its own: send visitors to their saved or preferred language.
export function middleware(request: NextRequest) {
  const saved = request.cookies.get("lang")?.value
  const preferred = (request.headers.get("accept-language") ?? "").split(",")[0]?.trim().toLowerCase() ?? ""
  const lang = saved === "ar" || saved === "en" ? saved : preferred.startsWith("ar") ? "ar" : "en"

  const url = request.nextUrl.clone()
  url.pathname = `/${lang}`
  return NextResponse.redirect(url)
}

export const config = { matcher: ["/"] }
