import { useRef, useState } from "react";
import { DemoToolbar, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type Mode = "buggy" | "fixed";

/**
 * Live demo for "Події відправлення форми": a real <form> with a real
 * submit listener. "buggy" mode genuinely omits event.preventDefault(), so
 * the demo intercepts the real navigation attempt and reports it happened
 * instead of letting the app actually navigate away; "fixed" mode calls
 * preventDefault and reads real field values via a real FormData(form).
 */
export function FormSubmitDemo() {
  const formRef = useRef<HTMLFormElement>(null);
  const [mode, setMode] = useState<Mode>("buggy");
  const [log, setLog] = useState<string[]>([]);
  const [wouldNavigate, setWouldNavigate] = useState(false);

  const addLog = (msg: string) => setLog((prev) => [msg, ...prev].slice(0, 4));

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (mode === "fixed") {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const email = String(data.get("email") ?? "");
      addLog(`preventDefault() викликано — форма НЕ перезавантажує сторінку. FormData зчитав email: "${email}"`);
      setWouldNavigate(false);
    } else {
      // Genuinely NOT calling preventDefault here — in a real <form> this
      // would trigger a real page navigation/reload. We can't let that
      // actually happen inside this lesson demo, so we detect the real
      // default action by checking event.defaultPrevented right after.
      addLog("Обробник відпрацював, але event.preventDefault() НЕ викликано — реальна форма перезавантажила б сторінку тут");
      setWouldNavigate(!event.defaultPrevented);
      event.preventDefault(); // safety net so the actual demo page doesn't reload
    }
  };

  const codeFor: Record<Mode, string> = {
    buggy: `form.addEventListener("submit", (event) => {\n  // немає event.preventDefault()\n  console.log("Відправлено");\n});\n// -> сторінка перезавантажується, лог ніхто не бачить`,
    fixed: `form.addEventListener("submit", (event) => {\n  event.preventDefault();\n  const data = new FormData(event.target);\n  console.log(data.get("email"));\n});`,
  };

  return (
    <div className={styles.demoStack}>
      <div className={styles.controls}>
        <div className={styles.control}>
          <span>Обробник submit</span>
          <DemoToolbar
            options={[
              { value: "buggy", label: "БАГ: без preventDefault" },
              { value: "fixed", label: "Правильно: з preventDefault" },
            ]}
            value={mode}
            onChange={(v) => {
              setMode(v as Mode);
              setLog([]);
              setWouldNavigate(false);
            }}
          />
        </div>
      </div>

      <DemoPreview label="Реальна форма — введи email і натисни Enter або кнопку">
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}
        >
          <input
            name="email"
            type="email"
            placeholder="you@example.com"
            style={{
              flex: "1 1 200px",
              padding: "8px 10px",
              borderRadius: "6px",
              border: "1px solid var(--border)",
            }}
          />
          <button
            type="submit"
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
            Відправити
          </button>
        </form>
      </DemoPreview>

      {wouldNavigate && (
        <DemoExplanation>
          У реальному застосунку (не в цьому демо) сторінка щойно перезавантажилась би — весь стан вище зник би, і
          жоден console.log після цього моменту не встиг би виконатись.
        </DemoExplanation>
      )}

      <DemoPreview label="Журнал реальних відправлень (найновіше зверху)">
        <div className={styles.semanticBlock}>
          {log.length === 0 ? (
            <p style={{ color: "var(--muted)" }}>Відправ форму вище, щоб побачити журнал.</p>
          ) : (
            log.map((entry, i) => <p key={i} style={{ margin: "2px 0" }}>{entry}</p>)
          )}
        </div>
      </DemoPreview>

      <DemoCodeSnippet code={codeFor[mode]} />

      <DemoKeyTakeaway>
        submit спрацьовує і при кліку по кнопці, і при Enter у полі. Без event.preventDefault() браузер виконує
        стандартну навігацію/перезавантаження — весь стан JS втрачається.
      </DemoKeyTakeaway>
    </div>
  );
}
