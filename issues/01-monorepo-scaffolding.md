## Parent PRD

#1

## What to build

Scaffold the pnpm monorepo with `apps/web` (SvelteKit + Tailwind + shadcn-svelte), `lib/db`, `lib/auth`, and `lib/types`. Configure TypeScript, ESLint, Prettier, and dev scripts.

## TDD Plan

This is an infrastructure slice — no behavioral tests. Validation is "it builds and runs."

### Tracer bullet: SvelteKit app boots

1. Create `pnpm-workspace.yaml` with `apps/*` and `lib/*`
2. Scaffold `apps/web` with `npx sv create` (SvelteKit, TypeScript)
3. Verify: `pnpm dev` starts, browser shows default page

### Slice 2: Tailwind + shadcn-svelte

1. Install Tailwind CSS in `apps/web`
2. Initialize shadcn-svelte with dark theme
3. Verify: a shadcn Button component renders with dark styling

### Slice 3: Shared packages resolve

1. Create `lib/db`, `lib/auth`, `lib/types` as packages with `package.json` and `tsconfig.json`
2. Add workspace references in `apps/web`
3. Verify: `import { something } from '@opentodo/types'` compiles in `apps/web`

### Slice 4: Lint + format + build

1. Configure ESLint + Prettier across workspace
2. Configure `@sveltejs/adapter-vercel`
3. Verify: `pnpm lint`, `pnpm format:check`, `pnpm build` all pass from root

## Acceptance criteria

- [ ] pnpm workspace with `apps/web`, `lib/db`, `lib/auth`, `lib/types`
- [ ] SvelteKit app runs with `pnpm dev` from root
- [ ] Tailwind CSS + shadcn-svelte configured with dark theme
- [ ] TypeScript paths resolve across packages (`@opentodo/db`, `@opentodo/auth`, `@opentodo/types`)
- [ ] ESLint + Prettier configured
- [ ] `@sveltejs/adapter-vercel` configured
- [ ] `pnpm build` succeeds from root

## Blocked by

None - can start immediately

## User stories addressed

None — infrastructure slice
