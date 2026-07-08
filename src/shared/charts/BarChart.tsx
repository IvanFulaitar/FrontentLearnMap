import styles from "./BarChart.module.css";

export interface ChartPoint {
  label: string;
  value: number;
}

export function BarChart({ data }: { data: ChartPoint[] }) {
  const max = Math.max(...data.map((item) => item.value), 1);
  return (
    <div className={styles.chart} role="img" aria-label="Графік активності">
      {data.map((item) => (
        <div className={styles.barWrap} key={item.label}>
          <div className={styles.barTrack}>
            <div className={styles.bar} style={{ height: `${Math.max(5, (item.value / max) * 100)}%` }} title={`${item.label}: ${item.value}`} />
          </div>
          <span className={styles.label}>{item.label}</span>
        </div>
      ))}
    </div>
  );
}
