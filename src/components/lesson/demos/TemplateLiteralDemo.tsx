import { useState } from "react";
import { DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

/**
 * Live demo for "Шаблонні рядки": typing a product name and quantity
 * rebuilds both a cart message and a button's aria-label through real
 * template literals — showing that ${} works for accessibility strings,
 * not just visible text.
 */
export function TemplateLiteralDemo() {
  const [name, setName] = useState("Кава");
  const [count, setCount] = useState(3);

  const message = `У кошику ${count} ${count === 1 ? "товар" : "товари"}: ${name}`;
  const ariaLabel = `Видалити ${name} з кошика`;

  const codeText =
    'const message = `У кошику ${count} ${count === 1 ? "товар" : "товари"}: ${name}`;\n' +
    `console.log(message); // "${message}"\n\n` +
    "const ariaLabel = `Видалити ${name} з кошика`;\n" +
    `console.log(ariaLabel); // "${ariaLabel}"`;

  return (
    <div className={styles.demoStack}>
      <DemoPreview label="Введи назву товару і кількість — обидва рядки оновлюються живо">
        <div className={styles.semanticBlock}>
          <label>
            Назва товару:{" "}
            <input type="text" value={name} onChange={(event) => setName(event.target.value)} style={{ width: 120 }} />
          </label>
          <label style={{ marginLeft: 16 }}>
            Кількість:{" "}
            <input
              type="number"
              min={0}
              value={count}
              onChange={(event) => setCount(Number(event.target.value) || 0)}
              style={{ width: 70 }}
            />
          </label>
          <p>{message}</p>
          <button type="button" aria-label={ariaLabel}>
            ✕
          </button>
          <p>
            <small>aria-label кнопки: "{ariaLabel}"</small>
          </p>
        </div>
      </DemoPreview>

      <DemoExplanation>
        Обидва рядки — message і ariaLabel — побудовані одним і тим самим template literal з ${"{вираз}"}. Це
        працює однаково для тексту, який бачить користувач, і для aria-label, який озвучує скрінрідер: жодної
        різниці в підході, лише різне призначення рядка.
      </DemoExplanation>

      <DemoCodeSnippet code={codeText} />

      <DemoKeyTakeaway>
        ${"{вираз}"} приймає будь-який JS-вираз, включно з тернарним оператором для множини (товар/товари). Це
        працює для будь-якого рядка в інтерфейсі — видимого тексту, aria-label, title, placeholder.
      </DemoKeyTakeaway>
    </div>
  );
}
