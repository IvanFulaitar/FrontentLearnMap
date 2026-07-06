import type { ReactNode } from "react";
import styles from "./framework.module.css";

/**
 * Outer card every lesson demo lives in. Every demo (Flexbox, Grid, Box
 * Model, Display...) is wrapped in the same bordered, rounded container so
 * students recognize the pattern instantly, lesson after lesson.
 */
export function DemoSection({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <div className={styles.section}>
      {title ? <h3 className={styles.sectionTitle}>{title}</h3> : null}
      {children}
    </div>
  );
}
