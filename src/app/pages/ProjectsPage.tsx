import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import {
  Nav,
  Footer,
  ProjectCard,
  SectionTitle,
  SkipLink,
  useScrollToHash,
} from "../components/portfolio/sections";
import { allProjects, type Project } from "../components/portfolio/data";
import { useInView } from "../components/portfolio/useInView";
import { useSeo } from "../components/portfolio/useSeo";

const navy = "var(--p-navy)";

const projectsJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Projects by Ndachimya Edward",
  itemListElement: allProjects.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "CreativeWork",
      name: p.title,
      description: p.body,
      url: p.href,
      author: { "@type": "Person", name: "Ndachimya Edward" },
    },
  })),
};

export default function ProjectsPage() {
  useSeo({
    title: "Projects — Ndachimya Edward",
    description:
      "Complete project portfolio of Ndachimya Edward — applied AI products, fintech apps, mobile builds, and research from Vancus AI, VaultSplit, PersonaRAG, and more.",
    path: "/projects",
    extraJsonLd: [{ id: "ld-projects", data: projectsJsonLd }],
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
          id="projects"
          className="max-w-6xl mx-auto px-6 sm:px-8 pt-8 sm:pt-12 pb-16 sm:pb-24"
        >
          <Link
            to="/#work"
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

          <SectionTitle>projects.</SectionTitle>
          <p style={{ color: navy }} className="max-w-2xl mb-16">
            Every shipped product, research paper, and side build I've put my
            name on — applied AI, mobile apps, fintech, and a few ongoing
            language and gaming experiments. Click through for repos, live
            demos, and store listings.
          </p>

          <div className="grid md:grid-cols-2 gap-x-10 gap-y-12 sm:gap-y-16">
            {allProjects.map((p, i) => (
              <Reveal key={p.title} project={p} delayMs={(i % 2) * 80} />
            ))}
          </div>

          <p style={{ color: navy }} className="mt-16">
            <span style={{ fontWeight: 700 }}>Stack — </span>
            Python · PyTorch · Flutter · TypeScript · Node · Firebase
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function Reveal({ project, delayMs }: { project: Project; delayMs: number }) {
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
      <ProjectCard p={project} />
    </div>
  );
}
