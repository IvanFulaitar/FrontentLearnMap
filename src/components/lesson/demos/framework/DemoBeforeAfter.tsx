import { useState, type ReactNode } from "react";
import { DemoToolbar } from "./DemoToolbar";
import styles from "./framework.module.css";

interface DemoBeforeAfterProps {
  before: ReactNode;
  after: ReactNode;
  beforeLabel?: string;
  afterLabel?: string;
}

/** Segmented "Before / After" toggle — lets a student flip between the
 * un-styled and styled version of the same real element to see exactly
 * what one property changed. */
export function DemoBeforeAfter({ before, after, beforeLabel = "До", afterLabel = "Після" }: DemoBeforeAfterProps) {
  const [active, setActive] = useState<"before" | "after">("before");

  return (
    <div className={styles.beforeAfter}>
      <DemoToolbar
        value={active}
        onChange={(value) => setActive(value as "before" | "after")}
        options={[
          { value: "before", label: beforeLabel },
          { value: "after", label: afterLabel },
        ]}
      />
      <div className={styles.beforeAfterStage} key={active}>
        {active === "before" ? before : after}
      </div>
    </div>
  );
}
