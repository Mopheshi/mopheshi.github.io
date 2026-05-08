# AI Agent Guidelines for @figma/my-make-file Portfolio

Welcome! This document outlines key conventions and architectural details to help AI agents be immediately productive in this codebase.

## 🏗 Framework & Architecture
- **Tech Stack**: React 18, Vite, TypeScript, Tailwind CSS v4, Radix UI (shadcn/ui), and `lucide-react` for icons.
- **Routing**: This is primarily a single-page application (`src/app/App.tsx`). However, `react-router` is included in the project for potential expanded routing.
- **Entry Point**: `src/main.tsx` renders `<App />`, applying base CSS from `src/styles/index.css`.

## 📁 Project Structure & Aliasing
- **Path Aliases**:
  - `@/` maps to `src/` (configured in `vite.config.ts`). Prefer this alias over relative paths for cross-directory imports.
  - `figma:asset/*` resolves to `src/assets/*` using a custom Vite plugin (`figmaAssetResolver`).
- **Component Organization**:
  - Domain-specific components are under `src/app/components/portfolio/`.
  - Reusable UI primitives (shadcn wrappers) are in `src/app/components/ui/`.
- **Styles**: Global variables and typography exist in `src/styles/` (`theme.css`, `globals.css`, `fonts.css`).

## 💅 Styling Conventions
- **Tailwind v4**: The project uses the latest TailwindCSS setup (`@tailwindcss/vite`).
- **Styling UI Components**: Most generic UI components use `class-variance-authority` and `tailwind-merge` (`clsx(twMerge(...))`) to handle overriding class names cleanly (standard `shadcn/ui` pattern).
- **Language**: Always write in UK-English, strictly!
- **Design Tokens**: Standard visual style involves CSS variables like `var(--p-cream)`, typically injected in inline styles or Tailwind utilities.

## ⚠️ Key Developer Workflows
- **Development Server**: `npm run dev` starts the Vite environment.
- **Build**: `npm run build` bundles the app.
- **Dependency Management**: Uses `npm` (note: `npm-workspace.yaml` exists, implying potential monorepo capabilities). Always use `npm` for installing and running scripts.

## 🔄 Patterns
- **SEO & Head Management**: Handled gracefully via `useSeo` hook (`src/app/components/portfolio/useSeo.ts`).
- **Animations**: Prefer `motion` (Framer Motion v12) for layout and interaction transitions.
- **View Handling**: For scroll-based interactions and animations, reference local solutions like `useInView` (`src/app/components/portfolio/useInView.ts`).

## 📦 External Integrations
- Rely exclusively on established primitives when expanding the UI (shadcn components found in `src/app/components/ui/`), instead of writing custom raw HTML/CSS wrappers.

