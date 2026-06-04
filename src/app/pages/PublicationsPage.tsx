import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import {
  Nav,
  Footer,
  PublicationItem,
  SectionTitle,
  SkipLink,
  useScrollToHash,
} from "../components/portfolio/sections";
import {
  publications,
  type Publication,
} from "../components/portfolio/data";
import { useInView } from "../components/portfolio/useInView";
import { useSeo } from "../components/portfolio/useSeo";

const navy = "var(--p-navy)";

function parseAuthors(raw: string) {
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((name) => ({ "@type": "Person", name }));
}

const publicationsJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Publications by Ndachimya Edward",
  itemListElement: publications.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "ScholarlyArticle",
      headline: p.title,
      author: parseAuthors(p.authors),
      isPartOf: { "@type": "PublicationVolume", name: p.venue },
      datePublished: String(p.year),
      creativeWorkStatus: p.status,
      ...(p.href ? { url: p.href } : {}),
      ...(p.publisher
        ? { publisher: { "@type": "Organization", name: p.publisher } }
        : {}),
    },
  })),
};

export default function PublicationsPage() {
  useSeo({
    title: "Publications — Ndachimya Edward",
    description:
      "Peer-reviewed and submitted conference papers by Ndachimya Edward — first-author and co-author research in applied AI, optimisation, explainable ML, and agentic LLMs (HORA 2026, ASYU 2026).",
    path: "/publications",
    extraJsonLd: [{ id: "ld-publications", data: publicationsJsonLd }],
  });
  useScrollToHash();

  return (
    <div
      className="min-h-screen w-full"
      style={{ backgroundColor: "var(--p-cream)" }}
    >
      <SkipLink />
      <Nav />
      <main id="main">
        <section
          id="publications"
          className="max-w-6xl mx-auto px-6 sm:px-8 pt-8 sm:pt-12 pb-16 sm:pb-24"
        >
          <Link
            to="/"
            className="group inline-flex items-center gap-2 mb-10"
            style={{ color: navy, fontWeight: 600 }}
            aria-label="Back to home"
          >
            <ArrowLeft
              size={18}
              className="transition-transform duration-300 group-hover:-translate-x-1 group-hover:text-[var(--p-gold)]"
            />
            <span className="relative">
              <span className="transition-colors duration-300 group-hover:text-[var(--p-gold)]">
                Back to home
              </span>
              <span
                aria-hidden
                className="absolute left-0 -bottom-1 h-[2px] w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"
                style={{ backgroundColor: "var(--p-gold)" }}
              />
            </span>
          </Link>

          <SectionTitle>publications.</SectionTitle>
          <p style={{ color: navy }} className="max-w-2xl mb-16">
            Peer-reviewed conference papers and active submissions from
            collaborations in applied AI, optimisation, and explainable ML —
            including first-author work accepted at the 2026 HORA Congress.
          </p>

          <div className="md:pl-32 space-y-10 sm:space-y-12">
            {publications.map((p, i) => (
              <Reveal key={p.title} pub={p} delayMs={Math.min(i * 60, 240)} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function Reveal({ pub, delayMs }: { pub: Publication; delayMs: number }) {
  const [ref, seen] = useInView<HTMLDivElement>("120px");
  return (
    <div
      ref={ref}
      style={{
        opacity: seen ? 1 : 0,
        transform: seen ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 600ms ease-out ${delayMs}ms, transform 600ms ease-out ${delayMs}ms`,
        willChange: "opacity, transform",
      }}
    >
      <PublicationItem p={pub} />
    </div>
  );
}
