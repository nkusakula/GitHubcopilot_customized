# GitHub Copilot Instructions for OctoCAT Supply Chain

## Project Overview
A TypeScript monorepo supply chain management system with Express.js API backend and React frontend. Uses npm workspaces to manage `api/` and `frontend/` packages. The entire codebase was built with GitHub Copilot as a demonstration project for smart cat supply chain products.

> **Key docs**: [Architecture](../docs/architecture.md) · [Build & Run](../docs/build.md) · [Deployment](../docs/deployment.md) · [Demo Script](../docs/demo-script.md)

## Architecture

### Data Model (ERD)
```
Headquarters → Branch → Order → OrderDetail → Product
                                    ↓
                              OrderDetailDelivery ← Delivery ← Supplier
```

### Key Directories
- `api/src/models/` - TypeScript interfaces with Swagger JSDoc annotations
- `api/src/routes/` - Express route handlers (one per entity)
- `api/src/seedData.ts` - In-memory mock data (no database; data resets on restart)
- `api/src/index.ts` - Express app setup: CORS, Swagger, route registration
- `frontend/src/components/entity/` - Entity-specific React components
- `frontend/src/api/config.ts` - API base URL configuration with Codespace auto-detection
- `.github/prompts/` - Reusable prompt files for common tasks
- `.github/agents/` - Custom chat agents for specialized workflows

### Entities & Seed Data
Eight entities with in-memory seed data in `api/src/seedData.ts`:
`Suppliers` · `Products` (12 smart cat gadgets) · `Headquarters` · `Branches` · `Orders` · `OrderDetails` · `Deliveries` · `OrderDetailDeliveries`

## Development Commands

```bash
# Install all dependencies (from root)
npm install

# Run both API (port 3000) and frontend (port 5137) concurrently
npm run dev

# Run individually
npm run dev:api      # API only at http://localhost:3000
npm run dev:frontend # Frontend only at http://localhost:5137

# Build all workspaces
npm run build

# Run tests
npm run test               # All tests
npm run test:api           # API tests only (vitest)
npm run test:api -- --coverage  # With coverage report (output: api/coverage/)

# Frontend linting
npm run lint
```

## API Conventions

### Route Pattern
Each entity follows the same REST pattern in `api/src/routes/{entity}.ts`:
- `GET /api/{entities}` - List all
- `GET /api/{entities}/:id` - Get by ID
- `POST /api/{entities}` - Create new
- `PUT /api/{entities}/:id` - Update
- `DELETE /api/{entities}/:id` - Delete

Registered routes in `api/src/index.ts`:
`/api/products` · `/api/branches` · `/api/headquarters` · `/api/suppliers` · `/api/orders` · `/api/order-details` · `/api/deliveries` · `/api/order-detail-deliveries`

### Swagger Documentation
- Models use JSDoc `@swagger` annotations in `api/src/models/*.ts`
- Routes use JSDoc `@swagger` annotations for endpoint docs
- View at http://localhost:3000/api-docs when API is running
- Raw JSON at http://localhost:3000/api-docs.json

### Test Pattern (Vitest + Supertest)
Reference implementation: [api/src/routes/branch.test.ts](api/src/routes/branch.test.ts)

```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import router, { resetBranches } from './branch'; // export name is reset{Entity}

let app: express.Express;

beforeEach(() => {
  app = express();
  app.use(express.json());
  app.use('/branches', router);
  resetBranches(); // CRITICAL: restore seed data between tests
});
```

### Adding New Entities
1. Create model interface in `api/src/models/{entity}.ts` with Swagger schema
2. Add seed data array in `api/src/seedData.ts` (pluralized export, e.g. `export const widgets: Widget[]`)
3. Create route file in `api/src/routes/{entity}.ts` — import seed array, maintain local mutable copy, export `reset{Entity}()` that clones seed array
4. Register route in `api/src/index.ts`: `app.use('/api/{entities}', {entity}Routes)`
5. Add endpoint to `frontend/src/api/config.ts`: `{entities}: '/api/{entities}'`

### Naming Conventions
- Model interfaces: PascalCase (`OrderDetail`)
- Route URL segments: kebab-case (`/api/order-details`)
- File names: camelCase (`orderDetail.ts`)
- ID fields: `{entity}Id` pattern (`orderDetailId`)
- Seed exports: pluralized camelCase (`orderDetails`)
- Reset function: `reset{Entity}s()` (`resetOrderDetails()`)

## Frontend Conventions

### Component Structure
- `frontend/src/components/` - Shared components (Navigation, Footer, Login)
- `frontend/src/components/entity/{name}/` - Entity views (e.g., `product/Products.tsx`)
- `frontend/src/context/` - React contexts: `AuthContext`, `ThemeContext`
- `frontend/src/hooks/` - Custom hooks

### Data Fetching
Uses react-query v3 with axios. Reference: [frontend/src/components/entity/product/Products.tsx](frontend/src/components/entity/product/Products.tsx)

```typescript
import axios from 'axios';
import { useQuery } from 'react-query';
import { api } from '../../../api/config';

const fetchProducts = async () => {
  const { data } = await axios.get(`${api.baseURL}${api.endpoints.products}`);
  return data;
};
const { data, isLoading, error } = useQuery('products', fetchProducts);
```

> **Note**: Mutations don't automatically invalidate queries. Call `queryClient.invalidateQueries('{entity}')` after POST/PUT/DELETE.

### Styling
- Tailwind CSS with dark mode support via `ThemeContext`
- Use `useTheme()` hook to get `darkMode` boolean
- Apply `darkMode` conditional classes: `${darkMode ? 'bg-dark' : 'bg-gray-100'}`
- Product images stored in `frontend/public/images/`; referenced via `imgName` field in seed data

## CORS Configuration
API accepts requests from:
- `http://localhost:5137` (frontend dev server)
- `http://localhost:3001`
- `*.app.github.dev` (Codespaces)
- Custom origins via `API_CORS_ORIGINS` env var (comma-separated)

In Codespaces, `frontend/src/api/config.ts` auto-detects the environment via `window.RUNTIME_CONFIG.API_URL`. Set this env var if the frontend can't reach the API.

## Known Pitfalls
- **Data resets on restart**: In-memory store has no persistence — expected for demo
- **Tests must call `reset{Entity}()`** in `beforeEach` or state leaks between tests
- **Swagger docs are generated at startup**: Restart API to pick up annotation changes
- **`API_CORS_ORIGINS` must be set** when running in non-standard environments
- **react-query cache**: No automatic refetch after mutations; manually invalidate queries
- **Port conflicts**: Set `PORT` env var for API; Vite auto-increments frontend port

## Custom Prompts & Agents

| Prompt/Agent | How to invoke | Purpose |
|---|---|---|
| [Unit-Test-Coverage](.github/prompts/Unit-Test-Coverage.prompt.md) | `/Unit-Test-Coverage` | Generate vitest tests for routes following project patterns |
| [plan](.github/prompts/plan.prompt.md) | `/plan` | Plan code changes without implementing; produces implementation plan doc |
| [model](.github/prompts/model.prompt.md) | `/model` | Select best LLM for a given task; fetches live GitHub docs |
| [ImplementationIdeas](.github/agents/ImplementationIdeas.agent.md) | `@ImplementationIdeas` | Creative feature exploration; searches code and external repos |
