import vancusImg from "../../../imports/vancus.webp";
import vaultsplitImg from "../../../imports/vaultsplit.webp";
import paysphereImg from "../../../imports/paysphere.webp";

export type Store = "play" | "appstore" | "amazon" | "github" | "web";

export type Project = {
  date: string;
  title: string;
  body: string;
  img: string;
  href: string;
  stores?: { kind: Store; href: string; label: string }[];
};

export type PublicationStatus = "Accepted" | "Submitted" | "Under Review";

export type Publication = {
  title: string;
  /** Pre-formatted author list. Use the exact token "N. M. Edward" for me — it
   *  is matched and highlighted at render time. */
  authors: string;
  venue: string;
  year: number;
  status: PublicationStatus;
  href?: string;
  publisher?: string;
};

const personaRagImg =
  "https://images.unsplash.com/photo-1677442136019-21780ecad995?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80";

const expertSystemImg =
  "https://images.unsplash.com/photo-1767716134786-92b647b12846?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80";

const acmImg =
  "https://images.unsplash.com/photo-1764336312138-14a5368a6cd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80";

const incaseImg =
  "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80";

const towerOfHanoiImg =
  "https://images.unsplash.com/photo-1611996575749-79a3a250f948?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80";

const urielChatImg =
  "https://images.unsplash.com/photo-1655720828018-edd2daec9349?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80";

const kilbaImg =
  "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80";

const kilbaDictionaryImg =
  "https://images.unsplash.com/photo-1532012197267-da84d127e765?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80";

const vancus: Project = {
  date: "2026 — Present",
  title: "Vancus AI",
  body: "Premium remote construction intelligence. AI-powered vision engines verify daily site progress and stop construction fraud — built for diaspora real-estate investors building back home, with African diaspora especially in mind.",
  img: vancusImg,
  href: "https://vancus.app",
  stores: [
    {
      kind: "play",
      href: "https://play.google.com/store/apps/details?id=com.vancus",
      label: "Google Play",
    },
    { kind: "web", href: "https://vancus.app", label: "Home Page" },
    {
      kind: "web",
      href: "https://dashboard.vancus.app",
      label: "Dashboard",
    },
  ],
};

const vaultsplit: Project = {
  date: "2024 — 2026",
  title: "VaultSplit",
  body: "AI-powered, conversational speech-to-speech financial management for individuals and business owners. I led the build from scratch — mobile, backend, CI/CD and app-store delivery — turning a blank repo into a shipped product on iOS and Android.",
  img: vaultsplitImg,
  href: "https://vaultsplit.co",
  stores: [
    {
      kind: "appstore",
      href: "https://apps.apple.com/app/vaultsplit",
      label: "App Store",
    },
    {
      kind: "play",
      href: "https://play.google.com/store/apps/details?id=co.vaultsplit",
      label: "Google Play",
    },
    { kind: "web", href: "https://vaultsplit.co", label: "vaultsplit.co" },
  ],
};

const acm: Project = {
  date: "2026 — Accepted",
  title: "Adaptive Circular Manifold (ACM)",
  body: "First-author research introducing a density-dependent geometric metric for robust gradient descent. Accepted at the 8th International Congress on HCI, Optimisation and Robotic Applications.",
  img: acmImg,
  href: "https://github.com/Mopheshi/ACM-Optimiser",
  stores: [
    {
      kind: "github",
      href: "https://github.com/Mopheshi/ACM-Optimiser",
      label: "GitHub",
    },
  ],
};

const personaRag: Project = {
  date: "2026",
  title: "PersonaRAG",
  body: "An agentic LLM framework for behavioural user modelling and contextual recommendation, built for the DSN × BCT LLM Agent Challenge 2026. Two-task system over the Yelp Open Dataset — a review simulator that predicts star ratings and writes in-voice reviews, and a three-stage recommendation agent (intent reasoning → semantic retrieval over 150K businesses → LLM reranking). Both tasks share a Nigerian Cultural Adapter that injects authentic Nigerian English and Naija Pidgin when local signals are detected.",
  img: personaRagImg,
  href: "https://github.com/Mopheshi/bcthack",
  stores: [
    {
      kind: "github",
      href: "https://github.com/Mopheshi/bcthack",
      label: "GitHub",
    },
  ],
};

const expertSystem: Project = {
  date: "2026 — Accepted",
  title: "Expert System for Medical Diagnosis",
  body: "First-author expert system combining an LLM front-end with rule-based logic engines for medical diagnosis from natural language.",
  img: expertSystemImg,
  href: "https://github.com/Mopheshi/ExpertSystemforMedDiag",
  stores: [
    {
      kind: "github",
      href: "https://github.com/Mopheshi/ExpertSystemforMedDiag",
      label: "GitHub",
    },
  ],
};

const incase: Project = {
  date: "2026",
  title: "In Case",
  body: "A vault for the information you don't want lost — Incase helps you securely organise, protect, and share the most important details in your life. I served as the backend developer, designing the storage, auth, and sharing flows powering the Android app.",
  img: incaseImg,
  href: "https://play.google.com/store/apps/details?id=com.app.incaseapp",
  stores: [
    {
      kind: "play",
      href: "https://play.google.com/store/apps/details?id=com.app.incaseapp",
      label: "Google Play",
    },
  ],
};

const paysphere: Project = {
  date: "2026",
  title: "Paysphere",
  body: "A fintech application for global banking, built in Dart and Flutter so the same codebase delivers iOS, Android, and a progressive web app dashboard with consistent UX across platforms.",
  img: paysphereImg,
  href: "https://app.mypaysphere.com/",
  stores: [
    { kind: "web", href: "https://app.mypaysphere.com/", label: "Dashboard" },
  ],
};

const towerOfHanoi: Project = {
  date: "2025",
  title: "Tower of Hanoi",
  body: "A cross-platform 2D take on the classic puzzle — playable in a web browser and on mobile, with smooth disc-stacking interactions and a minimal, distraction-free interface.",
  img: towerOfHanoiImg,
  href: "https://mopheshi.github.io/TowerOfHanoi/",
  stores: [
    {
      kind: "web",
      href: "https://mopheshi.github.io/TowerOfHanoi/",
      label: "Play live",
    },
    {
      kind: "github",
      href: "https://github.com/Mopheshi/TowerOfHanoi",
      label: "GitHub",
    },
  ],
};

const urielChat: Project = {
  date: "2024",
  title: "Uriel Chat",
  body: "A generative-AI mobile assistant powered by Google Gemini, built in Dart and Flutter for cross-platform reach. Shipped on the Amazon App Store with a conversational interface tuned for everyday productivity.",
  img: urielChatImg,
  href: "https://www.amazon.com/Atachiz02-Softwares-Uriel-Chat/dp/B0DKDFPSDP",
  stores: [
    {
      kind: "amazon",
      href: "https://www.amazon.com/Atachiz02-Softwares-Uriel-Chat/dp/B0DKDFPSDP",
      label: "Amazon App Store",
    },
    {
      kind: "github",
      href: "https://github.com/Atachiz02Softwares/UrielChat",
      label: "GitHub",
    },
  ],
};

const kilba: Project = {
  date: "2024 — Ongoing",
  title: "Kilba",
  body: "An ongoing NLP / ML project for the Kilba (Həba) language — next-word prediction, analogy, machine translation, and spell-checking. A long-term effort to bring modern language tooling to a low-resource language I grew up speaking.",
  img: kilbaImg,
  href: "https://github.com/Mopheshi/Kilba",
  stores: [
    {
      kind: "github",
      href: "https://github.com/Mopheshi/Kilba",
      label: "GitHub",
    },
  ],
};

const kilbaDictionary: Project = {
  date: "2024",
  title: "Kilba Dictionary",
  body: "An Android dictionary app for the Kilba (Həba) language — searchable entries with usage examples, built to put a low-resource language in the pocket of every speaker. Shipped on the Amazon App Store under Atachiz02 Softwares.",
  img: kilbaDictionaryImg,
  href: "https://www.amazon.com/Atachiz02-Softwares-Kilba-Dictionary/dp/B0DDQGRH4H",
  stores: [
    {
      kind: "amazon",
      href: "https://www.amazon.com/Atachiz02-Softwares-Kilba-Dictionary/dp/B0DDQGRH4H",
      label: "Amazon App Store",
    },
  ],
};

/** Four featured projects shown on the home page. */
export const projects: Project[] = [vancus, vaultsplit, acm, personaRag];

/** Full project list shown on the dedicated /projects page. */
export const allProjects: Project[] = [
  vancus,
  vaultsplit,
  acm,
  personaRag,
  expertSystem,
  incase,
  paysphere,
  urielChat,
  towerOfHanoi,
  kilba,
  kilbaDictionary,
];

const HORA =
  "8th International Congress on Human-Computer Interaction, Optimization and Robotic Applications";
const ASYU = "Innovations in Intelligent Systems and Applications Conference";

export const publications: Publication[] = [
  {
    title:
      "PersonaRAG: An Agentic LLM Framework for Behavioural User Modelling and Contextual Recommendation",
    authors: "N. M. Edward",
    venue: ASYU,
    year: 2026,
    status: "Submitted",
    href: "https://github.com/Mopheshi/bcthack",
  },
  {
    title:
      "Lightweight Machine Learning Models for Fake News Detection: An Ensemble Approach with Part-of-Speech Features",
    authors:
      "N. M. Edward, L. A. Obadiah, J. Daniel, N. M. Abubakar, D. Godwin, C. Ishaya, G. Nyibong, Y. G. Bello",
    venue: ASYU,
    year: 2026,
    status: "Submitted",
  },
  {
    title:
      "Adaptive Circular Manifold (ACM): A Density-Dependent Geometric Metric for Robust Gradient Descent",
    authors: "N. M. Edward, J. Daniel, Y. Dauda",
    venue: HORA,
    year: 2026,
    status: "Accepted",
    href: "https://ieeexplore.ieee.org/document/11537092",
    publisher: "IEEE",
  },
  {
    title:
      "A Neuro-Symbolic Expert System for Medical Diagnosis From Natural Language with Rule-Based Logic Engines",
    authors: "N. M. Edward, D. Godwin, F. Odeh, A. Sağlam, M. Leila",
    venue: HORA,
    year: 2026,
    status: "Accepted",
    href: "https://doi.org/10.1109/ICHORA69329.2026.11536979",
    publisher: "IEEE",
  },
  {
    title:
      "Explainable Prediction of Daily Stress and Sleep Quality from Passive Smartphone Behavioral Sensing: A SHAP-Based Analysis of the StudentLife Dataset",
    authors:
      "N. M. Edward, S. Wilson, J. Daniel, C. Ishaya, Z. Musa, V. Augustine, Y. G. Bello, L. A. Obadiah, D. K. Titus",
    venue: HORA,
    year: 2026,
    status: "Accepted",
    href: "https://doi.org/10.1109/ICHORA69329.2026.11537136",
    publisher: "IEEE",
  },
  {
    title:
      "Credit Card Fraud Detection: Addressing Class Imbalance with Machine Learning",
    authors:
      "D. Godwin, D. K. Titus, N. M. Edward, N. M. Abubakar, C. Ishaya",
    venue: HORA,
    year: 2026,
    status: "Accepted",
    href: "https://doi.org/10.1109/ICHORA69329.2026.11537105",
    publisher: "IEEE",
  },
  {
    title:
      "Bias and Fairness in AI Systems: Theoretical Analysis and Empirical Validation Through Reweighing Mitigation",
    authors:
      "L. A. Obadiah, D. Godwin, N. M. Edward, N. M. Abubakar, J. Daniel, D. K. Titus",
    venue: HORA,
    year: 2026,
    status: "Accepted",
    href: "https://doi.org/10.1109/ICHORA69329.2026.11537050",
    publisher: "IEEE",
  },
];

export const experiences = [
  {
    range: "Jan. 2026 — Present",
    role: "Founder, Vancus AI",
    location: "İstanbul, Türkiye",
    body: "Lead full-stack development and systems architecture; oversee team operations and app/dashboard distribution on the Google Play Store and the Vancus Dashboard.",
  },
  {
    range: "Nov. 2024 — Jan. 2026",
    role: "Founding Engineer, VaultSplit Technologies",
    location: "Abuja, Nigeria",
    body: "Selected among 24 startups worldwide for the 45-day Dubai Create Apps Accelerator. Designed, built, and deployed the VaultSplit mobile app and backend; implemented CI/CD pipelines and managed iOS / Android distribution.",
  },
  {
    range: "Feb. 2023 — Present",
    role: "Founder, Atachiz02 Softwares",
    location: "Abuja, Nigeria",
    body: "Independent studio I run on the side — shipping mobile and web products end-to-end for clients and personal bets, from first sketch to App Store and Play Store delivery.",
  },
];

export const favouriteTracks = [
  "2oitlpDllAtMHSJXP7pur6",
  "0ERnYArznxdTBEIj1VSta8",
  "4TknSiotwLHHvAzMI2BjAs",
];
