import type { LessonOverride } from "./htmlFoundations";

/**
 * Module "Header і Hero" (css-real-header-hero). Cheat-sheet format.
 * Continues styles.css for the café project (v11 → v15).
 */
export const cssRealHeaderHeroOverrides: Record<string, LessonOverride> = {
  "Header і sticky-навігація": {
    whatIsIt: "position: sticky тримає header видимим угорі екрана під час прокрутки, доки не досягне заданого краю (top: 0). На відміну від fixed, sticky-елемент поводиться як звичайний, доки не \"прилипне\".",
    whyUseIt: "Відвідувач, який гортає довге меню кав'ярні, повинен без прокрутки нагору знову бачити кнопку «Забронювати» — sticky header вирішує це без жодного JavaScript.",
    whenToUse: ["position: sticky; top: 0; на header — класичний патерн \"липкої\" навігації.", "z-index на header, щоб він лишався над рештою контенту під час прокрутки.", "backdrop-filter: blur() + напівпрозорий background — сучасний \"скляний\" header, що не виглядає різким на різному фоні під час скролу.", "scroll-padding-top на html — коли на сторінці є anchor-посилання (#menu, #contacts), інакше sticky header перекриває заголовок секції після переходу."],
    whenNotToUse: ["Не використовуй position: fixed для header, якщо не потрібно, щоб він \"вилітав\" з нормального потоку макета, — sticky зазвичай зручніший.", "Не забувай z-index — без нього sticky header може опинитись під іншими елементами зі своїм стекінг-контекстом.", "Не роби background надто прозорим разом з blur — текст навігації стає погано читабельним на строкатому фоні під ним."],
    interactiveDemo: "header-hero-demo",
    comparisonTable: {
      headers: ["position", "Поведінка"],
      rows: [
        ["static", "Звичайний потік (за замовчуванням)"],
        ["sticky", "Звичайний потік, доки не досягне краю — тоді \"прилипає\""],
        ["fixed", "Завжди відносно вікна, поза потоком макета"],
      ],
    },
    codeWalkthroughs: [
      {
        before: "Sticky header кав'ярні:",
        code: `.site-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: white;
}`,
        lineNotes: ["top: 0 — точка, де header \"прилипає\" до верху екрана.", "z-index: 10 гарантує, що header лишиться над контентом, що прокручується під ним.", "background обов'язковий — без нього текст під header буде просвічувати крізь нього."],
        after: "Header кав'ярні лишається видимим угорі екрана під час прокрутки сторінки.",
      },
      {
        before: "Сучасний \"скляний\" sticky header з blur, і scroll-padding-top, щоб anchor-посилання не ховались під ним:",
        code: `.site-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: rgba(255, 248, 239, 0.9);
  backdrop-filter: blur(12px);
}

html {
  scroll-padding-top: 80px;
}`,
        lineNotes: [
          "backdrop-filter: blur(12px) розмиває те, що прокручується під header — контент видно нечітко, а не різко \"проступає\" крізь напівпрозорий фон.",
          "scroll-padding-top на html — коли користувач клікає <a href=\"#menu\">, браузер прокручує з відступом зверху, і sticky header більше не перекриває заголовок секції \"Меню\".",
        ],
        after: "Header виглядає як сучасний \"скляний\" шар, а перехід по внутрішніх посиланнях не ховає заголовок секції під ним.",
      },
    ],
    commonMistakes: ["Забутий top: 0 — sticky не спрацює без точки \"прилипання\".", "Відсутній background — контент під header проступає крізь нього під час прокрутки.", "sticky не працює, якщо в батьківському елементі є overflow: hidden — поширена причина \"чому sticky не працює\".", "Забутий scroll-padding-top при наявності anchor-посилань — заголовок секції \"ховається\" під sticky header одразу після переходу."],
    dontDoThis: { code: `.site-header {\n  position: sticky;\n  /* без top */\n}`, explanation: "Без властивості top (чи left/right/bottom) браузер не знає, де саме елемент має \"прилипнути\", і sticky фактично не спрацює." },
    bestPractices: ["Завжди задавай background на sticky header — інакше контент, що прокручується, проступатиме крізь нього.", "Перевіряй батьківські контейнери на overflow: hidden/auto, якщо sticky несподівано не працює.", "Додавай scroll-padding-top на html разом зі sticky header, щойно на сторінці з'являються anchor-посилання (#menu, #contacts тощо)."],
    remember: ["sticky = звичайний потік, доки не досягне top: 0, тоді прилипає.", "Обов'язково: top (чи інший край) + background + z-index.", "overflow на батьківському елементі може зламати sticky.", "scroll-padding-top рятує від того, що sticky header перекриває заголовок секції після переходу по anchor-посиланню."],
    interviewQuestions: [
      { question: "Чому position: sticky іноді \"не працює\", хоча CSS написаний правильно?", answer: "Найчастіша причина — overflow: hidden, auto чи scroll на одному з батьківських елементів, що обриває контекст прокрутки, у якому sticky-елемент мав би прилипати." },
      { question: "Навіщо потрібен scroll-padding-top, якщо header уже sticky?", answer: "Без нього перехід по anchor-посиланню (#menu) прокручує сторінку так, що заголовок секції опиняється рівно під верхнім краєм екрана — а це саме те місце, де лежить sticky header, тож заголовок виявляється перекритим. scroll-padding-top додає \"невидимий\" відступ зверху при прокрутці до якоря." },
    ],
    summary: "position: sticky + top: 0 + background + z-index — стандартний рецепт липкого header без JavaScript. Головна пастка — overflow на батьківському елементі.",
    nextLessonNote: "Далі — мобільне меню без жодного рядка JavaScript.",
    practiceTask: {
      title: "Проєкт курсу: sticky header кав'ярні",
      description: "Зроби header кав'ярні липким під час прокрутки сторінки.",
      checklist: ["position: sticky.", "top: 0.", "Заданий background і z-index."],
      starterFiles: [{ id: "cafe-css-v11-start", path: "styles.css", language: "css", label: "styles.css", code: `.site-header {\n}` }],
      solutionFiles: [
        {
          id: "cafe-css-v12a",
          path: "styles.css",
          language: "css",
          label: "styles.css",
          code: `.site-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: white;
}`,
          readOnly: true,
        },
      ],
      hints: ["Без background контент з нижче буде просвічувати крізь header."],
      expectedOutput: "Header кав'ярні лишається видимим під час прокрутки сторінки.",
    },
    microExercises: [
      { id: "css-sticky-find-bug", kind: "find-the-bug", prompt: "position: sticky; top: 0; заданий на header, але він не прилипає. Батьківський div має overflow: hidden. Чому це проблема?", solution: "overflow: hidden на батьківському елементі обриває контекст прокрутки, і sticky-поведінка ламається." },
    ],
  },

  "Мобільне меню без JavaScript": {
    whatIsIt: "Патерн \"checkbox hack\": прихований <input type=\"checkbox\"> + <label> як кнопка-гамбургер + CSS-селектор :checked показує/ховає меню — усе на чистому CSS, без жодного JS.",
    whyUseIt: "На старті проєкту JS для перемикання класів ще не підключений (це прийде в курсі JavaScript) — checkbox-хак дає робоче мобільне меню вже зараз, чистим CSS.",
    whenToUse: ["Прості перемикачі видимості (мобільне меню, акордеон) на етапі, коли JS ще не використовується.", "Пізніше, коли дійдете до JS/React, це природно заміниться на useState — механіка та сама: \"стан відкрито/закрито\".", "<details>/<summary> замість чекбокса — коли меню зовсім просте і не потрібна кастомна анімація чи складна стилізація стрілки/іконки."],
    whenNotToUse: ["Не використовуй checkbox-хак для складної логіки (кілька залежних станів) — тримай його для простих \"відкрито/закрито\".", "Не забувай приховати сам чекбокс візуально (не display: none — це прибере його з табуляції), а через клас на кшталт .visually-hidden."],
    interactiveDemo: "mobile-menu-demo",
    codeWalkthroughs: [
      {
        before: "Мобільне меню кав'ярні на чистому CSS:",
        code: `<input type="checkbox" id="menu-toggle" class="menu-toggle-input" />
<label for="menu-toggle" class="menu-toggle-label">☰</label>
<nav class="mobile-menu">...</nav>`,
        lineNotes: ["label з for пов'язаний з checkbox — клік по іконці перемикає стан.", "Сам checkbox прихований візуально, але лишається доступним з клавіатури."],
        after: "Клік по іконці ☰ відкриває й закриває меню без жодного рядка JavaScript.",
      },
      {
        before: "CSS, що реагує на стан чекбокса:",
        code: `.mobile-menu {
  display: none;
}

.menu-toggle-input:checked ~ .mobile-menu {
  display: block;
}`,
        lineNotes: ["Селектор :checked реагує на стан input.", "Комбінатор ~ (сусідній елемент) застосовує стиль до .mobile-menu, коли чекбокс позначений."],
        after: "Меню з'являється лише коли чекбокс позначений — суто CSS-логіка.",
      },
    ],
    commonMistakes: ["display: none на самому чекбоксі замість візуального приховування — елемент випадає з табуляції клавіатурою.", "Забутий комбінатор ~ чи неправильний порядок елементів у розмітці (він мусить йти ПІСЛЯ чекбокса).", "Відсутній label з for — клік не працює без зв'язку."],
    dontDoThis: { code: `.menu-toggle-input { display: none; }`, explanation: "display: none прибирає елемент з табуляції клавіатурою — користувач без миші не зможе дістатись до перемикача. Потрібен клас на зразок .visually-hidden, що ховає візуально, але лишає доступним." },
    bestPractices: ["Використовуй клас .visually-hidden (position: absolute, розмір 1px, overflow: hidden) замість display: none для прихованого, але доступного чекбокса.", "Тримай цей патерн для простих перемикачів — коли дійдеш до JS/React, замінити на useState буде природно, бо ідея та сама."],
    remember: ["Checkbox hack: input[type=checkbox] + label + :checked + ~.", "Ніколи не display: none на самому чекбоксі — тільки візуальне приховування.", "Це тимчасове CSS-рішення, яке пізніше стане useState у React."],
    interviewQuestions: [
      { question: "Чому цей патерн називають \"checkbox hack\", і чим його зрештою заміняють у React-проєктах?", answer: "Він використовує природний стан HTML-чекбокса (:checked) для перемикання видимості без JS; у React цю саму ідею \"стан відкрито/закрито\" виражають через useState і умовний рендер чи умовний клас." },
      { question: "Чим <details>/<summary> відрізняється від checkbox-хака як CSS-only рішення для мобільного меню?", answer: "<details>/<summary> — вбудована в HTML поведінка \"відкрито/закрито\" без жодного додаткового елемента: браузер сам керує станом через атрибут open. Checkbox-хак гнучкіший у стилізації (можна показувати довільний контент через будь-який CSS-селектор ~/+), але вимагає прихованого input і обережності з accessibility. Для найпростішого випадку <details>/<summary> часто коротше й семантичніше." },
    ],
    summary: "Checkbox hack дає робоче мобільне меню чистим CSS: input[type=checkbox] + label + :checked. Це тимчасове рішення до курсу JavaScript/React, де та сама ідея стане useState. Альтернатива для найпростіших меню — вбудований <details>/<summary>, де браузер сам керує станом відкрито/закрито.",
    proTip: "Заклади цей компонент так, щоб пізніше просто прибрати input і замінити :checked на умовний CSS-клас — цю заміну ти зробиш, коли дійдеш до React.",
    nextLessonNote: "Далі — hero-секція, перший великий екран сайту.",
    practiceTask: {
      title: "Проєкт курсу: мобільне меню кав'ярні",
      description: "Реалізуй перемикання мобільного меню через checkbox hack.",
      checklist: ["Є прихований (але доступний) checkbox.", "label пов'язаний через for.", "Меню показується через :checked ~ селектор."],
      starterFiles: [{ id: "cafe-css-v12a-start", path: "styles.css", language: "css", label: "styles.css", code: `.mobile-menu {\n  display: none;\n}` }],
      solutionFiles: [
        {
          id: "cafe-css-v12b",
          path: "styles.css",
          language: "css",
          label: "styles.css",
          code: `.mobile-menu {
  display: none;
}

.menu-toggle-input:checked ~ .mobile-menu {
  display: block;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
}`,
          readOnly: true,
        },
      ],
      hints: ["Порядок у розмітці важливий: чекбокс має йти перед меню в HTML."],
      expectedOutput: "Робоче мобільне меню без жодного JavaScript.",
    },
    microExercises: [
      { id: "css-checkbox-hack-predict", kind: "predict", prompt: "Чекбокс НЕ позначений. Що показує .menu-toggle-input:checked ~ .mobile-menu { display: block; }?", solution: "Нічого — правило застосовується тільки коли чекбокс :checked, тобто позначений." },
    ],
  },

  "Hero-секція": {
    whatIsIt: "Hero — перший великий екран сайту: великий заголовок, короткий опис, одна головна дія. Стилізується як flex-колонка з вертикальним і горизонтальним центруванням, min-height замість height.",
    whyUseIt: "Hero має справити враження за 3 секунди — погано зверстаний (текст притиснутий, немає повітря) hero одразу знижує довіру до всього сайту.",
    whenToUse: ["min-height: 70vh (чи схоже) — hero займає більшу частину першого екрана, але не ламається, якщо контенту забагато.", "display: flex + flex-direction: column + align-items: center — типове центрування вмісту hero без фото, для простих landing page.", "display: grid; grid-template-columns: 1fr 1fr — коли hero має дві частини: текст ліворуч і фото праворуч, як у більшості комерційних сайтів.", "font-size: clamp(...) на hero-заголовку — щоб текст адаптивно масштабувався між мінімумом і максимумом, а не був фіксованим числом."],
    whenNotToUse: ["Не став height: 100vh на hero з довгим текстом — контент може обрізатись чи вилізти за межі, якщо не влазить.", "Не забувай padding по краях — текст hero не повинен торкатись країв екрана на мобільному.", "Не забувай max-width (ch-одиниці) на заголовку й описі — без нього текст розтягується на всю ширину екрана й погано читається."],
    interactiveDemo: "hero-layout-demo",
    comparisonTable: {
      headers: ["", "height", "min-height"],
      rows: [
        ["Контент більший за задане значення", "Обрізається чи вилазить", "Блок росте, вміщаючи контент"],
        ["Безпечний вибір для hero", "Ні", "Так"],
      ],
    },
    codeWalkthroughs: [
      {
        before: "Hero-секція кав'ярні, відцентрована й безпечна для різної довжини тексту:",
        code: `.hero {
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 24px;
  gap: 16px;
}`,
        lineNotes: ["min-height замість height — якщо текст довший, ніж очікувалось, секція виросте, а не обріже контент.", "flex-direction: column + center по обох осях — стандартний спосіб відцентрувати заголовок, опис і кнопку."],
        after: "Hero кав'ярні виглядає як завершений, професійний перший екран, незалежно від довжини тексту.",
      },
      {
        before: "Двоколонковий hero з фото — текст ліворуч, зображення праворуч, як на більшості комерційних сайтів:",
        code: `.hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
}

.hero-title {
  max-width: 12ch;
  font-size: clamp(2.5rem, 8vw, 5rem);
  line-height: 1.05;
}

.hero-image-wrapper {
  overflow: hidden;
  border-radius: 24px;
}

.hero-image {
  width: 100%;
  height: clamp(320px, 45vw, 560px);
  object-fit: cover;
  display: block;
}

@media (max-width: 768px) {
  .hero {
    grid-template-columns: 1fr;
  }
}`,
        lineNotes: [
          "grid-template-columns: 1fr 1fr створює дві рівні колонки — текст і фото; на вузькому екрані media query перемикає їх в одну колонку.",
          "max-width: 12ch на заголовку — обмежує ширину приблизно 12 символами, щоб рядки переносились красиво, а не розтягувались на весь екран.",
          "clamp(320px, 45vw, 560px) на висоті фото — адаптивна висота замість фіксованого пікселя, разом з object-fit: cover фото завжди виглядає акуратно.",
          "overflow: hidden на обгортці обов'язковий — інакше border-radius не заокруглить кути фото, яке більше за контейнер.",
        ],
        after: "Hero виглядає як завершена двоколонкова секція комерційного сайту, а не просто центрований текстовий блок.",
      },
    ],
    commonMistakes: ["height: 100vh замість min-height — ламається з довшим контентом чи на маленьких екранах з великим текстом.", "Забутий padding — текст torkається країв екрана на мобільному.", "Відсутній gap між заголовком/описом/кнопкою — усе злипається.", "Забутий max-width (ch) на заголовку двоколонкового hero — довгий заголовок розтягується на всю ширину колонки й виглядає негарно.", "Фіксована height на hero-image замість clamp() — фото або замало, або задомінувало на певних розмірах екрана."],
    dontDoThis: { code: `.hero {\n  height: 100vh;\n  overflow: hidden;\n}`, explanation: "height фіксує розмір жорстко, а overflow: hidden обрізає весь контент, що не влазить, — на мобільному з довшим текстом частина hero стане невидимою." },
    bestPractices: ["min-height замість height — золоте правило для будь-якого блоку зі змінним контентом.", "Тримай hero flex-колонкою з gap — простіше й передбачуваніше за margin на кожному дочірньому елементі.", "Для hero з фото — grid у дві колонки на десктопі, одна колонка на мобільному через media query.", "clamp() на font-size і на висоті фото — адаптивність без купи медіазапитів."],
    remember: ["min-height безпечніший за height для блоків зі змінним контентом.", "Flex-колонка + center — стандартний спосіб центрувати вміст hero без фото.", "Grid у дві колонки (1fr 1fr) — стандартний спосіб для hero з фото поруч із текстом.", "padding і gap запобігають \"злипанню\" контенту.", "max-width (ch) на заголовку й описі тримає текст читабельним і не дає йому розтягнутись на всю ширину."],
    interviewQuestions: [
      { question: "Чому min-height зазвичай безпечніший вибір за height для секцій з текстом?", answer: "height жорстко фіксує розмір і обрізає контент, який не влазить; min-height задає мінімум, але дозволяє блоку рости, якщо реального контенту більше, ніж очікувалось." },
      { question: "Чому для двоколонкового hero (текст + фото) часто обирають Grid, а не Flexbox?", answer: "Grid явно визначає дві колонки (grid-template-columns: 1fr 1fr) як частину самого макета, тоді як у Flexbox довелось би вручну задавати flex-basis/flex-grow кожній дитині для того самого результату. Для простого двоколонкового поділу Grid коротший і зрозуміліший." },
    ],
    summary: "Hero — flex-колонка (без фото) чи grid у дві колонки (з фото), з min-height замість height, центруванням і gap між елементами. clamp() на заголовку й висоті фото дає адаптивність без купи медіазапитів.",
    nextLessonNote: "Далі — фонові зображення й object-fit для hero.",
    practiceTask: {
      title: "Проєкт курсу: hero-секція кав'ярні",
      description: "Зверстай hero кав'ярні: центрований заголовок, опис і кнопка.",
      checklist: ["min-height замість height.", "Контент відцентрований по обох осях.", "Є gap і padding."],
      starterFiles: [{ id: "cafe-css-v12b-start", path: "styles.css", language: "css", label: "styles.css", code: `.hero {\n}` }],
      solutionFiles: [
        {
          id: "cafe-css-v13",
          path: "styles.css",
          language: "css",
          label: "styles.css",
          code: `.hero {
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 24px;
  gap: 16px;
}`,
          readOnly: true,
        },
      ],
      hints: ["text-align: center вирівнює багаторядковий текст, align-items центрує сам блок по горизонталі."],
      expectedOutput: "Hero-секція кав'ярні з відцентрованим заголовком, описом і кнопкою.",
    },
    microExercises: [
      { id: "css-hero-choice", kind: "choice", prompt: "Hero-секція має адаптуватись до тексту різної довжини на різних мовах сайту. Що обрати?", options: ["height: 500px", "min-height: 70vh", "height: 100%", "max-height: 400px"], correctAnswer: "min-height: 70vh", solution: "min-height дозволяє секції рости, якщо перекладений текст довший за оригінал." },
    ],
  },

  "Фонові зображення і object-fit": {
    interactiveDemo: "object-fit-background-demo",
    whatIsIt: "background-image + background-size: cover — зображення як фон блоку, обрізане під його розмір. Для <img>-тегів (не фонів) та сама ідея реалізується через object-fit: cover.",
    whyUseIt: "Фото залу кав'ярні як background-image за hero-текстом виглядає професійніше за звичайний колір — але без background-size: cover воно може повторюватись чи спотворюватись.",
    whenToUse: ["background-image + background-size: cover + background-position: center — для декоративного фону секції (наприклад, hero з фото).", "object-fit: cover — коли зображення саме є контентним <img> тегом (не фоном), наприклад фото в галереї чи картці.", "object-position (чи background-position) з конкретним зміщенням — коли найважливіша частина фото не в центрі (наприклад, обличчя зверху кадру).", "<picture> + <source media=\"...\"> — коли для мобільного й десктопу варто завантажувати різні файли зображення (не тільки різний розмір показу, а інший кадр чи менший файл)."],
    whenNotToUse: ["Не залишай background-image без background-size — за замовчуванням картинка повторюється (repeat) і виглядає зламаною.", "Не використовуй background-image для зображень, які несуть смисл (фото товару) — це має бути <img> з alt, а не CSS-фон, з міркувань доступності й SEO.", "Не забувай background-repeat: no-repeat разом із background-size — навіть із заданим розміром старі браузери чи нестандартні пропорції можуть повторити фон плиткою."],
    comparisonTable: {
      headers: ["", "background-image", "<img> + object-fit"],
      rows: [
        ["Доступність (alt)", "Немає alt — суто декоративне", "Має alt — для змістовних фото"],
        ["Використання", "Фонові текстури, декор hero", "Фото товару, галерея, контент"],
      ],
    },
    codeWalkthroughs: [
      {
        before: "Hero кав'ярні з фоновим фото:",
        code: `.hero {
  background-image: url("interior.jpg");
  background-size: cover;
  background-position: center;
}`,
        lineNotes: ["background-size: cover масштабує фото, щоб заповнити весь блок без спотворення.", "background-position: center тримає найважливішу частину фото по центру при обрізанні."],
        after: "Hero кав'ярні отримує атмосферне фонове фото замість суцільного кольору.",
      },
      {
        before: "Теплий кавовий overlay (замість чорного) і object-position, коли важлива частина фото зміщена від центру:",
        code: `.hero {
  background-image:
    linear-gradient(rgba(43, 33, 24, 0.65), rgba(43, 33, 24, 0.4)),
    url("interior.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.menu-card-image {
  object-fit: cover;
  object-position: top;
}`,
        lineNotes: [
          "Теплий коричневий градієнт (rgba(43,33,24,...)) замість чорного — виглядає м'якше й доречніше для кав'ярні, ніж стандартне затемнення.",
          "background-repeat: no-repeat підстраховує cover на випадок нестандартних пропорцій — фон точно не повториться плиткою.",
          "object-position: top корисний, коли головний об'єкт фото (наприклад, обличчя баристи) знаходиться зверху кадру, а cover обрізає знизу.",
        ],
        after: "Fon виглядає атмосферно й \"по темі\" кав'ярні, а фото з нестандартною композицією не обрізає важливу деталь.",
      },
    ],
    commonMistakes: ["Забутий background-size — фото повторюється дрібним патерном замість заповнення блоку.", "Смислове фото (не декоративне) як CSS-фон замість <img> з alt — втрачається доступність.", "Занадто темний/світлий текст поверх фото без затемнення (overlay) — текст стає нечитабельним.", "object-position: center за замовчуванням, коли головний об'єкт фото зміщений — важлива деталь (обличчя, логотип) обрізається."],
    dontDoThis: { code: `.hero {\n  background-image: url("interior.jpg");\n  /* без background-size */\n}`, explanation: "Без background-size: cover браузер за замовчуванням повторює зображення в оригінальному розмірі — на великому блоці це виглядає як зламаний, повторюваний патерн." },
    bestPractices: ["Для тексту поверх фото додавай напівпрозорий overlay (::before із background: rgba(0,0,0,0.4)) для контрасту й читабельності.", "Використовуй CSS-фон тільки для декоративних зображень; змістовні фото завжди залишай <img> з alt.", "Теплий кольоровий overlay (не чорний) часто виглядає доречніше для \"живих\" тематичних сайтів, ніж стандартне чорне затемнення.", "background-position/object-position підбирай під конкретне фото — center за замовчуванням годиться не завжди."],
    remember: ["background-size: cover обов'язковий разом з background-image.", "CSS-фон — для декору, <img> — для змістовних фото з alt.", "Overlay потрібен для читабельності тексту поверх фото.", "object-position і background-position рятують кадр, коли головний об'єкт фото не в центрі."],
    interviewQuestions: [
      { question: "Чому фото товару в інтернет-магазині не варто робити через background-image?", answer: "background-image не має атрибута alt і не сприймається як контент скрінрідером чи пошуковиком — змістовне фото товару має бути реальним <img> тегом для доступності й SEO." },
      { question: "Для чого потрібен object-position, якщо object-fit: cover уже заповнює блок?", answer: "cover обрізає частину фото, щоб заповнити задану область, але сам вирішує обрізати по центру. Якщо важлива деталь фото (обличчя, логотип) не в центрі, object-position вказує, яку саме частину зберегти видимою після обрізання." },
    ],
    summary: "background-size: cover + background-position: center + background-repeat: no-repeat — стандарт для декоративних фонових фото. Змістовні фото завжди залишаються <img> з alt, а не CSS-фоном. object-position/background-position рятують кадр, коли головний об'єкт фото зміщений від центру.",
    nextLessonNote: "Header і hero готові. Далі — кнопки й картки: інтерактивні елементи кав'ярні.",
    practiceTask: {
      title: "Проєкт курсу: фонове фото hero",
      description: "Додай фонове фото інтер'єру до hero-секції з правильним масштабуванням.",
      checklist: ["background-image заданий.", "background-size: cover.", "background-position: center."],
      starterFiles: [{ id: "cafe-css-v13-start", path: "styles.css", language: "css", label: "styles.css", code: `.hero {\n  min-height: 70vh;\n}` }],
      solutionFiles: [
        {
          id: "cafe-css-v14",
          path: "styles.css",
          language: "css",
          label: "styles.css",
          code: `.hero {
  min-height: 70vh;
  background-image: url("interior.jpg");
  background-size: cover;
  background-position: center;
}`,
          readOnly: true,
        },
      ],
      hints: ["Без background-size фото повториться дрібним патерном."],
      expectedOutput: "Hero-секція кав'ярні з атмосферним фоновим фото.",
    },
    microExercises: [
      { id: "css-bg-image-find-bug", kind: "find-the-bug", prompt: "background-image: url(\"interior.jpg\"); заданий на великому блоці, але фото виглядає як дрібний повторюваний патерн. Чому?", solution: "Відсутній background-size: cover — за замовчуванням фото повторюється (repeat) в оригінальному розмірі." },
    ],
  },
};
