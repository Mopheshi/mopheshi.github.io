import {
  BackLink,
  PageShell,
  PublicationItem,
  SectionTitle,
  useScrollToHash,
} from "../components/portfolio/sections";
import { Reveal } from "../components/portfolio/Reveal";
import { publications } from "../components/portfolio/data";
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
      "Peer-reviewed conference papers by Ndachimya Edward — first-author and co-author research in optimisation, neuro-symbolic reasoning, explainable ML and agentic LLMs (IEEE ICHORA 2026, IEEE ASYU 2026, ISAS 2026).",
    path: "/publications",
    extraJsonLd: [{ id: "ld-publications", data: publicationsJsonLd }],
  });
  useScrollToHash();

  return (
    <PageShell>
      <section
        id="publications"
        className="max-w-6xl mx-auto px-6 sm:px-8 pt-8 sm:pt-12 pb-16 sm:pb-24"
      >
        <BackLink />

        <SectionTitle>publications.</SectionTitle>
        <p style={{ color: navy }} className="max-w-2xl mb-16">
          Seven peer-reviewed conference papers — five published and two
          accepted — spanning Riemannian optimisation, neuro-symbolic
          reasoning, explainable ML and fairness, with three as first author.
        </p>

        <div className="md:pl-32 space-y-10 sm:space-y-12">
          {publications.map((p, i) => (
            <Reveal key={p.title} delayMs={Math.min(i * 60, 240)}>
              <PublicationItem p={p} />
            </Reveal>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
