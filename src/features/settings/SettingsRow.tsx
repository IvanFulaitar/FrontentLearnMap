import type { ReactNode } from "react";
import styles from "../../pages/PlatformPages.module.css";

interface SettingsRowProps {
  label: string;
  children: ReactNode;
}

/** Consistent row layout for settings controls. */
export function SettingsRow({ label, children }: SettingsRowProps) {
  return (
    <label className={styles.row}>
      <span>{label}</span>
      {children}
    </label>
  );
}
