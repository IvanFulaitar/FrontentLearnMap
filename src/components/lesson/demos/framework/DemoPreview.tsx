import type { ReactNode } from "react";
import styles from "./framework.module.css";

/**
 * The bordered "stage" where the real, realistic interface renders. Every
 * child element inside automatically gets a smooth transition (see
 * `.preview *` in framework.module.css), so property changes animate
 * instead of snapping.
 */
export function DemoPreview({ label, children }: { label?: string; children: ReactNode }) {
  return (
    <div className={styles.preview}>
      {label ? <p className={styles.previewLabel}>{label}</p> : null}
      {children}
    </div>
  );
}
