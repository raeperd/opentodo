## Parent PRD

#1

## What to build

Due date with NLP parsing via `chrono-node`. Date picker fallback. Smart display formatting. Overdue highlighting.

## TDD Plan

Dates module is unit tested (pure functions). API and UI are integration/component tests.

### Tracer bullet: parse "tomorrow" to a Date

```
RED:   test("parseDate('tomorrow') returns tomorrow's date")
       → parseDate('tomorrow') → expect Date matching tomorrow
GREEN: Create lib/dates module, wrap chrono-node in parseDate()
```

### Slice 2: more NLP cases

```
RED:   test("parseDate('next friday 3pm') returns correct datetime")
       → parseDate('next friday 3pm') → expect matching Date
GREEN: Already works via chrono-node

RED:   test("parseDate('in 2 hours') returns ~2 hours from now")
       → parseDate('in 2 hours') → expect Date ~2h ahead
GREEN: Already works

RED:   test("parseDate('not a date') returns null")
       → parseDate('gibberish') → expect null
GREEN: Return null when chrono returns no results

RED:   test("parseDate('') returns null")
       → parseDate('') → expect null
GREEN: Guard empty string
```

### Slice 3: display formatting

```
RED:   test("formatDueDate for today returns 'Today'")
       → formatDueDate(today) → 'Today'
GREEN: Implement formatDueDate()

RED:   test("formatDueDate for tomorrow returns 'Tomorrow'")
       → formatDueDate(tomorrow) → 'Tomorrow'
GREEN: Add tomorrow case

RED:   test("formatDueDate for past date returns 'Overdue'")
       → formatDueDate(yesterday) → 'Overdue'
GREEN: Add overdue case

RED:   test("formatDueDate for future date returns 'Mar 25'")
       → formatDueDate(someFutureDate) → formatted date string
GREEN: Add default case with date formatting
```

### Slice 4: due date via API

```
RED:   test("PATCH /api/tasks/[id] with due_date saves and returns ISO date")
       → create task → PATCH { dueDate: '2026-03-25T15:00:00Z' } → GET returns it
GREEN: Confirm due_date field accepted (column already in schema)

RED:   test("PATCH /api/tasks/[id] with due_date null clears the date")
       → set due date → PATCH { dueDate: null } → GET returns null
GREEN: Confirm nullable update works
```

### Slice 5: due date UI

```
RED:   test("task row shows formatted due date")
       → component test: render TaskRow with dueDate=today → shows "Today"
GREEN: Add due date display to TaskRow using formatDueDate

RED:   test("overdue task row shows red due date")
       → component test: render TaskRow with past dueDate → red styling on date
GREEN: Add conditional red class for overdue

RED:   test("NLP input parses text and sets due date")
       → component test: type "tomorrow 3pm" in date input → date field populated
GREEN: Wire input to parseDate(), set result as due_date
```

## Acceptance criteria

- [ ] `parseDate()` handles common NLP cases, returns null for invalid input
- [ ] `formatDueDate()` shows Today/Tomorrow/Overdue/formatted date
- [ ] Due date persists via API (set and clear)
- [ ] Task row shows formatted due date with overdue highlighting
- [ ] NLP input parses text to date
- [ ] Fallback date picker
- [ ] All TDD slices pass

## Blocked by

- Blocked by #4 (task CRUD)

## User stories addressed

- User story 9 (NLP date input)
- User story 10 (date picker fallback)
- User story 24 (overdue highlighting)
