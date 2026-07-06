import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { achievements, dailyChallenges, levels, XP_REWARDS } from "../constants/gamification";
import type { PlatformSettings, UserProfile } from "../types/platform";

const STORAGE_KEY = "frontend-academy:platform-state";

interface PlatformState {
  xp: number;
  completedDaily: string[];
  completedProjects: string[];
  notes: Record<string, string>;
  bookmarks: string[];
  settings: PlatformSettings;
  profile: UserProfile;
}

const defaultState: PlatformState = {
  xp: 0,
  completedDaily: [],
  completedProjects: [],
  notes: {},
  bookmarks: [],
  settings: { fontSize: "medium", animations: true, compactMode: false },
  profile: { username: "Студент Free Frontend", avatar: "ФФ" },
};

const readState = (): PlatformState => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...defaultState, ...JSON.parse(raw) } : defaultState;
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
  saveNote: (lessonKey: string, value: string) => void;
  toggleBookmark: (lessonKey: string) => void;
  updateSettings: (settings: Partial<PlatformSettings>) => void;
  updateProfile: (profile: Partial<UserProfile>) => void;
  resetPlatform: () => void;
  resetNotes: () => void;
}

const PlatformContext = createContext<PlatformContextValue | null>(null);

const persist = (state: PlatformState) => localStorage.setItem(STORAGE_KEY, JSON.stringify(state));

export function PlatformProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PlatformState>(readState);

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
      const next = recipe(current);
      persist(next);
      return next;
    });
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
    if (state.xp >= 20) unlocked.add("first-lesson");
    if (state.completedDaily.length >= 1) unlocked.add("seven-day-streak");
    if (state.completedDaily.length >= 4) unlocked.add("thirty-day-streak");
    if (state.completedProjects.length >= 1) unlocked.add("first-project");
    if (document.documentElement.dataset.theme === "dark") unlocked.add("dark-mode-user");
    return achievements.filter((achievement) => unlocked.has(achievement.id)).map((achievement) => achievement.id);
  }, [state.completedDaily.length, state.completedProjects.length, state.xp]);

  const value = useMemo<PlatformContextValue>(() => ({
    ...state,
    level,
    unlockedAchievements,
    addXp,
    completeDaily,
    completeProject,
    saveNote,
    toggleBookmark,
    updateSettings,
    updateProfile,
    resetPlatform,
    resetNotes,
  }), [addXp, completeDaily, completeProject, level, resetNotes, resetPlatform, saveNote, state, toggleBookmark, unlockedAchievements, updateProfile, updateSettings]);

  return <PlatformContext.Provider value={value}>{children}</PlatformContext.Provider>;
}

export function usePlatform() {
  const context = useContext(PlatformContext);
  if (!context) throw new Error("usePlatform must be used within PlatformProvider");
  return context;
}
