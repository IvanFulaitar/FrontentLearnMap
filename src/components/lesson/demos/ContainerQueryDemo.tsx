import { useState } from "react";
import { DemoSlider, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

const CARD = (
  <div className={styles.cqCard}>
    <div className={styles.cqCardImage} />
    <div>
      <strong className={styles.cqCardTitle}>Капучино</strong>
      <p className={styles.cqCardPrice}>85 грн</p>
    </div>
  </div>
);

/**
 * Live demo for "Container queries": drag ONLY the sidebar container's
 * width — the browser window itself never changes — and watch the SAME
 * card flip from vertical to horizontal purely because ITS OWN container
 * crossed 260px, via a real @container (min-width: 260px) rule. The fixed
 * 320px "menu-grid" box next to it proves the point: two containers, same
 * page width, independent layouts.
 */
export function ContainerQueryDemo() {
  const [sidebarWidth, setSidebarWidth] = useState(200);

  return (
    <div className={styles.demoStack}>
      <DemoSlider
        label="Ширина sidebar-контейнера (сторінка й вікно браузера НЕ змінюються)"
        value={sidebarWidth}
        onChange={setSidebarWidth}
        min={160}
        max={420}
        unit="px"
      />

      <div className={styles.cqRow}>
        <div className={styles.cqBox} style={{ width: sidebarWidth }}>
          <span className={styles.cqBoxLabel}>.sidebar ({sidebarWidth}px)</span>
          <div className={styles.cqContainer}>{CARD}</div>
        </div>
        <div className={styles.cqBox} style={{ width: 320 }}>
          <span className={styles.cqBoxLabel}>.menu-grid (320px, фіксовано)</span>
          <div className={styles.cqContainer}>{CARD}</div>
        </div>
      </div>

      <DemoExplanation>
        {sidebarWidth < 260
          ? `Sidebar зараз ${sidebarWidth}px — вужчий за 260px, картка вертикальна. Menu-grid (320px) уже перетнув поріг і показує картку горизонтально — той самий @container-поріг, різний результат, бо контейнери різні.`
          : `Sidebar зараз ${sidebarWidth}px — ширший за 260px, картка стала горизонтальною, як і в menu-grid. Обидва контейнери незалежно перетнули той самий поріг 260px.`}
      </DemoExplanation>

      <DemoCodeSnippet
        code={`.sidebar, .menu-grid {
  container-type: inline-size;
}

@container (min-width: 260px) {
  .menu-card {
    display: flex;
    flex-direction: row;
  }
}

/* sidebar: ${sidebarWidth}px → ${sidebarWidth >= 260 ? "горизонтально" : "вертикально"} */
/* menu-grid: 320px → горизонтально (завжди, у цьому демо) */`}
      />

      <DemoKeyTakeaway>
        Вікно браузера тут узагалі не змінюється — лише ширина одного конкретного контейнера. Медіазапит
        (@media) на це не зреагував би: він бачить лише вікно цілком, а @container бачить саме той контейнер,
        усередині якого лежить елемент.
      </DemoKeyTakeaway>
    </div>
  );
}
