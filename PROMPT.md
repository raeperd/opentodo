# OpenTodo — Ralph Loop Prompt

You are building **OpenTodo**, an open-source, keyboard-driven todo application with Linear-inspired UI.

## Project Context

- **PRD:** See GitHub issue #1 at raeperd/opentodo
- **Issue plans:** See `issues/01-*.md` through `issues/17-*.md` for detailed TDD plans per slice

## Tech Stack

- **Web app:** SvelteKit + Tailwind CSS + shadcn-svelte (dark theme)
- **Database:** Turso (libsql) + Drizzle ORM
- **Auth:** better-auth (Google OAuth only) in shared `lib/auth/`
- **Monorepo:** pnpm workspaces
- **Deployment:** Vercel (`@sveltejs/adapter-vercel`)
- **Testing:** Vitest, Svelte testing library, real libsql (no mocks)

## Monorepo Structure

```
opentodo/
  apps/
    web/           → SvelteKit app (UI + API routes + auth wiring)
  lib/
    auth/          → Shared better-auth instance (@opentodo/auth)
    db/            → Drizzle schema + migrations (@opentodo/db)
    types/         → Shared TypeScript types (@opentodo/types)
  issues/          → TDD plans per vertical slice (reference only, do not modify)
  PROMPT.md        → This file (do not modify)
```

## Development Methodology

**TDD — Red-Green-Refactor, one test at a time.**

1. Read the current issue plan in `issues/`
2. Write ONE failing test (RED)
3. Write minimal code to pass (GREEN)
4. Refactor if needed
5. Commit with descriptive message
6. Move to the next test in the plan
7. When all tests in the current issue pass, move to the next issue

**Rules:**
- Never write all tests first. One test → one implementation → repeat.
- Tests verify behavior through public interfaces, not implementation details.
- Integration tests use real libsql, real HTTP requests. No mocks.
- Unit tests only for pure logic (dates module, commands module).
- Component tests use Svelte testing library.
- Commit after each GREEN. Atomic commits.
- Verify `pnpm build` and `pnpm test` pass before moving to the next issue.

## Phase Plan

Work through issues in dependency order. Each issue file has the full TDD plan with RED→GREEN cycles.

### Phase 1: Foundation (issues 01-03)
1. `issues/01-monorepo-scaffolding.md` — Scaffold monorepo, SvelteKit, Tailwind, shadcn-svelte
2. `issues/02-database-schema.md` — Drizzle schema, Turso, integration tests
3. `issues/03-google-oauth-auth.md` — better-auth, Google OAuth, route protection

### Phase 2: Core CRUD (issues 04-08)
4. `issues/04-task-crud.md` — Create/read/update/delete tasks, optimistic UI
5. `issues/05-task-completion.md` — Toggle todo/done, visual distinction
6. `issues/06-task-description.md` — Markdown description, detail panel
7. `issues/07-due-dates-nlp.md` — chrono-node NLP parsing, date display
8. `issues/08-task-priority.md` — Priority levels, sorting

### Phase 3: Organization (issues 09-12)
9. `issues/09-projects.md` — Project CRUD, task assignment, filtering
10. `issues/10-tags.md` — Tag CRUD, many-to-many, autocomplete
11. `issues/11-task-views.md` — Inbox, Today, Upcoming filters
12. `issues/12-sidebar-navigation.md` — Sidebar with views, projects, tags

### Phase 4: Power User (issues 13-15)
13. `issues/13-keyboard-shortcuts.md` — j/k/x/e/n shortcuts, focus management
14. `issues/14-command-palette.md` — Cmd+K, fuzzy search, action registry
15. `issues/15-drag-reorder.md` — Drag-and-drop task reordering

### Phase 5: Polish (issues 16-17)
16. `issues/16-dark-theme-polish.md` — Linear-inspired dark theme, visual consistency
17. `issues/17-pwa-setup.md` — Service worker, manifest, offline shell

## Current State Assessment

Before starting work each iteration:

1. Check `git log --oneline -20` to see what's been done
2. Check `pnpm test` to see current test status
3. Check `pnpm build` to see if it compiles
4. Read the issue file for the current phase to find the next RED→GREEN cycle
5. If the current issue is fully complete (all acceptance criteria met), move to the next issue

## Completion Criteria

Each issue is complete when:
- All acceptance criteria checkboxes could be checked
- All tests pass (`pnpm test`)
- Build succeeds (`pnpm build`)
- Code is committed with atomic commits

The entire project is complete when all 17 issues are implemented and:
- `pnpm test` passes with all tests green
- `pnpm build` succeeds
- The app runs (`pnpm dev`) with full functionality
- Dark theme, keyboard shortcuts, command palette, PWA all working

When the project is fully complete, output:
<promise>OPENTODO MVP COMPLETE</promise>

## Environment

Real credentials are in `.env` (git-ignored). The file contains:

```
TURSO_DATABASE_URL    — Turso libsql connection URL
TURSO_AUTH_TOKEN      — Turso auth token
GOOGLE_CLIENT_ID      — Google OAuth client ID
GOOGLE_CLIENT_SECRET  — Google OAuth client secret
BETTER_AUTH_SECRET    — Generate on first run: openssl rand -base64 32
```

- `.env.example` documents required variables (committed to git)
- `.env` has real values (never committed)
- Generate `BETTER_AUTH_SECRET` during issue 01 scaffolding and append to `.env`
- For tests, use a separate local libsql instance (file-based, e.g., `file:./test.db`) — do NOT run tests against the production Turso URL
- Google OAuth redirect URI is configured as `http://localhost:5173/api/auth/callback/google`

## Important Constraints

- **No mocks in tests.** Use real libsql (local file DB for tests, Turso for dev/prod). Real HTTP for API tests.
- **Dark theme only.** No light mode toggle.
- **Google OAuth only.** No email/password auth.
- **Optimistic updates.** UI must feel instant — mutate local state first, sync to server.
- **Keyboard-first.** Every action reachable via keyboard.
- **Dense UI.** Linear-inspired — tight padding, minimal chrome.
- **Inline over helpers.** Prefer simple inline code over premature abstractions.
- **Top-down declaration.** Caller before callee.
- **Consult official docs** for SvelteKit, shadcn-svelte, better-auth, Drizzle, and chrono-node before writing code. Your training data may be outdated.
