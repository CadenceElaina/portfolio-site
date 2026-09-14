import { useEffect, useRef, useState } from "react";
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
import { useActiveSection, useScrolled, useReveal, useBodyBackground } from "../hooks";
import "./studio.css";

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
    <header className={`bn-nav${scrolled ? " is-scrolled" : ""}`}>
      <a href="#top" className="bn-logo" aria-label="Cadence Anderson, back to top">
        <span>CA</span>
      </a>
      <nav className="bn-pill" aria-label="Primary">
        <span
          className="bn-pill-bg"
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
      <a href={PROFILE.resume} target="_blank" rel="noopener noreferrer" className="bn-nav-resume">
        Resume
      </a>
    </header>
  );
}

function Hero() {
  return (
    <section className="bn-hero" id="top">
      <div className="bn-container">
        <p className="bn-badge">
          <span className="bn-dot" aria-hidden="true" />
          {PROFILE.seeking}
        </p>
        <h1>
          Hi, I'm Cadence.
          <span> I build full-stack web apps, informed by six years in finance.</span>
        </h1>
        <p className="bn-lede">{PROFILE.intro}</p>
        <div className="bn-actions">
          <a href="#projects" className="bn-btn bn-btn-primary">
            See projects
          </a>
          <a href={PROFILE.resume} target="_blank" rel="noopener noreferrer" className="bn-btn">
            Resume ↗
          </a>
          <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="bn-btn bn-btn-ghost">
            GitHub
          </a>
          <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="bn-btn bn-btn-ghost">
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}

function Section({ id, label, title, children }) {
  const ref = useReveal();
  return (
    <section id={id} ref={ref} className="bn-section bn-reveal">
      <div className="bn-container">
        <p className="bn-label">{label}</p>
        <h2>{title}</h2>
        {children}
      </div>
    </section>
  );
}

function About() {
  return (
    <Section id="about" label="About" title="From finance to software">
      <div className="bn-bento">
        <article className="bn-tile bn-tile-story">
          {ABOUT.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </article>
        <article className="bn-tile bn-tile-stat bn-tile-ink">
          <span className="bn-big">6 yrs</span>
          <p>at Wells Fargo, from teller to Financial Advisor</p>
        </article>
        <article className="bn-tile bn-tile-stat bn-tile-accent">
          <span className="bn-big">200+</span>
          <p>advisors nationally adopted process improvements I identified</p>
        </article>
        <article className="bn-tile">
          <p className="bn-tile-label">Education</p>
          <p className="bn-tile-title">{EDUCATION.degree}</p>
          <p className="bn-tile-sub">
            {EDUCATION.school} · {EDUCATION.concentration}
          </p>
          <p className="bn-tile-meta">
            {EDUCATION.expected} · GPA {EDUCATION.gpa}
          </p>
        </article>
        <article className="bn-tile">
          <p className="bn-tile-label">Coursework</p>
          <ul className="bn-tags">
            {EDUCATION.coursework.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </article>
      </div>
    </Section>
  );
}

function ProjectTile({ project, onOpen }) {
  return (
    <article className="bn-project">
      <button className="bn-project-shot" onClick={onOpen} aria-label={`Open ${project.title} case study`}>
        <img src={project.images[0]} alt="" loading="lazy" />
        <span className="bn-project-count">{project.images.length} screenshots</span>
      </button>
      <div className="bn-project-body">
        <div className="bn-project-top">
          <p className="bn-tile-label">{project.category}</p>
          {project.featured && <span className="bn-flag">Featured</span>}
        </div>
        <h3>{project.title}</h3>
        <p className="bn-project-summary">{project.summary}</p>
        <ul className="bn-stats">
          {project.stats.map((s) => (
            <li key={s.label}>
              <strong>{s.value}</strong> {s.label}
            </li>
          ))}
        </ul>
        <div className="bn-project-foot">
          <button className="bn-btn bn-btn-primary" onClick={onOpen}>
            Case study
          </button>
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="bn-btn">
              Live ↗
            </a>
          )}
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="bn-btn bn-btn-ghost">
            Code ↗
          </a>
        </div>
      </div>
    </article>
  );
}

function CaseStudy({ project, onClose }) {
  const [img, setImg] = useState(0);
  const { images } = project;
  const step = (d) => setImg((i) => (i + d + images.length) % images.length);

  return (
    <div className="bn-dialog-inner">
      <div className="bn-dialog-head">
        <div>
          <p className="bn-tile-label">{project.category}</p>
          <h3>{project.title}</h3>
        </div>
        <button className="bn-close" onClick={onClose} aria-label="Close case study">
          ✕
        </button>
      </div>

      <div className="bn-gallery">
        <img src={images[img]} alt={`${project.title} screenshot ${img + 1} of ${images.length}`} />
        {images.length > 1 && (
          <>
            <button className="bn-arrow bn-arrow-prev" onClick={() => step(-1)} aria-label="Previous screenshot">
              ←
            </button>
            <button className="bn-arrow bn-arrow-next" onClick={() => step(1)} aria-label="Next screenshot">
              →
            </button>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="bn-thumbs">
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

      <div className="bn-dialog-body">
        <div>
          <p className="bn-dialog-summary">{project.summary}</p>
          <ul className="bn-bullets">
            {project.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
        <aside className="bn-dialog-side">
          <p className="bn-tile-label">Built with</p>
          <ul className="bn-tags">
            {project.tech.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <div className="bn-dialog-links">
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="bn-btn bn-btn-primary">
                Live site ↗
              </a>
            )}
            {project.video && (
              <a href={project.video} target="_blank" rel="noopener noreferrer" className="bn-btn">
                Demo video ▶
              </a>
            )}
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="bn-btn">
              Source ↗
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Projects() {
  const [openId, setOpenId] = useState(null);
  const dialog = useRef(null);
  const open = PROJECTS.find((p) => p.id === openId);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <Section id="projects" label="Projects" title="Things I've built">
      <div className="bn-projects">
        {PROJECTS.map((p) => (
          <ProjectTile key={p.id} project={p} onOpen={() => setOpenId(p.id)} />
        ))}
      </div>
      <dialog
        ref={dialog}
        className="bn-dialog"
        onClose={() => setOpenId(null)}
        onClick={(e) => e.target === dialog.current && setOpenId(null)}
      >
        {open && <CaseStudy key={open.id} project={open} onClose={() => setOpenId(null)} />}
      </dialog>
    </Section>
  );
}

function Skills() {
  return (
    <Section id="skills" label="Skills" title="Tech I work with">
      <div className="bn-tile bn-skills">
        {SKILLS.map((g) => (
          <div key={g.category}>
            <p className="bn-tile-label">{g.category}</p>
            <ul className="bn-skill-list">
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
    <section id="contact" ref={ref} className="bn-section bn-reveal">
      <div className="bn-container">
        <div className="bn-contact">
          <p className="bn-label">Contact</p>
          <h2>Let's build something.</h2>
          <p>{CONTACT_BLURB}</p>
          <div className="bn-actions">
            <a href={`mailto:${PROFILE.email}`} className="bn-btn bn-btn-light">
              {PROFILE.email}
            </a>
            <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="bn-btn bn-btn-outline-light">
              LinkedIn ↗
            </a>
            <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="bn-btn bn-btn-outline-light">
              GitHub ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Studio() {
  useBodyBackground("#f2f3f6");
  return (
    <div className="bn">
      <Nav />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <footer className="bn-footer">© {new Date().getFullYear()} Cadence Anderson</footer>
    </div>
  );
}
