import { lazy, Suspense } from "react";
import type { OnMount } from "@monaco-editor/react";
import { Skeleton } from "../../../components/ui/Skeleton";
import { getMonacoLanguage } from "../utils/fileUtils";
import { usePlayground } from "../providers/PlaygroundProvider";
import { usePlatform } from "../../../context/PlatformContext";

const MonacoEditor = lazy(() => import("@monaco-editor/react"));

export function MonacoCodeEditor() {
  const { activeFileId, files, settings, updateFile, setCursorPosition } = usePlayground();
  // The "Code Font" setting on the Settings page used to be stored but never
  // actually applied to the editor — wire it into Monaco's font family.
  const { settings: platformSettings } = usePlatform();
  const activeFile = files.find((file) => (file.id ?? file.path ?? file.language) === activeFileId) ?? files[0];

  const handleMount: OnMount = (editor) => {
    editor.onDidChangeCursorPosition((event) => {
      setCursorPosition({ lineNumber: event.position.lineNumber, column: event.position.column });
    });
  };

  return (
    <Suspense fallback={<Skeleton height={280} />}>
      <MonacoEditor
        height={settings.fullscreen ? "58vh" : "320px"}
        language={getMonacoLanguage(activeFile.language)}
        value={activeFile.code}
        theme={settings.theme === "dark" ? "vs-dark" : "light"}
        onMount={handleMount}
        onChange={(value) => updateFile(activeFileId, value ?? "")}
        options={{
          autoClosingBrackets: "always",
          autoClosingQuotes: "always",
          autoIndent: "full",
          bracketPairColorization: { enabled: true },
          fontSize: settings.fontSize,
          fontFamily: `${platformSettings.codeFont}, "Cascadia Code", "Fira Code", Consolas, monospace`,
          lineNumbers: "on",
          minimap: { enabled: settings.minimap },
          readOnly: settings.readOnly || activeFile.readOnly,
          tabSize: 2,
          wordWrap: settings.wordWrap ? "on" : "off",
          automaticLayout: true,
        }}
      />
    </Suspense>
  );
}
