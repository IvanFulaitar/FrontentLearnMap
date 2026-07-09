import { useState } from "react";
import { DemoSection, DemoControls, DemoSelect, DemoPreview, DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

type MenuState = "desktop" | "mobile-closed" | "mobile-open";
type ObjectFit = "cover" | "contain";

function buildExplanation(menuState: MenuState, objectFit: ObjectFit): string {
  if (menuState === "desktop") {
    const fitNote =
      objectFit === "cover"
        ? "фото заповнює блок, обрізаючи зайве (object-fit: cover)"
        : "фото уміщається повністю, можливі порожні поля з боків (object-fit: contain)";
    return `Десктопний header: nav і кнопка "Забронювати" видно одразу в ряд. Прокрути прев'ю вниз — header лишається приліпленим зверху (position: sticky), бо в нього заданий top: 0, background і z-index. Фото hero зараз показане так: ${fitNote}.`;
  }
  if (menuState === "mobile-closed") {
    return "На вузькому екрані desktop-nav ховається, а замість неї з'являється кнопка ☰ — саме її показує media query чи стан \"мобільний режим\". Меню поки закрите.";
  }
  return "Клік по ☰ (тепер ×) розкрив мобільну навігацію — той самий checkbox-hack чи <details>/<summary>, які ти писав у CSS, тут показані як реальний стан \"відкрито/закрито\".";
}

function buildCode(menuState: MenuState, objectFit: ObjectFit): string {
  if (menuState !== "desktop") {
    return `.mobile-nav {
  display: none;
}

.menu-toggle-input:checked ~ .mobile-nav {
  display: block; /* зараз: ${menuState === "mobile-open" ? "показано" : "приховано"} */
}`;
  }
  return `.site-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: rgba(255, 248, 239, 0.92);
  backdrop-filter: blur(8px);
}

.hero-image {
  object-fit: ${objectFit}; /* ${objectFit === "cover" ? "заповнює, обрізає зайве" : "уміщається повністю, може лишити поля"} */
}`;
}

/**
 * Live demo for the "Header і Hero" module: a real scrollable mini-site
 * with a genuinely sticky header (position: sticky + backdrop-filter),
 * a mobile-menu toggle driven by real state (mirrors the checkbox-hack /
 * details-summary pattern taught in the lesson), and a hero section with
 * real hover buttons plus an object-fit toggle on the hero image.
 */
export function HeaderHeroDemo() {
  const [menuState, setMenuState] = useState<MenuState>("desktop");
  const [objectFit, setObjectFit] = useState<ObjectFit>("cover");
  const isMobile = menuState !== "desktop";
  const isOpen = menuState === "mobile-open";

  return (
    <DemoSection>
      <DemoControls>
        <DemoSelect
          label="Режим навігації"
          value={menuState}
          onChange={(value) => setMenuState(value as MenuState)}
          options={[
            { value: "desktop", label: "Десктоп" },
            { value: "mobile-closed", label: "Мобільний — закрите" },
            { value: "mobile-open", label: "Мобільний — відкрите" },
          ]}
        />
        <DemoSelect
          label="object-fit фото"
          value={objectFit}
          onChange={(value) => setObjectFit(value as ObjectFit)}
          options={[
            { value: "cover", label: "cover" },
            { value: "contain", label: "contain" },
          ]}
        />
      </DemoControls>

      <DemoPreview>
        <div className={styles.siteFrame}>
          <header className={styles.siteHeaderDemo}>
            <span className={styles.siteLogo}>Aroma Coffee</span>
            {!isMobile ? (
              <nav className={styles.siteNavDemo} aria-label="Основна навігація">
                <a className={styles.siteNavLink} href="#about">Про нас</a>
                <a className={styles.siteNavLink} href="#menu">Меню</a>
                <a className={styles.siteNavLink} href="#contacts">Контакти</a>
              </nav>
            ) : null}
            {!isMobile ? (
              <a className={styles.siteHeaderButton} href="#booking">Забронювати</a>
            ) : (
              <button
                type="button"
                className={styles.menuToggleDemo}
                aria-expanded={isOpen}
                onClick={() => setMenuState(isOpen ? "mobile-closed" : "mobile-open")}
              >
                {isOpen ? "×" : "☰"}
              </button>
            )}
          </header>

          {isMobile && isOpen ? (
            <nav className={styles.mobileNavDemo} aria-label="Мобільна навігація">
              <a className={styles.siteNavLink} href="#about">Про нас</a>
              <a className={styles.siteNavLink} href="#menu">Меню</a>
              <a className={styles.siteNavLink} href="#contacts">Контакти</a>
            </nav>
          ) : null}

          <div className={styles.scrollArea}>
            <section className={styles.heroDemo}>
              <p className={styles.heroLabelDemo}>Specialty Coffee</p>
              <h3 className={styles.heroTitleDemo}>Кава, заради якої хочеться сповільнитись</h3>
              <p className={styles.heroTextDemo}>Затишна кав'ярня в центрі міста зі свіжообсмаженою кавою.</p>
              <div className={styles.heroActionsDemo}>
                <a className={styles.heroButtonPrimary} href="#menu">Переглянути меню</a>
                <a className={styles.heroButtonSecondary} href="#booking">Забронювати</a>
              </div>
              <img className={styles.heroImageDemo} style={{ objectFit }} src="/images/latte.svg" alt="Латте на дерев'яному столі" />
            </section>
            <div className={styles.scrollFiller}>Прокрути вниз ↓ — header лишається приліпленим зверху</div>
            <div className={styles.scrollFiller}>Ще трохи контенту нижче по сторінці...</div>
          </div>
        </div>
      </DemoPreview>

      <DemoExplanation>{buildExplanation(menuState, objectFit)}</DemoExplanation>

      <DemoCodeSnippet code={buildCode(menuState, objectFit)} />

      <DemoKeyTakeaway>
        Sticky header, перемикання мобільного меню й object-fit — усе це реальна поведінка, а не ілюстрація:
        прокрути прев'ю, натисни ☰, зміни object-fit і подивись, як кожна властивість справді працює.
      </DemoKeyTakeaway>
    </DemoSection>
  );
}
