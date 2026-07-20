import { useRef, useState } from "react";
import { DemoToolbar, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type Mode = "broken" | "correct";

/**
 * Live demo for "Стан і цикл рендеру": a real mutable counter (kept outside
 * React state, in a ref, to faithfully mirror a plain `let cartCount = 0`)
 * and two real DOM nodes updated by a real render() function. In "broken"
 * mode, render() is genuinely never called after the state changes — the
 * DOM nodes really stay stale while the underlying counter really advances,
 * visibly diverging exactly as the lesson describes.
 */
export function StateRenderDemo() {
  const [mode, setMode] = useState<Mode>("broken");
  const cartCountRef = useRef(0);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const summaryRef = useRef<HTMLParagraphElement>(null);
  const [, forceRerender] = useState(0);

  const render = () => {
    if (badgeRef.current) badgeRef.current.textContent = String(cartCountRef.current);
    if (summaryRef.current) summaryRef.current.textContent = `Товарів у кошику: ${cartCountRef.current}`;
  };

  const addToCart = () => {
    cartCountRef.current += 1; // реальна зміна стану
    if (mode === "correct") render(); // у "broken" режимі цей виклик реально пропущено
    forceRerender((t) => t + 1); // лише щоб оновити панель "реальне значення стану" нижче
  };

  const reset = (next: Mode) => {
    setMode(next);
    cartCountRef.current = 0;
    forceRerender((t) => t + 1);
    if (badgeRef.current) badgeRef.current.textContent = "0";
    if (summaryRef.current) summaryRef.current.textContent = "Товарів у кошику: 0";
  };

  return (
    <div className={styles.demoStack}>
      <div className={styles.controls}>
        <div className={styles.control}>
          <span>Варіант коду</span>
          <DemoToolbar
            options={[
              { value: "broken", label: "З багом (render() забутий)" },
              { value: "correct", label: "Виправлено (render() після зміни)" },
            ]}
            value={mode}
            onChange={(v) => reset(v as Mode)}
          />
        </div>
      </div>

      <DemoPreview label="Реальний DOM — badge і summary оновлюються лише через render()">
        <p>
          Бейдж кошика: <span ref={badgeRef} style={{ fontWeight: 700 }}>0</span>
        </p>
        <p ref={summaryRef} style={{ marginTop: "4px" }}>Товарів у кошику: 0</p>
        <button
          type="button"
          onClick={addToCart}
          style={{
            marginTop: "10px",
            padding: "8px 16px",
            borderRadius: "6px",
            border: "1px solid var(--border)",
            background: "var(--primary)",
            color: "white",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          addToCart()
        </button>
        <div className={styles.semanticBlock} style={{ marginTop: "10px" }}>
          <p>Реальне значення cartCount у пам'яті: <strong>{cartCountRef.current}</strong></p>
        </div>
      </DemoPreview>

      <DemoExplanation>
        {mode === "correct"
          ? "render() викликається одразу після кожної зміни cartCount — DOM (бейдж і summary) завжди точно відображає реальне значення."
          : "cartCount реально збільшується з кожним кліком (дивись значення в пам'яті вище), але render() ніколи не викликається — DOM \"застряг\" на 0, хоча реальні дані вже інші."}
      </DemoExplanation>

      <DemoCodeSnippet
        code={
          mode === "correct"
            ? `function addToCart() {\n  cartCount += 1;\n  render(); // ЗАВЖДИ після зміни стану\n}`
            : `function addToCart() {\n  cartCount += 1;\n  // БАГ: забутий виклик render()\n}`
        }
      />

      <DemoKeyTakeaway>
        Стан — єдине джерело правди; DOM лише відображає його через render(). Кожна зміна стану без подальшого
        виклику render() лишає інтерфейс "застряглим" на старих даних.
      </DemoKeyTakeaway>
    </div>
  );
}
