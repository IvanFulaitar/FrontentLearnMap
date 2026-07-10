import type { LessonOverride } from "./htmlFoundations";

/**
 * Module "Міні-проєкти" (html-mini-projects). Cheat-sheet / project-brief
 * format. Six independent projects (not the café) so the student applies
 * everything without copying the running example. Each project's
 * practiceTask below is intentionally the richest part of the lesson —
 * more build steps, a longer checklist, and stretch-practice hints, so a
 * student who wants extra reps doesn't run out of things to build.
 */
export const htmlMiniProjectsOverrides: Record<string, LessonOverride> = {
  "Проєкт: CV-сторінка": {
    whatIsIt: "Одна сторінка-резюме: фото, ім'я, професія, контакти, розділ «Про мене», навички, освіта, мови, проєкти. Використовуй тільки HTML — жодного CSS чи JS, лише структура.",
    whyUseIt: "CV-сторінка — найпростіший реальний проєкт, де одразу видно, чи розумієш ти ієрархію заголовків, списки й семантику для контенту, який хтось реально читатиме.",
    whenToUse: ["h1 — ім'я, h2 — розділи (Про мене, Досвід, Освіта, Навички, Мови), h3 — назви посад/закладів.", "ul — навички і мови, ol — необов'язково для хронології.", "time datetime — для періодів роботи.", "Header CV — фото, ім'я, професія і контакти разом, як окремий блок угорі сторінки."],
    whenNotToUse: ["Не додавай стилі чи кольори — це задача майбутнього CSS-курсу.", "Не використовуй table для розкладки блоків — тільки для реальних табличних даних, якщо такі є."],
    comparisonTable: {
      headers: ["Розділ CV", "Теги"],
      rows: [
        ["Header (фото, ім'я, професія, контакти)", "header, img(alt), h1, p"],
        ["Про мене", "section, h2, p"],
        ["Досвід роботи", "section, article на кожну посаду, time"],
        ["Навички / Мови / Soft Skills / Hard Skills", "section, h2, ul"],
        ["Освіта", "section, article на кожен заклад"],
        ["Контакти", "a[href=\"tel:...\"], a[href=\"mailto:...\"], a[href=\"https://github.com/...\"]"],
        ["Footer", "footer, p з копірайтом"],
      ],
    },
    codeWalkthroughs: [
      {
        before: "Header CV з фото, ім'ям, професією і контактами одразу (модуль будує header CV так само, як header будь-якого сайту):",
        code: `<header>
  <img src="photo.jpg" alt="Фото Івана Петренка" width="120" height="120" />
  <h1>Іван Петренко</h1>
  <p>Junior Frontend Developer</p>
  <p>
    <a href="tel:+380501234567">+380 50 123 45 67</a> ·
    <a href="mailto:test@gmail.com">test@gmail.com</a> ·
    <a href="https://github.com/">GitHub</a>
  </p>
</header>`,
        lineNotes: ["Фото — img з alt, це не декоративний елемент, а частина інформації про людину.", "Один h1 — ім'я; професія одразу під ним як p, не h2.", "Контакти — три окремі клікабельні посилання: tel, mailto, звичайний https-лінк на GitHub."],
      },
      {
        before: "Розділ «Мови» — той самий патерн, що й «Навички», просто інший заголовок:",
        code: `<section>
  <h2>Мови</h2>
  <ul>
    <li>Українська — рідна</li>
    <li>English — Pre-Intermediate</li>
  </ul>
</section>`,
        lineNotes: ["Мови — теж список, а не абзац через кому.", "Рівень володіння вказуй одразу в тексті пункту."],
      },
    ],
    commonMistakes: ["Кілька h1 (наприклад, ім'я і назва секції обидва h1).", "Період роботи текстом без <time datetime>.", "Список навичок абзацом через кому замість <ul>.", "Фото у header без alt.", "Контакти простим текстом замість клікабельних tel:/mailto: посилань."],
    dontDoThis: { code: `<h1>Іван Петренко</h1>\n<h1>Досвід роботи</h1>`, explanation: "Другий h1 має бути h2 — він підпорядкований головній темі сторінки (імені)." },
    bestPractices: ["Один h1 — ім'я. Усі розділи — h2. Посади/заклади всередині розділу — h3.", "Контакти (email, телефон, GitHub) — клікабельні через mailto:/tel:/https:, як у модулі «Навігація».", "Навички корисно ділити на групи: Hard Skills і Soft Skills — так резюме читається швидше."],
    remember: ["h1 — ім'я, один раз.", "Кожен розділ CV — h2 + article на кожен запис.", "Навички й мови — ul, не абзац.", "Header CV — фото + ім'я + професія + контакти одним блоком."],
    interviewQuestions: [{ question: "Чому в CV-сторінці не варто використовувати table для розташування блоків?", answer: "Table призначена для реальних табличних даних (рядки/колонки), а не для розкладки блоків сторінки — для цього потрібен CSS, який тут поки не використовується." }],
    summary: "CV-сторінка перевіряє базову ієрархію заголовків, списки й семантичні контакти — без жодного CSS чи JS. Один h1, чіткі h2-розділи, article на кожен запис, а header CV одразу поєднує фото, ім'я, професію й контакти.",
    nextLessonNote: "Далі — проєкт лендінгу з hero і картками.",
    practiceTask: {
      title: "Проєкт: CV-сторінка",
      description: "Створи index.html з повним резюме: header з фото/ім'ям/контактами, «Про мене», досвід, освіта, навички, мови.",
      checklist: [
        "Один h1 з ім'ям.",
        "Header CV містить фото (з alt), ім'я, професію і контакти.",
        "Розділ «Про мене» — section + h2 + p.",
        "h2 для кожного розділу (Досвід, Освіта, Навички, Мови).",
        "article для кожної позиції досвіду/освіти.",
        "Контакти клікабельні (tel:/mailto:/посилання на GitHub).",
        "Навички і мови — ul, ніколи не абзац через кому.",
        "Footer із копірайтом.",
        "Самоперевірка: чи всі розділи всередині section, чи є header/main/footer, чи всі зображення мають alt, чи всі посилання працюють.",
      ],
      steps: [
        {
          title: "Скелет документа",
          description: "Почни зі стандартного скелета: doctype, html[lang], head з meta viewport і title, порожній body.",
          code: `<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Іван Петренко — Frontend Developer</title>
</head>
<body>
</body>
</html>`,
        },
        {
          title: "Header: фото, ім'я, професія, контакти",
          description: "Header CV — окремий блок угорі з фото (обов'язково alt), h1 з іменем, професією і клікабельними контактами. Одразу після header відкривай main — усі розділи нижче (Про мене, Досвід, Освіта, Навички, Мови) підуть усередину нього.",
          code: `<body>
  <header>
    <img src="photo.jpg" alt="Фото Івана Петренка" width="120" height="120" />
    <h1>Іван Петренко</h1>
    <p>Junior Frontend Developer</p>
    <p>
      <a href="tel:+380671234567">+380 67 123 45 67</a> ·
      <a href="mailto:ivan@example.com">ivan@example.com</a> ·
      <a href="https://github.com/">GitHub</a>
    </p>
  </header>

  <main>
    <!-- сюди підуть усі розділи нижче -->
  </main>
</body>`,
        },
        {
          title: "Про мене",
          description: "Короткий блок про себе — section, h2 і кілька речень.",
          code: `  <section>
    <h2>Про мене</h2>
    <p>
      Я навчаюсь Frontend-розробці. Люблю створювати сайти
      та вивчати сучасні технології.
    </p>
  </section>`,
        },
        {
          title: "Досвід роботи",
          description: "h2 для розділу, а кожна посада — окремий article з h3, датою через <time> і коротким описом.",
          code: `  <section>
    <h2>Досвід роботи</h2>
    <article>
      <h3>Frontend Developer, ТОВ «Технології»</h3>
      <p><time datetime="2023-01">Січень 2023</time> — дотепер</p>
      <p>Розробка інтерфейсів на React і TypeScript.</p>
    </article>
  </section>`,
        },
        {
          title: "Освіта",
          description: "Той самий патерн, що й досвід: h2 розділу + article на кожен заклад.",
          code: `  <section>
    <h2>Освіта</h2>
    <article>
      <h3>Львівська політехніка</h3>
      <p>Комп'ютерні науки, <time datetime="2022">2022</time></p>
    </article>
  </section>`,
        },
        {
          title: "Навички і мови",
          description: "Список навичок і окремо список мов — завжди ul, ніколи не абзац через кому.",
          code: `  <section>
    <h2>Навички</h2>
    <ul>
      <li>HTML/CSS</li>
      <li>JavaScript</li>
      <li>React</li>
    </ul>
  </section>

  <section>
    <h2>Мови</h2>
    <ul>
      <li>Українська — рідна</li>
      <li>English — Pre-Intermediate</li>
    </ul>
  </section>`,
        },
        {
          title: "Footer",
          description: "Завершуємо сторінку коротким footer з копірайтом — він стоїть поза main, як окремий landmark нарівні з header.",
          code: `  <footer>
    <p>© 2026 Моє CV</p>
  </footer>`,
        },
      ],
      starterFiles: [{ id: "cv-start", path: "index.html", language: "html", label: "index.html", code: "<!-- Почни з doctype і базового скелета -->" }],
      solutionFiles: [
        {
          id: "cv-solution",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Іван Петренко — Frontend Developer</title>
</head>
<body>
  <header>
    <img src="photo.jpg" alt="Фото Івана Петренка" width="120" height="120" />
    <h1>Іван Петренко</h1>
    <p>Junior Frontend Developer</p>
    <p>
      <a href="tel:+380671234567">+380 67 123 45 67</a> ·
      <a href="mailto:ivan@example.com">ivan@example.com</a> ·
      <a href="https://github.com/">GitHub</a>
    </p>
  </header>

  <main>
    <section>
      <h2>Про мене</h2>
      <p>Я навчаюсь Frontend-розробці. Люблю створювати сайти та вивчати сучасні технології.</p>
    </section>

    <section>
      <h2>Досвід роботи</h2>
      <article>
        <h3>Frontend Developer, ТОВ «Технології»</h3>
        <p><time datetime="2023-01">Січень 2023</time> — дотепер</p>
        <p>Розробка інтерфейсів на React і TypeScript.</p>
      </article>
    </section>

    <section>
      <h2>Освіта</h2>
      <article>
        <h3>Львівська політехніка</h3>
        <p>Комп'ютерні науки, <time datetime="2022">2022</time></p>
      </article>
    </section>

    <section>
      <h2>Навички</h2>
      <ul>
        <li>HTML/CSS</li>
        <li>JavaScript</li>
        <li>React</li>
      </ul>
    </section>

    <section>
      <h2>Мови</h2>
      <ul>
        <li>Українська — рідна</li>
        <li>English — Pre-Intermediate</li>
      </ul>
    </section>
  </main>

  <footer>
    <p>© 2026 Моє CV</p>
  </footer>
</body>
</html>`,
          readOnly: true,
        },
      ],
      hints: [
        "Перевір: h1 рівно один, далі тільки h2/h3.",
        "Стретч-практика: додай розділ «Мої цілі» (5 речень про себе через 3 роки), розділ «Мої проєкти» (список назв: Landing Page, Coffee Shop, Portfolio, Todo List, Weather App) і розділ «Сертифікати».",
        "Стретч-практика підвищеної складності: зроби навігацію по сторінці (посилання з href=\"#about\" тощо на id відповідних секцій) і додай самоперевірку — постав собі 6 контрольних питань з чек-листа (один h1? усі розділи в section? є header/main/footer? усі img мають alt? усі посилання працюють? правильна вкладеність тегів?).",
      ],
      expectedOutput: "Повна CV-сторінка з коректною семантичною структурою.",
    },
  },

  "Проєкт: Лендінг": {
    whatIsIt: "Одна сторінка продукту чи послуги: header з nav, hero з h1 і CTA, секція «Про продукт», переваги картками, програма/етапи (ol за потреби), тарифи, FAQ, форма заявки, footer.",
    whyUseIt: "Лендінг — найпоширеніший тип сторінки в реальній роботі: кожен стартап, курс чи продукт починається саме з нього. Це перевірка всього модуля «Реальні компоненти» одразу.",
    whenToUse: ["header + nav + hero — завжди на початку.", "section з article-картками — для переваг/послуг/тарифів/відгуків.", "ol замість ul там, де порядок важливий: програма курсу, етапи роботи.", "details/summary — для FAQ, працює без жодного JavaScript.", "Одна форма (підписка чи заявка) ближче до кінця сторінки, з усіма полями обов'язково через label."],
    whenNotToUse: ["Не роби кілька hero-секцій — один головний заклик до дії на сторінку.", "Не забувай unique title/description для SEO цієї сторінки.", "Не вкладай <a> всередину <button> і навпаки — обирай один тег залежно від того, це перехід чи дія."],
    comparisonTable: {
      headers: ["Секція лендінгу", "Тег"],
      rows: [
        ["Переваги (без порядку)", "section + ul"],
        ["Програма/етапи (з порядком)", "section + ol"],
        ["Картки послуг/тарифів/відгуків", "section + article"],
        ["FAQ", "section + details/summary"],
        ["Форма заявки", "form + label на кожне поле"],
      ],
    },
    commonMistakes: ["Кілька конкуруючих CTA однакової ваги.", "Картки переваг без article.", "Форма підписки без label.", "ul замість ol там, де порядок кроків важливий (програма курсу, етапи роботи).", "<a> всередині <button> для CTA."],
    dontDoThis: { code: `<h1>Продукт X</h1>\n<h1>Купи зараз!</h1>`, explanation: "Другий h1 конкурує з головним заголовком сторінки — це порушує правило одного h1." },
    bestPractices: ["Структуруй зверху вниз: header → hero → про продукт → переваги → програма/картки → тарифи → FAQ → форма → footer.", "Кожна секція переваг — свій h2, кожна картка всередині — article.", "На сторінці варто мати 2-3 CTA (у hero, після переваг, перед формою) — але всі вони ведуть до однієї цілі."],
    remember: ["Один h1, один головний тип CTA (може повторюватись кілька разів).", "Переваги — секція з article-картками або ul, залежно від того, чи є порядок.", "Форма підписки з label, як і будь-яка інша форма.", "FAQ — details/summary, працює без JS."],
    interviewQuestions: [{ question: "Що є найважливішим елементом hero-секції лендінгу?", answer: "Одна чітка головна дія (CTA), пов'язана з h1 і коротким описом — усе інше на сторінці підтримує саме цю дію." }],
    summary: "Лендінг = header+nav, hero з одним CTA, секції з картками-перевагами, за потреби програма/етапи через ol, тарифи, FAQ через details, форма, footer. Це застосування всього модуля «Реальні компоненти» в одному проєкті.",
    nextLessonNote: "Далі — сторінка блогу зі статтями.",
    practiceTask: {
      title: "Проєкт: Лендінг продукту",
      description: "Створи лендінг вигаданого продукту (наприклад, онлайн-курс) з header, hero, картками переваг, програмою, FAQ і формою.",
      checklist: [
        "header з nav, і main одразу після нього для всього іншого контенту.",
        "hero з h1, описом і одним CTA.",
        "Секція «Про продукт» з поясненням, що це.",
        "Секція переваг з article-картками або ul.",
        "Програма/етапи через ol, якщо є порядок кроків.",
        "FAQ через details/summary (мінімум 3 питання).",
        "Форма заявки з label на кожному полі.",
        "footer з копірайтом.",
        "Мінімум 3 CTA на сторінці: у hero, після переваг, перед формою.",
        "Самоперевірка: один h1, усі списки через ul/ol, усі картки мають заголовки, немає порожніх href=\"#\".",
      ],
      steps: [
        {
          title: "Header",
          description: "Лого-посилання на головну + nav з якорями на секції нижче. Одразу після header відкривай main — уся решта сторінки (hero, про продукт, переваги, програма, FAQ, форма) підуть усередину нього.",
          code: `<header>
  <a href="/" class="logo">TaskFlow</a>
  <nav><a href="#features">Можливості</a></nav>
</header>

<main>
  <!-- сюди підуть hero, про продукт, переваги, програма, FAQ, форма -->
</main>`,
        },
        {
          title: "Hero",
          description: "Один h1, короткий опис, рівно один CTA — головна дія сторінки. Це перша секція всередині main.",
          code: `<header>...</header>
<main>
  <section class="hero">
    <h1>TaskFlow — керуй задачами просто</h1>
    <p>Плануй день за 2 хвилини щоранку.</p>
    <a href="#signup">Спробувати безкоштовно</a>
  </section>
</main>`,
        },
        {
          title: "Про продукт",
          description: "Коротка секція, що пояснює, що саме пропонує сайт — 1-2 абзаци, без перебільшень.",
          code: `<section id="about">
  <h2>Що таке TaskFlow?</h2>
  <p>TaskFlow — це застосунок для планування задач, контролю часу та організації робочого дня.</p>
</section>`,
        },
        {
          title: "Секція переваг",
          description: "section зі своїм h2, кожна перевага — окремий article (навіть якщо зараз лише одна) або ul, якщо порядок не важливий.",
          code: `<section aria-labelledby="features-heading" id="features">
  <h2 id="features-heading">Можливості</h2>
  <article>
    <h3>Швидке додавання задач</h3>
    <p>Один клік — і задача в списку.</p>
  </article>
</section>`,
        },
        {
          title: "Програма / етапи (ol)",
          description: "Якщо в продукті є порядок кроків чи програма — використовуй ol, а не ul.",
          code: `<section id="program">
  <h2>Як це працює</h2>
  <ol>
    <li>Реєструєшся за 30 секунд</li>
    <li>Додаєш перші задачі</li>
    <li>Отримуєш нагадування щодня</li>
  </ol>
</section>`,
        },
        {
          title: "FAQ",
          description: "details/summary для частих питань — працює без жодного JavaScript.",
          code: `<section id="faq">
  <h2>Поширені питання</h2>
  <details>
    <summary>Чи є безкоштовний тариф?</summary>
    <p>Так, базовий функціонал доступний безкоштовно.</p>
  </details>
</section>`,
        },
        {
          title: "Форма підписки",
          description: "label обов'язковий, навіть у маленькій формі з одним полем.",
          code: `<form id="signup">
  <label for="signup-email">Email</label>
  <input type="email" id="signup-email" required />
  <button type="submit">Підписатись</button>
</form>`,
        },
        {
          title: "Footer",
          description: "Завершуємо копірайтом — footer стоїть поза main, як окремий landmark.",
          code: `<footer><p>© 2026 TaskFlow</p></footer>`,
        },
      ],
      starterFiles: [{ id: "landing-start", path: "index.html", language: "html", label: "index.html", code: "<!-- Почни з header -->" }],
      solutionFiles: [
        {
          id: "landing-solution",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<header>
  <a href="/" class="logo">TaskFlow</a>
  <nav><a href="#features">Можливості</a></nav>
</header>
<main>
  <section class="hero">
    <h1>TaskFlow — керуй задачами просто</h1>
    <p>Плануй день за 2 хвилини щоранку.</p>
    <a href="#signup">Спробувати безкоштовно</a>
  </section>
  <section id="about">
    <h2>Що таке TaskFlow?</h2>
    <p>TaskFlow — це застосунок для планування задач, контролю часу та організації робочого дня.</p>
  </section>
  <section aria-labelledby="features-heading" id="features">
    <h2 id="features-heading">Можливості</h2>
    <article>
      <h3>Швидке додавання задач</h3>
      <p>Один клік — і задача в списку.</p>
    </article>
  </section>
  <section id="program">
    <h2>Як це працює</h2>
    <ol>
      <li>Реєструєшся за 30 секунд</li>
      <li>Додаєш перші задачі</li>
      <li>Отримуєш нагадування щодня</li>
    </ol>
  </section>
  <section id="faq">
    <h2>Поширені питання</h2>
    <details>
      <summary>Чи є безкоштовний тариф?</summary>
      <p>Так, базовий функціонал доступний безкоштовно.</p>
    </details>
  </section>
  <form id="signup">
    <label for="signup-email">Email</label>
    <input type="email" id="signup-email" required />
    <button type="submit">Підписатись</button>
  </form>
</main>
<footer><p>© 2026 TaskFlow</p></footer>`,
          readOnly: true,
        },
      ],
      hints: [
        "Один CTA в hero — не додавай другий конкурентний заклик поруч.",
        "Стретч-практика: побудуй той самий лендінг ще для трьох різних тематик — кав'ярні (hero + меню замість програми), мобільного застосунку (hero + можливості + відгуки) і послуги (hero + етапи роботи через ol + тарифи + FAQ).",
        "Стретч-практика: додай секцію «Тарифи» з 2-3 картками-article (назва, ціна, список включеного через ul, кнопка), і секцію «Відгуки» з 3 article-відгуками.",
        "Самоперевірка: чи є лише один h1, чи всі списки зроблені через ul/ol, чи всі картки мають заголовки, чи немає порожніх href=\"#\".",
      ],
      expectedOutput: "Повний лендінг з чіткою структурою і одним головним закликом до дії.",
    },
  },

  "Проєкт: Сторінка блогу": {
    whatIsIt: "Список статей на головній (заголовок + уривок + дата), sidebar з категоріями/пошуком, і одна повна стаття: h1, time, автор, основний текст із підзаголовками, цитата, зображення з підписом.",
    whyUseIt: "Блог перевіряє модуль «Робота з текстом» і «Стаття блогу» насправді: ієрархію заголовків усередині довгого тексту, машиночитані дати, і додатковий (aside) контент поруч з основним.",
    whenToUse: ["Список статей — article на кожен анонс, з h2/h3 заголовком, датою через <time> і посиланням «Читати далі».", "Повна стаття — h1 заголовок, автор, h2/h3 підрозділи, blockquote для цитат, figure для зображень з підписом.", "aside — для sidebar: пошук, категорії, популярні статті — усе, без чого основний контент не зміниться."],
    whenNotToUse: ["Не пропускай datetime у <time> — дата має бути машиночитаною.", "Не став h1 і в анонсі статті, і в самій статті на тій самій сторінці.", "Не роби меню категорій просто текстом через кому — це список посилань, отже ul/li/a."],
    comparisonTable: {
      headers: ["Блок блогу", "Тег"],
      rows: [
        ["Анонс статті у списку", "article + h2/h3 + time"],
        ["Повна стаття", "article + h1 + h2/h3 підрозділи"],
        ["Категорії", "ul + li + a"],
        ["Sidebar (пошук, популярне)", "aside + section всередині"],
        ["Цитата в тексті", "blockquote (+ cite за потреби)"],
        ["Зображення з підписом", "figure + figcaption"],
      ],
    },
    codeWalkthroughs: [
      {
        before: "Анонс статті на головній сторінці блогу:",
        code: `<article>
  <h2>Як я вивчив семантичний HTML за місяць</h2>
  <p><time datetime="2026-07-03">3 липня 2026</time></p>
  <p>Спершу здавалось, що div вирішує все...</p>
  <a href="/articles/html-month">Читати далі</a>
</article>`,
        lineNotes: ["h2, не h1 — це анонс, а не сама стаття.", "time datetime — машиночитана дата.", "«Читати далі» — посилання на повну статтю."],
      },
      {
        before: "Заголовок самої статті:",
        code: `<article>
  <h1>Як я вивчив семантичний HTML за місяць</h1>
  <p><time datetime="2026-07-03">3 липня 2026</time></p>
</article>`,
        lineNotes: ["На сторінці статті h1 з'являється вперше — це вже не анонс, а повний текст."],
      },
      {
        before: "Підрозділи статті:",
        code: `<article>
  <h1>Як я вивчив семантичний HTML за місяць</h1>
  <p><time datetime="2026-07-03">3 липня 2026</time></p>
  <h2>З чого я почав</h2>
  <p>Спершу здавалось, що div вирішує все...</p>
</article>`,
        lineNotes: ["Довгий текст розбивай на h2-підрозділи послідовно, без пропуску рівнів."],
      },
      {
        before: "Цитата в тексті:",
        code: `<h2>З чого я почав</h2>
<p>Спершу здавалось, що div вирішує все...</p>
<blockquote>
  <p>Семантика — це не про красу коду, а про людей, які ним користуються.</p>
</blockquote>`,
        lineNotes: ["Цитату виділяй через blockquote, а не просто лапками в абзаці."],
      },
      {
        before: "Sidebar (aside) з пошуком, категоріями і популярними статтями — окремий блок поруч з основним контентом:",
        code: `<aside>
  <section>
    <h2>Пошук</h2>
    <form>
      <label for="search">Пошук по блогу</label>
      <input id="search" name="search" type="search" />
      <button type="submit">Шукати</button>
    </form>
  </section>

  <section>
    <h2>Категорії</h2>
    <ul>
      <li><a href="/blog/category/html">HTML</a></li>
      <li><a href="/blog/category/css">CSS</a></li>
    </ul>
  </section>

  <section>
    <h2>Популярні статті</h2>
    <ul>
      <li><a href="/blog/html">HTML для початківців</a></li>
      <li><a href="/blog/css">Основи CSS</a></li>
    </ul>
  </section>
</aside>`,
        lineNotes: ["aside — бо без цього блоку основний контент (стаття) не зміниться.", "Пошук — це form з label, навіть у sidebar.", "Категорії й популярні статті — списки посилань, не абзаци тексту."],
      },
    ],
    commonMistakes: ["Анонс статті без <time datetime>.", "Пропущені рівні заголовків усередині статті (h1 → h3).", "Цитата в статті без blockquote/cite.", "Sidebar через div замість aside.", "Категорії текстом через кому замість ul/li/a.", "Зображення в статті без figure/figcaption, коли є підпис."],
    dontDoThis: { code: `<p>Опубліковано: 3 дні тому</p>`, explanation: "Це не машиночитана дата — потрібен <time datetime=\"2026-07-03\">3 дні тому</time>, щоб і людина, і скрипт розуміли точну дату." },
    bestPractices: ["Кожен анонс статті — article з h2, коротким уривком і посиланням «Читати далі».", "Усередині статті тримай послідовну ієрархію: h1 (назва статті), h2 (розділи), h3 (підрозділи).", "Sidebar (aside) тримай мінімальним: пошук, категорії, популярне — не дублюй увесь контент сторінки."],
    remember: ["Анонс статті — article + h2 + time.", "Стаття — h1 + послідовні h2/h3.", "Дата — завжди <time datetime>.", "Sidebar — aside, не div.", "Категорії — список посилань (ul/li/a)."],
    interviewQuestions: [{ question: "Чому <time datetime=\"...\"> кращий за просто текст \"3 дні тому\"?", answer: "datetime дає точну, машиночитану дату для скриптів і пошукових систем, а видимий текст лишається зручним для читача — обидва працюють одночасно." }],
    summary: "Блог перевіряє: ієрархію заголовків у довгому тексті, article на кожен анонс, машиночитані дати через <time>, і aside для другорядного контенту (пошук, категорії, популярне). Це пряме продовження модулів «Текст» і «Реальні компоненти».",
    nextLessonNote: "Далі — сайт ресторану, повторення café-проєкту самостійно з нуля.",
    practiceTask: {
      title: "Проєкт: Сторінка блогу",
      description: "Створи головну сторінку блогу зі списком анонсів, sidebar з категоріями/пошуком, і одну повну статтю.",
      checklist: [
        "Анонси — article з h2/h3 і time.",
        "Стаття — h1 + h2/h3 підрозділи.",
        "Дата — з datetime у кожній статті.",
        "Sidebar (aside) з пошуком, категоріями і популярними статтями.",
        "Категорії — список посилань (ul/li/a).",
        "Мінімум одна цитата через blockquote.",
        "Мінімум одне зображення через figure + figcaption.",
        "Самоперевірка: один h1, кожна стаття в списку — article, є main, sidebar — aside, немає порожніх href=\"#\".",
      ],
      steps: [
        {
          title: "Анонс статті на головній",
          description: "Кожен анонс — article з h2 (не h1 — це ще не сама стаття), коротким уривком і датою.",
          code: `<article>
  <h2>Як я вивчив семантичний HTML за місяць</h2>
  <p><time datetime="2026-07-03">3 липня 2026</time></p>
  <p>Спершу здавалось, що div вирішує все...</p>
  <a href="/articles/html-month">Читати далі</a>
</article>`,
        },
        {
          title: "Sidebar з пошуком і категоріями",
          description: "aside поруч зі списком статей: форма пошуку (з label!) і список категорій-посилань.",
          code: `<aside>
  <section>
    <h2>Пошук</h2>
    <form>
      <label for="search">Пошук по блогу</label>
      <input id="search" name="search" type="search" />
      <button type="submit">Шукати</button>
    </form>
  </section>
  <section>
    <h2>Категорії</h2>
    <ul>
      <li><a href="/blog/category/html">HTML</a></li>
      <li><a href="/blog/category/css">CSS</a></li>
    </ul>
  </section>
</aside>`,
        },
        {
          title: "Заголовок самої статті",
          description: "На сторінці статті h1 з'являється вперше — це вже не анонс, а повний текст.",
          code: `<article>
  <h1>Як я вивчив семантичний HTML за місяць</h1>
  <p><time datetime="2026-07-03">3 липня 2026</time></p>
</article>`,
        },
        {
          title: "Підрозділи статті",
          description: "Довгий текст розбивай на h2-підрозділи послідовно, без пропуску рівнів.",
          code: `<article>
  <h1>Як я вивчив семантичний HTML за місяць</h1>
  <p><time datetime="2026-07-03">3 липня 2026</time></p>
  <h2>З чого я почав</h2>
  <p>Спершу здавалось, що div вирішує все...</p>
</article>`,
        },
        {
          title: "Цитата і зображення з підписом",
          description: "Цитату виділяй через blockquote, а зображення з підписом — через figure/figcaption, а не просто img з абзацом поруч.",
          code: `  <h2>З чого я почав</h2>
  <p>Спершу здавалось, що div вирішує все...</p>
  <blockquote>
    <p>Семантика — це не про красу коду, а про людей, які ним користуються.</p>
  </blockquote>
  <figure>
    <img src="semantic-html.jpg" alt="Схема семантичної HTML-структури сторінки" />
    <figcaption>Приклад семантичної структури HTML-сторінки.</figcaption>
  </figure>`,
        },
      ],
      starterFiles: [{ id: "blog-start", path: "index.html", language: "html", label: "index.html", code: "<!-- Почни зі списку анонсів -->" }],
      solutionFiles: [
        {
          id: "blog-index-solution",
          path: "index.html",
          language: "html",
          label: "index.html (головна: список анонсів + sidebar)",
          code: `<main>
  <h1>Блог</h1>

  <section aria-label="Останні статті">
    <article>
      <h2>Як я вивчив семантичний HTML за місяць</h2>
      <p><time datetime="2026-07-03">3 липня 2026</time></p>
      <p>Спершу здавалось, що div вирішує все...</p>
      <a href="/articles/html-month">Читати далі</a>
    </article>
    <article>
      <h2>Що таке CSS-специфічність</h2>
      <p><time datetime="2026-06-20">20 червня 2026</time></p>
      <p>Специфічність визначає, який селектор переможе, коли кілька правил претендують на один елемент...</p>
      <a href="/articles/css-specificity">Читати далі</a>
    </article>
  </section>

  <aside>
    <section>
      <h2>Пошук</h2>
      <form>
        <label for="search">Пошук по блогу</label>
        <input id="search" name="search" type="search" />
        <button type="submit">Шукати</button>
      </form>
    </section>

    <section>
      <h2>Категорії</h2>
      <ul>
        <li><a href="/blog/category/html">HTML</a></li>
        <li><a href="/blog/category/css">CSS</a></li>
      </ul>
    </section>

    <section>
      <h2>Популярні статті</h2>
      <ul>
        <li><a href="/blog/html">HTML для початківців</a></li>
        <li><a href="/blog/css">Основи CSS</a></li>
      </ul>
    </section>
  </aside>
</main>`,
          readOnly: true,
        },
        {
          id: "blog-article-solution",
          path: "article.html",
          language: "html",
          label: "article.html (повна стаття)",
          code: `<main>
  <article>
    <h1>Як я вивчив семантичний HTML за місяць</h1>
    <p><time datetime="2026-07-03">3 липня 2026</time></p>
    <h2>З чого я почав</h2>
    <p>Спершу здавалось, що div вирішує все...</p>
    <blockquote>
      <p>Семантика — це не про красу коду, а про людей, які ним користуються.</p>
    </blockquote>
    <figure>
      <img src="semantic-html.jpg" alt="Схема семантичної HTML-структури сторінки" />
      <figcaption>Приклад семантичної структури HTML-сторінки.</figcaption>
    </figure>
  </article>
</main>`,
          readOnly: true,
        },
      ],
      hints: [
        "h1 — лише в самій статті, не в анонсі на головній.",
        "Стретч-практика: придумай 6 статей для блогу (наприклад «HTML для початківців», «Що таке CSS?», «Як працює браузер?») і для кожної зроби окремий article-анонс з категорією, датою і посиланням «Читати далі».",
        "Стретч-практика: побудуй той самий блог для іншої тематики — блог кав'ярні (статті про каву й десерти) або особистий технічний блог розробника.",
        "Самоперевірка: один h1, кожна стаття у списку — article, є main, sidebar зроблений через aside, дати через time, зображення мають alt, немає порожніх href=\"#\".",
      ],
      expectedOutput: "Блог зі списком анонсів, sidebar і читабельною структурованою статтею.",
    },
  },

  "Проєкт: Сайт ресторану": {
    whatIsIt: "Повторення café-проєкту самостійно, з нуля, без підглядання: header з nav і кнопкою бронювання, hero з двома CTA, про заклад, переваги, меню за категоріями, галерея, відгуки, форма бронювання, контакти, години роботи, footer.",
    whyUseIt: "Це перевірка на самостійність — усі теми курсу одночасно, без покрокових підказок кожного попереднього уроку.",
    whenToUse: ["Використай усе: семантику, форми, зображення, списки чи таблиці для меню, доступність.", "Меню зручно ділити на категорії (Сніданки/Основні страви/Десерти/Напої) — кожна категорія свій вкладений section з h3, кожна страва свій article.", "Форма бронювання — date/time/tel/number/select для різних типів полів.", "Постав собі той самий чек-лист типових помилок з попереднього модуля перед здачею."],
    whenNotToUse: ["Не копіюй код café-проєкту дослівно — мета в тому, щоб відтворити рішення самостійно.", "Не пропускай форму бронювання — це перевірка всього модуля «Форми».", "Не забувай, що контакти — це address, а не звичайний p."],
    comparisonTable: {
      headers: ["Блок сайту ресторану", "Теги"],
      rows: [
        ["Меню за категоріями", "section (категорія, h3) → article (страва, h4) на кожну"],
        ["Галерея", "figure + figcaption на кожне фото"],
        ["Форма бронювання", "form + label + input[type=date/time/tel/number] + select"],
        ["Контакти", "address з посиланнями tel:/mailto:"],
        ["Години роботи", "ul або section з time"],
      ],
    },
    commonMistakes: ["Забутий label у формі бронювання.", "Меню без ul/table/article (просто абзаци).", "Відсутній alt на фото інтер'єру чи страв.", "Дата/час бронювання через звичайний text-інпут замість type=\"date\"/type=\"time\".", "Контакти не в address."],
    dontDoThis: { code: `<div class="menu-item">Еспресо - 45 грн</div>`, explanation: "Меню без ul чи table — просто текст у div, така сама помилка, що розбиралась у модулі «Списки»." },
    bestPractices: ["Пройдись фінальним чек-листом помилок (модуль «Типові помилки») перед тим, як вважати проєкт готовим.", "Перевір форму бронювання клавіатурою — Tab, Enter, без миші.", "Для кожного типу даних у формі бронювання обирай правильний type: дата → date, час → time, телефон → tel, кількість гостей → number."],
    remember: ["Це самостійне повторення всього курсу на новому прикладі.", "Меню — список чи таблиця чи article на категорію+страву, ніколи не абзац.", "Форма бронювання — з label і правильними типами полів.", "Контакти — address, не звичайний p."],
    interviewQuestions: [{ question: "Як би ти перевірив готовий сайт ресторану на доступність за 5 хвилин?", answer: "Пройшовся б Tab-ом по всій сторінці без миші, перевірив alt на зображеннях, переконався що форма має labels і що на сторінці рівно один h1." }],
    summary: "Сайт ресторану — самостійне застосування всього курсу без підказок: header/hero/про заклад/переваги/меню за категоріями/галерея/відгуки/форма бронювання/контакти/години роботи/footer. Той самий café-проєкт, але заново, своїми силами.",
    nextLessonNote: "Далі — портфоліо, орієнтоване на роботодавця.",
    practiceTask: {
      title: "Проєкт: Сайт ресторану",
      description: "Створи повний сайт вигаданого ресторану самостійно: header, hero, про заклад, переваги, меню за категоріями, галерея, відгуки, форма бронювання, контакти, години роботи, footer.",
      checklist: [
        "Усі landmark-теги на місці (header/nav/main/footer).",
        "Hero з двома CTA (наприклад «Забронювати столик» і «Переглянути меню»).",
        "Переваги — ul з мінімум 6 пунктами.",
        "Меню — мінімум 2 категорії, кожна категорія — section з h3, кожна страва — article з назвою/описом/ціною.",
        "Галерея — мінімум 3 фото через figure + figcaption.",
        "Відгуки — мінімум 3 article з іменем і текстом.",
        "Форма бронювання з label і required, з type=\"date\"/type=\"time\"/type=\"tel\"/type=\"number\"/select для зони.",
        "Контакти в address з посиланнями tel:/mailto:.",
        "Години роботи — окрема секція.",
        "Самоперевірка: один h1, страви через article, зображення з alt, форма з label, контакти в address, немає порожніх href=\"#\".",
      ],
      steps: [
        {
          title: "Каркас: header, main, footer",
          description: "Почни з landmark-тегів, як у модулі «Семантичний HTML» — без них важко правильно розкласти решту.",
          code: `<header>
  <nav><!-- посилання на розділи --></nav>
</header>
<main>
  <!-- hero, про заклад, переваги, меню, галерея, відгуки, форма -->
</main>
<footer><!-- контакти, години роботи, копірайт --></footer>`,
        },
        {
          title: "Hero з двома CTA",
          description: "Один h1 з назвою ресторану і одразу два заклики до дії — забронювати і переглянути меню.",
          code: `<section class="hero">
  <h1>Назва твого ресторану</h1>
  <p>Короткий опис: кухня, локація, час роботи.</p>
  <a href="#reservation">Забронювати столик</a>
  <a href="#menu">Переглянути меню</a>
</section>`,
        },
        {
          title: "Переваги",
          description: "Список причин обрати саме цей заклад — завжди ul, ніколи окремі абзаци.",
          code: `<section id="benefits">
  <h2>Чому гості обирають нас?</h2>
  <ul>
    <li>Сезонне меню з локальних продуктів</li>
    <li>Затишна атмосфера в центрі міста</li>
    <li>Бронювання столика онлайн</li>
  </ul>
</section>`,
        },
        {
          title: "Меню за категоріями",
          description: "Категорія — вкладений section з h3, кожна страва всередині — окремий article з назвою, описом і ціною.",
          code: `<section id="menu">
  <h2>Меню</h2>
  <section>
    <h3>Сніданки</h3>
    <article>
      <h4>Сирники зі сметаною</h4>
      <p>Ніжні сирники з домашнього сиру, сметаною та ягідним соусом.</p>
      <p>160 грн</p>
    </article>
  </section>
</section>`,
        },
        {
          title: "Галерея",
          description: "Кожне фото — figure з figcaption, не голий img.",
          code: `<section id="gallery">
  <h2>Галерея</h2>
  <figure>
    <img src="interior.jpg" alt="Інтер'єр ресторану з теплим освітленням" />
    <figcaption>Основний зал ресторану.</figcaption>
  </figure>
</section>`,
        },
        {
          title: "Форма бронювання",
          description: "Кожне поле — з label. Дата, час, телефон і кількість гостей — з правильними типами.",
          code: `<form>
  <label for="name">Ім'я</label>
  <input type="text" id="name" required />

  <label for="date">Дата</label>
  <input type="date" id="date" required />

  <label for="time">Час</label>
  <input type="time" id="time" required />

  <label for="guests">Кількість гостей</label>
  <input type="number" id="guests" min="1" value="2" />

  <label for="phone">Телефон</label>
  <input type="tel" id="phone" required />

  <button type="submit">Забронювати</button>
</form>`,
        },
        {
          title: "Контакти і години роботи",
          description: "Контакти — завжди address з клікабельними tel:/mailto:. Години роботи — окрема секція.",
          code: `<section id="contacts">
  <h2>Контакти</h2>
  <address>
    <p>м. Ужгород, вул. Корзо, 12</p>
    <p>Телефон: <a href="tel:+380501234567">+38 050 123 45 67</a></p>
    <p>Email: <a href="mailto:hello@example.com">hello@example.com</a></p>
  </address>
</section>
<section id="hours">
  <h2>Години роботи</h2>
  <ul>
    <li>Понеділок — П'ятниця: 10:00–22:00</li>
    <li>Субота: 10:00–23:00</li>
  </ul>
</section>`,
        },
      ],
      starterFiles: [{ id: "restaurant-start", path: "index.html", language: "html", label: "index.html", code: "<!-- Почни з нуля, без підглядання в café-проєкт -->" }],
      solutionFiles: [
        {
          id: "restaurant-solution",
          path: "index.html",
          language: "html",
          label: "index.html (один із можливих варіантів — звір себе за чек-листом, а не за точним текстом)",
          code: `<header>
  <nav aria-label="Основна навігація">
    <ul>
      <li><a href="#menu">Меню</a></li>
      <li><a href="#gallery">Галерея</a></li>
      <li><a href="#reservation">Бронювання</a></li>
      <li><a href="#contacts">Контакти</a></li>
    </ul>
  </nav>
</header>

<main>
  <section class="hero">
    <h1>Кнайпа «Ліс»</h1>
    <p>Домашня кухня карпатського краю в центрі міста.</p>
    <a href="#reservation">Забронювати столик</a>
    <a href="#menu">Переглянути меню</a>
  </section>

  <section id="benefits">
    <h2>Чому гості обирають нас?</h2>
    <ul>
      <li>Сезонне меню з локальних продуктів</li>
      <li>Затишна атмосфера в дерев'яному інтер'єрі</li>
      <li>Бронювання столика онлайн за хвилину</li>
    </ul>
  </section>

  <section id="menu">
    <h2>Меню</h2>
    <section>
      <h3>Сніданки</h3>
      <article>
        <h4>Сирники зі сметаною</h4>
        <p>Ніжні сирники з домашнього сиру, сметаною та лісовим варенням.</p>
        <p>140 грн</p>
      </article>
    </section>
    <section>
      <h3>Основні страви</h3>
      <article>
        <h4>Деруни з грибним соусом</h4>
        <p>Хрусткі деруни з лісовими грибами у вершковому соусі.</p>
        <p>210 грн</p>
      </article>
    </section>
  </section>

  <section id="gallery">
    <h2>Галерея</h2>
    <figure>
      <img src="interior.jpg" alt="Дерев'яний зал кнайпи з каміном" width="400" height="300" />
      <figcaption>Основний зал з каміном.</figcaption>
    </figure>
    <figure>
      <img src="dish.jpg" alt="Деруни з грибним соусом на дерев'яній тарілці" width="400" height="300" />
      <figcaption>Деруни з грибним соусом.</figcaption>
    </figure>
  </section>

  <section id="reviews">
    <h2>Відгуки</h2>
    <article>
      <h3>Марія</h3>
      <p><time datetime="2026-06-20">20 червня 2026</time></p>
      <p>Затишно і смачно, повернемось ще.</p>
    </article>
  </section>

  <section id="reservation">
    <h2>Бронювання столика</h2>
    <form>
      <label for="r-name">Ім'я</label>
      <input type="text" id="r-name" required />

      <label for="r-date">Дата</label>
      <input type="date" id="r-date" required />

      <label for="r-time">Час</label>
      <input type="time" id="r-time" required />

      <label for="r-guests">Кількість гостей</label>
      <input type="number" id="r-guests" min="1" value="2" />

      <label for="r-phone">Телефон</label>
      <input type="tel" id="r-phone" required />

      <button type="submit">Забронювати</button>
    </form>
  </section>
</main>

<footer>
  <section id="contacts">
    <h2>Контакти</h2>
    <address>
      <p>м. Ужгород, вул. Корзо, 12</p>
      <p>Телефон: <a href="tel:+380501234567">+38 050 123 45 67</a></p>
      <p>Email: <a href="mailto:hello@example.com">hello@example.com</a></p>
    </address>
  </section>
  <section id="hours">
    <h2>Години роботи</h2>
    <ul>
      <li>Понеділок — П'ятниця: 10:00–22:00</li>
      <li>Субота — Неділя: 10:00–23:00</li>
    </ul>
  </section>
  <p>© 2026 Кнайпа «Ліс»</p>
</footer>`,
          readOnly: true,
        },
      ],
      hints: [
        "Спробуй спершу без підказок, і лише потім звіряй себе з модулями курсу.",
        "Стретч-практика: побудуй 3 різні концепції одного й того ж сайту — український ресторан, італійський ресторан, суші-бар — змінюючи лише hero, меню, переваги і спецпропозиції.",
        "Мінімальний обсяг для міні-челенджу: 8 секцій, 12 страв у меню, 4 фото в галереї, 4 відгуки, повна форма бронювання, контакти, графік роботи, footer.",
      ],
      expectedOutput: "Повністю самостійно зібраний сайт ресторану, що проходить чек-лист типових помилок.",
    },
  },

  "Проєкт: Портфоліо": {
    whatIsIt: "Особиста сторінка розробника: header з навігацією і посиланням на CV, hero з коротким описом про себе, секція «Про мене», навички згруповані по категоріях, секція проєктів (картки з технологіями і посиланнями на GitHub/демо), контакти.",
    whyUseIt: "Портфоліо — сторінка, яку реально побачить роботодавець. Семантика й доступність тут — це не вправа, а те, що безпосередньо впливає на перше враження.",
    whenToUse: ["header — ім'я/лого, nav, за бажанням посилання на CV (download).", "hero — короткий опис спеціалізації і 1-2 посилання (на проєкти/контакти).", "Навички — групуй по категоріях: Frontend, Tools, Soft Skills, Languages — кожна група свій h3 + ul.", "section «Проєкти» — article на кожен проєкт: назва, опис, список технологій (ul), посилання на код і на демо.", "Контакти — mailto:/tel:/посилання на LinkedIn і GitHub, або невелика форма зв'язку."],
    whenNotToUse: ["Не роби посилання на GitHub/LinkedIn без rel=\"noopener noreferrer\" при target=\"_blank\".", "Не забувай alt на скріншотах проєктів.", "Не пиши занадто довгу автобіографію в «Про мене» — портфоліо не для цього, досить 2-3 речень."],
    comparisonTable: {
      headers: ["Розділ портфоліо", "Теги"],
      rows: [
        ["Header з CV", "header, nav, a[download]"],
        ["Навички по групах", "section → section (h3) → ul на кожну групу"],
        ["Проєкт", "article + h3 + ul технологій + 2 посилання (код/демо)"],
        ["Контакти", "address або footer з mailto:/tel:"],
      ],
    },
    codeWalkthroughs: [
      {
        before: "Header портфоліо з посиланням на завантаження CV (атрибут download):",
        code: `<header>
  <a href="/" aria-label="На головну сторінку">Ivan.dev</a>
  <nav aria-label="Основна навігація">
    <ul>
      <li><a href="#about">Про мене</a></li>
      <li><a href="#projects">Проєкти</a></li>
      <li><a href="#contacts">Контакти</a></li>
    </ul>
  </nav>
  <a href="cv.pdf" download>Завантажити CV</a>
</header>`,
        lineNotes: ["Атрибут download підказує браузеру, що файл треба завантажити, а не відкривати.", "Якщо CV ще немає — це посилання можна поки не додавати."],
      },
      {
        before: "Навички, згруповані по категоріях — кожна група власний h3 і ul:",
        code: `<section id="skills">
  <h2>Навички</h2>
  <section>
    <h3>Frontend</h3>
    <ul>
      <li>HTML5</li>
      <li>CSS3</li>
      <li>JavaScript</li>
    </ul>
  </section>
  <section>
    <h3>Soft Skills</h3>
    <ul>
      <li>Самонавчання</li>
      <li>Уважність до деталей</li>
    </ul>
  </section>
</section>`,
        lineNotes: ["Групування навичок робить резюме/портфоліо набагато легшим для сканування очима.", "Кожна група — свій h3 усередині спільного h2 «Навички»."],
      },
    ],
    commonMistakes: ["Скріншоти проєктів без alt.", "Посилання на зовнішні профілі без target=\"_blank\"/rel.", "Відсутність контактів у зручному, клікабельному форматі.", "Навички однією довгою купою без груп.", "Опис проєкту в одне речення без згадки технологій і посилань на код/демо."],
    dontDoThis: { code: `<img src="project-screenshot.png">`, explanation: "Скріншот проєкту без alt — роботодавець, що використовує скрінрідер (чи просто повільний інтернет), не зрозуміє, що на зображенні." },
    bestPractices: ["Кожен проєкт у портфоліо — article з назвою, коротким описом, списком технологій і двома посиланнями (код + демо).", "Контакти дублюй у footer — це стандартне очікування відвідувача.", "Навички групуй по категоріях (Frontend/Tools/Soft Skills/Languages) — так їх швидше сканувати."],
    remember: ["Кожен проєкт — article з описом, технологіями і посиланням.", "Скріншоти — завжди з alt.", "Зовнішні посилання — з rel=\"noopener noreferrer\".", "Навички — групами, не суцільним списком."],
    interviewQuestions: [{ question: "Чому семантика й доступність особливо важливі саме в портфоліо?", answer: "Це сторінка, яку реально оцінює роботодавець чи рекрутер — погана семантика або відсутня доступність одразу впливають на перше враження про якість твого коду." }],
    summary: "Портфоліо = header з CV-посиланням + hero про себе + навички групами + article на кожен проєкт (опис, технології, 2 посилання) + доступні контакти. Це сторінка, де якість HTML має пряме значення для працевлаштування.",
    nextLessonNote: "Останній міні-проєкт — сторінка товару інтернет-магазину.",
    practiceTask: {
      title: "Проєкт: Портфоліо",
      description: "Створи сторінку портфоліо з header, коротким описом себе, навичками по групах, 2-3 проєктами і контактами.",
      checklist: [
        "header з nav і, за бажанням, посиланням на CV (download); main одразу після header для решти контенту.",
        "hero з коротким описом.",
        "Розділ «Про мене» — 2-3 речення, не автобіографія.",
        "Навички згруповані мінімум у 2 категорії (Frontend/Tools/Soft Skills/Languages).",
        "Кожен проєкт — article з назвою, описом, списком технологій (ul) і двома посиланнями (код/демо).",
        "Скріншоти з alt.",
        "Контакти клікабельні (mailto:/tel:/GitHub/LinkedIn) з rel=\"noopener noreferrer\" на зовнішніх посиланнях.",
        "Самоперевірка: один h1, проєкти через article, списки через ul, контакти в address чи footer, є meta description і нормальний title.",
      ],
      steps: [
        {
          title: "Header з посиланням на CV",
          description: "Ім'я/лого + nav + необов'язкове посилання на завантаження CV. Одразу після header відкривай main — hero, навички і проєкти йдуть усередину нього.",
          code: `<header>
  <a href="/">Ivan.dev</a>
  <nav aria-label="Основна навігація">
    <ul>
      <li><a href="#about">Про мене</a></li>
      <li><a href="#skills">Навички</a></li>
      <li><a href="#projects">Проєкти</a></li>
      <li><a href="#contacts">Контакти</a></li>
    </ul>
  </nav>
  <a href="cv.pdf" download>Завантажити CV</a>
</header>

<main>
  <!-- сюди підуть hero, навички, проєкти -->
</main>`,
        },
        {
          title: "Hero про себе",
          description: "h1 з ім'ям і коротким описом спеціалізації — те, що роботодавець читає першим.",
          code: `<section class="hero">
  <h1>Іван Петренко — Frontend Developer</h1>
  <p>Пишу доступний, семантичний HTML і React-інтерфейси.</p>
</section>`,
        },
        {
          title: "Навички по групах",
          description: "Замість одного суцільного списку — кілька груп зі своїми h3.",
          code: `<section id="skills">
  <h2>Навички</h2>
  <section>
    <h3>Frontend</h3>
    <ul>
      <li>HTML5</li>
      <li>CSS3</li>
      <li>JavaScript</li>
    </ul>
  </section>
  <section>
    <h3>Soft Skills</h3>
    <ul>
      <li>Самонавчання</li>
      <li>Уважність до деталей</li>
    </ul>
  </section>
</section>`,
        },
        {
          title: "Секція проєктів",
          description: "section зі своїм h2 «Проєкти» — обгортка для карток нижче.",
          code: `<section aria-labelledby="projects-heading">
  <h2 id="projects-heading">Проєкти</h2>
</section>`,
        },
        {
          title: "Картка проєкту",
          description: "Кожен проєкт — article зі скріншотом (з alt!), назвою, описом, списком технологій і двома посиланнями: на GitHub і на демо, обидва з rel=\"noopener noreferrer\".",
          code: `<article>
  <img src="project1.png" alt="Скріншот застосунку для трекінгу задач TaskFlow" width="400" height="250" />
  <h3>TaskFlow</h3>
  <p>Застосунок для керування задачами. React, TypeScript.</p>
  <ul>
    <li>HTML5</li>
    <li>CSS3</li>
    <li>React</li>
  </ul>
  <a href="https://github.com/example/taskflow" target="_blank" rel="noopener noreferrer">Код на GitHub</a>
  <a href="https://example.github.io/taskflow" target="_blank" rel="noopener noreferrer">Демо</a>
</article>`,
        },
        {
          title: "Контакти у footer",
          description: "Клікабельний email — мінімум для контактів. Footer стоїть поза main, як окремий landmark.",
          code: `<footer>
  <p><a href="mailto:ivan@example.com">ivan@example.com</a></p>
</footer>`,
        },
      ],
      starterFiles: [{ id: "portfolio-start", path: "index.html", language: "html", label: "index.html", code: "<!-- Почни з header -->" }],
      solutionFiles: [
        {
          id: "portfolio-solution",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<header>
  <a href="/">Ivan.dev</a>
  <nav aria-label="Основна навігація">
    <ul>
      <li><a href="#about">Про мене</a></li>
      <li><a href="#skills">Навички</a></li>
      <li><a href="#projects">Проєкти</a></li>
      <li><a href="#contacts">Контакти</a></li>
    </ul>
  </nav>
</header>
<main>
  <section class="hero">
    <h1>Іван Петренко — Frontend Developer</h1>
    <p>Пишу доступний, семантичний HTML і React-інтерфейси.</p>
  </section>
  <section id="skills">
    <h2>Навички</h2>
    <section>
      <h3>Frontend</h3>
      <ul>
        <li>HTML5</li>
        <li>CSS3</li>
        <li>JavaScript</li>
      </ul>
    </section>
  </section>
  <section aria-labelledby="projects-heading">
    <h2 id="projects-heading">Проєкти</h2>
    <article>
      <img src="project1.png" alt="Скріншот застосунку для трекінгу задач TaskFlow" width="400" height="250" />
      <h3>TaskFlow</h3>
      <p>Застосунок для керування задачами. React, TypeScript.</p>
      <ul>
        <li>HTML5</li>
        <li>CSS3</li>
        <li>React</li>
      </ul>
      <a href="https://github.com/example/taskflow" target="_blank" rel="noopener noreferrer">Код на GitHub</a>
      <a href="https://example.github.io/taskflow" target="_blank" rel="noopener noreferrer">Демо</a>
    </article>
  </section>
</main>
<footer>
  <p><a href="mailto:ivan@example.com">ivan@example.com</a></p>
</footer>`,
          readOnly: true,
        },
      ],
      hints: [
        "Кожне зовнішнє посилання — з rel=\"noopener noreferrer\".",
        "Стретч-практика: додай 5 карток проєктів (можна навіть із попередніх міні-проєктів курсу — CV, лендінг, блог, ресторан), секцію «Що я зараз вивчаю» (ul з поточними темами) і повний опис кожного проєкту (що це, яку проблему вирішує, що ти зробив сам).",
        "Стретч-практика (поетапна): після HTML-модуля залиш лише правильну структуру; після CSS-модуля додай (подумки, для майбутнього курсу) адаптивність і сітку карток; після JavaScript-модуля — мобільне меню чи фільтр проєктів.",
        "Самоперевірка: один h1, проєкти через article, списки через ul, контакти в address/footer, є meta description і нормальний title.",
      ],
      expectedOutput: "Портфоліо з описом, згрупованими навичками, проєктами і доступними контактами.",
    },
  },

  "Проєкт: Сторінка товару": {
    whatIsIt: "Сторінка одного товару інтернет-магазину: header з пошуком, breadcrumbs (хлібні крихти через ol), галерея (figure + мініатюри), назва, ціна (за потреби зі знижкою), форма вибору варіантів і кількості, опис, характеристики (dl або table), доставка й оплата, FAQ, відгуки, схожі товари.",
    whyUseIt: "Це найпоширеніша сторінка e-commerce — перевіряє одразу зображення з alt, семантичні кнопки дій, форми вибору варіантів, і два способи показати характеристики (список визначень і таблицю).",
    whenToUse: ["img з alt для фото товару; головне фото — figure з figcaption, додаткові — мініатюри в ul.", "Breadcrumbs — nav[aria-label] + ol (порядок від головної до товару важливий).", "button, не a, для «Додати в кошик» чи «Купити зараз».", "dl/dt/dd або table для характеристик (розмір, матеріал, вага).", "Ціна зі знижкою — стара ціна через <del>, нова — через <strong>."],
    whenNotToUse: ["Не роби кнопку кошика посиланням.", "Не забувай alt навіть на додаткових фото товару (мініатюри).", "Не використовуй ul для breadcrumbs — там важливий порядок, отже ol."],
    comparisonTable: {
      headers: ["Дані про товар", "Тег"],
      rows: [
        ["Назва", "h1"],
        ["Breadcrumbs", "nav[aria-label] + ol"],
        ["Ціна (зі знижкою)", "<del>стара</del> + <strong>нова</strong>"],
        ["Характеристики", "dl/dt/dd або table"],
        ["Дія «Додати в кошик»", "button"],
        ["Варіанти (колір/розмір/кількість)", "form + select + input[type=number]"],
      ],
    },
    codeWalkthroughs: [
      {
        before: "Breadcrumbs (хлібні крихти) — навігація, що показує шлях до товару; ol, бо порядок важливий:",
        code: `<nav aria-label="Хлібні крихти">
  <ol>
    <li><a href="/">Головна</a></li>
    <li><a href="/catalog">Каталог</a></li>
    <li><a href="/catalog/headphones">Навушники</a></li>
    <li>SoundPro X100</li>
  </ol>
</nav>`,
        lineNotes: ["ol, а не ul — це шлях від головної сторінки до поточного товару, порядок має значення.", "Останній пункт (поточна сторінка) — без посилання, простий текст."],
      },
      {
        before: "Ціна зі старою і новою вартістю (знижка):",
        code: `<p>Стара ціна: <del>3499 грн</del></p>
<p>Нова ціна: <strong>2999 грн</strong></p>
<p>Економія: 500 грн</p>`,
        lineNotes: ["<del> — семантично \"закреслена/недійсна\" стара ціна.", "<strong> — підкреслює важливість актуальної ціни."],
      },
      {
        before: "Характеристики через dl (список визначень термін-значення):",
        code: `<dl>
  <dt>Тип</dt>
  <dd>Бездротові навушники</dd>
  <dt>Підключення</dt>
  <dd>Bluetooth</dd>
</dl>`,
        lineNotes: ["dt — термін (назва характеристики), dd — його значення.", "Це альтернатива table для тих самих даних — обирай залежно від того, що зручніше стилізувати в майбутньому CSS-курсі."],
      },
    ],
    commonMistakes: ["Кнопка кошика як <a href=\"#\">.", "Фото товару без alt.", "Характеристики зверстані абзацами замість table/dl.", "Breadcrumbs через ul замість ol.", "Форма вибору варіантів (колір/розмір) без label на кожному select."],
    dontDoThis: { code: `<a href="#" class="btn">Додати в кошик</a>`, explanation: "Це дія без переходу на нову сторінку — потрібен <button>, інакше ламається клавіатурна навігація і семантика для скрінрідера." },
    bestPractices: ["Характеристики товару (розмір, колір, матеріал) — table з правильними th/scope чи dl для пар термін-значення.", "Головне фото товару — без loading=\"lazy\" (воно у першому екрані), додаткові мініатюри — з lazy.", "Форма вибору варіантів товару — кожен select і input з власним label, навіть якщо вони виглядають компактно."],
    remember: ["h1 — назва товару, один раз.", "Кнопка дії — button, не посилання.", "Характеристики — table або dl, не абзаци.", "Breadcrumbs — ol, бо порядок важливий.", "Знижка — стара ціна в del, нова — в strong."],
    interviewQuestions: [{ question: "Чи потрібен loading=\"lazy\" на головному фото товару?", answer: "Ні — головне фото товару видно одразу при завантаженні сторінки, тому lazy loading тут тільки сповільнить його появу; lazy доречний лише для зображень нижче першого екрана." }],
    summary: "Сторінка товару = breadcrumbs(ol) + h1 назва + галерея(figure) + ціна(del/strong за потреби знижки) + форма варіантів + button дії + характеристики(dl/table) + доставка/FAQ/відгуки/схожі товари. Фінальна перевірка модулів «Зображення», «Таблиці», «Форми» й «Семантичні кнопки» одночасно.",
    nextLessonNote: "Це останній міні-проєкт курсу HTML. Далі — курс CSS для стилізації всього, що вже побудовано.",
    practiceTask: {
      title: "Проєкт: Сторінка товару",
      description: "Створи сторінку одного товару з breadcrumbs, галереєю, ціною, формою вибору варіантів, кнопкою кошика і характеристиками.",
      checklist: [
        "Breadcrumbs через nav[aria-label] + ol.",
        "h1 з назвою товару.",
        "Галерея: головне фото через figure+figcaption, мінімум 2 додаткові мініатюри з alt.",
        "Ціна (за бажанням зі знижкою через del/strong).",
        "Форма вибору варіантів (колір/розмір через select, кількість через input[type=number]), кожне поле з label.",
        "button «Додати в кошик».",
        "Характеристики — table або dl.",
        "Секція доставки й оплати.",
        "Мінімум 2 відгуки через article з датою (time) і оцінкою.",
        "Самоперевірка: один h1, кнопка кошика — button, characteristics table/dl, зображення з alt, немає порожніх href=\"#\".",
      ],
      steps: [
        {
          title: "Breadcrumbs",
          description: "Хлібні крихти показують шлях до товару — ol усередині nav, бо порядок важливий.",
          code: `<nav aria-label="Хлібні крихти">
  <ol>
    <li><a href="/">Головна</a></li>
    <li><a href="/catalog">Каталог</a></li>
    <li>Навушники SoundPro X100</li>
  </ol>
</nav>`,
        },
        {
          title: "Фото і назва",
          description: "img зі змістовним alt, h1 з назвою товару, ціна поруч.",
          code: `<article>
  <figure>
    <img src="headphones.jpg" alt="Бездротові навушники AirSound, чорні" width="400" height="400" />
    <figcaption>AirSound у чорному кольорі.</figcaption>
  </figure>
  <h1>Навушники AirSound</h1>
  <p>1299 грн</p>
</article>`,
        },
        {
          title: "Форма варіантів і кнопка дії",
          description: "Вибір кольору/кількості через select/input, кожен з label. «Додати в кошик» — дія без переходу, тому button.",
          code: `<form>
  <label for="color">Колір</label>
  <select id="color" name="color">
    <option value="black">Чорний</option>
    <option value="white">Білий</option>
  </select>

  <label for="quantity">Кількість</label>
  <input type="number" id="quantity" min="1" value="1" />

  <button type="submit">Додати в кошик</button>
</form>`,
        },
        {
          title: "Характеристики",
          description: "table з caption і th scope=\"row\" для кожної характеристики — так само, як у модулі «Таблиці».",
          code: `<table>
  <caption>Характеристики</caption>
  <tr><th scope="row">Колір</th><td>Чорний</td></tr>
  <tr><th scope="row">Тип</th><td>Бездротові, з шумозаглушенням</td></tr>
</table>`,
        },
        {
          title: "Доставка й оплата, відгуки",
          description: "Коротка секція способів доставки/оплати і кілька відгуків покупців з датою через time.",
          code: `<section id="delivery">
  <h2>Доставка та оплата</h2>
  <ul>
    <li>Нова пошта</li>
    <li>Кур'єр по місту</li>
  </ul>
</section>
<section id="reviews">
  <h2>Відгуки</h2>
  <article>
    <h3>Олена</h3>
    <p><time datetime="2026-07-08">8 липня 2026</time></p>
    <p>Оцінка: 5 з 5</p>
    <p>Товар якісний, доставка швидка.</p>
  </article>
</section>`,
        },
      ],
      starterFiles: [{ id: "product-start", path: "index.html", language: "html", label: "index.html", code: "<!-- Почни з h1 і фото товару -->" }],
      solutionFiles: [
        {
          id: "product-solution",
          path: "index.html",
          language: "html",
          label: "index.html (фрагмент — усередині main твого сайту, поруч із header/footer з попередніх проєктів)",
          code: `<main>
  <nav aria-label="Хлібні крихти">
    <ol>
      <li><a href="/">Головна</a></li>
      <li><a href="/catalog">Каталог</a></li>
      <li>Навушники AirSound</li>
    </ol>
  </nav>
  <article>
    <figure>
      <img src="headphones.jpg" alt="Бездротові навушники AirSound, чорні" width="400" height="400" />
      <figcaption>AirSound у чорному кольорі.</figcaption>
    </figure>
    <h1>Навушники AirSound</h1>
    <p>1299 грн</p>

    <form>
      <label for="color">Колір</label>
      <select id="color" name="color">
        <option value="black">Чорний</option>
        <option value="white">Білий</option>
      </select>

      <label for="quantity">Кількість</label>
      <input type="number" id="quantity" min="1" value="1" />

      <button type="submit">Додати в кошик</button>
    </form>

    <table>
      <caption>Характеристики</caption>
      <tr><th scope="row">Колір</th><td>Чорний</td></tr>
      <tr><th scope="row">Тип</th><td>Бездротові, з шумозаглушенням</td></tr>
    </table>
  </article>
  <section id="reviews">
    <h2>Відгуки</h2>
    <article>
      <h3>Олена</h3>
      <p><time datetime="2026-07-08">8 липня 2026</time></p>
      <p>Оцінка: 5 з 5</p>
      <p>Товар якісний, доставка швидка.</p>
    </article>
  </section>
</main>`,
          readOnly: true,
        },
      ],
      hints: [
        "Кнопка кошика — button, навіть якщо вона стилізована під посилання.",
        "Стретч-практика: побудуй сторінку товару ще для двох категорій — одягу (з таблицею розмірів, вибором кольору й розміру) і побутової техніки (з довшим списком характеристик через dl).",
        "Стретч-практика: додай блок «Схожі товари» (мінімум 3 article з назвою, коротким описом і ціною) і FAQ через details/summary (гарантія, повернення товару).",
        "Самоперевірка: один h1, кнопка кошика — button, характеристики через table/dl, зображення з alt, немає порожніх href=\"#\".",
      ],
      expectedOutput: "Готова сторінка товару з коректною семантикою й доступною кнопкою дії.",
    },
  },
};
