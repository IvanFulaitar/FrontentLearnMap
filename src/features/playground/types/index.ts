import type { PlaygroundFile, PlaygroundLanguage } from "../../../types/course";

export type ConsoleLevel = "log" | "warn" | "error";

export interface ConsoleMessage {
  id: string;
  level: ConsoleLevel;
  message: string;
  timestamp: number;
}

export interface CursorPosition {
  lineNumber: number;
  column: number;
}

export interface PlaygroundSettings {
  theme: "light" | "dark";
  fontSize: number;
  minimap: boolean;
  wordWrap: boolean;
  readOnly: boolean;
  fullscreen: boolean;
}

export interface PlaygroundState {
  files: PlaygroundFile[];
  starterFiles: PlaygroundFile[];
  solutionFiles: PlaygroundFile[];
  activeFileId: string;
  selectedTab: string;
  cursorPosition: CursorPosition;
  consoleMessages: ConsoleMessage[];
  output: string;
  previewDocument: string;
  settings: PlaygroundSettings;
  showSolution: boolean;
}

export interface PlaygroundAdapter {
  id: "browser" | "react" | "sandpack" | "stackblitz" | "codesandbox" | "webcontainer";
  run: (files: PlaygroundFile[]) => Promise<{ previewDocument: string; messages: ConsoleMessage[]; output: string }>;
}

export type { PlaygroundFile, PlaygroundLanguage };
