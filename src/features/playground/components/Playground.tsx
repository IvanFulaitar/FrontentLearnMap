import { useEffect } from "react";
import type { PlaygroundMode } from "../../../types/course";
import type { PlaygroundFile } from "../types";
import { PlaygroundProvider, usePlayground } from "../providers/PlaygroundProvider";
import { ConsolePanel } from "./ConsolePanel";
import { EditorStatusBar } from "./EditorStatusBar";
import { EditorTabs } from "./EditorTabs";
import { EditorToolbar } from "./EditorToolbar";
import { FileExplorer } from "./FileExplorer";
import { HintPanel } from "./HintPanel";
import { MonacoCodeEditor } from "./MonacoCodeEditor";
import { OutputPanel } from "./OutputPanel";
import { Preview } from "./Preview";
import styles from "./Playground.module.css";

interface PlaygroundProps {
  lessonId: string;
  files: PlaygroundFile[];
  solutionFiles: PlaygroundFile[];
  mode: PlaygroundMode;
  hints: string[];
  requirements: string[];
  expectedOutput?: string;
  previewEnabled: boolean;
  consoleEnabled: boolean;
}

function PlaygroundShell({ hints, requirements, expectedOutput, previewEnabled, consoleEnabled }: Omit<PlaygroundProps, "lessonId" | "files" | "solutionFiles" | "mode">) {
  const { activeFileId, files, settings, run, clearConsole, updateFile, updateSettings } = usePlayground();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
        event.preventDefault();
        void run();
      }
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "s") {
        event.preventDefault();
        return;
      }
      if ((event.ctrlKey || event.metaKey) && event.key === "/") {
        event.preventDefault();
        const activeFile = files.find((file) => (file.id ?? file.path ?? file.language) === activeFileId) ?? files[0];
        const commented = activeFile.code
          .split("\n")
          .map((line) => (line.trim().startsWith("//") ? line.replace("//", "") : `// ${line}`))
          .join("\n");
        updateFile(activeFileId, commented);
        return;
      }
      if (event.key === "F11") {
        event.preventDefault();
        updateSettings({ fullscreen: !settings.fullscreen });
        return;
      }
      if (event.key === "Escape") clearConsole();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeFileId, clearConsole, files, run, settings.fullscreen, updateFile, updateSettings]);

  return (
    <div className={`${styles.playground} ${settings.fullscreen ? styles.fullscreen : ""}`}>
      <EditorToolbar />
      <div className={styles.workspace}>
        <FileExplorer />
        <div className={styles.editorPane}>
          <EditorTabs />
          <MonacoCodeEditor />
          <EditorStatusBar />
        </div>
        <div className={styles.sidePane}>
          <HintPanel hints={hints} requirements={requirements} expectedOutput={expectedOutput} />
          {previewEnabled ? <Preview /> : null}
          {consoleEnabled ? <ConsolePanel /> : null}
          <OutputPanel />
        </div>
      </div>
    </div>
  );
}

export function Playground(props: PlaygroundProps) {
  return (
    <PlaygroundProvider lessonId={props.lessonId} files={props.files} solutionFiles={props.solutionFiles} mode={props.mode}>
      <PlaygroundShell
        hints={props.hints}
        requirements={props.requirements}
        expectedOutput={props.expectedOutput}
        previewEnabled={props.previewEnabled}
        consoleEnabled={props.consoleEnabled}
      />
    </PlaygroundProvider>
  );
}
