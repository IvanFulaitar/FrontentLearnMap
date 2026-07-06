import type { LessonOverride } from "./htmlFoundations";

/**
 * Module "Створення реальних компонентів" (html-real-components).
 * Cheat-sheet format. Assembles everything learned so far into the
 * reusable blocks every real site needs — finishes the café project
 * (v24 → v27) and adds a blog/product-card example for variety.
 */
export const htmlRealComponentsOverrides: Record<string, LessonOverride> = {
  "Header і навігація сайту": {
    whatIsIt: "Header — це <header> з логотипом і <nav> усередині. На 90% сайтів (лендінг, блог, адмінка, магазин) структура однакова: логотип зліва, посилання/дії справа.",
    whyUseIt: "Header — перше, що бачить і чіпає користувач. Погана структура тут (div замість header/nav, посилання без семантики) одразу псує і доступність, і перше враження.",
    whenToUse: ["На кожній сторінці сайту — один header угорі.", "nav усередині header для основної навігації."],
    whenNotToUse: ["Не став кілька <header> для одного логічного заголовка сторінки.", "Не забувай — посилання в navigation це <a>, а кнопки дій (наприклад, \"Увійти\" як модалка) — <button>."],
    codeWalkthroughs: [
      {
        before: "Типовий header — однаково для лендінгу, блогу чи адмінки:",
        code: `<header>
  <a href="/" class="logo">Аромат</a>
  <nav>
    <a href="#menu">Меню</a>
    <a href="#about">Про нас</a>
    <a href="#contacts">Контакти</a>
  </nav>
  <button type="button" onclick="openBookingModal()">Забронювати</button>
</header>`,
        lineNotes: ["Логотип — посилання на головну, не div.", "nav містить лише навігаційні <a>.", "Кнопка дії (не перехід) — <button>, окремо від nav."],
      },
    ],
    commonMistakes: ["header без nav усередині, коли посилань кілька.", "Кнопка дії всередині <nav>, хоча це не навігація.", "Логотип як <img> без alt чи як просто текст без посилання на головну."],
    dontDoThis: { code: `<div class="header">\n  <div class="nav">...</div>\n</div>`, explanation: "div замість header/nav — сторінка втрачає орієнтири, якими скрінрідер міг би скористатись для швидкого переходу до навігації." },
    bestPractices: ["header + nav — комбінація, яку варто пам'ятати напам'ять, вона повторюється в кожному проєкті.", "Дії (кнопки) тримай окремо від навігаційних посилань усередині nav."],
    remember: ["header + nav — стандарт для 90% сайтів.", "Посилання — <a>, дії — <button>.", "Логотип — посилання на головну сторінку."],
    interviewQuestions: [{ question: "Що покласти в <nav>, а що — поза ним, у тому ж header?", answer: "У nav — тільки навігаційні посилання (переходи між сторінками/розділами); кнопки дій без переходу (наприклад, \"Увійти\", \"Замовити\") зазвичай лишають поза nav, як окремі елементи header." }],
    summary: "header + nav — базовий, повторюваний блок будь-якого сайту. Посилання йдуть у nav, кнопки дій — поруч, а не всередині.",
    nextLessonNote: "Далі — hero-секція і картки.",
    practiceTask: {
      title: "Проєкт курсу: фінальний header",
      description: "Об'єднай логотип, nav і кнопку бронювання в один header.",
      checklist: ["header містить лого-посилання, nav і кнопку.", "nav — лише навігаційні <a>."],
      starterFiles: [{ id: "cafe-index-v21-start", path: "index.html", language: "html", label: "index.html", code: `<nav>\n  <a href="#menu">Меню</a>\n</nav>` }],
      solutionFiles: [
        {
          id: "cafe-index-v24",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<header>
  <a href="/" class="logo">Аромат</a>
  <nav>
    <a href="#menu">Меню</a>
    <a href="#about">Про нас</a>
    <a href="#contacts">Контакти</a>
  </nav>
  <button type="button" onclick="openBookingModal()">Забронювати</button>
</header>`,
          readOnly: true,
        },
      ],
      hints: ["Кнопка бронювання — поза nav, вона не є переходом."],
      expectedOutput: "Готовий header сайту кав'ярні з лого, навігацією і кнопкою дії.",
    },
    microExercises: [
      { id: "html-header-choice", kind: "choice", prompt: "Куди помістити кнопку \"Кошик\" у header інтернет-магазину?", options: ["Усередину <nav>", "У header, поза nav", "У <footer>", "У <aside>"], correctAnswer: "У header, поза nav", solution: "Кошик — дія, не навігаційний перехід, тому логічно тримати її окремо від посилань nav." },
    ],
  },

  "Hero-секція і картки": {
    whatIsIt: "Hero — перший великий блок під header: заголовок, короткий опис, головна дія (CTA). Картки — повторювані блоки з однаковою структурою (товар, стаття, послуга), кожна — окремий <article>.",
    whyUseIt: "Hero — це 3 секунди, за які відвідувач вирішує, чи лишитись на сайті. Картки, зверстані як div-суп замість article, важко підтримувати й розширювати однаково для кожного елемента.",
    whenToUse: ["Hero — один раз, одразу під header, з h1 і головним закликом до дії.", "article — для кожної картки в сітці (товар, стаття, тариф, послуга)."],
    whenNotToUse: ["Не став другий h1 у hero, якщо він уже є в header/логотипі — h1 на сторінці один.", "Не використовуй article для елементів, які не мають сенсу окремо (наприклад, одна іконка в списку переваг)."],
    codeWalkthroughs: [
      {
        before: "Hero + картки меню одним патерном:",
        code: `<section class="hero">
  <h1>Кав'ярня «Аромат»</h1>
  <p>Свіжообсмажена кава в центрі Львова</p>
  <a href="#menu">Переглянути меню</a>
</section>

<section aria-labelledby="menu-heading">
  <h2 id="menu-heading">Меню</h2>
  <article>
    <h3>Еспресо</h3>
    <p>45 грн</p>
  </article>
</section>`,
        lineNotes: ["hero — h1 + короткий опис + одна головна дія.", "Кожна картка меню — article усередині section із власним заголовком."],
      },
    ],
    commonMistakes: ["Два h1 (один у hero, інший десь ще).", "Картки без article — просто div з однаковим класом.", "Hero з кількома закликами до дії однакової ваги — губиться головна дія."],
    dontDoThis: { code: `<div class="hero">\n  <div class="title">Кав'ярня</div>\n</div>`, explanation: "div замість section+h1 — hero втрачає структурне значення заголовка сторінки для пошуковика й скрінрідера." },
    bestPractices: ["Один h1 на всю сторінку, і зазвичай саме в hero.", "Кожна картка в сітці — article, навіть якщо візуально це просто \"квадратик\"."],
    remember: ["Hero = h1 + короткий опис + одна головна дія.", "Картки в сітці — це article.", "h1 на сторінці — рівно один."],
    interviewQuestions: [{ question: "Чому картки товарів у сітці варто верстати через article, а не div?", answer: "Кожна картка — самодостатня одиниця контенту (можна показати окремо, наприклад на сторінці товару), і article одразу передає це пошуковику й скрінрідеру, на відміну від безсенсового div." }],
    summary: "Hero = перше враження за 3 секунди: h1, короткий опис, одна дія. Картки в сітці — завжди article, кожна самодостатня.",
    nextLessonNote: "Далі — footer і форма зв'язку.",
    practiceTask: {
      title: "Проєкт курсу: hero-секція",
      description: "Додай hero-секцію з h1, описом і посиланням на меню.",
      checklist: ["Є h1 (єдиний на сторінці).", "Є короткий опис.", "Є одна головна дія (посилання/кнопка)."],
      starterFiles: [{ id: "cafe-index-v24-start", path: "index.html", language: "html", label: "index.html", code: `<header>...</header>` }],
      solutionFiles: [
        {
          id: "cafe-index-v25",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<header>...</header>
<section class="hero">
  <h1>Кав'ярня «Аромат»</h1>
  <p>Свіжообсмажена кава в центрі Львова щодня з 8:00 до 20:00.</p>
  <a href="#menu">Переглянути меню</a>
</section>`,
          readOnly: true,
        },
      ],
      hints: ["h1 в hero — єдиний h1 на всій сторінці."],
      expectedOutput: "Hero-секція одразу під header з чіткою головною дією.",
    },
    microExercises: [
      { id: "html-hero-cards-choice", kind: "choice", prompt: "Що семантичніше для картки товару в каталозі інтернет-магазину?", options: ["<div class=\"product\">", "<article>"], correctAnswer: "<article>", solution: "Картка товару самодостатня — її логічно показати окремо на сторінці товару, тому це article." },
    ],
  },

  "Footer і форма зв'язку": {
    whatIsIt: "Footer — <footer> унизу сторінки: копірайт, повторна навігація, контакти, соцмережі. Форма зв'язку тут — той самий <form>/<label>, що й у бронюванні, просто менша.",
    whyUseIt: "Footer — це те, що бачить користувач, який дочитав сторінку до кінця і не знайшов потрібного вище, — погана структура тут втрачає останній шанс на конверсію.",
    whenToUse: ["footer — один раз, унизу сторінки, з копірайтом і корисними посиланнями.", "Форма зв'язку у footer — коли контакт-форма доречна на кожній сторінці сайту."],
    whenNotToUse: ["Не дублюй усю navigation з header у footer один в один — досить ключових посилань.", "Не забувай labels у формі footer — та сама помилка placeholder-замість-label трапляється тут найчастіше, бо форма \"маленька\"."],
    codeWalkthroughs: [
      {
        before: "Footer з контактами й міні-формою:",
        code: `<footer>
  <p>© 2026 Кав'ярня «Аромат»</p>
  <nav>
    <a href="#menu">Меню</a>
    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
  </nav>
  <form>
    <label for="footer-email">Розсилка новин</label>
    <input type="email" id="footer-email" name="email" required />
    <button type="submit">Підписатись</button>
  </form>
</footer>`,
        lineNotes: ["footer теж може містити свій nav — це нормально, орієнтирів кілька на сторінці можна.", "Форма у footer має ті самі правила: label, правильний type, required."],
      },
    ],
    commonMistakes: ["Footer без copyright чи року.", "Форма підписки без label (лише placeholder).", "Повне дублювання головного меню один в один замість короткого набору посилань."],
    dontDoThis: { code: `<input type="email" placeholder="Ваш email" />\n<button>OK</button>`, explanation: "Немає label — на маленьких формах у footer цю помилку роблять найчастіше, вважаючи форму \"занадто простою, щоб про це думати\"." },
    bestPractices: ["Footer — окремий <nav>, якщо посилань декілька, а не суцільний текст.", "Форма у footer підпорядковується тим самим правилам доступності, що й будь-яка інша форма сайту."],
    remember: ["footer — один раз, унизу, з копірайтом і посиланнями.", "Форма у footer — ті самі правила: label, type, required.", "Не дублюй усю навігацію header у footer."],
    interviewQuestions: [{ question: "Чи можна мати <nav> і в header, і у footer тієї самої сторінки?", answer: "Так — landmark-теги можуть повторюватись, якщо кожен логічно відповідає за свій набір посилань; це поширений і коректний патерн." }],
    summary: "Footer — копірайт, повторна навігація, контакти. Форма у footer підпорядковується тим самим правилам, що й будь-яка інша форма на сайті.",
    nextLessonNote: "Далі — стаття блогу і картка товару, для різноманітності проєктів.",
    practiceTask: {
      title: "Проєкт курсу: footer кав'ярні",
      description: "Додай footer з копірайтом, короткою навігацією і формою підписки.",
      checklist: ["Є footer з копірайтом.", "Є коротка навігація.", "Форма підписки має label."],
      starterFiles: [{ id: "cafe-index-v25-start", path: "index.html", language: "html", label: "index.html", code: `<main>...</main>` }],
      solutionFiles: [
        {
          id: "cafe-index-v26",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<main>...</main>
<footer>
  <p>© 2026 Кав'ярня «Аромат»</p>
  <nav>
    <a href="#menu">Меню</a>
    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
  </nav>
  <form>
    <label for="footer-email">Розсилка новин</label>
    <input type="email" id="footer-email" name="email" required />
    <button type="submit">Підписатись</button>
  </form>
</footer>`,
          readOnly: true,
        },
      ],
      hints: ["Форма підписки — з label, навіть якщо вона маленька."],
      expectedOutput: "Готовий footer, що завершує сторінку сайту кав'ярні.",
    },
    microExercises: [
      { id: "html-footer-find-bug", kind: "find-the-bug", prompt: "У footer форма підписки: <input type=\"email\" placeholder=\"Ваш email\" />. Що не так?", solution: "Немає label — та сама помилка, яку роблять найчастіше саме в \"маленьких\" формах footer." },
    ],
  },

  "Стаття блогу і картка товару": {
    whatIsIt: "Стаття блогу — <article> з h1/h2, датою (<time>) і автором (<cite>). Картка товару — <article> з img (alt), назвою, ціною і кнопкою дії. Обидва — найпоширеніші article в реальних сайтах поза межами café-проєкту.",
    whyUseIt: "Це два патерни, які трапляються майже в кожному фронтенд-проєкті: контент-сайт (блог, новини) і e-commerce (каталог, картка товару). Структура однакова — array article-елементів з передбачуваним набором полів.",
    whenToUse: ["Стаття блогу — article + заголовок + time + основний текст.", "Картка товару — article + img з alt + назва + ціна + кнопка «Додати в кошик»."],
    whenNotToUse: ["Не забувай time datetime у статті — дата у вигляді простого тексту не машиночитана.", "Не роби \"Додати в кошик\" посиланням <a href=\"#\"> — це дія, отже button."],
    comparisonTable: {
      headers: ["Патерн", "Обов'язкові елементи"],
      rows: [
        ["Стаття блогу", "article, h1/h2, time datetime, текст"],
        ["Картка товару", "article, img+alt, назва, ціна, button"],
      ],
    },
    codeWalkthroughs: [
      {
        before: "Картка товару інтернет-магазину (не café — для різноманітності):",
        code: `<article class="product-card">
  <img src="headphones.jpg" alt="Бездротові навушники AirSound, чорні" width="300" height="300" />
  <h3>Навушники AirSound</h3>
  <p>1299 грн</p>
  <button type="button">Додати в кошик</button>
</article>`,
        lineNotes: ["img завжди зі змістовним alt — ця тема вже знайома з модуля «Зображення».", "\"Додати в кошик\" — дія без переходу, тому button, не a."],
      },
    ],
    commonMistakes: ["Дата у статті блогу без <time datetime>.", "\"Додати в кошик\" як <a href=\"#\">.", "Картка товару без alt на зображенні."],
    dontDoThis: { code: `<a href="#" onclick="addToCart()">Додати в кошик</a>`, explanation: "Додавання товару в кошик — дія на місці, а не перехід. href=\"#\" — типовий хак, що ламає клавіатурну навігацію." },
    bestPractices: ["Тримай однаковий, передбачуваний набір полів для кожної картки в сітці (усі мають img, назву, ціну — ніщо не пропущено).", "Дата публікації статті — завжди з <time datetime=\"...\">, навіть якщо видно лише 'відносний' текст (\"3 дні тому\")."],
    remember: ["Стаття блогу: article + h1/h2 + time + текст.", "Картка товару: article + img(alt) + назва + ціна + button.", "\"Додати в кошик\" — button, не посилання."],
    interviewQuestions: [{ question: "Що не так із <a href=\"#\">Додати в кошик</a>?", answer: "Це дія без навігації, замаскована під посилання; href=\"#\" не веде нікуди реально, ламає клавіатурну поведінку і контекстне меню — тут потрібен <button>." }],
    summary: "Стаття блогу і картка товару — два найпоширеніші реальні article-патерни поза межами одного проєкту. Обидва спираються на те, що вже вивчено: семантику, alt, button проти a.",
    nextLessonNote: "Реальні компоненти зібрано. Далі — як мислити фронтенд-розробником: аналіз дизайну і розбиття сторінки на секції.",
    microExercises: [
      { id: "html-blog-product-choice", kind: "choice", prompt: "У картці товару потрібна дія \"Додати в кошик\", без переходу на нову сторінку. Що обрати?", options: ["<a href=\"#\">", "<button>", "<a href=\"/cart\">", "<div onclick>"], correctAnswer: "<button>", solution: "Дія без навігації — це завжди button, не посилання." },
    ],
  },
};
