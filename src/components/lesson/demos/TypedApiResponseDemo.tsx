import { useState } from "react";
import { DemoPreview, DemoToolbar, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

interface Product {
  title: string;
  price: number;
}

// function isProduct(value: unknown): value is Product
function isProduct(value: unknown): value is Product {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const candidate = value as Record<string, unknown>;
  return typeof candidate.title === "string" && typeof candidate.price === "number";
}

type RawResponseKind = "valid" | "missing-price" | "wrong-type" | "not-object";

const RAW_RESPONSES: Record<RawResponseKind, { code: string; value: unknown }> = {
  valid: { code: '{ title: "Латте", price: 65 }', value: { title: "Латте", price: 65 } },
  "missing-price": { code: '{ title: "Латте" }', value: { title: "Латте" } },
  "wrong-type": { code: '{ title: "Латте", price: "65" }', value: { title: "Латте", price: "65" } },
  "not-object": { code: "null", value: null },
};

/**
 * Live demo for "Типізовані відповіді API": models data arriving as
 * `unknown` (the honest type for anything from `fetch`/JSON.parse) and a
 * real, hand-written type-guard function `isProduct` that genuinely
 * checks the real shape at runtime — no blind `as Product` casting.
 */
export function TypedApiResponseDemo() {
  const [kind, setKind] = useState<RawResponseKind>("valid");
  const raw = RAW_RESPONSES[kind];
  const valid = isProduct(raw.value);

  return (
    <div className={styles.tsStage}>
      <DemoPreview label="function isProduct(value: unknown): value is Product">
        <DemoToolbar
          options={[
            { value: "valid", label: "Коректна відповідь" },
            { value: "missing-price", label: "Без price" },
            { value: "wrong-type", label: "price — рядок" },
            { value: "not-object", label: "null" },
          ]}
          value={kind}
          onChange={(value) => setKind(value as RawResponseKind)}
        />

        <div className={styles.tsRow}>
          <span className={styles.tsCode}>const data: unknown = {raw.code};</span>
          <span className={valid ? styles.tsBadgeOk : styles.tsBadgeErr}>{valid ? "isProduct: true" : "isProduct: false"}</span>
        </div>

        <div className={`${styles.tsCompilerBox} ${valid ? styles.tsCompilerBoxOk : styles.tsCompilerBoxErr}`}>
          {valid
            ? `if (isProduct(data)) звужує тип до Product — доступ до data.title і data.price безпечний.\n→ реальний результат: ${JSON.stringify(raw.value)}`
            : "isProduct(data) реально повернув false — доступ до .title/.price тут заборонений компілятором, дані не звужені до Product.\n→ Без цієї перевірки код продовжив би працювати з обʼєктом неправильної форми."}
        </div>
      </DemoPreview>

      <DemoExplanation>
        Дані, що прийшли з fetch чи JSON.parse, чесно мають тип unknown (детальніше про unknown — у модулі ts-basics)
        — компілятор не знає заздалегідь, якої вони форми, бо це дані ЗЗОВНІ програми. Приведення as Product без
        перевірки — це просто обіцянка розробника компілятору, яку ніхто не звіряє з реальністю: якщо сервер раптом
        поверне іншу форму, as Product однаково &quot;спрацює&quot; на етапі типів, а помилка станеться десь глибше в
        коді. isProduct реально перевіряє форму об'єкта (typeof title === &quot;string&quot; && typeof price ===
        &quot;number&quot;) — і лише після реальної перевірки компілятор звужує тип до Product.
      </DemoExplanation>

      <DemoKeyTakeaway>
        Дані з мережі варто типізувати як unknown і перевіряти реальною функцією-предикатом (детальніше про
        предикати — у модулі ts-functions) перед використанням — це чесніше й безпечніше, ніж сліпе приведення
        as Product, яке нічого реально не перевіряє.
      </DemoKeyTakeaway>
    </div>
  );
}
