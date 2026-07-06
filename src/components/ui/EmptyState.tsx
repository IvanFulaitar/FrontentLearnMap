import { SearchX } from "lucide-react";
import type { ReactNode } from "react";
import styles from "./EmptyState.module.css";

interface EmptyStateProps {
  title: string;
  message: string;
  action?: ReactNode;
}

export function EmptyState({ title, message, action }: EmptyStateProps) {
  return (
    <div className={styles.empty}>
      <div className={styles.icon}>
        <SearchX size={24} />
      </div>
      <h2>{title}</h2>
      <p>{message}</p>
      {action}
    </div>
  );
}
