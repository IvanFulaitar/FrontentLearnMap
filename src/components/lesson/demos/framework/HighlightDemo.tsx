import { useState } from "react";
import type { MouseEvent, ReactNode } from "react";
import styles from "./framework.module.css";

export interface HighlightRegion {
  id: string;
  label: string;
  description: string;
}

interface HighlightDemoProps {
  regions: HighlightRegion[];
  /** Render-prop: the lesson provides its own real markup for the stage,
   * wrapping whichever parts should be hoverable in `<HighlightArea>`. This
   * component only owns the shared "which region is active" state and the
   * caption underneath — the stage itself is different for every lesson
   * (a DOM tree, a page layout, a table, a set of button states...). */
  children: (active: string | null, setActive: (id: string | null) => void) => ReactNode;
}

/** Generic "hover or click a region, see it highlighted + explained"
 * primitive. Reused for landmarks, DOM trees, semantic sectioning, table
 * rows, button states, hero regions — anywhere a lesson's "here's a real
 * layout, point at a part of it" idea applies, instead of every lesson
 * hand-rolling its own hover/highlight state. */
export function HighlightDemo({ regions, children }: HighlightDemoProps) {
  const [active, setActive] = useState<string | null>(null);
  const activeRegion = regions.find((region) => region.id === active) ?? null;

  return (
    <div className={styles.highlightDemo}>
      <div className={styles.highlightStage}>{children(active, setActive)}</div>
      <p className={styles.highlightCaption} aria-live="polite">
        {activeRegion ? (
          <>
            <strong>{activeRegion.label}:</strong> {activeRegion.description}
          </>
        ) : (
          "Наведи курсор (або клікни) на область вище, щоб побачити пояснення."
        )}
      </p>
    </div>
  );
}

interface HighlightAreaProps {
  id: string;
  active: string | null;
  onActivate: (id: string | null) => void;
  children: ReactNode;
  className?: string;
  as?: "div" | "span" | "tr" | "li";
}

/** One hoverable/clickable region inside a `HighlightDemo` stage. Wrap any
 * real element (a `<header>` mock, a table `<tr>`, a DOM-tree node) in this
 * and it gets consistent hover/active styling and keyboard support for
 * free. */
export function HighlightArea({ id, active, onActivate, children, className, as = "div" }: HighlightAreaProps) {
  const Tag = as as "div";
  return (
    <Tag
      className={`${className ?? ""} ${styles.highlightArea} ${active === id ? styles.highlightAreaActive : ""}`}
      onMouseEnter={() => onActivate(id)}
      onMouseLeave={() => onActivate(null)}
      onClick={(event: MouseEvent) => {
        // Regions can nest (e.g. <nav> inside <header>) — without this, a
        // click on the inner region would bubble and let the outer
        // region's handler overwrite it a moment later.
        event.stopPropagation();
        onActivate(id);
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          event.stopPropagation();
          onActivate(active === id ? null : id);
        }
      }}
    >
      {children}
    </Tag>
  );
}
