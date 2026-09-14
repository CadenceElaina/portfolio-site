// Shared copy and data for the redesign variants (src/variants/*).
// Em dashes removed on purpose; keep it that way when editing.

export const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "research", label: "Research" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export const SECTION_IDS = NAV_LINKS.map((l) => l.id);

export const PROFILE = {
  name: "Cadence Anderson",
  role: "Software engineer · CS education research",
  tagline:
    "I build full-stack software and research how learning systems can find where students get stuck.",
  seeking: "Seeking Summer 2027 internships and research roles",
  email: "cadence.anderson88@gmail.com",
  github: "https://github.com/CadenceElaina",
  linkedin: "https://www.linkedin.com/in/cadence-anderson-7a6a6737a/",
  resume: "/swe_resume.pdf",
};

export const HIGHLIGHTS = [
  { label: "Research", value: "CS education and adaptive learning systems" },
  { label: "Studying", value: "B.S. Computer Science (Data Science), UNC Charlotte, Spring 2027" },
  { label: "Previously", value: "Six years in financial services, teller to financial advisor" },
  { label: "Seeking", value: "Summer 2027 SWE internships and research positions" },
];

export const ABOUT = [
  "My current focuses are undergraduate research in CS education and adaptive learning systems, preparing for technical interviews, and applying my coursework to work I find meaningful.",
  "Before this I spent six years in financial services, progressing from teller to financial advisor. I managed client relationships, executed trades, and drove process improvements adopted by 200+ advisors nationally.",
  "In early 2026 I returned to UNCC full-time to finish my degree. The switch started earlier: I'd already completed the University of Helsinki's Java MOOC and Full Stack Open and built multiple full-stack apps.",
];

export const EDUCATION = {
  degree: "B.S. Computer Science",
  school: "UNC Charlotte",
  concentration: "Data Science",
  graduating: "Spring 2027",
  coursework: [
    "Data Structures & Algorithms",
    "Logic & Algorithms",
    "Database Design & Implementation",
    "Calculus I–II",
  ],
};

export const RESEARCH = {
  status: "Undergraduate research · UNC Charlotte",
  title: "Finding where students get stuck",
  lead: "Problem decomposition is a foundational skill for programming. Knowing whether a student's gap is procedural (concepts, logic), declarative (syntax, facts), or both lets a learning system direct them to the right practice and explanation.",
  threads: [
    {
      title: "Prerequisite models",
      body: "Models that map the requirements of solving problems within a course, paired with labels on each problem for the procedural and declarative skills it takes to solve.",
    },
    {
      title: "Knowledge tracing",
      body: "Combined with that structure, knowledge tracing methods can potentially identify where a student's gaps are. Once gaps and misconceptions are named, feedback can actually target them.",
    },
    {
      title: "LLM-assisted feedback",
      body: "Instructors and TAs can't meet every student's needs at every moment. I'm interested in where LLMs fit that shortfall: identifying gaps, giving adequate feedback, and escalating to the right resource, iteratively enough to keep students engaged.",
    },
  ],
  principle: "Engagement and resilience ahead of optimal strategy. Any practice is better than none.",
};

// `stack` is ordered top layer first (what the user touches) down to the foundation.
export const PROJECTS = [
  {
    id: "finch",
    title: "Finch",
    featured: true,
    category: "Fintech · AI",
    summary: "Market intelligence dashboard with real-time stock data and AI-powered research.",
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
    stack: [
      { layer: "Client", items: ["React", "TypeScript", "Vite", "TanStack Query"] },
      { layer: "Server", items: ["Node.js", "Gemini 2.5 Flash"] },
      { layer: "Cache", items: ["Redis"] },
      { layer: "Hosting", items: ["Vercel", "Vercel Cron"] },
    ],
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
      "Spaced repetition for LeetCode interview prep. Solve a problem, rate your recall, and Aurora schedules your next review.",
    stats: [
      { value: "FSRS", label: "modified scheduling algorithm" },
      { value: "4", label: "weighted readiness factors" },
      { value: "18", label: "problem categories tracked" },
    ],
    bullets: [
      "Modified FSRS algorithm with custom stability updates: outcome multipliers and retrievability-decay modifiers calibrated to coding problem retention patterns",
      "0–100 composite readiness score weighting coverage (30%), retention (40%), category balance (20%), and consistency (10%) to project interview-day capacity via day-by-day simulation",
      "Free and open source, with GitHub webhook sync for automatic submission tracking and a timed mock interview mode built from your weakest categories",
    ],
    stack: [
      { layer: "App", items: ["Next.js", "TypeScript", "Tailwind CSS"] },
      { layer: "ORM", items: ["Drizzle"] },
      { layer: "Database", items: ["PostgreSQL", "Supabase"] },
    ],
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
    summary: "Full-stack journaling app with production-grade auth and 59 integration tests.",
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
    stack: [
      { layer: "Client", items: ["React"] },
      { layer: "Server", items: ["Node.js", "Express", "JWT", "Helmet.js"] },
      { layer: "Database", items: ["MongoDB"] },
    ],
    tested: ["Jest", "Supertest"],
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
    summary: "Self-hosted personal finance dashboard with multi-stage bank statement import.",
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
    stack: [
      { layer: "Client", items: ["React", "Chart.js"] },
      { layer: "Proxy", items: ["Nginx"] },
      { layer: "Server", items: ["Node.js", "Express"] },
      { layer: "Database", items: ["MongoDB"] },
      { layer: "Runtime", items: ["Docker"] },
    ],
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

export const PROJECT_ANCHORS = PROJECTS.map((p) => `project-${p.id}`);

export const SKILLS = [
  { category: "Languages", items: ["JavaScript (ES6+)", "TypeScript", "Java", "Python", "SQL"] },
  { category: "Frontend", items: ["React", "Next.js", "Vite", "Tailwind CSS"] },
  { category: "Backend", items: ["Node.js", "Express", "REST APIs"] },
  { category: "Databases", items: ["MongoDB", "PostgreSQL", "Redis"] },
  { category: "Tools & Platforms", items: ["Git", "Docker", "Linux/Unix", "Vercel"] },
  { category: "Testing", items: ["Jest", "Supertest"] },
];

export const CONTACT_BLURB =
  "I'm seeking software engineering internships for Summer 2027 and research positions. If you're working on something interesting, especially in learning systems, CS education, or data, I'd love to connect.";
