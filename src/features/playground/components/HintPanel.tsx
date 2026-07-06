import { usePlayground } from "../providers/PlaygroundProvider";
import type { PlaygroundFile } from "../types";
import styles from "./Playground.module.css";

export function HintPanel({ hints, requirements, expectedOutput }: { hints: string[]; requirements: string[]; expectedOutput?: string }) {
  const { showSolution, toggleSolution, solutionFiles } = usePlayground();
  return (
    <section className={styles.panel} aria-label="Режим виклику">
      <h3>Режим виклику</h3>
      <strong>Вимоги</strong>
      <ul>{requirements.map((item) => <li key={item}>{item}</li>)}</ul>
      {expectedOutput ? <p><strong>Очікуваний результат:</strong> {expectedOutput}</p> : null}
      {hints.map((hint, index) => (
        <details key={hint}>
          <summary>Підказка {index + 1}</summary>
          <p>{hint}</p>
        </details>
      ))}
      <button className={styles.toolButton} onClick={toggleSolution}>{showSolution ? "Сховати рішення" : "Показати рішення"}</button>
      {showSolution ? (
        <div className={styles.solution}>
          {solutionFiles.map((file: PlaygroundFile) => (
            <pre key={file.id ?? file.path ?? file.language}>{file.label}{"\n"}{file.code}</pre>
          ))}
        </div>
      ) : null}
    </section>
  );
}
