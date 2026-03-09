# CLAUDE.md — AI Assistant Guide for UTen 智能营销SaaS

## Project Overview

**UTen 智能营销SaaS** is an AI-powered marketing operations platform built with React + TypeScript. It integrates Google Gemini API to provide intelligent content creation, analytics reporting, asset management, and conversational AI capabilities for marketing teams.

- **AI Studio App**: https://ai.studio/apps/514f7ed4-bf34-405c-8ab0-86a45443552a
- **Primary Language**: TypeScript / React (no backend, purely frontend)
- **AI Provider**: Google Gemini (via `@google/genai`)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19, TypeScript ~5.8 |
| Build Tool | Vite 6.2 |
| Routing | React Router DOM 7.13 |
| Styling | Tailwind CSS 4.1 (utility-first) |
| Icons | Lucide React 0.546 |
| Animations | Motion 12 |
| AI | @google/genai 1.29 (Gemini API) |
| Markdown | React Markdown 10 |
| Data Export | jsPDF 4.2, html2canvas 1.4, XLSX 0.18 |
| Optional Backend | Express 4.21, better-sqlite3 12 |

---

## Repository Structure

```
/
├── src/
│   ├── components/
│   │   ├── Header.tsx          # Top navigation bar
│   │   └── Sidebar.tsx         # Collapsible left-nav sidebar
│   ├── pages/
│   │   ├── AgentChat/
│   │   │   └── AgentChat.tsx   # AI chatbot with Gemini API
│   │   ├── AssetCenter/
│   │   │   ├── BrandKnowledgeBase.tsx
│   │   │   └── ChannelAuthorization.tsx
│   │   ├── Creative/
│   │   │   ├── XiaohongshuWriter.tsx  # Social media content generator
│   │   │   └── components/
│   │   │       └── PublicOpinionResponse.tsx
│   │   ├── DataInsights/
│   │   │   ├── SmartDailyReport.tsx   # Main analytics dashboard
│   │   │   ├── EventMonitoring.tsx
│   │   │   ├── GlobalDashboard.tsx
│   │   │   ├── CompetitorComparison.tsx
│   │   │   └── ContentInfluencers.tsx
│   │   └── SmartCreation/
│   │       ├── AgentBuilder.tsx
│   │       ├── VisualGeneration.tsx
│   │       ├── VideoGeneration.tsx
│   │       └── Copywriting.tsx
│   ├── App.tsx                 # Root router + layout + navigation
│   ├── main.tsx                # React StrictMode entry point
│   ├── store.ts                # Global state (observer pattern)
│   └── index.css               # Tailwind + custom theme variables
├── index.html                  # HTML shell, loads /src/main.tsx
├── vite.config.ts              # Vite config with path aliases
├── tsconfig.json               # TypeScript config (strict, ES2022)
├── package.json
├── .env.example                # Environment variable template
└── metadata.json               # App metadata for AI Studio
```

---

## Development Commands

```bash
npm install          # Install dependencies
npm run dev          # Dev server at http://localhost:3000 (host: 0.0.0.0)
npm run build        # Production build → dist/
npm run preview      # Serve production build locally
npm run clean        # Remove dist/
npm run lint         # TypeScript type-check (tsc --noEmit)
```

**No test runner is configured.** Validation is done via `npm run lint` (TypeScript type checking).

---

## Environment Variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `GEMINI_API_KEY` | **Yes** | Authenticates requests to Google Gemini API |
| `APP_URL` | No | Deployed Cloud Run service URL |
| `DISABLE_HMR` | No | Set to `true` in AI Studio to disable HMR |

**Local setup:** Create `.env.local` (git-ignored) in the project root and add your keys:
```
GEMINI_API_KEY=your_key_here
```

Vite exposes these via `import.meta.env.VITE_*` — but note the app accesses `process.env.GEMINI_API_KEY` via Vite's `define` config in `vite.config.ts`.

**AI Studio:** The API key is injected at runtime via `window.aistudio.hasSelectedApiKey()` and `window.aistudio.getApiKey()`. The app checks this on startup in `App.tsx`.

---

## Code Conventions

### Naming
- **Components**: PascalCase files and exports (`AgentChat.tsx`, `SmartDailyReport.tsx`)
- **Interfaces/Types**: PascalCase (`Project`, `AnalysisResult`, `ChatMessage`)
- **State and props**: camelCase
- **Event handlers**: `handle*` prefix (e.g., `handleSend`, `handleFileUpload`)

### Component Patterns
- **Functional components only** — no class components
- **Hooks**: `useState`, `useEffect`, `useRef`, `useCallback`, `useContext`
- **Global state**: `store.ts` uses an observer pattern (`globalStore`) — prefer this over prop drilling for cross-module state
- **Local state**: prefer `useState` for component-scoped UI state

### Styling
- **Tailwind utility-first** — no separate CSS modules
- **Color palette** (defined in `index.css`):
  - Primary text: `#242424`
  - Secondary text: `#6B6B6B`
  - Borders: `#E8E8E8`
  - Accent/interactive: varies per module
- **Typography**: Inter (sans), JetBrains Mono (mono), Noto Serif SC (Chinese)
- **Custom animations**: `breathe`, `sweep`, `wave` keyframes defined in `index.css`
- **Skeleton loaders**: use the `wave` animation class for loading states

### File Organization
- Each page module lives in its own subfolder under `src/pages/`
- Subcomponents specific to a page go in a `components/` subfolder within that page folder
- Shared/global components live in `src/components/`

---

## AI Integration Details

### Gemini API Usage
The app uses `@google/genai` with models:
- `gemini-3.1-pro-preview` — complex reasoning, multi-turn chat
- `gemini-3-flash-preview` — faster generation for content tasks

**Pattern for API calls:**
```typescript
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const response = await ai.models.generateContent({
  model: "gemini-3.1-pro-preview",
  contents: [{ role: "user", parts: [{ text: prompt }] }],
});
```

**Error handling convention:** Retry with exponential backoff (initial: 2000ms, max 3 retries) for transient API errors. Always surface error state to the UI rather than silently failing.

### Prompt Engineering
- Prompts are written inline in TypeScript string templates
- Chinese-language prompts are used throughout (this is a Chinese-market product)
- JSON-structured output is requested where the response needs to be parsed programmatically — always include fallback parsing with try/catch

---

## Navigation & Routing

`App.tsx` manages the top-level routing. The sidebar defines the module hierarchy:

| Module | Chinese Label | Key Pages |
|--------|--------------|-----------|
| Agent | Agent | AgentChat |
| 数据分析 | Data Analytics | SmartDailyReport, EventMonitoring, GlobalDashboard, CompetitorComparison, ContentInfluencers |
| 智能创作 | Smart Creation | AgentBuilder, XiaohongshuWriter, VisualGeneration, VideoGeneration, Copywriting, PublicOpinionResponse |
| 资产记忆 | Asset Center | BrandKnowledgeBase, ChannelAuthorization |

Cross-module navigation is handled via state callbacks passed from `App.tsx` down to page components. Use the existing callback pattern rather than React Router `navigate` for cross-module transitions.

---

## Key Patterns to Follow

### Adding a New Page
1. Create a folder under `src/pages/<ModuleName>/`
2. Create `<PageName>.tsx` as a default-exported React component
3. Add the route mapping in `App.tsx`
4. Add the sidebar entry in `Sidebar.tsx`

### Adding a Subcomponent
- If the subcomponent is only used by one page: put it in `src/pages/<ModuleName>/components/`
- If shared across pages: put it in `src/components/`

### State Management
- Page-local UI state: `useState` in the component
- Cross-page or persistent state: use `store.ts` (`globalStore` observer pattern)
- Do **not** introduce Redux, Zustand, or other state libraries without discussion

### Data Export
- **PDF**: use `jsPDF` + `html2canvas` (see `SmartDailyReport.tsx` for reference)
- **Excel**: use `XLSX` (see `PublicOpinionResponse.tsx` for file reading, `SmartDailyReport.tsx` for generation)

---

## What to Avoid

- Do **not** add a backend server unless explicitly asked — this is a frontend-only app
- Do **not** use class components
- Do **not** add CSS Modules or styled-components — use Tailwind only
- Do **not** hardcode API keys in source files
- Do **not** skip TypeScript types — run `npm run lint` before committing
- Do **not** use `any` type unless absolutely unavoidable; prefer proper interfaces
- Do **not** introduce new state management libraries

---

## Deployment

The app is designed to deploy on **Google Cloud Run** via AI Studio:
- Build output: `dist/` (standard Vite SPA build)
- The `APP_URL` env var is auto-set to the Cloud Run service URL at deploy time
- No server-side rendering — purely static SPA served as a container

---

## Git Workflow

- Feature branches follow the pattern: `claude/<description>-<session-id>`
- Commit messages use conventional commits style: `feat:`, `fix:`, `refactor:`, `chore:`
- No pre-commit hooks are configured
- Always run `npm run lint` before committing to catch type errors
