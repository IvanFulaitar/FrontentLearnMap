import { useState, type ReactNode } from "react";
import styles from "./Tabs.module.css";

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

export function Tabs({ items, defaultId }: { items: TabItem[]; defaultId?: string }) {
  const [activeId, setActiveId] = useState(defaultId ?? items[0]?.id);
  const active = items.find((item) => item.id === activeId) ?? items[0];
  return (
    <div className={styles.tabs}>
      <div className={styles.list} role="tablist">
        {items.map((item) => (
          <button className={`${styles.tab} ${item.id === active.id ? styles.active : ""}`} key={item.id} role="tab" aria-selected={item.id === active.id} onClick={() => setActiveId(item.id)}>
            {item.label}
          </button>
        ))}
      </div>
      <div role="tabpanel">{active?.content}</div>
    </div>
  );
}
