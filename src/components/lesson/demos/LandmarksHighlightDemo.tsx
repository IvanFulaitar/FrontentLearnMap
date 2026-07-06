import { HighlightDemo, HighlightArea } from "./framework";
import type { HighlightRegion } from "./framework";
import styles from "./demos.module.css";

const REGIONS: HighlightRegion[] = [
  { id: "header", label: "<header>", description: "Шапка сторінки: логотип і навігація. Скрінрідер оголошує це як окремий орієнтир — можна перестрибнути одразу до нього." },
  { id: "nav", label: "<nav>", description: "Блок навігаційних посилань усередині header. Може бути кілька <nav> на сторінці (головне меню, хлібні крихти) — кожен варто підписати aria-label." },
  { id: "main", label: "<main>", description: "Унікальний контент саме цієї сторінки. Рівно один на сторінку — це орієнтир, до якого скрінрідер переходить одразу, минаючи навігацію." },
  { id: "footer", label: "<footer>", description: "Підвал: контакти, копірайт, повторна навігація. Так само окремий орієнтир, а не просто <div class=\"footer\">." },
];

/** HighlightDemo instance for "Орієнтири та регіони сторінки" — a real café
 * page skeleton where hovering (or clicking, or tabbing to) header/nav/main/
 * footer highlights that landmark and explains its role, instead of reading
 * about four tags in the abstract. */
export function LandmarksHighlightDemo() {
  return (
    <HighlightDemo regions={REGIONS}>
      {(active, setActive) => (
        <div className={styles.landmarksPage}>
          <HighlightArea id="header" active={active} onActivate={setActive} className={styles.landmarkHeader}>
            <span className={styles.landmarkTag}>header</span>
            <div className={styles.landmarkHeaderRow}>
              <strong>☕ Аромат</strong>
              <HighlightArea id="nav" active={active} onActivate={setActive} className={styles.landmarkNav}>
                <span className={styles.landmarkTag}>nav</span>
                Меню · Про нас · Контакти
              </HighlightArea>
            </div>
          </HighlightArea>

          <HighlightArea id="main" active={active} onActivate={setActive} className={styles.landmarkMain}>
            <span className={styles.landmarkTag}>main</span>
            <p>Ласкаво просимо до кав'ярні «Аромат» — свіжообсмажена кава в центрі Львова.</p>
          </HighlightArea>

          <HighlightArea id="footer" active={active} onActivate={setActive} className={styles.landmarkFooter}>
            <span className={styles.landmarkTag}>footer</span>
            © 2026 Аромат · вул. Кав'ярняна, 5
          </HighlightArea>
        </div>
      )}
    </HighlightDemo>
  );
}
