import { getFileId } from "../utils/fileUtils";
import { usePlayground } from "../providers/PlaygroundProvider";
import styles from "./Playground.module.css";

export function EditorTabs() {
  const { files, activeFileId, selectFile } = usePlayground();
  return (
    <div className={styles.tabs} role="tablist" aria-label="Файли пісочниці">
      {files.map((file) => {
        const fileId = getFileId(file);
        return (
          <button
            className={`${styles.tab} ${activeFileId === fileId ? styles.active : ""}`}
            key={fileId}
            onClick={() => selectFile(fileId)}
            role="tab"
            aria-selected={activeFileId === fileId}
          >
            {file.label}
          </button>
        );
      })}
    </div>
  );
}
