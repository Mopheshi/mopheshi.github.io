import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import {
  Nav,
  Footer,
  PublicationItem,
  SectionTitle,
  useScrollToHash,
} from "../components/portfolio/sections";
import {
  publications,
  type Publication,
} from "../components/portfolio/data";
import { useInView } from "../components/portfolio/useInView";
import { useSeo } from "../components/portfolio/useSeo";

const navy = "var(--p-navy)";

export default function PublicationsPage() {
  useSeo();
  useScrollToHash();

  useEffect(() => {
    const prev = document.title;
    document.title = "Publications — Ndachimya Edward";
    return () => {
      document.title = prev;
    };
  }, []);

  return (
    <div
      className="min-h-screen w-full"
      style={{ backgroundColor: "var(--p-cream)" }}
    >
      <Nav />
      <main>
        <section
          id="publications"
          className="max-w-6xl mx-auto px-8 pt-12 pb-24"
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

          <div className="md:pl-32 space-y-12">
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
