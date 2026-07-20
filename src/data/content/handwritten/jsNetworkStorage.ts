import type { LessonOverride } from "./htmlFoundations";

/**
 * Module "Мережа та сховище" (js-network-storage). Ninth JavaScript module —
 * Fetch API (GET/POST), HTTP status handling, JSON parsing, and LocalStorage
 * patterns, finishing with explicit loading/success/empty/error UI states.
 * Same deep cheat-sheet lesson format as js-async and js-events. All 6 of 6
 * lessons.
 */
export const jsNetworkStorageOverrides: Record<string, LessonOverride> = {
  "GET-запити через Fetch": {
    whatIsIt: "fetch(url) надсилає GET-запит (за замовчуванням) і повертає Promise, що виконується (fulfilled) з обʼєктом Response — але НЕ з самими даними. Response має властивість .ok (true для статусів 200-299), .status (числовий код) і методи response.json()/response.text(), які САМІ повертають ще один Promise з реальним вмістом відповіді. Тому читання даних завжди вимагає ДВОХ кроків: дочекатись Response, потім дочекатись результату response.json().",
    whyUseIt: "Реальний список товарів, профіль користувача чи каталог кав'ярні майже ніколи не \"зашитий\" у код напряму — вони приходять з сервера через fetch. Розуміння, що fetch дає САМ Response, а не готові дані, пояснює найпоширенішу помилку початківців: спробу одразу використати результат fetch() як масив чи обʼєкт, хоча насправді потрібен ще один await.",
    whenToUse: ["Читання даних з сервера без побічних ефектів — список товарів, профіль, налаштування.", "fetch(url) без другого аргументу чи з method: \"GET\" явно.", "Коли потрібен саме JSON — response.json(); коли простий текст — response.text()."],
    whenNotToUse: ["Не використовуй результат fetch(url) напряму як дані — це Response, потрібен ще response.json().", "Не забувай, що response.json() теж повертає Promise — потрібен ще один await чи .then().", "Не викликай response.json() двічі на одному Response — тіло відповіді можна прочитати лише ОДИН раз."],
    comparisonTable: {
      headers: ["Крок", "Що повертає"],
      rows: [
        ["fetch(url)", "Promise<Response> — сам обʼєкт відповіді, ще не дані"],
        ["response.json()", "Promise<будь-яке значення> — розібраний JSON з тіла відповіді"],
        ["response.text()", "Promise<string> — сирий текст тіла відповіді"],
        ["response.ok", "true для статусів 200-299, false для 4xx/5xx"],
      ],
    },
    codeWalkthroughs: [
      {
        before: "Базовий GET-запит через .then() — два послідовні кроки, Response, потім дані:",
        code: `fetch("/api/products")
  .then((response) => response.json())
  .then((products) => console.log("Товари:", products));`,
        lineNotes: ["Перший .then() отримує САМ Response, а не масив товарів — виклик response.json() тут ОБОВʼЯЗКОВИЙ, щоб дістати реальні дані.", "response.json() повертає новий Promise, тому потрібен ще один .then(), щоб реально отримати розібраний масив products."],
      },
      {
        before: "Той самий запит через async/await — читається послідовно, як синхронний код:",
        code: `async function loadProducts() {
  const response = await fetch("/api/products");
  const products = await response.json();
  console.log("Товари:", products);
  return products;
}`,
        lineNotes: ["Перший await дає Response, другий await — реальні дані з нього; пропустити другий крок неможливо, обидва await потрібні окремо.", "Це рівно та сама логіка, що й у .then()-варіанті, лише в синтаксисі async/await з попереднього модуля."],
      },
      {
        before: "Реальний приклад: рендер списку товарів кав'ярні після завантаження:",
        code: `async function renderMenu() {
  const response = await fetch("/api/menu");
  const items = await response.json();

  const html = items.map((item) => \`<li>\${item.name} — \${item.price} грн</li>\`).join("");
  document.querySelector("#menu").innerHTML = html;
}`,
        lineNotes: ["items — це вже реальний масив обʼєктів меню, готовий для .map(), бо response.json() дочекались через await.", "Цей приклад поєднує fetch з уже відомими .map() і шаблонними рядками — нового тут лише сам факт, що items прийшли з мережі, а не були написані в коді."],
      },
      {
        before: "Реальний баг: спроба використати Response напряму як масив даних:",
        code: `async function loadProductsBroken() {
  const products = await fetch("/api/products"); // БАГ: це Response, не масив!
  console.log(products.length); // undefined — у Response немає .length
  return products;
}`,
        lineNotes: ["products тут — обʼєкт Response (з полями ok, status, json тощо), а НЕ масив товарів — забутий другий await response.json().", "products.length дає undefined, бо Response не має такої властивості — це не помилка мови, а ознака того, що дані ще не \"розпаковані\" з відповіді."],
        after: "Правило просте: після fetch(url) завжди йде ще один await (чи .then()) для response.json() чи response.text() — сам fetch ніколи не дає готові дані напряму.",
      },
    ],
    commonMistakes: ["Використання результату fetch(url) напряму як даних, без response.json().", "Забутий await/.then() перед response.json() — робота з Promise замість реальних даних.", "Повторний виклик response.json() на тому самому Response — тіло відповіді читається лише один раз.", "Плутанина: думати, що fetch кидає помилку для 404/500 — насправді для цього потрібна окрема перевірка (тема наступного уроку)."],
    dontDoThis: { code: `async function getUser(id) {\n  const user = await fetch(\`/api/users/\${id}\`); // БАГ: забутий response.json()\n  return user.name; // undefined — user це Response, а не обʼєкт користувача\n}`, explanation: "fetch(url) повертає Response — обгортку навколо відповіді сервера, а не самі дані. user.name звертається до неіснуючої властивості обʼєкта Response, тому результат undefined, хоча сервер реально надіслав коректні дані користувача. Потрібно: const response = await fetch(...); const user = await response.json(); return user.name;" },
    bestPractices: ["Завжди читай response.json()/response.text() як ОКРЕМИЙ крок після отримання Response.", "Для async-функцій пиши два послідовні await: спочатку Response, потім дані.", "Не намагайся прочитати тіло відповіді (response.json()) вдруге — зберігай результат у змінну одразу.", "Обирай response.text() замість response.json(), якщо сервер повертає не-JSON текст (наприклад, просте повідомлення)."],
    remember: ["fetch(url) повертає Promise<Response> — сам обʼєкт відповіді, ще не дані.", "response.json()/response.text() повертають ЩЕ ОДИН Promise з реальним вмістом.", "Потрібні ДВА await (чи два .then()): спочатку Response, потім дані з нього.", "Тіло відповіді можна прочитати лише один раз — response.json() вдруге поверне помилку."],
    interviewQuestions: [
      { question: "Що саме повертає fetch(url) — самі дані чи щось інше?", answer: "fetch(url) повертає Promise, що виконується з обʼєктом Response — обгорткою навколо HTTP-відповіді (статус, заголовки, тіло). Це НЕ самі дані: щоб дістати реальний вміст, потрібно додатково викликати response.json() (для JSON) чи response.text() (для простого тексту), що поверне ще один Promise." },
      { question: "Чому код async function load() { const data = await fetch(url); console.log(data.length); } не працює як очікується?", answer: "await fetch(url) дає обʼєкт Response, а не масив чи інші дані — у Response немає властивості .length, тому результат undefined. Потрібен додатковий крок: const response = await fetch(url); const data = await response.json(); — лише після цього data містить реальний розібраний вміст відповіді." },
      { question: "Чи можна викликати response.json() двічі на одному й тому самому Response?", answer: "Ні. Тіло HTTP-відповіді — це потік (stream), який можна прочитати лише ОДИН раз. Другий виклик response.json() на тому самому обʼєкті Response кине помилку (\"body stream already read\"). Якщо дані потрібні в кількох місцях коду, результат response.json() варто зберегти в змінну одразу після першого читання." },
      { question: "Чим response.json() відрізняється від response.text()?", answer: "response.json() читає тіло відповіді як текст і одразу розбирає (parse) його як JSON, повертаючи готовий JS-обʼєкт/масив/значення. response.text() лише читає тіло як сирий рядок, без жодного розбору — його варто використовувати, коли сервер повертає простий текст чи формат, відмінний від JSON." },
    ],
    summary: "fetch(url) повертає Response — обгортку навколо HTTP-відповіді, а НЕ самі дані. Реальний вміст дістають окремим кроком через response.json() (для JSON) чи response.text() (для тексту), який теж повертає Promise. Тому робота з GET-запитом завжди складається з ДВОХ послідовних await/then: спочатку Response, потім дані з нього.",
    proTip: "Якщо після fetch() код звертається до .length, .map() чи будь-якої властивості даних і отримує undefined чи помилку — перша перевірка: чи викликаний response.json() перед цим, і чи є await/.then() перед НИМ також.",
    nextLessonNote: "Далі — POST-запити: як надіслати дані НА сервер, а не лише прочитати їх.",
    interactiveDemo: "fetch-get-demo",
    practiceTask: {
      title: "Виправ функцію, що використовує Response замість реальних даних",
      description: "Функція loadProducts повертає сам обʼєкт Response з fetch, забувши прочитати response.json() — спроба вивести кількість товарів дає undefined. Додай другий await.",
      checklist: ["Функція повертає реальний масив товарів, а не обʼєкт Response.", "products.length коректно показує кількість товарів.", "Використано два послідовні await: для Response і для response.json()."],
      starterFiles: [
        {
          id: "js-fetch-get-start",
          path: "script.js",
          language: "javascript",
          label: "script.js",
          code: `async function loadProducts() {
  const products = await fetch("/api/products"); // БАГ: забутий response.json()
  console.log("Кількість товарів:", products.length);
  return products;
}

loadProducts();
`,
        },
      ],
      solutionFiles: [
        {
          id: "js-fetch-get-solution",
          path: "script.js",
          language: "javascript",
          label: "script.js",
          code: `async function loadProducts() {
  const response = await fetch("/api/products");
  const products = await response.json();
  console.log("Кількість товарів:", products.length);
  return products;
}

loadProducts();
`,
          readOnly: true,
        },
      ],
      hints: ["fetch(url) дає Response, а не масив — у Response немає .length.", "Додай другий крок: const products = await response.json();"],
      expectedOutput: "\"Кількість товарів: 3\" (чи інше реальне число) замість undefined",
    },
    microExercises: [
      { id: "js-fetch-response-predict", kind: "predict", prompt: "Що виведе цей код?", code: `const response = await fetch("/api/data");\nconsole.log(typeof response.json);`, solution: "\"function\" — response.json є методом обʼєкта Response, а не готовими даними; сам виклик response.json() повернув би Promise, а не значення." },
      { id: "js-fetch-nojson-find-bug", kind: "find-the-bug", prompt: "У чому проблема цього коду?", code: `async function getFirstItem() {\n  const items = await fetch("/api/items");\n  return items[0];\n}`, solution: "items тут — обʼєкт Response, а не масив, тому items[0] дає undefined. Потрібно: const response = await fetch(\"/api/items\"); const items = await response.json(); return items[0];" },
      { id: "js-fetch-method-choice", kind: "choice", prompt: "Що потрібно викликати на Response, щоб отримати розібраний JSON з тіла відповіді?", options: ["response.data", "response.json()", "response.body", "response.value"], correctAnswer: "response.json()", solution: "response.json() читає тіло відповіді і розбирає його як JSON, повертаючи Promise з готовим значенням. У Response немає властивостей .data чи .body, що містили б готові дані напряму." },
      { id: "js-fetch-two-steps-explain", kind: "explain", prompt: "Поясни, чому робота з fetch завжди складається з ДВОХ кроків (Response, потім дані), а не одного.", solution: "fetch спроєктований так, щоб повертати контроль над відповіддю (заголовки, статус, метод читання тіла) ще ДО того, як усе тіло відповіді завантажено й розібрано — це дозволяє, наприклад, перевірити response.ok чи response.status, перш ніж витрачати час на розбір потенційно великого тіла. Тому дані доступні лише через окремий, явний виклик response.json()/response.text(), а не автоматично разом з самим Response." },
      { id: "js-fetch-await-rewrite", kind: "rewrite", prompt: "Перепиши цей .then()-ланцюжок через async/await.", code: `function loadCart() {\n  return fetch("/api/cart")\n    .then((response) => response.json())\n    .then((cart) => console.log(cart));\n}`, solution: `async function loadCart() {\n  const response = await fetch("/api/cart");\n  const cart = await response.json();\n  console.log(cart);\n}\n// та сама логіка, без .then() — два послідовні await` },
    ],
  },

  "POST-запити": {
    whatIsIt: "fetch(url, options) з options.method: \"POST\" надсилає дані НА сервер замість читання з нього. options.body містить дані для відправки — але тіло запиту завжди рядок (чи FormData), тому обʼєкт JS потрібно перетворити через JSON.stringify(). options.headers: { \"Content-Type\": \"application/json\" } явно повідомляє серверу формат тіла — без цього заголовка сервер може неправильно розібрати надіслані дані.",
    whyUseIt: "Додавання товару в кошик, реєстрація користувача, збереження коментаря — усе це надсилання НОВИХ даних на сервер, а не читання існуючих. POST через fetch дозволяє це зробити без перезавантаження сторінки (те саме, чого раніше домагались через event.preventDefault() на формі), відправивши дані як JSON у тілі запиту.",
    whenToUse: ["Створення нового ресурса на сервері (новий товар, коментар, обліковий запис).", "Відправлення даних форми через JavaScript замість стандартної навігації браузера.", "Будь-яка дія, що змінює стан НА СЕРВЕРІ, а не просто читає існуючі дані."],
    whenNotToUse: ["Не передавай обʼєкт напряму в body без JSON.stringify() — fetch надішле щось на кшталт \"[object Object]\" замість реальних даних.", "Не забувай заголовок Content-Type: application/json — без нього сервер може не розпізнати формат тіла запиту.", "Не використовуй POST для простого читання даних без побічних ефектів — для цього призначений GET (попередній урок)."],
    comparisonTable: {
      headers: ["Опція fetch", "Призначення"],
      rows: [
        ["method: \"POST\"", "вказує, що це запит створення/зміни даних, а не читання"],
        ["headers: { \"Content-Type\": \"application/json\" }", "повідомляє серверу формат тіла запиту"],
        ["body: JSON.stringify(obj)", "перетворює JS-обʼєкт у рядок JSON для відправки"],
      ],
    },
    codeWalkthroughs: [
      {
        before: "Базовий POST-запит з JSON-тілом:",
        code: `async function addProduct(product) {
  const response = await fetch("/api/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });

  const created = await response.json();
  console.log("Створено товар:", created);
}`,
        lineNotes: ["method: \"POST\" явно вказує тип запиту — без цього fetch за замовчуванням надіслав би GET.", "JSON.stringify(product) перетворює обʼєкт { name, price } на рядок '{\"name\":\"...\",\"price\":...}', який і надсилається як body."],
      },
      {
        before: "Реальний приклад: додавання товару в кошик кав'ярні через POST:",
        code: `async function addToCart(cartId, item) {
  const response = await fetch(\`/api/carts/\${cartId}/items\`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: item.name, price: item.price, quantity: 1 }),
  });

  const updatedCart = await response.json();
  return updatedCart;
}`,
        lineNotes: ["Шаблонний рядок формує URL з cartId — той самий /api/carts/:id/items шаблон, що й у динамічних маршрутах API.", "Сервер повертає ОНОВЛЕНИЙ кошик як відповідь на POST — це поширений реальний патерн: відповідь підтверджує зміну і дає актуальний стан."],
      },
      {
        before: "Забутий JSON.stringify() — сервер отримує неправильний рядок замість даних:",
        code: `async function addProductBroken(product) {
  const response = await fetch("/api/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: product, // БАГ: обʼєкт без JSON.stringify()
  });
  return response.json();
}
// Сервер отримує body як "[object Object]" — рядкове представлення обʼєкта,
// а не реальні поля product`,
        lineNotes: ["body очікує рядок (чи FormData/Blob), а не сирий JS-обʼєкт — fetch автоматично викликає String(product) для будь-якого іншого значення, що дає безглузде \"[object Object]\".", "Сервер отримує саме цей текстовий рядок і не може розібрати з нього жодних реальних полів товару — запит технічно \"успішний\", але дані втрачені."],
        after: "Правило просте: обʼєкт у body завжди проходить через JSON.stringify() — без винятків.",
      },
      {
        before: "Забутий заголовок Content-Type — сервер може не зрозуміти формат тіла:",
        code: `async function addCommentBroken(comment) {
  const response = await fetch("/api/comments", {
    method: "POST",
    // БАГ: немає headers з Content-Type
    body: JSON.stringify(comment),
  });
  return response.json();
}
// Тіло технічно валідний JSON-рядок, але без Content-Type сервер
// може обробити його як звичайний текст, а не розібрати як JSON`,
        lineNotes: ["JSON.stringify(comment) сам по собі дає коректний JSON-текст, але без заголовка Content-Type сервер не отримує явної інструкції, ЯК саме інтерпретувати цей текст.", "Багато серверних фреймворків за замовчуванням очікують саме application/json для автоматичного розбору тіла — без заголовка запит може \"мовчки\" не спрацювати як очікується."],
      },
    ],
    commonMistakes: ["Передавати обʼєкт напряму в body без JSON.stringify() — сервер отримує \"[object Object]\".", "Забувати заголовок Content-Type: application/json — сервер може не розібрати тіло правильно.", "Забувати method: \"POST\" — fetch за замовчуванням надсилає GET, який зазвичай ігнорує body.", "Плутати POST (створення нового) з PUT/PATCH (оновлення існуючого) — різна семантика для API, що їх розрізняє."],
    dontDoThis: { code: `async function saveOrder(order) {\n  return fetch("/api/orders", {\n    method: "POST",\n    body: order, // БАГ: не JSON.stringify(), немає Content-Type\n  });\n}`, explanation: "order — це JS-обʼєкт; переданий напряму в body, він буде приведений до рядка \"[object Object]\" замість реального JSON з полями замовлення. Додатково відсутній заголовок Content-Type: application/json, тому навіть якби body був коректним JSON-рядком, сервер міг би не зрозуміти, як його розібрати. Правильно: method: \"POST\", headers: { \"Content-Type\": \"application/json\" }, body: JSON.stringify(order)." },
    bestPractices: ["Завжди перетворюй обʼєкт на рядок через JSON.stringify() перед передачею в body.", "Завжди додавай headers: { \"Content-Type\": \"application/json\" } для JSON-тіла.", "Явно вказуй method: \"POST\" (чи PUT/PATCH/DELETE) — не покладайся на значення за замовчуванням.", "Перевіряй, що саме повертає сервер у відповідь на POST — часто це підтвердження чи оновлений обʼєкт, який варто прочитати через response.json()."],
    remember: ["method: \"POST\" — обов'язково явно, за замовчуванням fetch надсилає GET.", "body: JSON.stringify(obj) — обʼєкт завжди перетворюється на рядок перед відправкою.", "headers: { \"Content-Type\": \"application/json\" } повідомляє серверу формат тіла.", "Відповідь на POST теж потребує response.json(), якщо сервер повертає дані у відповідь."],
    interviewQuestions: [
      { question: "Чому body: someObject (без JSON.stringify) не працює як очікується?", answer: "Тіло HTTP-запиту завжди рядок (чи спеціальні типи на кшталт FormData/Blob) — сирий JS-обʼєкт fetch автоматично перетворює через приведення до рядка, що дає безглузде \"[object Object]\" замість реальних полів. Потрібно явно викликати JSON.stringify(someObject), щоб отримати коректний JSON-текст із реальними даними." },
      { question: "Навіщо потрібен заголовок Content-Type: application/json у POST-запиті?", answer: "Він явно повідомляє серверу формат надісланого тіла запиту. Без цього заголовка сервер може не зрозуміти, що тіло — це JSON, і обробити його як звичайний текст замість автоматичного розбору в обʼєкт на своїй стороні — навіть якщо сам текст технічно коректний JSON." },
      { question: "Чим POST відрізняється від GET у контексті fetch?", answer: "GET (за замовчуванням) призначений для ЧИТАННЯ даних без побічних ефектів і не має тіла запиту. POST явно вказується через method: \"POST\" і призначений для СТВОРЕННЯ нових даних на сервері, з тілом запиту (body), що містить дані, які треба зберегти." },
      { question: "Чи можна прочитати дані у відповідь на POST так само, як після GET?", answer: "Так — POST теж повертає Response, і якщо сервер надсилає дані у відповідь (наприклад, щойно створений обʼєкт із присвоєним id), їх так само читають через await response.json(), точно як після звичайного GET-запиту." },
    ],
    summary: "POST-запит через fetch вимагає трьох речей: method: \"POST\", headers з Content-Type: application/json, і body: JSON.stringify(obj) — обʼєкт завжди перетворюється на рядок перед відправкою. Забутий JSON.stringify() чи заголовок Content-Type — найпоширеніші причини, чому сервер \"не бачить\" реальні дані запиту.",
    proTip: "Якщо сервер отримує POST-запит, але не бачить реальних полів даних (чи повертає помилку валідації на, здавалося б, правильні дані) — перша перевірка: чи є JSON.stringify() навколо body і чи присутній заголовок Content-Type.",
    nextLessonNote: "Далі — обробка HTTP-статусів: чому fetch НЕ кидає помилку для 404/500, і як перевірити це самостійно.",
    interactiveDemo: "fetch-post-demo",
    practiceTask: {
      title: "Виправ POST-запит, що надсилає '[object Object]' замість даних",
      description: "Функція addComment передає обʼєкт comment напряму в body без JSON.stringify() і без заголовка Content-Type. Виправ обидві проблеми.",
      checklist: ["body містить результат JSON.stringify(comment), а не сирий обʼєкт.", "Присутній заголовок Content-Type: application/json.", "method залишається \"POST\"."],
      starterFiles: [
        {
          id: "js-fetch-post-start",
          path: "script.js",
          language: "javascript",
          label: "script.js",
          code: `async function addComment(comment) {
  const response = await fetch("/api/comments", {
    method: "POST",
    body: comment, // БАГ: не JSON.stringify(), немає Content-Type
  });
  return response.json();
}

addComment({ text: "Чудова кава!", author: "Ірина" });
`,
        },
      ],
      solutionFiles: [
        {
          id: "js-fetch-post-solution",
          path: "script.js",
          language: "javascript",
          label: "script.js",
          code: `async function addComment(comment) {
  const response = await fetch("/api/comments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(comment),
  });
  return response.json();
}

addComment({ text: "Чудова кава!", author: "Ірина" });
`,
          readOnly: true,
        },
      ],
      hints: ["Обʼєкт comment потрібно перетворити на рядок через JSON.stringify() перед передачею в body.", "Додай headers: { \"Content-Type\": \"application/json\" }, щоб сервер знав формат тіла."],
      expectedOutput: "Сервер отримує коректний JSON з полями text і author, а не рядок \"[object Object]\"",
    },
    microExercises: [
      { id: "js-post-stringify-predict", kind: "predict", prompt: "Що фактично буде в body, якщо написати body: { name: \"Кава\" } без JSON.stringify()?", code: `fetch("/api/products", { method: "POST", body: { name: "Кава" } });`, solution: "Рядок \"[object Object]\" — fetch приводить сирий обʼєкт до рядка автоматично, і це приведення не зберігає реальні поля обʼєкта, а дає лише загальний текстовий опис типу." },
      { id: "js-post-missing-header-find-bug", kind: "find-the-bug", prompt: "У чому потенційна проблема цього коду?", code: `fetch("/api/orders", {\n  method: "POST",\n  body: JSON.stringify(order),\n});`, solution: "JSON.stringify(order) коректно перетворює order на JSON-рядок, але відсутній заголовок headers: { \"Content-Type\": \"application/json\" } — без нього сервер може не розпізнати формат тіла й не розібрати його як JSON автоматично, навіть якщо сам текст валідний." },
      { id: "js-post-method-choice", kind: "choice", prompt: "Яке значення method потрібно вказати, щоб fetch надіслав POST-запит?", options: ["method: \"GET\"", "method: \"POST\"", "method не потрібен, POST за замовчуванням", "type: \"POST\""], correctAnswer: "method: \"POST\"", solution: "fetch за замовчуванням надсилає GET — метод POST потрібно вказати явно через options.method: \"POST\" у другому аргументі fetch." },
      { id: "js-post-body-explain", kind: "explain", prompt: "Поясни, чому body завжди має бути рядком (чи FormData), а не сирим JS-обʼєктом.", solution: "HTTP-запит передається по мережі як послідовність байтів, а не як структура даних JavaScript у памʼяті — тіло запиту фізично має бути текстом (чи бінарними даними для FormData/Blob). JSON.stringify() перетворює JS-обʼєкт на такий текстовий формат (JSON), який і сервер, і мережевий протокол розуміють, тоді як сирий обʼєкт не має однозначного текстового представлення для передачі." },
      { id: "js-post-rewrite", kind: "rewrite", prompt: "Перепиши функцію так, щоб вона надсилала товар через POST з правильним body і заголовком.", code: `function createProduct(product) {\n  return fetch("/api/products", {\n    method: "POST",\n    body: product,\n  }).then((res) => res.json());\n}`, solution: `function createProduct(product) {\n  return fetch("/api/products", {\n    method: "POST",\n    headers: { "Content-Type": "application/json" },\n    body: JSON.stringify(product),\n  }).then((res) => res.json());\n}\n// тепер сервер отримує коректний JSON з реальними полями product` },
    ],
  },

  "Обробка HTTP-статусів": {
    whatIsIt: "fetch() відхиляє (rejects) свій Promise ЛИШЕ при реальному збої мережі (сервер недоступний, немає зʼєднання) — для HTTP-помилок (404 \"не знайдено\", 500 \"помилка сервера\") Promise ВСЕ ОДНО виконується успішно (fulfilled), просто з response.ok === false і відповідним response.status. Тому перевірка response.ok — обовʼязковий, окремий крок, без якого код помилково вважає 404/500 успішним запитом.",
    whyUseIt: "Без явної перевірки response.ok сторінка товару, якого не існує (404), чи тимчасовий збій сервера (500) виглядатимуть як \"успішне\" завантаження з незрозумілим чи порожнім вмістом — користувач бачить зламаний інтерфейс замість зрозумілого повідомлення про помилку. Перевірка статусу — межа між \"технічно отримали відповідь\" і \"отримали дані, якими можна користуватись\".",
    whenToUse: ["Одразу після await fetch(...), перед спробою читати response.json() чи response.text().", "Коли потрібно показати різні повідомлення для різних кодів (404 — \"не знайдено\", 401 — \"увійдіть в акаунт\", 500 — \"помилка сервера\").", "Перед тим, як довіряти вмісту відповіді в подальшій логіці застосунку."],
    whenNotToUse: ["Не покладайся на try/catch навколо fetch() як на перевірку HTTP-помилок — catch спрацює лише при реальному збої мережі, а НЕ для 404/500.", "Не читай response.json() ОДРАЗУ без перевірки response.ok — тіло помилки (сторінка 404) може бути не тим форматом, що очікує код.", "Не показуй користувачу сирий технічний response.status без зрозумілого, людського повідомлення поруч."],
    comparisonTable: {
      headers: ["Ситуація", "Чи відхиляється Promise від fetch?"],
      rows: [
        ["Сервер недоступний / немає мережі", "Так — .catch()/try-catch ловить це"],
        ["Сервер відповів 404 (не знайдено)", "Ні — Promise fulfilled, response.ok === false"],
        ["Сервер відповів 500 (помилка сервера)", "Ні — Promise fulfilled, response.ok === false"],
        ["Сервер відповів 200 (успіх)", "Ні — Promise fulfilled, response.ok === true"],
      ],
    },
    codeWalkthroughs: [
      {
        before: "Реальний, підступний факт: fetch НЕ кидає помилку для 404 — Promise все одно fulfilled:",
        code: `const response = await fetch("/api/products/9999"); // товару з таким id немає

console.log(response.ok); // false
console.log(response.status); // 404
// Але жодної помилки не кинуто — код продовжує виконуватись як зазвичай`,
        lineNotes: ["response.ok === false і response.status === 404 повідомляють про помилку, але сам await fetch(...) успішно завершився без винятку.", "Це найпідступніший факт про fetch: HTTP-помилка — це НЕ те саме, що збій мережі, і код мовчки продовжить виконання, якщо не перевірити response.ok явно."],
      },
      {
        before: "Правильна перевірка response.ok перед довірою до даних:",
        code: `async function loadProduct(id) {
  const response = await fetch(\`/api/products/\${id}\`);

  if (!response.ok) {
    throw new Error(\`Помилка \${response.status}: товар не знайдено\`);
  }

  return response.json();
}`,
        lineNotes: ["if (!response.ok) перевіряється ОДРАЗУ після fetch, ДО спроби читати response.json() — це запобігає роботі з потенційно некоректним чи неочікуваним тілом помилки.", "throw new Error(...) перетворює HTTP-помилку на звичайну JS-помилку, яку можна поймати через try/catch (з попереднього модуля) у викликаючому коді."],
      },
      {
        before: "Реальний приклад: різні повідомлення залежно від конкретного коду статусу:",
        code: `async function loadProfile(userId) {
  const response = await fetch(\`/api/users/\${userId}\`);

  if (response.status === 401) {
    throw new Error("Спочатку увійдіть в акаунт");
  }
  if (response.status === 404) {
    throw new Error("Користувача не знайдено");
  }
  if (!response.ok) {
    throw new Error(\`Помилка сервера: \${response.status}\`);
  }

  return response.json();
}`,
        lineNotes: ["Конкретні коди (401, 404) перевіряються ПЕРШИМИ для точних, зрозумілих повідомлень — загальна перевірка !response.ok лишається для решти можливих помилок.", "Це той самий принцип guard-конструкцій з модуля \"Керування потоком\": найспецифічніші перевірки — першими."],
      },
      {
        before: "Реальний баг: спроба поймати HTTP-помилку через try/catch без перевірки response.ok:",
        code: `async function loadProductBroken(id) {
  try {
    const response = await fetch(\`/api/products/\${id}\`);
    const product = await response.json(); // виконається НАВІТЬ для 404!
    return product;
  } catch (error) {
    console.error("Це НЕ спрацює для 404:", error.message);
  }
}
// Для неіснуючого товару catch НЕ виконається — response.json() спробує
// розібрати тіло 404-сторінки як звичайні дані товару`,
        lineNotes: ["catch тут ловить лише РЕАЛЬНІ збої (немає мережі, невалідний JSON у відповіді) — сам факт response.status === 404 не кидає жодної помилки, яку catch міг би поймати.", "response.json() для 404-відповіді спробує розібрати тіло помилки сервера (яке може бути сторінкою \"Not Found\" чи іншим форматом) як дані товару — результат буде некоректним чи взагалі кине помилку розбору."],
        after: "try/catch і перевірка response.ok вирішують РІЗНІ проблеми: catch — для збоїв мережі, response.ok — для HTTP-помилок з боку сервера. Потрібні обидва.",
      },
    ],
    commonMistakes: ["Покладатись на try/catch як на єдину обробку помилок fetch — catch не ловить 404/500.", "Читати response.json() без попередньої перевірки response.ok.", "Показувати користувачу сирий response.status без людського пояснення.", "Забувати, що успішний HTTP-статус (200) не гарантує коректний ФОРМАТ даних у відповіді — response.ok перевіряє лише код статусу."],
    dontDoThis: { code: `async function loadUser(id) {\n  try {\n    const response = await fetch(\`/api/users/\${id}\`);\n    return await response.json(); // БАГ: немає перевірки response.ok\n  } catch (error) {\n    return null; // НЕ спрацює для 404 — response.json() поверне щось дивне замість помилки\n  }\n}`, explanation: "Для неіснуючого користувача (404) fetch НЕ кидає помилку — response.ok просто дорівнює false, а response.json() спробує розібрати тіло помилки сервера як обʼєкт користувача. catch тут спрацює лише для реального збою мережі, а не для цієї ситуації — функція поверне якесь неочікуване значення замість зрозумілого null чи повідомлення про помилку. Потрібна явна перевірка if (!response.ok) перед response.json()." },
    bestPractices: ["Перевіряй response.ok ОДРАЗУ після fetch, перед будь-яким читанням тіла відповіді.", "Кидай звичайну JS-помилку (throw new Error(...)) для неуспішних статусів, щоб її можна було поймати через try/catch далі.", "Перевіряй конкретні коди статусу (401, 404) окремо, коли потрібні різні, специфічні повідомлення.", "Пам'ятай: try/catch ловить збої мережі, response.ok — HTTP-помилки сервера; потрібні обидва механізми разом."],
    remember: ["fetch відхиляє Promise лише при збої мережі — НЕ для 404/500.", "response.ok === true для статусів 200-299, false для решти.", "Перевіряй response.ok ОДРАЗУ після fetch, до response.json().", "try/catch і перевірка response.ok вирішують різні проблеми — потрібні обидва."],
    interviewQuestions: [
      { question: "Чи кидає fetch помилку, якщо сервер повернув статус 404?", answer: "Ні. fetch відхиляє свій Promise лише при реальному збої мережі (сервер недоступний, немає зʼєднання). Для HTTP-помилок, включно з 404 і 500, Promise все одно виконується успішно (fulfilled) — потрібно окремо перевіряти response.ok чи response.status, щоб дізнатись про такі помилки." },
      { question: "Що означає response.ok === true чи false?", answer: "response.ok — булеве значення, true для статусів у діапазоні 200-299 (успіх) і false для всіх інших (4xx помилки клієнта, 5xx помилки сервера). Це найшвидший спосіб перевірити \"чи запит реально вдався\", не аналізуючи точний числовий код response.status." },
      { question: "Чому catch (error) { ... } навколо fetch не ловить помилку 404?", answer: "404 — це успішно ОТРИМАНА відповідь від сервера (просто з негативним змістом \"не знайдено\"), а не збій виконання коду чи мережі. fetch не кидає й не відхиляє Promise для таких статусів, тому catch, який реагує саме на відхилені проміси, просто не спрацьовує в цій ситуації — потрібна окрема перевірка response.ok." },
      { question: "Як правильно перетворити HTTP-помилку (404/500) на щось, що можна поймати через try/catch?", answer: "Явним throw new Error(...) одразу після перевірки if (!response.ok) — це створює звичайну JS-помилку, яка вже поводиться як очікує try/catch: розповсюджується вгору, доки не буде поймана catch-блоком у викликаючому коді, точно як помилка з попереднього модуля про обробку помилок." },
    ],
    summary: "fetch відхиляє Promise лише при реальному збої мережі — HTTP-помилки (404, 500) не кидають помилку самі по собі, лише дають response.ok === false. Перевірка response.ok одразу після fetch, перед читанням тіла відповіді, — обовʼязковий крок; для перетворення на звичайну помилку, яку зловить try/catch, використовується явний throw new Error(...).",
    proTip: "Якщо застосунок \"мовчки ламається\" чи показує дивний вміст для неіснуючих даних (видалений товар, неправильний ID) — перша підозра: десь відсутня перевірка response.ok перед response.json().",
    nextLessonNote: "Далі — патерни LocalStorage: як зберігати дані локально в браузері між сеансами, без сервера.",
    interactiveDemo: "http-status-demo",
    practiceTask: {
      title: "Додай перевірку response.ok до функції завантаження товару",
      description: "Функція loadProduct читає response.json() без перевірки статусу, тому для неіснуючого товару (404) вона намагається розібрати сторінку помилки як дані товару. Додай перевірку response.ok.",
      checklist: ["Для успішного запиту (200) функція повертає реальні дані товару.", "Для 404 функція кидає зрозумілу помилку замість спроби розібрати некоректні дані.", "Використано if (!response.ok) перед response.json()."],
      starterFiles: [
        {
          id: "js-http-status-start",
          path: "script.js",
          language: "javascript",
          label: "script.js",
          code: `async function loadProduct(id) {
  const response = await fetch(\`/api/products/\${id}\`);
  return response.json(); // БАГ: немає перевірки response.ok
}

loadProduct(9999); // товару з таким id не існує
`,
        },
      ],
      solutionFiles: [
        {
          id: "js-http-status-solution",
          path: "script.js",
          language: "javascript",
          label: "script.js",
          code: `async function loadProduct(id) {
  const response = await fetch(\`/api/products/\${id}\`);

  if (!response.ok) {
    throw new Error(\`Товар не знайдено (статус \${response.status})\`);
  }

  return response.json();
}

loadProduct(9999); // тепер кидає зрозумілу помилку замість спроби розібрати 404-сторінку
`,
          readOnly: true,
        },
      ],
      hints: ["response.ok дорівнює false для 404, навіть коли fetch не кидає жодної помилки сам по собі.", "Додай if (!response.ok) { throw new Error(...); } одразу після await fetch(...)."],
      expectedOutput: "Для id 9999 кидається помилка \"Товар не знайдено (статус 404)\" замість спроби прочитати некоректні дані",
    },
    microExercises: [
      { id: "js-status-ok-predict", kind: "predict", prompt: "Чи буде викликано catch у цьому коді для відповіді зі статусом 500?", code: `try {\n  const response = await fetch("/api/data");\n  console.log(response.status);\n} catch (error) {\n  console.log("Помилка:", error.message);\n}`, solution: "Ні — навіть для статусу 500 fetch не кидає помилку, тому console.log(response.status) виконається нормально (виведе 500), а catch не спрацює взагалі. Помилку потрібно кинути ЯВНО через перевірку response.ok." },
      { id: "js-status-trycatch-find-bug", kind: "find-the-bug", prompt: "У чому проблема цього підходу до обробки помилок?", code: `async function loadData() {\n  try {\n    const response = await fetch("/api/data");\n    return await response.json();\n  } catch {\n    return "Помилка завантаження";\n  }\n}`, solution: "catch спрацює лише при реальному збої мережі, а не для HTTP-помилок (404/500) — для таких статусів response.json() виконається (можливо, з некоректними чи неочікуваними даними), а catch взагалі не буде викликаний. Потрібна явна перевірка if (!response.ok) { throw new Error(...); } перед response.json()." },
      { id: "js-status-range-choice", kind: "choice", prompt: "Для якого діапазону статусів response.ok дорівнює true?", options: ["100-199", "200-299", "300-399", "400-599"], correctAnswer: "200-299", solution: "response.ok — true рівно для статусів 200-299 (успішні відповіді). Усі інші діапазони (перенаправлення, помилки клієнта, помилки сервера) дають response.ok === false." },
      { id: "js-status-network-explain", kind: "explain", prompt: "Поясни різницю між \"збоєм мережі\" і \"HTTP-помилкою\" з точки зору fetch.", solution: "Збій мережі (сервер недоступний, обірване зʼєднання, немає інтернету) означає, що запит взагалі НЕ отримав відповіді — саме тоді fetch відхиляє свій Promise, і це ловить try/catch. HTTP-помилка (404, 500) означає, що відповідь РЕАЛЬНО прийшла від сервера, просто з кодом, що сигналізує проблему — Promise від fetch все одно fulfilled, і про таку помилку дізнаються лише через явну перевірку response.ok чи response.status." },
      { id: "js-status-specific-rewrite", kind: "rewrite", prompt: "Перепиши функцію так, щоб вона давала окреме повідомлення для 401 і загальне для решти неуспішних статусів.", code: `async function loadSecretData() {\n  const response = await fetch("/api/secret");\n  if (!response.ok) {\n    throw new Error("Помилка");\n  }\n  return response.json();\n}`, solution: `async function loadSecretData() {\n  const response = await fetch("/api/secret");\n  if (response.status === 401) {\n    throw new Error("Спочатку увійдіть в акаунт");\n  }\n  if (!response.ok) {\n    throw new Error(\`Помилка сервера: \${response.status}\`);\n  }\n  return response.json();\n}\n// 401 перевіряється першим, найспецифічніше, як guard-конструкція` },
    ],
  },

  "Патерни LocalStorage": {
    whatIsIt: "localStorage — вбудоване сховище браузера для пар ключ-значення, де і ключ, і значення завжди РЯДКИ. Дані зберігаються локально на пристрої користувача, синхронно (без Promise), і залишаються між перезавантаженнями сторінки й навіть закриттям браузера, доки їх явно не видалити. localStorage.setItem(key, value)/getItem(key)/removeItem(key)/clear() — основні методи для запису, читання, видалення одного значення й повного очищення.",
    whyUseIt: "Тема оформлення (світла/темна), вміст кошика між візитами, чернетка недописаного коментаря — усе це дані, які варто зберегти локально, без сервера й без втрати при перезавантаженні сторінки. localStorage — найпростіший вбудований спосіб це зробити, доступний у будь-якому браузері без додаткових бібліотек.",
    whenToUse: ["Невеликі, несекретні дані користувацьких налаштувань (тема, мова, розмір шрифту).", "Локальний кошик чи список \"обраного\", що має зберігатись між візитами без входу в акаунт.", "Чернетки форм, щоб не втратити введений текст при випадковому закритті вкладки."],
    whenNotToUse: ["Не зберігай паролі, токени авторизації чи інші чутливі дані — localStorage доступний будь-якому JS-коду на сторінці, включно з потенційно шкідливим (XSS-ризик).", "Не зберігай обʼєкти/масиви напряму без JSON.stringify() — localStorage приймає лише рядки.", "Не покладайся на localStorage для великих обсягів даних — типовий ліміт браузера близько 5-10 МБ на весь домен."],
    comparisonTable: {
      headers: ["Метод", "Дія"],
      rows: [
        ["localStorage.setItem(key, value)", "зберігає значення (рядок) за ключем"],
        ["localStorage.getItem(key)", "повертає рядок за ключем, або null, якщо ключа немає"],
        ["localStorage.removeItem(key)", "видаляє одне значення за ключем"],
        ["localStorage.clear()", "видаляє АБСОЛЮТНО ВСІ дані цього домену в localStorage"],
      ],
    },
    codeWalkthroughs: [
      {
        before: "Базовий запис і читання рядкового значення:",
        code: `localStorage.setItem("theme", "dark");

const theme = localStorage.getItem("theme");
console.log(theme); // "dark"

const missing = localStorage.getItem("nonexistent");
console.log(missing); // null — ключа немає, а не помилка`,
        lineNotes: ["setItem завжди зберігає значення КАК РЯДОК, навіть якщо передати щось інше — воно буде приведене до рядка.", "getItem для відсутнього ключа повертає null, а НЕ кидає помилку — це треба враховувати, читаючи значення."],
      },
      {
        before: "Зберігання обʼєкта чи масиву вимагає JSON.stringify() — localStorage приймає лише рядки:",
        code: `const cart = [{ name: "Кава", price: 65, quantity: 2 }];

localStorage.setItem("cart", JSON.stringify(cart));

const raw = localStorage.getItem("cart");
console.log(raw); // '[{"name":"Кава","price":65,"quantity":2}]' — це РЯДОК

const restored = JSON.parse(raw);
console.log(restored[0].name); // "Кава" — тепер реальний масив обʼєктів`,
        lineNotes: ["JSON.stringify(cart) перетворює масив обʼєктів у JSON-рядок ПЕРЕД збереженням — без цього кроку localStorage.setItem зберіг би щось на кшталт \"[object Object]\".", "Прочитаний raw — це просто рядок; JSON.parse(raw) потрібен, щоб повернути реальний масив, з яким можна працювати як зі звичайними даними (наприклад, restored[0].name)."],
      },
      {
        before: "Реальний баг: збереження обʼєкта без JSON.stringify():",
        code: `const settings = { theme: "dark", fontSize: 16 };

localStorage.setItem("settings", settings); // БАГ: немає JSON.stringify()

console.log(localStorage.getItem("settings")); // "[object Object]" — реальні дані втрачені`,
        lineNotes: ["localStorage.setItem приводить будь-яке нерядкове значення до рядка автоматично — для обʼєкта це завжди дає безглузде \"[object Object]\".", "Оригінальні поля theme і fontSize НІКУДИ не потрапляють у це рядкове представлення — дані фактично втрачені, хоча помилки при цьому не було."],
        after: "Правило таке саме, як для fetch body: обʼєкт завжди JSON.stringify() перед localStorage.setItem, і JSON.parse() після localStorage.getItem.",
      },
      {
        before: "Повне видалення одного значення чи всього сховища:",
        code: `localStorage.setItem("draft", "Текст коментаря...");
localStorage.setItem("theme", "dark");

localStorage.removeItem("draft"); // видаляє лише "draft"
console.log(localStorage.getItem("theme")); // "dark" — не торкнулось

localStorage.clear(); // видаляє АБСОЛЮТНО ВСЕ для цього домену
console.log(localStorage.getItem("theme")); // null — тепер видалено й це`,
        lineNotes: ["removeItem(\"draft\") видаляє ЛИШЕ вказаний ключ — інші значення (theme) лишаються недоторканими.", "clear() — це видалення УСЬОГО сховища домену без винятків; використовувати обережно, зазвичай лише для явного \"скидання\" (наприклад, вихід з акаунту)."],
      },
    ],
    commonMistakes: ["Зберігання обʼєкта/масиву напряму без JSON.stringify() — дані втрачаються як \"[object Object]\".", "Забутий JSON.parse() при читанні — робота з рядком замість реального обʼєкта.", "Зберігання чутливих даних (токени, паролі) в localStorage — доступний будь-якому JS на сторінці.", "Виклик localStorage.clear(), коли потрібно видалити лише ОДНЕ значення (removeItem)."],
    dontDoThis: { code: `const user = { name: "Ірина", role: "admin" };\nlocalStorage.setItem("currentUser", user); // БАГ: не JSON.stringify()\n\nconst loaded = localStorage.getItem("currentUser");\nconsole.log(loaded.name); // undefined — loaded це рядок "[object Object]", не обʼєкт`, explanation: "localStorage.setItem зберігає лише рядки — переданий напряму обʼєкт user приводиться до рядка \"[object Object]\", і реальні поля name/role повністю втрачаються. loaded — це рядок, у рядків немає властивості .name, тому результат undefined. Правильно: localStorage.setItem(\"currentUser\", JSON.stringify(user)); і потім const loaded = JSON.parse(localStorage.getItem(\"currentUser\"));." },
    bestPractices: ["Завжди обгортай обʼєкти/масиви в JSON.stringify() перед localStorage.setItem().", "Завжди обгортай прочитане значення в JSON.parse(), якщо зберігав через JSON.stringify().", "Ніколи не зберігай паролі, токени авторизації чи іншу чутливу інформацію в localStorage.", "Використовуй removeItem() для видалення ОДНОГО значення; clear() лише коли справді потрібно видалити геть усе."],
    remember: ["localStorage зберігає лише рядки — обʼєкти потребують JSON.stringify()/JSON.parse().", "getItem() для відсутнього ключа повертає null, а не помилку.", "Дані зберігаються між перезавантаженнями й закриттям браузера, доки не видалені явно.", "Ніколи не зберігай чутливі дані — localStorage доступний будь-якому JS-коду на сторінці."],
    interviewQuestions: [
      { question: "Якого типу дані можна зберігати в localStorage напряму?", answer: "Лише рядки (string). Будь-яке інше значення (число, обʼєкт, масив, булеве значення), передане в setItem, буде автоматично приведене до рядка — для примітивів це часто дає прийнятний результат (наприклад, true стає \"true\"), але для обʼєктів/масивів дає марне \"[object Object]\", тому їх завжди потрібно спершу перетворити через JSON.stringify()." },
      { question: "Що поверне localStorage.getItem(\"key\"), якщо такого ключа немає?", answer: "null. Це нормальна, очікувана поведінка, а не помилка — код, що читає значення з localStorage, повинен враховувати можливість null (наприклад, через значення за замовчуванням чи явну перевірку), перш ніж намагатись розібрати чи використати результат." },
      { question: "Чому не варто зберігати токен авторизації в localStorage?", answer: "localStorage доступний БУДЬ-ЯКОМУ JavaScript-коду, що виконується на сторінці — включно з шкідливим кодом, впровадженим через XSS-вразливість (наприклад, невдало відрендерений коментар користувача з innerHTML). Якщо токен опиниться в localStorage, зловмисний скрипт зможе його прочитати й використати від імені користувача." },
      { question: "У чому різниця між removeItem() і clear()?", answer: "removeItem(key) видаляє ЛИШЕ одне конкретне значення за вказаним ключем, залишаючи решту даних недоторканими. clear() видаляє АБСОЛЮТНО ВСІ дані localStorage для поточного домену без винятків — це набагато радикальніша дія, яку варто використовувати обережно, зазвичай лише при повному скиданні стану (наприклад, виході з акаунту)." },
    ],
    summary: "localStorage.setItem/getItem/removeItem/clear() — вбудоване сховище пар ключ-значення, де і ключ, і значення завжди рядки. Обʼєкти й масиви потребують JSON.stringify() перед записом і JSON.parse() після читання. Дані живуть між перезавантаженнями сторінки, доки не видалені явно, — але ніколи не варто зберігати в них паролі чи токени через доступність будь-якому JS-коду на сторінці.",
    proTip: "Якщо localStorage.getItem(\"...\").name (чи будь-яка властивість) дає undefined — перша перевірка: чи не забутий JSON.parse() навколо прочитаного рядка.",
    nextLessonNote: "Далі — розбір JSON: детальніше про JSON.parse()/JSON.stringify(), їхні межі й типові помилки з пошкодженими даними.",
    interactiveDemo: "localstorage-demo",
    practiceTask: {
      title: "Виправ збереження кошика без JSON.stringify()",
      description: "Функція saveCart зберігає масив товарів напряму в localStorage без JSON.stringify(), через що дані втрачаються як \"[object Object]\". Виправ збереження й читання.",
      checklist: ["saveCart зберігає кошик через JSON.stringify().", "loadCart читає збережене значення через JSON.parse() і повертає реальний масив.", "Порожній кошик (localStorage без цього ключа) повертає порожній масив, а не помилку."],
      starterFiles: [
        {
          id: "js-localstorage-start",
          path: "script.js",
          language: "javascript",
          label: "script.js",
          code: `function saveCart(cart) {
  localStorage.setItem("cart", cart); // БАГ: немає JSON.stringify()
}

function loadCart() {
  const raw = localStorage.getItem("cart");
  return raw; // БАГ: повертає рядок, а не масив
}

saveCart([{ name: "Кава", price: 65 }]);
console.log(loadCart());
`,
        },
      ],
      solutionFiles: [
        {
          id: "js-localstorage-solution",
          path: "script.js",
          language: "javascript",
          label: "script.js",
          code: `function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function loadCart() {
  const raw = localStorage.getItem("cart");
  return raw ? JSON.parse(raw) : [];
}

saveCart([{ name: "Кава", price: 65 }]);
console.log(loadCart());
`,
          readOnly: true,
        },
      ],
      hints: ["localStorage зберігає лише рядки — масив потребує JSON.stringify() перед setItem.", "raw ? JSON.parse(raw) : [] безпечно обробляє і збережені дані, і випадок, коли ключа взагалі немає (raw === null)."],
      expectedOutput: "[{ name: \"Кава\", price: 65 }] — реальний масив, а не рядок \"[object Object]\"",
    },
    microExercises: [
      { id: "js-localstorage-string-predict", kind: "predict", prompt: "Що виведе цей код?", code: `localStorage.setItem("count", 5);\nconst value = localStorage.getItem("count");\nconsole.log(typeof value);`, solution: "\"string\" — localStorage завжди зберігає й повертає рядки, навіть якщо збережене значення виглядало як число. Потрібен Number(value), щоб отримати реальне число 5." },
      { id: "js-localstorage-object-find-bug", kind: "find-the-bug", prompt: "У чому проблема цього коду?", code: `const prefs = { theme: "dark" };\nlocalStorage.setItem("prefs", prefs);\nconsole.log(localStorage.getItem("prefs").theme);`, solution: "prefs передається в setItem без JSON.stringify(), тому зберігається як рядок \"[object Object]\" — реальні поля обʼєкта втрачені. localStorage.getItem(\"prefs\") повертає цей рядок, у якого немає властивості .theme, тому результат undefined. Потрібно: JSON.stringify(prefs) при збереженні і JSON.parse(...) при читанні." },
      { id: "js-localstorage-getitem-choice", kind: "choice", prompt: "Що поверне localStorage.getItem(\"missing-key\"), якщо такого ключа ще ніколи не було встановлено?", options: ["undefined", "null", "\"\" (порожній рядок)", "кидає помилку"], correctAnswer: "null", solution: "getItem для відсутнього ключа повертає саме null, а не undefined чи порожній рядок, і точно не кидає помилку — це важливо враховувати при написанні коду, що читає значення." },
      { id: "js-localstorage-security-explain", kind: "explain", prompt: "Поясни, чому localStorage не підходить для зберігання токена авторизації.", solution: "localStorage повністю доступний будь-якому JavaScript-коду, що виконується на цій сторінці — включно з потенційно шкідливим кодом, який міг потрапити туди через XSS-вразливість (наприклад, невдало відрендерений вміст від іншого користувача через innerHTML). Якщо токен авторизації зберігається в localStorage, такий шкідливий код зможе його прочитати й використати для видавання себе за реального користувача перед сервером." },
      { id: "js-localstorage-remove-rewrite", kind: "rewrite", prompt: "Перепиши функцію так, щоб вона видаляла лише конкретний товар з localStorage, а не очищала все сховище.", code: `function clearDraft() {\n  localStorage.clear(); // видаляє АБСОЛЮТНО ВСЕ, а не лише чернетку\n}`, solution: `function clearDraft() {\n  localStorage.removeItem("draft");\n}\n// removeItem видаляє лише вказаний ключ, залишаючи решту даних (theme, cart тощо) недоторканими` },
    ],
  },

  "Розбір JSON": {
    whatIsIt: "JSON.parse(text) перетворює JSON-текст (рядок) на реальне значення JavaScript — обʼєкт, масив, число, рядок чи булеве значення. JSON.stringify(value) робить зворотне: перетворює JS-значення на JSON-текст. JSON підтримує лише прості дані: обʼєкти, масиви, рядки, числа, true/false, null — функції та undefined при stringify() просто ПРОПУСКАЮТЬСЯ (не викликають помилку, а зникають з результату), а JSON.parse() на невалідному тексті кидає SyntaxError.",
    whyUseIt: "Відповідь fetch (попередні уроки), дані в localStorage — усе це JSON-текст, який потрібно розібрати в реальні JS-значення, перш ніж з ними працювати. Розуміння МЕЖ JSON (що саме він підтримує, а що втрачається) і того, що JSON.parse() може кинути помилку на пошкоджених даних, рятує від тихих багів і необроблених крашів застосунку.",
    whenToUse: ["Розбір відповіді сервера (response.json() робить це автоматично, але явний JSON.parse() потрібен, наприклад, для localStorage).", "Перетворення JS-обʼєкта на текст для збереження (localStorage) чи відправки (fetch body).", "Клонування простого обʼєкта/масиву через JSON.parse(JSON.stringify(obj)) — працює лише для даних без функцій, undefined чи циклічних посилань."],
    whenNotToUse: ["Не викликай JSON.parse() на даних з ЗОВНІШНЬОГО чи ненадійного джерела (localStorage, що міг бути вручну змінений) без try/catch — пошкоджений текст кидає SyntaxError.", "Не очікуй, що JSON.stringify() збереже функції, undefined чи Symbol у обʼєкті — вони мовчки пропускаються з результату.", "Не використовуй JSON.parse(JSON.stringify(obj)) для обʼєктів з циклічними посиланнями (обʼєкт посилається сам на себе) — це кине помилку ще на етапі stringify()."],
    comparisonTable: {
      headers: ["Функція", "Напрямок"],
      rows: [
        ["JSON.parse(text)", "текст (рядок) -> реальне значення JS"],
        ["JSON.stringify(value)", "значення JS -> текст (рядок)"],
        ["JSON.parse(зламаний текст)", "кидає SyntaxError"],
        ["JSON.stringify({ fn: () => {} })", "властивість fn мовчки ЗНИКАЄ з результату"],
      ],
    },
    codeWalkthroughs: [
      {
        before: "Базовий round-trip: обʼєкт -> JSON-текст -> знову обʼєкт:",
        code: `const product = { name: "Кава", price: 65, tags: ["новинка", "хіт"] };

const text = JSON.stringify(product);
console.log(text); // '{"name":"Кава","price":65,"tags":["новинка","хіт"]}'
console.log(typeof text); // "string"

const restored = JSON.parse(text);
console.log(restored.tags[0]); // "новинка" — знову реальний масив, доступний за індексом`,
        lineNotes: ["JSON.stringify(product) дає РЯДОК — навіть якщо він виглядає як обʼєкт у фігурних дужках, typeof text дає \"string\", а не \"object\".", "JSON.parse(text) повертає новий, повністю окремий обʼєкт з тим самим вмістом — restored не є тим самим обʼєктом у памʼяті, що й оригінальний product."],
      },
      {
        before: "JSON.stringify() мовчки пропускає функції та undefined — це не помилка, а особливість формату:",
        code: `const user = {
  name: "Олег",
  greet: function () { return "Привіт"; },
  age: undefined,
  city: "Львів",
};

console.log(JSON.stringify(user)); // '{"name":"Олег","city":"Львів"}' — greet і age зникли!`,
        lineNotes: ["greet (функція) і age (undefined) повністю ВІДСУТНІ в результаті — JSON не має способу представити ці значення, тому JSON.stringify() просто пропускає такі властивості, без помилки чи попередження.", "Якщо потрібно зберегти greet чи age, доведеться зберігати їх окремо від JSON-представлення — сам JSON для цього не підходить."],
      },
      {
        before: "JSON.parse() на пошкодженому тексті кидає справжню помилку — потрібен try/catch:",
        code: `const corrupted = "{name: 'Кава'"; // невалідний JSON: без лапок навколо ключа, незакрита дужка

try {
  const data = JSON.parse(corrupted);
} catch (error) {
  console.error("Не вдалося розібрати JSON:", error.message);
}`,
        lineNotes: ["JSON вимагає СУВОРОГО формату: подвійні лапки навколо ключів і рядків, закриті дужки — навіть незначне відхилення (одинарні лапки, зайва кома) кидає SyntaxError.", "Це особливо важливо для даних з ЗОВНІШНЬОГО джерела (пошкоджений localStorage, зіпсована відповідь сервера) — JSON.parse() без try/catch може \"впасти\" й зупинити виконання всього коду."],
      },
      {
        before: "Реальний приклад: безпечне читання пошкоджених даних кошика з localStorage:",
        code: `function loadCartSafely() {
  const raw = localStorage.getItem("cart");
  if (!raw) return [];

  try {
    return JSON.parse(raw);
  } catch (error) {
    console.error("Пошкоджені дані кошика, скидаю до порожнього:", error.message);
    return [];
  }
}`,
        lineNotes: ["if (!raw) return []; — guard-конструкція для випадку, коли ключа взагалі немає (localStorage.getItem дав null).", "try/catch навколо JSON.parse(raw) захищає від СПРАВЖНЬОГО збою, якщо дані в localStorage якимось чином пошкоджені (наприклад, вручну відредаговані користувачем через DevTools)."],
      },
    ],
    commonMistakes: ["JSON.parse() без try/catch на даних із зовнішнього чи ненадійного джерела.", "Очікування, що JSON.stringify() збереже функції, undefined чи Symbol у обʼєкті.", "Плутанина: думати, що JSON.stringify(value) дає обʼєкт, хоча насправді typeof результату завжди \"string\".", "Спроба JSON.stringify() на обʼєкті з циклічним посиланням (обʼєкт містить посилання сам на себе) — кидає TypeError."],
    dontDoThis: { code: `function loadSettings() {\n  const raw = localStorage.getItem("settings");\n  return JSON.parse(raw); // БАГ: немає try/catch і перевірки на null\n}`, explanation: "Дві проблеми одразу: якщо ключа \"settings\" ще немає, raw дорівнює null, а JSON.parse(null) фактично розбирає рядок \"null\" (дає значення null, не кидаючи помилку тут) — та якщо дані пошкоджені (наприклад, хтось вручну змінив їх у DevTools), JSON.parse кине SyntaxError, який ніхто не ловить, і застосунок \"впаде\" з необробленою помилкою. Потрібні і перевірка на відсутність ключа, і try/catch навколо самого розбору." },
    bestPractices: ["Завжди обгортай JSON.parse() у try/catch, якщо дані походять із зовнішнього чи потенційно пошкодженого джерела (localStorage, відповідь стороннього API).", "Перевіряй результат localStorage.getItem() на null ПЕРЕД спробою JSON.parse() нього.", "Пам'ятай, що JSON.stringify() мовчки пропускає функції/undefined — не покладайся на JSON для збереження всього обʼєкта, якщо там є такі поля.", "Використовуй JSON.parse(JSON.stringify(obj)) для швидкого глибокого клонування простих даних (без функцій і циклічних посилань), а не для складних обʼєктів."],
    remember: ["JSON.parse(текст) -> значення JS; JSON.stringify(значення) -> текст — завжди рядок.", "JSON.stringify() мовчки пропускає функції, undefined і Symbol — це не помилка, а межа формату.", "JSON.parse() на невалідному тексті кидає SyntaxError — обгортай у try/catch для зовнішніх даних.", "JSON підтримує лише прості дані: обʼєкти, масиви, рядки, числа, true/false, null."],
    interviewQuestions: [
      { question: "Що станеться, якщо викликати JSON.stringify() на обʼєкті з методом (функцією)?", answer: "Властивість-функція буде повністю ВІДСУТНЯ в результуючому JSON-тексті — JSON.stringify() мовчки пропускає функції (і undefined, і Symbol), без помилки чи попередження, бо формат JSON не має способу представити ці типи значень." },
      { question: "Чому JSON.parse() варто обгортати в try/catch для даних з localStorage?", answer: "Дані в localStorage можуть бути пошкоджені (вручну змінені через DevTools, залишок від старої версії формату даних, чи навіть просто відсутні). JSON.parse() на невалідному JSON-тексті кидає SyntaxError — без try/catch ця помилка зупинить виконання коду непередбачувано, замість того щоб дозволити застосунку коректно обробити ситуацію (наприклад, скинути дані до значення за замовчуванням)." },
      { question: "Чи можна безпечно клонувати ЛЮБИЙ обʼєкт через JSON.parse(JSON.stringify(obj))?", answer: "Ні. Цей прийом працює лише для \"простих\" даних, які повністю підтримує JSON: обʼєкти, масиви, рядки, числа, булеві значення, null. Функції та undefined всередині обʼєкта мовчки зникнуть у копії, а обʼєкт з циклічним посиланням (сам на себе) кине помилку ще на етапі JSON.stringify(), до будь-якого parse." },
      { question: "Яка різниця між typeof JSON.stringify(obj) і typeof obj?", answer: "typeof JSON.stringify(obj) завжди \"string\" — результат stringify це текстове представлення, незалежно від того, яким складним був вхідний obj. typeof obj натомість \"object\" (для обʼєктів і масивів) — це принципова різниця, яку легко забути, вважаючи, що stringify \"той самий обʼєкт, лише в іншому вигляді\"." },
    ],
    summary: "JSON.parse() перетворює JSON-текст на реальні JS-значення; JSON.stringify() робить зворотне, завжди повертаючи рядок. JSON підтримує лише прості дані — функції та undefined мовчки зникають при stringify(). JSON.parse() кидає SyntaxError на невалідному тексті, тому дані із зовнішніх джерел (localStorage, відповіді API) варто розбирати всередині try/catch.",
    proTip: "Якщо після \"клонування\" через JSON.parse(JSON.stringify(obj)) якась властивість зникла — перевір, чи не була вона функцією чи undefined: JSON просто не вміє їх зберігати.",
    nextLessonNote: "Далі — стани завантаження та помилки: як показати користувачу loading/success/empty/error замість порожнього чи \"зламаного\" екрана під час роботи з мережею.",
    interactiveDemo: "json-parse-demo",
    practiceTask: {
      title: "Захисти JSON.parse() пошкоджених даних кошика",
      description: "Функція loadCart викликає JSON.parse() без try/catch, тому пошкоджені дані в localStorage \"валять\" увесь застосунок необробленою помилкою. Додай try/catch з безпечним запасним значенням.",
      checklist: ["Коректні дані кошика розбираються й повертаються як реальний масив.", "Пошкоджені дані (невалідний JSON) не кидають необроблену помилку — повертається порожній масив.", "Помилка розбору логується в консоль через console.error для діагностики."],
      starterFiles: [
        {
          id: "js-json-parse-start",
          path: "script.js",
          language: "javascript",
          label: "script.js",
          code: `function loadCart() {
  const raw = localStorage.getItem("cart") ?? "[зламаний json";
  return JSON.parse(raw); // БАГ: немає try/catch
}

console.log(loadCart());
`,
        },
      ],
      solutionFiles: [
        {
          id: "js-json-parse-solution",
          path: "script.js",
          language: "javascript",
          label: "script.js",
          code: `function loadCart() {
  const raw = localStorage.getItem("cart") ?? "[зламаний json";

  try {
    return JSON.parse(raw);
  } catch (error) {
    console.error("Пошкоджені дані кошика:", error.message);
    return [];
  }
}

console.log(loadCart());
`,
          readOnly: true,
        },
      ],
      hints: ["JSON.parse() на невалідному тексті кидає SyntaxError, який ніхто зараз не ловить.", "Обгорни JSON.parse(raw) у try/catch і поверни [] у catch."],
      expectedOutput: "[] замість необробленої помилки SyntaxError",
    },
    microExercises: [
      { id: "js-json-typeof-predict", kind: "predict", prompt: "Що виведе цей код?", code: `const result = JSON.stringify({ a: 1 });\nconsole.log(typeof result);`, solution: "\"string\" — JSON.stringify() завжди повертає рядок (текст), незалежно від того, наскільки складним був вхідний обʼєкт." },
      { id: "js-json-function-find-bug", kind: "find-the-bug", prompt: "Чому властивість onSave відсутня в результаті?", code: `const form = { title: "Форма", onSave: () => console.log("збережено") };\nconsole.log(JSON.stringify(form));`, solution: "JSON не підтримує функції як значення — JSON.stringify() мовчки пропускає властивість onSave (і будь-яку іншу функцію чи undefined) із результату, без помилки. Результат буде лише '{\"title\":\"Форма\"}'." },
      { id: "js-json-parse-error-choice", kind: "choice", prompt: "Що станеться при виклику JSON.parse(\"{зламаний}\")?", options: ["Поверне null", "Поверне порожній обʼєкт {}", "Кине SyntaxError", "Поверне рядок \"{зламаний}\" як є"], correctAnswer: "Кине SyntaxError", solution: "JSON.parse() на невалідному JSON-тексті кидає справжню помилку типу SyntaxError — це не тихе повернення null чи порожнього значення, тому такий виклик обовʼязково варто обгортати в try/catch для ненадійних даних." },
      { id: "js-json-limits-explain", kind: "explain", prompt: "Поясни, чому JSON не підходить для збереження ПОВНОГО стану складного обʼєкта, що містить методи.", solution: "JSON — формат для передачі й зберігання ПРОСТИХ структурованих даних (обʼєкти, масиви, рядки, числа, булеві значення, null) — він не має синтаксису для представлення функцій, як і не розрізняє undefined від \"відсутньої властивості\". Тому будь-які методи чи значення undefined у обʼєкті мовчки зникають при JSON.stringify(), і відновити їх через JSON.parse() пізніше неможливо — доводиться зберігати таку логіку окремо від JSON-представлення даних." },
      { id: "js-json-clone-rewrite", kind: "rewrite", prompt: "Перепиши функцію так, щоб вона безпечно повертала розібраний обʼєкт налаштувань або порожній обʼєкт при пошкоджених даних.", code: `function loadSettings() {\n  const raw = localStorage.getItem("settings");\n  return JSON.parse(raw);\n}`, solution: `function loadSettings() {\n  const raw = localStorage.getItem("settings");\n  if (!raw) return {};\n  try {\n    return JSON.parse(raw);\n  } catch (error) {\n    console.error("Пошкоджені налаштування:", error.message);\n    return {};\n  }\n}\n// перевірка на null і try/catch разом покривають обидва небезпечні випадки` },
    ],
  },

  "Стани завантаження та помилки": {
    whatIsIt: "Реальний інтерфейс, що чекає на дані з мережі, має ЩОНАЙМЕНШЕ чотири різні стани: loading (запит іще виконується — показати індикатор), success із даними (є що показати), success із ПОРОЖНІМ результатом (запит вдався, але даних немає — це НЕ те саме, що помилка) і error (запит провалився — показати зрозуміле повідомлення). Явне відстеження поточного стану (наприклад, через змінну status: \"idle\" | \"loading\" | \"success\" | \"error\") — це те, що відрізняє передбачуваний інтерфейс від \"то порожньо, то зависає, то мовчки ламається\".",
    whyUseIt: "Без явних станів інтерфейс типово має один з трьох типових дефектів: спінер, що ніколи не зникає (забутий finally), порожній екран без пояснення при помилці мережі (не показане повідомлення error), чи плутанина \"завантаження\" з \"даних справді немає\" (порожній масив після успішного запиту виглядає так само, як стан до першого запиту). Явний стан робить кожен з цих випадків окремим, видимим і свідомо обробленим.",
    whenToUse: ["Будь-який інтерфейс, що завантажує дані з мережі (fetch) — список товарів, профіль, стрічка коментарів.", "Коли потрібно розрізнити \"ще не завантажено\", \"завантажується\", \"завантажено й дані є\", \"завантажено, але порожньо\" і \"сталася помилка\".", "Комбінація з try/catch/finally (попередній модуль): finally — ідеальне місце, щоб гарантовано вимкнути loading незалежно від результату."],
    whenNotToUse: ["Не показуй просто порожній блок замість повідомлення про помилку — користувач не розуміє, що саме сталось.", "Не забувай finally для вимкнення loading — без нього спінер \"застрягне\" назавжди при помилці.", "Не плутай порожній успішний результат (\"товарів немає\") з помилкою (\"не вдалося завантажити\") — це принципово різні повідомлення для користувача."],
    comparisonTable: {
      headers: ["Стан", "Що бачить користувач"],
      rows: [
        ["loading", "індикатор завантаження (спінер, скелетон)"],
        ["success + дані є", "реальний вміст (список, картка тощо)"],
        ["success + порожньо", "\"Тут поки що нічого немає\" — НЕ помилка"],
        ["error", "\"Не вдалося завантажити\" з можливістю повторити спробу"],
      ],
    },
    codeWalkthroughs: [
      {
        before: "Наївна версія без явних станів — спінер, що ніколи не ховається при помилці:",
        code: `async function loadProductsNaive() {
  showSpinner();
  const response = await fetch("/api/products"); // якщо тут помилка — spinner НАЗАВЖДИ
  const products = await response.json();
  hideSpinner();
  renderProducts(products);
}`,
        lineNotes: ["showSpinner() викликається на початку, але hideSpinner() написаний ПІСЛЯ рядків, що можуть кинути помилку (fetch, response.json()).", "Якщо fetch чи response.json() відхиляється, виконання переходить до необробленої помилки, ПРОПУСКАЮЧИ hideSpinner() — спінер лишається на екрані назавжди."],
      },
      {
        before: "Виправлена версія через try/catch/finally — гарантоване вимкнення спінера в БУДЬ-якому випадку:",
        code: `async function loadProducts() {
  showSpinner();
  try {
    const response = await fetch("/api/products");
    if (!response.ok) throw new Error(\`Статус \${response.status}\`);
    const products = await response.json();
    renderProducts(products);
  } catch (error) {
    showErrorMessage("Не вдалося завантажити товари");
  } finally {
    hideSpinner(); // виконається і при успіху, і при помилці
  }
}`,
        lineNotes: ["finally гарантує hideSpinner() незалежно від того, чи try завершився успішно, чи стався catch — саме те, чого не вистачало в наївній версії.", "response.ok перевіряється (з уроку про HTTP-статуси) і кидає помилку явно, щоб і 404/500 теж потрапляли в той самий catch, а не тихо \"проходили далі\"."],
      },
      {
        before: "Явний обʼєкт стану — розрізняє loading/success/empty/error одним полем status:",
        code: `let state = { status: "idle", data: null, error: null };

async function loadProducts() {
  state = { status: "loading", data: null, error: null };
  render();

  try {
    const response = await fetch("/api/products");
    if (!response.ok) throw new Error(\`Статус \${response.status}\`);
    const data = await response.json();
    state = { status: "success", data, error: null };
  } catch (error) {
    state = { status: "error", data: null, error: error.message };
  }
  render();
}

function render() {
  if (state.status === "loading") return showSpinner();
  if (state.status === "error") return showErrorMessage(state.error);
  if (state.status === "success" && state.data.length === 0) return showEmptyMessage();
  if (state.status === "success") return renderProducts(state.data);
}`,
        lineNotes: ["Один обʼєкт state з полем status одразу показує, у якому саме з чотирьох станів перебуває інтерфейс у будь-який момент — без цього довелося б тримати кілька окремих булевих прапорців (isLoading, hasError тощо), які легко розсинхронізувати.", "render() перевіряє state.data.length === 0 ОКРЕМО від status === \"error\" — порожній успішний результат і помилка мають різні, явно розділені гілки."],
      },
      {
        before: "Реальний баг: порожній масив після успіху виглядає так само, як стан \"ще не завантажено\":",
        code: `function renderProductsBroken(products) {
  if (products.length === 0) {
    // Порожній контейнер — виглядає ТОЧНО як до першого запиту чи як помилка
    document.querySelector("#list").innerHTML = "";
  } else {
    document.querySelector("#list").innerHTML = products.map((p) => \`<li>\${p.name}</li>\`).join("");
  }
}
// Користувач бачить порожній блок і не розуміє: це помилка? Ще завантажується?
// Чи товарів справді немає?`,
        lineNotes: ["Порожній рядок у innerHTML не дає користувачу ЖОДНОГО сигналу про причину — виглядає однаково для \"ще не було запиту\", \"запит провалився\" і \"запит успішний, товарів просто немає\".", "Правильно: показати ЯВНИЙ, відмінний від помилки текст на кшталт \"Товарів поки немає\" саме для порожнього успішного результату."],
        after: "Порожній успішний результат — це ТРЕТІЙ окремий стан, відмінний і від завантаження, і від помилки; він заслуговує на власне, недвозначне повідомлення.",
      },
    ],
    commonMistakes: ["Забутий finally для вимкнення loading — спінер \"застрягає\" при помилці.", "Показ порожнього блоку замість зрозумілого повідомлення при помилці мережі.", "Плутанина порожнього успішного результату з помилкою чи з станом \"ще не завантажено\".", "Оновлення інтерфейсу лише для success, без явної гілки для error чи empty — користувач не розуміє, що відбувається за замовчуванням."],
    dontDoThis: { code: `async function loadComments() {\n  showSpinner();\n  const response = await fetch("/api/comments"); // БАГ: немає try/catch/finally\n  const comments = await response.json();\n  hideSpinner();\n  renderComments(comments);\n}`, explanation: "Якщо fetch чи response.json() відхиляється (збій мережі чи 404/500 без перевірки response.ok), виконання переходить до необробленої помилки — рядки hideSpinner() і renderComments(comments) просто НЕ виконуються. Користувач бачить спінер, що крутиться вічно, без жодного повідомлення про те, що щось пішло не так. Потрібні try/catch (щоб показати помилку) і finally (щоб гарантовано сховати спінер)." },
    bestPractices: ["Використовуй try/catch/finally для КОЖНОГО завантаження даних з мережі — finally гарантує вимкнення loading незалежно від результату.", "Тримай явний стан (status: idle/loading/success/error) замість розрізнених булевих прапорців.", "Показуй ОКРЕМЕ, зрозуміле повідомлення для порожнього успішного результату — це не помилка.", "Завжди давай користувачу зрозуміле повідомлення про помилку, а не порожній чи \"зламаний\" вигляд інтерфейсу."],
    remember: ["Мінімум чотири стани: loading, success з даними, success порожній, error — кожен потребує власного відображення.", "finally — гарантоване місце для вимкнення loading, незалежно від успіху чи помилки.", "Порожній успішний результат — це НЕ помилка і НЕ те саме, що \"ще не завантажено\".", "response.ok (з уроку про статуси) повинен перетворюватись на throw, щоб потрапити в той самий catch, що й збої мережі."],
    interviewQuestions: [
      { question: "Які мінімум чотири стани варто враховувати в інтерфейсі, що завантажує дані з мережі?", answer: "loading (запит виконується), success з реальними даними (є що показати), success із порожнім результатом (запит вдався, але даних немає — не помилка) і error (запит провалився). Кожен потребує власного, візуально відмінного відображення для користувача." },
      { question: "Чому finally критично важливий для індикатора завантаження?", answer: "finally виконується ЗАВЖДИ після try/catch, незалежно від того, чи запит успішний, чи стався збій — це гарантує, що hideSpinner() (чи еквівалентне вимкнення loading-стану) реально відбудеться в БУДЬ-якому сценарії. Без finally помилка всередині try могла б \"пропустити\" рядок вимкнення спінера, залишивши його на екрані назавжди." },
      { question: "Чому порожній масив після успішного запиту не варто показувати так само, як помилку чи стан до завантаження?", answer: "Це три принципово різні ситуації для користувача: \"ще не намагались завантажити\" (нейтрально), \"сталася помилка мережі\" (потрібно повторити спробу чи повідомити підтримку), \"запит успішний, але результатів справді немає\" (нормальний, очікуваний стан, наприклад, порожній кошик). Показ однакового порожнього блоку для всіх трьох випадків позбавляє користувача розуміння, що саме відбувається." },
      { question: "Навіщо тримати єдиний обʼєкт стану (status: ...) замість кількох окремих булевих прапорців (isLoading, hasError, isEmpty)?", answer: "Окремі булеві прапорці можуть розсинхронізуватись — наприклад, isLoading і hasError одночасно true, хоча логічно це неможливий стан. Єдине поле status з чітким набором значень (\"idle\"/\"loading\"/\"success\"/\"error\") завжди описує РІВНО один поточний стан, що робить логіку відображення простішою й передбачуванішою." },
    ],
    summary: "Реальний інтерфейс з мережевими запитами має мінімум чотири стани: loading, success з даними, success порожній і error — кожен зі своїм, відмінним відображенням. try/catch/finally гарантує коректну обробку помилок і вимкнення loading у будь-якому випадку. Порожній успішний результат — окремий, не менш важливий стан, який не варто плутати з помилкою чи \"ще не завантажено\".",
    proTip: "Якщо в продукті є спінер, що іноді \"висить вічно\", чи порожній екран без пояснення при збоях мережі — це майже завжди відсутність finally чи відсутня окрема гілка для error/empty станів.",
    nextLessonNote: "Це завершує модуль \"Мережа та сховище\" — далі патерни застосунків: як організувати код більшого застосунку на чистому JavaScript.",
    interactiveDemo: "loading-states-demo",
    practiceTask: {
      title: "Виправ спінер, що ніколи не зникає при помилці",
      description: "Функція loadOrders показує спінер, але не має try/catch/finally, тому при збої мережі спінер лишається на екрані назавжди, а користувач не бачить жодного повідомлення про помилку. Виправ це.",
      checklist: ["Спінер гарантовано зникає і при успіху, і при помилці (finally).", "При помилці показується зрозуміле повідомлення, а не порожній екран.", "Порожній список замовлень (успішний запит, але без даних) показує окреме повідомлення, відмінне від помилки."],
      starterFiles: [
        {
          id: "js-loading-states-start",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<div id="spinner" hidden>Завантаження...</div>
<div id="output"></div>

<script>
  function showSpinner() { document.querySelector("#spinner").hidden = false; }
  function hideSpinner() { document.querySelector("#spinner").hidden = true; }

  async function loadOrders() {
    showSpinner();
    const response = await fetch("/api/orders"); // БАГ: немає try/catch/finally
    const orders = await response.json();
    hideSpinner();
    document.querySelector("#output").textContent = orders.length + " замовлень";
  }

  loadOrders();
</script>
`,
        },
      ],
      solutionFiles: [
        {
          id: "js-loading-states-solution",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<div id="spinner" hidden>Завантаження...</div>
<div id="output"></div>

<script>
  function showSpinner() { document.querySelector("#spinner").hidden = false; }
  function hideSpinner() { document.querySelector("#spinner").hidden = true; }

  async function loadOrders() {
    showSpinner();
    try {
      const response = await fetch("/api/orders");
      if (!response.ok) throw new Error("Статус " + response.status);
      const orders = await response.json();

      if (orders.length === 0) {
        document.querySelector("#output").textContent = "Замовлень поки немає";
      } else {
        document.querySelector("#output").textContent = orders.length + " замовлень";
      }
    } catch (error) {
      document.querySelector("#output").textContent = "Не вдалося завантажити замовлення";
    } finally {
      hideSpinner();
    }
  }

  loadOrders();
</script>
`,
          readOnly: true,
        },
      ],
      hints: ["Обгорни fetch і response.json() у try/catch, а hideSpinner() перенеси у finally.", "Додай окрему перевірку orders.length === 0 для повідомлення про порожній список, відмінного від помилки."],
      expectedOutput: "Спінер завжди зникає; при помилці — зрозуміле повідомлення; при порожньому списку — \"Замовлень поки немає\"",
    },
    microExercises: [
      { id: "js-loading-finally-predict", kind: "predict", prompt: "Чи виконається hideSpinner(), якщо fetch у try відхилиться?", code: `try {\n  showSpinner();\n  await fetch("/api/data");\n} catch (error) {\n  console.log("помилка");\n} finally {\n  hideSpinner();\n}`, solution: "Так — finally виконується ЗАВЖДИ, незалежно від того, чи try завершився успішно, чи спрацював catch. hideSpinner() гарантовано викликається в обох випадках." },
      { id: "js-loading-nofinally-find-bug", kind: "find-the-bug", prompt: "У чому проблема цього коду?", code: `async function load() {\n  showSpinner();\n  const data = await fetchData(); // може відхилитись\n  hideSpinner();\n  render(data);\n}`, solution: "hideSpinner() написаний ПІСЛЯ рядка, що може кинути помилку (await fetchData()) — якщо запит відхиляється, виконання переходить до необробленої помилки, і hideSpinner() ніколи не викликається. Спінер лишається на екрані назавжди. Потрібні try/catch/finally, з hideSpinner() саме у finally." },
      { id: "js-loading-empty-choice", kind: "choice", prompt: "Успішний запит повернув порожній масив товарів. Що правильно показати користувачу?", options: ["Порожній екран без пояснення", "Те саме повідомлення, що й для помилки мережі", "Окреме повідомлення на кшталт \"Товарів поки немає\"", "Нескінченний спінер"], correctAnswer: "Окреме повідомлення на кшталт \"Товарів поки немає\"", solution: "Порожній успішний результат — це нормальний, відмінний від помилки стан: запит спрацював, просто даних справді немає. Він заслуговує на власне, чітке повідомлення, а не порожній блок чи текст помилки, які заплутають користувача щодо реальної причини." },
      { id: "js-loading-states-explain", kind: "explain", prompt: "Поясни, чому варто тримати єдине поле status замість окремих isLoading/hasError/isEmpty прапорців.", solution: "Окремі булеві прапорці можна встановити в суперечливу комбінацію (наприклад, isLoading: true і hasError: true одночасно), хоча логічно інтерфейс може перебувати рівно в ОДНОМУ з цих станів у кожен момент часу. Єдине поле status із чітким набором можливих значень (\"idle\"/\"loading\"/\"success\"/\"error\") унеможливлює таку суперечність і робить функцію render() простішою — досить перевірити одне значення, а не комбінацію кількох прапорців." },
      { id: "js-loading-rewrite", kind: "rewrite", prompt: "Перепиши функцію, додавши try/catch/finally і окрему гілку для порожнього результату.", code: `async function loadReviews() {\n  showSpinner();\n  const response = await fetch("/api/reviews");\n  const reviews = await response.json();\n  hideSpinner();\n  renderReviews(reviews);\n}`, solution: `async function loadReviews() {\n  showSpinner();\n  try {\n    const response = await fetch("/api/reviews");\n    if (!response.ok) throw new Error("Статус " + response.status);\n    const reviews = await response.json();\n    if (reviews.length === 0) {\n      showEmptyMessage("Відгуків поки немає");\n    } else {\n      renderReviews(reviews);\n    }\n  } catch (error) {\n    showErrorMessage("Не вдалося завантажити відгуки");\n  } finally {\n    hideSpinner();\n  }\n}\n// тепер покриті всі чотири стани: loading, success з даними, success порожній, error` },
    ],
  },
};
