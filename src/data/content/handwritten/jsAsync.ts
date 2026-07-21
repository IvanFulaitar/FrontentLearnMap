import type { LessonOverride } from "./htmlFoundations";

/**
 * Module "Асинхронний JavaScript" (js-async). Eighth JavaScript module —
 * deferred operations, callbacks, timers, Promises, async/await, try/catch
 * with async, parallel requests, and request cancellation. Same deep
 * cheat-sheet lesson format as js-events. All 6 of 6 lessons.
 */
export const jsAsyncOverrides: Record<string, LessonOverride> = {
  "Callback-и та таймери": {
    whatIsIt: "Callback — функція, передана як аргумент іншій функції, щоб бути викликаною ПІЗНІШЕ. setTimeout(callback, delay) планує один виклик callback через ПРИНАЙМНІ delay мілісекунд; setInterval(callback, delay) викликає callback ПОВТОРЮВАНО кожні delay мс, доки не зупинити через clearInterval. Обидва повертають числовий ID, який передається в clearTimeout/clearInterval для скасування запланованого виклику.",
    whyUseIt: "JavaScript однопотоковий — він не може \"почекати\" без блокування всього іншого коду. Callback-и й таймери дозволяють відкласти чи повторити дію, не зупиняючи виконання решти програми: рядок коду після setTimeout виконується одразу, а сам callback спрацює пізніше, коли надійде його час у черзі подій.",
    whenToUse: ["Відкласти дію на певний час (автоматичне закриття повідомлення через кілька секунд).", "Повторювати дію з певним інтервалом (опитування сервера, оновлення годинника на екрані).", "Робота зі старими API, що приймають лише callback-и (не Promise)."],
    whenNotToUse: ["Не використовуй глибоко вкладені callback-и для послідовних асинхронних кроків (\"callback hell\") — для цього краще підходять Promise чи async/await.", "Не покладайся на setTimeout(fn, 0) як на гарантовано МИТТЄВЕ виконання — воно все одно виконається ПІСЛЯ поточного синхронного коду, і браузер може додати власну мінімальну затримку.", "Не забувай зберігати ID від setInterval і викликати clearInterval, коли повторення більше не потрібне — інакше таймер продовжує працювати \"у фоні\" без потреби."],
    comparisonTable: {
      headers: ["Функція", "Поведінка"],
      rows: [
        ["setTimeout(fn, delay)", "викликає fn ОДИН РАЗ, через ПРИНАЙМНІ delay мс"],
        ["setInterval(fn, delay)", "викликає fn ПОВТОРЮВАНО кожні delay мс, доки не зупинити"],
        ["clearTimeout(id) / clearInterval(id)", "скасовує запланований виклик за ID, повернутим setTimeout/setInterval"],
      ],
    },
    codeWalkthroughs: [
      {
        before: "Базовий setTimeout — код після нього виконується одразу, callback пізніше:",
        code: `console.log("1: почато");

setTimeout(() => {
  console.log("3: спрацював callback через 1000мс");
}, 1000);

console.log("2: код після setTimeout виконується одразу");
// Порядок у консолі: 1, 2, а потім, через ~1000мс: 3`,
        lineNotes: ["setTimeout лише ПЛАНУЄ виклик callback — сам виклик setTimeout повертається одразу, не блокуючи виконання рядка \"2\".", "Callback реально спрацьовує лише коли минає щонайменше вказана затримка І поточний синхронний код повністю завершився."],
      },
      {
        before: "setInterval з реальною зупинкою через clearInterval після N повторень:",
        code: `let count = 0;
const intervalId = setInterval(() => {
  count++;
  console.log("Тік", count);
  if (count >= 3) {
    clearInterval(intervalId); // зупиняємо після 3 повторень
  }
}, 500);`,
        lineNotes: ["intervalId, повернутий setInterval, зберігається в змінну — саме цей ID потрібен clearInterval для зупинки.", "Без clearInterval цей таймер продовжував би викликати callback кожні 500мс НЕСКІНЧЕННО, навіть коли лічильник більше не потрібен."],
      },
      {
        before: "clearTimeout скасовує ЩЕ НЕ виконаний setTimeout — наприклад, показ повідомлення, яке користувач встиг скасувати:",
        code: `const timeoutId = setTimeout(() => {
  console.log("Показуємо сповіщення 'Товар додано в кошик'");
}, 3000);

// Користувач одразу натиснув "Скасувати" — не чекаючи 3 секунди:
clearTimeout(timeoutId);
console.log("Сповіщення скасовано, воно НЕ зʼявиться");`,
        lineNotes: ["clearTimeout(timeoutId) працює, лише якщо викликати його ДО того, як минув час затримки — після спрацювання callback скасовувати вже нічого.", "На відміну від clearInterval (зупиняє повторення, яке інакше тривало б нескінченно), clearTimeout скасовує ОДИН ще не виконаний запланований виклик."],
      },
      {
        before: "Callback hell — вкладені setTimeout для послідовних кроків стають важкими для читання:",
        code: `setTimeout(() => {
  console.log("Крок 1");
  setTimeout(() => {
    console.log("Крок 2");
    setTimeout(() => {
      console.log("Крок 3");
    }, 500);
  }, 500);
}, 500);
// Кожен наступний крок вкладений ГЛИБШЕ — код "сповзає" праворуч`,
        lineNotes: ["Кожен наступний асинхронний крок вимагає ЩЕ ОДНОГО рівня вкладеності — при більшій кількості кроків код стає майже нечитабельним (класична \"піраміда приречення\").", "Це один з головних мотивів появи Promise і async/await — вони дозволяють писати послідовні асинхронні кроки БЕЗ наростання вкладеності."],
      },
      {
        before: "setTimeout(fn, 0) все одно виконується ПІСЛЯ поточного синхронного коду:",
        code: `console.log("1: синхронний код почався");

setTimeout(() => {
  console.log("3: цей callback з delay=0");
}, 0);

console.log("2: синхронний код продовжується");
// Порядок: 1, 2, 3 — НЕ 1, 3, 2, попри delay: 0`,
        lineNotes: ["Навіть з delay: 0 callback потрапляє в черзі ПІСЛЯ всього поточного синхронного коду — цикл подій (event loop) обробляє відкладені callback-и лише коли стек викликів порожній.", "Це доводить: setTimeout НІКОЛИ не виконується синхронно \"негайно\", навіть із нульовою затримкою."],
      },
    ],
    commonMistakes: ["Забувати викликати clearInterval, коли повторення більше не потрібне — таймер продовжує працювати непотрібно.", "Вважати delay ТОЧНИМ часом виконання, а не мінімальною гарантованою затримкою.", "Будувати глибоко вкладені callback-и для послідовних кроків замість використання Promise/async-await.", "Передавати виклик функції fn() замість посилання fn у setTimeout — це виконає fn НЕГАЙНО, а не запланує виклик."],
    dontDoThis: { code: `function showMessage() {\n  console.log("Повідомлення показано");\n}\n\nsetTimeout(showMessage(), 1000); // БАГ: викликає ОДРАЗУ, а не через 1000мс`, explanation: "showMessage() з дужками ВИКЛИКАЄ функцію НЕГАЙНО, під час виконання цього рядка — ще до того, як минула хоч якась затримка. Результат виклику (undefined, бо функція нічого не повертає) передається в setTimeout як \"callback\" — через 1000мс НІЧОГО не відбудеться, бо undefined не є функцією, яку можна викликати. Правильно: setTimeout(showMessage, 1000) — без дужок, як ПОСИЛАННЯ на функцію." },
    bestPractices: ["Завжди передавай ПОСИЛАННЯ на функцію в setTimeout/setInterval (без дужок), а не результат її виклику.", "Зберігай ID, повернутий setInterval, і викликай clearInterval, коли повторення більше не потрібне.", "Для послідовних асинхронних кроків використовуй Promise чи async/await замість вкладених callback-ів.", "Не покладайся на точну кількість мілісекунд затримки — розглядай delay як МІНІМАЛЬНИЙ, а не гарантований час."],
    remember: ["setTimeout — один відкладений виклик; setInterval — повторюваний, доки не clearInterval.", "Код після setTimeout виконується одразу — сам callback спрацьовує пізніше, коли стек викликів порожній.", "setTimeout(fn, 0) все одно виконується ПІСЛЯ всього поточного синхронного коду.", "fn() з дужками в setTimeout викликає функцію негайно — потрібне посилання fn, без дужок."],
    interviewQuestions: [
      { question: "У чому різниця між setTimeout і setInterval?", answer: "setTimeout планує ОДИН виклик callback через принаймні вказану кількість мілісекунд. setInterval планує ПОВТОРЮВАНИЙ виклик callback з тим самим інтервалом, знову і знову, доки явно не зупинити через clearInterval — без цього таймер продовжує працювати нескінченно." },
      { question: "Чому setTimeout(fn, 0) не виконується миттєво, синхронно?", answer: "JavaScript однопотоковий і використовує цикл подій (event loop): відкладені callback-и (навіть з delay: 0) потрапляють у черзі й обробляються ЛИШЕ КОЛИ стек викликів повністю порожній, тобто після завершення ВСЬОГО поточного синхронного коду. Тому delay: 0 означає \"якнайшвидше після поточного коду\", а не \"негайно, синхронно\"." },
      { question: "Що станеться, якщо не викликати clearInterval для непотрібного таймера?", answer: "setInterval продовжуватиме викликати callback з заданим інтервалом НЕСКІНЧЕННО, навіть якщо результат цих викликів більше нікому не потрібен. Це може призводити до непотрібного навантаження, витоків памʼяті (якщо callback тримає посилання на обʼєкти, що інакше мали б бути звільнені) чи навіть помилок, якщо callback звертається до вже неіснуючих елементів." },
      { question: "Чому \"callback hell\" вважається проблемою, і що допомагає її вирішити?", answer: "Кожен наступний асинхронний крок, реалізований через вкладений callback (наприклад, всередині попереднього setTimeout), додає ще один рівень вкладеності — код швидко стає важким для читання й підтримки (\"піраміда приречення\"). Promise дозволяють ланцюжок пласких .then() викликів замість вкладеності, а async/await робить асинхронний код майже ідентичним синхронному за читабельністю." },
    ],
    summary: "setTimeout планує один відкладений виклик; setInterval — повторюваний, до явного clearInterval. Код після них виконується одразу — сам callback спрацьовує пізніше, коли черга подій дозволяє. Delay — мінімальна, не точна гарантія часу. Глибоко вкладені callback-и для послідовних кроків — головний мотив появи Promise і async/await.",
    proTip: "Якщо запланований через setTimeout callback \"спрацьовує одразу\" — перша підозра: чи не передані дужки після імені функції (fn() замість fn).",
    nextLessonNote: "Далі — проміси (Promise): як представити результат асинхронної операції одним обʼєктом і уникнути вкладених callback-ів через ланцюжок .then().",
    interactiveDemo: "callback-timer-demo",
    practiceTask: {
      title: "Виправ setTimeout, що спрацьовує одразу замість запланованого виклику",
      description: "Функція scheduleMessage передає showMessage() з дужками в setTimeout, тому повідомлення зʼявляється миттєво, а не через 2 секунди. Виправ, передавши посилання на функцію.",
      checklist: ["Повідомлення зʼявляється ЧЕРЕЗ 2 секунди, а не миттєво.", "showMessage НЕ викликається одразу під час scheduleMessage.", "setTimeout отримує посилання на функцію, а не результат її виклику."],
      starterFiles: [
        {
          id: "js-callback-timer-start",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<button id="notify">Показати повідомлення через 2с</button>
<p id="output"></p>

<script>
  function showMessage() {
    document.querySelector("#output").textContent = "Повідомлення показано!";
  }

  function scheduleMessage() {
    setTimeout(showMessage(), 2000); // БАГ: викликає одразу
  }

  document.querySelector("#notify").addEventListener("click", scheduleMessage);
</script>
`,
        },
      ],
      solutionFiles: [
        {
          id: "js-callback-timer-solution",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<button id="notify">Показати повідомлення через 2с</button>
<p id="output"></p>

<script>
  function showMessage() {
    document.querySelector("#output").textContent = "Повідомлення показано!";
  }

  function scheduleMessage() {
    setTimeout(showMessage, 2000);
  }

  document.querySelector("#notify").addEventListener("click", scheduleMessage);
</script>
`,
          readOnly: true,
        },
      ],
      hints: ["showMessage() з дужками викликає функцію одразу, у момент виконання scheduleMessage.", "Потрібне посилання на функцію без дужок: setTimeout(showMessage, 2000)."],
      expectedOutput: "Повідомлення зʼявляється лише через 2 секунди після кліку",
    },
    microExercises: [
      { id: "js-callback-order-predict", kind: "predict", prompt: "У якому порядку виведуться рядки?", code: `console.log("A");\nsetTimeout(() => console.log("B"), 0);\nconsole.log("C");`, solution: "A, C, B — навіть з delay: 0, callback у setTimeout виконується ПІСЛЯ всього поточного синхронного коду (A і C), бо цикл подій обробляє відкладені callback-и лише коли стек викликів порожній." },
      { id: "js-callback-invoke-find-bug", kind: "find-the-bug", prompt: "У чому проблема цього коду?", code: `function logTick() {\n  console.log("тік");\n}\nsetInterval(logTick(), 1000);`, solution: "logTick() з дужками ВИКЛИКАЄ функцію негайно, а результат виклику (undefined) передається в setInterval як \"callback\" — реальні повторювані виклики кожні 1000мс НЕ відбудуться, бо undefined не є функцією. Потрібно передати logTick без дужок: setInterval(logTick, 1000)." },
      { id: "js-callback-clear-choice", kind: "choice", prompt: "Що потрібно, щоб зупинити setInterval, який більше не потрібен?", options: ["clearTimeout(id)", "clearInterval(id) з ID, повернутим setInterval", "просто нічого не робити, він зупиниться сам", "викликати setInterval знову з delay: 0"], correctAnswer: "clearInterval(id) з ID, повернутим setInterval", solution: "setInterval повертає числовий ID; саме цей ID потрібно передати в clearInterval, щоб зупинити повторювані виклики. Без цього таймер продовжує працювати нескінченно." },
      { id: "js-callback-hell-explain", kind: "explain", prompt: "Поясни, чому глибоко вкладені setTimeout для послідовних кроків вважаються проблемою (\"callback hell\").", solution: "Кожен наступний асинхронний крок, залежний від попереднього, реалізується як callback, ВКЛАДЕНИЙ у callback попереднього кроку. З кожним новим кроком рівень вкладеності зростає — код \"сповзає\" все далі праворуч і стає важким читати, підтримувати й правильно обробляти помилки в кожному рівні окремо. Promise і async/await вирішують це, дозволяючи писати послідовні кроки на одному рівні вкладеності." },
      { id: "js-callback-rewrite", kind: "rewrite", prompt: "Перепиши код, щоб він зберігав ID таймера і зупиняв його після 5 тіків.", code: `setInterval(() => {\n  console.log("тік");\n}, 1000);\n// як зупинити після 5 тіків?`, solution: `let count = 0;\nconst id = setInterval(() => {\n  count++;\n  console.log("тік", count);\n  if (count >= 5) {\n    clearInterval(id);\n  }\n}, 1000);\n// ID зберігається в змінну id, яку потім передаємо в clearInterval` },
    ],
  },

  "Проміси": {
    whatIsIt: "Promise — обʼєкт, що представляє РЕЗУЛЬТАТ асинхронної операції, якого ще немає (або вже є). Проміс має один із трьох станів: pending (очікування), fulfilled (успішно виконано, є значення) чи rejected (сталась помилка). .then(onFulfilled) реагує на успіх, .catch(onRejected) — на помилку, .finally() виконується ЗАВЖДИ, незалежно від результату. new Promise((resolve, reject) => {...}) створює проміс вручну: викликати resolve(value) означає успіх, reject(error) — помилку.",
    whyUseIt: "Promise вирішує проблему callback hell: замість вкладення callback-ів один в одного, послідовні асинхронні кроки записуються як ПЛАСКИЙ ланцюжок .then().then().then() — кожен на тому самому рівні вкладеності, незалежно від кількості кроків. Це стандартний, вбудований у мову механізм, на якому побудовані fetch та багато інших сучасних API.",
    whenToUse: ["Представлення результату однієї асинхронної операції (запит до сервера, читання файлу) та реакція на її завершення.", "Перетворення старого callback-based API на промісо-орієнтований (\"promisify\").", "Послідовний ланцюжок залежних асинхронних кроків через .then()."],
    whenNotToUse: ["Не забувай .catch() — необроблена помилка (unhandled rejection) може мовчки \"загубитись\" чи вивести попередження в консоль.", "Не вкладай .then() всередину іншого .then() без потреби — це знову призводить до зростаючої вкладеності; краще ПОВЕРТАТИ значення чи проміс із .then(), щоб продовжити плаский ланцюжок.", "Не використовуй Promise для подій, що відбуваються БАГАТО РАЗІВ (клік, скрол) — проміс встановлюється (settles) лише ОДИН РАЗ; для повторюваних подій потрібні звичайні слухачі подій."],
    comparisonTable: {
      headers: ["Стан", "Значення"],
      rows: [
        ["pending", "операція ще не завершена — очікування"],
        ["fulfilled", "операція завершилась успішно — доступне значення через .then()"],
        ["rejected", "операція завершилась з помилкою — доступна через .catch()"],
      ],
    },
    codeWalkthroughs: [
      {
        before: "Перш ніж створювати проміси самостійно — подивись на найпростіший можливий готовий проміс і реакцію на нього:",
        code: `const readyPromise = Promise.resolve("Готово!"); // проміс, що ВЖЕ виконаний успішно

readyPromise.then((value) => {
  console.log(value); // "Готово!"
});

console.log("Цей рядок виконається РАНІШЕ за callback у .then");`,
        lineNotes: ["Promise.resolve(value) миттєво створює проміс у стані fulfilled з вказаним значенням — без setTimeout, без мережі, без жодної реальної затримки.", ".then(callback) реєструє функцію, яка отримає значення value, КОЛИ (чи якщо вже) проміс стане fulfilled — навіть для вже готового проміса виклик .then завжди спрацьовує асинхронно, ПІСЛЯ поточного синхронного коду.", "Це і пояснює порядок виводу: спершу виконується весь синхронний код (останній console.log), і лише ПОТІМ — callback усередині .then."],
        after: "У реальному коді проміси рідко створюють вручну через Promise.resolve — набагато частіше проміс повертає інша функція (fetch, або, як нижче, власна функція-обгортка над setTimeout).",
      },
      {
        before: "Створення проміса вручну та реакція через .then/.catch:",
        code: `function delay(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (ms < 0) {
        reject(new Error("Затримка не може бути негативною"));
      } else {
        resolve(\`Минуло \${ms}мс\`);
      }
    }, ms);
  });
}

delay(1000)
  .then((message) => console.log("Успіх:", message))
  .catch((error) => console.error("Помилка:", error.message));`,
        lineNotes: ["Функція-виконавець (executor), передана в new Promise, викликається СИНХРОННО одразу, але resolve/reject всередині setTimeout спрацьовують пізніше, асинхронно.", "Лише ОДНЕ з resolve чи reject реально викликається для конкретного проміса — після цього стан \"фіксується\" назавжди (pending -> fulfilled ЧИ pending -> rejected, без повернення назад)."],
      },
      {
        before: "Плаский ланцюжок .then() замість вкладених callback-ів — кожен крок повертає значення для наступного:",
        code: `fetchUser(1)
  .then((user) => fetchOrders(user.id))
  .then((orders) => fetchOrderDetails(orders[0].id))
  .then((details) => console.log("Деталі замовлення:", details))
  .catch((error) => console.error("Щось пішло не так:", error));
// Кожен .then ПОВЕРТАЄ проміс наступного кроку — ланцюжок залишається пласким`,
        lineNotes: ["Кожен .then() ПОВЕРТАЄ значення (чи новий проміс) — саме тому наступний .then() у ланцюжку отримує результат ПОПЕРЕДНЬОГО кроку, а не оригінальні дані.", "Один спільний .catch() у кінці ланцюжка ловить помилку з БУДЬ-ЯКОГО з попередніх кроків — не потрібно обробляти кожен крок окремо."],
      },
      {
        before: ".finally() виконується завжди, незалежно від успіху чи помилки — типово для прибирання:",
        code: `showLoadingSpinner();

fetchData()
  .then((data) => renderData(data))
  .catch((error) => showErrorMessage(error))
  .finally(() => hideLoadingSpinner());
// hideLoadingSpinner викликається і при успіху, і при помилці`,
        lineNotes: [".finally() спрацьовує ПІСЛЯ завершення всього ланцюжка, незалежно від того, чи він завершився через .then (успіх), чи через .catch (помилка).", "Це ідеальне місце для дій, що мають статись у БУДЬ-ЯКОМУ випадку — сховати індикатор завантаження, звільнити ресурс, тощо."],
      },
      {
        before: "Реальний баг: забутий return всередині .then() ламає ланцюжок — наступний крок отримує undefined:",
        code: `fetchUser(1)
  .then((user) => {
    fetchOrders(user.id); // БАГ: немає return!
  })
  .then((orders) => {
    console.log(orders); // undefined — попередній .then нічого не повернув
  });`,
        lineNotes: ["Без return всередині callback .then() наступний крок ланцюжка отримує undefined, а НЕ результат fetchOrders(user.id) — проміс від fetchOrders просто \"загубився\", ніхто на нього не чекає.", "Правильно: return fetchOrders(user.id); — тоді наступний .then() дочекається ЦЬОГО проміса і отримає його реальний результат."],
        after: "Правило: якщо всередині .then() викликається асинхронна операція, результат якої потрібен далі в ланцюжку, її ОБОВʼЯЗКОВО повертати через return.",
      },
    ],
    commonMistakes: ["Забувати .catch() у кінці ланцюжка — необроблена помилка (unhandled rejection) залишається непоміченою.", "Забувати return всередині .then(), коли результат наступної асинхронної операції потрібен далі в ланцюжку.", "Вкладати .then() усередині іншого .then() замість повернення значення для продовження плаского ланцюжка.", "Вважати, що проміс може \"передумати\" й перейти з fulfilled назад у pending чи в rejected — стан фіксується назавжди після першого resolve/reject."],
    dontDoThis: { code: `fetchUser(1).then((user) => {\n  fetchOrders(user.id).then((orders) => { // БАГ: вкладений .then замість return\n    console.log(orders);\n  });\n});`, explanation: "Замість того, щоб ПОВЕРНУТИ проміс fetchOrders(user.id) з зовнішнього .then() і продовжити плаский ланцюжок новим .then(), тут .then() викликається ВСЕРЕДИНІ callback-у зовнішнього .then() — це відтворює ту саму проблему вкладеності, яку промайси мали вирішити. Крім того, помилка з внутрішнього fetchOrders НЕ буде поймана зовнішнім .catch(), якщо такий є, бо внутрішній проміс не повʼязаний з зовнішнім ланцюжком через return." },
    bestPractices: ["Завжди повертай (return) результат асинхронної операції всередині .then(), якщо він потрібен далі в ланцюжку.", "Завершуй кожен ланцюжок промісів через .catch(), навіть якщо помилка \"здається неможливою\".", "Використовуй .finally() для дій, що мають статись незалежно від результату (сховати спінер, закрити зʼєднання).", "Уникай вкладення .then() всередині .then() — повертай значення чи проміс для продовження плаского ланцюжка."],
    remember: ["Проміс має 3 стани: pending, fulfilled, rejected — стан фіксується назавжди після першого resolve/reject.", ".then() реагує на успіх, .catch() — на помилку, .finally() — завжди, незалежно від результату.", "Кожен .then() повертає значення (чи проміс) для НАСТУПНОГО кроку — забутий return ламає ланцюжок.", "Один .catch() у кінці ланцюжка ловить помилку з будь-якого попереднього кроку."],
    interviewQuestions: [
      { question: "Які три стани може мати Promise, і чи може він змінити стан після \"фіксації\"?", answer: "pending (очікування), fulfilled (успіх, є значення) і rejected (помилка). Проміс переходить з pending в ОДИН з двох інших станів РІВНО ОДИН РАЗ — після цього стан фіксується назавжди й більше не змінюється, навіть якщо всередині executor'а знову викликати resolve чи reject." },
      { question: "Чому важливо не забувати return всередині .then()?", answer: "Кожен .then() у ланцюжку передає своє повернене значення (чи проміс) наступному .then(). Якщо всередині callback-у .then() викликається асинхронна операція БЕЗ return, наступний крок ланцюжка отримає undefined замість реального результату цієї операції — сама операція виконається, але її результат буде \"загублений\" для подальшого ланцюжка." },
      { question: "Що робить .finally(), і чим воно відрізняється від .then()?", answer: ".finally() виконується ПІСЛЯ завершення всього ланцюжка НЕЗАЛЕЖНО від того, чи він завершився успіхом (.then) чи помилкою (.catch) — на відміну від .then(), який реагує лише на успіх. .finally() типово використовують для дій, що мають статись у будь-якому випадку: сховати індикатор завантаження, звільнити ресурс тощо." },
      { question: "Чому один .catch() у кінці ланцюжка може обробити помилку з будь-якого попереднього кроку?", answer: "Якщо будь-який .then() у ланцюжку кидає помилку чи повертає rejected-проміс, весь ланцюжок \"перескакує\" напряму до найближчого наступного .catch(), ігноруючи всі проміжні .then() між місцем помилки та цим .catch(). Тому один .catch() у кінці природньо обробляє помилки з БУДЬ-ЯКОГО попереднього кроку, без потреби обробляти кожен окремо." },
    ],
    summary: "Promise представляє результат асинхронної операції одним обʼєктом зі станами pending/fulfilled/rejected. .then() реагує на успіх, .catch() — на помилку, .finally() — завжди. Кожен .then() повертає значення для наступного кроку — забутий return чи зайве вкладення .then() — найпоширеніші помилки при роботі з ланцюжками промісів.",
    proTip: "Якщо наступний .then() у ланцюжку раптом отримує undefined замість очікуваних даних — перша перевірка: чи є return перед асинхронним викликом у попередньому .then().",
    nextLessonNote: "Далі — async та await: синтаксичний цукор над промісами, що дозволяє писати асинхронний код майже так само, як синхронний.",
    interactiveDemo: "promise-demo",
    practiceTask: {
      title: "Виправ ланцюжок промісів, що втрачає результат через відсутній return",
      description: "Функція loadUserOrders викликає fetchOrders всередині .then() без return, тому наступний крок отримує undefined замість реальних замовлень. Додай return.",
      checklist: ["Наступний .then() отримує РЕАЛЬНИЙ результат fetchOrders, не undefined.", "Ланцюжок залишається пласким, без вкладеного .then().", "Використано return перед викликом fetchOrders."],
      starterFiles: [
        {
          id: "js-promise-chain-start",
          path: "script.js",
          language: "javascript",
          label: "script.js",
          code: `function fetchUser(id) {
  return Promise.resolve({ id, name: "Оля" });
}

function fetchOrders(userId) {
  return Promise.resolve(["Замовлення 1", "Замовлення 2"]);
}

function loadUserOrders() {
  fetchUser(1)
    .then((user) => {
      fetchOrders(user.id); // БАГ: немає return
    })
    .then((orders) => {
      console.log(orders); // undefined
    });
}

loadUserOrders();
`,
        },
      ],
      solutionFiles: [
        {
          id: "js-promise-chain-solution",
          path: "script.js",
          language: "javascript",
          label: "script.js",
          code: `function fetchUser(id) {
  return Promise.resolve({ id, name: "Оля" });
}

function fetchOrders(userId) {
  return Promise.resolve(["Замовлення 1", "Замовлення 2"]);
}

function loadUserOrders() {
  fetchUser(1)
    .then((user) => {
      return fetchOrders(user.id);
    })
    .then((orders) => {
      console.log(orders); // ["Замовлення 1", "Замовлення 2"]
    });
}

loadUserOrders();
`,
          readOnly: true,
        },
      ],
      hints: ["Без return проміс від fetchOrders не повʼязаний із зовнішнім ланцюжком.", "Додай return перед fetchOrders(user.id), щоб наступний .then() дочекався його результату."],
      expectedOutput: "У консолі виводиться реальний масив замовлень, а не undefined",
    },
    microExercises: [
      { id: "js-promise-states-predict", kind: "predict", prompt: "Що виведе цей код?", code: `const p = Promise.resolve(42);\np.then((value) => console.log(value));\nconsole.log("синхронний код");`, solution: "Спочатку \"синхронний код\", потім 42. Callback у .then() виконується АСИНХРОННО (через мікрозадачі), навіть якщо проміс уже fulfilled у момент викликуconsole.log(\"синхронний код\") — весь поточний синхронний код завжди виконується першим." },
      { id: "js-promise-noreturn-find-bug", kind: "find-the-bug", prompt: "Чому другий .then() отримує undefined?", code: `getUser().then((user) => {\n  getPosts(user.id);\n}).then((posts) => {\n  console.log(posts);\n});`, solution: "Callback першого .then() не має return перед getPosts(user.id) — проміс від getPosts виконується, але його результат НЕ передається далі в ланцюжок. Другий .then() отримує undefined (те, що НЕЯВНО повернув перший callback), а не реальний результат getPosts. Потрібно return getPosts(user.id);." },
      { id: "js-promise-finally-choice", kind: "choice", prompt: "Який метод промісу виконується ЗАВЖДИ, незалежно від успіху чи помилки?", options: [".then()", ".catch()", ".finally()", ".resolve()"], correctAnswer: ".finally()", solution: ".finally() спрацьовує після завершення ланцюжка НЕЗАЛЕЖНО від того, чи він закінчився успіхом (.then) чи помилкою (.catch) — типове використання: сховати індикатор завантаження чи звільнити ресурс." },
      { id: "js-promise-state-explain", kind: "explain", prompt: "Поясни, чому проміс не може перейти з fulfilled назад у pending.", solution: "Стан проміса фіксується РІВНО ОДИН РАЗ — коли викликається resolve чи reject всередині executor'а, проміс переходить із pending в fulfilled або rejected НАЗАВЖДИ. Подальші виклики resolve/reject (навіть якщо їх помилково викликати ще раз) просто ІГНОРУЮТЬСЯ — проміс не може \"передумати\" чи повернутись у стан очікування. Це гарантує передбачувану, стабільну поведінку: код, що підписався на .then(), отримає результат рівно один раз." },
      { id: "js-promise-nested-rewrite", kind: "rewrite", prompt: "Перепиши вкладений ланцюжок .then() у плаский, використовуючи return.", code: `fetchUser(1).then((user) => {\n  fetchOrders(user.id).then((orders) => {\n    console.log(orders);\n  });\n});`, solution: `fetchUser(1)\n  .then((user) => {\n    return fetchOrders(user.id);\n  })\n  .then((orders) => {\n    console.log(orders);\n  });\n// return перед fetchOrders дозволяє продовжити ПЛАСКИЙ ланцюжок замість вкладення` },
    ],
  },

  "Async та await": {
    whatIsIt: "async перед оголошенням функції робить її async-функцією — така функція ЗАВЖДИ повертає Promise, навіть якщо всередині написано return звичайного значення (воно автоматично \"обгортається\" в проміс). await всередині async-функції ЗУПИНЯЄ виконання САМЕ ЦІЄЇ функції (не всієї програми), доки проміс праворуч від await не встановиться (settle) — після чого await \"повертає\" РЕЗУЛЬТАТ проміса (при успіху) чи кидає ПОМИЛКУ (при відхиленні, яку можна поймати через try/catch).",
    whyUseIt: "async/await — синтаксичний цукор над Promise, що дозволяє писати послідовний асинхронний код так, ніби він синхронний: без .then()-ланцюжків, зі звичними try/catch для помилок. Це значно покращує читабельність коду з кількома залежними асинхронними кроками порівняно з .then().then().then().",
    whenToUse: ["Послідовні асинхронні кроки, де кожен залежить від результату попереднього — код читається практично як синхронний.", "Потрібна звична обробка помилок через try/catch замість .catch() у ланцюжку (детальніше — наступний урок).", "Заміна довгого .then()-ланцюжка на легший для читання еквівалент."],
    whenNotToUse: ["Не використовуй послідовні await для операцій, що НЕ залежать одна від одної — це марно гальмує виконання; для незалежних операцій паралельний запуск швидший (детальніше — урок про паралельні запити).", "await можна використовувати ЛИШЕ всередині async-функції (чи на верхньому рівні ES-модуля) — у звичайній функції це синтаксична помилка.", "Не забувай, що async-функція ЗАВЖДИ повертає Promise — навіть простий return значення ззовні виглядає як проміс, і викликати таку функцію без await чи .then() дає сам проміс, а не значення."],
    comparisonTable: {
      headers: ["Стиль", "Як виглядає обробка результату"],
      rows: [
        [".then()-ланцюжок", "fetchUser().then((u) => fetchOrders(u.id)).then((o) => ...)"],
        ["async/await", "const u = await fetchUser(); const o = await fetchOrders(u.id);"],
      ],
    },
    codeWalkthroughs: [
      {
        before: "Базова async-функція з await — читається як синхронний код:",
        code: `async function loadUser() {
  const user = await fetchUser(1);
  console.log("Користувач:", user);
  return user;
}

loadUser(); // повертає Promise, що зрештою fulfilled зі значенням user`,
        lineNotes: ["await fetchUser(1) ЗУПИНЯЄ виконання loadUser рівно на цьому рядку, доки проміс від fetchUser не встановиться — решта програми (поза цією функцією) продовжує працювати нормально.", "return user всередині async-функції автоматично \"обгортається\" — сама loadUser() повертає Promise<User>, а НЕ просто User."],
      },
      {
        before: "Той самий .then()-ланцюжок, переписаний через async/await — та сама логіка, читабельніше:",
        code: `// .then()-стиль:
function loadOrderDetailsThen() {
  return fetchUser(1)
    .then((user) => fetchOrders(user.id))
    .then((orders) => fetchOrderDetails(orders[0].id));
}

// async/await-стиль, та сама логіка:
async function loadOrderDetailsAwait() {
  const user = await fetchUser(1);
  const orders = await fetchOrders(user.id);
  const details = await fetchOrderDetails(orders[0].id);
  return details;
}`,
        lineNotes: ["Обидва варіанти виконують РІВНО ту саму послідовність асинхронних кроків — async/await лише змінює СИНТАКСИС, роблячи залежність між кроками візуально очевиднішою.", "У async/await-варіанті немає жодного .then() — кожен await просто \"чекає\" й повертає результат у звичайну змінну."],
      },
      {
        before: "Послідовні await для НЕЗАЛЕЖНИХ операцій — працює, але марно повільно (детальніше — наступні уроки):",
        code: `async function loadDashboard() {
  const weather = await fetchWeather(); // чекає ЗАВЕРШЕННЯ
  const news = await fetchNews();       // лише ПОТІМ починає це
  return { weather, news };
}
// weather і news НЕ залежать одне від одного, але виконуються ПО ЧЕРЗІ,
// а не одночасно — загальний час = час(weather) + час(news)`,
        lineNotes: ["Кожен await у цій функції ЗУПИНЯЄ виконання, доки поточний проміс не завершиться — другий fetchNews() навіть НЕ ПОЧИНАЄТЬСЯ, доки не завершиться перший fetchWeather().", "Якщо операції одна від одної не залежать, послідовні await марно збільшують загальний час очікування — краще запустити їх одночасно (Promise.all, тема наступного модульного уроку)."],
      },
      {
        before: "Забутий await — функція повертає сам Promise, а не значення:",
        code: `async function loadUser() {
  const userPromise = fetchUser(1); // БАГ: забули await
  console.log(userPromise); // Promise { <pending> } — НЕ обʼєкт користувача!
  return userPromise;
}`,
        lineNotes: ["Без await fetchUser(1) повертає САМ обʼєкт Promise (у стані pending у момент console.log), а не результат, який цей проміс зрештою поверне.", "Правильно: const user = await fetchUser(1); — тоді userPromise замінюється на реальний обʼєкт користувача, отриманий ПІСЛЯ завершення проміса."],
      },
    ],
    commonMistakes: ["Забувати await перед викликом функції, що повертає Promise — отримуєш сам обʼєкт Promise, а не значення.", "Використовувати await поза async-функцією (синтаксична помилка).", "Виконувати послідовні await для операцій, що не залежать одна від одної, замість паралельного запуску.", "Забувати, що async-функція ЗАВЖДИ повертає Promise — намагатись використати її результат напряму без await чи .then() у викликаючому коді."],
    dontDoThis: { code: `async function getUserName() {\n  return "Оля";\n}\n\nconst name = getUserName(); // БАГ: забули await\nconsole.log(name.toUpperCase()); // помилка: name це Promise, не рядок`, explanation: "getUserName() — async-функція, тому вона ЗАВЖДИ повертає Promise, навіть коли всередині просто return \"Оля\". Без await змінна name містить САМ обʼєкт Promise (у стані pending чи fulfilled, залежно від моменту перевірки), а не рядок \"Оля\" — виклик name.toUpperCase() на обʼєкті Promise кидає помилку, бо в Promise немає такого методу. Потрібно: const name = await getUserName(); всередині іншої async-функції, або getUserName().then((name) => ...)." },
    bestPractices: ["Завжди пиши await перед викликом функції, що повертає Promise, якщо потрібне саме РЕЗУЛЬТУЮЧЕ значення.", "Використовуй await лише всередині async-функцій — інакше отримаєш синтаксичну помилку.", "Для незалежних асинхронних операцій запускай їх ПАРАЛЕЛЬНО (Promise.all), а не послідовними await.", "Памʼятай, що async-функція завжди повертає Promise — викликаючий код повинен теж await-увати чи .then()-увати результат."],
    remember: ["async робить функцію такою, що ЗАВЖДИ повертає Promise, навіть при return звичайного значення.", "await зупиняє виконання ЛИШЕ поточної async-функції, доки проміс не встановиться — решта програми продовжує працювати.", "await можна використовувати лише всередині async-функції (чи на верхньому рівні ES-модуля).", "Забутий await дає сам обʼєкт Promise замість очікуваного значення."],
    interviewQuestions: [
      { question: "Що повертає функція, оголошена з async, навіть якщо всередині просто return значення?", answer: "async-функція ЗАВЖДИ повертає Promise. Якщо всередині написано return значення (не проміс), це значення автоматично \"обгортається\" у fulfilled Promise з цим значенням. Викликаючий код повинен await-увати цей проміс чи використати .then(), щоб отримати саме значення, а не обʼєкт Promise." },
      { question: "Що саме зупиняє await — всю програму чи щось конкретніше?", answer: "await зупиняє виконання ЛИШЕ ТІЄЇ async-функції, всередині якої він написаний — решта програми (інші функції, обробники подій, інший код поза цією функцією) продовжує виконуватись нормально. Це принципово відрізняється від синхронного блокуючого очікування — JavaScript залишається однопотоковим і responsive для іншого коду." },
      { question: "Чому послідовні await для незалежних операцій вважаються неоптимальними?", answer: "Кожен await зупиняє виконання, доки поточний проміс НЕ завершиться, перш ніж перейти до наступного рядка. Якщо друга операція не залежить від результату першої, послідовні await змушують їх виконуватись ПО ЧЕРЗІ — загальний час стає сумою часів обох операцій, замість максимуму з них при паралельному запуску (наприклад, через Promise.all)." },
      { question: "Що станеться, якщо забути await перед викликом async-функції?", answer: "Змінна отримає САМ обʼєкт Promise (можливо ще у стані pending у момент перевірки), а не значення, яке цей проміс зрештою поверне. Спроба використати цю змінну як реальне значення (наприклад, викликати метод рядка на ній) призведе до помилки чи неочікуваної поведінки, бо Promise — це не те саме, що значення, яке він представляє." },
    ],
    summary: "async робить функцію такою, що завжди повертає Promise. await зупиняє виконання ЛИШЕ поточної async-функції, доки проміс не встановиться, повертаючи результат чи кидаючи помилку. Це синтаксичний цукор над Promise — та сама логіка, читабельніша форма. Забутий await — найпоширеніша помилка, що дає сам Promise замість значення.",
    proTip: "Якщо змінна після виклику async-функції виводить \"Promise { <pending> }\" замість очікуваного значення — перша перевірка: чи написаний await перед цим викликом.",
    nextLessonNote: "Далі — try/catch з async: як ловити помилки в async-функціях так само природно, як у звичайному синхронному коді.",
    interactiveDemo: "async-await-demo",
    practiceTask: {
      title: "Виправ функцію, що виводить Promise замість реального значення",
      description: "Функція greetUser забула await перед викликом fetchUserName, тому виводить обʼєкт Promise замість реального імені. Додай await.",
      checklist: ["У консоль виводиться РЕАЛЬНЕ імʼя, а не обʼєкт Promise.", "Використано await перед fetchUserName().", "Функція greetUser залишається async."],
      starterFiles: [
        {
          id: "js-async-await-start",
          path: "script.js",
          language: "javascript",
          label: "script.js",
          code: `function fetchUserName() {
  return Promise.resolve("Оля");
}

async function greetUser() {
  const name = fetchUserName(); // БАГ: забули await
  console.log("Привіт, " + name + "!");
}

greetUser();
`,
        },
      ],
      solutionFiles: [
        {
          id: "js-async-await-solution",
          path: "script.js",
          language: "javascript",
          label: "script.js",
          code: `function fetchUserName() {
  return Promise.resolve("Оля");
}

async function greetUser() {
  const name = await fetchUserName();
  console.log("Привіт, " + name + "!");
}

greetUser();
`,
          readOnly: true,
        },
      ],
      hints: ["Без await name — це обʼєкт Promise, а не рядок.", "Додай await перед fetchUserName(), щоб отримати реальне значення."],
      expectedOutput: "У консолі виводиться \"Привіт, Оля!\", а не \"Привіт, [object Promise]!\"",
    },
    microExercises: [
      { id: "js-async-return-predict", kind: "predict", prompt: "Що виведе console.log(getValue())?", code: `async function getValue() {\n  return 42;\n}\nconsole.log(getValue());`, solution: "Promise { 42 } (fulfilled проміс зі значенням 42), а НЕ просто 42. async-функція завжди повертає Promise, навіть коли всередині написано return звичайного значення — воно автоматично обгортається в проміс." },
      { id: "js-async-missing-find-bug", kind: "find-the-bug", prompt: "У чому проблема цього коду?", code: `async function loadData() {\n  const data = fetchData(); // fetchData повертає Promise\n  console.log(data.length);\n}`, solution: "Забутий await перед fetchData() — змінна data містить сам обʼєкт Promise, а не реальні дані. Спроба прочитати data.length на обʼєкті Promise не спрацює як очікується (Promise не має властивості length), бо це не масив/рядок, які повернув би реально завершений проміс. Потрібно: const data = await fetchData();." },
      { id: "js-async-where-choice", kind: "choice", prompt: "Де можна використовувати await?", options: ["у будь-якій функції", "лише всередині async-функції (чи на верхньому рівні ES-модуля)", "лише всередині .then()", "лише в глобальному скоупі звичайного скрипта"], correctAnswer: "лише всередині async-функції (чи на верхньому рівні ES-модуля)", solution: "await — синтаксична конструкція, дозволена лише всередині функцій, оголошених з async (або на верхньому рівні ES-модуля, за сучасною специфікацією). Використання await у звичайній (не async) функції — синтаксична помилка." },
      { id: "js-async-parallel-explain", kind: "explain", prompt: "Поясни, чому послідовні await для двох незалежних fetch-запитів працюють повільніше, ніж могли б.", solution: "Кожен await зупиняє виконання функції, доки ПОТОЧНИЙ проміс повністю не завершиться, і лише ПІСЛЯ цього починається наступний рядок. Якщо другий запит не залежить від результату першого, він міг би розпочатись ОДНОЧАСНО з першим — але послідовні await змушують чекати завершення першого, перш ніж навіть РОЗПОЧАТИ другий. Загальний час стає сумою часів обох запитів, а не максимумом з них, як було б при паралельному запуску." },
      { id: "js-async-convert-rewrite", kind: "rewrite", prompt: "Перепиши цей .then()-ланцюжок через async/await.", code: `function loadProfile() {\n  return fetchUser(1).then((user) => {\n    return fetchAvatar(user.id);\n  });\n}`, solution: `async function loadProfile() {\n  const user = await fetchUser(1);\n  const avatar = await fetchAvatar(user.id);\n  return avatar;\n}\n// та сама логіка, без .then() — кожен крок читається як звичайний синхронний рядок` },
    ],
  },

  "Try/catch з async": {
    whatIsIt: "try/catch навколо await дозволяє ловити ВІДХИЛЕНИЙ (rejected) проміс так само природно, як звичайну кинуту помилку в синхронному коді: якщо проміс, на який чекає await, відхиляється, виконання одразу переходить у блок catch, де доступна причина відхилення (зазвичай обʼєкт Error). Без try/catch необроблене відхилення всередині async-функції РОЗПОВСЮДЖУЄТЬСЯ як відхилений Promise, що повертає сама ця функція — відповідальність за обробку переходить до коду, який її викликав.",
    whyUseIt: "try/catch дає читабельну, знайому обробку помилок для асинхронного коду — замість окремого .catch() у кінці ланцюжка, логіка обробки помилки перебуває буквально ПОРУЧ з кодом, що може ту помилку викликати. Один блок try/catch може охоплювати КІЛЬКА послідовних await-кроків одразу, так само як один catch у синхронному коді ловить помилку з будь-якого рядка в try.",
    whenToUse: ["Обробка помилки для одного чи кількох послідовних await-кроків з локальним fallback (значення за замовчуванням, повторна спроба).", "Заміна .catch()-ланцюжка на читабельніший try/catch при переписуванні коду на async/await.", "Додавання контексту до помилки перед її повторним киданням (re-throw) далі по стеку викликів."],
    whenNotToUse: ["Не обгортай КОЖЕН окремий await у власний try/catch, якщо кілька кроків можуть використати ОДИН спільний блок з тим самим fallback — це просто повторення коду.", "Не \"проковтуй\" помилку в catch без жодної значущої дії (логування, fallback) — це приховує реальні баги, роблячи їх непомітними.", "Не забувай: якщо не обгорнути await у try/catch, помилка НЕ зникає безслідно — вона розповсюджується як відхилений проміс від async-функції, і хтось ВИЩЕ по стеку має її обробити."],
    comparisonTable: {
      headers: ["Стиль", "Як виглядає обробка помилки"],
      rows: [
        [".then()/.catch()-ланцюжок", "fetchData().then((d) => ...).catch((err) => handleError(err))"],
        ["try/catch з async/await", "try { const d = await fetchData(); ... } catch (err) { handleError(err); }"],
      ],
    },
    codeWalkthroughs: [
      {
        before: "Базовий try/catch навколо await, що може відхилитись:",
        code: `async function loadUser(id) {
  try {
    const user = await fetchUser(id);
    console.log("Користувач завантажений:", user);
    return user;
  } catch (error) {
    console.error("Не вдалося завантажити користувача:", error.message);
    return null;
  }
}`,
        lineNotes: ["Якщо fetchUser(id) повертає відхилений проміс, await кидає цю причину відхилення як звичайну помилку — виконання одразу переходить у catch, минаючи решту кроків try.", "return null у catch дає викликаючому коду безпечне значення за замовчуванням замість необробленого відхилення."],
      },
      {
        before: "Один try/catch охоплює КІЛЬКА послідовних await-кроків одразу:",
        code: `async function loadOrderSummary(userId) {
  try {
    const user = await fetchUser(userId);
    const orders = await fetchOrders(user.id);
    const total = await calculateTotal(orders);
    return { user, orders, total };
  } catch (error) {
    console.error("Помилка на будь-якому з кроків:", error.message);
    throw error; // передаємо далі, якщо викликаючий код теж повинен знати
  }
}`,
        lineNotes: ["Помилка з БУДЬ-ЯКОГО з трьох await-кроків (fetchUser, fetchOrders чи calculateTotal) потрапляє в ЦЕЙ ЖЕ catch — не потрібно писати окремий try/catch для кожного кроку.", "throw error всередині catch ПОВТОРНО кидає ту саму помилку — loadOrderSummary() тепер повертає відхилений проміс, і код, що викликав цю функцію, має свій try/catch чи .catch() для обробки."],
      },
      {
        before: "Додавання контексту до помилки перед повторним киданням:",
        code: `async function loadProfile(userId) {
  try {
    return await fetchUser(userId);
  } catch (error) {
    throw new Error(\`Не вдалося завантажити профіль користувача \${userId}: \${error.message}\`);
  }
}`,
        lineNotes: ["Замість того, щоб просто передати оригінальну помилку далі, тут створюється НОВА помилка з додатковим контекстом (яке саме userId спричинило проблему) — це полегшує діагностику пізніше.", "error.message з оригінальної помилки все ще включений у нове повідомлення — контекст додається, а не замінює оригінальну причину."],
      },
      {
        before: "Без try/catch — необроблене відхилення розповсюджується до викликаючого коду:",
        code: `async function loadUser(id) {
  const user = await fetchUser(id); // немає try/catch
  return user;
}

loadUser(999)
  .then((user) => console.log(user))
  .catch((error) => console.error("Поймано у викликаючому коді:", error.message));
// Помилка з fetchUser НЕ зникає — вона стає відхиленням проміса, що повертає loadUser`,
        lineNotes: ["Без try/catch всередині loadUser відхилення від fetchUser(id) РОЗПОВСЮДЖУЄТЬСЯ — сам проміс, що повертає loadUser(999), стає відхиленим.", "Код, що ВИКЛИКАВ loadUser, обробляє цю помилку через власний .catch() — відповідальність за обробку просто перемістилась на рівень вище, а не зникла."],
      },
    ],
    commonMistakes: ["Забувати try/catch і бути здивованим необробленим відхиленням проміса (unhandled rejection) десь вище по стеку.", "Обробляти помилку в catch занадто широко, приховуючи реальні програмні помилки замість дійсно очікуваних збоїв мережі.", "Не використовувати finally для дій, що мають статись незалежно від результату (наприклад, сховати індикатор завантаження).", "Писати окремий try/catch для КОЖНОГО await замість одного спільного блоку для кількох звʼязаних кроків."],
    dontDoThis: { code: `async function loadDashboard() {\n  const data = await fetchDashboardData(); // БАГ: немає try/catch\n  renderDashboard(data);\n}\n\nloadDashboard(); // якщо fetchDashboardData відхилиться — необроблене відхилення, без .catch() будь-де`, explanation: "Немає ні try/catch всередині loadDashboard, ні .catch() у коді, що її викликає. Якщо fetchDashboardData() відхилиться (наприклад, через збій мережі), це відхилення НІКИМ не обробляється — у консолі зʼявиться попередження про необроблене відхилення проміса (unhandled promise rejection), а користувач просто побачить \"нічого не сталось\" замість повідомлення про помилку чи fallback-інтерфейсу." },
    bestPractices: ["Обгортай await у try/catch, коли потрібна локальна обробка помилки з конкретним fallback.", "Дозволяй одному try/catch охоплювати кілька послідовних, логічно звʼязаних await-кроків.", "Використовуй finally для дій, що мають статись незалежно від результату (сховати спінер, звільнити ресурс).", "Якщо catch не може дати корисний fallback — перекидай помилку (throw) далі, а не проковтуй її мовчки."],
    remember: ["try/catch ловить відхилений await так само, як звичайну кинуту помилку в синхронному коді.", "Один try/catch може охоплювати кілька послідовних await-кроків одночасно.", "Без try/catch необроблене відхилення розповсюджується як відхилений Promise від самої async-функції.", "throw error у catch повторно кидає помилку — відповідальність за обробку переходить до викликаючого коду."],
    interviewQuestions: [
      { question: "Що відбувається з помилкою, якщо await відхиляється БЕЗ try/catch навколо нього?", answer: "Помилка не зникає — вона стає причиною ВІДХИЛЕННЯ проміса, що повертає сама async-функція, всередині якої стався цей await. Відповідальність за обробку переходить до коду, що ВИКЛИКАВ цю async-функцію — через власний try/catch (якщо ця функція await-иться) чи через .catch() (якщо викликається як звичайний проміс)." },
      { question: "Чи можна одним try/catch обробити помилки з КІЛЬКОХ await-кроків?", answer: "Так. Якщо кілька await-виразів написані послідовно ВСЕРЕДИНІ одного блоку try, помилка з БУДЬ-ЯКОГО з них (першого, що реально відхилиться) одразу передає виконання в спільний catch — немов кожен рядок try в синхронному коді, де перша кинута помилка перериває виконання решти блоку." },
      { question: "Для чого можна повторно кинути (re-throw) помилку всередині catch?", answer: "Іноді catch на поточному рівні не може дати ДІЙСНО корисний fallback чи хоче лише додати контекст (наприклад, який саме ID спричинив проблему) перед тим, як дозволити помилці розповсюдитись ДАЛІ по стеку викликів — до коду, що краще знає, як з нею впоратись (показати повідомлення користувачу, повторити спробу тощо)." },
      { question: "Чому catch, що ловить ВСІ помилки без розбору й нічого з ними не робить, вважається поганою практикою?", answer: "Такий catch \"проковтує\" помилку мовчки — програма продовжує виконуватись, ніби нічого не сталось, хоча реальна проблема (баг у коді, а не очікуваний збій мережі) залишається непоміченою. Це ускладнює діагностику: замість чіткого повідомлення про помилку розробник бачить лише \"щось не працює\" без жодного слідy в консолі чи логах." },
    ],
    summary: "try/catch навколо await ловить відхилений проміс так само, як звичайну синхронну помилку — один блок може охопити кілька послідовних кроків. Без try/catch відхилення розповсюджується як відхилений Promise від самої async-функції, а не зникає. finally виконується завжди; проковтування помилки без дії — погана практика, що приховує реальні баги.",
    proTip: "Якщо в консолі зʼявляється \"Uncaught (in promise)\" чи попередження про unhandled rejection — перша перевірка: чи є try/catch (чи .catch()) хоч десь на шляху виклику цієї async-функції.",
    nextLessonNote: "Далі — паралельні запити: як запустити кілька незалежних асинхронних операцій ОДНОЧАСНО через Promise.all, замість повільного послідовного очікування.",
    interactiveDemo: "try-catch-async-demo",
    practiceTask: {
      title: "Додай try/catch до функції, що не обробляє помилку мережі",
      description: "Функція loadProfile викликає fetchUser без try/catch, тому при збої мережі користувач бачить лише необроблену помилку в консолі, а не зрозуміле повідомлення. Додай try/catch з fallback.",
      checklist: ["Функція обробляє помилку через try/catch.", "При збої повертається зрозумілий fallback (наприклад, null чи повідомлення).", "Успішний випадок продовжує працювати без змін."],
      starterFiles: [
        {
          id: "js-trycatch-async-start",
          path: "script.js",
          language: "javascript",
          label: "script.js",
          code: `function fetchUser(id) {
  if (id < 0) {
    return Promise.reject(new Error("Некоректний ID користувача"));
  }
  return Promise.resolve({ id, name: "Оля" });
}

async function loadProfile(id) {
  const user = await fetchUser(id); // БАГ: немає try/catch
  console.log("Профіль:", user);
  return user;
}

loadProfile(-1);
`,
        },
      ],
      solutionFiles: [
        {
          id: "js-trycatch-async-solution",
          path: "script.js",
          language: "javascript",
          label: "script.js",
          code: `function fetchUser(id) {
  if (id < 0) {
    return Promise.reject(new Error("Некоректний ID користувача"));
  }
  return Promise.resolve({ id, name: "Оля" });
}

async function loadProfile(id) {
  try {
    const user = await fetchUser(id);
    console.log("Профіль:", user);
    return user;
  } catch (error) {
    console.error("Не вдалося завантажити профіль:", error.message);
    return null;
  }
}

loadProfile(-1);
`,
          readOnly: true,
        },
      ],
      hints: ["Обгорни await fetchUser(id) у try.", "У catch поверни зрозумілий fallback і залогуй помилку."],
      expectedOutput: "У консолі — зрозуміле повідомлення про помилку, а не необроблене відхилення",
    },
    microExercises: [
      { id: "js-trycatch-predict", kind: "predict", prompt: "Що виведе цей код, якщо fetchData() відхиляється з помилкою \"Мережа недоступна\"?", code: `try {\n  const data = await fetchData();\n  console.log("Успіх:", data);\n} catch (error) {\n  console.log("Помилка:", error.message);\n}`, solution: "\"Помилка: Мережа недоступна\" — оскільки fetchData() відхиляється, await кидає причину відхилення як звичайну помилку, і виконання переходить у catch, минаючи рядок console.log(\"Успіх:\", data)." },
      { id: "js-trycatch-nocatch-find-bug", kind: "find-the-bug", prompt: "У чому проблема цього коду?", code: `async function saveData(data) {\n  const result = await api.save(data); // може відхилитись\n  return result;\n}\nsaveData(myData); // викликається без .catch() чи try/catch будь-де`, solution: "Немає try/catch всередині saveData, і немає .catch() у коді, що її викликає. Якщо api.save(data) відхилиться, це відхилення НІКИМ не обробляється — виникне необроблене відхилення проміса (unhandled rejection), і користувач не отримає жодного зрозумілого сигналу про помилку." },
      { id: "js-trycatch-finally-choice", kind: "choice", prompt: "Що виконається ЗАВЖДИ, незалежно від того, чи try завершився успішно, чи стався catch?", options: ["ще один try", "catch виконується двічі", "finally", "нічого додаткового не потрібно"], correctAnswer: "finally", solution: "Блок finally (той самий, що й у синхронному try/catch/finally) виконується ЗАВЖДИ після try/catch, незалежно від того, чи try завершився успішно, чи спрацював catch — типове використання: сховати індикатор завантаження чи звільнити ресурс." },
      { id: "js-trycatch-rethrow-explain", kind: "explain", prompt: "Поясни, для чого може знадобитись throw error всередині catch, а не просто \"проковтнути\" помилку.", solution: "Якщо на ПОТОЧНОМУ рівні немає дійсно корисного fallback (наприклад, немає розумного значення за замовчуванням), краще дозволити помилці розповсюдитись ДАЛІ по стеку викликів — до коду, що краще знає, як з нею впоратись (показати повідомлення користувачу, повторити спробу, залогувати в систему моніторингу). throw error (чи новий Error з доданим контекстом) передає цю відповідальність вище, замість мовчазного \"проковтування\" проблеми." },
      { id: "js-trycatch-rewrite", kind: "rewrite", prompt: "Перепиши .catch()-ланцюжок через try/catch з async/await.", code: `function loadSettings() {\n  return fetchSettings()\n    .then((settings) => applyTheme(settings))\n    .catch((error) => console.error("Помилка:", error.message));\n}`, solution: `async function loadSettings() {\n  try {\n    const settings = await fetchSettings();\n    applyTheme(settings);\n  } catch (error) {\n    console.error("Помилка:", error.message);\n  }\n}\n// та сама логіка, без .then()/.catch() — читається як синхронний код` },
    ],
  },

  "Паралельні запити": {
    whatIsIt: "Promise.all([p1, p2, ...]) запускає кілька промісів ОДНОЧАСНО (паралельно) і повертає ОДИН проміс, що виконується (fulfilled) з масивом усіх результатів, коли ВСІ вхідні проміси успішно завершились — або одразу відхиляється (fail-fast), щойно ХОЧ ОДИН з них відхиляється, ігноруючи результати інших. Promise.allSettled([p1, p2, ...]) натомість ЗАВЖДИ чекає завершення УСІХ промісів (незалежно від успіху чи невдачі кожного) і повертає масив обʼєктів {status, value} чи {status, reason} для кожного — ніколи не відхиляється \"достроково\".",
    whyUseIt: "Послідовні await для НЕЗАЛЕЖНИХ операцій витрачають час МАРНО — загальний час стає сумою часів усіх операцій. Promise.all запускає їх одночасно, тому загальний час стає лише МАКСИМУМОМ з часів окремих операцій — суттєве прискорення, коли операції справді не залежать одна від одної. Promise.allSettled корисний, коли потрібні результати ВСІХ запитів, навіть якщо частина з них провалилась (наприклад, дашборд з кількома незалежними віджетами).",
    whenToUse: ["Кілька незалежних асинхронних операцій, результат яких потрібен УСІМ одночасно (кілька fetch-запитів до різних endpoint-ів).", "Ситуація, де провал БУДЬ-ЯКОЇ операції має скасувати весь процес — Promise.all.", "Ситуація, де частковий провал прийнятний і потрібен статус КОЖНОЇ операції — Promise.allSettled."],
    whenNotToUse: ["Не використовуй Promise.all для операцій, що МАЮТЬ виконуватись послідовно (кожна залежить від результату попередньої) — для цього потрібні звичайні послідовні await.", "Не використовуй Promise.all, коли потрібні результати ВСІХ запитів навіть при частковому провалі — Promise.all відхиляється одразу й \"губить\" інформацію про успішні результати; для цього призначений Promise.allSettled.", "Не забувай перевіряти status кожного елемента результату Promise.allSettled — на відміну від Promise.all, він не гарантує, що кожен результат є успішним значенням."],
    comparisonTable: {
      headers: ["Метод", "Поведінка при частковому провалі"],
      rows: [
        ["Promise.all([...])", "відхиляється ОДРАЗУ при першому провалі, результати інших ІГНОРУЮТЬСЯ"],
        ["Promise.allSettled([...])", "чекає завершення УСІХ, повертає статус кожного (fulfilled/rejected) окремо"],
      ],
    },
    codeWalkthroughs: [
      {
        before: "Послідовні await (повільно) проти Promise.all (швидко) — реально вимірюваний час:",
        code: `// Повільно: кожен запит чекає завершення попереднього
const start1 = Date.now();
const weather = await fetchWeather(); // ~500мс
const news = await fetchNews();       // ~500мс, починається лише ПІСЛЯ weather
console.log("Послідовно:", Date.now() - start1, "мс"); // ~1000мс

// Швидко: обидва запити стартують ОДНОЧАСНО
const start2 = Date.now();
const [weather2, news2] = await Promise.all([fetchWeather(), fetchNews()]);
console.log("Паралельно:", Date.now() - start2, "мс"); // ~500мс`,
        lineNotes: ["У послідовному варіанті fetchNews() навіть НЕ ПОЧИНАЄТЬСЯ, доки не завершиться fetchWeather() — загальний час дорівнює СУМІ обох часів.", "Promise.all запускає fetchWeather() і fetchNews() ОДНОЧАСНО (обидва виклики виконуються синхронно, повертаючи проміси одразу) — загальний час дорівнює МАКСИМУМУ з двох часів, а не сумі."],
      },
      {
        before: "Promise.all відхиляється одразу при першому провалі — результати інших губляться:",
        code: `try {
  const [a, b, c] = await Promise.all([
    fetchA(), // успішно
    fetchB(), // відхиляється!
    fetchC(), // успішно, але результат буде ІГНОРОВАНИЙ
  ]);
} catch (error) {
  console.error("Один із запитів провалився:", error.message);
  // результати fetchA і fetchC НЕДОСТУПНІ тут, навіть якщо вони встигли завершитись успішно
}`,
        lineNotes: ["Щойно fetchB() відхиляється, Promise.all ОДРАЗУ відхиляється, не чекаючи на fetchC() — навіть якщо fetchC() зрештою успішно завершився б, його результат НЕДОСТУПНИЙ у цьому catch.", "Це поведінка \"fail-fast\" — доречна, коли провал БУДЬ-ЯКОГО із запитів робить подальшу роботу безглуздою."],
      },
      {
        before: "Promise.allSettled чекає на всі, повертаючи статус кожного окремо:",
        code: `const results = await Promise.allSettled([fetchA(), fetchB(), fetchC()]);

results.forEach((result, i) => {
  if (result.status === "fulfilled") {
    console.log(\`Запит \${i} успішний:\`, result.value);
  } else {
    console.log(\`Запит \${i} провалився:\`, result.reason.message);
  }
});
// Навіть якщо fetchB() відхилився, результати fetchA і fetchC ДОСТУПНІ`,
        lineNotes: ["Promise.allSettled НІКОЛИ не відхиляється сам — він завжди виконується (fulfilled) з масивом ОБʼЄКТІВ-РЕЗУЛЬТАТІВ, по одному на кожен вхідний проміс, незалежно від того, скільки з них провалилось.", "Кожен елемент масиву має властивість status (\"fulfilled\" чи \"rejected\") — саме за нею визначається, чи звертатись до .value (успіх) чи до .reason (причина провалу)."],
      },
      {
        before: "Деструктуризація результатів Promise.all у названі змінні — порядок результатів ЗБЕРІГАЄТЬСЯ:",
        code: `const [user, orders, settings] = await Promise.all([
  fetchUser(1),
  fetchOrders(1),
  fetchSettings(1),
]);
// user, orders, settings отримують результати у ТОМУ САМОМУ порядку,
// що й проміси у вхідному масиві — незалежно від того, який з них завершився РАНІШЕ`,
        lineNotes: ["Масив результатів Promise.all ЗАВЖДИ відповідає порядку вхідних промісів, а не порядку їх фактичного завершення — навіть якщо fetchSettings() реально завершиться найшвидше, її результат все одно буде ТРЕТІМ елементом масиву.", "Це дозволяє безпечно деструктурувати результати в названі змінні, знаючи наперед, який результат відповідає якому запиту."],
      },
    ],
    commonMistakes: ["Використовувати послідовні await для операцій, що НЕ залежать одна від одної — марна втрата часу.", "Забувати, що Promise.all відхиляється одразу при першому провалі, \"губля\" результати інших успішних операцій.", "Використовувати Promise.all, коли потрібен статус КОЖНОГО запиту навіть при частковому провалі — для цього призначений Promise.allSettled.", "Не перевіряти result.status у результатах Promise.allSettled перед зверненням до .value чи .reason."],
    dontDoThis: { code: `async function loadDashboard() {\n  const weather = await fetchWeather(); // БАГ: послідовно, хоч і незалежні\n  const news = await fetchNews();\n  const stocks = await fetchStocks();\n  return { weather, news, stocks };\n}\n// Загальний час = сума ТРЬОХ часів запитів, замість максимуму з них`, explanation: "Усі три запити (weather, news, stocks) НЕ залежать одне від одного — кожен міг би стартувати одночасно з іншими. Але послідовні await змушують кожен наступний запит чекати ПОВНОГО завершення попереднього, перш ніж навіть розпочатись. Якщо кожен запит займає ~500мс, загальний час стане ~1500мс замість ~500мс, які були б потрібні при паралельному запуску через Promise.all — це пряма й легко виправна втрата продуктивності." },
    bestPractices: ["Запускай незалежні асинхронні операції одночасно через Promise.all замість послідовних await.", "Використовуй Promise.all, коли провал будь-якої операції має скасувати весь процес.", "Використовуй Promise.allSettled, коли потрібні результати всіх операцій навіть при частковому провалі.", "Завжди перевіряй result.status перед зверненням до .value чи .reason у результатах Promise.allSettled."],
    remember: ["Promise.all запускає проміси ОДНОЧАСНО; загальний час — максимум, а не сума, з часів окремих операцій.", "Promise.all відхиляється одразу при першому провалі — результати інших губляться.", "Promise.allSettled завжди чекає на всі й повертає статус (fulfilled/rejected) кожного окремо, ніколи не відхиляючись сам.", "Порядок результатів Promise.all/allSettled відповідає порядку вхідних промісів, а не порядку їх завершення."],
    interviewQuestions: [
      { question: "Чому Promise.all швидший за послідовні await для незалежних операцій?", answer: "Promise.all запускає всі вхідні проміси ОДНОЧАСНО (кожен виклик функції, що повертає проміс, виконується синхронно й одразу стартує свою асинхронну роботу) — загальний час очікування дорівнює МАКСИМУМУ з часів окремих операцій. Послідовні await натомість змушують кожну наступну операцію чекати ПОВНОГО завершення попередньої, перш ніж навіть розпочатись — загальний час стає СУМОЮ всіх часів." },
      { question: "Що станеться з результатами успішних промісів, якщо один з промісів у Promise.all відхиляється?", answer: "Promise.all ОДРАЗУ відхиляється, щойно ХОЧ ОДИН вхідний проміс відхиляється (fail-fast) — результати ІНШИХ промісів, навіть якщо вони встигли (чи встигнуть) успішно завершитись, НЕДОСТУПНІ через цей відхилений Promise.all. Якщо потрібні результати всіх, незалежно від часткового провалу, слід використовувати Promise.allSettled." },
      { question: "У чому принципова різниця між Promise.all і Promise.allSettled?", answer: "Promise.all відхиляється одразу при першому провалі й повертає масив значень ЛИШЕ якщо ВСІ проміси успішні. Promise.allSettled НІКОЛИ не відхиляється сам — він завжди чекає завершення УСІХ промісів і повертає масив обʼєктів зі статусом (\"fulfilled\" чи \"rejected\") для кожного окремо, дозволяючи дізнатись результат і успішних, і провалених операцій одночасно." },
      { question: "Чи гарантований порядок результатів у масиві, що повертає Promise.all?", answer: "Так. Масив результатів ЗАВЖДИ відповідає порядку вхідного масиву промісів, а НЕ порядку їх фактичного завершення. Навіть якщо третій проміс завершується найшвидше з усіх, його результат все одно буде третім елементом у результуючому масиві." },
    ],
    summary: "Promise.all запускає незалежні проміси одночасно — загальний час стає максимумом, а не сумою; відхиляється одразу при першому провалі, губля результати інших. Promise.allSettled чекає на всі й повертає статус кожного окремо, ніколи не відхиляючись сам. Порядок результатів завжди відповідає порядку вхідних промісів.",
    proTip: "Якщо кілька await-запитів у коді явно НЕ залежать один від одного — це кандидат на заміну послідовних await на Promise.all для реального прискорення.",
    nextLessonNote: "Далі — основи скасування запитів: як зупинити непотрібний fetch-запит через AbortController, наприклад коли користувач вводить новий пошуковий запит швидше, ніж встигає завершитись попередній.",
    interactiveDemo: "parallel-requests-demo",
    practiceTask: {
      title: "Заміни повільні послідовні await на швидкий Promise.all",
      description: "Функція loadDashboard завантажує погоду й новини послідовно, хоча вони не залежать одна від одної. Перепиши через Promise.all для прискорення.",
      checklist: ["weather і news завантажуються ОДНОЧАСНО, не послідовно.", "Використано Promise.all.", "Результат { weather, news } залишається тим самим."],
      starterFiles: [
        {
          id: "js-parallel-start",
          path: "script.js",
          language: "javascript",
          label: "script.js",
          code: `function fetchWeather() {
  return new Promise((resolve) => setTimeout(() => resolve("Сонячно"), 500));
}
function fetchNews() {
  return new Promise((resolve) => setTimeout(() => resolve(["Новина 1", "Новина 2"]), 500));
}

async function loadDashboard() {
  const weather = await fetchWeather(); // БАГ: послідовно, хоч незалежні
  const news = await fetchNews();
  return { weather, news };
}

loadDashboard().then(console.log);
`,
        },
      ],
      solutionFiles: [
        {
          id: "js-parallel-solution",
          path: "script.js",
          language: "javascript",
          label: "script.js",
          code: `function fetchWeather() {
  return new Promise((resolve) => setTimeout(() => resolve("Сонячно"), 500));
}
function fetchNews() {
  return new Promise((resolve) => setTimeout(() => resolve(["Новина 1", "Новина 2"]), 500));
}

async function loadDashboard() {
  const [weather, news] = await Promise.all([fetchWeather(), fetchNews()]);
  return { weather, news };
}

loadDashboard().then(console.log);
`,
          readOnly: true,
        },
      ],
      hints: ["fetchWeather і fetchNews не залежать одна від одної.", "Promise.all([fetchWeather(), fetchNews()]) запускає обидві одночасно."],
      expectedOutput: "Результат той самий, але виконується приблизно вдвічі швидше (~500мс замість ~1000мс)",
    },
    microExercises: [
      { id: "js-parallel-time-predict", kind: "predict", prompt: "Якщо fetchA() і fetchB() кожен займають 400мс, скільки приблизно триватиме Promise.all([fetchA(), fetchB()])?", code: `await Promise.all([fetchA(), fetchB()]);`, solution: "~400мс (максимум з двох, а не сума) — Promise.all запускає обидва проміси одночасно, тому загальний час очікування дорівнює найдовшому з них, а не сумі 400+400=800мс." },
      { id: "js-parallel-sequential-find-bug", kind: "find-the-bug", prompt: "Що можна покращити в цьому коді, якщо fetchCategories і fetchProducts не залежать одне від одного?", code: `const categories = await fetchCategories();\nconst products = await fetchProducts();`, solution: "Обидва запити виконуються ПОСЛІДОВНО, хоча вони незалежні — загальний час дорівнює сумі часів обох запитів. Краще: const [categories, products] = await Promise.all([fetchCategories(), fetchProducts()]); — це запускає обидва одночасно, зменшуючи загальний час до максимуму з двох, а не суми." },
      { id: "js-parallel-allsettled-choice", kind: "choice", prompt: "Який метод варто використати, якщо потрібні результати ВСІХ запитів, навіть якщо частина з них провалиться?", options: ["Promise.all", "Promise.race", "Promise.allSettled", "Promise.any"], correctAnswer: "Promise.allSettled", solution: "Promise.allSettled чекає завершення УСІХ промісів незалежно від успіху чи провалу кожного й повертає статус для кожного окремо — на відміну від Promise.all, який відхиляється одразу при першому провалі, губля результати інших." },
      { id: "js-parallel-failfast-explain", kind: "explain", prompt: "Поясни, чому Promise.all вважається поведінкою \"fail-fast\".", solution: "Promise.all не чекає завершення ВСІХ промісів, якщо хоч один з них відхиляється — щойно перший проміс відхиляється, весь Promise.all ОДРАЗУ переходить у стан rejected із причиною цього першого провалу, ігноруючи стан решти промісів (навіть якщо вони зрештою успішно завершились би). Це \"швидкий провал\" (fail-fast) — доречний, коли подальша робота без ВСІХ результатів однаково безглузда." },
      { id: "js-parallel-rewrite", kind: "rewrite", prompt: "Перепиши код, щоб він продовжував працювати навіть якщо один із трьох запитів провалиться, показуючи статус кожного.", code: `const [a, b, c] = await Promise.all([fetchA(), fetchB(), fetchC()]);\nconsole.log(a, b, c);`, solution: `const results = await Promise.allSettled([fetchA(), fetchB(), fetchC()]);\nresults.forEach((result, i) => {\n  if (result.status === "fulfilled") {\n    console.log(\`Запит \${i}:\`, result.value);\n  } else {\n    console.log(\`Запит \${i} провалився:\`, result.reason.message);\n  }\n});\n// Promise.allSettled не відхиляється навіть якщо частина запитів провалилась` },
    ],
  },

  "Основи скасування запитів": {
    whatIsIt: "AbortController — вбудований обʼєкт, що створює контролер зі властивістю .signal. Передача controller.signal у параметри fetch (як { signal }) дозволяє СКАСУВАТИ запит, що вже виконується, викликом controller.abort() — після цього проміс від fetch відхиляється з помилкою типу AbortError. Це стандартний, вбудований у браузер спосіб скасування асинхронних операцій, що підтримують сигнали (fetch та деякі інші API).",
    whyUseIt: "Без скасування застарілий (повільний) запит, розпочатий РАНІШЕ, може завершитись ПІЗНІШЕ за новіший запит і перезаписати актуальніший результат застарілими даними — класична race condition (наприклад, у живому пошуку: користувач вводить \"а\", потім швидко \"аб\", і повільна відповідь на \"а\" приходить ПІСЛЯ швидшої відповіді на \"аб\", показуючи неправильні результати). AbortController дозволяє явно скасувати попередній запит перед стартом нового, гарантуючи, що застаріла відповідь ніколи не буде використана.",
    whenToUse: ["Живий пошук/автозаповнення — кожен новий символ повинен скасовувати ПОПЕРЕДНІЙ запит, ще не завершений.", "Скасування fetch-запиту при демонтажі компонента, щоб уникнути оновлення стану вже неіснуючого компонента.", "Надання користувачу явної кнопки \"Скасувати\" для довготривалої операції."],
    whenNotToUse: ["Не скасовуй операції, що ОБОВʼЯЗКОВО повинні завершитись незалежно від подальших дій користувача (наприклад, одноразова операція оплати).", "Не всі API підтримують AbortSignal — перевіряй документацію конкретного API, перш ніж розраховувати на можливість скасування.", "Не забувай окремо обробляти AbortError — це навмисне скасування, а не реальна помилка мережі, тому зазвичай його варто мовчки ігнорувати, а не показувати користувачу як збій."],
    comparisonTable: {
      headers: ["Підхід", "Що відбувається зі старою відповіддю"],
      rows: [
        ["Без скасування", "стара повільна відповідь може прийти ПІЗНІШЕ й перезаписати новіший результат"],
        ["З AbortController", "старий запит явно скасовується перед стартом нового — застаріла відповідь ніколи не використовується"],
      ],
    },
    codeWalkthroughs: [
      {
        before: "Базове створення AbortController і скасування запиту:",
        code: `const controller = new AbortController();

fetch("/api/data", { signal: controller.signal })
  .then((response) => response.json())
  .then((data) => console.log("Отримано:", data))
  .catch((error) => {
    if (error.name === "AbortError") {
      console.log("Запит скасовано");
    } else {
      console.error("Реальна помилка:", error.message);
    }
  });

controller.abort(); // скасовує запит вище`,
        lineNotes: ["controller.signal передається у fetch — це те, що дозволяє fetch \"слухати\" сигнал скасування.", "Перевірка error.name === \"AbortError\" відрізняє НАВМИСНЕ скасування від РЕАЛЬНОЇ помилки мережі — це два принципово різні випадки, які варто обробляти по-різному."],
      },
      {
        before: "Живий пошук — скасування ПОПЕРЕДНЬОГО запиту перед стартом нового при кожному новому символі:",
        code: `let currentController = null;

function search(query) {
  if (currentController) {
    currentController.abort(); // скасовуємо попередній незавершений запит
  }
  currentController = new AbortController();

  return fetch(\`/api/search?q=\${query}\`, { signal: currentController.signal })
    .then((response) => response.json());
}`,
        lineNotes: ["Перед кожним новим пошуком перевіряється, чи є ПОПЕРЕДНІЙ активний controller — якщо є, він скасовується, гарантуючи, що застаріла відповідь на попередній запит ніколи не прийде й не перезапише щось новіше.", "Новий AbortController створюється для КОЖНОГО нового запиту — controller не можна \"перевикористати\" після abort()."],
      },
      {
        before: "Реальна race condition без скасування — застаріла відповідь перезаписує новішу:",
        code: `// Без AbortController:
search("a").then((results) => renderResults(results));   // повільний запит
search("ab").then((results) => renderResults(results));  // швидший запит
// Якщо відповідь на "a" прийде ПІЗНІШЕ за відповідь на "ab" —
// renderResults покаже застарілі результати для "a" останніми`,
        lineNotes: ["Обидва fetch-запити стартують незалежно один від одного — час завершення кожного залежить від мережі, і НЕМАЄ гарантії, що вони прийдуть у тому порядку, в якому були відправлені.", "Без явного скасування застарілого запиту НІЧОГО не заважає його відповіді прийти ПІЗНІШЕ й перезаписати актуальніший результат — це і є race condition, яку вирішує AbortController."],
      },
      {
        before: "Скасування запиту при demontage компонента (аналог cleanup у React useEffect):",
        code: `function useUserData(userId) {
  useEffect(() => {
    const controller = new AbortController();

    fetch(\`/api/users/\${userId}\`, { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((error) => {
        if (error.name !== "AbortError") console.error(error);
      });

    return () => controller.abort(); // cleanup: скасувати при демонтажі чи зміні userId
  }, [userId]);
}`,
        lineNotes: ["Функція, що повертається з useEffect (cleanup), викликається React автоматично при демонтажі компонента чи перед повторним запуском ефекту (наприклад, якщо userId змінився) — саме тут викликається controller.abort().", "Без цього скасування запит для СТАРОГО userId міг би завершитись ПІСЛЯ демонтажу компонента чи зміни userId і спробувати оновити стан, якого вже не повинно існувати."],
      },
    ],
    commonMistakes: ["Не перевіряти error.name === \"AbortError\" окремо — показувати користувачу повідомлення про \"помилку\" для навмисного скасування.", "Не скасовувати ПОПЕРЕДНІЙ запит перед стартом нового в сценарії живого пошуку — призводить до race condition із застарілими результатами.", "Вважати, що abort() негайно зупиняє обробку запиту НА СЕРВЕРІ — реально він лише зупиняє КЛІЄНТСЬКЕ очікування й використання відповіді, відхиляючи локальний проміс.", "Намагатись повторно використати ВЖЕ скасований AbortController для нового запиту — потрібен НОВИЙ екземпляр AbortController для кожного нового запиту."],
    dontDoThis: { code: `function search(query) {\n  // БАГ: немає скасування попереднього запиту\n  return fetch(\`/api/search?q=\${query}\`)\n    .then((res) => res.json())\n    .then((results) => renderResults(results));\n}\n\n// Користувач швидко вводить "a", потім "ab" — два незалежні fetch без скасування`, explanation: "Кожен виклик search() запускає новий fetch, повністю НЕЗАЛЕЖНИЙ від попереднього — немає жодного механізму, який гарантував би, що застаріла відповідь (наприклад, на пошуковий запит \"a\") не прийде ПІЗНІШЕ за відповідь на новіший запит (\"ab\") і не перезапише більш релевантні результати. Це реальна race condition: інтерфейс може \"мигнути\" застарілими результатами навіть після того, як користувач вже ввів більш точний запит." },
    bestPractices: ["Створюй новий AbortController для КОЖНОГО нового запиту, що потенційно потребує скасування.", "Скасовуй ПОПЕРЕДНІЙ запит перед стартом нового у сценаріях типу живого пошуку.", "Завжди перевіряй error.name === \"AbortError\" окремо від реальних помилок мережі.", "Скасовуй запити при демонтажі компонента (cleanup) для запобігання оновленню стану вже неіснуючого компонента."],
    remember: ["new AbortController() створює .signal, який передається в fetch({ signal }) для можливості скасування.", "controller.abort() скасовує запит — проміс fetch відхиляється з помилкою типу AbortError.", "AbortError — навмисне скасування, а не реальна помилка мережі; обробляй окремо.", "Скасовуй попередній запит перед стартом нового, щоб уникнути race condition із застарілими відповідями."],
    interviewQuestions: [
      { question: "Як AbortController дозволяє скасувати fetch-запит?", answer: "new AbortController() створює обʼєкт зі властивістю .signal. Цей .signal передається в опції fetch як { signal } — fetch \"підписується\" на цей сигнал. Коли пізніше викликається controller.abort(), сигнал \"спрацьовує\", і проміс, що повертає fetch, відхиляється з помилкою типу AbortError, а сам запит клієнтською стороною припиняє очікування відповіді." },
      { question: "Чому важливо окремо обробляти error.name === \"AbortError\" у catch?", answer: "AbortError виникає через НАВМИСНЕ скасування запиту розробником (через controller.abort()), а не через реальну проблему мережі чи сервера. Показ користувачу повідомлення про \"помилку\" для навмисного скасування (наприклад, при живому пошуку, де попередній запит скасовується заради нового) було б неправильним і збиваючим з пантелику — такі випадки варто просто ігнорувати мовчки." },
      { question: "Що конкретно відбувається на сервері, коли клієнт викликає controller.abort()?", answer: "abort() гарантовано зупиняє лише КЛІЄНТСЬКУ сторону — браузер припиняє очікування відповіді й відхиляє локальний проміс. Сервер може (залежно від реалізації й того, чи він відстежує розірване зʼєднання) продовжити чи не продовжити обробку запиту — abort() не є гарантією того, що серверна обробка теж негайно зупиниться." },
      { question: "Чому в сценарії живого пошуку важливо скасовувати попередній запит перед стартом нового?", answer: "Без скасування кожен новий пошуковий запит запускає НЕЗАЛЕЖНИЙ fetch, і немає гарантії порядку отримання відповідей — повільніша відповідь на СТАРІШИЙ (менш релевантний) запит могла б прийти ПІЗНІШЕ за швидшу відповідь на НОВІШИЙ запит, перезаписуючи актуальніші результати застарілими. Скасування попереднього запиту гарантує, що лише відповідь на найновіший запит буде реально використана." },
    ],
    summary: "AbortController.signal, переданий у fetch({ signal }), дозволяє скасувати запит через controller.abort() — проміс відхиляється з AbortError. Це вирішує race condition (застаріла повільна відповідь перезаписує новішу), поширену в живому пошуку. AbortError — навмисне скасування, обробляти окремо від реальних помилок; потрібен новий AbortController для кожного нового запиту.",
    proTip: "Якщо в живому пошуку іноді \"миготять\" застарілі результати — перша перевірка: чи скасовується попередній запит через AbortController перед стартом нового.",
    nextLessonNote: "Це завершує модуль \"Асинхронний JavaScript\" — далі на черзі мережа та сховище: Fetch API у деталях, обробка HTTP-статусів і LocalStorage.",
    interactiveDemo: "abort-controller-demo",
    practiceTask: {
      title: "Виправ живий пошук, що не скасовує попередній запит",
      description: "Функція search запускає новий fetch на кожен символ, не скасовуючи попередній — застарілі результати можуть перезаписати новіші. Додай AbortController.",
      checklist: ["Попередній запит скасовується перед стартом нового.", "AbortError обробляється окремо (мовчки ігнорується).", "Реальні помилки мережі все ще логуються."],
      starterFiles: [
        {
          id: "js-abort-start",
          path: "script.js",
          language: "javascript",
          label: "script.js",
          code: `function search(query) {
  // БАГ: немає скасування попереднього запиту
  return fetch(\`/api/search?q=\${query}\`)
    .then((res) => res.json())
    .then((results) => console.log("Результати для", query, ":", results))
    .catch((error) => console.error("Помилка:", error.message));
}
`,
        },
      ],
      solutionFiles: [
        {
          id: "js-abort-solution",
          path: "script.js",
          language: "javascript",
          label: "script.js",
          code: `let currentController = null;

function search(query) {
  if (currentController) {
    currentController.abort();
  }
  currentController = new AbortController();

  return fetch(\`/api/search?q=\${query}\`, { signal: currentController.signal })
    .then((res) => res.json())
    .then((results) => console.log("Результати для", query, ":", results))
    .catch((error) => {
      if (error.name !== "AbortError") {
        console.error("Помилка:", error.message);
      }
    });
}
`,
          readOnly: true,
        },
      ],
      hints: ["Зберігай попередній controller у змінній поза функцією.", "Викликай controller.abort() перед створенням нового AbortController."],
      expectedOutput: "Лише результати останнього (найновішого) пошукового запиту реально виводяться в консоль",
    },
    microExercises: [
      { id: "js-abort-predict", kind: "predict", prompt: "Що станеться з проміском fetch, якщо викликати controller.abort() до того, як запит завершився?", code: `fetch(url, { signal: controller.signal }).then(...).catch((err) => console.log(err.name));\ncontroller.abort();`, solution: "Проміс від fetch відхиляється, і в catch err.name дорівнює \"AbortError\" — це навмисне скасування, а не реальна помилка мережі чи сервера." },
      { id: "js-abort-race-find-bug", kind: "find-the-bug", prompt: "У чому проблема цього коду для живого пошуку?", code: `function search(query) {\n  return fetch(\`/api/search?q=\${query}\`).then((r) => r.json());\n}\n// викликається на кожен новий символ, без AbortController`, solution: "Кожен виклик search() запускає повністю незалежний fetch без жодного скасування попереднього. Немає гарантії порядку відповідей — застаріла (повільніша) відповідь на РАНІШЕ введений, менш релевантний запит могла б прийти ПІЗНІШЕ за відповідь на новіший запит і перезаписати актуальніші результати. Потрібен AbortController для скасування попереднього запиту перед стартом нового." },
      { id: "js-abort-error-choice", kind: "choice", prompt: "Яке значення матиме error.name, якщо запит скасовано через controller.abort()?", options: ["\"NetworkError\"", "\"TypeError\"", "\"AbortError\"", "\"TimeoutError\""], correctAnswer: "\"AbortError\"", solution: "Навмисне скасування через controller.abort() відхиляє проміс fetch з помилкою, чий .name дорівнює саме \"AbortError\" — це дозволяє відрізнити навмисне скасування від реальних мережевих помилок (NetworkError, TypeError тощо)." },
      { id: "js-abort-server-explain", kind: "explain", prompt: "Поясни, чому controller.abort() не гарантує, що серверна обробка запиту теж негайно зупиниться.", solution: "abort() впливає лише на КЛІЄНТСЬКУ сторону зʼєднання — браузер перестає ЧЕКАТИ відповідь і відхиляє локальний проміс fetch. Що станеться на СЕРВЕРІ залежить від його реалізації: деякі сервери відстежують розірване зʼєднання й зупиняють обробку, інші можуть продовжити виконувати запит до завершення, просто клієнт уже не отримає (і не використає) цю відповідь." },
      { id: "js-abort-rewrite", kind: "rewrite", prompt: "Перепиши код так, щоб AbortError мовчки ігнорувався, а реальні помилки логувались.", code: `fetch(url, { signal: controller.signal })\n  .then((res) => res.json())\n  .catch((error) => console.error("Помилка:", error.message)); // логує ВСІ помилки, включно з AbortError`, solution: `fetch(url, { signal: controller.signal })\n  .then((res) => res.json())\n  .catch((error) => {\n    if (error.name !== "AbortError") {\n      console.error("Помилка:", error.message);\n    }\n    // AbortError мовчки ігнорується — це навмисне скасування, не реальна помилка\n  });` },
    ],
  },
};
