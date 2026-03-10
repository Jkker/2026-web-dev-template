# Instructions

This is a modern web app built with React 19

## General Guidelines

- Conciseness: Be extremely concise. Sacrifice grammar for brevity if needed.
- File Structure: Routes in `src/routes/`, components in `src/components/`, utilities in `src/utils/`.
- Imports: Use import aliases defined in package.json (`@/components/*`, `@/utils/*`, etc.).

## MCP Tools

- Context7: Use for up-to-date documentation lookups. Query before implementing unfamiliar APIs.
  Library IDs (Use These Exact IDs)
  - `/tanstack/router`
  - `/tanstack/query`
  - `/tanstack/form`
  - `/websites/ui_shadcn`
  - `/arktypeio/arktype`
- Playwright: Use for browser automation, E2E testing, and visual testing.

## Development Standards

- DRY: No code duplication. Extract shared logic.

React 19 & React Compiler

- Rely on the React Compiler; manual memoization via `useMemo`, `useCallback`, or `React.memo` prohibited unless necessary.
- Components: Functional components only. No `React.FC`.
- Hooks: Use named imports (`import { useState } from 'react'`).
- Use `pnpx shadcn` to add new components from shadcn/ui.
- Never derive state in `useEffect`; compute directly during render.

Routing (TanStack Router)

- File-Based: Routes live in `src/routes/`.
- Definition: Use `createFileRoute`.
- Navigation: Use `<Link>` component and type-safe `useParams`.
- Loaders: Use route loaders for data preloading.

Data Fetching (TanStack Query)

- Server State: Use `useQuery` / `useMutation`.
- No useEffect: Do NOT fetch data in `useEffect`.

State Management (Zustand)

- Define stores with strict interfaces.
- Declare store mutations outside of the store. Call store.setState() if only used sparingly.

Styling (Tailwind CSS 4)

- Engine: Tailwind CSS 4 (CSS-first configuration).
- Usage: Utility classes in JSX.
- Conditional: Use `cn()` utility (clsx + tailwind-merge).
- Variants: Use `cva` (Class Variance Authority) for component variants.
- Icons: Lucide

Forms

- Library: Tanstack Form.
- Validation: Arktype

Testing (Vitest)

- Use `vitest-browser-react` and `vitest` browser locators for UI testing.
- Use `toMatchInlineSnapshot()` for snapshot testing.
- Write tests for all new features and bug fixes.
- Run tests before committing: `pnpm test`.
- E2E tests: Use Playwright for critical user flows.

TypeScript Guidelines

- Adopt DRY principles; avoid code duplication. Use type inference where possible.
- Enforce strict type safety; usage of `any`, `as unknown`, or `@ts-ignore` strictly prohibited.
- Types: Prefer `interface` for objects, `type` for unions/primitives.
- Immutability: Use `.toSorted()`, `.toSpliced()`, `.with()`.
- Nullish: Use `??`, `?.`.
- Async: Always `async`/`await`. Handle errors with `try/catch`.
- Generics: Use rigorous generics for reusable functions.
- Const Assertions: Use `as const` for literal arrays/objects.
- Utilize Arktype for runtime schemas, specifically for search params and API responses.

Workflow Commands

- Add Dep: `pnpm add <pkg> --save-catalog-name <catalog>`
- Run: `pnpm <script>`
- Lint: `pnpm lint` (Oxlint/ESLint)
- Test: `pnpm test`
- Build: `pnpm build`

pnpm Catalogs

- Keep dependency versions in `pnpm-workspace.yaml` named catalogs. Do not add raw semver ranges to `package.json`.
- Use `catalogMode: prefer` and save new deps into the right named catalog, for example `pnpm add zod --save-catalog-name runtime` or `pnpm add -D @storybook/test --save-catalog-name storybook`.
- Reuse existing catalogs before creating new ones. Prefer category catalogs like `react`, `tanstack`, `storybook`, `testing`, `styling`, `quality`, `typescript`, `ui`, `build`, `devtools`.

Documentation (TSDoc)

- Focus: Explain _why_ and _how_, not _what_.
- Tags: `@remarks`, `@example`, `@see`.
- No Redundancy: never restate types in comments.

Security

- Never commit secrets, API keys, or credentials to the repository.
- Use environment variables for sensitive data.
- Sanitize user input to prevent XSS attacks (use DOMPurify for HTML).
- Validate all user input with Arktype schemas.
- Set secure cookie flags: `httpOnly`, `secure`, `sameSite: 'strict'`.
- Keep dependencies updated and audit regularly.

## Tech Stack

| Category        | Technology          |
| --------------- | ------------------- |
| Framework       | React 19 + Vite 8   |
| Routing         | TanStack Router     |
| Data Fetching   | TanStack Query      |
| Client State    | Zustand             |
| Styling         | Tailwind CSS 4      |
| UI Library      | Shadcn UI           |
| Validation      | Arktype             |
| Testing         | Vitest + Playwright |
| Package Manager | pnpm                |

## Workflow

- Plan:
  1. Clarify user intent
  2. Look up docs with context7
  3. Go through relevant code
  4. Create detailed todos

- Implement:
  1. Write code adhering to standards
  2. Run `pnpm lint` and `CI=1 pnpm test`
  3. Verify changes with playwright MCP if applicable

- Review:
  1. Review code changes against todos
  2. Self-review code for standards compliance
  3. Address any issues found

- Report:
  1. Prepare artifact/demo if needed
  2. Summarize changes made
  3. Commit with clear message
  4. Push and create PR if requested
