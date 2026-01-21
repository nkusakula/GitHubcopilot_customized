# GitHub Copilot Instructions for OctoCAT Supply Chain

## Project Overview
A TypeScript monorepo supply chain management system with Express.js API backend and React frontend. Uses npm workspaces to manage `api/` and `frontend/` packages.

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
- `api/src/seedData.ts` - In-memory mock data (no database)
- `frontend/src/components/entity/` - Entity-specific React components
- `frontend/src/api/config.ts` - API base URL configuration with Codespace support

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
npm run test         # All tests
npm run test:api     # API tests only (vitest)
```

## API Conventions

### Route Pattern
Each entity follows the same REST pattern in `api/src/routes/{entity}.ts`:
- `GET /api/{entities}` - List all
- `GET /api/{entities}/:id` - Get by ID
- `POST /api/{entities}` - Create new
- `PUT /api/{entities}/:id` - Update
- `DELETE /api/{entities}/:id` - Delete

### Swagger Documentation
- Models use JSDoc `@swagger` annotations in `api/src/models/*.ts`
- Routes use JSDoc `@swagger` annotations for endpoint docs
- View at http://localhost:3000/api-docs when API is running

### Test Pattern (Vitest + Supertest)
See [api/src/routes/branch.test.ts](api/src/routes/branch.test.ts) for the standard pattern:
```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import router, { resetEntities } from './{entity}';

// Call resetEntities() in beforeEach to restore seed data
```

### Adding New Entities
1. Create model interface in `api/src/models/{entity}.ts` with Swagger schema
2. Add seed data array in `api/src/seedData.ts`
3. Create route file in `api/src/routes/{entity}.ts` with CRUD + `resetEntities()` export
4. Register route in `api/src/index.ts`
5. Add endpoint to `frontend/src/api/config.ts`

## Frontend Conventions

### Component Structure
- `frontend/src/components/` - Shared components (Navigation, Footer)
- `frontend/src/components/entity/{name}/` - Entity views (e.g., `product/Products.tsx`)
- `frontend/src/context/` - React contexts (Auth, Theme)

### Data Fetching
Uses `react-query` with axios. Pattern from [Products.tsx](frontend/src/components/entity/product/Products.tsx):
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

### Styling
- Tailwind CSS with dark mode support via `ThemeContext`
- Apply `darkMode` conditional classes: `${darkMode ? 'bg-dark' : 'bg-gray-100'}`

## CORS Configuration
API accepts requests from:
- `http://localhost:5137` (frontend dev server)
- `http://localhost:3001`
- `*.app.github.dev` (Codespaces)
- Custom origins via `API_CORS_ORIGINS` env var

## Custom Prompts & Agents
- `.github/prompts/` - Reusable prompt files for common tasks
- `.github/agents/` - Custom chat agents for specialized workflows
- Use `/Unit-Test-Coverage` prompt to generate tests following project patterns
