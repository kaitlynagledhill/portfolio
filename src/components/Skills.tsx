"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const skillGroups = [
  {
    label: "Languages",
    skills: [
      { name: "TypeScript", style: "chip-coral" },
      { name: "Java",       style: "chip-coral" },
      { name: "Go",         style: "chip-coral" },
      { name: "Python",     style: "chip-neutral" },
      { name: "C",          style: "chip-neutral" },
      { name: "JavaScript", style: "chip-neutral" },
      { name: "SQL",        style: "chip-neutral" },
      { name: "HTML / CSS", style: "chip-neutral" },
    ],
  },
  {
    label: "Frameworks",
    skills: [
      { name: "React",      style: "chip-violet" },
      { name: "Nuxt",       style: "chip-violet" },
      { name: "Quarkus",    style: "chip-violet" },
      { name: "Node.js",    style: "chip-neutral" },
      { name: "Express",    style: "chip-neutral" },
      { name: "GraphQL",    style: "chip-neutral" },
      { name: "EJS",        style: "chip-neutral" },
      { name: "Bootstrap",  style: "chip-neutral" },
    ],
  },
  {
    label: "Databases",
    skills: [
      { name: "PostgreSQL", style: "chip-teal" },
      { name: "MySQL",      style: "chip-teal" },
      { name: "MongoDB",    style: "chip-neutral" },
      { name: "Oracle",     style: "chip-neutral" },
    ],
  },
  {
    label: "Tools",
    skills: [
      { name: "AWS",            style: "chip-lime" },
      { name: "Docker",         style: "chip-lime" },
      { name: "GitHub Actions", style: "chip-neutral" },
      { name: "Jenkins",        style: "chip-neutral" },
      { name: "Postman",        style: "chip-neutral" },
      { name: "Linux",          style: "chip-neutral" },
      { name: "Git",            style: "chip-neutral" },
    ],
  },
];

function SkillRow({
  group,
  groupIndex,
}: {
  group: (typeof skillGroups)[0];
  groupIndex: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="sk-row">
      <span className="sk-cat">{group.label}</span>
      <div className="sk-chips">
        {group.skills.map((skill, i) => (
          <motion.span
            key={skill.name}
            className={`chip ${skill.style}`}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{
              duration: 0.3,
              delay: groupIndex * 0.08 + i * 0.045,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {skill.name}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="skills-section">
      <p className="sec-eyebrow">Skills &amp; Technologies</p>
      <div className="sk-groups">
        {skillGroups.map((group, i) => (
          <SkillRow key={group.label} group={group} groupIndex={i} />
        ))}
      </div>
    </section>
  );
}
