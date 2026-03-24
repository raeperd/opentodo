## Parent PRD

#1

## What to build

Set up Drizzle ORM with Turso (libsql) in `lib/db`. Define the full MVP schema with migrations. Integration tests against real local libsql.

## TDD Plan

All tests are integration tests against a real local libsql instance. Each test describes a behavior of the data layer's public interface.

### Tracer bullet: insert and retrieve a user

```
RED:   test("can create and retrieve a user by id")
       → call createUser({ email, name }) → getUserById(id) returns matching user
GREEN: Define users table in Drizzle schema, implement createUser/getUserById
```

### Slice 2: task CRUD

```
RED:   test("can create a task for a user and retrieve it")
       → createTask({ userId, title }) → getTasksByUserId(userId) includes the task
GREEN: Define tasks table with user_id FK, implement createTask/getTasksByUserId

RED:   test("can update a task title")
       → createTask → updateTask(id, { title: "new" }) → getTask returns new title
GREEN: Implement updateTask

RED:   test("can delete a task")
       → createTask → deleteTask(id) → getTasksByUserId returns empty
GREEN: Implement deleteTask
```

### Slice 3: task fields (status, priority, due_date, description, sort_order)

```
RED:   test("task defaults to status 'todo' and priority 0")
       → createTask → getTask returns status='todo', priority=0
GREEN: Add column defaults

RED:   test("can update task status to 'done'")
       → createTask → updateTask(id, { status: 'done' }) → getTask returns 'done'
GREEN: Already works via updateTask

RED:   test("can set and clear due_date")
       → updateTask(id, { dueDate: date }) → getTask returns date
       → updateTask(id, { dueDate: null }) → getTask returns null
GREEN: Ensure nullable due_date column works

RED:   test("tasks ordered by sort_order")
       → create 3 tasks with sort_order 3,1,2 → getTasksByUserId returns order 1,2,3
GREEN: Add ORDER BY sort_order to query
```

### Slice 4: projects

```
RED:   test("can create a project and retrieve user's projects")
       → createProject({ userId, name, color }) → getProjectsByUserId returns it
GREEN: Define projects table, implement functions

RED:   test("can assign task to project and filter by project")
       → createProject → createTask with projectId → getTasksByProject returns task
GREEN: Add project_id FK to tasks, implement getTasksByProject

RED:   test("deleting a project with 'move-to-inbox' nullifies task project_id")
       → createProject → createTask in project → deleteProject(id, 'move-to-inbox')
       → getTask returns project_id=null
GREEN: Implement deleteProject with strategy parameter
```

### Slice 5: tags (many-to-many)

```
RED:   test("can create a tag and assign it to a task")
       → createTag({ userId, name, color }) → assignTag(taskId, tagId)
       → getTaskTags(taskId) includes the tag
GREEN: Define tags + task_tags tables, implement functions

RED:   test("can filter tasks by tag")
       → create 2 tasks, assign tag to first → getTasksByTag(tagId) returns only first
GREEN: Implement getTasksByTag with JOIN

RED:   test("deleting a tag removes it from all tasks")
       → createTag → assign to 2 tasks → deleteTag(id)
       → getTaskTags for both tasks returns empty
GREEN: CASCADE delete on task_tags FK

RED:   test("renaming a tag is reflected everywhere")
       → createTag → assignTag → updateTag(id, { name: "new" })
       → getTaskTags returns tag with new name
GREEN: Already works — single source of truth in tags table
```

### Slice 6: user isolation

```
RED:   test("user A cannot see user B's tasks")
       → createTask for userA → getTasksByUserId(userB) returns empty
GREEN: Already works via userId filtering (confirm)

RED:   test("user A cannot see user B's projects or tags")
       → create project/tag for userA → getProjectsByUserId(userB) returns empty
GREEN: Confirm userId filtering
```

## Acceptance criteria

- [ ] Drizzle schema defines users, tasks, projects, tags, task_tags
- [ ] Foreign key constraints and cascades correct
- [ ] All TDD slices pass against real local libsql
- [ ] Migrations generate and apply cleanly

## Blocked by

- Blocked by #1 (monorepo scaffolding)

## User stories addressed

None — infrastructure slice
