import teleoperationImg from "../../../imports/teleoperation.webp";
import vancusImg from "../../../imports/vancus.webp";
import vaultsplitImg from "../../../imports/vaultsplit.webp";
import paysphereImg from "../../../imports/paysphere.webp";

export type Store = "play" | "appstore" | "amazon" | "github" | "web";

/** Google Drive file id of the teleoperation simulation demo video. */
export const DEMO_VIDEO_ID = "17Kym9MnuxIv6Wj_WgTTDskb1mgKoBsQu";

export type Project = {
  date: string;
  title: string;
  body: string;
  img: string;
  href: string;
  stores?: { kind: Store; href: string; label: string }[];
};

export type PublicationStatus = "Published" | "Accepted" | "Submitted" | "Under Review";

export type ResearchMetric = {
  value: string;
  label: string;
  /** Optional baseline/comparison shown underneath the figure. */
  detail?: string;
};

export type ResearchPillar = { title: string; body: string };

export type Research = {
  title: string;
  kind: string;
  period: string;
  stage: string;
  supervisor: string;
  institution: string;
  /** One-paragraph framing used on both the home section and /research. */
  summary: string;
  /** Google Drive file id of the simulation demo video. */
  videoId: string;
  /** Canonical share link, used as the fallback for the embed. */
  videoHref: string;
  /** Intrinsic aspect ratio of the recording, e.g. "16 / 9". */
  videoAspectRatio: string;
  /** Human-readable caption shown under the player. */
  videoCaption: string;
  metrics: ResearchMetric[];
  pillars: ResearchPillar[];
  next: string;
  stack: string[];
};

export type Education = {
  range: string;
  degree: string;
  institution: string;
  location: string;
  grade: string;
  thesis?: string;
  coursework?: string;
  honours?: string;
};

export type SkillGroup = { heading: string; items: string };

export type Award = { year: string; title: string; detail?: string };

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

const fakeNewsImg =
  "https://images.unsplash.com/photo-1495020689067-958852a7765e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=900&q=80";

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

const teleoperation: Project = {
  date: "2026 — Present",
  title: "IMU-Based Arm Teleoperation of a Unitree G1 Humanoid",
  body: "M.Sc. thesis research (simulation stage). A real-time pipeline that maps an operator's arm — measured by five wearable IMUs over BLE — onto a simulated Unitree G1 at 30 Hz. Three-pose calibration cancels unknown mounting and heading offsets (1.8° median arm-direction error against 74° for a single-pose baseline); direction-matching inverse kinematics on the G1 URDF solves in about 10 ms; and a constraint-aware safety layer cuts blocked frames from 40% to 7% while holding the last safe pose on failure.",
  img: teleoperationImg,
  href: "/research",
  stores: [
    {
      kind: "web",
      href: `https://drive.google.com/file/d/${DEMO_VIDEO_ID}/view?usp=sharing`,
      label: "Demo video",
    },
    { kind: "web", href: "/research", label: "Research write-up" },
  ],
};

const fakeNewsLite: Project = {
  date: "2026 — Accepted",
  title: "Fake News Detection on Commodity CPUs",
  body: "First-author work pairing XGBoost with a TextCNN in a CPU-only ensemble that carries 429× fewer parameters than a fine-tuned BERT. Publisher-holdout and cross-dataset tests show that in-distribution accuracy is inflated by source leakage — the paper reports that rather than the headline figure alone. Accepted at ISAS 2026.",
  img: fakeNewsImg,
  href: "https://github.com/Mopheshi/fakenews-lite",
  stores: [
    {
      kind: "github",
      href: "https://github.com/Mopheshi/fakenews-lite",
      label: "GitHub",
    },
  ],
};

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
  date: "2026 — Published",
  title: "Adaptive Circular Manifold (ACM)",
  body: "First-author research introducing a density-dependent Riemannian metric for robust gradient descent, analysed for algorithmic stability, convergence and generalisation. Published at IEEE ICHORA 2026, the 8th International Congress on HCI, Optimisation and Robotic Applications.",
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
  date: "2026 — Published",
  title: "Expert System for Medical Diagnosis",
  body: "First-author neuro-symbolic system that couples an LLM front-end to a DAG-structured rule engine, so diagnosis from natural language is auditable rather than opaque. Published at IEEE ICHORA 2026.",
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
  teleoperation,
  vancus,
  vaultsplit,
  acm,
  personaRag,
  fakeNewsLite,
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
const ISAS =
  "International Symposium on Innovative Approaches in Smart Technologies";

export const publications: Publication[] = [
  {
    title:
      "Adaptive Circular Manifold (ACM): A Density-Dependent Geometric Metric for Robust Gradient Descent",
    authors: "N. M. Edward, J. Daniel, Y. Dauda",
    venue: HORA,
    year: 2026,
    status: "Published",
    href: "https://doi.org/10.1109/ICHORA69329.2026.11537092",
    publisher: "IEEE",
  },
  {
    title:
      "A Neuro-Symbolic Expert System for Medical Diagnosis From Natural Language with Rule-Based Logic Engines",
    authors: "N. M. Edward, D. Godwin, F. Odeh, A. Sağlam, M. Leila",
    venue: HORA,
    year: 2026,
    status: "Published",
    href: "https://doi.org/10.1109/ICHORA69329.2026.11536979",
    publisher: "IEEE",
  },
  {
    title:
      "Bias and Fairness in AI Systems: Theoretical Analysis and Empirical Validation Through Reweighing Mitigation",
    authors:
      "L. A. Obadiah, D. Godwin, N. M. Edward, N. M. Abubakar, J. Daniel, D. K. Titus",
    venue: HORA,
    year: 2026,
    status: "Published",
    href: "https://doi.org/10.1109/ICHORA69329.2026.11537050",
    publisher: "IEEE",
  },
  {
    title:
      "Explainable Prediction of Daily Stress and Sleep Quality from Passive Smartphone Behavioral Sensing: A SHAP-Based Analysis of the StudentLife Dataset",
    authors:
      "J. Daniel, C. Ishaya, N. M. Edward, V. Augustine, Y. G. Bello, L. A. Obadiah, S. Wilson, Z. Musa, D. K. Titus",
    venue: HORA,
    year: 2026,
    status: "Published",
    href: "https://doi.org/10.1109/ICHORA69329.2026.11537136",
    publisher: "IEEE",
  },
  {
    title:
      "Credit Card Fraud Detection: Addressing Class Imbalance with Machine Learning",
    authors: "D. Godwin, D. K. Titus, N. M. Edward, N. M. Abubakar, C. Ishaya",
    venue: HORA,
    year: 2026,
    status: "Published",
    href: "https://doi.org/10.1109/ICHORA69329.2026.11537105",
    publisher: "IEEE",
  },
  {
    title:
      "A Reproducible Benchmark of U-Net Variants for Multimodal Brain Tumour Segmentation on BraTS 2020: Comparative Evaluation and Modality Ablation",
    authors:
      "L. A. Obadiah, N. M. Abubakar, D. Godwin, N. M. Edward, G. Nyibong, J. Daniel",
    venue: ASYU,
    year: 2026,
    status: "Accepted",
    publisher: "IEEE",
  },
  {
    // No DOI yet — the GitHub repository is linked from the Projects page
    // instead, so the "See publication" affordance never points at code.
    title:
      "Lightweight Ensemble Fake News Detection on Commodity CPUs: A Measured Comparison of Cost and Accuracy",
    authors:
      "N. M. Edward, L. A. Obadiah, J. Daniel, N. M. Abubakar, C. Ishaya, D. Godwin, Y. G. Bello, N. George",
    venue: ISAS,
    year: 2026,
    status: "Accepted",
  },
];

export const experiences = [
  {
    range: "Jun. 2026 — Present",
    role: "AI Engineer, SALI",
    location: "Remote — West Bridgford, Nottingham, England",
    body: "Engineer on DocAI, the document-analysis service at the core of SALI's AI-powered sustainability compliance platform — it validates documents, grades evidence quality, and returns ESG metrics that other services call for analysis. Also work on SaliUN, a United Nations project that uses DocAI to analyse organisational documents and extract sustainability performance metrics and insights against UN SDG frameworks, alongside contributing to other products across the company.",
  },
  {
    range: "Jan. 2026 — Present",
    role: "Founder, Vancus AI",
    location: "İstanbul, Türkiye",
    body: "Lead full-stack development and systems architecture; oversee team operations and app/dashboard distribution on the Google Play Store and the Vancus Dashboard.",
  },
  {
    range: "Nov. 2024 — Jan. 2026",
    role: "Founding Engineer, VaultSplit Technologies",
    location: "Remote — FCT, Nigeria",
    body: "Selected among 24 startups worldwide for the 45-day Dubai Create Apps Accelerator. Designed, built, and deployed the VaultSplit mobile app and backend; implemented CI/CD pipelines and managed iOS / Android distribution.",
  },
  {
    range: "Feb. 2023 — Present",
    role: "Founder, Atachiz02 Softwares",
    location: "FCT, Nigeria",
    body: "Independent studio I run on the side — shipping mobile and web products end-to-end for clients and personal bets, from first sketch to App Store and Play Store delivery.",
  },
  {
    range: "Mar. 2024 — Jan. 2025",
    role: "Youth Service (NYSC), Ikeja Electric PLC",
    location: "Lagos, Nigeria",
    body: "Built IE Service Monitor, an internal tool for reporting and tracking electricity-downtime incidents across the distribution network.",
  },
  {
    range: "Aug. 2021 — Jul. 2022",
    role: "Software Engineering Intern, National Population Commission",
    location: "Nigeria",
    body: "Statistical analysis in SPSS and STATA; served as a CAPI facilitator for the 2022 Trial Census.",
  },
];

export const favouriteTracks = [
  "2oitlpDllAtMHSJXP7pur6",
  "0ERnYArznxdTBEIj1VSta8",
  "4TknSiotwLHHvAzMI2BjAs",
];

/**
 * Lead research statement, taken from the CV. Shown on the home research
 * section and at the head of the /research page.
 */
export const researchInterests =
  "Trustworthy shared autonomy for human–robot teleoperation: constraint-aware control that keeps people safe without taking the operator out of charge, and robot behaviour that can be specified and reasoned about rather than merely measured.";

/** Short strands used as scannable chips beneath the research statement. */
export const researchStrands: string[] = [
  "Shared autonomy",
  "Human–robot teleoperation",
  "Constraint-aware control",
  "Motion retargeting",
  "Learning from demonstration",
  "Neuro-symbolic reasoning",
];

export const research: Research = {
  title: "IMU-Based Arm Teleoperation of a Unitree G1 Humanoid",
  kind: "M.Sc. thesis",
  period: "2024 — Present",
  stage: "Simulation stage",
  supervisor: "Assist. Prof. Sina Alp",
  institution: "İstanbul Okan University",
  summary:
    "A real-time pipeline that maps an operator's arm, measured by five wearable IMUs over BLE, onto a simulated Unitree G1 in Unity 6 at 30 Hz. Python handles calibration, kinematics and the safety layer; Unity only renders the joint targets. The design goal throughout is that the operator stays in charge while the constraints stay enforceable — and that every claim is measured rather than asserted.",
  videoId: DEMO_VIDEO_ID,
  videoHref: `https://drive.google.com/file/d/${DEMO_VIDEO_ID}/view?usp=sharing`,
  /** Matches the recording, so the poster frame is never cropped. */
  videoAspectRatio: "1600 / 748",
  videoCaption:
    "Simulation demo — operator arm motion retargeted onto the Unitree G1 in Unity 6.",
  metrics: [
    {
      value: "1.8°",
      label: "median arm-direction error",
      detail: "against 74° for a single-pose baseline",
    },
    {
      value: "10 ms",
      label: "inverse-kinematics solve",
      detail: "regularised least squares, 4 constraints for 4 joints",
    },
    {
      value: "30 Hz",
      label: "end-to-end control rate",
      detail: "five BLE IMUs → Python → Unity 6",
    },
    {
      value: "7%",
      label: "blocked frames",
      detail: "down from 40% on recorded operator data",
    },
  ],
  pillars: [
    {
      title: "Calibration",
      body: "A three-pose procedure that cancels each sensor's unknown mounting and heading offset, with handedness measured rather than inferred. Median arm-direction error of 1.8° on simulated sensors, against 74° for a single-pose baseline; forward and side poses land within 3° of azimuth in live validation on a human operator.",
    },
    {
      title: "Retargeting",
      body: "Direction-matching inverse kinematics on the G1 URDF — upper-arm and forearm directions, four constraints for four joints — solved by regularised least squares in about 10 ms. An elbow-dependent prior resolves the shoulder-yaw redundancy near full extension, and replay tests show no solution drift.",
    },
    {
      title: "Safety layer",
      body: "Joint-limit, velocity (90°/s), stale-sensor, glitch and self-collision checks with a 3 mm margin, holding the last safe pose on any failure. Blocked frames fall from 40% to 7% on recorded operator data, so the constraint layer protects the robot without stalling the operator.",
    },
  ],
  next: "Heading-drift correction during large movements, then transfer to the physical robot through ROS 2.",
  stack: [
    "Python",
    "NumPy",
    "SciPy",
    "PyBullet",
    "Unity 6",
    "URDF",
    "BLE (bleak)",
    "UDP",
    "ROS 2 (next)",
  ],
};

export const education: Education[] = [
  {
    range: "Oct. 2025 — expected 2027",
    degree: "M.Sc. Artificial Intelligence Engineering (with Thesis)",
    institution: "İstanbul Okan University",
    location: "İstanbul, Türkiye",
    grade: "CGPA 3.86 / 4.00 (96.73%)",
    thesis:
      "In progress — IMU-based teleoperation of a humanoid robot arm, supervised by Assist. Prof. Sina Alp.",
    coursework:
      "Deep Learning · Advanced Machine Learning · Natural Language Processing · Design of AI Systems · Decision Making and Robotics · AI Engineering",
  },
  {
    range: "Oct. 2017 — Jan. 2024",
    degree: "B.Tech. (Hons.) Computer Science",
    institution: "Modibbo Adama University",
    location: "Yola, Nigeria",
    grade: "CGPA 4.54 / 5.00 (90.8%)",
    honours: "First Class Honours — ranked 1st of 99",
    thesis:
      "Həba Mobile Dictionary — a digital lexicon for a low-resource Nigerian language.",
    coursework:
      "Linear Algebra · Calculus · Statistics for Engineering and Physical Sciences · Computer Programming · Data Structures & Algorithms · AI & Expert Systems",
  },
];

export const skillGroups: SkillGroup[] = [
  {
    heading: "Robotics",
    items:
      "Forward and inverse kinematics; IMU orientation and quaternion maths, sensor calibration; motion retargeting; self-collision checking; robot learning from demonstration (LfD).",
  },
  {
    heading: "Methods",
    items:
      "Statistical and deep learning; nonlinear least squares; Riemannian and gradient-based optimisation; probabilistic modelling; explainable AI (SHAP); RAG and LLM agents; neuro-symbolic rule engines.",
  },
  {
    heading: "Languages",
    items: "Python, C#, Java, Dart.",
  },
  {
    heading: "Tools",
    items:
      "PyBullet, Unity 6 (ArticulationBody, URDF import), URDF, BLE (bleak), UDP; PyTorch, TensorFlow / Keras, Scikit-Learn, Hugging Face Transformers, NumPy, SciPy, Pandas.",
  },
];

export const awards: Award[] = [
  {
    year: "2025",
    title: "Fully-Funded Postgraduate Scholarship",
    detail: "Adamawa State Government, Nigeria.",
  },
  {
    year: "2024",
    title: "Best Graduating Student, Department of Computer Science",
    detail: "Modibbo Adama University — 1st of 99.",
  },
  {
    year: "2024",
    title: "Academic Excellence Award",
    detail: "Həba Development Association, Abuja.",
  },
  {
    year: "2021 — 2023",
    title: "Undergraduate Scholarships",
    detail:
      "Federal Scholarship Board of Nigeria (2023) and Adamawa State Government (2021, 2022).",
  },
  {
    year: "2024 — 2025",
    title: "Instructor, DigiMinds Foundation",
    detail: "Taught Flutter and Dart to pre-university students.",
  },
  {
    year: "Memberships",
    title: "IEEE (since 2026)",
    detail: "NACOS and NASS (2017 — 2023).",
  },
];
