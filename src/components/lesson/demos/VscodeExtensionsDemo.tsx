import { DemoExplanation, DemoKeyTakeaway, LessonFigure } from "./framework";
import styles from "./demos.module.css";

/** Static demo for "Розширення": what an extension actually adds, plus the
 * two safety habits (check the publisher, start with one extension). Both
 * screenshots below are real. */
export function VscodeExtensionsDemo() {
  return (
    <div className={styles.demoStack}>
      <LessonFigure
        src="/images/courses/vscode/vscode-extensions-panel.png"
        alt="Реальний скріншот Activity Bar VS Code зі значком Extensions, виділеним червоною рамкою, і підказкою Extensions (Ctrl+Shift+X)"
        caption="Панель Extensions відкривається цим значком у Activity Bar зліва (Ctrl+Shift+X)."
        width={331}
        height={289}
      />

      <DemoExplanation>
        Розширення (extension) — окрема невелика програма, яку встановлюють усередині VS Code через панель
        Extensions. Для цього курсу достатньо одного розширення — Prettier.
      </DemoExplanation>

      <LessonFigure
        src="/images/courses/vscode/vscode-prettier-extension.png"
        alt="Реальний скріншот сторінки розширення Prettier - Code formatter у Marketplace: видавець Prettier з галочкою, 69 922 450 встановлень, рейтинг 3.5 з 491 відгуку"
        caption="Так виглядає сторінка розширення в Marketplace — перевір видавця (Prettier, з галочкою) перед встановленням."
        width={960}
        height={508}
      />

      <DemoKeyTakeaway>
        Перед встановленням будь-якого розширення перевіряй Publisher на його сторінці — офіційні розширення
        (як Prettier) мають перевірений значок і мільйони встановлень.
      </DemoKeyTakeaway>
    </div>
  );
}
