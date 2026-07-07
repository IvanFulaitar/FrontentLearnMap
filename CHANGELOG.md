# Changelog

## 1.20.0 — CSS-only lessons now render an actual live example, not just code

### Fixed (user-reported: "Тіні та радіуси" showed only a copyable `.menu-card { ... }` block, no visual)
- Root cause: `LiveCodeFrame` only renders a walkthrough when its `code` starts with real HTML markup — a CSS-only rule block has nothing to attach to and was silently staying copy-only, even though other lessons already show a live result. Rewrote all 4 `css-real-buttons-cards` walkthroughs (Кнопки та стани :hover/:focus, Тіні та радіуси, Картки меню, Псевдоелементи ::before/::after) into the project's existing self-contained convention — real markup (a `<button>`, a `.menu-card` `<div>`) followed by an embedded `<style>` block with the exact same CSS — so each now shows an actual rendered, interactive result (the button lesson's hover/focus/active states are for-real hoverable/tabbable/clickable in the live frame, not described in prose).
- Added the café project's real design tokens (`--color-primary`, `--color-bg`, `--color-text`, `--color-surface`, `--space-*`, `--radius`, `--font-*`) as a `:root` block inside `LiveCodeFrame`'s own injected stylesheet. Most lesson snippets reference these via `var(--color-primary)` etc. without redeclaring `:root` every time (it's taught once, early in the course) — without a real value here those snippets would render invisible (an undefined custom property resolves to nothing). This is a one-time, sitewide fix: every other lesson across both courses that references these tokens in a live preview benefits, not just this module.
- Remaining CSS-only walkthroughs across `css-real-forms-pricing`, `css-responsive`, `css-variables-dark-mode`, and `css-animations` likely have the same gap and are next in line for the same treatment.

## 1.19.0 — Fixed TOC overlap/overflow, console errors, and oversized preview boxes

### Fixed (user-reported, 4 screenshots: TOC sidebar overlapping lesson content + one showing a page-level horizontal scrollbar)
- Root cause found: CSS Grid items default to `min-width: auto` (their content's min-content size), which silently overrides a parent grid track's `minmax(0, ...)`. A single long unbreakable line buried several levels deep inside `.content`'s left column (a URL, a `srcset` list, a long attribute value in a code block) was forcing that whole column — and therefore the grid — wider than the page, pushing/overlapping the `.toc` sidebar and, in the worst case, opening a page-level scrollbar.
- Fixed at every level of the chain, not just the symptom: added `min-width: 0` to `.docs`, `.walkthrough`, `.codeBlock`, and `.livePreviewBlock` (each one is a real grid item somewhere in this nesting and each was silently blocking its neighbors from shrinking). Also added `min-width: 0` directly to the shared `Card` component (`src/components/ui/Card.module.css`) since `Card` is used as a grid/flex item all over the app — the same blowout could otherwise resurface anywhere else a `Card` sits in a grid.
- This is the same bug class as the "код пробиває контейнер" report (a `<meta>` example's code box visibly pushing past its own rounded border) — `.codeBlock` was the missing link: its inner `<pre>` already had `overflow-x: auto`, but `.codeBlock` itself refused to shrink to its column's width, so there was nothing to scroll within.

### Fixed (user-reported console errors: iframe sandbox warning + 404 on `analytics.js`)
- `LiveCodeFrame`'s sandbox previously combined `allow-scripts` with `allow-same-origin`, which Chrome flags as a sandbox-escape risk. Rewrote the height-measurement approach so `allow-same-origin` is no longer needed at all: instead of the parent reaching into the iframe's DOM, a small script injected into the iframe's own document measures `document.body.scrollHeight` via `ResizeObserver` and reports it out through `postMessage`, which works across origins. Sandbox is now `allow-scripts` only.
- A lesson snippet illustrating render-blocking scripts (`<head><script src="analytics.js">...`) was still passing the live-preview classifier and causing the sandboxed frame to request a file that doesn't exist. Added `HAS_HEAD_TAG_RE`: any code walkthrough containing a `<head>` tag is now excluded from live rendering entirely, matching the user's earlier instruction that `<head>`-related examples are about non-visual behavior, not something meant to be painted live.

### Fixed (user-reported: live-result box far too tall and mostly empty for short content)
- Added a hard `max-height: 420px` + `overflow-y: auto` ceiling on `.liveFrame` — no measurement bug can balloon the box past this again; it scrolls instead.

## 1.18.0 — Consolidated to a 10-component interaction system

### Strategic shift (per user directive: "8-10 універсальних компонентів, не 70")
- Replaced the growing list of one-off bespoke demos with a fixed set of 10 reusable primitives: `CodePreview` (= the existing `framework/` controls+preview+code pattern, already used by 9 demos), `ToggleDemo` (= `DemoToolbar`), `BeforeAfter` (= `DemoBeforeAfter`), `DevicePreview` (= `DemoViewport`, built earlier but never actually used in a lesson until now), plus 2 genuinely new ones this pass: `HighlightDemo`/`HighlightArea`, and `BrowserPreview` (planning-stage, `FindMistake`/`MiniQuiz`/`DragDropDemo`/`StepAnimation` still pending).
- Delivered `interaction-spec-final.md`: all 84 HTML+CSS lessons remapped onto only these 10 types (HTML per the user's own table, CSS remapped by me following the same principle), with a type-distribution summary confirming no single type dominates.

### New primitive: `HighlightDemo` + `HighlightArea`
- `framework/HighlightDemo.tsx`: generic "hover or click a region, see it highlighted + explained" primitive. `HighlightDemo` owns the active-region state and caption; `HighlightArea` wraps any real markup (a mock `<header>`, a table row, a DOM node) to make it hoverable/clickable/keyboard-focusable with zero per-lesson state code.
- Regions can nest (e.g. `<nav>` inside `<header>`) — caught and fixed a real bug during review: without `stopPropagation()`, clicking the inner region would bubble up and let the outer region's handler immediately overwrite the selection. Both `onClick` and `onKeyDown` now stop propagation.
- First instance: `LandmarksHighlightDemo`, wired to `html-semantics`'s "Орієнтири та регіони сторінки" — a real café page skeleton (header/nav/main/footer) where pointing at a region explains that landmark's role. First HTML lesson using this primitive; 7 more HTML/CSS lessons are queued for it per the spec.

## 1.17.0 — Fixed blank live-preview boxes, added real café photos

### Fixed (user-reported: empty "Живий результат" box on the SEO/Open Graph lesson)
- `<meta>`, `<title>`, `<link>` and `<base>` tags produce nothing visible in `<body>` — a walkthrough made only of `<meta property="og:...">` tags was passing the "starts with `<`" check and rendering a blank white `LiveCodeFrame`. Added `hasVisibleMarkup()`: strips head-only tags and HTML comments first, and skips the live preview entirely (falls back to copy-only) when nothing visible remains. SEO/Open Graph/robots.txt lessons need their own dedicated preview widgets (Google result card, social card, robots tester — already on the roadmap in `interaction-audit.md`), not this generic frame.

### New: real café images (SVG, hand-drawn — not stock photos, per the project's existing "no screenshots/stock images" rule)
- Added `public/images/latte.svg`, `croissant.svg`, `cheesecake.svg` — simple flat-illustration café photos in the site's warm palette. Wired into `GridDemo`'s menu-card gallery (each of the 6 café items now shows its image via `object-fit: cover`) as the first step toward the finalized "Реальна фотогалерея" / "Live Gallery Generator" spec for the CSS Grid module. More lessons (HTML Images/alt-text, CSS object-fit, mini-projects) can reuse the same 3 files going forward.

## 1.16.0 — Code walkthroughs now show their actual rendered output

### Fixed (user-reported: "чому... не показано вживу що [код] робить")
- Every `codeWalkthrough` in the "💻 Як використовувати" card only ever showed a copyable text block — never what the code actually produces, unlike the live demos in "👀 Подивись у дії". Added `LiveCodeFrame`: a sandboxed iframe (`srcDoc`, `sandbox="allow-scripts allow-same-origin"`, auto-sizing to content) that renders the real browser output directly under the code.
- Walkthroughs build on each other within a lesson (first one usually shows full markup, later ones often add just one more CSS rule to that same example) — `buildLivePreviews` tracks the most recent full-markup block and layers a later CSS-only rule on top of it, but **only when that rule's selectors actually appear in the markup**. A CSS-only snippet whose selector targets a different, unshown example (or has no markup at all yet, or is an ASCII diagram / bare JS statement) is left copy-only rather than rendered against the wrong markup and silently doing nothing — a wrong "live" preview would be worse than an honest absence of one.
- Result: 157 of 313 code walkthroughs across the HTML + CSS courses (~50%) now render live, with zero risk of a misleading render for the rest. Fixed the one walkthrough (`html-web-basics`, "Що таке DOM") whose JS line wasn't wrapped in `<script>` tags, which would have shown the raw statement as visible text instead of executing it.

## 1.15.0 — Reverted checklist hack, added a real Property-Switcher demo

### Fixed (user-reported: checklist buttons aren't real interactivity)
- The clickable "mark as understood" checklist added in 1.14.0 for `whenToUse` was explicitly rejected by the user (screenshot) as not being a genuine learning interaction — just checkboxes on text. Reverted `whenToUse` back to a plain static list; removed the now-unused `InteractiveChecklist` component and its CSS. `CopyableCode` and `InteractiveComparisonTable` are unaffected (kept — those weren't the complaint).
- Lesson: the effort now goes into real "👀 Подивись у дії" demos instead of manufacturing fake interactivity in "💻 Як використовувати".

### New demo: `LayerSwitcherDemo`
- A 3-way Property Switcher (Лише HTML / + CSS / + CSS + JS) applied to one real café "order" button — same markup throughout, so the HTML/CSS/JS role split from the lesson is seen on one element instead of read as three bullet points. Wired to `html-web-basics`'s "HTML, CSS і JavaScript: хто за що відповідає" — the first HTML-course lesson to get a live `interactiveDemo`.
- This is the first item off the prioritized roadmap from `interaction-audit.md` (full 84-lesson interactivity audit delivered separately, no other code changes from it yet).

## 1.14.0 — "Як використовувати" is now interactive on every lesson (HTML + CSS)

### Fixed (user-reported: static text isn't acceptable in demo-adjacent sections)
- `whenToUse` is present on all 84 hand-written lessons (both HTML and CSS courses) but rendered as a plain bullet list — no interactivity at all. Replaced with `InteractiveChecklist`: each item is now a clickable "mark as understood" button (checkmark fills in, text gets a strikethrough). Since every lesson has `whenToUse`, this guarantees every "💻 Як використовувати" card has real interactivity now, not just the lessons that also happen to have a live demo.
- Code walkthroughs (73/84 lessons) now render through `CopyableCode` — a working "Копіювати код" button with copy confirmation, instead of a static, unselectable-feeling code block.
- Comparison tables (63/84 lessons) now render through `InteractiveComparisonTable` — clicking a row highlights it, encouraging actual row-by-row comparison instead of just reading past it.
- All 3 components added directly in `LessonContent.tsx` (`CheatSheetLessonContent` only — the legacy pipeline for other courses is untouched) so this fix applies retroactively to every existing HTML and CSS lesson with zero per-lesson content changes needed.

### Scope note on "👀 Подивись у дії"
- Live interactive demos (`interactiveDemo`) currently cover 12 of 84 hand-written lessons, all in the CSS course (Flexbox, Grid, Box Model, Display, Margin/Padding, Typography, CSS Variables). The HTML course (44 lessons) has none yet. Building real per-lesson demos for the rest — HTML included — continues in prioritized batches per the "quality over quantity" directive.

## 1.13.0 — 4 more interactive demos (Typography, CSS Variables, Margin vs Padding, CSS Applied)

### New framework primitive
- `DemoColorInput` added to `demos/framework/DemoControls.tsx` (native color picker, styled to match `DemoSelect`/`DemoSlider`) — needed for the CSS Variables demo below and reusable for the upcoming Dark Mode / Theme Switch demos.

### 4 new demos, 8 total now registered
- `TypographyDemo`: live `font-size`/`line-height`/`letter-spacing`/`font-weight` controls on a real café paragraph + inline link, with an explanation that warns when line-height gets too tight or letter-spacing hurts readability. Wired to all 3 `cssTypography.ts` lessons.
- `CssVariablesDemo`: two `DemoColorInput` pickers set `--demo-primary`/`--demo-bg`, live-retheming a mini café header, price card, and link at once — the point being one token change propagates everywhere. Wired to "CSS-змінні як дизайн-токени".
- `MarginPaddingDemo`: one shared margin/padding slider pair driving two side-by-side real menu rows, isolating margin-only vs padding-only effects so the difference is visible instead of explained in prose. Wired to "Margin проти padding".
- `CssAppliedDemo`: a pure `DemoBeforeAfter` toggle — identical café header markup shown raw (browser defaults: serif font, blue underlined links, stacked divs) vs. styled (real flex nav bar) — demonstrating that HTML doesn't change, only whether CSS is linked. Wired to "Як CSS застосовується до HTML".

### Status vs. the full CSS course checklist
- 14 of 39 lessons now have a live `interactiveDemo` (Flexbox, Grid, Box Model, Display, Margin/Padding, Typography ×3, CSS Variables, CSS Applied). The remaining ~25 lessons (Selectors/Specificity, Cascade, Units, Header/Hero, Buttons/Cards, Forms/Pricing, Responsive/Container Queries, Dark Mode/Theme Switch, Animations, CSS architecture, Final Project, Audit) are still pending — next batches will keep composing the shared `framework/` primitives rather than one-off markup.

## 1.12.0 — Shared demo framework, renamed demos, gap/justify-content bug fixed

### Shared demo framework (per user directive)
- New `src/components/lesson/demos/framework/`: `DemoSection`, `DemoControls` (+ `DemoSelect`/`DemoSlider`), `DemoPreview`, `DemoCodeSnippet`, `DemoExplanation`, `DemoKeyTakeaway` (reuses the app's existing `Callout`), `DemoBeforeAfter`, `DemoHighlight` (pulse ring on change), `DemoViewport` (slider-controlled viewport simulator, ready for the upcoming Responsive Design demo), `DemoToolbar`, and `DemoAxis` (animated main-axis/cross-axis arrows that rotate when `flex-direction` changes). All 4 existing demos now compose these instead of hand-rolled markup — every future demo should too.
- Renamed the 4 existing demos per user feedback: `FlexboxPlayground` → `FlexboxDemo`, `GridPlayground` → `GridDemo`, `BoxModelPlayground` → `BoxModelDemo`, `DisplayPlayground` → `DisplayDemo`. Registry ids updated to match (`flexbox-demo`, `grid-demo`, `box-model-demo`, `display-demo`); all lesson overrides referencing the old ids updated.
- Each demo now also has a live, state-reactive `DemoExplanation` sentence (not a static caption) and a `DemoKeyTakeaway` one-liner, per the mandated 5-part demo structure (Preview → Controls → Explanation → Before/After where relevant → Key Takeaway).
- Replaced the two remaining static-SVG-only "👀 Подивись у дії" sections (Flexbox's "Flex-контейнер і вісь", Grid's "Grid-контейнер і треки") with the real interactive demo + `DemoAxis` — no lesson's "See it in action" section is text/diagram-only anymore.

### Fixed (user-reported: "тут gap не працює")
- The Flexbox demo defaulted to `justify-content: space-between`, which distributes all free space between items — on a wide preview this made the `gap` slider's own effect invisible (a few px against space-between's much larger distribution looked like nothing happened). Changed the default to `flex-start` so `gap` is visibly doing something the moment the demo loads, and added an explanation that calls out this exact interaction (gap = minimum spacing; justify-content can make the real spacing larger) instead of leaving it as a silent trap.

## 1.11.0 — Lesson flow reordered, 2 more interactive demos, completion toggle fix

### Lesson structure change (per user directive)
- Reordered `CheatSheetLessonContent` (`LessonContent.tsx`): "👀 Подивись у дії" is now its own section, positioned between "🤔 Навіщо це потрібно" and "💻 Як використовувати" — students see the diagram/live demo before the property-by-property explanation, not after. Only rendered when a lesson has `visualExplanation` and/or `interactiveDemo`; the TOC ("Зміст уроку") updates to match automatically.

### 2 more interactive demos
- `BoxModelPlayground`: live `margin`/`border`/`padding` sliders on a real café product card, with labeled margin/padding bands (the same idea DevTools shows, applied to a real component). Wired to css-box-model's "Box-модель на практиці".
- `DisplayPlayground`: a `display` select (block/inline/inline-block/flex/none) applied to 3 real category tags sitting inside a real sentence — shows line-breaking, text-flow, and disappearance behavior live. Wired to css-box-model's "Display: block, inline, none".
- 4 demos total now registered in `components/lesson/demos/index.ts`.

### Fixed (user-reported)
- "Позначити як виконано" on the lesson page could be clicked any number of times with no visual feedback and silently kept re-completing the lesson. It's now a real toggle: completing turns the button green ("Виконано ✓", `aria-pressed`) and awards XP once; clicking again reverts to "in-progress", restyles back to the primary color, and deducts the same XP back — so repeated clicking can't farm XP. Added a `success` `Button` variant and clamped `addXp` at 0 as a defensive fix.

## 1.10.0 — Live interactive demos (real React components, not images)

### New: `interactiveDemo` lesson field + demo registry
- Added `src/components/lesson/demos/` — a registry (`index.ts`) of real, state-driven React components that render actual HTML/CSS (never a screenshot or illustration). Added `Lesson.interactiveDemo?: string` (an id into the registry) and rendering support in `CheatSheetLessonContent`, right after the SVG diagram slot from 1.9.0.
- First two demos, built as proof of concept: `FlexboxPlayground` (live controls for `flex-direction`, `justify-content`, `align-items`, `gap` on a real café nav bar — logo, links, CTA button) and `GridPlayground` (live column count / `auto-fit`+`minmax` toggle / gap on a real café menu-card grid). Both show a live-updating CSS snippet under the preview so the control change, the rendered result, and the exact CSS stay visually connected. Wired onto `cssFlexbox.ts`'s "Вирівнювання, перенос і gap" and `cssGrid.ts`'s "repeat, minmax і auto-fit".
- Shared `demos.module.css` uses the same design tokens as the rest of the app (`var(--primary)`, `var(--border)`, `var(--radius)`...), so dark mode / high-contrast / custom themes work automatically with no extra code, and a `@media (max-width: 560px)` rule stacks controls on mobile.
- This is a new capability proven out on 2 lessons out of the ~16 the user's directive named; extending it to the remaining Flexbox/Grid/Box-Model/Position/Responsive/Typography/Animation lessons is follow-up work, not done in this pass.

## 1.9.0 — Inline SVG diagrams, deeper Flexbox/Grid lessons

### New: educational diagrams (no screenshots/stock images)
- Added an optional `visualExplanation?: { svg: string; caption?: string }` field to `Lesson` and a renderer in `CheatSheetLessonContent` (`LessonContent.tsx`) — an inline SVG diagram (arrows, labels, boxes, built with CSS variables so it themes correctly in dark/high-contrast/custom modes) shown inside the "💻 Як використовувати" card, right after the checklist. No new page, no new architecture — same lesson pipeline, one optional field.
- Added the first two diagrams: Flexbox main-axis/cross-axis ("Flex-контейнер і вісь") and Grid tracks/rows/columns ("Grid-контейнер і треки"). More lessons can adopt the same field going forward.

### Deepened per user's "DEEP TOPIC EXPLORATION" directive
- Rewrote the CSS Flexbox and Grid modules (`cssFlexbox.ts`, `cssGrid.ts`) significantly deeper — these are flagship topics, intentionally longer than simple single-property lessons. Each lesson now covers: the evolution story (float/table-layout → modern solution and why it changed), step-by-step browser internals (Flex/Grid Formatting Context creation), 3-tier examples (basic boxes → real café component → production-scale example like a dashboard), a Flexbox-vs-Grid comparison, edge cases (items shrinking below content size, grid overflow, missing `minmax` on `auto-fit`, layout shift from missing `aspect-ratio`), richer "common mistakes"/"best practices", 5-bullet "remember" sections, and 2-3 interview questions per lesson instead of 1.
- The café project code (`styles.css` versions v7-v11) is unchanged — this pass only deepened the *explanation* around the same practice tasks, not the project itself.

## 1.8.0 — CSS course complete (13 modules, cheat-sheet format), settings/UI polish, Monaco removed

### CSS course rewrite
- Replaced the old generic 6-module CSS course with a new 13-module, 39-lesson roadmap that continues styling the SAME café project built in the HTML course (Typography → Box Model → Flexbox → Grid → Header/Hero → Buttons/Cards → Forms/Pricing/Footer → Responsive → CSS Variables/Dark Mode → Animations → Architecture/React → Final Project), replacing `courseCatalog.json`'s `css` entry entirely.
- Hand-wrote all 13 modules in the same cheat-sheet format established for HTML (`whatIsIt`/`whyUseIt`/`whenToUse`/`whenNotToUse`/comparison tables/before-after code walkthroughs/common mistakes/best practices/remember/interview question/summary), reusing `CheatSheetLessonContent` — no renderer changes were needed. New files: `cssFoundations.ts`, `cssBoxModel.ts`, `cssTypography.ts`, `cssFlexbox.ts`, `cssGrid.ts`, `cssRealHeaderHero.ts`, `cssRealButtonsCards.ts`, `cssRealFormsPricing.ts`, `cssResponsive.ts`, `cssVariablesDarkMode.ts`, `cssAnimations.ts`, `cssArchitectureReact.ts`, `cssFinalProject.ts`.
- Covers modern CSS only (Flexbox, Grid, CSS variables as design tokens, `clamp()`/`min()`/`max()`, container queries, `aspect-ratio`, `object-fit`, `prefers-color-scheme`, `prefers-reduced-motion`) with outdated techniques (float layouts, table layouts) mentioned only as historical context. The architecture module explicitly connects the finished CSS to React: CSS Modules, conditional classes, and a BEM vs. CSS Modules vs. utility-first comparison.
- All 39 lesson titles verified to match `courseCatalog.json` exactly; all `microExercise.kind` values verified against the valid union.

### Fixed (user-reported)
- Practice-tab solution block (`<pre>` in `PracticePage.tsx`) had no styling and overflowed its card on long code lines. Added a dedicated `.solutionCode` class (scrollable, wrapped) and `min-width: 0` on `.card` (a grid item's implicit `min-width: auto` was preventing it from shrinking).
- Search input had a confusing double border (grey pill wrapper + separate blue inner rectangle) caused by a specificity tie between a global `:focus-visible` rule and the component's `outline: 0`. Fixed by giving `.input:focus-visible` unambiguously higher specificity and moving the visible focus ring to the outer wrapper via `:focus-within`.
- Settings page had flat, unstyled rows. Added hover states, better label weight, styled checkboxes (`accent-color`), focus rings on inputs/selects, and a mobile-friendly stacked layout under 560px.

### Removed
- Deleted the entire `src/features/playground` Monaco-based code editor feature and its `CodePractice.tsx` wrapper — confirmed unused anywhere in the running app (lesson practice has used the static `LessonPractice.tsx` view since 1.x) and reported as unstable. Removed the now-dead `editorFontSize`/`codeFont` settings from `PlatformSettings`, `PlatformContext`, and the Settings page, and dropped the `@monaco-editor/react`/`monaco-editor` dependencies from `package.json`.
- **Known issue from this pass**: removing the Monaco packages via `npm uninstall` in the sandbox, followed by a cleanup attempt, left `node_modules`/`package-lock.json` in a broken state that the sandbox's restricted network couldn't repair (registry access returns 403 here). `package.json` itself is correct. Run `npm install` locally once before your next `npm run dev`/`build`/`test` — this will regenerate a clean lockfile and `node_modules` with no Monaco packages.

## 1.7.0 — Mini-project steps, sidebar fix, rebrand to "Free Frontend"

### Fixed (user-reported)
- Mini-project lessons (CV page, landing, blog, restaurant site, portfolio, product page) jumped straight from an empty starter file to one big final solution, with no guidance in between. Added an optional `PracticeStep[]` to `PracticeTask` and a numbered walkthrough in `LessonPractice.tsx` — each of the 6 mini-projects now has 3-5 cumulative steps (each with a title, a one-line explanation, and the code so far) building up to the full page.
- Sidebar course cards: a long single Ukrainian word with no space to break on (e.g. "Продуктивність") could overflow its box and push the level badge outside the rounded card border. Fixed two ways: widened the sidebar (280px → 320px) so this only kicks in at extreme widths, and changed the card header to `flex-wrap` so if a title+badge still don't fit on one line, the badge drops to its own line instead of the title breaking mid-word.

### Rebrand
- Renamed the app from "Frontend Roadmap Academy" everywhere it appeared (`<title>`, meta description, header brand text, courses page eyebrow/title, default demo usernames) to **Free Frontend**.
- Added a favicon (`public/favicon.svg`, an indigo rounded square with a `</>` mark) and referenced it from `index.html` (`rel="icon"` + `rel="apple-touch-icon"`).

## 1.6.0 — HTML course: all 15 modules now hand-written (course actually complete)

### The gap this closes
- 1.4.0/1.5.0 hand-wrote 8 of 15 HTML modules (21 lessons) and left the remaining 7 modules (Форми, Доступність, SEO, Реальні компоненти, Мислення, Помилки, Міні-проєкти — 24 lessons) on the generic per-course generator as a scope call. That was a mistake: those 24 lessons still rendered the old "Теорія" documentation-style layout, so roughly half the course didn't match the new cheat-sheet format at all. This pass hand-writes all of them in the same tight format, so the HTML course is now 100% hand-written, all 45 lessons.
- New files: `htmlForms.ts` (5 lessons — continues the café booking form, v16→v21), `htmlAccessibility.ts` (3 lessons), `htmlSeo.ts` (3 lessons — finishes the café `<head>`, v21→v24), `htmlRealComponents.ts` (4 lessons — assembles header/hero/footer/article patterns, v24→v27, plus a store product-card example for variety), `htmlThinking.ts` (2 lessons — how to turn a Figma design into semantic structure), `htmlMistakes.ts` (1 lesson — a single scannable table of the course's 10 worst beginner mistakes), `htmlMiniProjects.ts` (6 lessons — CV page, landing page, blog page, restaurant site, portfolio, product page: independent projects so the student applies everything without copying the café example).
- All 7 new files registered in `handwritten/index.ts`; every lesson title verified to match `courseCatalog.json` exactly (override lookup is exact-string keyed, so a mismatch would have silently fallen back to the generic generator).
- Caught and fixed a real type bug during this pass: two micro-exercises (one in `htmlSemantics.ts` from 1.5.0, one newly introduced in `htmlRealComponents.ts`) used a `kind` value that isn't in the `MicroExercise` union — both fixed to `"choice"`, which the exercise's shape already matched.
- Same safety guarantee as 1.5.0: the renderer only switches to the cheat-sheet layout when `lesson.whatIsIt` is set, so no other course is affected.

## 1.5.0 — HTML course: cheat-sheet format (removed "Теорія", added tables)

### HTML course only — no other course was touched
- Removed the "Теорія" section entirely from all 21 hand-written HTML lessons. Lessons no longer explain a concept because it exists — every remaining paragraph answers one of: what is it, why do I need it, when to use it, when not to, what mistakes beginners make, what to remember.
- Collapsed the lesson layout to 9 sections, each 1–4 lines per block: 🎯 Що це? → 🤔 Навіщо → 💻 Як використовувати (checklist + comparison table + short syntax snippet) → ❌ Чого НЕ робити (bad example + why) → 🛠 Практика → ✅ Як роблять у реальних проєктах → 🧠 Запам'ятай (max 5) → 🎤 Питання на співбесіді → 📚 Коротко.
- Added a `comparisonTable` field and renderer support — every lesson that has a natural element/attribute comparison (ul vs ol, strong vs b, a vs button, th scope=col vs row, article vs section vs aside, etc.) now shows it as a real table instead of a paragraph.
- Removed the generic `learningObjectives` list from the hand-written-lesson view (dead weight once "Чого ти навчишся" was cut) and made `CodeWalkthrough.before`/`.after` optional so a syntax snippet can stand alone without forced framing prose.
- The renderer now branches on `lesson.whatIsIt`: hand-written HTML lessons get the new cheat-sheet layout (`CheatSheetLessonContent`), every other course (and any HTML lesson without an override) keeps the exact previous rendering path (`LegacyLessonContent`) — zero risk of regressing the other 9 courses.
- Fixed a real type bug this pass surfaced: one micro-exercise used a `kind` value (`"which-is-more-semantic"`) that didn't exist in the `MicroExercise` union — changed to `"choice"`, which the exercise's shape already matched.

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
