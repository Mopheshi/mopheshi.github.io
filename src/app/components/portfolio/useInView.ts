import { useEffect, useRef, useState } from "react";

/** Returns [ref, hasBeenSeen] — flips true once the element scrolls into view, then stays. */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  rootMargin = "200px",
) {
  const ref = useRef<T | null>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    if (seen || !ref.current) return;
    const el = ref.current;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSeen(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [seen, rootMargin]);

  return [ref, seen] as const;
}
