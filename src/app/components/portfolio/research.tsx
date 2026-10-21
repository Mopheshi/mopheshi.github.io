import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { DriveVideo } from "./DriveVideo";
import teleoperationPoster from "../../../imports/teleoperation.webp";
import { Reveal } from "./Reveal";
import { SectionTitle } from "./sections";
import {
  awards,
  education,
  research,
  researchInterests,
  researchStrands,
  skillGroups,
  type ResearchMetric,
} from "./data";

const navy = "var(--p-navy)";
const gold = "var(--p-gold)";

/** Thin rule used to separate stacked blocks without adding a heavy border. */
const hairline = "rgba(10,26,94,0.18)";

/** The research statement plus its scannable strands. Shared by both routes. */
export function ResearchStatement({ compact = false }: { compact?: boolean }) {
  return (
    <>
      <p
        style={{
          color: navy,
          fontSize: compact ? undefined : "clamp(1.1rem, 2.4vw, 1.35rem)",
          lineHeight: 1.5,
        }}
        className="max-w-3xl"
      >
        {researchInterests}
      </p>
      <ul className="mt-6 flex flex-wrap gap-2" aria-label="Research strands">
        {researchStrands.map((strand) => (
          <li
            key={strand}
            className="text-sm px-3 py-1 border"
            style={{
              borderColor: navy,
              color: navy,
              backgroundColor: "var(--p-cream-soft)",
            }}
          >
            {strand}
          </li>
        ))}
      </ul>
    </>
  );
}

function MetricTile({ metric }: { metric: ResearchMetric }) {
  return (
    <div>
      <div
        style={{
          color: navy,
          fontSize: "clamp(1.75rem, 5vw, 2.5rem)",
          fontWeight: 800,
          lineHeight: 1,
          letterSpacing: "-0.02em",
        }}
      >
        {metric.value}
      </div>
      <div className="mt-1" style={{ color: navy, fontWeight: 600 }}>
        {metric.label}
      </div>
      {metric.detail && (
        <div className="text-sm mt-0.5" style={{ color: navy, opacity: 0.75 }}>
          {metric.detail}
        </div>
      )}
    </div>
  );
}

/** Dateline shown under the thesis title on both routes. */
function ResearchMeta() {
  return (
    <p className="text-sm" style={{ color: navy, opacity: 0.85 }}>
      {research.kind} · {research.stage} · {research.period} · Supervisor:{" "}
      {research.supervisor} · {research.institution}
    </p>
  );
}

/**
 * Home-page research section: the statement, the demo video, and the four
 * headline figures, with a route through to the full write-up.
 */
export function Research() {
  return (
    <section
      id="research"
      className="max-w-6xl mx-auto px-6 sm:px-8 py-12 sm:py-16"
    >
      <div className="flex items-end justify-between gap-6 flex-wrap mb-8">
        <SectionTitle>research.</SectionTitle>
        <ReadMoreLink to="/research" label="Read the full write-up" />
      </div>

      <ResearchStatement />

      <div className="mt-12 grid lg:grid-cols-[1.15fr_1fr] gap-10 items-start">
        <Reveal>
          <DriveVideo
            videoId={research.videoId}
            poster={teleoperationPoster}
            aspectRatio={research.videoAspectRatio}
            href={research.videoHref}
            title={research.title}
            caption={research.videoCaption}
          />
        </Reveal>

        <Reveal delayMs={80}>
          <h3
            style={{
              color: navy,
              fontWeight: 800,
              fontSize: "clamp(1.35rem, 3vw, 1.75rem)",
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
            }}
          >
            {research.title}
          </h3>
          <div className="mt-2">
            <ResearchMeta />
          </div>
          <p className="mt-4" style={{ color: navy }}>
            {research.summary}
          </p>

          <dl className="mt-8 grid grid-cols-2 gap-6">
            {research.metrics.map((metric) => (
              <MetricTile key={metric.label} metric={metric} />
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

/** Underlined arrow link, matching the "See all projects" treatment. */
export function ReadMoreLink({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      className="group relative inline-flex items-center gap-2 mb-4 pb-1"
      style={{ color: navy, fontWeight: 600 }}
      aria-label={label}
    >
      <span className="relative z-10 transition-colors duration-300 group-hover:text-[var(--p-gold)]">
        {label}
      </span>
      <ArrowRight
        size={18}
        className="relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[var(--p-gold)]"
      />
      <span
        aria-hidden
        className="absolute left-0 bottom-0 h-[2px] w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"
        style={{ backgroundColor: gold }}
      />
    </Link>
  );
}

/** Full technical write-up of the thesis — used on the /research route. */
export function ResearchDetail() {
  return (
    <div>
      <h2
        style={{
          color: navy,
          fontWeight: 800,
          fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
          lineHeight: 1.15,
          letterSpacing: "-0.015em",
        }}
      >
        {research.title}
      </h2>
      <div className="mt-3">
        <ResearchMeta />
      </div>

      <div className="mt-8">
        <DriveVideo
          videoId={research.videoId}
          poster={teleoperationPoster}
          aspectRatio={research.videoAspectRatio}
          href={research.videoHref}
          title={research.title}
          caption={research.videoCaption}
        />
      </div>

      <p className="mt-8 max-w-3xl" style={{ color: navy }}>
        {research.summary}
      </p>

      <dl
        className="mt-10 grid grid-cols-2 lg:grid-cols-3 gap-8 py-8 border-y"
        style={{ borderColor: hairline }}
      >
        {research.metrics.map((metric) => (
          <MetricTile key={metric.label} metric={metric} />
        ))}
      </dl>

      <div className="mt-12 space-y-10">
        {research.pillars.map((pillar, i) => (
          <Reveal key={pillar.title} delayMs={Math.min(i * 60, 180)}>
            <div className="grid md:grid-cols-[12rem_1fr] gap-4 md:gap-8">
              <h3
                style={{
                  color: gold,
                  fontWeight: 800,
                  fontSize: "1.25rem",
                  letterSpacing: "-0.01em",
                }}
              >
                {pillar.title}
              </h3>
              <p style={{ color: navy }}>{pillar.body}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <div
        className="mt-12 pt-8 border-t grid md:grid-cols-[12rem_1fr] gap-4 md:gap-8"
        style={{ borderColor: hairline }}
      >
        <h3 style={{ color: navy, fontWeight: 700 }}>Next</h3>
        <p style={{ color: navy }}>{research.next}</p>
      </div>

      <div className="mt-8 grid md:grid-cols-[12rem_1fr] gap-4 md:gap-8">
        <h3 style={{ color: navy, fontWeight: 700 }}>Built with</h3>
        <ul className="flex flex-wrap gap-2">
          {research.stack.map((tool) => (
            <li
              key={tool}
              className="text-sm px-2 py-1 border"
              style={{
                borderColor: navy,
                color: navy,
                backgroundColor: "var(--p-cream-soft)",
              }}
            >
              {tool}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Degrees, grades and relevant coursework. */
export function EducationList() {
  return (
    <div className="space-y-10">
      {education.map((e, i) => (
        <Reveal key={e.degree} delayMs={Math.min(i * 60, 180)}>
          <div className="grid md:grid-cols-[12rem_1fr] gap-4 md:gap-8">
            <div className="flex items-start gap-3" style={{ color: navy }}>
              <span
                aria-hidden
                className="inline-block w-2 h-2 rounded-full mt-2 shrink-0"
                style={{ backgroundColor: navy }}
              />
              <span>{e.range}</span>
            </div>
            <div style={{ color: navy }}>
              <h3 style={{ fontWeight: 700, lineHeight: 1.3 }}>{e.degree}</h3>
              <p className="mt-1">
                {e.institution} — {e.location}
              </p>
              <p className="mt-1" style={{ fontWeight: 600 }}>
                {e.honours ? `${e.honours} · ${e.grade}` : e.grade}
              </p>
              {e.thesis && (
                <p className="mt-2">
                  <span style={{ fontWeight: 700 }}>Thesis: </span>
                  {e.thesis}
                </p>
              )}
              {e.coursework && (
                <p className="mt-2 text-sm" style={{ opacity: 0.8 }}>
                  <span style={{ fontWeight: 700 }}>Coursework: </span>
                  {e.coursework}
                </p>
              )}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/** Home-page education section wrapper. */
export function Education() {
  return (
    <section
      id="education"
      className="max-w-6xl mx-auto px-6 sm:px-8 py-12 sm:py-16"
    >
      <SectionTitle>education.</SectionTitle>
      <div className="md:pl-32 mt-8">
        <EducationList />
      </div>
    </section>
  );
}

/** Technical skills, grouped as they are on the CV. */
export function SkillsGrid() {
  return (
    <div className="space-y-6">
      {skillGroups.map((group) => (
        <div
          key={group.heading}
          className="grid md:grid-cols-[12rem_1fr] gap-2 md:gap-8"
        >
          <h3 style={{ color: gold, fontWeight: 800 }}>{group.heading}</h3>
          <p style={{ color: navy }}>{group.items}</p>
        </div>
      ))}
    </div>
  );
}

/** Awards, scholarships, teaching and memberships. */
export function AwardsList() {
  return (
    <ul className="space-y-5">
      {awards.map((a) => (
        <li
          key={`${a.year}-${a.title}`}
          className="grid md:grid-cols-[12rem_1fr] gap-2 md:gap-8"
        >
          <span style={{ color: navy, opacity: 0.8 }}>{a.year}</span>
          <span style={{ color: navy }}>
            <span style={{ fontWeight: 700 }}>{a.title}</span>
            {a.detail && <span> — {a.detail}</span>}
          </span>
        </li>
      ))}
    </ul>
  );
}
