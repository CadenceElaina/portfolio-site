import { useState } from "react";
import {
  NAV_LINKS,
  SECTION_IDS,
  PROJECT_ANCHORS,
  PROFILE,
  HIGHLIGHTS,
  ABOUT,
  EDUCATION,
  RESEARCH,
  PROJECTS,
  SKILLS,
  CONTACT_BLURB,
} from "../content";
import { useActiveSection, useScrolled, useReveal, useBodyBackground, pad } from "../hooks";
import Carousel from "../components/Carousel";
import StackDiagram from "../components/StackDiagram";
import "./ledger.css";

function Nav() {
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

function About() {
  return (
    <Section id="about" index={0} title="Background">
      <div className="lg-about lg-indent">
        <div className="lg-prose">
          {ABOUT.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
        <div>
          <p className="lg-eyebrow">Relevant coursework</p>
          <ul className="lg-rows">
            {EDUCATION.coursework.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

function Research() {
  return (
    <Section id="research" index={1} title={RESEARCH.title}>
      <div className="lg-indent">
        <p className="lg-eyebrow lg-status">
          <span className="lg-dot" aria-hidden="true" />
          {RESEARCH.status}
        </p>
        <p className="lg-research-lead">{RESEARCH.lead}</p>
        <ol className="lg-threads">
          {RESEARCH.threads.map((t, i) => (
            <li key={t.title}>
              <span className="lg-thread-num">R.{pad(i)}</span>
              <h3>{t.title}</h3>
              <p>{t.body}</p>
            </li>
          ))}
        </ol>
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
  useBodyBackground("#f5f1e8");
  return (
    <div className="lg">
      <Nav />
      <main>
        <Hero />
        <About />
        <Research />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <footer className="lg-footer">
        <div className="lg-container">
          <span>© {new Date().getFullYear()} Cadence Anderson</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </div>
  );
}
