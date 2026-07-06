import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./framework.module.css";

/** Wraps an element and flashes a brief highlight ring around it whenever
 * `signal` changes — used to draw the eye to whatever the student's last
 * control change actually affected. */
export function DemoHighlight({ signal, children }: { signal: string | number; children: ReactNode }) {
  const [pulsing, setPulsing] = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setPulsing(true);
    const timeout = setTimeout(() => setPulsing(false), 600);
    return () => clearTimeout(timeout);
  }, [signal]);

  return (
    <div className={`${styles.highlight} ${pulsing ? styles.highlightPulse : ""}`}>
      {children}
    </div>
  );
}
