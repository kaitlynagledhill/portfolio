"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTypewriter } from "./useTypewriter";

export default function Hero() {
  const displayed = useTypewriter();
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = document.querySelector(".hero") as HTMLElement;
    if (!hero || !orbRef.current) return;

    const handleMove = (e: MouseEvent) => {
      if (!orbRef.current) return;
      orbRef.current.style.left = `${e.clientX}px`;
      orbRef.current.style.top = `${e.clientY}px`;
    };

    hero.addEventListener("mousemove", handleMove);
    return () => hero.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <section className="hero">
      <div ref={orbRef} className="cursor-orb" aria-hidden="true" />
      <div className="hero-bg" aria-hidden="true">
        <div className="orb orb1" />
        <div className="orb orb2" />
        <div className="orb orb3" />
        <div className="orb orb4" />
      </div>

      <div className="hero-inner">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="availability">
            <span className="avail-dot" />
            Open to opportunities
          </div>
        </motion.div>

        <motion.h1
          className="hero-headline"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="h1-plain">Hi, I&apos;m Kaitlyn. 👋</span>
          <span className="h1-italic">I craft software.</span>
        </motion.h1>

        <motion.div
          className="tw-block"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="tw-label">Currently working on</p>
          <div className="tw-row">
            <span className="tw-text">{displayed}</span>
            <span className="tw-cursor" aria-hidden="true" />
          </div>
        </motion.div>

        <motion.p
          className="hero-bio"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
        >
          Full-stack software engineer.{" "}
          <strong>NC State CS grad, Magna Cum Laude.</strong> Goodnight Scholar.
          From enterprise platforms to embedded microcontrollers — I build
          software that&apos;s clean under the hood and thoughtfully designed on
          the surface.
        </motion.p>

        <motion.div
          className="cta-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
        >
          <a href="#experience" className="btn-primary">
            See my work ↓
          </a>
          <a href="/resume.pdf" download className="btn-ghost">
            Download résumé
          </a>
        </motion.div>
      </div>
    </section>
  );
}