import type { LessonOverride } from "./htmlFoundations";

/**
 * Module "Навігація" (html-navigation). Continues the café project: adds
 * the nav bar and the special contact links.
 */
export const htmlNavigationOverrides: Record<string, LessonOverride> = {
  "Посилання, URL і навігація": {
    whatIsIt: "<a href=\"...\"> — єдиний правильний спосіб зробити щось клікабельним і навігаційним у HTML. Він одразу підтримує клавіатуру, скрінрідер і контекстне меню браузера.",
    whyUseIt: "<div onclick> виглядає як швидке рішення, але не працює з клавіатури і не сприймається скрінрідером як посилання — це ламає доступність для частини користувачів.",
    whenToUse: ["Будь-яка навігація між сторінками чи розділами.", "Зовнішні посилання (з target=\"_blank\" і rel=\"noopener noreferrer\")."],
    comparisonTable: {
      headers: ["Спосіб", "Клавіатура", "Скрінрідер", "Контекстне меню"],
      rows: [
        ["<a href>", "✔ так", "✔ \"посилання\"", "✔ так"],
        ["<div onclick>", "✘ ні", "✘ ігнорує", "✘ ні"],
      ],
    },
    whenNotToUse: ["Не роби навігацію на div/span з onClick.", "Не пиши текст посилання «тут» чи «клікни» — незрозуміло поза контекстом."],
    codeWalkthroughs: [
      {
        before: "Непрацююча і робоча навігаційна кнопка:",
        code: `<!-- Погано -->
<div onclick="location.href='/cart'">Кошик</div>

<!-- Добре -->
<a href="/cart">Перейти в кошик</a>
<a href="https://uk.wikipedia.org" target="_blank" rel="noopener noreferrer">Детальніше</a>`,
        lineNotes: ["<a href> одразу підтримує Tab, Enter, «відкрити в новій вкладці».", "rel=\"noopener noreferrer\" захищає від доступу нової сторінки до window.opener."],
        after: "Другий і третій варіанти працюють передбачувано для миші, клавіатури й скрінрідера.",
      },
    ],
    commonMistakes: ["Навігація на div/span з onClick.", "Текст посилання «тут»/«клікни».", "target=\"_blank\" без rel=\"noopener noreferrer\"."],
    dontDoThis: { code: `<div onclick="location.href='/cart'">Кошик</div>`, explanation: "Не працює з клавіатури, не сприймається скрінрідером як посилання, немає стандартного контекстного меню." },
    bestPractices: ["Завжди <a href> для навігації, навіть стилізованої під кнопку.", "Текст посилання зрозумілий сам по собі."],
    realWorldUsage: ["SPA-фреймворки (React Router) під капотом усе одно рендерять <a>.", "Уся навігація сайту будується на <a href>."],
    remember: ["URL = протокол + домен + шлях + параметри.", "Навігація — завжди через <a href>.", "Текст посилання зрозумілий без контексту навколо."],
    interviewQuestions: [{ question: "Навіщо rel=\"noopener noreferrer\" з target=\"_blank\"?", answer: "Без noopener відкрита сторінка отримує доступ до window.opener і теоретично може перенаправити вихідну вкладку на фішинговий сайт." }],
    summary: "<a href> — єдиний правильний спосіб навігації: працює з клавіатурою, скрінрідером і контекстним меню без жодного JS. div з onClick ламає все це.",
    proTip: "Перевіряй навігацію сайту, використовуючи лише клавіатуру (Tab/Enter) — за хвилину знайдеш усі непрацюючі \"кнопки\".",
    nextLessonNote: "Далі — спеціальні посилання: email, телефон, завантаження файлів.",
    practiceTask: {
      title: "Проєкт курсу: навігація сайту",
      description: "Додай <nav> з посиланнями на розділи сторінки й на Instagram.",
      checklist: ["Додано nav з кількома <a href>.", "Внутрішні посилання ведуть на #id розділів.", "Зовнішнє посилання має target=\"_blank\" і rel=\"noopener noreferrer\"."],
      starterFiles: [{ id: "cafe-index-v4-start", path: "index.html", language: "html", label: "index.html", code: `<h1>Кав'ярня «Аромат»</h1>\n<h2>Про нас</h2>` }],
      solutionFiles: [
        {
          id: "cafe-index-v5",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<nav>
  <a href="#about">Про нас</a>
  <a href="#menu">Меню</a>
  <a href="#contacts">Контакти</a>
  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
</nav>
<h1>Кав'ярня «Аромат»</h1>
<h2 id="about">Про нас</h2>`,
          readOnly: true,
        },
      ],
      hints: ["href=\"#about\" веде до елемента з id=\"about\"."],
      expectedOutput: "Рядок навігації на початку сторінки, клік по якому веде до відповідного розділу.",
    },
    microExercises: [
      { id: "html-nav-choice", kind: "choice", prompt: "Яке посилання веде до елемента з id=\"menu\" на цій сторінці?", options: ["<a href=\"menu\">", "<a href=\"#menu\">", "<a href=\"/menu.html\">", "<a href=\"menu.com\">"], correctAnswer: "<a href=\"#menu\">", solution: "# разом з id створює внутрішній якір." },
    ],
  },

  "Спеціальні посилання: email, телефон і завантаження файлів": {
    whatIsIt: "mailto: відкриває поштового клієнта, tel: ініціює дзвінок, атрибут download пропонує зберегти файл замість відкрити його.",
    whyUseIt: "Відвідувач хоче зателефонувати чи написати одним дотиком, а не копіювати номер вручну — ці три типи посилань саме для цього.",
    whenToUse: ["Номер телефону чи email у контактах — завжди клікабельні.", "Прайс-лист чи меню в PDF — через download."],
    comparisonTable: {
      headers: ["Схема", "Дія"],
      rows: [
        ["mailto:", "Відкриває лист із готовою адресою"],
        ["tel:", "Ініціює дзвінок на мобільному"],
        ["download=\"...\"", "Пропонує зберегти файл із заданим ім'ям"],
      ],
    },
    whenNotToUse: ["Не пиши номер телефону просто текстом — на мобільному його незручно копіювати.", "Не розраховуй на download для файлів з іншого домену — браузери це ігнорують."],
    codeWalkthroughs: [
      {
        before: "Контакти кав'ярні з усіма трьома типами:",
        code: `<a href="mailto:info@aroma-cafe.com">info@aroma-cafe.com</a>
<a href="tel:+380671234567">+380 67 123 45 67</a>
<a href="menu.pdf" download="menu-aroma.pdf">Завантажити меню</a>`,
        lineNotes: ["mailto: відкриває листа з готовою адресою.", "tel: на смартфоні пропонує зателефонувати.", "download задає зручне ім'я файлу."],
        after: "Один дотик — і відвідувач телефонує, пише листа чи отримує меню.",
      },
    ],
    commonMistakes: ["Номер телефону просто текстом, без tel:.", "Формат без коду країни в tel:.", "Незрозумілий текст посилання для download."],
    dontDoThis: { code: `<p>Телефон: +380671234567</p>`, explanation: "Просто текст неможливо натиснути одним дотиком на мобільному — потрібен <a href=\"tel:+380671234567\">." },
    bestPractices: ["Завжди роби номери й email клікабельними через tel:/mailto:.", "Додавай зрозуміле ім'я файлу через download=\"...\"."],
    remember: ["mailto: — лист із готовою адресою.", "tel: — дзвінок в один дотик.", "download — збереження файлу з заданим ім'ям."],
    interviewQuestions: [{ question: "Чи спрацює download для файлу з іншого домену?", answer: "Здебільшого ні — браузери ігнорують download для cross-origin посилань з міркувань безпеки." }],
    summary: "mailto:, tel: і download перетворюють текст на реальну дію в один дотик. Для будь-якого локального бізнесу це маленька, але важлива деталь UX.",
    proTip: "Протестуй tel: і mailto: на реальному телефоні — поведінка на десктопі може відрізнятись.",
    nextLessonNote: "Навігація готова. Далі — зображення.",
    practiceTask: {
      title: "Проєкт курсу: контакти кав'ярні",
      description: "Додай блок контактів з клікабельним email, телефоном і посиланням на завантаження меню.",
      checklist: ["Email через mailto:.", "Телефон через tel:.", "Меню через download."],
      starterFiles: [{ id: "cafe-index-v5-start", path: "index.html", language: "html", label: "index.html", code: `<h2 id="contacts">Контакти</h2>` }],
      solutionFiles: [
        {
          id: "cafe-index-v6",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<h2 id="contacts">Контакти</h2>
<p><a href="mailto:info@aroma-cafe.com">info@aroma-cafe.com</a></p>
<p><a href="tel:+380671234567">+380 67 123 45 67</a></p>
<a href="menu.pdf" download="menu-aroma.pdf">Завантажити меню (PDF)</a>`,
          readOnly: true,
        },
      ],
      hints: ["Не забудь код країни +380 у tel:."],
      expectedOutput: "Блок контактів із трьома клікабельними діями.",
    },
    microExercises: [
      { id: "html-special-links-choice", kind: "choice", prompt: "Яке посилання відкриє додаток телефону з набраним номером?", options: ["<a href=\"call:...\">", "<a href=\"tel:...\">", "<a href=\"phone:...\">", "<a href=\"...\">"], correctAnswer: "<a href=\"tel:...\">", solution: "Схема tel: — стандарт для клікабельних номерів." },
    ],
  },
};
