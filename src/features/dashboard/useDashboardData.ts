import { courses } from "../../data/courses";
import type { ProgressMap, QuizProgressMap } from "../../utils/progress";
import { getAllLessons, getCourseProgress, getLearningStats, getOverallProgress } from "../../utils/progress";

export function useDashboardData(lessonProgress: ProgressMap, quizProgress: QuizProgressMap, activityLog: string[] = []) {
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
  const lastLesson = nextLesson ?? lessons[0];

  return { overall, learningStats, completedCourses, lastLesson, allCompleted, courses };
}
