import styles from "./framework.module.css";

interface AxisIndicatorProps {
  label: string;
  horizontal: boolean;
}

function AxisIndicator({ label, horizontal }: AxisIndicatorProps) {
  return (
    <div className={styles.axisItem}>
      <span>{label}</span>
      <span className={styles.axisArrow} style={{ transform: horizontal ? "rotate(0deg)" : "rotate(90deg)" }} aria-hidden="true">→</span>
    </div>
  );
}

/**
 * Main-axis / cross-axis indicator for flex/grid demos. The arrow for
 * whichever axis is currently horizontal points right; the other rotates
 * to point down — and it re-rotates smoothly whenever `direction` changes,
 * so students SEE the axis flip instead of just reading about it.
 */
export function DemoAxis({ direction }: { direction: "row" | "column" }) {
  const mainIsHorizontal = direction === "row";
  return (
    <div className={styles.axisWrap}>
      <AxisIndicator label="Головна вісь" horizontal={mainIsHorizontal} />
      <AxisIndicator label="Поперечна вісь" horizontal={!mainIsHorizontal} />
    </div>
  );
}
