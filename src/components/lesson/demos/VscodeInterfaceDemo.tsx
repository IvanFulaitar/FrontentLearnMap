import { DemoExplanation, DemoKeyTakeaway, LessonFigure } from "./framework";
import styles from "./demos.module.css";

/**
 * Static demo for "Інтерфейс VS Code": 2 real screenshots (full editor
 * layout, Command Palette overlay). Previously included a text rundown of
 * all 7 interface areas below the screenshots — removed as redundant now
 * that the screenshots themselves, plus the lesson's own text, cover this.
 */
export function VscodeInterfaceDemo() {
  return (
    <div className={styles.demoStack}>
      <LessonFigure
        src="/images/courses/vscode/vscode-interface-full-file.png"
        alt="Реальний скріншот VS Code з відкритим index.html: Explorer зліва, вкладки й код у центрі, мінімапа справа, статус-бар знизу"
        caption="Так виглядає вікно VS Code з відкритим проєктом і файлом — усі основні області одразу."
        width={960}
        height={512}
      />

      <LessonFigure
        src="/images/courses/vscode/vscode-command-palette.png"
        alt="Реальний скріншот відкритої Command Palette з полем пошуку команд і списком варіантів: Go to File, Show and Run Commands, Search for Text"
        caption="Command Palette відкривається окремим спливаючим полем над усім вікном."
        width={937}
        height={373}
      />

      <DemoExplanation>
        Не потрібно запам'ятовувати розташування всіх областей одразу — з часом це стає звичним самою практикою.
      </DemoExplanation>

      <DemoKeyTakeaway>
        На практиці найчастіше використовуються Explorer (щоб знайти файл), Editor (щоб писати код) і Terminal (щоб
        виконати команду) — решта стане звичною з часом.
      </DemoKeyTakeaway>
    </div>
  );
}
