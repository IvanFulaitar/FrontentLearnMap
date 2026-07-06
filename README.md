# Frontend Roadmap Academy

Сучасний навчальний сайт на React для майбутнього Frontend Developer.

## Технології

- React + Vite
- TypeScript
- React Router
- CSS Modules
- localStorage для прогресу та теми

## Запуск

```bash
npm install
npm run dev
```

## Production Tooling

```bash
npm run build
npm run test:run
npm run lint
```

## Архітектура

Проєкт поступово переведено у feature-based структуру:

- `src/app` - router і application entry.
- `src/shared` - reusable UI, page shell, markdown, charts, errors.
- `src/entities` - доменні моделі learning/practice.
- `src/features` - feature logic: auth, command palette, dashboard widgets, course filters, settings.
- `src/services` - API abstractions, DTO, mappers, repositories.
- `src/context` - локальні providers до появи backend API.
- `src/pages` - route composition.
- `src/components` - legacy stable components, які поступово реекспортуються або мігрують у `shared/widgets/features`.

Документація:

- `docs/ARCHITECTURE.md`
- `docs/HOW_TO_ADD_CONTENT.md`
- `docs/PLAYGROUND.md`
- `CHANGELOG.md`

## Маршрути

- `/` - Dashboard
- `/courses` - Roadmap / Courses
- `/courses/:courseId` - курс
- `/courses/:courseId/modules/:moduleId/lessons/:lessonId` - урок
- `/courses/:courseId/modules/:moduleId/quiz/:quizId` - тест модуля
- `/progress` - прогрес
