import { DemoExplanation, DemoKeyTakeaway, LessonFigure } from "./framework";
import styles from "./demos.module.css";

/** Static demo for "Запуск першої HTML-сторінки": real screenshots of
 * installing Live Server, starting it, and the actual rendered result. */
export function VscodeFirstPageDemo() {
  return (
    <div className={styles.demoStack}>
      <LessonFigure
        src="/images/courses/vscode/vscode-live-server-extension.png"
        alt="Реальний скріншот сторінки розширення Live Server у Marketplace: видавець Ritwick Dey, 80 153 650 встановлень, рейтинг 4.5 з 517 відгуків, кнопка Restart Extensions"
        caption="Live Server — розширення, яке запускає локальний сервер прямо з VS Code."
        width={960}
        height={509}
      />

      <LessonFigure
        src="/images/courses/vscode/vscode-live-server-start.png"
        alt="Реальний скріншот статус-бару VS Code з підказкою Click to run live server над кнопкою Go Live"
        caption="Кнопка Go Live внизу справа з'являється, коли встановлено розширення Live Server."
        width={960}
        height={115}
      />

      <LessonFigure
        src="/images/courses/vscode/vscode-first-page-result.png"
        alt="Реальний скріншот браузера за адресою 127.0.0.1:5500/index.html із заголовком Привіт! Це моя перша HTML-сторінка, описом і списком Що я вже вмію"
        caption="Якщо сторінка виглядає так — HTML і Live Server працюють правильно."
        width={960}
        height={703}
      />

      <DemoExplanation>
        Адресний рядок браузера показує, як саме відкрито сторінку: file:/// означає прямий доступ до файлу на
        диску, http://127.0.0.1 (те саме, що localhost) — що сторінку віддає локальний сервер (Live Server).
      </DemoExplanation>

      <DemoKeyTakeaway>
        Для звичайного HTML+CSS файла file:// достатньо. Live Server (http://127.0.0.1) знадобиться пізніше, коли
        JavaScript почне робити запити до сервера — прямо зараз про це турбуватися не потрібно.
      </DemoKeyTakeaway>
    </div>
  );
}
