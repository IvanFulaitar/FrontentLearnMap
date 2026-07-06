import { Copy, Maximize2, Minimize2, Play, RefreshCw, RotateCcw } from "lucide-react";
import { usePlayground } from "../providers/PlaygroundProvider";
import styles from "./Playground.module.css";

export function EditorToolbar() {
  const { activeFileId, files, run, reset, refresh, settings, updateSettings } = usePlayground();
  const activeFile = files.find((file) => (file.id ?? file.path ?? file.language) === activeFileId) ?? files[0];

  const copy = async () => navigator.clipboard?.writeText(activeFile.code);

  return (
    <div className={styles.toolbar} aria-label="Панель інструментів редактора">
      <button className={styles.toolButton} onClick={run}><Play size={16} /> Запустити</button>
      <button className={styles.toolButton} onClick={reset}><RotateCcw size={16} /> Скинути</button>
      <button className={styles.toolButton} onClick={refresh}><RefreshCw size={16} /> Оновити</button>
      <button className={styles.toolButton} onClick={copy}><Copy size={16} /> Копіювати</button>
      <button className={styles.toolButton} onClick={() => updateSettings({ fullscreen: !settings.fullscreen })}>
        {settings.fullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />} На весь екран
      </button>
      <label className={styles.toolButton}>
        Шрифт
        <input
          type="number"
          min={12}
          max={24}
          value={settings.fontSize}
          onChange={(event) => updateSettings({ fontSize: Number(event.target.value) })}
        />
      </label>
      <label className={styles.toolButton}>
        <input type="checkbox" checked={settings.minimap} onChange={(event) => updateSettings({ minimap: event.target.checked })} />
        Мінікарта
      </label>
      <label className={styles.toolButton}>
        <input type="checkbox" checked={settings.wordWrap} onChange={(event) => updateSettings({ wordWrap: event.target.checked })} />
        Перенос рядків
      </label>
      <label className={styles.toolButton}>
        <input type="checkbox" checked={settings.readOnly} onChange={(event) => updateSettings({ readOnly: event.target.checked })} />
        Лише читання
      </label>
    </div>
  );
}
