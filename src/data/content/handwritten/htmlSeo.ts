import type { LessonOverride } from "./htmlFoundations";

/**
 * Module "SEO основи" (html-seo). Cheat-sheet format. Finishes the café
 * project's <head> — v21 → v24.
 */
export const htmlSeoOverrides: Record<string, LessonOverride> = {
  "Title і description для пошукових систем": {
    whatIsIt: "<title> — заголовок у вкладці й перший рядок у Google. <meta name=\"description\"> — короткий опис під заголовком у результатах пошуку. Обидва прямо впливають, чи натиснуть на твій сайт.",
    whyUseIt: "Однаковий title на всіх сторінках сайту ('Головна') — це втрачений клік у пошуку: користувач не розуміє, яка сторінка перед ним, і не бачить причини натиснути саме на неї.",
    whenToUse: ["На кожній сторінці — свій унікальний title.", "description пиши як речення для людини, орієнтоване на клік, а не список ключових слів."],
    whenNotToUse: ["Не роби title однаковим на всіх сторінках сайту.", "Не пиши description як \"кава, львів, кав'ярня, десерти\" через кому — Google це ігнорує чи обрізає."],
    comparisonTable: {
      headers: ["Тег", "Орієнтовна довжина"],
      rows: [
        ["title", "До ~60 символів"],
        ["meta description", "До ~155 символів"],
      ],
    },
    codeWalkthroughs: [
      {
        code: `<title>Кав'ярня «Аромат» — свіжообсмажена кава у Львові</title>
<meta name="description" content="Кав'ярня «Аромат» у центрі Львова: власна обсмажувальня, затишний зал і бронювання столиків онлайн." />`,
        lineNotes: ["title — назва + унікальне уточнення (місто, послуга).", "description — повне речення, орієнтоване на те, чому людина повинна натиснути саме сюди."],
      },
    ],
    commonMistakes: ["Однаковий title на кожній сторінці сайту.", "description як перелік ключових слів через кому.", "Відсутній description — Google сам вирізає випадковий уривок тексту сторінки."],
    dontDoThis: { code: `<meta name="description" content="кава, львів, кав'ярня, десерти, обсмажування">`, explanation: "Список слів через кому не читається як речення і не переконує людину клікнути — Google також знижує довіру до таких описів." },
    bestPractices: ["Пиши title і description так, ніби рекламуєш сторінку одним реченням у пошуковій видачі.", "Кожна сторінка сайту — з унікальним title і description."],
    remember: ["title — до ~60 символів, унікальний на кожній сторінці.", "description — речення для людини, до ~155 символів.", "Обидва прямо впливають на клікабельність у пошуку."],
    interviewQuestions: [{ question: "Чому title не варто робити однаковим на всіх сторінках сайту?", answer: "Однаковий title не дає користувачу зрозуміти різницю між сторінками в результатах пошуку чи вкладках браузера і знижує клікабельність кожної окремої сторінки." }],
    summary: "title і description — це реклама сторінки в пошуку. Унікальні, змістовні, орієнтовані на клік — а не список ключових слів.",
    nextLessonNote: "Далі — як сайт виглядає, коли ним діляться в месенджерах і соцмережах.",
    practiceTask: {
      title: "Проєкт курсу: title і description кав'ярні",
      description: "Онови title і додай description для головної сторінки сайту кав'ярні.",
      checklist: ["title унікальний і до ~60 символів.", "description — речення до ~155 символів."],
      starterFiles: [{ id: "cafe-head-v20-start", path: "index.html", language: "html", label: "index.html (head)", code: `<title>Кав'ярня «Аромат»</title>` }],
      solutionFiles: [
        {
          id: "cafe-head-v21",
          path: "index.html",
          language: "html",
          label: "index.html (head)",
          code: `<title>Кав'ярня «Аромат» — свіжообсмажена кава у Львові</title>
<meta name="description" content="Кав'ярня «Аромат» у центрі Львова: власна обсмажувальня, затишний зал і бронювання столиків онлайн." />`,
          readOnly: true,
        },
      ],
      hints: ["Уяви, що це рядок у результатах Google — чи схочеш ти клікнути?"],
      expectedOutput: "head з унікальним title і переконливим description.",
    },
    microExercises: [
      { id: "html-seo-title-choice", kind: "choice", prompt: "Який опис кращий для SEO?", options: ["\"кава, львів, десерти, обсмажування\"", "\"Кав'ярня «Аромат» у центрі Львова: свіжа кава щодня з 8:00.\"", "\"Кав'ярня\"", "\"Найкраща\""], correctAnswer: "\"Кав'ярня «Аромат» у центрі Львова: свіжа кава щодня з 8:00.\"", solution: "Це повне речення, орієнтоване на людину, а не список слів." },
    ],
  },

  "Open Graph і прев'ю в соцмережах": {
    whatIsIt: "Open Graph (og:title, og:description, og:image) — метатеги, які визначають, як сайт виглядає, коли посиланням діляться у Facebook, Telegram, Twitter/X чи Viber.",
    whyUseIt: "Без Open Graph месенджер сам вгадує картинку й текст прев'ю — часто це випадковий уривок або взагалі порожній прямокутник, що знижує кількість переходів по посиланню.",
    whenToUse: ["На головній сторінці й будь-якій сторінці, якою реально діляться (стаття, товар, подія).", "og:image — завжди конкретне зображення, мінімум 1200×630px."],
    whenNotToUse: ["Не залишай og:image порожнім чи вказаним на неіснуючий файл — прев'ю буде зламаним.", "Не копіюй один і той самий og:title на всі сторінки — це та сама помилка, що з <title>."],
    comparisonTable: {
      headers: ["Тег", "Що задає"],
      rows: [
        ["og:title", "Заголовок у прев'ю"],
        ["og:description", "Опис у прев'ю"],
        ["og:image", "Картинка прев'ю"],
        ["og:url", "Канонічне посилання прев'ю"],
      ],
    },
    codeWalkthroughs: [
      {
        code: `<meta property="og:title" content="Кав'ярня «Аромат» — Львів" />
<meta property="og:description" content="Свіжообсмажена кава та затишний зал у центрі Львова." />
<meta property="og:image" content="https://aroma-cafe.com/og-cover.jpg" />
<meta property="og:url" content="https://aroma-cafe.com" />`,
        lineNotes: ["og:image має бути абсолютним URL (з https://), а не відносним шляхом.", "Розмір og:image зазвичай 1200×630px для чіткого прев'ю."],
      },
    ],
    commonMistakes: ["og:image як відносний шлях замість повного URL.", "Відсутність og-тегів взагалі — прев'ю виглядає порожнім або випадковим.", "Картинка og:image меншого розміру, ніж очікує месенджер, — розмита у прев'ю."],
    dontDoThis: { code: `<meta property="og:image" content="images/photo.jpg">`, explanation: "Відносний шлях не працює для зовнішніх сервісів (Facebook, Telegram) — їм потрібен повний URL із https://, інакше картинка прев'ю не завантажиться." },
    bestPractices: ["Завжди перевіряй прев'ю через безкоштовний Open Graph debugger перед публікацією посилання.", "Готуй окреме og:image 1200×630px, не переви­користовуй логотип чи маленьку іконку."],
    remember: ["Open Graph керує прев'ю в месенджерах і соцмережах.", "og:image — завжди повний URL, мінімум 1200×630px.", "Без цих тегів прев'ю виглядає випадковим або порожнім."],
    interviewQuestions: [{ question: "Чому og:image потребує абсолютного URL, а не відносного шляху?", answer: "Прев'ю генерує зовнішній сервіс (Facebook, Telegram), який завантажує картинку зі свого сервера, а не з контексту сторінки, — тому йому потрібна повна, самодостатня адреса." }],
    summary: "Open Graph визначає, як сайт виглядає в посиланнях у месенджерах. og:title/description/image — мінімальний набір, і og:image завжди повний URL.",
    nextLessonNote: "Далі — favicon, robots.txt і canonical URL.",
    practiceTask: {
      title: "Проєкт курсу: Open Graph для кав'ярні",
      description: "Додай og:title, og:description і og:image для сайту кав'ярні.",
      checklist: ["og:title заповнено.", "og:description заповнено.", "og:image — повний URL."],
      starterFiles: [{ id: "cafe-head-v21-start", path: "index.html", language: "html", label: "index.html (head)", code: `<title>Кав'ярня «Аромат» — свіжообсмажена кава у Львові</title>` }],
      solutionFiles: [
        {
          id: "cafe-head-v22",
          path: "index.html",
          language: "html",
          label: "index.html (head)",
          code: `<title>Кав'ярня «Аромат» — свіжообсмажена кава у Львові</title>
<meta property="og:title" content="Кав'ярня «Аромат» — Львів" />
<meta property="og:description" content="Свіжообсмажена кава та затишний зал у центрі Львова." />
<meta property="og:image" content="https://aroma-cafe.com/og-cover.jpg" />`,
          readOnly: true,
        },
      ],
      hints: ["og:image обов'язково з https://, не відносний шлях."],
      expectedOutput: "Посилання на сайт кав'ярні тепер показує гарне прев'ю в Telegram/Facebook.",
    },
    microExercises: [
      { id: "html-og-find-bug", kind: "find-the-bug", prompt: "Що не так: <meta property=\"og:image\" content=\"photo.jpg\">?", solution: "Відносний шлях — зовнішні сервіси не зможуть завантажити картинку без повного URL." },
    ],
  },

  "Favicon, robots.txt і canonical URL": {
    whatIsIt: "favicon — маленька іконка сайту у вкладці браузера. robots.txt — файл, що каже пошуковим ботам, які сторінки індексувати. <link rel=\"canonical\"> — вказує основну версію сторінки, якщо є дублікати.",
    whyUseIt: "Без canonical URL сторінка, доступна за кількома адресами (з www і без, з параметрами і без), сприймається Google як дублікати — і жодна версія не отримує повної переваги в пошуку.",
    whenToUse: ["favicon — на кожному сайті, це базова впізнаваність у вкладках.", "canonical — коли одна й та сама сторінка доступна за різними URL (фільтри, параметри, www/не-www)."],
    whenNotToUse: ["Не блокуй у robots.txt сторінки, які хочеш бачити в пошуку, — часта помилка новачків: Disallow: / забороняє індексацію всього сайту.", "Не став canonical на чужий домен випадково — це прибере твою сторінку з видачі на користь іншої."],
    comparisonTable: {
      headers: ["Файл/тег", "Навіщо"],
      rows: [
        ["favicon.ico / link rel=\"icon\"", "Іконка у вкладці браузера"],
        ["robots.txt", "Каже ботам, що можна індексувати"],
        ["link rel=\"canonical\"", "Основна версія сторінки серед дублікатів"],
      ],
    },
    codeWalkthroughs: [
      {
        code: `<link rel="icon" href="/favicon.ico" />
<link rel="canonical" href="https://aroma-cafe.com/" />`,
        lineNotes: ["favicon підключається так само, як інші посилання в head.", "canonical вказує на \"головну\" адресу цієї сторінки серед можливих варіантів URL."],
      },
    ],
    commonMistakes: ["robots.txt із Disallow: / — випадково забороняє індексацію всього сайту.", "Відсутній favicon — сайт виглядає незавершеним у вкладках і закладках.", "canonical, що вказує на неправильну чи стару адресу."],
    dontDoThis: { code: `User-agent: *\nDisallow: /`, explanation: "Це robots.txt, який забороняє індексацію АБСОЛЮТНО всього сайту всіма пошуковими ботами — часта фатальна помилка, скопійована без розуміння." },
    bestPractices: ["Перевіряй robots.txt перед публікацією — Disallow: / на проді видаляє сайт із пошуку.", "Став canonical на кожній сторінці, навіть якщо дублікатів поки немає, — це страховка на майбутнє."],
    remember: ["favicon — впізнаваність у вкладці.", "robots.txt керує доступом ботів до індексації.", "canonical позначає основну версію серед дублікатів URL."],
    interviewQuestions: [{ question: "Що станеться, якщо в robots.txt лишити Disallow: / на робочому сайті?", answer: "Усі пошукові боти, що дотримуються robots.txt, перестануть індексувати сайт повністю — він поступово зникне з результатів пошуку." }],
    summary: "favicon — впізнаваність, robots.txt — контроль індексації, canonical — боротьба з дублікатами URL. Усі три — маленькі деталі з великим впливом на SEO.",
    nextLessonNote: "SEO готове. Далі — збираємо реальні компоненти сайту з усього вивченого.",
    practiceTask: {
      title: "Проєкт курсу: фінальні SEO-деталі",
      description: "Додай favicon і canonical URL для сайту кав'ярні.",
      checklist: ["Підключено favicon.", "Додано canonical на головний домен."],
      starterFiles: [{ id: "cafe-head-v22-start", path: "index.html", language: "html", label: "index.html (head)", code: `<title>Кав'ярня «Аромат» — свіжообсмажена кава у Львові</title>` }],
      solutionFiles: [
        {
          id: "cafe-head-v23",
          path: "index.html",
          language: "html",
          label: "index.html (head)",
          code: `<title>Кав'ярня «Аромат» — свіжообсмажена кава у Львові</title>
<link rel="icon" href="/favicon.ico" />
<link rel="canonical" href="https://aroma-cafe.com/" />`,
          readOnly: true,
        },
      ],
      hints: ["canonical завжди повний URL з https://."],
      expectedOutput: "head сайту кав'ярні з favicon і canonical URL — SEO-базу завершено.",
    },
    microExercises: [
      { id: "html-robots-predict", kind: "predict", prompt: "У robots.txt написано:\nUser-agent: *\nDisallow: /\nЩо станеться з індексацією сайту?", solution: "Усі пошукові боти перестануть індексувати весь сайт — це заборона на все." },
    ],
  },
};
