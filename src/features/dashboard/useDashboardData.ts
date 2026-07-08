import { courses } from "../../data/courses";
import type { LastOpenedLesson } from "../../hooks/useProgress";
import type { ProgressMap, QuizProgressMap } from "../../utils/progress";
import { getAllLessons, getCourseProgress, getLearningStats, getOverallProgress } from "../../utils/progress";

export function useDashboardData(
  lessonProgress: ProgressMap,
  quizProgress: QuizProgressMap,
  activityLog: string[] = [],
  lastOpenedLesson: LastOpenedLesson | null = null,
) {
  const overall = getOverallProgress(lessonProgress);
  const learningStats = getLearningStats(lessonProgress, quizProgress, activityLog);
  const completedCourses = courses.filter((course) => getCourseProgress(course, lessonProgress).percent === 100).length;
  const lessons = getAllLessons();
  const nextLesson = lessons.find(
    ({ course, module, lesson }) => lessonProgress[`${course.id}:${module.id}:${lesson.id}`] !== "completed",
  );
  // When every lesson is completed, `nextLesson` is undefined — previously
  // this silently fell back to `lessons[0]`, which mislabeled an already
  // finished lesson as "continue here." Surface that as an explicit flag
  // instead so the UI can show a "course complete" state.
  const allCompleted = !nextLesson;

  // Prefer the lesson the learner actually last opened (real navigation) over
  // the "next incomplete lesson in catalog order" heuristic — a learner who
  // jumps ahead or revisits an earlier lesson should see THAT lesson on the
  // "Останній відкритий урок" card, not whatever comes next sequentially.
  const openedLesson = lastOpenedLesson
    ? lessons.find(
        ({ course, module, lesson }) =>
          course.id === lastOpenedLesson.courseId &&
          module.id === lastOpenedLesson.moduleId &&
          lesson.id === lastOpenedLesson.lessonId,
      )
    : undefined;
  const lastLesson = (!allCompleted && openedLesson) || nextLesson || lessons[0];

  return { overall, learningStats, completedCourses, lastLesson, allCompleted, courses };
}
