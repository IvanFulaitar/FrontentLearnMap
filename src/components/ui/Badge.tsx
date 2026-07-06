import type { ReactNode } from "react";
import styles from "./Badge.module.css";

interface BadgeProps {
  tone?: "completed" | "in-progress" | "not-started" | "level";
  children: ReactNode;
}

export function Badge({ tone = "level", children }: BadgeProps) {
  return <span className={`${styles.badge} ${styles[tone]}`}>{children}</span>;
}
