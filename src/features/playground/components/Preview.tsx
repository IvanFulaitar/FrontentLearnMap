import { usePlayground } from "../providers/PlaygroundProvider";
import styles from "./Playground.module.css";

export function Preview() {
  const { previewDocument, mode } = usePlayground();
  return (
    <section className={styles.panel} aria-label="Попередній перегляд">
      <h3>Попередній перегляд</h3>
      <iframe
        className={styles.previewFrame}
        title="Попередній перегляд наживо"
        sandbox="allow-scripts"
        srcDoc={previewDocument || (mode === "tsx" ? "<p>Натисни «Запустити», щоб завантажити заглушку React-адаптера.</p>" : "<p>Натисни «Запустити», щоб побачити результат HTML, CSS та JavaScript.</p>")}
      />
    </section>
  );
}
