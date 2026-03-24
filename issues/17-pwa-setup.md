## Parent PRD

#1

## What to build

PWA: service worker for UI shell caching, web manifest, installability. Offline shell with "offline" state for data.

## TDD Plan

PWA tests are integration tests — verify manifest, service worker registration, and offline behavior.

### Tracer bullet: manifest is valid and accessible

```
RED:   test("GET /manifest.webmanifest returns valid PWA manifest")
       → fetch /manifest.webmanifest → 200
       → JSON contains name, short_name, icons, display: 'standalone', theme_color
GREEN: Create manifest with PWA fields, link in app.html

RED:   test("manifest icons exist and are correct sizes")
       → manifest.icons includes 192x192 and 512x512
       → fetch each icon URL → 200
GREEN: Generate PWA icons matching dark theme
```

### Slice 2: service worker registration

```
RED:   test("service worker registers on page load")
       → load app in test browser → navigator.serviceWorker.ready resolves
GREEN: Configure @vite-pwa/sveltekit (or manual SW), register in app
```

### Slice 3: offline shell

```
RED:   test("app shell loads when offline")
       → load app → go offline → reload → app shell renders (not browser error)
GREEN: Configure service worker to cache shell assets (HTML, CSS, JS)

RED:   test("offline state shows 'You're offline' message in data areas")
       → go offline → task list area shows offline indicator
GREEN: Detect navigator.onLine, show offline message when false
```

### Slice 4: installability

```
Manual verification:
  - Chrome shows install prompt
  - Safari "Add to Home Screen" works
  - Installed app opens in standalone mode
  - Lighthouse PWA audit passes
```

## Acceptance criteria

- [ ] Valid web manifest with name, icons, display: standalone
- [ ] Service worker caches UI shell
- [ ] App shell loads offline
- [ ] Offline indicator for data areas
- [ ] Installable on Chrome, Safari, Edge
- [ ] Lighthouse PWA audit passes
- [ ] All TDD slices pass

## Blocked by

- Blocked by #16 (dark theme — icons/theme should match final design)

## User stories addressed

- User story 35 (install as PWA)
- User story 36 (offline UI shell)
