# Copilot Instructions

## Project
OctoCAT Supply Chain Management — TypeScript monorepo (npm workspaces): `api/` (Express) + `frontend/` (React + Vite).

## Commands
```bash
npm run dev            # start both api (port 3000) + frontend (port 5137)
npm run dev:api        # api only
npm run dev:frontend   # frontend only
npm run build          # build all workspaces
npm test               # run all tests (Vitest)
npm run test:api        # api tests only
npm run test:frontend  # frontend tests only
npm run lint           # ESLint (frontend)
```

## Architecture
- **API** (`api/src/`): Express routes in `routes/<entity>.ts`, TypeScript models in `models/<entity>.ts`. Swagger JSDoc on every route. Entry: `index.ts`.
- **Frontend** (`frontend/src/`): React 18 + React Router v7. Auth/Theme via Context (`context/`). Server state via React Query. HTTP calls via Axios (`api/config.ts`). Components in `components/`.

## Conventions
- Strict TypeScript (`"strict": true`) in both workspaces; frontend also enforces `noUnusedLocals` / `noUnusedParameters`.
- Route/model files: `kebab-case.ts`. Component files: `PascalCase.tsx`. Tests: `*.test.ts`.
- New API routes need Swagger JSDoc annotations — see existing routes as reference.
- CORS origins are hardcoded in `api/src/index.ts`; add new origins there if needed.

## Docs
- Architecture & design: <a>`docs/`</a>
- Existing instructions: <a>reactjs</a> · <a>documentation</a>
