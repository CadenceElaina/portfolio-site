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
  role: "Software engineer · CSed research",
  tagline:
    "I build full-stack software and research how learning systems can provide better feedback.",
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

// Research copy is the LinkedIn bio verbatim (em dash swapped for commas).
// Only `title` and the thread titles are added labels.
// Coursework with course codes (from the unofficial transcript). `current` is the
// in-progress term: move finished courses into `completed` (or drop them) each term.
export const COURSES = {
  completed: [
    { code: "ITSC 2214", title: "Data Structures & Algorithms" },
    { code: "ITSC 2175", title: "Logic & Algorithms" },
    { code: "ITSC 3160", title: "Database Design & Implementation" },
    { code: "MATH 1241/1242", title: "Calculus I & II" },
  ],
  current: {
    term: "Fall 2026",
    items: [
      { code: "ITSC 3155", title: "Software Engineering" },
      { code: "ITIS 4166", title: "Backend Application Development" },
      { code: "ITSC 2181", title: "Introduction to Computer Systems" },
      { code: "MATH 2164", title: "Matrices & Linear Algebra" },
      { code: "STAT 2122", title: "Intro to Probability & Statistics" },
      { code: "ITSC 3688", title: "Computing and AI: Ethics, Society & Communication" },
    ],
  },
};

export const RESEARCH = {
  status: "Undergraduate research · UNC Charlotte",
  title: "Finding where students get stuck",
  lead: "Problem decomposition is a foundational skill needed for programming and CS applications. Understanding where the gap is for students, whether procedural (concepts, logic), declarative (syntax, facts), or both, enables learning systems to direct them to appropriate practice and explanations.",
  threads: [
    {
      title: "Prerequisite models",
      body: "I'm working on prerequisite models that map to the requirements of solving problems within a course, paired with labels on each problem for the procedural and declarative skills it takes to solve.",
    },
    {
      title: "Knowledge tracing",
      body: "Combined with knowledge tracing methods, that structure can potentially identify where a student's gaps are. Once the gaps and misconceptions are named, the feedback and direction a system provides can actually target them.",
    },
    {
      title: "LLM-assisted feedback",
      body: "Instructors and TAs can't meet every student's needs at every moment. I'm interested in where LLMs fit into that shortfall and how to make the process iterative to keep students engaged. While LLMs cannot replace instructor assistance, they may be effective in identifying students' gaps, providing adequate feedback, and escalating to the appropriate resource when appropriate.",
    },
  ],
  principle:
    "The goal I keep coming back to is engagement and resilience ahead of optimal strategy. Any practice is better than none.",
  closing:
    "So much more goes into the process and there are countless factors at play simultaneously, but I hope my efforts move the needle in a positive direction.",
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
