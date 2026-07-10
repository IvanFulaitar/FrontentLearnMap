import { useState } from "react";
import { DemoToolbar, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

/**
 * Live demo for "Псевдоелементи ::before/::after": click to toggle a
 * ::after badge on a card and a ::before overlay on a photo — both
 * pseudo-elements are added and removed by toggling a single class, with
 * no extra HTML elements involved, exactly like the lesson describes.
 */
export function PseudoElementsDemo() {
  const [showBadge, setShowBadge] = useState(true);
  const [showOverlay, setShowOverlay] = useState(true);

  return (
    <div className={styles.demoStack}>
      <DemoToolbar
        options={[
          { value: "badge-on", label: "::after значок: увімкнено" },
          { value: "badge-off", label: "::after значок: вимкнено" },
        ]}
        value={showBadge ? "badge-on" : "badge-off"}
        onChange={(value) => setShowBadge(value === "badge-on")}
      />

      <DemoPreview label="Клікни на перемикачі вище й нижче — жоден div у розмітці не додається і не зникає, лише клас">
        <div className={styles.peRow}>
          <div className={`${styles.peCard} ${showBadge ? styles.peCardPopular : ""}`}>
            <strong className={styles.peCardTitle}>Капучино</strong>
            <span className={styles.peCardPrice}>75 грн</span>
          </div>

          <div className={`${styles.pePhoto} ${showOverlay ? styles.pePhotoOverlay : ""}`}>
            <span className={styles.pePhotoCaption}>Кав'ярня Aroma</span>
          </div>
        </div>
      </DemoPreview>

      <DemoToolbar
        options={[
          { value: "overlay-on", label: "::before overlay: увімкнено" },
          { value: "overlay-off", label: "::before overlay: вимкнено" },
        ]}
        value={showOverlay ? "overlay-on" : "overlay-off"}
        onChange={(value) => setShowOverlay(value === "overlay-on")}
      />

      <DemoExplanation>
        Значок «Хіт» — це ::after картки з content: "Хіт", видимий лише коли на картці є клас .menu-card--popular.
        Темна плашка на фото — ::before з position: absolute; inset: 0, що затемнює фото знизу, аби білий підпис
        лишався читабельним. В обох випадках HTML картки й фото не змінюється взагалі — вмикається/вимикається
        рівно один клас, а сам псевдоелемент або з'являється, або зникає разом із ним.
      </DemoExplanation>

      <DemoCodeSnippet
        code={`.menu-card--popular::after {
  content: "Хіт";
  position: absolute;
  top: -8px;
  right: -8px;
  background: var(--color-primary);
  color: white;
  padding: 2px 8px;
  border-radius: 999px;
}

.photo--overlay::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(transparent, rgb(0 0 0 / 0.55));
}`}
      />

      <DemoKeyTakeaway>
        Обидва приклади — це один і той самий рецепт: батьківський елемент отримує position: relative, а
        псевдоелемент — position: absolute. content: "Хіт" робить ::after текстовим значком, content: "" (порожній,
        але обов'язковий) робить ::before суто візуальним прошарком без жодного тексту.
      </DemoKeyTakeaway>
    </div>
  );
}
