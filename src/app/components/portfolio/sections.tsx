import { Github, Mail, Linkedin, ArrowRight, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router";
import { useEffect, useState } from "react";
import { HoverFill } from "./HoverFill";
import { Sparkle, Scribble, Portrait } from "./decorative";
import {
  projects,
  experiences,
  favouriteTracks,
  type Project,
  type Publication,
} from "./data";
import { useInView } from "./useInView";
import workspaceImg from "../../../imports/workspace.webp";

const navy = "var(--p-navy)";
const gold = "var(--p-gold)";

declare global {
  interface Window {
    Calendly?: {
      initBadgeWidget: (opts: Record<string, unknown>) => void;
    };
  }
}

/**
 * Mounts the Calendly floating badge widget. Lazily loads the CSS + JS on
 * first mount, removes the injected badge element on unmount so it does not
 * persist across SPA route changes.
 */
export function CalendlyBadge() {
  useEffect(() => {
    const cssId = "calendly-css";
    const jsId = "calendly-js";

    if (!document.getElementById(cssId)) {
      const link = document.createElement("link");
      link.id = cssId;
      link.rel = "stylesheet";
      link.href = "https://assets.calendly.com/assets/external/widget.css";
      document.head.appendChild(link);
    }

    const init = () => {
      window.Calendly?.initBadgeWidget({
        url: "https://calendly.com/ndachimya/book-an-appointment?background_color=fdf6b2&text_color=0a1a5e&primary_color=a8881e",
        text: "Book an Appointment",
        color: "#030213",
        textColor: "#ffffff",
        branding: true,
      });
    };

    if (window.Calendly) {
      init();
    } else if (!document.getElementById(jsId)) {
      const script = document.createElement("script");
      script.id = jsId;
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      script.onload = init;
      document.body.appendChild(script);
    }

    return () => {
      document.querySelector(".calendly-badge-widget")?.remove();
    };
  }, []);

  return null;
}

/**
 * Skip-to-content link for keyboard users. Visually hidden until focused,
 * then appears as a navy pill at the top-left. Targets `#main`.
 */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:px-4 focus:py-2 focus:rounded"
      style={{
        backgroundColor: "var(--p-navy)",
        color: "var(--p-cream-soft)",
        fontWeight: 600,
      }}
    >
      Skip to content
    </a>
  );
}

export function SectionTitle({ children }: { children: string }) {
  return (
    <h2
      style={{
        color: gold,
        fontSize: "clamp(2.75rem, 10vw, 5rem)",
        fontWeight: 800,
        letterSpacing: "-0.02em",
        lineHeight: 1,
      }}
      className="mb-6 sm:mb-8"
    >
      {children}
    </h2>
  );
}

/**
 * When a route lands with a hash (e.g. /#about), scroll the matching element
 * into view. Runs on hash change so it also fires when the nav re-links to the
 * same page with a different hash.
 */
export function useScrollToHash() {
  const location = useLocation();
  useEffect(() => {
    if (!location.hash) {
      if (location.pathname === "/") return;
      window.scrollTo({ top: 0 });
      return;
    }
    const id = location.hash.slice(1);
    // Defer so the target section has mounted on first paint of the route.
    const t = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 50);
    return () => window.clearTimeout(t);
  }, [location.pathname, location.hash]);
}

function NavLink({
  to,
  children,
  onClick,
}: {
  to: { pathname: string; hash?: string } | string;
  children: string;
  onClick?: () => void;
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="relative inline-block group"
      style={{ color: navy, fontWeight: 600 }}
    >
      <span className="relative z-10 transition-colors duration-300 group-hover:text-[var(--p-gold)]">
        {children}
      </span>
      <span
        aria-hidden
        className="absolute left-0 -bottom-1 h-[2px] w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"
        style={{ backgroundColor: "var(--p-gold)" }}
      />
    </Link>
  );
}

const NAV_ITEMS: { to: { pathname: string; hash?: string } | string; label: string }[] = [
  { to: "/", label: "Home" },
  { to: { pathname: "/", hash: "#about" }, label: "About" },
  { to: { pathname: "/", hash: "#work" }, label: "Work" },
  { to: "/projects", label: "Projects" },
  { to: "/publications", label: "Publications" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const close = () => setOpen(false);

  // Close the mobile menu whenever the route or hash changes.
  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  return (
    <div
      className="sticky top-0 z-50"
      style={{ backgroundColor: "var(--p-cream)" }}
    >
      <nav
        className="relative max-w-6xl mx-auto px-6 sm:px-8 py-5 sm:py-6 flex items-center"
        aria-label="Primary"
      >
        <Link
          to="/"
          onClick={close}
          style={{
            color: navy,
            fontWeight: 800,
            fontSize: "clamp(1.15rem, 4vw, 1.6rem)",
            letterSpacing: "-0.01em",
          }}
        >
          Ndachimya Edward.
        </Link>

        <ul className="hidden md:flex absolute left-1/2 -translate-x-1/2 gap-6 lg:gap-8">
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <NavLink to={item.to}>{item.label}</NavLink>
            </li>
          ))}
        </ul>

        <a
          href="https://github.com/Mopheshi"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub profile"
          className="ml-auto hidden md:inline-flex group relative items-center justify-center w-10 h-10 transition-colors duration-300 hover:text-[var(--p-gold)]"
          style={{ color: navy }}
        >
          <span
            aria-hidden
            className="absolute inset-0 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 ease-out"
            style={{ backgroundColor: "var(--p-gold-soft)", opacity: 0.35 }}
          />
          <Github
            size={26}
            className="relative z-10 transition-transform duration-300 ease-out group-hover:-rotate-12 group-hover:scale-110"
          />
        </a>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="md:hidden ml-auto inline-flex items-center justify-center w-10 h-10 transition-colors duration-300 hover:text-[var(--p-gold)]"
          style={{ color: navy }}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      <div
        id="mobile-menu"
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ease-out ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{
          backgroundColor: "var(--p-cream)",
          borderTop: open ? "1px solid rgba(10,26,94,0.12)" : "1px solid transparent",
        }}
        aria-hidden={!open}
      >
        <ul className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-3">
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <Link
                to={item.to}
                onClick={close}
                className="block py-2 transition-colors duration-200 hover:text-[var(--p-gold)]"
                style={{ color: navy, fontWeight: 600, fontSize: "1.1rem" }}
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="pt-2">
            <a
              href="https://github.com/Mopheshi"
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
              className="inline-flex items-center gap-2 py-2 transition-colors duration-200 hover:text-[var(--p-gold)]"
              style={{ color: navy, fontWeight: 600 }}
            >
              <Github size={20} />
              <span>GitHub</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="home"
      className="max-w-6xl mx-auto px-6 sm:px-8 pt-8 sm:pt-12 pb-16 sm:pb-24 grid md:grid-cols-2 gap-10 items-center"
    >
      <div className="order-2 md:order-1">
        <p style={{ color: navy }} className="mb-3">
          Hello, I'm Ndachimya,
        </p>
        <h1
          style={{
            color: navy,
            fontSize: "clamp(2.75rem, 11vw, 5.5rem)",
            lineHeight: 0.95,
            fontWeight: 800,
            letterSpacing: "-0.02em",
          }}
        >
          AI Engineer
          <br />
          &amp; Founder
        </h1>
        <p style={{ color: navy }} className="mt-4">
          based in İstanbul, Türkiye.
        </p>

        <HoverFill
          href="https://1drv.ms/b/c/6249ab7e47a4e210/IQCRjgUjmvSwRZpaPcRqCROsAcDZHqrNydQmCnueagLhbhs?e=FIEgsz"
          external
          ariaLabel="Resume"
          className="mt-8 px-6 sm:px-8 py-3 border-2"
          style={{
            borderColor: "var(--p-navy)",
            color: "var(--p-navy)",
            backgroundColor: "var(--p-cream-soft)",
          }}
        >
          Resume
        </HoverFill>

        <p style={{ color: navy }} className="mt-6 max-w-md">
          <span style={{ fontWeight: 700 }}>Currently:</span> M.Sc. AI
          Engineering at İstanbul Okan University, building Vancus AI, open to
          PhD offers.
        </p>
      </div>

      <div className="order-1 md:order-2 relative flex justify-center md:justify-end">
        <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px]">
          <Sparkle className="absolute -top-2 right-2 w-10 h-10 sm:w-12 sm:h-12 z-10" />
          <Scribble className="absolute bottom-6 left-2 w-16 h-7 sm:w-20 sm:h-8 z-10" />
          <Portrait />
        </div>
      </div>
    </section>
  );
}

export function Metrics() {
  const items = [
    { n: "5", label: "papers accepted (2 selected)" },
    { n: "5", label: "production products shipped" },
    { n: "1", label: "accelerator (Dubai Create Apps)" },
  ];
  return (
    <section
      className="max-w-6xl mx-auto px-6 sm:px-8 pb-12"
      aria-label="At a glance"
    >
      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-y"
        style={{ borderColor: "rgba(10,26,94,0.25)" }}
      >
        {items.map((it) => (
          <div key={it.label} className="flex items-baseline gap-4">
            <span
              style={{
                color: navy,
                fontSize: "3rem",
                fontWeight: 800,
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
            >
              {it.n}
            </span>
            <span style={{ color: navy }}>{it.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="max-w-6xl mx-auto px-6 sm:px-8 py-12 sm:py-16">
      <SectionTitle>about.</SectionTitle>
      <p style={{ color: navy }} className="max-w-xl mb-12">
        AI aficionado, entrepreneur, and a lover of tech and good music.
        Currently a graduate student exploring applied AI research and deep
        learning, while building products as a founder. Open to PhD offers and
        technical co-founder / founder opportunities where rigorous research
        meets real-world engineering.
      </p>

      <div className="md:pl-32 space-y-8">
        {experiences.map((e) => (
          <div key={e.role} className="grid md:grid-cols-[12rem_1fr] gap-4">
            <div className="flex items-start gap-3" style={{ color: navy }}>
              <span
                className="inline-block w-2 h-2 rounded-full mt-2"
                style={{ backgroundColor: "var(--p-navy)" }}
              />
              <span>{e.range}</span>
            </div>
            <div style={{ color: navy }}>
              <div className="mb-1">
                <span style={{ fontWeight: 700 }}>{e.role}</span> — {e.location}
              </div>
              <p>{e.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ProjectCard({ p }: { p: Project }) {
  return (
    <div>
      <HoverFill
        href={p.href}
        external
        ariaLabel={`${p.title} — open project`}
        overlay={0.35}
        flipText={false}
        fill
        className="w-full mb-4"
        style={{ aspectRatio: "16 / 10" }}
      >
        <img
          src={p.img}
          alt={p.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
        />
      </HoverFill>

      <p style={{ color: navy }} className="mb-1 italic">
        {p.date}
      </p>

      <h3 className="mb-2">
        <HoverFill
          href={p.href}
          external
          className="px-1 -mx-1"
          style={{ color: "var(--p-navy)", fontWeight: 700 }}
        >
          {p.title}
        </HoverFill>
      </h3>

      <p style={{ color: navy }} className="mb-3">
        {p.body}
      </p>

      {p.stores && (
        <ul className="flex flex-wrap gap-2">
          {p.stores.map((s) => (
            <li key={s.href}>
              <HoverFill
                href={s.href}
                external
                className="inline-block text-sm px-2 py-1 border"
                style={{
                  borderColor: "var(--p-navy)",
                  color: "var(--p-navy)",
                  backgroundColor: "var(--p-cream-soft)",
                }}
              >
                {s.label}
              </HoverFill>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function Work() {
  return (
    <section id="work" className="max-w-6xl mx-auto px-6 sm:px-8 py-12 sm:py-16">
      <div className="flex items-end justify-between gap-6 flex-wrap mb-8">
        <SectionTitle>work.</SectionTitle>
        <Link
          to="/projects"
          className="group relative inline-flex items-center gap-2 mb-4 pb-1"
          style={{ color: navy, fontWeight: 600 }}
          aria-label="See all projects"
        >
          <span className="relative z-10 transition-colors duration-300 group-hover:text-[var(--p-gold)]">
            See all projects
          </span>
          <ArrowRight
            size={18}
            className="relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[var(--p-gold)]"
          />
          <span
            aria-hidden
            className="absolute left-0 bottom-0 h-[2px] w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"
            style={{ backgroundColor: "var(--p-gold)" }}
          />
        </Link>
      </div>

      <p style={{ color: navy }} className="max-w-xl mb-12">
        Selected products and research across applied AI, mobile, and backend
        engineering.
      </p>

      <div className="grid md:grid-cols-2 gap-10">
        {projects.map((p) => (
          <ProjectCard key={p.title} p={p} />
        ))}
      </div>

      <p style={{ color: navy }} className="mt-12">
        <span style={{ fontWeight: 700 }}>Stack — </span>
        Python · PyTorch · Flutter · TypeScript
      </p>
    </section>
  );
}

export function StatusPill({ status }: { status: Publication["status"] }) {
  const styles: Record<
    Publication["status"],
    { bg: string; color: string; border: string }
  > = {
    Accepted: {
      bg: "var(--p-navy)",
      color: "var(--p-cream-soft)",
      border: "var(--p-navy)",
    },
    Submitted: {
      bg: "var(--p-cream-soft)",
      color: "var(--p-navy)",
      border: "var(--p-navy)",
    },
    "Under Review": {
      bg: "var(--p-gold-soft)",
      color: "var(--p-navy)",
      border: "var(--p-gold)",
    },
  };
  const s = styles[status];
  return (
    <span
      className="inline-flex items-center text-xs uppercase tracking-wider px-2 py-1 border w-fit"
      style={{
        backgroundColor: s.bg,
        color: s.color,
        borderColor: s.border,
        fontWeight: 700,
        letterSpacing: "0.08em",
      }}
    >
      {status}
    </span>
  );
}

export function AuthorsLine({ raw }: { raw: string }) {
  const ME = "N. M. Edward";
  const parts = raw.split(ME);
  return (
    <p style={{ color: navy }}>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 && (
            <span style={{ fontWeight: 700 }}>{ME}</span>
          )}
        </span>
      ))}
    </p>
  );
}

export function PublicationItem({ p }: { p: Publication }) {
  return (
    <article className="grid md:grid-cols-[12rem_1fr] gap-4 md:gap-8">
      <div className="flex flex-col gap-2" style={{ color: navy }}>
        <StatusPill status={p.status} />
        <span style={{ opacity: 0.75 }}>{p.year}</span>
      </div>
      <div style={{ color: navy }}>
        <h3 className="mb-2" style={{ fontWeight: 700, lineHeight: 1.25 }}>
          {p.href ? (
            <HoverFill
              href={p.href}
              external
              className="px-1 -mx-1"
              style={{ color: "var(--p-navy)", fontWeight: 700 }}
            >
              {p.title}
            </HoverFill>
          ) : (
            p.title
          )}
        </h3>
        <AuthorsLine raw={p.authors} />
        <p className="italic mt-1" style={{ color: navy, opacity: 0.85 }}>
          {p.venue}
        </p>
      </div>
    </article>
  );
}

export function Music() {
  const [ref, seen] = useInView<HTMLDivElement>("400px");
  return (
    <section id="music" className="max-w-6xl mx-auto px-6 sm:px-8 py-12 sm:py-16">
      <SectionTitle>music.</SectionTitle>
      <p style={{ color: navy }} className="max-w-xl mb-12">
        A few tracks on heavy rotation while I code, read, and write.
      </p>
      <div ref={ref} className="grid md:grid-cols-3 gap-6">
        {favouriteTracks.map((id) =>
          seen ? (
            <iframe
              key={id}
              title={`Spotify track ${id}`}
              data-testid="embed-iframe"
              style={{ borderRadius: 12 }}
              src={`https://open.spotify.com/embed/track/${id}?utm_source=generator&theme=0`}
              width="100%"
              height={352}
              frameBorder={0}
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          ) : (
            <div
              key={id}
              style={{
                borderRadius: 12,
                height: 352,
                backgroundColor: "rgba(10,26,94,0.06)",
              }}
              aria-hidden
            />
          ),
        )}
      </div>
    </section>
  );
}

// Testimonial — left in place, exported, but commented-out in App() until a real quote lands.
export function Testimonial() {
  return (
    <section className="max-w-6xl mx-auto px-6 sm:px-8 py-12 sm:py-16">
      <blockquote
        className="max-w-3xl"
        style={{
          color: navy,
          fontSize: "1.6rem",
          lineHeight: 1.3,
          fontWeight: 600,
          letterSpacing: "-0.01em",
        }}
      >
        “Quote goes here — one or two sentences about working with Edward.”
        <footer className="mt-4" style={{ fontWeight: 400, fontSize: "1rem" }}>
          — Name, Title, Company
        </footer>
      </blockquote>
    </section>
  );
}

function IconHover({
  href,
  ariaLabel,
  external,
  children,
}: {
  href: string;
  ariaLabel: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  return (
    <HoverFill
      href={href}
      external={external}
      ariaLabel={ariaLabel}
      className="w-12 h-12 border-2"
      style={{
        borderColor: "var(--p-navy)",
        color: "var(--p-navy)",
        backgroundColor: "var(--p-cream-soft)",
      }}
    >
      {children}
    </HoverFill>
  );
}

export function Contact() {
  return (
    <section id="contact" className="max-w-6xl mx-auto px-6 sm:px-8 py-12 sm:py-16 pb-24 sm:pb-32">
      <SectionTitle>contact.</SectionTitle>
      <div className="grid md:grid-cols-2 gap-10 items-start">
        <HoverFill
          href="#"
          overlay={0.35}
          flipText={false}
          fill
          className="overflow-hidden"
          style={{ aspectRatio: "4 / 3", width: "100%" }}
        >
          <img
            src={workspaceImg}
            alt="Edward's workspace"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
        </HoverFill>
        <div style={{ color: navy }}>
          <p className="mb-6">
            Open to PhD offers and technical co-founder / founder roles where
            applied AI research meets shipping engineering. Currently in
            İstanbul.
          </p>
          <div className="flex gap-5">
            <IconHover href="mailto:ndachimya@gmail.com" ariaLabel="Email">
              <Mail size={22} />
            </IconHover>
            <IconHover
              href="https://linkedin.com/in/ndachimyaedward"
              ariaLabel="LinkedIn profile"
              external
            >
              <Linkedin size={22} />
            </IconHover>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer
      className="max-w-6xl mx-auto px-6 sm:px-8 py-8 border-t"
      style={{ color: navy, borderColor: "rgba(10,26,94,0.2)" }}
    >
      <p>© 2026 Ndachimya</p>
      <p className="mt-2 text-sm" style={{ opacity: 0.7 }}>
        This page embeds Spotify, which may set cookies on play.
      </p>
    </footer>
  );
}
