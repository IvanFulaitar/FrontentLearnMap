import { useState } from "react";
import { DemoPreview, DemoToolbar, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

interface Product {
  title: string;
  price: number;
}

// type UiState<T> = { status: "idle" } | { status: "loading" } | { status: "success"; data: T } | { status: "error"; message: string };
type UiState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; message: string };

function renderProductState(state: UiState<Product>): string {
  switch (state.status) {
    case "idle":
      return "Ще не почали завантаження";
    case "loading":
      return "Завантаження…";
    case "success":
      return `${state.data.title} — ${state.data.price} грн`;
    case "error":
      return `Помилка: ${state.message}`;
    default: {
      // Exhaustiveness check: if a new case is ever added to UiState
      // without handling it above, this line fails to compile — `state`
      // would no longer be `never` here.
      const _exhaustive: never = state;
      return _exhaustive;
    }
  }
}

type StateKey = "idle" | "loading" | "success" | "error";

const STATES: Record<StateKey, UiState<Product>> = {
  idle: { status: "idle" },
  loading: { status: "loading" },
  success: { status: "success", data: { title: "Латте", price: 65 } },
  error: { status: "error", message: "Товар не знайдено" },
};

/**
 * Live demo for "Дискриміновані стани інтерфейсу": models
 * `type UiState<T> = { status: "idle" } | { status: "loading" } | { status:
 * "success"; data: T } | { status: "error"; message: string }` and really
 * runs a `switch (state.status)` that narrows `state` on each real branch
 * — including a genuine exhaustiveness check (`never`) that would fail to
 * compile if a new status were ever added without a matching case.
 */
export function UiStateDemo() {
  const [key, setKey] = useState<StateKey>("success");
  const state = STATES[key];
  const rendered = renderProductState(state);

  return (
    <div className={styles.tsStage}>
      <DemoPreview label='type UiState<T> = { status: "idle" } | { status: "loading" } | { status: "success"; data: T } | { status: "error"; message: string }'>
        <DemoToolbar
          options={[
            { value: "idle", label: "idle" },
            { value: "loading", label: "loading" },
            { value: "success", label: "success" },
            { value: "error", label: "error" },
          ]}
          value={key}
          onChange={(value) => setKey(value as StateKey)}
        />

        <div className={styles.tsRow}>
          <span className={styles.tsCode}>{`{ status: "${key}"${key === "success" ? ", data: {...}" : key === "error" ? ", message: ..." : ""} }`}</span>
        </div>

        <div className={`${styles.tsCompilerBox} ${styles.tsCompilerBoxOk}`}>
          {`switch (state.status) звужує тип state в кожному case окремо.\n→ реальний рендер: ${rendered}`}
        </div>
      </DemoPreview>

      <DemoExplanation>
        UiState&lt;T&gt; — дискримінована спілка (детальніше — у модулі ts-functions, там це вже зустрічалось як
        Result&lt;T&gt;): поле status — спільний &quot;перемикач&quot; для чотирьох різних форм. У case &quot;success&quot;
        компілятор звужує тип state до варіанту з полем data — тому state.data.title реально доступний лише там. В
        інших case доступу до data взагалі немає за типами, бо його там реально нема. default-гілка з const
        _exhaustive: never = state — це перевірка повноти: якщо колись додати пʼятий статус і забути обробити його
        в switch, компілятор одразу покаже помилку саме на цьому рядку.
      </DemoExplanation>

      <DemoKeyTakeaway>
        Дискриміновані стани — природний спосіб типізувати стан інтерфейсу (idle/loading/success/error) замість
        окремих boolean-прапорців isLoading/hasError/data, які можна випадково поєднати в неможливу комбінацію.
      </DemoKeyTakeaway>
    </div>
  );
}
