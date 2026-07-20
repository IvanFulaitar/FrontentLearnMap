import { useRef, useState } from "react";
import { DemoToolbar, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type Mode = "pure" | "impure";

function formatPricePure(amount: number, discount: number): string {
  return (amount * (1 - discount)).toFixed(2) + " грн";
}

/**
 * Live demo for "Багаторазові утиліти": a real impure function genuinely
 * reads a mutable ref (`currentDiscountRef`, standing in for a plain `let`
 * outside the function, exactly as the lesson's broken example does) — so
 * calling it twice with the SAME argument really produces two DIFFERENT
 * real results once the ref is changed, no scripting involved. The pure
 * version, called with the same argument and an explicit discount, always
 * produces the same real result.
 */
export function UtilityFunctionsDemo() {
  const [mode, setMode] = useState<Mode>("impure");
  const currentDiscountRef = useRef(0.1);
  const [log, setLog] = useState<string[]>([]);

  const addLog = (msg: string) => setLog((prev) => [msg, ...prev].slice(0, 5));

  function formatPriceImpure(amount: number): string {
    return (amount * (1 - currentDiscountRef.current)).toFixed(2) + " грн";
  }

  const callFn = () => {
    if (mode === "impure") {
      addLog(`formatPriceImpure(100) = ${formatPriceImpure(100)}  (currentDiscount = ${currentDiscountRef.current})`);
    } else {
      addLog(`formatPricePure(100, 0.1) = ${formatPricePure(100, 0.1)}`);
    }
  };

  const changeDiscount = () => {
    currentDiscountRef.current = currentDiscountRef.current === 0.1 ? 0.5 : 0.1;
    addLog(`(десь у коді) currentDiscount змінено на ${currentDiscountRef.current}`);
  };

  return (
    <div className={styles.demoStack}>
      <div className={styles.controls}>
        <div className={styles.control}>
          <span>Реалізація функції</span>
          <DemoToolbar
            options={[
              { value: "impure", label: "Нечиста (читає зовнішню змінну)" },
              { value: "pure", label: "Чиста (все через параметри)" },
            ]}
            value={mode}
            onChange={(v) => {
              setMode(v as Mode);
              setLog([]);
              currentDiscountRef.current = 0.1;
            }}
          />
        </div>
      </div>

      <DemoPreview label="Реальні виклики однієї й тієї самої функції з аргументом 100">
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <button type="button" onClick={callFn} style={btnStyle}>
            {mode === "impure" ? "Викликати formatPriceImpure(100)" : "Викликати formatPricePure(100, 0.1)"}
          </button>
          {mode === "impure" && (
            <button type="button" onClick={changeDiscount} style={{ ...btnStyle, background: "#c0392b" }}>
              Змінити currentDiscount деінде в коді
            </button>
          )}
        </div>
        <div className={styles.semanticBlock} style={{ marginTop: "10px" }}>
          {log.length === 0 ? (
            <p style={{ color: "var(--muted)" }}>Викликай функцію кілька разів.</p>
          ) : (
            log.map((entry, i) => <p key={i} style={{ margin: "2px 0" }}>{entry}</p>)
          )}
        </div>
      </DemoPreview>

      <DemoExplanation>
        {mode === "impure"
          ? "formatPriceImpure(100) дає РІЗНІ реальні результати для одного й того самого аргументу 100, залежно від того, яким було currentDiscount у момент виклику."
          : "formatPricePure(100, 0.1) з однаковими аргументами завжди дає ОДИН і той самий результат — вона не залежить від жодної зовнішньої змінної."}
      </DemoExplanation>

      <DemoCodeSnippet
        code={
          mode === "impure"
            ? `let currentDiscount = 0.1;\nfunction formatPriceImpure(amount) {\n  return (amount * (1 - currentDiscount)).toFixed(2) + " грн";\n}\nformatPriceImpure(100); // залежить від currentDiscount ЗАРАЗ`
            : `function formatPricePure(amount, discount) {\n  return (amount * (1 - discount)).toFixed(2) + " грн";\n}\nformatPricePure(100, 0.1); // завжди той самий результат`
        }
      />

      <DemoKeyTakeaway>
        Справжня багаторазова утиліта отримує ВСЕ необхідне через параметри. Функція, що читає зовнішню мінливу
        змінну, стає непередбачуваною — той самий виклик може дати різний результат залежно від контексту.
      </DemoKeyTakeaway>
    </div>
  );
}

const btnStyle = {
  padding: "8px 14px",
  borderRadius: "6px",
  border: "1px solid var(--border)",
  background: "var(--primary)",
  color: "white",
  fontWeight: 600,
  cursor: "pointer",
  fontSize: "0.85rem",
} as const;
