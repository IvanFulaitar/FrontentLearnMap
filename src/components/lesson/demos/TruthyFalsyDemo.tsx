import { useState } from "react";
import { DemoToolbar, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type ScenarioId =
  | "zero"
  | "emptyString"
  | "nullVal"
  | "undefinedVal"
  | "nanVal"
  | "falseVal"
  | "stringZero"
  | "spaceString"
  | "one"
  | "text"
  | "emptyArray"
  | "emptyObject";

interface Scenario {
  label: string;
  code: string;
  truthy: boolean;
  note: string;
}

const SCENARIOS: Record<ScenarioId, Scenario> = {
  zero: { label: "0", code: "0", truthy: Boolean(0), note: "falsy — число 0." },
  emptyString: { label: '""', code: '""', truthy: Boolean(""), note: "falsy — порожній рядок." },
  nullVal: { label: "null", code: "null", truthy: Boolean(null), note: "falsy — свідома відсутність значення." },
  undefinedVal: { label: "undefined", code: "undefined", truthy: Boolean(undefined), note: "falsy — значення ще не встановлено." },
  nanVal: { label: "NaN", code: "NaN", truthy: Boolean(NaN), note: "falsy — навіть \"не число\" рахується falsy." },
  falseVal: { label: "false", code: "false", truthy: Boolean(false), note: "falsy — сам boolean false." },
  stringZero: { label: '"0"', code: '"0"', truthy: Boolean("0"), note: "truthy! Непорожній рядок, навіть якщо всередині \"0\"." },
  spaceString: { label: '" "', code: '" "', truthy: Boolean(" "), note: "truthy! Рядок з одним пробілом теж непорожній." },
  one: { label: "1", code: "1", truthy: Boolean(1), note: "truthy — будь-яке ненульове число." },
  text: { label: '"text"', code: '"text"', truthy: Boolean("text"), note: "truthy — непорожній рядок." },
  emptyArray: { label: "[]", code: "[]", truthy: Boolean([]), note: "truthy! Порожній масив — це ОБ'ЄКТ, а об'єкти завжди truthy." },
  emptyObject: { label: "{}", code: "{}", truthy: Boolean({}), note: "truthy! Навіть порожній об'єкт truthy — перевіряй властивості, не сам факт існування." },
};

/**
 * Live demo for "Truthy та falsy значення": click any preset value and see
 * a real `if (value)` evaluate it — including the classic gotcha that `[]`
 * and `{}` are truthy even when empty, which trips up nearly every
 * beginner checking "is this list empty?".
 */
export function TruthyFalsyDemo() {
  const [scenarioId, setScenarioId] = useState<ScenarioId>("zero");
  const scenario = SCENARIOS[scenarioId];

  return (
    <div className={styles.demoStack}>
      <DemoToolbar
        options={(Object.keys(SCENARIOS) as ScenarioId[]).map((id) => ({ value: id, label: SCENARIOS[id].label }))}
        value={scenarioId}
        onChange={(value) => setScenarioId(value as ScenarioId)}
      />

      <DemoPreview label="Реальна перевірка if (value) для обраного значення">
        <div className={styles.semanticBlock}>
          <p>
            Значення: <code>{scenario.code}</code>
          </p>
          <p>
            Результат: <strong>{scenario.truthy ? "truthy" : "falsy"}</strong>
          </p>
          <p>
            <small>{scenario.note}</small>
          </p>
        </div>
      </DemoPreview>

      <DemoExplanation>
        У логічному контексті (if, &&, ||, !!) JavaScript приводить будь-яке значення до true/false. Falsy лише 6
        значень: false, 0, "", null, undefined, NaN. Усе інше — включно з "0", " ", [] і {"{}"}— truthy.
      </DemoExplanation>

      <DemoCodeSnippet
        code={`const value = ${scenario.code};

if (value) {
  console.log("truthy");
} else {
  console.log("falsy");
}
// ${scenario.truthy ? "truthy" : "falsy"}`}
      />

      <DemoKeyTakeaway>
        [] і {"{}"} truthy навіть порожні — щоб перевірити "чи масив порожній", завжди пиши if (array.length), а не
        if (array). Це найчастіша прихована помилка при переході від truthy/falsy до реальних масивів даних.
      </DemoKeyTakeaway>
    </div>
  );
}
