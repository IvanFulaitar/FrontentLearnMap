import type { InputHTMLAttributes, ReactNode } from "react";
import styles from "./FormControls.module.css";

export function Radio({ children, ...props }: InputHTMLAttributes<HTMLInputElement> & { children?: ReactNode }) {
  return (
    <label className={styles.inline}>
      <input type="radio" {...props} />
      <span>{children}</span>
    </label>
  );
}
