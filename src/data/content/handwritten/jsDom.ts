import type { LessonOverride } from "./htmlFoundations";

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
  },

  "Створення DOM-вузлів": {
    whatIsIt: "document.createElement(tagName) створює НОВИЙ, ще не приєднаний до сторінки DOM-елемент. parent.appendChild(node) (чи новіший parent.append(...)) додає цей вузол як реальну частину сторінки. Створений, але не приєднаний елемент існує лише в памʼяті й не видимий користувачу, доки його не додати в DOM через appendChild/append.",
    whyUseIt: "Реальні інтерфейси рідко повністю статичні — список товарів, коментарі, нові рядки таблиці зʼявляються ДИНАМІЧНО у відповідь на дії користувача чи дані з сервера. createElement + appendChild — фундаментальний, найнизькорівневіший спосіб додати щось нове на сторінку без перезавантаження чи заміни всього HTML.",
    whenToUse: ["Потрібно додати новий елемент на сторінку programмatically, у відповідь на подію чи дані.", "Створення кількох однотипних елементів у циклі (наприклад, список товарів з масиву).", "Побудова складнішої структури елементів перед одноразовим додаванням у DOM (через DocumentFragment)."],
    whenNotToUse: ["Не використовуй innerHTML += для додавання нового вмісту в цикл — це змушує браузер повторно перепарсити ВЕСЬ вміст контейнера на кожній ітерації.", "Не створюй елементи, якщо простіше й достатньо оновити textContent/атрибути ІСНУЮЧОГО елемента.", "Не додавай елементи по одному в DOM у великому циклі без DocumentFragment — кожен appendChild у DOM напряму може викликати перерахунок макета сторінки."],
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
  },
};
