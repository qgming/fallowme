import { useEffect, useState } from "react";

const HERO_TEXT = "Hello,World";
const TYPING_DELAY_MS = 120;
const LOOP_PAUSE_MS = 1600;

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateMotionPreference = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);

    return () => {
      mediaQuery.removeEventListener("change", updateMotionPreference);
    };
  }, []);

  return prefersReducedMotion;
}

function useTypewriterText(text: string) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    if (prefersReducedMotion) return;

    const delay = typedText === text ? LOOP_PAUSE_MS : TYPING_DELAY_MS;
    const timer = window.setTimeout(() => {
      setTypedText((currentText) =>
        currentText === text ? "" : text.slice(0, currentText.length + 1),
      );
    }, delay);

    return () => {
      window.clearTimeout(timer);
    };
  }, [prefersReducedMotion, text, typedText]);

  return prefersReducedMotion ? text : typedText;
}

export default function HeroSection() {
  const typedText = useTypewriterText(HERO_TEXT);

  return (
    <section className="relative flex h-[50vh] items-center justify-center overflow-hidden md:min-h-screen">
      <div className="hero-glow hero-glow-left" aria-hidden="true" />
      <div className="hero-glow hero-glow-right" aria-hidden="true" />

      <div className="animate-fade-in-up px-6 text-center md:-translate-y-[100px] md:px-6">
        <h1 className="text-5xl font-bold leading-tight tracking-tight sm:text-6xl md:text-8xl lg:text-9xl">
          <span className="sr-only">{HERO_TEXT}</span>
          <span aria-hidden="true" className="text-accent">
            {typedText}
            <span className="typewriter-cursor">|</span>
          </span>
        </h1>
      </div>
    </section>
  );
}
