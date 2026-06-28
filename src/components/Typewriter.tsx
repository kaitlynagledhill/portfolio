"use client";

import { useEffect, useState } from "react";

const phrases = [
  "enterprise platforms.",
  "full-stack web apps.",
  "embedded hardware.",
  "real businesses.",
  "clean, fast APIs.",
  "things that ship.",
];

export default function Typewriter() {
  const [displayed, setDisplayed] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = phrases[phraseIndex % phrases.length];

    const timeout = setTimeout(
      () => {
        if (!deleting) {
          setDisplayed(word.slice(0, charIndex + 1));
          setCharIndex((c) => c + 1);
          if (charIndex + 1 === word.length) {
            setTimeout(() => setDeleting(true), 2100);
          }
        } else {
          setDisplayed(word.slice(0, charIndex - 1));
          setCharIndex((c) => c - 1);
          if (charIndex - 1 === 0) {
            setDeleting(false);
            setPhraseIndex((p) => p + 1);
          }
        }
      },
      deleting ? 45 : 88
    );

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, phraseIndex]);

  return (
    <div className="typewriter-block">
      <p className="tw-label">Currently building</p>
      <div className="tw-line">
        <span className="tw-text">{displayed}</span>
        <span className="cursor" aria-hidden="true" />
      </div>
    </div>
  );
}
