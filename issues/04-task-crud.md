## Parent PRD

#1

## What to build

End-to-end task CRUD. Server API routes with Zod validation, Svelte stores with optimistic updates, basic task list UI with inline editing.

## TDD Plan

API tests are integration tests via HTTP. Component tests use Svelte testing library. Each cycle goes RED→GREEN on one behavior.

### Tracer bullet: create a task via API and see it in the list

```
RED:   test("POST /api/tasks creates a task and GET /api/tasks returns it")
       → POST { title: "Buy milk" } with auth → 201
       → GET /api/tasks → response includes "Buy milk"
GREEN: Create +server.ts routes, wire to lib/db createTask/getTasksByUserId

RED:   test("task list renders tasks from the API")
       → component test: mount task list with mock data → renders "Buy milk" row
GREEN: Create TaskList.svelte and TaskRow.svelte components, fetch from API in +page.ts
```

### Slice 2: validation and auth enforcement

```
RED:   test("POST /api/tasks without title returns 400")
       → POST {} → expect 400 with validation error
GREEN: Add Zod schema validation ({ title: z.string().min(1) })

RED:   test("POST /api/tasks without auth returns 401")
       → POST without session cookie → expect 401
GREEN: Add auth check in route handler

RED:   test("GET /api/tasks returns only the authenticated user's tasks")
       → create tasks for user A and user B → GET as user A → only A's tasks
GREEN: Filter by session userId in query
```

### Slice 3: update task

```
RED:   test("PATCH /api/tasks/[id] updates the task title")
       → create task → PATCH { title: "Updated" } → GET returns "Updated"
GREEN: Create PATCH +server.ts, wire to updateTask

RED:   test("PATCH /api/tasks/[id] for another user's task returns 403")
       → create task as user A → PATCH as user B → 403
GREEN: Add ownership check
```

### Slice 4: delete task

```
RED:   test("DELETE /api/tasks/[id] removes the task")
       → create task → DELETE → GET returns empty
GREEN: Create DELETE +server.ts, wire to deleteTask

RED:   test("DELETE /api/tasks/[id] for another user's task returns 403")
       → create task as user A → DELETE as user B → 403
GREEN: Add ownership check
```

### Slice 5: inline editing UI

```
RED:   test("clicking task title enters edit mode")
       → component test: click title → input appears with current title
GREEN: Add edit state to TaskRow.svelte

RED:   test("pressing Enter saves edited title")
       → component test: enter edit mode → change text → press Enter → title updates
GREEN: Wire blur/Enter to PATCH API call
```

### Slice 6: optimistic updates

```
RED:   test("creating a task appears in list before server responds")
       → component test: submit new task → task appears immediately in list
       → (server response confirms later)
GREEN: Implement Svelte store with optimistic add, reconcile on server response

RED:   test("deleting a task removes from list before server responds")
       → component test: delete task → task disappears immediately
GREEN: Implement optimistic delete in store
```

## Acceptance criteria

- [ ] POST/GET/PATCH/DELETE /api/tasks all work with auth
- [ ] Zod validation on inputs
- [ ] User isolation enforced
- [ ] Task list UI with inline editing
- [ ] Optimistic create/update/delete
- [ ] All TDD slices pass

## Blocked by

- Blocked by #3 (auth)

## User stories addressed

- User story 3 (create task)
- User story 4 (edit task inline)
- User story 7 (delete task)
- User story 33 (optimistic updates)
