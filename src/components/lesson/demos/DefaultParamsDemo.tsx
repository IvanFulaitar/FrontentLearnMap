import { useState } from "react";
import { DemoToolbar, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type Approach = "default" | "or" | "nullish";
type RatePreset = "unset" | "zero" | "custom";

function getPriceWithDefault(base: number, rate: number = 0.2): number {
  return base + base * rate;
}

function getPriceWithOr(base: number, rate?: number): number {
  const r = rate || 0.2;
  return base + base * r;
}

function getPriceWithNullish(base: number, rate?: number): number {
  const r = rate ?? 0.2;
  return base + base * r;
}

const RATE_VALUE: Record<RatePreset, number | undefined> = {
  unset: undefined,
  zero: 0,
  custom: 0.3,
};

function runApproach(approach: Approach, rate: number | undefined): number {
  if (approach === "default") return rate === undefined ? getPriceWithDefault(1000) : getPriceWithDefault(1000, rate);
  if (approach === "or") return getPriceWithOr(1000, rate);
  return getPriceWithNullish(1000, rate);
}

/**
 * Live demo for "Параметри та значення за замовчуванням": three real
 * functions (default parameter, `||`, `??`) called with the same rate
 * presets — including 0 — so the `||` bug (legit 0 overridden) is a real,
 * computed number, not a described abstraction.
 */
export function DefaultParamsDemo() {
  const [approach, setApproach] = useState<Approach>("or");
  const [ratePreset, setRatePreset] = useState<RatePreset>("zero");
  const rate = RATE_VALUE[ratePreset];
  const result = runApproach(approach, rate);
  const isBugged = approach === "or" && ratePreset === "zero";

  return (
    <div className={styles.demoStack}>
      <div className={styles.controls}>
        <div className={styles.control}>
          <span>Підхід</span>
          <DemoToolbar
            options={[
              { value: "default", label: "rate = 0.2" },
              { value: "or", label: "rate || 0.2" },
              { value: "nullish", label: "rate ?? 0.2" },
            ]}
            value={approach}
            onChange={(value) => setApproach(value as Approach)}
          />
        </div>
        <div className={styles.control}>
          <span>Що передано як rate</span>
          <DemoToolbar
            options={[
              { value: "unset", label: "не передано" },
              { value: "zero", label: "0 (без податку)" },
              { value: "custom", label: "0.3" },
            ]}
            value={ratePreset}
            onChange={(value) => setRatePreset(value as RatePreset)}
          />
        </div>
      </div>

      <DemoPreview label="getPrice(1000, rate) для обраної комбінації">
        <div className={styles.semanticBlock}>
          <p>
            base = 1000, rate = <code>{rate === undefined ? "не передано" : String(rate)}</code>
          </p>
          <p>
            Результат: <strong style={{ color: isBugged ? "#c0392b" : "#2e7d32" }}>{result}</strong>
          </p>
          {isBugged && <p><small>БАГ: rate = 0 мало дати 1000 (без податку), а || замінив його на 0.2.</small></p>}
        </div>
      </DemoPreview>

      <DemoExplanation>
        {approach === "or"
          ? "rate || 0.2 підставляє 0.2 для БУДЬ-ЯКОГО falsy значення rate, включно з легітимним 0 — тому rate=0 тут помилково замінюється замовчуванням."
          : approach === "nullish"
            ? "rate ?? 0.2 підставляє 0.2 лише коли rate саме null чи undefined — легітимний 0 залишається без змін."
            : "Параметр за замовчуванням rate = 0.2 підставляється лише коли аргумент не переданий (undefined) — явно передане 0 коректно зберігається."}
      </DemoExplanation>

      <DemoCodeSnippet
        code={
          approach === "default"
            ? `function getPrice(base, rate = 0.2) {\n  return base + base * rate;\n}\n\ngetPrice(1000${rate === undefined ? "" : `, ${rate}`}); // ${result}`
            : approach === "or"
              ? `function getPrice(base, rate) {\n  const r = rate || 0.2;\n  return base + base * r;\n}\n\ngetPrice(1000, ${rate}); // ${result}`
              : `function getPrice(base, rate) {\n  const r = rate ?? 0.2;\n  return base + base * r;\n}\n\ngetPrice(1000, ${rate}); // ${result}`
        }
      />

      <DemoKeyTakeaway>
        Для опціональних числових параметрів, де 0 — легітимне значення (податок, знижка, обсяг), || завжди
        небезпечний. Обирай параметр за замовчуванням чи ??.
      </DemoKeyTakeaway>
    </div>
  );
}
