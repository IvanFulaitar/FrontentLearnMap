import { DemoExplanation, DemoKeyTakeaway, LessonFigure } from "./framework";
import styles from "./demos.module.css";

/** Static demo for "Форматування коду": a real screenshot of formatted code
 * in the editor, plus 2 real screenshots showing how to reach the Settings
 * UI and an example setting there (Auto Save — the same search box is how
 * you'd find "Format On Save" too). */
export function VscodeFormattingDemo() {
  return (
    <div className={styles.demoStack}>
      <LessonFigure
        src="/images/courses/vscode/vscode-formatting-before-after.png"
        alt="Реальний скріншот VS Code з відформатованим HTML-кодом: рівні відступи, кожен тег і атрибут на своєму місці"
        caption="Так виглядає код після автоформатування Prettier — рівні відступи, узгоджений стиль."
        width={960}
        height={646}
      />

      <DemoExplanation>
        Форматування — це автоматичне вирівнювання відступів, пробілів і переносів рядків за єдиним стилем. Це не
        перевірка помилок і не виправлення логіки коду.
      </DemoExplanation>

      <LessonFigure
        src="/images/courses/vscode/vscode-open-settings-menu.png"
        alt="Реальний скріншот меню VS Code з підсвіченим пунктом Settings і поєднанням клавіш Ctrl+кома"
        caption="Settings відкривається через це меню або Ctrl+, — тим самим шляхом шукають і «Format On Save»."
        width={532}
        height={475}
      />

      <LessonFigure
        src="/images/courses/vscode/vscode-auto-save-setting.png"
        alt="Реальний скріншот вікна Settings VS Code з пошуковим запитом auto save і відкритим списком варіантів для Files: Auto Save (off, afterDelay, onFocusChange, onWindowChange)"
        caption="Приклад пошуку налаштування в Settings — «format on save» шукається так само."
        width={960}
        height={508}
      />

      <DemoKeyTakeaway>
        Formatter не гарантує, що код працює — він лише робить його однаково оформленим. Помилки в логіці
        JavaScript formatter не бачить і не виправляє.
      </DemoKeyTakeaway>
    </div>
  );
}
