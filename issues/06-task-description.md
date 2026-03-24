## Parent PRD

#1

## What to build

Plain markdown description on tasks. Detail panel slides open when task is selected.

## TDD Plan

### Tracer bullet: save and retrieve description via API

```
RED:   test("PATCH /api/tasks/[id] with description saves markdown text")
       → create task → PATCH { description: "# Notes\n- item 1" } → GET returns description
GREEN: Confirm description field accepted by PATCH route (column already in schema)
```

### Slice 2: detail panel opens

```
RED:   test("clicking a task opens detail panel")
       → component test: click task row → detail panel visible with task title
GREEN: Create DetailPanel.svelte, wire task selection state

RED:   test("pressing Escape closes detail panel")
       → component test: open panel → press Escape → panel hidden
GREEN: Add keydown handler for Escape
```

### Slice 3: description editing

```
RED:   test("detail panel shows textarea with task description")
       → component test: open panel for task with description → textarea contains text
GREEN: Add textarea to DetailPanel bound to task.description

RED:   test("editing description and blurring saves to server")
       → component test: change textarea text → blur → verify PATCH called with new text
GREEN: Wire blur event to PATCH API call
```

## Acceptance criteria

- [ ] Description persists via API
- [ ] Detail panel slides open on task selection
- [ ] Textarea for markdown description
- [ ] Auto-save on blur
- [ ] Escape closes panel
- [ ] All TDD slices pass

## Blocked by

- Blocked by #4 (task CRUD)

## User stories addressed

- User story 8 (markdown description)
- User story 38 (detail panel)
