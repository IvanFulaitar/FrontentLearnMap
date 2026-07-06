import type { LessonOverride } from "./htmlFoundations";

/**
 * Module "Форми" (html-forms). Cheat-sheet format. Continues the café
 * project: builds the real "Забронювати столик" form behind the button
 * added in html-semantics (v16 → v21).
 */
export const htmlFormsOverrides: Record<string, LessonOverride> = {
  "Структура форми та підписи": {
    whatIsIt: "<form> обгортає поля вводу. Кожне поле має <label>, зв'язаний через for/id. Без цього зв'язку скрінрідер не знає, що означає поле.",
    whyUseIt: "Placeholder зникає, коли починаєш вводити текст, — якщо це єдина підказка, користувач забуває, що вводив. Label лишається завжди видимим і клікабельним.",
    whenToUse: ["Кожне поле форми — з власним label.", "Реєстрація, вхід, бронювання, оформлення замовлення, підписка на розсилку."],
    whenNotToUse: ["Не заміняй label на placeholder — це найпоширеніша помилка початківців у формах.", "Не роби два input з однаковим id — for знайде тільки перший."],
    comparisonTable: {
      headers: ["", "label", "placeholder"],
      rows: [
        ["Видно після вводу тексту", "✔ так", "✘ ні, зникає"],
        ["Клік перемикає фокус на input", "✔ так", "✘ ні"],
        ["Читає скрінрідер як назву поля", "✔ так", "✘ ні (лише як підказку)"],
      ],
    },
    codeWalkthroughs: [
      {
        code: `<form>
  <label for="guest-name">Ім'я</label>
  <input type="text" id="guest-name" name="guestName" />
</form>`,
        lineNotes: ["for=\"guest-name\" зв'язує label з input за id.", "Клік по тексту \"Ім'я\" тепер ставить фокус в поле."],
      },
    ],
    commonMistakes: ["Placeholder замість label.", "label без for (чи input без id) — зв'язок не працює.", "Форма без <form>, просто input-и в div."],
    dontDoThis: { code: `<input type="text" placeholder="Ім'я" />`, explanation: "Немає label — скрінрідер не оголосить, що це за поле, а підказка зникає після першого символу." },
    bestPractices: ["Кожен input — усередині <form> і має свій label.", "Placeholder використовуй лише як приклад формату (\"напр. 067 123 45 67\"), ніколи замість підпису."],
    remember: ["label + for/id — обов'язковий зв'язок.", "placeholder не замінює label.", "Форма завжди в <form>."],
    interviewQuestions: [{ question: "Чому placeholder не може замінити label?", answer: "Placeholder зникає під час вводу і не завжди озвучується скрінрідером як назва поля — label лишається видимим і клікабельним завжди." }],
    summary: "label + for/id — база будь-якої форми. Placeholder — лише приклад формату, ніколи не єдина підказка.",
    nextLessonNote: "Далі — типи полів: email, tel, number і решта.",
    practiceTask: {
      title: "Проєкт курсу: форма бронювання",
      description: "Створи форму бронювання столика з полем «Ім'я» з правильним label.",
      checklist: ["Є <form>.", "Є label з for.", "input має відповідний id."],
      starterFiles: [{ id: "cafe-index-v16-start", path: "index.html", language: "html", label: "index.html", code: `<button type="button" onclick="openBookingModal()">Забронювати столик</button>` }],
      solutionFiles: [
        {
          id: "cafe-index-v17",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<form id="booking-form">
  <label for="guest-name">Ім'я</label>
  <input type="text" id="guest-name" name="guestName" required />
</form>`,
          readOnly: true,
        },
      ],
      hints: ["for і id мають бути однаковим рядком."],
      expectedOutput: "Форма з полем імені, де клік по підпису ставить фокус в input.",
    },
    microExercises: [
      { id: "html-forms-find-bug", kind: "find-the-bug", prompt: "Що не так: <input type=\"text\" placeholder=\"Email\" />?", solution: "Немає label — тільки плейсхолдер, який зникає після вводу і не завжди озвучується як назва поля." },
    ],
  },

  "Типи полів і атрибути": {
    whatIsIt: "type у <input> визначає клавіатуру на мобільному й вбудовану валідацію: email перевіряє формат, number приймає лише цифри, tel показує цифрову клавіатуру.",
    whyUseIt: "type=\"text\" для номера телефону чи email змушує мобільну клавіатуру показувати літери замість цифр — дрібниця, яка щодня дратує мільйони користувачів.",
    whenToUse: ["email — для пошти.", "tel — для телефону.", "number — для кількості (наприклад, гостей).", "date — для дати бронювання."],
    whenNotToUse: ["Не став type=\"text\" \"про всяк випадок\" — губиш валідацію й правильну клавіатуру.", "Не використовуй number для номера телефону — плюс і пробіли там некоректні."],
    comparisonTable: {
      headers: ["Тип поля", "Використання"],
      rows: [
        ["email", "Адреса пошти"],
        ["tel", "Телефон"],
        ["number", "Кількість, вік"],
        ["date", "Дата"],
        ["password", "Пароль (приховує ввід)"],
      ],
    },
    codeWalkthroughs: [
      {
        code: `<label for="guests">Кількість гостей</label>
<input type="number" id="guests" name="guests" min="1" max="12" required />

<label for="phone">Телефон</label>
<input type="tel" id="phone" name="phone" required />`,
        lineNotes: ["number з min/max одразу обмежує діапазон.", "tel вмикає цифрову клавіатуру на телефоні."],
      },
    ],
    commonMistakes: ["type=\"text\" для email/tel/number.", "number для телефону (там можуть бути + і пробіли).", "Відсутність min/max там, де є природні межі (вік, кількість)."],
    dontDoThis: { code: `<input type="text" placeholder="Телефон" />`, explanation: "На мобільному з'явиться буквена клавіатура замість цифрової, і жодної валідації формату не буде." },
    bestPractices: ["Обирай тип за змістом даних, а не залишай text за замовчуванням.", "Додавай min/max/step, коли є природні межі значення."],
    remember: ["type міняє клавіатуру на мобільному й додає валідацію.", "email/tel/number/date — не просто стилі, а реальна поведінка."],
    interviewQuestions: [{ question: "Що дає type=\"email\" понад звичайний type=\"text\"?", answer: "Вбудовану перевірку формату (є @ і домен) і відповідну мобільну клавіатуру з символом @ на видному місці." }],
    summary: "Правильний type — це безкоштовна валідація й зручна клавіатура. Обирай за змістом поля, не став text скрізь.",
    nextLessonNote: "Далі — textarea, select і fieldset для складніших полів.",
    practiceTask: {
      title: "Проєкт курсу: поля бронювання",
      description: "Додай поля телефону і кількості гостей із правильними типами.",
      checklist: ["Телефон — type=\"tel\".", "Кількість гостей — type=\"number\" з min/max."],
      starterFiles: [{ id: "cafe-index-v17-start", path: "index.html", language: "html", label: "index.html", code: `<label for="guest-name">Ім'я</label>\n<input type="text" id="guest-name" name="guestName" required />` }],
      solutionFiles: [
        {
          id: "cafe-index-v18",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<label for="guest-name">Ім'я</label>
<input type="text" id="guest-name" name="guestName" required />

<label for="phone">Телефон</label>
<input type="tel" id="phone" name="phone" required />

<label for="guests">Кількість гостей</label>
<input type="number" id="guests" name="guests" min="1" max="12" required />`,
          readOnly: true,
        },
      ],
      hints: ["min/max на number обмежують діапазон."],
      expectedOutput: "Форма з трьома полями, кожне з правильним типом і клавіатурою на мобільному.",
    },
    microExercises: [
      { id: "html-input-types-choice", kind: "choice", prompt: "Поле для дати бронювання. Який тип?", options: ["text", "date", "number", "tel"], correctAnswer: "date", solution: "date дає календар і правильний формат без ручного парсингу." },
    ],
  },

  "Textarea, select і fieldset": {
    whatIsIt: "<textarea> — багаторядковий текст. <select>+<option> — випадаючий список. <fieldset>+<legend> — групування пов'язаних полів з підписом групи.",
    whyUseIt: "Коли варіантів вибору 3+ і вони взаємовиключні (наприклад, час бронювання), select зручніший за групу radio — не займає весь екран.",
    whenToUse: ["textarea — коментар, побажання, повідомлення.", "select — вибір з 4+ варіантів (час, місто, категорія).", "fieldset — групи полів, що логічно належать разом (наприклад, \"Контактні дані\")."],
    whenNotToUse: ["Не використовуй select для 2 варіантів — радіокнопки чи чекбокс зрозуміліші.", "Не роби textarea для одного слова чи короткого значення — це задача input."],
    comparisonTable: {
      headers: ["Кількість варіантів", "Що обрати"],
      rows: [
        ["2", "checkbox або radio"],
        ["3-6, видно всі одразу", "radio"],
        ["7+ або мало місця", "select"],
      ],
    },
    codeWalkthroughs: [
      {
        code: `<fieldset>
  <legend>Деталі бронювання</legend>
  <label for="time">Час</label>
  <select id="time" name="time">
    <option value="18:00">18:00</option>
    <option value="19:00">19:00</option>
  </select>
  <label for="comment">Коментар</label>
  <textarea id="comment" name="comment" rows="3"></textarea>
</fieldset>`,
        lineNotes: ["legend озвучується скрінрідером як назва всієї групи полів.", "rows задає видиму висоту textarea, не обмежує довжину тексту."],
      },
    ],
    commonMistakes: ["select для 2 варіантів замість radio/checkbox.", "fieldset без legend.", "textarea без rows — виглядає як однорядкове поле."],
    dontDoThis: { code: `<select>\n  <option>Так</option>\n  <option>Ні</option>\n</select>`, explanation: "Два взаємовиключні варіанти зручніше й швидше вибрати чекбоксом/радіокнопкою — не потрібно відкривати список." },
    bestPractices: ["fieldset+legend для будь-якої логічної групи з 2+ полів.", "select лише коли варіантів справді багато."],
    remember: ["textarea — багато тексту.", "select — багато взаємовиключних варіантів.", "fieldset+legend групує й підписує групу полів."],
    interviewQuestions: [{ question: "Коли краще radio, а коли select?", answer: "Radio — коли варіантів мало (до 5-6) і бажано бачити всі одразу; select — коли варіантів багато або обмежено місце на екрані." }],
    summary: "textarea для довгого тексту, select для багатьох варіантів, fieldset+legend для групування полів з підписом.",
    nextLessonNote: "Далі — чекбокси, радіокнопки і валідація.",
    practiceTask: {
      title: "Проєкт курсу: деталі бронювання",
      description: "Додай вибір часу через select і коментар через textarea, згрупуй у fieldset.",
      checklist: ["select із кількома варіантами часу.", "textarea для коментаря.", "Усе всередині fieldset з legend."],
      starterFiles: [{ id: "cafe-index-v18-start", path: "index.html", language: "html", label: "index.html", code: `<label for="guests">Кількість гостей</label>\n<input type="number" id="guests" min="1" max="12" />` }],
      solutionFiles: [
        {
          id: "cafe-index-v19",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<fieldset>
  <legend>Деталі бронювання</legend>
  <label for="guests">Кількість гостей</label>
  <input type="number" id="guests" min="1" max="12" />
  <label for="time">Час</label>
  <select id="time" name="time">
    <option value="18:00">18:00</option>
    <option value="19:00">19:00</option>
    <option value="20:00">20:00</option>
  </select>
  <label for="comment">Коментар</label>
  <textarea id="comment" name="comment" rows="3"></textarea>
</fieldset>`,
          readOnly: true,
        },
      ],
      hints: ["legend — перший дочірній елемент fieldset."],
      expectedOutput: "Згрупована форма з підписаним блоком «Деталі бронювання».",
    },
    microExercises: [
      { id: "html-fieldset-choice", kind: "choice", prompt: "6 контактних полів логічно належать разом. Що використати для групування?", options: ["div", "fieldset + legend", "section", "table"], correctAnswer: "fieldset + legend", solution: "fieldset групує поля семантично, legend озвучує назву групи скрінрідером." },
    ],
  },

  "Чекбокси, радіокнопки і валідація": {
    whatIsIt: "checkbox — так/ні або кілька незалежних варіантів. radio (з однаковим name) — рівно один варіант із кількох. required/pattern/min/max — вбудована HTML-валідація без JS.",
    whyUseIt: "Браузер сам перевірить required і pattern та покаже підказку — це працює навіть якщо JavaScript ще не завантажився чи впав з помилкою.",
    whenToUse: ["checkbox — згода з умовами, вибір кількох опцій (додаткові побажання).", "radio — вибір рівно одного варіанту (місце: зал/тераса).", "required — на кожному обов'язковому полі."],
    whenNotToUse: ["Не забувай однаковий name для групи radio — інакше можна вибрати кілька одразу.", "Не покладайся лише на JS-валідацію — required/pattern працюють без жодного скрипта."],
    comparisonTable: {
      headers: ["Елемент", "Скільки можна вибрати"],
      rows: [
        ["checkbox", "0 або декілька, незалежно"],
        ["radio (той самий name)", "Рівно один"],
      ],
    },
    codeWalkthroughs: [
      {
        code: `<fieldset>
  <legend>Місце</legend>
  <label><input type="radio" name="seating" value="hall" required /> Зал</label>
  <label><input type="radio" name="seating" value="terrace" /> Тераса</label>
</fieldset>

<label><input type="checkbox" name="agree" required /> Погоджуюсь з умовами</label>`,
        lineNotes: ["Однаковий name=\"seating\" робить радіокнопки взаємовиключними.", "required на checkbox змушує погодитись перед відправкою."],
      },
    ],
    commonMistakes: ["Різний name у групі radio — можна вибрати кілька одночасно.", "Немає жодного вибраного radio за замовчуванням, коли один варіант очевидно основний.", "required тільки в JS, без атрибута в HTML."],
    dontDoThis: { code: `<input type="radio" name="seat1" /> Зал\n<input type="radio" name="seat2" /> Тераса`, explanation: "Різні name роблять радіокнопки незалежними — можна вибрати обидві одразу, хоча має бути рівно один варіант." },
    bestPractices: ["Завжди перевіряй, що всі radio в групі мають однаковий name.", "Додавай required прямо в HTML, навіть якщо є JS-валідація — це резервний рівень захисту."],
    remember: ["checkbox — незалежний вибір.", "radio з однаковим name — рівно один варіант.", "required/pattern працюють без JavaScript."],
    interviewQuestions: [{ question: "Чому дві радіокнопки з різним name не працюють як група?", answer: "Браузер групує radio-кнопки саме за атрибутом name — без збігу name кожна кнопка стає незалежною, і можна вибрати кілька одразу." }],
    summary: "checkbox для незалежного вибору, radio (з однаковим name) — для одного з кількох. required/pattern дають валідацію без JS.",
    nextLessonNote: "Далі — доступні повідомлення про помилки валідації.",
    practiceTask: {
      title: "Проєкт курсу: місце і згода",
      description: "Додай вибір місця через radio і чекбокс згоди з умовами.",
      checklist: ["Радіокнопки мають однаковий name.", "Чекбокс згоди має required."],
      starterFiles: [{ id: "cafe-index-v19-start", path: "index.html", language: "html", label: "index.html", code: `<label for="comment">Коментар</label>\n<textarea id="comment" rows="3"></textarea>` }],
      solutionFiles: [
        {
          id: "cafe-index-v20",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<fieldset>
  <legend>Місце</legend>
  <label><input type="radio" name="seating" value="hall" required /> Зал</label>
  <label><input type="radio" name="seating" value="terrace" /> Тераса</label>
</fieldset>
<label for="comment">Коментар</label>
<textarea id="comment" rows="3"></textarea>
<label><input type="checkbox" name="agree" required /> Погоджуюсь з умовами</label>`,
          readOnly: true,
        },
      ],
      hints: ["Перевір, що name у радіокнопок однаковий."],
      expectedOutput: "Форма, де можна обрати рівно одне місце і потрібно погодитись з умовами.",
    },
    microExercises: [
      { id: "html-radio-find-bug", kind: "find-the-bug", prompt: "Чому можна вибрати і \"Зал\", і \"Тераса\" одночасно, якщо це radio?", solution: "У них різний атрибут name — браузер не групує їх як взаємовиключні варіанти." },
    ],
  },

  "Доступні повідомлення про помилки": {
    whatIsIt: "aria-describedby зв'язує поле з текстом помилки під ним. aria-invalid=\"true\" позначає поле як некоректне. role=\"alert\" змушує скрінрідер одразу озвучити повідомлення.",
    whyUseIt: "Червона рамка навколо поля нічого не скаже користувачу скрінрідера — потрібен текст, явно зв'язаний із полем, який озвучиться автоматично.",
    whenToUse: ["Кожне поле з помилкою валідації — aria-invalid + aria-describedby на текст помилки.", "role=\"alert\" — на блоці, що з'являється динамічно після невдалої відправки форми."],
    whenNotToUse: ["Не покладайся тільки на колір (червона рамка) — частина користувачів не розрізняє кольори або не бачить їх взагалі.", "Не додавай role=\"alert\" на статичний текст, який завжди на сторінці, — тільки на те, що з'являється саме зараз."],
    codeWalkthroughs: [
      {
        code: `<label for="phone">Телефон</label>
<input type="tel" id="phone" aria-invalid="true" aria-describedby="phone-error" />
<p id="phone-error" role="alert">Введіть номер у форматі +380XXXXXXXXX</p>`,
        lineNotes: ["aria-describedby=\"phone-error\" зв'язує поле з текстом помилки за id.", "role=\"alert\" каже скрінрідеру озвучити текст одразу, як тільки він з'явився."],
      },
    ],
    commonMistakes: ["Помилка позначена тільки кольором рамки, без тексту.", "Текст помилки не зв'язаний з полем через aria-describedby.", "aria-invalid лишається true навіть після виправлення поля."],
    dontDoThis: { code: `<input type="tel" style="border: 2px solid red" />`, explanation: "Немає жодного тексту помилки і жодного зв'язку з aria — скрінрідер не дізнається, що поле некоректне і чому." },
    bestPractices: ["Завжди супроводжуй помилку текстом, зв'язаним через aria-describedby.", "Знімай aria-invalid, щойно користувач виправив значення."],
    remember: ["Колір — недостатньо, потрібен текст помилки.", "aria-describedby зв'язує поле з поясненням.", "role=\"alert\" — для нових, щойно показаних повідомлень."],
    interviewQuestions: [{ question: "Чому самого лише червоного кольору недостатньо для позначення помилки?", answer: "Частина користувачів (дальтоніки, незрячі) не сприймає колір як сигнал — потрібен текст, зв'язаний з полем через aria-describedby." }],
    summary: "aria-invalid + aria-describedby + видимий текст помилки — мінімум для доступного повідомлення про помилку. Колір сам по собі недостатній.",
    nextLessonNote: "Форма готова. Далі — доступність в HTML загалом: семантика, скрінрідери, ARIA.",
    practiceTask: {
      title: "Проєкт курсу: помилка валідації телефону",
      description: "Додай доступне повідомлення про помилку для поля телефону.",
      checklist: ["Поле має aria-invalid і aria-describedby.", "Текст помилки має відповідний id.", "Текст помилки має role=\"alert\"."],
      starterFiles: [{ id: "cafe-index-v20-start", path: "index.html", language: "html", label: "index.html", code: `<label for="phone">Телефон</label>\n<input type="tel" id="phone" required />` }],
      solutionFiles: [
        {
          id: "cafe-index-v21",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<label for="phone">Телефон</label>
<input type="tel" id="phone" required aria-invalid="true" aria-describedby="phone-error" />
<p id="phone-error" role="alert">Введіть номер у форматі +380XXXXXXXXX</p>`,
          readOnly: true,
        },
      ],
      hints: ["id тексту помилки має точно збігатись зі значенням aria-describedby."],
      expectedOutput: "Форма бронювання кав'ярні «Аромат» завершена: контакти, поля, валідація, доступні помилки.",
    },
    microExercises: [
      { id: "html-aria-errors-choice", kind: "choice", prompt: "Як зв'язати поле з текстом помилки для скрінрідера?", options: ["Через колір рамки", "Через aria-describedby", "Через placeholder", "Ніяк, це не потрібно"], correctAnswer: "Через aria-describedby", solution: "aria-describedby явно каже скрінрідеру, який текст описує це поле." },
    ],
  },
};
