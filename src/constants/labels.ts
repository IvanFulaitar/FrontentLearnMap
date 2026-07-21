import type { CourseLevel, LessonDifficulty, LessonStatus, LessonType } from "../types/course";
import type { ResourceCategory } from "../types/platform";

/**
 * Centralized UI labels for values that are stored internally as English
 * enum-like identifiers (status, difficulty, level, type). Components must
 * render through these maps instead of the raw identifier, otherwise the
 * interface leaks English strings regardless of the current locale.
 */
export const lessonStatusLabels: Record<LessonStatus, string> = {
  "not-started": "Не розпочато",
  "in-progress": "У процесі",
  completed: "Завершено",
};

export const lessonTypeLabels: Record<LessonType, string> = {
  theory: "Теорія",
  practice: "Практика",
  quiz: "Тест",
};

export const lessonDifficultyLabels: Record<LessonDifficulty, string> = {
  Easy: "Легкий",
  Medium: "Середній",
  Hard: "Складний",
};

export const courseLevelLabels: Record<CourseLevel, string> = {
  Beginner: "Початковий",
  Intermediate: "Середній",
  Advanced: "Просунутий",
};

export const resourceCategoryLabels: Record<ResourceCategory, string> = {
  "Official Docs": "Офіційна документація",
  Videos: "Відео",
  Articles: "Статті",
  YouTube: "YouTube",
  GitHub: "GitHub",
  "Cheat Sheets": "Шпаргалки",
  "Practice Sites": "Сайти для практики",
};

export const searchResultTypeLabels: Record<string, string> = {
  course: "Курс",
  module: "Модуль",
  lesson: "Урок",
  practice: "Практика",
  resource: "Ресурс",
};
