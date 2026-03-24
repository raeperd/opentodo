## Parent PRD

#1

## What to build

Command palette (Cmd+K) using cmdk-sv. Fuzzy search tasks, projects, tags. Quick actions. Action registry in `src/lib/commands/`.

## TDD Plan

Commands module is unit tested (pure logic). Palette UI is component tested.

### Tracer bullet: register a command and find it via search

```
RED:   test("registerCommand adds command, search finds it by fuzzy match")
       → registerCommand({ id: 'inbox', label: 'Go to Inbox', action: fn })
       → search('inb') → returns [{ id: 'inbox', label: 'Go to Inbox' }]
GREEN: Create commands module with registerCommand() and search()
```

### Slice 2: fuzzy search ranking

```
RED:   test("search ranks exact prefix match above substring match")
       → register 'Inbox', 'Go to Inbox', 'In Progress'
       → search('in') → 'Inbox' ranked first (prefix), then 'In Progress', then 'Go to Inbox'
GREEN: Implement scoring (prefix > substring > fuzzy)

RED:   test("search returns empty for no match")
       → register 'Inbox' → search('xyz') → returns []
GREEN: Filter non-matching results
```

### Slice 3: execute command

```
RED:   test("execute calls the command's action function")
       → register command with mock action → execute('inbox') → action called
GREEN: Implement execute() that looks up and calls action

RED:   test("execute with unknown id throws")
       → execute('nonexistent') → throws error
GREEN: Add error handling
```

### Slice 4: palette UI opens and closes

```
RED:   test("Cmd+K opens command palette")
       → component test: press Cmd+K → palette modal visible
GREEN: Create CommandPalette.svelte with cmdk-sv, wire Cmd+K global listener

RED:   test("Escape closes command palette")
       → component test: open palette → press Escape → palette hidden
GREEN: Wire Escape to close
```

### Slice 5: palette searches and executes

```
RED:   test("typing in palette filters results")
       → component test: open palette → type "inbox" → shows "Go to Inbox" result
GREEN: Wire input to search(), render results

RED:   test("selecting a result executes the command and closes palette")
       → component test: open → type → select result → action fires, palette closes
GREEN: Wire selection to execute(), close modal

RED:   test("palette searches across tasks, projects, and tags")
       → component test: tasks/projects/tags registered as searchable
       → type partial match → results grouped by type
GREEN: Register task/project/tag entries as commands on data load
```

## Acceptance criteria

- [ ] Commands module: registerCommand, search (fuzzy), execute
- [ ] Cmd+K opens, Escape closes
- [ ] Fuzzy search across tasks, projects, tags, actions
- [ ] Results grouped by type
- [ ] Selection executes action and closes palette
- [ ] All TDD slices pass

## Blocked by

- Blocked by #9 (projects — searchable)
- Blocked by #10 (tags — searchable)

## User stories addressed

- User story 26 (open command palette)
- User story 27 (fuzzy search)
- User story 28 (execute actions)
