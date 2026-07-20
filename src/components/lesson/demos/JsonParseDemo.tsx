import { useState } from "react";
import { DemoToolbar, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type Sample = "valid" | "corrupted";

const VALID_JSON = `{"name":"Кава","price":65,"tags":["новинка","хіт"]}`;
const CORRUPTED_JSON = `{name: 'Кава'`;

/**
 * Live demo for "Розбір JSON": genuinely calls the real JSON.parse() on the
 * selected text. For corrupted input this really throws a real SyntaxError,
 * caught by a real try/catch — the error message shown is whatever the
 * browser's JSON parser actually reports, not a scripted string.
 */
export function JsonParseDemo() {
  const [sample, setSample] = useState<Sample>("corrupted");
  const [result, setResult] = useState<string | null>(null);

  const text = sample === "valid" ? VALID_JSON : CORRUPTED_JSON;

  const run = () => {
    try {
      const data = JSON.parse(text);
      setResult(`Успіх! data.tags[0] = "${data.tags[0]}"`);
    } catch (error) {
      setResult(`SyntaxError (реальна помилка браузера): ${(error as Error).message}`);
    }
  };

  return (
    <div className={styles.demoStack}>
      <div className={styles.controls}>
        <div className={styles.control}>
          <span>Текст для розбору</span>
          <DemoToolbar
            options={[
              { value: "valid", label: "Коректний JSON" },
              { value: "corrupted", label: "Пошкоджений JSON" },
            ]}
            value={sample}
            onChange={(v) => {
              setSample(v as Sample);
              setResult(null);
            }}
          />
        </div>
      </div>

      <DemoPreview label={`text = ${text}`}>
        <button
          type="button"
          onClick={run}
          style={{
            padding: "8px 16px",
            borderRadius: "6px",
            border: "1px solid var(--border)",
            background: "var(--primary)",
            color: "white",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Викликати JSON.parse(text)
        </button>
        {result && (
          <pre className={styles.semanticBlock} style={{ marginTop: "10px", whiteSpace: "pre-wrap" }}>
            {result}
          </pre>
        )}
      </DemoPreview>

      <DemoExplanation>
        {sample === "valid"
          ? "Текст — валідний JSON (подвійні лапки, закриті дужки) — JSON.parse() успішно повертає реальний обʼєкт."
          : "Текст порушує формат JSON (одинарні лапки, незакрита дужка) — JSON.parse() реально кидає SyntaxError. Без try/catch ця помилка зупинила б виконання коду."}
      </DemoExplanation>

      <DemoCodeSnippet
        code={
          sample === "valid"
            ? `const data = JSON.parse(text);\nconsole.log(data.tags[0]); // "новинка"`
            : `try {\n  const data = JSON.parse(text);\n} catch (error) {\n  console.error(error.message); // спрацює саме тут\n}`
        }
      />

      <DemoKeyTakeaway>
        JSON.parse() на невалідному тексті кидає справжню помилку (SyntaxError). Дані з ненадійних джерел
        (localStorage, зовнішні API) варто розбирати всередині try/catch.
      </DemoKeyTakeaway>
    </div>
  );
}
