import type { LessonOverride } from "./htmlFoundations";

/**
 * Module "Форми, ціни і footer" (css-real-forms-pricing). Cheat-sheet
 * format. Continues styles.css for the café project (v17 → v21).
 */
export const cssRealFormsPricingOverrides: Record<string, LessonOverride> = {
  "Стилізація форми бронювання": {
    whatIsIt: "Стилізація полів вводу, лейблів і fieldset так, щоб форма виглядала як частина дизайну сайту, а не як стандартний непримітний браузерний елемент.",
    whyUseIt: "Стандартний вигляд <input> у різних браузерах не збігається з рештою дизайну сайту — без стилізації форма виглядає \"чужою\" на фоні решти сторінки.",
    whenToUse: ["Однакові padding, border-radius і border для всіх полів форми — узгодженість з картками й кнопками.", "display: flex; flex-direction: column; gap — для вертикального розташування label + input із рівним відступом."],
    whenNotToUse: ["Не прибирай border з input повністю без заміни — користувач має бачити межі поля.", "Не роби поля занадто вузькими на мобільному — мінімум 44px висоти для зручного натискання пальцем."],
    codeWalkthroughs: [
      {
        before: "Поле форми бронювання, узгоджене з рештою дизайну:",
        code: `.form-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-field input,
.form-field select,
.form-field textarea {
  padding: 10px 12px;
  border: 1px solid var(--border, #e5e7eb);
  border-radius: 8px;
  font: inherit;
}`,
        lineNotes: ["Один селектор для input/select/textarea — узгоджений вигляд усіх типів полів.", "font: inherit гарантує, що поле використовує той самий шрифт, що й решта сайту (браузери інколи задають полям власний шрифт)."],
        after: "Поля форми бронювання виглядають частиною єдиного дизайну, а не стандартними браузерними елементами.",
      },
    ],
    commonMistakes: ["Забутий font: inherit — поле показує інший (часто системний) шрифт, ніж решта сайту.", "Різний border-radius на input порівняно з картками й кнопками сайту.", "Занадто малий padding — поле важко натиснути на сенсорному екрані."],
    dontDoThis: { code: `input {\n  border: none;\n  outline: none;\n}`, explanation: "Прибирає межі поля повністю без жодної заміни — користувач не бачить, де саме можна вводити текст." },
    bestPractices: ["Стилізуй усі типи полів (input/select/textarea) одним узгодженим селектором.", "Тримай мінімум 44×44px клікабельну/дотикову область для будь-якого поля чи кнопки."],
    remember: ["font: inherit — поля мають виглядати частиною сайту, а не браузера.", "Однаковий border-radius для полів, кнопок і карток.", "Мінімум 44px висоти поля для зручності на сенсорних екранах."],
    interviewQuestions: [{ question: "Чому варто явно задавати font: inherit для input/textarea/select?", answer: "Браузери за замовчуванням часто застосовують до елементів форми системний шрифт замість успадкованого від сторінки — font: inherit синхронізує вигляд полів з рештою дизайну." }],
    summary: "Однаковий border-radius, padding і font: inherit для всіх типів полів роблять форму частиною дизайну сайту, а не стандартним браузерним елементом.",
    nextLessonNote: "Далі — стани валідації: як показати помилку чи успіх стилями.",
    practiceTask: {
      title: "Проєкт курсу: стилізація форми бронювання",
      description: "Стилізуй поля форми бронювання кав'ярні узгоджено з рештою дизайну.",
      checklist: ["Однаковий border-radius для всіх полів.", "font: inherit застосовано.", "Достатній padding для зручного натискання."],
      starterFiles: [{ id: "cafe-css-v17-start", path: "styles.css", language: "css", label: "styles.css", code: `.form-field {\n}` }],
      solutionFiles: [
        {
          id: "cafe-css-v18a",
          path: "styles.css",
          language: "css",
          label: "styles.css",
          code: `.form-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-field input,
.form-field select,
.form-field textarea {
  padding: 10px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font: inherit;
}`,
          readOnly: true,
        },
      ],
      hints: ["Один селектор для input, select і textarea одразу."],
      expectedOutput: "Форма бронювання виглядає узгоджено з рештою сайту кав'ярні.",
    },
    microExercises: [
      { id: "css-form-fields-choice", kind: "choice", prompt: "Поле input виглядає іншим шрифтом, ніж решта сайту. Що додати?", options: ["border: none", "font: inherit", "color: inherit", "outline: none"], correctAnswer: "font: inherit", solution: "font: inherit змушує поле використовувати той самий шрифт, що й сторінка, замість браузерного за замовчуванням." },
    ],
  },

  "Стани валідації полів": {
    whatIsIt: ":focus-visible показує, яке поле активне зараз. :invalid реагує на некоректне значення (за атрибутами HTML — required, type=email тощо). :disabled стилізує неактивні поля.",
    whyUseIt: "Форма без візуального відгуку на помилку змушує користувача здогадуватись, чому кнопка \"Надіслати\" не спрацювала — стани валідації дають миттєвий, зрозумілий сигнал.",
    whenToUse: [":focus-visible — помітна рамка чи тінь навколо активного поля.", ":invalid — червона рамка чи іконка для полів з некоректним значенням (обов'язково разом із текстом помилки з модуля HTML-форм, не лише кольором).", ":disabled — приглушений вигляд для полів, що тимчасово недоступні."],
    whenNotToUse: ["Не покладайся лише на колір для :invalid — частина користувачів не розрізняє кольори; текст помилки (з HTML-курсу) обов'язковий.", "Не стилізуй :invalid одразу при завантаженні порожньої обов'язкової форми — це виглядає так, ніби користувач уже щось зробив не так."],
    codeWalkthroughs: [
      {
        before: "Стани полів форми бронювання:",
        code: `.form-field input:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.form-field input:invalid:not(:placeholder-shown) {
  border-color: #dc2626;
}

.form-field input:disabled {
  background: #f3f4f6;
  opacity: 0.6;
}`,
        lineNotes: [":not(:placeholder-shown) відкладає стиль помилки, доки поле порожнє й ще не займане — інакше обов'язкове поле виглядає \"помилковим\" одразу при відкритті форми.", ":disabled приглушує поле, сигналізуючи, що воно тимчасово недоступне."],
        after: "Поля форми бронювання дають чіткий візуальний відгук на кожен стан: фокус, помилку, недоступність.",
      },
    ],
    commonMistakes: [":invalid без :not(:placeholder-shown) — порожнє обов'язкове поле виглядає помилковим одразу, ще до взаємодії користувача.", "Лише колір рамки для помилки, без тексту пояснення.", "Забутий стиль :disabled — неактивні поля виглядають так само, як активні, і плутають користувача."],
    dontDoThis: { code: `input:invalid { border-color: red; }`, explanation: "Без :not(:placeholder-shown) кожне порожнє обов'язкове поле матиме червону рамку одразу при відкритті форми, ще до того, як користувач щось ввів." },
    bestPractices: ["Комбінуй :invalid з :not(:placeholder-shown) чи класом, доданим після спроби відправки — щоб не лякати користувача завчасно.", "Завжди супроводжуй колір помилки текстом (aria-describedby з HTML-курсу форм)."],
    remember: [":focus-visible — активне поле зараз.", ":invalid:not(:placeholder-shown) — уникає передчасного \"помилкового\" вигляду порожньої форми.", "Колір ніколи не єдиний сигнал помилки — потрібен текст."],
    interviewQuestions: [{ question: "Чому :invalid саме по собі може погіршити UX форми?", answer: "Без додаткових умов :invalid спрацьовує одразу для порожніх обов'язкових полів при завантаженні сторінки, показуючи помилку ще до того, як користувач почав взаємодію з формою." }],
    summary: ":focus-visible, :invalid і :disabled дають візуальний відгук на кожен стан поля. :invalid варто комбінувати з :not(:placeholder-shown), щоб не показувати помилку завчасно.",
    nextLessonNote: "Далі — прайс-таблиця кав'ярні, оформлена як картки.",
    practiceTask: {
      title: "Проєкт курсу: стани полів форми бронювання",
      description: "Додай стилі :focus-visible і :invalid до полів форми бронювання.",
      checklist: [":focus-visible має помітний outline.", ":invalid використовує :not(:placeholder-shown)."],
      starterFiles: [{ id: "cafe-css-v18a-start", path: "styles.css", language: "css", label: "styles.css", code: `.form-field input {\n  border: 1px solid #e5e7eb;\n}` }],
      solutionFiles: [
        {
          id: "cafe-css-v18b",
          path: "styles.css",
          language: "css",
          label: "styles.css",
          code: `.form-field input {
  border: 1px solid #e5e7eb;
}

.form-field input:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.form-field input:invalid:not(:placeholder-shown) {
  border-color: #dc2626;
}`,
          readOnly: true,
        },
      ],
      hints: [":not(:placeholder-shown) запобігає передчасному вигляду помилки."],
      expectedOutput: "Поля форми бронювання чітко показують стан фокусу й помилки.",
    },
    microExercises: [
      { id: "css-invalid-predict", kind: "predict", prompt: "input:invalid { border-color: red; } без :not(:placeholder-shown). Як виглядає порожнє обов'язкове поле при завантаженні форми?", solution: "Одразу з червоною рамкою, хоча користувач ще нічого не вводив, — це виглядає як передчасна помилка." },
    ],
  },

  "Прайс-таблиця як картки": {
    whatIsIt: "Перетворення таблиці цін (з HTML-курсу) на картки через CSS Grid: кожен рядок стає окремою карткою з ціною, виділеною типографічно (більший розмір, вага чи колір).",
    whyUseIt: "Таблиця залишається семантично таблицею для доступності (th/scope з HTML-курсу), але візуально картки читаються легше й сучасніше, ніж рядки з лініями.",
    whenToUse: ["Grid для розташування карток цін у ряд/сітку.", "Виділення ціни через більший font-size і font-weight — вона найважливіша інформація картки."],
    whenNotToUse: ["Не міняй семантичні теги (table/th/scope) заради стилю — CSS може повністю змінити вигляд, зберігши доступну розмітку.", "Не роби всі картки прайсу однаково нейтральними, якщо один варіант — рекомендований; виділи його (рамка кольору бренду, значок)."],
    codeWalkthroughs: [
      {
        before: "Прайс кав'ярні як картки, з виділеною ціною:",
        code: `.price-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.price-card .amount {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-primary);
}`,
        lineNotes: ["price-grid використовує вже знайомий repeat(auto-fit, minmax(...)) з модуля Grid.", ".amount виділяється розміром, вагою і кольором бренду — це найважливіша інформація в картці."],
        after: "Прайс кав'ярні виглядає як сучасні картки, а не як стандартна таблиця з лініями.",
      },
    ],
    commonMistakes: ["Заміна семантичної table на div заради стилю — губиться доступність без потреби.", "Ціна не виділена нічим — губиться серед іншого тексту картки.", "Рекомендований варіант нічим не відрізняється від решти."],
    dontDoThis: { code: `<div class="price-row">Еспресо — 45 грн</div>`, explanation: "Заміна table на div заради \"кращого вигляду\" — насправді CSS міг би повністю змінити вигляд table, зберігши семантику для скрінрідерів." },
    bestPractices: ["Стилізуй наявну семантичну розмітку, не заміняй її на div заради зовнішнього вигляду.", "Візуально виділяй найважливішу інформацію картки (ціну) розміром і вагою шрифту, а не лише кольором."],
    remember: ["CSS може повністю змінити вигляд таблиці, зберігши її доступну структуру.", "Ціна — головна інформація картки, виділяй її явно.", "Рекомендований варіант має візуально виділятись."],
    interviewQuestions: [{ question: "Чи потрібно міняти <table> на <div>, щоб зробити прайс схожим на картки?", answer: "Ні — CSS (Grid, display: block на елементах таблиці за потреби) може повністю змінити зовнішній вигляд, зберігши семантичну структуру table/th/scope для скрінрідерів." }],
    summary: "Прайс кав'ярні можна перетворити на сучасні картки через CSS, зберігши семантичну table-розмітку з HTML-курсу. Ціна — головний елемент, який варто виділяти найпомітніше.",
    nextLessonNote: "Далі — footer-макет на Grid, завершення сторінки.",
    practiceTask: {
      title: "Проєкт курсу: картки прайсу кав'ярні",
      description: "Стилізуй прайс-таблицю як сітку карток з виділеною ціною.",
      checklist: ["Grid для сітки карток.", "Ціна виділена розміром і вагою шрифту."],
      starterFiles: [{ id: "cafe-css-v18b-start", path: "styles.css", language: "css", label: "styles.css", code: `.price-grid {\n}` }],
      solutionFiles: [
        {
          id: "cafe-css-v19a",
          path: "styles.css",
          language: "css",
          label: "styles.css",
          code: `.price-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.price-card {
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  padding: 16px;
}

.price-card .amount {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-primary);
}`,
          readOnly: true,
        },
      ],
      hints: ["Тіні й радіуси — ті самі, що й у картках меню, для узгодженості."],
      expectedOutput: "Прайс кав'ярні у вигляді карток із виділеною ціною.",
    },
    microExercises: [
      { id: "css-price-cards-choice", kind: "choice", prompt: "Потрібно виділити один із трьох варіантів прайсу як \"рекомендований\". Найкращий спосіб?", options: ["Зробити текст трохи більшим", "Додати рамку кольору бренду й значок", "Нічого не робити, це й так зрозуміло", "Написати CAPS LOCK"], correctAnswer: "Додати рамку кольору бренду й значок", solution: "Явний візуальний акцент (рамка + значок) — найзрозуміліший спосіб виділити рекомендований варіант." },
    ],
  },

  "Footer-макет на Grid": {
    whatIsIt: "Footer з кількома колонками (контакти, посилання, форма підписки) через Grid. На вузьких екранах колонки природно складаються в один стовпчик завдяки auto-fit/minmax — без окремого медіазапиту.",
    whyUseIt: "Footer — це останнє, що бачить відвідувач; розкидані без структури посилання й контакти виглядають недбало саме в кінці сторінки.",
    whenToUse: ["Grid з кількома колонками для розділів footer (контакти / посилання / підписка).", "Той самий repeat(auto-fit, minmax(...)) патерн, що й у галереї та картках."],
    whenNotToUse: ["Не роби footer суцільним текстом в один рядок, якщо в ньому кілька логічних груп інформації — це важко сканувати оком.", "Не забувай відступ (padding) footer від контенту над ним і від країв екрана."],
    codeWalkthroughs: [
      {
        before: "Footer кав'ярні: колонки, що складаються на вузьких екранах:",
        code: `.site-footer {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
  padding: 32px 24px;
  background: #1f2937;
  color: white;
}`,
        lineNotes: ["Той самий repeat(auto-fit, minmax(...)) з модуля Grid — на широкому екрані кілька колонок, на вузькому — один стовпчик.", "Темний фон і білий текст — типовий, контрастний стиль footer."],
        after: "Footer кав'ярні акуратно ділиться на колонки на десктопі й складається в стовпчик на мобільному, без жодного медіазапиту.",
      },
    ],
    commonMistakes: ["Footer без внутрішньої структури — суцільний блок тексту й посилань.", "Колір тексту footer, що зливається з темним фоном (недостатній контраст).", "Забутий padding — контент footer притиснутий до країв екрана."],
    dontDoThis: { code: `.site-footer { color: #374151; background: #1f2937; }`, explanation: "Темно-сірий текст на темному фоні — недостатній контраст, текст ледь читається. Потрібен явно світлий колір (white чи #f3f4f6)." },
    bestPractices: ["Використовуй той самий repeat(auto-fit, minmax(...)) патерн для footer, що й для галереї/карток — узгодженість підходу по всьому сайту.", "Перевіряй контраст тексту footer на темному фоні (мінімум 4.5:1 для звичайного тексту)."],
    remember: ["Grid з auto-fit/minmax складає колонки footer на вузьких екранах автоматично.", "Контраст тексту на темному фоні footer — обов'язково перевіряти.", "padding footer так само важливий, як і в будь-якій іншій секції."],
    interviewQuestions: [{ question: "Чому той самий repeat(auto-fit, minmax(...)) патерн можна перевикористати і для галереї, і для footer?", answer: "Це загальне рішення задачі \"адаптивна кількість колонок без медіазапитів\" — воно не прив'язане до конкретного контенту, тому підходить для будь-якої сітки: фото, карток чи розділів footer." }],
    summary: "Footer на Grid з auto-fit/minmax ділиться на колонки, які природно складаються на вузьких екранах. Це та сама техніка, що й у галереї — узгоджений підхід по всьому сайту.",
    nextLessonNote: "Форми, ціни й footer готові. Далі — адаптивний дизайн: mobile-first і медіазапити для решти сторінки.",
    practiceTask: {
      title: "Проєкт курсу: footer кав'ярні",
      description: "Побудуй footer з кількома колонками (контакти, посилання, підписка) на Grid.",
      checklist: ["Grid з auto-fit/minmax.", "Достатній контраст тексту на фоні.", "padding з усіх боків."],
      starterFiles: [{ id: "cafe-css-v19a-start", path: "styles.css", language: "css", label: "styles.css", code: `.site-footer {\n}` }],
      solutionFiles: [
        {
          id: "cafe-css-v20",
          path: "styles.css",
          language: "css",
          label: "styles.css",
          code: `.site-footer {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
  padding: 32px 24px;
  background: #1f2937;
  color: white;
}`,
          readOnly: true,
        },
      ],
      hints: ["Перевір контраст білого тексту на #1f2937 — має бути достатнім."],
      expectedOutput: "Footer кав'ярні з кількома колонками, що складаються на мобільному.",
    },
    microExercises: [
      { id: "css-footer-grid-predict", kind: "predict", prompt: "Footer з grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)) переглядають на екрані шириною 380px. Скільки колонок?", solution: "Одна — 380px замало для двох колонок по 200px з gap, тому auto-fit складає все в один стовпчик." },
    ],
  },
};
