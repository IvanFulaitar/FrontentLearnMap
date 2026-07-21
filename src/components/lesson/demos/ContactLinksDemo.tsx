import { useState } from "react";
import { DemoPreview, DemoExplanation, DemoKeyTakeaway } from "./framework";
import styles from "./demos.module.css";

/**
 * Live demo for "Footer і форма зв'язку": a real plain-text phone/email
 * next to real `tel:`/`mailto:` links. Clicking the real links is
 * intercepted only to show what URI scheme the browser would actually
 * open (a real phone/mail app on a real device) — the href itself is
 * genuine, inspectable, copyable text.
 */
export function ContactLinksDemo() {
  const [lastAction, setLastAction] = useState<string | null>(null);

  return (
    <div className={styles.demoStack}>
      <DemoPreview label="Клікни кожен рядок — і подивись, яку дію реально виконав би браузер">
        <div className={styles.clRow}>
          <div className={styles.dvbCard}>
            <p className={styles.lpCaption}>Простий текст (погано)</p>
            <p
              className={styles.clPlainText}
              onClick={() => setLastAction("Нічого не сталось — це звичайний текст, без href.")}
            >
              +380 50 111 22 33
            </p>
          </div>

          <div className={styles.dvbCard}>
            <p className={styles.lpCaption}>{"<a href=\"tel:...\">"}</p>
            <a
              href="tel:+380501112233"
              className={styles.clLink}
              onClick={(event) => {
                event.preventDefault();
                setLastAction("Браузер відкрив би застосунок для дзвінків із набраним номером +380501112233.");
              }}
            >
              +380 50 111 22 33
            </a>
          </div>

          <div className={styles.dvbCard}>
            <p className={styles.lpCaption}>{"<a href=\"mailto:...\">"}</p>
            <a
              href="mailto:info@techstore.com"
              className={styles.clLink}
              onClick={(event) => {
                event.preventDefault();
                setLastAction("Браузер відкрив би поштовий клієнт із заповненим отримувачем info@techstore.com.");
              }}
            >
              info@techstore.com
            </a>
          </div>
        </div>

        {lastAction ? <p className={styles.itValidity}>{lastAction}</p> : null}
      </DemoPreview>

      <DemoExplanation>
        Наведи курсор на кожен варіант: у простого тексту курсор лишається звичайною стрілкою, бо це не посилання
        взагалі; у tel:/mailto: — курсор-рука, і в статус-барі браузера видно реальний href, як у будь-якого
        іншого посилання.
      </DemoExplanation>

      <DemoKeyTakeaway>
        На реальному телефоні клік по tel:-посиланню одразу пропонує зателефонувати — це не ілюстрація, а
        стандартна поведінка браузера для цієї URI-схеми, яка тут лише перехоплена, щоб показати, що саме
        сталося б.
      </DemoKeyTakeaway>
    </div>
  );
}
