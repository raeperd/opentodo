# OpenTodo

OpenTodo is a keyboard-first todo application. This repository currently contains the minimal
application foundation shared with the Pidex stack:

- pnpm workspace on Node.js 24
- SvelteKit, Vite, Tailwind CSS, and a static web build
- Electron desktop shell using Effect
- Effect-based server and shared API package placeholders
- strict TypeScript, oxlint, oxfmt, and Vitest
- GitHub Actions verification for tests, formatting, linting, types, and builds

Database, authentication, API, and packaging dependencies will be added with the features that
need them.

## Development

```sh
pnpm install
pnpm dev
```

Open the web application at <http://localhost:5173>. To run the desktop shell against a production
web build:

```sh
pnpm start:desktop
```

## Verification

```sh
pnpm test
pnpm check
pnpm build
```
