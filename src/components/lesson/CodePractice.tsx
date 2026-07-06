import type { PlaygroundMode, PlaygroundFile } from "../../types/course";
import { Playground } from "../../features/playground";

interface CodePracticeProps {
  lessonId?: string;
  files: PlaygroundFile[];
  solutionFiles?: PlaygroundFile[];
  mode?: PlaygroundMode;
  hints?: string[];
  requirements?: string[];
  expectedOutput?: string;
  previewEnabled?: boolean;
  consoleEnabled?: boolean;
}

/** Lesson-level adapter that keeps legacy lesson rendering decoupled from the playground feature. */
export function CodePractice({
  lessonId = "standalone-practice",
  files,
  solutionFiles = [],
  mode = "web",
  hints = [],
  requirements = [],
  expectedOutput,
  previewEnabled = true,
  consoleEnabled = true,
}: CodePracticeProps) {
  return (
    <Playground
      lessonId={lessonId}
      files={files}
      solutionFiles={solutionFiles}
      mode={mode}
      hints={hints}
      requirements={requirements}
      expectedOutput={expectedOutput}
      previewEnabled={previewEnabled}
      consoleEnabled={consoleEnabled}
    />
  );
}
