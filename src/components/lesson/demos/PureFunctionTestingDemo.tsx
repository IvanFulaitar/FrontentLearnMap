import { useState } from "react";
import { DemoToolbar, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type FixState = "buggy" | "fixed";

function isValidAgeBuggy(age: number): boolean {
  return age > 18; // БАГ: має бути >= 18
}
function isValidAgeFixed(age: number): boolean {
  return age >= 18;
}

function assert(actual: boolean, expected: boolean, description: string) {
  return { passed: actual === expected, description };
}

/**
 * Live demo for "Тестування чистих функцій": a real assert() genuinely
 * calls the real (buggy or fixed) isValidAge function and compares the
 * real returned boolean against the expected value — the ✓/✗ shown is a
 * live computed result, not a scripted outcome. Toggling the boundary test
 * on really reveals the bug (a real ✗) before the fix is applied.
 */
export function PureFunctionTestingDemo() {
  const [fixState, setFixState] = useState<FixState>("buggy");
  const [includeBoundary, setIncludeBoundary] = useState(false);

  const isValidAge = fixState === "fixed" ? isValidAgeFixed : isValidAgeBuggy;

  const tests = [
    assert(isValidAge(25), true, "isValidAge(25) — типовий випадок"),
    ...(includeBoundary ? [assert(isValidAge(18), true, "isValidAge(18) — межове значення")] : []),
    assert(isValidAge(17), false, "isValidAge(17) — нижче межі"),
  ];

  return (
    <div className={styles.demoStack}>
      <div className={styles.controls}>
        <div className={styles.control}>
          <span>Реалізація isValidAge</span>
          <DemoToolbar
            options={[
              { value: "buggy", label: "З багом (age > 18)" },
              { value: "fixed", label: "Виправлено (age >= 18)" },
            ]}
            value={fixState}
            onChange={(v) => setFixState(v as FixState)}
          />
        </div>
        <div className={styles.control}>
          <span>Набір тестів</span>
          <DemoToolbar
            options={[
              { value: "no", label: "Лише типовий випадок" },
              { value: "yes", label: "+ тест на межове значення (18)" },
            ]}
            value={includeBoundary ? "yes" : "no"}
            onChange={(v) => setIncludeBoundary(v === "yes")}
          />
        </div>
      </div>

      <DemoPreview label="Реальний виклик assert() для кожного тесту">
        <div className={styles.semanticBlock}>
          {tests.map((t, i) => (
            <p key={i} style={{ margin: "2px 0", color: t.passed ? "#2e7d32" : "#c0392b" }}>
              {t.passed ? "✓" : "✗"} {t.description}
            </p>
          ))}
        </div>
      </DemoPreview>

      <DemoExplanation>
        {!includeBoundary
          ? "З лише одним типовим тестом (25 років) обидві реалізації (з багом і без) можуть \"проходити\" — баг ще не виявлено."
          : fixState === "buggy"
            ? "Тест на межове значення 18 РЕАЛЬНО провалюється (✗) для багованої реалізації — age > 18 некоректно відхиляє рівно 18 років."
            : "Після виправлення (age >= 18) усі тести, включно з межовим, реально проходять (✓)."}
      </DemoExplanation>

      <DemoCodeSnippet
        code={
          fixState === "buggy"
            ? `function isValidAge(age) {\n  return age > 18; // БАГ\n}\nassert(isValidAge(18), true, "межове значення"); // ✗`
            : `function isValidAge(age) {\n  return age >= 18;\n}\nassert(isValidAge(18), true, "межове значення"); // ✓`
        }
      />

      <DemoKeyTakeaway>
        Тест лише на "типовому" прикладі може дати хибне відчуття коректності. Саме тести на межові значення
        (найменше прийнятне, найбільше прийнятне) найчастіше виявляють реальні баги.
      </DemoKeyTakeaway>
    </div>
  );
}
