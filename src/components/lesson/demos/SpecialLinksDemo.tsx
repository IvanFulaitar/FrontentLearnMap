import { useState } from "react";
import { DemoToolbar, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type LinkType = "mailto" | "tel" | "download";

const TYPES: { value: LinkType; label: string }[] = [
  { value: "mailto", label: "📧 Email" },
  { value: "tel", label: "📞 Телефон" },
  { value: "download", label: "⬇️ Файл" },
];

const MENU_TEXT = `Меню кав'ярні «Аромат»

Еспресо — 45 грн
Капучино — 60 грн
Лате — 65 грн
Фільтр-кава — 55 грн`;

const DOWNLOAD_HREF = `data:text/plain;charset=utf-8,${encodeURIComponent(MENU_TEXT)}`;

const TYPE_CODE: Record<LinkType, string> = {
  mailto: `<a href="mailto:info@aroma-cafe.com?subject=Замовлення">
  info@aroma-cafe.com
</a>`,
  tel: `<a href="tel:+380671234567">+380 67 123 45 67</a>`,
  download: `<a href="menu.pdf" download="menu-aroma.pdf">
  Завантажити меню
</a>`,
};

const TYPE_EXPLANATION: Record<LinkType, string> = {
  mailto: "Клікни посилання нижче — це реальний mailto: з параметром subject. Браузер спробує відкрити твій поштовий клієнт із уже заповненою темою листа.",
  tel: "Клікни посилання нижче — це реальний tel:. На комп'ютері браузер, найімовірніше, запитає, яким додатком дзвонити; на смартфоні одразу відкриється дзвінок.",
  download: "Клікни посилання нижче — це реальний download, який справді збереже невеликий текстовий файл меню на твій пристрій, а не просто ілюстрація.",
};

/**
 * Live demo for "Спеціальні посилання: email, телефон і завантаження
 * файлів": switch between mailto:/tel:/download and click a REAL, working
 * link of each kind — not a mockup. The download tab uses a data: URI so
 * the file save genuinely happens in the browser, right now.
 */
export function SpecialLinksDemo() {
  const [type, setType] = useState<LinkType>("mailto");

  return (
    <div className={styles.demoStack}>
      <DemoToolbar options={TYPES} value={type} onChange={(value) => setType(value as LinkType)} />

      <DemoPreview label="Справжнє, клікабельне посилання">
        <div className={styles.specialLinkPreview}>
          {type === "mailto" ? (
            <a className={styles.specialLinkButton} href="mailto:info@aroma-cafe.com?subject=Замовлення">
              📧 info@aroma-cafe.com
            </a>
          ) : null}
          {type === "tel" ? (
            <a className={styles.specialLinkButton} href="tel:+380671234567">
              📞 +380 67 123 45 67
            </a>
          ) : null}
          {type === "download" ? (
            <a className={styles.specialLinkButton} href={DOWNLOAD_HREF} download="menu-aroma.txt">
              ⬇️ Завантажити меню (menu-aroma.txt)
            </a>
          ) : null}
        </div>
      </DemoPreview>

      <DemoExplanation>{TYPE_EXPLANATION[type]}</DemoExplanation>

      <DemoCodeSnippet code={TYPE_CODE[type]} />

      <DemoKeyTakeaway>
        Усі три схеми змінюють те, що браузер РОБИТЬ при кліку, а не лише те, як посилання виглядає: mailto: відкриває
        пошту, tel: — дзвінок, download — збереження файлу замість перегляду. Жодну з цих дій неможливо повторити
        звичайним текстом чи кнопкою без href.
      </DemoKeyTakeaway>
    </div>
  );
}
