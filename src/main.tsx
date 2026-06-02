import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./app/App.tsx";
import ProjectsPage from "./app/pages/ProjectsPage.tsx";
import PublicationsPage from "./app/pages/PublicationsPage.tsx";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/publications" element={<PublicationsPage />} />
    </Routes>
  </BrowserRouter>,
);
