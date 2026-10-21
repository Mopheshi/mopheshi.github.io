import { useEffect, useRef, useState } from "react";

type Callback = () => void;

/**
 * One IntersectionObserver per `rootMargin`, shared by every element that asks
 * for it. Previously each consumer allocated its own observer, which meant one
 * observer per project card, publication row and embed on the page. Pooling
 * them keeps a single intersection callback per margin and lets the browser
 * batch the work for all observed targets in one pass.
 */
const pools = new Map<
  string,
  { observer: IntersectionObserver; callbacks: Map<Element, Callback> }
>();

function getPool(rootMargin: string) {
  let pool = pools.get(rootMargin);
  if (!pool) {
    const callbacks = new Map<Element, Callback>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const callback = callbacks.get(entry.target);
          if (!callback) continue;
          // Reveal is one-shot: unhook before firing so a re-entrant render
          // cannot observe a stale callback.
          callbacks.delete(entry.target);
          observer.unobserve(entry.target);
          callback();
        }
      },
      { rootMargin },
    );
    pool = { observer, callbacks };
    pools.set(rootMargin, pool);
  }
  return pool;
}

function observe(el: Element, rootMargin: string, callback: Callback) {
  const { observer, callbacks } = getPool(rootMargin);
  callbacks.set(el, callback);
  observer.observe(el);
  return () => {
    callbacks.delete(el);
    observer.unobserve(el);
  };
}

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/** True when the visitor has asked the OS to minimise motion. */
export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia(REDUCED_MOTION_QUERY).matches
  );
}

/**
 * Reactive version of {@link prefersReducedMotion}; updates if the visitor
 * flips the OS setting while the page is open.
 */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(prefersReducedMotion);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const mq = window.matchMedia(REDUCED_MOTION_QUERY);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

/**
 * Returns `[ref, hasBeenSeen]` — flips true once the element scrolls into
 * view, then stays. Observation is shared across consumers via the pool above,
 * and the observer is detached as soon as the element has been seen.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  rootMargin = "200px",
) {
  const ref = useRef<T | null>(null);
  // When motion is reduced there is nothing to stage in — treat everything as
  // already seen so content is never gated behind an animation.
  const [seen, setSeen] = useState(prefersReducedMotion);

  useEffect(() => {
    const el = ref.current;
    if (seen || !el) return;
    if (typeof IntersectionObserver === "undefined") {
      setSeen(true);
      return;
    }
    return observe(el, rootMargin, () => setSeen(true));
  }, [seen, rootMargin]);

  return [ref, seen] as const;
}
