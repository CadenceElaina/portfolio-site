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
import "./graphite.css";

// Skills drawn as a stack: these categories become layers, the rest sit beside it.
const SKILL_LAYERS = [
  ["Frontend", "Frontend"],
  ["Backend", "Backend"],
  ["Databases", "Data"],
  ["Tools & Platforms", "Platform"],
];

function Nav() {
  const active = useActiveSection(SECTION_IDS);
  const scrolled = useScrolled();

  return (
    <header className={`gr-nav${scrolled ? " is-scrolled" : ""}`}>
      <div className="gr-container gr-nav-inner">
        <a href="#top" className="gr-wordmark">
          cadence<span>.</span>anderson
        </a>
        <nav className="gr-links" aria-label="Primary">
          {NAV_LINKS.map((l, i) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className={active === l.id ? "is-active" : undefined}
              aria-current={active === l.id ? "location" : undefined}
            >
              <span>{pad(i)}</span>
              {l.label.toLowerCase()}
            </a>
          ))}
        </nav>
        <a href={PROFILE.resume} target="_blank" rel="noopener noreferrer" className="gr-btn gr-btn-accent gr-nav-resume">
          Resume ↗
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="gr-hero" id="top">
      <div className="gr-container gr-hero-grid">
        <div>
          <p className="gr-prompt">
            <span>$</span> whoami
          </p>
          <h1>
            Software engineer <em>and</em> CS education researcher.
          </h1>
          <p className="gr-lede">{PROFILE.tagline}</p>
          <div className="gr-actions">
            <a href="#projects" className="gr-btn gr-btn-accent">
              View projects
            </a>
            <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="gr-btn">
              GitHub ↗
            </a>
            <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="gr-btn">
              LinkedIn ↗
            </a>
          </div>
        </div>
        <div className="gr-window">
          <div className="gr-window-bar">
            <span />
            <span />
            <span />
            <p>now.md</p>
          </div>
          <dl className="gr-now">
            {HIGHLIGHTS.map((h) => (
              <div key={h.label}>
                <dt>{h.label.toLowerCase()}:</dt>
                <dd>{h.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

function Section({ id, index, title, children }) {
  const ref = useReveal();
  return (
    <section id={id} ref={ref} className="gr-section gr-reveal">
      <div className="gr-container">
        <p className="gr-label">
          <span>{pad(index)}</span> // {id}
        </p>
        <h2>{title}</h2>
        {children}
      </div>
    </section>
  );
}

function About() {
  return (
    <Section id="about" index={0} title="Background">
      <div className="gr-about">
        <div className="gr-prose">
          {ABOUT.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
        <div className="gr-card">
          <p className="gr-card-label">coursework</p>
          <ul className="gr-chips">
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
      <p className="gr-research-status">
        <span className="gr-dot" aria-hidden="true" />
        {RESEARCH.status}
      </p>
      <p className="gr-research-lead">{RESEARCH.lead}</p>
      <div className="gr-threads">
        {RESEARCH.threads.map((t, i) => (
          <article key={t.title} className="gr-card">
            <p className="gr-card-label">thread {pad(i)}</p>
            <h3>{t.title}</h3>
            <p>{t.body}</p>
          </article>
        ))}
      </div>
      <p className="gr-principle">
        <span>// </span>
        {RESEARCH.principle}
      </p>
    </Section>
  );
}

function Project({ project, index }) {
  return (
    <article className="gr-project" id={`project-${project.id}`}>
      <header className="gr-project-head">
        <div>
          <p className="gr-card-label">
            {pad(index)} · {project.category}
          </p>
          <h3>{project.title}</h3>
        </div>
        <div className="gr-project-links">
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="gr-btn gr-btn-accent">
              Live ↗
            </a>
          )}
          {project.video && (
            <a href={project.video} target="_blank" rel="noopener noreferrer" className="gr-btn">
              Demo ▶
            </a>
          )}
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="gr-btn">
            Code ↗
          </a>
        </div>
      </header>
      <div className="gr-project-grid">
        <div className="gr-project-media">
          <Carousel images={project.images} title={project.title} className="gr-car" />
          <StackDiagram stack={project.stack} tested={project.tested} className="gr-stk" />
        </div>
        <div className="gr-project-info">
          <p className="gr-project-summary">{project.summary}</p>
          <div className="gr-metrics">
            {project.stats.map((s) => (
              <div key={s.label}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
          <ul className="gr-bullets">
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
    <Section id="projects" index={2} title="Things I've built">
      <div className="gr-projects">
        <nav className="gr-proj-index" aria-label="Projects">
          <p className="gr-card-label">$ ls projects/</p>
          <ol>
            {PROJECTS.map((p, i) => {
              const anchor = PROJECT_ANCHORS[i];
              const on = active === anchor;
              return (
                <li key={p.id}>
                  <a
                    href={`#${anchor}`}
                    className={on ? "is-active" : undefined}
                    aria-current={on ? "location" : undefined}
                  >
                    <span className="gr-proj-caret" aria-hidden="true">
                      {on ? "▸" : " "}
                    </span>
                    <span className="gr-proj-num">{pad(i)}</span>
                    <span className="gr-proj-title">{p.title.toLowerCase()}</span>
                  </a>
                </li>
              );
            })}
          </ol>
        </nav>
        <div className="gr-project-list">
          {PROJECTS.map((p, i) => (
            <Project key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </Section>
  );
}

function Skills() {
  const byCategory = Object.fromEntries(SKILLS.map((g) => [g.category, g.items]));
  const layers = SKILL_LAYERS.map(([category, layer]) => ({ layer, items: byCategory[category] }));
  const layered = new Set(SKILL_LAYERS.map(([c]) => c));
  const aside = SKILLS.filter((g) => !layered.has(g.category));

  return (
    <Section id="skills" index={3} title="My stack">
      <div className="gr-skills">
        <StackDiagram stack={layers} className="gr-stk gr-stk-lg" />
        <div className="gr-skills-aside">
          {aside.map((g) => (
            <div key={g.category} className="gr-card">
              <p className="gr-card-label">{g.category.toLowerCase()}</p>
              <ul className="gr-chips">
                {g.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${PROFILE.email}`;
    }
  };
  return (
    <button className="gr-btn" onClick={copy}>
      {copied ? "Copied ✓" : "Copy email"}
    </button>
  );
}

function Contact() {
  return (
    <Section id="contact" index={4} title="Let's connect">
      <div className="gr-contact">
        <div>
          <p className="gr-prompt">
            <span>$</span> mail {PROFILE.email}
          </p>
          <p className="gr-contact-blurb">{CONTACT_BLURB}</p>
        </div>
        <div className="gr-contact-actions">
          <a href={`mailto:${PROFILE.email}`} className="gr-btn gr-btn-accent">
            Email me
          </a>
          <CopyEmail />
          <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="gr-btn">
            LinkedIn ↗
          </a>
          <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="gr-btn">
            GitHub ↗
          </a>
        </div>
      </div>
    </Section>
  );
}

export default function Graphite() {
  useBodyBackground("#0e1013");
  return (
    <div className="gr">
      <Nav />
      <main>
        <Hero />
        <About />
        <Research />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <footer className="gr-footer">
        <div className="gr-container">© {new Date().getFullYear()} Cadence Anderson</div>
      </footer>
    </div>
  );
}
