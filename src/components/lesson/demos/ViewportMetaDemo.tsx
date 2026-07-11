import { useState } from "react";
import { DemoToolbar, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

const PHONE_WIDTH = 170;
const DESKTOP_ASSUMED_WIDTH = 980;

/**
 * Live demo for "Метадані head і viewport": toggle whether the viewport
 * meta tag is present and watch a real CSS transform-based phone preview
 * shrink to illustrate the actual mechanism — without viewport, the
 * mobile browser assumes a ~980px desktop layout and squeezes the whole
 * thing into the physical screen width, which is why text becomes tiny.
 */
export function ViewportMetaDemo() {
  const [hasViewport, setHasViewport] = useState(true);
  const contentWidth = hasViewport ? PHONE_WIDTH : DESKTOP_ASSUMED_WIDTH;
  const scale = PHONE_WIDTH / contentWidth;

  return (
    <div className={styles.demoStack}>
      <DemoToolbar
        options={[
          { value: "on", label: "З viewport" },
          { value: "off", label: "Без viewport" },
        ]}
        value={hasViewport ? "on" : "off"}
        onChange={(value) => setHasViewport(value === "on")}
      />

      <div className={styles.vmPhoneFrame}>
        <div
          className={styles.vmPhoneContent}
          style={{ width: `${contentWidth}px`, transform: `scale(${scale})` }}
        >
          <p className={styles.vmPhoneTitle}>Кав'ярня «Аромат»</p>
          <p className={styles.vmPhoneText}>Свіжообсмажена кава щодня з 8:00 до 20:00.</p>
        </div>
      </div>

      <DemoExplanation>
        {hasViewport
          ? "З viewport браузер прирівнює ширину сторінки до реальної фізичної ширини екрана телефона — текст читається без масштабування."
          : `Без viewport мобільний браузер вважає сторінку десктопною (~${DESKTOP_ASSUMED_WIDTH}px) і стискає весь цей широкий макет у фізичний екран — саме тому текст стає крихітним і його доводиться розтягувати пальцями.`}
      </DemoExplanation>

      <DemoCodeSnippet
        code={
          hasViewport
            ? `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
            : `<!-- viewport відсутній -->
<!-- браузер малює сторінку так, ніби ширина екрана ~980px -->`
        }
      />

      <DemoKeyTakeaway>
        width=device-width прирівнює ширину сторінки до реальної ширини екрана пристрою, а initial-scale=1.0
        задає стартовий масштаб 100% без авто-зуму. Без цього рядка мобільний браузер завжди малює сторінку так, ніби
        це широкий десктопний екран, а потім стискає її до розміру телефона.
      </DemoKeyTakeaway>
    </div>
  );
}
