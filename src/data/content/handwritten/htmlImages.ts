import type { LessonOverride } from "./htmlFoundations";

/**
 * Module "Зображення" (html-images). Continues the café project: adds a
 * photo of the interior, then upgrades it to a responsive image.
 */
export const htmlImagesOverrides: Record<string, LessonOverride> = {
  "Зображення та альтернативний текст": {
    whatIsIt: "<img src=\"...\" alt=\"...\"> вставляє зображення. alt — текстова заміна картинки для тих, хто її не бачить: скрінрідер, повільний інтернет, зламане посилання.",
    whyUseIt: "Без alt зображення для частини користувачів просто не існує — ні сенсу, ні опису, нічого.",
    whenToUse: ["Фото товару, ілюстрація статті, графік — завжди зі змістовним alt.", "width/height — на кожному <img>, щоб уникнути стрибків макета."],
    comparisonTable: {
      headers: ["alt", "Результат для скрінрідера"],
      rows: [
        ["відсутній", "Зачитує назву файлу (headphones.jpg)"],
        ["alt=\"картинка\"", "Марно, немає інформації"],
        ["alt=\"Бездротові навушники AirSound\"", "Зрозумілий опис"],
      ],
    },
    whenNotToUse: ["Не залишай alt порожнім для змістовних зображень.", "Не пиши alt=\"картинка\" — це те саме, що відсутність alt."],
    codeWalkthroughs: [
      {
        before: "Три варіанти alt для того самого фото:",
        code: `<img src="headphones.jpg" /> <!-- alt відсутній -->
<img src="headphones.jpg" alt="картинка" /> <!-- марно -->
<img src="headphones.jpg" alt="Бездротові навушники AirSound чорного кольору" width="400" height="300" />`,
        lineNotes: ["Без alt скрінрідер зачитує назву файлу.", "\"картинка\" не додає користі.", "width/height резервують місце заздалегідь."],
        after: "Правильний alt робить сторінку функціональною, навіть коли зображення не завантажилось.",
      },
    ],
    commonMistakes: ["Порожній alt для змістовних зображень.", "alt=\"зображення\"/\"картинка\".", "Відсутність width/height — причина layout shift."],
    dontDoThis: { code: `<img src="cake.jpg" alt="зображення">`, explanation: "\"зображення\" не описує, що на фото. Потрібен конкретний опис: \"Шоколадний торт із малиною на білій тарілці\"." },
    bestPractices: ["Питай себе: \"що я скажу другу по телефону, щоб він зрозумів картинку?\"", "Для декоративних елементів свідомо став alt=\"\"."],
    remember: ["alt — текстова заміна картинки, не формальність.", "Порожній alt=\"\" — тільки для декору.", "width/height запобігають стрибкам макета."],
    interviewQuestions: [{ question: "Коли alt має бути порожнім рядком?", answer: "Коли зображення суто декоративне і не додає інформації, якої немає в тексті поруч." }],
    summary: "alt — не формальність, а реальна заміна картинки для тих, хто її не бачить. Змістовним зображенням — опис, декоративним — alt=\"\", завжди з width/height.",
    proTip: "Lighthouse у DevTools одразу підсвічує зображення без alt — прогони аудит перед публікацією.",
    nextLessonNote: "Далі зробимо це зображення адаптивним для мобільних.",
    practiceTask: {
      title: "Проєкт курсу: фото інтер'єру",
      description: "Додай до розділу «Про нас» фото інтер'єру зі змістовним alt і width/height.",
      checklist: ["Додано img з реалістичним src.", "alt описує, що на фото.", "Вказано width і height."],
      starterFiles: [{ id: "cafe-index-v5b-start", path: "index.html", language: "html", label: "index.html", code: `<h2 id="about">Про нас</h2>\n<p>Ми обсмажуємо зерно самі щотижня.</p>` }],
      solutionFiles: [
        {
          id: "cafe-index-v7",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<h2 id="about">Про нас</h2>
<p>Ми обсмажуємо зерно самі щотижня.</p>
<img src="interior.jpg" alt="Затишний зал кав'ярні «Аромат» з дерев'яними столиками" width="640" height="420" />`,
          readOnly: true,
        },
      ],
      hints: ["Уяви, що описуєш фото другу по телефону."],
      expectedOutput: "Розділ «Про нас» із фото, яке не викликає стрибка макета під час завантаження.",
    },
    microExercises: [
      { id: "html-images-find-bug", kind: "find-the-bug", prompt: "Що не так: <img src=\"cake.jpg\" alt=\"зображення\">?", solution: "alt не описує зміст фото — формальна відписка без користі." },
      { id: "html-images-choice", kind: "choice", prompt: "Декоративна іконка поруч із текстом \"Кава\" не додає інформації. Який alt правильний?", options: ["alt=\"іконка кави\"", "alt=\"\"", "без атрибута", "alt=\"cup.svg\""], correctAnswer: "alt=\"\"", solution: "Порожній alt — свідомий сигнал пропустити декоративний елемент." },
    ],
  },

  "Адаптивні зображення: picture, srcset і lazy loading": {
    whatIsIt: "srcset дає браузеру кілька файлів різного розміру одного зображення. loading=\"lazy\" відкладає завантаження, доки картинка не наблизиться до екрана.",
    whyUseIt: "Фото на 2 МБ чудове на моніторі, але на мобільному з повільним інтернетом — це секунди очікування заради картинки вдвічі меншої за розміром екрана.",
    whenToUse: ["srcset — для будь-якого великого фото (hero-банери, фото товарів).", "loading=\"lazy\" — для всього, що НЕ в першому екрані."],
    comparisonTable: {
      headers: ["Зображення", "loading=\"lazy\"?"],
      rows: [
        ["Hero-банер угорі сторінки", "✘ ні — видно одразу"],
        ["Фото в кінці статті", "✔ так"],
        ["Іконка в footer", "✔ так"],
        ["Логотип у header", "✘ ні"],
      ],
    },
    whenNotToUse: ["Не став loading=\"lazy\" на головне зображення у верхній частині сторінки — це сповільнить його появу."],
    codeWalkthroughs: [
      {
        before: "Фото інтер'єру стає адаптивним:",
        code: `<img
  src="interior-800.jpg"
  srcset="interior-480.jpg 480w, interior-800.jpg 800w, interior-1600.jpg 1600w"
  sizes="(max-width: 600px) 100vw, 640px"
  alt="Затишний зал кав'ярні «Аромат»"
  width="640" height="420"
  loading="lazy"
/>`,
        lineNotes: ["srcset перелічує варіанти файлу з реальною шириною.", "sizes підказує браузеру очікувану ширину на екрані.", "loading=\"lazy\" доречний — фото не в першому екрані."],
        after: "На телефоні завантажиться легший файл, на моніторі — важчий, і лише коли потрібно.",
      },
    ],
    commonMistakes: ["loading=\"lazy\" на hero-зображенні.", "srcset без атрибута sizes.", "srcset лише з одним варіантом файлу — сенсу нема."],
    dontDoThis: { code: `<img src="hero.jpg" loading="lazy" />  <!-- hero-фото у верхній частині сторінки -->`, explanation: "Користувач бачить це фото одразу — відкладати його появу означає навмисно сповільнити те, що має з'явитись першим." },
    bestPractices: ["Готуй 2-3 розміри для великих фото.", "loading=\"lazy\" — на все поза першим екраном, і тільки там."],
    remember: ["srcset дає браузеру вибір розміру файлу.", "loading=\"lazy\" — тільки для зображень поза першим екраном."],
    interviewQuestions: [{ question: "Чому loading=\"lazy\" шкодить hero-зображенню?", answer: "Воно відкладає завантаження, доки елемент не наблизиться до видимої області — а hero видно одразу при відкритті сторінки." }],
    summary: "srcset дає браузеру вибрати оптимальний розмір файлу, loading=\"lazy\" економить трафік для зображень поза екраном. Разом вони суттєво прискорюють сторінку на мобільних.",
    proTip: "Виміряй реальний вплив через Lighthouse — метрика LCP (Largest Contentful Paint) прямо залежить від швидкості головного зображення.",
    nextLessonNote: "Далі — списки: як структурувати меню кав'ярні.",
    practiceTask: {
      title: "Проєкт курсу: адаптивне фото",
      description: "Онови фото інтер'єру: додай srcset, sizes і loading=\"lazy\".",
      checklist: ["Додано srcset з кількома розмірами.", "Додано sizes.", "Додано loading=\"lazy\"."],
      starterFiles: [{ id: "cafe-index-v7-start", path: "index.html", language: "html", label: "index.html", code: `<img src="interior.jpg" alt="Затишний зал кав'ярні" width="640" height="420" />` }],
      solutionFiles: [
        {
          id: "cafe-index-v8",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<img
  src="interior-800.jpg"
  srcset="interior-480.jpg 480w, interior-800.jpg 800w, interior-1600.jpg 1600w"
  sizes="(max-width: 600px) 100vw, 640px"
  alt="Затишний зал кав'ярні «Аромат»"
  width="640" height="420"
  loading="lazy"
/>`,
          readOnly: true,
        },
      ],
      hints: ["Це фото не в першому екрані — lazy тут доречний."],
      expectedOutput: "Те саме фото, але легше на мобільних і не завантажується, доки не потрібно.",
    },
    microExercises: [
      { id: "html-responsive-img-choice", kind: "choice", prompt: "Яке зображення НЕ варто позначати loading=\"lazy\"?", options: ["Фото в кінці статті", "Головне hero-зображення на весь екран", "Іконка у footer", "Фото у відгуках внизу сторінки"], correctAnswer: "Головне hero-зображення на весь екран", solution: "Hero видно одразу — lazy loading тут лише шкодить." },
    ],
  },
};
