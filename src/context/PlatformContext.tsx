import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { achievements, dailyChallenges, levels, XP_REWARDS } from "../constants/gamification";
import { courses } from "../data/courses";
import {
  ACTIVITY_LOG_KEY,
  DAILY_EVENTS_KEY,
  LESSON_PROGRESS_KEY,
  PROGRESS_SYNC_EVENT,
  QUIZ_PROGRESS_KEY,
  type DailyEventMap,
} from "../hooks/useProgress";
import { getCourseProgress, getLearningStats, getModuleProgress, type ProgressMap, type QuizProgressMap } from "../utils/progress";
import type { OsChoice, PlatformSettings, UserProfile } from "../types/platform";

const STORAGE_KEY = "frontend-academy:platform-state";

const todayKey = () => new Date().toISOString().slice(0, 10);

interface PlatformState {
  xp: number;
  completedDaily: string[];
  // Calendar day (YYYY-MM-DD) the current `completedDaily` list belongs to.
  // Without this, checked-off daily challenges never uncheck themselves —
  // they'd stay "done" forever instead of resetting every day.
  dailyChallengesDate: string;
  completedProjects: string[];
  // Module keys ("courseId:moduleId") and course ids that already received
  // their one-time XP_REWARDS.moduleCompleted / courseCompleted bonus, so
  // toggling a lesson's status back and forth inside an already-finished
  // module/course never re-grants the bonus.
  completedModules: string[];
  completedCourses: string[];
  notes: Record<string, string>;
  bookmarks: string[];
  settings: PlatformSettings;
  profile: UserProfile;
  // Learner's OS choice for the "Робоче середовище" (VS Code setup) course —
  // global and persisted so it's remembered when moving between its lessons.
  os: OsChoice;
}

const defaultState: PlatformState = {
  xp: 0,
  completedDaily: [],
  dailyChallengesDate: todayKey(),
  completedProjects: [],
  completedModules: [],
  completedCourses: [],
  notes: {},
  bookmarks: [],
  settings: { fontSize: "medium", animations: true, compactMode: false },
  profile: { username: "Студент Free Frontend", avatar: "ФФ" },
  os: "windows",
};

/** Drops yesterday's (or older) completed daily challenges so the list
 * greets the learner fresh every calendar day. */
const withFreshDailyChallenges = (state: PlatformState): PlatformState => {
  const today = todayKey();
  if (state.dailyChallengesDate === today) return state;
  return { ...state, completedDaily: [], dailyChallengesDate: today };
};

const readState = (): PlatformState => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? { ...defaultState, ...JSON.parse(raw) } : defaultState;
    return withFreshDailyChallenges(parsed);
  } catch {
    return defaultState;
  }
};

interface PlatformContextValue extends PlatformState {
  level: { current: (typeof levels)[number]; next: (typeof levels)[number] | null; progress: number };
  unlockedAchievements: string[];
  addXp: (amount: number) => void;
  completeDaily: (id: string) => void;
  completeProject: (id: string) => void;
  markModuleCompletedIfNeeded: (moduleKey: string) => void;
  markCourseCompletedIfNeeded: (courseId: string) => void;
  saveNote: (lessonKey: string, value: string) => void;
  toggleBookmark: (lessonKey: string) => void;
  updateSettings: (settings: Partial<PlatformSettings>) => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  setOs: (os: OsChoice) => void;
  resetPlatform: () => void;
  resetNotes: () => void;
}

const PlatformContext = createContext<PlatformContextValue | null>(null);

const persist = (state: PlatformState) => localStorage.setItem(STORAGE_KEY, JSON.stringify(state));

const readJson = <T,>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

interface CourseProgressSnapshot {
  lessonProgress: ProgressMap;
  quizProgress: QuizProgressMap;
  activityLog: string[];
  // Today's real activity tags only ("lesson" / "practice" / "quiz-passed" /
  // "js-lesson") — used to auto-detect daily-challenge completion instead of
  // a manual checkbox.
  todayEvents: string[];
}

const readCourseProgressSnapshot = (): CourseProgressSnapshot => {
  const dailyEvents = readJson<DailyEventMap>(DAILY_EVENTS_KEY, {});
  return {
    lessonProgress: readJson<ProgressMap>(LESSON_PROGRESS_KEY, {}),
    quizProgress: readJson<QuizProgressMap>(QUIZ_PROGRESS_KEY, {}),
    activityLog: readJson<string[]>(ACTIVITY_LOG_KEY, []),
    todayEvents: dailyEvents[todayKey()] ?? [],
  };
};

/** Maps each daily-challenge id to the real activity tag that satisfies it. */
const DAILY_CHALLENGE_EVENT_MAP: Record<string, string> = {
  "daily-lesson": "lesson",
  "daily-practice": "practice",
  "daily-quiz": "quiz-passed",
  "daily-js": "js-lesson",
};

export function PlatformProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PlatformState>(readState);
  // Mirrors the lesson/quiz progress and activity log (owned by useProgress)
  // so achievements reflect real course completion, test results and
  // consecutive learning days instead of stale, unrelated proxies.
  const [courseProgress, setCourseProgress] = useState<CourseProgressSnapshot>(readCourseProgressSnapshot);

  useEffect(() => {
    const syncCourseProgress = () => setCourseProgress(readCourseProgressSnapshot());
    window.addEventListener("storage", syncCourseProgress);
    window.addEventListener(PROGRESS_SYNC_EVENT, syncCourseProgress);
    return () => {
      window.removeEventListener("storage", syncCourseProgress);
      window.removeEventListener(PROGRESS_SYNC_EVENT, syncCourseProgress);
    };
  }, []);

  // These settings previously only updated local state — nothing on screen
  // ever changed when a learner toggled them. Reflect them as attributes on
  // <html> so globals.css can apply real font-size, motion and density rules.
  useEffect(() => {
    document.documentElement.dataset.fontSize = state.settings.fontSize;
    document.documentElement.dataset.animations = state.settings.animations ? "on" : "off";
    document.documentElement.dataset.compact = String(state.settings.compactMode);
  }, [state.settings.animations, state.settings.compactMode, state.settings.fontSize]);

  const update = useCallback((recipe: (current: PlatformState) => PlatformState) => {
    setState((current) => {
      // Self-heals stale state on every write, not just on page load — so a
      // tab left open past midnight still gets a fresh daily-challenge list
      // the moment the learner interacts with anything.
      const next = recipe(withFreshDailyChallenges(current));
      persist(next);
      return next;
    });
  }, []);

  // Also self-heal on a timer, so the "Щоденні виклики" card flips to a new
  // day on its own if the tab is left open overnight instead of staying
  // stuck on yesterday's checked-off state until the next click.
  useEffect(() => {
    const id = window.setInterval(() => {
      setState((current) => {
        const next = withFreshDailyChallenges(current);
        if (next === current) return current;
        persist(next);
        return next;
      });
    }, 60_000);
    return () => window.clearInterval(id);
  }, []);

  const addXp = useCallback((amount: number) => update((current) => ({ ...current, xp: Math.max(0, current.xp + amount) })), [update]);

  const completeDaily = useCallback((id: string) => {
    update((current) => {
      if (current.completedDaily.includes(id)) return current;
      const challenge = dailyChallenges.find((item) => item.id === id);
      return {
        ...current,
        completedDaily: [...current.completedDaily, id],
        xp: current.xp + (challenge?.xpReward ?? XP_REWARDS.dailyChallenge),
      };
    });
  }, [update]);

  // Auto-completes today's daily challenges from real activity (recorded by
  // useProgress.ts whenever a lesson/practice/quiz is actually completed),
  // replacing the old honor-system checkbox the learner had to tick
  // themselves. completeDaily() is idempotent (no-ops once a challenge is
  // already marked done today), so re-running this on every progress sync
  // is safe.
  useEffect(() => {
    Object.entries(DAILY_CHALLENGE_EVENT_MAP).forEach(([challengeId, eventTag]) => {
      if (courseProgress.todayEvents.includes(eventTag)) completeDaily(challengeId);
    });
  }, [completeDaily, courseProgress.todayEvents]);

  const completeProject = useCallback((id: string) => {
    update((current) => {
      if (current.completedProjects.includes(id)) return current;
      return {
        ...current,
        completedProjects: [...current.completedProjects, id],
        xp: current.xp + XP_REWARDS.projectCompleted,
      };
    });
  }, [update]);

  const markModuleCompletedIfNeeded = useCallback((moduleKey: string) => {
    update((current) => {
      if (current.completedModules.includes(moduleKey)) return current;
      return {
        ...current,
        completedModules: [...current.completedModules, moduleKey],
        xp: current.xp + XP_REWARDS.moduleCompleted,
      };
    });
  }, [update]);

  const markCourseCompletedIfNeeded = useCallback((courseId: string) => {
    update((current) => {
      if (current.completedCourses.includes(courseId)) return current;
      return {
        ...current,
        completedCourses: [...current.completedCourses, courseId],
        xp: current.xp + XP_REWARDS.courseCompleted,
      };
    });
  }, [update]);

  const saveNote = useCallback((lessonKey: string, value: string) => {
    update((current) => ({ ...current, notes: { ...current.notes, [lessonKey]: value } }));
  }, [update]);

  const toggleBookmark = useCallback((lessonKey: string) => {
    update((current) => ({
      ...current,
      bookmarks: current.bookmarks.includes(lessonKey)
        ? current.bookmarks.filter((item) => item !== lessonKey)
        : [...current.bookmarks, lessonKey],
    }));
  }, [update]);

  const updateSettings = useCallback((settings: Partial<PlatformSettings>) => {
    update((current) => ({ ...current, settings: { ...current.settings, ...settings } }));
  }, [update]);

  const updateProfile = useCallback((profile: Partial<UserProfile>) => {
    update((current) => ({ ...current, profile: { ...current.profile, ...profile } }));
  }, [update]);

  const setOs = useCallback((os: OsChoice) => {
    update((current) => (current.os === os ? current : { ...current, os }));
  }, [update]);

  const resetPlatform = useCallback(() => {
    persist(defaultState);
    setState(defaultState);
  }, []);

  const resetNotes = useCallback(() => {
    update((current) => ({ ...current, notes: {} }));
  }, [update]);

  const level = useMemo(() => {
    const current = [...levels].reverse().find((item) => state.xp >= item.minXp) ?? levels[0];
    const next = levels.find((item) => item.minXp > state.xp) ?? null;
    const progress = next ? Math.round(((state.xp - current.minXp) / (next.minXp - current.minXp)) * 100) : 100;
    return { current, next, progress };
  }, [state.xp]);

  const unlockedAchievements = useMemo(() => {
    const unlocked = new Set<string>();
    const { lessonProgress, quizProgress, activityLog } = courseProgress;
    const stats = getLearningStats(lessonProgress, quizProgress, activityLog);
    const htmlCourse = courses.find((course) => course.id === "html");
    const cssCourse = courses.find((course) => course.id === "css");
    const reactCourse = courses.find((course) => course.id === "react");
    const typescriptCourse = courses.find((course) => course.id === "typescript");
    const jsCourse = courses.find((course) => course.id === "javascript");
    const nodeCourse = courses.find((course) => course.id === "node-basics");
    const networkStorageModule = jsCourse?.modules.find((module) => module.id === "js-network-storage");
    const nodeApiModule = nodeCourse?.modules.find((module) => module.id === "node-api");

    if (stats.completedLessons >= 1) unlocked.add("first-lesson");
    if (stats.longestStreak >= 7) unlocked.add("seven-day-streak");
    if (stats.longestStreak >= 30) unlocked.add("thirty-day-streak");
    if (stats.passedTests >= 10) unlocked.add("ten-tests");
    if (stats.completedLessons >= 50) unlocked.add("fifty-lessons");
    if (stats.completedLessons >= 100) unlocked.add("hundred-lessons");
    if (htmlCourse && getCourseProgress(htmlCourse, lessonProgress).percent === 100) unlocked.add("completed-html");
    if (cssCourse && getCourseProgress(cssCourse, lessonProgress).percent === 100) unlocked.add("completed-css");
    if (reactCourse && getCourseProgress(reactCourse, lessonProgress).percent === 100) unlocked.add("react-developer");
    if (typescriptCourse && getCourseProgress(typescriptCourse, lessonProgress).percent === 100) unlocked.add("typescript-master");
    if (
      (jsCourse && networkStorageModule && getModuleProgress(jsCourse, networkStorageModule, lessonProgress).isCompleted) ||
      (nodeCourse && nodeApiModule && getModuleProgress(nodeCourse, nodeApiModule, lessonProgress).isCompleted)
    ) {
      unlocked.add("api-explorer");
    }
    if (state.completedProjects.length >= 1) unlocked.add("first-project");
    if (document.documentElement.dataset.theme === "dark") unlocked.add("dark-mode-user");
    return achievements.filter((achievement) => unlocked.has(achievement.id)).map((achievement) => achievement.id);
  }, [courseProgress, state.completedProjects.length]);

  const value = useMemo<PlatformContextValue>(() => ({
    ...state,
    level,
    unlockedAchievements,
    addXp,
    completeDaily,
    completeProject,
    markModuleCompletedIfNeeded,
    markCourseCompletedIfNeeded,
    saveNote,
    toggleBookmark,
    updateSettings,
    updateProfile,
    setOs,
    resetPlatform,
    resetNotes,
  }), [addXp, completeDaily, completeProject, markCourseCompletedIfNeeded, markModuleCompletedIfNeeded, level, resetNotes, resetPlatform, saveNote, setOs, state, toggleBookmark, unlockedAchievements, updateProfile, updateSettings]);

  return <PlatformContext.Provider value={value}>{children}</PlatformContext.Provider>;
}

export function usePlatform() {
  const context = useContext(PlatformContext);
  if (!context) throw new Error("usePlatform must be used within PlatformProvider");
  return context;
}
