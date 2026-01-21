# OctoCAT Supply - Copilot Instructions

## Project Overview
This is a **TypeScript monorepo** supply chain management system with two workspaces: `api/` (Express backend) and `frontend/` (React + Vite). The codebase was originally generated from an ERD diagram using AI assistance and serves as a GitHub Copilot demonstration project.

## Architecture

### Monorepo Structure
```
api/           → Express.js REST API (port 3000)
frontend/      → React 18 + Vite + Tailwind (port 5137)
docs/          → Architecture docs, design mockups
infra/         → Deployment scripts
```

### Data Flow
- Frontend uses `axios` + `react-query` for API calls
- API configuration in [frontend/src/api/config.ts](../frontend/src/api/config.ts) handles Codespace/local URLs automatically
- All API routes prefixed with `/api/` (e.g., `/api/products`, `/api/branches`)
- In-memory data store using seed data in [api/src/seedData.ts](../api/src/seedData.ts) - no database required

### Entity Model
`Headquarters → Branch → Order → OrderDetail ↔ Product`  
`Supplier → Delivery → OrderDetailDelivery ↔ OrderDetail`

## Development Commands

```bash
npm run dev              # Run both API and frontend concurrently
npm run dev:api          # API only (http://localhost:3000)
npm run dev:frontend     # Frontend only (http://localhost:5137)
npm run test:api         # Run API tests with Vitest
npm run test:coverage --workspace=api  # Coverage report
```

## Code Patterns

### API Routes
Each entity follows identical CRUD patterns in `api/src/routes/`. Reference [branch.ts](../api/src/routes/branch.ts):
- Export a `reset[Entity]()` function for test isolation
- Include Swagger JSDoc annotations for OpenAPI docs
- Use Express Router with standard REST endpoints
- Store data in module-level arrays (no database)

### API Tests
Follow [branch.test.ts](../api/src/routes/branch.test.ts) pattern:
```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import entityRouter, { resetEntity } from './entity';

beforeEach(() => {
    resetEntity(); // Reset in-memory data before each test
});
```

### Frontend Components
- React functional components with TypeScript
- Use `useQuery` from `react-query` for data fetching
- Theme support via `useTheme()` context - always check `darkMode` for styling
- Component path: `frontend/src/components/entity/[name]/`

### Models
Define interfaces in `api/src/models/` with Swagger schema annotations:
```typescript
/**
 * @swagger
 * components:
 *   schemas:
 *     EntityName:
 *       type: object
 *       properties:
 *         ...
 */
export interface EntityName { ... }
```

## Key Files Reference
| Purpose | File |
|---------|------|
| API entry point | [api/src/index.ts](../api/src/index.ts) |
| Seed data (all entities) | [api/src/seedData.ts](../api/src/seedData.ts) |
| API config/endpoints | [frontend/src/api/config.ts](../frontend/src/api/config.ts) |
| Test example | [api/src/routes/branch.test.ts](../api/src/routes/branch.test.ts) |
| React app entry | [frontend/src/App.tsx](../frontend/src/App.tsx) |

## CORS Configuration
API accepts requests from `localhost:5137`, `localhost:3001`, and `*.app.github.dev` (Codespaces). Modify `corsOrigins` in [api/src/index.ts](../api/src/index.ts) if needed.

## Swagger/OpenAPI
- Docs available at `http://localhost:3000/api-docs`
- JSON spec at `http://localhost:3000/api-docs.json`
- Annotations defined in route and model files
