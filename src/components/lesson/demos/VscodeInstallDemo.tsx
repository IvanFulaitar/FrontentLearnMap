import { DemoCodeSnippet, DemoExplanation, DemoKeyTakeaway, LessonFigure } from "./framework";
import styles from "./demos.module.css";

const EXPLANATION =
  "«Add to PATH» — це параметр, який дозволяє операційній системі знаходити команду code, коли ти вводиш її в терміналі з будь-якої папки. Якщо цей параметр пропустити, VS Code все одно встановиться і відкриватиметься зі значка на робочому столі, але команда code в терміналі поки що не працюватиме.";

const WINDOWS_SCREENSHOTS = [
  {
    src: "/images/courses/vscode/vscode-download-page.png",
    alt: "Реальний скріншот офіційної сторінки code.visualstudio.com з кнопками завантаження для Windows, Linux і Mac",
    caption: "1. Офіційна сторінка завантаження code.visualstudio.com — натисни кнопку для своєї ОС.",
    width: 960,
    height: 418,
  },
  {
    src: "/images/courses/vscode/vscode-windows-license.png",
    alt: "Реальний скріншот вікна встановлювача VS Code на Windows з ліцензійною угодою і обраним пунктом I accept the agreement",
    caption: "2. Прийми ліцензійну угоду — стандартний крок будь-якого встановлювача.",
    width: 900,
    height: 673,
  },
  {
    src: "/images/courses/vscode/vscode-windows-add-to-path.png",
    alt: "Реальний скріншот кроку Select Additional Tasks встановлювача VS Code з позначеною галочкою Add to PATH (requires shell restart)",
    caption: "3. Найважливіший крок: обов'язково залиш «Add to PATH» позначеним.",
    width: 894,
    height: 672,
  },
  {
    src: "/images/courses/vscode/vscode-windows-setup-finish.png",
    alt: "Реальний скріншот останнього кроку встановлювача VS Code Completing the Visual Studio Code Setup Wizard з кнопкою Finish",
    caption: "4. Finish завершує встановлення й одразу відкриває VS Code.",
    width: 895,
    height: 676,
  },
];

/**
 * Static demo for "Встановлення VS Code": 4 real screenshots of an actual
 * Windows installation, each already numbered and captioned, so no separate
 * step-list is needed. macOS has no interface screenshots (course author
 * doesn't have a Mac) — handled with a short text note instead of an OS
 * toggle, since there's nothing to switch to.
 */
export function VscodeInstallDemo() {
  return (
    <div className={styles.demoStack}>
      {WINDOWS_SCREENSHOTS.map((shot) => (
        <LessonFigure key={shot.src} {...shot} />
      ))}

      <DemoExplanation>{EXPLANATION}</DemoExplanation>

      <DemoCodeSnippet code="code --version" />

      <DemoExplanation>
        На macOS процес суттєво простіший і скріншотів тут немає: офіційний сайт → застосунок → перетягнути в
        Applications. Окремого встановлювача й кроку «Add to PATH», як на Windows, там немає.
      </DemoExplanation>

      <DemoKeyTakeaway>
        Після встановлення завжди перевіряй результат тим самим способом: відкрий новий термінал (старий, відкритий
        до встановлення, ще не знає про зміни) і виконай code --version. Якщо з'явився номер версії — встановлення
        пройшло успішно.
      </DemoKeyTakeaway>
    </div>
  );
}
