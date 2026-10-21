import {
  BackLink,
  PageShell,
  ProjectCard,
  SectionTitle,
  useScrollToHash,
} from "../components/portfolio/sections";
import { Reveal } from "../components/portfolio/Reveal";
import { allProjects } from "../components/portfolio/data";
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
      url: p.href.startsWith("/") ? `https://mopheshi.github.io${p.href}` : p.href,
      author: { "@type": "Person", name: "Ndachimya Edward" },
    },
  })),
};

export default function ProjectsPage() {
  useSeo({
    title: "Projects — Ndachimya Edward",
    description:
      "Complete project portfolio of Ndachimya Edward — humanoid teleoperation research, applied AI products, fintech apps, mobile builds and published papers from Vancus AI, VaultSplit, PersonaRAG and more.",
    path: "/projects",
    extraJsonLd: [{ id: "ld-projects", data: projectsJsonLd }],
  });
  useScrollToHash();

  return (
    <PageShell>
      <section
        id="projects"
        className="max-w-6xl mx-auto px-6 sm:px-8 pt-8 sm:pt-12 pb-16 sm:pb-24"
      >
        <BackLink to="/#work" />

        <SectionTitle>projects.</SectionTitle>
        <p style={{ color: navy }} className="max-w-2xl mb-16">
          Every research project, shipped product and side build I've put my
          name on — humanoid teleoperation, applied AI, mobile apps, fintech,
          and a few ongoing language and gaming experiments. Click through for
          repos, demos and store listings.
        </p>

        <div className="grid md:grid-cols-2 gap-x-10 gap-y-12 sm:gap-y-16">
          {allProjects.map((p, i) => (
            <Reveal key={p.title} delayMs={(i % 2) * 80}>
              <ProjectCard p={p} />
            </Reveal>
          ))}
        </div>

        <p style={{ color: navy }} className="mt-16">
          <span style={{ fontWeight: 700 }}>Stack — </span>
          Python · PyTorch · PyBullet · Unity 6 · Flutter · TypeScript · Node ·
          Firebase
        </p>
      </section>
    </PageShell>
  );
}
