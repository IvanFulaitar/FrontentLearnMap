import type { LessonOverride } from "./htmlFoundations";

/**
 * Module "Події" (js-events). Seventh JavaScript module — reacting to user
 * actions with click/keyboard/form events, then (later lessons) input/change
 * events, bubbling in depth, and preventing default behavior. Same deep
 * cheat-sheet lesson format as js-dom and js-objects. First 3 of 6 lessons.
 */
export const jsEventsOverrides: Record<string, LessonOverride> = {
  "Події click": {
    whatIsIt: "element.addEventListener(\"click\", handler) реєструє функцію, що викликається щоразу, коли на елементі відбувається клік. Браузер автоматично передає в handler обʼєкт події (event) з деталями: event.target (де клік реально стався), event.clientX/clientY (координати кліку), event.button (яка кнопка миші). removeEventListener(\"click\", handler) видаляє обробник, але ЛИШЕ якщо передати ТУ САМУ функцію-посилання, що була використана в addEventListener.",
    whyUseIt: "Клік — найпоширеніша дія користувача в інтерфейсі: кнопки, посилання, картки, вкладки. addEventListener — стандартний, гнучкий спосіб реагувати на клік, що (на відміну від старого onclick=\"...\" в HTML) дозволяє прикріпити кілька незалежних обробників до одного елемента й прибрати конкретний обробник пізніше без впливу на інші.",
    whenToUse: ["Реакція на клік користувача по кнопці, посиланню, картці чи будь-якому іншому елементу.", "Потрібно прикріпити КІЛЬКА незалежних обробників кліку до одного елемента.", "Потрібно пізніше ВИДАЛИТИ конкретний обробник (наприклад, після одноразової дії) через removeEventListener."],
    whenNotToUse: ["Не використовуй click для дій, що логічно мають реагувати на клавіатуру теж (наприклад, Enter у формі) — розглядай keyboard-події чи семантичні елементи (button, submit) окремо.", "Не покладайся на click-обробник, прикріплений напряму до КОЖНОГО з великої кількості однотипних елементів — розглянь делегування подій.", "Не намагайся removeEventListener з анонімною функцією, відмінною від тієї, що була передана в addEventListener — це технічно НЕ видалить обробник."],
    comparisonTable: {
      headers: ["Спосіб", "Особливості"],
      rows: [
        ["addEventListener(\"click\", fn)", "кілька обробників на одному елементі; можна видалити через removeEventListener"],
        ["onclick=\"...\" (HTML-атрибут)", "лише ОДИН обробник за раз; новий перезаписує попередній"],
        ["element.onclick = fn (JS-властивість)", "теж лише ОДИН обробник; призначення нового перезаписує старий"],
      ],
    },
    codeWalkthroughs: [
      {
        before: "Базова реєстрація обробника кліку та читання обʼєкта події:",
        code: `const button = document.querySelector("#buy-button");

button.addEventListener("click", (event) => {
  console.log("Клікнуто на:", event.target);
  console.log("Координати:", event.clientX, event.clientY);
});`,
        lineNotes: ["Браузер автоматично передає обʼєкт event як ПЕРШИЙ аргумент callback-у — його не потрібно створювати вручну.", "event.target завжди вказує на реальний елемент, де подія фізично сталась — навіть якщо на кнопці є вкладений <span> з текстом, клік на ньому все одно спливає до button, а event.target покаже саме <span>."],
      },
      {
        before: "Кілька незалежних обробників на одному елементі — усі спрацьовують по черзі:",
        code: `const button = document.querySelector("#save-button");

button.addEventListener("click", () => console.log("Логування дії"));
button.addEventListener("click", () => console.log("Збереження даних"));

// Один клік -> обидва рядки виводяться в консоль, у порядку реєстрації`,
        lineNotes: ["На відміну від button.onclick = ... (який дозволяє лише ОДНЕ призначення й перезаписує попереднє), addEventListener додає НОВИЙ обробник, не видаляючи вже наявні.", "Порядок виконання відповідає порядку РЕЄСТРАЦІЇ обробників — не порядку їх написання в різних місцях коду, а саме порядку викликів addEventListener."],
      },
      {
        before: "removeEventListener вимагає ТОЧНО ТУ САМУ функцію-посилання:",
        code: `function handleClick() {
  console.log("Клік!");
}

const button = document.querySelector("#one-time-button");
button.addEventListener("click", handleClick);

// Пізніше — видалення того самого обробника:
button.removeEventListener("click", handleClick); // ПРАЦЮЄ — та сама функція

// А це НЕ спрацює:
button.addEventListener("click", () => console.log("Клік!"));
button.removeEventListener("click", () => console.log("Клік!")); // НЕ видаляє — інша функція!`,
        lineNotes: ["removeEventListener порівнює функції ЗА ПОСИЛАННЯМ (тим самим обʼєктом функції в памʼяті) — handleClick тут та сама змінна, тому видалення працює.", "Дві анонімні стрілочні функції з ІДЕНТИЧНИМ кодом — все одно ДВІ РІЗНІ функції в памʼяті; removeEventListener не бачить їх як \"однакові\" й нічого не видаляє."],
        after: "Щоб мати можливість видалити обробник пізніше, завжди зберігай посилання на функцію в змінній — не передавай анонімну функцію напряму, якщо планується її видалення.",
      },
      {
        before: "Реальна різниця event.target і this всередині обробника (стрілочна функція проти звичайної):",
        code: `const button = document.querySelector("#toggle-button");

button.addEventListener("click", function (event) {
  console.log(this === button); // true — звичайна функція: this = елемент з обробником
});

button.addEventListener("click", (event) => {
  console.log(this); // window/undefined — стрілочна функція НЕ має власного this
  console.log(event.currentTarget === button); // true — надійна альтернатива для стрілочних функцій
});`,
        lineNotes: ["У звичайній function this всередині обробника addEventListener автоматично прив'язується до елемента, на якому обробник встановлений — те саме, що event.currentTarget.", "Стрілочна функція не має власного this — вона бере this з ОТОЧУЮЧОГО скоупу (де стрілочна функція була визначена), тому для елемента з обробником надійніше використовувати event.currentTarget, а не this."],
      },
    ],
    commonMistakes: ["Передавати виклик функції button.addEventListener(\"click\", handleClick()) замість посилання на функцію button.addEventListener(\"click\", handleClick) — з дужками функція викликається ОДРАЗУ, а не реєструється як обробник.", "Намагатись removeEventListener з анонімною функцією, відмінною (за посиланням) від тієї, що передавалась у addEventListener.", "Плутати this (ненадійний у стрілочних функціях) з event.currentTarget (завжди елемент з обробником, незалежно від типу функції).", "Забувати, що event.target може вказувати на ВКЛАДЕНИЙ елемент (наприклад, <span> в кнопці), а не на сам елемент з обробником."],
    dontDoThis: { code: `function handleSave() {\n  console.log("Збереження...");\n}\n\nconst button = document.querySelector("#save");\nbutton.addEventListener("click", handleSave()); // БАГ: викликає ОДРАЗУ, а не реєструє!`, explanation: "handleSave() з дужками — це ВИКЛИК функції, що виконується НЕГАЙНО під час виконання цього рядка коду, ще до будь-якого реального кліку. Результат виклику handleSave() (undefined, бо функція нічого не повертає) передається в addEventListener як \"обробник\" — клік на кнопці більше НЕ викликає жодної логіки, бо undefined не є валідною функцією-обробником. Правильно: addEventListener(\"click\", handleSave) — без дужок, як ПОСИЛАННЯ на функцію." },
    bestPractices: ["Завжди передавай ПОСИЛАННЯ на функцію в addEventListener (без дужок), а не результат її виклику.", "Якщо обробник потрібно буде видалити пізніше, зберігай його в названій змінній замість анонімної функції.", "Використовуй event.currentTarget замість this для надійного доступу до елемента з обробником, особливо в стрілочних функціях.", "Памʼятай, що event.target може відрізнятись від елемента з обробником — перевіряй саме те, що реально потрібно (клікнутий елемент чи елемент-власник обробника)."],
    remember: ["addEventListener дозволяє декілька незалежних обробників на одному елементі; onclick=... чи element.onclick дозволяють лише один.", "removeEventListener видаляє обробник лише за ТОЧНИМ співпадінням посилання на функцію.", "event.target — де подія РЕАЛЬНО сталась; event.currentTarget — елемент, до якого прикріплений обробник (стабільніший за this у стрілочних функціях).", "handler() з дужками в addEventListener викликає функцію НЕГАЙНО замість реєстрації — потрібне посилання handler, без дужок."],
    interviewQuestions: [
      { question: "Чим addEventListener краще за element.onclick = handler?", answer: "addEventListener дозволяє прикріпити КІЛЬКА незалежних обробників до одного елемента — вони всі спрацьовують при кліку, у порядку реєстрації. element.onclick = handler дозволяє лише ОДИН обробник за раз: кожне нове призначення повністю ЗАМІНЮЄ попереднє. addEventListener також дозволяє видалити конкретний обробник через removeEventListener, не впливаючи на інші." },
      { question: "Чому removeEventListener(\"click\", () => {...}) з новою анонімною функцією не видаляє раніше зареєстрований обробник?", answer: "removeEventListener шукає ТОЧНЕ співпадіння функції ЗА ПОСИЛАННЯМ у памʼяті. Кожен виклик () => {...} створює НОВИЙ обʼєкт функції, навіть якщо код всередині ідентичний попередньому. Щоб видалення працювало, потрібно зберегти функцію в змінній і передавати ту саму змінну і в addEventListener, і в removeEventListener." },
      { question: "У чому різниця між event.target і event.currentTarget?", answer: "event.target — елемент, де подія РЕАЛЬНО відбулась (найглибший елемент під курсором у момент кліку). event.currentTarget — елемент, до якого прикріплений обробник, що зараз виконується. Якщо клік стався на вкладеному елементі всередині кнопки з обробником, target вказуватиме на вкладений елемент, а currentTarget — на саму кнопку." },
      { question: "Чому в стрілочній функції-обробнику this не вказує на елемент з обробником?", answer: "Стрілочні функції не мають власного this — вони успадковують this з ОТОЧУЮЧОГО лексичного скоупу, де стрілочна функція була визначена (а не з контексту виклику). Тому this всередині стрілочного обробника — це те саме this, що й поза addEventListener (часто undefined чи window), а не елемент. Для надійного доступу до елемента з обробником використовують event.currentTarget незалежно від типу функції." },
    ],
    summary: "addEventListener(\"click\", handler) реєструє обробник кліку, передаючи автоматично обʼєкт event; на відміну від onclick=..., дозволяє кілька незалежних обробників. removeEventListener видаляє обробник лише за точним посиланням на функцію. event.target — джерело кліку; event.currentTarget — елемент з обробником, надійніший за this у стрілочних функціях.",
    proTip: "Якщо клік \"не працює\" одразу після реєстрації обробника — перевір, чи не передані дужки після імені функції (handler() замість handler) в addEventListener.",
    nextLessonNote: "Далі — події клавіатури: keydown/keyup, event.key проти event.code, і як перевірити натискання конкретної клавіші (наприклад, Enter).",
    interactiveDemo: "click-event-demo",
    practiceTask: {
      title: "Виправ обробник, що викликається одразу замість реєстрації",
      description: "Функція attachSaveHandler передає handleSave() з дужками в addEventListener, тому клік нічого не робить. Виправ, передавши посилання на функцію без дужок.",
      checklist: ["Клік на кнопці #save реально викликає handleSave.", "handleSave НЕ викликається одразу під час attachSaveHandler.", "addEventListener отримує посилання на функцію, а не результат її виклику."],
      starterFiles: [
        {
          id: "js-click-event-start",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<button id="save">Зберегти</button>
<p id="output"></p>

<script>
  function handleSave() {
    document.querySelector("#output").textContent = "Збережено!";
  }

  function attachSaveHandler() {
    const button = document.querySelector("#save");
    button.addEventListener("click", handleSave()); // БАГ: викликає одразу
  }

  attachSaveHandler();
  // #output вже показує "Збережено!" ще до будь-якого кліку
</script>
`,
        },
      ],
      solutionFiles: [
        {
          id: "js-click-event-solution",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<button id="save">Зберегти</button>
<p id="output"></p>

<script>
  function handleSave() {
    document.querySelector("#output").textContent = "Збережено!";
  }

  function attachSaveHandler() {
    const button = document.querySelector("#save");
    button.addEventListener("click", handleSave);
  }

  attachSaveHandler();
  // #output порожній, доки користувач реально не клікне на кнопку
</script>
`,
          readOnly: true,
        },
      ],
      hints: ["handleSave() з дужками викликає функцію одразу, у момент виконання attachSaveHandler.", "Потрібне посилання на функцію без дужок: addEventListener(\"click\", handleSave)."],
      expectedOutput: "\"Збережено!\" зʼявляється ЛИШЕ ПІСЛЯ кліку, не раніше",
    },
    microExercises: [
      { id: "js-click-multiple-predict", kind: "predict", prompt: "Скільки разів виведеться повідомлення в консоль при ОДНОМУ кліку на кнопку?", code: `button.addEventListener("click", () => console.log("A"));\nbutton.addEventListener("click", () => console.log("B"));`, solution: "Двічі — виведеться \"A\", потім \"B\". addEventListener дозволяє прикріпити кілька незалежних обробників до одного елемента, і всі вони спрацьовують при одному кліку, у порядку реєстрації." },
      { id: "js-click-invoke-find-bug", kind: "find-the-bug", prompt: "У чому проблема цього коду?", code: `function showAlert() {\n  console.log("Клік!");\n}\nbutton.addEventListener("click", showAlert());`, solution: "showAlert() з дужками ВИКЛИКАЄ функцію негайно, під час виконання цього рядка коду — ще до будь-якого реального кліку. У addEventListener передається РЕЗУЛЬТАТ виклику (undefined), а не сама функція, тому реальний клік на кнопці більше нічого не робить. Потрібно передати showAlert без дужок." },
      { id: "js-click-target-choice", kind: "choice", prompt: "Яка властивість обʼєкта події вказує на елемент, до якого прикріплений обробник (а не на те, де реально стався клік)?", options: ["event.target", "event.currentTarget", "event.type", "this у стрілочній функції"], correctAnswer: "event.currentTarget", solution: "event.currentTarget завжди вказує на елемент, на якому встановлений обробник, незалежно від того, на якому вкладеному елементі реально стався клік. event.target вказує саме на реальне джерело кліку, яке може бути вкладеним дочірнім елементом." },
      { id: "js-click-remove-explain", kind: "explain", prompt: "Поясни, чому цей код НЕ видаляє обробник кліку.", code: `button.addEventListener("click", () => console.log("Клік"));\nbutton.removeEventListener("click", () => console.log("Клік"));`, solution: "Кожен вираз () => console.log(\"Клік\") створює НОВИЙ, окремий обʼєкт функції в памʼяті, навіть якщо код всередині виглядає ідентично. removeEventListener шукає ТОЧНЕ співпадіння функції за посиланням у памʼяті — друга анонімна функція, попри однаковий код, це зовсім ІНШИЙ обʼєкт, тому видалення не відбувається, і перший обробник продовжує спрацьовувати при кліках." },
      { id: "js-click-named-rewrite", kind: "rewrite", prompt: "Перепиши код так, щоб обробник кліку можна було коректно видалити пізніше.", code: `button.addEventListener("click", () => console.log("Клік"));\n// пізніше потрібно видалити цей обробник, але як?`, solution: `function handleClick() {\n  console.log("Клік");\n}\nbutton.addEventListener("click", handleClick);\n// пізніше:\nbutton.removeEventListener("click", handleClick);\n// збереження функції в названій змінній дозволяє передати ТЕ САМЕ посилання в removeEventListener` },
    ],
  },

  "Події клавіатури": {
    whatIsIt: "keydown спрацьовує, коли клавішу НАТИСКАЮТЬ (і повторюється, якщо утримувати); keyup — коли клавішу ВІДПУСКАЮТЬ. event.key повертає СИМВОЛ, який реально буде введений з урахуванням розкладки клавіатури й натиснутого Shift (наприклад, \"A\" чи \"a\"); event.code повертає ФІЗИЧНЕ розташування клавіші на клавіатурі незалежно від розкладки й регістру (наприклад, \"KeyA\" завжди). Модифікатори event.shiftKey/ctrlKey/altKey/metaKey — булеві значення, чи натиснута відповідна клавіша-модифікатор одночасно.",
    whyUseIt: "Реальні інтерфейси часто повинні реагувати на конкретні клавіші: Enter для відправлення форми чи повідомлення, Escape для закриття модального вікна, стрілки для навігації в списку. event.key дає надійний, читабельний спосіб перевірити САМЕ ту клавішу, яку користувач натиснув, без застарілого й важкого для читання числового event.keyCode.",
    whenToUse: ["Потрібно реагувати на НАТИСКАННЯ конкретної клавіші (Enter, Escape, стрілки) — keydown + перевірка event.key.", "Потрібно перевірити, чи разом із клавішею утримувався модифікатор (Ctrl+S, Shift+Tab) — event.ctrlKey/shiftKey тощо.", "Потрібна саме ФІЗИЧНА клавіша, незалежно від розкладки (рідше, наприклад ігри) — event.code."],
    whenNotToUse: ["Не використовуй застарілий event.keyCode (числовий код) — event.key читабельніший і не потребує таблиці числових кодів напамʼять.", "Не покладайся на event.key для визначення ФІЗИЧНОЇ клавіші, якщо користувач може мати іншу розкладку клавіатури, — для цього потрібен event.code.", "Не забувай, що keydown повторюється БАГАТО РАЗІВ при утриманні клавіші — якщо потрібна ОДНА дія на натискання, врахуй це (наприклад, через debounce чи прапорець)."],
    comparisonTable: {
      headers: ["Властивість", "Що повертає"],
      rows: [
        ["event.key", "символ з урахуванням розкладки й Shift: \"a\", \"A\", \"Enter\", \"Escape\""],
        ["event.code", "фізичне розташування клавіші, завжди однакове: \"KeyA\", \"Enter\", \"Escape\""],
        ["event.shiftKey/ctrlKey/altKey/metaKey", "true/false — чи натиснутий відповідний модифікатор"],
      ],
    },
    codeWalkthroughs: [
      {
        before: "Базове читання event.key при keydown:",
        code: `const input = document.querySelector("#search");

input.addEventListener("keydown", (event) => {
  console.log("Натиснуто:", event.key);
});
// Натискання клавіші "a" виводить "a"; з Shift — "A"; Enter — "Enter"`,
        lineNotes: ["event.key враховує РЕГИСТР і РОЗКЛАДКУ — та сама фізична клавіша дає \"a\" без Shift і \"A\" з Shift.", "Для спеціальних клавіш (Enter, Escape, Tab, стрілки) event.key повертає читабельну назву, а не символ."],
      },
      {
        before: "Перевірка натискання Enter — найпоширеніший реальний приклад:",
        code: `const input = document.querySelector("#message");

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    console.log("Відправка повідомлення:", input.value);
    input.value = "";
  }
});`,
        lineNotes: ["event.key === \"Enter\" — надійна, читабельна перевірка конкретної клавіші, що працює однаково незалежно від розкладки клавіатури користувача.", "Ця перевірка спрацює навіть якщо Enter натиснутий разом з іншими клавішами-модифікаторами (хоча для Enter це рідко релевантно)."],
      },
      {
        before: "event.key проти event.code — реальна різниця для клавіші, що дає різні символи залежно від Shift:",
        code: `document.addEventListener("keydown", (event) => {
  console.log("key:", event.key, "| code:", event.code);
});
// Без Shift, клавіша 'A': key: "a", code: "KeyA"
// З Shift, та сама клавіша: key: "A", code: "KeyA" — code НЕ змінився!`,
        lineNotes: ["event.code завжди повертає ТЕ САМЕ значення для фізичної клавіші незалежно від Shift чи розкладки — \"KeyA\" відповідає клавіші в позиції A на стандартній QWERTY-розкладці, навіть якщо реальна розкладка інша.", "event.key натомість відображає РЕАЛЬНИЙ символ, що буде введений — саме тому для перевірки \"що введе користувач\" потрібен key, а не code."],
        after: "Для гри чи розкладко-незалежного керування (WASD) частіше доречний code; для реального тексту, що вводить користувач, — key.",
      },
      {
        before: "Перевірка комбінації з модифікатором — реальний приклад Ctrl+Enter:",
        code: `const textarea = document.querySelector("#comment");

textarea.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && event.ctrlKey) {
    console.log("Відправка через Ctrl+Enter");
  } else if (event.key === "Enter") {
    console.log("Звичайний Enter — новий рядок у textarea");
  }
});`,
        lineNotes: ["event.ctrlKey — булеве значення true, якщо Ctrl був НАТИСНУТИЙ ОДНОЧАСНО з клавішею, що викликала подію.", "Перевірка event.key === \"Enter\" && event.ctrlKey відрізняє звичайний Enter (новий рядок) від комбінації Ctrl+Enter (відправка) — поширений реальний UX-шаблон для текстових полів."],
      },
    ],
    commonMistakes: ["Використовувати застарілий event.keyCode (число) замість event.key (читабельний рядок) — важче читати й підтримувати код.", "Плутати event.key (символ з урахуванням розкладки/регістру) з event.code (завжди та сама фізична клавіша).", "Забувати, що keydown повторюється при утриманні клавіші — код, що очікує ОДНУ дію на натискання, може спрацювати кілька разів.", "Перевіряти event.key === \"enter\" (з малої букви) замість точного \"Enter\" — рядкове порівняння регістрозалежне."],
    dontDoThis: { code: `input.addEventListener("keydown", (event) => {\n  if (event.keyCode === 13) { // БАГ: застарілий числовий код, важко читати\n    submitForm();\n  }\n});`, explanation: "event.keyCode — застаріла (deprecated) властивість, що повертає числовий код клавіші (13 для Enter), який неможливо прочитати без таблиці кодів напамʼять чи довідника. Крім того, keyCode не завжди узгоджено працює між різними браузерами для нестандартних клавіш. Сучасна, читабельна й надійна альтернатива — event.key === \"Enter\", яка одразу зрозуміла без пошуку в довіднику." },
    bestPractices: ["Використовуй event.key для перевірки конкретних клавіш — читабельно й не потребує таблиці кодів.", "Використовуй event.code лише коли реально потрібна фізична позиція клавіші незалежно від розкладки (ігри, WASD-керування).", "Перевіряй модифікатори (ctrlKey, shiftKey тощо) окремими булевими умовами поруч з перевіркою event.key.", "Памʼятай про повторення keydown при утриманні клавіші — плануй логіку відповідно, якщо потрібна лише ОДНА дія на натискання."],
    remember: ["keydown — при натисканні (повторюється при утриманні); keyup — при відпусканні.", "event.key — символ з урахуванням розкладки й регістру (\"a\"/\"A\"); event.code — завжди та сама фізична клавіша (\"KeyA\").", "event.key === \"Enter\" — стандартна, читабельна перевірка конкретної клавіші.", "event.ctrlKey/shiftKey/altKey/metaKey — булеві прапорці для перевірки комбінацій з модифікаторами."],
    interviewQuestions: [
      { question: "У чому різниця між keydown і keyup?", answer: "keydown спрацьовує в момент, коли клавішу НАТИСКАЮТЬ, і повторюється (з певним інтервалом), якщо клавішу продовжують УТРИМУВАТИ. keyup спрацьовує ОДИН РАЗ, коли клавішу ВІДПУСКАЮТЬ, незалежно від того, як довго вона була натиснута." },
      { question: "Чому event.key повертає різні значення (\"a\" і \"A\") для тієї самої фізичної клавіші, а event.code — однакове?", answer: "event.key відображає РЕАЛЬНИЙ символ, що буде введений, з урахуванням поточного стану Shift/CapsLock і розкладки клавіатури — тому та сама клавіша дає \"a\" без Shift і \"A\" з Shift. event.code відображає ФІЗИЧНЕ розташування клавіші на клавіатурі (\"KeyA\"), яке не залежить від Shift, регістру чи навіть розкладки — це те саме значення для клавіші в тій позиції завжди." },
      { question: "Чому event.keyCode вважається застарілим і його варто уникати?", answer: "event.keyCode повертає числовий код клавіші, який неможливо прочитати без окремої таблиці відповідності кодів і клавіш — це робить код менш читабельним. Крім того, ця властивість офіційно позначена як deprecated в специфікації, а її поведінка для деяких клавіш історично різнилась між браузерами. Сучасна альтернатива — читабельний event.key (\"Enter\", \"Escape\" тощо)." },
      { question: "Як перевірити, чи користувач натиснув Enter одночасно з Ctrl?", answer: "У обробнику keydown перевірити одночасно дві умови: event.key === \"Enter\" (клавіша Enter) і event.ctrlKey (чи Ctrl був натиснутий одночасно) — наприклад, if (event.key === \"Enter\" && event.ctrlKey) { ... }." },
    ],
    summary: "keydown спрацьовує при натисканні (повторюється при утриманні), keyup — при відпусканні. event.key дає читабельний символ з урахуванням розкладки/регістру (\"Enter\", \"a\"/\"A\"); event.code — завжди та саму фізичну клавішу. Модифікатори (ctrlKey тощо) — булеві прапорці для перевірки комбінацій клавіш.",
    proTip: "Якщо перевірка клавіші виглядає як if (event.keyCode === 13) чи схожі магічні числа — це кандидат на заміну на читабельний event.key === \"Enter\".",
    nextLessonNote: "Далі — події відправлення форми: submit на самій формі (не на кнопці), і чому event.preventDefault() критично важливий, щоб уникнути перезавантаження сторінки.",
    interactiveDemo: "keyboard-event-demo",
    practiceTask: {
      title: "Виправ перевірку клавіші через застарілий keyCode",
      description: "Функція handleKeydown перевіряє event.keyCode === 13 для визначення Enter — важко читати й застаріло. Перепиши через event.key.",
      checklist: ["Функція визначає натискання Enter через event.key === \"Enter\".", "Не використовується застаріла властивість keyCode.", "Логіка відправлення повідомлення спрацьовує так само, як і раніше."],
      starterFiles: [
        {
          id: "js-keyboard-event-start",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<input id="message" placeholder="Введи повідомлення">
<p id="output"></p>

<script>
  const input = document.querySelector("#message");

  input.addEventListener("keydown", (event) => {
    if (event.keyCode === 13) { // БАГ: застарілий числовий код
      document.querySelector("#output").textContent = "Відправлено: " + input.value;
      input.value = "";
    }
  });
</script>
`,
        },
      ],
      solutionFiles: [
        {
          id: "js-keyboard-event-solution",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<input id="message" placeholder="Введи повідомлення">
<p id="output"></p>

<script>
  const input = document.querySelector("#message");

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      document.querySelector("#output").textContent = "Відправлено: " + input.value;
      input.value = "";
    }
  });
</script>
`,
          readOnly: true,
        },
      ],
      hints: ["event.keyCode === 13 — застарілий, важкий для читання спосіб перевірки Enter.", "event.key === \"Enter\" — сучасний, читабельний еквівалент."],
      expectedOutput: "Натискання Enter в полі показує \"Відправлено: ...\" з введеним текстом",
    },
    microExercises: [
      { id: "js-keyboard-key-predict", kind: "predict", prompt: "Що виведе event.key при натисканні клавіші 'a' З УТРИМАННЯМ Shift?", code: `input.addEventListener("keydown", (e) => console.log(e.key));`, solution: "\"A\" — event.key враховує стан Shift і повертає символ, що РЕАЛЬНО буде введений: велика буква A, а не рядкова a." },
      { id: "js-keyboard-keycode-find-bug", kind: "find-the-bug", prompt: "У чому проблема цього коду?", code: `if (event.keyCode === 27) {\n  closeModal();\n}`, solution: "event.keyCode — застаріла числова властивість (27 для Escape), яку важко читати без довідника кодів клавіш. Сучасна, читабельна альтернатива: if (event.key === \"Escape\") { closeModal(); } — одразу зрозуміло, яка клавіша перевіряється, без пошуку значення коду." },
      { id: "js-keyboard-code-choice", kind: "choice", prompt: "Яка властивість завжди повертає ОДНАКОВЕ значення для конкретної фізичної клавіші, незалежно від Shift чи розкладки?", options: ["event.key", "event.code", "event.keyCode", "event.char"], correctAnswer: "event.code", solution: "event.code відображає ФІЗИЧНЕ розташування клавіші на клавіатурі — це значення не змінюється залежно від Shift, регістру чи розкладки. event.key натомість змінюється залежно від цих факторів, бо відображає РЕАЛЬНИЙ символ, що буде введений." },
      { id: "js-keyboard-repeat-explain", kind: "explain", prompt: "Поясни, чому обробник keydown може спрацювати БАГАТО разів для одного \"натискання і утримання\" клавіші.", solution: "Браузер генерує повторні keydown-події з певним інтервалом, доки клавіша ФІЗИЧНО залишається натиснутою (утримується) — це стандартна поведінка операційної системи для клавіатурного вводу (наприклад, для повторення символу при наборі тексту). Тому код, що очікує рівно ОДНУ подію keydown на одне натискання, може несподівано спрацювати кілька разів, якщо користувач утримує клавішу довше миті." },
      { id: "js-keyboard-modifier-rewrite", kind: "rewrite", prompt: "Перепиши обробник, щоб він реагував на Escape ЛИШЕ якщо Shift НЕ натиснутий одночасно.", code: `input.addEventListener("keydown", (event) => {\n  if (event.key === "Escape") {\n    closeModal();\n  }\n});`, solution: `input.addEventListener("keydown", (event) => {\n  if (event.key === "Escape" && !event.shiftKey) {\n    closeModal();\n  }\n});\n// !event.shiftKey гарантує, що Shift НЕ був натиснутий одночасно з Escape` },
    ],
  },

  "Події відправлення форми": {
    whatIsIt: "Подія submit спрацьовує на елементі <form>, коли форма відправляється — через клік на кнопці типу submit, натискання Enter в текстовому полі всередині форми, чи явний викликом form.requestSubmit(). event.preventDefault(), викликаний у обробнику submit, зупиняє СТАНДАРТНУ поведінку браузера — повне перезавантаження/навігацію сторінки з відправкою даних форми як HTTP-запиту — дозволяючи обробити відправку через JavaScript замість цього.",
    whyUseIt: "Без event.preventDefault() кожна відправка форми викликає повне перезавантаження сторінки — весь стан JavaScript, включно з попередньо введеними даними чи будь-якою логікою на сторінці, ЗНИКАЄ. Обробка submit через JavaScript (з preventDefault) дозволяє валідувати дані, показати повідомлення про успіх чи відправити дані через fetch без втрати контексту сторінки — основа будь-якої реальної форми в SPA чи інтерактивному інтерфейсі.",
    whenToUse: ["Форма, дані якої потрібно обробити через JavaScript (валідація, fetch-запит, оновлення інтерфейсу) без повного перезавантаження сторінки.", "Потрібно реагувати на ВІДПРАВЛЕННЯ форми будь-яким способом (клік по кнопці, Enter у полі) — слухай submit на самій <form>, а не click на кнопці.", "Потрібно прочитати ВСІ значення форми одночасно, а не поле за полем — FormData(form)."],
    whenNotToUse: ["Не слухай click на кнопці submit замість submit на формі — це пропустить відправку через Enter у текстовому полі.", "Не забувай event.preventDefault(), якщо форма НЕ повинна викликати стандартну навігацію/перезавантаження сторінки.", "Не використовуй submit-обробник для дій, що логічно не є \"відправкою даних\" (наприклад, простий клік-перемикач) — це семантично інша дія."],
    comparisonTable: {
      headers: ["Підхід", "Реагує на Enter у полі форми?"],
      rows: [
        ["form.addEventListener(\"submit\", ...)", "Так — Enter у будь-якому текстовому полі всередині форми теж викликає submit"],
        ["button.addEventListener(\"click\", ...)", "Ні — лише прямий клік по кнопці"],
      ],
    },
    codeWalkthroughs: [
      {
        before: "Базовий обробник submit з preventDefault — зупиняє перезавантаження сторінки:",
        code: `const form = document.querySelector("#login-form");

form.addEventListener("submit", (event) => {
  event.preventDefault(); // без цього сторінка перезавантажиться
  console.log("Форма відправлена через JS, без перезавантаження");
});`,
        lineNotes: ["event.preventDefault() викликається ОДРАЗУ на початку обробника — це зупиняє СТАНДАРТНУ дію браузера (навігацію/перезавантаження), яка інакше відбулась би автоматично після виконання обробника.", "Без цього рядка сторінка перезавантажилась би, і будь-який console.log після нього просто \"зник\" би разом з усім станом сторінки."],
      },
      {
        before: "FormData для читання ВСІХ значень форми одночасно:",
        code: `<form id="signup-form">
  <input name="email" type="email" />
  <input name="password" type="password" />
</form>

<script>
  const form = document.querySelector("#signup-form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    console.log(data.get("email")); // значення поля з name="email"
    console.log(data.get("password"));
  });
</script>`,
        lineNotes: ["new FormData(form) автоматично збирає значення ВСІХ полів форми з атрибутом name — не потрібно вручну читати кожне поле через querySelector.", "data.get(\"email\") читає значення конкретного поля за його name-атрибутом — атрибут name, а не id, є ключем для FormData."],
      },
      {
        before: "submit на формі спрацьовує і при кліку на кнопку, і при Enter у полі — click на кнопці НЕ покриває Enter:",
        code: `const form = document.querySelector("#search-form");

// Правильно: слухаємо submit на ФОРМІ
form.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log("Пошук відправлено"); // спрацює і при кліку, і при Enter
});

// Якби слухали лише клік на кнопці — Enter у полі це пропустив би:
// button.addEventListener("click", ...) — НЕ покриває Enter у текстовому полі`,
        lineNotes: ["submit — це подія саме на <form>, що спрацьовує НЕЗАЛЕЖНО від того, ЯКИМ способом користувач відправив форму (клік по кнопці типу submit чи Enter у текстовому полі).", "Обробник click на кнопці реагує лише на прямий клік — реальний користувач, що натискає Enter замість кліку по кнопці, взагалі не викличе такий обробник."],
        after: "Це одна з причин, чому слухати submit на формі надійніше за click на кнопці для логіки, що має спрацьовувати при БУДЬ-якому способі відправлення.",
      },
      {
        before: "Реальна валідація перед відправкою — попередження показується без перезавантаження:",
        code: `const form = document.querySelector("#contact-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = form.querySelector("[name='email']").value;

  if (!email.includes("@")) {
    document.querySelector("#error").textContent = "Некоректний email";
    return; // зупиняємо подальшу обробку, форма НЕ "відправляється" далі
  }

  document.querySelector("#error").textContent = "";
  console.log("Форма валідна, можна відправляти на сервер");
});`,
        lineNotes: ["event.preventDefault() викликається ЗАВЖДИ на початку — це гарантує, що сторінка НЕ перезавантажиться незалежно від результату валідації.", "return усередині обробника після showing помилки просто зупиняє ПОДАЛЬШЕ виконання ЦЬОГО обробника — форма технічно вже \"не перезавантажилась\" завдяки preventDefault, а ручна логіка вирішує, що робити далі."],
      },
    ],
    commonMistakes: ["Забувати event.preventDefault() в обробнику submit — сторінка перезавантажується, втрачаючи весь стан JS.", "Слухати click на кнопці submit замість submit на самій формі — пропускає відправлення через Enter у полі.", "Читати значення форми через FormData за атрибутом id замість name — FormData працює саме з name.", "Викликати event.preventDefault() ПІСЛЯ якоїсь асинхронної операції (наприклад, у .then()) — до того моменту стандартна дія браузера вже могла розпочатись."],
    dontDoThis: { code: `const form = document.querySelector("#login-form");\nconst button = form.querySelector("button[type=submit]");\n\nbutton.addEventListener("click", () => { // БАГ: слухаємо click на кнопці, не submit на формі\n  console.log("Логін...");\n});\n// Користувач, що натискає Enter у полі пароля, НЕ побачить "Логін..." взагалі`, explanation: "Обробник прикріплений до click на КНОПЦІ, а не до submit на самій ФОРМІ. Реальний користувач часто натискає Enter, перебуваючи в текстовому полі форми (особливо в полі пароля), замість того, щоб клікати мишею по кнопці — це стандартна, очікувана поведінка форм. Такий Enter викликає подію submit на формі, але НЕ викликає click на кнопці, тому обробник просто не спрацьовує, і користувач не отримує очікуваної реакції." },
    bestPractices: ["Завжди слухай submit на елементі <form>, а не click на кнопці, для логіки, що стосується ВІДПРАВЛЕННЯ форми.", "Викликай event.preventDefault() як ПЕРШУ дію в обробнику submit, якщо стандартна навігація непотрібна.", "Використовуй FormData(form) для читання всіх значень форми одночасно, за атрибутом name кожного поля.", "Показуй помилки валідації без перезавантаження сторінки — preventDefault дозволяє це зробити природно через JS."],
    remember: ["submit спрацьовує на <form>, незалежно від способу відправки (клік по кнопці чи Enter у полі).", "event.preventDefault() зупиняє стандартне перезавантаження/навігацію — критично важливо для обробки форми через JS.", "FormData(form) збирає значення всіх полів за їхнім атрибутом name, без ручного читання кожного окремо.", "Слухай submit на формі, а не click на кнопці, щоб не пропустити відправлення через Enter."],
    interviewQuestions: [
      { question: "Що станеться, якщо не викликати event.preventDefault() в обробнику submit?", answer: "Браузер виконає СТАНДАРТНУ дію відправлення форми — повне перезавантаження (чи навігацію) сторінки з відправкою даних форми як звичайного HTTP-запиту (GET чи POST, залежно від атрибута method форми). Весь стан JavaScript на поточній сторінці буде втрачено, а логіка, написана в обробнику submit ПІСЛЯ моменту перезавантаження, просто не встигне довершити виконання." },
      { question: "Чому краще слухати submit на <form>, а не click на кнопці відправлення?", answer: "submit на формі спрацьовує НЕЗАЛЕЖНО від способу відправлення — і при кліку по кнопці типу submit, і при натисканні Enter у текстовому полі всередині форми. click на кнопці реагує ЛИШЕ на прямий клік мишею, тому користувач, що натискає Enter (поширена звичка, особливо в полях паролю), не викличе такий обробник взагалі." },
      { question: "Для чого використовується FormData(form)?", answer: "FormData(form) створює обʼєкт, що автоматично збирає значення ВСІХ полів форми, у яких заданий атрибут name — це дозволяє прочитати всі дані форми одним викликом (наприклад, для відправки через fetch) замість ручного читання значення кожного поля окремо через querySelector." },
      { question: "Чи можна валідувати форму й показати помилку користувачу, не перезавантажуючи сторінку?", answer: "Так. Виклик event.preventDefault() на початку обробника submit одразу зупиняє стандартну навігацію/перезавантаження. Уся подальша логіка (перевірка полів, показ повідомлення про помилку через textContent чи подібне) виконується вже в контексті JavaScript без перезавантаження — це стандартний підхід для клієнтської валідації форм." },
    ],
    summary: "submit спрацьовує на <form> при будь-якому способі відправлення (клік по кнопці чи Enter у полі); click на кнопці реагує лише на прямий клік і пропускає Enter. event.preventDefault() зупиняє стандартне перезавантаження сторінки, дозволяючи обробити форму через JS. FormData(form) читає всі значення полів за їхнім атрибутом name.",
    proTip: "Якщо форма \"перезавантажує сторінку\" замість очікуваної JS-логіки — перша перевірка: чи викликається event.preventDefault() як перша дія в обробнику submit.",
    nextLessonNote: "Далі — події input і change: як реагувати на КОЖНУ зміну введеного тексту в реальному часі, і чим це відрізняється від подібної події change.",
    interactiveDemo: "form-submit-demo",
    practiceTask: {
      title: "Виправ форму, що перезавантажує сторінку при відправленні",
      description: "Обробник submit форми не викликає event.preventDefault(), тому сторінка перезавантажується, а логіка виведення повідомлення про успіх ніколи реально не видима користувачу. Додай preventDefault.",
      checklist: ["Відправлення форми НЕ перезавантажує сторінку.", "Повідомлення про успішну відправку реально показується користувачу.", "Використано event.preventDefault() як першу дію в обробнику."],
      starterFiles: [
        {
          id: "js-form-submit-start",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<form id="contact-form">
  <input name="email" placeholder="Email" />
  <button type="submit">Відправити</button>
</form>
<p id="output"></p>

<script>
  const form = document.querySelector("#contact-form");

  form.addEventListener("submit", (event) => {
    // БАГ: немає event.preventDefault() — сторінка перезавантажується
    document.querySelector("#output").textContent = "Відправлено!";
  });
</script>
`,
        },
      ],
      solutionFiles: [
        {
          id: "js-form-submit-solution",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<form id="contact-form">
  <input name="email" placeholder="Email" />
  <button type="submit">Відправити</button>
</form>
<p id="output"></p>

<script>
  const form = document.querySelector("#contact-form");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    document.querySelector("#output").textContent = "Відправлено!";
  });
</script>
`,
          readOnly: true,
        },
      ],
      hints: ["Без event.preventDefault() форма викликає стандартну поведінку браузера — перезавантаження сторінки.", "Додай event.preventDefault() як першу дію в обробнику submit."],
      expectedOutput: "\"Відправлено!\" показується без перезавантаження сторінки",
    },
    microExercises: [
      { id: "js-form-submit-predict", kind: "predict", prompt: "Що станеться, якщо в обробнику submit НЕ викликати event.preventDefault()?", code: `form.addEventListener("submit", () => {\n  console.log("Обробка форми");\n});`, solution: "Сторінка перезавантажиться (чи браузер спробує перейти на URL, вказаний в атрибуті action форми) одразу після виконання обробника — console.log(\"Обробка форми\") виведеться, але весь подальший стан JavaScript на сторінці буде втрачено через перезавантаження." },
      { id: "js-form-submit-click-find-bug", kind: "find-the-bug", prompt: "У чому проблема цього коду?", code: `const button = form.querySelector("button[type=submit]");\nbutton.addEventListener("click", () => {\n  console.log("Форма відправлена");\n});`, solution: "Обробник прикріплений до click на кнопці, а не до submit на формі. Користувач, що натискає Enter у текстовому полі форми замість кліку по кнопці, викличе submit на формі, але НЕ click на кнопці — тому console.log ніколи не виконається для такого способу відправлення. Потрібно слухати form.addEventListener(\"submit\", ...)." },
      { id: "js-form-submit-formdata-choice", kind: "choice", prompt: "За яким атрибутом поля FormData(form).get(...) читає значення?", options: ["id", "name", "class", "type"], correctAnswer: "name", solution: "FormData збирає значення полів за атрибутом name — data.get(\"email\") читає значення поля з name=\"email\", незалежно від його id чи класу." },
      { id: "js-form-submit-explain", kind: "explain", prompt: "Поясни, чому важливо викликати event.preventDefault() як ПЕРШУ дію в обробнику submit, а не після якоїсь логіки.", solution: "Якщо стандартна поведінка браузера (навігація/перезавантаження) не потрібна, preventDefault варто викликати одразу, щоб гарантовано зупинити цю поведінку незалежно від того, що станеться далі в обробнику (наприклад, якщо подальший код кине помилку чи містить асинхронну операцію). Виклик preventDefault ПІЗНІШЕ (наприклад, всередині .then() промісу) ризикує статись ПІСЛЯ того, як браузер уже розпочав стандартну дію, роблячи preventDefault марним у цій ситуації." },
      { id: "js-form-submit-rewrite", kind: "rewrite", prompt: "Перепиши обробник, щоб він реагував на submit форми (включно з Enter у полі), а не лише клік по кнопці.", code: `const button = document.querySelector("#loginButton");\nbutton.addEventListener("click", (event) => {\n  event.preventDefault();\n  console.log("Логін");\n});`, solution: `const form = document.querySelector("#loginForm");\nform.addEventListener("submit", (event) => {\n  event.preventDefault();\n  console.log("Логін");\n});\n// submit на формі покриває і клік по кнопці, і Enter у будь-якому текстовому полі форми` },
    ],
  },
};
