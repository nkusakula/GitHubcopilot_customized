---
applyTo: "frontend/src/**/*.{ts,tsx}"
---

# React / TypeScript / CSS Instructions

## Component Conventions
- Use functional components with TypeScript. No class components.
- Default-export the main component from each file; named-export only helpers or hooks.
- Place entity views under `frontend/src/components/entity/{name}/` (e.g., `Products.tsx`).
- Shared/layout components go in `frontend/src/components/` (e.g., `Navigation.tsx`, `Footer.tsx`).

## TypeScript
- Define local interfaces for API response shapes at the top of the file (see `Products.tsx`).
- Avoid `any`; use explicit types or generics.
- Use optional chaining (`?.`) and nullish coalescing (`??`) to handle undefined/null safely.

## Data Fetching
- Use `react-query` v3 (`useQuery`, `useMutation`) with `axios` for all API calls.
- Import the `api` config object from `../../../api/config` for base URL and endpoint paths.
- After any mutation (POST/PUT/DELETE) call `queryClient.invalidateQueries('{entityKey}')` to keep the cache consistent.

```typescript
import axios from 'axios';
import { useQuery } from 'react-query';
import { api } from '../../../api/config';

const fetchItems = async () => {
  const { data } = await axios.get(`${api.baseURL}${api.endpoints.products}`);
  return data;
};
const { data, isLoading, error } = useQuery('products', fetchItems);
```

## Theming and Styling
- All styling uses Tailwind CSS utility classes.
- Dark/light mode is managed through `ThemeContext`. Import `useTheme` from `context/ThemeContext`:
  ```typescript
  import { useTheme } from '../../../context/ThemeContext';
  const { darkMode } = useTheme();
  ```
- Apply conditional dark mode classes inline: `${darkMode ? 'bg-dark text-light' : 'bg-gray-100 text-gray-800'}`.
- Add `transition-colors duration-300` to elements that change appearance on theme toggle.
- Do not introduce additional CSS files or CSS-in-JS libraries; keep all styles in Tailwind classes.

## Context Usage
- `ThemeContext` — provides `{ darkMode, toggleTheme }`. Use `useTheme()` hook.
- `AuthContext` — provides authentication state. Use `useContext(AuthContext)` or the exported hook.
- Do not bypass context by reading `localStorage` directly for theme or auth state in components.

## State Management
- Prefer `useState` and `useQuery`/`useMutation` for local and server state respectively.
- Use `useContext` for shared app-wide state (theme, auth); do not introduce Redux or Zustand.

## Error and Loading States
- Every `useQuery` call must handle `isLoading` and `error` before rendering data.
- Show a spinner (`animate-spin`) for loading and a styled error message for failures, consistent with `Products.tsx`.
