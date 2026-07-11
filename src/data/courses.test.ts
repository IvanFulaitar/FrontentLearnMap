import { describe, expect, it } from "vitest";
import { courses } from "./courses";
import { lessonDemos } from "../components/lesson/demos";

/**
 * Regression coverage for the generated-content pipeline (makeLesson /
 * makeModule / slugify). This suite exists because a signed bit-shift bug in
 * the content-variety seeding (`seed >> 2` instead of `seed >>> 2`) crashed
 * roughly half of all generated lessons at runtime with
 * "descriptionVariants[...] is not a function" — and nothing caught it
 * before a user hit it in the browser. Importing `courses` here forces every
 * lesson across every course to be generated during the test run, so a
 * similar crash fails the test suite instead of shipping.
 */
describe("courses data generation", () => {
  const allLessons = courses.flatMap((course) =>
    course.modules.flatMap((module) => module.lessons.map((lesson) => ({ course, module, lesson }))),
  );

  it("generates at least one course with at least one module and lesson", () => {
    expect(courses.length).toBeGreaterThan(0);
    expect(allLessons.length).toBeGreaterThan(0);
  });

  it("gives every lesson a non-empty, unique id (regression: Cyrillic-only titles used to collide)", () => {
    const ids = allLessons.map(({ lesson }) => lesson.id);
    ids.forEach((id) => expect(id).toBeTruthy());
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("produces a real slug (not a bare hash fallback) for a Cyrillic-only lesson title", () => {
    // "Текстові елементи та ієрархія" has zero ASCII letters — this is
    // exactly the case that used to collapse to an empty/duplicate id.
    const lesson = allLessons.find(({ lesson: l }) => l.title === "Текстові елементи та ієрархія");
    expect(lesson).toBeDefined();
    expect(lesson!.lesson.id).toMatch(/tekstovi-elementy/);
  });

  it("never throws while building theory/description/examples for any lesson (regression for the >> vs >>> seed bug)", () => {
    allLessons.forEach(({ lesson }) => {
      expect(typeof lesson.description).toBe("string");
      expect(lesson.description.length).toBeGreaterThan(0);
      expect(typeof lesson.theory).toBe("string");
      expect(lesson.theory.length).toBeGreaterThan(0);
      expect(Array.isArray(lesson.examples)).toBe(true);
      expect(lesson.examples.length).toBeGreaterThan(0);
    });
  });

  it("gives every lesson a two-step theory and a narrated code walkthrough", () => {
    allLessons.forEach(({ lesson }) => {
      expect(lesson.theorySteps?.length).toBeGreaterThanOrEqual(2);
      expect(lesson.codeWalkthroughs?.length).toBeGreaterThanOrEqual(1);
      expect(lesson.codeWalkthroughs?.[0].lineNotes?.length).toBeGreaterThan(0);
    });
  });

  it("gives every lesson real-world usage and best-practice/variant notes", () => {
    allLessons.forEach(({ lesson }) => {
      expect(lesson.realWorldUsage?.length).toBeGreaterThan(0);
      expect(lesson.bestPractices?.length).toBeGreaterThan(0);
    });
  });

  it("keeps quiz correct answers among the listed options for single/multiple/true-false questions", () => {
    allLessons.forEach(({ lesson }) => {
      lesson.quiz.questions.forEach((question) => {
        if (question.type === "true-false") {
          expect(typeof question.correctAnswer).toBe("boolean");
          return;
        }
        const correct = Array.isArray(question.correctAnswer) ? question.correctAnswer : [question.correctAnswer];
        correct.forEach((answer) => {
          expect(question.options).toContain(answer);
        });
      });
    });
  });

  it("only attaches optionExplanations to options that actually exist on the question", () => {
    allLessons.forEach(({ lesson }) => {
      lesson.quiz.questions.forEach((question) => {
        if (!question.optionExplanations) return;
        Object.keys(question.optionExplanations).forEach((key) => {
          expect(question.options).toContain(key);
        });
      });
    });
  });

  it("does not repeat the exact same code example across every lesson in a course (regression: one static template per course)", () => {
    courses.forEach((course) => {
      const lessons = course.modules.flatMap((module) => module.lessons);
      if (lessons.length < 4) return;
      const distinctExamples = new Set(lessons.map((lesson) => lesson.codeExample));
      expect(distinctExamples.size).toBeGreaterThan(1);
    });
  });
});

describe("vscode-setup onboarding course", () => {
  it("is the very first course, so it appears before HTML everywhere course order is used (sidebar, catalog grid...)", () => {
    expect(courses[0]?.id).toBe("vscode-setup");
    expect(courses[1]?.id).toBe("html");
  });

  it("has all 8 lessons of its single module, in the intended order", () => {
    const course = courses.find((c) => c.id === "vscode-setup");
    expect(course).toBeDefined();
    expect(course!.modules).toHaveLength(1);
    expect(course!.modules[0].lessons.map((lesson) => lesson.title)).toEqual([
      "Що таке VS Code",
      "Встановлення VS Code",
      "Файли й папки",
      "Інтерфейс VS Code",
      "Термінал",
      "Розширення",
      "Форматування коду",
      "Запуск першої HTML-сторінки",
    ]);
  });

  it("hand-writes whatIsIt for every lesson (renders the beginner-friendly cheat-sheet layout, not the generic generated layout)", () => {
    const course = courses.find((c) => c.id === "vscode-setup");
    course!.modules[0].lessons.forEach((lesson) => {
      expect(lesson.whatIsIt).toBeTruthy();
    });
  });

  it("gives every lesson an interactiveDemo id, and every id resolves to a registered component (regression: dangling demo id would render nothing)", () => {
    const course = courses.find((c) => c.id === "vscode-setup");
    course!.modules[0].lessons.forEach((lesson) => {
      expect(lesson.interactiveDemo).toBeTruthy();
      expect(lessonDemos[lesson.interactiveDemo!]).toBeDefined();
    });
  });
});
