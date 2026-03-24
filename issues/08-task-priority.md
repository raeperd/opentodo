## Parent PRD

#1

## What to build

Priority field (none/low/medium/high = 0-3). Visual indicator. Sort by priority within views.

## TDD Plan

### Tracer bullet: set priority via API

```
RED:   test("PATCH /api/tasks/[id] with priority 3 saves high priority")
       → create task → PATCH { priority: 3 } → GET returns priority=3
GREEN: Confirm priority field accepted (column already in schema)

RED:   test("task defaults to priority 0")
       → create task without priority → GET returns priority=0
GREEN: Confirm default value works
```

### Slice 2: priority sorting

```
RED:   test("GET /api/tasks returns tasks sorted by priority descending")
       → create tasks with priority 1, 3, 0, 2 → GET returns order 3, 2, 1, 0
GREEN: Add ORDER BY priority DESC to getTasksByUserId (before sort_order)
```

### Slice 3: priority UI

```
RED:   test("task row shows priority indicator for high priority")
       → component test: render TaskRow with priority=3 → shows high priority icon/color
GREEN: Add priority indicator to TaskRow

RED:   test("task row shows no indicator for priority 0")
       → component test: render TaskRow with priority=0 → no priority indicator
GREEN: Conditionally hide indicator for none

RED:   test("priority selector sets priority")
       → component test: click priority selector → choose high → priority updates
GREEN: Add priority selector dropdown/popover
```

## Acceptance criteria

- [ ] Priority persists via API (0-3)
- [ ] Default priority is 0
- [ ] Tasks sorted by priority descending
- [ ] Visual priority indicator (color-coded)
- [ ] Priority selector in task row or detail panel
- [ ] All TDD slices pass

## Blocked by

- Blocked by #4 (task CRUD)

## User stories addressed

- User story 11 (set priority)
- User story 12 (sort by priority)
