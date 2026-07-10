import type { LessonOverride } from "./htmlFoundations";

/**
 * Module "Семантичний HTML" (html-semantics). Continues the café project:
 * wraps the whole page in landmark regions, structures the menu with
 * article/section, adds a gallery with figure/dialog, and fixes button vs
 * link usage across the page.
 */
export const htmlSemanticsOverrides: Record<string, LessonOverride> = {
  "Орієнтири та регіони сторінки": {
    whatIsIt: "<header>, <nav>, <main>, <aside>, <footer> — орієнтири (landmarks): великі, іменовані регіони сторінки. Скрінрідер дозволяє стрибати між ними напряму, як по змісту книги.",
    whyUseIt: "Без орієнтирів скрінрідер бачить суцільний потік div-ів; з ними користувач одразу переходить до <main>, минаючи навігацію й футер, не прослуховуючи все підряд.",
    whenToUse: ["header — шапка сторінки або секції (навіть усередині article).", "nav — блок навігаційних посилань; на сторінці їх може бути кілька (шапка, футер, кабінет).", "main — рівно один раз, для унікального контенту сторінки.", "footer — підвал сторінки або секції."],
    interactiveDemo: "landmarks-highlight-demo",
    comparisonTable: {
      headers: ["Тег", "Скільки на сторінці"],
      rows: [
        ["header", "1+ (сторінка й/або секції)"],
        ["nav", "1+"],
        ["main", "Рівно 1"],
        ["footer", "1+ (сторінка й/або секції)"],
      ],
    },
    whenNotToUse: ["Не став header/footer на кожен дрібний блок — вони для великих регіонів.", "Не додавай два <main> на сторінку.", "Не заміняй div на header \"про всяк випадок\", коли немає реального сенсу шапки."],
    codeWalkthroughs: [
      {
        before: "Сторінка кав'ярні через div і через landmarks:",
        code: `<!-- Погано -->
<div class="header">...</div>
<div class="content">...</div>
<div class="footer">...</div>

<!-- Добре -->
<header>...</header>
<main>...</main>
<footer>...</footer>`,
        lineNotes: ["header/main/footer одразу дають скрінрідеру карту сторінки.", "main — унікальний контент саме цієї сторінки, без повторюваної шапки й підвалу."],
        after: "Користувач скрінрідера може одразу перейти до <main>, пропустивши шапку.",
      },
      {
        before: "header/nav/footer можуть повторюватись — наприклад, свій header усередині кожної статті:",
        code: `<article>
  <header>
    <h2>Новина дня</h2>
    <p>Автор: редакція</p>
  </header>
  <p>Текст новини...</p>
  <footer>Опубліковано 01.01.2026</footer>
</article>

<aside>
  <nav>
    <a href="#hot">Гарячі напої</a>
    <a href="#cold">Холодні напої</a>
  </nav>
</aside>`,
        lineNotes: [
          "header/footer усередині article описують саме цю статтю, а не всю сторінку.",
          "nav усередині aside — окреме бічне меню, не пов'язане з головною навігацією сторінки.",
          "На сторінці може бути кілька header, footer і nav — обмеження \"рівно один\" стосується лише main.",
        ],
      },
    ],
    commonMistakes: [
      "div замість header/main/footer.",
      "Два <main> на сторінці.",
      "header/footer на дрібних елементах, де це не потрібно.",
      "Плутати <body> (уся сторінка) з <main> (лише унікальний головний контент).",
      "Вкладати <main> в інший <main> — так не можна.",
    ],
    dontDoThis: { code: `<div class="header">...</div>\n<div class="main-content">...</div>`, explanation: "Класи header/main-content виглядають зрозуміло розробнику, але для скрінрідера це звичайні div — жодного орієнтира." },
    bestPractices: [
      "Один <main> на сторінку — унікальний контент саме цієї сторінки.",
      "header/footer можна використовувати і для секцій (наприклад, header картки), не тільки для всієї сторінки.",
      "aside може стояти і поруч із main (реклама для всієї сторінки), і всередині article (\"читайте також\" для конкретної статті).",
    ],
    remember: [
      "header/nav/main/aside/footer — орієнтири для швидкої навігації.",
      "На сторінці рівно один <main>, і його не можна вкладати в інший <main>.",
      "header/nav/footer можуть повторюватись (шапка сторінки, header статті, nav у футері).",
      "main — лише унікальний контент; body — уся сторінка цілком.",
      "div не замінює семантику landmark-тегів.",
    ],
    interviewQuestions: [
      { question: "Чому важливо, щоб на сторінці був рівно один <main>?", answer: "Скрінрідери використовують <main> як пряме посилання на унікальний контент сторінки; кілька <main> роблять цю навігацію неоднозначною." },
      { question: "Чи може <header> бути всередині <article>?", answer: "Так — header усередині article описує саме цю статтю (наприклад, її заголовок і автора), а не всю сторінку." },
      { question: "Чим <main> відрізняється від <body>?", answer: "body — це вся сторінка цілком, включно з header/nav/footer; main — лише унікальний головний контент, без повторюваних елементів." },
      { question: "Чи може <aside> бути всередині <main>?", answer: "Так, наприклад блок \"читайте також\" усередині статті — aside стосується конкретного article, а не всієї сторінки." },
    ],
    summary: "Орієнтири (Landmarks) — це семантичні регіони HTML-сторінки, які допомагають правильно структурувати контент. Основні елементи: header — шапка, nav — навігація, main — головний контент, aside — додаткова інформація, footer — нижня частина сторінки. Вони покращують доступність, SEO та роблять код зрозумілішим. На сторінці повинен бути лише один main, тоді як header, nav і footer можуть повторюватись.",
    proTip: "Натисни Tab у скрінрідері, щоб побачити список орієнтирів сторінки, — так проєкти на div-ах миттєво себе видають.",
    nextLessonNote: "Далі — article, section і aside всередині main.",
    practiceTask: {
      title: "Проєкт курсу: каркас сторінки",
      description: "Обгорни сторінку кав'ярні в header, main і footer замість div.",
      checklist: ["nav лежить усередині header.", "Увесь основний контент — усередині main.", "Контакти чи копірайт — у footer."],
      starterFiles: [{ id: "cafe-index-v12-start", path: "index.html", language: "html", label: "index.html", code: `<div class="header"><nav>...</nav></div>\n<div class="content"><h1>Кав'ярня «Аромат»</h1></div>\n<div class="footer">© 2026</div>` }],
      solutionFiles: [
        {
          id: "cafe-index-v13",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<header>
  <nav>...</nav>
</header>
<main>
  <h1>Кав'ярня «Аромат»</h1>
</main>
<footer>© 2026 Кав'ярня «Аромат»</footer>`,
          readOnly: true,
        },
      ],
      hints: ["nav лишається всередині header, просто header тепер справжній тег, а не div."],
      expectedOutput: "Сторінка з трьома чіткими орієнтирами замість div-обгорток.",
    },
    microExercises: [
      { id: "html-landmarks-choice", kind: "choice", prompt: "Скільки тегів <main> може бути на одній сторінці?", options: ["Скільки завгодно", "Рівно один", "Два — для десктопу й мобільного", "Жодного, main застарів"], correctAnswer: "Рівно один", solution: "main позначає унікальний контент сторінки — він один." },
    ],
  },

  "Article, section і aside": {
    whatIsIt: "<article> — самодостатній контент, який має сенс окремо (пост, картка товару). <section> — тематична група контенту зі своїм заголовком. <aside> — побічний контент (реклама, related-блок).",
    whyUseIt: "Плутанина div/article/section — найчастіша причина \"каші\" у семантиці: пошуковик і скрінрідер втрачають розуміння, що на сторінці головне, а що додаткове.",
    whenToUse: ["article — картка напою в меню, окремий пост блогу, відгук клієнта.", "section — тематичний блок зі своїм заголовком (наприклад, \"Меню\", \"Про нас\").", "aside — блок \"Рекомендуємо також\", реклама, бічна панель."],
    interactiveDemo: "article-section-aside-demo",
    comparisonTable: {
      headers: ["Тег", "Тест"],
      rows: [
        ["article", "Має сенс окремо, поза сторінкою?"],
        ["section", "Тематична група зі своїм заголовком?"],
        ["aside", "Побічне, не головне?"],
      ],
    },
    whenNotToUse: ["Не став article там, де контент не має сенсу поза сторінкою (наприклад, одна кнопка).", "Не використовуй section лише для стилізації — якщо немає власного заголовка, це просто div."],
    codeWalkthroughs: [
      {
        before: "Меню кав'ярні через article усередині section:",
        code: `<section aria-labelledby="menu-heading">
  <h2 id="menu-heading">Меню</h2>
  <article>
    <h3>Еспресо</h3>
    <p>45 грн. Класична подача.</p>
  </article>
  <article>
    <h3>Капучино</h3>
    <p>55 грн. З молочною пінкою.</p>
  </article>
</section>`,
        lineNotes: ["section групує весь блок \"Меню\" зі своїм заголовком.", "Кожен article — окрема картка напою, яка має сенс сама по собі (можна вставити на іншу сторінку без втрати змісту)."],
        after: "Пошуковик розуміє межі кожної картки напою окремо від решти меню.",
      },
      {
        before: "Великий article теж може містити свої section — наприклад, стаття з підрозділами:",
        code: `<article>
  <h1>Як заварити ідеальну каву</h1>
  <section>
    <h2>Вибір зерна</h2>
    <p>...</p>
  </section>
  <section>
    <h2>Помел</h2>
    <p>...</p>
  </section>
</article>`,
        lineNotes: [
          "section тут групує підрозділи всередині однієї великої статті.",
          "Кожен section має власний заголовок — так само, як і кожен article.",
          "article може містити section, а section може містити article — залежно від напрямку вкладеності.",
        ],
      },
    ],
    commonMistakes: [
      "div замість article/section без причини.",
      "section без власного заголовка.",
      "article для контенту, який без контексту сторінки не має сенсу.",
      "article для Hero-секції чи блоку \"Наші переваги\" — це не самодостатній матеріал, потрібен section.",
      "section для окремої новини чи товару — це самодостатній матеріал, потрібен article.",
    ],
    dontDoThis: { code: `<section>\n  <div>Еспресо — 45 грн</div>\n</section>`, explanation: "Немає заголовка секції і немає article для картки товару — усе звалено в div без структури." },
    bestPractices: [
      "Питай: \"чи можна цей блок опублікувати окремо і він матиме сенс?\" — якщо так, це article.",
      "У кожного section — власний заголовок (навіть якщо він візуально прихований).",
      "Не створюй section чи article без логічної причини — якщо блок не є ні самостійним, ні тематичною групою, досить div.",
    ],
    realWorldUsage: ["Стрічка новин чи блогу — кожен пост в <article>.", "E-commerce картка товару в каталозі — типовий <article>."],
    remember: [
      "article — самодостатній блок, який можна винести на іншу сторінку без втрати сенсу.",
      "section — тематична група зі своїм заголовком, не обов'язково самодостатня.",
      "aside — побічний, не головний контент.",
      "section може містити article, і навпаки — article може містити section (підрозділи великої статті).",
      "Бажано, щоб кожен section і article мав власний заголовок.",
    ],
    interviewQuestions: [
      { question: "Чим article відрізняється від section?", answer: "article — самодостатня одиниця контенту, що має сенс окремо від сторінки; section — тематичне угруповання контенту зі своїм заголовком у межах більшого документа." },
      { question: "Чи може section містити article?", answer: "Так, наприклад блок \"Новини\" (section) містить кілька окремих новин (article) — це поширений і правильний патерн." },
      { question: "Чому Hero-секцію зазвичай оформлюють через section, а не article?", answer: "Hero не має сенсу як самостійний матеріал поза сторінкою — це радше тематичний блок, тому підходить section." },
      { question: "Чому картку товару часто оформлюють через article?", answer: "Товар — самодостатня одиниця контенту: його можна показати окремо (наприклад, на сторінці товару) без втрати сенсу." },
    ],
    summary: "Теги article, section і aside використовуються для правильної семантичної структури контенту. article призначений для самостійних матеріалів, які можуть існувати окремо (статті, новини, товари, коментарі). section використовується для логічного групування пов'язаного контенту (Hero, переваги, контакти, FAQ). aside містить додаткову інформацію, яка доповнює основний контент, але не є його головною частиною.",
    proTip: "У картках товарів e-commerce article — це майже завжди правильний вибір, бо кожну картку логічно можна винести на власну сторінку товару.",
    nextLessonNote: "Далі — figure, figcaption, details, summary і dialog.",
    practiceTask: {
      title: "Проєкт курсу: картки меню",
      description: "Оформи кожен напій у меню як article усередині section «Меню».",
      checklist: ["section «Меню» має власний h2.", "Кожен напій — окремий article.", "У кожному article — h3 і опис."],
      starterFiles: [{ id: "cafe-index-v13-start", path: "index.html", language: "html", label: "index.html", code: `<h2 id="menu">Меню</h2>\n<div>Еспресо — 45 грн</div>\n<div>Капучино — 55 грн</div>` }],
      solutionFiles: [
        {
          id: "cafe-index-v14",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<section aria-labelledby="menu-heading">
  <h2 id="menu-heading">Меню</h2>
  <article>
    <h3>Еспресо</h3>
    <p>45 грн.</p>
  </article>
  <article>
    <h3>Капучино</h3>
    <p>55 грн.</p>
  </article>
</section>`,
          readOnly: true,
        },
      ],
      hints: ["Кожна картка напою — самодостатня, тому article."],
      expectedOutput: "Меню, розбите на семантичні картки замість div.",
    },
    microExercises: [
      { id: "html-article-section-choice", kind: "choice", prompt: "Що правильніше для окремого поста блогу в стрічці?", options: ["<div class=\"post\">", "<article>"], correctAnswer: "<article>", solution: "Пост блогу самодостатній — його можна опублікувати окремо. Це article." },
    ],
  },

  "Figure, figcaption, details, summary і dialog": {
    whatIsIt: "<figure>+<figcaption> — зображення (чи графік) з підписом. <details>+<summary> — розкривний блок (FAQ). <dialog> — вбудоване у браузер модальне вікно.",
    whyUseIt: "Ці теги дають безкоштовну поведінку й семантику: <details> відкривається/закривається без жодного JS, <dialog> — модалка з фокус-пасткою з коробки.",
    whenToUse: ["figure — фото з підписом (\"Зал кав'ярні о 8 ранку\").", "details/summary — короткий FAQ, розділ \"показати більше\".", "dialog — спливаюче вікно (форма підтвердження, попап з деталями)."],
    interactiveDemo: "figure-details-dialog-demo",
    comparisonTable: {
      headers: ["Тег", "Заміняє"],
      rows: [
        ["figure + figcaption", "img + окремий підпис поруч"],
        ["details + summary", "div + JS для розкривного блоку"],
        ["dialog", "div + JS-модалка з фокус-пасткою"],
      ],
    },
    whenNotToUse: ["Не використовуй figure без figcaption \"про всяк випадок\" — тоді досить звичайного <img>.", "Не імітуй розкривний блок через JS+div, якщо досить <details> без жодного скрипта."],
    codeWalkthroughs: [
      {
        before: "Фото залу з підписом і розкривний блок з питаннями:",
        code: `<figure>
  <img src="interior.jpg" alt="Зал кав'ярні «Аромат»" width="640" height="420" />
  <figcaption>Наш зал вранці, до відкриття</figcaption>
</figure>

<details>
  <summary>Чи є Wi-Fi?</summary>
  <p>Так, безкоштовний для всіх відвідувачів.</p>
</details>`,
        lineNotes: ["figcaption зв'язує підпис саме з цим зображенням.", "details/summary дають клікабельний розкривний блок без жодного JavaScript."],
        after: "FAQ працює одразу, без обробників подій, а зображення має структурований підпис.",
      },
      {
        before: "figcaption можна поставити і до, і після контенту — а figure підходить не лише для фото, а й для коду:",
        code: `<figure>
  <figcaption>Приклад JavaScript</figcaption>
  <pre><code>const a = 5;</code></pre>
</figure>`,
        lineNotes: [
          "figcaption першим елементом — підпис зверху, це так само валідно, як і знизу.",
          "figure групує будь-який самодостатній візуальний чи змістовий блок: фото, графік, код, схему.",
        ],
      },
      {
        before: "dialog можна відкривати й закривати через JavaScript — showModal() блокує взаємодію з фоном і підтримує закриття через Esc:",
        code: `<dialog id="welcome">
  <h2>Успішно</h2>
  <p>Замовлення оформлено.</p>
  <button type="button" onclick="document.getElementById('welcome').close()">Закрити</button>
</dialog>
<button type="button" onclick="document.getElementById('welcome').showModal()">Відкрити</button>`,
        lineNotes: [
          "showModal() відкриває dialog як справжню модалку: блокує клік по фону, підтримує Esc.",
          "close() закриває — без jQuery чи саморобної логіки з z-index і position:fixed.",
          "Без атрибута open і без showModal() dialog просто не показується.",
        ],
        after: "Це та сама поведінка, яку раніше доводилось будувати вручну через div + CSS + JS.",
      },
    ],
    commonMistakes: [
      "figure без figcaption.",
      "FAQ на div+JS замість готового details/summary.",
      "Використання figure для зображень, які не потребують підпису.",
      "details без summary всередині.",
      "Очікування, що dialog відкриється сам по собі без атрибута open чи виклику showModal().",
    ],
    dontDoThis: { code: `<div class="faq-item" onclick="toggle(this)">\n  <div class="question">Чи є Wi-Fi?</div>\n  <div class="answer">Так.</div>\n</div>`, explanation: "Це заново винаходить <details>/<summary>, вимагає JS для базової взаємодії і не працює з клавіатури без додаткової роботи." },
    bestPractices: [
      "Для FAQ і \"показати більше\" спочатку перевір, чи вистачить details/summary — часто JS взагалі не потрібен.",
      "figcaption пиши коротким і описовим, не дублюй alt дослівно.",
      "Використовуй dialog замість саморобної модалки на div — фокус-пастка й Esc уже вбудовані.",
    ],
    remember: [
      "figure/figcaption — самодостатній візуальний матеріал з підписом (не лише фото — і код, і графіки).",
      "figcaption можна розташувати і до, і після контенту всередині figure.",
      "details/summary — розкривний блок без JS; open відкриває його одразу.",
      "dialog — вбудована модалка браузера: showModal()/close() керують нею з JS.",
      "Без showModal() чи атрибута open dialog не показується.",
    ],
    interviewQuestions: [
      { question: "Яка перевага details/summary над div+JS для FAQ?", answer: "details/summary працює з коробки: клавіатура, клік, стан відкрито/закрито — усе без жодного JavaScript і з правильною семантикою для скрінрідера." },
      { question: "Чи можна використовувати figure без картинки?", answer: "Так — figure підходить для будь-якого самодостатнього візуального чи змістового блоку: коду, графіка, схеми, діаграми." },
      { question: "Як відкрити dialog через JavaScript?", answer: "Викликати showModal() на елементі dialog; це відкриває його як справжню модалку з блокуванням фону. Закривають через close()." },
      { question: "Чим dialog кращий за div із JavaScript для модальних вікон?", answer: "dialog з showModal() автоматично блокує взаємодію з фоном, підтримує закриття по Esc і краще працює зі скрінрідерами — усе це раніше доводилось реалізовувати вручну." },
    ],
    summary: "HTML має сучасні семантичні елементи для різних сценаріїв. figure використовується для самостійних ілюстрацій, фотографій, схем або прикладів коду, а figcaption додає до них підпис. details і summary дозволяють створювати блоки, які можна розгортати та згортати без JavaScript, що особливо зручно для FAQ. dialog призначений для створення модальних вікон і підтримує сучасні можливості браузера, такі як модальний режим та керування через JavaScript.",
    proTip: "details/summary можна стилізувати через CSS майже як завгодно — стрілочку-індикатор, анімацію розкриття — і це досі нуль рядків JS для базової поведінки.",
    nextLessonNote: "Далі — семантичні кнопки проти посилань.",
    practiceTask: {
      title: "Проєкт курсу: FAQ кав'ярні",
      description: "Додай розділ FAQ із двома питаннями через details/summary.",
      checklist: ["Кожне питання — окремий details.", "Питання — у summary.", "Відповідь — усередині details після summary."],
      starterFiles: [{ id: "cafe-index-v14-start", path: "index.html", language: "html", label: "index.html", code: `<h2 id="faq">Питання</h2>` }],
      solutionFiles: [
        {
          id: "cafe-index-v15",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<h2 id="faq">Питання</h2>
<details>
  <summary>Чи є Wi-Fi?</summary>
  <p>Так, безкоштовний для всіх відвідувачів.</p>
</details>
<details>
  <summary>Чи можна з собакою?</summary>
  <p>Так, у літньому дворику.</p>
</details>`,
          readOnly: true,
        },
      ],
      hints: ["summary — це те, що видно завжди; решта ховається, доки не розкрити."],
      expectedOutput: "Робочий FAQ-розділ без жодного JavaScript.",
    },
    microExercises: [
      { id: "html-details-choice", kind: "choice", prompt: "Потрібен блок \"показати повний опис\", що розкривається по кліку без JS. Що обрати?", options: ["<div onclick>", "<details><summary>", "<dialog>", "<aside>"], correctAnswer: "<details><summary>", solution: "details/summary дає розкривну поведінку без жодного скрипта." },
    ],
  },

  "Семантичні кнопки проти посилань": {
    whatIsIt: "<a href> — перехід на іншу сторінку/розділ. <button> — дія на поточній сторінці (відправити форму, відкрити модалку, перемкнути стан). Обидва клікабельні, але означають різне.",
    whyUseIt: "Скрінрідер оголошує їх по-різному (\"посилання\" проти \"кнопка\") і користувач очікує різної поведінки — плутанина ламає інтуїцію взаємодії для всіх, хто покладається на ці підказки.",
    whenToUse: ["a href — перехід на іншу сторінку, розділ, файл, зовнішній сайт.", "button — відправка форми, відкриття модалки, перемикач (наприклад, темна тема), будь-яка дія без переходу."],
    interactiveDemo: "button-vs-link-demo",
    comparisonTable: {
      headers: ["Питання", "Відповідь"],
      rows: [
        ["URL зміниться після кліку?", "Так → a, Ні → button"],
        ["button у формі без type?", "За замовчуванням type=\"submit\""],
      ],
    },
    whenNotToUse: ["Не роби кнопку через <a href=\"#\"> — це імітація посилання без реальної адреси, зламана поведінка з клавіатурою.", "Не роби посилання через <button> зі скриптом location.href — втрачається стандартна поведінка правою кнопкою миші ('відкрити в новій вкладці')."],
    codeWalkthroughs: [
      {
        before: "Кнопка \"Забронювати столик\" — правильний і неправильний варіант:",
        code: `<!-- Погано: посилання, що поводиться як кнопка -->
<a href="#" onclick="openBookingModal()">Забронювати столик</a>

<!-- Добре -->
<button type="button" onclick="openBookingModal()">Забронювати столик</button>`,
        lineNotes: ["href=\"#\" — це не реальна адреса, а хак; клавіатура і скрінрідер очікують справжнього переходу.", "button type=\"button\" явно каже: це дія, не навігація і не сабміт форми."],
        after: "Скрінрідер коректно оголошує 'кнопка', і Enter/Space працюють як очікується.",
      },
      {
        before: "button має три типи — за замовчуванням усередині форми це submit, тому явний type=\"button\" критично важливий для кнопок без сабміту:",
        code: `<form>
  <button type="submit">Надіслати</button>
  <button type="reset">Очистити</button>
  <button type="button" onclick="openMenu()">Відкрити меню</button>
</form>`,
        lineNotes: [
          "type=\"submit\" відправляє форму — це і є поведінка за замовчуванням, якщо type не вказано.",
          "type=\"reset\" скидає всі поля форми до початкових значень.",
          "type=\"button\" — звичайна кнопка без зв'язку з формою, найчастіше працює разом із JS.",
        ],
        after: "Якщо забути type у кнопки \"Відкрити меню\" всередині форми, клік випадково відправить форму.",
      },
    ],
    commonMistakes: [
      "<a href=\"#\"> для дій без навігації.",
      "button без type у формі — випадково стає submit.",
      "div/span з onClick замість button.",
      "Додавання role=\"button\" чи role=\"link\" до вже семантичних <button>/<a> — зайве, HTML і так дає правильну роль.",
      "Вибір елемента за зовнішнім виглядом, а не за тим, що він робить.",
    ],
    dontDoThis: { code: `<a href="#" onclick="addToCart()">Додати в кошик</a>`, explanation: "Додавання в кошик — дія, не перехід на сторінку. href=\"#\" — хак, який ламає очікування скрінрідера й клавіатурну навігацію." },
    bestPractices: [
      "Питай: \"це перехід чи дія?\" — перехід дає a, дія дає button.",
      "У формах явно вказуй type=\"button\" для кнопок, які не мають сабмітити форму.",
      "Змінюй зовнішній вигляд через CSS, а не через підміну тега — стилізований a все одно лишається посиланням, і навпаки.",
    ],
    remember: [
      "a href — навігація, button — дія.",
      "href=\"#\" для кнопки — типова помилка початківців.",
      "button у формі без type за замовчуванням = submit.",
      "Посилання активується через Enter, кнопка — через Enter і Space.",
      "Стилізація не змінює семантику: a class=\"button\" — усе одно посилання.",
    ],
    interviewQuestions: [
      { question: "Що станеться з <button> без атрибута type усередині <form>?", answer: "Браузер трактує його як type=\"submit\" за замовчуванням, тож клік випадково відправить форму, якщо це не було наміром." },
      { question: "Чому href=\"#\" вважається поганою практикою?", answer: "Браузер і скрінрідер сприймають це як реальне посилання: сторінка може прокрутитись угору, а користувачу здається, що відбувся перехід, хоча насправді виконується дія." },
      { question: "Чи потрібно додавати role=\"button\" до звичайного <button>?", answer: "Ні — HTML вже дає button правильну семантичну роль. ARIA-ролі потрібні лише тоді, коли неможливо використати відповідний нативний елемент." },
      { question: "Як скрінрідер відрізняє кнопку від посилання?", answer: "Він оголошує їх по-різному: \"посилання\" для a, \"кнопка\" для button — це одразу підказує користувачу, яка поведінка очікується після активації." },
    ],
    summary: "Посилання (a) і кнопки (button) можуть виглядати однаково, але мають різне призначення. a використовується для переходу на іншу сторінку, файл або ресурс, тоді як button призначений для виконання дій: відкриття меню, модального вікна, відправлення форми, додавання товару в кошик тощо. Завжди вибирай HTML-елемент за його призначенням, а не за зовнішнім виглядом.",
    proTip: "Якщо після кліка URL сторінки не мав би змінитись — це майже завжди button, а не a.",
    nextLessonNote: "Семантика готова. Далі — форми: структура і підписи полів.",
    practiceTask: {
      title: "Проєкт курсу: кнопка бронювання",
      description: "Заміни хибне посилання-кнопку \"Забронювати\" на справжній button.",
      checklist: ["Видалено <a href=\"#\">.", "Додано <button type=\"button\">.", "Дія (відкриття форми/модалки) лишається на місці."],
      starterFiles: [{ id: "cafe-index-v15-start", path: "index.html", language: "html", label: "index.html", code: `<a href="#" onclick="openBookingModal()">Забронювати столик</a>` }],
      solutionFiles: [
        {
          id: "cafe-index-v16",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<button type="button" onclick="openBookingModal()">Забронювати столик</button>`,
          readOnly: true,
        },
      ],
      hints: ["Бронювання не веде на нову сторінку — це дія, отже button."],
      expectedOutput: "Кнопка бронювання, яка коректно працює з клавіатурою і скрінрідером.",
    },
    microExercises: [
      { id: "html-button-vs-link-choice", kind: "choice", prompt: "Клік перемикає темну/світлу тему сайту без переходу на нову адресу. Що обрати?", options: ["<a href=\"#\">", "<button>", "<a href=\"/theme\">", "<div onclick>"], correctAnswer: "<button>", solution: "Перемикання теми — дія на місці, без навігації, тому button." },
    ],
  },
};
