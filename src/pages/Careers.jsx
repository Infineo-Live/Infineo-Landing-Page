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

/* ── Featured Teacher Role ─────────────────────────────────── */
const teacherRole = {
  title: "Storytelling Teacher",
  category: "Teaching",
  type: "Freelance / Contract",
  location: "Remote (India)",
  badge: "💰 Per Class",
  jdUrl: null,
  applyUrl: TEACHER_FORM_URL,
  highlights: [
    "🎓 Graduates preferred",
    "🖥️ Live online classes with a fixed recurring schedule",
    "👧 Work with children through mythology and value-based education",
    "💬 Strong communication and presentation skills required",
  ],
};

/* ── Internship Openings ───────────────────────────────────── */
const internOpenings = [
  {
    title: "Game Development Intern",
    icon: "🎮",
    desc: "Build interactive mythology-based games that teach children life skills.",
    category: "Internship",
    type: "Internship · 3 Months",
    location: "Remote",
    badge: "⏳ 3 Months",
    jdUrl: null,
    applyUrl: INTERN_FORM_URL,
  },
  {
    title: "Social Media Intern",
    icon: "📱",
    desc: "Grow our community and share Infineo's magical stories with the world.",
    category: "Internship",
    type: "Internship · 3 Months",
    location: "Remote",
    badge: "⏳ 3 Months",
    jdUrl: null,
    applyUrl: INTERN_FORM_URL,
  },
  {
    title: "Content Creation Intern",
    icon: "✍️",
    desc: "Craft engaging educational content rooted in mythology and values.",
    category: "Internship",
    type: "Internship · 3 Months",
    location: "Remote",
    badge: "⏳ 3 Months",
    jdUrl: null,
    applyUrl: INTERN_FORM_URL,
  },
  {
    title: "Video Creation Intern",
    icon: "🎬",
    desc: "Produce captivating video stories that bring ancient tales to life.",
    category: "Internship",
    type: "Internship · 3 Months",
    location: "Remote",
    badge: "⏳ 3 Months",
    jdUrl: null,
    applyUrl: INTERN_FORM_URL,
  },
  {
    title: "HR Intern",
    icon: "🤝",
    desc: "Support our growing team with recruitment and people operations.",
    category: "Internship",
    type: "Internship · 3 Months",
    location: "Remote",
    badge: "⏳ 3 Months",
    jdUrl: null,
    applyUrl: INTERN_FORM_URL,
  },
  {
    title: "Sales & Marketing Intern",
    icon: "📈",
    desc: "Drive growth through creative outreach and partnership strategies.",
    category: "Internship",
    type: "Internship · 3 Months",
    location: "Remote",
    badge: "⏳ 3 Months",
    jdUrl: null,
    applyUrl: INTERN_FORM_URL,
  },
  {
    title: "Website Development Intern",
    icon: "💻",
    desc: "Build and enhance the digital experiences that power Infineo.",
    category: "Internship",
    type: "Internship · 3 Months",
    location: "Remote",
    badge: "⏳ 3 Months",
    jdUrl: null,
    applyUrl: INTERN_FORM_URL,
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

  useEffect(() => {
    window.scrollTo(0, 0);
    const cleanup = initCursorSparkles({
      minInterval: 55,
      extraChance: 0.14,
      clickBurst: 8,
    });
    return () => cleanup();
  }, []);

  // Fade-in on scroll
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
        {/* Decorative particles (CSS-driven) */}
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
          <h2 className="careers-section-title">Who We Look For</h2>
          <div className="values-grid">
            {qualities.map((q, i) => (
              <div className="value-card" key={i} style={{ animationDelay: `${i * 0.12}s` }}>
                <span className="value-icon">{q.icon}</span>
                <h3>{q.title}</h3>
                <p>{q.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Featured: Storytelling Teacher ── */}
        <section className="fade-in">
          <h2 className="careers-section-title">Featured Opportunity</h2>
          <div className="featured-role">
            <div className="featured-role__badge">⭐ Featured</div>
            <div className="featured-role__header">
              <span className="job-category-tag">Teaching</span>
              <h3>{teacherRole.title}</h3>
              <div className="job-meta">
                <span>📍 {teacherRole.location}</span>
                <span>💼 {teacherRole.type}</span>
                <span>{teacherRole.badge}</span>
              </div>
            </div>
            <div className="featured-role__body">
              <ul className="job-highlights">
                {teacherRole.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
              <div className="job-actions">
                {teacherRole.jdUrl ? (
                  <a
                    href={teacherRole.jdUrl}
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
                  href={teacherRole.applyUrl}
                  className="apply-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Apply now for Storytelling Teacher"
                >
                  Apply Now →
                </a>
              </div>
            </div>
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
              <li>🎓 Top performers may receive a Letter of Recommendation (LOR)</li>
              <li>🚀 Outstanding interns may be offered a permanent role</li>
            </ul>
          </div>
        </section>

        {/* ── Internship Openings ── */}
        <section className="fade-in">
          <h2 className="careers-section-title">Open Internship Roles</h2>

          <div className="jobs-list">
            {internOpenings.map((job, idx) => (
              <div
                key={idx}
                className={`job-card ${expandedIdx === idx ? "expanded" : ""}`}
                style={{ animationDelay: `${idx * 0.06}s` }}
              >
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
                    <span className="job-category-tag">{job.category}</span>
                    <h3>
                      <span className="job-icon">{job.icon}</span>
                      {job.title}
                    </h3>
                    <p className="job-desc">{job.desc}</p>
                    <div className="job-meta">
                      <span>📍 {job.location}</span>
                      <span>💼 {job.type}</span>
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