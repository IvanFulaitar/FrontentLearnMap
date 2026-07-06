import { getFileId } from "../utils/fileUtils";
import { usePlayground } from "../providers/PlaygroundProvider";
import styles from "./Playground.module.css";

export function FileExplorer() {
  const { files, activeFileId, selectFile } = usePlayground();
  return (
    <aside className={styles.fileExplorer} aria-label="Провідник файлів">
      <strong>Файли</strong>
      {files.map((file) => {
        const fileId = getFileId(file);
        return (
          <button
            className={`${styles.tab} ${activeFileId === fileId ? styles.active : ""}`}
            key={fileId}
            onClick={() => selectFile(fileId)}
          >
            {file.path ?? file.label}
          </button>
        );
      })}
    </aside>
  );
}
