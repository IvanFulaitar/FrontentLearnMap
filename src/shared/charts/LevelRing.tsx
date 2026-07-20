import { useId } from "react";
import styles from "./LevelRing.module.css";

interface LevelRingProps {
  /** Real progress (0-100) toward the next level, from PlatformContext's level.progress. */
  percent: number;
  /** Real current level number, shown in the center of the ring. */
  level: number;
  size?: number;
}

/**
 * Circular progress ring for the dashboard hero — shows real XP progress
 * toward the next level (platform.level.progress) instead of a flat bar,
 * with the real current level number in the center.
 */
export function LevelRing({ percent, level, size = 76 }: LevelRingProps) {
  const gradientId = useId();
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, percent));
  const offset = circumference - (clamped / 100) * circumference;
  const center = size / 2;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label={`Рівень ${level}, ${clamped}% до наступного рівня`}
      className={styles.ring}
    >
      <defs>
        <linearGradient id={`level-ring-${gradientId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--success)" />
          <stop offset="100%" stopColor="var(--primary)" />
        </linearGradient>
      </defs>
      <circle cx={center} cy={center} r={radius} fill="none" stroke="var(--border)" strokeWidth={strokeWidth} />
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke={`url(#level-ring-${gradientId})`}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${center} ${center})`}
        className={styles.ringProgress}
      />
      <text x="50%" y="50%" textAnchor="middle" dominantBaseline="central" className={styles.ringLevel}>
        {level}
      </text>
    </svg>
  );
}
