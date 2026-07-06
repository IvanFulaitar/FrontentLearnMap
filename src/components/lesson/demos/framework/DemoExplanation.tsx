import type { ReactNode } from "react";
import styles from "./framework.module.css";

/** One short, dynamic sentence describing exactly what just changed and why
 * — updates live as the student moves a control. Not a static caption. */
export function DemoExplanation({ children }: { children: ReactNode }) {
  return (
    <p className={styles.explanation} aria-live="polite">
      <span className={styles.explanationIcon} aria-hidden="true">👁</span>
      <span>{children}</span>
    </p>
  );
}
