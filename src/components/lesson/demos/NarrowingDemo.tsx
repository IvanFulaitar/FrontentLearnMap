import { useState } from "react";
import { DemoPreview, DemoToolbar, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

interface NarrowingCandidate {
  id: string;
  label: string;
  value: string | number | null;
}

const CANDIDATES: NarrowingCandidate[] = [
  { id: "num", label: "42.5 (число)", value: 42.5 },
  { id: "str", label: '"оля" (рядок)', value: "оля" },
  { id: "null", label: "null", value: null },
];

/**
 * Live demo for "Основи звуження типів": pick a real value of type
 * `string | number | null` and watch the SAME narrowing steps TypeScript
 * would follow — each branch's condition is a real, live-evaluated check
 * (typeof / === null) on the actual selected value, and the final output
 * is computed by really calling toFixed()/toUpperCase() once the type is
 * narrowed enough to allow it.
 */
export function NarrowingDemo() {
  const [selectedId, setSelectedId] = useState("num");
  const selected = CANDIDATES.find((item) => item.id === selectedId) ?? CANDIDATES[0];
  const value = selected.value;

  const isNull = value === null;
  const isNumber = !isNull && typeof value === "number";
  const isString = !isNull && typeof value === "string";

  let output: string;
  if (isNull) {
    output = "Ім'я відсутнє";
  } else if (isNumber) {
    output = (value as number).toFixed(2);
  } else {
    output = (value as string).toUpperCase();
  }

  return (
    <div className={styles.tsStage}>
      <DemoPreview label="Тип: value: string | number | null — обери значення й пройди звуження крок за кроком">
        <DemoToolbar
          options={CANDIDATES.map((item) => ({ value: item.id, label: item.label }))}
          value={selectedId}
          onChange={setSelectedId}
        />

        <ol className={styles.tsStepList}>
          <li className={isNull ? styles.tsStepActive : styles.tsStepDone}>
            1. if (value === null) → {String(isNull)}
            {isNull ? " — беремо цю гілку, тип звужується до: значення відсутнє" : ""}
          </li>
          <li className={!isNull && isNumber ? styles.tsStepActive : styles.tsStepDone}>
            2. else if (typeof value === &quot;number&quot;) → {String(!isNull && isNumber)}
            {!isNull && isNumber ? " — беремо цю гілку, тип звужується до: number" : ""}
          </li>
          <li className={!isNull && isString ? styles.tsStepActive : styles.tsStepDone}>
            3. else → залишається тільки string
            {!isNull && isString ? " — беремо цю гілку, тип звужується до: string" : ""}
          </li>
        </ol>

        <div className={`${styles.tsCompilerBox} ${styles.tsCompilerBoxOk}`}>
          <span className={styles.tsCode}>
            {isNull ? 'return "Ім\'я відсутнє";' : isNumber ? "return value.toFixed(2);" : "return value.toUpperCase();"}
          </span>
          {"\n\n"}
          {"→ реальний результат: "}
          <strong>{output}</strong>
        </div>
      </DemoPreview>

      <DemoExplanation>
        До жодної перевірки TypeScript знає лише широкий тип string | number | null — і забороняє викликати
        toFixed() чи toUpperCase() одразу, бо не всі три варіанти їх мають. Кожен if звужує тип лише для коду
        всередині цієї гілки: після if (value === null) у гілці лишається null, у протилежному випадку — вже тільки
        string | number, і так далі, поки не залишиться рівно один тип.
      </DemoExplanation>

      <DemoKeyTakeaway>
        Звуження — це не магія рантайму, а те, як компілятор перечитує твої ж перевірки (typeof, === null, in) і
        всередині кожної гілки дозволяє лише ті операції, які справді безпечні для звуженого типу цієї гілки.
      </DemoKeyTakeaway>
    </div>
  );
}
