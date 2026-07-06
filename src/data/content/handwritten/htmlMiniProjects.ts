import type { LessonOverride } from "./htmlFoundations";

/**
 * Module "Міні-проєкти" (html-mini-projects). Cheat-sheet / project-brief
 * format. Six independent projects (not the café) so the student applies
 * everything without copying the running example.
 */
export const htmlMiniProjectsOverrides: Record<string, LessonOverride> = {
  "Проєкт: CV-сторінка": {
    whatIsIt: "Одна сторінка-резюме: ім'я, контакти, досвід роботи, освіта, навички. Використовуй тільки HTML — жодного CSS чи JS, лише структура.",
    whyUseIt: "CV-сторінка — найпростіший реальний проєкт, де одразу видно, чи розумієш ти ієрархію заголовків, списки й семантику для контенту, який хтось реально читатиме.",
    whenToUse: ["h1 — ім'я, h2 — розділи (Досвід, Освіта, Навички), h3 — назви посад/закладів.", "ul — навички, ol — необов'язково для хронології.", "time datetime — для періодів роботи."],
    whenNotToUse: ["Не додавай стилі чи кольори — це задача майбутнього CSS-курсу.", "Не використовуй table для розкладки блоків — тільки для реальних табличних даних, якщо такі є."],
    comparisonTable: {
      headers: ["Розділ CV", "Теги"],
      rows: [
        ["Ім'я і контакти", "h1, address або p з mailto:/tel:"],
        ["Досвід роботи", "section, article на кожну посаду, time"],
        ["Навички", "ul"],
        ["Освіта", "section, article на кожен заклад"],
      ],
    },
    commonMistakes: ["Кілька h1 (наприклад, ім'я і назва секції обидва h1).", "Період роботи текстом без <time datetime>.", "Список навичок абзацом через кому замість <ul>."],
    dontDoThis: { code: `<h1>Іван Петренко</h1>\n<h1>Досвід роботи</h1>`, explanation: "Другий h1 має бути h2 — він підпорядкований головній темі сторінки (імені)." },
    bestPractices: ["Один h1 — ім'я. Усі розділи — h2. Посади/заклади всередині розділу — h3.", "Контакти (email, телефон) — клікабельні через mailto:/tel:, як у модулі «Навігація»."],
    remember: ["h1 — ім'я, один раз.", "Кожен розділ CV — h2 + article на кожен запис.", "Навички — ul, не абзац."],
    interviewQuestions: [{ question: "Чому в CV-сторінці не варто використовувати table для розташування блоків?", answer: "Table призначена для реальних табличних даних (рядки/колонки), а не для розкладки блоків сторінки — для цього потрібен CSS, який тут поки не використовується." }],
    summary: "CV-сторінка перевіряє базову ієрархію заголовків, списки й семантичні контакти — без жодного CSS чи JS. Один h1, чіткі h2-розділи, article на кожен запис.",
    nextLessonNote: "Далі — проєкт лендінгу з hero і картками.",
    practiceTask: {
      title: "Проєкт: CV-сторінка",
      description: "Створи index.html з повним резюме: ім'я, контакти, досвід, освіта, навички.",
      checklist: ["Один h1 з ім'ям.", "h2 для кожного розділу (Досвід, Освіта, Навички).", "article для кожної позиції досвіду/освіти.", "Контакти клікабельні (mailto:/tel:).", "Навички — ul."],
      steps: [
        {
          title: "Скелет документа",
          description: "Почни зі стандартного скелета: doctype, html[lang], head з title, порожній body.",
          code: `<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8" />
  <title>Іван Петренко — Frontend Developer</title>
</head>
<body>
</body>
</html>`,
        },
        {
          title: "Ім'я і контакти",
          description: "h1 з іменем — один раз на всю сторінку. Email і телефон одразу роби клікабельними через mailto:/tel:.",
          code: `<body>
  <h1>Іван Петренко</h1>
  <p><a href="mailto:ivan@example.com">ivan@example.com</a> · <a href="tel:+380671234567">+380 67 123 45 67</a></p>
</body>`,
        },
        {
          title: "Досвід роботи",
          description: "h2 для розділу, а кожна посада — окремий article з h3, датою через <time> і коротким описом.",
          code: `  <h1>Іван Петренко</h1>
  <p><a href="mailto:ivan@example.com">ivan@example.com</a> · <a href="tel:+380671234567">+380 67 123 45 67</a></p>

  <h2>Досвід роботи</h2>
  <article>
    <h3>Frontend Developer, ТОВ «Технології»</h3>
    <p><time datetime="2023-01">Січень 2023</time> — дотепер</p>
    <p>Розробка інтерфейсів на React і TypeScript.</p>
  </article>`,
        },
        {
          title: "Освіта",
          description: "Той самий патерн, що й досвід: h2 розділу + article на кожен заклад.",
          code: `  <h2>Освіта</h2>
  <article>
    <h3>Львівська політехніка</h3>
    <p>Комп'ютерні науки, <time datetime="2022">2022</time></p>
  </article>`,
        },
        {
          title: "Навички",
          description: "Список навичок — завжди ul, ніколи не абзац через кому.",
          code: `  <h2>Навички</h2>
  <ul>
    <li>HTML/CSS</li>
    <li>JavaScript</li>
    <li>React</li>
  </ul>`,
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
  <title>Іван Петренко — Frontend Developer</title>
</head>
<body>
  <h1>Іван Петренко</h1>
  <p><a href="mailto:ivan@example.com">ivan@example.com</a> · <a href="tel:+380671234567">+380 67 123 45 67</a></p>

  <h2>Досвід роботи</h2>
  <article>
    <h3>Frontend Developer, ТОВ «Технології»</h3>
    <p><time datetime="2023-01">Січень 2023</time> — дотепер</p>
    <p>Розробка інтерфейсів на React і TypeScript.</p>
  </article>

  <h2>Освіта</h2>
  <article>
    <h3>Львівська політехніка</h3>
    <p>Комп'ютерні науки, <time datetime="2022">2022</time></p>
  </article>

  <h2>Навички</h2>
  <ul>
    <li>HTML/CSS</li>
    <li>JavaScript</li>
    <li>React</li>
  </ul>
</body>
</html>`,
          readOnly: true,
        },
      ],
      hints: ["Перевір: h1 рівно один, далі тільки h2/h3."],
      expectedOutput: "Повна CV-сторінка з коректною семантичною структурою.",
    },
  },

  "Проєкт: Лендінг": {
    whatIsIt: "Одна сторінка продукту чи послуги: header з nav, hero з h1 і CTA, кілька секцій переваг/картками, форма підписки, footer.",
    whyUseIt: "Лендінг — найпоширеніший тип сторінки в реальній роботі: кожен стартап, курс чи продукт починається саме з нього. Це перевірка всього модуля «Реальні компоненти» одразу.",
    whenToUse: ["header + nav + hero — завжди на початку.", "section з article-картками — для переваг/функцій продукту.", "Одна форма (підписка чи заявка) ближче до кінця сторінки."],
    whenNotToUse: ["Не роби кілька hero-секцій — один головний заклик до дії на сторінку.", "Не забувай unique title/description для SEO цієї сторінки."],
    commonMistakes: ["Кілька конкуруючих CTA однакової ваги.", "Картки переваг без article.", "Форма підписки без label."],
    dontDoThis: { code: `<h1>Продукт X</h1>\n<h1>Купи зараз!</h1>`, explanation: "Другий h1 конкурує з головним заголовком сторінки — це порушує правило одного h1." },
    bestPractices: ["Структуруй зверху вниз: header → hero → переваги → форма → footer.", "Кожна секція переваг — свій h2, кожна картка всередині — article."],
    remember: ["Один h1, один головний CTA.", "Переваги — секція з article-картками.", "Форма підписки з label, як і будь-яка інша форма."],
    interviewQuestions: [{ question: "Що є найважливішим елементом hero-секції лендінгу?", answer: "Одна чітка головна дія (CTA), пов'язана з h1 і коротким описом — усе інше на сторінці підтримує саме цю дію." }],
    summary: "Лендінг = header+nav, hero з одним CTA, секції з картками-перевагами, форма, footer. Це застосування всього модуля «Реальні компоненти» в одному проєкті.",
    nextLessonNote: "Далі — сторінка блогу зі статтями.",
    practiceTask: {
      title: "Проєкт: Лендінг продукту",
      description: "Створи лендінг вигаданого продукту (наприклад, мобільний застосунок) з header, hero, картками переваг і формою.",
      checklist: ["header з nav.", "hero з h1, описом і одним CTA.", "Секція переваг з article-картками.", "Форма підписки з label.", "footer з копірайтом."],
      steps: [
        {
          title: "Header",
          description: "Лого-посилання на головну + nav з якорями на секції нижче.",
          code: `<header>
  <a href="/" class="logo">TaskFlow</a>
  <nav><a href="#features">Можливості</a></nav>
</header>`,
        },
        {
          title: "Hero",
          description: "Один h1, короткий опис, рівно один CTA — головна дія сторінки.",
          code: `<header>...</header>
<section class="hero">
  <h1>TaskFlow — керуй задачами просто</h1>
  <p>Плануй день за 2 хвилини щоранку.</p>
  <a href="#signup">Спробувати безкоштовно</a>
</section>`,
        },
        {
          title: "Секція переваг",
          description: "section зі своїм h2, кожна перевага — окремий article (навіть якщо зараз лише одна).",
          code: `<section aria-labelledby="features-heading" id="features">
  <h2 id="features-heading">Можливості</h2>
  <article>
    <h3>Швидке додавання задач</h3>
    <p>Один клік — і задача в списку.</p>
  </article>
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
          description: "Завершуємо копірайтом.",
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
<section class="hero">
  <h1>TaskFlow — керуй задачами просто</h1>
  <p>Плануй день за 2 хвилини щоранку.</p>
  <a href="#signup">Спробувати безкоштовно</a>
</section>
<section aria-labelledby="features-heading" id="features">
  <h2 id="features-heading">Можливості</h2>
  <article>
    <h3>Швидке додавання задач</h3>
    <p>Один клік — і задача в списку.</p>
  </article>
</section>
<form id="signup">
  <label for="signup-email">Email</label>
  <input type="email" id="signup-email" required />
  <button type="submit">Підписатись</button>
</form>
<footer><p>© 2026 TaskFlow</p></footer>`,
          readOnly: true,
        },
      ],
      hints: ["Один CTA в hero — не додавай другий конкурентний заклик поруч."],
      expectedOutput: "Повний лендінг з чіткою структурою і одним головним закликом до дії.",
    },
  },

  "Проєкт: Сторінка блогу": {
    whatIsIt: "Список статей на головній (заголовок + уривок + дата) і одна повна стаття: h1, time, основний текст із підзаголовками, можливо цитата.",
    whyUseIt: "Блог перевіряє модуль «Робота з текстом» і «Стаття блогу» насправді: ієрархію заголовків усередині довгого тексту й машиночитані дати.",
    whenToUse: ["Список статей — article на кожен анонс, з h2 заголовком і <time>.", "Повна стаття — h1 заголовок, h2/h3 підрозділи, blockquote для цитат за потреби."],
    whenNotToUse: ["Не пропускай datetime у <time> — дата має бути машиночитаною.", "Не став h1 і в анонсі статті, і в самій статті на тій самій сторінці."],
    commonMistakes: ["Анонс статті без <time datetime>.", "Пропущені рівні заголовків усередині статті (h1 → h3).", "Цитата в статті без blockquote/cite."],
    dontDoThis: { code: `<p>Опубліковано: 3 дні тому</p>`, explanation: "Це не машиночитана дата — потрібен <time datetime=\"2026-07-03\">3 дні тому</time>, щоб і людина, і скрипт розуміли точну дату." },
    bestPractices: ["Кожен анонс статті — article з h2, коротким уривком і посиланням «Читати далі».", "Усередині статті тримай послідовну ієрархію: h1 (назва статті), h2 (розділи), h3 (підрозділи)."],
    remember: ["Анонс статті — article + h2 + time.", "Стаття — h1 + послідовні h2/h3.", "Дата — завжди <time datetime>."],
    interviewQuestions: [{ question: "Чому <time datetime=\"...\"> кращий за просто текст \"3 дні тому\"?", answer: "datetime дає точну, машиночитану дату для скриптів і пошукових систем, а видимий текст лишається зручним для читача — обидва працюють одночасно." }],
    summary: "Блог перевіряє: ієрархію заголовків у довгому тексті, article на кожен анонс, машиночитані дати через <time>. Це пряме продовження модулів «Текст» і «Реальні компоненти».",
    nextLessonNote: "Далі — сайт ресторану, повторення café-проєкту самостійно з нуля.",
    practiceTask: {
      title: "Проєкт: Сторінка блогу",
      description: "Створи головну сторінку блогу зі списком анонсів і одну повну статтю.",
      checklist: ["Анонси — article з h2 і time.", "Стаття — h1 + h2/h3 підрозділи.", "Дата — з datetime."],
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
          title: "Цитата в тексті",
          description: "Цитату виділяй через blockquote, а не просто лапками в абзаці.",
          code: `  <h2>З чого я почав</h2>
  <p>Спершу здавалось, що div вирішує все...</p>
  <blockquote>
    <p>Семантика — це не про красу коду, а про людей, які ним користуються.</p>
  </blockquote>`,
        },
      ],
      starterFiles: [{ id: "blog-start", path: "index.html", language: "html", label: "index.html", code: "<!-- Почни зі списку анонсів -->" }],
      solutionFiles: [
        {
          id: "blog-solution",
          path: "index.html",
          language: "html",
          label: "article.html",
          code: `<article>
  <h1>Як я вивчив семантичний HTML за місяць</h1>
  <p><time datetime="2026-07-03">3 липня 2026</time></p>
  <h2>З чого я почав</h2>
  <p>Спершу здавалось, що div вирішує все...</p>
  <blockquote>
    <p>Семантика — це не про красу коду, а про людей, які ним користуються.</p>
  </blockquote>
</article>`,
          readOnly: true,
        },
      ],
      hints: ["h1 — лише в самій статті, не в анонсі на головній."],
      expectedOutput: "Блог зі списком анонсів і читабельною структурованою статтею.",
    },
  },

  "Проєкт: Сайт ресторану": {
    whatIsIt: "Повторення café-проєкту самостійно, з нуля, без підглядання: header, hero, меню (списки/таблиця), про заклад, форма бронювання, footer.",
    whyUseIt: "Це перевірка на самостійність — усі теми курсу одночасно, без покрокових підказок кожного попереднього уроку.",
    whenToUse: ["Використай усе: семантику, форми, зображення, списки чи таблиці для меню, доступність.", "Постав собі той самий чек-лист типових помилок з попереднього модуля перед здачею."],
    whenNotToUse: ["Не копіюй код café-проєкту дослівно — мета в тому, щоб відтворити рішення самостійно.", "Не пропускай форму бронювання — це перевірка всього модуля «Форми»."],
    commonMistakes: ["Забутий label у формі бронювання.", "Меню без ul/table (просто абзаци).", "Відсутній alt на фото інтер'єру чи страв."],
    dontDoThis: { code: `<div class="menu-item">Еспресо - 45 грн</div>`, explanation: "Меню без ul чи table — просто текст у div, така сама помилка, що розбиралась у модулі «Списки»." },
    bestPractices: ["Пройдись фінальним чек-листом помилок (модуль «Типові помилки») перед тим, як вважати проєкт готовим.", "Перевір форму бронювання клавіатурою — Tab, Enter, без миші."],
    remember: ["Це самостійне повторення всього курсу на новому прикладі.", "Меню — список чи таблиця, ніколи не абзац.", "Форма бронювання — з label і правильними типами полів."],
    interviewQuestions: [{ question: "Як би ти перевірив готовий сайт ресторану на доступність за 5 хвилин?", answer: "Пройшовся б Tab-ом по всій сторінці без миші, перевірив alt на зображеннях, переконався що форма має labels і що на сторінці рівно один h1." }],
    summary: "Сайт ресторану — самостійне застосування всього курсу без підказок. Той самий café-проєкт, але заново, своїми силами.",
    nextLessonNote: "Далі — портфоліо, орієнтоване на роботодавця.",
    practiceTask: {
      title: "Проєкт: Сайт ресторану",
      description: "Створи повний сайт вигаданого ресторану самостійно: header, hero, меню, про заклад, форма бронювання, footer.",
      checklist: ["Усі landmark-теги на місці (header/nav/main/footer).", "Меню — ul або table.", "Форма бронювання з label і required.", "Зображення з alt.", "Один h1."],
      steps: [
        {
          title: "Каркас: header, main, footer",
          description: "Почни з landmark-тегів, як у модулі «Семантичний HTML» — без них важко правильно розкласти решту.",
          code: `<header>
  <nav><!-- посилання на розділи --></nav>
</header>
<main>
  <!-- hero, меню, про заклад, форма -->
</main>
<footer><!-- контакти, копірайт --></footer>`,
        },
        {
          title: "Hero і назва",
          description: "Один h1 з назвою ресторану — і більше жодного h1 на сторінці.",
          code: `<section class="hero">
  <h1>Назва твого ресторану</h1>
  <p>Короткий опис: кухня, локація, час роботи.</p>
</section>`,
        },
        {
          title: "Меню",
          description: "Обери сам: ul для простого переліку страв або table, якщо додаєш ціну й вагу як колонки. Головне — не абзаци.",
          code: `<ul>
  <li>Назва страви — ціна</li>
</ul>
<!-- або -->
<table>
  <caption>Меню</caption>
  <tr><th scope="col">Страва</th><th scope="col">Ціна</th></tr>
</table>`,
        },
        {
          title: "Форма бронювання",
          description: "Кожне поле — з label. Обов'язкові поля — з required.",
          code: `<form>
  <label for="name">Ім'я</label>
  <input type="text" id="name" required />
  <!-- телефон, кількість гостей, час — за тим самим патерном -->
</form>`,
        },
      ],
      starterFiles: [{ id: "restaurant-start", path: "index.html", language: "html", label: "index.html", code: "<!-- Почни з нуля, без підглядання в café-проєкт -->" }],
      solutionFiles: [
        {
          id: "restaurant-solution",
          path: "index.html",
          language: "html",
          label: "index.html (орієнтир, не єдине рішення)",
          code: `<!-- Немає єдиного "правильного" рішення — звір свою структуру
за чек-листом у полі checklist, а не за точним текстом. -->`,
          readOnly: true,
        },
      ],
      hints: ["Спробуй спершу без підказок, і лише потім звіряй себе з модулями курсу."],
      expectedOutput: "Повністю самостійно зібраний сайт ресторану, що проходить чек-лист типових помилок.",
    },
  },

  "Проєкт: Портфоліо": {
    whatIsIt: "Особиста сторінка розробника: hero з коротким описом про себе, секція проєктів (картки з посиланнями на GitHub/демо), контакти.",
    whyUseIt: "Портфоліо — сторінка, яку реально побачить роботодавець. Семантика й доступність тут — це не вправа, а те, що безпосередньо впливає на перше враження.",
    whenToUse: ["hero — фото/ім'я, короткий опис спеціалізації.", "section «Проєкти» — article на кожен проєкт з посиланням на демо/код.", "Контакти — mailto:/tel:/посилання на LinkedIn і GitHub."],
    whenNotToUse: ["Не роби посилання на GitHub/LinkedIn без rel=\"noopener noreferrer\" при target=\"_blank\".", "Не забувай alt на скріншотах проєктів."],
    commonMistakes: ["Скріншоти проєктів без alt.", "Посилання на зовнішні профілі без target=\"_blank\"/rel.", "Відсутність контактів у зручному, клікабельному форматі."],
    dontDoThis: { code: `<img src="project-screenshot.png">`, explanation: "Скріншот проєкту без alt — роботодавець, що використовує скрінрідер (чи просто повільний інтернет), не зрозуміє, що на зображенні." },
    bestPractices: ["Кожен проєкт у портфоліо — article з назвою, коротким описом, технологіями і посиланням.", "Контакти дублюй у footer — це стандартне очікування відвідувача."],
    remember: ["Кожен проєкт — article з описом і посиланням.", "Скріншоти — завжди з alt.", "Зовнішні посилання — з rel=\"noopener noreferrer\"."],
    interviewQuestions: [{ question: "Чому семантика й доступність особливо важливі саме в портфоліо?", answer: "Це сторінка, яку реально оцінює роботодавець чи рекрутер — погана семантика або відсутня доступність одразу впливають на перше враження про якість твого коду." }],
    summary: "Портфоліо = hero про себе + article на кожен проєкт + доступні контакти. Це сторінка, де якість HTML має пряме значення для працевлаштування.",
    nextLessonNote: "Останній міні-проєкт — сторінка товару інтернет-магазину.",
    practiceTask: {
      title: "Проєкт: Портфоліо",
      description: "Створи сторінку портфоліо з коротким описом себе, 2-3 проєктами і контактами.",
      checklist: ["hero з коротким описом.", "Кожен проєкт — article з посиланням.", "Скріншоти з alt.", "Контакти клікабельні."],
      steps: [
        {
          title: "Hero про себе",
          description: "h1 з ім'ям і коротким описом спеціалізації — те, що роботодавець читає першим.",
          code: `<section class="hero">
  <h1>Іван Петренко — Frontend Developer</h1>
  <p>Пишу доступний, семантичний HTML і React-інтерфейси.</p>
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
          description: "Кожен проєкт — article зі скріншотом (з alt!), назвою, описом і посиланням на GitHub/демо з rel=\"noopener noreferrer\".",
          code: `<article>
  <img src="project1.png" alt="Скріншот застосунку для трекінгу задач TaskFlow" width="400" height="250" />
  <h3>TaskFlow</h3>
  <p>Застосунок для керування задачами. React, TypeScript.</p>
  <a href="https://github.com/example/taskflow" target="_blank" rel="noopener noreferrer">Код на GitHub</a>
</article>`,
        },
        {
          title: "Контакти у footer",
          description: "Клікабельний email — мінімум для контактів.",
          code: `<footer>
  <p><a href="mailto:ivan@example.com">ivan@example.com</a></p>
</footer>`,
        },
      ],
      starterFiles: [{ id: "portfolio-start", path: "index.html", language: "html", label: "index.html", code: "<!-- Почни з hero -->" }],
      solutionFiles: [
        {
          id: "portfolio-solution",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<section class="hero">
  <h1>Іван Петренко — Frontend Developer</h1>
  <p>Пишу доступний, семантичний HTML і React-інтерфейси.</p>
</section>
<section aria-labelledby="projects-heading">
  <h2 id="projects-heading">Проєкти</h2>
  <article>
    <img src="project1.png" alt="Скріншот застосунку для трекінгу задач TaskFlow" width="400" height="250" />
    <h3>TaskFlow</h3>
    <p>Застосунок для керування задачами. React, TypeScript.</p>
    <a href="https://github.com/example/taskflow" target="_blank" rel="noopener noreferrer">Код на GitHub</a>
  </article>
</section>
<footer>
  <p><a href="mailto:ivan@example.com">ivan@example.com</a></p>
</footer>`,
          readOnly: true,
        },
      ],
      hints: ["Кожне зовнішнє посилання — з rel=\"noopener noreferrer\"."],
      expectedOutput: "Портфоліо з описом, проєктами і доступними контактами.",
    },
  },

  "Проєкт: Сторінка товару": {
    whatIsIt: "Сторінка одного товару інтернет-магазину: зображення (можливо кілька), назва, ціна, опис, кнопка «Додати в кошик», характеристики (таблиця чи список визначень).",
    whyUseIt: "Це найпоширеніша сторінка e-commerce — перевіряє одразу зображення з alt/srcset, семантичні кнопки дій і таблиці/списки для характеристик товару.",
    whenToUse: ["img з alt (і за бажанням srcset) для фото товару.", "button, не a, для «Додати в кошик».", "table чи dl для характеристик (розмір, матеріал, вага)."],
    whenNotToUse: ["Не роби кнопку кошика посиланням.", "Не забувай alt навіть на додаткових фото товару (мініатюри)."],
    comparisonTable: {
      headers: ["Дані про товар", "Тег"],
      rows: [
        ["Назва", "h1"],
        ["Ціна", "p (за потреби з семантичним data-атрибутом)"],
        ["Характеристики", "table або dl"],
        ["Дія «Додати в кошик»", "button"],
      ],
    },
    commonMistakes: ["Кнопка кошика як <a href=\"#\">.", "Фото товару без alt.", "Характеристики зверстані абзацами замість table/dl."],
    dontDoThis: { code: `<a href="#" class="btn">Додати в кошик</a>`, explanation: "Це дія без переходу на нову сторінку — потрібен <button>, інакше ламається клавіатурна навігація і семантика для скрінрідера." },
    bestPractices: ["Характеристики товару (розмір, колір, матеріал) — table з правильними th/scope чи dl для пар термін-значення.", "Головне фото товару — без loading=\"lazy\" (воно у першому екрані), додаткові мініатюри — з lazy."],
    remember: ["h1 — назва товару, один раз.", "Кнопка дії — button, не посилання.", "Характеристики — table або dl, не абзаци."],
    interviewQuestions: [{ question: "Чи потрібен loading=\"lazy\" на головному фото товару?", answer: "Ні — головне фото товару видно одразу при завантаженні сторінки, тому lazy loading тут тільки сповільнить його появу; lazy доречний лише для зображень нижче першого екрана." }],
    summary: "Сторінка товару = h1 назва + img(alt) + button дії + table/dl характеристик. Фінальна перевірка модулів «Зображення», «Таблиці» й «Семантичні кнопки» одночасно.",
    nextLessonNote: "Це останній міні-проєкт курсу HTML. Далі — курс CSS для стилізації всього, що вже побудовано.",
    practiceTask: {
      title: "Проєкт: Сторінка товару",
      description: "Створи сторінку одного товару з фото, ціною, кнопкою кошика і характеристиками.",
      checklist: ["h1 з назвою товару.", "img з alt.", "button «Додати в кошик».", "Характеристики — table або dl."],
      steps: [
        {
          title: "Фото і назва",
          description: "img зі змістовним alt, h1 з назвою товару, ціна поруч.",
          code: `<article>
  <img src="headphones.jpg" alt="Бездротові навушники AirSound, чорні" width="400" height="400" />
  <h1>Навушники AirSound</h1>
  <p>1299 грн</p>
</article>`,
        },
        {
          title: "Кнопка дії",
          description: "«Додати в кошик» — дія без переходу на нову сторінку, тому button, не посилання.",
          code: `  <p>1299 грн</p>
  <button type="button">Додати в кошик</button>`,
        },
        {
          title: "Характеристики",
          description: "table з caption і th scope=\"row\" для кожної характеристики — так само, як у модулі «Таблиці».",
          code: `  <table>
    <caption>Характеристики</caption>
    <tr><th scope="row">Колір</th><td>Чорний</td></tr>
    <tr><th scope="row">Тип</th><td>Бездротові, з шумозаглушенням</td></tr>
  </table>`,
        },
      ],
      starterFiles: [{ id: "product-start", path: "index.html", language: "html", label: "index.html", code: "<!-- Почни з h1 і фото товару -->" }],
      solutionFiles: [
        {
          id: "product-solution",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<article>
  <img src="headphones.jpg" alt="Бездротові навушники AirSound, чорні" width="400" height="400" />
  <h1>Навушники AirSound</h1>
  <p>1299 грн</p>
  <button type="button">Додати в кошик</button>

  <table>
    <caption>Характеристики</caption>
    <tr><th scope="row">Колір</th><td>Чорний</td></tr>
    <tr><th scope="row">Тип</th><td>Бездротові, з шумозаглушенням</td></tr>
  </table>
</article>`,
          readOnly: true,
        },
      ],
      hints: ["Кнопка кошика — button, навіть якщо вона стилізована під посилання."],
      expectedOutput: "Готова сторінка товару з коректною семантикою й доступною кнопкою дії.",
    },
  },
};
