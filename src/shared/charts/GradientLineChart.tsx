import { useId, useMemo } from "react";
import styles from "./GradientLineChart.module.css";

export interface ChartPoint {
  label: string;
  value: number;
}

interface GradientLineChartProps {
  data: ChartPoint[];
  ariaLabel: string;
  /**
   * Text shown above each point. Return an empty string to hide the label for
   * that specific point — useful for binary/sparse series where labeling
   * every point would be noisy; the filled/hollow dot plus the hover tooltip
   * already carry the same information. Defaults to the raw numeric value.
   */
  formatPointLabel?: (value: number) => string;
  /** Text shown in the native hover tooltip for each point. Defaults to "<label>: <value>". */
  formatTooltip?: (value: number, label: string) => string;
}

const WIDTH = 600;
const HEIGHT = 260;
const PLOT_LEFT = 34;
const PLOT_RIGHT = 590;
const PLOT_TOP = 40;
const PLOT_BOTTOM = 200;
const LABEL_Y = 224;

// Catmull-Rom-through-cubic-Bezier smoothing (tension 1/6) — gives a natural
// curve through every point without overshooting, unlike a plain quadratic
// smoothing pass. `close` extends the path down to the baseline and back so
// the same "d" can be reused for the filled gradient area under the line.
function buildPath(points: { x: number; y: number }[], close: boolean) {
  if (points.length === 0) return "";
  if (points.length === 1) {
    const [p] = points;
    return `M ${p.x} ${p.y}`;
  }
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i += 1) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }
  if (close) {
    const last = points[points.length - 1];
    const first = points[0];
    d += ` L ${last.x} ${PLOT_BOTTOM} L ${first.x} ${PLOT_BOTTOM} Z`;
  }
  return d;
}

export function GradientLineChart({ data, ariaLabel, formatPointLabel, formatTooltip }: GradientLineChartProps) {
  const gradientId = useId();
  const formatLabel = formatPointLabel ?? ((value: number) => String(value));
  const formatTip = formatTooltip ?? ((value: number, label: string) => `${label}: ${value}`);

  const { points, gridlines, peakIndexes } = useMemo(() => {
    const values = data.map((item) => item.value);
    // Same per-chart normalization BarChart used to use: scale against this
    // chart's own max (never against a hardcoded 0-100), so the daily
    // (0/1 active-day flag) and weekly (0-7 active-day count) series both
    // read correctly on their own terms instead of one metric dwarfing the
    // other on a shared fixed scale.
    const max = Math.max(...values, 1);
    const step = data.length > 1 ? (PLOT_RIGHT - PLOT_LEFT) / (data.length - 1) : 0;
    const pts = data.map((item, index) => ({
      x: data.length > 1 ? PLOT_LEFT + index * step : (PLOT_LEFT + PLOT_RIGHT) / 2,
      y: PLOT_BOTTOM - (item.value / max) * (PLOT_BOTTOM - PLOT_TOP),
      value: item.value,
      label: item.label,
    }));

    const gridSet = Array.from(new Set([0, Math.round(max / 2), max])).sort((a, b) => a - b);
    const grid = gridSet.map((value) => ({
      value,
      y: PLOT_BOTTOM - (value / max) * (PLOT_BOTTOM - PLOT_TOP),
    }));

    const maxValue = Math.max(...values, 0);
    const peaks = new Set<number>();
    data.forEach((item, index) => {
      if (item.value === maxValue) peaks.add(index);
    });
    peaks.add(data.length - 1);

    return { points: pts, gridlines: grid, peakIndexes: peaks };
  }, [data]);

  const linePath = buildPath(points, false);
  const areaPath = buildPath(points, true);

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      width="100%"
      height="100%"
      style={{ display: "block", width: "100%", height: "auto", maxHeight: 280 }}
      role="img"
      aria-label={ariaLabel}
      className={styles.chart}
    >
      <defs>
        <linearGradient id={`line-${gradientId}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--success)" />
          <stop offset="100%" stopColor="var(--primary)" />
        </linearGradient>
        <linearGradient id={`area-${gradientId}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
        </linearGradient>
      </defs>

      {gridlines.map((line) => (
        <g key={line.value}>
          <line
            x1={PLOT_LEFT}
            y1={line.y}
            x2={PLOT_RIGHT}
            y2={line.y}
            stroke="var(--border)"
            strokeWidth="1"
            strokeDasharray="4 5"
          />
          {/* Axis gridlines are always plain numbers, regardless of
              formatPointLabel — a verbose label like "Активний" doesn't fit
              in this narrow left margin and used to overflow/clip. */}
          <text x={PLOT_LEFT - 8} y={line.y + 4} textAnchor="end" className={styles.gridLabel}>
            {line.value}
          </text>
        </g>
      ))}

      <path d={areaPath} fill={`url(#area-${gradientId})`} stroke="none" />
      <path
        d={linePath}
        fill="none"
        stroke={`url(#line-${gradientId})`}
        strokeWidth="3"
        strokeLinecap="round"
        className={styles.linePath}
      />

      {points.map((point, index) => {
        const label = formatLabel(point.value);
        const isPeak = peakIndexes.has(index);
        return (
          <g key={point.label}>
            {label ? (
              <text x={point.x} y={point.y - 14} textAnchor="middle" className={styles.pointLabel}>
                {label}
              </text>
            ) : null}
            <circle
              cx={point.x}
              cy={point.y}
              r={isPeak ? 5.5 : 4}
              fill={isPeak ? "var(--primary)" : "var(--surface)"}
              stroke="var(--primary)"
              strokeWidth="2"
              className={isPeak ? styles.pointFilled : styles.pointHollow}
            >
              <title>{formatTip(point.value, point.label)}</title>
            </circle>
          </g>
        );
      })}

      {points.map((point) => (
        <text key={`label-${point.label}`} x={point.x} y={LABEL_Y} textAnchor="middle" className={styles.axisLabel}>
          {point.label}
        </text>
      ))}
    </svg>
  );
}
