import { useRef, useState } from "react";
import { DemoToolbar, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type Mode = "buggy" | "fixed";

/**
 * Live demo for "Події click": attaches REAL addEventListener click
 * handlers to a real <button>. "buggy" mode genuinely calls handleClick()
 * (with parens) so the handler fires once immediately on setup and never
 * again on real clicks; "fixed" mode passes the real function reference so
 * every real click increments a genuine counter and shows the real
 * event.target tag name.
 */
export function ClickEventDemo() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);
  const [mode, setMode] = useState<Mode>("buggy");
  const [clickCount, setClickCount] = useState(0);
  const [log, setLog] = useState<string[]>([]);
  const attachedHandler = useRef<((event: MouseEvent) => void) | null>(null);

  const addLog = (msg: string) => setLog((prev) => [msg, ...prev].slice(0, 4));

  const setup = (nextMode: Mode) => {
    const button = buttonRef.current;
    if (!button) return;

    if (attachedHandler.current) {
      button.removeEventListener("click", attachedHandler.current);
      attachedHandler.current = null;
    }

    setClickCount(0);
    setLog([]);

    const handleClick = (event?: MouseEvent) => {
      const target = event?.target instanceof HTMLElement ? event.target : null;
      setClickCount((c) => c + 1);
      addLog(target ? `Реальний клік! event.target = <${target.tagName.toLowerCase()}>` : "Спрацював обробник (викликано без реальної події)");
    };

    if (nextMode === "buggy") {
      // Genuine bug: handleClick() with parens calls the function IMMEDIATELY
      // (with no real event), and its return value — undefined — is what
      // actually gets passed to addEventListener. Browsers silently ignore a
      // null/undefined listener, so real clicks afterward do nothing.
      // @ts-expect-error - intentionally passing the call's return value (undefined), demonstrating the real bug
      button.addEventListener("click", handleClick());
      addLog("Обробник \"зареєстровано\" через handleClick() — виклик стався ОДРАЗУ (лічильник вже +1, але реальні кліки більше не працюють)");
    } else {
      button.addEventListener("click", handleClick);
      attachedHandler.current = handleClick;
      addLog("Обробник зареєстровано через посилання handleClick — реальні кліки тепер працюють");
    }
  };

  const switchMode = (nextMode: Mode) => {
    setMode(nextMode);
    setTimeout(() => setup(nextMode), 0);
  };

  const codeFor: Record<Mode, string> = {
    buggy: `button.addEventListener("click", handleClick()); // БАГ: викликає одразу`,
    fixed: `button.addEventListener("click", handleClick); // правильно: посилання на функцію`,
  };

  return (
    <div className={styles.demoStack}>
      <div className={styles.controls}>
        <div className={styles.control}>
          <span>Спосіб реєстрації обробника</span>
          <DemoToolbar
            options={[
              { value: "buggy", label: "БАГ: handleClick()" },
              { value: "fixed", label: "Правильно: handleClick" },
            ]}
            value={mode}
            onChange={(v) => switchMode(v as Mode)}
          />
        </div>
      </div>

      <DemoPreview label="Реальна кнопка — клацни кілька разів">
        <button
          ref={buttonRef}
          type="button"
          style={{
            padding: "10px 20px",
            borderRadius: "6px",
            border: "1px solid var(--border)",
            background: "var(--primary)",
            color: "white",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Клацни <span ref={spanRef}>мене</span>
        </button>
        <p style={{ marginTop: "8px" }}>
          Реальна кількість кліків, що спрацювали: <strong>{clickCount}</strong>
        </p>
      </DemoPreview>

      <DemoPreview label="Журнал реальних подій (найновіше зверху)">
        <div className={styles.semanticBlock}>
          {log.length === 0 ? (
            <p style={{ color: "var(--muted)" }}>Обери режим, щоб побачити реальну поведінку.</p>
          ) : (
            log.map((entry, i) => <p key={i} style={{ margin: "2px 0" }}>{entry}</p>)
          )}
        </div>
      </DemoPreview>

      <DemoExplanation>
        {mode === "buggy"
          ? "handleClick() з дужками викликається НЕГАЙНО під час setup, ще до будь-якого реального кліку — саме тому лічильник міг зрости одразу, а подальші реальні кліки на кнопці нічого не роблять."
          : "handleClick без дужок — це посилання на функцію, яке addEventListener зберігає й викликає щоразу, коли реально стається клік."}
      </DemoExplanation>

      <DemoCodeSnippet code={codeFor[mode]} />

      <DemoKeyTakeaway>
        addEventListener("click", handler) реєструє функцію для майбутніх кліків. addEventListener("click", handler())
        одразу ВИКЛИКАЄ handler і реєструє те, що він ПОВЕРТАЄ — майже завжди не те, що потрібно.
      </DemoKeyTakeaway>
    </div>
  );
}
