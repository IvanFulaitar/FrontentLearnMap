import { usePlayground } from "../providers/PlaygroundProvider";
import styles from "./Playground.module.css";

export function OutputPanel() {
  const { output } = usePlayground();
  return (
    <section className={styles.panel} aria-label="Результат">
      <h3>Результат</h3>
      <p>{output}</p>
    </section>
  );
}
