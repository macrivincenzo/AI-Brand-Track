'use client';

import { useEffect, useState } from 'react';

const WORDS = ['ChatGPT', 'Claude', 'Perplexity', 'Gemini'];

/**
 * The headline's engine name: server HTML says only "ChatGPT" (what Google indexes). After
 * mount every word sits in one grid cell, so the slot keeps the widest word's width and the
 * centered headline never shifts; the visible word changes calmly every 2.5s.
 * Reduced motion: stays on "ChatGPT".
 */
export function RotatingWord() {
  const [mounted, setMounted] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    setMounted(true);
    const id = window.setInterval(() => setIndex((i) => (i + 1) % WORDS.length), 2500);
    return () => window.clearInterval(id);
  }, []);

  if (!mounted) return <span className="text-abt-accent">{WORDS[0]}</span>;

  return (
    <span className="inline-grid justify-items-start text-left text-abt-accent">
      {WORDS.map((word, i) => (
        <span
          key={word}
          aria-hidden={i !== index}
          className={`abt-motion [grid-area:1/1] transition-[opacity,transform] ease-out ${
            i === index
              ? 'translate-y-0 opacity-100 delay-200 duration-500'
              : 'translate-y-[0.15em] opacity-0 duration-200'
          }`}
        >
          {word}
        </span>
      ))}
    </span>
  );
}
