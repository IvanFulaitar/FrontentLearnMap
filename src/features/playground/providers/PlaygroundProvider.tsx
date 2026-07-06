import { createContext, useContext, useEffect, useMemo, useReducer, type ReactNode } from "react";
import type { PlaygroundMode } from "../../../types/course";
import { useTheme } from "../../../context/ThemeContext";
import { getPlaygroundAdapter } from "../services/adapters";
import { playgroundStorage } from "../services/playgroundStorage";
import type { ConsoleMessage, CursorPosition, PlaygroundFile, PlaygroundSettings, PlaygroundState } from "../types";
import { cloneFiles, getFileId } from "../utils/fileUtils";

type Action =
  | { type: "select-file"; fileId: string }
  | { type: "update-file"; fileId: string; code: string }
  | { type: "set-cursor"; cursor: CursorPosition }
  | { type: "set-settings"; settings: Partial<PlaygroundSettings> }
  | { type: "set-console"; messages: ConsoleMessage[] }
  | { type: "append-console"; messages: ConsoleMessage[] }
  | { type: "set-preview"; previewDocument: string; output: string }
  | { type: "reset" }
  | { type: "toggle-solution" };

interface PlaygroundContextValue extends PlaygroundState {
  lessonId: string;
  mode: PlaygroundMode;
  selectFile: (fileId: string) => void;
  updateFile: (fileId: string, code: string) => void;
  setCursorPosition: (cursor: CursorPosition) => void;
  updateSettings: (settings: Partial<PlaygroundSettings>) => void;
  run: () => Promise<void>;
  reset: () => void;
  refresh: () => Promise<void>;
  clearConsole: () => void;
  toggleSolution: () => void;
}

const PlaygroundContext = createContext<PlaygroundContextValue | null>(null);

const makeInitialState = (
  lessonId: string,
  files: PlaygroundFile[],
  solutionFiles: PlaygroundFile[],
  mode: PlaygroundMode,
  theme: "light" | "dark",
): PlaygroundState => {
  const starterFiles = cloneFiles(files);
  const stored = playgroundStorage.read(lessonId);
  const initialFiles = stored?.files?.length ? stored.files : starterFiles;
  const activeFileId = stored?.activeFileId ?? getFileId(initialFiles[0]);
  return {
    files: initialFiles,
    starterFiles,
    solutionFiles: cloneFiles(solutionFiles),
    activeFileId,
    selectedTab: activeFileId,
    cursorPosition: stored?.cursorPosition ?? { lineNumber: 1, column: 1 },
    consoleMessages: [],
    output: mode === "tsx" ? "React-адаптер готовий." : "Натисни «Запустити», щоб оновити перегляд.",
    previewDocument: "",
    settings: stored?.settings ?? {
      theme,
      fontSize: 14,
      minimap: false,
      wordWrap: true,
      readOnly: false,
      fullscreen: false,
    },
    showSolution: false,
  };
};

const reducer = (state: PlaygroundState, action: Action): PlaygroundState => {
  switch (action.type) {
    case "select-file":
      return { ...state, activeFileId: action.fileId, selectedTab: action.fileId };
    case "update-file":
      return {
        ...state,
        files: state.files.map((file) => (getFileId(file) === action.fileId ? { ...file, code: action.code } : file)),
      };
    case "set-cursor":
      return { ...state, cursorPosition: action.cursor };
    case "set-settings":
      return { ...state, settings: { ...state.settings, ...action.settings } };
    case "set-console":
      return { ...state, consoleMessages: action.messages };
    case "append-console":
      return { ...state, consoleMessages: [...state.consoleMessages, ...action.messages] };
    case "set-preview":
      return { ...state, previewDocument: action.previewDocument, output: action.output };
    case "reset":
      return { ...state, files: cloneFiles(state.starterFiles), activeFileId: getFileId(state.starterFiles[0]), selectedTab: getFileId(state.starterFiles[0]), consoleMessages: [], output: "Початковий код відновлено.", showSolution: false };
    case "toggle-solution":
      return { ...state, showSolution: !state.showSolution };
    default:
      return state;
  }
};

export function PlaygroundProvider({
  lessonId,
  files,
  solutionFiles,
  mode,
  children,
}: {
  lessonId: string;
  files: PlaygroundFile[];
  solutionFiles: PlaygroundFile[];
  mode: PlaygroundMode;
  children: ReactNode;
}) {
  const { theme } = useTheme();
  const normalizedTheme = theme === "dark" || theme === "high-contrast" ? "dark" : "light";
  const [state, dispatch] = useReducer(reducer, undefined, () =>
    makeInitialState(lessonId, files, solutionFiles, mode, normalizedTheme),
  );
  const adapter = useMemo(() => getPlaygroundAdapter(mode), [mode]);

  useEffect(() => {
    dispatch({ type: "set-settings", settings: { theme: normalizedTheme } });
  }, [normalizedTheme]);

  useEffect(() => {
    playgroundStorage.write(lessonId, {
      files: state.files,
      activeFileId: state.activeFileId,
      cursorPosition: state.cursorPosition,
      settings: state.settings,
    });
  }, [lessonId, state.activeFileId, state.cursorPosition, state.files, state.settings]);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.data?.source !== "playground-console") return;
      dispatch({
        type: "append-console",
        messages: [{
          id: `${event.data.level}-${Date.now()}`,
          level: event.data.level,
          message: event.data.message,
          timestamp: Date.now(),
        }],
      });
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  const run = async () => {
    const result = await adapter.run(state.files);
    dispatch({ type: "append-console", messages: result.messages });
    dispatch({ type: "set-preview", previewDocument: result.previewDocument, output: result.output });
  };

  const value = useMemo<PlaygroundContextValue>(
    () => ({
      ...state,
      lessonId,
      mode,
      selectFile: (fileId) => dispatch({ type: "select-file", fileId }),
      updateFile: (fileId, code) => dispatch({ type: "update-file", fileId, code }),
      setCursorPosition: (cursor) => dispatch({ type: "set-cursor", cursor }),
      updateSettings: (settings) => dispatch({ type: "set-settings", settings }),
      run,
      reset: () => {
        playgroundStorage.clear(lessonId);
        dispatch({ type: "reset" });
      },
      refresh: run,
      clearConsole: () => dispatch({ type: "set-console", messages: [] }),
      toggleSolution: () => dispatch({ type: "toggle-solution" }),
    }),
    [lessonId, mode, run, state],
  );

  return <PlaygroundContext.Provider value={value}>{children}</PlaygroundContext.Provider>;
}

export function usePlayground() {
  const context = useContext(PlaygroundContext);
  if (!context) throw new Error("usePlayground must be used within PlaygroundProvider");
  return context;
}
