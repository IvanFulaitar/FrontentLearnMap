import { useState, type ReactNode } from "react";
import styles from "./Overlay.module.css";

export function Tooltip({ content, children }: { content: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <span className={styles.tooltip} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} onFocus={() => setOpen(true)} onBlur={() => setOpen(false)}>
      {children}
      {open ? <span className={styles.tooltipContent}>{content}</span> : null}
    </span>
  );
}
