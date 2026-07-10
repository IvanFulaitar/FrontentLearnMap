import { useState } from "react";
import { DemoToolbar, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

const COLUMNS = ["S", "M", "L"];
const ROWS = [
  { name: "Еспресо", prices: ["35 грн", "45 грн", "55 грн"] },
  { name: "Капучино", prices: ["40 грн", "50 грн", "60 грн"] },
];

/**
 * Live demo for "Доступні таблиці: caption, scope і заголовки": toggle
 * scope on/off in a real multi-column size/price table, click any price
 * cell, and hear exactly what a screen reader announces for it — with
 * scope the announcement names both the drink and the size; without it,
 * the cell is just a number with no context.
 */
export function AccessibleTableDemo() {
  const [hasScope, setHasScope] = useState(true);
  const [selected, setSelected] = useState({ row: 0, col: 0 });

  const rowData = ROWS[selected.row];
  const value = rowData.prices[selected.col];
  const colName = COLUMNS[selected.col];

  const announcement = hasScope
    ? `«${rowData.name}, ${colName}: ${value}» — scope пов'язує комірку одразу з назвою напою (рядок) і розміром (колонка).`
    : `«${value}» — без scope у складній таблиці з кількома заголовками скрінрідер не завжди може однозначно визначити, до якого напою і розміру належить ця ціна.`;

  const code = hasScope
    ? `<table>
  <caption>Ціни на напої за розміром</caption>
  <tr>
    <th scope="col">Напій</th>
    <th scope="col">S</th>
    <th scope="col">M</th>
    <th scope="col">L</th>
  </tr>
  <tr>
    <th scope="row">${rowData.name}</th>
    <td>${rowData.prices[0]}</td>
    <td>${rowData.prices[1]}</td>
    <td>${rowData.prices[2]}</td>
  </tr>
</table>`
    : `<table>
  <caption>Ціни на напої за розміром</caption>
  <tr>
    <th>Напій</th>
    <th>S</th>
    <th>M</th>
    <th>L</th>
  </tr>
  <tr>
    <th>${rowData.name}</th>
    <td>${rowData.prices[0]}</td>
    <td>${rowData.prices[1]}</td>
    <td>${rowData.prices[2]}</td>
  </tr>
</table>`;

  return (
    <div className={styles.demoStack}>
      <DemoToolbar
        options={[
          { value: "on", label: "З scope" },
          { value: "off", label: "Без scope" },
        ]}
        value={hasScope ? "on" : "off"}
        onChange={(value) => setHasScope(value === "on")}
      />

      <DemoPreview label="Клікни будь-яку ціну, щоб почути оголошення">
        <table className={styles.tableDemoTable}>
          <caption>Ціни на напої за розміром</caption>
          <tbody>
            <tr>
              <th scope={hasScope ? "col" : undefined}>Напій</th>
              {COLUMNS.map((c) => (
                <th key={c} scope={hasScope ? "col" : undefined}>
                  {c}
                </th>
              ))}
            </tr>
            {ROWS.map((r, rowIndex) => (
              <tr key={r.name}>
                <th scope={hasScope ? "row" : undefined}>{r.name}</th>
                {r.prices.map((p, colIndex) => (
                  <td
                    key={colIndex}
                    className={rowIndex === selected.row && colIndex === selected.col ? styles.tableDivRowActive : ""}
                    style={{ cursor: "pointer" }}
                    onClick={() => setSelected({ row: rowIndex, col: colIndex })}
                  >
                    {p}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </DemoPreview>

      <p className={styles.headingAnnounce}>🔊 Скрінрідер оголосить: {announcement}</p>

      <DemoExplanation>
        {hasScope
          ? 'scope="col" на заголовках S/M/L і scope="row" на назві напою явно кажуть скрінрідеру, до якої колонки й рядка належить кожен th — тому будь-яка комірка однозначно "прив\'язується" до обох.'
          : "У таблиці з двома вимірами (напій І розмір) сам факт, що комірка стоїть у якомусь рядку й стовпці, не завжди достатній для однозначного визначення — особливо в складніших чи довших таблицях."}
      </DemoExplanation>

      <DemoCodeSnippet code={code} />

      <DemoKeyTakeaway>
        scope коштує кількох символів у розмітці, але саме він знімає всю неоднозначність у таблицях з кількома
        заголовками — а caption додатково дає таблиці назву, яку скрінрідер озвучує одразу після слова "таблиця".
      </DemoKeyTakeaway>
    </div>
  );
}
