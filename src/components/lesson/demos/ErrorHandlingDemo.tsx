import { useState } from "react";
import { DemoToolbar, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type PresetId = "valid" | "invalid" | "empty";

const PRESETS: Record<PresetId, { label: string; raw: string }> = {
  valid: { label: "Коректний JSON", raw: '{"name":"Іван","age":30}' },
  invalid: { label: "Пошкоджений JSON", raw: '{"name":"Іван", age:30}' },
  empty: { label: "Порожній рядок", raw: "" },
};

interface ParseOutcome {
  ok: boolean;
  value: string;
}

function safeParse(raw: string): ParseOutcome {
  try {
    const parsed = JSON.parse(raw);
    return { ok: true, value: JSON.stringify(parsed) };
  } catch (error) {
    return { ok: false, value: error instanceof Error ? error.message : "Невідома помилка" };
  }
}

/**
 * Live demo for "Основи обробки помилок": a real `try { JSON.parse(raw) }
 * catch` runs against three presets (valid JSON, broken JSON, empty
 * string) — picking a preset shows the actual caught `error.message` for
 * invalid input, instead of describing try/catch in the abstract.
 */
export function ErrorHandlingDemo() {
  const [presetId, setPresetId] = useState<PresetId>("valid");
  const preset = PRESETS[presetId];
  const outcome = safeParse(preset.raw);

  return (
    <div className={styles.demoStack}>
      <DemoToolbar
        options={(Object.keys(PRESETS) as PresetId[]).map((id) => ({ value: id, label: PRESETS[id].label }))}
        value={presetId}
        onChange={(value) => setPresetId(value as PresetId)}
      />

      <DemoPreview label="Реальний try/catch навколо JSON.parse для обраних даних">
        <div className={styles.semanticBlock}>
          <p>
            Вхідний рядок: <code>{preset.raw === "" ? '""' : preset.raw}</code>
          </p>
          <p>
            Результат: <strong style={{ color: outcome.ok ? "#2e7d32" : "#c0392b" }}>{outcome.ok ? "успіх" : "помилка"}</strong>
          </p>
          <p>
            <small>{outcome.ok ? `Розпарсено: ${outcome.value}` : `error.message: "${outcome.value}"`}</small>
          </p>
        </div>
      </DemoPreview>

      <DemoExplanation>
        {outcome.ok
          ? "JSON.parse успішно розпарсив рядок — виконання лишається в блоці try, catch взагалі не запускається."
          : "JSON.parse кинув помилку (пошкоджений синтаксис чи порожній рядок) — виконання одразу перейшло в catch, де error.message містить причину."}
      </DemoExplanation>

      <DemoCodeSnippet
        code={`function safeParse(raw) {
  try {
    return JSON.parse(raw);
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

safeParse(${JSON.stringify(preset.raw)});
// ${outcome.ok ? `успіх: ${outcome.value}` : `catch спрацював: "${outcome.value}"`}`}
      />

      <DemoKeyTakeaway>
        try виконується завжди першим; catch — лише якщо try кинув помилку. error.message дає точний текст причини —
        саме його варто показувати користувачу чи логувати, а не залишати catch порожнім.
      </DemoKeyTakeaway>
    </div>
  );
}
