import { useEffect, useState } from "react";
import initCursorSparkles from "../utils/cursorSparkles";
import Title from "../components/Title";
import Footer from "../components/Footer";
import FloatingChatbot from "../components/FloatingChatbot";
import FloatingWhatsapp from "../components/FloatingWhatsapp";

import "../styles/Careers.css";
import "../App.css";

const TEACHER_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSesbOKwUw1fnQb3G5CLOnBgwTaZ8100cFBiAzGOQNB30O56Kw/viewform?usp=header";
const INTERN_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfoZRb85d_mB5EFSnMNV59FTBGmjQdAKclEj5KqdT1ynS-dQg/viewform?usp=publish-editor";

/* ── All Open Roles (unified) ─────────────────────────────── */
const allRoles = [
  {
    title: "Storytelling Teacher",
    icon: "🎓",
    desc: "Lead live online mythology classes that build confidence and values in children.",
    category: "Teaching",
    type: "Freelance · Contract",
    location: "Remote (India)",
    badge: "💰 Per Class",
    featured: true,
    jdUrl: null,
    applyUrl: TEACHER_FORM_URL,
    highlights: [
      "🎓 Graduates preferred",
      "🖥️ Live online classes with a fixed recurring schedule",
      "👧 Work with children through mythology and value-based education",
      "💬 Strong communication and presentation skills required",
    ],
  },
  {
    title: "Game Development Intern",
    icon: "🎮",
    desc: "Build interactive mythology-based games that teach children life skills.",
    category: "Internship",
    type: "Internship · 3 Months",
    location: "Remote",
    badge: "⏳ 3 Months",
    featured: false,
    jdUrl: null,
    applyUrl: INTERN_FORM_URL,
    highlights: [],
  },
  {
    title: "Social Media Intern",
    icon: "📱",
    desc: "Grow our community and share Infineo's magical stories with the world.",
    category: "Internship",
    type: "Internship · 3 Months",
    location: "Remote",
    badge: "⏳ 3 Months",
    featured: false,
    jdUrl: null,
    applyUrl: INTERN_FORM_URL,
    highlights: [],
  },
  {
    title: "Content Creation Intern",
    icon: "✍️",
    desc: "Craft engaging educational content rooted in mythology and values.",
    category: "Internship",
    type: "Internship · 3 Months",
    location: "Remote",
    badge: "⏳ 3 Months",
    featured: false,
    jdUrl: null,
    applyUrl: INTERN_FORM_URL,
    highlights: [],
  },
  {
    title: "Video Creation Intern",
    icon: "🎬",
    desc: "Produce captivating video stories that bring ancient tales to life.",
    category: "Internship",
    type: "Internship · 3 Months",
    location: "Remote",
    badge: "⏳ 3 Months",
    featured: false,
    jdUrl: null,
    applyUrl: INTERN_FORM_URL,
    highlights: [],
  },
  {
    title: "HR Intern",
    icon: "🤝",
    desc: "Support our growing team with recruitment and people operations.",
    category: "Internship",
    type: "Internship · 3 Months",
    location: "Remote",
    badge: "⏳ 3 Months",
    featured: false,
    jdUrl: null,
    applyUrl: INTERN_FORM_URL,
    highlights: [],
  },
  {
    title: "Sales & Marketing Intern",
    icon: "📈",
    desc: "Drive growth through creative outreach and partnership strategies.",
    category: "Internship",
    type: "Internship · 3 Months",
    location: "Remote",
    badge: "⏳ 3 Months",
    featured: false,
    jdUrl: null,
    applyUrl: INTERN_FORM_URL,
    highlights: [],
  },
  {
    title: "Website Development Intern",
    icon: "💻",
    desc: "Build and enhance the digital experiences that power Infineo.",
    category: "Internship",
    type: "Internship · 3 Months",
    location: "Remote",
    badge: "⏳ 3 Months",
    featured: false,
    jdUrl: null,
    applyUrl: INTERN_FORM_URL,
    highlights: [],
  },
];

const qualities = [
  {
    icon: "🗣️",
    title: "Excellent Communicators",
    desc: "People who can connect, explain, and engage with clarity and warmth.",
  },
  {
    icon: "❤️",
    title: "Passionate Educators",
    desc: "Those who genuinely care about helping children learn, grow, and thrive.",
  },
  {
    icon: "✨",
    title: "Creative Thinkers",
    desc: "Team members who love storytelling, imaginative content, and bold ideas.",
  },
];

export default function Careers() {
  const [expandedIdx, setExpandedIdx] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Teaching", "Internship"];

  const filteredRoles =
    activeFilter === "All"
      ? allRoles
      : allRoles.filter((r) => r.category === activeFilter);

  useEffect(() => {
    window.scrollTo(0, 0);
    const cleanup = initCursorSparkles({
      minInterval: 55,
      extraChance: 0.14,
      clickBurst: 8,
    });
    return () => cleanup();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="careers-page">
      <Title />

      {/* ── Hero ── */}
      <section className="careers-hero fade-in">
        {/* Animated mandala / geometric pattern overlay */}
        <div className="hero-pattern" aria-hidden="true">
          <svg
            className="pattern-svg"
            viewBox="0 0 800 800"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
          >
            {/* Rotating outer rings */}
            <g className="pattern-ring ring-slow">
              {Array.from({ length: 24 }).map((_, i) => {
                const angle = (i / 24) * 360;
                const rad = (angle * Math.PI) / 180;
                const x = 400 + 340 * Math.cos(rad);
                const y = 400 + 340 * Math.sin(rad);
                return (
                  <circle key={i} cx={x} cy={y} r="3" fill="rgba(240,200,106,0.18)" />
                );
              })}
            </g>
            <g className="pattern-ring ring-medium">
              {Array.from({ length: 16 }).map((_, i) => {
                const angle = (i / 16) * 360;
                const rad = (angle * Math.PI) / 180;
                const x = 400 + 240 * Math.cos(rad);
                const y = 400 + 240 * Math.sin(rad);
                return (
                  <g key={i}>
                    <line
                      x1={400} y1={400}
                      x2={x} y2={y}
                      stroke="rgba(240,200,106,0.06)"
                      strokeWidth="1"
                    />
                    <circle cx={x} cy={y} r="4" fill="rgba(240,200,106,0.12)" />
                  </g>
                );
              })}
            </g>
            {/* Inner lotus petals */}
            <g className="pattern-ring ring-reverse">
              {Array.from({ length: 8 }).map((_, i) => {
                const angle = (i / 8) * 360;
                const rad = (angle * Math.PI) / 180;
                const x = 400 + 130 * Math.cos(rad);
                const y = 400 + 130 * Math.sin(rad);
                return (
                  <ellipse
                    key={i}
                    cx={x} cy={y}
                    rx="18" ry="7"
                    fill="rgba(240,200,106,0.10)"
                    transform={`rotate(${angle + 90}, ${x}, ${y})`}
                  />
                );
              })}
            </g>
            {/* Static concentric circles */}
            <circle cx="400" cy="400" r="60" fill="none" stroke="rgba(240,200,106,0.08)" strokeWidth="1" />
            <circle cx="400" cy="400" r="130" fill="none" stroke="rgba(240,200,106,0.07)" strokeWidth="0.8" />
            <circle cx="400" cy="400" r="240" fill="none" stroke="rgba(240,200,106,0.05)" strokeWidth="0.6" />
            <circle cx="400" cy="400" r="340" fill="none" stroke="rgba(240,200,106,0.04)" strokeWidth="0.5" />
            {/* Center bloom */}
            <circle cx="400" cy="400" r="8" fill="rgba(240,200,106,0.25)" />
            <circle cx="400" cy="400" r="4" fill="rgba(240,200,106,0.5)" />
          </svg>
        </div>

        {/* Decorative particles */}
        <div className="hero-particles" aria-hidden="true">
          <span className="particle particle--1" />
          <span className="particle particle--2" />
          <span className="particle particle--3" />
          <span className="particle particle--4" />
          <span className="particle particle--5" />
          <span className="particle particle--6" />
        </div>

        <span className="hero-eyebrow">We're Hiring</span>
        <h1>Join the Mission to Shape the Next Generation</h1>
        <p>
          Help children discover their voice, build strong values, and develop
          life-long confidence — through the magic of mythology and storytelling.
        </p>
        <div className="hero-cta-row">
          <a
            href={TEACHER_FORM_URL}
            className="btn-primary"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Apply as a Storytelling Teacher"
          >
            Apply as a Teacher
          </a>
          <a
            href={INTERN_FORM_URL}
            className="btn-secondary"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Apply for an Internship position"
          >
            Apply as an Intern
          </a>
        </div>

        {/* Role count badges */}
        <div className="hero-stats" aria-label="Open positions summary">
          <div className="hero-stat">
            <span className="hero-stat__number">1</span>
            <span className="hero-stat__label">Teaching Role</span>
          </div>
          <div className="hero-stat-divider" aria-hidden="true" />
          <div className="hero-stat">
            <span className="hero-stat__number">7</span>
            <span className="hero-stat__label">Internships</span>
          </div>
          <div className="hero-stat-divider" aria-hidden="true" />
          <div className="hero-stat">
            <span className="hero-stat__number">100%</span>
            <span className="hero-stat__label">Remote</span>
          </div>
        </div>
      </section>

      <main className="careers-content">
        {/* ── Mission ── */}
        <section className="about-infineo magic-card fade-in">
          <h2 className="careers-section-title">Our Mission</h2>
          <p>
            At Infineo, we weave ancient mythology into modern storytelling to
            empower young minds. Through interactive games and immersive
            narratives, we nurture confidence, empathy, and essential life
            skills in the next generation.
          </p>
        </section>

        {/* ── Who We Look For ── */}
        <section className="fade-in">
          <h2 className="careers-section-title">We Are Looking For</h2>
          <div className="values-grid">
            {qualities.map((q, i) => (
              <div
                className="value-card"
                key={i}
                style={{ animationDelay: `${i * 0.12}s` }}
              >
                <span className="value-icon">{q.icon}</span>
                <h3>{q.title}</h3>
                <p>{q.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Internship Program Details ── */}
        <section className="fade-in">
          <h2 className="careers-section-title">Internship Program</h2>
          <div className="magic-card program-card">
            <p>
              Our internship program is built for ambitious college students who
              want real, hands-on experience working on meaningful projects —
              not just busy work.
            </p>
            <ul className="program-list">
              <li>📅 Duration: 3 months</li>
              <li>🧪 Initial probation period: 10 days</li>
              <li>📍 Fully remote</li>
              <li>
                🎓 Top performers may receive a Letter of Recommendation (LOR)
              </li>
              <li>🚀 Outstanding interns may be offered a permanent role</li>
            </ul>
          </div>
        </section>

        {/* ── All Open Roles (combined) ── */}
        <section className="fade-in">
          <h2 className="careers-section-title">Open Positions</h2>

          {/* Filter tabs */}
          <div className="roles-filter" role="group" aria-label="Filter roles by category">
            {filters.map((f) => (
              <button
                key={f}
                className={`filter-tab ${activeFilter === f ? "active" : ""}`}
                onClick={() => {
                  setActiveFilter(f);
                  setExpandedIdx(null);
                }}
                aria-pressed={activeFilter === f}
              >
                {f}
                <span className="filter-tab__count">
                  {f === "All"
                    ? allRoles.length
                    : allRoles.filter((r) => r.category === f).length}
                </span>
              </button>
            ))}
          </div>

          <div className="jobs-list">
            {filteredRoles.map((job, idx) => (
              <div
                key={job.title}
                className={`job-card ${expandedIdx === idx ? "expanded" : ""} ${job.featured ? "job-card--featured" : ""}`}
                style={{ animationDelay: `${idx * 0.06}s` }}
              >
                {job.featured && (
                  <div className="job-card__featured-ribbon" aria-label="Featured role">
                    ⭐ Featured
                  </div>
                )}

                <div
                  className="job-card-header"
                  onClick={() =>
                    setExpandedIdx(expandedIdx === idx ? null : idx)
                  }
                  role="button"
                  tabIndex={0}
                  aria-expanded={expandedIdx === idx}
                  aria-label={`${job.title} — click to ${expandedIdx === idx ? "collapse" : "expand"} details`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setExpandedIdx(expandedIdx === idx ? null : idx);
                    }
                  }}
                >
                  <div className="job-details">
                    <div className="job-card__meta-row">
                      <span className="job-category-tag">{job.category}</span>
                      {job.featured && (
                        <span className="job-category-tag job-category-tag--gold">
                          💼 {job.type}
                        </span>
                      )}
                    </div>
                    <h3>
                      <span className="job-icon">{job.icon}</span>
                      {job.title}
                    </h3>
                    <p className="job-desc">{job.desc}</p>
                    <div className="job-meta">
                      <span>📍 {job.location}</span>
                      {!job.featured && <span>💼 {job.type}</span>}
                      <span>{job.badge}</span>
                    </div>
                  </div>
                  <span className="job-chevron" aria-hidden="true">
                    {expandedIdx === idx ? "▲" : "▼"}
                  </span>
                </div>

                {/* Expandable details */}
                {expandedIdx === idx && (
                  <div className="job-card-body">
                    {job.highlights.length > 0 && (
                      <ul className="job-highlights">
                        {job.highlights.map((h, i) => (
                          <li key={i}>{h}</li>
                        ))}
                      </ul>
                    )}
                    <div className="job-actions">
                      {job.jdUrl ? (
                        <a
                          href={job.jdUrl}
                          className="btn-outline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          📄 View Job Description
                        </a>
                      ) : (
                        <span
                          className="btn-outline disabled"
                          title="Job description coming soon"
                        >
                          📄 JD Coming Soon
                        </span>
                      )}
                      <a
                        href={job.applyUrl}
                        className="apply-btn"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Apply now for ${job.title}`}
                      >
                        Apply Now →
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="careers-cta fade-in">
          <h3>Ready to Make an Impact?</h3>
          <p>
            Join us in crafting stories, experiences, and technology that
            inspire the next generation. Whether you're a teacher or a
            student — there's a place for you at Infineo.
          </p>
          <div className="cta-btn-row">
            <a
              href={TEACHER_FORM_URL}
              className="btn-primary"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Apply as a Storytelling Teacher"
            >
              Apply as Teacher
            </a>
            <a
              href={INTERN_FORM_URL}
              className="btn-secondary"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Apply for an Internship position"
            >
              Apply as Intern
            </a>
          </div>
        </section>
      </main>

      <FloatingChatbot />
      <FloatingWhatsapp />
      <Footer />
    </div>
  );
}