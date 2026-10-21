import {
  BackLink,
  PageShell,
  SectionTitle,
  useScrollToHash,
} from "../components/portfolio/sections";
import {
  AwardsList,
  EducationList,
  ReadMoreLink,
  ResearchDetail,
  ResearchStatement,
  SkillsGrid,
} from "../components/portfolio/research";
import { Reveal } from "../components/portfolio/Reveal";
import { research } from "../components/portfolio/data";
import { useSeo } from "../components/portfolio/useSeo";

const navy = "var(--p-navy)";
const hairline = "rgba(10,26,94,0.18)";

const researchJsonLd = {
  "@context": "https://schema.org",
  "@type": "ResearchProject",
  name: research.title,
  description: research.summary,
  url: "https://mopheshi.github.io/research",
  member: {
    "@type": "Person",
    name: "Ndachimya Edward",
    affiliation: {
      "@type": "CollegeOrUniversity",
      name: research.institution,
    },
  },
  subjectOf: {
    "@type": "VideoObject",
    name: `${research.title} — simulation demo`,
    description: research.videoCaption,
    contentUrl: research.videoHref,
    embedUrl: `https://drive.google.com/file/d/${research.videoId}/preview`,
  },
  about: [
    "Robotics",
    "Teleoperation",
    "Shared autonomy",
    "Inverse kinematics",
    "Motion retargeting",
    "Inertial measurement units",
  ],
};

/** Minor heading used for the sub-sections below the thesis write-up. */
function SubHeading({ children }: { children: string }) {
  return (
    <h2
      style={{
        color: navy,
        fontWeight: 800,
        fontSize: "clamp(1.35rem, 3vw, 1.75rem)",
        letterSpacing: "-0.01em",
      }}
      className="mb-6"
    >
      {children}
    </h2>
  );
}

export default function ResearchPage() {
  useSeo({
    title: "Research — Ndachimya Edward",
    description:
      "Robotics research by Ndachimya Edward — IMU-based arm teleoperation of a Unitree G1 humanoid, with three-pose sensor calibration, direction-matching inverse kinematics and a constraint-aware safety layer. Includes the simulation demo video.",
    path: "/research",
    extraJsonLd: [{ id: "ld-research", data: researchJsonLd }],
  });
  useScrollToHash();

  return (
    <PageShell>
      <section
        id="research"
        className="max-w-6xl mx-auto px-6 sm:px-8 pt-8 sm:pt-12 pb-16 sm:pb-24"
      >
        <BackLink />

        <SectionTitle>research.</SectionTitle>
        <ResearchStatement />

        <div className="mt-16">
          <ResearchDetail />
        </div>

        <div
          id="education"
          className="mt-20 pt-12 border-t"
          style={{ borderColor: hairline }}
        >
          <SubHeading>Education</SubHeading>
          <EducationList />
        </div>

        <div
          id="skills"
          className="mt-20 pt-12 border-t"
          style={{ borderColor: hairline }}
        >
          <SubHeading>Technical skills</SubHeading>
          <Reveal>
            <SkillsGrid />
          </Reveal>
        </div>

        <div
          id="awards"
          className="mt-20 pt-12 border-t"
          style={{ borderColor: hairline }}
        >
          <SubHeading>Awards, service and memberships</SubHeading>
          <Reveal>
            <AwardsList />
          </Reveal>
        </div>

        <div
          className="mt-20 pt-12 border-t flex flex-wrap gap-x-10 gap-y-2"
          style={{ borderColor: hairline }}
        >
          <ReadMoreLink to="/publications" label="See all publications" />
          <ReadMoreLink to="/projects" label="See all projects" />
        </div>
      </section>
    </PageShell>
  );
}
