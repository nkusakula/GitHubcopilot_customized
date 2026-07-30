---
applyTo: "docs/**/*.md,README.md,**/README.md"
---

# Documentation Instructions

## Scope and Location
- Source-of-truth docs live in `docs/`: `build.md`, `architecture.md`, `deployment.md`.
- Keep `README.md` as a high-level entry point; link to `docs/` for details rather than duplicating them.
- Do not add documentation inline in `copilot-instructions.md` — link to the relevant `docs/` file instead.

## Writing Style
- Be concise. Prefer short sentences and bullet points over paragraphs.
- Use code blocks for all commands, file paths, and config snippets.
- Use relative links when referencing other docs or source files.

## When to Update Docs
- Update docs when a command, port, environment variable, or architectural decision changes.
- Do not update docs for internal refactors that don't change observable behavior or developer workflow.
- After adding a new API entity, update `docs/architecture.md` (ERD section) if the entity relationships change.

## Mermaid Diagrams
- The ERD in `docs/architecture.md` uses a Mermaid `erDiagram` block. Keep it in sync with the actual entity relationships in `api/src/models/`.
- The component diagram uses `flowchart TD`. Update it only when the high-level architecture changes.

## Swagger / OpenAPI
- API endpoint docs live as JSDoc `@swagger` annotations in `api/src/routes/*.ts` and `api/src/models/*.ts`.
- Do not duplicate endpoint descriptions in `docs/`; instead link to the Swagger UI at `http://localhost:3000/api-docs`.
