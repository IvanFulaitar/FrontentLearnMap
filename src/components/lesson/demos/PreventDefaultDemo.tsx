import { useState } from "react";
import { DemoToolbar, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type Mode = "allowed" | "prevented";

/**
 * Live demo for "Скасування поведінки за замовчуванням": a real checkbox
 * whose default toggle action is genuinely cancelled via
 * event.preventDefault() in "prevented" mode — the checkbox's real
 * .checked state (read straight from the DOM element) provably does NOT
 * flip, proving preventDefault really stopped the browser's default action
 * rather than describing it. A real contextmenu handler on a box similarly
 * either lets the real browser context menu appear or genuinely suppresses
 * it.
 */
export function PreventDefaultDemo() {
  const [mode, setMode] = useState<Mode>("allowed");
  const [checked, setChecked] = useState(false);
  const [log, setLog] = useState<string[]>([]);
  const [contextMenuSuppressed, setContextMenuSuppressed] = useState<number>(0);

  const addLog = (msg: string) => setLog((prev) => [msg, ...prev].slice(0, 5));

  const handleCheckboxClick = (event: React.MouseEvent<HTMLInputElement>) => {
    const target = event.currentTarget;
    if (mode === "prevented") {
      event.preventDefault();
      addLog(`preventDefault викликано — реальний checkbox.checked ЗАЛИШИВСЯ: ${target.checked}`);
    } else {
      // let native toggle happen; read the value on next tick after React commits
      setTimeout(() => addLog(`без preventDefault — реальний checkbox.checked став: ${target.checked}`), 0);
    }
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Only fires when the default action was NOT prevented
    setChecked(event.target.checked);
  };

  const handleContextMenu = (event: React.MouseEvent) => {
    if (mode === "prevented") {
      event.preventDefault();
      setContextMenuSuppressed((c) => c + 1);
      addLog("contextmenu: preventDefault викликано — стандартне меню браузера НЕ зʼявиться");
    } else {
      addLog("contextmenu: preventDefault НЕ викликано — зараз має зʼявитись звичайне меню браузера");
    }
  };

  const codeFor: Record<Mode, string> = {
    allowed: `checkbox.addEventListener("click", (event) => {\n  // preventDefault НЕ викликається — стандартна дія (toggle) відбувається\n});`,
    prevented: `checkbox.addEventListener("click", (event) => {\n  event.preventDefault(); // скасовує стандартний toggle checked\n});`,
  };

  return (
    <div className={styles.demoStack}>
      <div className={styles.controls}>
        <div className={styles.control}>
          <span>Стандартна дія</span>
          <DemoToolbar
            options={[
              { value: "allowed", label: "Дозволена (звичайна поведінка)" },
              { value: "prevented", label: "Скасована через preventDefault" },
            ]}
            value={mode}
            onChange={(v) => {
              setMode(v as Mode);
              setLog([]);
            }}
          />
        </div>
      </div>

      <DemoPreview label="Реальний checkbox — клацни й подивись, чи змінюється checked">
        <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <input type="checkbox" checked={checked} onClick={handleCheckboxClick} onChange={handleCheckboxChange} />
          Погоджуюсь з умовами (зараз: {checked ? "позначено" : "не позначено"})
        </label>
      </DemoPreview>

      <DemoPreview label="Реальна область — клацни правою кнопкою миші (contextmenu)">
        <div
          onContextMenu={handleContextMenu}
          style={{
            padding: "20px",
            borderRadius: "8px",
            border: "1px dashed var(--border)",
            textAlign: "center",
            color: "var(--muted)",
          }}
        >
          Клацни тут правою кнопкою миші
        </div>
        {contextMenuSuppressed > 0 && (
          <p style={{ marginTop: "6px" }}>
            Реальне браузерне меню заблоковано вже <strong>{contextMenuSuppressed}</strong> раз(и)
          </p>
        )}
      </DemoPreview>

      <DemoPreview label="Журнал реальних подій (найновіше зверху)">
        <div className={styles.semanticBlock}>
          {log.length === 0 ? (
            <p style={{ color: "var(--muted)" }}>Клацни на checkbox чи правою кнопкою на область вище.</p>
          ) : (
            log.map((entry, i) => <p key={i} style={{ margin: "2px 0" }}>{entry}</p>)
          )}
        </div>
      </DemoPreview>

      <DemoExplanation>
        {mode === "allowed"
          ? "Без preventDefault checkbox перемикається нормально — це стандартна дія браузера для кліку на checkbox."
          : "З preventDefault реальний DOM-стан checkbox.checked НЕ змінюється — стандартна дія браузера дійсно скасована, а не просто описана."}
      </DemoExplanation>

      <DemoCodeSnippet code={codeFor[mode]} />

      <DemoKeyTakeaway>
        event.preventDefault() скасовує стандартну дію браузера для конкретної події (toggle checkbox, показ
        контекстного меню, навігація) — це НЕ те саме, що stopPropagation(), яке зупиняє поширення події.
      </DemoKeyTakeaway>
    </div>
  );
}
