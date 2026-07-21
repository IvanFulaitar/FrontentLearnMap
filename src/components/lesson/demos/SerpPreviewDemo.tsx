import { useState } from "react";
import { DemoPreview, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

const TITLE_LIMIT = 60;
const DESC_LIMIT = 155;

/**
 * Live demo for "Title і description для пошукових систем": type real
 * text into two real inputs and watch a genuine Google-style result card
 * update character-by-character, including real truncation math against
 * the actual ~60/155-char limits (not a scripted example).
 */
export function SerpPreviewDemo() {
  const [title, setTitle] = useState("Кав'ярня «Аромат» — свіжообсмажена кава у Львові");
  const [description, setDescription] = useState("Кав'ярня «Аромат» у центрі Львова: власна обсмажувальня, затишний зал і бронювання столиків онлайн.");

  const titleOver = title.length > TITLE_LIMIT;
  const descOver = description.length > DESC_LIMIT;
  const displayTitle = titleOver ? `${title.slice(0, TITLE_LIMIT)}…` : title;
  const displayDesc = descOver ? `${description.slice(0, DESC_LIMIT)}…` : description;

  return (
    <div className={styles.demoStack}>
      <DemoPreview label="Друкуй у полях нижче — картка результату Google оновлюється в реальному часі">
        <div className={styles.spFields}>
          <label className={styles.sfLabel} htmlFor="demo-sp-title">
            title ({title.length}/{TITLE_LIMIT})
          </label>
          <input
            id="demo-sp-title"
            className={`${styles.itInput} ${titleOver ? styles.aeBadBorder : ""}`}
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />

          <label className={styles.sfLabel} htmlFor="demo-sp-desc">
            description ({description.length}/{DESC_LIMIT})
          </label>
          <textarea
            id="demo-sp-desc"
            className={styles.itInput}
            rows={2}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>

        <div className={styles.spCard}>
          <p className={styles.spUrl}>aroma-cafe.com</p>
          <p className={styles.spTitle}>{displayTitle}</p>
          <p className={styles.spDesc}>{displayDesc}</p>
        </div>
      </DemoPreview>

      <DemoExplanation>
        {titleOver || descOver
          ? "Зараз видно «…» — це те саме обрізання, яке реально робить Google, коли текст довший за ліміт. Скороти title чи description, щоб побачити картку без обрізання."
          : "Обидва поля вкладаються в ліміт — картка показує повний текст, без «…» в кінці."}
      </DemoExplanation>

      <DemoKeyTakeaway>
        Це не готова картинка — символи справа рахуються від того, що реально надруковано зліва. Спробуй стерти
        весь опис і побачити порожню картку: саме так виглядає сторінка без meta description у реальній видачі.
      </DemoKeyTakeaway>
    </div>
  );
}
