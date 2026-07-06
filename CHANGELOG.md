# Changelog

## 1.4.0 — HTML course rebuild: mentor format, one continuous project

### HTML course only — everything else (CSS/JS/TS/React/Node/Git/Browser/Accessibility/Performance) is untouched
- Redesigned the HTML course into 15 focused modules that build **one continuous project** — a real café website ("Кав'ярня «Аромат»") — instead of isolated, disconnected snippets. Every lesson's practice task shows the same `index.html` growing version by version (v0 → v16): document skeleton → head metadata → text hierarchy → quotes → nav → contact links → images → responsive images → lists → nested lists → price table → accessible table → landmarks → article/section → figure/details/dialog → semantic buttons vs. links.
- New module roadmap: Розуміння вебу, Твій перший HTML-документ, Робота з текстом, Навігація, Зображення, Списки, Таблиці, Семантичний HTML, Форми, Доступність, SEO основи, Створення реальних компонентів, Мислення фронтенд-розробника, Типові помилки початківців, Міні-проєкти.
- Hand-wrote full lesson content (not generic-generator output) for 8 of the 15 modules — 21 lessons total: Розуміння вебу, Твій перший документ, Текст, Навігація, Зображення, Списки, Таблиці, Семантичний HTML. The remaining modules (Форми, Доступність, SEO, Реальні компоненти, Мислення, Помилки, Міні-проєкти) run on the platform's generic lesson generator, which was already deepened in 1.3.0 (real theory steps, narrated code walkthroughs, real-world usage, best practices) — a deliberate scope call so effort went into quality per lesson rather than thin coverage everywhere, in line with "don't stretch a 5-minute topic into 20."
- Replaced the one-size-fits-all lesson layout with a tight, mentor-style structure per hand-written lesson: **Що це? → Навіщо це потрібно → Коли використовувати → Коли НЕ використовувати → Теорія (short) → Приклад (before/line-by-line/after) → Практика → Типові помилки → Не роби так (one bad example, explained) → Best practice → Коротко → Pro tip → Що далі.** No section exists unless it answers "what/why/when/when-not/mistakes/remember" — anything that read like documentation filler was cut.
- Removed the live code editor from HTML lessons in favor of interactive micro-exercises (find-the-bug, predict, choose-the-more-semantic-tag, fix-the-html) — the Playground component itself was left in place (still used by other courses) but is no longer surfaced for the hand-written HTML lessons.
- Extended `Lesson` with purely additive, optional fields (`whatIsIt`, `whyUseIt`, `whenToUse`, `whenNotToUse`, `dontDoThis`, `proTip`) and taught `LessonContent.tsx` to render them when present, falling back to the older generic fields otherwise — the other 9 courses render exactly as before.

### Fixed (user-reported)
- Unwanted horizontal scrollbar in the expanded sidebar on desktop: `.sidebar` set `overflow-y: auto` without an explicit `overflow-x`, and the CSS spec computes the omitted axis as `auto` too — any minor content overflow triggered a visible horizontal scrollbar. Fixed with an explicit `overflow-x: hidden`.

## 1.3.0 — Content depth, code variety, dashboard polish, backups

### Fixed (user-reported)
- **Crash on ~half of lessons**: `descriptionVariants[...] is not a function`, caused by a signed bit-shift (`seed >> 2`) reinterpreting large unsigned hashes as negative array indices. Switched every such shift to unsigned (`>>>`) and hardened `pickRotating` against negative input.
- **"Same example everywhere"**: every course family (HTML, CSS, React/TS, Git, Node, JS) had exactly one static code template with only the title swapped in — so, e.g., every HTML lesson showed the literal same `<main><section><h2><p>` skeleton. Replaced each with 4–5 genuinely different, realistic snippets (a form vs. a nav vs. a table vs. a card for HTML; a counter vs. a list vs. a custom hook for React; etc.), picked deterministically per lesson. The practice-task starter files (shown under "Практика") no longer duplicate a separate, always-identical "demo-card" skeleton — they now reuse the same varied snippet.
- **Dashboard visuals were "сиро" (rough)**: the "last opened lesson" hero card had dead vertical whitespace, stat cards were flat text with no hierarchy, and the daily-challenges/achievements lists wrapped awkwardly with no row styling. Added icons and color accents to stat cards, proper row styling with an XP badge for challenges, a status-icon list for achievements, and fixed the hero card to intentionally distribute its content (title top, CTA pinned to bottom) instead of leaving a gap.

### Content depth
- Every generated lesson (not just the one hand-written module) now gets: a second theory step ("як це працює на практиці"), a narrated code walkthrough (before/code/line-notes/after) instead of a bare snippet, a "Спробуй сам" list of 3 concrete variations, real-world usage examples, and best-practice notes that include concrete variants/exceptions/edge cases — answering "many cases, applications, variants, exceptions per topic" directly.

### New features
- **Real streak tracking**: an activity log (one entry per day with a completed lesson or graded quiz) now drives an actual "current streak" and "longest streak," replacing the old placeholder formula (`completedLessons + passedTests`, capped at 14) that was labeled "найдовша серія днів" but had no relationship to actual days.
- **"Course complete" state**: the dashboard's resume card no longer mislabels an already-finished lesson as "continue here" once every lesson is completed — it shows a completion message and links to the progress page instead.
- **Export / import progress**: Settings → "Резервна копія прогресу" downloads all of this platform's localStorage data as a JSON file and can restore it later (or on another browser), since progress was previously only ever stored locally with no backup path.

### Reliability
- Added `courseCatalog.json` structural validation (no new dependency) that fails fast with a specific, readable error (which course/module/lesson, what's wrong) instead of a confusing crash deep inside the generator.
- Added `src/data/courses.test.ts`: regression tests that generate every lesson across every course and assert no crashes, unique ids, valid quiz answers, and real code-example variety per course — the kind of test that would have caught this update's crash before it shipped.
- Added `.gitignore` (node_modules, build output, env files, editor/OS cruft) for pushing this project to a repo.
- Verified the hidden Playground/Monaco editor code has zero remaining importers anywhere in the app, so it's fully excluded from the production bundle by dead-code elimination rather than merely hidden in the UI.

## 1.2.0 — Ukrainian localization, design refresh, learning experience overhaul

### Localization
- Removed the i18n/multi-language system (uk/en/pl) entirely — the app is now Ukrainian-only. `react-i18next` was dead code (never wired to `useTranslation()`) and has been removed as a dependency.
- Translated all interface strings, the full course catalog, and all generated lesson/quiz templates to Ukrainian.
- Fixed a bug where `slugify()` only stripped/kept ASCII characters, so any lesson title without Latin letters (i.e. almost every title after translation) collapsed to an empty or colliding id. Added Ukrainian→Latin transliteration with a hash-based fallback, so every lesson gets a stable, unique id again (this was silently corrupting progress tracking and routing).

### Design
- Modernized the visual design system: refreshed CSS custom properties (`variables.css`), component styling, and layout spacing across the app.

### Navigation & UX fixes
- Sidebar can now be collapsed to an icon-only rail (and expanded again), and each course's module/lesson list expands/collapses independently (accordion), instead of always rendering every course fully expanded.
- Fixed scroll position not resetting when navigating between lessons (e.g. via "Наступний урок") — added a global `ScrollToTop` on route change.
- Generated lesson copy (theory, tips, description, summary, examples) now varies per lesson via deterministic seeded variety pools, instead of every lesson in a module reading like the same paragraph with only the title swapped.

### Learning experience overhaul
- Extended the `Lesson`/`QuizQuestion` types with an optional mentor-style structure: `motivation`, `theorySteps`, `analogy`, `codeWalkthroughs`, `bestPractices`, `realWorldUsage`, `interviewQuestions`, `remember`, `nextLessonNote`, `microExercises`, and per-option `optionExplanations` on quiz questions.
- Rebuilt `LessonContent` to render this richer structure end-to-end (with graceful fallback to the original `theory`/`examples` fields for lessons that don't have it yet): motivation hook → description → learning objectives → step-by-step theory + analogy → narrated code walkthroughs → practice → common mistakes → best practices → real-world usage → interview questions → "remember" summary → next-lesson bridge.
- Hidden the live code Playground/Monaco editor from lesson pages per product decision (architecture and code left intact under `src/features/playground`, simply unused for now) and replaced it with a static `LessonPractice` component: the existing practice task rendered read-only, plus optional short self-check micro-exercises (predict output, find the bug, explain, rewrite, multiple-choice) with a reveal-answer toggle.
- Quiz feedback now explains *why* a specific wrong answer is wrong (not just a single generic explanation), for both the template-generated quizzes and hand-written ones.
- Added a fully hand-written, mentor-quality module as a flagship example of the new structure: **HTML → "Основи документа"** (5 lessons — document anatomy, head/viewport metadata, text hierarchy, links/URLs/navigation, images & alt text), each with a real-life motivation hook, an analogy, narrated code, common mistakes, best practices, real-world usage, interview Q&A, and a "remember" summary; the first lesson also has a fully custom quiz with per-wrong-answer explanations.

### Hotfix
- Fixed a crash (`descriptionVariants[...] is not a function`) affecting roughly half of all generated lessons: the content-variety seeding used a signed right shift (`>>`) on an unsigned 32-bit hash, which produced negative array indices for large hashes. Switched to unsigned right shift (`>>>`) everywhere a seed is shifted, and hardened `pickRotating` to normalize negative inputs defensively.

### Known scope note
Only the HTML "Основи документа" module has the full hand-written treatment so far. The remaining courses still use the (now improved) template generator, which doesn't populate the new mentor fields — those lessons render via the original theory/examples path until they get the same hand-written pass.

## 1.1.0

- Added a production-oriented playground feature with lazy Monaco loading.
- Added editor tabs, file explorer, toolbar, status bar, preview, output, hints and console panels.
- Added lesson-level playground metadata for language, starter code, solution code and preview/console support.
- Added localStorage persistence for playground files, active tab, cursor and editor settings.
- Added keyboard shortcuts for run, save, simple comments, fullscreen and console clearing.
- Added extension points for future Sandpack, StackBlitz, CodeSandbox or WebContainer runtimes.

## 1.0.0

- Created the frontend learning platform with roadmap, lessons, quizzes, projects, progress tracking, theme support and generated educational content.
