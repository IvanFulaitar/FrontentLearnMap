import type { LessonOverride } from "./htmlFoundations";

/**
 * Module "Семантичний HTML" (html-semantics). Continues the café project:
 * wraps the whole page in landmark regions, structures the menu with
 * article/section, adds a gallery with figure/dialog, and fixes button vs
 * link usage across the page.
 */
export const htmlSemanticsOverrides: Record<string, LessonOverride> = {
  "Орієнтири та регіони сторінки": {
    whatIsIt: "<header>, <nav>, <main>, <footer> — орієнтири (landmarks): великі, іменовані регіони сторінки. Скрінрідер дозволяє стрибати між ними напряму, як по змісту книги.",
    whyUseIt: "Без орієнтирів скрінрідер бачить суцільний потік div-ів; з ними користувач одразу переходить до <main>, минаючи навігацію й футер, не прослуховуючи все підряд.",
    whenToUse: ["header — шапка сторінки або секції.", "nav — блок навігаційних посилань.", "main — рівно один раз, для унікального контенту сторінки.", "footer — підвал сторінки або секції."],
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
    ],
    commonMistakes: ["div замість header/main/footer.", "Два <main> на сторінці.", "header/footer на дрібних елементах, де це не потрібно."],
    dontDoThis: { code: `<div class="header">...</div>\n<div class="main-content">...</div>`, explanation: "Класи header/main-content виглядають зрозуміло розробнику, але для скрінрідера це звичайні div — жодного орієнтира." },
    bestPractices: ["Один <main> на сторінку — унікальний контент саме цієї сторінки.", "header/footer можна використовувати і для секцій (наприклад, header картки), не тільки для всієї сторінки."],
    remember: ["header/nav/main/footer — орієнтири для швидкої навігації.", "На сторінці рівно один <main>.", "div не замінює семантику landmark-тегів."],
    interviewQuestions: [{ question: "Чому важливо, щоб на сторінці був рівно один <main>?", answer: "Скрінрідери використовують <main> як пряме посилання на унікальний контент сторінки; кілька <main> роблять цю навігацію неоднозначною." }],
    summary: "header/nav/main/footer — орієнтири, які дають скрінрідеру карту сторінки. Один <main>, чіткі регіони — і навігація стає швидкою для всіх.",
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
    ],
    commonMistakes: ["div замість article/section без причини.", "section без власного заголовка.", "article для контенту, який без контексту сторінки не має сенсу."],
    dontDoThis: { code: `<section>\n  <div>Еспресо — 45 грн</div>\n</section>`, explanation: "Немає заголовка секції і немає article для картки товару — усе звалено в div без структури." },
    bestPractices: ["Питай: \"чи можна цей блок опублікувати окремо і він матиме сенс?\" — якщо так, це article.", "У кожного section — власний заголовок (навіть якщо він візуально прихований)."],
    realWorldUsage: ["Стрічка новин чи блогу — кожен пост в <article>.", "E-commerce картка товару в каталозі — типовий <article>."],
    remember: ["article — самодостатній блок.", "section — тематична група зі своїм заголовком.", "aside — побічний, не головний контент."],
    interviewQuestions: [{ question: "Чим article відрізняється від section?", answer: "article — самодостатня одиниця контенту, що має сенс окремо від сторінки; section — тематичне угруповання контенту зі своїм заголовком у межах більшого документа." }],
    summary: "article для самодостатніх блоків, section для тематичних груп зі своїм заголовком, aside для побічного контенту. Тест \"має сенс окремо?\" одразу підказує правильний тег.",
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
    ],
    commonMistakes: ["figure без figcaption.", "FAQ на div+JS замість готового details/summary.", "Використання figure для зображень, які не потребують підпису."],
    dontDoThis: { code: `<div class="faq-item" onclick="toggle(this)">\n  <div class="question">Чи є Wi-Fi?</div>\n  <div class="answer">Так.</div>\n</div>`, explanation: "Це заново винаходить <details>/<summary>, вимагає JS для базової взаємодії і не працює з клавіатури без додаткової роботи." },
    bestPractices: ["Для FAQ і \"показати більше\" спочатку перевір, чи вистачить details/summary — часто JS взагалі не потрібен.", "figcaption пиши коротким і описовим, не дублюй alt дослівно."],
    remember: ["figure/figcaption — зображення з підписом.", "details/summary — розкривний блок без JS.", "dialog — вбудована модалка браузера."],
    interviewQuestions: [{ question: "Яка перевага details/summary над div+JS для FAQ?", answer: "details/summary працює з коробки: клавіатура, клік, стан відкрито/закрито — усе без жодного JavaScript і з правильною семантикою для скрінрідера." }],
    summary: "figure/figcaption підписують медіа, details/summary дають безкоштовний розкривний блок, dialog — вбудовану модалку. Усі три економлять код і покращують доступність.",
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
    ],
    commonMistakes: ["<a href=\"#\"> для дій без навігації.", "button без type у формі — випадково стає submit.", "div/span з onClick замість button."],
    dontDoThis: { code: `<a href="#" onclick="addToCart()">Додати в кошик</a>`, explanation: "Додавання в кошик — дія, не перехід на сторінку. href=\"#\" — хак, який ламає очікування скрінрідера й клавіатурну навігацію." },
    bestPractices: ["Питай: \"це перехід чи дія?\" — перехід дає a, дія дає button.", "У формах явно вказуй type=\"button\" для кнопок, які не мають сабмітити форму."],
    remember: ["a href — навігація, button — дія.", "href=\"#\" для кнопки — типова помилка початківців.", "button у формі без type за замовчуванням = submit."],
    interviewQuestions: [{ question: "Що станеться з <button> без атрибута type усередині <form>?", answer: "Браузер трактує його як type=\"submit\" за замовчуванням, тож клік випадково відправить форму, якщо це не було наміром." }],
    summary: "a href — для переходів, button — для дій на місці. href=\"#\" замість button — одна з найпоширеніших помилок, яка ламає доступність і клавіатурну навігацію.",
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
