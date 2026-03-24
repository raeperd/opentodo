## Parent PRD

#1

## What to build

Built-in views: Inbox (no project, no due date), Today (due today + overdue), Upcoming (future due dates). Client-side filters.

## TDD Plan

### Tracer bullet: inbox view returns correct tasks

```
RED:   test("GET /api/tasks?view=inbox returns tasks with no project and no due date")
       → create task A (no project, no due date) — inbox
       → create task B (has project) — not inbox
       → create task C (has due date) — not inbox
       → GET ?view=inbox → returns only task A
GREEN: Add view query param filter to GET /api/tasks
```

### Slice 2: today view

```
RED:   test("GET /api/tasks?view=today returns tasks due today and overdue")
       → create task due today → create task due yesterday (overdue)
       → create task due tomorrow → create task with no due date
       → GET ?view=today → returns today + overdue tasks only
GREEN: Add today view filter (due_date <= end of today AND due_date IS NOT NULL)
```

### Slice 3: upcoming view

```
RED:   test("GET /api/tasks?view=upcoming returns future tasks sorted by due date")
       → create task due in 3 days → create task due tomorrow → create task due today
       → GET ?view=upcoming → returns tomorrow, 3 days (not today, that's "today" view)
GREEN: Add upcoming view filter (due_date > end of today), ORDER BY due_date ASC
```

### Slice 4: view UI

```
RED:   test("clicking 'Inbox' in navigation shows inbox tasks")
       → component test: click Inbox → task list renders only inbox tasks
GREEN: Wire view navigation to API query param

RED:   test("view shows task count badge")
       → component test: render view nav with 3 inbox tasks → badge shows "3"
GREEN: Add count display next to view label
```

## Acceptance criteria

- [ ] Inbox view: no project, no due date
- [ ] Today view: due today + overdue
- [ ] Upcoming view: future due dates, sorted by date
- [ ] Task counts per view
- [ ] View switching is instant
- [ ] All TDD slices pass

## Blocked by

- Blocked by #7 (due dates)
- Blocked by #9 (projects)

## User stories addressed

- User story 21 (Inbox)
- User story 22 (Today)
- User story 23 (Upcoming)
