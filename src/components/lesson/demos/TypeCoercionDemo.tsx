import { useState } from "react";
import { DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

/**
 * Live demo for "Перетворення типів": two text inputs whose values are
 * ALWAYS strings — exactly like real `<input>` fields — feeding both the
 * raw `+` operator (string concatenation) and the explicit `Number(a) +
 * Number(b)` conversion, so the classic "1" + 1 === "11" surprise becomes
 * something the student causes themselves by typing, not just reads about.
 */
export function TypeCoercionDemo() {
  const [a, setA] = useState("65");
  const [b, setB] = useState("2");

  const rawResult = a + b;
  const numericResult = Number(a) + Number(b);
  const isNumericValid = !Number.isNaN(numericResult);

  const codeText =
    `const a = ${JSON.stringify(a)}; // рядок, як завжди з <input>\n` +
    `const b = ${JSON.stringify(b)};\n\n` +
    `console.log(a + b); // ${JSON.stringify(rawResult)}\n` +
    `console.log(Number(a) + Number(b)); // ${isNumericValid ? numericResult : "NaN"}`;

  return (
    <div className={styles.demoStack}>
      <DemoPreview label="Обидва значення приходять як рядки — так само, як з будь-якого <input>">
        <div className={styles.semanticBlock}>
          <label>
            Ціна (a):{" "}
            <input
              type="text"
              value={a}
              onChange={(event) => setA(event.target.value)}
              style={{ width: 90 }}
            />
          </label>
          <label style={{ marginLeft: 16 }}>
            Кількість (b):{" "}
            <input
              type="text"
              value={b}
              onChange={(event) => setB(event.target.value)}
              style={{ width: 90 }}
            />
          </label>
          <p>
            <code>a + b</code> → <strong>{JSON.stringify(rawResult)}</strong> (конкатенація рядків!)
          </p>
          <p>
            <code>Number(a) + Number(b)</code> → <strong>{isNumericValid ? numericResult : "NaN"}</strong>
          </p>
        </div>
      </DemoPreview>

      <DemoExplanation>
        a і b — рядки, точно як значення з реального `input.value`. Оператор + з рядком хоч на одному боці завжди
        виконує конкатенацію, тому "65" + "2" дає "652", а не 67. Number(a) + Number(b) явно перетворює обидва
        значення на числа перед додаванням і дає очікуваний результат.
      </DemoExplanation>

      <DemoCodeSnippet code={codeText} />

      <DemoKeyTakeaway>
        Будь-яке значення з input.value, localStorage чи URL — рядок, навіть якщо на екрані видно лише цифри.
        Явний Number()/parseFloat() одразу після отримання даних рятує від конкатенації замість арифметики.
      </DemoKeyTakeaway>
    </div>
  );
}
