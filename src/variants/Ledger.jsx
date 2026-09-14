import { useEffect, useState } from "react";
import {
  NAV_LINKS,
  SECTION_IDS,
  PROJECT_ANCHORS,
  PROFILE,
  HIGHLIGHTS,
  ABOUT,
  COURSES,
  RESEARCH,
  PROJECTS,
  SKILLS,
  CONTACT_BLURB,
} from "../content";
import {
  useActiveSection,
  useScrolled,
  useReveal,
  useBodyBackground,
  usePersistentState,
  REDUCED_MOTION,
  pad,
} from "../hooks";
import Carousel from "../components/Carousel";
import StackDiagram from "../components/StackDiagram";
import BarField from "../components/BarField";
import "./ledger.css";

// Background palettes: page ground plus bar colours (primary first, then accents).
// Grounds within a theme share a similar lightness so text contrast holds all cycle.
const LIGHT_PALETTES = [
  { bg: "#f5f1e8", bars: ["#1d5b43", "#9cc3ad", "#d4a95a"], alpha: 0.13, capAlpha: 0.22 },
  { bg: "#eef2ea", bars: ["#2f6d55", "#a9c7b8", "#e0a37c"], alpha: 0.13, capAlpha: 0.22 },
  { bg: "#edf0f4", bars: ["#2d4f7c", "#aebfd6", "#e3b25d"], alpha: 0.13, capAlpha: 0.22 },
  { bg: "#f6eeea", bars: ["#8a3b2e", "#e0b9ab", "#8fb3a0"], alpha: 0.13, capAlpha: 0.22 },
];

const DARK_PALETTES = [
  { bg: "#0f1714", bars: ["#2e7d5b", "#1d5b43", "#c9a45c"], alpha: 0.2, capAlpha: 0.32 },
  { bg: "#0f1420", bars: ["#3b64a0", "#23406e", "#d07a52"], alpha: 0.2, capAlpha: 0.32 },
  { bg: "#17111c", bars: ["#7a4f8f", "#4a2b5e", "#d9a441"], alpha: 0.2, capAlpha: 0.32 },
  { bg: "#1a1310", bars: ["#a3563a", "#6b3420", "#6fa08a"], alpha: 0.2, capAlpha: 0.32 },
];

// Prototype switch: ?v=ledger&bars=diagonal tilts the bars; default is horizontal.
const BAR_ANGLE = new URLSearchParams(window.location.search).get("bars") === "diagonal" ? -24 : 0;

const systemTheme = () =>
  window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";

function Icon({ d }) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
      <path d={d} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const ICONS = {
  sun: "M12 4V2M12 22v-2M4 12H2M22 12h-2M6.3 6.3 4.9 4.9M19.1 19.1l-1.4-1.4M6.3 17.7l-1.4 1.4M19.1 4.9l-1.4 1.4M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z",
  moon: "M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z",
  pause: "M9 5v14M15 5v14",
  play: "M8 5l11 7-11 7V5Z",
};

function Nav({ theme, setTheme, motion, setMotion }) {
  const active = useActiveSection(SECTION_IDS);
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);

  return (
    <header className={`lg-nav${scrolled ? " is-scrolled" : ""}`}>
      <div className="lg-container lg-nav-inner">
        <a href="#top" className="lg-wordmark">
          Cadence Anderson
        </a>
        <button
          className="lg-menu"
          aria-expanded={open}
          aria-controls="lg-links"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close" : "Menu"}
        </button>
        <nav id="lg-links" className={`lg-links${open ? " is-open" : ""}`} aria-label="Primary">
          {NAV_LINKS.map((l, i) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={active === l.id ? "is-active" : undefined}
              aria-current={active === l.id ? "location" : undefined}
              onClick={() => setOpen(false)}
            >
              <span className="lg-links-num">{pad(i)}</span>
              {l.label}
            </a>
          ))}
          <a href={PROFILE.resume} target="_blank" rel="noopener noreferrer" className="lg-resume">
            Resume
          </a>
        </nav>
        <div className="lg-tools">
          <button
            className="lg-tool"
            onClick={() => setMotion(!motion)}
            aria-label={motion ? "Turn off animations" : "Turn on animations"}
            aria-pressed={motion}
            title={motion ? "Turn off animations" : "Turn on animations"}
          >
            <Icon d={motion ? ICONS.pause : ICONS.play} />
          </button>
          <button
            className="lg-tool"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            title={theme === "dark" ? "Light theme" : "Dark theme"}
          >
            <Icon d={theme === "dark" ? ICONS.sun : ICONS.moon} />
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="lg-hero" id="top">
      <div className="lg-container lg-hero-grid">
        <div>
          <p className="lg-eyebrow">{PROFILE.role}</p>
          <h1 className="lg-hero-title">Cadence Anderson</h1>
          <p className="lg-hero-lede">{PROFILE.tagline}</p>
          <div className="lg-actions">
            <a className="lg-btn lg-btn-primary" href="#projects">
              Selected work
            </a>
            <a className="lg-btn" href={PROFILE.resume} target="_blank" rel="noopener noreferrer">
              Resume (PDF)
            </a>
          </div>
        </div>
        <dl className="lg-ledger">
          {HIGHLIGHTS.map((h) => (
            <div key={h.label}>
              <dt>{h.label}</dt>
              <dd>{h.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function Section({ id, index, title, children, className = "" }) {
  const ref = useReveal();
  const label = NAV_LINKS.find((l) => l.id === id).label;
  return (
    <section id={id} ref={ref} className={`lg-section lg-reveal ${className}`}>
      <div className="lg-container">
        <div className="lg-section-head">
          <span className="lg-section-num">{pad(index)}</span>
          <div>
            <p className="lg-eyebrow">{label}</p>
            <h2>{title}</h2>
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}

const COURSE_PANELS = [
  { label: "Relevant coursework", items: COURSES.completed },
  { label: `Currently taking · ${COURSES.current.term}`, items: COURSES.current.items },
];

function CourseRows({ items, className = "" }) {
  return (
    <ul className={`lg-rows ${className}`}>
      {items.map((c) => (
        <li key={c.code}>
          <span className="lg-course-code">{c.code}</span>
          {c.title}
        </li>
      ))}
    </ul>
  );
}

// Cross-fades between completed and current courses every 6s (held while hovered
// or focused). With animations off, both lists show stacked.
function Coursework({ animate }) {
  const [shown, setShown] = useState(0);
  const [held, setHeld] = useState(false);

  useEffect(() => {
    if (!animate || held) return;
    const timer = setTimeout(() => setShown((s) => (s + 1) % COURSE_PANELS.length), 6000);
    return () => clearTimeout(timer);
  }, [animate, held, shown]);

  if (!animate) {
    return (
      <div className="lg-courses">
        {COURSE_PANELS.map((p) => (
          <div key={p.label} className="lg-course-block">
            <p className="lg-eyebrow">{p.label}</p>
            <CourseRows items={p.items} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className="lg-courses"
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setHeld(false);
      }}
    >
      <div className="lg-course-tabs">
        {COURSE_PANELS.map((p, i) => (
          <button
            key={p.label}
            className={i === shown ? "is-active" : undefined}
            aria-pressed={i === shown}
            onClick={() => setShown(i)}
          >
            {p.label}
          </button>
        ))}
      </div>
      <div className="lg-course-stage" aria-live="polite">
        {COURSE_PANELS.map((p, i) => (
          <CourseRows key={p.label} items={p.items} className={i === shown ? "is-shown" : undefined} />
        ))}
      </div>
    </div>
  );
}

function About({ motion }) {
  return (
    <Section id="about" index={0} title="Background">
      <div className="lg-about lg-indent">
        <div className="lg-prose">
          {ABOUT.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
        <Coursework animate={motion} />
      </div>
    </Section>
  );
}

function Research() {
  return (
    <Section id="research" index={1} title={RESEARCH.title}>
      <div className="lg-indent">
        <div className="lg-research-grid">
          <div>
            <p className="lg-eyebrow lg-status">
              <span className="lg-dot" aria-hidden="true" />
              {RESEARCH.status}
            </p>
            <p className="lg-research-lead">{RESEARCH.lead}</p>
          </div>
          <ol className="lg-threads">
            {RESEARCH.threads.map((t, i) => (
              <li key={t.title}>
                <span className="lg-thread-num">R.{pad(i)}</span>
                <h3>{t.title}</h3>
                <p>{t.body}</p>
              </li>
            ))}
          </ol>
        </div>
        <blockquote className="lg-principle">{RESEARCH.principle}</blockquote>
        <p className="lg-principle-note">{RESEARCH.closing}</p>
      </div>
    </Section>
  );
}

function ProjectLinks({ project }) {
  return (
    <div className="lg-case-links">
      {project.live && (
        <a href={project.live} target="_blank" rel="noopener noreferrer">
          Live ↗
        </a>
      )}
      {project.video && (
        <a href={project.video} target="_blank" rel="noopener noreferrer">
          Demo video ↗
        </a>
      )}
      <a href={project.github} target="_blank" rel="noopener noreferrer">
        Source ↗
      </a>
    </div>
  );
}

function CaseStudy({ project, index }) {
  return (
    <article className="lg-case" id={`project-${project.id}`}>
      <header className="lg-case-head">
        <div>
          <p className="lg-eyebrow">
            <span className="lg-case-num">P.{pad(index)}</span> · {project.category}
          </p>
          <h3>{project.title}</h3>
          <p className="lg-case-summary">{project.summary}</p>
        </div>
        <ProjectLinks project={project} />
      </header>

      {/* Two columns so a whole project fits one screen: visuals left, text right.
          Below 1180px the columns collapse and CSS reorders the stack to the end. */}
      <div className="lg-case-grid">
        <div className="lg-case-media">
          <Carousel images={project.images} title={project.title} thumbs className="lg-car" />
          <div className="lg-case-stack">
            <p className="lg-eyebrow">Stack</p>
            <StackDiagram stack={project.stack} tested={project.tested} className="lg-stk" />
          </div>
        </div>
        <div className="lg-case-text">
          <dl className="lg-figures">
            {project.stats.map((s) => (
              <div key={s.label}>
                <dd>{s.value}</dd>
                <dt>{s.label}</dt>
              </div>
            ))}
          </dl>
          <p className="lg-eyebrow">What I built</p>
          <ul className="lg-bullets">
            {project.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

function Projects() {
  const active = useActiveSection(PROJECT_ANCHORS, 0.4) ?? PROJECT_ANCHORS[0];
  return (
    <Section id="projects" index={2} title="Selected work">
      <div className="lg-projects">
        <nav className="lg-proj-index" aria-label="Projects">
          <p className="lg-eyebrow">Index</p>
          <ol>
            {PROJECTS.map((p, i) => {
              const anchor = PROJECT_ANCHORS[i];
              return (
                <li key={p.id}>
                  <a
                    href={`#${anchor}`}
                    className={active === anchor ? "is-active" : undefined}
                    aria-current={active === anchor ? "location" : undefined}
                  >
                    <span className="lg-proj-num">P.{pad(i)}</span>
                    <span className="lg-proj-title">{p.title}</span>
                    <span className="lg-proj-cat">{p.category}</span>
                  </a>
                </li>
              );
            })}
          </ol>
        </nav>
        <div className="lg-cases">
          {PROJECTS.map((p, i) => (
            <CaseStudy key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </Section>
  );
}

function Skills() {
  return (
    <Section id="skills" index={3} title="Tools I work with">
      <dl className="lg-skills lg-indent">
        {SKILLS.map((g) => (
          <div key={g.category}>
            <dt>{g.category}</dt>
            <dd>{g.items.join(", ")}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

function Contact() {
  return (
    <Section id="contact" index={4} title="Let's talk">
      <div className="lg-indent">
        <p className="lg-contact-blurb">{CONTACT_BLURB}</p>
        <a className="lg-contact-email" href={`mailto:${PROFILE.email}`}>
          {PROFILE.email}
        </a>
        <div className="lg-actions">
          <a className="lg-btn" href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn ↗
          </a>
          <a className="lg-btn" href={PROFILE.github} target="_blank" rel="noopener noreferrer">
            GitHub ↗
          </a>
        </div>
      </div>
    </Section>
  );
}

export default function Ledger() {
  const [theme, setTheme] = usePersistentState("lg-theme", systemTheme);
  const [motion, setMotion] = usePersistentState("lg-motion", !REDUCED_MOTION);
  const palettes = theme === "dark" ? DARK_PALETTES : LIGHT_PALETTES;
  useBodyBackground(palettes[0].bg);
  return (
    <div className="lg" data-theme={theme}>
      {motion && <BarField palettes={palettes} angle={BAR_ANGLE} />}
      <Nav theme={theme} setTheme={setTheme} motion={motion} setMotion={setMotion} />
      <main>
        <Hero />
        <About motion={motion} />
        <Research />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <footer className="lg-footer">
        <div className="lg-container">
          <span>© {new Date().getFullYear()} Cadence Anderson</span>
          <span className="lg-footer-links">
            <a href="/v1/">Past version (Feb 2026)</a>
            <a href="#top">Back to top ↑</a>
          </span>
        </div>
      </footer>
    </div>
  );
}
