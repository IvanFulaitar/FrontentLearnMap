import { useState } from "react";
import { DemoToolbar, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type Syntax = "template" | "array" | "clsx";

const TABS = ["Меню", "Про нас", "Контакти"];

function buildCode(syntax: Syntax, activeIndex: number): string {
  if (syntax === "template")
    return `<button className={\`\${styles.tab} \${isActive ? styles.active : ""}\`}>
  ${TABS[activeIndex]}
</button>`;
  if (syntax === "array")
    return `<button className={[styles.tab, isActive && styles.active].filter(Boolean).join(" ")}>
  ${TABS[activeIndex]}
</button>`;
  return `<button className={clsx(styles.tab, { [styles.active]: isActive })}>
  ${TABS[activeIndex]}
</button>`;
}

/**
 * Live demo for "Умовні класи в React": a real clickable tab bar (the exact
 * UI the lesson's practice task builds) drives real React state, and a
 * syntax toolbar swaps which of the three equivalent className approaches
 * (template string / array+filter / clsx) is shown producing that same
 * click-driven result.
 */
export function ConditionalClassesDemo() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [syntax, setSyntax] = useState<Syntax>("template");

  return (
    <div className={styles.demoStack}>
      <DemoToolbar
        options={[
          { value: "template", label: "Шаблонний рядок" },
          { value: "array", label: "Масив + filter" },
          { value: "clsx", label: "clsx()" },
        ]}
        value={syntax}
        onChange={(value) => setSyntax(value as Syntax)}
      />

      <div className={styles.ccTabBar}>
        {TABS.map((tab, index) => (
          <button
            key={tab}
            type="button"
            className={`${styles.ccTab} ${index === activeIndex ? styles.ccTabActive : ""}`}
            onClick={() => setActiveIndex(index)}
          >
            {tab}
          </button>
        ))}
      </div>

      <DemoExplanation>
        Клікни на іншу вкладку — це реальний isActive стан React, який змінює className. Три варіанти коду нижче
        (шаблонний рядок, масив + filter/join, clsx) дають ІДЕНТИЧНИЙ візуальний результат для одного й того самого
        кліку — різниця лише в тому, як записаний сам вираз умовного класу.
      </DemoExplanation>

      <DemoCodeSnippet code={buildCode(syntax, activeIndex)} />

      <DemoKeyTakeaway>
        className приймає звичайний рядок — умовний клас це просто конкатенація, керована станом React. Для 1-2
        умовних класів досить шаблонного рядка; коли умов стає більше, масив+filter чи бібліотека clsx читаються
        суттєво чистіше, хоч результат у браузері однаковий.
      </DemoKeyTakeaway>
    </div>
  );
}
