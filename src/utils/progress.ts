import { courses } from "../data/courses";
import { practiceTasks } from "../data/practice";
import { platformProjects } from "../data/projects";
import { resources } from "../data/resources";
import type { Course, Lesson, LessonLocation, LessonStatus, Module } from "../types/course";

export type ProgressMap = Record<string, LessonStatus>;
export type QuizProgressMap = Record<string, number>;

export const getLessonKey = (courseId: string, moduleId: string, lessonId: string) =>
  `${courseId}:${moduleId}:${lessonId}`;

export const getQuizKey = (courseId: string, moduleId: string, quizId: string) =>
  `${courseId}:${moduleId}:${quizId}`;

export const getLessonStatus = (
  lesson: Lesson,
  progress: ProgressMap,
  courseId: string,
  moduleId: string,
) => progress[getLessonKey(courseId, moduleId, lesson.id)] ?? lesson.status;

export const getAllLessons = (source: Course[] = courses): LessonLocation[] =>
  source.flatMap((course) =>
    course.modules.flatMap((module) =>
      module.lessons.map((lesson) => ({ course, module, lesson })),
    ),
  );

export const getCourseProgress = (course: Course, progress: ProgressMap) => {
  const lessons = course.modules.flatMap((module) =>
    module.lessons.map((lesson) => ({
      lesson,
      status: getLessonStatus(lesson, progress, course.id, module.id),
    })),
  );
  const completed = lessons.filter((item) => item.status === "completed").length;
  return {
    completed,
    total: lessons.length,
    percent: lessons.length ? Math.round((completed / lessons.length) * 100) : 0,
  };
};

export const getModuleProgress = (course: Course, module: Module, progress: ProgressMap) => {
  const completed = module.lessons.filter(
    (lesson) => getLessonStatus(lesson, progress, course.id, module.id) === "completed",
  ).length;
  const total = module.lessons.length;
  return {
    completed,
    total,
    percent: total ? Math.round((completed / total) * 100) : 0,
    isCompleted: total > 0 && completed === total,
  };
};

export const getModuleMeta = (module: Module) => ({
  lessonCount: module.lessons.length,
  quizCount: 1 + module.lessons.filter((lesson) => lesson.quiz).length,
  estimatedTime: module.lessons.reduce((total, lesson) => total + lesson.estimatedTime, 0) + module.project.estimatedTime,
  practiceCount: module.lessons.filter((lesson) => lesson.type === "practice").length,
});

export const getOverallProgress = (progress: ProgressMap) => {
  const lessons = getAllLessons();
  const completed = lessons.filter(
    ({ course, module, lesson }) => getLessonStatus(lesson, progress, course.id, module.id) === "completed",
  ).length;
  return {
    completed,
    total: lessons.length,
    percent: lessons.length ? Math.round((completed / lessons.length) * 100) : 0,
  };
};

const MS_PER_DAY = 86_400_000;

/**
 * Real day-based streak from an activity log (array of "YYYY-MM-DD" strings,
 * one per day with any completed lesson or graded quiz). Replaces the old
 * `longestStreak` formula, which was actually `completedLessons + passedTests`
 * capped at 14 — a proxy with no relationship to actual consecutive days,
 * despite being labeled "найдовша серія днів" on the dashboard.
 */
export const getStreak = (activityLog: string[]): { current: number; longest: number } => {
  const days = [...new Set(activityLog)].sort();
  if (days.length === 0) return { current: 0, longest: 0 };

  let longest = 1;
  let run = 1;
  for (let i = 1; i < days.length; i += 1) {
    const diff = Math.round((new Date(days[i]).getTime() - new Date(days[i - 1]).getTime()) / MS_PER_DAY);
    run = diff === 1 ? run + 1 : 1;
    longest = Math.max(longest, run);
  }

  const today = new Date().toISOString().slice(0, 10);
  const lastDay = days[days.length - 1];
  const diffFromToday = Math.round((new Date(today).getTime() - new Date(lastDay).getTime()) / MS_PER_DAY);

  // The streak only still counts if the learner was active today or
  // yesterday — otherwise it's broken, even though `longest` (the record) is
  // preserved.
  let current = 0;
  if (diffFromToday <= 1) {
    current = 1;
    for (let i = days.length - 1; i > 0; i -= 1) {
      const diff = Math.round((new Date(days[i]).getTime() - new Date(days[i - 1]).getTime()) / MS_PER_DAY);
      if (diff === 1) current += 1;
      else break;
    }
  }

  return { current, longest };
};

export const getLearningStats = (progress: ProgressMap, quizProgress: QuizProgressMap, activityLog: string[] = []) => {
  const lessons = getAllLessons();
  const completedLessons = lessons.filter(
    ({ course, module, lesson }) => getLessonStatus(lesson, progress, course.id, module.id) === "completed",
  );
  const completedPractices = completedLessons.filter(({ lesson }) => lesson.type === "practice").length;
  const passedTests = Object.values(quizProgress).filter((score) => score >= 60).length;
  const streak = getStreak(activityLog);

  return {
    completedLessons: completedLessons.length,
    completedPractices,
    passedTests,
    totalStudyDays: activityLog.length,
    currentStreak: streak.current,
    longestStreak: streak.longest,
  };
};

export type SearchResult =
  | { type: "course"; title: string; description: string; href: string; tags: string[] }
  | { type: "module"; title: string; description: string; href: string; tags: string[] }
  | { type: "lesson"; title: string; description: string; href: string; tags: string[] }
  | { type: "practice"; title: string; description: string; href: string; tags: string[] }
  | { type: "project"; title: string; description: string; href: string; tags: string[] }
  | { type: "resource"; title: string; description: string; href: string; tags: string[] };

export const searchLearningContent = (query: string): SearchResult[] => {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];

  const results: SearchResult[] = [];

  courses.forEach((course) => {
    const courseText = `${course.title} ${course.description} ${course.level}`.toLowerCase();
    if (courseText.includes(normalized)) {
      results.push({
        type: "course",
        title: course.title,
        description: course.description,
        href: `/courses/${course.id}`,
        tags: [course.level],
      });
    }

    course.modules.forEach((module) => {
      const moduleText = `${module.title} ${module.description} ${module.project.title}`.toLowerCase();
      if (moduleText.includes(normalized)) {
        results.push({
          type: "module",
          title: module.title,
          description: module.description,
          href: `/courses/${course.id}`,
          tags: [course.title, `${module.lessons.length} lessons`],
        });
      }

      module.lessons.forEach((lesson) => {
        const lessonText = `${lesson.title} ${lesson.description} ${lesson.tags.join(" ")} ${lesson.practiceTask.title}`.toLowerCase();
        if (lessonText.includes(normalized)) {
          const href = `/courses/${course.id}/modules/${module.id}/lessons/${lesson.id}`;
          results.push({
            type: "lesson",
            title: lesson.title,
            description: lesson.description,
            href,
            tags: [course.title, lesson.type, lesson.difficulty],
          });
          if (lesson.type === "practice") {
            results.push({
              type: "practice",
              title: lesson.practiceTask.title,
              description: lesson.practiceTask.description,
              href,
              tags: [course.title, "Practice"],
            });
          }
        }
      });
    });
  });

  practiceTasks.forEach((task) => {
    if (`${task.title} ${task.description} ${task.category}`.toLowerCase().includes(normalized)) {
      results.push({ type: "practice", title: task.title, description: task.description, href: "/practice", tags: [task.category, task.difficulty] });
    }
  });

  platformProjects.forEach((project) => {
    if (`${project.title} ${project.description} ${project.technologies.join(" ")}`.toLowerCase().includes(normalized)) {
      results.push({ type: "project", title: project.title, description: project.description, href: "/projects", tags: [project.level, project.difficulty] });
    }
  });

  resources.forEach((resource) => {
    if (`${resource.title} ${resource.description} ${resource.tags.join(" ")}`.toLowerCase().includes(normalized)) {
      results.push({ type: "resource", title: resource.title, description: resource.description, href: "/resources", tags: [resource.category] });
    }
  });

  return results.slice(0, 12);
};

export const findLesson = (courseId?: string, moduleId?: string, lessonId?: string) => {
  const course = courses.find((item) => item.id === courseId);
  const module = course?.modules.find((item) => item.id === moduleId);
  const lesson = module?.lessons.find((item) => item.id === lessonId);
  return course && module && lesson ? { course, module, lesson } : null;
};

export const getNeighborLessons = (courseId: string, moduleId: string, lessonId: string) => {
  const flattened = getAllLessons();
  const index = flattened.findIndex(
    (item) => item.course.id === courseId && item.module.id === moduleId && item.lesson.id === lessonId,
  );
  return {
    previous: index > 0 ? flattened[index - 1] : null,
    next: index >= 0 && index < flattened.length - 1 ? flattened[index + 1] : null,
  };
};
