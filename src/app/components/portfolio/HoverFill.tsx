import type { ReactNode, CSSProperties } from "react";

type Props = {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
  ariaLabel?: string;
  /** Overlay opacity (0..1). 1 = full fill, lower = subtle wash for images. */
  overlay?: number;
  /** Whether the foreground (text/icon) flips to cream on hover. */
  flipText?: boolean;
  /**
   * If true, children are rendered as direct content of the anchor (use for
   * images/cards). If false (default), children are wrapped in a centered
   * relative span (use for text/icon buttons).
   */
  fill?: boolean;
  style?: CSSProperties;
};

/**
 * Single shared hover effect: a gold panel slides in from the left.
 * Used for buttons, link text, icon tiles, and image overlays.
 */
export function HoverFill({
  href,
  children,
  external,
  className = "",
  ariaLabel,
  overlay = 1,
  flipText = true,
  fill = false,
  style,
}: Props) {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={`group relative ${
        fill ? "block" : "inline-flex items-center justify-center"
      } overflow-hidden ${className}`}
      style={style}
    >
      {fill && children}
      <span
        aria-hidden
        className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out pointer-events-none"
        style={{
          backgroundColor: "var(--p-gold-soft)",
          opacity: overlay,
        }}
      />
      {!fill && (
        <span
          className={`relative z-10 transition-colors duration-300 ${
            flipText ? "group-hover:text-[var(--p-cream-soft)]" : ""
          }`}
        >
          {children}
        </span>
      )}
    </a>
  );
}
