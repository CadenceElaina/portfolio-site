import { useEffect, useRef, useState } from "react";
import {
  NAV_LINKS,
  SECTION_IDS,
  PROJECT_ANCHORS,
  PROFILE,
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
import "./tiles.css";

function Nav() {
  const active = useActiveSection(SECTION_IDS);
  const scrolled = useScrolled();
  const links = useRef({});
  const [pill, setPill] = useState(null);

  // Slide the highlight pill under the active link.
  useEffect(() => {
    const measure = () => {
      const el = active ? links.current[active] : null;
      setPill(el ? { left: el.offsetLeft, width: el.offsetWidth } : null);
    };
    const frame = requestAnimationFrame(measure);
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", measure);
    };
  }, [active]);

  return (
    <header className={`tl-nav${scrolled ? " is-scrolled" : ""}`}>
      <a href="#top" className="tl-logo" aria-label="Cadence Anderson, back to top">
        CA
      </a>
      <nav className="tl-pill" aria-label="Primary">
        <span
          className="tl-pill-bg"
          aria-hidden="true"
          style={
            pill
              ? { transform: `translateX(${pill.left}px)`, width: pill.width, opacity: 1 }
              : { opacity: 0 }
          }
        />
        {NAV_LINKS.map((l) => (
          <a
            key={l.id}
            ref={(el) => (links.current[l.id] = el)}
            href={`#${l.id}`}
            className={active === l.id ? "is-active" : undefined}
            aria-current={active === l.id ? "location" : undefined}
          >
            {l.label}
          </a>
        ))}
      </nav>
      <a href={PROFILE.resume} target="_blank" rel="noopener noreferrer" className="tl-nav-resume">
        Resume
      </a>
    </header>
  );
}

function Section({ id, title, children, className = "" }) {
  const ref = useReveal();
  const index = SECTION_IDS.indexOf(id);
  return (
    <section id={id} ref={ref} className={`tl-section tl-reveal ${className}`}>
      <div className="tl-container">
        <p className="tl-label">
          {pad(index)} · {NAV_LINKS[index].label}
        </p>
        {title && <h2>{title}</h2>}
        {children}
      </div>
    </section>
  );
}

// Hero and About share one bento grid at the top of the page.
function Intro() {
  return (
    <section id="about" className="tl-intro">
      <div className="tl-container">
        <div className="tl-bento" id="top">
          <article className="tl-tile tl-tile-hero">
            <p className="tl-badge">
              <span className="tl-dot" aria-hidden="true" />
              {PROFILE.seeking}
            </p>
            <h1>Cadence Anderson</h1>
            <p className="tl-hero-lede">{PROFILE.tagline}</p>
            <div className="tl-actions">
              <a href="#projects" className="tl-btn tl-btn-primary">
                See projects
              </a>
              <a href={PROFILE.resume} target="_blank" rel="noopener noreferrer" className="tl-btn">
                Resume ↗
              </a>
              <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="tl-btn tl-btn-ghost">
                GitHub
              </a>
              <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="tl-btn tl-btn-ghost">
                LinkedIn
              </a>
            </div>
          </article>

          <a href="#research" className="tl-tile tl-tile-accent tl-tile-research">
            <p className="tl-tile-label">Research</p>
            <p className="tl-tile-big">CS education &amp; adaptive learning</p>
            <p>Finding whether a student's gap is procedural, declarative, or both. Read more ↓</p>
          </a>

          <article className="tl-tile">
            <p className="tl-tile-label">Education</p>
            <p className="tl-tile-title">{EDUCATION.degree}</p>
            <p className="tl-tile-sub">
              {EDUCATION.school} · {EDUCATION.concentration}
            </p>
            <p className="tl-tile-meta">Graduating {EDUCATION.graduating}</p>
          </article>

          <article className="tl-tile tl-tile-ink">
            <span className="tl-stat">6 yrs</span>
            <p>in financial services, teller to financial advisor</p>
          </article>

          <article className="tl-tile tl-tile-story">
            <p className="tl-tile-label">From finance to software</p>
            {ABOUT.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </article>

          <article className="tl-tile">
            <p className="tl-tile-label">Coursework</p>
            <ul className="tl-tags">
              {EDUCATION.coursework.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}

function Research() {
  return (
    <Section id="research" title={RESEARCH.title}>
      <div className="tl-research">
        <article className="tl-tile tl-tile-lead">
          <p className="tl-badge tl-badge-soft">
            <span className="tl-dot" aria-hidden="true" />
            {RESEARCH.status}
          </p>
          <p className="tl-research-lead">{RESEARCH.lead}</p>
        </article>
        <article className="tl-tile tl-tile-ink tl-tile-quote">
          <p className="tl-tile-label">What I keep coming back to</p>
          <blockquote>{RESEARCH.principle}</blockquote>
        </article>
        {RESEARCH.threads.map((t, i) => (
          <article key={t.title} className="tl-tile">
            <p className="tl-tile-label">Thread {pad(i)}</p>
            <h3>{t.title}</h3>
            <p className="tl-tile-body">{t.body}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}

function ProjectCard({ project, index }) {
  return (
    <article className="tl-project" id={`project-${project.id}`}>
      <Carousel images={project.images} title={project.title} className="tl-car" />
      <div className="tl-project-body">
        <div className="tl-project-main">
          <div className="tl-project-top">
            <p className="tl-tile-label">
              {pad(index)} · {project.category}
            </p>
            {project.featured && <span className="tl-flag">Featured</span>}
          </div>
          <h3>{project.title}</h3>
          <p className="tl-project-summary">{project.summary}</p>
          <ul className="tl-stats">
            {project.stats.map((s) => (
              <li key={s.label}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </li>
            ))}
          </ul>
          <ul className="tl-bullets">
            {project.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
        <aside className="tl-project-side">
          <p className="tl-tile-label">Stack</p>
          <StackDiagram stack={project.stack} tested={project.tested} className="tl-stk" />
          <div className="tl-project-links">
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="tl-btn tl-btn-primary">
                Live site ↗
              </a>
            )}
            {project.video && (
              <a href={project.video} target="_blank" rel="noopener noreferrer" className="tl-btn">
                Demo ▶
              </a>
            )}
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="tl-btn">
              Code ↗
            </a>
          </div>
        </aside>
      </div>
    </article>
  );
}

function Projects() {
  const active = useActiveSection(PROJECT_ANCHORS, 0.4) ?? PROJECT_ANCHORS[0];
  return (
    <Section id="projects" title="Things I've built">
      <div className="tl-projects">
        <nav className="tl-proj-index" aria-label="Projects">
          {PROJECTS.map((p, i) => {
            const anchor = PROJECT_ANCHORS[i];
            const on = active === anchor;
            return (
              <a
                key={p.id}
                href={`#${anchor}`}
                className={on ? "is-active" : undefined}
                aria-current={on ? "location" : undefined}
              >
                <img src={p.images[0]} alt="" loading="lazy" />
                <span>
                  <strong>{p.title}</strong>
                  <small>{p.category}</small>
                </span>
              </a>
            );
          })}
        </nav>
        <div className="tl-project-list">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </Section>
  );
}

function Skills() {
  return (
    <Section id="skills" title="Tech I work with">
      <div className="tl-tile tl-skills">
        {SKILLS.map((g) => (
          <div key={g.category}>
            <p className="tl-tile-label">{g.category}</p>
            <ul className="tl-skill-list">
              {g.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Contact() {
  const ref = useReveal();
  return (
    <section id="contact" ref={ref} className="tl-section tl-reveal">
      <div className="tl-container">
        <div className="tl-contact">
          <p className="tl-label">04 · Contact</p>
          <h2>Let's build something.</h2>
          <p>{CONTACT_BLURB}</p>
          <div className="tl-actions">
            <a href={`mailto:${PROFILE.email}`} className="tl-btn tl-btn-light">
              {PROFILE.email}
            </a>
            <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="tl-btn tl-btn-outline-light">
              LinkedIn ↗
            </a>
            <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="tl-btn tl-btn-outline-light">
              GitHub ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Tiles() {
  useBodyBackground("#f4f4f1");
  return (
    <div className="tl">
      <Nav />
      <main>
        <Intro />
        <Research />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <footer className="tl-footer">© {new Date().getFullYear()} Cadence Anderson</footer>
    </div>
  );
}
