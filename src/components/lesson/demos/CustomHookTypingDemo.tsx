import { useState } from "react";
import { DemoPreview, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

interface UseCounterResult {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

// function useCounter(initial: number): UseCounterResult
function useCounter(initial: number): UseCounterResult {
  const [count, setCount] = useState(initial);

  return {
    count,
    increment: () => setCount((current) => current + 1),
    decrement: () => setCount((current) => current - 1),
    reset: () => setCount(initial),
  };
}

/**
 * Live demo for "Типізація власних хуків": a REAL custom hook
 * `useCounter(initial: number): UseCounterResult` — actually called here,
 * with real increment/decrement/reset buttons that call the real returned
 * functions and re-render with the real updated count.
 */
export function CustomHookTypingDemo() {
  const { count, increment, decrement, reset } = useCounter(0);

  return (
    <div className={styles.tsStage}>
      <DemoPreview label="function useCounter(initial: number): { count: number; increment: () => void; decrement: () => void; reset: () => void }">
        <div className={styles.tsRow}>
          <button type="button" onClick={decrement} className={styles.tsBadgeErr} style={{ cursor: "pointer" }}>
            −1
          </button>
          <span className={styles.tsCode}>count: {count}</span>
          <button type="button" onClick={increment} className={styles.tsBadgeOk} style={{ cursor: "pointer" }}>
            +1
          </button>
          <button type="button" onClick={reset} style={{ cursor: "pointer" }}>
            Скинути
          </button>
        </div>

        <div className={`${styles.tsCompilerBox} ${styles.tsCompilerBoxOk}`}>
          {`Тип, який поверне useCounter: { count: number; increment: () => void; decrement: () => void; reset: () => void }\n→ реальне значення count зараз: ${count}`}
        </div>
      </DemoPreview>

      <DemoExplanation>
        Власний хук — це звичайна функція (її назва за конвенцією починається з use), тому типізується так само, як
        будь-яка інша функція (детальніше — у модулі ts-functions): параметри й тип повернення. UseCounterResult тут
        — interface, що описує форму обʼєкта, який хук реально повертає: поточне число count і три функції без
        параметрів, що нічого не повертають (() =&gt; void). Компілятор перевіряє, що функція useCounter дійсно
        повертає обʼєкт саме цієї форми, і що будь-який код, який деструктурує count і increment із результату
        useCounter(0), отримує правильні типи для кожного поля.
      </DemoExplanation>

      <DemoKeyTakeaway>
        Типізація власного хука — це типізація звичайної функції: параметри, тип повернення (часто — interface,
        що описує форму обʼєкта результату). Жодних нових, спеціальних для хуків правил типізації тут немає.
      </DemoKeyTakeaway>
    </div>
  );
}
