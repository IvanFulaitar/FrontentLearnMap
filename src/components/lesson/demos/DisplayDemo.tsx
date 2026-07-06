import { useState, type CSSProperties } from "react";
import { DemoSection, DemoControls, DemoSelect, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway, DemoHighlight } from "./framework";
import styles from "./demos.module.css";

type DisplayValue = "block" | "inline" | "inline-block" | "flex" | "none";

const TAGS = ["Кава", "Десерти", "Сніданки"];

const EXPLANATIONS: Record<DisplayValue, string> = {
  block: "block: кожен тег займає весь рядок і поважає width/height — вони переносяться один під одного, навіть якщо влізли б поруч.",
  inline: "inline: теги течуть у тексті як звичайні слова — width/height повністю ігноруються, тому всі три пункти зменшились до розміру самого тексту.",
  "inline-block": "inline-block: теги течуть у рядку тексту (як inline), але при цьому поважають width/height (як block) — саме тому вони стоять поруч, але мають однаковий, заданий розмір.",
  flex: "flex застосований на обгортці тегів: вони стали flex-елементами в один ряд з рівним gap, а їхній зв'язок з навколишнім текстом (\"Категорії меню:\") розірвався — обгортка тепер поводиться як власний, окремий блок.",
  none: "display: none повністю прибирає теги з макета: місце під них не резервується, і скрінрідер їх не озвучує — це не те саме, що просто зробити їх невидимими.",
};

/**
 * Live display demo: three realistic category tags ("Кава", "Десерти",
 * "Сніданки") sitting inside a sentence of real text — students see how
 * each display value changes whether tags break onto their own line,
 * flow with the surrounding text, share a row, or disappear entirely.
 */
export function DisplayDemo() {
  const [display, setDisplay] = useState<DisplayValue>("inline-block");

  const isFlex = display === "flex";
  const showsBoxSize = display === "block" || display === "inline-block" || isFlex;

  const wrapStyle: CSSProperties | undefined = isFlex ? { display: "flex", gap: "8px" } : undefined;
  const tagStyle: CSSProperties = {
    display: isFlex ? undefined : display,
    width: showsBoxSize ? "120px" : undefined,
    height: showsBoxSize ? "36px" : undefined,
  };

  return (
    <DemoSection>
      <DemoControls>
        <DemoSelect
          label="display"
          value={display}
          onChange={setDisplay}
          options={[
            { value: "block", label: "block" },
            { value: "inline", label: "inline" },
            { value: "inline-block", label: "inline-block" },
            { value: "flex", label: "flex (на контейнері тегів)" },
            { value: "none", label: "none" },
          ]}
        />
      </DemoControls>

      <DemoPreview>
        <DemoHighlight signal={display}>
          <p className={styles.displayText}>
            Категорії меню кав&apos;ярні:{" "}
            <span className={styles.displayTagsWrap} style={wrapStyle}>
              {TAGS.map((tag) => (
                <span className={styles.displayTag} style={tagStyle} key={tag}>{tag}</span>
              ))}
            </span>{" "}
            — обери страву й переходь до кошика.
          </p>
        </DemoHighlight>
      </DemoPreview>

      <DemoExplanation>{EXPLANATIONS[display]}</DemoExplanation>

      <DemoCodeSnippet
        code={isFlex
          ? `.tags-wrap {\n  display: flex;\n  gap: 8px;\n}`
          : `.tag {\n  display: ${display};${showsBoxSize ? "\n  width: 120px;\n  height: 36px;" : ""}\n}`}
      />

      <DemoKeyTakeaway>
        "Чому мій width не працює?" у 9 випадках з 10 означає, що елемент — inline. Потрібен
        inline-block чи block, щоб width/height взагалі щось означали.
      </DemoKeyTakeaway>
    </DemoSection>
  );
}
