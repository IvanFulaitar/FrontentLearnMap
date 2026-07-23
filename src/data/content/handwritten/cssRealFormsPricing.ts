import type { LessonOverride } from "./htmlFoundations";
import type { QuizData } from "../../../types/course";

/**
 * Module "Форми, ціни і footer" (css-real-forms-pricing). Cheat-sheet
 * format. Continues styles.css for the café project (v17 → v21).
 */
export const cssRealFormsPricingOverrides: Record<string, LessonOverride> = {
  "Стилізація форми бронювання": {
    whatIsIt: "У попередньому модулі ми додали кнопкам, карткам і псевдоелементам живі стани й декор. Форма бронювання — ще один реальний блок сторінки, і в неї є власна особливість: браузер малює поля вводу власним, часто непримітним стилем, який потрібно свідомо перевизначити.\n\nСтилізація полів вводу, лейблів і fieldset так, щоб форма виглядала як частина дизайну сайту, а не як стандартний непримітний браузерний елемент. Стосується не лише кольору й рамки, а й системних деталей: шрифту, стрілки select, можливості розтягувати textarea.",
    whyUseIt: "Стандартний вигляд <input> у різних браузерах не збігається з рештою дизайну сайту — без стилізації форма виглядає \"чужою\" на фоні решти сторінки. Кожен браузер (і навіть кожна ОС) малює select, textarea й checkbox трохи по-своєму: якщо не втрутитись явно, форма кав'ярні на Windows/Chrome і на macOS/Safari виглядатиме по-різному, і жодна з них не збігатиметься із заголовками й кнопками сайту.",
    whenToUse: ["Однакові padding, border-radius і border для всіх полів форми — узгодженість з картками й кнопками.", "display: flex; flex-direction: column; gap — для вертикального розташування label + input із рівним відступом.", "resize: vertical для textarea — дозволяє користувачу розтягнути поле для довшого коментаря, але не ламає горизонтальний layout."],
    whenNotToUse: ["Не прибирай border з input повністю без заміни — користувач має бачити межі поля.", "Не роби поля занадто вузькими на мобільному — мінімум 44px висоти для зручного натискання пальцем.", "Не покладайся на placeholder як на заміну <label> — підказка зникає, щойно користувач починає вводити текст, і поле лишається без підпису для тих, хто вже забув, що там вводити."],
    visualExplanation: {
      svg: `<svg viewBox="0 0 460 190" width="100%" height="100%" style="display:block;width:100%;height:auto;aspect-ratio:460 / 190" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Поле вводу за замовчуванням у браузері порівняно зі стилізованим полем">
        <text x="115" y="20" font-size="12" font-weight="700" fill="var(--muted)" text-anchor="middle">браузер за замовчуванням</text>
        <rect x="20" y="35" width="190" height="30" rx="2" fill="none" stroke="var(--muted)" stroke-width="1.5" />
        <text x="30" y="55" font-size="12" fill="var(--muted)">Ваше ім'я</text>
        <rect x="20" y="80" width="190" height="30" rx="2" fill="none" stroke="var(--muted)" stroke-width="1.5" />
        <text x="115" y="130" font-size="11" fill="var(--muted)" text-anchor="middle">свій вигляд у кожному браузері</text>
        <text x="345" y="20" font-size="12" font-weight="700" fill="var(--text)" text-anchor="middle">стилізовано під бренд</text>
        <rect x="250" y="35" width="190" height="34" rx="8" fill="none" stroke="var(--primary)" stroke-width="2" />
        <text x="262" y="57" font-size="12" fill="var(--text)">Ваше ім'я</text>
        <rect x="250" y="82" width="190" height="34" rx="8" fill="none" stroke="var(--border)" stroke-width="2" />
        <text x="345" y="132" font-size="11" fill="var(--muted)" text-anchor="middle">узгоджено з дизайном сайту</text>
      </svg>`,
      caption: "Той самий <input>, до і після узгодження зі шрифтом, border-radius і кольорами решти сайту.",
    },
    interactiveDemo: "field-styling-demo",
    comparisonTable: {
      headers: ["Проблема браузера за замовчуванням", "CSS-рішення"],
      rows: [
        ["Поле показує інший шрифт, ніж решта сайту", "font: inherit"],
        ["select зі своєю системною стрілкою (в кожній ОС інакша)", "appearance: none + власна background-image"],
        ["textarea можна розтягнути в обидва боки й зламати layout", "resize: vertical"],
        ["border-radius/padding поля не збігається з картками й кнопками сайту", "Однакові значення border-radius/padding для input, select, textarea"],
      ],
    },
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
      {
        before: "Стилізація select: прибираємо системну стрілку і малюємо свою:",
        code: `.form-field select {
  appearance: none;
  background-image: url("data:image/svg+xml,...chevron...");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 32px;
}`,
        lineNotes: ["appearance: none прибирає стандартний вигляд select разом із системною стрілкою (у кожній ОС вона своя).", "background-image з іконкою-шевроном малює власну стрілку — тепер вона виглядає так само, як і решта іконок сайту.", "padding-right звільняє місце під іконку, щоб текст опції не заходив під неї."],
        after: "Select виглядає узгоджено з рештою полів, а не як стандартний елемент операційної системи.",
      },
      {
        before: "textarea, що можна розтягнути тільки вертикально, з розумним мінімумом висоти:",
        code: `.form-field textarea {
  resize: vertical;
  min-height: 96px;
}`,
        lineNotes: ["resize: vertical дозволяє користувачу зробити поле вищим для довшого коментаря, але забороняє розтягувати його вшир і ламати layout.", "min-height гарантує, що поле для коментаря одразу достатньо високе, а не в одну тонку лінію."],
        after: "Поле коментаря до бронювання зручне для довшого тексту, але не може зламати сітку форми, розтягнувшись убік.",
      },
    ],
    commonMistakes: ["Забутий font: inherit — поле показує інший (часто системний) шрифт, ніж решта сайту.", "Різний border-radius на input порівняно з картками й кнопками сайту.", "Занадто малий padding — поле важко натиснути на сенсорному екрані.", "placeholder використовується замість <label> — підказка зникає при введенні тексту, і поле залишається без підпису.", "select лишений системної стрілки без заміни власною іконкою — виглядає неузгоджено з рештою стилізованих полів."],
    dontDoThis: { code: `input {\n  border: none;\n  outline: none;\n}`, explanation: "Форма виглядає \"чистішою\" — жодних сірих рамок, нічого зайвого. Але користувач, що дивиться на сторінку, більше не розуміє, де саме можна почати вводити текст: поле злилося з фоном сторінки і виглядає як просто порожнє місце, а не як інтерактивний елемент. Причина в тому, що border і outline — це не просто \"зайва\" декоративна деталь, а основний візуальний сигнал \"тут є поле вводу\"; прибираючи обидва одночасно й нічим не замінюючи, ми прибираємо саму інформацію про межі поля, а не лише її стандартний вигляд. Виправлення: прибрати border: none, залишивши власний border (наприклад, 1px solid var(--border)) узгодженого з дизайном кольору — форма й надалі виглядатиме сучасно, але межі полів залишаться помітними. Перевірити можна, показавши форму людині, що бачить сторінку вперше: чи одразу зрозуміло, куди клікати, щоб почати вводити текст?" },
    bestPractices: ["Стилізуй усі типи полів (input/select/textarea) одним узгодженим селектором.", "Тримай мінімум 44×44px клікабельну/дотикову область для будь-якого поля чи кнопки.", "Завжди додавай справжній <label> (за потреби — візуально прихований через sr-only-клас), навіть якщо є placeholder — placeholder ніколи не замінює підпис поля.", "Для textarea обирай resize: vertical замість повного заборонення розтягування — користувачу іноді потрібно більше місця для тексту."],
    remember: ["font: inherit — поля мають виглядати частиною сайту, а не браузера.", "Однаковий border-radius для полів, кнопок і карток.", "Мінімум 44px висоти поля для зручності на сенсорних екранах.", "placeholder ніколи не замінює <label> — це лише тимчасова підказка.", "appearance: none відкриває можливість стилізувати select власною іконкою замість системної стрілки."],
    interviewQuestions: [
      { question: "Чому варто явно задавати font: inherit для input/textarea/select?", answer: "Браузери за замовчуванням часто застосовують до елементів форми системний шрифт замість успадкованого від сторінки — font: inherit синхронізує вигляд полів з рештою дизайну." },
      { question: "Чому placeholder не можна використовувати замість <label>?", answer: "Placeholder — це лише тимчасова підказка всередині порожнього поля: вона зникає, щойно користувач починає вводити текст, і взагалі не читається асистивними технологіями так само надійно, як справжній <label>. Користувач, який відволікся й повернувся до вже заповненого поля, втрачає контекст, що саме там вводити." },
      { question: "Що робить appearance: none на select, і що варто зробити одразу після цього?", answer: "appearance: none прибирає стандартний, системний вигляд select-елемента (включно зі стрілкою ОС). Одразу після цього варто додати власну іконку-стрілку через background-image, інакше select виглядатиме як звичайний div без жодного індикатора, що це випадаючий список." },
    ],
    summary: "Однаковий border-radius, padding і font: inherit для всіх типів полів роблять форму частиною дизайну сайту, а не стандартним браузерним елементом. appearance: none дозволяє замінити системну стрілку select власною іконкою, а resize: vertical на textarea лишає користувачу контроль над висотою поля, не ламаючи layout.",
    proTip: "Винеси border-radius, border-color і padding поля в CSS-змінні (наприклад, --input-radius, --input-border) — тоді форма, кнопки й картки реагують на зміну дизайн-системи одним оновленням значення в одному місці, а не пошуком кожного окремого правила.",
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
      { id: "css-form-placeholder-find-bug", kind: "find-the-bug", prompt: "<input placeholder=\"Ваше ім'я\"> без жодного <label>. У чому проблема?", solution: "Placeholder зникає, щойно користувач починає вводити текст, і не є надійною заміною <label> для асистивних технологій. Потрібен справжній <label for=\"...\">, навіть якщо він візуально прихований." },
      { id: "css-form-textarea-choice", kind: "choice", prompt: "Textarea для коментаря до бронювання не повинна ламати layout форми, розтягуючись убік, але користувач має змогу зробити її вищою. Що обрати?", options: ["resize: none", "resize: both", "resize: vertical", "resize: horizontal"], correctAnswer: "resize: vertical", solution: "resize: vertical дозволяє змінювати тільки висоту, лишаючи ширину (і layout форми) незмінною." },
    ],
    quiz: {
      id: "css-real-forms-pricing-field-styling-quiz",
      title: "Швидка перевірка: Стилізація форми бронювання",
      questions: [
        {
          id: "css-rfp-q1-font-inherit",
          type: "single",
          question: "Поле input виглядає іншим шрифтом, ніж решта сайту. Що додати?",
          options: ["border: none", "font: inherit", "color: inherit", "outline: none"],
          correctAnswer: "font: inherit",
          explanation: "Браузери часто застосовують до полів системний шрифт замість успадкованого від сторінки. font: inherit синхронізує вигляд поля з рештою дизайну.",
        },
        {
          id: "css-rfp-q2-select-arrow",
          type: "code",
          question: "Що робить appearance: none на select, і чого не вистачає для завершення стилізації?",
          codeSnippet: `.form-field select {\n  appearance: none;\n}`,
          options: [
            "Прибирає системну стрілку select; потрібно додати власну через background-image",
            "Повністю ховає select зі сторінки",
            "Робить select нередагованим",
            "Нічого не змінює без vendor-префіксів",
          ],
          correctAnswer: "Прибирає системну стрілку select; потрібно додати власну через background-image",
          explanation: "appearance: none прибирає стандартний, системний вигляд select разом зі стрілкою ОС. Без власної іконки select виглядатиме як звичайний div без індикатора випадаючого списку.",
        },
        {
          id: "css-rfp-q3-placeholder-not-label",
          type: "true-false",
          question: "placeholder можна використовувати замість <label> — це рівноцінна заміна.",
          options: ["Так", "Ні"],
          correctAnswer: false,
          explanation: "Placeholder зникає, щойно користувач починає вводити текст, і не так надійно читається асистивними технологіями, як справжній <label>.",
        },
        {
          id: "css-rfp-q4-border-outline-bug",
          type: "code",
          question: "У чому проблема цього стилю для полів форми?",
          codeSnippet: "input {\n  border: none;\n  outline: none;\n}",
          options: [
            "Користувач більше не бачить межі поля — незрозуміло, куди клікати",
            "Поле стане недоступним для введення тексту",
            "border і outline не можна прибирати одночасно синтаксично",
            "Форма перестане відправлятись",
          ],
          correctAnswer: "Користувач більше не бачить межі поля — незрозуміло, куди клікати",
          explanation: "border і outline — основний візуальний сигнал \"тут є поле вводу\". Прибираючи обидва без заміни, поле зливається з фоном сторінки.",
        },
        {
          id: "css-rfp-q5-textarea-resize",
          type: "single",
          question: "Textarea для коментаря не повинна ламати layout форми, розтягуючись убік, але користувач має змогу зробити її вищою. Що обрати?",
          options: ["resize: none", "resize: both", "resize: vertical", "resize: horizontal"],
          correctAnswer: "resize: vertical",
          explanation: "resize: vertical дозволяє змінювати тільки висоту, лишаючи ширину (і layout форми) незмінною.",
        },
      ],
    },
  },

  "Стани валідації полів": {
    whatIsIt: "У попередньому уроці ми зробили поля форми узгодженими з дизайном сайту. Але користувач має розуміти не лише ЯК виглядає поле, а і В ЯКОМУ СТАНІ воно зараз — активне, з помилкою чи тимчасово недоступне.\n\n:focus-visible показує, яке поле активне зараз. :invalid реагує на некоректне значення (за атрибутами HTML — required, type=email тощо). :disabled стилізує неактивні поля.",
    whyUseIt: "Форма без візуального відгуку на помилку змушує користувача здогадуватись, чому кнопка \"Надіслати\" не спрацювала — стани валідації дають миттєвий, зрозумілий сигнал.",
    whenToUse: [":focus-visible — помітна рамка чи тінь навколо активного поля.", ":invalid — червона рамка чи іконка для полів з некоректним значенням (обов'язково разом із текстом помилки з модуля HTML-форм, не лише кольором).", ":disabled — приглушений вигляд для полів, що тимчасово недоступні.", "HTML5-атрибути валідації (required, type=\"email\", min/max, minlength/maxlength, pattern) — базова перевірка формату ще до будь-якого CSS чи JS.", "Клас form-input-error/form-input-success, доданий після реальної перевірки (submit чи backend) — надійніший за автоматичний :invalid для контрольованого моменту показу."],
    whenNotToUse: ["Не покладайся лише на колір для :invalid — частина користувачів не розрізняє кольори; текст помилки (з HTML-курсу) обов'язковий.", "Не стилізуй :invalid одразу при завантаженні порожньої обов'язкової форми — це виглядає так, ніби користувач уже щось зробив не так.", "Не плутай readonly і disabled — readonly-поле все ще відправляється з формою й доступне для фокусу, disabled — ні."],
    visualExplanation: {
      svg: `<svg viewBox="0 0 480 190" width="100%" height="100%" style="display:block;width:100%;height:auto;aspect-ratio:480 / 190" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Три стани поля: фокус, помилка і недоступне">
        <text x="80" y="20" font-size="12" font-weight="700" fill="var(--text)" text-anchor="middle">:focus-visible</text>
        <rect x="20" y="34" width="120" height="34" rx="8" fill="none" stroke="var(--primary)" stroke-width="3" />
        <rect x="14" y="28" width="132" height="46" rx="10" fill="none" stroke="var(--primary)" stroke-width="1.5" stroke-dasharray="3 3" />
        <text x="80" y="95" font-size="11" fill="var(--muted)" text-anchor="middle">помітний outline</text>
        <text x="240" y="20" font-size="12" font-weight="700" fill="var(--text)" text-anchor="middle">:invalid</text>
        <rect x="180" y="34" width="120" height="34" rx="8" fill="none" stroke="#dc2626" stroke-width="2" />
        <text x="240" y="95" font-size="11" fill="var(--muted)" text-anchor="middle">рамка + текст помилки</text>
        <text x="400" y="20" font-size="12" font-weight="700" fill="var(--text)" text-anchor="middle">:disabled</text>
        <rect x="340" y="34" width="120" height="34" rx="8" fill="var(--muted)" fill-opacity="0.15" stroke="var(--border)" stroke-width="2" />
        <text x="400" y="95" font-size="11" fill="var(--muted)" text-anchor="middle">приглушений вигляд</text>
        <text x="240" y="150" font-size="11" fill="var(--muted)" text-anchor="middle">одне й те саме поле — три різні сигнали користувачу</text>
      </svg>`,
      caption: "Три незалежні стани того самого поля: активне зараз, з помилкою, і тимчасово недоступне — кожен має свій візуальний сигнал.",
    },
    interactiveDemo: "forms-pricing-demo",
    comparisonTable: {
      headers: ["Псевдоклас / атрибут", "Коли застосовується", "Типовий стиль"],
      rows: [
        [":focus-visible", "Поле активне зараз (фокус з клавіатури)", "Помітний outline"],
        [":invalid:not(:placeholder-shown)", "Поле вже займане і має некоректне значення", "Червона рамка + текст помилки"],
        [":disabled", "Поле тимчасово недоступне, НЕ відправляється з формою", "Приглушений колір, cursor: not-allowed"],
        ["[readonly]", "Поле не редагується, але значення відправляється з формою", "Легка зміна фону, без приглушення"],
      ],
    },
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
      {
        before: "Різниця між disabled і readonly, і зірочка для обов'язкового поля через ::after:",
        code: `.form-input:disabled {
  color: #9b8b7a;
  background-color: #f0e4d8;
  cursor: not-allowed;
}

.form-input[readonly] {
  background-color: #f7eee5;
}

.form-label-required::after {
  content: " *";
  color: #c0392b;
}`,
        lineNotes: [
          "disabled — поле повністю неактивне і НЕ відправляється разом із формою (наприклад, поле стає доступним лише після вибору іншої опції).",
          "readonly — поле можна сфокусувати й прочитати, не можна редагувати, але значення все одно відправляється з формою (наприклад, вже підтверджене ім'я користувача).",
          "::after із зірочкою — декоративна позначка обов'язковості; сама по собі вона не замінює атрибут required у HTML.",
        ],
        after: "Користувач бачить різницю між \"поле поки недоступне\" (disabled) і \"поле фіксоване, але його значення враховується\" (readonly).",
      },
    ],
    commonMistakes: [":invalid без :not(:placeholder-shown) — порожнє обов'язкове поле виглядає помилковим одразу, ще до взаємодії користувача.", "Лише колір рамки для помилки, без тексту пояснення.", "Забутий стиль :disabled — неактивні поля виглядають так само, як активні, і плутають користувача.", "Плутанина disabled/readonly — використання disabled там, де дані поля мають потрапити в форму (наприклад, поле, яке лише не можна редагувати вручну)."],
    dontDoThis: { code: `input:invalid { border-color: red; }`, explanation: "Правило працює саме так, як написано: :invalid справді реагує на некоректне значення. Але щойно форма завантажується, усі порожні обов'язкові поля вже червоні — ще до того, як користувач хоч раз торкнувся форми. Виглядає так, ніби людина щось зробила неправильно, хоча вона просто відкрила сторінку. Причина в тому, що браузер вважає порожнє обов'язкове поле (required, без значення) технічно \"невалідним\" з першої секунди — :invalid чесно на це реагує, але без додаткової умови не розрізняє \"ще не заповнено\" і \"заповнено неправильно\". Виправлення: додати :not(:placeholder-shown) до селектора — тепер стиль помилки застосовується лише тоді, коли поле вже не порожнє (тобто користувач у нього щось вводив), а не одразу при завантаженні. Перевірити можна, відкривши форму з порожніми полями: з :not(:placeholder-shown) поля виглядають нейтрально, без нього — одразу червоні." },
    bestPractices: ["Комбінуй :invalid з :not(:placeholder-shown) чи класом, доданим після спроби відправки — щоб не лякати користувача завчасно.", "Завжди супроводжуй колір помилки текстом (aria-describedby з HTML-курсу форм).", "Використовуй HTML5-атрибути валідації (required, type, min/max, minlength/maxlength, pattern) як першу лінію захисту — вони працюють навіть без жодного CSS чи JS.", "Пам'ятай: frontend-валідація — для зручності користувача, backend-валідація — обов'язкова для безпеки й коректності даних."],
    remember: [":focus-visible — активне поле зараз.", ":invalid:not(:placeholder-shown) — уникає передчасного \"помилкового\" вигляду порожньої форми.", "Колір ніколи не єдиний сигнал помилки — потрібен текст.", "disabled не відправляється з формою, readonly — відправляється.", "HTML5-валідація (required/type/min/max/pattern) — база, яку варто задати ще до CSS-стилізації станів."],
    interviewQuestions: [
      { question: "Чому :invalid саме по собі може погіршити UX форми?", answer: "Без додаткових умов :invalid спрацьовує одразу для порожніх обов'язкових полів при завантаженні сторінки, показуючи помилку ще до того, як користувач почав взаємодію з формою." },
      { question: "У чому головна практична різниця між disabled і readonly?", answer: "readonly-поле лишається фокусованим і його значення відправляється разом із формою — воно просто не редагується користувачем. disabled-поле повністю виключається з взаємодії і НЕ потрапляє у дані форми при відправці." },
      { question: "Чи достатньо HTML5-атрибутів валідації (required, type=\"email\" тощо) без backend-перевірки?", answer: "Ні. Користувач може вимкнути JavaScript, змінити HTML у браузері чи відправити запит напряму, обходячи будь-яку frontend-перевірку. Backend завжди має самостійно перевіряти й валідувати отримані дані." },
    ],
    summary: ":focus-visible, :invalid і :disabled дають візуальний відгук на кожен стан поля. :invalid варто комбінувати з :not(:placeholder-shown), щоб не показувати помилку завчасно. disabled виключає поле з відправки форми, readonly — ні. Frontend-валідація ніколи не замінює backend.",
    proTip: "Якщо помилку показує JavaScript після реальної спроби відправки форми (а не автоматичний :invalid), додавай клас на кшталт .form-input-error разом з aria-invalid=\"true\" на самому полі — це дає точний контроль над моментом показу помилки й одночасно повідомляє скрінрідеру, що саме це поле некоректне.",
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
      { id: "css-readonly-vs-disabled-choice", kind: "choice", prompt: "Поле з уже підтвердженим email користувача не можна редагувати, але значення має піти разом із формою на сервер. Що обрати?", options: ["disabled", "readonly", "required", "hidden"], correctAnswer: "readonly", solution: "readonly не редагується, але лишається частиною даних форми при відправці; disabled повністю виключив би його зі значень, що відправляються." },
    ],
    quiz: {
      id: "css-real-forms-pricing-validation-states-quiz",
      title: "Швидка перевірка: Стани валідації полів",
      questions: [
        {
          id: "css-rfp-q1-invalid-premature",
          type: "code",
          question: "Порожнє обов'язкове поле виглядає \"помилковим\" одразу при завантаженні форми. У чому причина?",
          codeSnippet: "input:invalid {\n  border-color: red;\n}",
          options: [
            "Відсутній :not(:placeholder-shown) — :invalid спрацьовує для порожнього required-поля одразу",
            "border-color не може бути red",
            ":invalid працює лише для type=\"email\"",
            "Потрібен !important",
          ],
          correctAnswer: "Відсутній :not(:placeholder-shown) — :invalid спрацьовує для порожнього required-поля одразу",
          explanation: "Браузер вважає порожнє обов'язкове поле технічно \"невалідним\" з першої секунди. :not(:placeholder-shown) відкладає стиль помилки, доки користувач не почне вводити текст.",
        },
        {
          id: "css-rfp-q2-disabled-vs-readonly",
          type: "single",
          question: "Поле з уже підтвердженим email користувача не можна редагувати, але значення має піти разом із формою на сервер. Що обрати?",
          options: ["disabled", "readonly", "required", "hidden"],
          correctAnswer: "readonly",
          explanation: "readonly не редагується, але лишається частиною даних форми при відправці; disabled повністю виключив би його зі значень, що відправляються.",
        },
        {
          id: "css-rfp-q3-color-only-error",
          type: "true-false",
          question: "Червоної рамки (border-color: red) достатньо як єдиного сигналу помилки поля, без тексту пояснення.",
          options: ["Так", "Ні"],
          correctAnswer: false,
          explanation: "Частина користувачів не розрізняє кольори — колір ніколи не має бути єдиним сигналом. Текст помилки обов'язковий.",
        },
        {
          id: "css-rfp-q4-focus-visible-purpose",
          type: "single",
          question: "Яке призначення :focus-visible серед станів поля форми?",
          options: [
            "Показує, яке поле активне зараз (отримало фокус)",
            "Показує, що поле містить помилку",
            "Показує, що поле недоступне для редагування",
            "Змінює тип поля на email",
          ],
          correctAnswer: "Показує, яке поле активне зараз (отримало фокус)",
          explanation: ":focus-visible — індикатор поточного фокусу, окремий від :invalid (помилка) чи :disabled (недоступність).",
        },
        {
          id: "css-rfp-q5-frontend-validation-enough",
          type: "true-false",
          question: "HTML5-атрибутів валідації (required, type=\"email\") достатньо без перевірки на backend.",
          options: ["Так", "Ні"],
          correctAnswer: false,
          explanation: "Користувач може вимкнути JavaScript чи відправити запит напряму, обходячи frontend-перевірку. Backend завжди має самостійно перевіряти отримані дані.",
        },
      ],
    },
  },

  "Прайс-таблиця як картки": {
    whatIsIt: "У попередньому уроці ми навчили поля форми показувати свій стан. Тепер повертаємось до вже знайомого прийому (Grid + картки з модуля \"Кнопки і картки\") і застосовуємо його до ще одного реального блоку — прайс-таблиці кав'ярні.\n\nПеретворення таблиці цін (з HTML-курсу) на картки через CSS Grid: кожен рядок стає окремою карткою з ціною, виділеною типографічно (більший розмір, вага чи колір).",
    whyUseIt: "Таблиця залишається семантично таблицею для доступності (th/scope з HTML-курсу), але візуально картки читаються легше й сучасніше, ніж рядки з лініями.",
    whenToUse: ["Grid для розташування карток цін у ряд/сітку.", "Виділення ціни через більший font-size і font-weight — вона найважливіша інформація картки.", "flex-direction: column + flex-grow на блоці контенту — коли кнопка (\"Замовити\") має завжди лишатись унизу картки, незалежно від довжини опису.", "::before з \"✓\" у списку переваг — компактний спосіб показати список \"що входить\", не вигадуючи зайвих іконок."],
    whenNotToUse: ["Не міняй семантичні теги (table/th/scope) заради стилю — CSS може повністю змінити вигляд, зберігши доступну розмітку.", "Не роби всі картки прайсу однаково нейтральними, якщо один варіант — рекомендований; виділи його (рамка кольору бренду, значок).", "Не клади бейдж у кут картки (position: absolute) без padding-right на заголовку — інакше текст назви може заходити під бейдж."],
    visualExplanation: {
      svg: `<svg viewBox="0 0 460 200" width="100%" height="100%" style="display:block;width:100%;height:auto;aspect-ratio:460 / 200" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Рядок таблиці перетворюється на картку, один варіант виділений як рекомендований">
        <text x="80" y="20" font-size="12" font-weight="700" fill="var(--muted)" text-anchor="middle">рядок таблиці</text>
        <line x1="20" y1="40" x2="160" y2="40" stroke="var(--border)" stroke-width="1.5" />
        <text x="30" y="60" font-size="11" fill="var(--muted)">Еспресо ...... 45 грн</text>
        <line x1="20" y1="76" x2="160" y2="76" stroke="var(--border)" stroke-width="1.5" />
        <text x="220" y="20" font-size="12" font-weight="700" fill="var(--muted)" text-anchor="middle">картка</text>
        <rect x="185" y="34" width="110" height="90" rx="10" fill="none" stroke="var(--border)" stroke-width="2" />
        <text x="240" y="58" font-size="11" fill="var(--text)" text-anchor="middle">Еспресо</text>
        <text x="240" y="82" font-size="16" font-weight="700" fill="var(--primary)" text-anchor="middle">45 грн</text>
        <text x="380" y="20" font-size="12" font-weight="700" fill="var(--primary)" text-anchor="middle">рекомендовано</text>
        <rect x="345" y="30" width="110" height="98" rx="10" fill="none" stroke="var(--primary)" stroke-width="3" />
        <rect x="345" y="22" width="70" height="18" rx="9" fill="var(--primary)" />
        <text x="380" y="35" font-size="9" fill="white" text-anchor="middle">ХІТ</text>
        <text x="400" y="66" font-size="11" fill="var(--text)" text-anchor="middle">Капучино</text>
        <text x="400" y="90" font-size="16" font-weight="700" fill="var(--primary)" text-anchor="middle">55 грн</text>
      </svg>`,
      caption: "Той самий рядок прайсу стає карткою; товщий border і значок кольору бренду виділяють рекомендований варіант серед решти.",
    },
    interactiveDemo: "price-cards-demo",
    comparisonTable: {
      headers: ["Що саме", "Звичайний рядок таблиці", "Картка (той самий рядок)"],
      rows: [
        ["Розмітка", "table/th/scope", "Та сама розмітка — змінюється лише CSS-вигляд (Grid/Flex)"],
        ["Ціна", "Звичайний текст у комірці", "Виділена font-size, font-weight і кольором бренду"],
        ["Кнопка \"Замовити\"", "—", "flex-grow на блоці контенту притискає її донизу картки"],
        ["Рекомендований варіант", "—", "Товщий border кольору бренду + текстовий бейдж через ::before"],
      ],
    },
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
      {
        before: "Кнопка завжди внизу картки (незалежно від довжини опису) і список переваг з галочками через ::before:",
        code: `.price-card {
  display: flex;
  flex-direction: column;
}

.price-card-content {
  flex-grow: 1;
}

.price-card-list {
  display: grid;
  gap: 8px;
  margin: 20px 0 0;
  padding: 0;
  list-style: none;
}

.price-card-list li {
  position: relative;
  padding-left: 22px;
}

.price-card-list li::before {
  content: "✓";
  position: absolute;
  left: 0;
  top: 0;
  color: var(--color-primary);
  font-weight: 900;
}`,
        lineNotes: [
          "price-card-content з flex-grow: 1 займає весь вільний простір картки — кнопка після нього притискається вниз, навіть якщо опис у сусідній картці коротший.",
          "::before з content: \"✓\" замінює справжню іконку-галочку — жодних додаткових зображень чи іконкових шрифтів не потрібно.",
        ],
        after: "Кнопки \"Замовити\" вирівняні по нижньому краю всіх карток одного рядка, а список переваг має акуратні галочки без зайвих HTML-елементів.",
      },
      {
        before: "Виділення рекомендованого варіанта товщим border кольору бренду й значком:",
        code: `.price-card--recommended {
  border: 3px solid var(--color-primary);
  position: relative;
}

.price-card--recommended::before {
  content: "Хіт продажів";
  position: absolute;
  top: -12px;
  left: 16px;
  background: var(--color-primary);
  color: white;
  font-size: 0.75rem;
  padding: 4px 10px;
  border-radius: 999px;
}

.price-card--recommended .price-card-title {
  padding-right: 90px;
}`,
        lineNotes: ["border товщиною 3px і кольором бренду відразу вирізняє картку серед нейтральних сусідів.", "::before з position: absolute малює бейдж-\"пігулку\", що виступає над верхнім краєм картки.", "padding-right на заголовку залишає місце під бейдж, щоб довга назва не заходила під нього."],
        after: "Рекомендований варіант прайсу одразу впадає в очі завдяки товстій рамці бренду й бейджу, не змінюючи структуру решти карток.",
      },
    ],
    commonMistakes: ["Заміна семантичної table на div заради стилю — губиться доступність без потреби.", "Ціна не виділена нічим — губиться серед іншого тексту картки.", "Рекомендований варіант нічим не відрізняється від решти.", "Кнопка картки не притиснута донизу — без flex-grow на блоці контенту кнопки різних карток опиняються на різній висоті, якщо описи різної довжини.", "Бейдж рекомендованого варіанта накладається на текст заголовка — забутий padding-right на назві картки."],
    dontDoThis: { code: `<div class="price-row">Еспресо — 45 грн</div>`, explanation: "Візуально картка виглядає рівно так, як задумано — сучасно, з тінню й округленими кутами, ціль ніби досягнута. Але для користувача скрінрідера, чи для пошукової системи, що аналізує структуру сторінки, зникло розуміння, що це саме табличні дані (назва напою й відповідна йому ціна) — тепер це просто текст у безликому блоці. Причина в тому, що вигляд і структура даних — це дві незалежні речі: table/th/scope описують СТРУКТУРУ (що з чим пов'язане), а CSS відповідає лише за те, як ця структура виглядає на екрані; заміна table на div заради \"картки\" плутає ці дві задачі, хоча вирішувати їх можна незалежно. Виправлення: зберегти семантичну table-розмітку (чи <article> для кожного рядка з правильною внутрішньою структурою), а картковий вигляд отримати повністю через CSS (display: grid/flex, border-radius, box-shadow) — доступність і сучасний дизайн не суперечать одне одному. Перевірити можна, увімкнувши скрінрідер (чи структуру сторінки в DevTools): чи розуміє він, що \"Еспресо\" і \"45 грн\" — пов'язані значення одного рядка, а не випадковий сусідній текст?" },
    bestPractices: ["Стилізуй наявну семантичну розмітку, не заміняй її на div заради зовнішнього вигляду.", "Візуально виділяй найважливішу інформацію картки (ціну) розміром і вагою шрифту, а не лише кольором.", "Тримай кнопку картки внизу через flex-grow на блоці контенту — картки одного рядка виглядають вирівняними навіть з різною довжиною опису.", "Виділяй рекомендований варіант і кольором рамки, і текстовим бейджем — не лише кольором, щоб сигнал був зрозумілим і для тих, хто погано розрізняє кольори."],
    remember: ["CSS може повністю змінити вигляд таблиці, зберігши її доступну структуру.", "Ціна — головна інформація картки, виділяй її явно.", "Рекомендований варіант має візуально виділятись — рамкою і бейджем, не лише кольором.", "flex-direction: column + flex-grow на контенті — стандартний спосіб \"приколоти\" кнопку до низу картки.", "padding-right на заголовку картки з бейджем запобігає накладанню тексту на значок."],
    interviewQuestions: [
      { question: "Чи потрібно міняти <table> на <div>, щоб зробити прайс схожим на картки?", answer: "Ні — CSS (Grid, display: block на елементах таблиці за потреби) може повністю змінити зовнішній вигляд, зберігши семантичну структуру table/th/scope для скрінрідерів." },
      { question: "Як зробити так, щоб кнопка в картці завжди була внизу, незалежно від довжини опису над нею?", answer: "Зроби картку flex-колонкою (display: flex; flex-direction: column), а блок з описом/ціною — flex-grow: 1. Він займе весь вільний простір картки, і кнопка після нього природно опиниться внизу, навіть якщо сусідні картки мають коротший текст." },
      { question: "Чому для рекомендованого варіанта прайсу недостатньо змінити лише колір рамки?", answer: "Частина користувачів погано розрізняє кольори, тож самої зміни кольору може бути недостатньо, щоб варіант помітно виділявся. Текстовий бейдж (\"Хіт продажів\", \"Рекомендуємо\") дублює сигнал словами, а не лише кольором." },
    ],
    summary: "Прайс кав'ярні можна перетворити на сучасні картки через CSS, зберігши семантичну table-розмітку з HTML-курсу. Ціна — головний елемент, який варто виділяти найпомітніше. flex-grow на блоці контенту тримає кнопку внизу картки незалежно від довжини опису, а рекомендований варіант варто виділяти і рамкою, і текстовим бейджем.",
    proTip: "Значок-бейдж на кшталт \"Хіт продажів\" працює краще, якщо він винесений в окремий, перевикористовуваний CSS-клас (.badge--accent), а не написаний одноразово для конкретної картки прайсу — той самий клас потім згодиться для позначок на картках меню чи в галереї.",
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
      { id: "css-price-cards-badge-find-bug", kind: "find-the-bug", prompt: "Бейдж \"Хіт продажів\" (position: absolute, top: -12px) накладається на довгу назву картки \"Фірмовий раф з корицею\". Чого бракує в CSS заголовка?", solution: "padding-right на заголовку картки — без нього довгий текст назви заходить прямо під бейдж, що виступає над карткою." },
    ],
    quiz: {
      id: "css-real-forms-pricing-price-cards-quiz",
      title: "Швидка перевірка: Прайс-таблиця як картки",
      questions: [
        {
          id: "css-rfp-q1-table-to-div",
          type: "code",
          question: "У чому проблема цього переходу від таблиці до картки?",
          codeSnippet: '<div class="price-row">Еспресо — 45 грн</div>',
          options: [
            "Втрачається семантична структура (табличний зв'язок назви й ціни) для скрінрідерів",
            "div не можна стилізувати через CSS Grid",
            "Текст перестане відображатись",
            "Це швидше за table у продуктивності рендерингу",
          ],
          correctAnswer: "Втрачається семантична структура (табличний зв'язок назви й ціни) для скрінрідерів",
          explanation: "table/th/scope описують структуру даних, а CSS — лише вигляд. Заміна table на div заради картки губить доступну структуру без потреби — CSS міг би змінити вигляд, зберігши table.",
        },
        {
          id: "css-rfp-q2-recommended-highlight",
          type: "single",
          question: "Потрібно виділити один із трьох варіантів прайсу як \"рекомендований\". Найкращий спосіб?",
          options: ["Зробити текст трохи більшим", "Додати рамку кольору бренду й текстовий бейдж", "Нічого не робити, це й так зрозуміло", "Написати CAPS LOCK"],
          correctAnswer: "Додати рамку кольору бренду й текстовий бейдж",
          explanation: "Явний візуальний акцент і рамкою, і текстовим бейджем — найзрозуміліший спосіб, бо не покладається лише на колір.",
        },
        {
          id: "css-rfp-q3-flex-grow-button",
          type: "code",
          question: "Навіщо тут flex-grow: 1 на .price-card-content?",
          codeSnippet: ".price-card {\n  display: flex;\n  flex-direction: column;\n}\n\n.price-card-content {\n  flex-grow: 1;\n}",
          options: [
            "Щоб кнопка після контенту завжди притискалась донизу картки, незалежно від довжини опису",
            "Щоб текст опису центрувався",
            "Щоб картка стала ширшою",
            "flex-grow тут нічого не робить без flex-wrap",
          ],
          correctAnswer: "Щоб кнопка після контенту завжди притискалась донизу картки, незалежно від довжини опису",
          explanation: "flex-grow: 1 на блоці контенту займає весь вільний простір картки — кнопка після нього природно опиняється внизу, навіть якщо сусідні картки мають коротший опис.",
        },
        {
          id: "css-rfp-q4-badge-padding-bug",
          type: "code",
          question: "Бейдж «Хіт продажів» (position: absolute; top: -12px) накладається на довгу назву картки. Чого бракує?",
          codeSnippet: ".price-card--recommended .price-card-title {\n  /* немає padding-right */\n}",
          options: [
            "padding-right на заголовку картки, щоб текст не заходив під бейдж",
            "z-index на заголовку",
            "border-radius на бейджі",
            "font-weight на заголовку",
          ],
          correctAnswer: "padding-right на заголовку картки, щоб текст не заходив під бейдж",
          explanation: "Без padding-right довгий текст назви заходить прямо під бейдж, що виступає над карткою.",
        },
        {
          id: "css-rfp-q5-price-emphasis",
          type: "single",
          question: "Яка інформація в картці прайсу найважливіша й має бути виділена найпомітніше (розмір, вага шрифту)?",
          options: ["Назва напою", "Ціна", "Опис", "Кнопка \"Замовити\""],
          correctAnswer: "Ціна",
          explanation: "Ціна — найважливіша інформація картки прайсу, тому її варто виділяти найбільшим розміром і вагою шрифту серед решти тексту.",
        },
      ],
    },
  },

  "Footer-макет на Grid": {
    interactiveDemo: "footer-grid-demo",
    whatIsIt: "У попередньому уроці ми оформили прайс кав'ярні картками на Grid. Це останній великий блок сторінки — footer, з тими самими інструментами Grid, що ми вже застосовували вище, але з власними деталями доступності (клікабельні контакти, окрема навігація).\n\nFooter з кількома колонками (контакти, посилання, форма підписки) через Grid. На вузьких екранах колонки природно складаються в один стовпчик завдяки auto-fit/minmax — без окремого медіазапиту.",
    whyUseIt: "Footer — це останнє, що бачить відвідувач; розкидані без структури посилання й контакти виглядають недбало саме в кінці сторінки.\n\nДо CSS Grid такий багатоколонковий, але \"складний\" на мобільному layout доводилось збирати на float чи flex з купою допоміжних медіазапитів для кожної колонки окремо. Grid вирішує це одним рядком (auto-fit + minmax), бо він від початку створений саме для 2D-розкладок (рядки й колонки одночасно), а не лише для одного напрямку, як flex.",
    whenToUse: ["Grid з кількома колонками для розділів footer (контакти / посилання / підписка).", "Той самий repeat(auto-fit, minmax(...)) патерн, що й у галереї та картках.", "grid-template-columns: 2fr 1fr 1fr 1fr — коли перша колонка (бренд + опис) логічно ширша за решту.", "<a href=\"tel:...\">/<a href=\"mailto:...\">— для контактів у footer, щоб телефон і email були клікабельними, а не просто текстом.", "<nav aria-label=\"Footer\"> навколо груп посилань — щоб скрінрідер міг оголосити це як окремий навігаційний блок, відмінний від головного меню."],
    whenNotToUse: ["Не роби footer суцільним текстом в один рядок, якщо в ньому кілька логічних груп інформації — це важко сканувати оком.", "Не забувай відступ (padding) footer від контенту над ним і від країв екрана.", "Не залишай телефон/email просто текстом (<p>+380...) — користувач очікує можливості натиснути й одразу подзвонити чи написати листа.", "Не став auto-fill там, де контенту завжди рівно стільки ж, скільки колонок, — auto-fill залишає порожні \"невидимі\" колонки-заглушки, тоді як auto-fit акуратно віддає їхнє місце наявним елементам."],
    visualExplanation: {
      svg: `<svg viewBox="0 0 480 220" width="100%" height="100%" style="display:block;width:100%;height:auto;aspect-ratio:480 / 220" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Footer із 4 колонок на десктопі складається в 1 колонку на мобільному">
        <text x="115" y="20" font-size="13" font-weight="700" fill="var(--text)" text-anchor="middle">десктоп (широкий footer)</text>
        <rect x="10" y="30" width="210" height="150" rx="6" fill="none" stroke="var(--border)" stroke-width="2" />
        <rect x="18" y="40" width="60" height="130" rx="3" fill="var(--primary)" fill-opacity="0.45" />
        <rect x="84" y="40" width="42" height="130" rx="3" fill="var(--primary)" fill-opacity="0.3" />
        <rect x="132" y="40" width="42" height="130" rx="3" fill="var(--primary)" fill-opacity="0.3" />
        <rect x="180" y="40" width="42" height="130" rx="3" fill="var(--primary)" fill-opacity="0.3" />
        <text x="115" y="196" font-size="11" fill="var(--muted)" text-anchor="middle">2fr 1fr 1fr 1fr</text>
        <text x="360" y="20" font-size="13" font-weight="700" fill="var(--text)" text-anchor="middle">телефон (вузький footer)</text>
        <rect x="290" y="30" width="180" height="150" rx="6" fill="none" stroke="var(--border)" stroke-width="2" />
        <rect x="300" y="40" width="160" height="24" rx="3" fill="var(--primary)" fill-opacity="0.45" />
        <rect x="300" y="70" width="160" height="24" rx="3" fill="var(--primary)" fill-opacity="0.3" />
        <rect x="300" y="100" width="160" height="24" rx="3" fill="var(--primary)" fill-opacity="0.3" />
        <rect x="300" y="130" width="160" height="24" rx="3" fill="var(--primary)" fill-opacity="0.3" />
        <text x="380" y="196" font-size="11" fill="var(--muted)" text-anchor="middle">1 колонка</text>
      </svg>`,
      caption: "auto-fit сам вирішує, скільки колонок поміщається: 4 на широкому footer, 1 на вузькому — той самий CSS без жодного медіазапиту.",
    },
    comparisonTable: {
      headers: ["", "auto-fit", "auto-fill"],
      rows: [
        ["Коли реальних елементів менше, ніж могло б поміститись колонок", "Схлопує порожні місця, розтягує наявні елементи на все вільне місце", "Залишає порожні \"невидимі\" колонки-заглушки"],
        ["Коли обирати для footer із фіксованою кількістю розділів", "Майже завжди — саме цей варіант", "Рідко: лише якщо кількість елементів справді буде змінюватись"],
      ],
    },
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
      {
        before: "Клікабельні контакти (tel:/mailto:) і бренд-колонка, що займає всю ширину першого рядка на планшеті:",
        code: `<a href="tel:+380000000000">+380 00 000 00 00</a>
<a href="mailto:hello@aroma.coffee">hello@aroma.coffee</a>

<style>
@media (max-width: 900px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
  }

  .footer-brand {
    grid-column: 1 / -1;
  }
}
</style>`,
        lineNotes: [
          "href=\"tel:...\" і href=\"mailto:...\" перетворюють текст на клікабельні дії — телефон одразу дзвонить, email одразу відкриває поштовий клієнт.",
          "grid-column: 1 / -1 розтягує бренд-колонку на всю ширину рядка (від першої лінії сітки до останньої) — зручно, коли на планшеті вона не повинна ділити рядок з іншим блоком.",
        ],
        after: "Контакти в footer одразу клікабельні, а бренд-блок на планшеті займає власний повний рядок над рештою колонок.",
      },
      {
        before: "Групи посилань footer, доступно позначені як окрема навігація, плюс форма підписки в останній колонці:",
        code: `<nav class="footer-links" aria-label="Footer">
  <h3>Меню</h3>
  <a href="#menu">Кава</a>
  <a href="#menu">Десерти</a>
</nav>

<form class="footer-subscribe">
  <label for="footer-email">Розсилка новин</label>
  <input id="footer-email" type="email" placeholder="you@example.com">
  <button type="submit">Підписатись</button>
</form>`,
        lineNotes: [
          "aria-label=\"Footer\" відрізняє цю навігацію від головного меню сайту для користувачів скрінрідерів (інакше обидва <nav> звучать однаково — просто \"навігація\").",
          "Форма підписки — звичайна колонка Grid, як і решта; їй не потрібні жодні спеціальні правила розташування.",
        ],
        after: "Скрінрідер оголошує \"навігація Footer\" замість просто \"навігація\", а форма підписки природно займає свою колонку в тій самій сітці.",
      },
    ],
    commonMistakes: ["Footer без внутрішньої структури — суцільний блок тексту й посилань.", "Колір тексту footer, що зливається з темним фоном (недостатній контраст).", "Забутий padding — контент footer притиснутий до країв екрана.", "Телефон чи email у footer як звичайний текст, а не посилання tel:/mailto: — користувач не може одразу зателефонувати чи написати.", "auto-fill замість auto-fit там, де колонок footer завжди рівно стільки ж, скільки груп контенту — auto-fill залишає порожні колонки-заглушки, і решта елементів не розтягується, щоб їх заповнити.", "Кілька <nav> без aria-label — скрінрідер не може розрізнити головне меню й посилання footer між собою."],
    dontDoThis: { code: `.site-footer { color: #374151; background: #1f2937; }`, explanation: "У редакторі коду обидва кольори виглядають окей — темно-сірий текст і темний фон, нічого явно \"зламаного\". Але на реальному екрані текст footer ледь помітний: він майже зливається з фоном, і відвідувач, який шукає контакти чи посилання в самому кінці сторінки, буквально не може їх прочитати. Причина в тому, що #374151 і #1f2937 — обидва темні кольори з дуже близькою яскравістю; контраст між текстом і фоном визначається саме різницею яскравості, а не тим, що кольори технічно \"різні\" в HEX-коді. Виправлення: замінити колір тексту на явно світлий (white або #f3f4f6) — тепер різниця яскравості достатня, щоб текст читався одразу, без напруження очей. Перевірити можна інструментом перевірки контрасту в DevTools (Chrome показує співвідношення контрасту прямо при виборі кольору) — мінімум 4.5:1 для звичайного тексту." },
    bestPractices: ["Використовуй той самий repeat(auto-fit, minmax(...)) патерн для footer, що й для галереї/карток — узгодженість підходу по всьому сайту.", "Перевіряй контраст тексту footer на темному фоні (мінімум 4.5:1 для звичайного тексту).", "Завжди роби телефон і email клікабельними через tel:/mailto: — це очікувана, стандартна поведінка footer-контактів.", "grid-column: 1 / -1 для бренд-колонки на проміжних розмірах екрана — акуратніше, ніж дозволяти їй ділити рядок з випадковим сусідом.", "Обгортай групи посилань footer у <nav aria-label=\"Footer\">, якщо на сторінці вже є головна навігація — це прибирає плутанину для скрінрідерів."],
    remember: ["Grid з auto-fit/minmax складає колонки footer на вузьких екранах автоматично.", "Контраст тексту на темному фоні footer — обов'язково перевіряти.", "padding footer так само важливий, як і в будь-якій іншій секції.", "tel:/mailto: роблять контакти footer клікабельними, а не просто текстом.", "grid-column: 1 / -1 розтягує елемент на всю ширину сітки — зручно для бренд-блоку на проміжних екранах.", "auto-fit прибирає порожні колонки-заглушки, auto-fill їх залишає — для footer майже завжди потрібен саме auto-fit."],
    interviewQuestions: [
      { question: "Чому той самий repeat(auto-fit, minmax(...)) патерн можна перевикористати і для галереї, і для footer?", answer: "Це загальне рішення задачі \"адаптивна кількість колонок без медіазапитів\" — воно не прив'язане до конкретного контенту, тому підходить для будь-якої сітки: фото, карток чи розділів footer." },
      { question: "Що означає grid-column: 1 / -1, і навіщо він потрібен для бренд-колонки footer?", answer: "1 / -1 означає \"від першої лінії сітки до останньої\", тобто елемент розтягується на всю ширину контейнера незалежно від кількості колонок. Для бренд-блоку footer це зручно на проміжних розмірах екрана (наприклад, 2 колонки), щоб він займав окремий повний рядок, а не тіснився з сусіднім блоком." },
      { question: "У чому різниця між repeat(auto-fit, minmax()) і repeat(auto-fill, minmax()) для footer із чотирма фіксованими розділами?", answer: "auto-fill залишає в сітці порожні \"колонки-заглушки\", якщо реальних елементів менше, ніж могло б поміститися, — колонки не розтягуються, щоб їх заповнити. auto-fit, навпаки, схлопує порожні місця й розтягує наявні елементи на все вільне місце. Для footer із заздалегідь відомою кількістю розділів практично завжди потрібен auto-fit." },
    ],
    summary: "Footer на Grid з auto-fit/minmax (чи явними 2fr 1fr 1fr 1fr) ділиться на колонки, які природно складаються на вузьких екранах. Контакти footer роблять клікабельними через tel:/mailto:, а grid-column: 1 / -1 розтягує бренд-блок на проміжних розмірах екрана. Групи посилань варто обгортати в <nav aria-label=\"Footer\">, щоб відрізнити їх від головної навігації для скрінрідерів.",
    proTip: "auto-fit + minmax() у footer — один із небагатьох CSS-патернів, які реально замінюють цілий набір медіазапитів одним рядком; саме тому Grid, а не flexbox, став стандартом для такого роду 2D-розкладок 2023-2026 років.",
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
      { id: "css-footer-tel-find-bug", kind: "find-the-bug", prompt: "<p>+380 00 000 00 00</p> у колонці контактів footer. У чому проблема?", solution: "Це звичайний текст, а не посилання — користувач не може натиснути й одразу зателефонувати. Потрібно <a href=\"tel:+380000000000\">." },
      { id: "css-footer-autofit-vs-autofill-choice", kind: "choice", prompt: "Footer завжди має рівно 4 розділи (бренд, контакти, посилання, підписка). Що обрати для grid-template-columns?", options: ["repeat(auto-fill, minmax(200px, 1fr))", "repeat(auto-fit, minmax(200px, 1fr))", "repeat(4, 1fr) без minmax", "display: inline"], correctAnswer: "repeat(auto-fit, minmax(200px, 1fr))", solution: "auto-fit розтягує наявні 4 розділи на все вільне місце, коли колонок поміщається менше 4; auto-fill замість цього залишив би порожні невидимі колонки-заглушки." },
    ],
    quiz: {
      id: "css-real-forms-pricing-footer-grid-quiz",
      title: "Швидка перевірка: Footer-макет на Grid",
      questions: [
        {
          id: "css-rfp-q1-autofit-narrow",
          type: "single",
          question: "Footer з grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)) переглядають на екрані шириною 380px. Скільки колонок?",
          options: ["Чотири", "Дві", "Одна", "Нуль — сітка ламається"],
          correctAnswer: "Одна",
          explanation: "380px замало для двох колонок по 200px з gap, тому auto-fit складає все в один стовпчик.",
        },
        {
          id: "css-rfp-q2-tel-link",
          type: "code",
          question: "У чому проблема цього контакту у footer?",
          codeSnippet: "<p>+380 00 000 00 00</p>",
          options: [
            "Це звичайний текст, а не клікабельне посилання tel:",
            "Номер телефону написано в неправильному форматі",
            "<p> не можна використовувати у footer",
            "Потрібен clas=\"phone\"",
          ],
          correctAnswer: "Це звичайний текст, а не клікабельне посилання tel:",
          explanation: "Користувач очікує можливості натиснути й одразу зателефонувати. Потрібен <a href=\"tel:+380000000000\">.",
        },
        {
          id: "css-rfp-q3-autofit-vs-autofill-fixed",
          type: "single",
          question: "Footer завжди має рівно 4 розділи (бренд, контакти, посилання, підписка). Що обрати для grid-template-columns?",
          options: [
            "repeat(auto-fill, minmax(200px, 1fr))",
            "repeat(auto-fit, minmax(200px, 1fr))",
            "repeat(4, 1fr) без minmax",
            "display: inline",
          ],
          correctAnswer: "repeat(auto-fit, minmax(200px, 1fr))",
          explanation: "auto-fit розтягує наявні 4 розділи на все вільне місце, коли колонок поміщається менше 4; auto-fill залишив би порожні невидимі колонки-заглушки.",
        },
        {
          id: "css-rfp-q4-contrast-bug",
          type: "code",
          question: "У чому проблема цього стилю footer?",
          codeSnippet: ".site-footer {\n  color: #374151;\n  background: #1f2937;\n}",
          options: [
            "Недостатній контраст — обидва кольори темні, текст ледь помітний на фоні",
            "color і background не можна задавати разом",
            "Значення HEX некоректні",
            "Потрібен !important",
          ],
          correctAnswer: "Недостатній контраст — обидва кольори темні, текст ледь помітний на фоні",
          explanation: "#374151 і #1f2937 — обидва темні кольори з близькою яскравістю. Контраст визначається різницею яскравості; текст footer потрібно робити явно світлим (white/#f3f4f6).",
        },
        {
          id: "css-rfp-q5-nav-aria-label",
          type: "single",
          question: "На сторінці вже є головна навігація <nav>. Навіщо додавати aria-label=\"Footer\" до <nav> у футері?",
          options: [
            "Щоб скрінрідер міг розрізнити цю навігацію від головного меню сайту",
            "Це обов'язковий синтаксис HTML для будь-якого <nav>",
            "Щоб посилання footer стали клікабельними",
            "Щоб footer виглядав по-іншому візуально",
          ],
          correctAnswer: "Щоб скрінрідер міг розрізнити цю навігацію від головного меню сайту",
          explanation: "Без aria-label обидва <nav> звучать для скрінрідера однаково — просто \"навігація\". aria-label=\"Footer\" дає їм окремі, зрозумілі назви.",
        },
      ],
    },
  },
};

export const cssRealFormsPricingModuleQuiz: QuizData = {
  id: "css-real-forms-pricing-module-quiz",
  title: "Контрольний тест: Форми, ціни і footer",
  questions: [
    {
      id: "css-rfp-mod-q1-font-inherit",
      type: "single",
      question: "Чому варто задавати font: inherit для input/textarea/select?",
      options: [
        "Браузери часто застосовують до полів системний шрифт замість успадкованого від сторінки",
        "Це обов'язковий атрибут для валідної форми",
        "Без нього форма не відправляється",
        "Це прибирає системну стрілку select",
      ],
      correctAnswer: "Браузери часто застосовують до полів системний шрифт замість успадкованого від сторінки",
      explanation: "font: inherit синхронізує вигляд полів форми з рештою дизайну сайту.",
    },
    {
      id: "css-rfp-mod-q2-invalid-placeholder-shown",
      type: "true-false",
      question: ":invalid без :not(:placeholder-shown) показує помилку одразу для порожнього обов'язкового поля при завантаженні форми.",
      options: ["Так", "Ні"],
      correctAnswer: true,
      explanation: "Браузер вважає порожнє required-поле технічно невалідним з першої секунди — без додаткової умови це виглядає як передчасна помилка.",
    },
    {
      id: "css-rfp-mod-q3-table-preserved",
      type: "single",
      question: "Прайс кав'ярні стилізовано як картки через CSS Grid. Що при цьому має залишитись незмінним у HTML?",
      options: [
        "Семантична розмітка table/th/scope",
        "Клас .price-row",
        "Порядок колонок у файлі CSS",
        "Кількість карток на екрані",
      ],
      correctAnswer: "Семантична розмітка table/th/scope",
      explanation: "CSS повністю змінює вигляд, але семантична структура (table/th/scope) має зберігатись для доступності — вигляд і структура даних незалежні одне від одного.",
    },
    {
      id: "css-rfp-mod-q4-autofit-footer",
      type: "code",
      question: "Footer завжди має рівно 4 розділи. Чому тут краще auto-fit, а не auto-fill?",
      codeSnippet: ".site-footer {\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n}",
      options: [
        "auto-fit розтягує наявні розділи на вільне місце; auto-fill залишив би порожні колонки-заглушки",
        "auto-fill взагалі не підтримується в footer",
        "auto-fit працює лише з фіксованою кількістю колонок",
        "Різниці немає — вони ідентичні",
      ],
      correctAnswer: "auto-fit розтягує наявні розділи на вільне місце; auto-fill залишив би порожні колонки-заглушки",
      explanation: "Коли реальних елементів менше, ніж могло б поміститись колонок, auto-fit схлопує порожні місця й розтягує наявні елементи, а auto-fill залишає невидимі порожні колонки.",
    },
    {
      id: "css-rfp-mod-q5-disabled-vs-readonly-mod",
      type: "true-false",
      question: "disabled-поле відправляється разом із формою так само, як readonly-поле.",
      options: ["Так", "Ні"],
      correctAnswer: false,
      explanation: "readonly-поле лишається частиною даних форми при відправці. disabled-поле повністю виключається зі значень, що відправляються.",
    },
    {
      id: "css-rfp-mod-q6-true-statements",
      type: "multiple",
      question: "Які з тверджень про форми, ціни і footer правильні?",
      options: [
        "placeholder є надійною заміною <label>, тому справжній label необов'язковий",
        "flex-grow: 1 на блоці контенту картки притискає кнопку донизу незалежно від довжини опису",
        "Колір — не єдиний допустимий сигнал помилки поля, текст пояснення теж потрібен",
        "grid-column: 1 / -1 розтягує елемент на всю ширину сітки",
      ],
      correctAnswer: [
        "flex-grow: 1 на блоці контенту картки притискає кнопку донизу незалежно від довжини опису",
        "Колір — не єдиний допустимий сигнал помилки поля, текст пояснення теж потрібен",
        "grid-column: 1 / -1 розтягує елемент на всю ширину сітки",
      ],
      explanation: "placeholder зникає, щойно користувач починає вводити текст, і не є надійною заміною справжнього <label>.",
      optionExplanations: {
        "placeholder є надійною заміною <label>, тому справжній label необов'язковий": "Невірно: placeholder — лише тимчасова підказка, вона зникає при введенні тексту і ненадійно читається асистивними технологіями. Справжній <label> завжди потрібен.",
      },
    },
  ],
};
