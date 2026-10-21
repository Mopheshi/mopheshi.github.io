import type { ReactNode, CSSProperties } from "react";
import { Link } from "react-router";

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
 * True for in-app routes ("/research"), false for absolute URLs, `mailto:`,
 * `tel:` and bare hash targets. Lets callers pass `external` loosely without
 * accidentally punching internal navigation out into a new browser tab.
 */
function isInternalRoute(href: string) {
  return href.startsWith("/") && !href.startsWith("//");
}

/**
 * Single shared hover effect: a gold panel slides in from the left.
 * Used for buttons, link text, icon tiles, and image overlays.
 *
 * In-app hrefs are routed through react-router so they do not trigger a full
 * document reload; everything else renders a plain anchor.
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
  const internal = isInternalRoute(href);
  const openInNewTab = external && !internal;

  const content = (
    <>
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
    </>
  );

  const shared = {
    "aria-label": ariaLabel,
    className: `group relative ${
      fill ? "block" : "inline-flex items-center justify-center"
    } overflow-hidden ${className}`,
    style,
  };

  if (internal) {
    return (
      <Link to={href} {...shared}>
        {content}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target={openInNewTab ? "_blank" : undefined}
      rel={openInNewTab ? "noopener noreferrer" : undefined}
      {...shared}
    >
      {content}
    </a>
  );
}
