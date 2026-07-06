import { usePlayground } from "../providers/PlaygroundProvider";
import styles from "./Playground.module.css";

export function EditorStatusBar() {
  const { activeFileId, files, cursorPosition, settings } = usePlayground();
  const activeFile = files.find((file) => (file.id ?? file.path ?? file.language) === activeFileId) ?? files[0];
  return (
    <footer className={styles.statusBar}>
      <span>{activeFile.language.toUpperCase()}</span>
      <span>Рядок {cursorPosition.lineNumber}, Символ {cursorPosition.column}</span>
      <span>{settings.theme === "dark" ? "Темна тема" : "Світла тема"}</span>
      <span>{settings.readOnly ? "Лише читання" : "Редагування"}</span>
      <span>Збережено автоматично</span>
    </footer>
  );
}
