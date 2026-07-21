import type { LessonOverride } from "./htmlFoundations";

/**
 * Module "Події" (js-events). Seventh JavaScript module — reacting to user
 * actions with click/keyboard/form events, input/change, event bubbling, and
 * preventing default browser behavior. Same deep cheat-sheet lesson format
 * as js-dom and js-objects. All 6 of 6 lessons.
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
        before: "element.onclick і onclick=\"...\" — старіші способи, що дозволяють лише ОДИН обробник, який перезаписується:",
        code: `<button id="btn" onclick="console.log('З HTML-атрибута')">Тисни</button>

<script>
  const btn = document.querySelector("#btn");

  btn.onclick = () => console.log("Перший через JS-властивість");
  btn.onclick = () => console.log("Другий через JS-властивість");
  // клік виведе ЛИШЕ "Другий через JS-властивість" —
  // друге присвоєння btn.onclick ПОВНІСТЮ замінило і перше присвоєння,
  // і навіть обробник з onclick="..." в самому HTML
</script>`,
        lineNotes: ["onclick=\"...\" прямо в HTML і btn.onclick = fn у JS — це ОДНЕ й те саме сховище \"один обробник на елемент\": останнє присвоєння перемагає, попередні просто зникають.", "На відміну від addEventListener, тут немає способу мати кілька незалежних обробників кліку на одному елементі одночасно."],
        after: "Саме тому в сучасному коді для кліку майже завжди обирають addEventListener — він не має цього обмеження \"лише один обробник\".",
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
    whenNotToUse: ["Не використовуй застарілий event.keyCode (числовий код) — event.key читабельніший і не потребує таблиці числових кодів напамʼять.", "Не покладайся на event.key для визначення ФІЗИЧНОЇ клавіші, якщо користувач може мати іншу розкладку клавіатури, — для цього потрібен event.code.", "Не забувай, що keydown повторюється БАГАТО РАЗІВ при утриманні клавіші — якщо потрібна ОДНА дія на натискання, врахуй це (наприклад, через прапорець \"вже оброблено\" або через техніку затримки виклику, яку пізніше в цьому модулі ти побачиш під назвою debounce)."],
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

  "Події input і change": {
    whatIsIt: "input спрацьовує СИНХРОННО щоразу, коли значення поля змінюється — на кожне натискання клавіші, вставку (paste), вирізання чи навіть перетягування тексту в поле. change спрацьовує, коли нове значення \"фіксується\": для текстових полів і textarea — коли поле втрачає фокус (blur) ПІСЛЯ того, як значення реально змінилось; для checkbox, radio і select — одразу в момент вибору, без потреби втрачати фокус.",
    whyUseIt: "input дає миттєвий, живий відгук на кожну зміну — рахувати символи, показувати live-пошук, валідувати поле в реальному часі. change натомість корисний, коли потрібна дія лише ПІСЛЯ того, як користувач завершив редагування (наприклад, дорога перевірка на сервері) — рідше й дешевше за input, що спрацьовує на кожен символ.",
    whenToUse: ["Живий лічильник символів, live-пошук чи валідація в реальному часі під час набору тексту — input.", "Дорога операція (запит на сервер, важкий перерахунок), яку варто виконати лише після завершення редагування поля — change.", "Реакція на вибір checkbox, radio чи опції select — change (спрацьовує одразу, фокус втрачати не потрібно)."],
    whenNotToUse: ["Не використовуй change для живого відгуку під час набору тексту — він НЕ спрацює, доки поле не втратить фокус, тому інтерфейс здаватиметься \"зламаним\" чи повільним.", "Не забувай, що input спрацьовує й на вставку (paste) та вирізання тексту, а не лише на натискання клавіш — код, що рахує лише keydown, пропустить ці випадки.", "Не викликай дорогу операцію (запит на сервер) прямо в input без debounce — вона виконуватиметься на КОЖЕН символ, що вводить користувач."],
    comparisonTable: {
      headers: ["Подія", "Коли спрацьовує"],
      rows: [
        ["input", "миттєво на КОЖНУ зміну значення (кожен символ, вставка, вирізання)"],
        ["change (текстове поле)", "коли поле втрачає фокус, ПІСЛЯ того як значення змінилось"],
        ["change (checkbox/radio/select)", "одразу в момент вибору, фокус втрачати не потрібно"],
      ],
    },
    codeWalkthroughs: [
      {
        before: "Живий лічильник символів — реагує на КОЖНУ зміну через input:",
        code: `const textarea = document.querySelector("#bio");
const counter = document.querySelector("#counter");

textarea.addEventListener("input", () => {
  counter.textContent = \`\${textarea.value.length} символів\`;
});`,
        lineNotes: ["input спрацьовує одразу на кожне натискання, вставку чи вирізання — лічильник оновлюється в реальному часі, без затримки.", "Якби тут був change замість input, лічильник оновився б лише після того, як textarea втратить фокус — це виглядало б як \"зламаний\" інтерфейс."],
      },
      {
        before: "change на текстовому полі — спрацьовує лише при втраті фокусу, і лише якщо значення РЕАЛЬНО змінилось:",
        code: `const input = document.querySelector("#username");

input.addEventListener("change", () => {
  console.log("Значення зафіксовано:", input.value);
});
// Наберіть текст — нічого не виведеться, доки не klікнете поза полем (blur)`,
        lineNotes: ["change для текстового поля чекає на BLUR (втрату фокусу) — набір тексту сам по собі НЕ викликає change, лише завершення редагування.", "Якщо значення поля не змінилось з моменту отримання фокусу, change взагалі не спрацює при втраті фокусу."],
      },
      {
        before: "checkbox і select — change спрацьовує ОДРАЗУ, без втрати фокусу:",
        code: `const checkbox = document.querySelector("#agree");
const select = document.querySelector("#country");

checkbox.addEventListener("change", () => {
  console.log("Погодився:", checkbox.checked);
});

select.addEventListener("change", () => {
  console.log("Вибрано:", select.value);
});
// Обидва спрацьовують МИТТЄВО в момент кліку/вибору — фокус не має значення`,
        lineNotes: ["На відміну від текстових полів, checkbox, radio і select фіксують нове значення миттєво в момент взаємодії — change спрацьовує одразу, без очікування blur.", "Це робить change природним вибором саме для цих елементів — миттєвий, а не \"відкладений\" відгук."],
      },
      {
        before: "Debounce для дорогої операції в input — уникаємо запиту на КОЖЕН символ. Знадобляться дві функції для роботи з часом (детальніше про них — у наступному модулі): setTimeout(fn, 300) відкладає виклик fn на 300мс і повертає ID цього плану; clearTimeout(id) скасовує план, якщо він ще не виконався:",
        code: `const search = document.querySelector("#search");
let timeoutId;

search.addEventListener("input", () => {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    console.log("Пошук на сервері:", search.value); // лише після паузи в наборі
  }, 300);
});`,
        lineNotes: ["clearTimeout скасовує ПОПЕРЕДНІЙ запланований запит щоразу, коли input спрацьовує знову — реальний запит відправляється лише коли користувач ЗУПИНЯЄТЬСЯ набирати на 300мс.", "Без debounce цей код відправляв би запит на сервер на кожен окремий символ — марно навантажуючи сервер під час швидкого набору тексту."],
      },
    ],
    commonMistakes: ["Використовувати change для живого відгуку під час набору тексту — спрацює лише при втраті фокусу, а не одразу.", "Забувати, що input реагує й на вставку/вирізання тексту, а не лише на клавіші.", "Викликати дорогу операцію прямо в input без debounce — виконується на кожен символ.", "Плутати поведінку change для текстових полів (чекає blur) з поведінкою для checkbox/select (спрацьовує миттєво)."],
    dontDoThis: { code: `const input = document.querySelector("#search");\n\ninput.addEventListener("change", () => { // БАГ: change чекає на blur\n  performLiveSearch(input.value);\n});\n// Користувач набирає текст — результати пошуку НЕ зʼявляються, доки не klікне поза полем`, explanation: "change для текстового поля спрацьовує лише при втраті фокусу (blur), а не на кожен символ під час набору. Для \"живого пошуку\", що має оновлюватись прямо під час набору тексту, потрібен input — він реагує миттєво на кожну зміну значення. Використання change тут змушує користувача клікнути десь поза полем, щоб побачити результати — це виглядає як зламаний функціонал живого пошуку." },
    bestPractices: ["Використовуй input для будь-якого живого відгуку під час набору тексту (лічильники, live-пошук, валідація в реальному часі).", "Використовуй change для дій, що мають відбутись лише після завершення редагування (дорогі перевірки, збереження).", "Для checkbox, radio і select використовуй change — він природно спрацьовує одразу, без потреби в input.", "Додавай debounce до input-обробників, що викликають дорогі операції (запити на сервер, важкі перерахунки)."],
    remember: ["input — миттєво на кожну зміну значення; change — при фіксації значення (blur для тексту, одразу для checkbox/select).", "change для текстового поля НЕ спрацьовує під час набору — лише коли поле втрачає фокус.", "checkbox, radio, select фіксують значення миттєво — change для них спрацьовує без затримки.", "Дорогі операції в input-обробнику варто обгортати в debounce, щоб не виконувати їх на кожен символ."],
    interviewQuestions: [
      { question: "У чому основна різниця між input і change для текстового поля?", answer: "input спрацьовує СИНХРОННО на кожну окрему зміну значення поля — кожне натискання клавіші, вставку чи вирізання тексту. change для текстового поля спрацьовує лише коли поле втрачає фокус (blur), і лише якщо значення реально змінилось з моменту отримання фокусу — це відкладена реакція на \"фіксацію\" значення, а не на кожну проміжну зміну." },
      { question: "Чому change для checkbox чи select поводиться інакше, ніж для текстового поля?", answer: "Для checkbox, radio і select нове значення фіксується МИТТЄВО в момент взаємодії користувача (клік по checkbox, вибір опції) — немає проміжного \"стану редагування\", як при наборі тексту символ за символом. Тому change для цих елементів спрацьовує одразу, без потреби чекати на втрату фокусу." },
      { question: "Чому важливо додавати debounce до input-обробника, що виконує запит на сервер?", answer: "input спрацьовує на КОЖНУ окрему зміну значення — кожен натиснутий символ під час швидкого набору тексту викликав би окремий запит на сервер без debounce, створюючи зайве навантаження й потенційно застарілі результати, що приходять із затримкою. Debounce (через setTimeout + clearTimeout) відкладає реальний запит, доки користувач не зробить паузу в наборі, відправляючи лише один запит замість багатьох." },
      { question: "Чи спрацює input, якщо текст у поле вставили через Ctrl+V, а не набрали руками?", answer: "Так. input реагує на БУДЬ-ЯКУ зміну значення поля, незалежно від способу — набір з клавіатури, вставку (paste), вирізання (cut) чи навіть програмну зміну через деякі API, що явно диспатчать цю подію. Обробник, що очікує лише клавіатурний ввід (наприклад, через keydown), пропустив би зміни через вставку — саме тому input надійніший для відстеження реальних змін значення." },
    ],
    summary: "input спрацьовує миттєво на кожну зміну значення поля (символ, вставка, вирізання) — ідеальний для живого відгуку. change фіксує значення: для текстових полів — при втраті фокусу, для checkbox/radio/select — одразу при виборі. Дорогі операції в input варто обгортати в debounce.",
    proTip: "Якщо \"живий\" функціонал (лічильник, пошук) оновлюється \"із запізненням\" лише після кліку поза полем — перша підозра: обробник слухає change замість input.",
    nextLessonNote: "Далі — спливання подій (bubbling): як подія проходить від елемента вгору по DOM-дереву, і як event.stopPropagation() зупиняє це поширення.",
    interactiveDemo: "input-change-demo",
    practiceTask: {
      title: "Виправ живий лічильник символів, що оновлюється із запізненням",
      description: "Лічильник символів слухає change замість input, тому оновлюється лише після втрати фокусу полем, а не в реальному часі під час набору. Виправ на input.",
      checklist: ["Лічильник оновлюється на КОЖЕН символ під час набору тексту.", "Не потрібно клікати поза полем, щоб побачити оновлене число.", "Використано подію input замість change."],
      starterFiles: [
        {
          id: "js-input-change-start",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<textarea id="bio" placeholder="Розкажи про себе"></textarea>
<p id="counter">0 символів</p>

<script>
  const textarea = document.querySelector("#bio");
  const counter = document.querySelector("#counter");

  textarea.addEventListener("change", () => { // БАГ: change чекає на blur
    counter.textContent = textarea.value.length + " символів";
  });
</script>
`,
        },
      ],
      solutionFiles: [
        {
          id: "js-input-change-solution",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<textarea id="bio" placeholder="Розкажи про себе"></textarea>
<p id="counter">0 символів</p>

<script>
  const textarea = document.querySelector("#bio");
  const counter = document.querySelector("#counter");

  textarea.addEventListener("input", () => {
    counter.textContent = textarea.value.length + " символів";
  });
</script>
`,
          readOnly: true,
        },
      ],
      hints: ["change для текстового поля спрацьовує лише при втраті фокусу — не одразу під час набору.", "input реагує миттєво на кожну зміну значення, включно з кожним символом."],
      expectedOutput: "Лічильник оновлюється одразу під час набору тексту, без кліку поза полем",
    },
    microExercises: [
      { id: "js-input-change-predict", kind: "predict", prompt: "Коли спрацює обробник change для звичайного текстового <input>, якщо користувач набирає текст, а потім клікає на кнопку поза полем?", code: `input.addEventListener("change", () => console.log("змінено"));`, solution: "В момент кліку на кнопку — коли поле #input втрачає фокус (blur) ПІСЛЯ того, як значення реально змінилось під час набору. Сам процес набору тексту НЕ викликає change — лише момент втрати фокусу з уже зміненим значенням." },
      { id: "js-input-change-checkbox-find-bug", kind: "find-the-bug", prompt: "Чому цей код НЕ реагує на клік по checkbox одразу?", code: `checkbox.addEventListener("focus", () => {\n  console.log("Змінено:", checkbox.checked);\n});`, solution: "Обробник слухає подію focus, а не change (чи навіть click). focus спрацьовує лише коли елемент ОТРИМУЄ фокус (наприклад, через Tab чи клік), а не коли змінюється стан checked. Потрібно слухати checkbox.addEventListener(\"change\", ...) — вона спрацьовує одразу при зміні стану чекбоксу." },
      { id: "js-input-change-choice", kind: "choice", prompt: "Яка подія найкраще підходить для живого лічильника символів під час набору тексту?", options: ["change", "input", "blur", "focus"], correctAnswer: "input", solution: "input спрацьовує синхронно на кожну окрему зміну значення поля — саме це потрібно для лічильника, що має оновлюватись в реальному часі під час набору, а не лише після втрати фокусу (як change) чи при отриманні/втраті фокусу (focus/blur)." },
      { id: "js-input-change-explain", kind: "explain", prompt: "Поясни, чому для checkbox change спрацьовує одразу, а для текстового поля — лише при втраті фокусу.", solution: "Для checkbox нове значення (checked: true/false) фіксується МИТТЄВО в момент кліку — немає проміжного стану \"редагування\", як буває при наборі тексту символ за символом. Для текстового поля значення може багаторазово змінюватись під час одного \"сеансу\" редагування (кожен натиснутий символ), тому change чекає на BLUR — момент, коли користувач явно завершує редагування й переходить до чогось іншого." },
      { id: "js-input-change-debounce-rewrite", kind: "rewrite", prompt: "Перепиши обробник input, додавши debounce на 300мс перед виконанням пошуку.", code: `search.addEventListener("input", () => {\n  performSearch(search.value); // виконується на КОЖЕН символ, без затримки\n});`, solution: `let timeoutId;\nsearch.addEventListener("input", () => {\n  clearTimeout(timeoutId);\n  timeoutId = setTimeout(() => {\n    performSearch(search.value);\n  }, 300);\n});\n// clearTimeout скасовує попередній запланований пошук на кожен новий символ,\n// тому реальний пошук виконується лише після 300мс паузи в наборі` },
    ],
  },

  "Спливання подій (bubbling)": {
    whatIsIt: "Коли подія (наприклад, click) стається на елементі, вона не зупиняється на ньому — вона СПЛИВАЄ (bubbles) вгору по DOM-дереву: спочатку спрацьовує обробник на самому елементі, потім на його батьківському елементі, потім на батьківському елементі батька, і так далі до document. event.stopPropagation() зупиняє це подальше спливання. Протилежна фаза — capturing (занурення) — відбувається ПЕРЕД bubbling, зверху вниз; addEventListener(type, fn, true) чи addEventListener(type, fn, { capture: true }) підписується саме на цю фазу.",
    whyUseIt: "Спливання — основа делегування подій (один обробник на батьківському елементі обробляє кліки від усіх, навіть майбутніх, нащадків). Розуміння bubbling також допомагає уникнути реальних багів: клік на кнопку \"Видалити\" всередині картки може НЕСПОДІВАНО спрацювати й на обробнику самої картки (наприклад, \"відкрити деталі\"), якщо про спливання не подумати заздалегідь.",
    whenToUse: ["Делегування подій — один обробник на батьківському елементі замість багатьох на кожному нащадку.", "Реалізація шаблону \"клік поза елементом\" (закрити випадаюче меню/модальне вікно) — слухай click на document і перевіряй, чи ціль кліку всередині потрібного елемента.", "Потрібно зупинити подію від впливу на батьківський обробник — event.stopPropagation()."],
    whenNotToUse: ["Не викликай stopPropagation() \"про всяк випадок\" — це може зламати легітимну логіку батьківських елементів, що також залежить від цієї події (наприклад, аналітику кліків).", "Не покладайся на спливання для подій, що НЕ спливають (focus, blur, mouseenter, mouseleave) — для цих випадків є bubbling-версії: focusin, focusout, mouseover, mouseout.", "Не плутай stopPropagation() із preventDefault() — вони вирішують РІЗНІ задачі: одна зупиняє поширення події, інша скасовує стандартну дію браузера."],
    comparisonTable: {
      headers: ["Фаза / метод", "Що робить"],
      rows: [
        ["Bubbling (спливання)", "подія йде від цілі ВГОРУ по дереву до document — стандартна поведінка addEventListener"],
        ["Capturing (занурення)", "подія йде від document ВНИЗ до цілі — потрібен третій аргумент { capture: true }"],
        ["event.stopPropagation()", "зупиняє подальше поширення події (в обох напрямках) після поточного обробника"],
      ],
    },
    codeWalkthroughs: [
      {
        before: "Базове спливання — клік на кнопці спрацьовує на всіх трьох рівнях, від найглибшого до найвищого:",
        code: `document.body.addEventListener("click", () => console.log("body"));
document.querySelector("#card").addEventListener("click", () => console.log("card"));
document.querySelector("#button").addEventListener("click", () => console.log("button"));

// Клік на #button виводить, у ЦЬОМУ порядку:
// "button"
// "card"
// "body"`,
        lineNotes: ["Подія спочатку спрацьовує на елементі, де реально стався клік (#button), а потім спливає до кожного предка по черзі, викликаючи обробники в порядку від найглибшого до найвищого.", "Це відбувається автоматично для click та більшості інших подій, навіть якщо жоден з обробників явно не \"передає\" подію далі."],
      },
      {
        before: "Capturing (занурення) — та сама подія, але третій аргумент { capture: true } підписує на протилежну, більш РАННЮ фазу:",
        code: `document.body.addEventListener("click", () => console.log("body — capture"), { capture: true });
document.querySelector("#card").addEventListener("click", () => console.log("card — capture"), { capture: true });
document.querySelector("#button").addEventListener("click", () => console.log("button — bubble (за замовчуванням)"));

// Клік на #button виводить, у ЦЬОМУ порядку:
// "body — capture"   (спочатку йде ВНИЗ від document до цілі)
// "card — capture"
// "button — bubble (за замовчуванням)"  (лише тепер спрацьовує звичайний обробник на самій цілі)`,
        lineNotes: ["{ capture: true } (чи скорочено просто true третім аргументом) підписує обробник на фазу занурення — вона виконується ПЕРШОЮ, до того, як подія взагалі дістанеться цілі.", "Порядок capture-обробників — від НАЙВИЩОГО предка вниз до цілі (протилежний напрямок до bubbling), і лише після завершення цієї фази починається знайоме спливання знизу вгору."],
        after: "На практиці capturing використовують рідко — майже всі реальні задачі (делегування, зупинка небажаного впливу на батьків) розвʼязуються через звичайне bubbling і stopPropagation().",
      },
      {
        before: "Реальний баг: клік на кнопці \"Видалити\" всередині картки також відкриває деталі картки:",
        code: `const card = document.querySelector("#product-card");
const deleteButton = document.querySelector("#delete-button");

card.addEventListener("click", () => {
  console.log("Відкриваю деталі товару"); // спрацьовує ТАКОЖ при кліку на кнопку!
});

deleteButton.addEventListener("click", () => {
  console.log("Видаляю товар");
  // без stopPropagation клік СПЛИВЕ до card і теж відкриє деталі`,
        lineNotes: ["Клік на deleteButton спочатку викликає його власний обробник (\"Видаляю товар\"), а потім СПЛИВАЄ до батьківської картки, викликаючи й card-обробник (\"Відкриваю деталі товару\") — навіть коли користувач хотів лише видалити товар.", "Це типовий реальний баг: вкладені інтерактивні елементи (кнопки всередині клікабельних карток) неочікувано тригерять батьківську логіку через bubbling."],
      },
      {
        before: "Виправлення через stopPropagation — зупиняє подальше спливання до картки:",
        code: `deleteButton.addEventListener("click", (event) => {
  event.stopPropagation(); // зупиняє спливання до card
  console.log("Видаляю товар");
});
// Тепер клік на кнопці НЕ викликає обробник card`,
        lineNotes: ["event.stopPropagation() викликається ПЕРШИМ у обробнику — це гарантує, що подія не продовжить спливати до card незалежно від того, що станеться далі в цьому обробнику.", "Обробник card більше НЕ спрацьовує при кліку саме на deleteButton, хоча продовжує нормально працювати при кліку на будь-якій ІНШІЙ частині картки."],
      },
      {
        before: "Делегування використовує bubbling конструктивно — event.target.closest() визначає, на якому саме нащадку реально стався клік:",
        code: `const list = document.querySelector("#todo-list");

list.addEventListener("click", (event) => {
  const item = event.target.closest("li");
  if (item) {
    console.log("Клікнуто на пункт:", item.textContent);
  }
});
// Один обробник на #list ловить кліки від УСІХ <li>, включно з тими,
// що зʼявляться пізніше — завдяки природному спливанню кліку до #list`,
        lineNotes: ["Замість прикріплення обробника до КОЖНОГО <li> окремо, один обробник на батьківському #list природно отримує клік завдяки bubbling — це і є принцип делегування подій.", "event.target.closest(\"li\") знаходить найближчого предка-<li> від реального місця кліку (event.target), навіть якщо клік стався на вкладеному <span> всередині <li>."],
      },
    ],
    commonMistakes: ["Забувати, що деякі події (focus, blur, mouseenter, mouseleave) НЕ спливають — потрібні їхні bubbling-версії (focusin, focusout, mouseover, mouseout).", "Викликати stopPropagation() надмірно, ламаючи легітимну логіку батьківських обробників, що також залежать від цієї події.", "Плутати stopPropagation() (зупиняє поширення) з preventDefault() (скасовує стандартну дію браузера) — це різні механізми.", "Не враховувати bubbling при вкладених клікабельних елементах (кнопка всередині картки), що призводить до неочікуваного спрацювання батьківського обробника."],
    dontDoThis: { code: `card.addEventListener("click", () => openDetails());\ndeleteButton.addEventListener("click", () => {\n  deleteItem(); // БАГ: немає stopPropagation — клік спливе до card\n});\n// Клік на "Видалити" ТАКОЖ відкриває деталі товару — неочікувана поведінка`, explanation: "Клік на deleteButton спрацьовує на власному обробнику (deleteItem), а потім, через природне спливання, ТАКОЖ спрацьовує на обробнику card (openDetails) — навіть якщо користувач лише хотів видалити елемент. Без event.stopPropagation() у обробнику deleteButton подія продовжує поширюватись вгору по DOM-дереву й тригерить усі батьківські обробники цього ж типу події, що є типовою причиною неочікуваної поведінки у вкладених інтерактивних елементах." },
    bestPractices: ["Використовуй природне спливання конструктивно для делегування подій замість прикріплення багатьох окремих обробників.", "Викликай stopPropagation() лише коли є конкретна, задокументована причина — і памʼятай, що це може вплинути на іншу легітимну логіку вище в дереві.", "Для вкладених інтерактивних елементів (кнопка в картці) явно вирішуй, чи клік на дочірньому елементі повинен впливати на батьківський обробник.", "Використовуй event.target.closest() у делегованих обробниках, щоб точно визначити, на якому логічному елементі стався клік."],
    remember: ["Bubbling — подія йде від цілі ВГОРУ по DOM-дереву, спрацьовуючи на кожному предку по черзі.", "event.stopPropagation() зупиняє подальше спливання; це НЕ те саме, що preventDefault().", "Не всі події спливають — focus/blur/mouseenter/mouseleave не спливають, на відміну від focusin/focusout/mouseover/mouseout.", "Делегування подій використовує bubbling конструктивно: один обробник на батьку ловить події від усіх (включно з майбутніми) нащадків."],
    interviewQuestions: [
      { question: "Що таке спливання подій (event bubbling)?", answer: "Коли подія стається на конкретному елементі DOM, вона не обробляється лише там — вона поширюється (спливає) ВГОРУ по дереву предків, викликаючи відповідні обробники на кожному з них по черзі, від найглибшого елемента до document. Наприклад, клік на кнопці всередині div викличе спочатку обробник кнопки, потім обробник div, потім обробник body тощо, якщо такі зареєстровані." },
      { question: "У чому різниця між event.stopPropagation() і event.preventDefault()?", answer: "event.stopPropagation() зупиняє ПОДАЛЬШЕ ПОШИРЕННЯ події по DOM-дереву (bubbling чи capturing) — інші обробники цього ж типу події на предках (чи нащадках при capturing) більше не спрацюють. event.preventDefault() скасовує СТАНДАРТНУ ДІЮ БРАУЗЕРА для цієї події (навігацію по посиланню, відправку форми, тощо) — це не має нічого спільного з поширенням події та не зупиняє виконання інших обробників." },
      { question: "Як працює делегування подій, і чому воно залежить від bubbling?", answer: "Делегування подій — прикріплення ОДНОГО обробника до батьківського елемента замість окремих обробників на кожному нащадку. Це працює завдяки bubbling: коли подія стається на будь-якому нащадку (навіть доданому пізніше, динамічно), вона природно СПЛИВАЄ до батьківського елемента, де єдиний обробник її й обробляє — зазвичай з перевіркою event.target чи event.target.closest(), щоб визначити, на якому саме нащадку реально стався клік." },
      { question: "Наведи реальний приклад, коли незупинене спливання спричиняє баг.", answer: "Клікабельна картка товару з кнопкою \"Видалити\" всередині: обробник на картці відкриває деталі товару при кліку, а обробник на кнопці видаляє товар. Без event.stopPropagation() у обробнику кнопки клік на \"Видалити\" спочатку виконає видалення, а потім СПЛИВЕ до картки й ТАКОЖ відкриє деталі товару — неочікувана поведінка, яку користувач точно не мав на увазі." },
    ],
    summary: "Bubbling — подія спливає від цілі вгору по DOM-дереву, спрацьовуючи на кожному предку. event.stopPropagation() зупиняє це поширення (не плутати з preventDefault(), що скасовує стандартну дію браузера). Делегування подій використовує bubbling конструктивно; незупинене спливання у вкладених інтерактивних елементах — типова причина неочікуваних багів.",
    proTip: "Якщо клік на вкладеному елементі (кнопка в картці) неочікувано тригерить і батьківську логіку — перша перевірка: чи викликається event.stopPropagation() у обробнику вкладеного елемента.",
    nextLessonNote: "Далі — скасування поведінки за замовчуванням: preventDefault() глибше, за межами форм — посилання, контекстне меню, клавіатурні скорочення.",
    interactiveDemo: "event-bubbling-demo",
    practiceTask: {
      title: "Виправ картку, де клік на кнопці Видалити також відкриває деталі",
      description: "Клік на кнопці #delete-button всередині картки #product-card також викликає обробник картки (\"відкриваю деталі\") через bubbling. Додай stopPropagation, щоб зупинити це.",
      checklist: ["Клік на кнопці #delete-button виконує лише видалення.", "Обробник картки #product-card НЕ спрацьовує при кліку на кнопці.", "Клік на іншій частині картки (не на кнопці) продовжує відкривати деталі."],
      starterFiles: [
        {
          id: "js-bubbling-start",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<div id="product-card" style="padding: 16px; border: 1px solid #ccc;">
  <p>Товар: Навушники</p>
  <button id="delete-button">Видалити</button>
</div>
<p id="output"></p>

<script>
  const card = document.querySelector("#product-card");
  const deleteButton = document.querySelector("#delete-button");
  const output = document.querySelector("#output");

  card.addEventListener("click", () => {
    output.textContent = "Відкрито деталі товару";
  });

  deleteButton.addEventListener("click", () => {
    // БАГ: немає stopPropagation — клік спливає до card
    output.textContent = "Товар видалено";
  });
</script>
`,
        },
      ],
      solutionFiles: [
        {
          id: "js-bubbling-solution",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<div id="product-card" style="padding: 16px; border: 1px solid #ccc;">
  <p>Товар: Навушники</p>
  <button id="delete-button">Видалити</button>
</div>
<p id="output"></p>

<script>
  const card = document.querySelector("#product-card");
  const deleteButton = document.querySelector("#delete-button");
  const output = document.querySelector("#output");

  card.addEventListener("click", () => {
    output.textContent = "Відкрито деталі товару";
  });

  deleteButton.addEventListener("click", (event) => {
    event.stopPropagation();
    output.textContent = "Товар видалено";
  });
</script>
`,
          readOnly: true,
        },
      ],
      hints: ["Клік на кнопці спочатку виконує власний обробник, потім спливає до батьківської картки.", "event.stopPropagation() у обробнику кнопки зупиняє це подальше спливання."],
      expectedOutput: "Клік на \"Видалити\" показує лише \"Товар видалено\", без \"Відкрито деталі товару\"",
    },
    microExercises: [
      { id: "js-bubbling-order-predict", kind: "predict", prompt: "У якому порядку виведуться повідомлення при кліку на #inner?", code: `outer.addEventListener("click", () => console.log("outer"));\ninner.addEventListener("click", () => console.log("inner"));\n// #inner вкладений всередину #outer`, solution: "Спочатку \"inner\", потім \"outer\" — подія спрацьовує на елементі, де реально стався клік (#inner), а потім спливає вгору до батьківського #outer, викликаючи його обробник після." },
      { id: "js-bubbling-nostop-find-bug", kind: "find-the-bug", prompt: "У чому проблема цього коду для модального вікна?", code: `overlay.addEventListener("click", closeModal);\nmodalBox.addEventListener("click", () => {\n  console.log("Клік всередині модалки");\n  // немає stopPropagation\n});`, solution: "Клік всередині modalBox (наприклад, на тексті чи кнопці всередині модального вікна) спрацьовує на власному обробнику modalBox, а потім СПЛИВАЄ до overlay й викликає closeModal — модалка неочікувано закривається при кліку на будь-де ВСЕРЕДИНІ неї. Потрібен event.stopPropagation() у обробнику modalBox, щоб клік всередині модалки не спливав до overlay." },
      { id: "js-bubbling-nonbubbling-choice", kind: "choice", prompt: "Яка з цих подій НЕ спливає (потребує bubbling-версії focusin замість неї)?", options: ["click", "input", "focus", "keydown"], correctAnswer: "focus", solution: "focus (і blur) НЕ спливають по DOM-дереву — якщо потрібно відстежити отримання фокуса будь-яким нащадком через делегування на батьківському елементі, слід використовувати focusin (bubbling-версію), а не focus." },
      { id: "js-bubbling-explain", kind: "explain", prompt: "Поясни, чому делегування подій залежить саме від bubbling, а не від capturing.", solution: "Делегування прикріплює ОДИН обробник до батьківського елемента й розраховує, що подія від будь-якого нащадка (навіть доданого пізніше динамічно) дійде до цього батька. Bubbling природно поширює подію ВІД цілі ВГОРУ до батька — саме напрямок, потрібний делегуванню. Capturing поширюється у ПРОТИЛЕЖНОМУ напрямку (від document ВНИЗ до цілі) і вимагає, щоб обробник на батьку спрацював ДО того, як подія навіть досягла нащадка — це не той механізм, що потрібен для \"перехоплення подій від нащадків\"." },
      { id: "js-bubbling-delegation-rewrite", kind: "rewrite", prompt: "Перепиши код, що прикріплює окремий обробник до кожного <li>, використовуючи делегування на батьківському <ul>.", code: `document.querySelectorAll("li").forEach((li) => {\n  li.addEventListener("click", () => console.log(li.textContent));\n});`, solution: `const list = document.querySelector("ul");\nlist.addEventListener("click", (event) => {\n  const li = event.target.closest("li");\n  if (li) {\n    console.log(li.textContent);\n  }\n});\n// Один обробник на ul замінює обробники на кожному li,\n// і автоматично покриває li, додані пізніше динамічно` },
    ],
  },

  "Скасування поведінки за замовчуванням": {
    whatIsIt: "Багато подій мають ВБУДОВАНУ стандартну дію браузера: клік на посиланні переходить за URL, правий клік відкриває контекстне меню, натискання пробілу чи стрілок гортає сторінку, клік на checkbox змінює його стан. event.preventDefault() скасовує ЛИШЕ цю стандартну дію для конкретної події — вона НЕ зупиняє спливання (для цього потрібен окремий stopPropagation()) і працює лише для подій, у яких event.cancelable дорівнює true.",
    whyUseIt: "preventDefault() необхідний, коли потрібна ПОВНІСТЮ власна логіка замість стандартної поведінки браузера: перехоплення кліку на посиланні для клієнтської навігації (SPA-роутинг), власне контекстне меню замість стандартного, клавіатурні скорочення, що не повинні викликати стандартне гортання сторінки чи пошук браузера.",
    whenToUse: ["Перехоплення кліку на <a> для клієнтського роутингу без повного перезавантаження сторінки.", "Реалізація власного контекстного меню замість стандартного браузерного (подія contextmenu).", "Клавіатурні скорочення (наприклад, Ctrl+S для збереження всередині застосунку), що не повинні викликати стандартну дію браузера."],
    whenNotToUse: ["Не викликай preventDefault() на КОЖНОМУ keydown \"про всяк випадок\" — це може зламати копіювання, вставку, стандартні скорочення браузера й доступність для людей, що покладаються на клавіатурну навігацію.", "Не скасовуй contextmenu без реальної, повноцінної власної альтернативи — це ламає очікувану користувачем можливість правого кліку.", "Не намагайся викликати preventDefault() на подіях, зареєстрованих з {passive: true} (типово для деяких scroll/touch-обробників) — браузер ігнорує це й може вивести попередження в консоль."],
    comparisonTable: {
      headers: ["Метод", "Що скасовує"],
      rows: [
        ["event.preventDefault()", "стандартну дію браузера для цієї події (навігація, контекстне меню, тощо)"],
        ["event.stopPropagation()", "подальше поширення (bubbling/capturing) події по DOM — НЕ стандартну дію"],
        ["event.cancelable", "булева властивість — чи можна взагалі скасувати стандартну дію для ЦІЄЇ конкретної події"],
      ],
    },
    codeWalkthroughs: [
      {
        before: "Перехоплення кліку на посиланні для клієнтського роутингу (SPA-стиль):",
        code: `const link = document.querySelector("a[href='/profile']");

link.addEventListener("click", (event) => {
  event.preventDefault(); // без цього — повне перезавантаження сторінки
  console.log("Клієнтська навігація на /profile, без reload");
  // тут був би виклик роутера, що оновлює вміст сторінки через JS
});`,
        lineNotes: ["Без event.preventDefault() браузер виконав би стандартну дію для <a> — повну навігацію (перезавантаження) на href, ігноруючи будь-яку JS-логіку роутера.", "preventDefault() зупиняє ЛИШЕ цю стандартну навігацію — сам клік і подальша JS-логіка (виклик роутера) виконуються нормально."],
      },
      {
        before: "Власне контекстне меню замість стандартного браузерного:",
        code: `const canvas = document.querySelector("#editor-canvas");

canvas.addEventListener("contextmenu", (event) => {
  event.preventDefault(); // без цього — стандартне меню браузера "Зберегти як..." тощо
  showCustomContextMenu(event.clientX, event.clientY);
});`,
        lineNotes: ["contextmenu — подія, що спрацьовує саме на правий клік; її стандартна дія — показати вбудоване браузерне контекстне меню.", "preventDefault() скасовує ЦЕ стандартне меню, дозволяючи показати замість нього повністю власний інтерфейс (showCustomContextMenu) у тому самому місці кліку."],
      },
      {
        before: "Перевірка event.cancelable перед preventDefault — не всі події можна скасувати:",
        code: `document.addEventListener("scroll", (event) => {
  console.log("cancelable:", event.cancelable); // зазвичай false для scroll
  if (event.cancelable) {
    event.preventDefault();
  }
}, { passive: true });
// passive: true явно каже браузеру, що preventDefault тут НЕ буде викликаний`,
        lineNotes: ["event.cancelable повідомляє, чи ЦЯ конкретна подія підтримує скасування стандартної дії — викликати preventDefault() на подіях з cancelable: false просто не матиме ефекту.", "{ passive: true } — явна обіцянка браузеру не викликати preventDefault у цьому обробнику, що дозволяє браузеру оптимізувати прокрутку (не чекати завершення обробника перед скролом)."],
      },
      {
        before: "Клавіатурне скорочення Ctrl+S всередині застосунку замість стандартного діалогу браузера:",
        code: `document.addEventListener("keydown", (event) => {
  if (event.key === "s" && event.ctrlKey) {
    event.preventDefault(); // без цього — браузер відкриє системний діалог "Зберегти сторінку"
    saveDocument();
  }
});`,
        lineNotes: ["Без preventDefault() браузер виконав би СВОЮ стандартну дію для Ctrl+S — відкрив би системний діалог збереження HTML-сторінки, а не логіку застосунку.", "Перевірка обох умов (event.key === \"s\" && event.ctrlKey) гарантує, що preventDefault викликається ЛИШЕ для цієї конкретної комбінації, а не для звичайного натискання клавіші \"s\"."],
      },
    ],
    commonMistakes: ["Плутати preventDefault() (скасовує стандартну дію) із stopPropagation() (зупиняє поширення події) — це різні, незалежні механізми.", "Викликати preventDefault() на подіях, зареєстрованих з {passive: true} — браузер ігнорує це та може вивести попередження в консоль.", "Скасовувати contextmenu без реальної, зручної власної альтернативи — ламає очікування користувача щодо правого кліку.", "Викликати preventDefault() на кожному keydown без перевірки конкретної клавіші/комбінації — ламає копіювання, вставку та інші стандартні дії браузера."],
    dontDoThis: { code: `document.addEventListener("keydown", (event) => {\n  event.preventDefault(); // БАГ: скасовує ВСІ клавіатурні дії, без перевірки\n  handleShortcut(event.key);\n});\n// Копіювання (Ctrl+C), вставка (Ctrl+V), F5 та інші стандартні дії браузера ЗЛАМАНІ`, explanation: "preventDefault() викликається на КОЖНОМУ натисканні клавіші, без перевірки, яка саме клавіша чи комбінація натиснута. Це скасовує стандартну поведінку браузера для АБСОЛЮТНО ВСІХ клавіш — копіювання (Ctrl+C), вставка (Ctrl+V), оновлення сторінки (F5), навігація по вкладках (Ctrl+Tab) і навіть звичайний ввід тексту в поля. preventDefault() варто викликати ЛИШЕ після перевірки конкретної клавіші чи комбінації, для якої дійсно потрібна власна логіка замість стандартної дії браузера." },
    bestPractices: ["Викликай preventDefault() лише для КОНКРЕТНОЇ, перевіреної клавіші/дії, а не безумовно для всієї категорії подій.", "Надавай реальну власну альтернативу, коли скасовуєш стандартну дію (власне контекстне меню, власний роутер) — не залишай користувача \"без нічого\".", "Перевіряй event.cancelable перед preventDefault() для подій, де скасування не гарантоване.", "Не викликай preventDefault() у слухачах, зареєстрованих з {passive: true} — це суперечить обіцянці, даній браузеру."],
    remember: ["preventDefault() скасовує стандартну дію БРАУЗЕРА для події; stopPropagation() зупиняє ПОШИРЕННЯ події — це різні механізми.", "event.cancelable показує, чи можна взагалі скасувати стандартну дію для конкретної події.", "{ passive: true } — обіцянка не викликати preventDefault, що дозволяє браузеру оптимізувати обробку (наприклад, прокрутку).", "Скасовуй стандартну дію лише коли надаєш реальну власну альтернативу (роутинг, контекстне меню, тощо)."],
    interviewQuestions: [
      { question: "Що саме скасовує event.preventDefault(), і чого воно НЕ робить?", answer: "event.preventDefault() скасовує СТАНДАРТНУ ДІЮ БРАУЗЕРА для конкретної події — навігацію по посиланню, відправку форми, показ контекстного меню тощо. Вона НЕ зупиняє поширення (bubbling/capturing) події по DOM-дереву — для цього потрібен окремий викликstopPropagation(). Це дві незалежні операції, які можна викликати разом чи окремо, залежно від потреби." },
      { question: "Для чого призначена властивість event.cancelable?", answer: "event.cancelable — булева властивість, що показує, чи ВЗАГАЛІ можна скасувати стандартну дію браузера для КОНКРЕТНОЇ події через preventDefault(). Деякі події (наприклад, scroll у певних контекстах) мають cancelable: false — викликати на них preventDefault() просто не матиме жодного ефекту, і код, що на це розраховує, працюватиме неправильно." },
      { question: "Чому виклик preventDefault() у обробнику з {passive: true} не рекомендований?", answer: "{ passive: true } — явна обіцянка браузеру, дана під час реєстрації обробника, що цей обробник НЕ буде викликати preventDefault(). Це дозволяє браузеру одразу почати виконувати стандартну дію (наприклад, прокрутку) паралельно з виконанням обробника, без очікування його завершення — суттєва оптимізація продуктивності. Порушення цієї обіцянки (виклик preventDefault всередині) ігнорується браузером і може вивести попередження в консоль розробника." },
      { question: "Наведи приклад, коли надмірне використання preventDefault() шкодить користувацькому досвіду.", answer: "Виклик event.preventDefault() на КОЖНОМУ keydown без перевірки конкретної клавіші скасовує стандартну поведінку браузера для АБСОЛЮТНО ВСІХ клавіш — це ламає копіювання (Ctrl+C), вставку (Ctrl+V), оновлення сторінки (F5) та навіть звичайний ввід тексту в поля форми. Правильний підхід — викликати preventDefault() лише ПІСЛЯ перевірки, що це саме та клавіша/комбінація, для якої потрібна власна логіка." },
    ],
    summary: "event.preventDefault() скасовує стандартну дію браузера для конкретної події (навігація, контекстне меню, тощо) — окремо від stopPropagation(), що зупиняє поширення події. event.cancelable показує, чи скасування взагалі можливе для цієї події. Скасовувати стандартну дію варто лише з реальною власною альтернативою, і ніколи безумовно для цілої категорії подій.",
    proTip: "Якщо клавіатурне скорочення застосунку \"ламає\" стандартні дії браузера (копіювання, F5) — перша перевірка: чи викликається preventDefault() без точної перевірки конкретної клавіші/комбінації.",
    nextLessonNote: "Це завершує модуль \"Події\" — далі на черзі асинхронний JavaScript: Promise, async/await і робота з мережевими запитами.",
    interactiveDemo: "prevent-default-demo",
    practiceTask: {
      title: "Виправ посилання, що перезавантажує сторінку замість клієнтської навігації",
      description: "Клік на посиланні #profile-link мав би оновлювати вміст через JS (клієнтський роутинг), але через відсутність preventDefault() браузер завжди виконує повну навігацію. Додай preventDefault.",
      checklist: ["Клік на посиланні НЕ викликає повне перезавантаження сторінки.", "Виводиться повідомлення про клієнтську навігацію.", "Використано event.preventDefault() у обробнику click."],
      starterFiles: [
        {
          id: "js-prevent-default-start",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<a id="profile-link" href="/profile">Мій профіль</a>
<p id="output"></p>

<script>
  const link = document.querySelector("#profile-link");

  link.addEventListener("click", () => {
    // БАГ: немає event.preventDefault() — браузер перезавантажує сторінку
    document.querySelector("#output").textContent = "Клієнтська навігація на /profile";
  });
</script>
`,
        },
      ],
      solutionFiles: [
        {
          id: "js-prevent-default-solution",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<a id="profile-link" href="/profile">Мій профіль</a>
<p id="output"></p>

<script>
  const link = document.querySelector("#profile-link");

  link.addEventListener("click", (event) => {
    event.preventDefault();
    document.querySelector("#output").textContent = "Клієнтська навігація на /profile";
  });
</script>
`,
          readOnly: true,
        },
      ],
      hints: ["Стандартна дія <a> — навігація за href, що перезавантажує сторінку.", "event.preventDefault() у обробнику click скасовує цю навігацію, залишаючи лише JS-логіку."],
      expectedOutput: "Клік на посиланні показує повідомлення без перезавантаження сторінки",
    },
    microExercises: [
      { id: "js-prevent-default-predict", kind: "predict", prompt: "Що станеться при кліку на посиланні, якщо обробник click НЕ викликає preventDefault()?", code: `link.addEventListener("click", () => {\n  console.log("Обробка кліку");\n});`, solution: "Console.log виконається, а ПОТІМ браузер виконає свою стандартну дію для <a> — навігацію за href, що спричинить повне перезавантаження (чи перехід) сторінки, втрачаючи весь поточний стан JavaScript." },
      { id: "js-prevent-default-passive-find-bug", kind: "find-the-bug", prompt: "Чому preventDefault() тут не матиме ефекту?", code: `element.addEventListener("touchstart", (event) => {\n  event.preventDefault();\n}, { passive: true });`, solution: "{ passive: true } — явна обіцянка браузеру НЕ викликати preventDefault() у цьому обробнику, дана під час реєстрації. Браузер ІГНОРУЄ виклик preventDefault() всередині такого обробника (і може вивести попередження в консоль) — обіцянку не можна порушити всередині того самого обробника. Якщо preventDefault реально потрібен, слід реєструвати обробник без { passive: true }." },
      { id: "js-prevent-default-choice", kind: "choice", prompt: "Що з переліченого зупиняє event.stopPropagation(), а НЕ event.preventDefault()?", options: ["навігацію по посиланню", "показ контекстного меню", "поширення події по DOM-дереву", "відправку форми"], correctAnswer: "поширення події по DOM-дереву", solution: "event.stopPropagation() зупиняє ПОШИРЕННЯ (bubbling/capturing) події по DOM. Навігація, контекстне меню й відправка форми — це стандартні дії браузера, які скасовує саме event.preventDefault(), а не stopPropagation()." },
      { id: "js-prevent-default-explain", kind: "explain", prompt: "Поясни різницю між event.preventDefault() і event.stopPropagation() своїми словами.", solution: "event.preventDefault() скасовує ВБУДОВАНУ дію БРАУЗЕРА для конкретної події — те, що браузер зробив би автоматично (навігація, показ меню, відправка форми). event.stopPropagation() натомість зупиняє ПОШИРЕННЯ самої події по DOM-дереву — інші обробники того самого типу події на елементах-предках (чи нащадках, при capturing) просто не отримають шансу спрацювати. Це дві повністю незалежні задачі: одна про стандартну поведінку браузера, інша про механізм передачі події між елементами." },
      { id: "js-prevent-default-shortcut-rewrite", kind: "rewrite", prompt: "Перепиши обробник keydown так, щоб preventDefault викликався ЛИШЕ для конкретної комбінації Ctrl+S, а не для всіх клавіш.", code: `document.addEventListener("keydown", (event) => {\n  event.preventDefault(); // скасовує ВСІ клавіші без розбору\n  if (event.key === "s" && event.ctrlKey) {\n    saveDocument();\n  }\n});`, solution: `document.addEventListener("keydown", (event) => {\n  if (event.key === "s" && event.ctrlKey) {\n    event.preventDefault();\n    saveDocument();\n  }\n});\n// preventDefault викликається ЛИШЕ після підтвердження, що це саме Ctrl+S —\n// усі інші клавіші (копіювання, вставка, звичайний ввід) працюють нормально` },
    ],
  },
};
