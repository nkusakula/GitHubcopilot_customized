---
description: "Use when writing or updating documentation: docs/ markdown files (architecture, build, deployment), JSDoc/TSDoc comments in TypeScript source files, or README sections. Covers structure, tone, and project-specific conventions."
applyTo: "docs/**/*.md, **/*.ts, **/*.tsx, README.md"
---

# Documentation Writing Standards

## General Principles
- Be brief and scannable — prefer headings, bullet points, and code blocks over prose
- Write for someone unfamiliar with the codebase; avoid assuming context
- Sentences should be short and active voice ("Run `npm install`" not "Dependencies should be installed by running...")
- Do not duplicate content — link to the canonical source instead

## docs/ Markdown Files

### Structure
- Start every doc with a single `# H1` title and a one-sentence description of the document's purpose
- Use `##` sections for major topics; `###` for sub-topics — never skip levels
- Place prerequisites, environment setup, and caveats **before** any commands or code
- End procedural guides with a "Troubleshooting" or "Common Issues" section where applicable

### Code Blocks
- Always specify the language for fenced code blocks (` ```bash `, ` ```typescript `, etc.)
- Show the full command including the working directory context where it matters
- Prefer real commands from the project over placeholder examples:
  ```bash
  # Good — uses actual project commands
  npm run dev:api

  # Avoid — vague placeholders
  npm run <your-command>
  ```

### Diagrams
- Use Mermaid for architecture and flow diagrams (already used in `docs/architecture.md`)
- Keep diagrams focused — one diagram per concept; do not combine ERD + flow in one chart
- Always add a prose summary below a diagram explaining what it shows

### Linking
- Link to related docs using relative paths: `[Architecture](./architecture.md)`
- Link to relevant source files where documentation references them: `[seedData.ts](../api/src/seedData.ts)`
- Reference the key docs in the copilot-instructions.md header when adding a new doc

## JSDoc / TSDoc in TypeScript

### When to Add Comments
- **Always**: exported interfaces, types, and functions in `api/src/models/` and `api/src/routes/`
- **Always**: non-obvious logic (e.g., seed data reset pattern, query invalidation workarounds)
- **Skip**: trivial getters, simple event handlers, and self-explanatory one-liners

### Format
Use TSDoc-compatible tags:

```typescript
/**
 * Returns a filtered list of products matching the search term.
 *
 * @param term - Case-insensitive substring to match against name and description
 * @returns Filtered product array, or empty array if no matches
 */
function filterProducts(products: Product[], term: string): Product[] { ... }
```

- One blank line between the summary and `@param`/`@returns` tags
- `@param` names must match actual parameter names exactly
- Include `@remarks` for non-obvious behavior (e.g., side effects, resets)

### Swagger / Route Comments
For `api/src/routes/*.ts`, Swagger JSDoc annotations are the documentation — keep them in sync with the TypeScript interface in `api/src/models/*.ts`. See existing routes (e.g., `branch.ts`) for the canonical annotation style.

## Project-Specific Conventions
- This is a **demo project** — acknowledge demo/simplification trade-offs explicitly in docs rather than omitting caveats (e.g., "In-memory only; data resets on restart")
- Reference the ERD in `docs/architecture.md` when documenting entity relationships
- Use "OctoCAT Supply Chain" (not "OctoCat" or "Octocat") as the product name in all docs
