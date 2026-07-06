import { Trash2 } from "lucide-react";
import { usePlayground } from "../providers/PlaygroundProvider";
import styles from "./Playground.module.css";

export function ConsolePanel() {
  const { consoleMessages, clearConsole } = usePlayground();
  return (
    <section className={styles.panel} aria-label="Консоль">
      <div className={styles.toolbar}>
        <h3>Консоль</h3>
        <button className={styles.toolButton} onClick={clearConsole}><Trash2 size={16} /> Очистити консоль</button>
      </div>
      <div className={styles.console}>
        {consoleMessages.length ? (
          consoleMessages.map((message) => (
            <div className={styles[message.level]} key={message.id}>
              [{message.level}] {message.message}
            </div>
          ))
        ) : (
          <span>Вивід консолі з'явиться після запуску.</span>
        )}
      </div>
    </section>
  );
}
