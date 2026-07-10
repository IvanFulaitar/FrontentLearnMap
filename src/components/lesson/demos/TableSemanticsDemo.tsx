import { useState } from "react";
import { DemoToolbar, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type Kind = "div" | "table";

const ROWS = [
  { name: "Еспресо", price: "45 грн" },
  { name: "Капучино", price: "55 грн" },
  { name: "Айс-лате", price: "65 грн" },
];

const CODE: Record<Kind, string> = {
  div: `<div><div>Напій</div><div>Ціна</div></div>
<div><div>Еспресо</div><div>45 грн</div></div>`,
  table: `<table>
  <tr>
    <th>Напій</th>
    <th>Ціна</th>
  </tr>
  <tr>
    <td>Еспресо</td>
    <td>45 грн</td>
  </tr>
</table>`,
};

/**
 * Live demo for "Таблиці для табличних даних": click any row's price in a
 * real div-grid layout vs. a real <table>, and hear exactly what a screen
 * reader announces for that cell in each case — the difference between
 * "looks like a table" and "is a table" made audible.
 */
export function TableSemanticsDemo() {
  const [kind, setKind] = useState<Kind>("div");
  const [selected, setSelected] = useState(0);

  const row = ROWS[selected];
  const announcement =
    kind === "div"
      ? `«${row.price}» — просто текст. Скрінрідер не знає, що це саме ціна напою «${row.name}», бо між комірками немає жодного зв'язку.`
      : `«${row.name}, Ціна: ${row.price}» — скрінрідер називає заголовок колонки разом зі значенням комірки, тому зв'язок однозначний.`;

  return (
    <div className={styles.demoStack}>
      <DemoToolbar
        options={[
          { value: "div", label: "div-верстка" },
          { value: "table", label: "<table>" },
        ]}
        value={kind}
        onChange={(value) => setKind(value as Kind)}
      />

      <DemoPreview label="Клікни рядок, щоб почути, як скрінрідер оголосить ціну">
        {kind === "div" ? (
          <div className={styles.tableDivGrid}>
            <div className={styles.tableDivHeaderRow}>
              <div>Напій</div>
              <div>Ціна</div>
            </div>
            {ROWS.map((r, index) => (
              <button
                key={r.name}
                type="button"
                className={`${styles.tableDivRow} ${index === selected ? styles.tableDivRowActive : ""}`}
                onClick={() => setSelected(index)}
              >
                <div>{r.name}</div>
                <div>{r.price}</div>
              </button>
            ))}
          </div>
        ) : (
          <table className={styles.tableDemoTable}>
            <tbody>
              <tr>
                <th>Напій</th>
                <th>Ціна</th>
              </tr>
              {ROWS.map((r, index) => (
                <tr
                  key={r.name}
                  className={index === selected ? styles.tableDivRowActive : ""}
                  onClick={() => setSelected(index)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{r.name}</td>
                  <td>{r.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </DemoPreview>

      <p className={styles.headingAnnounce}>🔊 Скрінрідер оголосить: {announcement}</p>

      <DemoExplanation>
        {kind === "div"
          ? "Візуально це може виглядати абсолютно як таблиця, але в DOM це просто вкладені <div>. Жодного тега, який пов'язує заголовок колонки з коміркою, немає."
          : "th позначає заголовок колонки, а браузер і скрінрідер автоматично пов'язують кожну td у рядку з відповідним th — саме тому оголошення включає назву колонки."}
      </DemoExplanation>

      <DemoCodeSnippet code={CODE[kind]} />

      <DemoKeyTakeaway>
        Табличні дані потребують справжнього <code>table</code>, а не візуальної імітації через <code>div</code>.
        Різниця непомітна на око, але критична для будь-кого, хто не бачить таблицю, а чує її структуру.
      </DemoKeyTakeaway>
    </div>
  );
}
