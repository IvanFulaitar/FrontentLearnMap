import styles from "./framework.module.css";

export type TimelineStatus = "running" | "paused" | "done" | "error" | "aborted";

export interface TimelineTrack {
  id: string;
  label: string;
  /** Real ms offset (relative to the timeline's own t0) when this track started. */
  startMs: number;
  /** Real ms offset when this track settled. Omit while status is "running"/"paused" — the bar grows using nowMs instead. */
  endMs?: number;
  status: TimelineStatus;
  /** Optional trailing note, e.g. "200мс" or "скасовано". Overridden by a live counter while running. */
  note?: string;
}

interface DemoTimelineProps {
  tracks: TimelineTrack[];
  /** Current real elapsed ms (from useTimelineClock), used to grow "running"/"paused" bars live. */
  nowMs: number;
  /** Total ms the full width of the track represents. */
  scaleMs: number;
}

const STATUS_LABEL: Record<TimelineStatus, string> = {
  running: "виконується",
  paused: "очікує",
  done: "готово",
  error: "помилка",
  aborted: "скасовано",
};

function barClassName(status: TimelineStatus): string {
  switch (status) {
    case "running":
      return styles.timelineBarRunning;
    case "paused":
      return styles.timelineBarPaused;
    case "done":
      return styles.timelineBarDone;
    case "error":
      return styles.timelineBarError;
    case "aborted":
      return styles.timelineBarAborted;
    default:
      return "";
  }
}

/**
 * Real-time animated Gantt-style timeline: each track's bar width is
 * computed from genuine elapsed milliseconds (nowMs, driven by
 * useTimelineClock's requestAnimationFrame loop) — never a scripted CSS
 * animation with a fixed duration. Used to visualize actual concurrent
 * timers/requests/awaits instead of describing them in a text log.
 */
export function DemoTimeline({ tracks, nowMs, scaleMs }: DemoTimelineProps) {
  const ticks = [0, scaleMs / 2, scaleMs];

  return (
    <div className={styles.timeline}>
      <div className={styles.timelineAxis}>
        {ticks.map((t, i) => (
          <span key={i}>{Math.round(t)}мс</span>
        ))}
      </div>
      {tracks.map((track) => {
        const startPct = Math.max(0, Math.min(100, (track.startMs / scaleMs) * 100));
        const activeEnd = track.status === "running" || track.status === "paused" ? nowMs : (track.endMs ?? track.startMs);
        const endPct = Math.max(startPct, Math.min(100, (activeEnd / scaleMs) * 100));
        const widthPct = Math.max(0, endPct - startPct);
        const liveNote =
          track.status === "running" || track.status === "paused"
            ? `${Math.max(0, Math.round(nowMs - track.startMs))}мс`
            : (track.note ?? (track.endMs !== undefined ? `${Math.round(track.endMs - track.startMs)}мс` : ""));

        return (
          <div className={styles.timelineRow} key={track.id}>
            <span className={styles.timelineLabel}>{track.label}</span>
            <div className={styles.timelineTrack} role="img" aria-label={`${track.label}: ${STATUS_LABEL[track.status]}`}>
              <div className={`${styles.timelineBar} ${barClassName(track.status)}`} style={{ marginLeft: `${startPct}%`, width: `${widthPct}%` }} />
            </div>
            <span className={styles.timelineNote}>{liveNote}</span>
          </div>
        );
      })}
    </div>
  );
}
