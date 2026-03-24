## Parent PRD

#1

## What to build

Linear-inspired dark-first theme. Dense rows, minimal chrome, consistent design system. Polish all components.

## TDD Plan

This is primarily a visual slice — fewer automated tests, more manual review. Tests focus on structural correctness.

### Tracer bullet: dark theme is default

```
RED:   test("app renders with dark background by default")
       → component test: render root layout → html element has 'dark' class
       → background is dark (zinc-950 or similar)
GREEN: Set dark class on html, configure Tailwind dark mode
```

### Slice 2: component visual consistency

```
RED:   test("task row has dense padding (py-1 or py-2, not py-4)")
       → component test: render TaskRow → row height is compact
GREEN: Audit and tighten padding across TaskRow, Sidebar, DetailPanel

RED:   test("all interactive elements have hover and focus states")
       → component test: render button/checkbox/link → hover class defined
GREEN: Add hover:bg-zinc-800 / focus:ring patterns consistently
```

### Slice 3: typography and color

```
RED:   test("task title uses sans-serif, due dates use monospace")
       → component test: render TaskRow → title has font-sans, date has font-mono
GREEN: Apply Tailwind font classes

Manual review:
  - Color palette: zinc/neutral tones, one accent color
  - Consistent border radii
  - Consistent shadows (minimal)
  - Sidebar, task list, detail panel, command palette all cohesive
```

## Acceptance criteria

- [ ] Dark theme is default (no light mode toggle)
- [ ] Zinc/neutral color palette with one accent color
- [ ] Dense task rows
- [ ] Consistent spacing, borders, shadows
- [ ] Hover and focus states on all interactive elements
- [ ] Sans-serif for text, monospace for dates
- [ ] All major components visually cohesive

## Blocked by

- Blocked by #12 (sidebar — all UI pieces exist for polish pass)

## User stories addressed

- User story 34 (dark theme)
