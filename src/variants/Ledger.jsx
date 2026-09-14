import { useState } from "react";
import {
  NAV_LINKS,
  SECTION_IDS,
  PROFILE,
  HIGHLIGHTS,
  ABOUT,
  EDUCATION,
  PROJECTS,
  SKILLS,
  CONTACT_BLURB,
} from "../content";
import { useActiveSection, useScrolled, useReveal, useBodyBackground, pad } from "../hooks";
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
              <span className="lg-links-num">{pad(i + 1)}</span>
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
          <p className="lg-eyebrow">{PROFILE.role} · Full-stack</p>
          <h1 className="lg-hero-title">Cadence Anderson</h1>
          <p className="lg-hero-lede">{PROFILE.intro}</p>
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

function Section({ id, num, label, title, children, className = "" }) {
  const ref = useReveal();
  return (
    <section id={id} ref={ref} className={`lg-section lg-reveal ${className}`}>
      <div className="lg-container">
        <div className="lg-section-head">
          <span className="lg-section-num">{num}</span>
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
    <Section id="about" num="01" label="About" title="Six years in finance, now building software">
      <div className="lg-about">
        <div className="lg-prose">
          {ABOUT.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
        <dl className="lg-ledger lg-ledger-tight">
          <div>
            <dt>Degree</dt>
            <dd>
              {EDUCATION.degree}, {EDUCATION.school}
            </dd>
          </div>
          <div>
            <dt>Graduation</dt>
            <dd>{EDUCATION.expected}</dd>
          </div>
          <div>
            <dt>GPA</dt>
            <dd className="lg-num">{EDUCATION.gpa}</dd>
          </div>
          <div>
            <dt>Concentration</dt>
            <dd>{EDUCATION.concentration}</dd>
          </div>
          <div>
            <dt>Coursework</dt>
            <dd>{EDUCATION.coursework.join(", ")}</dd>
          </div>
        </dl>
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
  const [img, setImg] = useState(0);
  const { images } = project;

  return (
    <article className="lg-case" id={`project-${project.id}`}>
      <header className="lg-case-head">
        <span className="lg-case-num">P.{pad(index + 1)}</span>
        <div className="lg-case-titles">
          <p className="lg-eyebrow">{project.category}</p>
          <h3>{project.title}</h3>
          <p className="lg-case-summary">{project.summary}</p>
        </div>
        <ProjectLinks project={project} />
      </header>

      <figure className="lg-shot">
        <div className="lg-shot-frame">
          <img
            src={images[img]}
            alt={`${project.title} screenshot ${img + 1} of ${images.length}`}
            loading="lazy"
          />
        </div>
        {images.length > 1 && (
          <div className="lg-thumbs" role="group" aria-label={`${project.title} screenshots`}>
            {images.map((src, i) => (
              <button
                key={src}
                className={i === img ? "is-active" : undefined}
                aria-pressed={i === img}
                aria-label={`Show screenshot ${i + 1}`}
                onClick={() => setImg(i)}
              >
                <img src={src} alt="" loading="lazy" />
              </button>
            ))}
          </div>
        )}
      </figure>

      <div className="lg-case-body">
        <dl className="lg-figures">
          {project.stats.map((s) => (
            <div key={s.label}>
              <dd>{s.value}</dd>
              <dt>{s.label}</dt>
            </div>
          ))}
        </dl>
        <div>
          <p className="lg-eyebrow">What I built</p>
          <ul className="lg-bullets">
            {project.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <p className="lg-eyebrow">Stack</p>
          <p className="lg-stack">{project.tech.join(" / ")}</p>
        </div>
      </div>
    </article>
  );
}

function Projects() {
  return (
    <Section id="projects" num="02" label="Projects" title="Selected work">
      <ol className="lg-index">
        {PROJECTS.map((p, i) => (
          <li key={p.id}>
            <a href={`#project-${p.id}`}>
              <span className="lg-index-num">P.{pad(i + 1)}</span>
              <span className="lg-index-title">{p.title}</span>
              <span className="lg-index-summary">{p.summary}</span>
              <span className="lg-index-cat">{p.category}</span>
            </a>
          </li>
        ))}
      </ol>
      {PROJECTS.map((p, i) => (
        <CaseStudy key={p.id} project={p} index={i} />
      ))}
    </Section>
  );
}

function Skills() {
  return (
    <Section id="skills" num="03" label="Skills" title="Tools I work with">
      <dl className="lg-skills">
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
    <Section id="contact" num="04" label="Contact" title="Let's talk" className="lg-contact">
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
