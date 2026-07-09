import type { LessonOverride } from "./htmlFoundations";

/**
 * Module "Box-модель і відступи" (css-box-model). Cheat-sheet format.
 * Continues styles.css for the café project (v3 → v5).
 */
export const cssBoxModelOverrides: Record<string, LessonOverride> = {
  "Box-модель на практиці": {
    interactiveDemo: "box-model-demo",
    whatIsIt: "Box-модель — правило, за яким браузер рахує розмір кожного HTML-елемента: content (вміст) → padding (внутрішній відступ) → border (рамка) → margin (зовнішній відступ), шар за шаром зсередини назовні. box-sizing вирішує, чи padding/border входять у заданий width, чи додаються поверх нього.\n\ncontent це сам текст/картинка/вміст кнопки, padding це простір між вмістом і рамкою, border це сама рамка (товщина + стиль + колір), margin це простір зовні елемента до сусідів — дивись схему нижче.",
    visualExplanation: {
      svg: `<svg viewBox="0 0 440 300" width="100%" height="100%" style="display:block;width:100%;height:auto;aspect-ratio:440 / 300" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Box-модель: margin, border, padding, content">
        <rect x="4" y="4" width="432" height="292" rx="10" fill="none" stroke="var(--border)" stroke-width="2" stroke-dasharray="6 5" />
        <text x="18" y="26" font-size="14" font-weight="700" fill="var(--muted)">margin</text>
        <rect x="46" y="46" width="348" height="208" rx="6" fill="none" stroke="var(--text)" stroke-width="3" />
        <text x="60" y="68" font-size="14" font-weight="700" fill="var(--text)">border</text>
        <rect x="76" y="78" width="288" height="148" rx="4" fill="var(--primary)" fill-opacity="0.14" />
        <text x="90" y="100" font-size="14" font-weight="700" fill="var(--primary)">padding</text>
        <rect x="122" y="122" width="196" height="60" rx="4" fill="var(--primary)" />
        <text x="220" y="158" font-size="15" font-weight="700" fill="#ffffff" text-anchor="middle">content</text>
      </svg>`,
      caption: "Чотири шари box-моделі: margin → border → padding → content, зсередини назовні.",
    },
    whyUseIt: "Без розуміння box-моделі незрозуміло, чому блок став ширшим за очікуване, чому кнопка виглядає затісною, чому картки з'їхали, чому з'явився горизонтальний скрол, чому padding збільшує елемент, а margin — ні, і чому фон не поширюється на margin.\n\nBox-модель використовується буквально всюди: кнопки, картки товарів, форми, секції, header/footer, модальні вікна, таблиці, layout, sidebar, навігація, hero-секції, grid і flexbox. Наприклад дизайнер у Figma показує картку 320px завширшки з padding 24px, рамкою 1px і радіусом 16px — без border-box ця картка в браузері вийде фактично на 50px ширшою, ніж задумано.",
    whenToUse: ["box-sizing: border-box — постав раз, глобально (`*, *::before, *::after`), на всі елементи проєкту, з перших рядків CSS.", "padding — простір усередині елемента (між рамкою і вмістом): відступ тексту від країв кнопки чи картки.", "margin — простір зовні елемента (між ним і сусідами): відстань між картками, секціями, елементами списку.", "width: 100% + max-width — для адаптивних блоків, які не повинні створювати горизонтальний скрол на вузькому екрані.", "min-height замість height — коли в блоці є текст, довжина якого може змінитись (переклад, більший шрифт, більше даних).", "margin-inline: auto — для центрування контейнера з обмеженою шириною (max-width) по горизонталі.", "outline (не border) — для стилів :focus, бо він не займає місце в box-моделі і не зсуває сусідні елементи."],
    whenNotToUse: ["Не забувай border-box — без нього розрахунок ширини стає незрозумілим і плутаним, а картка \"розповзається\".", "Не використовуй margin, коли насправді потрібен padding (відступ усередині картки — це padding, не margin).", "Не задавай фіксовану width у px для блоків, які мають адаптуватись під ширину екрана — це створює горизонтальний скрол на мобільних.", "Не став фіксовану height текстовим блокам — якщо тексту стане більше, він вилізе за межі або обріжеться разом з overflow: hidden.", "Не прибирай outline на :focus без візуальної заміни — це ламає навігацію з клавіатури.", "Не забувай, що margin не фарбується фоном елемента — фон покриває лише content + padding + border."],
    comparisonTable: {
      headers: ["Шар", "Що це"],
      rows: [
        ["content", "Текст/вміст елемента"],
        ["padding", "Простір усередині, до рамки"],
        ["border", "Рамка (товщина + стиль + колір)"],
        ["margin", "Простір зовні, до сусідів (фон сюди не поширюється)"],
        ["outline", "Схожий на border, але НЕ входить у box-модель і не займає місце"],
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
      {
        before: "Проблема стандартної box-моделі (content-box) без border-box:",
        code: `.card {
  width: 300px;
  padding: 20px;
  border: 2px solid black;
  /* box-sizing: content-box; — це значення за замовчуванням */
}`,
        lineNotes: ["За замовчуванням width задає ширину тільки content-частини.", "Фактична ширина: 300 + 20 + 20 (padding) + 2 + 2 (border) = 344px — на 44px більше, ніж очікувалось."],
        after: "Елемент займає 344px, хоча в коді написано width: 300px — це і є пастка content-box.",
      },
      {
        before: "Базовий сучасний reset на старті будь-якого CSS-файлу:",
        code: `*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
}`,
        lineNotes: ["border-box — щоб width завжди означав повну видиму ширину елемента.", "body { margin: 0; } — браузер додає body стандартний margin ≈8px, через що сторінка не прилягає до країв вікна."],
      },
      {
        before: "Адаptивний контейнер: width + max-width замість фіксованої ширини:",
        code: `.container {
  width: 100%;
  max-width: 1120px;
  margin-inline: auto;
  padding-inline: 16px;
}`,
        lineNotes: ["width: 100% — контейнер займає всю доступну ширину батька.", "max-width: 1120px — але не розтягується більше цього значення на широких екранах.", "margin-inline: auto — центрує контейнер по горизонталі.", "padding-inline: 16px — контент не прилипає до країв екрана на мобільних."],
      },
      {
        before: "min-height замість height для блоку з текстом, що може вирости:",
        code: `.card {
  min-height: 120px;
  padding: 24px;
}`,
        lineNotes: ["min-height гарантує мінімальну висоту 120px, але дозволяє картці вирости, якщо тексту стане більше.", "Звичайний height: 120px у такій ситуації обрізав би або зламав довший текст."],
      },
      {
        before: "outline для :focus — не займає місце в box-моделі, на відміну від border:",
        code: `.button:focus {
  outline: 3px solid #2563eb;
  outline-offset: 3px;
}`,
        lineNotes: ["outline не входить у box-модель і не зсуває сусідні елементи, на відміну від border.", "outline-offset додає невеликий проміжок між рамкою фокуса і самою кнопкою."],
      },
    ],
    commonMistakes: ["Відсутній box-sizing: border-box — ширина \"з'їжджає\" при будь-якому padding.", "Плутанина padding і margin — відступ усередині картки заданий через margin замість padding.", "Множинні margin на сусідніх елементах замість gap (буде в модулі Flexbox).", "Фіксована width у px для карток/блоків без max-width — горизонтальний скрол на мобільних.", "Фіксована height для текстового блоку замість min-height — текст вилазить або обрізається.", "Забутий body { margin: 0; } — сторінка має невидимий білий відступ по краях від стандартних стилів браузера.", "outline: none на :focus без візуальної заміни — ламає клавіатурну навігацію."],
    dontDoThis: { code: `.card {\n  width: 300px;\n  padding: 24px;\n  /* без box-sizing: border-box */\n}`, explanation: "Реальна ширина картки стане 300+48=348px — несподівано для будь-кого, хто читає лише width: 300px." },
    bestPractices: ["Постав `*, *::before, *::after { box-sizing: border-box; }` одним із перших правил у будь-якому новому проєкті.", "Думай про padding як \"дихання\" вмісту, а margin як \"дистанцію\" до сусідів.", "Для контейнерів використовуй width: 100% + max-width замість фіксованого width.", "Для текстових блоків із непередбачуваною довжиною контенту використовуй min-height, а не height.", "Для focus-стилів використовуй outline, а не border — він не зсуває розмітку.", "Перевіряй box-модель елемента в DevTools (вкладка Styles/Box Model), якщо розмір здається дивним."],
    remember: ["content → padding → border → margin, зсередини назовні.", "border-box — рахує padding/border усередині заданої ширини.", "Постав border-box глобально один раз на весь проєкт.", "outline не входить у box-модель і не займає місце, на відміну від border.", "min-height безпечніший за height для блоків із текстом.", "Фон елемента покриває content+padding+border, але ніколи не margin."],
    interviewQuestions: [
      { question: "Що станеться з шириною елемента width: 200px, padding: 20px без box-sizing: border-box?", answer: "Реальна ширина стане 240px (200 + 20 зліва + 20 справа), бо за замовчуванням (content-box) padding додається поверх заданої ширини." },
      { question: "Чим outline відрізняється від border з точки зору box-моделі?", answer: "border входить у box-модель і збільшує фактичний розмір елемента (якщо немає border-box) або займає частину заданої ширини (з border-box), тоді як outline не є частиною box-моделі взагалі і ніколи не впливає на розмір чи розташування елемента." },
      { question: "Чому для текстових карток краще використовувати min-height замість height?", answer: "min-height задає лише мінімальну висоту, дозволяючи елементу вирости, якщо контенту стане більше (довший переклад, збільшений шрифт), тоді як фіксована height може обрізати контент або спричинити його вихід за межі елемента." },
      { question: "Навіщо потрібен body { margin: 0; } на початку CSS?", answer: "Браузер за замовчуванням додає body невеликий margin (зазвичай близько 8px), через що сторінка не прилягає впритул до країв вікна — це один з перших пунктів базового CSS-reset." },
    ],
    summary: "Box-модель — це чотири шари навколо вмісту: content, padding, border, margin. box-sizing: border-box рахує padding/border усередині заданої ширини — постав його глобально й одразу забудь про цю проблему назавжди. Для адаптивних блоків використовуй width: 100% + max-width, для текстових блоків — min-height, а для focus-стилів — outline замість border.",
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
    visualExplanation: {
      svg: `<svg viewBox="0 0 480 220" width="100%" height="100%" style="display:block;width:100%;height:auto;aspect-ratio:480 / 220" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Порівняння padding і margin">
        <text x="105" y="24" font-size="14" font-weight="700" fill="var(--text)" text-anchor="middle">padding</text>
        <rect x="30" y="40" width="150" height="120" rx="8" fill="var(--primary)" />
        <rect x="55" y="65" width="100" height="70" rx="4" fill="var(--surface-muted)" stroke="var(--border)" />
        <text x="105" y="105" font-size="12" fill="var(--text)" text-anchor="middle">текст</text>
        <text x="105" y="188" font-size="11" fill="var(--muted)" text-anchor="middle">фон заповнює padding</text>
        <text x="360" y="24" font-size="14" font-weight="700" fill="var(--text)" text-anchor="middle">margin</text>
        <rect x="300" y="40" width="120" height="55" rx="6" fill="var(--primary)" />
        <rect x="300" y="125" width="120" height="55" rx="6" fill="var(--primary)" />
        <line x1="300" y1="105" x2="420" y2="105" stroke="var(--muted)" stroke-width="1" stroke-dasharray="4 3" />
        <line x1="300" y1="115" x2="420" y2="115" stroke="var(--muted)" stroke-width="1" stroke-dasharray="4 3" />
        <text x="360" y="205" font-size="11" fill="var(--muted)" text-anchor="middle">відступ між сусідами, фон туди не йде</text>
      </svg>`,
      caption: "padding — фон заповнює простір до тексту. margin — порожній відступ до сусіда, без фону.",
    },
    whatIsIt: "padding — простір усередині елемента, між його рамкою і вмістом; він частина \"клікабельної\"/видимої області фону. margin — простір зовні, між елементом і його сусідами; фон елемента туди не поширюється.\n\nОбидва мають короткий (shorthand) запис: одне значення — усі 4 сторони, два значення — верх/низ і ліво/право, три — верх, ліво/право, низ, чотири — за годинниковою стрілкою (верх → право → низ → ліво). Сучасні логічні властивості padding-inline/padding-block і margin-inline/margin-block замінюють пари left/right і top/bottom.",
    whyUseIt: "Плутанина margin/padding — топ-1 помилка новачків: результат виглядає однаково на око, але поводиться по-різному (фон, клікабельність, схлопування).\n\nВідступи є буквально всюди в реальному проєкті: між секціями, між картками, всередині кнопок і форм, між заголовком і текстом, між пунктами меню, навколо зображень, у footer. Неправильний вибір робить сайт неакуратним: кнопка занадто тісна, текст прилипає до рамки, картки стоять одна на одній, або навпаки — секції не мають \"повітря\".",
    whenToUse: ["padding — відступ між текстом і краєм кнопки/картки.", "margin — відстань між двома картками чи секціями.", "padding-block/padding-inline — сучасний логічний запис замість пар padding-top/bottom і padding-left/right.", "margin-inline: auto — центрування блока з обмеженою шириною (max-width) по горизонталі.", "gap (Flexbox/Grid) — коли потрібна однакова відстань між кількома елементами в ряд чи колонку, замість margin на кожному."],
    whenNotToUse: ["Не став margin усередині картки, де насправді потрібен відступ від тексту до рамки — це задача padding.", "Не використовуй margin для вирівнювання кількох елементів у ряд (для цього — flexbox з gap, буде в наступному модулі).", "Не роби кнопку більшою через margin — це лише відсуває кнопку від сусідів, а не робить клікабельну область самої кнопки просторішою.", "Не використовуй margin: auto для центрування тексту — це центрує сам блок, а не текст усередині нього (для тексту потрібен text-align: center).", "Не додавай padding, коли хочеш відступ МІЖ двома картками — фон однієї картки не \"дотягнеться\" туди."],
    comparisonTable: {
      headers: ["", "padding", "margin"],
      rows: [
        ["Де", "Усередині елемента", "Зовні елемента"],
        ["Фон елемента", "Поширюється на padding", "Не поширюється на margin"],
        ["Схлопується з сусідами?", "Ніколи", "Так, вертикальний margin може"],
        ["Логічні властивості", "padding-inline / padding-block", "margin-inline / margin-block"],
        ["Типове використання", "Простір усередині кнопки/картки/секції", "Відстань між картками, центрування через auto"],
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
      {
        before: "Секція з фоном: чому тут padding, а не margin:",
        code: `.hero {
  background-color: lightblue;
  padding-block: 80px;
}`,
        lineNotes: ["padding-block: 80px — фон lightblue покриває і верхній, і нижній відступ.", "Якби замість цього був margin-block: 80px, фон НЕ покривав би цей простір — з'явилась би \"дірка\" в кольорі навколо секції."],
      },
      {
        before: "Скорочений запис padding/margin — 1-4 значення:",
        code: `.a { padding: 24px; }                  /* усі 4 сторони */
.b { padding: 16px 24px; }              /* верх/низ, ліво/право */
.c { padding: 16px 24px 32px; }         /* верх, ліво/право, низ */
.d { padding: 8px 16px 24px 32px; }     /* верх, право, низ, ліво (за годинником) */`,
        lineNotes: ["Той самий порядок значень діє і для margin.", "Легко запам'ятати чотиризначний варіант як рух стрілки годинника: top → right → bottom → left."],
      },
      {
        before: "Margin collapse: чому 30px + 20px не завжди дає 50px:",
        code: `.title {
  margin-bottom: 30px;
}

.text {
  margin-top: 20px;
}`,
        lineNotes: ["Здається, що відстань між .title і .text буде 30+20=50px.", "Але вертикальні margin сусідніх елементів у звичайному потоці можуть схлопуватись — фактична відстань буде 30px (більший з двох), а не сума."],
        after: "Реальна відстань між заголовком і текстом — 30px, не 50px. Це і є margin collapse.",
      },
      {
        before: "Система відступів (spacing scale) через CSS-змінні — як роблять у реальних проєктах:",
        code: `:root {
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
}

.card { padding: var(--space-lg); }
.title { margin-bottom: var(--space-md); }`,
        lineNotes: ["Замість довільних чисел (25px, 30px, 40px) — обмежений набір значень.", "Це робить відступи по всьому сайту узгодженими й передбачуваними."],
      },
    ],
    commonMistakes: ["padding замість margin для відступу МІЖ елементами.", "margin замість padding для відступу ВСЕРЕДИНІ елемента.", "Забутий факт, що вертикальні margin сусідніх блоків можуть схлопнутись в один (більший з двох), а не скластись.", "margin замість padding для секції з фоном — фон \"не дотягується\" до margin, з'являється небажаний розрив кольору.", "Хаотичні значення відступів (25px, 30px, 40px по всьому сайту) замість єдиної spacing scale.", "margin: auto для центрування тексту замість text-align: center — це центрує блок, а не сам текст."],
    dontDoThis: { code: `.button {\n  margin: 12px 24px; /* мало бути padding */\n}`, explanation: "Це збільшує клікабельну зовнішню \"порожню\" зону навколо кнопки замість того, щоб зробити саму кнопку просторішою всередині — фон кнопки лишається маленьким." },
    bestPractices: ["Питай: \"це простір усередині компонента чи між компонентами?\" — перше це padding, друге margin.", "Для відступів між кількома елементами в ряд/колонку майже завжди краще gap (Flexbox/Grid), а не margin на кожному.", "Для секцій із фоном використовуй padding-block, а не margin-block.", "Побудуй просту spacing scale (CSS-змінні --space-*) і використовуй лише ці значення по всьому проєкту.", "Пам'ятай про margin collapse і не розраховуй, що два margin завжди складаються.", "Для центрування контейнера використовуй margin-inline: auto разом із max-width."],
    remember: ["padding — усередині, впливає на фон елемента.", "margin — зовні, до сусідів.", "Вертикальні margin можуть схлопуватись, padding — ніколи.", "padding-inline/padding-block — сучасний логічний запис відступів.", "Для рядів/колонок елементів — gap, а не margin на кожному.", "margin: auto центрує блок, а не текст усередині нього."],
    interviewQuestions: [
      { question: "Чому margin-top: 20px і margin-bottom: 20px двох сусідніх блоків не завжди дають 40px між ними?", answer: "Вертикальні margin сусідніх елементів можуть схлопуватись (collapse) в один спільний відступ, що дорівнює більшому з двох значень, а не їх сумі — це особливість блокового потоку CSS." },
      { question: "Чому для секції з кольоровим фоном використовують padding-block, а не margin-block?", answer: "Фон елемента поширюється на content і padding, але не на margin — якщо задати відступ через margin, фон не покриє цей простір, і навколо секції з'явиться небажаний розрив кольору." },
      { question: "Що таке spacing scale і навіщо вона потрібна?", answer: "Це обмежений, заздалегідь визначений набір значень відступів (наприклад через CSS-змінні --space-xs...--space-3xl), який використовують замість довільних чисел по всьому проєкту — це робить дизайн візуально узгодженим і легшим у підтримці." },
      { question: "Чому margin: auto не центрує текст усередині блока?", answer: "margin: auto центрує сам блок-елемент по горизонталі відносно його батька (і працює лише за наявності обмеженої ширини чи max-width) — для центрування тексту усередині елемента потрібна властивість text-align: center." },
    ],
    summary: "padding — простір усередині, впливає на фон і схлопуванню не підлягає. margin — простір зовні, до сусідів, і вертикальний margin може схлопуватись. Обери правильний за питанням \"усередині чи зовні компонента\": для секцій з фоном і кнопок — padding, для відстані між картками і центрування контейнера — margin. У реальних проєктах відступи будують через єдину spacing scale, а не довільні числа.",
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
    visualExplanation: {
      svg: `<svg viewBox="0 0 460 250" width="100%" height="100%" style="display:block;width:100%;height:auto;aspect-ratio:460 / 250" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Порівняння display: block, inline, inline-block">
        <text x="10" y="20" font-size="13" font-weight="700" fill="var(--text)">block</text>
        <rect x="10" y="28" width="440" height="32" rx="6" fill="var(--primary)" />
        <text x="230" y="49" font-size="12" fill="#ffffff" text-anchor="middle">своя лінія, на всю ширину</text>
        <rect x="10" y="68" width="440" height="32" rx="6" fill="var(--success)" />
        <text x="230" y="89" font-size="12" fill="#ffffff" text-anchor="middle">наступний block — знову своя лінія</text>
        <text x="10" y="128" font-size="13" font-weight="700" fill="var(--text)">inline</text>
        <text x="10" y="154" font-size="13" fill="var(--muted)">Текст, а це</text>
        <rect x="112" y="140" width="60" height="20" rx="4" fill="var(--primary)" />
        <text x="142" y="155" font-size="11" fill="#ffffff" text-anchor="middle">span</text>
        <text x="178" y="154" font-size="13" fill="var(--muted)">— тече в тому ж рядку.</text>
        <text x="10" y="198" font-size="13" font-weight="700" fill="var(--text)">inline-block</text>
        <text x="10" y="224" font-size="13" fill="var(--muted)">Текст і</text>
        <rect x="72" y="204" width="90" height="32" rx="6" fill="var(--primary)" />
        <text x="117" y="224" font-size="11" fill="#ffffff" text-anchor="middle">кнопка</text>
        <text x="170" y="223" font-size="13" fill="var(--muted)">— теж у рядку, з padding.</text>
      </svg>`,
      caption: "block завжди зі своєю лінією, inline тече в тексті без width/height, inline-block поєднує обидва.",
    },
    whatIsIt: "display визначає базову поведінку елемента: block займає весь рядок, починається з нового рядка і поважає width/height/margin/padding; inline тече в рядку тексту, займає лише ширину свого вмісту й ігнорує width/height; inline-block — проміжний варіант: тече в рядку, як inline, але поважає width/height, як block; none повністю прибирає елемент з розмітки (місце не резервується, і зазвичай елемент недоступний для скрінрідера).\n\nЗа замовчуванням block — це div, p, h1-h6, section, article, header, footer, main, nav, ul, ol, li, form; inline — це span, a, strong, em, label, small, code.",
    whyUseIt: "\"Чому мій width не працює?\" — у більшості випадків елемент inline (наприклад, <span>), а inline-елементи ігнорують width/height за задумом.\n\ndisplay — фундамент, без якого важко зрозуміти CSS layout, Flexbox, Grid і адаптивну верстку: від нього залежить, чи заголовок починається з нового рядка, чи посилання можна клацнути по всій області, як показати чи сховати мобільне меню, чому клікабельна зона пункту меню занадто маленька.",
    whenToUse: ["block — секції, картки, div-обгортки, усе, що має бути \"своїм рядком\".", "inline — невеликі фрагменти тексту всередині речення (strong, em, a за замовчуванням).", "inline-block — посилання, що має виглядати як кнопка (текст у рядку, але з padding/width як у блока).", "display: block на пунктах меню (a усередині li) — щоб клікабельною була вся область, а не тільки текст.", "none — приховати елемент повністю (наприклад, мобільне меню, доки не відкрите)."],
    whenNotToUse: ["Не став width/height на inline-елемент, сподіваючись, що спрацює, — потрібен display: inline-block чи block.", "Не плутай display: none з visibility: hidden — none прибирає з макета (місце звільняється), hidden лишає порожнє місце.", "Не плутай display: none з opacity: 0 — opacity лишає елемент на місці й потенційно клікабельним/фокусованим, це не спосіб \"прибрати\" елемент.", "Не ховай важливий для користувача контент (наприклад повідомлення про помилку) через display: none без причини — воно стане недоступним і візуально, і для скрінрідера.", "Не використовуй div замість семантичних тегів тільки тому, що \"display: block і так дає потрібний вигляд\" — display не замінює семантику HTML."],
    comparisonTable: {
      headers: ["display", "Поважає width/height?", "Займає весь рядок?"],
      rows: [
        ["block", "Так", "Так"],
        ["inline", "Ні", "Ні, тече в тексті"],
        ["inline-block", "Так", "Ні, тече в рядку"],
        ["none", "—", "Елемента немає в макеті взагалі"],
        ["visibility: hidden (не display)", "—", "Місце залишається, елемент лише невидимий"],
        ["opacity: 0 (не display)", "—", "Місце залишається, елемент невидимий, але клікабельний"],
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
      {
        before: "Посилання, схоже на кнопку — навіщо inline-block:",
        code: `<a class="button-link" href="#contacts">Зв'язатися</a>`,
        lineNotes: ["Якщо залишити <a> звичайним inline, padding/width поводитимуться непередбачувано.", "display: inline-block дозволяє посиланню текти в рядку тексту, але при цьому поважати padding, width і height, як звичайний блок."],
      },
      {
        before: "CSS для посилання-кнопки з попереднього прикладу:",
        code: `.button-link {
  display: inline-block;
  padding: 12px 20px;
  background-color: #2563eb;
  color: white;
  text-decoration: none;
  border-radius: 8px;
}`,
        lineNotes: ["inline-block — ключова властивість, без неї padding не зробить посилання схожим на кнопку так, як очікується."],
      },
      {
        before: "display: block на пунктах меню — щоб клікалась уся область, не тільки текст:",
        code: `.menu-link {
  display: block;
  padding: 12px 16px;
  text-decoration: none;
}`,
        lineNotes: ["Без display: block клікабельною була б лише сама текстова частина посилання (воно inline за замовчуванням).", "З display: block вся прямокутна область пункту меню (разом з padding) стає клікабельною."],
      },
      {
        before: "display: none проти visibility: hidden — різна поведінка з layout:",
        code: `.second { display: none; }      /* третій елемент підніметься на місце другого */
.second { visibility: hidden; } /* місце другого елемента залишиться порожнім */`,
        lineNotes: ["display: none прибирає елемент з потоку документа повністю — сусідні елементи зсуваються.", "visibility: hidden лише робить елемент невидимим, місце під нього залишається зарезервованим."],
      },
    ],
    commonMistakes: ["width/height на inline-елементі без зміни display.", "display: none замість visibility: hidden там, де потрібно зберегти місце в макеті (і навпаки).", "Забутий display: block на div, який чомусь поводиться як inline через успадкований стиль.", "opacity: 0 замість display: none, коли елемент треба повністю прибрати — елемент лишається клікабельним і заважає.", "display: none на пункті меню без display: block на посиланні всередині — клікабельна лише текстова частина.", "div замість h1/p/nav лише тому, що йому можна дати будь-який display — це не замінює семантику."],
    dontDoThis: { code: `span { width: 200px; height: 50px; background: coral; }`, explanation: "span — inline за замовчуванням і повністю ігнорує width/height. Потрібен display: inline-block або block, щоб розміри взагалі щось означали." },
    bestPractices: ["Для прихованого спочатку контенту (акордеони, мобільне меню) використовуй display: none + клас-перемикач.", "Не змінюй display тегів без причини — <span> навмисно inline, <div> навмисно block; став inline-block лише коли потрібні обидві властивості одразу.", "Для посилань, що виглядають як кнопки, використовуй inline-block, а не звичайний inline.", "Для пунктів меню роби посилання display: block, щоб уся область, а не тільки текст, була клікабельною.", "Не плутай три різні способи \"сховати\" елемент: display: none (прибирає з макета), visibility: hidden (лишає місце), opacity: 0 (лишає місце і клікабельність).", "Перевіряй, чи елемент, який ти ховаєш через display: none, дійсно не потрібен користувачам скрінрідерів у цей момент."],
    remember: ["block — своя лінія, поважає розміри.", "inline — тече в тексті, ігнорує width/height.", "inline-block — тече в рядку, але поважає width/height, як block.", "display: none — елемента немає в макеті взагалі, на відміну від visibility: hidden.", "opacity: 0 — елемент невидимий, але і місце, і клікабельність зберігаються.", "display змінює поведінку елемента, але ніколи не замінює його HTML-семантику."],
    interviewQuestions: [
      { question: "У чому різниця між display: none і visibility: hidden?", answer: "display: none повністю прибирає елемент з макета (місце не резервується, скрінрідер його не бачить), а visibility: hidden лише робить елемент невидимим, зберігаючи зайняте ним місце в розмітці." },
      { question: "Чим display: none відрізняється від opacity: 0?", answer: "display: none прибирає елемент з layout повністю, а opacity: 0 лише робить елемент прозорим — він продовжує займати місце і може залишатися фокусованим чи клікабельним, що здатне створити проблеми для користувача (наприклад невидима, але клікабельна кнопка)." },
      { question: "Чому width/height не працюють на звичайному inline-елементі?", answer: "Inline-елемент є частиною текстового потоку і за задумом займає лише ширину свого вмісту, тому браузер ігнорує явно задані width і height — щоб вони запрацювали, потрібен display: inline-block або display: block." },
      { question: "Чому для пунктів навігаційного меню часто ставлять display: block на посиланні всередині li?", answer: "За замовчуванням <a> — inline, і клікабельна лише текстова частина посилання; display: block розширює клікабельну область на весь прямокутник пункту меню, включно з padding, що значно зручніше для користувача." },
    ],
    summary: "display вирішує базову поведінку елемента в потоці сторінки: block для структурних блоків (своя лінія, поважає розміри), inline для фрагментів тексту (тече в рядку, ігнорує width/height), inline-block — коли потрібне і те, і те (посилання-кнопки), none — щоб повністю прибрати елемент з макета. display: none, visibility: hidden і opacity: 0 — це три різні способи \"сховати\" елемент з різними наслідками для layout і клікабельності, і плутати їх не варто.",
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
