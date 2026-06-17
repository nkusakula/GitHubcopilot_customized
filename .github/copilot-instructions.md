# Copilot Instructions (Token-Optimized)

This repo is a monorepo: `api/` (Express + TypeScript) and `frontend/` (React + Vite), managed with npm workspaces.

## Read First (link, do not duplicate)
- Project guide: [AGENTS.md](../AGENTS.md)
- Build/test/run: [docs/build.md](../docs/build.md)
- Architecture: [docs/architecture.md](../docs/architecture.md)
- Deployment: [docs/deployment.md](../docs/deployment.md)
- React standards: [instructions/reactjs.instructions.md](instructions/reactjs.instructions.md)

## Always Follow
- Use workspace-specific scripts from repo root (`--workspace=api` or `--workspace=frontend`) for package-scoped actions.
- Keep API and frontend endpoint mappings aligned when adding or renaming entities:
  - API routes: `api/src/index.ts`
  - Frontend endpoints: `frontend/src/api/config.ts`
- For API entity routes, follow the canonical pattern in `api/src/routes/branch.ts` and add matching tests (`*.test.ts`).
- Preserve Swagger JSDoc blocks in `api/src/models/*.ts` and `api/src/routes/*.ts`; missing blocks remove endpoints from `/api-docs`.
- Keep state model assumptions: API data is in-memory only.

## Quick Commands
- Install: `npm install`
- Dev all: `npm run dev`
- Build all: `npm run build`
- Test all: `npm run test`

## Agent Behavior
- Prefer smallest safe edits.
- Do not touch unrelated files.
- If documentation exists, link to it instead of copying content.
