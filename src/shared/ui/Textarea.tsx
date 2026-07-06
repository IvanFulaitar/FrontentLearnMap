import type { TextareaHTMLAttributes } from "react";
import styles from "./FormControls.module.css";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
}

export function Textarea({ label, helperText, error, id, ...props }: TextareaProps) {
  const textareaId = id ?? props.name;
  return (
    <label className={styles.field} htmlFor={textareaId}>
      {label ? <span className={styles.label}>{label}</span> : null}
      <textarea className={`${styles.control} ${styles.textarea}`} id={textareaId} aria-invalid={Boolean(error)} {...props} />
      {helperText ? <span className={styles.helper}>{helperText}</span> : null}
      {error ? <span className={styles.error}>{error}</span> : null}
    </label>
  );
}
