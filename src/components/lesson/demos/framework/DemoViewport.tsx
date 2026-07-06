import type { CSSProperties, ReactNode } from "react";
import { DemoSlider } from "./DemoControls";
import styles from "./framework.module.css";

interface DemoViewportProps {
  width: number;
  onWidthChange: (width: number) => void;
  min?: number;
  max?: number;
  children: ReactNode;
}

/** A slider-controlled "viewport simulator" — scales a real frame down to
 * a chosen width so students can see a responsive layout respond live,
 * without resizing the actual browser window. Built for the upcoming
 * Responsive Design / Media Query demos, reused by anything that needs to
 * show "what happens at this screen width". */
export function DemoViewport({ width, onWidthChange, min = 320, max = 900, children }: DemoViewportProps) {
  const frameStyle: CSSProperties = { "--viewport-width": `${width}px` } as CSSProperties;

  return (
    <div className={styles.viewport}>
      <DemoSlider label="Ширина екрана" value={width} onChange={onWidthChange} min={min} max={max} step={10} unit="px" />
      <span className={styles.viewportLabel}>
        {width < 480 ? "📱 Мобільний" : width < 768 ? "📱 Планшет (вузький)" : width < 900 ? "💻 Планшет / малий десктоп" : "🖥 Десктоп"}
      </span>
      <div className={styles.viewportFrame} style={frameStyle}>
        {children}
      </div>
    </div>
  );
}
