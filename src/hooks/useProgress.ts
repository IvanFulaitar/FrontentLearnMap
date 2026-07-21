import { useCallback, useEffect, useState } from "react";
import type { LessonStatus } from "../types/course";
import type { ProgressMap, QuizProgressMap } from "../utils/progress";
import { getLessonKey, getQuizKey } from "../utils/progress";

// Exported so other contexts (e.g. PlatformContext, for real progress-based
// achievements) can read/subscribe to the same storage without a second,
// out-of-sync copy of the key/event names.
export const LESSON_PROGRESS_KEY = "frontend-academy:lesson-progress";
export const QUIZ_PROGRESS_KEY = "frontend-academy:quiz-progress";
export const ACTIVITY_LOG_KEY = "frontend-academy:activity-log";
export const LAST_LESSON_KEY = "frontend-academy:last-opened-lesson";
// Standalone /practice tasks (src/data/practice.ts) are a separate list from
// in-lesson practiceTask completions — this is their own completion map so
// "Позначити виконаним" on that page actually persists and feeds into the
// same "виконаних практик" stat instead of being purely decorative.
export const PRACTICE_TASK_PROGRESS_KEY = "frontend-academy:practice-task-progress";
export const PROGRESS_SYNC_EVENT = "frontend-academy:progress-sync";
// One entry per calendar day, listing which kinds of real activity happened
// that day ("lesson" / "practice" / "quiz-passed" / "js-lesson") — lets the
// dashboard's daily challenges auto-detect completion from actual learning
// activity instead of a manual, honor-system checkbox.
export const DAILY_EVENTS_KEY = "frontend-academy:daily-events";
export type DailyEventMap = Record<string, string[]>;

export type LastOpenedLesson = {
  courseId: string;
  moduleId: string;
  lessonId: string;
  openedAt: string;
};

const todayKey = () => new Date().toISOString().slice(0, 10);

const readStorage = <T,>(key: string, fallback: T): T => {
  try {
    const rawValue = localStorage.getItem(key);
    return rawValue ? (JSON.parse(rawValue) as T) : fallback;
  } catch {
    return fallback;
  }
};

export function useProgressState() {
  const [lessonProgress, setLessonProgress] = useState<ProgressMap>(() =>
    readStorage<ProgressMap>(LESSON_PROGRESS_KEY, {}),
  );
  const [quizProgress, setQuizProgress] = useState<QuizProgressMap>(() =>
    readStorage<QuizProgressMap>(QUIZ_PROGRESS_KEY, {}),
  );
  // One entry per calendar day (YYYY-MM-DD) with any completed lesson or
  // graded quiz, used to compute a real day-based streak instead of the old
  // proxy formula (`completedLessons + passedTests`, capped at 14) that was
  // labeled "найдовша серія днів" but had nothing to do with actual days.
  const [activityLog, setActivityLog] = useState<string[]>(() => readStorage<string[]>(ACTIVITY_LOG_KEY, []));
  // The actual last-visited lesson (distinct from "next incomplete lesson" —
  // a learner may jump ahead or revisit an earlier lesson, and the dashboard
  // hero should reflect where they really were, not just catalog order).
  const [lastOpenedLesson, setLastOpenedLessonState] = useState<LastOpenedLesson | null>(() =>
    readStorage<LastOpenedLesson | null>(LAST_LESSON_KEY, null),
  );
  const [practiceTaskProgress, setPracticeTaskProgress] = useState<Record<string, boolean>>(() =>
    readStorage<Record<string, boolean>>(PRACTICE_TASK_PROGRESS_KEY, {}),
  );

  useEffect(() => {
    localStorage.setItem(LESSON_PROGRESS_KEY, JSON.stringify(lessonProgress));
  }, [lessonProgress]);

  useEffect(() => {
    localStorage.setItem(QUIZ_PROGRESS_KEY, JSON.stringify(quizProgress));
  }, [quizProgress]);

  useEffect(() => {
    localStorage.setItem(ACTIVITY_LOG_KEY, JSON.stringify(activityLog));
  }, [activityLog]);

  useEffect(() => {
    const syncProgress = () => {
      setLessonProgress(readStorage<ProgressMap>(LESSON_PROGRESS_KEY, {}));
      setQuizProgress(readStorage<QuizProgressMap>(QUIZ_PROGRESS_KEY, {}));
      setActivityLog(readStorage<string[]>(ACTIVITY_LOG_KEY, []));
      setLastOpenedLessonState(readStorage<LastOpenedLesson | null>(LAST_LESSON_KEY, null));
      setPracticeTaskProgress(readStorage<Record<string, boolean>>(PRACTICE_TASK_PROGRESS_KEY, {}));
    };

    window.addEventListener("storage", syncProgress);
    window.addEventListener(PROGRESS_SYNC_EVENT, syncProgress);
    return () => {
      window.removeEventListener("storage", syncProgress);
      window.removeEventListener(PROGRESS_SYNC_EVENT, syncProgress);
    };
  }, []);

  const recordActivity = useCallback(() => {
    const today = todayKey();
    setActivityLog((current) => {
      if (current.includes(today)) return current;
      const next = [...current, today].sort();
      localStorage.setItem(ACTIVITY_LOG_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const recordDailyEvent = useCallback((eventType: string) => {
    const today = todayKey();
    try {
      const map = readStorage<DailyEventMap>(DAILY_EVENTS_KEY, {});
      const todayEvents = map[today] ?? [];
      if (todayEvents.includes(eventType)) return;
      const next = { ...map, [today]: [...todayEvents, eventType] };
      localStorage.setItem(DAILY_EVENTS_KEY, JSON.stringify(next));
      window.dispatchEvent(new Event(PROGRESS_SYNC_EVENT));
    } catch {
      // Best-effort — daily-challenge auto-detection simply won't fire for
      // this event if storage is unavailable, nothing else depends on it.
    }
  }, []);

  const recordLessonOpened = useCallback((courseId: string, moduleId: string, lessonId: string) => {
    const entry: LastOpenedLesson = { courseId, moduleId, lessonId, openedAt: new Date().toISOString() };
    localStorage.setItem(LAST_LESSON_KEY, JSON.stringify(entry));
    setLastOpenedLessonState(entry);
    window.dispatchEvent(new Event(PROGRESS_SYNC_EVENT));
  }, []);

  const setLessonStatus = useCallback(
    (
      courseId: string,
      moduleId: string,
      lessonId: string,
      status: LessonStatus,
      meta?: { isPractice?: boolean },
    ) => {
      setLessonProgress((current) => {
        const next = {
          ...current,
          [getLessonKey(courseId, moduleId, lessonId)]: status,
        };
        localStorage.setItem(LESSON_PROGRESS_KEY, JSON.stringify(next));
        window.dispatchEvent(new Event(PROGRESS_SYNC_EVENT));
        return next;
      });
      if (status === "completed") {
        recordActivity();
        recordDailyEvent("lesson");
        if (meta?.isPractice) recordDailyEvent("practice");
        if (courseId === "javascript") recordDailyEvent("js-lesson");
      }
    },
    [recordActivity, recordDailyEvent],
  );

  const setPracticeTaskStatus = useCallback((taskId: string, completed: boolean) => {
    setPracticeTaskProgress((current) => {
      const next = { ...current, [taskId]: completed };
      localStorage.setItem(PRACTICE_TASK_PROGRESS_KEY, JSON.stringify(next));
      window.dispatchEvent(new Event(PROGRESS_SYNC_EVENT));
      return next;
    });
    if (completed) {
      recordActivity();
      recordDailyEvent("practice");
    }
  }, [recordActivity, recordDailyEvent]);

  const saveQuizScore = useCallback((courseId: string, moduleId: string, quizId: string, score: number) => {
    setQuizProgress((current) => {
      const next = {
        ...current,
        [getQuizKey(courseId, moduleId, quizId)]: Math.max(current[getQuizKey(courseId, moduleId, quizId)] ?? 0, score),
      };
      localStorage.setItem(QUIZ_PROGRESS_KEY, JSON.stringify(next));
      window.dispatchEvent(new Event(PROGRESS_SYNC_EVENT));
      return next;
    });
    recordActivity();
    if (score >= 60) recordDailyEvent("quiz-passed");
  }, [recordActivity, recordDailyEvent]);

  return {
    lessonProgress,
    quizProgress,
    activityLog,
    lastOpenedLesson,
    practiceTaskProgress,
    setLessonStatus,
    saveQuizScore,
    recordLessonOpened,
    setPracticeTaskStatus,
  };
}
