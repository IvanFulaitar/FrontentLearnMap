export type LearningUnitType = "lesson" | "quiz" | "practice" | "project" | "exam" | "certificate";

export interface LearningUnit {
  id: string;
  type: LearningUnitType;
  title: string;
  description: string;
  xpReward: number;
  prerequisites?: string[];
}

export interface LearningEngine {
  canStart(unit: LearningUnit, completedIds: string[]): boolean;
  getReward(unit: LearningUnit): number;
}

export const learningEngine: LearningEngine = {
  canStart(unit, completedIds) {
    return unit.prerequisites?.every((id) => completedIds.includes(id)) ?? true;
  },
  getReward(unit) {
    return unit.xpReward;
  },
};
