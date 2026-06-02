import {
  Nav,
  Hero,
  Metrics,
  About,
  Work,
  Music,
  // Testimonial,
  Contact,
  Footer,
  SkipLink,
  CalendlyBadge,
  useScrollToHash,
} from "./components/portfolio/sections";
import { useSeo } from "./components/portfolio/useSeo";

export default function App() {
  useSeo();
  useScrollToHash();

  return (
    <div
      className="min-h-screen w-full"
      style={{ backgroundColor: "var(--p-cream)" }}
    >
      <SkipLink />
      <Nav />
      <main id="main">
        <Hero />
        <Metrics />
        <About />
        <Work />
        {/* <Testimonial /> */}
        <Music />
        <Contact />
      </main>
      <Footer />
      <CalendlyBadge />
    </div>
  );
}
