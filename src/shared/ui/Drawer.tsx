import type { ReactNode } from "react";
import styles from "./Overlay.module.css";

export function Drawer({ open, title, children, onClose }: { open: boolean; title: string; children: ReactNode; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className={styles.backdrop} role="presentation" onClick={onClose}>
      <aside className={styles.drawer} role="dialog" aria-modal="true" aria-label={title} onClick={(event) => event.stopPropagation()}>
        <h2>{title}</h2>
        {children}
      </aside>
    </div>
  );
}
