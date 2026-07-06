import type { InputHTMLAttributes, ReactNode } from "react";
import styles from "./FormControls.module.css";

export function Checkbox({ children, ...props }: InputHTMLAttributes<HTMLInputElement> & { children?: ReactNode }) {
  return (
    <label className={styles.inline}>
      <input type="checkbox" {...props} />
      <span>{children}</span>
    </label>
  );
}
