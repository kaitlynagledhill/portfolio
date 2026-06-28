import FadeIn from "./FadeIn";

interface ExpItem {
  period: string;
  badgeLabel: string;
  badgeClass: string;
  title: string;
  org: string;
  bullets: string[];
}

const experiences: ExpItem[] = [
  {
    period: "Spring 2026",
    badgeLabel: "Capstone",
    badgeClass: "exp-badge-cobalt",
    title: "Blue Cross Blue Shield",
    org: "User Management System · Sponsored Senior Capstone",
    bullets: [
      "Built a full-stack enterprise user management platform with Quarkus, Java, PostgreSQL, and Nuxt to manage subscriber and dependent records at scale",
      "Designed and implemented RESTful APIs for CRUD, search, and business-rule-driven workflows across large datasets",
      "Optimized backend search and retrieval pipelines for enterprise-scale performance",
      "Integrated AI-powered support tooling with custom business logic for contextual workflow assistance",
    ],
  },
  {
    period: "2025",
    badgeLabel: "Freelance",
    badgeClass: "exp-badge-coral",
    title: "Valae Solutions",
    org: "Steve's CNC — Custom Order & Management Portal",
    bullets: [
      "Designed and built a full-stack CNC template ordering and management portal for a real manufacturing client",
      "Delivered end-to-end in TypeScript — from data modeling to a polished, client-facing interface",
    ],
  },
  {
    period: "Ongoing",
    badgeLabel: "Founder",
    badgeClass: "exp-badge-lime",
    title: "Leave a Message",
    org: "Audio Guestbook Rental · Freelance & Entrepreneurship",
    bullets: [
      "Engineered an embedded audio recording system in C on a Teensy microcontroller with event-driven logic for handset detection, playback, and file capture",
      "Built low-latency audio processing workflows with hardware/software integration, file I/O, and state management",
      "Debugged hardware interactions and timing issues to ensure stable, live-event reliability",
      "Designed and deployed the customer-facing booking and communications website end-to-end",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="exp-section">
      <p className="sec-eyebrow">Experience</p>
      <div className="exp-list">
        {experiences.map((exp, i) => (
          <FadeIn key={exp.title} delay={i * 0.1} direction="left">
            <div className="exp-item">
              <div className="exp-meta">
                <p className="exp-period">{exp.period}</p>
                <span className={`exp-badge ${exp.badgeClass}`}>
                  {exp.badgeLabel}
                </span>
              </div>
              <div>
                <p className="exp-title">{exp.title}</p>
                <p className="exp-org">{exp.org}</p>
                <ul className="exp-bullets">
                  {exp.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
