## Parent PRD

#1

## What to build

Configure better-auth in `lib/auth` with Google OAuth and Drizzle/Turso adapter. Wire into SvelteKit. Sign-in/sign-out UI. Route protection.

## TDD Plan

Auth tests are integration tests — real better-auth instance, real libsql, real HTTP requests via SvelteKit test server.

### Tracer bullet: auth instance creates a session

```
RED:   test("auth.api.signInEmail creates a session in the database")
       → Note: we use better-auth's test utilities to simulate OAuth
       → call auth test helper → verify session exists in DB
GREEN: Configure better-auth in lib/auth with Drizzle adapter, export auth instance
```

### Slice 2: SvelteKit auth routes respond

```
RED:   test("GET /api/auth/session returns 401 when not authenticated")
       → fetch /api/auth/session without cookie → expect 401 or null session
GREEN: Mount auth.handler in apps/web/src/routes/api/auth/[...all]/+server.ts
```

### Slice 3: hooks.server.ts attaches session

```
RED:   test("authenticated request has session in locals")
       → create a protected +server.ts route that returns locals.session
       → call without auth → returns null
       → call with valid session cookie → returns session data
GREEN: Implement hooks.server.ts that calls auth.api.getSession and attaches to locals
```

### Slice 4: route protection

```
RED:   test("protected page redirects to /login when unauthenticated")
       → fetch a protected page without cookie → expect redirect to /login
GREEN: Add auth guard in layout server load or hooks

RED:   test("/login page renders sign-in button")
       → fetch /login → response contains "Sign in with Google" button
GREEN: Create /login page with sign-in UI
```

### Slice 5: sign out

```
RED:   test("POST /api/auth/sign-out clears session")
       → authenticate → POST sign-out → GET /api/auth/session returns null
GREEN: Wire sign-out through better-auth handler (already mounted)
```

## Acceptance criteria

- [ ] `lib/auth` exports configured better-auth instance
- [ ] Auth handler mounted at `/api/auth/[...all]`
- [ ] `hooks.server.ts` attaches session to locals
- [ ] Protected routes redirect unauthenticated users to /login
- [ ] Sign-in page with Google OAuth button
- [ ] Sign-out clears session
- [ ] All TDD slices pass

## Blocked by

- Blocked by #2 (database schema — auth needs users table)

## User stories addressed

- User story 1 (sign in with Google OAuth)
- User story 2 (sign out)
