## Parent PRD

#1

## What to build

Drag-and-drop task reordering using `svelte-dnd-action`. Updates sort_order. Optimistic reorder.

## TDD Plan

### Tracer bullet: reorder API updates sort_order

```
RED:   test("PATCH /api/tasks/reorder updates sort_order for affected tasks")
       → create 3 tasks (order A=0, B=1, C=2)
       → PATCH /api/tasks/reorder { orderedIds: [C, A, B] }
       → GET /api/tasks → returns C(0), A(1), B(2)
GREEN: Create reorder API route that bulk-updates sort_order
```

### Slice 2: reorder persists

```
RED:   test("reordered tasks maintain order across page reloads")
       → reorder via API → fresh GET /api/tasks → same order
GREEN: Confirm ORDER BY sort_order in query
```

### Slice 3: drag UI

```
RED:   test("dragging a task to a new position reorders the list")
       → component test: render 3 tasks → simulate drag task C above A
       → list renders C, A, B
GREEN: Integrate svelte-dnd-action on task list

RED:   test("drag reorder is optimistic — updates before server responds")
       → component test: drag to reorder → list immediately reflects new order
GREEN: Update store order on drag end, then sync to server
```

## Acceptance criteria

- [ ] Reorder API bulk-updates sort_order
- [ ] Drag-and-drop reorders visually
- [ ] Optimistic reorder
- [ ] Order persists across reloads
- [ ] All TDD slices pass

## Blocked by

- Blocked by #4 (task CRUD)

## User stories addressed

- User story 25 (drag reorder)
