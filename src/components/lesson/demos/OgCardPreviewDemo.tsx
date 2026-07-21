import { useState } from "react";
import { DemoToolbar, DemoPreview, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type Mode = "bare" | "og";

/**
 * Live demo for "Open Graph і прев'ю в соцмережах": toggle between a bare
 * URL (what a messenger shows with no OG tags) and a real, typed-into
 * card preview built from actual og:title/og:description/og:image input
 * values.
 */
export function OgCardPreviewDemo() {
  const [mode, setMode] = useState<Mode>("og");
  const [ogTitle, setOgTitle] = useState("Кав'ярня «Аромат» — Львів");
  const [ogDescription, setOgDescription] = useState("Свіжообсмажена кава та затишний зал у центрі Львова.");
  const [ogImage, setOgImage] = useState("https://aroma-cafe.com/og-cover.jpg");

  const imageAbsolute = /^https?:\/\//.test(ogImage);

  return (
    <div className={styles.demoStack}>
      <DemoToolbar
        options={[
          { value: "bare", label: "Без Open Graph" },
          { value: "og", label: "З Open Graph" },
        ]}
        value={mode}
        onChange={(value) => setMode(value as Mode)}
      />

      <DemoPreview label={mode === "og" ? "Онови поля og-тегів нижче — картка меседжера оновлюється разом з ними" : "Так виглядає посилання без жодного og-тегу"}>
        {mode === "og" ? (
          <div className={styles.spFields}>
            <label className={styles.sfLabel} htmlFor="demo-og-title">og:title</label>
            <input id="demo-og-title" className={styles.itInput} value={ogTitle} onChange={(event) => setOgTitle(event.target.value)} />

            <label className={styles.sfLabel} htmlFor="demo-og-desc">og:description</label>
            <input id="demo-og-desc" className={styles.itInput} value={ogDescription} onChange={(event) => setOgDescription(event.target.value)} />

            <label className={styles.sfLabel} htmlFor="demo-og-image">og:image</label>
            <input
              id="demo-og-image"
              className={`${styles.itInput} ${!imageAbsolute ? styles.aeBadBorder : ""}`}
              value={ogImage}
              onChange={(event) => setOgImage(event.target.value)}
            />
          </div>
        ) : null}

        <div className={styles.ogCard}>
          {mode === "bare" ? (
            <p className={styles.ogBareUrl}>https://aroma-cafe.com</p>
          ) : (
            <>
              <div className={styles.ogImageBox}>{imageAbsolute ? "🖼️" : "❌ немає (відносний шлях)"}</div>
              <p className={styles.ogCardTitle}>{ogTitle || "(порожній og:title)"}</p>
              <p className={styles.ogCardDesc}>{ogDescription || "(порожній og:description)"}</p>
              <p className={styles.ogCardUrl}>aroma-cafe.com</p>
            </>
          )}
        </div>
      </DemoPreview>

      <DemoExplanation>
        {mode === "bare"
          ? "Без og-тегів месенджер не має звідки взяти картинку чи опис — прев'ю зводиться до голого посилання."
          : imageAbsolute
            ? "og:image — повний URL з https://, тому картинка в картці реально показується."
            : "Прибери https:// з og:image (наприклад, залиш просто \"photo.jpg\") — картинка в картці зникає: зовнішній сервіс не може завантажити відносний шлях."}
      </DemoExplanation>

      <DemoKeyTakeaway>
        Зроби og:title порожнім — картка справді покаже "(порожній og:title)", тобто буквально те, що месенджер
        побачив би в head сторінки. Це прямий наслідок введених значень, а не фіксований приклад.
      </DemoKeyTakeaway>
    </div>
  );
}
