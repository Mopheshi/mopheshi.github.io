import {
  useCallback,
  useState,
  type CSSProperties,
  type ReactNode,
  type TransitionEvent,
} from "react";
import { useInView, usePrefersReducedMotion } from "./useInView";

type Props = {
  children: ReactNode;
  /** Stagger, in milliseconds, applied once the element enters the viewport. */
  delayMs?: number;
  /** Travel distance for the slide-up, in pixels. */
  distance?: number;
  rootMargin?: string;
  className?: string;
  style?: CSSProperties;
};

const DURATION_MS = 600;
/** Material-style decelerate curve — quicker off the mark than plain ease-out. */
const EASING = "cubic-bezier(0.16, 1, 0.3, 1)";

/**
 * Fades and slides its children in the first time they scroll into view.
 *
 * Two deliberate performance choices:
 *  - `translate3d` keeps the slide on the compositor rather than triggering
 *    layout, and only `opacity`/`transform` are transitioned.
 *  - `will-change` is set only while the animation is actually pending and is
 *    dropped on `transitionend`. Leaving it on permanently — as the previous
 *    per-page copies did — holds a GPU layer for every card on the page for
 *    the lifetime of the route.
 */
export function Reveal({
  children,
  delayMs = 0,
  distance = 16,
  rootMargin = "120px",
  className,
  style,
}: Props) {
  const [ref, seen] = useInView<HTMLDivElement>(rootMargin);
  const reduced = usePrefersReducedMotion();
  const [settled, setSettled] = useState(false);

  const onTransitionEnd = useCallback(
    (event: TransitionEvent<HTMLDivElement>) => {
      // Ignore bubbled transitions from children (hover fills, images).
      if (event.target === event.currentTarget) setSettled(true);
    },
    [],
  );

  const animating = !reduced && seen && !settled;

  return (
    <div
      ref={ref}
      onTransitionEnd={onTransitionEnd}
      className={className}
      style={{
        opacity: seen ? 1 : 0,
        transform: seen || reduced ? "none" : `translate3d(0, ${distance}px, 0)`,
        transition: reduced
          ? undefined
          : `opacity ${DURATION_MS}ms ${EASING} ${delayMs}ms, transform ${DURATION_MS}ms ${EASING} ${delayMs}ms`,
        willChange: animating ? "opacity, transform" : undefined,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
