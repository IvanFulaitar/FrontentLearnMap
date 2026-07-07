import type { LessonOverride } from "./htmlFoundations";

/**
 * Module "Кнопки і картки" (css-real-buttons-cards). Cheat-sheet format.
 * Continues styles.css for the café project (v15 → v19).
 */
export const cssRealButtonsCardsOverrides: Record<string, LessonOverride> = {
  "Кнопки та стани :hover/:focus": {
    whatIsIt: ":hover — стиль під час наведення миші. :focus-visible — стиль, коли елемент отримав фокус з клавіатури (Tab). transition робить перехід між станами плавним, а не миттєвим.",
    whyUseIt: "Кнопка без жодної реакції на hover/focus виглядає \"мертвою\" — користувач не впевнений, що це взагалі клікабельний елемент.",
    whenToUse: ["hover — легка зміна кольору/тіні при наведенні миші.", "focus-visible — обов'язковий помітний стиль для навігації клавіатурою (інакше користувач губить, де він).", "transition — на color/background/transform, для плавності."],
    whenNotToUse: ["Не прибирай :focus стиль без заміни власним — це ламає доступність для користувачів клавіатури.", "Не став transition: all — це дорого для продуктивності; вказуй конкретні властивості (background-color, transform)."],
    comparisonTable: {
      headers: ["Псевдоклас", "Коли спрацьовує"],
      rows: [
        ["hover", "Наведення миші"],
        ["focus-visible", "Фокус з клавіатури (Tab)"],
        ["active", "Момент натискання"],
      ],
    },
    codeWalkthroughs: [
      {
        before: "Кнопка бронювання з повним набором станів (наведи мишею, натисни Tab, клікни — усе живе нижче):",
        code: `<button class="button">Забронювати столик</button>

<style>
.button {
  background: var(--color-primary);
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  transition: background-color 150ms ease, transform 150ms ease;
}

.button:hover {
  background: #92400e;
}

.button:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.button:active {
  transform: scale(0.98);
}
</style>`,
        lineNotes: ["transition вказує конкретні властивості, а не all — легше для браузера.", "focus-visible дає чіткий, помітний контур для клавіатурної навігації.", "active злегка зменшує кнопку — тактильне відчуття натискання."],
        after: "Кнопка бронювання реагує на наведення, фокус і клік — відчувається \"живою\".",
      },
    ],
    commonMistakes: ["outline: none без жодної заміни — кнопка стає непомітною для клавіатурної навігації.", "transition: all — рахує зміни всіх властивостей, включно з тими, що не змінюються.", "Однаковий стиль :hover і :focus-visible — вони мають різне призначення (миша проти клавіатури), хоч можуть частково перетинатись."],
    dontDoThis: { code: `.button:focus { outline: none; }`, explanation: "Прибирає фокус без заміни — користувач клавіатури втрачає орієнтир, на якій кнопці він перебуває." },
    bestPractices: ["Завжди май помітний :focus-visible стиль, навіть якщо він відрізняється від :hover.", "Вказуй конкретні властивості в transition, а не all, для продуктивності."],
    remember: ["hover — миша, focus-visible — клавіатура, active — момент кліку.", "Ніколи не outline: none без заміни.", "transition з конкретними властивостями, не all."],
    interviewQuestions: [{ question: "У чому різниця між :focus і :focus-visible?", answer: ":focus спрацьовує при будь-якому отриманні фокусу (включно з кліком миші), а :focus-visible — переважно коли фокус отримано з клавіатури, тож не показує зайве кільце фокуса при звичайному кліку мишею." }],
    summary: "hover для миші, focus-visible для клавіатури, active для моменту кліку. transition з конкретними властивостями робить усі переходи плавними без шкоди продуктивності.",
    nextLessonNote: "Далі — тіні й радіуси для глибини та м'якості інтерфейсу.",
    practiceTask: {
      title: "Проєкт курсу: інтерактивна кнопка бронювання",
      description: "Додай hover, focus-visible і active стани до кнопки бронювання.",
      checklist: ["Є transition з конкретними властивостями.", "hover змінює колір фону.", "focus-visible має помітний outline.", "active злегка зменшує кнопку."],
      starterFiles: [{ id: "cafe-css-v14-start", path: "styles.css", language: "css", label: "styles.css", code: `.button {\n  background: var(--color-primary);\n  color: white;\n}` }],
      solutionFiles: [
        {
          id: "cafe-css-v15",
          path: "styles.css",
          language: "css",
          label: "styles.css",
          code: `.button {
  background: var(--color-primary);
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  transition: background-color 150ms ease, transform 150ms ease;
}

.button:hover { background: #92400e; }
.button:focus-visible { outline: 2px solid var(--color-primary); outline-offset: 2px; }
.button:active { transform: scale(0.98); }`,
          readOnly: true,
        },
      ],
      hints: ["outline-offset відсуває контур трохи від країв кнопки — виглядає акуратніше."],
      expectedOutput: "Кнопка бронювання, що реагує на наведення, фокус і клік.",
    },
    microExercises: [
      { id: "css-button-states-choice", kind: "choice", prompt: "Користувач навігує сайтом лише клавіатурою (Tab). Який стан кнопки для нього найважливіший?", options: [":hover", ":focus-visible", ":active", ":visited"], correctAnswer: ":focus-visible", solution: ":hover взагалі не спрацює без миші — орієнтиром для клавіатури є саме focus-visible." },
    ],
  },

  "Тіні та радіуси": {
    whatIsIt: "border-radius округлює кути елемента. box-shadow додає тінь (зсув по X, зсув по Y, розмиття, колір), створюючи відчуття глибини й \"піднятості\" картки над фоном.",
    whyUseIt: "Плоска картка без тіні й радіусів зливається з фоном сторінки — легка тінь і округлені кути одразу роблять інтерфейс сучаснішим і зрозумілішим (\"це окремий блок\").",
    whenToUse: ["border-radius: 8-12px — стандарт для карток, кнопок, полів вводу в сучасному UI.", "box-shadow — легка тінь на картках меню, помітніша тінь на модалках/спливаючих елементах."],
    whenNotToUse: ["Не став дуже темну, різку тінь (box-shadow: 0 10px 40px black) — це виглядає важко й неприродно.", "Не використовуй різний border-radius на однотипних елементах (одна картка 8px, інша 16px) — втрачається візуальна узгодженість."],
    comparisonTable: {
      headers: ["Значення box-shadow", "Ефект"],
      rows: [
        ["0 1px 3px rgba(0,0,0,0.1)", "Легка, майже непомітна тінь"],
        ["0 4px 12px rgba(0,0,0,0.15)", "Помітна тінь картки \"над\" фоном"],
        ["0 20px 40px rgba(0,0,0,0.3)", "Сильна тінь для модалок/спливаючих елементів"],
      ],
    },
    codeWalkthroughs: [
      {
        before: "Картка меню з м'якою тінню і округленими кутами:",
        code: `<div class="menu-card">
  <strong>Капучино</strong>
  <p>Еспресо з молочною пінкою</p>
  <span>75 грн</span>
</div>

<style>
.menu-card {
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  background: white;
  padding: 16px;
}
</style>`,
        lineNotes: ["border-radius: 12px — сучасний, м'який вигляд картки.", "box-shadow з низькою прозорістю (0.08) — легка, не нав'язлива тінь."],
        after: "Картка меню виглядає як окремий, \"піднятий\" елемент над фоном сторінки.",
      },
    ],
    commonMistakes: ["Занадто темна/різка тінь, що виглядає важко.", "Різний border-radius на однотипних елементах без системи.", "box-shadow без прозорості (суцільний чорний) замість rgba з низькою альфа."],
    dontDoThis: { code: `.menu-card { box-shadow: 0 10px 30px black; }`, explanation: "Суцільний чорний колір без прозорості дає різку, неприродну тінь — реальні тіні м'які й напівпрозорі, тому варто rgba(0,0,0, 0.1-0.2)." },
    bestPractices: ["Задай border-radius і рівні box-shadow як CSS-змінні (--radius, --shadow-sm, --shadow-lg) для узгодженості по всьому сайту.", "Тінь має бути тонкою й напівпрозорою — це виглядає природніше за різкий суцільний колір."],
    remember: ["border-radius 8-12px — сучасний стандарт для карток/кнопок.", "box-shadow з низькою прозорістю виглядає природніше за різку тінь.", "Узгоджуй радіуси й тіні по всьому проєкту через змінні."],
    interviewQuestions: [{ question: "Чому box-shadow з напівпрозорим кольором (rgba) виглядає природніше за суцільний чорний?", answer: "Реальні тіні від світла ніколи не суцільно чорні — вони м'які й напівпрозорі; rgba(0,0,0,0.1-0.2) імітує це, тоді як суцільний чорний дає різкий, неприродний ефект." }],
    summary: "border-radius і box-shadow з низькою прозорістю додають глибину інтерфейсу без зайвої різкості. Узгоджуй обидва через CSS-змінні по всьому проєкту.",
    nextLessonNote: "Далі — застосуємо це до реальних карток меню кав'ярні.",
    practiceTask: {
      title: "Проєкт курсу: тіні й радіуси карток",
      description: "Додай border-radius і box-shadow до карток меню кав'ярні.",
      checklist: ["border-radius застосовано.", "box-shadow м'яка й напівпрозора."],
      starterFiles: [{ id: "cafe-css-v15-start", path: "styles.css", language: "css", label: "styles.css", code: `.menu-card {\n  background: white;\n  padding: 16px;\n}` }],
      solutionFiles: [
        {
          id: "cafe-css-v16a",
          path: "styles.css",
          language: "css",
          label: "styles.css",
          code: `.menu-card {
  background: white;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}`,
          readOnly: true,
        },
      ],
      hints: ["rgba з низькою альфа (0.08) дає м'яку тінь."],
      expectedOutput: "Картки меню виглядають \"піднятими\" над фоном сторінки.",
    },
    microExercises: [
      { id: "css-shadow-choice", kind: "choice", prompt: "Яка тінь виглядатиме найприродніше для звичайної картки в списку?", options: ["box-shadow: 0 20px 40px black;", "box-shadow: 0 4px 12px rgba(0,0,0,0.08);", "box-shadow: 0 0 0 5px red;", "box-shadow: none;"], correctAnswer: "box-shadow: 0 4px 12px rgba(0,0,0,0.08);", solution: "М'яка, напівпрозора тінь виглядає природніше за різкий чорний чи повну відсутність тіні." },
    ],
  },

  "Картки меню": {
    whatIsIt: "Застосування Grid + Flexbox + тіней/радіусів до реальних карток напоїв: сітка карток, кожна картка — flex-колонка з назвою, ціною і однаковою висотою незалежно від довжини тексту.",
    whyUseIt: "Картки з різною висотою через різну довжину назви напою виглядають неохайно в сітці — потрібен спосіб вирівняти їх незалежно від вмісту.",
    whenToUse: ["Grid на контейнері карток + Flexbox усередині кожної картки — стандартна комбінація.", "align-items: stretch (значення Grid/Flex за замовчуванням) — картки в одному рядку розтягуються до однакової висоти автоматично."],
    whenNotToUse: ["Не задавай фіксовану height на картках з текстом різної довжини — це або обріже текст, або залишить нерівне порожнє місце.", "Не забувай flex-direction: column усередині картки — інакше назва й ціна підуть у ряд замість колонки."],
    codeWalkthroughs: [
      {
        before: "Сітка карток меню, де кожна картка однакової висоти автоматично (зверни увагу — довша назва напою не робить його картку вищою за сусідні):",
        code: `<div class="menu-grid">
  <div class="menu-card">
    <strong>Капучино</strong>
    <span>75 грн</span>
  </div>
  <div class="menu-card">
    <strong>Фільтр-кава з м'ятним сиропом і корицею</strong>
    <span>95 грн</span>
  </div>
  <div class="menu-card">
    <strong>Чізкейк</strong>
    <span>110 грн</span>
  </div>
</div>

<style>
.menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}

.menu-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 16px;
  background: #ffffff;
}
</style>`,
        lineNotes: ["Grid автоматично розтягує картки одного рядка до однакової висоти (align-items: stretch за замовчуванням).", "Flex-колонка всередині картки впорядковує назву, опис і ціну вертикально."],
        after: "Усі картки меню однакової висоти в межах рядка, незалежно від довжини назви напою.",
      },
    ],
    commonMistakes: ["Фіксована height на картці замість покладання на природне вирівнювання Grid.", "Забутий flex-direction: column усередині картки — вміст іде в ряд замість колонки.", "Непослідовний padding між картками різних секцій сайту."],
    dontDoThis: { code: `.menu-card { height: 200px; overflow: hidden; }`, explanation: "Фіксована висота з overflow: hidden обрізає текст довших назв замість того, щоб дозволити картці природно підлаштуватись — Grid уже вирівнює висоту рядка сам." },
    bestPractices: ["Довіряй природному вирівнюванню Grid/Flex (stretch за замовчуванням) замість вручну заданих фіксованих розмірів.", "Тримай внутрішню структуру картки (флекс-колонку) послідовною для всіх типів карток сайту (меню, галерея, ціни)."],
    remember: ["Grid + Flexbox усередині карток — стандартна комбінація для реальних сіток.", "Grid вирівнює висоту карток одного рядка автоматично.", "Уникай фіксованої height там, де контент може бути різної довжини."],
    interviewQuestions: [{ question: "Чому картки в одному рядку Grid автоматично стають однакової висоти без додаткового CSS?", answer: "За замовчуванням Grid (і Flexbox) вирівнює елементи властивістю align-items: stretch, тож усі елементи одного рядка/колонки розтягуються до висоти найвищого серед них." }],
    summary: "Grid для сітки карток + Flexbox-колонка всередині кожної картки — головний патерн для карток меню, товару чи ціни. Довіряй природному stretch-вирівнюванню замість фіксованих розмірів.",
    nextLessonNote: "Далі — псевдоелементи ::before/::after для декоративних деталей без зайвих div.",
    practiceTask: {
      title: "Проєкт курсу: сітка карток меню",
      description: "Побудуй сітку карток меню кав'ярні з однаковою висотою в межах рядка.",
      checklist: ["Grid-контейнер з auto-fit/minmax.", "Кожна картка — flex-колонка.", "Картки одного рядка однакової висоти."],
      starterFiles: [{ id: "cafe-css-v16a-start", path: "styles.css", language: "css", label: "styles.css", code: `.menu-card {\n  border-radius: 12px;\n}` }],
      solutionFiles: [
        {
          id: "cafe-css-v16b",
          path: "styles.css",
          language: "css",
          label: "styles.css",
          code: `.menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}

.menu-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 16px;
}`,
          readOnly: true,
        },
      ],
      hints: ["Не задавай height вручну — Grid вирівняє висоту сам."],
      expectedOutput: "Сітка карток меню з однаковою висотою в кожному рядку.",
    },
    microExercises: [
      { id: "css-menu-cards-predict", kind: "predict", prompt: "У ряду Grid дві картки: одна з коротким текстом, інша з довгим. Якої вони будуть висоти?", solution: "Однакової — обидві розтягнуться до висоти найвищої картки завдяки align-items: stretch за замовчуванням." },
    ],
  },

  "Псевдоелементи ::before/::after": {
    whatIsIt: "::before і ::after створюють \"віртуальний\" елемент усередині вибраного тега без додавання зайвого div у HTML. Обов'язково потребують content: \"\" (навіть порожній), інакше не з'являються.",
    whyUseIt: "Декоративні деталі (іконка-стрілка, лінія-розділювач, значок \"Новинка\" на картці) не несуть смислу для контенту — їм не місце в HTML, а псевдоелементи дозволяють додати їх суто в CSS.",
    whenToUse: ["Декоративні іконки/стрілки, які не несуть інформації (::after зі стрілкою на посиланні \"Детальніше →\").", "Розділювальні лінії, значки \"Хіт\"/\"Новинка\" на картках."],
    whenNotToUse: ["Не клади в ::before/::after змістовний текст, важливий для розуміння сторінки, — псевдоелементи не завжди читаються скрінрідерами передбачувано.", "Не забувай content: \"\" — без нього псевдоелемент не рендериться взагалі, найчастіша помилка новачків."],
    codeWalkthroughs: [
      {
        before: "Значок \"Хіт\" на картці меню без зайвого div у HTML:",
        code: `<div class="menu-card menu-card--popular">
  <strong>Капучино</strong>
  <span>75 грн</span>
</div>

<style>
.menu-card {
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 16px;
  background: #ffffff;
}

.menu-card--popular {
  position: relative;
}

.menu-card--popular::after {
  content: "Хіт";
  position: absolute;
  top: -8px;
  right: -8px;
  background: var(--color-primary);
  color: white;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 0.75rem;
}
</style>`,
        lineNotes: ["content: \"Хіт\" — обов'язковий, це і є текст псевдоелемента.", "position: relative на батьківському .menu-card--popular потрібен, щоб position: absolute на ::after позиціонувався відносно картки, а не всієї сторінки."],
        after: "На картці з'являється значок \"Хіт\" у кутку — без жодного додаткового div у розмітці.",
      },
    ],
    commonMistakes: ["Забутий content: \"\" — псевдоелемент просто не з'являється.", "position: absolute на ::after без position: relative на батьківському елементі — позиціонується відносно всієї сторінки, а не картки.", "Смисловий текст у псевдоелементі замість декоративного."],
    dontDoThis: { code: `.menu-card--popular::after {\n  /* без content */\n  background: red;\n}`, explanation: "Без властивості content псевдоелемент взагалі не рендериться — це одна з найчастіших причин \"чому мій ::after не показується\"." },
    bestPractices: ["Псевдоелементи — для суто декоративних деталей, ніколи не для важливого контенту.", "Завжди пов'язуй position: relative на батьківському елементі з position: absolute на псевдоелементі."],
    remember: ["content: \"\" обов'язковий, навіть якщо порожній.", "::before/::after — для декору, не для смислового контенту.", "position: relative на батьку + absolute на псевдоелементі — стандартна пара."],
    interviewQuestions: [{ question: "Чому ::after не з'являється, навіть якщо всі стилі виглядають правильно?", answer: "Найчастіша причина — відсутня властивість content; без неї браузер взагалі не створює псевдоелемент, незалежно від решти заданих стилів." }],
    summary: "::before/::after додають декоративні деталі без зайвих div у HTML. content: \"\" обов'язковий, а position: relative на батьківському елементі потрібен для точного позиціонування.",
    proTip: "Іконки-стрілки в посиланнях (\"Детальніше →\") — класичний, дуже поширений у реальних проєктах приклад використання ::after.",
    nextLessonNote: "Кнопки й картки готові. Далі — форми, ціни й footer: довершення сторінки кав'ярні.",
    practiceTask: {
      title: "Проєкт курсу: значок «Хіт» на картці",
      description: "Додай декоративний значок «Хіт» до популярної картки меню через ::after.",
      checklist: ["Використано ::after з content.", "position: relative на батьківському елементі."],
      starterFiles: [{ id: "cafe-css-v16b-start", path: "styles.css", language: "css", label: "styles.css", code: `.menu-card--popular {\n}` }],
      solutionFiles: [
        {
          id: "cafe-css-v17",
          path: "styles.css",
          language: "css",
          label: "styles.css",
          code: `.menu-card--popular {
  position: relative;
}

.menu-card--popular::after {
  content: "Хіт";
  position: absolute;
  top: -8px;
  right: -8px;
  background: var(--color-primary);
  color: white;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 0.75rem;
}`,
          readOnly: true,
        },
      ],
      hints: ["Без content: \"Хіт\" псевдоелемент не з'явиться взагалі."],
      expectedOutput: "Популярна картка меню має декоративний значок «Хіт» у кутку.",
    },
    microExercises: [
      { id: "css-pseudo-find-bug", kind: "find-the-bug", prompt: ".badge::after { position: absolute; background: red; } — значок не з'являється. Чому?", solution: "Відсутня властивість content — без неї псевдоелемент не рендериться взагалі, навіть з рештою стилів." },
    ],
  },
};
