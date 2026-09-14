import { useEffect, useRef, useState } from "react";

// Returns the id of the section currently under a line `ratio` of the way
// down the viewport. Falls back to the last id when scrolled to the bottom,
// since a short final section may never reach that line.
export function useActiveSection(ids, ratio = 0.35) {
  const [active, setActive] = useState(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      if (window.scrollY > 0 && window.innerHeight + window.scrollY >= doc.scrollHeight - 4) {
        setActive(ids[ids.length - 1]);
        return;
      }
      const line = window.innerHeight * ratio;
      let current = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [ids, ratio]);

  return active;
}

export function useScrolled(threshold = 12) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

// Adds `is-visible` once the element scrolls into view.
export function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

// Paints the body so overscroll matches the variant's background.
export function useBodyBackground(color) {
  useEffect(() => {
    const prev = document.body.style.backgroundColor;
    document.body.style.backgroundColor = color;
    return () => {
      document.body.style.backgroundColor = prev;
    };
  }, [color]);
}

// useState that remembers explicit choices in localStorage. Only the setter writes,
// so a default derived from system settings keeps following the system until the
// visitor picks something. Storage can be blocked, hence the try/catch.
export function usePersistentState(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw !== null) return JSON.parse(raw);
    } catch {
      // storage unavailable: fall through to the default
    }
    return typeof initial === "function" ? initial() : initial;
  });
  const set = (next) => {
    setValue(next);
    try {
      localStorage.setItem(key, JSON.stringify(next));
    } catch {
      // storage unavailable: the choice lasts for this page view only
    }
  };
  return [value, set];
}

export const REDUCED_MOTION =
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

// Looping slideshow state. Auto-advances every `interval` ms while at least
// half on screen and not hovered/focused; any manual step restarts the timer.
export function useCarousel(count, interval = 5000) {
  const [index, setIndex] = useState(0);
  const [held, setHeld] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0.5,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const running = count > 1 && visible && !held && !REDUCED_MOTION;

  useEffect(() => {
    if (!running) return;
    const timer = setTimeout(() => setIndex((i) => (i + 1) % count), interval);
    return () => clearTimeout(timer);
  }, [running, index, count, interval]);

  const go = (i) => setIndex(((i % count) + count) % count);

  return {
    ref,
    index,
    running,
    go,
    next: () => go(index + 1),
    prev: () => go(index - 1),
    holdHandlers: {
      onMouseEnter: () => setHeld(true),
      onMouseLeave: () => setHeld(false),
      onFocus: () => setHeld(true),
      onBlur: (e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setHeld(false);
      },
    },
  };
}

export const pad = (n) => String(n).padStart(2, "0");
