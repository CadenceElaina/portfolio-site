import { useRef, useState } from "react";
import {
  NAV_LINKS,
  SECTION_IDS,
  PROFILE,
  ABOUT,
  EDUCATION,
  PROJECTS,
  SKILLS,
  CONTACT_BLURB,
} from "../content";
import { useActiveSection, useReveal, useBodyBackground, pad } from "../hooks";
import "./console.css";

function Sidebar() {
  const active = useActiveSection(SECTION_IDS);

  return (
    <aside className="cs-side">
      <div className="cs-side-top">
        <a href="#top" className="cs-name">
          Cadence Anderson
        </a>
        <p className="cs-role">{PROFILE.role}</p>
        <p className="cs-status">
          <span className="cs-dot" aria-hidden="true" />
          {PROFILE.seeking}
        </p>
      </div>

      <nav className="cs-nav" aria-label="Primary">
        {NAV_LINKS.map((l, i) => (
          <a
            key={l.id}
            href={`#${l.id}`}
            className={active === l.id ? "is-active" : undefined}
            aria-current={active === l.id ? "location" : undefined}
          >
            <span className="cs-nav-num">{pad(i + 1)}</span>
            <span className="cs-nav-bar" aria-hidden="true" />
            {l.label}
          </a>
        ))}
      </nav>

      <div className="cs-side-foot">
        <a href={PROFILE.resume} target="_blank" rel="noopener noreferrer" className="cs-btn cs-btn-accent">
          Resume ↗
        </a>
        <div className="cs-socials">
          <a href={PROFILE.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href={`mailto:${PROFILE.email}`}>Email</a>
        </div>
      </div>
    </aside>
  );
}

function Section({ id, label, title, children }) {
  const ref = useReveal();
  return (
    <section id={id} ref={ref} className="cs-section cs-reveal">
      <p className="cs-label">
        <span>//</span> {label}
      </p>
      {title && <h2>{title}</h2>}
      {children}
    </section>
  );
}

function Hero() {
  return (
    <section className="cs-hero" id="top">
      <p className="cs-prompt">
        <span>$</span> whoami
      </p>
      <h1>
        Full-stack engineer with <em>six years in finance</em>.
      </h1>
      <p className="cs-lede">{PROFILE.intro}</p>
      <div className="cs-hero-stats">
        <div>
          <strong>6 yrs</strong>
          <span>finance at Wells Fargo</span>
        </div>
        <div>
          <strong>{PROJECTS.length}</strong>
          <span>full-stack projects</span>
        </div>
        <div>
          <strong>{EDUCATION.gpa}</strong>
          <span>GPA, UNC Charlotte CS</span>
        </div>
      </div>
      <div className="cs-actions">
        <a href="#projects" className="cs-btn cs-btn-accent">
          Explore projects
        </a>
        <a href={`mailto:${PROFILE.email}`} className="cs-btn">
          Get in touch
        </a>
      </div>
    </section>
  );
}

function About() {
  return (
    <Section id="about" label="about" title="Background">
      <div className="cs-about">
        <div className="cs-prose">
          {ABOUT.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
        <div className="cs-card cs-edu">
          <p className="cs-card-label">education</p>
          <p className="cs-edu-degree">{EDUCATION.degree}</p>
          <p className="cs-edu-school">
            {EDUCATION.school} · {EDUCATION.concentration}
          </p>
          <p className="cs-edu-meta">
            {EDUCATION.expected} · GPA {EDUCATION.gpa}
          </p>
          <p className="cs-card-label cs-mt">coursework</p>
          <ul className="cs-chips">
            {EDUCATION.coursework.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

function ProjectPanel({ project }) {
  const [img, setImg] = useState(0);
  const { images } = project;
  const step = (d) => setImg((i) => (i + d + images.length) % images.length);

  return (
    <div
      role="tabpanel"
      id="cs-panel"
      aria-labelledby={`cs-tab-${project.id}`}
      className="cs-panel"
    >
      <div className="cs-window">
        <div className="cs-window-bar">
          <span />
          <span />
          <span />
          <p>
            {project.id} · {img + 1}/{images.length}
          </p>
        </div>
        <div className="cs-window-view">
          <img src={images[img]} alt={`${project.title} screenshot ${img + 1}`} />
          {images.length > 1 && (
            <>
              <button className="cs-arrow cs-arrow-prev" onClick={() => step(-1)} aria-label="Previous screenshot">
                ←
              </button>
              <button className="cs-arrow cs-arrow-next" onClick={() => step(1)} aria-label="Next screenshot">
                →
              </button>
            </>
          )}
        </div>
      </div>

      {images.length > 1 && (
        <div className="cs-filmstrip">
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

      <div className="cs-panel-info">
        <div className="cs-panel-head">
          <div>
            <h3>{project.title}</h3>
            <p className="cs-panel-summary">{project.summary}</p>
          </div>
          <div className="cs-panel-links">
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="cs-btn cs-btn-accent">
                Live ↗
              </a>
            )}
            {project.video && (
              <a href={project.video} target="_blank" rel="noopener noreferrer" className="cs-btn">
                Demo ▶
              </a>
            )}
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="cs-btn">
              Code ↗
            </a>
          </div>
        </div>

        <div className="cs-metrics">
          {project.stats.map((s) => (
            <div key={s.label} className="cs-metric">
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>

        <ul className="cs-bullets">
          {project.bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>

        <ul className="cs-chips">
          {project.tech.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Projects() {
  const [active, setActive] = useState(0);
  const tabs = useRef([]);

  const onKeyDown = (e) => {
    const delta = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    if (!delta) return;
    e.preventDefault();
    const next = (active + delta + PROJECTS.length) % PROJECTS.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  const project = PROJECTS[active];

  return (
    <Section id="projects" label="projects" title="Project explorer">
      <p className="cs-hint">Select a project. Arrow keys work too.</p>
      <div className="cs-tabs" role="tablist" aria-label="Projects" onKeyDown={onKeyDown}>
        {PROJECTS.map((p, i) => (
          <button
            key={p.id}
            ref={(el) => (tabs.current[i] = el)}
            role="tab"
            id={`cs-tab-${p.id}`}
            aria-selected={i === active}
            aria-controls="cs-panel"
            tabIndex={i === active ? 0 : -1}
            className={`cs-tab${i === active ? " is-active" : ""}`}
            onClick={() => setActive(i)}
          >
            <span className="cs-tab-num">{pad(i + 1)}</span>
            <span className="cs-tab-title">{p.title}</span>
            <span className="cs-tab-cat">{p.category}</span>
          </button>
        ))}
      </div>
      <ProjectPanel key={project.id} project={project} />
    </Section>
  );
}

function Skills() {
  return (
    <Section id="skills" label="skills" title="Stack">
      <div className="cs-skills">
        {SKILLS.map((g) => (
          <div key={g.category} className="cs-card">
            <p className="cs-card-label">{g.category.toLowerCase()}</p>
            <ul className="cs-chips">
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
    <button className="cs-btn" onClick={copy}>
      {copied ? "Copied ✓" : "Copy email"}
    </button>
  );
}

function Contact() {
  return (
    <Section id="contact" label="contact" title="Let's connect">
      <div className="cs-card cs-contact">
        <p className="cs-prompt">
          <span>$</span> mail {PROFILE.email}
        </p>
        <p className="cs-contact-blurb">{CONTACT_BLURB}</p>
        <div className="cs-actions">
          <a href={`mailto:${PROFILE.email}`} className="cs-btn cs-btn-accent">
            Email me
          </a>
          <CopyEmail />
          <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="cs-btn">
            LinkedIn ↗
          </a>
        </div>
      </div>
    </Section>
  );
}

export default function Console() {
  useBodyBackground("#0d0f13");
  return (
    <div className="cs">
      <Sidebar />
      <main className="cs-main">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
        <footer className="cs-footer">© {new Date().getFullYear()} Cadence Anderson</footer>
      </main>
    </div>
  );
}
