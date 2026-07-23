import type { LessonOverride } from "./htmlFoundations";
import type { QuizData } from "../../../types/course";

/**
 * Module "DOM" (js-dom). Sixth JavaScript module — selecting real elements,
 * creating DOM nodes, updating text/attributes/classes/styles safely, and
 * (later lessons) DOM performance and event delegation. Same deep
 * cheat-sheet lesson format as js-objects and js-arrays. First 4 of 6
 * lessons.
 */
export const jsDomOverrides: Record<string, LessonOverride> = {
  "Вибір елементів": {
    whatIsIt: "document.querySelector(selector) повертає ПЕРШИЙ елемент, що відповідає CSS-селектору, або null, якщо збігів немає. document.querySelectorAll(selector) повертає СТАТИЧНИЙ NodeList з УСІМА збігами — цей список не оновлюється автоматично, якщо DOM зміниться пізніше. document.getElementById(id) — найшвидший спосіб знайти елемент за унікальним id. document.getElementsByClassName/TagName повертають ЖИВУ HTMLCollection, яка автоматично відображає майбутні зміни DOM.",
    whyUseIt: "Будь-яка робота з реальною сторінкою починається з отримання посилання на конкретний DOM-елемент чи групу елементів — без правильного вибору немислимо ні прочитати, ні змінити щось на сторінці. Найпоширеніший реальний баг — забути перевірити, що querySelector дійсно щось знайшов, перед тим як звертатись до властивостей результату.",
    whenToUse: ["Потрібен ОДИН конкретний елемент за CSS-селектором чи id — querySelector/getElementById.", "Потрібні ВСІ елементи, що відповідають селектору, для перебору — querySelectorAll.", "Потрібна колекція, яка автоматично відображає майбутні зміни DOM (рідше) — getElementsByClassName/TagName."],
    whenNotToUse: ["Не використовуй querySelector, коли реально потрібні ВСІ збіги — він завжди повертає лише ПЕРШИЙ.", "Не звертайся до властивостей результату querySelector без перевірки на null — елемента може не існувати.", "Не очікуй, що querySelectorAll поверне ОНОВЛЕНИЙ список після зміни DOM — це статичний СНІМОК на момент виклику."],
    comparisonTable: {
      headers: ["Метод", "Повертає"],
      rows: [
        ["querySelector(sel)", "перший елемент-збіг, або null"],
        ["querySelectorAll(sel)", "статичний NodeList з усіма збігами"],
        ["getElementById(id)", "елемент за id, або null — найшвидший варіант"],
        ["getElementsByClassName(cls)", "ЖИВА HTMLCollection — оновлюється автоматично"],
      ],
    },
    codeWalkthroughs: [
      {
        before: "querySelector повертає ПЕРШИЙ збіг або null — завжди потрібна перевірка перед використанням:",
        code: `const firstCard = document.querySelector(".card");
console.log(firstCard); // <div class="card">... — перший елемент з класом card

const missing = document.querySelector(".no-such-class");
console.log(missing); // null — жодного збігу

console.log(missing.textContent); // TypeError: Cannot read properties of null`,
        lineNotes: ["querySelector завжди повертає лише ОДИН елемент — навіть якщо на сторінці 10 елементів з класом .card, повернеться лише перший з них у порядку документа.", "missing дорівнює null, бо селектора .no-such-class немає на сторінці — спроба читати .textContent з null кидає справжній TypeError."],
      },
      {
        before: "querySelectorAll повертає СТАТИЧНИЙ NodeList з усіх збігів — перебирається через forEach:",
        code: `const allCards = document.querySelectorAll(".card");
console.log(allCards.length); // 3, наприклад

allCards.forEach((card) => {
  console.log(card.textContent);
});`,
        lineNotes: ["NodeList, що повертає querySelectorAll, підтримує .forEach() напряму (на відміну від старішого HTMLCollection) — не потрібно спочатку перетворювати на масив.", "allCards.length фіксується в момент виклику querySelectorAll — додавання нової .card карточки ПІСЛЯ цього виклику не змінить allCards.length."],
      },
      {
        before: "getElementById — найшвидший спосіб знайти елемент за унікальним ідентифікатором:",
        code: `<div id="header">Заголовок</div>

<script>
  const header = document.getElementById("header"); // без символу #!
  console.log(header.textContent); // "Заголовок"
</script>`,
        lineNotes: ["getElementById приймає САМ id без символу # — на відміну від querySelector(\"#header\"), де # обов'язковий, бо це CSS-селектор.", "getElementById оптимізований браузером саме для пошуку за id і зазвичай швидший за querySelector для цього конкретного випадку."],
      },
      {
        before: "Жива HTMLCollection (getElementsByClassName) проти статичного NodeList (querySelectorAll) — реальна різниця в поведінці:",
        code: `const liveCollection = document.getElementsByClassName("item");
const staticList = document.querySelectorAll(".item");

console.log(liveCollection.length, staticList.length); // 2, 2

const newItem = document.createElement("div");
newItem.className = "item";
document.body.appendChild(newItem);

console.log(liveCollection.length, staticList.length); // 3, 2 — рознились!`,
        lineNotes: ["liveCollection.length одразу стає 3 після додавання нового елемента з класом item — HTMLCollection ЖИВА і відображає поточний стан DOM.", "staticList.length залишається 2 — querySelectorAll зафіксував список у момент ВИКЛИКУ, і додавання нового елемента пізніше на нього не впливає."],
        after: "Ця \"жива\" поведінка HTMLCollection рідко потрібна на практиці і може стати джерелом плутанини — querySelectorAll зі статичним списком зазвичай передбачуваніший вибір.",
      },
      {
        before: "getElementsByTagName — той самий принцип, що й getElementsByClassName, але вибір за назвою тегу:",
        code: `<ul>
  <li>Молоко</li>
  <li>Хліб</li>
</ul>

<script>
  const items = document.getElementsByTagName("li");
  console.log(items.length); // 2 — жива HTMLCollection усіх <li> на сторінці
  console.log(items[0].textContent); // "Молоко"
</script>`,
        lineNotes: ["getElementsByTagName(\"li\") знаходить УСІ елементи з тегом <li> на сторінці, незалежно від класу чи id — параметр тут назва тегу, а не селектор.", "Як і getElementsByClassName, результат — ЖИВА HTMLCollection: додавання нового <li> пізніше автоматично збільшить items.length."],
      },
    ],
    commonMistakes: ["Звертатись до властивостей результату querySelector без перевірки на null — типова причина TypeError у production.", "Очікувати від querySelector усіх збігів, хоча він завжди повертає лише ПЕРШИЙ.", "Забувати, що querySelectorAll повертає СТАТИЧНИЙ список — код, що покладається на \"оновлення\" цього списку після зміни DOM, просто не працюватиме.", "Плутати #id (потрібен для querySelector) з просто id (потрібен для getElementById) — символ # там доречний лише як частина CSS-селектора."],
    dontDoThis: { code: `function highlightFirstError() {\n  const errorBox = document.querySelector(".error-message");\n  errorBox.style.color = "red"; // БАГ: немає перевірки на null\n}\n\nhighlightFirstError(); // TypeError, якщо на сторінці немає .error-message`, explanation: "Якщо на сторінці зараз немає елемента з класом .error-message (наприклад, форма ще не була відправлена й помилки ще не показані), querySelector поверне null. Наступний рядок errorBox.style.color = \"red\" намагається прочитати властивість style з null, що кидає справжній TypeError: Cannot set properties of null. Потрібна перевірка: if (errorBox) { ... }." },
    bestPractices: ["Завжди перевіряй результат querySelector/getElementById на null перед використанням: if (el) { ... }.", "Використовуй querySelectorAll, коли реально потрібні ВСІ збіги, а не лише перший.", "Обирай querySelector/querySelectorAll за умовчанням — вони підтримують будь-який CSS-селектор і достатньо швидкі для переважної більшості випадків.", "Використовуй getElementById лише коли ти впевнений, що елемент з таким id вже існує на сторінці."],
    remember: ["querySelector повертає ПЕРШИЙ збіг або null; querySelectorAll — статичний NodeList з УСІХ збігів.", "Завжди перевіряй на null перед зверненням до властивостей результату querySelector/getElementById.", "querySelectorAll — статичний СНІМОК: додавання нових елементів у DOM пізніше НЕ оновлює вже отриманий список.", "getElementsByClassName/TagName повертають ЖИВУ HTMLCollection, що автоматично відображає майбутні зміни DOM — рідко потрібна на практиці поведінка."],
    interviewQuestions: [
      { question: "Що поверне document.querySelector(\".card\"), якщо на сторінці немає жодного елемента з класом card?", answer: "null. querySelector НЕ кидає помилку, якщо збігів немає — він тихо повертає null, і саме тому код, що звертається до властивостей результату без перевірки, ризикує отримати TypeError: Cannot read properties of null." },
      { question: "У чому різниця між querySelectorAll і getElementsByClassName?", answer: "querySelectorAll повертає СТАТИЧНИЙ NodeList — знімок DOM на момент виклику, який не змінюється, навіть якщо DOM пізніше зміниться. getElementsByClassName повертає ЖИВУ HTMLCollection, яка автоматично відображає ПОТОЧНИЙ стан DOM — її .length може змінюватись сам по собі, якщо елементи додаються чи видаляються." },
      { question: "Чому document.getElementById(\"header\") не потребує символу #, а document.querySelector(\"#header\") потребує?", answer: "getElementById приймає САМ id як звичайний рядок — це не CSS-селектор, а прямий пошук за атрибутом id. querySelector натомість приймає будь-який CSS-селектор, а # у CSS-синтаксисі саме й означає \"обрати за id\" — без # querySelector(\"header\") шукав би елементи з ТЕГОМ header, а не з id=\"header\"." },
      { question: "Чому важливо перевіряти результат querySelector на null перед подальшим використанням?", answer: "querySelector повертає null, якщо селектору не відповідає жоден елемент на сторінці — це нормальна, очікувана поведінка (не помилка самого querySelector). Якщо код одразу звертається до властивості чи методу результату (наприклад, .textContent чи .style.color = ...) без перевірки, і елемента насправді немає, JavaScript кидає TypeError — реальну помилку в production, яку легко попередити перевіркою if (el)." },
    ],
    summary: "querySelector повертає ПЕРШИЙ збіг або null; querySelectorAll — статичний NodeList з УСІХ збігів, який не оновлюється після зміни DOM. getElementById найшвидший для пошуку за id. getElementsByClassName/TagName повертають ЖИВУ колекцію, що автоматично відображає майбутні зміни DOM. Завжди перевіряй результат на null перед використанням.",
    proTip: "Якщо в консолі бачиш \"Cannot read properties of null\" одразу після рядка з querySelector чи getElementById — це майже завжди означає, що елемент з таким селектором/id ще не існує в DOM у момент виконання цього коду (наприклад, скрипт запустився раніше, ніж розмітка встигла зʼявитись).",
    nextLessonNote: "Далі — створення DOM-вузлів: як динамічно додати новий елемент на сторінку через createElement і appendChild, замість статичної розмітки.",
    interactiveDemo: "select-elements-demo",
    practiceTask: {
      title: "Виправ TypeError через відсутню перевірку на null",
      description: "Функція highlightFirstError не перевіряє, чи querySelector дійсно знайшов елемент, перед тим як змінити його стиль — якщо елемента немає, це кидає TypeError. Додай перевірку.",
      checklist: ["highlightFirstError не кидає помилку, якщо елемента .error-message немає на сторінці.", "Якщо елемент існує, його колір тексту стає червоним.", "Використано перевірку if (errorBox) перед зверненням до errorBox.style."],
      starterFiles: [
        {
          id: "js-select-elements-start",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<p id="output">Готово</p>

<script>
  function highlightFirstError() {
    const errorBox = document.querySelector(".error-message");
    errorBox.style.color = "red"; // БАГ: немає перевірки на null
  }

  try {
    highlightFirstError();
    document.querySelector("#output").textContent = "Без помилок";
  } catch (err) {
    document.querySelector("#output").textContent = "Помилка: " + err.message;
  }
  // на сторінці немає .error-message, тому зараз кидає помилку
</script>
`,
        },
      ],
      solutionFiles: [
        {
          id: "js-select-elements-solution",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<p id="output">Готово</p>

<script>
  function highlightFirstError() {
    const errorBox = document.querySelector(".error-message");
    if (errorBox) {
      errorBox.style.color = "red";
    }
  }

  try {
    highlightFirstError();
    document.querySelector("#output").textContent = "Без помилок";
  } catch (err) {
    document.querySelector("#output").textContent = "Помилка: " + err.message;
  }
  // тепер "Без помилок", навіть без .error-message на сторінці
</script>
`,
          readOnly: true,
        },
      ],
      hints: ["querySelector повертає null, якщо на сторінці немає елемента з таким селектором.", "Обгорни зміну стилю в if (errorBox) { ... }."],
      expectedOutput: "\"Без помилок\"",
    },
    microExercises: [
      { id: "js-select-query-predict", kind: "predict", prompt: "Що виведе цей код, якщо на сторінці 3 елементи з класом .tag?", code: `console.log(document.querySelector(".tag"));\nconsole.log(document.querySelectorAll(".tag").length);`, solution: "Спочатку перший елемент з класом tag (один DOM-елемент), потім 3 — querySelector завжди повертає лише ПЕРШИЙ збіг, а querySelectorAll(...).length — кількість УСІХ збігів." },
      { id: "js-select-null-find-bug", kind: "find-the-bug", prompt: "У чому проблема цього коду?", code: `const banner = document.querySelector(".promo-banner");\nbanner.textContent = "Знижка 20%!";`, solution: "Якщо на сторінці немає елемента з класом .promo-banner (наприклад, банер показується умовно), querySelector поверне null. Спроба присвоїти banner.textContent кидає TypeError: Cannot set properties of null. Потрібна перевірка: if (banner) { banner.textContent = ...; }." },
      { id: "js-select-live-choice", kind: "choice", prompt: "Який метод повертає ЖИВУ колекцію, що автоматично відображає майбутні зміни DOM?", options: ["querySelectorAll", "getElementsByClassName", "querySelector", "getElementById"], correctAnswer: "getElementsByClassName", solution: "getElementsByClassName (та getElementsByTagName) повертають ЖИВУ HTMLCollection — на відміну від querySelectorAll, яка повертає статичний NodeList, зафіксований у момент виклику." },
      { id: "js-select-static-explain", kind: "explain", prompt: "Поясни, чому змінна зі списком з querySelectorAll не покаже новий елемент, додаcode на сторінку ПІСЛЯ виклику querySelectorAll.", solution: "querySelectorAll повертає СТАТИЧНИЙ NodeList — це знімок DOM саме на момент виклику методу, а не \"живе посилання\" на поточний стан сторінки. Додавання нового елемента до DOM ПІСЛЯ цього виклику не змінює вже отриманий список — щоб побачити новий елемент, потрібно викликати querySelectorAll ЗНОВУ." },
      { id: "js-select-safe-rewrite", kind: "rewrite", prompt: "Перепиши функцію, щоб вона безпечно ховала елемент з id 'modal', навіть якщо його немає на сторінці.", code: `function closeModal() {\n  document.getElementById("modal").style.display = "none";\n}`, solution: `function closeModal() {\n  const modal = document.getElementById("modal");\n  if (modal) {\n    modal.style.display = "none";\n  }\n}\n// перевірка на null перед доступом до .style запобігає TypeError` },
    ],
    quiz: {
      id: "js-select-elements-quiz",
      title: "Швидка перевірка: Вибір елементів",
      questions: [
        {
          id: "js-select-q1",
          type: "code",
          question: "Що виведе цей код, якщо на сторінці немає елемента з класом .promo?",
          codeSnippet: `const banner = document.querySelector(".promo");\nconsole.log(banner);`,
          options: ["null", "undefined", "[]", "TypeError"],
          correctAnswer: "null",
          explanation: "querySelector тихо повертає null, якщо жоден елемент не відповідає селектору — це не помилка сама по собі.",
        },
        {
          id: "js-select-q2",
          type: "single",
          question: "У чому різниця між querySelectorAll і getElementsByClassName?",
          options: [
            "querySelectorAll повертає живу колекцію, getElementsByClassName — статичну",
            "querySelectorAll повертає статичний NodeList (знімок), getElementsByClassName — живу HTMLCollection",
            "Різниці немає, це синоніми",
            "getElementsByClassName підтримує будь-який CSS-селектор, а querySelectorAll — лише класи",
          ],
          correctAnswer: "querySelectorAll повертає статичний NodeList (знімок), getElementsByClassName — живу HTMLCollection",
          explanation: "querySelectorAll фіксує список у момент виклику. getElementsByClassName автоматично відображає поточний стан DOM.",
        },
        {
          id: "js-select-q3",
          type: "true-false",
          question: "document.getElementById(\"header\") потребує символу # перед іменем, як і querySelector.",
          options: ["Так", "Ні"],
          correctAnswer: false,
          explanation: "getElementById приймає сам id як звичайний рядок без #. Символ # потрібен лише в CSS-селекторах для querySelector.",
        },
        {
          id: "js-select-q4",
          type: "code",
          question: "Що виведе цей код?",
          codeSnippet: `const errorBox = document.querySelector(".error-message");\nerrorBox.style.color = "red";`,
          options: ["Колір тексту стає червоним", "TypeError: Cannot set properties of null", "undefined", "Нічого не відбувається"],
          correctAnswer: "TypeError: Cannot set properties of null",
          explanation: "Якщо .error-message відсутній на сторінці, querySelector повертає null, і спроба встановити .style.color на null кидає TypeError.",
        },
        {
          id: "js-select-q5",
          type: "single",
          question: "Чому querySelectorAll(...).length не змінюється після додавання нового елемента в DOM пізніше?",
          options: [
            "Це баг у браузері",
            "querySelectorAll повертає статичний знімок DOM на момент виклику, а не живе посилання",
            "length завжди дорівнює 0 для querySelectorAll",
            "Потрібно викликати querySelectorAll з прапорцем live: true",
          ],
          correctAnswer: "querySelectorAll повертає статичний знімок DOM на момент виклику, а не живе посилання",
          explanation: "На відміну від getElementsByClassName/TagName, NodeList від querySelectorAll фіксується один раз і не оновлюється автоматично.",
        },
      ],
    },
  },

  "Створення DOM-вузлів": {
    whatIsIt: "document.createElement(tagName) створює НОВИЙ, ще не приєднаний до сторінки DOM-елемент. parent.appendChild(node) (чи новіший parent.append(...)) додає цей вузол як реальну частину сторінки. Створений, але не приєднаний елемент існує лише в памʼяті й не видимий користувачу, доки його не додати в DOM через appendChild/append.",
    whyUseIt: "Реальні інтерфейси рідко повністю статичні — список товарів, коментарі, нові рядки таблиці зʼявляються ДИНАМІЧНО у відповідь на дії користувача чи дані з сервера. createElement + appendChild — фундаментальний, найнизькорівневіший спосіб додати щось нове на сторінку без перезавантаження чи заміни всього HTML.",
    whenToUse: ["Потрібно додати новий елемент на сторінку programмatically, у відповідь на подію чи дані.", "Створення кількох однотипних елементів у циклі (наприклад, список товарів з масиву).", "Побудова складнішої структури елементів перед одноразовим додаванням у DOM (через DocumentFragment)."],
    whenNotToUse: ["Не використовуй innerHTML += для додавання нового вмісту в цикл — це змушує браузер повторно перепарсити ВЕСЬ вміст контейнера на кожній ітерації.", "Не створюй елементи, якщо простіше й достатньо оновити textContent/атрибути ІСНУЮЧОГО елемента.", "Не додавай елементи по одному в DOM у великому циклі без DocumentFragment — кожен appendChild у DOM напряму може примусити браузер заново порахувати розміри й позиції елементів на сторінці (це називають перерахунком макета, або reflow), а це не безкоштовна операція."],
    comparisonTable: {
      headers: ["Спосіб", "Наслідок"],
      rows: [
        ["createElement + appendChild", "додає ОДИН новий елемент, точний контроль"],
        ["innerHTML += \"...\"", "перепарсює ВЕСЬ вміст контейнера — втрачає стан існуючих вузлів"],
        ["DocumentFragment + append", "будує кілька елементів у памʼяті, додає в DOM ОДНИМ порухом"],
      ],
    },
    codeWalkthroughs: [
      {
        before: "createElement створює вузол, який ще НЕ на сторінці, доки не додати appendChild:",
        code: `const newItem = document.createElement("li");
newItem.textContent = "Новий товар";

console.log(document.body.contains(newItem)); // false — ще не на сторінці

document.querySelector("ul").appendChild(newItem);
console.log(document.body.contains(newItem)); // true — тепер реально видимий`,
        lineNotes: ["Одразу після createElement newItem — повноцінний DOM-елемент у памʼяті, з усіма властивостями, але користувач його НЕ бачить.", "appendChild фізично вставляє вузол у дерево DOM останнім дитячим елементом обраного батька — лише після цього він рендериться на екрані."],
      },
      {
        before: "Реальна пастка innerHTML += у циклі — кожна ітерація перепарсює ВЕСЬ контейнер:",
        code: `const list = document.querySelector("#list");

// БАГ: += змушує браузер перепарсити ВЕСЬ innerHTML на кожній ітерації
for (let i = 0; i < 3; i++) {
  list.innerHTML += "<li>Товар " + i + "</li>";
}
// Працює візуально, але: (1) повільніше на великих списках,
// (2) знищує й перебудовує ВСІ попередні <li>, включно з їхніми
// обробниками подій, якщо такі були прикріплені напряму`,
        lineNotes: ["list.innerHTML += \"...\" на кожній ітерації читає ВЕСЬ поточний innerHTML, додає новий рядок і перепризначає innerHTML — це перепарсює і перебудовує КОЖЕН елемент контейнера заново, не лише новий.", "Якщо до попередніх <li> були прикріплені обробники подій напряму (el.onclick = ...), вони губляться, бо ці DOM-вузли фізично знищуються й створюються заново."],
      },
      {
        before: "Правильна альтернатива — createElement + appendChild на кожній ітерації, без перепарсингу існуючих вузлів:",
        code: `const list = document.querySelector("#list");

for (let i = 0; i < 3; i++) {
  const item = document.createElement("li");
  item.textContent = "Товар " + i;
  list.appendChild(item);
}
// Кожен попередній <li> залишається тим самим вузлом — жодного
// перепарсингу вже існуючого вмісту`,
        lineNotes: ["createElement(\"li\") на кожній ітерації створює новий, окремий вузол — попередні <li> залишаються фізично незмінними DOM-вузлами.", "list.appendChild(item) додає ЛИШЕ цей новий вузол у кінець списку, не торкаючись і не перебудовуючи вже наявні елементи."],
        after: "Ця різниця стає критичною для списків з десятками/сотнями елементів чи коли до елементів прикріплені обробники подій чи інший JS-стан.",
      },
      {
        before: "DocumentFragment — побудова кількох елементів у памʼяті перед ОДНИМ додаванням у реальний DOM:",
        code: `const fragment = document.createDocumentFragment();

for (let i = 0; i < 100; i++) {
  const item = document.createElement("li");
  item.textContent = "Рядок " + i;
  fragment.appendChild(item); // додається у ФРАГМЕНТ, не в реальний DOM
}

document.querySelector("#list").appendChild(fragment);
// ОДНЕ реальне оновлення DOM-дерева сторінки, а не 100 окремих`,
        lineNotes: ["DocumentFragment — легкий контейнер у памʼяті, що ще НЕ є частиною реального дерева сторінки, тому appendChild у нього не викликає перерахунок макета сторінки взагалі.", "Останній appendChild(fragment) переносить УСІ 100 дочірніх елементів фрагмента в реальний DOM за ОДНУ операцію, замість 100 окремих операцій вставки."],
      },
    ],
    commonMistakes: ["Використовувати innerHTML += у циклі для додавання елементів — перепарсює ВЕСЬ контейнер на кожній ітерації, руйнуючи існуючі вузли й обробники подій.", "Забувати, що createElement сам по собі НЕ додає елемент на сторінку — потрібен ще appendChild/append.", "Створювати сотні елементів у циклі й додавати кожен НАПРЯМУ в реальний DOM замість через DocumentFragment.", "Плутати document.body.contains(node) (перевірка, чи вузол реально на сторінці) з простим fact того, що змінна на нього посилається."],
    dontDoThis: { code: `function renderList(items) {\n  const list = document.querySelector("#list");\n  items.forEach((item) => {\n    list.innerHTML += "<li>" + item + "</li>"; // БАГ: перепарсює весь список щоразу\n  });\n}\n\nrenderList(["Товар 1", "Товар 2", "Товар 3"]);`, explanation: "Кожен виклик list.innerHTML += ... змушує браузер серіалізувати ВЕСЬ поточний вміст списку в рядок, додати новий текст, а потім РОЗПАРСИТИ й ПЕРЕБУДУВАТИ весь innerHTML заново — включно з усіма попередніми <li>, які вже були на сторінці. Для 3 елементів це малозначуще на око, але для великих списків це справжня проблема продуктивності, а обробники подій, прикріплені до попередніх елементів напряму, взагалі губляться." },
    bestPractices: ["Для додавання елементів у циклі використовуй createElement + appendChild замість innerHTML +=.", "Для великої кількості елементів (десятки й більше) будуй їх у DocumentFragment і додавай в DOM ОДНИМ appendChild.", "Перевіряй document.body.contains(node), якщо потрібно дізнатись, чи вузол реально приєднаний до сторінки.", "Використовуй element.append(...) (сучасніша альтернатива appendChild) — приймає кілька аргументів і навіть текстові рядки напряму."],
    remember: ["createElement створює вузол у памʼяті — він НЕ видимий на сторінці, доки не додати через appendChild/append.", "innerHTML += у циклі перепарсює ВЕСЬ вміст контейнера на кожній ітерації — повільно і руйнує існуючі вузли/обробники подій.", "DocumentFragment дозволяє побудувати кілька елементів у памʼяті й додати їх у реальний DOM ОДНИМ порухом.", "document.body.contains(node) перевіряє, чи вузол реально приєднаний до дерева сторінки."],
    interviewQuestions: [
      { question: "Чи стане елемент видимим на сторінці одразу після document.createElement(\"div\")?", answer: "Ні. createElement лише СТВОРЮЄ вузол у памʼяті — він повністю ізольований від дерева документа, доки його явно не додати через appendChild, append чи подібний метод. Без цього кроку елемент ніколи не зʼявиться на екрані." },
      { question: "Чому innerHTML += вважається проблематичним способом додавання елементів у циклі?", answer: "Кожен виклик innerHTML += серіалізує ВЕСЬ поточний вміст контейнера в рядок HTML, додає новий фрагмент, а потім браузер ПОВНІСТЮ перепарсює й перебудовує ВСІ дочірні вузли контейнера заново — не лише новододаний. Це повільніше на великих списках і знищує стан (обробники подій, фокус) уже існуючих елементів." },
      { question: "Для чого використовується DocumentFragment?", answer: "Для побудови кількох DOM-вузлів у памʼяті ПЕРЕД одноразовим додаванням їх у реальне дерево сторінки. Оскільки фрагмент не є частиною видимого DOM, додавання елементів у нього не викликає перерахунків макета — а фінальний appendChild(fragment) переносить усі накопичені елементи за ОДНУ реальну операцію оновлення сторінки." },
      { question: "Як перевірити, чи конкретний DOM-вузол реально приєднаний до сторінки?", answer: "document.body.contains(node) повертає true, якщо node є частиною поточного дерева документа (приєднаний, прямо чи через батьків, до document.body), і false, якщо вузол існує лише в памʼяті (створений через createElement, але ще не доданий) чи вже видалений зі сторінки." },
    ],
    summary: "createElement створює DOM-вузол у памʼяті; він стає видимим лише після appendChild/append у реальне дерево сторінки. innerHTML += у циклі перепарсює весь контейнер щоразу — повільно й руйнує стан існуючих вузлів; createElement + appendChild чи DocumentFragment (для великих партій) — надійніша альтернатива.",
    proTip: "Якщо після додавання елементів через innerHTML += раптом зникли обробники подій чи стан форми (наприклад, фокус чи введений текст) на вже існуючих елементах — це майже завжди наслідок повного перепарсингу контейнера, а не окрема, незвʼязана проблема.",
    nextLessonNote: "Далі — оновлення тексту й атрибутів: textContent проти innerHTML, і чому вибір між ними впливає на безпеку та коректність рендеру.",
    interactiveDemo: "create-node-demo",
    practiceTask: {
      title: "Виправ рендер списку через innerHTML += на createElement",
      description: "Функція renderList додає товари в список через innerHTML += на кожній ітерації, що перепарсює весь список щоразу. Перепиши через createElement і appendChild.",
      checklist: ["renderList додає кожен товар як окремий <li> без перепарсингу існуючих елементів.", "Використано document.createElement і appendChild замість innerHTML +=.", "Список коректно відображає всі товари з масиву."],
      starterFiles: [
        {
          id: "js-create-node-start",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<ul id="list"></ul>

<script>
  function renderList(items) {
    const list = document.querySelector("#list");
    items.forEach((item) => {
      list.innerHTML += "<li>" + item + "</li>"; // БАГ: перепарсює весь список
    });
  }

  renderList(["Книга", "Ручка", "Зошит"]);
</script>
`,
        },
      ],
      solutionFiles: [
        {
          id: "js-create-node-solution",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<ul id="list"></ul>

<script>
  function renderList(items) {
    const list = document.querySelector("#list");
    items.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      list.appendChild(li);
    });
  }

  renderList(["Книга", "Ручка", "Зошит"]);
</script>
`,
          readOnly: true,
        },
      ],
      hints: ["innerHTML += перепарсює ВЕСЬ контейнер на кожній ітерації — потрібен спосіб додавати лише НОВИЙ елемент.", "document.createElement(\"li\") + li.textContent + list.appendChild(li) додає лише один новий вузол, не торкаючись існуючих."],
      expectedOutput: "Список з 3 елементів: Книга, Ручка, Зошит",
    },
    microExercises: [
      { id: "js-create-node-visible-predict", kind: "predict", prompt: "Що виведе цей код?", code: `const div = document.createElement("div");\ndiv.textContent = "Привіт";\nconsole.log(document.body.contains(div));`, solution: "false — div створений через createElement, але ще не доданий у DOM через appendChild/append, тому document.body.contains(div) повертає false." },
      { id: "js-create-node-innerhtml-find-bug", kind: "find-the-bug", prompt: "У чому проблема цього коду для великого масиву items (наприклад, 1000 елементів)?", code: `items.forEach((item) => {\n  list.innerHTML += "<li>" + item + "</li>";\n});`, solution: "Кожен виклик innerHTML += перепарсює ВЕСЬ поточний вміст list заново — для 1000 елементів це означає, що останні ітерації перебудовують дедалі більший і більший HTML-рядок щоразу, що робить операцію квадратично повільною замість лінійної, і додатково знищує обробники подій попередніх елементів." },
      { id: "js-create-node-fragment-choice", kind: "choice", prompt: "Для чого використовується DocumentFragment?", options: ["Для стилізації елементів", "Для побудови кількох вузлів у памʼяті перед одноразовим додаванням у DOM", "Для видалення елементів", "Для перевірки CSS-селекторів"], correctAnswer: "Для побудови кількох вузлів у памʼяті перед одноразовим додаванням у DOM", solution: "DocumentFragment — легкий контейнер, що не є частиною видимого дерева сторінки. У нього можна додати багато елементів без перерахунків макета, а потім перенести всі одразу в реальний DOM однією операцією appendChild(fragment)." },
      { id: "js-create-node-append-explain", kind: "explain", prompt: "Поясни, чому document.createElement(\"li\") сам по собі не додає новий пункт списку на сторінку.", solution: "createElement лише СТВОРЮЄ DOM-вузол у памʼяті JavaScript — цей вузол повністю ізольований від реального дерева документа, яке рендерить браузер. Доки цей вузол не буде явно приєднаний через appendChild, append чи подібний метод до вже існуючого елемента на сторінці, він залишається \"невидимою\" структурою даних, а не частиною відображуваної сторінки." },
      { id: "js-create-node-loop-rewrite", kind: "rewrite", prompt: "Перепиши функцію, щоб вона додавала товари через createElement замість innerHTML +=.", code: `function addProducts(products) {\n  const list = document.querySelector("#products");\n  products.forEach((p) => {\n    list.innerHTML += "<li>" + p.name + " — " + p.price + " грн</li>";\n  });\n}`, solution: `function addProducts(products) {\n  const list = document.querySelector("#products");\n  products.forEach((p) => {\n    const li = document.createElement("li");\n    li.textContent = p.name + " — " + p.price + " грн";\n    list.appendChild(li);\n  });\n}\n// кожен товар додається як окремий вузол, без перепарсингу існуючих <li>` },
    ],
    quiz: {
      id: "js-create-node-quiz",
      title: "Швидка перевірка: Створення DOM-вузлів",
      questions: [
        {
          id: "js-create-q1",
          type: "code",
          question: "Що виведе цей код?",
          codeSnippet: `const div = document.createElement("div");\ndiv.textContent = "Привіт";\nconsole.log(document.body.contains(div));`,
          options: ["true", "false", "undefined", "TypeError"],
          correctAnswer: "false",
          explanation: "createElement лише створює вузол у памʼяті. Він не стає частиною сторінки, доки не буде доданий через appendChild/append.",
        },
        {
          id: "js-create-q2",
          type: "single",
          question: "Чому innerHTML += у циклі вважається проблематичним?",
          options: [
            "Він взагалі не працює в сучасних браузерах",
            "Кожен виклик перепарсює ВЕСЬ вміст контейнера заново, руйнуючи існуючі вузли й обробники подій",
            "Він кидає помилку для великих масивів",
            "Він працює лише з <div>",
          ],
          correctAnswer: "Кожен виклик перепарсює ВЕСЬ вміст контейнера заново, руйнуючи існуючі вузли й обробники подій",
          explanation: "innerHTML += серіалізує весь поточний вміст, додає новий текст і перебудовує все заново — повільно і руйнує стан наявних елементів.",
        },
        {
          id: "js-create-q3",
          type: "single",
          question: "Для чого використовується DocumentFragment?",
          options: [
            "Для стилізації елементів",
            "Для побудови кількох вузлів у памʼяті перед одноразовим додаванням у DOM",
            "Для видалення елементів зі сторінки",
            "Для перевірки CSS-селекторів",
          ],
          correctAnswer: "Для побудови кількох вузлів у памʼяті перед одноразовим додаванням у DOM",
          explanation: "DocumentFragment — легкий контейнер поза реальним деревом сторінки; фінальний appendChild переносить усі накопичені елементи однією операцією.",
        },
        {
          id: "js-create-q4",
          type: "true-false",
          question: "document.createElement сам по собі одразу робить елемент видимим на сторінці.",
          options: ["Так", "Ні"],
          correctAnswer: false,
          explanation: "Створений елемент існує лише в памʼяті, поки його явно не додати через appendChild чи append до вже наявного елемента сторінки.",
        },
        {
          id: "js-create-q5",
          type: "single",
          question: "Чим element.append() відрізняється від element.appendChild()?",
          options: [
            "append() приймає кілька аргументів і навіть текстові рядки напряму, appendChild — лише один вузол",
            "Це повністю ідентичні методи без жодної різниці",
            "appendChild сучасніший і рекомендований",
            "append() працює лише в Node.js",
          ],
          correctAnswer: "append() приймає кілька аргументів і навіть текстові рядки напряму, appendChild — лише один вузол",
          explanation: "append() — сучасніша, гнучкіша альтернатива appendChild(), що приймає кілька вузлів чи рядків одночасно.",
        },
      ],
    },
  },

  "Оновлення тексту й атрибутів": {
    whatIsIt: "element.textContent читає/записує ЧИСТИЙ текст, ігноруючи будь-які HTML-теги в значенні (вони показуються як буквальний текст, не рендерені). element.innerHTML читає/записує HTML-РОЗМІТКУ — теги в значенні РЕНДЕРЯТЬСЯ як реальні елементи, що робить innerHTML небезпечним для вставки тексту з недовірених джерел (XSS). setAttribute(name, value)/getAttribute(name)/removeAttribute(name) керують HTML-атрибутами; element.dataset — зручний доступ до кастомних data-* атрибутів.",
    whyUseIt: "Динамічне оновлення тексту й атрибутів — найчастіша операція в реальних інтерфейсах: показати повідомлення користувачу, оновити title зображення, змінити href посилання. Правильний вибір між textContent і innerHTML — це не стилістична деталь, а питання безпеки: вставка недовіреного тексту через innerHTML — класичний вектор XSS-атаки.",
    whenToUse: ["textContent — коли потрібно показати ЧИСТИЙ текст, включно з будь-яким текстом від користувача чи API.", "innerHTML — лише коли значення ЗАЗДАЛЕГІДЬ відоме, довірене і справді МАЄ містити HTML-теги для рендеру.", "setAttribute/dataset — для керування HTML-атрибутами (title, href, data-*), яких немає як прямих JS-властивостей."],
    whenNotToUse: ["Не використовуй innerHTML для вставки тексту від користувача чи зовнішнього API без санітизації — це XSS-ризик.", "Не використовуй textContent, коли значення СПРАВДІ має містити HTML-теги, що мають рендеритись, — теги покажуться як буквальний текст, а не розмітка.", "Не читай HTML-атрибути напряму через element.attributeName для нестандартних атрибутів — використовуй getAttribute чи dataset."],
    comparisonTable: {
      headers: ["Властивість/метод", "Поведінка"],
      rows: [
        ["textContent", "чистий текст; теги в значенні показуються буквально, НЕ рендеряться"],
        ["innerHTML", "рендерить HTML-теги в значенні; ризик XSS для недовіреного вмісту"],
        ["setAttribute(\"data-id\", \"5\")", "встановлює HTML-атрибут data-id=\"5\""],
        ["element.dataset.id", "читає/записує той самий data-id, але через camelCase JS-властивість"],
      ],
    },
    codeWalkthroughs: [
      {
        before: "textContent показує HTML-теги в значенні як буквальний текст, а не рендерить їх:",
        code: `const box = document.querySelector("#box");
box.textContent = "Привіт, <b>світ</b>!";

console.log(box.innerHTML); // "Привіт, &lt;b&gt;світ&lt;/b&gt;!"
// На екрані буквально видно текст "Привіт, <b>світ</b>!", а не жирне "світ"`,
        lineNotes: ["textContent екранує будь-які символи, схожі на HTML-теги — < і > автоматично перетворюються на &lt; і &gt; при рендері, тому теги показуються як звичайний текст.", "Це РОБИТЬ textContent безпечним для вставки будь-якого недовіреного тексту — навіть якщо користувач введе <script>, він відобразиться як текст, а не виконається."],
      },
      {
        before: "innerHTML РЕНДЕРИТЬ теги в значенні — небезпечно для недовіреного вмісту:",
        code: `const box = document.querySelector("#box");
box.innerHTML = "Привіт, <b>світ</b>!";

console.log(box.querySelector("b")); // реальний <b> елемент — тег БУВ розпарсений і рендерений
// На екрані видно жирне слово "світ"

// А тепер уявімо userInput = "<img src=x onerror=alert(1)>"
box.innerHTML = userComment; // XSS, якщо userComment не санітизований!`,
        lineNotes: ["На відміну від textContent, innerHTML РОЗПАРСОВУЄ рядок як реальний HTML і будує з нього реальні DOM-вузли — саме тому тег <b> справді рендериться жирним.", "Якщо вставлений рядок походить від користувача чи зовнішнього API без санітизації, зловмисник може вставити <script>/onerror-атрибут і виконати довільний JavaScript у контексті сторінки — це і є XSS."],
        after: "Правило: якщо значення — просто текст (навіть з посиланнями чи спецсимволами) — textContent; якщо значення СПРАВДІ має бути розміткою від довіреного джерела — innerHTML.",
      },
      {
        before: "setAttribute/getAttribute/removeAttribute для керування HTML-атрибутами:",
        code: `const link = document.querySelector("a");

link.setAttribute("href", "https://example.com");
console.log(link.getAttribute("href")); // "https://example.com"

link.setAttribute("target", "_blank");
link.removeAttribute("target"); // повністю видаляє атрибут target

console.log(link.hasAttribute("target")); // false`,
        lineNotes: ["setAttribute працює з БУДЬ-ЯКИМ атрибутом, включно з нестандартними/кастомними — універсальний спосіб.", "removeAttribute повністю видаляє атрибут з елемента — на відміну від встановлення порожнього значення, атрибут більше НЕ зʼявиться в HTML взагалі."],
      },
      {
        before: "dataset — зручний доступ до data-* атрибутів через camelCase JS-властивості:",
        code: `<div id="product" data-product-id="42" data-in-stock="true"></div>

<script>
  const product = document.querySelector("#product");

  console.log(product.dataset.productId); // "42" — data-product-id стає dataset.productId
  console.log(product.dataset.inStock); // "true" (завжди РЯДОК, навіть для "true"/"false")

  product.dataset.productId = "99"; // оновлює data-product-id="99" в реальному HTML
</script>`,
        lineNotes: ["dataset автоматично перетворює kebab-case атрибути (data-product-id) на camelCase властивості (dataset.productId) — без ручного getAttribute(\"data-product-id\").", "Усі значення dataset — завжди РЯДКИ, навіть якщо виглядають як число чи булеве значення (\"true\") — потрібне явне перетворення (Number(...), значення === \"true\"), якщо потрібен реальний тип."],
      },
    ],
    commonMistakes: ["Вставляти текст від користувача чи зовнішнього API через innerHTML без санітизації — класичний XSS-ризик.", "Використовувати textContent для значення, яке СПРАВДІ має містити HTML-розмітку для рендеру — теги показуються як буквальний текст замість форматованого вмісту.", "Забувати, що всі значення dataset — завжди рядки, і порівнювати їх з булевими/числовими значеннями напряму без перетворення.", "Читати кастомні атрибути через element.myAttribute замість getAttribute(\"my-attribute\") чи dataset.myAttribute — прямий доступ як властивість працює лише для стандартних HTML-атрибутів."],
    dontDoThis: { code: `function showComment(userComment) {\n  const box = document.querySelector("#comments");\n  box.innerHTML += "<p>" + userComment + "</p>"; // БАГ: XSS-ризик!\n}\n\nshowComment("<img src=x onerror=alert('Зламано!')>"); // виконує довільний JS`, explanation: "userComment вставляється НАПРЯМУ в innerHTML без жодної санітизації. Якщо userComment містить HTML-теги зі спеціальними атрибутами-обробниками (onerror, onload тощо), браузер РОЗПАРСОВУЄ і рендерить цей HTML як реальні елементи — і виконує вбудований JavaScript. Це справжня XSS-вразливість: будь-хто, хто може вплинути на userComment (наприклад, залишити коментар), може виконати довільний код у браузерах інших користувачів сторінки. Правильно: box.textContent = userComment (чи створення тексту через createElement + textContent), яке автоматично екранує теги." },
    bestPractices: ["Обирай textContent за умовчанням для будь-якого тексту, що може містити недовірений вміст (від користувача, з API).", "Використовуй innerHTML лише для СПРАВДІ довіреної, заздалегідь відомої розмітки.", "Комбінуй setAttribute/dataset для роботи з HTML-атрибутами замість прямого читання невідомих властивостей елемента.", "Памʼятай, що dataset завжди повертає рядки — явно перетворюй у Number()/Boolean(), якщо потрібен реальний тип."],
    remember: ["textContent показує теги в значенні як буквальний текст — безпечно для недовіреного вмісту, але НЕ рендерить розмітку.", "innerHTML рендерить теги в значенні як реальні елементи — небезпечно для недовіреного вмісту (XSS), але потрібно для реальної розмітки.", "setAttribute/getAttribute/removeAttribute — універсальний спосіб керування будь-яким HTML-атрибутом.", "dataset автоматично перетворює data-kebab-case на camelCase JS-властивості; усі значення — завжди рядки."],
    interviewQuestions: [
      { question: "У чому головна практична різниця між textContent і innerHTML?", answer: "textContent записує/читає чистий текст — будь-які символи, схожі на HTML-теги, автоматично екрануються й показуються буквально, не рендеряться. innerHTML записує/читає реальну HTML-розмітку — теги в значенні РОЗПАРСОВУЮТЬСЯ і рендеряться як справжні DOM-елементи, що робить innerHTML небезпечним для вставки недовіреного тексту (ризик XSS)." },
      { question: "Чому вставка тексту від користувача через innerHTML вважається небезпечною?", answer: "Якщо текст користувача містить HTML-теги зі спеціальними атрибутами-обробниками подій (наприклад, <img onerror=\"...\">) чи <script>, innerHTML РОЗПАРСОВУЄ цей текст як реальну розмітку й браузер може виконати вбудований у неї JavaScript — це XSS-атака. textContent натомість завжди показує такий текст буквально, без виконання." },
      { question: "Як прочитати значення кастомного атрибута data-user-id у JavaScript?", answer: "Через element.dataset.userId (camelCase-версія data-user-id) або через element.getAttribute(\"data-user-id\") напряму. dataset — зручніший, автоматично конвертований спосіб для саме data-* атрибутів." },
      { question: "Чи можна порівнювати element.dataset.active з булевим значенням true напряму?", answer: "Ні напряму — усі значення dataset ЗАВЖДИ рядки, навіть якщо в HTML написано data-active=\"true\". element.dataset.active === true завжди буде false, бо порівнюється рядок \"true\" з булевим true. Потрібне явне перетворення: element.dataset.active === \"true\"." },
    ],
    summary: "textContent — безпечний чистий текст, що екранує будь-які теги в значенні; innerHTML рендерить теги як реальну розмітку, небезпечно для недовіреного вмісту (XSS). setAttribute/getAttribute/removeAttribute керують будь-яким HTML-атрибутом; dataset дає camelCase-доступ до data-* атрибутів, завжди повертаючи рядки.",
    proTip: "Якщо сумніваєшся, який з двох (textContent чи innerHTML) використати — обирай textContent. Явна потреба в innerHTML (реальна, довірена розмітка) виникає значно рідше, ніж здається на перший погляд.",
    nextLessonNote: "Далі — оновлення класів і стилів: classList проти прямого className, і чому className = \"...\" небезпечно перезаписує всі існуючі класи елемента.",
    interactiveDemo: "update-text-attrs-demo",
    practiceTask: {
      title: "Виправ XSS-ризик у виведенні коментаря користувача",
      description: "Функція showComment вставляє коментар користувача через innerHTML без санітизації, що дозволяє виконати довільний HTML/JS. Перепиши через textContent.",
      checklist: ["showComment безпечно показує будь-який текст користувача, включно з HTML-тегами як буквальним текстом.", "Використано textContent замість innerHTML для вставки коментаря.", "Функція коректно працює для звичайного тексту без спецсимволів."],
      starterFiles: [
        {
          id: "js-update-text-start",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<div id="comments"></div>

<script>
  function showComment(userComment) {
    const box = document.querySelector("#comments");
    box.innerHTML += "<p>" + userComment + "</p>"; // БАГ: XSS-ризик
  }

  showComment("<b>Небезпечний</b> текст із розміткою");
  // теги реально РЕНДЕРЯТЬСЯ, а мали б показуватись буквально
</script>
`,
        },
      ],
      solutionFiles: [
        {
          id: "js-update-text-solution",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<div id="comments"></div>

<script>
  function showComment(userComment) {
    const box = document.querySelector("#comments");
    const p = document.createElement("p");
    p.textContent = userComment;
    box.appendChild(p);
  }

  showComment("<b>Небезпечний</b> текст із розміткою");
  // тепер теги показуються буквально, як текст, а не рендеряться
</script>
`,
          readOnly: true,
        },
      ],
      hints: ["innerHTML рендерить теги у вставленому рядку як реальні елементи — небезпечно для недовіреного тексту.", "textContent показує будь-який текст буквально, екрануючи символи < і >."],
      expectedOutput: "Параграф з буквальним текстом \"<b>Небезпечний</b> текст із розміткою\", теги НЕ відрендерені",
    },
    microExercises: [
      { id: "js-update-text-textcontent-predict", kind: "predict", prompt: "Що покаже сторінка після цього коду?", code: `const box = document.querySelector("#box");\nbox.textContent = "5 < 10";`, solution: "Буквальний текст \"5 < 10\" — textContent показує < як звичайний символ тексту, а не намагається інтерпретувати щось як початок тегу." },
      { id: "js-update-text-xss-find-bug", kind: "find-the-bug", prompt: "У чому проблема цього коду?", code: `function displayUsername(name) {\n  document.querySelector("#greeting").innerHTML = "Привіт, " + name + "!";\n}\ndisplayUsername(userInputFromForm);`, solution: "Якщо userInputFromForm містить HTML-теги зі шкідливими атрибутами (наприклад, <img onerror=...>), innerHTML розпарсить і виконає їх — це XSS-вразливість. Потрібно використати textContent замість innerHTML для вставки імені користувача, яке за визначенням є недовіреним вхідними даними." },
      { id: "js-update-text-dataset-choice", kind: "choice", prompt: "Як прочитати значення атрибута data-item-id через dataset?", options: ["element.dataset[\"data-item-id\"]", "element.dataset.itemId", "element.dataset.item-id", "element[\"data-item-id\"]"], correctAnswer: "element.dataset.itemId", solution: "dataset автоматично конвертує kebab-case атрибут data-item-id у camelCase властивість itemId — доступ через element.dataset.itemId." },
      { id: "js-update-text-dataset-explain", kind: "explain", prompt: "Поясни, чому element.dataset.count === 5 завжди буде false, навіть якщо в HTML написано data-count=\"5\".", solution: "Усі значення dataset ЗАВЖДИ мають тип рядок (string), незалежно від того, як \"числово\" виглядає значення в HTML. element.dataset.count поверне рядок \"5\", а не число 5 — порівняння рядка \"5\" з числом 5 через === (строге порівняння без приведення типів) завжди дає false. Потрібне явне перетворення: Number(element.dataset.count) === 5." },
      { id: "js-update-text-safe-rewrite", kind: "rewrite", prompt: "Перепиши функцію так, щоб вона безпечно показувала повідомлення про помилку від сервера (текст, не HTML).", code: `function showError(message) {\n  document.querySelector("#error").innerHTML = message;\n}`, solution: `function showError(message) {\n  document.querySelector("#error").textContent = message;\n}\n// textContent безпечно показує повідомлення від сервера як звичайний текст, без ризику виконання вкладеного HTML/JS` },
    ],
    quiz: {
      id: "js-update-text-attrs-quiz",
      title: "Швидка перевірка: Оновлення тексту й атрибутів",
      questions: [
        {
          id: "js-update-text-q1",
          type: "code",
          question: "Що виведе цей код?",
          codeSnippet: `const box = document.querySelector("#box");\nbox.textContent = "5 < 10";\nconsole.log(box.innerHTML);`,
          options: ["\"5 &lt; 10\"", "\"5 < 10\"", "TypeError", "undefined"],
          correctAnswer: "\"5 &lt; 10\"",
          explanation: "textContent екранує символи, схожі на HTML-теги — < перетворюється на &lt; при рендері, тому текст показується буквально.",
        },
        {
          id: "js-update-text-q2",
          type: "single",
          question: "Чому вставка тексту користувача через innerHTML вважається небезпечною?",
          options: [
            "innerHTML працює повільніше за textContent",
            "Якщо текст містить теги зі спеціальними обробниками (onerror тощо), браузер розпарсить і виконає їх — це XSS",
            "innerHTML взагалі не підтримується у сучасних браузерах",
            "innerHTML автоматично видаляє весь вміст контейнера",
          ],
          correctAnswer: "Якщо текст містить теги зі спеціальними обробниками (onerror тощо), браузер розпарсить і виконає їх — це XSS",
          explanation: "innerHTML рендерить вставлені теги як реальні елементи. Недовірений текст з обробниками подій може виконати довільний JavaScript.",
        },
        {
          id: "js-update-text-q3",
          type: "single",
          question: "Як прочитати значення атрибута data-item-id через dataset?",
          options: ["element.dataset[\"data-item-id\"]", "element.dataset.itemId", "element.dataset.item-id", "element[\"data-item-id\"]"],
          correctAnswer: "element.dataset.itemId",
          explanation: "dataset автоматично конвертує kebab-case атрибут data-item-id у camelCase властивість itemId.",
        },
        {
          id: "js-update-text-q4",
          type: "true-false",
          question: "element.dataset.count === 5 буде true, якщо в HTML написано data-count=\"5\".",
          options: ["Так", "Ні"],
          correctAnswer: false,
          explanation: "Усі значення dataset завжди рядки. dataset.count поверне рядок \"5\", а не число 5 — строге порівняння з числом 5 дасть false.",
        },
        {
          id: "js-update-text-q5",
          type: "single",
          question: "Яка різниця між removeAttribute і присвоєнням порожнього значення атрибуту?",
          options: [
            "Різниці немає",
            "removeAttribute повністю видаляє атрибут з елемента; порожнє значення лише очищає його вміст, атрибут лишається",
            "removeAttribute працює лише для класів",
            "Присвоєння порожнього значення видаляє атрибут повністю, а removeAttribute — ні",
          ],
          correctAnswer: "removeAttribute повністю видаляє атрибут з елемента; порожнє значення лише очищає його вміст, атрибут лишається",
          explanation: "removeAttribute прибирає атрибут з розмітки цілком — він більше не зʼявиться в HTML взагалі.",
        },
      ],
    },
  },

  "Оновлення класів і стилів": {
    whatIsIt: "element.classList — обʼєкт з методами add(cls)/remove(cls)/toggle(cls)/contains(cls) для керування ОКРЕМИМИ CSS-класами елемента, не торкаючись інших уже встановлених класів. element.className — рядкова властивість, що замінює/повертає ВЕСЬ атрибут class одразу — присвоєння className = \"нове\" ПОВНІСТЮ перезаписує всі попередні класи. element.style.property встановлює ІНЛАЙН-стиль (одну CSS-властивість напряму); element.style.cssText замінює ВЕСЬ інлайн-стиль одразу.",
    whyUseIt: "Перемикання стану інтерфейсу (активна вкладка, розгорнуте меню, підсвічена картка) майже завжди реалізується через додавання/видалення CSS-класу, а не написання стилів напряму в JS — так стилі лишаються в CSS-файлі, а JS лише перемикає \"стан\" через клас. Неправильний вибір між classList і className — джерело реального бага: випадкове видалення ВСІХ інших класів елемента.",
    whenToUse: ["Потрібно додати/видалити/перемкнути ОДИН конкретний клас, зберігши всі інші — classList.add/remove/toggle.", "Потрібно перевірити, чи має елемент певний клас — classList.contains.", "Потрібен разовий інлайн-стиль для властивості, якої немає сенсу виносити в CSS-клас (наприклад, динамічна позиція чи прогрес) — element.style.property."],
    whenNotToUse: ["Не використовуй className = \"новий-клас\" для додавання одного класу — це ЗНИЩУЄ всі попередні класи елемента.", "Не пиши десятки стилів напряму через element.style в JS — простіше й чистіше перемкнути CSS-клас, що вже містить усі потрібні стилі.", "Не використовуй classList.toggle без потреби перевіряти поточний стан окремо — toggle сам визначає, додати чи прибрати клас."],
    comparisonTable: {
      headers: ["Дія", "classList (безпечно)", "className (ризиковано)"],
      rows: [
        ["Додати клас", "classList.add(\"active\")", "className += \" active\" (з пробілом!) чи повний перезапис"],
        ["Прибрати клас", "classList.remove(\"active\")", "потрібен ручний split/filter/join рядка"],
        ["Перемкнути клас", "classList.toggle(\"active\")", "немає прямого еквівалента без ручної логіки"],
        ["Перевірити клас", "classList.contains(\"active\")", "className.includes(\"active\") — неточно для часткових збігів"],
      ],
    },
    codeWalkthroughs: [
      {
        before: "classList.add/remove/toggle — керування ОКРЕМИМ класом, інші класи не торкаються:",
        code: `<div id="card" class="card featured"></div>

<script>
  const card = document.querySelector("#card");

  card.classList.add("highlighted");
  console.log(card.className); // "card featured highlighted"

  card.classList.remove("featured");
  console.log(card.className); // "card highlighted"

  card.classList.toggle("highlighted"); // прибирає, бо вже був
  console.log(card.className); // "card"
</script>`,
        lineNotes: ["classList.add(\"highlighted\") додає лише цей клас, залишаючи card і featured недоторканими.", "classList.toggle перевіряє поточний стан САМ — якщо клас вже є, прибирає його; якщо немає, додає. Це замінює ручну if/else-логіку."],
      },
      {
        before: "Реальна пастка className = \"новий-клас\" — знищує ВСІ попередні класи:",
        code: `<div id="card" class="card featured shadow"></div>

<script>
  const card = document.querySelector("#card");
  card.className = "highlighted"; // БАГ: заміна, а не додавання!

  console.log(card.className); // "highlighted" — card, featured, shadow ЗНИКЛИ
</script>`,
        lineNotes: ["className = \"highlighted\" ПОВНІСТЮ перезаписує атрибут class елемента новим рядком — усі попередні класи (card, featured, shadow), потрібні для базового стилю картки, зникають.", "Якщо метою було саме ДОДАТИ клас highlighted до вже наявних, потрібен classList.add(\"highlighted\"), а не пряме присвоєння className."],
        after: "Ця помилка часто \"працює\" візуально в найпростіших тестах, якщо елемент мав лише один клас, і зʼявляється як реальний баг лише коли елемент починає мати кілька класів одночасно.",
      },
      {
        before: "element.style для встановлення разового інлайн-стилю — властивості в camelCase:",
        code: `const progressBar = document.querySelector("#progress");

progressBar.style.width = "75%";
progressBar.style.backgroundColor = "green"; // camelCase, не background-color!

console.log(progressBar.style.width); // "75%"`,
        lineNotes: ["CSS-властивості з дефісом (background-color) записуються в JS через camelCase (backgroundColor) — це стосується КОЖНОЇ багатослівної CSS-властивості.", "element.style.property встановлює ІНЛАЙН-стиль, що має найвищий пріоритет у каскаді (окрім !important) — переважить майже будь-яке правило з CSS-файлу."],
      },
      {
        before: "element.style.cssText — той самий ризик заміни ВСЬОГО, що й className, але для стилів:",
        code: `const progressBar = document.querySelector("#progress");
progressBar.style.width = "75%";
progressBar.style.border = "1px solid gray";

progressBar.style.cssText = "background-color: green;"; // БАГ: замінює ВЕСЬ інлайн-стиль

console.log(progressBar.style.width); // "" — width і border ЗНИКЛИ, лишився лише background-color`,
        lineNotes: ["style.cssText = \"...\" ПОВНІСТЮ перезаписує рядок style елемента одним рядком CSS-синтаксису — так само, як className = \"...\" перезаписує весь атрибут class.", "width: 75% і border: 1px solid gray, встановлені окремими рядками раніше, зникають, бо cssText не додає, а ЗАМІНЮЄ.", "Якщо потрібно встановити кілька властивостей одразу, безпечніше присвоювати їх окремо (style.width = ..., style.border = ...) чи через Object.assign(el.style, { width: ..., border: ... })."],
        after: "cssText корисний головним чином для ОДНОРАЗОВОГО встановлення стилю \"з нуля\" — наприклад, одразу після createElement, коли попереднього інлайн-стилю ще немає що затирати.",
      },
      {
        before: "classList.contains для умовної логіки замість перевірки className напряму:",
        code: `const menu = document.querySelector("#menu");

function toggleMenu() {
  const isOpen = menu.classList.contains("open");
  if (isOpen) {
    menu.classList.remove("open");
  } else {
    menu.classList.add("open");
  }
}
// Це той самий результат, що й одним рядком:
function toggleMenuShort() {
  menu.classList.toggle("open");
}`,
        lineNotes: ["classList.contains(\"open\") надійно перевіряє наявність саме ЦЬОГО класу серед усіх класів елемента, незалежно від їхнього порядку чи кількості.", "toggleMenuShort() досягає того самого результату однією операцією classList.toggle — не потрібна ручна if/else-перевірка."],
      },
    ],
    commonMistakes: ["Використовувати className = \"...\" для додавання класу — це ЗНИЩУЄ всі попередні класи елемента, а не додає новий.", "Забувати camelCase для багатослівних CSS-властивостей в element.style (backgroundColor, а не background-color).", "Писати className.includes(\"active\") для перевірки класу — false positive, якщо є клас \"inactive\" (містить підрядок \"active\").", "Встановлювати десятки окремих стилів через element.style замість перемикання одного CSS-класу, що вже містить усі потрібні правила."],
    dontDoThis: { code: `function markAsFeatured(card) {\n  card.className = "featured"; // БАГ: знищує всі попередні класи картки\n}\n\nconst card = document.querySelector(".card"); // card = "card product-card"\nmarkAsFeatured(card);\nconsole.log(card.className); // "featured" — базові стилі card і product-card ЗНИКЛИ`, explanation: "card.className = \"featured\" ПОВНІСТЮ перезаписує атрибут class елемента — усі базові класи, потрібні для правильного відображення картки (card, product-card), зникають, залишається лише featured. Найімовірніше, картка тепер виглядає повністю зламаною, бо втратила базові CSS-правила. Правильно: card.classList.add(\"featured\") — додає новий клас, зберігаючи всі існуючі." },
    bestPractices: ["Використовуй classList.add/remove/toggle за умовчанням для керування класами — className лише для читання ПОВНОГО списку класів чи разового повного перезапису (рідко потрібно).", "Тримай стилі в CSS-класах, а JS лише перемикає стан через classList — не пиши десятки element.style в JS.", "Памʼятай про camelCase для багатослівних CSS-властивостей в element.style.", "Використовуй classList.contains для точної перевірки наявності класу, а не className.includes."],
    remember: ["classList.add/remove/toggle керують ОКРЕМИМ класом, не торкаючись інших — це безпечний спосіб за умовчанням.", "className = \"...\" ПОВНІСТЮ перезаписує весь атрибут class — знищує всі попередні класи, якщо не включити їх явно в новий рядок.", "element.style.property використовує camelCase для багатослівних CSS-властивостей (backgroundColor, а не background-color).", "classList.contains точно перевіряє наявність класу; className.includes може дати false positive для класів з подібними підрядками."],
    interviewQuestions: [
      { question: "Чому card.className = \"active\" вважається ризикованим способом додати клас?", answer: "Присвоєння className повністю ЗАМІНЮЄ увесь атрибут class елемента новим рядком — якщо в елемента вже були інші класи (наприклад, базові стилі картки), вони всі зникають, залишається лише \"active\". Це не додавання, а повна заміна." },
      { question: "Як безпечно додати клас до елемента, зберігши всі його існуючі класи?", answer: "element.classList.add(\"новий-клас\") — цей метод додає ВКАЗАНИЙ клас до списку існуючих класів елемента, не торкаючись і не видаляючи жодного з інших уже встановлених класів." },
      { question: "Що робить classList.toggle(\"клас\")?", answer: "Перевіряє, чи елемент вже має цей клас: якщо ТАК — видаляє його; якщо НІ — додає. Це замінює ручну if/else-перевірку через classList.contains + add/remove одним викликом." },
      { question: "Чому element.style.backgroundColor, а не element.style.background-color?", answer: "У JavaScript CSS-властивості з дефісом записуються через camelCase-нотацію властивостей обʼєкта — дефіс у JS-ідентифікаторах інтерпретується як оператор віднімання, тому background-color як буквальний ідентифікатор синтаксично неможливий. Кожна багатослівна CSS-властивість (font-size, border-radius тощо) в element.style пишеться так само — camelCase (fontSize, borderRadius)." },
    ],
    summary: "classList.add/remove/toggle керують ОКРЕМИМ класом безпечно, не торкаючись інших; className = \"...\" повністю перезаписує весь атрибут class, знищуючи попередні класи. element.style.property встановлює інлайн-стиль через camelCase-назву CSS-властивості. classList.contains точно перевіряє наявність класу.",
    proTip: "Якщо після якогось оновлення інтерфейсу елемент раптом \"втратив\" усі базові стилі — перевір, чи десь у коді немає прямого className = \"...\" замість classList.add(...).",
    nextLessonNote: "Далі — основи продуктивності DOM: чому масові оновлення DOM варто групувати, і як уникнути зайвих перерахунків макета сторінки.",
    interactiveDemo: "update-classes-styles-demo",
    practiceTask: {
      title: "Виправ втрату базових класів картки через className",
      description: "Функція markAsFeatured замінює весь className картки, знищуючи її базові класи. Перепиши через classList.add, щоб додати клас 'featured' без втрати існуючих.",
      checklist: ["markAsFeatured додає клас 'featured' до картки.", "Усі попередні класи картки (наприклад, 'card', 'product-card') залишаються на місці.", "Використано classList.add замість прямого присвоєння className."],
      starterFiles: [
        {
          id: "js-update-classes-start",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<div id="card" class="card product-card"></div>
<p id="output"></p>

<script>
  function markAsFeatured(card) {
    card.className = "featured"; // БАГ: знищує всі попередні класи
  }

  const card = document.querySelector("#card");
  markAsFeatured(card);
  document.querySelector("#output").textContent = card.className;
  // зараз показує лише "featured"
</script>
`,
        },
      ],
      solutionFiles: [
        {
          id: "js-update-classes-solution",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<div id="card" class="card product-card"></div>
<p id="output"></p>

<script>
  function markAsFeatured(card) {
    card.classList.add("featured");
  }

  const card = document.querySelector("#card");
  markAsFeatured(card);
  document.querySelector("#output").textContent = card.className;
  // тепер "card product-card featured"
</script>
`,
          readOnly: true,
        },
      ],
      hints: ["className = \"featured\" замінює ВЕСЬ атрибут class, а не додає до нього.", "classList.add(\"featured\") додає лише цей клас, зберігаючи всі існуючі."],
      expectedOutput: "\"card product-card featured\"",
    },
    microExercises: [
      { id: "js-update-classes-add-predict", kind: "predict", prompt: "Що виведе цей код?", code: `const el = document.createElement("div");\nel.className = "card";\nel.classList.add("active");\nconsole.log(el.className);`, solution: "\"card active\" — classList.add додає новий клас до вже наявних, не замінюючи їх, на відміну від прямого присвоєння className." },
      { id: "js-update-classes-overwrite-find-bug", kind: "find-the-bug", prompt: "У чому проблема цього коду?", code: `function selectTab(tab) {\n  tab.className = "tab active";\n}`, solution: "Якщо tab мав ще якісь класи (наприклад, базові стилі вкладки з інших джерел чи додані пізніше динамічно), вони всі зникнуть, бо className = \"...\" повністю перезаписує весь атрибут class. Безпечніше: tab.classList.add(\"active\") (якщо base-клас 'tab' завжди присутній у розмітці і не потрібно його \"встановлювати\" повторно)." },
      { id: "js-update-classes-camelcase-choice", kind: "choice", prompt: "Як правильно встановити CSS-властивість font-size через element.style?", options: ["element.style[\"font-size\"] = \"16px\"", "element.style.fontSize = \"16px\"", "element.style.font-size = \"16px\"", "element.fontSize = \"16px\""], correctAnswer: "element.style.fontSize = \"16px\"", solution: "Багатослівні CSS-властивості записуються в element.style через camelCase — font-size стає fontSize. element.style.font-size синтаксично невірний (дефіс інтерпретується як віднімання)." },
      { id: "js-update-classes-toggle-explain", kind: "explain", prompt: "Поясни, чому classList.toggle(\"open\") замінює потребу в ручній if/else-перевірці.", solution: "classList.toggle САМ перевіряє поточну наявність вказаного класу на елементі: якщо клас вже присутній — видаляє його; якщо відсутній — додає. Це та сама логіка, яку інакше довелось би писати вручну через classList.contains + умовний add/remove, але вбудована в один метод і виконана атомарно за один виклик." },
      { id: "js-update-classes-safe-rewrite", kind: "rewrite", prompt: "Перепиши функцію, щоб вона перемикала клас 'expanded' на елементі, не знищуючи інші його класи.", code: `function toggleExpand(el) {\n  el.className = el.className.includes("expanded") ? "collapsed" : "expanded";\n}`, solution: `function toggleExpand(el) {\n  el.classList.toggle("expanded");\n}\n// classList.toggle безпечно перемикає лише цей клас, зберігаючи всі інші наявні класи елемента` },
    ],
    quiz: {
      id: "js-update-classes-styles-quiz",
      title: "Швидка перевірка: Оновлення класів і стилів",
      questions: [
        {
          id: "js-update-classes-q1",
          type: "code",
          question: "Що виведе цей код?",
          codeSnippet: `const el = document.createElement("div");\nel.className = "card";\nel.classList.add("active");\nconsole.log(el.className);`,
          options: ["\"card active\"", "\"active\"", "\"card\"", "TypeError"],
          correctAnswer: "\"card active\"",
          explanation: "classList.add додає новий клас до вже наявних, не замінюючи їх — на відміну від прямого присвоєння className.",
        },
        {
          id: "js-update-classes-q2",
          type: "code",
          question: "Що виведе цей код?",
          codeSnippet: `const card = document.querySelector("#card"); // class="card featured"\ncard.className = "highlighted";\nconsole.log(card.className);`,
          options: ["\"card featured highlighted\"", "\"highlighted\"", "\"card featured\"", "TypeError"],
          correctAnswer: "\"highlighted\"",
          explanation: "Присвоєння className повністю перезаписує атрибут class — попередні класи card і featured зникають.",
        },
        {
          id: "js-update-classes-q3",
          type: "single",
          question: "Як правильно встановити CSS-властивість font-size через element.style?",
          options: ["element.style[\"font-size\"] = \"16px\"", "element.style.fontSize = \"16px\"", "element.style.font-size = \"16px\"", "element.fontSize = \"16px\""],
          correctAnswer: "element.style.fontSize = \"16px\"",
          explanation: "Багатослівні CSS-властивості записуються через camelCase — font-size стає fontSize. Дефіс синтаксично невірний як частина ідентифікатора.",
        },
        {
          id: "js-update-classes-q4",
          type: "true-false",
          question: "classList.toggle(\"open\") сам перевіряє, чи клас вже присутній, і додає чи прибирає його відповідно.",
          options: ["Так", "Ні"],
          correctAnswer: true,
          explanation: "toggle замінює ручну if/else-логіку з classList.contains + add/remove одним викликом.",
        },
        {
          id: "js-update-classes-q5",
          type: "single",
          question: "Чому className.includes(\"active\") менш надійний за classList.contains(\"active\")?",
          options: [
            "includes працює лише з масивами",
            "includes дасть false positive для класу типу \"inactive\", що містить підрядок \"active\"",
            "className.includes взагалі не існує",
            "classList.contains повільніший",
          ],
          correctAnswer: "includes дасть false positive для класу типу \"inactive\", що містить підрядок \"active\"",
          explanation: "className.includes перевіряє підрядок у всьому рядку класів, тому \"inactive\" помилково пройде перевірку на \"active\". classList.contains перевіряє точний збіг окремого класу.",
        },
      ],
    },
  },
  "Основи продуктивності DOM": {
    whatIsIt: "Кожна ЗМІНА DOM (стилю, атрибуту, вмісту) може позначити макет сторінки як \"брудний\"; кожне ЧИТАННЯ геометрії (offsetWidth, offsetHeight, getBoundingClientRect()) змушує браузер негайно ПЕРЕРАХУВАТИ макет, щоб повернути актуальне значення — це називається forced synchronous layout (примусовий синхронний layout). Якщо в циклі чергуються запис і читання геометрії (запис → читання → запис → читання...), браузер перераховує макет на КОЖНІЙ ітерації — цей шаблон називають layout thrashing і він реально вимірювано повільніший за групування спочатку всіх читань, потім усіх записів.",
    whyUseIt: "На малих прикладах різниця непомітна, але на реальних сторінках з десятками/сотнями елементів (таблиці, списки, dashboard-віджети) layout thrashing може перетворити швидку операцію на відчутну затримку інтерфейсу. Розуміння того, ЩО саме змушує браузер перерахувати макет, дозволяє писати код, який робить це один раз, а не на кожній ітерації циклу.",
    whenToUse: ["Потрібно прочитати геометрію (ширину/висоту/позицію) КІЛЬКОХ елементів і потім записати нові стилі, залежні від цих вимірів.", "Робота з великою кількістю DOM-елементів у циклі, де є і читання, і запис властивостей.", "Оптимізація вже виявленої, реально відчутної затримки інтерфейсу — profiling ПЕРЕД оптимізацією, а не навмання."],
    whenNotToUse: ["Не оптимізуй передчасно код, що працює з 2-3 елементами і не показує реальної проблеми з продуктивністю.", "Не переписуй прочитний, простий код на складний \"оптимізований\" варіант без вимірювання реальної різниці в конкретному випадку.", "Не намагайся уникнути ВСІХ читань геометрії — деякі read-then-write операції неминучі; мета — уникнути ЧЕРГУВАННЯ читання й запису в циклі, а не читання взагалі."],
    comparisonTable: {
      headers: ["Шаблон", "Кількість перерахунків макета для N елементів"],
      rows: [
        ["читання→запис→читання→запис у циклі (thrashing)", "приблизно N перерахунків"],
        ["усі читання спочатку, потім усі записи (batching)", "1 перерахунок"],
      ],
    },
    codeWalkthroughs: [
      {
        before: "Layout thrashing — читання геометрії ПІСЛЯ кожного запису в циклі:",
        code: `const boxes = document.querySelectorAll(".box");

boxes.forEach((box) => {
  box.style.width = "100px"; // ЗАПИС — позначає макет "брудним"
  console.log(box.offsetHeight); // ЧИТАННЯ — змушує ПЕРЕРАХУВАТИ макет НЕГАЙНО
});
// Для 100 елементів: 100 примусових перерахунків макета`,
        lineNotes: ["box.style.width = ... позначає макет сторінки як застарілий, але браузер НЕ перераховує його негайно — робить це \"ліниво\", коли реально потрібно.", "console.log(box.offsetHeight) вимагає АКТУАЛЬНОГО значення просто зараз — тому браузер змушений негайно перерахувати макет для ВСІЄЇ сторінки (чи принаймні залученої частини), перш ніж повернути offsetHeight."],
      },
      {
        before: "Групування — усі читання СПОЧАТКУ, потім усі записи:",
        code: `const boxes = document.querySelectorAll(".box");

// Крок 1: усі читання (з застарілого, але вже узгодженого макета)
const heights = Array.from(boxes).map((box) => box.offsetHeight);

// Крок 2: усі записи (жодного читання геометрії між ними)
boxes.forEach((box, i) => {
  box.style.width = heights[i] * 2 + "px";
});
// Для 100 елементів: 1 перерахунок макета для читань, 0 — для записів`,
        lineNotes: [".map((box) => box.offsetHeight) виконує ВСІ читання одним проходом — перший виклик офсетHeight викликає ОДИН перерахунок, а решта читань у цьому ж проході вже використовують той самий, щойно перерахований, актуальний макет.", "Другий forEach лише ЗАПИСУЄ стилі, без жодного читання геометрії між записами — браузер відкладає реальний перерахунок макета до моменту, коли він РЕАЛЬНО потрібен (наступний кадр рендеру чи наступне читання)."],
      },
      {
        before: "Реальне вимірювання різниці через performance.now() на 200 DOM-елементах:",
        code: `const items = document.querySelectorAll(".item"); // 200 елементів

const start1 = performance.now();
items.forEach((item) => {
  item.style.width = "50px";
  item.offsetWidth; // читання ПІСЛЯ кожного запису — thrashing
});
const thrashingTime = performance.now() - start1;

const start2 = performance.now();
const widths = Array.from(items).map((item) => item.offsetWidth); // усі читання разом
items.forEach((item) => { item.style.width = "60px"; }); // усі записи разом
const batchedTime = performance.now() - start2;

console.log(thrashingTime, batchedTime); // thrashingTime зазвичай ПОМІТНО більший`,
        lineNotes: ["Обидва блоки коду роблять однакову кількість читань/записів — різниця виключно в ПОРЯДКУ їх чергування.", "На великій кількості елементів (сотні) thrashingTime зазвичай реально вимірювано більший за batchedTime — це не теоретична, а практично вимірювана різниця в реальному браузері."],
        after: "На малій кількості елементів (одиниці-десятки) різниця може бути непомітною — layout thrashing стає реальною проблемою здебільшого на масштабі.",
      },
      {
        before: "requestAnimationFrame для групування ВІЗУАЛЬНИХ оновлень до наступного кадру рендеру:",
        code: `function updateProgress(percent) {
  requestAnimationFrame(() => {
    const bar = document.querySelector("#progress-bar");
    bar.style.width = percent + "%"; // виконується ТОЧНО перед наступним рендер-кадром
  });
}`,
        lineNotes: ["requestAnimationFrame планує виконання callback-у ПРАВО ПЕРЕД тим, як браузер малює наступний кадр — це синхронізує оновлення стилів із природним ритмом рендеру, а не виконує їх довільно посеред виконання JS.", "Для частих оновлень (анімація прогресу, скрол-ефекти) це надійніший спосіб уникнути зайвих проміжних перерахунків, ніж прямий виклик стилю поза кадром рендеру."],
      },
    ],
    commonMistakes: ["Читати offsetWidth/offsetHeight/getBoundingClientRect() відразу ПІСЛЯ запису стилю того самого (чи іншого) елемента в циклі — класичний layout thrashing.", "Оптимізувати код без реального вимірювання (performance.now(), DevTools Performance) — передчасна оптимізація без даних.", "Забувати, що ЧИТАННЯ геометрії — це те, що змушує перерахунок, а не сам ЗАПИС стилю — запис лише позначає макет застарілим.", "Ігнорувати реальний масштаб задачі — оптимізувати код для 3 елементів, коли реальна проблема виникає лише на сотнях."],
    dontDoThis: { code: `function resizeAllCards(cards, scale) {\n  cards.forEach((card) => {\n    const currentWidth = card.offsetWidth; // ЧИТАННЯ\n    card.style.width = currentWidth * scale + "px"; // ЗАПИС\n    // читання geometry ЗНОВУ на наступній ітерації ПІСЛЯ щойно зробленого запису\n  });\n}`, explanation: "На кожній ітерації циклу спочатку читається card.offsetWidth (вимагає актуального макета — примусовий перерахунок, якщо попередня ітерація щось записала), потім пишеться новий style.width. Наступна ітерація знову читає offsetWidth ІНШОГО елемента, але через те, що попередній запис позначив макет застарілим, браузер змушений перераховувати макет знову і знову — по одному перерахунку на кожен елемент замість одного разу для всіх." },
    bestPractices: ["Групуй усі читання геометрії (offsetWidth, getBoundingClientRect тощо) в один прохід ПЕРЕД усіма записами стилів.", "Використовуй Array.from(...).map(...) для збору всіх потрібних вимірів заздалегідь, перш ніж щось змінювати.", "Для анімацій та частих візуальних оновлень розглядай requestAnimationFrame замість прямих викликів стилю в довільний момент.", "Вимірюй реальну різницю через performance.now() чи DevTools Performance ПЕРЕД тим, як вважати щось \"оптимізацією\" — не оптимізуй навмання."],
    remember: ["Запис стилю позначає макет застарілим \"ліниво\"; ЧИТАННЯ геометрії (offsetWidth тощо) змушує браузер НЕГАЙНО перерахувати макет.", "Чергування читання й запису геометрії в циклі (layout thrashing) — приблизно N перерахунків для N елементів замість 1.", "Групування: спочатку ВСІ читання, потім ВСІ записи — зводить кількість перерахунків до 1.", "Оптимізуй лише після реального вимірювання — на малих обсягах різниця часто непомітна."],
    interviewQuestions: [
      { question: "Що таке layout thrashing?", answer: "Шаблон коду, де читання геометрії елемента (offsetWidth, getBoundingClientRect тощо) чергується із записом стилів у циклі — кожне читання після попереднього запису змушує браузер НЕГАЙНО перерахувати макет сторінки, щоб повернути актуальне значення. Для N елементів це дає приблизно N окремих перерахунків замість одного." },
      { question: "Чому саме ЧИТАННЯ геометрії, а не запис стилю, викликає перерахунок макета?", answer: "Запис стилю (наприклад, style.width = ...) лише позначає внутрішній стан макета браузера як \"застарілий\" — сам перерахунок браузер відкладає до моменту, коли актуальне значення РЕАЛЬНО потрібне. Читання властивості, залежної від макета (offsetWidth тощо), вимагає точного актуального значення прямо зараз, тому браузер змушений негайно виконати відкладений перерахунок." },
      { question: "Як зменшити кількість примусових перерахунків макета при роботі з багатьма елементами?", answer: "Групувати операції: спочатку виконати ВСІ читання геометрії (наприклад, зібрати всі потрібні значення в масив через .map()), а потім, окремим проходом, виконати ВСІ записи стилів — без жодного читання геометрії між записами. Це зводить кількість перерахунків до одного замість одного на кожен елемент." },
      { question: "Коли варто застосовувати requestAnimationFrame для оновлення стилів?", answer: "Для частих чи анімованих візуальних оновлень (прогрес-бар, ефекти при скролі), коли важливо синхронізувати зміну стилю з природним циклом рендеру браузера, а не виконувати її в довільний момент виконання JS-коду — це допомагає уникнути зайвих проміжних перерахунків і зробити анімацію плавнішою." },
    ],
    summary: "Запис стилю позначає макет застарілим лінивo; читання геометрії (offsetWidth тощо) змушує НЕГАЙНИЙ перерахунок. Чергування читання й запису в циклі (layout thrashing) дає N перерахунків для N елементів; групування всіх читань, потім усіх записів — зводить це до 1. Оптимізуй лише після реального вимірювання.",
    proTip: "Якщо профайлер браузера показує багато дрібних \"Layout\" записів підряд у циклі — це майже завжди layout thrashing від чергування читання й запису геометрії; перевір, чи можна згрупувати операції.",
    nextLessonNote: "Це завершує модуль \"DOM\" — далі делегування подій: як обробляти клики на десятках дочірніх елементів через ОДИН обробник на батьківському елементі.",
    interactiveDemo: "dom-performance-demo",
    practiceTask: {
      title: "Виправ layout thrashing при зміні розміру карток",
      description: "Функція resizeAllCards читає offsetWidth і одразу пише новий style.width на кожній ітерації циклу, викликаючи примусовий перерахунок макета щоразу. Згрупуй читання й записи окремо.",
      checklist: ["Усі читання offsetWidth виконуються ОДНИМ проходом перед будь-якими записами.", "Усі записи style.width виконуються ОКРЕМИМ проходом, без читань geometry між ними.", "Результат (нова ширина кожної картки) залишається таким самим, як і в оригінальній версії."],
      starterFiles: [
        {
          id: "js-dom-performance-start",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<div class="card" style="width: 100px;">A</div>
<div class="card" style="width: 150px;">B</div>
<p id="output"></p>

<script>
  function resizeAllCards(cards, scale) {
    cards.forEach((card) => {
      const currentWidth = card.offsetWidth; // БАГ: читання і запис чергуються
      card.style.width = currentWidth * scale + "px";
    });
  }

  const cards = document.querySelectorAll(".card");
  resizeAllCards(cards, 2);
  document.querySelector("#output").textContent =
    Array.from(cards).map((c) => c.style.width).join(", ");
</script>
`,
        },
      ],
      solutionFiles: [
        {
          id: "js-dom-performance-solution",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<div class="card" style="width: 100px;">A</div>
<div class="card" style="width: 150px;">B</div>
<p id="output"></p>

<script>
  function resizeAllCards(cards, scale) {
    const widths = Array.from(cards).map((card) => card.offsetWidth); // усі читання
    cards.forEach((card, i) => {
      card.style.width = widths[i] * scale + "px"; // усі записи
    });
  }

  const cards = document.querySelectorAll(".card");
  resizeAllCards(cards, 2);
  document.querySelector("#output").textContent =
    Array.from(cards).map((c) => c.style.width).join(", ");
</script>
`,
          readOnly: true,
        },
      ],
      hints: ["Збери всі значення offsetWidth в масив ПЕРЕД тим, як щось записувати.", "Потім окремим циклом запиши нові значення style.width, використовуючи зібраний масив."],
      expectedOutput: "\"200px, 300px\"",
    },
    microExercises: [
      { id: "js-dom-perf-read-predict", kind: "predict", prompt: "Скільки разів браузер ПРИМУСОВО перерахує макет у цьому коді для 3 елементів?", code: `boxes.forEach((box) => {\n  box.style.height = "50px";\n  console.log(box.offsetWidth);\n});`, solution: "Приблизно 3 рази — кожне читання box.offsetWidth йде ПІСЛЯ запису style.height на попередньому елементі, тому браузер змушений перераховувати макет на кожній ітерації окремо (layout thrashing)." },
      { id: "js-dom-perf-thrash-find-bug", kind: "find-the-bug", prompt: "У чому проблема цього коду з точки зору продуктивності?", code: `items.forEach((item) => {\n  const width = item.getBoundingClientRect().width;\n  item.style.left = width + 10 + "px";\n});`, solution: "getBoundingClientRect().width — читання геометрії, а style.left — запис. Вони чергуються на кожній ітерації циклу: читання ПІСЛЯ запису попереднього елемента змушує примусовий перерахунок макета щоразу. Для великої кількості items це реально вимірювано повільніше, ніж згрупувати всі читання, а потім усі записи окремо." },
      { id: "js-dom-perf-cause-choice", kind: "choice", prompt: "Що САМЕ змушує браузер негайно перерахувати макет сторінки?", options: ["Запис нового значення в style", "Читання властивості, залежної від макета (offsetWidth тощо)", "Виклик querySelector", "Додавання класу через classList"], correctAnswer: "Читання властивості, залежної від макета (offsetWidth тощо)", solution: "Запис стилю лише позначає макет застарілим — реальний перерахунок браузер відкладає. Саме ЧИТАННЯ властивості, що вимагає актуального макета (offsetWidth, getBoundingClientRect тощо), змушує браузер негайно виконати цей відкладений перерахунок, щоб повернути правильне значення." },
      { id: "js-dom-perf-batch-explain", kind: "explain", prompt: "Поясни, чому групування всіх читань ПЕРЕД усіма записами зменшує кількість перерахунків макета з N до 1.", solution: "Коли всі читання виконуються одним проходом ПОСПІЛЬ, лише ПЕРШЕ читання змушує реальний перерахунок макета (бо на той момент немає застарілих незаписаних змін) — усі наступні читання в тому самому проході отримують значення з ВЖЕ актуального, щойно перерахованого макета, без повторних перерахунків. Аналогічно, усі наступні записи в окремому проході не потребують читання геометрії між собою, тому не викликають ЖОДНОГО додаткового перерахунку до наступного реального читання чи рендеру." },
      { id: "js-dom-perf-rewrite", kind: "rewrite", prompt: "Перепиши функцію, щоб уникнути layout thrashing при копіюванні висоти одного набору елементів на інший.", code: `function matchHeights(sourceEls, targetEls) {\n  sourceEls.forEach((src, i) => {\n    targetEls[i].style.height = src.offsetHeight + "px";\n  });\n}`, solution: `function matchHeights(sourceEls, targetEls) {\n  const heights = sourceEls.map((src) => src.offsetHeight); // усі читання спочатку\n  targetEls.forEach((target, i) => {\n    target.style.height = heights[i] + "px"; // усі записи окремо\n  });\n}\n// читання й запис більше не чергуються на кожній ітерації` },
    ],
    quiz: {
      id: "js-dom-performance-quiz",
      title: "Швидка перевірка: Основи продуктивності DOM",
      questions: [
        {
          id: "js-dom-perf-q1",
          type: "single",
          question: "Що таке layout thrashing?",
          options: [
            "Помилка синтаксису в CSS",
            "Чергування читання геометрії й запису стилів у циклі, що змушує браузер перераховувати макет на кожній ітерації",
            "Видалення всіх стилів елемента",
            "Автоматичне очищення DOM браузером",
          ],
          correctAnswer: "Чергування читання геометрії й запису стилів у циклі, що змушує браузер перераховувати макет на кожній ітерації",
          explanation: "Для N елементів такий шаблон дає приблизно N окремих перерахунків макета замість одного.",
        },
        {
          id: "js-dom-perf-q2",
          type: "single",
          question: "Що САМЕ змушує браузер негайно перерахувати макет?",
          options: [
            "Запис нового значення в style",
            "Читання властивості, залежної від макета (offsetWidth тощо)",
            "Виклик querySelector",
            "Додавання класу через classList",
          ],
          correctAnswer: "Читання властивості, залежної від макета (offsetWidth тощо)",
          explanation: "Запис стилю лише позначає макет застарілим — реальний перерахунок відкладається до моменту, коли потрібне актуальне геометричне значення.",
        },
        {
          id: "js-dom-perf-q3",
          type: "code",
          question: "Скільки разів браузер примусово перерахує макет у цьому коді для 3 елементів?",
          codeSnippet: `boxes.forEach((box) => {\n  box.style.height = "50px";\n  console.log(box.offsetWidth);\n});`,
          options: ["0 разів", "1 раз", "Приблизно 3 рази", "Неможливо визначити"],
          correctAnswer: "Приблизно 3 рази",
          explanation: "Кожне читання offsetWidth йде після запису на попередній ітерації, тому браузер перераховує макет на кожному кроці окремо.",
        },
        {
          id: "js-dom-perf-q4",
          type: "true-false",
          question: "Групування всіх читань геометрії перед усіма записами зводить кількість перерахунків макета до 1.",
          options: ["Так", "Ні"],
          correctAnswer: true,
          explanation: "Лише перше читання в проході змушує реальний перерахунок; решта читань беруть значення з уже актуального макета.",
        },
        {
          id: "js-dom-perf-q5",
          type: "single",
          question: "Коли варто оптимізувати код, схильний до layout thrashing?",
          options: [
            "Завжди, незалежно від кількості елементів",
            "Лише після реального вимірювання й виявлення відчутної проблеми з продуктивністю",
            "Ніколи, це передчасна оптимізація",
            "Тільки в мобільних браузерах",
          ],
          correctAnswer: "Лише після реального вимірювання й виявлення відчутної проблеми з продуктивністю",
          explanation: "На малих обсягах (одиниці-десятки елементів) різниця часто непомітна — оптимізація без вимірювання зайва.",
        },
      ],
    },
  },

  "Делегування подій": {
    whatIsIt: "Делегування подій — техніка, коли ОДИН обробник події прикріплюється до БАТЬКІВСЬКОГО елемента замість окремого обробника на кожній дитині. Це працює завдяки спливанню подій (event bubbling): подія, що сталась на дитині, \"спливає\" вгору по DOM-дереву через усіх батьків. У обробнику на батьку event.target вказує на КОНКРЕТНИЙ елемент, де подія реально сталась (не сам батько) — саме тому там перевіряють, чи event.target відповідає потрібному селектору (event.target.matches/closest).",
    whyUseIt: "Прикріплення окремого обробника до КОЖНОГО з сотень елементів списку витратне за памʼяттю й часом на встановлення. Головна ж практична проблема — динамічно ДОДАНІ елементи (через createElement/appendChild) НЕ мають обробника, якщо він прикріплювався індивідуально ПІСЛЯ початкового рендеру. Делегування вирішує обидві проблеми: один обробник на батьку автоматично \"покриває\" будь-яку дитину, включно з тими, що зʼявляться в майбутньому.",
    whenToUse: ["Список з великою (чи змінною) кількістю однотипних дочірніх елементів, що потребують однакової обробки кліку.", "Елементи додаються в DOM ДИНАМІЧНО після початкового рендеру, і кожен новий елемент має реагувати на ту саму подію без повторного прикріплення обробника.", "Оптимізація памʼяті/часу встановлення для дуже великих списків замість сотень окремих обробників."],
    whenNotToUse: ["Не використовуй делегування для унікальної, специфічної для КОНКРЕТНОГО одного елемента логіки — прямий обробник на ньому чіткіший.", "Не забувай, що деякі події (наприклад, focus/blur у старих браузерах без capture) не завжди спливають однаково — перевіряй конкретну подію.", "Не плутай event.target (де подія РЕАЛЬНО сталась) з event.currentTarget (елемент, на якому ВСТАНОВЛЕНО обробник) — для делегування зазвичай потрібен саме target."],
    comparisonTable: {
      headers: ["Підхід", "Обробник на новий елемент, додaний пізніше"],
      rows: [
        ["Обробник на КОЖНОМУ елементі", "відсутній — потрібно прикріпити вручну знову"],
        ["Делегування (один обробник на батьку)", "працює автоматично, без додаткового коду"],
      ],
    },
    codeWalkthroughs: [
      {
        before: "Проблема прямих обробників — новий елемент, додaний після рендеру, НЕ має обробника:",
        code: `const list = document.querySelector("#list");

list.querySelectorAll("li").forEach((li) => {
  li.addEventListener("click", () => console.log("Клік:", li.textContent));
});

// Новий елемент, доданий ПІЗНІШЕ — обробника НЕМАЄ
const newLi = document.createElement("li");
newLi.textContent = "Новий пункт";
list.appendChild(newLi);
// клік на newLi НІЧОГО не виводить — forEach вище вже відпрацював раніше`,
        lineNotes: ["forEach прикріплює обробник до кожного li, що ІСНУВАВ У МОМЕНТ виконання цього коду — новий li, доданий ПІЗНІШЕ, просто не був частиною цього перебору.", "Клік на newLi реально НІЧОГО не виводить у консоль — обробника на цьому конкретному елементі просто не існує."],
      },
      {
        before: "Делегування — ОДИН обробник на батьку покриває і майбутні елементи:",
        code: `const list = document.querySelector("#list");

list.addEventListener("click", (event) => {
  const li = event.target.closest("li");
  if (li) {
    console.log("Клік:", li.textContent);
  }
});

const newLi = document.createElement("li");
newLi.textContent = "Новий пункт";
list.appendChild(newLi);
// клік на newLi ТЕПЕР реально виводить "Клік: Новий пункт" — без жодного додаткового коду`,
        lineNotes: ["Обробник прикріплений ОДИН РАЗ до list — клік на БУДЬ-ЯКОМУ дочірньому li (включно з майбутніми) спливає до list і потрапляє в цей самий обробник.", "event.target.closest(\"li\") знаходить найближчого предка (чи сам елемент), що відповідає селектору li — навіть якщо клік стався на вкладеному <span> ВСЕРЕДИНІ li, closest все одно знайде правильний li."],
      },
      {
        before: "event.target проти event.currentTarget — реальна різниця при делегуванні:",
        code: `<ul id="list">
  <li><span>Пункт 1</span></li>
</ul>

<script>
  document.querySelector("#list").addEventListener("click", (event) => {
    console.log(event.target); // <span>Пункт 1</span> — де подія РЕАЛЬНО сталась
    console.log(event.currentTarget); // <ul id="list"> — де ВСТАНОВЛЕНО обробник
  });
</script>`,
        lineNotes: ["Клік на <span> всередині <li> — event.target вказує саме на <span>, бо саме там подія фізично відбулась (найглибший елемент під курсором).", "event.currentTarget завжди вказує на елемент, до якого прикріплений САМ обробник (тут — <ul>), незалежно від того, на якому вкладеному елементі реально стався клік."],
        after: "Саме тому для делегування використовують event.target (і .closest() для пошуку потрібного предка), а не event.currentTarget — currentTarget завжди буде батьком, а не конкретною клікнутою дитиною.",
      },
      {
        before: "Делегування з перевіркою типу дії через data-атрибут — реальний шаблон для списку дій:",
        code: `<ul id="todos">
  <li>Купити хліб <button data-action="delete">✕</button></li>
  <li>Помити посуд <button data-action="delete">✕</button></li>
</ul>

<script>
  document.querySelector("#todos").addEventListener("click", (event) => {
    const button = event.target.closest("[data-action='delete']");
    if (button) {
      button.closest("li").remove();
    }
  });
</script>`,
        lineNotes: ["event.target.closest(\"[data-action='delete']\") реагує ЛИШЕ на клік по кнопці видалення, ігноруючи клік будь-де ще в межах <li> (наприклад, по самому тексту завдання).", "button.closest(\"li\").remove() видаляє найближчий батьківський <li> цієї конкретної кнопки — працює однаково для БУДЬ-якого <li>, включно з доданими пізніше, без прикріплення нового обробника на кожен."],
      },
    ],
    commonMistakes: ["Прикріплювати обробник до кожного елемента списку індивідуально, а потім дивуватись, чому новододані елементи \"не реагують\" на клік.", "Плутати event.target (реальне джерело події) з event.currentTarget (елемент з обробником) при делегуванні.", "Забувати перевіряти, чи event.target (чи результат .closest()) дійсно відповідає потрібному селектору, перш ніж виконувати логіку — клік будь-де в межах батька теж потрапляє в обробник.", "Використовувати event.target напряму без .closest(), коли структура дитини складніша за один рівень (текст всередині <span> всередині <li>) — event.target може вказувати на вкладений елемент, а не на очікуваний <li>."],
    dontDoThis: { code: `function attachHandlers() {\n  document.querySelectorAll(".todo-item").forEach((item) => {\n    item.addEventListener("click", () => item.remove());\n  });\n}\n\nattachHandlers(); // прикріплено для ІСНУЮЧИХ .todo-item\n\nfunction addTodo(text) {\n  const li = document.createElement("li");\n  li.className = "todo-item";\n  li.textContent = text;\n  document.querySelector("#list").appendChild(li);\n  // БАГ: новий li НЕ має обробника кліку — attachHandlers() не викликався знову\n}`, explanation: "attachHandlers() прикріплює обробник лише до ЕЛЕМЕНТІВ, що існували на момент його виклику. Кожен новий .todo-item, доданий через addTodo() ПІЗНІШЕ, не отримує обробник автоматично — клік на ньому нічого не робить. Викликати attachHandlers() знову після кожного addTodo() технічно \"працює\", але громіздко і легко забути; делегування (один обробник на батьківському #list) вирішує це назавжди, без потреби повторного прикріплення." },
    bestPractices: ["Використовуй делегування (обробник на батьківському елементі) за умовчанням для списків з динамічним чи великим набором дочірніх елементів.", "У обробнику делегування завжди перевіряй event.target через .matches()/.closest() перед виконанням логіки, специфічної для дочірнього елемента.", "Для складеної внутрішньої структури дитини (текст у вкладених тегах) використовуй .closest(selector), а не event.target напряму.", "Памʼятай, що event.currentTarget завжди елемент з обробником, а event.target — реальне джерело події; для делегування потрібен саме target."],
    remember: ["Делегування = один обробник на батьківському елементі замість окремого обробника на кожній дитині.", "Працює завдяки спливанню подій — подія на дитині \"піднімається\" через усіх батьків аж до document.", "event.target — де подія РЕАЛЬНО сталась; event.currentTarget — де ВСТАНОВЛЕНО обробник (для делегування завжди батько).", "closest(selector) знаходить найближчого предка (чи сам елемент), що відповідає селектору — надійний спосіб визначити \"потрібний\" елемент від event.target."],
    interviewQuestions: [
      { question: "Що таке делегування подій і чому воно працює?", answer: "Делегування подій — прикріплення ОДНОГО обробника до батьківського елемента замість окремих обробників на кожній дитині. Це працює завдяки спливанню подій (event bubbling): подія, що сталась на дочірньому елементі, автоматично \"піднімається\" через усіх його батьків аж до document, тому обробник на батьку отримує сповіщення про клік на БУДЬ-якій дитині всередині нього." },
      { question: "Чому делегування вирішує проблему з динамічно доданими елементами?", answer: "Обробник, прикріплений до батьківського елемента, слухає ПОДІЇ, а не конкретні дочірні елементи, що існували на момент прикріплення. Оскільки спливання подій працює для будь-якого нащадка, незалежно від того, коли він був доданий у DOM, новий елемент, доданий через appendChild ПІСЛЯ прикріплення обробника, автоматично \"покривається\" тим самим обробником без потреби прикріплювати щось до нього окремо." },
      { question: "У чому різниця між event.target і event.currentTarget?", answer: "event.target — елемент, на якому подія РЕАЛЬНО сталась (найглибший елемент під курсором у момент кліку). event.currentTarget — елемент, до якого прикріплений САМ обробник, що зараз виконується. Для делегування, де обробник на батьку, а клік стався на дитині, target вказує на дитину, а currentTarget — на батька." },
      { question: "Для чого використовується element.closest(selector) при делегуванні подій?", answer: "closest(selector) шукає найближчого предка елемента (включно з ним самим), що відповідає CSS-селектору, піднімаючись по DOM-дереву вгору. При делегуванні event.target може вказувати на глибоко вкладений елемент (наприклад, <span> усередині кнопки всередині <li>) — closest дозволяє надійно знайти потрібний рівень (наприклад, сам <li> чи кнопку), незалежно від того, на якому саме вкладеному елементі реально стався клік." },
    ],
    summary: "Делегування подій — один обробник на батьківському елементі замість окремого на кожній дитині, що працює завдяки спливанню подій і автоматично покриває майбутні, динамічно додані елементи. event.target — джерело події; event.currentTarget — елемент з обробником. closest(selector) надійно знаходить потрібного предка від event.target для складеної внутрішньої структури.",
    proTip: "Якщо клік на динамічно доданому елементі \"нічого не робить\", хоча той самий клік на статичному елементі спрацьовує — це майже завжди означає, що обробники прикріплювались індивідуально ДО того, як цей елемент зʼявився. Делегування — постійне рішення цієї категорії багів.",
    nextLessonNote: "Це завершує модуль \"DOM\" — далі модуль \"Події\": типи подій (click, keyboard, form), спливання/захоплення в деталях, і скасування поведінки за замовчуванням.",
    interactiveDemo: "event-delegation-demo",
    practiceTask: {
      title: "Виправ відсутність обробника на нових елементах списку",
      description: "Функція attachHandlers прикріплює обробник кліку до кожного .todo-item індивідуально — нові елементи, додані через addTodo, не отримують обробник. Перепиши через делегування.",
      checklist: ["Клік на БУДЬ-ЯКОМУ .todo-item (включно з доданими після початкового рендеру) видаляє цей пункт.", "Використано ОДИН обробник на батьківському списку замість окремого на кожному пункті.", "Новий пункт, доданий через addTodo, реагує на клік без додаткового коду."],
      starterFiles: [
        {
          id: "js-event-delegation-start",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<ul id="list">
  <li class="todo-item">Купити хліб</li>
</ul>
<button id="addBtn">Додати пункт</button>

<script>
  function attachHandlers() {
    document.querySelectorAll(".todo-item").forEach((item) => {
      item.addEventListener("click", () => item.remove());
    });
  }
  attachHandlers();

  document.querySelector("#addBtn").addEventListener("click", () => {
    const li = document.createElement("li");
    li.className = "todo-item";
    li.textContent = "Новий пункт";
    document.querySelector("#list").appendChild(li);
    // БАГ: клік на цьому новому пункті нічого не робить
  });
</script>
`,
        },
      ],
      solutionFiles: [
        {
          id: "js-event-delegation-solution",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<ul id="list">
  <li class="todo-item">Купити хліб</li>
</ul>
<button id="addBtn">Додати пункт</button>

<script>
  document.querySelector("#list").addEventListener("click", (event) => {
    const item = event.target.closest(".todo-item");
    if (item) {
      item.remove();
    }
  });

  document.querySelector("#addBtn").addEventListener("click", () => {
    const li = document.createElement("li");
    li.className = "todo-item";
    li.textContent = "Новий пункт";
    document.querySelector("#list").appendChild(li);
    // тепер клік на цьому пункті теж працює — обробник на батьку покриває все
  });
</script>
`,
          readOnly: true,
        },
      ],
      hints: ["Прикріплення обробника до кожного .todo-item індивідуально не покриває елементи, додані ПІЗНІШЕ.", "Перенеси обробник на батьківський #list і використовуй event.target.closest('.todo-item') всередині нього."],
      expectedOutput: "Клік на будь-якому пункті (старому чи новому) видаляє саме цей пункт",
    },
    microExercises: [
      { id: "js-event-delegation-bubble-predict", kind: "predict", prompt: "Що виведе консоль при кліку на кнопку всередині #list?", code: `document.querySelector("#list").addEventListener("click", (e) => {\n  console.log(e.target.tagName);\n});\n// HTML: <ul id="list"><li><button>Клік</button></li></ul>`, solution: "\"BUTTON\" — e.target вказує на елемент, де подія РЕАЛЬНО сталась (сама кнопка), а не на #list, до якого прикріплений обробник." },
      { id: "js-event-delegation-missing-find-bug", kind: "find-the-bug", prompt: "У чому проблема цього коду?", code: `document.querySelectorAll(".btn").forEach((btn) => {\n  btn.addEventListener("click", handleClick);\n});\n\nfunction addButton() {\n  const btn = document.createElement("button");\n  btn.className = "btn";\n  document.body.appendChild(btn);\n}`, solution: "forEach прикріплює обробник лише до .btn, що ІСНУВАЛИ на момент виконання цього коду. Кожна нова кнопка, створена через addButton() ПІЗНІШЕ, не отримує обробник click — клік на ній нічого не робить. Потрібне делегування: один обробник на document.body (чи ближчому спільному батьку) з перевіркою event.target.closest('.btn')." },
      { id: "js-event-delegation-target-choice", kind: "choice", prompt: "При делегуванні подій, яка властивість вказує на елемент, де подія РЕАЛЬНО сталась (не на батька з обробником)?", options: ["event.currentTarget", "event.target", "event.type", "this"], correctAnswer: "event.target", solution: "event.target завжди вказує на найглибший елемент, де подія фізично відбулась. event.currentTarget вказує на елемент, до якого прикріплений обробник, — при делегуванні це батько, а не конкретна дитина." },
      { id: "js-event-delegation-closest-explain", kind: "explain", prompt: "Поясни, чому event.target.closest('.card') надійніший за прямий event.target === card при делегуванні.", solution: "Якщо клік стався на вкладеному елементі ВСЕРЕДИНІ .card (наприклад, на <span> з текстом чи на іконці), event.target вказуватиме саме на цей вкладений елемент, а не на сам .card — пряме порівняння event.target === card у такому разі дасть false, навіть якщо клік логічно стосується картки. closest('.card') піднімається по DOM-дереву від event.target ВГОРУ, поки не знайде елемент, що відповідає селектору .card (чи сам .card, якщо клік стався прямо на ньому), тому надійно працює незалежно від глибини внутрішньої структури картки." },
      { id: "js-event-delegation-rewrite", kind: "rewrite", prompt: "Перепиши код так, щоб один обробник на батьківському #menu обробляв клік на будь-якому .menu-item, включно з доданими пізніше.", code: `document.querySelectorAll(".menu-item").forEach((item) => {\n  item.addEventListener("click", () => console.log(item.textContent));\n});`, solution: `document.querySelector("#menu").addEventListener("click", (event) => {\n  const item = event.target.closest(".menu-item");\n  if (item) {\n    console.log(item.textContent);\n  }\n});\n// один обробник на #menu покриває всі поточні й майбутні .menu-item через спливання подій` },
    ],
    quiz: {
      id: "js-event-delegation-quiz",
      title: "Швидка перевірка: Делегування подій",
      questions: [
        {
          id: "js-delegation-q1",
          type: "code",
          question: "Що виведе консоль при кліку на кнопку всередині #list (HTML: <ul id=\"list\"><li><button>Клік</button></li></ul>)?",
          codeSnippet: `document.querySelector("#list").addEventListener("click", (e) => {\n  console.log(e.target.tagName);\n});`,
          options: ["\"UL\"", "\"LI\"", "\"BUTTON\"", "undefined"],
          correctAnswer: "\"BUTTON\"",
          explanation: "e.target вказує на елемент, де подія РЕАЛЬНО сталась (кнопка), а не на #list, до якого прикріплений обробник.",
        },
        {
          id: "js-delegation-q2",
          type: "single",
          question: "Чому делегування вирішує проблему з динамічно доданими елементами?",
          options: [
            "Обробник автоматично клонується на кожен новий елемент",
            "Обробник на батьку слухає ПОДІЇ (що спливають), а не конкретні елементи — тому автоматично покриває майбутніх нащадків",
            "Динамічні елементи не генерують події взагалі",
            "Делегування не має відношення до динамічних елементів",
          ],
          correctAnswer: "Обробник на батьку слухає ПОДІЇ (що спливають), а не конкретні елементи — тому автоматично покриває майбутніх нащадків",
          explanation: "Завдяки спливанню подій, клік на будь-якому нащадку (включно з доданим пізніше) досягає обробника на батьку.",
        },
        {
          id: "js-delegation-q3",
          type: "single",
          question: "У чому різниця між event.target і event.currentTarget?",
          options: [
            "Це синоніми, різниці немає",
            "target — де подія РЕАЛЬНО сталась; currentTarget — де ВСТАНОВЛЕНО обробник",
            "target — де встановлено обробник; currentTarget — де сталась подія",
            "currentTarget доступний лише для кліків миші",
          ],
          correctAnswer: "target — де подія РЕАЛЬНО сталась; currentTarget — де ВСТАНОВЛЕНО обробник",
          explanation: "Для делегування currentTarget завжди батько, а target — конкретний елемент, на якому фізично стався клік.",
        },
        {
          id: "js-delegation-q4",
          type: "true-false",
          question: "event.target.closest(selector) шукає найближчого предка (чи сам елемент), що відповідає селектору, піднімаючись по DOM-дереву.",
          options: ["Так", "Ні"],
          correctAnswer: true,
          explanation: "closest надійно знаходить потрібний рівень навіть якщо клік стався на глибоко вкладеному елементі всередині цільового селектора.",
        },
        {
          id: "js-delegation-q5",
          type: "single",
          question: "Чому обробник, прикріплений через forEach до кожного .todo-item окремо, не реагує на елементи, додані пізніше?",
          options: [
            "forEach має обмеження на кількість елементів",
            "forEach прикріпив обробники лише до елементів, що існували на момент виконання коду — нові елементи не були частиною цього перебору",
            "addEventListener працює лише один раз для всієї сторінки",
            "Це неможлива ситуація, forEach завжди охоплює майбутні елементи",
          ],
          correctAnswer: "forEach прикріпив обробники лише до елементів, що існували на момент виконання коду — нові елементи не були частиною цього перебору",
          explanation: "Пряме прикріплення обробників — статична операція на момент виклику; делегування вирішує це раз і назавжди.",
        },
      ],
    },
  },
};

export const jsDomModuleQuiz: QuizData = {
  id: "js-dom-module-quiz",
  title: "Контрольний тест: DOM",
  questions: [
    {
      id: "js-dom-module-q1",
      type: "code",
      question: "Що виведе цей код, якщо на сторінці немає елемента з класом .promo?",
      codeSnippet: `const banner = document.querySelector(".promo");\nconsole.log(banner);`,
      options: ["null", "undefined", "[]", "TypeError"],
      correctAnswer: "null",
      explanation: "querySelector тихо повертає null, якщо жоден елемент не відповідає селектору.",
    },
    {
      id: "js-dom-module-q2",
      type: "code",
      question: "Що виведе цей код?",
      codeSnippet: `const div = document.createElement("div");\nconsole.log(document.body.contains(div));`,
      options: ["true", "false", "undefined", "TypeError"],
      correctAnswer: "false",
      explanation: "createElement лише створює вузол у памʼяті — він не стає частиною сторінки, доки не буде доданий через appendChild/append.",
    },
    {
      id: "js-dom-module-q3",
      type: "single",
      question: "Чому textContent безпечніший за innerHTML для вставки тексту від користувача?",
      options: [
        "textContent швидший за innerHTML у будь-якому випадку",
        "textContent екранує HTML-теги, показуючи їх буквально, тому вставлений скрипт чи обробник подій не виконається",
        "innerHTML взагалі заблокований у сучасних браузерах",
        "Різниці немає, обидва однаково безпечні",
      ],
      correctAnswer: "textContent екранує HTML-теги, показуючи їх буквально, тому вставлений скрипт чи обробник подій не виконається",
      explanation: "innerHTML рендерить теги як реальні елементи, що є класичним вектором XSS для недовіреного вмісту.",
    },
    {
      id: "js-dom-module-q4",
      type: "code",
      question: "Що виведе цей код?",
      codeSnippet: `const card = document.querySelector("#card"); // class="card featured"\ncard.className = "highlighted";\nconsole.log(card.className);`,
      options: ["\"card featured highlighted\"", "\"highlighted\"", "\"card featured\"", "TypeError"],
      correctAnswer: "\"highlighted\"",
      explanation: "Присвоєння className повністю перезаписує атрибут class, знищуючи попередні класи. Для додавання потрібен classList.add.",
    },
    {
      id: "js-dom-module-q5",
      type: "single",
      question: "Що САМЕ змушує браузер негайно перерахувати макет сторінки (layout thrashing)?",
      options: [
        "Запис нового значення в style",
        "Читання властивості, залежної від макета (offsetWidth тощо), одразу після запису",
        "Виклик querySelectorAll",
        "Додавання нового обробника подій",
      ],
      correctAnswer: "Читання властивості, залежної від макета (offsetWidth тощо), одразу після запису",
      explanation: "Запис лише позначає макет застарілим; саме читання геометрії змушує негайний перерахунок.",
    },
    {
      id: "js-dom-module-q6",
      type: "multiple",
      question: "Які з цих тверджень про DOM правильні?",
      options: [
        "querySelectorAll повертає статичний знімок DOM, а не живу колекцію",
        "event.target завжди дорівнює event.currentTarget при делегуванні",
        "innerHTML += у циклі перепарсює весь контейнер на кожній ітерації",
        "classList.toggle сам визначає, додати клас чи прибрати",
      ],
      correctAnswer: [
        "querySelectorAll повертає статичний знімок DOM, а не живу колекцію",
        "innerHTML += у циклі перепарсює весь контейнер на кожній ітерації",
        "classList.toggle сам визначає, додати клас чи прибрати",
      ],
      explanation: "Три твердження правильні; помилкове — про event.target і currentTarget, які при делегуванні зазвичай різні елементи.",
      optionExplanations: {
        "querySelectorAll повертає статичний знімок DOM, а не живу колекцію": "Так — на відміну від getElementsByClassName/TagName, які повертають живу HTMLCollection.",
        "event.target завжди дорівнює event.currentTarget при делегуванні": "Неправильно — при делегуванні target це конкретний нащадок, де сталась подія, а currentTarget — батько з обробником.",
        "innerHTML += у циклі перепарсює весь контейнер на кожній ітерації": "Так — це причина, чому createElement + appendChild чи DocumentFragment надійніші для циклів.",
        "classList.toggle сам визначає, додати клас чи прибрати": "Так — toggle перевіряє поточну наявність класу і діє відповідно, замінюючи ручну if/else-логіку.",
      },
    },
  ],
};
