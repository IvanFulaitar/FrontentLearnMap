import styles from "./ProgressBar.module.css";

interface ProgressBarProps {
  value: number;
  label?: string;
  /**
   * Accessible name for screen readers when no visible label is rendered
   * (e.g. compact sidebar bars that only show a percentage-filled track).
   * Every progressbar needs SOME accessible name — falls back to `label`
   * when this isn't given, so callers that already pass `label` don't need
   * to also repeat it here.
   */
  ariaLabel?: string;
}

export function ProgressBar({ value, label, ariaLabel }: ProgressBarProps) {
  return (
    <div>
      {label ? (
        <div className={styles.meta}>
          <span>{label}</span>
          <span>{value}%</span>
        </div>
      ) : null}
      <div
        className={styles.track}
        role="progressbar"
        aria-label={ariaLabel ?? label}
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className={styles.fill} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
