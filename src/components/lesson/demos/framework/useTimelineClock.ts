import { useCallback, useEffect, useRef, useState } from "react";

interface TimelineClock {
  /** Real elapsed milliseconds since the last start(), updated every animation frame via performance.now(). */
  elapsedMs: number;
  /** Whether the clock is currently ticking. */
  running: boolean;
  /** Resets elapsedMs to 0 and begins ticking from a real performance.now() timestamp. */
  start: () => void;
  /** Stops ticking; elapsedMs freezes at its last real value. */
  stop: () => void;
}

/**
 * Drives a real requestAnimationFrame loop tied to actual elapsed time
 * (performance.now()) so timeline/Gantt-style demo visuals can grow bars in
 * real time — never on a scripted/fixed-duration CSS animation. The number
 * this hook reports is always the genuine elapsed time since start() was
 * called, read fresh on every frame.
 */
export function useTimelineClock(): TimelineClock {
  const [elapsedMs, setElapsedMs] = useState(0);
  const [running, setRunning] = useState(false);
  const startedAtRef = useRef(0);

  const start = useCallback(() => {
    startedAtRef.current = performance.now();
    setElapsedMs(0);
    setRunning(true);
  }, []);

  const stop = useCallback(() => {
    setRunning(false);
  }, []);

  useEffect(() => {
    if (!running) return;
    let frameId: number;
    const tick = () => {
      setElapsedMs(performance.now() - startedAtRef.current);
      frameId = requestAnimationFrame(tick);
    };
    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [running]);

  return { elapsedMs, running, start, stop };
}
