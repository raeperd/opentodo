## Parent PRD

#1

## What to build

Project CRUD, assign tasks to projects, filter by project. Projects have name, color, sort order.

## TDD Plan

### Tracer bullet: create project and retrieve it

```
RED:   test("POST /api/projects creates a project and GET returns it")
       → POST { name: "Work", color: "#3b82f6" } → 201
       → GET /api/projects → includes "Work" with color
GREEN: Create project API routes, wire to lib/db
```

### Slice 2: project auth and validation

```
RED:   test("POST /api/projects without auth returns 401")
       → POST without cookie → 401
GREEN: Add auth check

RED:   test("POST /api/projects without name returns 400")
       → POST {} → 400
GREEN: Add Zod validation

RED:   test("GET /api/projects returns only authenticated user's projects")
       → create projects for user A and B → GET as A → only A's projects
GREEN: Filter by userId
```

### Slice 3: update and delete project

```
RED:   test("PATCH /api/projects/[id] updates name and color")
       → create project → PATCH { name: "Personal" } → GET returns "Personal"
GREEN: Create PATCH route

RED:   test("DELETE /api/projects/[id] with move-to-inbox nullifies task project_id")
       → create project → create task in project → DELETE with ?strategy=move-to-inbox
       → GET task returns project_id=null
GREEN: Create DELETE route with strategy query param

RED:   test("DELETE /api/projects/[id] with delete-tasks removes tasks")
       → create project → create task in project → DELETE with ?strategy=delete-tasks
       → GET tasks returns empty
GREEN: Add delete-tasks strategy
```

### Slice 4: assign task to project

```
RED:   test("PATCH /api/tasks/[id] with project_id assigns task to project")
       → create project → create task → PATCH { projectId: id } → GET task has projectId
GREEN: Confirm projectId accepted by task PATCH

RED:   test("GET /api/tasks?projectId=x returns only tasks in that project")
       → create 2 tasks, assign 1 to project → GET with filter → returns only 1
GREEN: Add projectId query param filter to GET /api/tasks
```

### Slice 5: project UI

```
RED:   test("project list renders projects with color indicators")
       → component test: render project list → shows project names with colors
GREEN: Create ProjectList.svelte

RED:   test("clicking project filters task list")
       → component test: click project → task list shows only project's tasks
GREEN: Wire project click to filter state
```

## Acceptance criteria

- [ ] Project CRUD via API with auth and validation
- [ ] Delete project with move-to-inbox or delete-tasks strategy
- [ ] Assign/move tasks between projects
- [ ] Filter tasks by project
- [ ] Project list UI with colors
- [ ] All TDD slices pass

## Blocked by

- Blocked by #4 (task CRUD)

## User stories addressed

- User story 13 (create projects)
- User story 14 (project colors)
- User story 15 (assign task to project)
- User story 16 (move task between projects)
- User story 17 (filter by project)
- User story 40 (delete project with task handling)
