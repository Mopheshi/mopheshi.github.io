import { Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./app/App.tsx";
import "./styles/index.css";

// The home route ships in the entry chunk; the standalone routes are split out
// so a first visit does not download markup it is not about to render.
const ResearchPage = lazy(() => import("./app/pages/ResearchPage.tsx"));
const ProjectsPage = lazy(() => import("./app/pages/ProjectsPage.tsx"));
const PublicationsPage = lazy(() => import("./app/pages/PublicationsPage.tsx"));

/** Holds the cream background while a route chunk is in flight. */
function RouteFallback() {
  return (
    <div
      className="min-h-screen w-full"
      style={{ backgroundColor: "var(--p-cream)" }}
      aria-busy="true"
    />
  );
}

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/research" element={<ResearchPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/publications" element={<PublicationsPage />} />
      </Routes>
    </Suspense>
  </BrowserRouter>,
);
