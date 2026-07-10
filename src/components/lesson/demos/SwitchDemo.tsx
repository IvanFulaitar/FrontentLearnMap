import { useState } from "react";
import { DemoToolbar, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type Status = "pending" | "shipped" | "delivered" | "cancelled" | "unknown";

function getBadge(status: Status): { text: string; color: string } {
  switch (status) {
    case "pending":
      return { text: "Очікує обробки", color: "#a16207" };
    case "shipped":
      return { text: "Відправлено", color: "#1d4ed8" };
    case "delivered":
      return { text: "Доставлено", color: "#15803d" };
    case "cancelled":
      return { text: "Скасовано", color: "#b91c1c" };
    default:
      return { text: "Невідомий статус", color: "#6b7280" };
  }
}

const CODE_BY_STATUS: Record<Status, string> = {
  pending: `case "pending":
  return { text: "Очікує обробки", color: "#a16207" };`,
  shipped: `case "shipped":
  return { text: "Відправлено", color: "#1d4ed8" };`,
  delivered: `case "delivered":
  return { text: "Доставлено", color: "#15803d" };`,
  cancelled: `case "cancelled":
  return { text: "Скасовано", color: "#b91c1c" };`,
  unknown: `default:
  return { text: "Невідомий статус", color: "#6b7280" };`,
};

/**
 * Live demo for "Оператор switch": pick an order status and see the real
 * switch statement below pick the matching case (or fall to default),
 * rendering a real colored badge — same value, same code, just different
 * case matched.
 */
export function SwitchDemo() {
  const [status, setStatus] = useState<Status>("pending");
  const badge = getBadge(status);

  return (
    <div className={styles.demoStack}>
      <DemoToolbar
        options={[
          { value: "pending", label: "Очікує" },
          { value: "shipped", label: "Відправлено" },
          { value: "delivered", label: "Доставлено" },
          { value: "cancelled", label: "Скасовано" },
          { value: "unknown", label: "Невідомий (default)" },
        ]}
        value={status}
        onChange={(value) => setStatus(value as Status)}
      />

      <DemoPreview label="Реальний бейдж, побудований через switch(status)">
        <div className={styles.semanticBlock}>
          <span
            style={{
              display: "inline-block",
              padding: "4px 12px",
              borderRadius: 999,
              color: "white",
              backgroundColor: badge.color,
              fontWeight: 600,
            }}
          >
            {badge.text}
          </span>
        </div>
      </DemoPreview>

      <DemoExplanation>
        switch(status) порівнює status з кожним case зверху вниз і виконує блок першого збігу. break (тут — return)
        зупиняє виконання одразу після знайденого case — без нього код "провалився" б у наступний case.
      </DemoExplanation>

      <DemoCodeSnippet
        code={`function getBadge(status) {
  switch (status) {
    ${CODE_BY_STATUS[status]}
  }
}

getBadge("${status}"); // ${JSON.stringify(badge)}`}
      />

      <DemoKeyTakeaway>
        switch зручний саме для порівняння ОДНОГО значення з кількома фіксованими варіантами — статус, роль, тип
        файлу. default обробляє все, що не збіглося з жодним case, і рятує від "тихого" showing нічого для
        неочікуваного значення.
      </DemoKeyTakeaway>
    </div>
  );
}
