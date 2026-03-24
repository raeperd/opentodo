## Parent PRD

#1

## What to build

Global keyboard shortcuts: j/k navigate, x complete, e edit, n create. Focus management across task list.

## TDD Plan

### Tracer bullet: j/k moves focus through tasks

```
RED:   test("pressing j moves focus to next task")
       → component test: render task list with 3 tasks, focus on first
       → press j → second task has focus indicator
GREEN: Add keydown listener for j/k, maintain focusIndex state

RED:   test("pressing k moves focus to previous task")
       → component test: focus on second task → press k → first task focused
GREEN: Add k handler (focusIndex - 1)

RED:   test("j at last task doesn't go past end")
       → component test: focus on last → press j → still on last
GREEN: Clamp focusIndex to list length
```

### Slice 2: x toggles completion

```
RED:   test("pressing x toggles completion on focused task")
       → component test: focus on task (status=todo) → press x → task shows complete
GREEN: Wire x to toggle completion action from slice 05
```

### Slice 3: e opens edit

```
RED:   test("pressing e opens inline edit on focused task")
       → component test: focus on task → press e → title input appears
GREEN: Wire e to edit mode trigger from slice 04
```

### Slice 4: n creates new task

```
RED:   test("pressing n creates a new task and focuses title input")
       → component test: press n → new empty task row appears → title input focused
GREEN: Wire n to create empty task, focus new row
```

### Slice 5: shortcuts disabled in inputs

```
RED:   test("shortcuts are disabled when typing in an input")
       → component test: focus on title input → press j → focus doesn't move
GREEN: Check event.target — skip shortcuts when target is input/textarea
```

## Acceptance criteria

- [ ] j/k navigates task list
- [ ] x toggles completion
- [ ] e opens inline edit
- [ ] n creates new task
- [ ] Shortcuts disabled in inputs
- [ ] Visual focus indicator
- [ ] All TDD slices pass

## Blocked by

- Blocked by #5 (task completion)
- Blocked by #6 (task description / edit mode)

## User stories addressed

- User story 29 (j/k navigation)
- User story 30 (x to complete)
- User story 31 (e to edit)
- User story 32 (n to create)
