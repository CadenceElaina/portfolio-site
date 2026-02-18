import { useState, useEffect } from "react";
import "./App.css";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const PROJECTS = [
  {
    title: "BlogList Application",
    description:
      "Full-stack blog platform with user authentication, CRUD operations, and a comprehensive test suite. Features reusable React UI components, JWT-based auth with session management, and a RESTful API. Deployed to production on Render.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Jest"],
    github: "https://github.com/CadenceElaina/bloglist",
    live: "https://bloglist-17lz.onrender.com/",
    images: [
      "/image1.png",
      "/image2.png",
      "/image3.png",
      "/image4.png",
      "/image5.png",
    ],
    video: "https://youtu.be/1Fh3IfKdhSM",
  },
  {
    title: "Financial Statement Analyzer",
    description:
      "Full-stack financial services app that imports statements from PDF and CSV uploads, parses them with custom logic tailored for financial institution formats, and provides transaction categorization and data visualization.",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    github: "https://github.com/CadenceElaina/vireofi",
    live: null,
    images: [],
    video: null,
  },
];

const SKILLS = [
  {
    category: "Languages",
    items: ["JavaScript (ES6+)", "Java", "Python", "C#", "SQL"],
  },
  {
    category: "Frontend",
    items: ["React", "HTML5/CSS3", "Responsive Design"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express", "Spring Boot", "REST APIs"],
  },
  {
    category: "Databases",
    items: ["MongoDB", "PostgreSQL"],
  },
  {
    category: "Tools & Platforms",
    items: ["Git", "GitHub", "Postman", "Linux/Unix", "VS Code"],
  },
  {
    category: "Testing",
    items: ["Jest", "Unit Testing", "API Testing"],
  },
];

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`nav${scrolled ? " scrolled" : ""}`}>
      <div className="nav-inner container">
        <a href="#" className="nav-logo">
          Cadence Anderson
        </a>
        <button
          className="nav-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          <span />
          <span />
          <span />
        </button>
        <div className={`nav-links${menuOpen ? " open" : ""}`}>
          {NAV_LINKS.map(({ label, href }) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          ))}
          <a
            href="/resume26.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-resume-btn"
          >
            Resume
          </a>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="container">
        <div className="hero-content">
          <p className="hero-greeting">Hi, I'm</p>
          <h1>Cadence Anderson</h1>
          <p className="hero-description">
            Software engineer and former financial professional. I build
            full-stack web applications and I'm pursuing a B.S. in Computer
            Science at UNC Charlotte.
          </p>
          <div className="hero-cta">
            <a href="#projects" className="btn btn-primary">
              View my work ↓
            </a>
            <a href="/resume26.pdf" download className="btn btn-secondary">
              Resume ↓
            </a>
          </div>
          <div className="hero-socials">
            <a
              href="https://github.com/CadenceElaina"
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/cadence-anderson-7a6a6737a/"
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
            >
              LinkedIn
            </a>
            <a href="mailto:cadence.anderson88@gmail.com" title="Email">
              cadence.anderson88@gmail.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <div className="section-header">
          <p className="section-label">About</p>
          <h2>Background</h2>
        </div>
        <div className="about-content">
          <div className="about-text">
            <p>
              I'm a career-changer who spent over three years at Wells Fargo
              Advisors — first as an Investment Consultant, then as a Financial
              Advisor. I managed client relationships, executed trades, and
              recognized opportunities to improve efficiency within systems used
              nationally by advisors.
            </p>
            <p>
              In January 2026 I returned to UNCC full-time to pursue computer
              science. But the transition started long before that — I completed
              the University of Helsinki's Java MOOC, Full Stack Open (Parts
              1–9), freeCodeCamp's courses and built multiple full-stack
              applications.
            </p>
            <p>
              I'm drawn to backend and full-stack engineering, especially in
              fintech where I can leverage my domain knowledge. I care about
              writing clean, testable code and building things that solve real
              problems.
            </p>
          </div>
          <div className="about-details">
            <div className="detail-item">
              <p className="detail-label">Education</p>
              <p className="detail-value">B.S. Computer Science — UNCC</p>
              <p className="detail-sub">Expected Spring 2028 · GPA 3.66</p>
            </div>
            <div className="detail-item">
              <p className="detail-label">Concentration</p>
              <p className="detail-value">Networks &amp; Systems</p>
            </div>
            <div className="detail-item">
              <p className="detail-label">Minor</p>
              <p className="detail-value">Mathematics</p>
            </div>
            <div className="detail-item">
              <p className="detail-label">Relevant Coursework</p>
              <p className="detail-value detail-value-sm">
                Data Structures &amp; Algorithms · Intro to Computer Systems ·
                Java OOP I &amp; II · Full Stack Open (Parts 1–9)
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }) {
  const [currentImg, setCurrentImg] = useState(0);
  const images = project.images || [];

  const nextImg = () => setCurrentImg((i) => (i + 1) % images.length);
  const prevImg = () =>
    setCurrentImg((i) => (i - 1 + images.length) % images.length);

  return (
    <div
      className={`project-card${images.length === 0 ? " project-card-compact" : ""}`}
    >
      {images.length > 0 && (
        <div className="project-image-wrapper">
          <img
            src={images[currentImg]}
            alt={`${project.title} screenshot ${currentImg + 1}`}
            className="project-image"
          />
          {images.length > 1 && (
            <>
              <button
                className="img-nav img-nav-prev"
                onClick={prevImg}
                aria-label="Previous image"
              >
                ‹
              </button>
              <button
                className="img-nav img-nav-next"
                onClick={nextImg}
                aria-label="Next image"
              >
                ›
              </button>
              <div className="img-dots">
                {images.map((_, i) => (
                  <button
                    key={i}
                    className={`img-dot${i === currentImg ? " active" : ""}`}
                    onClick={() => setCurrentImg(i)}
                    aria-label={`Go to image ${i + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}
      <div className="project-body">
        <div className="project-header">
          <h3 className="project-title">{project.title}</h3>
          <div className="project-links">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link-btn"
            >
              GitHub ↗
            </a>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link-btn"
              >
                Live ↗
              </a>
            )}
            {project.video && (
              <a
                href={project.video}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link-btn project-link-btn-accent"
              >
                Demo ▶
              </a>
            )}
          </div>
        </div>
        <p className="project-description">{project.description}</p>
        <div className="project-tech">
          {project.tech.map((t) => (
            <span className="tech-tag" key={t}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Projects() {
  return (
    <section className="section" id="projects">
      <div className="container">
        <div className="section-header">
          <p className="section-label">Projects</p>
          <h2>Things I've built</h2>
        </div>
        <div className="projects-grid">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="section" id="skills">
      <div className="container">
        <div className="section-header">
          <p className="section-label">Skills</p>
          <h2>Tech I work with</h2>
        </div>
        <div className="skills-grid">
          {SKILLS.map((group) => (
            <div className="skill-category" key={group.category}>
              <h3>{group.category}</h3>
              <div className="skill-list">
                {group.items.map((item) => (
                  <span className="skill-item" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="section contact" id="contact">
      <div className="container">
        <div className="contact-content">
          <p className="section-label">Contact</p>
          <h2>Let's connect</h2>
          <p className="contact-description">
            I'm currently looking for software engineering internship
            opportunities. Feel free to reach out — I'd love to chat.
          </p>
          <div className="contact-links">
            <a
              href="mailto:cadence.anderson88@gmail.com"
              className="contact-link-btn"
            >
              ✉ Email me
            </a>
            <a
              href="https://www.linkedin.com/in/cadence-anderson-7a6a6737a/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link-btn"
            >
              LinkedIn →
            </a>
            <a
              href="https://github.com/CadenceElaina"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link-btn"
            >
              GitHub →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>© {new Date().getFullYear()} Cadence Anderson</p>
      </div>
    </footer>
  );
}

function App() {
  return (
    <div className="app-wrapper">
      <Nav />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
