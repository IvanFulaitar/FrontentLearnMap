import type { CourseLevel, LessonDifficulty, PlaygroundFile } from "./course";

export type ChallengeCategory = "HTML" | "CSS" | "JavaScript" | "React" | "TypeScript";
export type ResourceCategory = "Official Docs" | "Videos" | "Articles" | "YouTube" | "GitHub" | "Cheat Sheets" | "Practice Sites";
export type AchievementId =
  | "first-lesson"
  | "completed-html"
  | "completed-css"
  | "ten-tests"
  | "fifty-lessons"
  | "hundred-lessons"
  | "seven-day-streak"
  | "thirty-day-streak"
  | "first-project"
  | "react-developer"
  | "typescript-master"
  | "api-explorer"
  | "dark-mode-user";

export interface LevelDefinition {
  level: number;
  title: string;
  minXp: number;
}

export interface Achievement {
  id: AchievementId;
  title: string;
  description: string;
  xpReward: number;
}

export interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  xpReward: number;
}

export interface PracticeTask {
  id: string;
  category: ChallengeCategory;
  title: string;
  description: string;
  requirements: string[];
  starterCode: PlaygroundFile[];
  hints: string[];
  solution: string;
  difficulty: LessonDifficulty;
}

export interface CodingChallenge {
  id: string;
  category: ChallengeCategory;
  title: string;
  description: string;
  difficulty: LessonDifficulty;
  xpReward: number;
}

export interface ProjectTask {
  id: string;
  title: string;
  difficulty: LessonDifficulty;
  description: string;
  requirements: string[];
  expectedResult: string;
  checklist: string[];
  usefulResources: string[];
  wireframe: string;
  technologies: string[];
  level: CourseLevel;
}

export interface LearningResource {
  id: string;
  category: ResourceCategory;
  title: string;
  description: string;
  url: string;
  tags: string[];
}

export interface PlatformSettings {
  fontSize: "small" | "medium" | "large";
  editorFontSize: number;
  codeFont: "Cascadia Code" | "Fira Code" | "Consolas";
  animations: boolean;
  compactMode: boolean;
}

export interface UserProfile {
  username: string;
  avatar: string;
}
