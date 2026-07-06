import { useCallback, useEffect, useState } from "react";
import type { LessonStatus } from "../types/course";
import type { ProgressMap, QuizProgressMap } from "../utils/progress";
import { getLessonKey, getQuizKey } from "../utils/progress";

const LESSON_PROGRESS_KEY = "frontend-academy:lesson-progress";
const QUIZ_PROGRESS_KEY = "frontend-academy:quiz-progress";
const ACTIVITY_LOG_KEY = "frontend-academy:activity-log";
const PROGRESS_SYNC_EVENT = "frontend-academy:progress-sync";

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

  const setLessonStatus = useCallback(
    (courseId: string, moduleId: string, lessonId: string, status: LessonStatus) => {
      setLessonProgress((current) => {
        const next = {
          ...current,
          [getLessonKey(courseId, moduleId, lessonId)]: status,
        };
        localStorage.setItem(LESSON_PROGRESS_KEY, JSON.stringify(next));
        window.dispatchEvent(new Event(PROGRESS_SYNC_EVENT));
        return next;
      });
      if (status === "completed") recordActivity();
    },
    [recordActivity],
  );

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
  }, [recordActivity]);

  return { lessonProgress, quizProgress, activityLog, setLessonStatus, saveQuizScore };
}


