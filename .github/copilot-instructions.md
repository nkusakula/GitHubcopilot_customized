# Copilot Instructions

Keep responses and edits concise, practical, and repository-specific.

## Project Snapshot
- Monorepo with npm workspaces: api and frontend.
- Backend: Express + TypeScript in [api/src](../api/src).
- Frontend: React + TypeScript + Vite in [frontend/src](../frontend/src).

## Fast Start Commands
- Install deps: npm install (repo root)
- Build all: npm run build
- Run all (dev): npm run dev
- Test all: npm run test
- Lint frontend: npm run lint

Use workspace-targeted commands when editing one area:
- API: npm run build --workspace=api, npm run test --workspace=api
- Frontend: npm run build --workspace=frontend

## Source of Truth Docs (Link, Don't Duplicate)
- Build/run/test details: [docs/build.md](../docs/build.md)
- Architecture and ERD: [docs/architecture.md](../docs/architecture.md)
- Deployment notes: [docs/deployment.md](../docs/deployment.md)

## Editing Rules
- Make minimal, focused changes; avoid unrelated refactors.
- Preserve existing naming, file structure, and route/component patterns.
- Update docs only when behavior/commands change; prefer short updates with links.

## API-Specific Expectations
- Keep route/model changes aligned with existing entity relationships from the ERD.
- For API route/model updates, keep Swagger/OpenAPI annotations in sync.
- Prefer adding or updating route tests in [api/src/routes](../api/src/routes).

## Frontend Expectations
- Follow existing React patterns and context usage in [frontend/src/context](../frontend/src/context).
- Keep UI changes responsive and consistent with current styling approach.

## Instruction Files To Respect
- Documentation rules: [.github/instructions/documentation.instructions.md](instructions/documentation.instructions.md)
- React/TS/CSS rules: [.github/instructions/reactjs.instructions.md](instructions/reactjs.instructions.md)
