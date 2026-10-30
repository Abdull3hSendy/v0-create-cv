// A bare root layout for "/", which only redirects to a language.
export default function RedirectLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ background: "#0a0c09" }}>{children}</body>
    </html>
  )
}
