## Parent PRD

#1

## What to build

Collapsible sidebar with built-in views, projects, and tags. Clicking navigates to filtered view.

## TDD Plan

### Tracer bullet: sidebar renders views with counts

```
RED:   test("sidebar renders Inbox, Today, Upcoming with task counts")
       → component test: render Sidebar with counts { inbox: 3, today: 1, upcoming: 5 }
       → shows all three labels with correct counts
GREEN: Create Sidebar.svelte with view navigation section
```

### Slice 2: projects in sidebar

```
RED:   test("sidebar renders user's projects with color indicators")
       → component test: render Sidebar with projects [{ name: "Work", color: "#3b82f6" }]
       → shows "Work" with blue color dot
GREEN: Add projects section to Sidebar

RED:   test("clicking project in sidebar switches to project view")
       → component test: click "Work" → active view changes to project filter
GREEN: Wire click to view state
```

### Slice 3: tags in sidebar

```
RED:   test("sidebar renders user's tags with colors")
       → component test: render Sidebar with tags → shows tag names with colors
GREEN: Add tags section to Sidebar

RED:   test("clicking tag in sidebar switches to tag filter view")
       → component test: click tag → active view changes to tag filter
GREEN: Wire click to view state
```

### Slice 4: active state and collapse

```
RED:   test("active sidebar item is visually highlighted")
       → component test: render with activeView='inbox' → Inbox has active styling
GREEN: Add conditional active class

RED:   test("sidebar can be collapsed and expanded")
       → component test: click collapse button → sidebar hidden → click expand → visible
GREEN: Add collapse toggle state and button
```

## Acceptance criteria

- [ ] Sidebar shows Inbox, Today, Upcoming with counts
- [ ] Sidebar shows projects with colors
- [ ] Sidebar shows tags with colors
- [ ] Clicking navigates to filtered view
- [ ] Active item highlighted
- [ ] Sidebar collapsible
- [ ] All TDD slices pass

## Blocked by

- Blocked by #9 (projects)
- Blocked by #10 (tags)
- Blocked by #11 (task views)

## User stories addressed

- User story 37 (sidebar navigation)
