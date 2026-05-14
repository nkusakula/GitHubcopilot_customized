# GitHub Copilot Instructions for OctoCAT Supply Chain

Use this file as a quick-start map for coding agents. Keep changes aligned with existing patterns and link to canonical docs instead of duplicating them.

## Quick Links
- Architecture and ERD: [docs/architecture.md](../docs/architecture.md)
- Build, run, and test commands: [docs/build.md](../docs/build.md)
- Deployment notes: [docs/deployment.md](../docs/deployment.md)
- Demo workflow: [docs/demo-script.md](../docs/demo-script.md)

## Project Shape
- Monorepo with npm workspaces: `api/` and `frontend/`
- Backend: Express + TypeScript + Swagger annotations in models and routes
- Frontend: React + TypeScript + Vite + Tailwind + react-query v3

Key paths:
- API app setup and route registration: `api/src/index.ts`
- In-memory data store: `api/src/seedData.ts`
- Entity routes: `api/src/routes/`
- Frontend API endpoints and base URL logic: `frontend/src/api/config.ts`

## Agent Working Rules
- Prefer existing patterns over introducing new architecture.
- For new entity work, update all required layers: model, seed data, route, route registration, and frontend endpoint config.
- Keep route URLs in kebab-case under `/api/...`.
- Keep model/interface names in PascalCase and file names in camelCase.

## API and Test Conventions
- Each route follows CRUD behavior with list/get/create/update/delete handlers.
- Route and model files should include Swagger JSDoc annotations.
- Route tests should follow the pattern in `api/src/routes/branch.test.ts`.
- Always call the route reset function in `beforeEach` to prevent state leakage across tests.

## Frontend Conventions
- Reuse shared UI and context patterns in `frontend/src/components/` and `frontend/src/context/`.
- Data fetching uses axios + react-query v3.
- After mutations, manually invalidate query keys because automatic invalidation is not configured.
- Dark mode classes should follow the existing `useTheme()` and conditional class patterns.

## Known Pitfalls
- Data is in-memory only and resets when API restarts.
- Swagger output is generated at startup; restart API after annotation changes.
- Codespaces/local URL behavior depends on runtime config in `frontend/src/api/config.ts`.
- CORS origins can require `API_CORS_ORIGINS` in non-standard environments.

## Existing Customizations
- Prompt files: `.github/prompts/`
- Custom agents: `.github/agents/`
- File-scoped instructions: `.github/instructions/`
