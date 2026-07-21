import { useRef, useState } from "react";
import { DemoToolbar, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type View = "loop" | "counters";
type Keyword = "var" | "let";

function capturedWithVar(): number[] {
  const closures: Array<() => number> = [];
  // eslint-disable-next-line no-var -- intentional: this function exists to demonstrate
  // var's function-scoped (not block-scoped) closure capture, the whole point of the demo.
  for (var i = 0; i < 3; i++) {
    closures.push(() => i);
  }
  return closures.map((fn) => fn());
}

function capturedWithLet(): number[] {
  const closures: Array<() => number> = [];
  for (let i = 0; i < 3; i++) {
    closures.push(() => i);
  }
  return closures.map((fn) => fn());
}

// Computed once, at module load — these are the REAL captured values, not a
// described abstraction: var shares one binding across all iterations (ends
// up 3,3,3), let creates a fresh binding per iteration (0,1,2).
const VAR_RESULT = capturedWithVar();
const LET_RESULT = capturedWithLet();

function createCounter(startAt: number) {
  let count = startAt; // private — nothing outside this function can reach it directly
  return {
    increment: () => {
      count += 1;
      return count;
    },
    decrement: () => {
      count -= 1;
      return count;
    },
    getValue: () => count,
  };
}

/**
 * Live demo for "Область видимості та замикання": two genuinely real
 * behaviors, computed and mutated at runtime, not simulated. (1) var vs let
 * in a for-loop closure capture — real arrays of returned values. (2) two
 * independent counter closures with real private state, proving each
 * closure keeps its own `count` that nothing outside can reach directly.
 */
export function ClosureScopeDemo() {
  const [view, setView] = useState<View>("loop");
  const [keyword, setKeyword] = useState<Keyword>("var");

  const counterA = useRef(createCounter(0));
  const counterB = useRef(createCounter(10));
  const [, forceRerender] = useState(0);

  const result = keyword === "var" ? VAR_RESULT : LET_RESULT;

  return (
    <div className={styles.demoStack}>
      <div className={styles.controls}>
        <div className={styles.control}>
          <span>Що показати</span>
          <DemoToolbar
            options={[
              { value: "loop", label: "var проти let у циклі" },
              { value: "counters", label: "Приватний стан (closures)" },
            ]}
            value={view}
            onChange={(value) => setView(value as View)}
          />
        </div>
        {view === "loop" && (
          <div className={styles.control}>
            <span>Ключове слово</span>
            <DemoToolbar
              options={[
                { value: "var", label: "var" },
                { value: "let", label: "let" },
              ]}
              value={keyword}
              onChange={(value) => setKeyword(value as Keyword)}
            />
          </div>
        )}
      </div>

      {view === "loop" ? (
        <>
          <DemoPreview label={"Реальний результат: масив значень, які \"запам'ятали\" замикання"}>
            <div className={styles.semanticBlock}>
              <p>
                Захоплені значення: <strong>[{result.join(", ")}]</strong>
              </p>
            </div>
          </DemoPreview>

          <DemoExplanation>
            {keyword === "var"
              ? "var — функціональна область видимості: усі три замикання діляться ОДНІЄЮ змінною i. Коли цикл завершується, i дорівнює 3, і саме це бачать усі замикання при викликі."
              : "let — блокова область видимості: кожна ітерація циклу створює НОВУ, окрему змінну i. Кожне замикання захоплює своє власне значення в момент створення."}
          </DemoExplanation>

          <DemoCodeSnippet
            code={
              keyword === "var"
                ? `const closures = [];\nfor (var i = 0; i < 3; i++) {\n  closures.push(() => i);\n}\nclosures.map(fn => fn()); // [${VAR_RESULT.join(", ")}]`
                : `const closures = [];\nfor (let i = 0; i < 3; i++) {\n  closures.push(() => i);\n}\nclosures.map(fn => fn()); // [${LET_RESULT.join(", ")}]`
            }
          />
        </>
      ) : (
        <>
          <DemoPreview label="Дві незалежні лічильники, кожен зі своїм приватним count">
            <div className={styles.semanticBlock}>
              <p>
                Лічильник A: <strong>{counterA.current.getValue()}</strong>{" "}
                <button
                  type="button"
                  onClick={() => {
                    counterA.current.increment();
                    forceRerender((t) => t + 1);
                  }}
                >
                  +1
                </button>{" "}
                <button
                  type="button"
                  onClick={() => {
                    counterA.current.decrement();
                    forceRerender((t) => t + 1);
                  }}
                >
                  -1
                </button>
              </p>
              <p>
                Лічильник B: <strong>{counterB.current.getValue()}</strong>{" "}
                <button
                  type="button"
                  onClick={() => {
                    counterB.current.increment();
                    forceRerender((t) => t + 1);
                  }}
                >
                  +1
                </button>{" "}
                <button
                  type="button"
                  onClick={() => {
                    counterB.current.decrement();
                    forceRerender((t) => t + 1);
                  }}
                >
                  -1
                </button>
              </p>
            </div>
          </DemoPreview>

          <DemoExplanation>
            Кожен createCounter(...) створює свою власну змінну count у замиканні — натискання кнопок Лічильника A
            ніяк не впливає на count Лічильника B. Ззовні немає жодного способу прочитати чи змінити count напряму,
            лише через increment/decrement/getValue.
          </DemoExplanation>

          <DemoCodeSnippet
            code={`function createCounter(startAt) {\n  let count = startAt; // приватна — недосяжна ззовні напряму\n  return {\n    increment: () => { count += 1; return count; },\n    decrement: () => { count -= 1; return count; },\n    getValue: () => count,\n  };\n}\n\nconst counterA = createCounter(0);\nconst counterB = createCounter(10);\ncounterA.increment(); // A: 1, B: 10 — незалежні`}
          />
        </>
      )}

      <DemoKeyTakeaway>
        {view === "loop"
          ? "let у циклі дає кожній ітерації свою окрему змінну — саме тому це стандартний вибір для лічильників циклу. var ділить одну змінну на всі ітерації."
          : "Замикання (closure) — це функція, що \"пам'ятає\" змінні зі своєї області визначення навіть після завершення зовнішньої функції. Це основний спосіб зробити стан приватним у JavaScript."}
      </DemoKeyTakeaway>
    </div>
  );
}
