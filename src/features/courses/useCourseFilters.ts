import { useMemo } from "react";
import { courses } from "../../data/courses";
import type { Lesson, LessonStatus } from "../../types/course";
import type { ProgressMap } from "../../utils/progress";
import { getLessonStatus } from "../../utils/progress";

export type CourseFilter = "all" | LessonStatus | Lesson["type"];

const matchesLesson = (
  lesson: Lesson,
  courseTitle: string,
  courseId: string,
  moduleId: string,
  query: string,
  filter: CourseFilter,
  progress: ProgressMap,
) => {
  const search = query.trim().toLowerCase();
  const searchable = `${courseTitle} ${lesson.title} ${lesson.description} ${lesson.tags.join(" ")}`.toLowerCase();
  const status = getLessonStatus(lesson, progress, courseId, moduleId);
  return (!search || searchable.includes(search)) && (filter === "all" || status === filter || lesson.type === filter);
};

/** Keeps course filtering rules in one place for roadmap and search-like views. */
export function useCourseFilters(courseId: string | undefined, query: string, filter: CourseFilter, progress: ProgressMap) {
  const selectedCourse = useMemo(() => courses.find((course) => course.id === courseId), [courseId]);

  const filteredCourses = useMemo(() => {
    if (!query.trim() && filter === "all") return courses;
    return courses.filter((course) =>
      course.modules.some((module) =>
        module.lessons.some((lesson) => matchesLesson(lesson, course.title, course.id, module.id, query, filter, progress)),
      ),
    );
  }, [filter, progress, query]);

  const visibleModules = useMemo(() => {
    if (!selectedCourse) return [];
    return selectedCourse.modules
      .map((module) => ({
        ...module,
        lessons: module.lessons.filter((lesson) =>
          matchesLesson(lesson, selectedCourse.title, selectedCourse.id, module.id, query, filter, progress),
        ),
      }))
      .filter((module) => module.lessons.length > 0);
  }, [filter, progress, query, selectedCourse]);

  return { selectedCourse, filteredCourses, visibleModules };
}
