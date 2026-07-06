# Architecture

The project is evolving toward feature-based architecture:

- `app` - router and application shell.
- `shared` - design system, markdown, charts and generic infrastructure.
- `entities` - domain models such as learning units and practice models.
- `features` - user-facing feature logic such as auth and command palette.
- `widgets` - composed UI blocks.
- `services` - API, DTOs, mappers and repositories.
- `pages` - route-level composition.
- `context` - local providers until backend APIs are available.

Legacy `components` remain as stable implementation modules and are re-exported into `shared`/`widgets` where appropriate. New generic UI should go into `shared/ui`; new domain behavior should go into `features` or `entities`.

## Quality Gates

Run these before handoff:

```bash
npm run build
npm run lint
npm run test:run
```

## Current Boundaries

- Page components should compose widgets and hooks, not hold business logic.
- `Context` is reserved for app-wide state such as progress, platform gamification, theme and auth.
- Repository interfaces in `services/repositories` isolate future backend migration.
- Mock data remains in `src/data` until API integration.
