---
applyTo: "**/*.md,api/src/**/*.ts,README.md"
---

# Documentation Writing Guidelines

## Markdown Documents (`*.md`)

### Structure
- Every document starts with a single H1 (`#`) title that clearly names the document.
- Use H2 (`##`) for major sections and H3 (`###`) for subsections. Do not create H4+ levels.
- Place a short, plain-English introduction paragraph directly under the H1 — before any section headings — to state the document's purpose.
- When a doc has four or more sections, add a link list at the top after the intro (e.g., `## Prerequisites · ## Installation · ...`).

### Code Blocks
- Always tag fenced code blocks with a language (` ```typescript`, ` ```bash`, ` ```json`, ` ```mermaid`).
- Use `bash` consistently for CLI commands — not `sh`, `shell`, or `console`.
- Group related commands in a single block with inline comments (`#`) explaining each group.
- Prefer multi-line code blocks over inline backticks for anything longer than one expression.

### Diagrams
- Use Mermaid (` ```mermaid`) for architecture, data flow, and entity relationship diagrams.
- Use `flowchart TD` for component/flow diagrams; use `erDiagram` for data models.
- Add a short sentence above each diagram describing what it shows.

### Links & References
- Link to related docs using relative paths: `[Architecture](../docs/architecture.md)`.
- Never use absolute URLs for files within this repository.
- When referencing source files, link to the file path relative to the workspace root.

### Tone & Style
- Use second person ("you" / imperative) for how-to guides and runbooks ("Run `npm install`").
- Use third person for reference and architecture docs.
- Write in plain English. Define acronyms on first use.
- Avoid filler phrases like "simply", "just", "easy", or "straightforward".

---

## API Code Documentation (TypeScript — `api/src/`)

### Swagger / OpenAPI Annotations
- Every model interface in `api/src/models/` must have a `@swagger` JSDoc block that defines the full OpenAPI schema component, including all properties and their types.
- Every route handler in `api/src/routes/` must have a `@swagger` JSDoc block for each HTTP method, documenting: summary, parameters (path and query), request body schema, and all meaningful response codes (200, 201, 400, 404).
- Use `$ref` to reference shared schema components rather than repeating inline definitions.

### JSDoc Comments
- Add JSDoc (`/** */`) to exported functions and interfaces only when the purpose or usage is not immediately clear from the name and types alone.
- Use `@param` and `@returns` tags for non-trivial utility functions.
- Do not add JSDoc to route handler callbacks (`(req, res) => ...`) — that documentation lives in the `@swagger` block.

### Inline Comments
- Do not comment on *what* code does — only on *why* a non-obvious decision was made.
- Delete commented-out code before committing; use version control history instead.
