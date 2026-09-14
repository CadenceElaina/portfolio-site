// Shared copy and data for the redesign variants (src/variants/*).
// Em dashes removed on purpose; keep it that way when editing.

export const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export const SECTION_IDS = NAV_LINKS.map((l) => l.id);

export const PROFILE = {
  name: "Cadence Anderson",
  role: "Software Engineer",
  email: "cadence.anderson88@gmail.com",
  github: "https://github.com/CadenceElaina",
  linkedin: "https://www.linkedin.com/in/cadence-anderson-7a6a6737a/",
  resume: "/swe_resume.pdf",
  intro:
    "Software engineer and former financial professional with six years in the industry, from teller to financial advisor. I build full-stack web applications and I'm pursuing a B.S. in Computer Science (Data Science concentration) at UNC Charlotte.",
  seeking: "Open to summer 2027 internships",
};

export const HIGHLIGHTS = [
  { label: "Previously", value: "Financial Advisor, Wells Fargo" },
  { label: "In finance", value: "6 years, teller to advisor" },
  { label: "Studying", value: "B.S. Computer Science, UNC Charlotte" },
  { label: "Seeking", value: "Summer 2027 internship" },
];

export const ABOUT = [
  "I spent six years in financial services at Wells Fargo, starting as a teller and working up to Financial Advisor. I managed client relationships, executed trades, and identified process improvements adopted by 200+ advisors nationally.",
  "In February 2026 I resigned to return to UNCC full-time and finish my Computer Science degree. The transition started well before that. I completed the University of Helsinki's Java MOOC and Full Stack Open and built multiple full-stack applications before ever setting foot back in a classroom.",
  "I'm targeting backend and full-stack engineering roles with a focus on fintech, where I can put six years of domain knowledge to work alongside my technical skills. I'm looking for a summer 2027 internship and full-time roles after graduation.",
];

export const EDUCATION = {
  degree: "B.S. Computer Science",
  school: "UNC Charlotte",
  expected: "Expected Fall 2027",
  gpa: "3.66",
  concentration: "Data Science",
  coursework: [
    "Data Structures & Algorithms",
    "Logic & Algorithms",
    "Database Design & Implementation",
    "Calculus I–II",
  ],
};

export const PROJECTS = [
  {
    id: "finch",
    title: "Finch",
    featured: true,
    category: "Fintech · AI",
    summary:
      "Market intelligence dashboard with real-time stock data and AI-powered research.",
    stats: [
      { value: "~100ms", label: "time to first byte" },
      { value: "4", label: "API providers with circuit breakers" },
      { value: "3", label: "Gemini research modes" },
    ],
    bullets: [
      "~100ms TTFB via Vercel Cron + Redis pre-warming, edge caching with stale-while-revalidate, and React Query per-symbol hydration",
      "4-provider API cascade with independent circuit breakers and request deduplication via shared in-flight Promises",
      "Gemini 2.5 Flash integration across 3 modes: Google Search-grounded summaries, per-symbol analysis, and multi-turn research chat",
    ],
    tech: ["React", "TypeScript", "Vite", "Node.js", "TanStack Query", "Gemini AI", "Redis", "Vercel"],
    github: "https://github.com/CadenceElaina/finch",
    live: "https://finch-jade.vercel.app/",
    video: "https://youtu.be/17KT8b5eZ8M",
    images: ["/finch.png", "/finch1.png", "/finch2.png", "/finch4.png", "/finch5.png", "/finch6.png"],
  },
  {
    id: "aurora",
    title: "Aurora",
    featured: true,
    category: "Learning tool",
    summary:
      "Spaced repetition system for LeetCode interview prep. Like Anki, but calibrated for coding problems.",
    stats: [
      { value: "FSRS", label: "modified scheduling algorithm" },
      { value: "4", label: "weighted readiness factors" },
      { value: "OSS", label: "iterated on community feedback" },
    ],
    bullets: [
      "Modified FSRS algorithm with custom stability updates: outcome multipliers and retrievability-decay modifiers calibrated to coding problem retention patterns",
      "0–100 composite readiness score weighting coverage (30%), retention (40%), category balance (20%), and consistency (10%) to project interview-day capacity via day-by-day simulation",
      "Open-sourced and shared with developer communities; iterated on GitHub webhook sync for automated submission tracking and mock interview mode based on community feedback",
    ],
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Supabase", "Drizzle", "Tailwind CSS"],
    github: "https://github.com/CadenceElaina/aurora",
    live: "https://aurora-ascent.vercel.app/",
    video: "https://youtu.be/lsM-h6kZLMI",
    images: ["/aurora1.png", "/aurora2.png"],
  },
  {
    id: "journal",
    title: "Journal",
    featured: false,
    category: "Security · Testing",
    summary:
      "Full-stack journaling app with production-grade auth and 59 integration tests.",
    stats: [
      { value: "59", label: "integration tests" },
      { value: "TOTP", label: "2FA with hashed backup codes" },
      { value: "3-tier", label: "cross-tab token sync" },
    ],
    bullets: [
      "JWT access/refresh token rotation with cross-tab sync via 3-tier fallback (Web Locks API → BroadcastChannel → localStorage)",
      "TOTP 2FA with hashed backup codes, account lockout, Helmet.js headers, rate limiting, and input sanitization on all endpoints",
      "59 integration tests covering authorization enforcement, token invalidation, and pagination edge cases",
    ],
    tech: ["React", "Node.js", "Express", "MongoDB", "JWT", "Jest", "Supertest"],
    github: "https://github.com/CadenceElaina/journal",
    live: "https://journal-yje6.onrender.com/auth/login",
    video: "https://youtu.be/0oOCY7_ohQY",
    images: ["/journal.png", "/journal1.png", "/journal2.png", "/journal3.png"],
  },
  {
    id: "vireofi",
    title: "VireoFi",
    featured: false,
    category: "Personal finance",
    summary:
      "Self-hosted personal finance dashboard with multi-stage bank statement import.",
    stats: [
      { value: "4-tier", label: "merchant matcher" },
      { value: "CSV + PDF", label: "imports with duplicate detection" },
      { value: "3", label: "Dockerized services" },
    ],
    bullets: [
      "4-tier cascading merchant matcher (raw-description → exact-description → name-inclusion → keyword-scoring) with per-rule amount-range conditions",
      "Transaction fingerprinting for duplicate detection across CSV and PDF imports with format-specific parsers",
      "3-service Dockerized deployment (MongoDB, Express backend, Nginx reverse proxy)",
    ],
    tech: ["React", "Node.js", "Express", "MongoDB", "Docker", "Chart.js"],
    github: "https://github.com/CadenceElaina/vireofi",
    live: null,
    video: null,
    images: [
      "/vireo1.png",
      "/vireofi4.png",
      "/old-vireofi1.png",
      "/old-vireofi2.png",
      "/old-vireofi3.png",
      "/old-vireo1.png",
      "/old-vireo2.png",
      "/old-vireo3.png",
    ],
  },
];

export const SKILLS = [
  { category: "Languages", items: ["JavaScript (ES6+)", "TypeScript", "Java", "Python", "SQL"] },
  { category: "Frontend", items: ["React", "Next.js", "Vite", "Tailwind CSS"] },
  { category: "Backend", items: ["Node.js", "Express", "REST APIs"] },
  { category: "Databases", items: ["MongoDB", "PostgreSQL", "Redis"] },
  { category: "Tools & Platforms", items: ["Git", "Docker", "Linux/Unix", "Vercel"] },
  { category: "Testing", items: ["Jest", "Supertest"] },
];

export const CONTACT_BLURB =
  "I'm actively looking for software engineering internships for summer 2027 and full-time roles after graduation. If you're working on something interesting, especially in fintech or data, I'd love to connect.";
