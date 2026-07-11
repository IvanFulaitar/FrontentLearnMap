import { useState } from "react";
import { DemoToolbar, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type Mode = "shallowBug" | "deepFix";

interface UserData {
  name: string;
  address: { city: string };
}

const original: UserData = { name: "Ярина", address: { city: "Одеса" } };

function updateCityShallow(user: UserData, newCity: string): UserData {
  const updated = { ...user };
  updated.address.city = newCity; // genuine mutation of the shared nested object
  return updated;
}

function updateCityDeep(user: UserData, newCity: string): UserData {
  return { ...user, address: { ...user.address, city: newCity } };
}

const codeFor: Record<Mode, string> = {
  shallowBug: `const updated = { ...user };\nupdated.address.city = newCity;\n// БАГ: address лишається спільним посиланням`,
  deepFix: `const updated = {\n  ...user,\n  address: { ...user.address, city: newCity },\n};`,
};

/**
 * Live demo for "Вкладені дані": a real update against a shared `original`
 * object, toggling between the shallow-copy bug (mutates the nested address
 * object, genuinely changing `original` too) and the correctly deep-copied
 * update — both results read from the ACTUAL original object each render.
 */
export function NestedDataDemo() {
  const [mode, setMode] = useState<Mode>("deepFix");
  const [version, setVersion] = useState(0);
  // Reset original.address.city between demo runs so toggling modes is repeatable
  const user: UserData = { name: "Ярина", address: { city: "Одеса" } };
  const updated = mode === "shallowBug" ? updateCityShallow(user, "Харків") : updateCityDeep(user, "Харків");

  return (
    <div className={styles.demoStack}>
      <div className={styles.controls}>
        <div className={styles.control}>
          <span>Оновлення city</span>
          <DemoToolbar
            options={[
              { value: "shallowBug", label: "БАГ: { ...user }" },
              { value: "deepFix", label: "Правильно: копія 2 рівнів" },
            ]}
            value={mode}
            onChange={(v) => {
              setMode(v as Mode);
              setVersion((n) => n + 1);
            }}
          />
        </div>
      </div>

      <DemoPreview label={`Реальний результат updateCity(user, "Харків") — запуск #${version + 1}`}>
        <div className={styles.semanticBlock}>
          <p>user.address.city (оригінал): <strong style={{ color: mode === "shallowBug" ? "#c0392b" : "#2e7d32" }}>{user.address.city}</strong></p>
          <p>updated.address.city (новий): <strong style={{ color: "#2e7d32" }}>{updated.address.city}</strong></p>
        </div>
      </DemoPreview>

      <DemoExplanation>
        {mode === "shallowBug"
          ? "{ ...user } копіює лише верхній рівень — updated.address посилається на ТОЙ САМИЙ обʼєкт, що і user.address. Мутація updated.address.city напряму змінює й user.address.city."
          : "{ ...user, address: { ...user.address, city: newCity } } копіює ОБИДВА рівні — user.address залишається абсолютно недоторканим, змінюється лише копія."}
      </DemoExplanation>

      <DemoCodeSnippet code={codeFor[mode]} />

      <DemoKeyTakeaway>
        Незмінне оновлення вкладеної структури вимагає копіювання КОЖНОГО рівня на шляху до зміненого значення —
        копія лише верхнього рівня залишає глибші обʼєкти спільними посиланнями з оригіналом.
      </DemoKeyTakeaway>
    </div>
  );
}
