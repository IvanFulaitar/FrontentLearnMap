import type { InputHTMLAttributes } from "react";
import styles from "./FormControls.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
}

export function Input({ label, helperText, error, id, ...props }: InputProps) {
  const inputId = id ?? props.name;
  return (
    <label className={styles.field} htmlFor={inputId}>
      {label ? <span className={styles.label}>{label}</span> : null}
      <input className={styles.control} id={inputId} aria-invalid={Boolean(error)} {...props} />
      {helperText ? <span className={styles.helper}>{helperText}</span> : null}
      {error ? <span className={styles.error}>{error}</span> : null}
    </label>
  );
}
