import type { LessonOverride } from "./htmlFoundations";
import type { QuizData } from "../../../types/course";

/**
 * Module "Форми" (html-forms). Cheat-sheet format. Continues the café
 * project: builds the real "Забронювати столик" form behind the button
 * added in html-semantics (v16 → v21).
 */
export const htmlFormsOverrides: Record<string, LessonOverride> = {
  "Структура форми та підписи": {
    interactiveDemo: "label-placeholder-demo",
    whatIsIt: "У попередньому уроці кнопка «Забронювати столик» стала справжнім <button>, бо клік не веде на іншу сторінку, а має відкрити форму бронювання. Але самої форми поки що не існує. <form> — тег, який обгортає всі поля вводу і визначає, куди (атрибут action) і як (атрибут method) відправити введені дані. Кожне поле супроводжує <label> — підпис, зв'язаний з полем через for та id, а сам ввід іде на сервер під іменем з атрибута name. Без label скрінрідер не розуміє, що означає поле; без name поле взагалі не потрапить у відправлені дані.",
    whyUseIt: "Placeholder зникає, коли починаєш вводити текст, — якщо це єдина підказка, користувач забуває, що вводив. Label лишається завжди видимим і клікабельним. А без name сервер просто не отримає значення поля, навіть якщо користувач усе правильно заповнив.",
    whenToUse: ["Кожне поле форми — з власним label і власним name.", "Реєстрація, вхід, бронювання, оформлення замовлення, підписка на розсилку.", "method=\"get\" — для пошуку, фільтрів, сторінок, які можна зберегти в закладки (дані видно в URL).", "method=\"post\" — для логіну, реєстрації, оформлення замовлення, будь-яких змін даних (дані не видно в URL)."],
    whenNotToUse: ["Не заміняй label на placeholder — це найпоширеніша помилка початківців у формах.", "Не роби два input з однаковим id — for знайде тільки перший.", "Не забувай name — без нього браузер узагалі не надішле значення поля.", "Не використовуй method=\"get\" для паролів чи інших конфіденційних даних — вони потраплять просто в адресний рядок."],
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
      {
        before: "action і method визначають, куди й як форма надішле дані — тут це логін, тому method=\"post\":",
        code: `<form action="/login" method="post">
  <label for="login-email">Email</label>
  <input type="email" id="login-email" name="email" autocomplete="email" />

  <label for="login-password">Пароль</label>
  <input type="password" id="login-password" name="password" autocomplete="current-password" />

  <button type="submit">Увійти</button>
</form>`,
        lineNotes: [
          "action=\"/login\" — адреса, куди браузер надішле дані після Submit.",
          "method=\"post\" ховає дані в тілі запиту; для логіну й реєстрації це обов'язково, на відміну від method=\"get\", який показав би пароль просто в URL.",
          "autocomplete=\"email\"/\"current-password\" дозволяє браузеру запропонувати збережені дані користувача.",
        ],
      },
      {
        before: "Альтернатива for/id — обгорнути input усередину label; тоді зв'язок не потрібно прописувати вручну:",
        code: `<label>
  Ім'я
  <input type="text" name="guestName" />
</label>`,
        lineNotes: [
          "Input усередині label автоматично зв'язаний з ним — for і id не потрібні.",
          "У професійній розробці частіше все ж обирають for + id: зручніше стилізувати через CSS і працює однаково добре у великих формах.",
        ],
      },
    ],
    commonMistakes: ["Placeholder замість label.", "label без for (чи input без id) — зв'язок не працює.", "Форма без <form>, просто input-и в div.", "Відсутність атрибута name — поле заповнене, але на сервер нічого не приходить.", "method=\"get\" для форм з паролем чи іншими конфіденційними даними."],
    dontDoThis: { code: `<input type="text" placeholder="Ім'я" />`, explanation: "На вигляд поле ніби підписане — плейсхолдер «Ім'я» видно всередині рамки, поки поле порожнє. Але щойно користувач починає вводити текст, підказка зникає, і візуально лишається просто порожній прямокутник. Для скрінрідера ситуація гірша: placeholder — не офіційний підпис поля, і частина скрінрідерів взагалі не озвучує його як назву. Причина в тому, що немає жодного <label>, зв'язаного з input через for/id, — саме label браузер і скрінрідер сприймають як офіційну назву поля. Виправлення: додати <label for=\"guest-name\">Ім'я</label> і id=\"guest-name\" на input, а плейсхолдер за потреби лишити лише як приклад формату. Перевірити можна кліком по тексту підпису — фокус повинен перейти в поле." },
    bestPractices: ["Кожен input — усередині <form> і має свій label.", "Placeholder використовуй лише як приклад формату (\"напр. 067 123 45 67\"), ніколи замість підпису.", "method=\"get\" — лише для пошуку й фільтрів; method=\"post\" — для логіну, реєстрації, оформлення замовлення.", "Додавай autocomplete (email, name, current-password тощо) — це прискорює заповнення форми для користувача."],
    remember: ["label + for/id — обов'язковий зв'язок.", "placeholder не замінює label.", "Форма завжди в <form>.", "action визначає адресу відправки, method — спосіб (GET показує дані в URL, POST ховає їх у тілі запиту).", "name — це те, що реально надсилається на сервер; без нього поле ігнорується."],
    interviewQuestions: [
      { question: "Чому placeholder не може замінити label?", answer: "Placeholder зникає під час вводу і не завжди озвучується скрінрідером як назва поля — label лишається видимим і клікабельним завжди." },
      { question: "Чим GET відрізняється від POST у формах?", answer: "GET передає дані в URL (видно в адресному рядку, можна зберегти в закладки) — підходить для пошуку й фільтрів. POST передає дані в тілі запиту, приховано — обов'язковий для логіну, реєстрації й будь-яких конфіденційних чи змінюваних даних." },
      { question: "Що станеться, якщо в input немає атрибута name?", answer: "Поле не буде включене у відправлені дані форми взагалі, навіть якщо користувач його заповнив — сервер просто не отримає це значення." },
    ],
    summary: "Форма (<form>) використовується для введення та відправлення даних користувача. Атрибут action визначає адресу, куди надсилати дані, а method — спосіб передачі (GET або POST). Кожне поле введення повинно мати <label>, який пов'язується з полем через for і id. Атрибут name визначає ім'я параметра, що буде відправлено на сервер. Placeholder лише показує приклад введення і не замінює label. Правильно побудована форма є зручною, доступною та відповідає сучасним стандартам веброзробки.",
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
      { id: "html-forms-label-for-bug", kind: "find-the-bug", prompt: "Чому клік по підпису «Телефон» не ставить фокус у поле?\n<label for=\"tel\">Телефон</label>\n<input type=\"tel\" id=\"phone\" name=\"phone\" />", solution: "for=\"tel\" не збігається з id=\"phone\" — браузер шукає елемент, чий id точно дорівнює значенню for, і не знаходить його." },
    ],
    quiz: {
      id: "html-forms-structure-quiz",
      title: "Структура форми та підписи: перевір себе",
      questions: [
        {
          id: "html-forms-label-vs-placeholder",
          type: "single",
          question: "Чому label кращий за placeholder як підпис поля?",
          options: [
            "label лишається видимим завжди і коректно озвучується скрінрідером, placeholder зникає при вводі",
            "label автоматично перекладає текст",
            "placeholder працює лише в Chrome",
            "Різниці немає, обидва варіанти рівноцінні",
          ],
          correctAnswer: "label лишається видимим завжди і коректно озвучується скрінрідером, placeholder зникає при вводі",
          explanation: "Placeholder зникає, щойно користувач починає вводити текст, і не завжди озвучується як назва поля.",
        },
        {
          id: "html-forms-name-missing",
          type: "true-false",
          question: "Якщо в input немає атрибута name, поле все одно потрапить у відправлені дані форми.",
          options: ["Так", "Ні"],
          correctAnswer: false,
          explanation: "Без name браузер узагалі не включає значення поля у відправлені дані, навіть якщо користувач його заповнив.",
        },
        {
          id: "html-forms-code-for-id",
          type: "code",
          question: "Чому клік по цьому label не ставить фокус в поле?",
          codeSnippet: `<label for="guest-name">Ім'я</label>
<input type="text" id="guestName" name="guestName" />`,
          options: [
            "for=\"guest-name\" не збігається з id=\"guestName\" — регістр і написання різні",
            "У input відсутній name",
            "label не можна ставити перед input",
            "Це насправді працює правильно",
          ],
          correctAnswer: "for=\"guest-name\" не збігається з id=\"guestName\" — регістр і написання різні",
          explanation: "for і id мають збігатися точно, символ у символ — тут написання відрізняється.",
        },
        {
          id: "html-forms-get-vs-post",
          type: "single",
          question: "Для якої форми method=\"get\" підходить найкраще?",
          options: [
            "Пошук чи фільтри, які зручно зберегти в закладки",
            "Форма логіну з паролем",
            "Реєстрація нового акаунту",
            "Оформлення платежу",
          ],
          correctAnswer: "Пошук чи фільтри, які зручно зберегти в закладки",
          explanation: "GET показує дані просто в URL — це зручно для пошуку/фільтрів, але небезпечно для паролів чи конфіденційних даних.",
        },
        {
          id: "html-forms-input-in-label",
          type: "single",
          question: "Що станеться, якщо покласти input прямо всередину label, без for/id?",
          options: [
            "Зв'язок утвориться автоматично, for і id не потрібні",
            "Форма перестане працювати",
            "Це синтаксична помилка HTML",
            "label ігноруватиме input усередині себе",
          ],
          correctAnswer: "Зв'язок утвориться автоматично, for і id не потрібні",
          explanation: "Input усередині label автоматично зв'язаний з ним без явного for/id — хоча в професійній розробці частіше все ж обирають for+id.",
        },
      ],
    },
  },

  "Типи полів і атрибути": {
    interactiveDemo: "input-types-demo",
    whatIsIt: "У попередньому уроці форма отримала перше поле — ім'я, з правильним <label> і name. Тепер додамо решту полів бронювання: телефон і кількість гостей. Атрибут type у <input> визначає не тільки зовнішній вигляд поля, а й яку клавіатуру покаже мобільний браузер, і яку базову валідацію зробить сам браузер без жодного JavaScript: email перевіряє формат адреси, number приймає лише цифри, tel показує цифрову клавіатуру. HTML підтримує понад 20 типів; readonly/disabled/pattern/minlength/maxlength додатково керують поведінкою поля.",
    whyUseIt: "type=\"text\" для номера телефону чи email змушує мобільну клавіатуру показувати літери замість цифр — дрібниця, яка щодня дратує мільйони користувачів. Правильний тип поля покращує UX, спрощує валідацію і покращує доступність без жодного JavaScript.",
    whenToUse: ["email — для пошти.", "tel — для телефону.", "number — для кількості (наприклад, гостей).", "date — для дати бронювання.", "file — для завантаження фото чи документа (з accept для обмеження формату).", "color/range — для кольору й повзунків (гучність, ціновий діапазон).", "hidden — для службових даних, які користувач не повинен бачити чи редагувати."],
    whenNotToUse: ["Не став type=\"text\" \"про всяк випадок\" — губиш валідацію й правильну клавіатуру.", "Не використовуй number для номера телефону чи номера картки — плюс, пробіли й початкові нулі там некоректні, а це не математичні значення.", "Не використовуй disabled для поля, значення якого потрібно відправити на сервер, — вимкнені поля взагалі не потрапляють у дані форми."],
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
      {
        before: "readonly і disabled виглядають схоже, але поводяться по-різному — це одне з найпопулярніших питань на співбесіді:",
        code: `<label for="order-id">Номер замовлення</label>
<input type="text" id="order-id" name="orderId" value="A-1042" readonly />

<label for="promo">Промокод (недоступний)</label>
<input type="text" id="promo" name="promo" value="SUMMER10" disabled />`,
        lineNotes: [
          "readonly: значення видно, копіюється, і воно відправляється на сервер — просто не редагується.",
          "disabled: поле повністю вимкнене (не можна натиснути, виділити, змінити) і НЕ відправляється на сервер узагалі.",
        ],
      },
      {
        before: "Завантаження фото до відгуку — з обмеженням формату й кількістю файлів:",
        code: `<label for="review-photo">Фото до відгуку</label>
<input type="file" id="review-photo" name="reviewPhoto" accept="image/*" multiple />`,
        lineNotes: [
          "accept=\"image/*\" дозволяє вибрати лише зображення у системному діалозі.",
          "multiple дозволяє додати кілька файлів за один вибір.",
        ],
      },
    ],
    commonMistakes: ["type=\"text\" для email/tel/number.", "number для телефону (там можуть бути + і пробіли).", "Відсутність min/max там, де є природні межі (вік, кількість).", "disabled на полі, значення якого потрібно відправити — воно просто зникне з даних форми.", "Покладатися лише на HTML-валідацію без перевірки цих же даних на сервері."],
    dontDoThis: { code: `<input type="text" placeholder="Телефон" />`, explanation: "На комп'ютері поле виглядає нормально — звичайне текстове поле з підказкою «Телефон». Але відкрий цю сторінку на телефоні: замість очікуваної цифрової клавіатури з великими кнопками цифр з'явиться повна буквена клавіатура, і користувачу доведеться вручну перемикатися на цифри. Причина в тому, що браузер обирає клавіатуру за значенням атрибута type, а type=\"text\" не дає жодної підказки, що тут очікуються цифри — крім того, він не перевіряє формат узагалі, тож можна ввести будь-що без попередження. Виправлення: замінити type=\"text\" на type=\"tel\" — саме той тип, що призначений для номерів телефону. Перевірити можна, відкривши сторінку в режимі мобільного екрана в DevTools — клавіатура повинна одразу показати цифри." },
    bestPractices: ["Обирай тип за змістом даних, а не залишай text за замовчуванням.", "Додавай min/max/step, коли є природні межі значення.", "Використовуй readonly, коли значення потрібно показати й відправити, і disabled — коли поле тимчасово недоступне й не повинно потрапити в дані форми.", "HTML-валідацію (required, pattern, min/max) завжди дублюй перевіркою на сервері — клієнтську валідацію легко обійти."],
    remember: ["type міняє клавіатуру на мобільному й додає валідацію.", "email/tel/number/date — не просто стилі, а реальна поведінка.", "readonly відправляється на сервер, disabled — ні.", "HTML-валідація — це перший, а не єдиний рівень захисту.", "number не підходить для телефонів і номерів карток — це не числа для обчислень."],
    interviewQuestions: [
      { question: "Що дає type=\"email\" понад звичайний type=\"text\"?", answer: "Вбудовану перевірку формату (є @ і домен) і відповідну мобільну клавіатуру з символом @ на видному місці." },
      { question: "Чим readonly відрізняється від disabled?", answer: "readonly дозволяє бачити й копіювати значення, і воно відправляється на сервер — просто не редагується. disabled повністю вимикає поле з взаємодії, і воно НЕ потрапляє у відправлені дані форми." },
      { question: "Чому не варто використовувати type=\"number\" для номера телефону?", answer: "Номер телефону не є числом для математичних операцій: він може містити +, пробіли чи початкові нулі, які number або відкидає, або обробляє некоректно." },
    ],
    summary: "Елемент <input> може працювати по-різному залежно від атрибута type. Найпоширеніші типи: text, password, email, number, tel, search, date і file. Додаткові атрибути (required, min, max, maxlength, readonly, disabled, pattern, accept, multiple) дозволяють керувати поведінкою поля та базовою валідацією. Правильний вибір типу поля покращує зручність використання, доступність і допомагає браузеру правильно обробляти введені дані.",
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
      { id: "html-input-types-find-bug", kind: "find-the-bug", prompt: "Розробник поставив <input type=\"number\" name=\"phone\" /> для номера телефону. Що не так?", solution: "Телефон — не число для обчислень: у ньому можуть бути +, пробіли чи початкові нулі, які number або забороняє вводити, або обробляє некоректно. Для телефону призначений type=\"tel\"." },
    ],
    quiz: {
      id: "html-forms-input-types-quiz",
      title: "Типи полів і атрибути: перевір себе",
      questions: [
        {
          id: "html-forms-type-purpose",
          type: "single",
          question: "Що дає правильний вибір атрибута type на input, крім зовнішнього вигляду?",
          options: [
            "Відповідну мобільну клавіатуру і базову валідацію без JavaScript",
            "Автоматичний переклад тексту",
            "Прискорення завантаження сторінки",
            "Захист від XSS-атак",
          ],
          correctAnswer: "Відповідну мобільну клавіатуру і базову валідацію без JavaScript",
          explanation: "type=\"email\"/\"tel\"/\"number\" тощо змінюють мобільну клавіатуру і додають вбудовану перевірку формату.",
        },
        {
          id: "html-forms-readonly-vs-disabled",
          type: "single",
          question: "Чим readonly відрізняється від disabled?",
          options: [
            "readonly відправляється на сервер, disabled — ні",
            "disabled відправляється на сервер, readonly — ні",
            "Це повні синоніми",
            "readonly можна редагувати, disabled — ні",
          ],
          correctAnswer: "readonly відправляється на сервер, disabled — ні",
          explanation: "readonly дозволяє бачити й копіювати значення (воно йде на сервер) — просто не редагується. disabled повністю виключає поле з даних форми.",
        },
        {
          id: "html-forms-code-number-phone",
          type: "code",
          question: "Чому цей тип поля некоректний для номера телефону?",
          codeSnippet: `<input type="number" name="phone" />`,
          options: [
            "Телефон може містити +, пробіли й початкові нулі, які number обробляє некоректно",
            "number взагалі не можна використовувати в формах",
            "Тут відсутній атрибут required",
            "Це правильний і рекомендований вибір",
          ],
          correctAnswer: "Телефон може містити +, пробіли й початкові нулі, які number обробляє некоректно",
          explanation: "Телефон — не число для математичних операцій, для нього призначений type=\"tel\".",
        },
        {
          id: "html-forms-file-accept",
          type: "single",
          question: "Що робить атрибут accept=\"image/*\" на input type=\"file\"?",
          options: [
            "Дозволяє вибрати лише зображення в системному діалозі вибору файлу",
            "Автоматично стискає завантажені зображення",
            "Обмежує кількість файлів до одного",
            "Конвертує файл у формат PNG",
          ],
          correctAnswer: "Дозволяє вибрати лише зображення в системному діалозі вибору файлу",
          explanation: "accept фільтрує типи файлів, доступні для вибору, полегшуючи користувачу вибір правильного файлу.",
        },
        {
          id: "html-forms-date-type",
          type: "single",
          question: "Який тип поля найдоречніший для дати бронювання?",
          options: ["date", "text", "number", "tel"],
          correctAnswer: "date",
          explanation: "type=\"date\" дає вбудований календар і стандартний формат без ручного парсингу тексту.",
        },
      ],
    },
  },

  "Textarea, select і fieldset": {
    interactiveDemo: "select-fieldset-demo",
    whatIsIt: "У двох попередніх уроках форма отримала ім'я, телефон і кількість гостей — усе однорядкові поля. Але бронювання ще потребує вибору часу з кількох готових варіантів і місця для коментаря, що може займати кілька рядків. <textarea> — багаторядкове текстове поле. <select>+<option> — випадаючий список (значення для сервера задає value; групувати варіанти можна через <optgroup>). <fieldset>+<legend> — групування пов'язаних полів з підписом групи.",
    whyUseIt: "Коли варіантів вибору 3+ і вони взаємовиключні (наприклад, час бронювання), select зручніший за групу radio — не займає весь екран. fieldset+legend додатково дає скрінрідеру структуру: він озвучує назву групи перед кожним полем усередині неї.",
    whenToUse: ["textarea — коментар, побажання, повідомлення.", "select — вибір з 4+ варіантів (час, місто, категорія).", "fieldset — групи полів, що логічно належать разом (наприклад, \"Контактні дані\").", "optgroup — коли список у select довгий і природно ділиться на категорії (наприклад, країни по регіонах)."],
    whenNotToUse: ["Не використовуй select для 2 варіантів — радіокнопки чи чекбокс зрозуміліші.", "Не роби textarea для одного слова чи короткого значення — це задача input.", "Не забувай value в кожному option — інакше на сервер піде текст, видимий користувачу, а не службове значення."],
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
      {
        before: "У select без вибраного значення корисно показати підказку-заглушку через disabled+selected option — це заміна placeholder, якого в select немає:",
        code: `<label for="city">Місто</label>
<select id="city" name="city">
  <option value="" selected disabled>Оберіть місто</option>
  <optgroup label="Україна">
    <option value="kyiv">Київ</option>
    <option value="lviv">Львів</option>
  </optgroup>
  <optgroup label="Польща">
    <option value="warsaw">Варшава</option>
  </optgroup>
</select>`,
        lineNotes: [
          "disabled на першому option не дає користувачу повернутись до нього після вибору — це і є заміна placeholder для select.",
          "optgroup з label групує довгий список по регіонах, не змінюючи те, що реально відправляється (value кожного option).",
        ],
      },
      {
        before: "Можна вимкнути одразу всю групу полів через fieldset disabled — усі input усередині стають недоступними одним атрибутом:",
        code: `<fieldset disabled>
  <legend>Оплата (недоступно без вибору доставки)</legend>
  <label for="card">Номер картки</label>
  <input type="text" id="card" name="card" />
</fieldset>`,
        lineNotes: [
          "disabled на fieldset вимикає кожне поле всередині одразу — не потрібно проставляти disabled на кожному input окремо.",
          "Типовий сценарій: секція оплати заблокована, доки користувач не заповнить попередній крок форми.",
        ],
      },
    ],
    commonMistakes: ["select для 2 варіантів замість radio/checkbox.", "fieldset без legend.", "textarea без rows — виглядає як однорядкове поле.", "option без value — сервер отримує видимий текст замість службового значення.", "Групування полів через звичайний div там, де підходить fieldset+legend."],
    dontDoThis: { code: `<select>\n  <option>Так</option>\n  <option>Ні</option>\n</select>`, explanation: "Візуально все працює: клік відкриває список, можна вибрати «Так» або «Ні». Але для лише двох взаємовиключних варіантів це зайва дія — потрібно клікнути, дочекатись відкриття списку, а тоді ще раз клікнути на варіант, замість одного кліку по видимій кнопці. Причина в тому, що select розрахований на ситуації, коли варіантів багато і показати їх усі одразу немає місця чи сенсу, — а тут обидва варіанти вміщуються на екрані одночасно. Виправлення: замінити select на пару radio-кнопок (як у наступному уроці) або на один checkbox, якщо питання по суті так/ні. Перевірити можна, порахувавши кліки для вибору варіанту: із select — мінімум два, з radio чи checkbox — один." },
    bestPractices: ["fieldset+legend для будь-якої логічної групи з 2+ полів.", "select лише коли варіантів справді багато.", "Для довгого списку в select групуй варіанти через optgroup — це полегшує сприйняття.", "Заглушку в select роби через <option selected disabled>, а не через placeholder, якого select не підтримує."],
    remember: ["textarea — багато тексту.", "select — багато взаємовиключних варіантів.", "fieldset+legend групує й підписує групу полів.", "option value — те, що йде на сервер; текст усередині option бачить лише користувач.", "fieldset disabled вимикає всі поля групи одним атрибутом."],
    interviewQuestions: [
      { question: "Коли краще radio, а коли select?", answer: "Radio — коли варіантів мало (до 5-6) і бажано бачити всі одразу; select — коли варіантів багато або обмежено місце на екрані." },
      { question: "Як зробити плейсхолдер у select, якщо цей елемент не підтримує атрибут placeholder?", answer: "Додати перший <option selected disabled> із текстом-підказкою — він показується за замовчуванням, але користувач не може повернутись до нього після вибору іншого варіанта." },
      { question: "Навіщо потрібен fieldset, якщо візуально групу можна оформити звичайним div?", answer: "fieldset+legend дає скрінрідеру семантичний зв'язок: він оголошує назву групи (legend) перед кожним полем усередині — div цього не робить." },
    ],
    summary: "<textarea> використовується для введення багаторядкового тексту, <select> — для вибору одного або кількох готових варіантів зі списку, а <fieldset> — для логічного групування пов'язаних полів форми. Назва групи задається через <legend>. Ці елементи покращують семантику HTML, доступність і роблять великі форми зрозумілішими як для користувачів, так і для браузерів.",
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
      { id: "html-select-value-find-bug", kind: "find-the-bug", prompt: "Чому на сервер приходить видимий текст «Львів», а не короткий код, як у першого option?\n<select name=\"city\">\n  <option value=\"\" selected disabled>Оберіть місто</option>\n  <option>Львів</option>\n</select>", solution: "У option \"Львів\" немає атрибута value, тому браузер відправляє видимий текст option як значення. Потрібно додати value=\"lviv\", як зроблено для заглушки." },
    ],
    quiz: {
      id: "html-forms-textarea-select-fieldset-quiz",
      title: "Textarea, select і fieldset: перевір себе",
      questions: [
        {
          id: "html-forms-select-vs-radio",
          type: "single",
          question: "Коли select зручніший за групу radio-кнопок?",
          options: [
            "Коли варіантів багато (7+) або обмежено місце на екрані",
            "Коли варіантів рівно два",
            "Завжди, select універсально кращий",
            "Ніколи, radio завжди кращий вибір",
          ],
          correctAnswer: "Коли варіантів багато (7+) або обмежено місце на екрані",
          explanation: "select не займає весь екран для довгого списку, на відміну від показу всіх radio одразу.",
        },
        {
          id: "html-forms-legend-purpose",
          type: "true-false",
          question: "legend озвучується скрінрідером як назва всієї групи полів усередині fieldset.",
          options: ["Так", "Ні"],
          correctAnswer: true,
          explanation: "legend — перший дочірній елемент fieldset, і скрінрідер оголошує його перед кожним полем групи.",
        },
        {
          id: "html-forms-code-option-no-value",
          type: "code",
          question: "Що піде на сервер, якщо в option немає атрибута value?",
          codeSnippet: `<select name="city">
  <option>Львів</option>
</select>`,
          options: [
            "Видимий текст усередині option (\"Львів\")",
            "Порожній рядок завжди",
            "Форма взагалі не відправиться",
            "Числовий індекс option у списку",
          ],
          correctAnswer: "Видимий текст усередині option (\"Львів\")",
          explanation: "Без явного value браузер відправляє видимий текст option як значення поля.",
        },
        {
          id: "html-forms-select-placeholder",
          type: "single",
          question: "Як зробити плейсхолдер-підказку в select, якщо цей елемент не підтримує атрибут placeholder?",
          options: [
            "Додати перший <option selected disabled> з текстом підказки",
            "Додати атрибут placeholder напряму на select",
            "Використати textarea замість select",
            "Це неможливо зробити в HTML",
          ],
          correctAnswer: "Додати перший <option selected disabled> з текстом підказки",
          explanation: "disabled не дає користувачу повернутись до цього option після вибору іншого варіанта — це і є заміна placeholder для select.",
        },
        {
          id: "html-forms-fieldset-disabled",
          type: "single",
          question: "Що робить атрибут disabled, поставлений прямо на <fieldset>?",
          options: [
            "Вимикає одразу всі поля всередині нього одним атрибутом",
            "Приховує fieldset візуально через CSS",
            "Видаляє legend",
            "Вимикає лише перше поле в групі",
          ],
          correctAnswer: "Вимикає одразу всі поля всередині нього одним атрибутом",
          explanation: "Не потрібно проставляти disabled на кожному input окремо — досить одного атрибута на fieldset.",
        },
      ],
    },
  },

  "Чекбокси, радіокнопки і валідація": {
    interactiveDemo: "radio-validation-demo",
    whatIsIt: "У попередньому уроці час бронювання вибирався через select, а коментар писався в textarea. Тепер потрібно вибрати місце — зал чи тераса, рівно один варіант — і підтвердити згоду з умовами. checkbox — так/ні або кілька незалежних варіантів. radio (з однаковим name) — рівно один варіант із кількох. required/pattern/min/max/minlength/maxlength — вбудована HTML-валідація без JS; novalidate вимикає її повністю.",
    whyUseIt: "Браузер сам перевірить required і pattern та покаже підказку — це працює навіть якщо JavaScript ще не завантажився чи впав з помилкою. Це перший, безкоштовний рівень захисту від порожніх чи неправильно заповнених полів.",
    whenToUse: ["checkbox — згода з умовами, вибір кількох опцій (додаткові побажання, розсилка).", "radio — вибір рівно одного варіанту (місце: зал/тераса, спосіб оплати).", "required — на кожному обов'язковому полі, включно з чекбоксом згоди й групою radio.", "pattern/minlength/maxlength — коли значення має конкретний формат чи довжину (промокод, індекс)."],
    whenNotToUse: ["Не забувай однаковий name для групи radio — інакше можна вибрати кілька одразу.", "Не покладайся лише на JS-валідацію — required/pattern працюють без жодного скрипта.", "Не використовуй checkbox для взаємовиключних варіантів (стать, спосіб оплати) — там потрібен radio.", "Не вимикай валідацію через novalidate без реальної причини — тоді всю перевірку доведеться писати вручну."],
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
      {
        before: "pattern, minlength і maxlength разом обмежують і формат, і довжину промокоду:",
        code: `<label for="promo">Промокод</label>
<input type="text" id="promo" name="promo" pattern="[A-Z0-9]+" minlength="4" maxlength="10" />`,
        lineNotes: [
          "pattern=\"[A-Z0-9]+\" дозволяє лише великі латинські літери й цифри.",
          "minlength/maxlength обмежують довжину значення без жодного JavaScript.",
        ],
      },
      {
        before: "novalidate на формі вимикає всю вбудовану HTML-валідацію — корисно, якщо перевірку повністю бере на себе JavaScript:",
        code: `<form novalidate>
  <label for="email-nv">Email</label>
  <input type="email" id="email-nv" name="email" required />
  <button type="submit">Надіслати</button>
</form>`,
        lineNotes: [
          "З novalidate браузер не покаже своє стандартне повідомлення про помилку, навіть якщо required чи type=\"email\" порушені.",
          "Це обирають, коли потрібні власні, кастомізовані повідомлення про помилки замість стандартних браузерних.",
        ],
      },
    ],
    commonMistakes: ["Різний name у групі radio — можна вибрати кілька одночасно.", "Немає жодного вибраного radio за замовчуванням, коли один варіант очевидно основний.", "required тільки в JS, без атрибута в HTML.", "Checkbox для взаємовиключних варіантів замість radio.", "Розрахунок лише на HTML-валідацію без повторної перевірки цих самих даних на сервері."],
    dontDoThis: { code: `<input type="radio" name="seat1" /> Зал\n<input type="radio" name="seat2" /> Тераса`, explanation: "На вигляд це звичайна пара радіокнопок, і клік по кожній працює — кружечок заповнюється. Але вибери «Зал», а потім клікни «Тераса»: обидва варіанти лишаються позначеними одночасно, хоча логічно можна забронювати або зал, або терасу, не обидва. Причина в тому, що браузер групує радіокнопки у взаємовиключний набір лише за атрибутом name — а тут name=\"seat1\" і name=\"seat2\", тобто для браузера це дві незалежні групи по одній кнопці. Виправлення: дати обом інпутам однаковий name (наприклад seating), залишивши різні value (\"hall\" і \"terrace\"). Перевірити можна кліком: після виправлення вибір другого варіанту повинен автоматично знімати позначку з першого." },
    bestPractices: ["Завжди перевіряй, що всі radio в групі мають однаковий name.", "Додавай required прямо в HTML, навіть якщо є JS-валідація — це резервний рівень захисту.", "Для required на групі radio достатньо атрибута хоча б на одній кнопці групи.", "Дублюй HTML-валідацію перевіркою на сервері — required і pattern легко обійти, надіславши запит напряму."],
    remember: ["checkbox — незалежний вибір.", "radio з однаковим name — рівно один варіант.", "required/pattern працюють без JavaScript.", "novalidate вимикає всю вбудовану валідацію форми.", "HTML-валідація ніколи не замінює перевірку даних на сервері."],
    interviewQuestions: [
      { question: "Чому дві радіокнопки з різним name не працюють як група?", answer: "Браузер групує radio-кнопки саме за атрибутом name — без збігу name кожна кнопка стає незалежною, і можна вибрати кілька одразу." },
      { question: "Що робить атрибут novalidate?", answer: "Вимикає вбудовану HTML-валідацію всієї форми — тоді required, pattern, min/max та інші атрибути перестають перевірятись браузером, і всю перевірку потрібно реалізувати через JavaScript або на сервері." },
      { question: "Чому HTML-валідація не замінює перевірку на сервері?", answer: "Клієнтську валідацію легко обійти — надіславши запит напряму, минаючи форму й браузер. Сервер повинен повторно перевірити ті самі дані, інакше захист лише умовний." },
    ],
    summary: "Checkbox (type=\"checkbox\") використовується тоді, коли користувач може вибрати кілька незалежних варіантів. Radio (type=\"radio\") застосовується для вибору лише одного варіанта з групи, яка визначається однаковим значенням атрибута name. HTML також має вбудовану систему валідації через атрибути required, min, max, pattern, minlength, maxlength та інші. Вона покращує зручність користувача, але не замінює перевірку даних на сервері.",
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
      { id: "html-required-radio-choice", kind: "choice", prompt: "Потрібно, щоб хоча б один варіант місця (зал/тераса) був обраний перед відправкою форми. Куди поставити required?", options: ["На кожній радіокнопці групи", "Лише на одній кнопці групи", "На fieldset", "На legend"], correctAnswer: "Лише на одній кнопці групи", solution: "Для required на групі radio достатньо додати атрибут хоча б на одній кнопці — браузер перевіряє всю групу разом." },
    ],
    quiz: {
      id: "html-forms-checkbox-radio-validation-quiz",
      title: "Чекбокси, радіокнопки і валідація: перевір себе",
      questions: [
        {
          id: "html-forms-checkbox-vs-radio",
          type: "single",
          question: "Чим checkbox відрізняється від radio?",
          options: [
            "checkbox — 0 або декілька незалежних варіантів, radio (з однаковим name) — рівно один",
            "checkbox завжди квадратний, radio — круглий, функціонально це те саме",
            "radio можна вибрати кілька одночасно, checkbox — лише один",
            "Різниці немає",
          ],
          correctAnswer: "checkbox — 0 або декілька незалежних варіантів, radio (з однаковим name) — рівно один",
          explanation: "checkbox — незалежний вибір; radio з однаковим name групується у взаємовиключний набір.",
        },
        {
          id: "html-forms-code-radio-names",
          type: "code",
          question: "Чому можна вибрати і \"Зал\", і \"Тераса\" одночасно в цьому коді?",
          codeSnippet: `<input type="radio" name="seat1" /> Зал
<input type="radio" name="seat2" /> Тераса`,
          options: [
            "У них різні атрибути name, тому браузер не групує їх як взаємовиключні",
            "Атрибут type написаний неправильно",
            "Потрібно додати required на обидва",
            "Це насправді правильна поведінка для radio",
          ],
          correctAnswer: "У них різні атрибути name, тому браузер не групує їх як взаємовиключні",
          explanation: "Браузер групує радіокнопки у взаємовиключний набір лише за співпадінням name — тут це дві незалежні групи по одній кнопці.",
        },
        {
          id: "html-forms-html-validation-no-js",
          type: "true-false",
          question: "Атрибути required і pattern перевіряють дані навіть без жодного рядка JavaScript.",
          options: ["Так", "Ні"],
          correctAnswer: true,
          explanation: "Це вбудована HTML-валідація — вона працює, навіть якщо JS ще не завантажився чи впав з помилкою.",
        },
        {
          id: "html-forms-novalidate",
          type: "single",
          question: "Що робить атрибут novalidate на <form>?",
          options: [
            "Вимикає всю вбудовану HTML-валідацію форми",
            "Робить усі поля обов'язковими",
            "Автоматично відправляє форму без кліку",
            "Додає CSS-стилі помилок",
          ],
          correctAnswer: "Вимикає всю вбудовану HTML-валідацію форми",
          explanation: "novalidate прибирає стандартну перевірку браузера — тоді required/pattern/min/max перестають перевірятись автоматично.",
        },
        {
          id: "html-forms-server-validation",
          type: "single",
          question: "Чому HTML-валідація (required, pattern) не замінює перевірку даних на сервері?",
          options: [
            "Клієнтську валідацію легко обійти, надіславши запит напряму, минаючи форму",
            "HTML-валідація взагалі не працює в сучасних браузерах",
            "Сервер не вміє читати HTML-атрибути",
            "Це питання стилю, а не безпеки",
          ],
          correctAnswer: "Клієнтську валідацію легко обійти, надіславши запит напряму, минаючи форму",
          explanation: "HTML-валідація — лише перший, зручний для користувача рівень захисту; сервер повинен повторно перевірити ті самі дані.",
        },
      ],
    },
  },

  "Доступні повідомлення про помилки": {
    interactiveDemo: "aria-error-demo",
    whatIsIt: "У попередньому уроці required і pattern уже перевіряють дані самі, без JavaScript. Але коли поле не проходить перевірку, потрібно повідомити про це користувача так, щоб дізнався не тільки той, хто бачить червону рамку, а й той, хто користується скрінрідером. aria-describedby зв'язує поле з текстом помилки під ним. aria-invalid=\"true\" позначає поле як некоректне. role=\"alert\" (або aria-live) змушує скрінрідер одразу озвучити повідомлення, щойно воно з'явилось на сторінці.",
    whyUseIt: "Червона рамка навколо поля нічого не скаже користувачу скрінрідера — потрібен текст, явно зв'язаний із полем, який озвучиться автоматично. Хороше повідомлення також пояснює не лише що сталося, а й як це виправити.",
    whenToUse: ["Кожне поле з помилкою валідації — aria-invalid + aria-describedby на текст помилки.", "role=\"alert\" або aria-live=\"polite\" — на блоці, що з'являється динамічно після невдалої відправки форми.", "aria-live=\"assertive\" — лише для дійсно критичних повідомлень (наприклад, \"Платіж не виконано\"), бо воно перериває читання одразу.", "Error Summary (загальний список помилок) — у великих формах, коли полів з помилками кілька."],
    whenNotToUse: ["Не покладайся тільки на колір (червона рамка) — частина користувачів не розрізняє кольори або не бачить їх взагалі.", "Не додавай role=\"alert\" на статичний текст, який завжди на сторінці, — тільки на те, що з'являється саме зараз.", "Не зловживай aria-live=\"assertive\" на кожному повідомленні — часті переривання дратують користувачів скрінрідерів.", "Не додавай aria-required, якщо вже є required — HTML і так передає цю інформацію."],
    comparisonTable: {
      headers: ["Спосіб озвучити повідомлення", "Коли скрінрідер його читає", "Типове використання"],
      rows: [
        ["role=\"alert\"", "Одразу, як тільки елемент з'являється на сторінці", "Повідомлення про помилку біля конкретного поля"],
        ["aria-live=\"polite\"", "Одразу, але лише коли скрінрідер доказав поточний текст", "Підказка, що оновлюється (наприклад, сила пароля)"],
        ["aria-live=\"assertive\"", "Негайно, перериваючи читання поточного тексту", "Лише справді критичні повідомлення (помилка оплати)"],
      ],
    },
    codeWalkthroughs: [
      {
        code: `<label for="phone">Телефон</label>
<input type="tel" id="phone" aria-invalid="true" aria-describedby="phone-error" />
<p id="phone-error" role="alert">Введіть номер у форматі +380XXXXXXXXX</p>`,
        lineNotes: ["aria-describedby=\"phone-error\" зв'язує поле з текстом помилки за id.", "role=\"alert\" каже скрінрідеру озвучити текст одразу, як тільки він з'явився."],
      },
      {
        before: "aria-live — альтернатива role=\"alert\" для блоку, який спочатку порожній і заповнюється через JavaScript після дії користувача:",
        code: `<p id="password-hint" aria-live="polite"></p>
<script>
  document.getElementById('password-hint').textContent = 'Пароль занадто слабкий.';
</script>`,
        lineNotes: [
          "aria-live=\"polite\" чекає, поки скрінрідер закінчить читати поточний текст, і лише потім озвучує нове повідомлення.",
          "aria-live=\"assertive\" перериває читання одразу — використовують лише для критичних сповіщень (наприклад, помилки оплати).",
        ],
      },
      {
        before: "Error Summary — загальний список помилок над формою, корисний, коли невалідних полів декілька:",
        code: `<div role="alert">
  <p>Будь ласка, виправте такі помилки:</p>
  <ul>
    <li><a href="#email">Email введено неправильно</a></li>
    <li><a href="#phone">Телефон повинен містити 10 цифр</a></li>
  </ul>
</div>`,
        lineNotes: [
          "role=\"alert\" на всьому блоці озвучує список одразу після невдалої спроби відправити форму.",
          "Посилання на #email/#phone дозволяють одразу перейти до конкретного поля з помилкою.",
        ],
      },
    ],
    commonMistakes: ["Помилка позначена тільки кольором рамки, без тексту.", "Текст помилки не зв'язаний з полем через aria-describedby.", "aria-invalid лишається true навіть після виправлення поля.", "aria-live=\"assertive\" на кожному дрібному повідомленні замість лише критичних випадків.", "Повідомлення на кшталт \"Помилка\" чи \"Invalid\", яке не пояснює, що саме виправити."],
    dontDoThis: { code: `<input type="tel" style="border: 2px solid red" />`, explanation: "Візуально помилка ніби позначена — рамка поля стала червоною, і зряча людина здогадається, що щось не так. Але пройди форму зі скрінрідером: він озвучить назву поля й тип, і жодного натяку на помилку чи на те, що саме виправити. Причина в тому, що колір рамки — суто візуальний CSS-стиль, він не передає жодної інформації через accessibility-дерево, яке читає скрінрідер: немає ні aria-invalid, що позначив би поле як некоректне, ні aria-describedby, що зв'язав би поле з поясненням. Виправлення: додати aria-invalid=\"true\", текстовий елемент з поясненням і зв'язати його з полем через aria-describedby, а сам текст позначити role=\"alert\". Перевірити можна, відкривши DevTools → Accessibility Tree — ім'я поля має супроводжуватись описом помилки." },
    bestPractices: ["Завжди супроводжуй помилку текстом, зв'язаним через aria-describedby.", "Знімай aria-invalid, щойно користувач виправив значення.", "Пиши повідомлення конкретно (\"Пароль повинен містити мінімум 8 символів\"), а не просто \"Помилка\".", "Обирай момент показу помилки під задачу: після Submit — для більшості полів, під час введення (on input) — для пароля, після втрати фокуса (on blur) — проміжний варіант."],
    remember: ["Колір — недостатньо, потрібен текст помилки.", "aria-describedby зв'язує поле з поясненням.", "role=\"alert\" — для нових, щойно показаних повідомлень.", "aria-live=\"polite\" — типовий вибір; \"assertive\" — лише для критичних сповіщень.", "Хороше повідомлення пояснює і що не так, і як це виправити."],
    interviewQuestions: [
      { question: "Чому самого лише червоного кольору недостатньо для позначення помилки?", answer: "Частина користувачів (дальтоніки, незрячі) не сприймає колір як сигнал — потрібен текст, зв'язаний з полем через aria-describedby." },
      { question: "Чим aria-live=\"polite\" відрізняється від \"assertive\"?", answer: "polite чекає, поки скрінрідер завершить читати поточний контент, і лише тоді озвучує нове повідомлення; assertive перериває читання негайно — тому підходить лише для дійсно критичних сповіщень." },
      { question: "Що таке Error Summary і коли його варто використовувати?", answer: "Це загальний список усіх помилок форми, зазвичай показаний зверху після невдалої відправки — корисний у великих формах, де невалідних полів кілька, щоб користувач одразу бачив повний список і міг перейти до кожного поля." },
    ],
    summary: "aria-invalid + aria-describedby + видимий текст помилки — мінімум для доступного повідомлення про помилку. role=\"alert\" або aria-live=\"polite\" озвучують нове повідомлення скрінрідеру одразу після появи, а aria-live=\"assertive\" — лише для критичних випадків. Хороше повідомлення пояснює не тільки що сталося, а й як це виправити, і ніколи не покладається на самий лише колір.",
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
      { id: "html-aria-describedby-find-bug", kind: "find-the-bug", prompt: "Чому скрінрідер не озвучує текст помилки, хоча він є на сторінці?\n<input type=\"email\" id=\"email\" aria-describedby=\"email-err\" />\n<p id=\"email-error\">Некоректний email</p>", solution: "id тексту помилки — \"email-error\", а aria-describedby посилається на \"email-err\" — значення не збігаються, тому зв'язок не спрацьовує." },
    ],
    quiz: {
      id: "html-forms-error-messages-quiz",
      title: "Доступні повідомлення про помилки: перевір себе",
      questions: [
        {
          id: "html-forms-aria-describedby-purpose",
          type: "single",
          question: "Що робить aria-describedby на полі форми?",
          options: [
            "Зв'язує поле з текстом помилки чи пояснення за id",
            "Змінює колір рамки поля",
            "Автоматично валідовує значення поля",
            "Приховує поле від скрінрідера",
          ],
          correctAnswer: "Зв'язує поле з текстом помилки чи пояснення за id",
          explanation: "aria-describedby явно вказує скрінрідеру, який текст описує це поле.",
        },
        {
          id: "html-forms-color-only-error",
          type: "true-false",
          question: "Червоної рамки навколо поля достатньо, щоб повідомити про помилку всім користувачам.",
          options: ["Так", "Ні"],
          correctAnswer: false,
          explanation: "Колір — суто візуальний сигнал; користувачі скрінрідерів чи дальтоніки його не отримають без тексту помилки.",
        },
        {
          id: "html-forms-code-mismatched-id",
          type: "code",
          question: "Чому скрінрідер не озвучує цей текст помилки?",
          codeSnippet: `<input type="email" id="email" aria-describedby="email-err" />
<p id="email-error">Некоректний email</p>`,
          options: [
            "id тексту (\"email-error\") не збігається зі значенням aria-describedby (\"email-err\")",
            "Тег p не можна використовувати для помилок",
            "Відсутній атрибут role",
            "Це насправді працює правильно",
          ],
          correctAnswer: "id тексту (\"email-error\") не збігається зі значенням aria-describedby (\"email-err\")",
          explanation: "Значення aria-describedby має точно, символ у символ, збігатися з id елемента-опису.",
        },
        {
          id: "html-forms-aria-live-assertive",
          type: "single",
          question: "Коли варто використовувати aria-live=\"assertive\" замість \"polite\"?",
          options: [
            "Лише для справді критичних повідомлень (наприклад, помилка оплати)",
            "Для будь-якого динамічного тексту на сторінці",
            "Тільки для успішних повідомлень",
            "Ніколи, assertive застарів",
          ],
          correctAnswer: "Лише для справді критичних повідомлень (наприклад, помилка оплати)",
          explanation: "assertive перериває читання одразу — часті переривання дратують користувачів скрінрідерів, тому його бережуть для критичних випадків.",
        },
        {
          id: "html-forms-error-summary",
          type: "single",
          question: "Для чого потрібен Error Summary (загальний список помилок)?",
          options: [
            "Показати всі помилки форми одразу зверху, коли невалідних полів кілька",
            "Замінити aria-describedby на кожному полі",
            "Приховати помилки від скрінрідера",
            "Автоматично виправити некоректні значення",
          ],
          correctAnswer: "Показати всі помилки форми одразу зверху, коли невалідних полів кілька",
          explanation: "У великих формах Error Summary дає користувачу повний список помилок одразу, з посиланнями на кожне проблемне поле.",
        },
      ],
    },
  },
};

export const htmlFormsModuleQuiz: QuizData = {
  id: "html-forms-module-quiz",
  title: "Форми: контрольний тест",
  questions: [
    {
      id: "html-forms-module-label-purpose",
      type: "single",
      question: "Чому label кращий за placeholder?",
      options: [
        "label лишається видимим завжди і коректно озвучується скрінрідером",
        "label автоматично перекладає текст поля",
        "placeholder не можна використовувати разом з label",
        "Різниці немає",
      ],
      correctAnswer: "label лишається видимим завжди і коректно озвучується скрінрідером",
      explanation: "placeholder зникає під час вводу і не завжди озвучується як назва поля — label вирішує обидві проблеми.",
    },
    {
      id: "html-forms-module-code-type",
      type: "code",
      question: "Що варто виправити в цьому полі для номера телефону?",
      codeSnippet: `<input type="text" placeholder="Телефон" />`,
      options: [
        "Додати type=\"tel\" замість text — це дасть правильну мобільну клавіатуру",
        "Прибрати placeholder повністю",
        "Додати атрибут colspan",
        "Тут усе правильно",
      ],
      correctAnswer: "Додати type=\"tel\" замість text — це дасть правильну мобільну клавіатуру",
      explanation: "type=\"tel\" на мобільному показує цифрову клавіатуру замість повної буквеної.",
    },
    {
      id: "html-forms-module-select-vs-radio",
      type: "single",
      question: "Коли select зручніший, ніж radio-кнопки?",
      options: [
        "Коли варіантів багато (7+) або мало місця на екрані",
        "Коли варіант лише один",
        "Завжди без винятків",
        "Ніколи, radio завжди кращий",
      ],
      correctAnswer: "Коли варіантів багато (7+) або мало місця на екрані",
      explanation: "select не показує всі варіанти одразу, тому підходить для довгих списків.",
    },
    {
      id: "html-forms-module-radio-grouping",
      type: "true-false",
      question: "Радіокнопки з різним атрибутом name групуються браузером як взаємовиключні.",
      options: ["Так", "Ні"],
      correctAnswer: false,
      explanation: "Браузер групує radio лише за точним співпадінням name — різний name означає незалежні кнопки.",
    },
    {
      id: "html-forms-module-aria-describedby",
      type: "single",
      question: "Як зв'язати поле форми з текстом помилки для скрінрідера?",
      options: [
        "Через aria-describedby, що вказує на id тексту помилки",
        "Через колір рамки поля",
        "Через атрибут placeholder",
        "Це неможливо технічно",
      ],
      correctAnswer: "Через aria-describedby, що вказує на id тексту помилки",
      explanation: "aria-describedby явно зв'язує поле з поясненням помилки — колір сам по собі нічого не повідомляє скрінрідеру.",
    },
    {
      id: "html-forms-module-facts",
      type: "multiple",
      question: "Які з цих тверджень правильні?",
      options: [
        "Без атрибута name поле не потрапляє у відправлені дані форми",
        "disabled поле все одно відправляється на сервер",
        "required і pattern працюють без JavaScript",
        "HTML-валідація повністю замінює перевірку на сервері",
      ],
      correctAnswer: [
        "Без атрибута name поле не потрапляє у відправлені дані форми",
        "required і pattern працюють без JavaScript",
      ],
      explanation: "disabled поле НЕ відправляється на сервер (на відміну від readonly); HTML-валідацію легко обійти, тому сервер завжди повинен перевіряти дані повторно.",
      optionExplanations: {
        "disabled поле все одно відправляється на сервер": "Навпаки: disabled повністю виключає поле з даних форми, на відміну від readonly.",
        "HTML-валідація повністю замінює перевірку на сервері": "HTML-валідацію легко обійти, тому сервер завжди повинен перевіряти ті самі дані незалежно.",
      },
    },
  ],
};
