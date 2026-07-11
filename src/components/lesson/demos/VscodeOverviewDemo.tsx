import { DemoExplanation, DemoKeyTakeaway, LessonFigure } from "./framework";
import styles from "./demos.module.css";

/**
 * Static overview demo for "Що таке VS Code": what the editor is for, plus a
 * first look at its layout — before the interactive per-area walkthrough in
 * the "Інтерфейс VS Code" lesson.
 */
export function VscodeOverviewDemo() {
  return (
    <div className={styles.demoStack}>
      <LessonFigure
        src="/images/courses/vscode/vscode-welcome-screen.png"
        alt="Реальний скріншот стартового екрана VS Code одразу після встановлення: меню File/Edit/Selection, панель Activity Bar зліва, розділи Start і Walkthroughs"
        caption="Так виглядає VS Code одразу після встановлення, ще без відкритого проєкту."
        width={960}
        height={240}
      />

      <DemoExplanation>
        VS Code — не браузер і не операційна система, а редактор коду: програма для читання, написання й
        редагування текстових файлів проєкту (HTML, CSS, JavaScript та інших).
      </DemoExplanation>

      <DemoKeyTakeaway>
        Не намагайся запам'ятати всі назви одразу. На перших порах достатньо знати, що зліва — файли проєкту
        (Explorer), у центрі — код, який ти редагуєш (Editor), а внизу можна відкрити термінал.
      </DemoKeyTakeaway>
    </div>
  );
}
