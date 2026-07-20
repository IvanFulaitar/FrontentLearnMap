import { useState } from "react";
import { DemoToolbar, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type Scenario = "success" | "empty" | "error";
type Status = "idle" | "loading" | "success" | "empty" | "error";

/**
 * Live demo for "Стани завантаження та помилки": a real async function runs
 * a real setTimeout-delayed mock fetch and genuinely transitions through
 * idle -> loading -> (success | empty | error) using real React state — the
 * spinner is really shown/hidden by actual state changes, not a fixed
 * animation timeline.
 */
export function LoadingStatesDemo() {
  const [scenario, setScenario] = useState<Scenario>("success");
  const [status, setStatus] = useState<Status>("idle");
  const [orders, setOrders] = useState<string[]>([]);

  function fakeFetchOrders(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      window.setTimeout(() => {
        if (scenario === "error") reject(new Error("Сервер недоступний"));
        else if (scenario === "empty") resolve([]);
        else resolve(["Замовлення #1", "Замовлення #2", "Замовлення #3"]);
      }, 900);
    });
  }

  const run = async () => {
    setStatus("loading");
    try {
      const data = await fakeFetchOrders();
      if (data.length === 0) {
        setOrders([]);
        setStatus("empty");
      } else {
        setOrders(data);
        setStatus("success");
      }
    } catch {
      setStatus("error");
    }
  };

  const statusColor: Record<Status, string> = {
    idle: "var(--muted)",
    loading: "#e0a800",
    success: "#2e7d32",
    empty: "var(--muted)",
    error: "#c0392b",
  };

  return (
    <div className={styles.demoStack}>
      <div className={styles.controls}>
        <div className={styles.control}>
          <span>Що реально поверне сервер</span>
          <DemoToolbar
            options={[
              { value: "success", label: "Успіх, є дані" },
              { value: "empty", label: "Успіх, порожньо" },
              { value: "error", label: "Помилка мережі" },
            ]}
            value={scenario}
            onChange={(v) => {
              setScenario(v as Scenario);
              setStatus("idle");
              setOrders([]);
            }}
          />
        </div>
      </div>

      <DemoPreview label="Реальний цикл loading -> success/empty/error">
        <button
          type="button"
          onClick={run}
          disabled={status === "loading"}
          style={{
            padding: "8px 16px",
            borderRadius: "6px",
            border: "1px solid var(--border)",
            background: "var(--primary)",
            color: "white",
            fontWeight: 600,
            cursor: status === "loading" ? "default" : "pointer",
            opacity: status === "loading" ? 0.6 : 1,
          }}
        >
          Завантажити замовлення
        </button>

        <div className={styles.semanticBlock} style={{ marginTop: "10px" }}>
          <p>
            Стан: <strong style={{ color: statusColor[status] }}>{status}</strong>
          </p>
          {status === "loading" && <p>Завантаження...</p>}
          {status === "success" && orders.map((o, i) => <p key={i} style={{ margin: "2px 0" }}>{o}</p>)}
          {status === "empty" && <p>Замовлень поки немає</p>}
          {status === "error" && <p>Не вдалося завантажити замовлення</p>}
        </div>
      </DemoPreview>

      <DemoExplanation>
        {scenario === "success"
          ? "Успішний запит з реальними даними — показується список замовлень."
          : scenario === "empty"
            ? "Запит успішний, але масив порожній — це ОКРЕМИЙ стан, відмінний від помилки: показуємо \"Замовлень поки немає\"."
            : "Запит реально відхиляється — finally гарантує вихід зі стану loading, а catch показує зрозуміле повідомлення про помилку."}
      </DemoExplanation>

      <DemoCodeSnippet
        code={`try {\n  const orders = await fetch("/api/orders").then(r => r.json());\n  if (orders.length === 0) setStatus("empty");\n  else setStatus("success");\n} catch {\n  setStatus("error");\n} finally {\n  // спінер завжди зникає\n}`}
      />

      <DemoKeyTakeaway>
        Мінімум чотири стани: loading, success з даними, success порожній, error — кожен показує користувачу щось
        своє, ЖОДЕН не залишається порожнім блоком без пояснення.
      </DemoKeyTakeaway>
    </div>
  );
}
