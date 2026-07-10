import { useState } from "react";
import { DemoToolbar, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type Mode = "nested" | "definition";

const NESTED_CODE = `<ul>
  <li>Гарячі напої
    <ul>
      <li>Еспресо</li>
      <li>Капучино</li>
    </ul>
  </li>
  <li>Холодні напої
    <ul>
      <li>Айс-лате</li>
    </ul>
  </li>
</ul>`;

const DEFINITION_CODE = `<dl>
  <dt>HTML</dt>
  <dd>Мова розмітки.</dd>
  <dd>Використовується для створення структури сайту.</dd>
</dl>`;

/**
 * Live demo for "Списки визначень і вкладені списки": toggle between a
 * REAL collapsible nested <ul> (click a category to expand/collapse its
 * subcategory — actual DOM nesting, not a screenshot) and a real <dl> where
 * a button reveals that one <dt> can have multiple <dd> stacked under it.
 */
export function NestedListDemo() {
  const [mode, setMode] = useState<Mode>("nested");
  const [hotOpen, setHotOpen] = useState(true);
  const [coldOpen, setColdOpen] = useState(true);
  const [showExtraDd, setShowExtraDd] = useState(false);

  return (
    <div className={styles.demoStack}>
      <DemoToolbar
        options={[
          { value: "nested", label: "Вкладений список" },
          { value: "definition", label: "Список визначень (dl)" },
        ]}
        value={mode}
        onChange={(value) => setMode(value as Mode)}
      />

      {mode === "nested" ? (
        <>
          <DemoPreview label="Клікни назву категорії, щоб згорнути/розгорнути підпункти">
            <ul>
              <li>
                <button type="button" className={styles.nestedToggle} onClick={() => setHotOpen((v) => !v)}>
                  {hotOpen ? "▾" : "▸"} Гарячі напої
                </button>
                {hotOpen ? (
                  <ul>
                    <li>Еспресо</li>
                    <li>Капучино</li>
                  </ul>
                ) : null}
              </li>
              <li>
                <button type="button" className={styles.nestedToggle} onClick={() => setColdOpen((v) => !v)}>
                  {coldOpen ? "▾" : "▸"} Холодні напої
                </button>
                {coldOpen ? (
                  <ul>
                    <li>Айс-лате</li>
                  </ul>
                ) : null}
              </li>
            </ul>
          </DemoPreview>

          <DemoExplanation>
            Кожен вкладений <code>ul</code> лежить усередині <code>li</code> батьківської категорії — саме тому,
            коли категорія згорнута, весь її вкладений список зникає разом з нею. Скрінрідер при цьому оголошує
            рівень вкладеності, тож користувач розуміє, що це підпункти, а не новий незалежний список.
          </DemoExplanation>

          <DemoCodeSnippet code={NESTED_CODE} />
        </>
      ) : (
        <>
          <DemoPreview label="dt (термін) і dd (опис) — dt може мати кілька dd">
            <dl>
              <dt>HTML</dt>
              <dd>Мова розмітки.</dd>
              {showExtraDd ? <dd>Використовується для створення структури сайту.</dd> : null}
            </dl>
            <button type="button" className={styles.nestedToggle} onClick={() => setShowExtraDd((v) => !v)}>
              {showExtraDd ? "Сховати друге пояснення" : "Показати ще одне пояснення (dd)"}
            </button>
          </DemoPreview>

          <DemoExplanation>
            Один <code>dt</code> може супроводжуватись кількома <code>dd</code> підряд — усі вони належать до
            останнього терміна. Це відрізняє <code>dl</code> від звичайного списку: тут завжди пара (або серія)
            "термін → опис", а не просто перелік рівноправних пунктів.
          </DemoExplanation>

          <DemoCodeSnippet code={DEFINITION_CODE} />
        </>
      )}

      <DemoKeyTakeaway>
        Вкладеність у списку — це реальна структура DOM (ul усередині li), а не просто відступ через CSS. dl, у свою
        чергу, підходить саме для пар "термін → опис" (глосарій, специфікації) — для звичайного переліку без пар
        краще звичайний ul.
      </DemoKeyTakeaway>
    </div>
  );
}
