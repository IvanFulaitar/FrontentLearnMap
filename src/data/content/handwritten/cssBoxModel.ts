import type { LessonOverride } from "./htmlFoundations";

/**
 * Module "Box-модель і відступи" (css-box-model). Cheat-sheet format.
 * Continues styles.css for the café project (v3 → v5).
 */
export const cssBoxModelOverrides: Record<string, LessonOverride> = {
  "Box-модель на практиці": {
    interactiveDemo: "box-model-demo",
    whatIsIt: "Кожен елемент — прямокутник з чотирьох шарів: content (вміст), padding (внутрішній відступ), border (рамка), margin (зовнішній відступ). box-sizing вирішує, чи padding/border входять у заданий width.",
    whyUseIt: "Без box-sizing: border-box картка з width: 300px і padding: 20px стає фактично 340px шириною — макет \"розповзається\" непередбачувано, це найчастіша причина \"чому воно не влазить\".",
    whenToUse: ["box-sizing: border-box — постав раз, глобально, на всі елементи проєкту.", "padding — простір усередині елемента (між рамкою і вмістом).", "margin — простір зовні елемента (між ним і сусідами)."],
    whenNotToUse: ["Не забувай border-box — без нього розрахунок ширини стає незрозумілим і плутаним.", "Не використовуй margin, коли насправді потрібен padding (відступ усередині картки — це padding, не margin)."],
    comparisonTable: {
      headers: ["Шар", "Що це"],
      rows: [
        ["content", "Текст/вміст елемента"],
        ["padding", "Простір усередині, до рамки"],
        ["border", "Рамка"],
        ["margin", "Простір зовні, до сусідів"],
      ],
    },
    codeWalkthroughs: [
      {
        before: "Глобальний border-box — перше правило в будь-якому проєкті:",
        code: `*, *::before, *::after {
  box-sizing: border-box;
}

.menu-card {
  width: 280px;
  padding: 16px;
  border: 1px solid #e5e7eb;
}`,
        lineNotes: ["box-sizing: border-box рахує padding і border УСЕРЕДИНІ заданих 280px.", "Без цього правила реальна ширина картки була б 280 + 32 (padding) + 2 (border) = 314px."],
        after: "Картка залишається рівно 280px завширшки, незалежно від padding чи border.",
      },
    ],
    commonMistakes: ["Відсутній box-sizing: border-box — ширина \"з'їжджає\" при будь-якому padding.", "Плутанина padding і margin — відступ усередині картки заданий через margin замість padding.", "Множинні margin на сусідніх елементах замість gap (буде в модулі Flexbox)."],
    dontDoThis: { code: `.card {\n  width: 300px;\n  padding: 24px;\n  /* без box-sizing: border-box */\n}`, explanation: "Реальна ширина картки стане 300+48=348px — несподівано для будь-кого, хто читає лише width: 300px." },
    bestPractices: ["Постав `*, *::before, *::after { box-sizing: border-box; }` одним із перших правил у будь-якому новому проєкті.", "Думай про padding як \"дихання\" вмісту, а margin як \"дистанцію\" до сусідів."],
    remember: ["content → padding → border → margin, зсередини назовні.", "border-box — рахує padding/border усередині заданої ширини.", "Постав border-box глобально один раз на весь проєкт."],
    interviewQuestions: [{ question: "Що станеться з шириною елемента width: 200px, padding: 20px без box-sizing: border-box?", answer: "Реальна ширина стане 240px (200 + 20 зліва + 20 справа), бо за замовчуванням (content-box) padding додається поверх заданої ширини." }],
    summary: "Box-модель — це чотири шари навколо вмісту. box-sizing: border-box рахує padding/border усередині заданої ширини — постав його глобально й одразу забудь про цю проблему назавжди.",
    nextLessonNote: "Далі — margin проти padding: коли який.",
    practiceTask: {
      title: "Проєкт курсу: глобальний border-box",
      description: "Додай глобальне правило box-sizing: border-box для всього сайту кав'ярні.",
      checklist: ["Правило застосовується до всіх елементів і псевдоелементів.", "Стоїть на самому початку styles.css."],
      starterFiles: [{ id: "cafe-css-v3-start", path: "styles.css", language: "css", label: "styles.css", code: `:root {\n  --color-primary: #b45309;\n}` }],
      solutionFiles: [
        {
          id: "cafe-css-v4a",
          path: "styles.css",
          language: "css",
          label: "styles.css",
          code: `*, *::before, *::after {
  box-sizing: border-box;
}

:root {
  --color-primary: #b45309;
}`,
          readOnly: true,
        },
      ],
      hints: ["Це правило майже завжди йде найпершим у файлі."],
      expectedOutput: "Усі елементи сайту тепер рахують padding/border усередині заданої ширини.",
    },
    microExercises: [
      { id: "css-box-model-predict", kind: "predict", prompt: "width: 100px, padding: 10px, box-sizing: border-box. Яка реальна ширина елемента?", solution: "100px — border-box рахує padding усередині заданої ширини, тож зовнішній розмір лишається 100px." },
    ],
  },

  "Margin проти padding": {
    interactiveDemo: "margin-padding-demo",
    whatIsIt: "padding — простір усередині елемента, між його рамкою і вмістом; він частина \"клікабельної\"/видимої області фону. margin — простір зовні, між елементом і його сусідами; фон елемента туди не поширюється.",
    whyUseIt: "Плутанина margin/padding — топ-1 помилка новачків: результат виглядає однаково на око, але поводиться по-різному (фон, клікабельність, схлопування).",
    whenToUse: ["padding — відступ між текстом і краєм кнопки/картки.", "margin — відстань між двома картками чи секціями."],
    whenNotToUse: ["Не став margin усередині картки, де насправді потрібен відступ від тексту до рамки — це задача padding.", "Не використовуй margin для вирівнювання кількох елементів у ряд (для цього — flexbox з gap, буде в наступному модулі)."],
    comparisonTable: {
      headers: ["", "padding", "margin"],
      rows: [
        ["Де", "Усередині елемента", "Зовні елемента"],
        ["Фон елемента", "Поширюється на padding", "Не поширюється на margin"],
        ["Схлопується з сусідами?", "Ніколи", "Так, вертикальний margin може"],
      ],
    },
    codeWalkthroughs: [
      {
        before: "Кнопка бронювання: правильне використання обох:",
        code: `.button {
  padding: 12px 24px; /* простір між текстом і краєм кнопки */
  margin-top: 16px;   /* відстань до елемента над кнопкою */
}`,
        lineNotes: ["padding робить кнопку \"дихаючою\" — текст не притиснутий до країв.", "margin-top відсуває кнопку від сусіда згори, не займаючи фон кнопки."],
        after: "Кнопка виглядає просторо всередині і має власний відступ зовні від решти контенту.",
      },
    ],
    commonMistakes: ["padding замість margin для відступу МІЖ елементами.", "margin замість padding для відступу ВСЕРЕДИНІ елемента.", "Забутий факт, що вертикальні margin сусідніх блоків можуть схлопнутись в один (більший з двох), а не скластись."],
    dontDoThis: { code: `.button {\n  margin: 12px 24px; /* мало бути padding */\n}`, explanation: "Це збільшує клікабельну зовнішню \"порожню\" зону навколо кнопки замість того, щоб зробити саму кнопку просторішою всередині — фон кнопки лишається маленьким." },
    bestPractices: ["Питай: \"це простір усередині компонента чи між компонентами?\" — перше це padding, друге margin.", "Для відступів між кількома елементами в ряд/колонку майже завжди краще gap (Flexbox/Grid), а не margin на кожному."],
    remember: ["padding — усередині, впливає на фон елемента.", "margin — зовні, до сусідів.", "Вертикальні margin можуть схлопуватись, padding — ніколи."],
    interviewQuestions: [{ question: "Чому margin-top: 20px і margin-bottom: 20px двох сусідніх блоків не завжди дають 40px між ними?", answer: "Вертикальні margin сусідніх елементів можуть схлопуватись (collapse) в один спільний відступ, що дорівнює більшому з двох значень, а не їх сумі — це особливість блокового потоку CSS." }],
    summary: "padding — простір усередині, впливає на фон. margin — простір зовні, до сусідів, і може схлопуватись. Обери правильний за питанням \"усередині чи зовні компонента\".",
    nextLessonNote: "Далі — display: block, inline, none і як це впливає на розмір/поведінку елемента.",
    practiceTask: {
      title: "Проєкт курсу: відступи кнопки бронювання",
      description: "Додай padding усередині кнопки бронювання і margin-top для відступу від сусіднього елемента.",
      checklist: ["padding робить кнопку просторою всередині.", "margin-top відсуває кнопку від елемента над нею."],
      starterFiles: [{ id: "cafe-css-v4a-start", path: "styles.css", language: "css", label: "styles.css", code: `.button {\n  background: var(--color-primary);\n}` }],
      solutionFiles: [
        {
          id: "cafe-css-v4b",
          path: "styles.css",
          language: "css",
          label: "styles.css",
          code: `.button {
  background: var(--color-primary);
  padding: 12px 24px;
  margin-top: 16px;
  border: none;
  color: white;
}`,
          readOnly: true,
        },
      ],
      hints: ["padding — усередині кнопки, margin — між кнопкою і сусідами."],
      expectedOutput: "Кнопка бронювання з правильним внутрішнім і зовнішнім відступом.",
    },
    microExercises: [
      { id: "css-margin-padding-find-bug", kind: "find-the-bug", prompt: "Кнопка виглядає притиснутою (текст торкається країв), хоча є margin: 12px 24px. Що не так?", solution: "Потрібен padding, а не margin — margin відсуває кнопку від сусідів, але не додає простору між текстом і краєм самої кнопки." },
    ],
  },

  "Display: block, inline, none": {
    interactiveDemo: "display-demo",
    whatIsIt: "display визначає базову поведінку елемента: block займає весь рядок і поважає width/height, inline тече в рядку тексту й ігнорує width/height, none повністю прибирає елемент з розмітки (місце не резервується).",
    whyUseIt: "\"Чому мій width не працює?\" — у 90% випадків елемент inline (наприклад, <span>), а inline-елементи ігнорують width/height за задумом.",
    whenToUse: ["block — секції, картки, div-обгортки, усе, що має бути \"своїм рядком\".", "inline — невеликі фрагменти тексту всередині речення (strong, em, a за замовчуванням).", "none — приховати елемент повністю (наприклад, мобільне меню, доки не відкрите)."],
    whenNotToUse: ["Не став width/height на inline-елемент, сподіваючись, що спрацює, — потрібен display: inline-block чи block.", "Не плутай display: none з visibility: hidden — none прибирає з макета, hidden лишає порожнє місце."],
    comparisonTable: {
      headers: ["display", "Поважає width/height?", "Займає весь рядок?"],
      rows: [
        ["block", "Так", "Так"],
        ["inline", "Ні", "Ні, тече в тексті"],
        ["inline-block", "Так", "Ні, тече в рядку"],
        ["none", "—", "Елемента немає в макеті взагалі"],
      ],
    },
    codeWalkthroughs: [
      {
        before: "Мобільне меню кав'ярні: приховане, доки не відкрите",
        code: `.mobile-menu {
  display: none;
}

.mobile-menu.is-open {
  display: block;
}`,
        lineNotes: ["display: none повністю прибирає меню — воно не займає місця і не читається скрінрідером.", "Клас .is-open (додається кліком) вмикає block і меню з'являється."],
        after: "Меню повністю відсутнє на сторінці, доки користувач не натисне кнопку відкриття.",
      },
    ],
    commonMistakes: ["width/height на inline-елементі без зміни display.", "display: none замість visibility: hidden там, де потрібно зберегти місце в макеті (і навпаки).", "Забутий display: block на div, який чомусь поводиться як inline через успадкований стиль."],
    dontDoThis: { code: `span { width: 200px; height: 50px; background: coral; }`, explanation: "span — inline за замовчуванням і повністю ігнорує width/height. Потрібен display: inline-block або block, щоб розміри взагалі щось означали." },
    bestPractices: ["Для прихованого спочатку контенту (акордеони, мобільне меню) використовуй display: none + клас-перемикач.", "Не змінюй display тегів без причини — <span> навмисно inline, <div> навмисно block; став inline-block лише коли потрібні обидві властивості одразу."],
    remember: ["block — своя лінія, поважає розміри.", "inline — тече в тексті, ігнорує width/height.", "display: none — елемента немає в макеті взагалі, на відміну від visibility: hidden."],
    interviewQuestions: [{ question: "У чому різниця між display: none і visibility: hidden?", answer: "display: none повністю прибирає елемент з макета (місце не резервується, скрінрідер його не бачить), а visibility: hidden лише робить елемент невидимим, зберігаючи зайняте ним місце в розмітці." }],
    summary: "display вирішує базову поведінку елемента в потоці сторінки. block для структурних блоків, inline для тексту, none для повністю прихованого контенту.",
    nextLessonNote: "Box-модель завершена. Далі — типографіка: як зробити текст кав'ярні читабельним.",
    practiceTask: {
      title: "Проєкт курсу: приховане мобільне меню",
      description: "Додай клас для мобільного меню, приховай його за замовчуванням.",
      checklist: ["Меню має display: none за замовчуванням.", "Клас .is-open вмикає display: block."],
      starterFiles: [{ id: "cafe-css-v4b-start", path: "styles.css", language: "css", label: "styles.css", code: `.mobile-menu {\n}` }],
      solutionFiles: [
        {
          id: "cafe-css-v5",
          path: "styles.css",
          language: "css",
          label: "styles.css",
          code: `.mobile-menu {
  display: none;
}

.mobile-menu.is-open {
  display: block;
}`,
          readOnly: true,
        },
      ],
      hints: ["Клас is-open зазвичай додає/прибирає JavaScript по кліку на кнопку-гамбургер."],
      expectedOutput: "Мобільне меню повністю приховане, доки не отримає клас is-open.",
    },
    microExercises: [
      { id: "css-display-choice", kind: "choice", prompt: "Потрібно приховати блок так, щоб він зовсім не займав місця в макеті. Що обрати?", options: ["visibility: hidden", "opacity: 0", "display: none", "color: transparent"], correctAnswer: "display: none", solution: "Тільки display: none прибирає елемент з макета повністю — решта варіантів лишають зайняте місце." },
    ],
  },
};
