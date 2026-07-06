import styles from "./framework.module.css";

/** Live-updating CSS snippet shown under the preview — always reflects the
 * exact values the controls are currently set to. */
export function DemoCodeSnippet({ code }: { code: string }) {
  return (
    <pre className={styles.codeSnippet} aria-live="polite">
      <code>{code}</code>
    </pre>
  );
}
