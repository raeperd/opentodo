## Parent PRD

#1

## What to build

Tag CRUD, assign multiple tags to tasks (many-to-many), filter by tag. Autocomplete, global rename, delete.

## TDD Plan

### Tracer bullet: create tag and assign to task

```
RED:   test("POST /api/tags creates a tag and GET returns it")
       → POST { name: "urgent", color: "#ef4444" } → 201
       → GET /api/tags → includes "urgent"
GREEN: Create tag API routes

RED:   test("POST /api/tasks/[id]/tags assigns a tag to a task")
       → create tag → create task → POST /api/tasks/[taskId]/tags { tagId }
       → GET /api/tasks/[taskId] includes tag in response
GREEN: Create tag assignment route, include tags in task response
```

### Slice 2: multiple tags and filtering

```
RED:   test("task can have multiple tags")
       → create 2 tags → assign both to task → GET task includes both tags
GREEN: Confirm many-to-many works

RED:   test("GET /api/tasks?tagId=x returns only tasks with that tag")
       → create 2 tasks, tag only first → GET with tagId filter → returns only first
GREEN: Add tagId query param filter with JOIN

RED:   test("removing a tag from a task works")
       → assign tag → DELETE /api/tasks/[id]/tags/[tagId] → GET task has no tags
GREEN: Create DELETE route for tag removal
```

### Slice 3: global rename and delete

```
RED:   test("PATCH /api/tags/[id] renames tag and it's reflected on tasks")
       → create tag → assign to task → PATCH { name: "critical" }
       → GET task shows tag with name "critical"
GREEN: Create PATCH route (single source of truth — rename just works)

RED:   test("DELETE /api/tags/[id] removes tag from all tasks")
       → create tag → assign to 2 tasks → DELETE tag
       → GET both tasks → neither has the tag
GREEN: Create DELETE route (CASCADE handles task_tags)
```

### Slice 4: tag UI

```
RED:   test("task row shows tags as colored chips")
       → component test: render TaskRow with 2 tags → shows 2 colored chips
GREEN: Add tag chips to TaskRow.svelte

RED:   test("tag autocomplete suggests existing tags")
       → component test: type "urg" in tag input → dropdown shows "urgent"
GREEN: Create TagAutocomplete.svelte with fuzzy match against existing tags

RED:   test("selecting from autocomplete assigns tag")
       → component test: select "urgent" from autocomplete → tag assigned
GREEN: Wire selection to POST /api/tasks/[id]/tags
```

## Acceptance criteria

- [ ] Tag CRUD via API with auth
- [ ] Many-to-many tag assignment
- [ ] Filter tasks by tag
- [ ] Global rename and delete
- [ ] Tag autocomplete
- [ ] Colored tag chips in task row
- [ ] All TDD slices pass

## Blocked by

- Blocked by #4 (task CRUD)

## User stories addressed

- User story 18 (create tags with colors)
- User story 19 (assign multiple tags)
- User story 20 (filter by tag)
- User story 39 (tag autocomplete)
- User story 41 (rename tag globally)
- User story 42 (delete tag)
