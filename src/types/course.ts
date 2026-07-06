export type LessonStatus = "not-started" | "in-progress" | "completed";
export type LessonType = "theory" | "practice" | "quiz";
export type CourseLevel = "Beginner" | "Intermediate" | "Advanced";
export type LessonDifficulty = "Easy" | "Medium" | "Hard";
export type PlaygroundMode = "web" | "tsx";
export type PlaygroundLanguage = "html" | "css" | "javascript" | "typescript" | "tsx" | "json" | "markdown" | "bash";
export type QuizQuestionType = "single" | "multiple" | "true-false" | "code";

export interface Resource {
  label: string;
  url: string;
}

export interface PlaygroundFile {
  id?: string;
  path?: string;
  language: PlaygroundLanguage;
  label: string;
  code: string;
  readOnly?: boolean;
}

/** One step of a guided, incremental build — used for bigger practice tasks
 * (mini-projects) where jumping straight from an empty starter file to the
 * full final solution is too big a leap. Each step's `code` is cumulative
 * (it includes everything from earlier steps plus what's new). */
export interface PracticeStep {
  title: string;
  description: string;
  code: string;
}

export interface PracticeTask {
  title: string;
  description: string;
  checklist: string[];
  /** Optional guided walkthrough shown before the starter/solution files —
   * a numbered sequence building up to the full implementation. */
  steps?: PracticeStep[];
  starterFiles: PlaygroundFile[];
  solutionFiles?: PlaygroundFile[];
  hints?: string[];
  expectedOutput?: string;
}

/** One short (~2-4 sentence) beat of a step-by-step theory explanation. */
export interface TheoryStep {
  heading: string;
  body: string;
}

/** A single code example explained mentor-style: setup, the code, and the payoff. */
export interface CodeWalkthrough {
  before?: string;
  code: string;
  after?: string;
  lineNotes?: string[];
}

export interface InterviewQuestion {
  question: string;
  answer: string;
}

/** A short self-check exercise that replaces the live code editor in a lesson. */
export interface MicroExercise {
  id: string;
  kind: "predict" | "find-the-bug" | "explain" | "rewrite" | "choice";
  prompt: string;
  code?: string;
  options?: string[];
  correctAnswer?: string;
  solution: string;
}

export interface Lesson {
  id: string;
  title: string;
  type: LessonType;
  duration: string;
  estimatedTime: number;
  difficulty: LessonDifficulty;
  tags: string[];
  status: LessonStatus;
  content: string;
  description: string;
  /** Real-world hook that opens the lesson ("Imagine you receive a Figma design..."). */
  motivation?: string;
  learningObjectives: string[];
  requirements: string[];
  theory: string;
  /** Preferred over `theory` when present: the same explanation broken into small, titled steps. */
  theorySteps?: TheoryStep[];
  /** Plain-language analogy used to visualize an abstract concept. */
  analogy?: string;
  examples: string[];
  /** Preferred over `examples` when present: fully narrated before/code/after walkthroughs. */
  codeWalkthroughs?: CodeWalkthrough[];
  tips: string[];
  commonMistakes: string[];
  bestPractices?: string[];
  realWorldUsage?: string[];
  interviewQuestions?: InterviewQuestion[];
  remember?: string[];
  nextLessonNote?: string;
  /** "What is it?" — 2-4 short sentences, shown instead of the generic description when present. */
  whatIsIt?: string;
  /** "Why do we use it?" — one short paragraph on the real problem it solves. */
  whyUseIt?: string;
  /** "When should I use it?" — 3-5 concrete situations (nav, forms, landing pages...). */
  whenToUse?: string[];
  /** "When should I NOT use it?" — beginner-mistake situations, one line each. */
  whenNotToUse?: string[];
  /** A single bad example worth calling out explicitly, with the fix explained. */
  dontDoThis?: { code: string; explanation: string };
  /** One practical tip from real commercial projects, shown at the very end of the lesson. */
  proTip?: string;
  /** Quick-reference comparison table (e.g. element -> use case, input type -> purpose). */
  comparisonTable?: { headers: string[]; rows: string[][] };
  /** An educational diagram built with inline SVG (arrows, labels, boxes) —
   * never a screenshot or stock image. Used for visual/spatial concepts
   * (Box Model, Flexbox axes, Grid tracks, DOM tree, browser rendering
   * pipeline...) where a picture explains the idea faster than a paragraph. */
  visualExplanation?: { svg: string; caption?: string };
  /** Id of a live, state-driven React demo registered in
   * `components/lesson/demos/index.ts` (e.g. "flexbox-demo") — real
   * HTML/CSS the student can manipulate with controls, never a static
   * image. Rendered right after `visualExplanation` when present. */
  interactiveDemo?: string;
  codeExample: string;
  task: string;
  practiceTask: PracticeTask;
  microExercises?: MicroExercise[];
  resources: Resource[];
  summary: string;
  nextSteps: string[];
  playgroundMode: PlaygroundMode;
  supportsPlayground: boolean;
  language: PlaygroundLanguage;
  starterCode: PlaygroundFile[];
  solutionCode: PlaygroundFile[];
  previewEnabled: boolean;
  consoleEnabled: boolean;
  quiz: QuizData;
}

export interface QuizQuestion {
  id: string;
  type: QuizQuestionType;
  question: string;
  options: string[];
  correctAnswer: string | string[] | boolean;
  explanation: string;
  /** Optional per-option feedback so a wrong pick explains *why* it's wrong, not just "incorrect". */
  optionExplanations?: Record<string, string>;
  codeSnippet?: string;
}

export interface QuizData {
  id: string;
  title: string;
  questions: QuizQuestion[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  quiz: QuizData;
  project: ModuleProject;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  level: CourseLevel;
  modules: Module[];
}

export interface LessonLocation {
  course: Course;
  module: Module;
  lesson: Lesson;
}

export interface ModuleProject {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  checklist: string[];
  evaluationCriteria: string[];
  estimatedTime: number;
}
