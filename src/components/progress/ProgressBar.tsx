import styles from "./ProgressBar.module.css";

interface ProgressBarProps {
  value: number;
  label?: string;
}

export function ProgressBar({ value, label }: ProgressBarProps) {
  return (
    <div>
      {label ? (
        <div className={styles.meta}>
          <span>{label}</span>
          <span>{value}%</span>
        </div>
      ) : null}
      <div className={styles.track} aria-label={label} aria-valuenow={value}>
        <div className={styles.fill} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
