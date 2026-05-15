"use client"

import { useState, useEffect } from "react"
import { Mail, Phone, MapPin, Linkedin, Github, Globe, Sun, Moon, Languages, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const experiencesEn = [
  {
    title: "Data Governance Specialist – Ministry of Hajj & Umrah",
    date: "Present",
    type: "Data Management Office",
    items: [
      "Contributed to the implementation of data governance initiatives aligned with national compliance frameworks (NDI)",
      "Participated in designing and developing digital systems for managing and tracking domains, criteria, and documents using ASP.NET, Next.js, and React",
      "Structured and classified data across multiple domains and standards to enhance traceability and decision-making",
      "Developed interactive dashboards using Power BI to monitor KPIs and track progress in real-time",
      "Contributed to building the DMO Tracker system for managing document lifecycle, statuses, and review workflows",
      "Acted as Project Manager for Managed Services within the Data Management Office, overseeing project execution, coordinating between stakeholders, and ensuring timely delivery of data-related initiatives",
      "Automated document review processes, reducing manual effort and improving operational efficiency",
      "Assisted in preparing and reviewing data sharing agreements in compliance with data governance policies",
      "Supported data management activities including data collection, validation, and quality improvement",
      "Collaborated with cross-functional teams to ensure data integration and smooth data flow across departments",
      "Utilized Excel, Word, and PowerPoint for reporting, analysis, and stakeholder presentations",
      "Participated in requirements analysis and delivering digital solutions supporting the organization's digital transformation",
    ],
  },
  {
    title: "Abadnet Institute for Training - Development Program",
    date: "Jun 2025 – Oct 2025",
    type: "Full Stack Web & Mobile Development Bootcamp",
    items: [
      "Developed full-stack web applications using ASP.NET Core MVC and Entity Framework Core",
      "Designed responsive front-end interfaces using HTML, CSS, JavaScript, and Bootstrap",
      "Built and deployed cross-platform mobile apps using Flutter integrated with Web APIs",
      "Created and managed SQL Server databases, performing CRUD operations and optimizing queries",
      "Applied Object-Oriented Programming (OOP) & Clean Architecture principles for structured development",
      "Collaborated in building a complete E-commerce web and mobile system from backend to deployment",
    ],
  },
  {
    title: "Digital Transformation Department - Makkah Municipality",
    date: "Jun 2024 – Aug 2024",
    type: "Programs Department",
    items: [
      "Learned Back-End development using Laravel (PHP) and applied it to real-world projects",
      "Gained experience in Front-End development and UI integration",
      "Used Figma for designing and prototyping user interfaces",
      "Developed user interfaces and connected them with backend logic",
      "Designed and managed database structures for internal applications",
      "Conducted data analysis on real datasets to extract insights",
      "Participated in the development of a live Course and certification system, successfully implemented and deployed",
    ],
  },
]

const experiencesAr = [
  {
    title: "أخصائي حوكمة البيانات – وزارة الحج والعمرة",
    date: "حالياً",
    type: "مكتب إدارة البيانات",
    items: [
      "المساهمة في تنفيذ مبادرات حوكمة البيانات المتوافقة مع أطر الامتثال الوطنية (NDI)",
      "المشاركة في تصميم وتطوير أنظمة رقمية لإدارة وتتبع المجالات والمعايير والوثائق باستخدام ASP.NET و Next.js و React",
      "هيكلة وتصنيف البيانات عبر مجالات ومعايير متعددة لتعزيز التتبع واتخاذ القرار",
      "تطوير لوحات معلومات تفاعلية باستخدام Power BI لمراقبة مؤشرات الأداء الرئيسية وتتبع التقدم في الوقت الفعلي",
      "المساهمة في بناء نظام DMO Tracker لإدارة دورة حياة الوثائق والحالات وسير عمل المراجعة",
      "العمل كمدير مشروع للخدمات المُدارة ضمن مكتب إدارة البيانات، والإشراف على تنفيذ المشاريع والتنسيق بين أصحاب المصلحة وضمان التسليم في الوقت المحدد للمبادرات المتعلقة بالبيانات",
      "أتمتة عمليات مراجعة الوثائق، مما قلل من الجهد اليدوي وحسّن الكفاءة التشغيلية",
      "المساعدة في إعداد ومراجعة اتفاقيات مشاركة البيانات وفقاً لسياسات حوكمة البيانات",
      "دعم أنشطة إدارة البيانات بما في ذلك جمع البيانات والتحقق منها وتحسين الجودة",
      "التعاون مع الفرق متعددة الوظائف لضمان تكامل البيانات وتدفقها السلس عبر الإدارات",
      "استخدام Excel و Word و PowerPoint لإعداد التقارير والتحليل والعروض التقديمية لأصحاب المصلحة",
      "المشاركة في تحليل المتطلبات وتقديم الحلول الرقمية الداعمة للتحول الرقمي للمنظمة",
    ],
  },
  {
    title: "معهد أبادنت للتدريب - برنامج تطوير",
    date: "يونيو 2025 – أكتوبر 2025",
    type: "معسكر تطوير الويب والموبايل المتكامل",
    items: [
      "تطوير تطبيقات ويب متكاملة باستخدام ASP.NET Core MVC و Entity Framework Core",
      "تصميم واجهات أمامية متجاوبة باستخدام HTML و CSS و JavaScript و Bootstrap",
      "بناء ونشر تطبيقات موبايل متعددة المنصات باستخدام Flutter مع Web APIs",
      "إنشاء وإدارة قواعد بيانات SQL Server وتنفيذ عمليات CRUD وتحسين الاستعلامات",
      "تطبيق مبادئ البرمجة الكائنية والهندسة النظيفة للتطوير المنظم",
      "التعاون في بناء نظام تجارة إلكترونية كامل للويب والموبايل من الخلفية إلى النشر",
    ],
  },
  {
    title: "إدارة التحول الرقمي - أمانة مكة المكرمة",
    date: "يونيو 2024 – أغسطس 2024",
    type: "إدارة البرامج",
    items: [
      "تعلم تطوير الواجهة الخلفية باستخدام Laravel (PHP) وتطبيقها على مشاريع حقيقية",
      "اكتساب خبرة في تطوير الواجهة الأمامية ودمج واجهة المستخدم",
      "استخدام Figma لتصميم وإنشاء نماذج أولية لواجهات المستخدم",
      "تطوير واجهات المستخدم وربطها بمنطق الواجهة الخلفية",
      "تصميم وإدارة هياكل قواعد البيانات للتطبيقات الداخلية",
      "إجراء تحليل البيانات على مجموعات البيانات الحقيقية لاستخراج الرؤى",
      "المشاركة في تطوير نظام دورات وشهادات مباشر، تم تنفيذه ونشره بنجاح",
    ],
  },
]

const projectsEn = [
  {
    title: "E-Commerce Web & Mobile Solution",
    date: "Jun 2025 - Oct 2025",
    items: [
      "Designed and developed a full e-commerce system as the final project of the Full Stack Bootcamp",
      "Built the web version with ASP.NET Core MVC and Entity Framework Core, and the mobile app using Flutter",
      "Implemented RESTful APIs, Firebase authentication, and SQL database integration",
      "Supported product listing, shopping cart, and payment simulation",
    ],
  },
  {
    title: "Reef Website",
    date: "Jul 2025",
    items: [
      "Designed and developed a responsive front-end website showcasing coral and marine life concepts",
      "Built using HTML, CSS, and Bootstrap with modern UI components and animations",
      "Focused on aesthetic layout, responsive design, and smooth navigation",
      "Served as a creative portfolio piece inspired by personal reef and aquarium projects",
    ],
  },
  {
    title: "Hajj Authentication System",
    date: "Aug 2024 - Mar 2025",
    items: [
      "Developed a Hajj Authentication System to enhance the Nusuk card by integrating a scanning mechanism at authorized bus boarding points",
      "Utilized Linux, Python, and Raspberry Pi for system development and deployment",
      "Integrated NFC scanning to verify pilgrim permits in real-time",
      "Supported efforts to preserve the safety, sanctity, and logistics of the Hajj experience",
    ],
  },
  {
    title: "Course and Certification System",
    date: "Jun 2024 - Aug 2024",
    items: [
      "Developed a platform to manage courses, enrollments, and certification issuance for learners",
      "Built using Laravel (PHP), MySQL, JavaScript, and Bootstrap",
      "Implemented user authentication, course management, progress tracking, and certificate generation",
      "Designed responsive UI and deployed on shared hosting",
    ],
  },
  {
    title: "SwiftMemory",
    date: "Jul 2024 - Aug 2024",
    items: [
      "Built a social platform that allows users to send scheduled messages (text, image, audio, or music) that appear to recipients after a set time",
      "Developed with Laravel (PHP), MySQL, JavaScript, and Bootstrap",
      "Implemented authentication system, user profiles, media upload, and scheduling logic",
      "Designed responsive UI and deployed on shared hosting",
    ],
  },
  {
    title: "Smart Course Assistant",
    date: "Jun 2024 - Jul 2024",
    items: [
      "Created an interactive learning platform that integrates an AI assistant to help trainees during online courses",
      "Designed a UI/UX prototype for a personal portfolio website focusing on clarity and modern aesthetics",
      "Created using Figma with a grid-based responsive layout system",
    ],
  },
]

const projectsAr = [
  {
    title: "حل تجارة إلكترونية للويب والموبايل",
    date: "يونيو 2025 - أكتوبر 2025",
    items: [
      "تصميم وتطوير نظام تجارة إلكترونية كامل كمشروع نهائي لمعسكر التطوير المتكامل",
      "بناء نسخة الويب باستخدام ASP.NET Core MVC و Entity Framework Core وتطبيق الموبايل باستخدام Flutter",
      "تنفيذ واجهات RESTful APIs ومصادقة Firebase وتكامل قاعدة بيانات SQL",
      "دعم عرض المنتجات وسلة التسوق ومحاكاة الدفع",
    ],
  },
  {
    title: "موقع ريف",
    date: "يوليو 2025",
    items: [
      "تصميم وتطوير م��قع ويب متجاوب يعرض مفاهيم الشعاب المرجانية والحياة البحرية",
      "بناء باستخدام HTML و CSS و Bootstrap مع مكونات واجهة حديثة ورسوم متحركة",
      "التركيز على التصميم الجمالي والتجاوب والتنقل السلس",
      "عمل كقطعة إبداعية مستوحاة من مشاريع الشعاب المرجانية وأحواض السمك الشخصية",
    ],
  },
  {
    title: "نظام توثيق الحاج",
    date: "أغسطس 2024 - مارس 2025",
    items: [
      "تطوير نظام توثيق الحاج لتعزيز بطاقة نسك من خلال دمج آلية المسح في نقاط صعود الحافلات المعتمدة",
      "استخدام Linux و Python و Raspberry Pi لتطوير ونشر النظام",
      "دمج مسح NFC للتحقق من تصاريح الحجاج في الوقت الفعلي",
      "دعم الجهود للحفاظ على سلامة وقدسية ولوجستيات تجربة الحج",
    ],
  },
  {
    title: "نظام الدورات والشهادات",
    date: "يونيو 2024 - أغسطس 2024",
    items: [
      "تطوير منصة لإدارة الدورات والتسجيل وإصدار الشهادات للمتعلمين",
      "بناء باستخدام Laravel (PHP) و MySQL و JavaScript و Bootstrap",
      "تنفيذ مصادقة المستخدم وإدارة الدورات وتتبع التقدم وإنشاء الشهادات",
      "تصميم واجهة متجاوبة ونشر على استضافة مشتركة",
    ],
  },
  {
    title: "سويفت ميموري",
    date: "يوليو 2024 - أغسطس 2024",
    items: [
      "بناء منصة اجتماعية تتيح للمستخدمين إرسال رسائل مجدولة (نص، صورة، صوت، أو موسيقى) تظهر للمستلمين بعد وقت محدد",
      "التطوير باستخدام Laravel (PHP) و MySQL و JavaScript و Bootstrap",
      "تنفيذ نظام المصادقة وملفات المستخدمين ورفع الوسائط ومنطق الجدولة",
      "تصميم واجهة متجاوبة ونشر على استضافة مشتركة",
    ],
  },
  {
    title: "مساعد الدورات الذكي",
    date: "يونيو 2024 - يوليو 2024",
    items: [
      "إنشاء منصة تعلم تفاعلية تدمج مساعد ذكاء اصطناعي لمساعدة المتدربين أثناء الدورات عبر الإنترنت",
      "تصميم نموذج UI/UX لموقع محفظة شخصية مع التركيز على الوضوح والجماليات الحديثة",
      "إنشاء باستخدام Figma مع نظام تخطيط شبكي متجاوب",
    ],
  },
]

const certificationsEn = [
  { name: "Mobile Application Development (Flutter)", provider: "Abadnet Institute for Training", date: "Jun 2025 – Oct 2025" },
  { name: "ASP.NET Core MVC", provider: "Abadnet Institute for Training", date: "Jun 2025 – Oct 2025" },
  { name: "C# Programming Training", provider: "Abadnet Institute for Training", date: "Jun 2025 – Oct 2025" },
  { name: "Web Page Design (HTML & CSS & JavaScript)", provider: "Abadnet Institute for Training", date: "Jun 2025 – Oct 2025" },
  { name: "Database Fundamentals & Concepts (Oracle)", provider: "Abadnet Institute for Training", date: "Jun 2025 – Oct 2025" },
  { name: "Figma UI/UX Crash Course", provider: "Udemy", date: "Aug 2025" },
  { name: "Software Development Life Cycle", provider: "Learning Space", date: "Dec 2024" },
  { name: "Learn to Build an e-commerce app with .Net Core and Angular", provider: "Udemy", date: "Nov 2024" },
]

const certificationsAr = [
  { name: "تطوير تطبيقات الجوال (Flutter)", provider: "معهد أبادنت للتدريب", date: "يونيو 2025 – أكتوبر 2025" },
  { name: "ASP.NET Core MVC", provider: "معهد أبادنت للتدريب", date: "يونيو 2025 – أكتوبر 2025" },
  { name: "تدريب برمجة C#", provider: "معهد أبادنت للتدريب", date: "يونيو 2025 – أكتوبر 2025" },
  { name: "تصميم صفحات الويب (HTML و CSS و JavaScript)", provider: "معهد أبادنت للتدريب", date: "يونيو 2025 – أكتوبر 2025" },
  { name: "أساسيات ومفاهيم قواعد البيانات (Oracle)", provider: "معهد أبادنت للتدريب", date: "يونيو 2025 – أكتوبر 2025" },
  { name: "دورة مكثفة في Figma UI/UX", provider: "Udemy", date: "أغسطس 2025" },
  { name: "دورة حياة تطوير البرمجيات", provider: "Learning Space", date: "ديسمبر 2024" },
  { name: "تعلم بناء تطبيق تج��رة إلكترونية باستخدام .Net Core و Angular", provider: "Udemy", date: "نوفمبر 2024" },
]

const translations = {
  en: {
    name: "Abdullah Sendy",
    title: "Computer Engineer | Developer",
    profile:
      "Developed projects for diverse clients, applied research, teamwork, and problem-solving. Continuously invest in learning and growth to stay updated in the software engineering field.",
    about: "About",
    experience: "Experience",
    education: "Education",
    projects: "Projects",
    skills: "Skills",
    certifications: "Certifications",
    languages: "Languages",
    contact: "Contact",
    downloadCV: "Download CV",
    copyright: "© 2025 Abdullah Khalid Sendy. All rights reserved.",
    educationTitle: "Bachelor of Computer Engineering",
    educationDate: "Aug 2021 – Jun 2025",
    educationInstitution: "Umm Al-Qura University",
    educationAchievements: "ICPC Certificate | Technical Head of Computer Science at Microsoft SC AOU",
    technicalSkills: "Technical Skills",
    softSkills: "Soft Skills",
    backend: "Backend",
    aiMl: "AI & Machine Learning",
    databases: "Databases & ORM",
    coreConcepts: "Core Concepts",
    devops: "DevOps & Deployment",
    programming: "Programming Languages",
    mobile: "Mobile Development",
    softSkillsList: [
      "Teamwork",
      "Research",
      "Time Management",
      "Communication Skills",
      "Presentation Skills",
    ],
  },
  ar: {
    name: "عبدالله سندي",
    title: "مهندس حاسب | مطور",
    profile:
      "طورت مشاريع لعملاء متنوعين، وطبقت البحث والعمل الجماعي وحل المشكلات. أستثمر باستمرار في التعلم والنمو للبقاء على اطلاع في مجال هندسة البرمجيات.",
    about: "نبذة",
    experience: "الخبرة المهنية",
    education: "التعليم",
    projects: "المشاريع",
    skills: "المهارات",
    certifications: "الشهادات",
    languages: "اللغات",
    contact: "التواصل",
    downloadCV: "تحميل السيرة الذاتية",
    copyright: "© 2025 عبدالله خالد سندي. جميع الحقوق محفوظة.",
    educationTitle: "بكالوريوس هندسة الحاسب",
    educationDate: "أغسطس 2021 – يونيو 2025",
    educationInstitution: "جامعة أم القرى",
    educationAchievements: "شهادة ICPC | رئيس تقني لعلوم الحاسب في Microsoft SC AOU",
    technicalSkills: "المهارات التقنية",
    softSkills: "المهارات الشخصية",
    backend: "الخلفية",
    aiMl: "الذكاء الاصطناعي وتعلم الآلة",
    databases: "قواعد البيانات و ORM",
    coreConcepts: "المفاهيم الأساسية",
    devops: "DevOps والنشر",
    programming: "لغات البرمجة",
    mobile: "تطوير الموبايل",
    softSkillsList: [
      "العمل الجماعي",
      "البحث",
      "إدارة الوقت",
      "مهارات التواصل",
      "مهارات العرض",
    ],
  },
}

export default function CVPage() {
  const [language, setLanguage] = useState<"en" | "ar">("en")
  const [theme, setTheme] = useState<"dark" | "light">("dark")
  const [activeSection, setActiveSection] = useState("about")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const t = translations[language]
  const isRTL = language === "ar"
  const experiences = language === "en" ? experiencesEn : experiencesAr
  const projects = language === "en" ? projectsEn : projectsAr
  const certifications = language === "en" ? certificationsEn : certificationsAr

  useEffect(() => {
    document.documentElement.setAttribute("dir", isRTL ? "rtl" : "ltr")
    document.documentElement.className = theme
  }, [language, theme, isRTL])

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "ar" : "en"))
  }

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"))
  }

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    setMobileMenuOpen(false)
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: "smooth" })
  }

  const skillCategories = [
    {
      label: t.backend,
      items: ["OOP", "ASP.NET Core", "Web API", "MVC", ".NET Framework", "Laravel"],
    },
    {
      label: t.aiMl,
      items: ["Machine Learning Basics", "Building & Integrating AI Models", "Prompt Engineering"],
    },
    {
      label: t.databases,
      items: ["SQL Server", "MySQL", "Entity Framework"],
    },
    {
      label: t.coreConcepts,
      items: ["Problem Solving", "Data Structures", "Algorithms", "SOLID", "Design Patterns", "Agile"],
    },
    {
      label: t.devops,
      items: ["Git", "GitHub", "GitHub Actions", "Docker", "CI/CD"],
    },
    {
      label: t.programming,
      items: ["PHP", "C#", "Java", "Python", "JavaScript", "Dart"],
    },
    {
      label: t.mobile,
      items: ["Flutter", "Firebase", "REST API Integration"],
    },
  ]

  return (
    <div
      className={`min-h-screen bg-background text-foreground transition-all duration-300 ${theme === "dark" ? "grid-bg" : ""}`}
    >
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="font-semibold text-lg">{t.name}</span>
            </div>

            <div className="hidden md:flex items-center gap-6">
              <nav className="flex items-center gap-6">
                {["about", "experience", "education", "projects", "skills", "certifications"].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`text-sm font-medium transition-colors hover:text-accent ${
                      activeSection === section ? "text-accent" : "text-muted-foreground"
                    }`}
                  >
                    {t[section as keyof typeof t] as string}
                  </button>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={toggleTheme} className="w-9 h-9 p-0">
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>

              <Button variant="ghost" size="sm" onClick={toggleLanguage} className="w-9 h-9 p-0">
                <Languages className="w-4 h-4" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden w-9 h-9 p-0"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-border pt-4">
              <nav className="flex flex-col gap-3">
                {["about", "experience", "education", "projects", "skills", "certifications"].map((section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`text-left text-sm font-medium transition-colors hover:text-accent ${
                      activeSection === section ? "text-accent" : "text-muted-foreground"
                    }`}
                  >
                    {t[section as keyof typeof t] as string}
                  </button>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      <section id="about" className="pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className={`space-y-6 ${isRTL ? "text-right" : "text-left"}`}>
              <div className="space-y-2">
                <h1 className="text-5xl lg:text-7xl font-bold text-balance leading-tight">{t.name}</h1>
                <div className="w-24 h-1 bg-accent glow-effect"></div>
              </div>

              <p className="text-xl text-accent font-medium">{t.title}</p>

              <p className="text-muted-foreground text-pretty leading-relaxed text-lg max-w-2xl">{t.profile}</p>
            </div>

            <div className="relative">
              <Card className="p-8 bg-card/50 backdrop-blur-sm border-accent/20">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                    <a href="mailto:sendia663@gmail.com" className="hover:text-accent transition-colors">
                      sendia663@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                    <span>+966 546462972</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="w-5 h-5 text-accent flex-shrink-0" />
                    <span>{isRTL ? "مكة المكرمة، السعودية" : "Makkah, Saudi Arabia"}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Globe className="w-5 h-5 text-accent flex-shrink-0" />
                    <a
                      href="https://abdullahsendy.vercel.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-accent transition-colors"
                    >
                      abdullahsendy.vercel.app
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Linkedin className="w-5 h-5 text-accent flex-shrink-0" />
                    <a
                      href="https://www.linkedin.com/in/abdullah-sendy-b42a40229/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-accent transition-colors"
                    >
                      abdullah-sendy
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Github className="w-5 h-5 text-accent flex-shrink-0" />
                    <a
                      href="https://github.com/Abdull3hSendy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-accent transition-colors"
                    >
                      Abdull3hSendy
                    </a>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 space-y-20 pb-20">
        {/* Experience Section */}
        <section id="experience" className="space-y-8">
          <h2 className="text-3xl font-bold text-accent text-balance">{t.experience}</h2>

          <div className="space-y-6">
            {experiences.map((exp, idx) => (
              <Card key={idx} className="p-8 bg-card/50 backdrop-blur-sm border-accent/20">
                <div className="space-y-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold">{exp.title}</h3>
                      <p className="text-muted-foreground">{exp.type}</p>
                    </div>
                    <span className="text-sm text-accent font-medium px-3 py-1 bg-accent/10 rounded-full whitespace-nowrap">
                      {exp.date}
                    </span>
                  </div>

                  <ul className="space-y-3">
                    {exp.items.map((item, index) => (
                      <li key={index} className="flex items-start gap-3 text-muted-foreground">
                        <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="space-y-8">
          <h2 className="text-3xl font-bold text-accent text-balance">{t.education}</h2>

          <Card className="p-8 bg-card/50 backdrop-blur-sm border-accent/20">
            <div className="space-y-4">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold">{t.educationTitle}</h3>
                  <p className="text-muted-foreground">{t.educationInstitution}</p>
                </div>
                <span className="text-sm text-accent font-medium px-3 py-1 bg-accent/10 rounded-full whitespace-nowrap">
                  {t.educationDate}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {t.educationAchievements}
              </p>
            </div>
          </Card>
        </section>

        {/* Projects Section */}
        <section id="projects" className="space-y-8">
          <h2 className="text-3xl font-bold text-accent text-balance">{t.projects}</h2>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, idx) => (
              <Card key={idx} className="p-8 bg-card/50 backdrop-blur-sm border-accent/20">
                <div className="space-y-6">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-semibold">{project.title}</h3>
                    <span className="text-sm text-accent font-medium px-3 py-1 bg-accent/10 rounded-full self-start">
                      {project.date}
                    </span>
                  </div>

                  <ul className="space-y-3">
                    {project.items.map((item, index) => (
                      <li key={index} className="flex items-start gap-3 text-muted-foreground">
                        <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="space-y-8">
          <h2 className="text-3xl font-bold text-accent text-balance">{t.skills}</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 bg-card/50 backdrop-blur-sm border-accent/20">
              <h3 className="text-xl font-semibold mb-6">{t.technicalSkills}</h3>
              <div className="space-y-6">
                {skillCategories.map((category, idx) => (
                  <div key={idx}>
                    <p className="text-sm font-medium text-muted-foreground mb-3">{category.label}</p>
                    <div className="flex flex-wrap gap-2">
                      {category.items.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full border border-accent/20"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-8 bg-card/50 backdrop-blur-sm border-accent/20">
              <h3 className="text-xl font-semibold mb-6">{t.softSkills}</h3>
              <ul className="space-y-3">
                {t.softSkillsList.map((skill, index) => (
                  <li key={index} className="flex items-start gap-3 text-muted-foreground">
                    <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </section>

        {/* Certifications Section */}
        <section id="certifications" className="space-y-8">
          <h2 className="text-3xl font-bold text-accent text-balance">{t.certifications}</h2>

          <div className="grid md:grid-cols-2 gap-4">
            {certifications.map((cert, idx) => (
              <Card key={idx} className="p-6 bg-card/50 backdrop-blur-sm border-accent/20">
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold">{cert.name}</h3>
                  <p className="text-sm text-muted-foreground">{cert.provider}</p>
                  <span className="text-sm text-accent font-medium px-3 py-1 bg-accent/10 rounded-full self-start">
                    {cert.date}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Languages Section */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-accent text-balance">{t.languages}</h2>
          <div className="flex gap-4">
            <Card className="px-6 py-4 bg-card/50 backdrop-blur-sm border-accent/20">
              <p className="font-medium">{isRTL ? "العربية" : "Arabic"}</p>
              <p className="text-sm text-muted-foreground">{isRTL ? "اللغة الأم" : "Native"}</p>
            </Card>
            <Card className="px-6 py-4 bg-card/50 backdrop-blur-sm border-accent/20">
              <p className="font-medium">{isRTL ? "الإنجليزية" : "English"}</p>
              <p className="text-sm text-muted-foreground">{isRTL ? "بطلا��ة" : "Fluent"}</p>
            </Card>
          </div>
        </section>
      </div>

      <footer id="contact" className="border-t border-border bg-card/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-12 text-center space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-accent">{t.contact}</h2>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <a
                href="mailto:sendia663@gmail.com"
                className="flex items-center gap-2 hover:text-accent transition-colors"
              >
                <Mail className="w-4 h-4" />
                sendia663@gmail.com
              </a>
              <span className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                +966 546462972
              </span>
              <a
                href="https://www.linkedin.com/in/abdullah-sendy-b42a40229/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-accent transition-colors"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
              <a
                href="https://github.com/Abdull3hSendy"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-accent transition-colors"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            </div>
          </div>

          <p className="text-sm text-muted-foreground border-t border-border pt-6">{t.copyright}</p>
        </div>
      </footer>
    </div>
  )
}
