## Parent PRD

#1

## What to build

Toggle task status between `todo` and `done`. Visual distinction for completed tasks. Optimistic toggle.

## TDD Plan

### Tracer bullet: toggle task status via API

```
RED:   test("PATCH /api/tasks/[id] with status 'done' marks task complete")
       → create task (status='todo') → PATCH { status: 'done' } → GET returns 'done'
GREEN: Already supported by PATCH from slice 04 — verify status field accepted

RED:   test("PATCH /api/tasks/[id] with status 'todo' uncompletes task")
       → create done task → PATCH { status: 'todo' } → GET returns 'todo'
GREEN: Confirm round-trip works
```

### Slice 2: completion UI

```
RED:   test("task row shows checkbox, unchecked for todo tasks")
       → component test: render TaskRow with status='todo' → checkbox unchecked
GREEN: Add checkbox to TaskRow.svelte

RED:   test("clicking checkbox toggles completion and shows strikethrough")
       → component test: click checkbox → checkbox checked, title has strikethrough
GREEN: Wire click to status toggle, add conditional strikethrough + dimmed styling
```

### Slice 3: optimistic toggle

```
RED:   test("toggling completion updates UI before server responds")
       → component test: click checkbox → immediately shows complete state
GREEN: Optimistic status update in Svelte store
```

## Acceptance criteria

- [ ] Checkbox toggles task status
- [ ] Completed tasks show strikethrough + dimmed
- [ ] Optimistic toggle
- [ ] All TDD slices pass

## Blocked by

- Blocked by #4 (task CRUD)

## User stories addressed

- User story 5 (mark complete)
- User story 6 (uncomplete)
