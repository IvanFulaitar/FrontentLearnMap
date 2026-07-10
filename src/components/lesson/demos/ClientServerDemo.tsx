import { useState } from "react";
import { DemoToolbar, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type Side = "browser" | "server";

const BROWSER_TASKS = ["Малює HTML/CSS/JS на екрані", "Реагує на клік користувача", "Показує анімації й переходи", "Надсилає введені email/пароль на сервер"];
const SERVER_TASKS = ["Відкриває базу даних і шукає товари", "Порівнює пароль користувача з базою", "Приймає рішення \"так\"/\"ні\" на запит", "Повертає готові дані у відповідь"];

const BROWSER_CODE = `Неправильно:  перевірку пароля виконує браузер (JavaScript)
Правильно:    браузер лише НАДСИЛАЄ email і пароль на сервер`;
const SERVER_CODE = `Сервер отримує email і пароль
  → відкриває базу даних
  → порівнює пароль
  → повертає "Правильно" або "Неправильно"`;

/**
 * Live demo for "Браузер проти сервера": click between "Браузер" і
 * "Сервер" to see which responsibilities and code belong to which side
 * of the exact same login-check scenario from the lesson — instead of
 * reading both sides as one static comparison table.
 */
export function ClientServerDemo() {
  const [side, setSide] = useState<Side>("browser");
  const isBrowser = side === "browser";

  return (
    <div className={styles.demoStack}>
      <DemoToolbar
        options={[
          { value: "browser", label: "🖥️ Браузер (клієнт)" },
          { value: "server", label: "🗄️ Сервер" },
        ]}
        value={side}
        onChange={(value) => setSide(value as Side)}
      />

      <div className={styles.csCard}>
        <p className={styles.csCardTitle}>
          {isBrowser ? "Що робить браузер під час логіну?" : "Що робить сервер під час логіну?"}
        </p>
        <ul className={styles.csList}>
          {(isBrowser ? BROWSER_TASKS : SERVER_TASKS).map((task) => (
            <li key={task}>{task}</li>
          ))}
        </ul>
      </div>

      <DemoExplanation>
        {isBrowser
          ? "Браузер лише збирає введені користувачем дані (email, пароль) і відправляє їх серверу — він НЕ має доступу до бази даних і не може сам вирішити, правильний пароль чи ні."
          : "Сервер отримує дані від браузера, відкриває базу даних, порівнює пароль і повертає результат — усі рішення й секрети (бази даних, перевірки) живуть саме тут, а не в браузері."}
      </DemoExplanation>

      <DemoCodeSnippet code={isBrowser ? BROWSER_CODE : SERVER_CODE} />

      <DemoKeyTakeaway>
        Один і той самий запит на логін — це завжди дві сторони роботи: браузер збирає й показує, сервер перевіряє й
        вирішує. Секрети (паролі, ключі API, бізнес-логіка) ніколи не повинні залишатись у коді, який виконується в
        браузері, — його завжди можна переглянути через DevTools.
      </DemoKeyTakeaway>
    </div>
  );
}
