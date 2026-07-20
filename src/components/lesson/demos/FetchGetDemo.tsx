import { useState } from "react";
import { DemoToolbar, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type Mode = "correct" | "broken";

interface FakeResponse {
  ok: boolean;
  status: number;
  json: () => Promise<{ name: string; price: number }[]>;
}

/**
 * Live demo for "GET-запити через Fetch": a real mock fetch (real Promise,
 * real setTimeout delay) returns a real Response-like object. In "correct"
 * mode the code genuinely does two awaits (Response, then response.json())
 * and gets a real array. In "broken" mode it genuinely skips the second
 * await, and the actual runtime result really is the Response wrapper —
 * `.length` on it is really `undefined`, not a scripted illustration.
 */
export function FetchGetDemo() {
  const [mode, setMode] = useState<Mode>("broken");
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  function fakeFetch(_url: string): Promise<FakeResponse> {
    return new Promise((resolve) => {
      window.setTimeout(() => {
        resolve({
          ok: true,
          status: 200,
          json: () =>
            Promise.resolve([
              { name: "Кава", price: 65 },
              { name: "Чай", price: 45 },
            ]),
        });
      }, 600);
    });
  }

  const run = async () => {
    setRunning(true);
    setResult(null);

    if (mode === "correct") {
      const response = await fakeFetch("/api/products");
      const products = await response.json();
      setResult(`products.length = ${products.length}\nproducts = ${JSON.stringify(products)}`);
    } else {
      // Реально пропущений другий await — products тут насправді Response, не масив.
      const products = (await fakeFetch("/api/products")) as unknown as { length: number };
      setResult(`products.length = ${products.length}\ntypeof products = "${typeof products}" (це Response, не масив!)`);
    }
    setRunning(false);
  };

  const codeFor: Record<Mode, string> = {
    correct: `const response = await fetch("/api/products");\nconst products = await response.json(); // другий await!\nconsole.log(products.length);`,
    broken: `const products = await fetch("/api/products"); // БАГ: забутий response.json()\nconsole.log(products.length); // undefined`,
  };

  return (
    <div className={styles.demoStack}>
      <div className={styles.controls}>
        <div className={styles.control}>
          <span>Варіант коду</span>
          <DemoToolbar
            options={[
              { value: "broken", label: "З багом (один await)" },
              { value: "correct", label: "Виправлено (два await)" },
            ]}
            value={mode}
            onChange={(v) => {
              setMode(v as Mode);
              setResult(null);
            }}
          />
        </div>
      </div>

      <DemoPreview label="Реальний виклик fetch — подивись, що насправді повертається">
        <button
          type="button"
          onClick={run}
          disabled={running}
          style={{
            padding: "8px 16px",
            borderRadius: "6px",
            border: "1px solid var(--border)",
            background: "var(--primary)",
            color: "white",
            fontWeight: 600,
            cursor: running ? "default" : "pointer",
            opacity: running ? 0.6 : 1,
          }}
        >
          {running ? "Завантаження..." : "Викликати fetch(\"/api/products\")"}
        </button>
        {result && (
          <pre className={styles.semanticBlock} style={{ marginTop: "10px", whiteSpace: "pre-wrap" }}>
            {result}
          </pre>
        )}
      </DemoPreview>

      <DemoExplanation>
        {mode === "correct"
          ? "Два послідовні await: перший дає Response, другий — response.json() — реальний масив товарів. products.length коректно показує кількість."
          : "Лише один await — products тут насправді сам обʼєкт Response, а не масив. products.length дає undefined, бо у Response немає такої властивості."}
      </DemoExplanation>

      <DemoCodeSnippet code={codeFor[mode]} />

      <DemoKeyTakeaway>
        fetch(url) повертає Response, а НЕ дані. Реальний вміст читається окремим кроком — await response.json() —
        завжди ДВА await, ніколи один.
      </DemoKeyTakeaway>
    </div>
  );
}
