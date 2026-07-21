import { useState } from "react";
import { DemoToolbar, DemoPreview, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type Mode = "color-only" | "accessible";

const PHONE_PATTERN = /^\+380\d{9}$/;

/**
 * Live demo for "Доступні повідомлення про помилки": a real aria-live
 * region genuinely receives the error text when validation fails — the
 * "лог оголошень" below is literally reading that live region's content,
 * not a scripted transcript of what a screen reader "would" say.
 */
export function AriaErrorDemo() {
  const [mode, setMode] = useState<Mode>("color-only");
  const [value, setValue] = useState("");
  const [invalid, setInvalid] = useState(false);
  const [log, setLog] = useState<string[]>([]);

  const errorText = "Введіть номер у форматі +380XXXXXXXXX";

  const check = () => {
    const bad = !PHONE_PATTERN.test(value);
    setInvalid(bad);
    if (bad && mode === "accessible") {
      setLog((prev) => [...prev, errorText]);
    }
  };

  return (
    <div className={styles.demoStack}>
      <DemoToolbar
        options={[
          { value: "color-only", label: "Тільки колір рамки" },
          { value: "accessible", label: "aria-invalid + описaria-describedby + role=alert" },
        ]}
        value={mode}
        onChange={(value) => { setMode(value as Mode); setInvalid(false); setLog([]); }}
      />

      <DemoPreview label="Введи щось без +380 і натисни «Перевірити телефон»">
        <div className={styles.aeStage}>
          <label className={styles.sfLabel} htmlFor="demo-ae-phone">
            Телефон
          </label>
          <input
            id="demo-ae-phone"
            type="tel"
            className={`${styles.itInput} ${invalid && mode === "color-only" ? styles.aeBadBorder : ""}`}
            value={value}
            onChange={(event) => { setValue(event.target.value); setInvalid(false); }}
            aria-invalid={mode === "accessible" && invalid ? "true" : undefined}
            aria-describedby={mode === "accessible" && invalid ? "demo-ae-error" : undefined}
          />
          {mode === "accessible" && invalid ? (
            <p id="demo-ae-error" role="alert" className={styles.aeErrorText}>
              {errorText}
            </p>
          ) : null}
          <button type="button" className={styles.itButton} onClick={check}>
            Перевірити телефон
          </button>
        </div>

        <div className={styles.aeLog} aria-live="polite">
          <p className={styles.aeLogTitle}>Що реально потрапляє в aria-live-регіон (те, що озвучив би скрінрідер):</p>
          {log.length === 0 ? (
            <p className={styles.aeLogEmpty}>(поки нічого не оголошено)</p>
          ) : (
            <ul className={styles.aeLogList}>
              {log.map((entry, i) => (
                <li key={i}>{entry}</li>
              ))}
            </ul>
          )}
        </div>
      </DemoPreview>

      <DemoExplanation>
        {mode === "color-only"
          ? "Рамка стає червоною — але спробуй уявити, що ти не бачиш кольору взагалі: жодного тексту помилки не додається нікуди, aria-live-регіон нижче лишається порожнім."
          : "aria-describedby зв'язує поле з текстом помилки, а role=\"alert\" одразу потрапляє в aria-live-регіон — саме тому лог нижче реально поповнюється, щойно з'являється текст помилки."}
      </DemoExplanation>

      <DemoKeyTakeaway>
        Перемкни на «Тільки колір» і повтори перевірку з порожнім полем — лог оголошень залишиться порожнім,
        хоча рамка стане червоною. Це і є різниця між візуальним сигналом і реальним доступним повідомленням.
      </DemoKeyTakeaway>
    </div>
  );
}
