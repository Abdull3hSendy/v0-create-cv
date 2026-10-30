import type { Metadata } from "next"
import { withBase } from "@/lib/utils"

export const metadata: Metadata = { title: "Abdullah Sendy", robots: { index: false } }

// Static hosting has no middleware: send visitors to their saved or preferred language from the browser.
const redirect = `(function(){var m=document.cookie.match(/(?:^|; )lang=(en|ar)/),l=m?m[1]:/^ar/i.test(navigator.language||'')?'ar':'en';location.replace('${withBase("/")}'+l+'/')})()`

export default function Home() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: redirect }} />
      <noscript>
        <meta httpEquiv="refresh" content={`0; url=${withBase("/en/")}`} />
      </noscript>
    </>
  )
}
