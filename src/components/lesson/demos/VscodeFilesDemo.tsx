import { DemoExplanation, DemoKeyTakeaway, LessonFigure } from "./framework";
import styles from "./demos.module.css";

/** Static demo for "Файли й папки": real screenshots of the project folder
 * in Explorer, plus what a brand-new empty file looks like right after
 * creation — shown before the learner creates their own. */
export function VscodeFilesDemo() {
  return (
    <div className={styles.demoStack}>
      <LessonFigure
        src="/images/courses/vscode/vscode-project-explorer.png"
        alt="Реальний скріншот панелі Explorer у VS Code з відкритою папкою FRONTEND, що містить index.html, script.js, style.css і папку Images"
        caption="Такою має бути структура папки проєкту, яку ти відкриваєш у VS Code через File → Open Folder."
        width={960}
        height={463}
      />

      <DemoExplanation>
        Усі файли одного проєкту зберігаються поруч, в одній кореневій папці. VS Code відкриває саму папку — не
        окремі файли — щоб бачити їх усі одразу в Explorer.
      </DemoExplanation>

      <LessonFigure
        src="/images/courses/vscode/vscode-empty-file-skeleton.png"
        alt="Реальний скріншот щойно створеного файлу index.html з базовим HTML-каркасом (doctype, head, body) і курсором усередині body"
        caption="Так виглядає новий index.html відразу після створення — ще майже порожній."
        width={960}
        height={437}
      />

      <DemoKeyTakeaway>
        Створюй нові файли прямо в VS Code (клік правою кнопкою в Explorer → New File) — так розширення файлу
        завжди буде правильним і видимим.
      </DemoKeyTakeaway>
    </div>
  );
}
