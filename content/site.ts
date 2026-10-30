import { withBase } from "@/lib/utils"

// Language-independent facts used across the site.
export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://abdullahsendy.vercel.app",
  name: { en: "Abdullah Sendy", ar: "عبدالله سندي" },
  fullName: { en: "Abdullah Khalid Sendy", ar: "عبدالله خالد سندي" },
  email: "sendia663@gmail.com",
  phone: { display: "+966 54 646 2972", href: "tel:+966546462972" },
  linkedin: "https://www.linkedin.com/in/abdullah-sendy-b42a40229",
  github: "https://github.com/Abdull3hSendy",
  cv: withBase("/Abdullah-Sendy-CV.pdf"),
  coords: "21.4225° N · 39.8262° E",
  timeZone: "Asia/Riyadh",
}

export const marquee = [
  "ASP.NET Core",
  "Next.js",
  "React",
  "Flutter",
  "Entity Framework",
  "SQL Server",
  "Laravel",
  "Power BI",
  "Python",
  "Raspberry Pi",
  "NFC",
  "Docker",
  "GitHub Actions",
  "C#",
  "Dart",
  "Linux",
]
