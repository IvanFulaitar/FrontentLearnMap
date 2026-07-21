# How To Add Content

## Course

Add course structure in `src/data/content/courseCatalog.json`. The renderer in `src/data/courses.ts` expands catalog entries into full lessons with objectives, theory, practice, quizzes, resources and module projects.

## Lesson

Add a lesson title to a module in `courseCatalog.json`. Keep titles specific and job-relevant, for example `Accessible error messages`, `AbortController`, or `React profiler`.

Lesson data is expanded in `src/data/courses.ts`. The generated lesson contract supports playground fields such as `supportsPlayground`, `language`, `starterCode`, `solutionCode`, `previewEnabled` and `consoleEnabled`.

## Playground Files

Use structured files instead of hardcoded component content. A playground file should include:

- `path` for stable identity and file explorer display.
- `label` for editor tabs.
- `language` as one of `html`, `css`, `javascript`, `typescript`, `tsx`, `json`, `markdown` or `bash`.
- `code` with the starter or solution source.
- `readOnly` when the learner should inspect but not edit the file.

Example:

```ts
starterCode: [
  {
    path: "index.html",
    label: "index.html",
    language: "html",
    code: "<main>\n  <h1>Profile card</h1>\n</main>",
  },
]
```

## Quiz

Module and lesson quizzes are generated from course/module/lesson metadata. Quizzes support `single`, `multiple`, `true-false` and `code` questions.

## Project

Module projects live in `src/data/courses.ts` (per-module `project` field, rendered via `ProjectBrief`). The standalone `/projects` portfolio-list page was removed — it was procedurally generated with byte-identical descriptions across all entries.

## Task (/tasks page)

Add a `CodingChallenge` in `src/data/tasks.ts`. Include category, difficulty, requirements, starter code, hints, solution and xpReward. Practice and Challenges used to be two separate, near-identical pages/data files — they were merged into one curated list. Keep new tasks distinct in topic from existing ones in the same category; don't just pad the count.

## Resource

Add a `LearningResource` in `src/data/resources.ts`. The global search indexes title, description and tags.
