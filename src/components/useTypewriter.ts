"use client";

import { useEffect, useState } from "react";

const phrases = [
  "enterprise platforms.",
  "full-stack web apps.",
  "embedded systems in C.",
  "RESTful APIs.",
  "real client software.",
];

export function useTypewriter() {
  const [displayed, setDisplayed] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = phrases[phraseIndex % phrases.length];
    const delay = deleting ? 45 : 88;

    const timeout = setTimeout(() => {
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
    }, delay);

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, phraseIndex]);

  return displayed;
}