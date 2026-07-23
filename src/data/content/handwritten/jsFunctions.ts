import type { LessonOverride } from "./htmlFoundations";
import type { QuizData } from "../../../types/course";

/**
 * Module "Функції" (js-functions). Third JavaScript module — declaring
 * reusable logic, arrow functions and `this`, default/rest parameters, and
 * return values. Same deep cheat-sheet lesson format as js-control-flow.
 */
export const jsFunctionsOverrides: Record<string, LessonOverride> = {
  "Оголошення функцій": {
    whatIsIt: "Функцію можна оголосити двома основними способами: function-declaration (function calculatePrice() {...}) і function-expression (const calculatePrice = function() {...} чи стрілкова). Ключова відмінність — hoisting: оголошення функції піднімається наверх області видимості цілком, з тілом, тому її можна викликати ще ДО рядка визначення в коді; вираз-функція піднімається лише як змінна, без значення, тому виклик до рядка визначення кидає помилку.",
    whyUseIt: "Утилітарні функції для розрахунку ціни, форматування дати чи валідації форми визначаються один раз і викликаються в багатьох місцях коду. Розуміння різниці між hoisting оголошення й виразу пояснює, чому один стиль дозволяє викликати функцію \"заздалегідь\" у файлі, а інший — ні, і рятує від помилки \"Cannot access before initialization\".",
    whenToUse: ["Утилітарні функції верхнього рівня файлу, які використовуються в багатьох місцях — function-declaration дає гнучкість порядку виклику завдяки hoisting.", "function-expression (включно зі стрілковими), коли функція — це значення: передається як аргумент, зберігається у властивості обʼєкта чи умовно призначається.", "Іменовані function-declaration для стек-трейсів і читабельності помилок у DevTools.", "Функція, доступна лише всередині блоку (if, for) — обидва стилі підтримують блокову область видимості з let/const."],
    whenNotToUse: ["Не покладайся на hoisting як на стиль коду \"для зручності\" — визначай функції ДО використання, навіть якщо hoisting технічно дозволяє інакше.", "Не оголошуй одну й ту саму функцію по-різному в різних гілках коду (function у if і function у else з тим самим іменем) — поведінка hoisting у такому випадку залежить від рушія й непередбачувана.", "Не використовуй function-expression, якщо плануєш викликати функцію до її визначення в тому ж файлі — отримаєш ReferenceError."],
    comparisonTable: {
      headers: ["Стиль", "Hoisting", "Коли можна викликати"],
      rows: [
        ["function decl.", "піднімається ПОВНІСТЮ (з тілом)", "до і після визначення"],
        ["function expr. (const)", "лише змінна, без значення (TDZ)", "лише ПІСЛЯ рядка визначення"],
        ["Стрілкова функція (const)", "лише змінна, без значення (TDZ)", "лише ПІСЛЯ рядка визначення"],
      ],
    },
    codeWalkthroughs: [
      {
        before: "function-declaration можна викликати навіть до рядка, де вона визначена у файлі:",
        code: `console.log(getDiscount(1000)); // працює: 200 — виклик ДО визначення нижче

function getDiscount(cartTotal) {
  return cartTotal * 0.2;
}`,
        lineNotes: ["JavaScript переносить усе тіло function-declaration наверх ще до виконання першого рядка — функція вже повністю готова.", "Це працює лише для function-declaration, не для function-expression чи стрілкових функцій, присвоєних const/let."],
      },
      {
        before: "function-expression — виклик до рядка визначення кидає помилку, бо піднімається лише сама змінна:",
        code: `// console.log(getTax(1000)); // ReferenceError: Cannot access 'getTax' before initialization

const getTax = function (amount) {
  return amount * 0.2;
};

console.log(getTax(1000)); // 200 — працює ПІСЛЯ визначення`,
        lineNotes: ["const getTax піднімається як \"порожня\" змінна (у тимчасовій мертвій зоні) — звернення до неї до рядка присвоєння кидає помилку.", "Той самий код після рядка визначення працює без проблем."],
      },
      {
        before: "Реальна утиліта для розрахунку суми кошика, визначена один раз і викликана з кількох місць коду:",
        code: `function calculateCartTotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

const cart = [
  { name: "Книга", price: 300, quantity: 2 },
  { name: "Ручка", price: 20, quantity: 5 },
];

console.log(calculateCartTotal(cart)); // 700`,
        lineNotes: ["calculateCartTotal — function-declaration, тому теоретично могла б викликатись і вище в файлі, хоча так найчастіше не роблять для читабельності.", "Функція визначена ОДИН раз, але може бути викликана з будь-якої кількості місць коду з різними даними."],
      },
      {
        before: "Умовне оголошення тієї самої функції в if/else — заплутана, ненадійна поведінка hoisting:",
        code: `if (true) {
  function getLabel() {
    return "Варіант A";
  }
} else {
  function getLabel() {
    return "Варіант Б";
  }
}

console.log(getLabel()); // поведінка залежить від рушія — НЕ покладайся на це`,
        lineNotes: ["function-declaration усередині if/else — нестандартна практика; різні рушії JavaScript можуть поводитись по-різному.", "Правильніше: оголосити getLabel як function-expression поза if/else і присвоїти потрібне значення всередині блоків."],
        after: "Якщо потрібна умовна логіка вибору функції — присвоюй результат const-змінній усередині if/else, а не оголошуй саму функцію умовно.",
      },
    ],
    commonMistakes: ["Виклик function-expression (const/стрілкової) до рядка її визначення — ReferenceError.", "Умовне оголошення function-declaration у if/else з тим самим іменем — ненадійна, залежна від рушія поведінка.", "Плутанина: думати, що hoisting працює однаково для const getFn = () => {} і function getFn() {}.", "Покладання на hoisting як на \"стиль коду\", замість визначення функцій до використання для читабельності."],
    dontDoThis: { code: `console.log(formatPrice(500)); // ReferenceError\n\nconst formatPrice = (amount) => \`\${amount} грн\`;`, explanation: "formatPrice оголошена через const — стрілкові функції та function-expression НЕ отримують hoisting значення, лише самої змінної. Виклик до рядка визначення кидає ReferenceError: Cannot access 'formatPrice' before initialization, навіть попри те, що змінна formatPrice технічно вже \"існує\" в області видимості." },
    bestPractices: ["Визначай функції ДО їх використання в коді незалежно від того, чи дозволяє hoisting інакше — так читається природніше зверху вниз.", "Використовуй function-declaration для утиліт верхнього рівня, викликаних у багатьох місцях.", "Використовуй function-expression/стрілкові функції, коли функція — це значення (передається як аргумент, зберігається у властивості).", "Ніколи не оголошуй function-declaration умовно всередині if/else з однаковим іменем."],
    remember: ["function-declaration піднімається ПОВНІСТЮ — можна викликати до визначення.", "function-expression і стрілкові функції піднімаються лише як змінна (TDZ) — виклик до визначення кидає помилку.", "Обидва стилі підтримують блокову область видимості з let/const.", "Не покладайся на hoisting як на стиль — визначай функції до використання."],
    interviewQuestions: [
      { question: "Чим function-declaration відрізняється від function-expression щодо hoisting?", answer: "function-declaration піднімається наверх області видимості ПОВНІСТЮ, разом з тілом — її можна викликати навіть до рядка визначення в коді. function-expression (включно зі стрілковою функцією), присвоєна const чи let, піднімається лише як оголошення змінної без значення (перебуває у тимчасовій мертвій зоні) — виклик до рядка присвоєння кидає ReferenceError." },
      { question: "Чому виклик стрілкової функції до її визначення кидає помилку?", answer: "Стрілкова функція, присвоєна const/let, — це function-expression. Сама змінна піднімається, але без значення, і перебуває у тимчасовій мертвій зоні (TDZ) до рядка присвоєння. Звернення до змінної в TDZ кидає ReferenceError: Cannot access '...' before initialization — на відміну від function-declaration, чиє тіло доступне одразу." },
      { question: "Чи можна покладатись на умовне оголошення function-declaration в if/else?", answer: "Ні — це нестандартна, історично неоднозначна конструкція мови, і різні рушії JavaScript можуть по-різному вирішувати, яка версія функції \"переможе\" після hoisting. Надійніший підхід: оголосити змінну (const) поза if/else і присвоїти їй потрібну функцію всередині блоків." },
      { question: "Навіщо взагалі знати про hoisting, якщо краще завжди визначати функції до використання?", answer: "Розуміння hoisting пояснює конкретні помилки в реальному коді (ReferenceError при виклику стрілкової функції \"занадто рано\", несподівану поведінку функцій в умовних блоках) і допомагає швидко діагностувати їх у код-рев'ю чи під час дебагінгу чужого коду, навіть якщо у власному коді ти цим свідомо не користуєшся." },
    ],
    summary: "function-declaration піднімається наверх ПОВНІСТЮ (з тілом) — можна викликати до визначення в файлі. function-expression і стрілкові функції, присвоєні const/let, піднімаються лише як змінна без значення (TDZ) — виклик до визначення кидає ReferenceError. Найнадійніша практика — визначати функції до їх використання незалежно від стилю.",
    proTip: "Function-declaration усередині if/else з однаковим іменем — одна з найдавніших \"пасток\" JavaScript, залишена ще з часів до ES6 blocks. Якщо бачиш таке в код-рев'ю — попроси переписати через const-змінну з умовним присвоєнням.",
    nextLessonNote: "Далі — стрілкові функції: короткий синтаксис і найважливіша відмінність — як вони працюють із this.",
    interactiveDemo: "function-hoisting-demo",
    practiceTask: {
      title: "Виправ ReferenceError при виклику функції до визначення",
      description: "Функція форматування ціни оголошена через const (стрілкова функція), але викликається раніше свого визначення в коді — це кидає ReferenceError. Виправ порядок оголошення.",
      checklist: ["Код більше не кидає ReferenceError.", "Функція formatPrice викликається й повертає коректний результат.", "Порядок визначення логічний і читабельний."],
      starterFiles: [
        {
          id: "js-fn-decl-start",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<p id="output"></p>

<script>
  const result = formatPrice(500); // ReferenceError: Cannot access 'formatPrice' before initialization

  const formatPrice = (amount) => amount + " грн";

  document.querySelector("#output").textContent = result;
</script>
`,
        },
      ],
      solutionFiles: [
        {
          id: "js-fn-decl-solution",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<p id="output"></p>

<script>
  const formatPrice = (amount) => amount + " грн";

  const result = formatPrice(500);

  document.querySelector("#output").textContent = result;
  // тепер "500 грн"
</script>
`,
          readOnly: true,
        },
      ],
      hints: ["const formatPrice = ... — це function-expression, вона НЕ піднімається зі значенням, лише сама змінна (TDZ).", "Перенеси визначення formatPrice вище рядка, де вона викликається."],
      expectedOutput: "\"500 грн\"",
    },
    microExercises: [
      { id: "js-fn-decl-hoisting-predict", kind: "predict", prompt: "Що виведе цей код?", code: `console.log(sum(2, 3));\n\nfunction sum(a, b) {\n  return a + b;\n}`, solution: "5 — function-declaration піднімається повністю з тілом, тому виклик до рядка визначення в коді працює нормально." },
      { id: "js-fn-expr-tdz-find-bug", kind: "find-the-bug", prompt: "У чому проблема цього коду?", code: `console.log(double(4));\n\nconst double = (n) => n * 2;`, solution: "double викликається до рядка визначення const double — стрілкова функція не отримує hoisting значення, лише сама змінна (TDZ). Код кине ReferenceError: Cannot access 'double' before initialization. Треба перенести визначення double вище виклику." },
      { id: "js-fn-hoisting-choice", kind: "choice", prompt: "Яка з конструкцій піднімається ПОВНІСТЮ разом з тілом (можна викликати до визначення)?", options: ["const fn = function() {}", "const fn = () => {}", "function fn() {}", "let fn = () => {}"], correctAnswer: "function fn() {}", solution: "Лише function-declaration (function fn() {}) піднімається наверх повністю, з тілом. const/let-присвоєння (включно зі стрілковими функціями) піднімаються лише як оголошення змінної, без значення." },
      { id: "js-tdz-explain", kind: "explain", prompt: "Поясни своїми словами, що таке тимчасова мертва зона (TDZ) і як вона пов'язана з function-expression.", solution: "TDZ — це проміжок коду від початку області видимості до рядка, де let/const-змінна фактично отримує значення. Змінна вже \"існує\" технічно, але звернення до неї в цьому проміжку кидає ReferenceError. Function-expression, присвоєна const, підпорядковується цьому ж правилу — функція недоступна до рядка присвоєння." },
      { id: "js-fn-decl-conditional-rewrite", kind: "rewrite", prompt: "Перепиши код так, щоб уникнути залежності від умовного hoisting у if/else.", code: `if (isPremium) {\n  function getLabel() {\n    return "Преміум";\n  }\n} else {\n  function getLabel() {\n    return "Звичайний";\n  }\n}`, solution: `const getLabel = isPremium\n  ? function () { return "Преміум"; }\n  : function () { return "Звичайний"; };\n// одна const-змінна, надійне присвоєння без залежності від hoisting усередині блоків` },
    ],
    quiz: {
      id: "js-fn-declaration-quiz",
      title: "Швидка перевірка: Оголошення функцій",
      questions: [
        {
          id: "js-fn-decl-q1",
          type: "code",
          question: "Що виведе цей код?",
          codeSnippet: `console.log(getDiscount(1000));\n\nfunction getDiscount(cartTotal) {\n  return cartTotal * 0.2;\n}`,
          options: ["200", "ReferenceError", "undefined", "NaN"],
          correctAnswer: "200",
          explanation: "function-declaration піднімається наверх ПОВНІСТЮ, з тілом, тому виклик до рядка визначення в коді працює нормально.",
        },
        {
          id: "js-fn-decl-q2",
          type: "code",
          question: "Що виведе цей код?",
          codeSnippet: `console.log(formatPrice(500));\n\nconst formatPrice = (amount) => \`\${amount} грн\`;`,
          options: ["500 грн", "undefined", "ReferenceError: Cannot access 'formatPrice' before initialization", "NaN грн"],
          correctAnswer: "ReferenceError: Cannot access 'formatPrice' before initialization",
          explanation: "formatPrice — стрілкова функція, присвоєна const. Вона піднімається лише як змінна (TDZ), без значення, тому виклик до рядка визначення кидає ReferenceError.",
        },
        {
          id: "js-fn-decl-q3",
          type: "single",
          question: "Яка з конструкцій піднімається ПОВНІСТЮ разом з тілом (можна викликати до визначення в файлі)?",
          options: ["const fn = function() {}", "const fn = () => {}", "function fn() {}", "let fn = function() {}"],
          correctAnswer: "function fn() {}",
          explanation: "Лише function-declaration піднімається наверх повністю з тілом. Усі варіанти з const/let (включно зі стрілковими й function-expression) піднімаються лише як оголошення змінної, без значення.",
        },
        {
          id: "js-fn-decl-q4",
          type: "true-false",
          question: "Умовне оголошення function-declaration з однаковим іменем у if та else — надійна, передбачувана конструкція в усіх рушіях JavaScript.",
          options: ["Так", "Ні"],
          correctAnswer: false,
          explanation: "Це нестандартна, історично неоднозначна конструкція — різні рушії можуть по-різному вирішувати, яка версія функції \"переможе\". Надійніше — присвоювати результат const-змінній усередині if/else.",
        },
        {
          id: "js-fn-decl-q5",
          type: "single",
          question: "Чому const getFn = () => {} не можна викликати до рядка її визначення?",
          options: [
            "Тому що стрілкові функції взагалі не підтримують виклик до визначення в жодному разі",
            "Тому що const-змінна піднімається лише як оголошення без значення (TDZ), а не з тілом функції",
            "Тому що стрілкові функції не мають hoisting узагалі, на відміну від будь-яких інших змінних",
            "Тому що це синтаксична помилка",
          ],
          correctAnswer: "Тому що const-змінна піднімається лише як оголошення без значення (TDZ), а не з тілом функції",
          explanation: "getFn піднімається як змінна, що перебуває у тимчасовій мертвій зоні (TDZ) до рядка присвоєння — звернення до неї раніше кидає ReferenceError, на відміну від function-declaration, чиє тіло доступне одразу.",
        },
      ],
    },
  },

  "Стрілкові функції": {
    whatIsIt: "Стрілкова функція — коротший синтаксис (param) => вираз чи (param) => { блок }. Головна практична відмінність від звичайної function — стрілкова функція НЕ має власного this: вона \"успадковує\" this з зовнішньої (лексичної) області видимості в момент визначення, а не в момент виклику.",
    whyUseIt: "Коротший запис ідеальний для callback-ів у map/filter/reduce чи обробників подій, де функція одноразова й проста. А відсутність власного this розв'язує класичну проблему \"this загубився\" всередині вкладених функцій (наприклад, у setTimeout усередині методу обʼєкта) — стрілкова функція автоматично бачить той самий this, що й код навколо неї.",
    whenToUse: ["Короткі callback-и для array-методів (map, filter, reduce, forEach) — implicit return робить код лаконічним.", "Функції всередині методів обʼєкта чи класу, яким потрібен доступ до того самого this (наприклад, callback у setTimeout, addEventListener всередині методу).", "Однорядкові трансформації даних без побічних ефектів."],
    whenNotToUse: ["Не використовуй стрілкову функцію як метод обʼєкта, якщо всередині потрібен this, що вказує на сам обʼєкт — стрілкова функція візьме this із зовнішнього контексту.", "Не використовуй стрілкову функцію як конструктор — new arrowFn() кидає помилку, стрілкові функції не можна викликати з new.", "Не використовуй стрілкову функцію, якщо потрібен доступ до arguments — у стрілкових функціях немає власного arguments."],
    comparisonTable: {
      headers: ["Характеристика", "Звичайна function", "Стрілкова функція"],
      rows: [
        ["this", "своє, залежить від способу виклику", "успадковане з зовнішньої області (лексичне)"],
        ["arguments", "має власний обʼєкт arguments", "немає власного, бере із зовнішньої функції"],
        ["Виклик з new", "можна (конструктор)", "не можна — TypeError"],
        ["Синтаксис для однієї трансформації", "громіздкіший", "коротший, з implicit return"],
      ],
    },
    codeWalkthroughs: [
      {
        before: "Різні форми стрілкового синтаксису — від найкоротшої до блокової:",
        code: `const double = (n) => n * 2; // implicit return
const add = (a, b) => a + b; // кілька параметрів — дужки обов'язкові
const greet = () => "Привіт!"; // без параметрів — порожні дужки обов'язкові
const logAndDouble = (n) => {
  console.log("Подвоюємо", n);
  return n * 2; // блокове тіло — return потрібен явно
};

console.log(double(5)); // 10
console.log(add(2, 3)); // 5`,
        lineNotes: ["(n) => n * 2 — вираз одразу є значенням, що повертається (implicit return), без слова return і без {}.", "Щойно тіло стає блоком у {}, return потрібно писати явно — implicit return працює лише для однорядкового виразу."],
      },
      {
        before: "Реальне використання: .map() для перерахунку цін зі знижкою:",
        code: `const prices = [1000, 500, 250];

const withDiscount = prices.map((price) => price * 0.9);

console.log(withDiscount); // [900, 450, 225]`,
        lineNotes: ["(price) => price * 0.9 — короткий callback без return і без {}, читається як \"для кожної ціни поверни ціну * 0.9\".", ".map() створює НОВИЙ масив, не змінюючи prices."],
      },
      {
        before: "this у звичайній function-callback усередині методу обʼєкта \"губиться\":",
        code: `const cart = {
  items: ["Книга", "Ручка"],
  showItemsLater: function () {
    setTimeout(function () {
      console.log(this.items); // undefined — this тут НЕ вказує на cart
    }, 100);
  },
};

cart.showItemsLater();`,
        lineNotes: ["Звичайна function, передана в setTimeout, отримує власний this під час виклику — а викликає її внутрішній механізм таймера, не cart.", "this всередині цього callback вказує на глобальний обʼєкт (чи undefined у строгому режимі), а НЕ на cart."],
      },
      {
        before: "Стрілкова функція вирішує ту саму проблему — успадковує this від showItemsLater:",
        code: `const cart = {
  items: ["Книга", "Ручка"],
  showItemsLater: function () {
    setTimeout(() => {
      console.log(this.items); // ["Книга", "Ручка"] — this успадкований від showItemsLater
    }, 100);
  },
};

cart.showItemsLater();`,
        lineNotes: ["Стрілкова функція не має власного this — вона \"бачить\" той самий this, що й showItemsLater у момент визначення.", "Це найпоширеніша практична причина, чому стрілкові функції обирають для callback-ів усередині методів обʼєктів."],
        after: "Правило: якщо всередині callback-а потрібен this зовнішнього коду — стрілкова функція; якщо функція сама є методом обʼєкта і потребує власний this — звичайна function.",
      },
    ],
    commonMistakes: ["Стрілкова функція як метод обʼєкта (method: () => { this... }) — this НЕ вказує на обʼєкт.", "Спроба викликати стрілкову функцію з new — TypeError: is not a constructor.", "Звернення до arguments усередині стрілкової функції, очікуючи власний обʼєкт аргументів цієї функції.", "Забутий return у блоковому тілі стрілкової функції ({ ... } без return) — implicit return працює лише без {}."],
    dontDoThis: { code: `const counter = {\n  count: 0,\n  increment: () => {\n    this.count++; // this НЕ вказує на counter!\n  },\n};\n\ncounter.increment();\nconsole.log(counter.count); // 0 — не збільшилось`, explanation: "increment оголошений як стрілкова функція — вона не має власного this і бере його із зовнішньої (модульної/глобальної) області видимості, а не з counter. this.count++ змінює зовсім не ту властивість, яку очікували. Метод, якому потрібен this поточного обʼєкта, має бути звичайною function: increment() { this.count++; }." },
    bestPractices: ["Використовуй стрілкові функції для коротких callback-ів у map/filter/reduce/forEach.", "Використовуй стрілкові функції для callback-ів усередині методів обʼєкта, яким потрібен той самий this (setTimeout, addEventListener).", "НЕ використовуй стрілкові функції як методи обʼєкта чи прототипу, яким потрібен this самого обʼєкта.", "Пам'ятай: implicit return працює лише без фігурних дужок; з {} return обов'язковий."],
    remember: ["Стрілкова функція не має власного this — успадковує його з зовнішньої області визначення.", "Стрілкову функцію не можна викликати з new.", "implicit return — лише для однорядкового виразу без {}.", "Стрілкові функції не мають власного arguments."],
    interviewQuestions: [
      { question: "Чим this у стрілковій функції відрізняється від this у звичайній function?", answer: "Звичайна function отримує власний this, значення якого залежить від способу виклику (метод обʼєкта, окремий виклик, new, call/apply/bind). Стрілкова функція взагалі не має власного this — вона бере this лексично, з того коду, де вона була ВИЗНАЧЕНА, і це значення не змінюється незалежно від того, як стрілкову функцію викликають." },
      { question: "Чому стрілкову функцію не можна використовувати як конструктор?", answer: "Стрілкові функції не мають внутрішнього механізму [[Construct]], потрібного для роботи з new. Спроба new arrowFn() кидає TypeError: arrowFn is not a constructor." },
      { question: "Наведи практичний приклад, коли стрілкова функція розв'язує реальну проблему з this.", answer: "Класичний приклад — callback у setTimeout чи addEventListener всередині методу обʼєкта: якщо передати звичайну function, вона отримає власний this (не той, що в обʼєкті) під час виклику таймером/браузером. Стрілкова функція замість цього успадковує this методу, у якому вона визначена." },
      { question: "Що станеться, якщо забути return у стрілковій функції з блоковим тілом?", answer: "Якщо тіло стрілкової функції обгорнуте у {}, JavaScript очікує явний return — implicit return працює ЛИШЕ для однорядкового виразу без {}. Без return функція поверне undefined, навіть якщо всередині обчислюється потрібне значення." },
    ],
    summary: "Стрілкові функції дають коротший синтаксис і не мають власного this — вони успадковують this з зовнішньої області визначення, що розв'язує класичну проблему \"загубленого this\" у вкладених callback-ах. Але саме тому їх не можна використовувати як методи обʼєкта, яким потрібен this самого обʼєкта, чи як конструктори.",
    proTip: "Якщо метод обʼєкта чи класу починає поводитись дивно з this (властивості обʼєкта \"зникають\"), перша підозра — чи не оголошений цей метод стрілковою функцією замість звичайної.",
    nextLessonNote: "Далі — параметри та значення за замовчуванням: як зробити функції гнучкими без нескінченних перевірок на undefined.",
    interactiveDemo: "arrow-this-demo",
    practiceTask: {
      title: "Виправ метод, що некоректно оновлює властивість через стрілкову функцію",
      description: "Метод increment лічильника оголошений стрілковою функцією, тому this.count++ не оновлює реальну властивість обʼєкта. Виправ, замінивши на звичайну function.",
      checklist: ["Виклик counter.increment() реально збільшує counter.count.", "Метод оголошений як звичайна function, а не стрілкова.", "Інша логіка обʼєкта лишається без змін."],
      starterFiles: [
        {
          id: "js-arrow-this-start",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<p id="output"></p>

<script>
  const counter = {
    count: 0,
    increment: () => {
      this.count++; // this не вказує на counter
    },
  };

  counter.increment();
  counter.increment();

  document.querySelector("#output").textContent = "Лічильник: " + counter.count;
  // зараз показує "Лічильник: 0" замість "Лічильник: 2"
</script>
`,
        },
      ],
      solutionFiles: [
        {
          id: "js-arrow-this-solution",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<p id="output"></p>

<script>
  const counter = {
    count: 0,
    increment: function () {
      this.count++;
    },
  };

  counter.increment();
  counter.increment();

  document.querySelector("#output").textContent = "Лічильник: " + counter.count;
  // тепер "Лічильник: 2"
</script>
`,
          readOnly: true,
        },
      ],
      hints: ["Стрілкова функція не має власного this — потрібна звичайна function, щоб this вказував на counter.", "Заміни increment: () => { ... } на increment: function () { ... }."],
      expectedOutput: "\"Лічильник: 2\"",
    },
    microExercises: [
      { id: "js-arrow-implicit-return-predict", kind: "predict", prompt: "Що виведе цей код?", code: `const square = (n) => n * n;\nconsole.log(square(4));`, solution: "16 — implicit return однорядкового виразу n * n, без слова return і без {}." },
      { id: "js-arrow-method-find-bug", kind: "find-the-bug", prompt: "У чому проблема цього коду?", code: `const user = {\n  name: "Олена",\n  greet: () => {\n    return "Привіт, я " + this.name;\n  },\n};\nconsole.log(user.greet());`, solution: "greet оголошений стрілковою функцією — вона не має власного this і бере його з зовнішньої (модульної) області видимості, а не з user. this.name там undefined, тому результат — \"Привіт, я undefined\" замість \"Привіт, я Олена\". Метод потрібно оголосити звичайною function." },
      { id: "js-arrow-constructor-choice", kind: "choice", prompt: "Яку з цих дій НЕ можна виконати зі стрілковою функцією?", options: ["Викликати як callback у .map()", "Викликати з new як конструктор", "Використати implicit return", "Передати як аргумент іншій функції"], correctAnswer: "Викликати з new як конструктор", solution: "Стрілкові функції не мають внутрішнього механізму [[Construct]] — спроба new arrowFn() кидає TypeError. Усі інші варіанти — звичне й коректне використання стрілкових функцій." },
      { id: "js-arrow-arguments-explain", kind: "explain", prompt: "Поясни, чому стрілкові функції не мають власного arguments.", solution: "Стрілкові функції спроєктовані як \"легші\" функції-вирази без власного контексту виконання (this, arguments, super) — вони успадковують ці значення з найближчої звичайної function навколо. Якщо всередині стрілкової функції звернутись до arguments, JavaScript візьме arguments із зовнішньої, найближчої звичайної функції (якщо така є), а не створить власний для стрілкової функції." },
      { id: "js-arrow-method-rewrite", kind: "rewrite", prompt: "Перепиши метод обʼєкта зі стрілкової функції на звичайну, щоб this коректно вказував на обʼєкт.", code: `const timer = {\n  seconds: 0,\n  tick: () => {\n    this.seconds++;\n  },\n};`, solution: `const timer = {\n  seconds: 0,\n  tick: function () {\n    this.seconds++;\n  },\n};\n// звичайна function отримує власний this, що вказує на timer при викликі timer.tick()` },
    ],
    quiz: {
      id: "js-arrow-functions-quiz",
      title: "Швидка перевірка: Стрілкові функції",
      questions: [
        {
          id: "js-arrow-q1",
          type: "code",
          question: "Що виведе цей код?",
          codeSnippet: `const user = {\n  name: "Олена",\n  greet: () => {\n    return "Привіт, я " + this.name;\n  },\n};\nconsole.log(user.greet());`,
          options: ["Привіт, я Олена", "Привіт, я undefined", "TypeError", "Привіт, я user"],
          correctAnswer: "Привіт, я undefined",
          explanation: "greet — стрілкова функція, вона не має власного this і бере його із зовнішньої (модульної) області видимості, а не з user. this.name там undefined.",
        },
        {
          id: "js-arrow-q2",
          type: "single",
          question: "Звідки стрілкова функція бере значення this?",
          options: [
            "Створює власне this під час кожного виклику",
            "Успадковує this з зовнішньої (лексичної) області видимості в момент визначення",
            "this у стрілкових функціях завжди дорівнює undefined",
            "this залежить від того, як функцію викликали (через крапку чи ні)",
          ],
          correctAnswer: "Успадковує this з зовнішньої (лексичної) області видимості в момент визначення",
          explanation: "На відміну від звичайної function, стрілкова функція не має власного this — вона бере його лексично з коду, де була визначена, і це не змінюється залежно від способу виклику.",
        },
        {
          id: "js-arrow-q3",
          type: "true-false",
          question: "Стрілкову функцію можна використати як конструктор через new.",
          options: ["Так", "Ні"],
          correctAnswer: false,
          explanation: "Стрілкові функції не мають внутрішнього механізму [[Construct]] — спроба new arrowFn() кидає TypeError: arrowFn is not a constructor.",
        },
        {
          id: "js-arrow-q4",
          type: "single",
          question: "Коли НЕ варто використовувати стрілкову функцію?",
          options: [
            "Як короткий callback у .map()",
            "Як метод обʼєкта, якому потрібен this, що вказує на сам обʼєкт",
            "Як callback у setTimeout усередині методу обʼєкта",
            "Для однорядкової трансформації даних",
          ],
          correctAnswer: "Як метод обʼєкта, якому потрібен this, що вказує на сам обʼєкт",
          explanation: "Стрілкова функція як метод обʼєкта візьме this із зовнішнього контексту, а не з самого обʼєкта — для методів, яким потрібен this обʼєкта, треба звичайну function.",
        },
        {
          id: "js-arrow-q5",
          type: "code",
          question: "Що виведе цей код?",
          codeSnippet: `const double = (n) => { n * 2 };\nconsole.log(double(5));`,
          options: ["10", "undefined", "5", "SyntaxError"],
          correctAnswer: "undefined",
          explanation: "Фігурні дужки {} після стрілки роблять тіло блоковим — implicit return вимикається, і без явного return n * 2 просто обчислюється й губиться.",
        },
      ],
    },
  },

  "Параметри та значення за замовчуванням": {
    whatIsIt: "Параметр за замовчуванням (function f(a = 1)) підставляє значення, якщо аргумент не передано (undefined). Rest-параметр (...args) збирає довільну кількість аргументів у справжній масив у кінці списку параметрів — на відміну від застарілого обʼєкта arguments.",
    whyUseIt: "Опціональні налаштування функції (розмір сторінки, валюта, ставка податку) отримують розумне значення за замовчуванням без ручної перевірки if (value === undefined). Rest-параметри дозволяють писати функції з довільною кількістю аргументів (наприклад, сума кількох чисел) без незручного arguments.",
    whenToUse: ["Опціональні параметри конфігурації з розумним значенням за замовчуванням (currency = \"UAH\", pageSize = 10).", "Rest-параметри — коли кількість аргументів наперед невідома (сума чисел, обʼєднання рядків).", "Значення за замовчуванням, що залежить від попереднього параметра (function f(a, b = a * 2))."],
    whenNotToUse: ["Не використовуй параметр за замовчуванням, щоб мовчки \"замаскувати\" відсутність обовʼязкового аргументу — якщо значення справді обовʼязкове, краще явно кинути помилку.", "Не став rest-параметр не останнім у списку — синтаксично дозволено лише в кінці.", "Не плутай value || default (ламається на легітимному falsy: 0, \"\") з параметром за замовчуванням (спрацьовує лише для undefined)."],
    comparisonTable: {
      headers: ["Підхід", "Коли підставляється замовчування", "Проблема"],
      rows: [
        ["function f(a = 1)", "лише коли a === undefined", "немає — найнадійніший варіант"],
        ["value || default", "для БУДЬ-ЯКОГО falsy (0, \"\", null, undefined)", "ламає легітимний 0 чи \"\""],
        ["value ?? default", "лише для null/undefined", "надійний, але не завжди очевидний для читання"],
      ],
    },
    codeWalkthroughs: [
      {
        before: "Параметр за замовчуванням підставляється лише коли аргумент не передано (undefined):",
        code: `function getPrice(base, taxRate = 0.2) {
  return base + base * taxRate;
}

console.log(getPrice(1000)); // 1200 — taxRate не передано, використано 0.2
console.log(getPrice(1000, 0)); // 1000 — taxRate = 0 передано явно, замовчування НЕ спрацьовує`,
        lineNotes: ["taxRate = 0.2 підставляється лише якщо аргумент undefined (не переданий узагалі).", "Другий виклик передає taxRate = 0 явно — це валідне значення, і замовчування коректно НЕ перезаписує його."],
      },
      {
        before: "Класичний баг ідіоми value || default: легітимний 0 сприймається як \"відсутнє\":",
        code: `function getPriceOld(base, taxRate) {
  const rate = taxRate || 0.2; // БАГ: 0 теж falsy!
  return base + base * rate;
}

console.log(getPriceOld(1000, 0)); // 1200 — мало бути 1000, taxRate=0 проігноровано`,
        lineNotes: ["taxRate || 0.2 підставляє 0.2, коли taxRate falsy — а 0 теж falsy, хоча це цілком легітимна ставка (\"без податку\").", "Параметр за замовчуванням не має цієї проблеми — перевіряє САМЕ undefined, а не truthy/falsy."],
        after: "Це найпоширеніша прихована помилка старого коду, написаного до появи параметрів за замовчуванням у мові.",
      },
      {
        before: "Rest-параметр збирає довільну кількість аргументів у справжній масив:",
        code: `function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}

console.log(sum(1, 2, 3)); // 6
console.log(sum(10, 20, 30, 40)); // 100
console.log(sum()); // 0`,
        lineNotes: ["...numbers збирає ВСІ передані аргументи у справжній масив — на ньому працюють .reduce(), .map() тощо.", "sum() без аргументів дає numbers = [] (порожній масив), а не undefined — reduce з початковим значенням 0 коректно повертає 0."],
      },
      {
        before: "Значення за замовчуванням може залежати від попереднього параметра:",
        code: `function createDiscount(price, discountedPrice = price * 0.9) {
  return { price, discountedPrice };
}

console.log(createDiscount(1000)); // { price: 1000, discountedPrice: 900 }
console.log(createDiscount(1000, 700)); // { price: 1000, discountedPrice: 700 }`,
        lineNotes: ["discountedPrice = price * 0.9 обчислюється на основі значення price, переданого В ЦЕЙ ЖЕ виклик.", "Якщо discountedPrice передано явно (навіть 0), замовчування не застосовується."],
      },
    ],
    commonMistakes: ["value || default замість параметра за замовчуванням — ламається на легітимному 0 чи \"\".", "Rest-параметр не в кінці списку параметрів — синтаксична помилка.", "Очікування, що параметр за замовчуванням підставиться для null — він підставляється лише для undefined, не для null.", "Плутанина між rest-параметром (у визначенні функції) і spread-синтаксисом (у виклику) — схожий синтаксис, різне призначення."],
    dontDoThis: { code: `function setVolume(level) {\n  const value = level || 50; // БАГ\n  return value;\n}\n\nconsole.log(setVolume(0)); // 50 — мало бути 0 (повністю вимкнений звук)`, explanation: "level || 50 підставляє 50, коли level falsy — а 0 (\"без звуку\") теж falsy, хоча це цілком легітимне, свідомо передане значення. Правильно: function setVolume(level = 50) — параметр за замовчуванням перевіряє САМЕ undefined, тому явно передане 0 не буде замінено." },
    bestPractices: ["Використовуй параметр за замовчуванням (a = value) замість a || value для опціональних аргументів.", "Використовуй ?? замість || там, де 0 чи \"\" — легітимні значення, а замовчування потрібне лише для null/undefined.", "Rest-параметр завжди останній у списку параметрів.", "Значення за замовчуванням, залежні від інших параметрів, тримай простими й читабельними."],
    remember: ["Параметр за замовчуванням підставляється ЛИШЕ для undefined, не для null чи інших falsy.", "value || default ламається на легітимному 0/\"\" — використовуй параметр за замовчуванням чи ??.", "Rest-параметр (...args) — справжній масив, завжди останній у списку.", "Значення за замовчуванням може посилатись на попередній параметр цього ж виклику."],
    interviewQuestions: [
      { question: "Коли підставляється значення параметра за замовчуванням?", answer: "Лише тоді, коли відповідний аргумент не переданий узагалі АБО переданий явно як undefined. Для будь-якого іншого значення — включно з null, 0, \"\", false — замовчування НЕ підставляється, використовується саме передане значення." },
      { question: "Чому value || default вважається ненадійною ідіомою для значень за замовчуванням?", answer: "Оператор || перевіряє truthy/falsy значення, а не \"передано чи ні\". Falsy значень шість: false, 0, \"\", null, undefined, NaN — усі вони спричинять підстановку default, навіть якщо, наприклад, 0 чи \"\" були свідомо переданим, легітимним значенням. Параметр за замовчуванням чи оператор ?? перевіряють конкретно undefined (або null для ??), тому надійніші." },
      { question: "Що таке rest-параметр і чим він відрізняється від arguments?", answer: "Rest-параметр (...args) — це синтаксис у визначенні функції, що збирає всі \"зайві\" передані аргументи у СПРАВЖНІЙ масив, на якому працюють методи масивів. Застарілий обʼєкт arguments схожий на масив, але не є ним по-справжньому, і недоступний у стрілкових функціях." },
      { question: "Чи може значення за замовчуванням одного параметра залежати від іншого?", answer: "Так — параметри обчислюються зліва направо, тому значення за замовчуванням пізнішого параметра може посилатися на вже отримане значення попереднього параметра того самого виклику (наприклад, function f(price, total = price * 2))." },
    ],
    summary: "Параметр за замовчуванням (a = value) підставляється лише для undefined — надійніший за ідіому value || default, яка ламається на легітимному 0 чи \"\". Rest-параметр (...args) збирає довільну кількість аргументів у справжній масив і завжди йде останнім у списку параметрів.",
    proTip: "Якщо в коді бачиш const x = value || default для параметра, який теоретично може бути 0 чи порожнім рядком (ціна, кількість, пошуковий запит) — це кандидат на прихований баг. Заміни на параметр за замовчуванням чи ??.",
    nextLessonNote: "Далі — значення, що повертаються: чому забутий return — одна з найчастіших тихих помилок JavaScript.",
    interactiveDemo: "default-params-demo",
    practiceTask: {
      title: "Виправ баг value || default для легітимного нуля",
      description: "Функція розрахунку знижки використовує rate || 0.1, через що явно передана ставка 0% (0) замінюється на замовчування 10%. Виправ, використавши параметр за замовчуванням.",
      checklist: ["Виклик getFinalPrice(1000, 0) повертає 1000 (без знижки).", "Виклик getFinalPrice(1000) без другого аргументу повертає 900 (10% знижка за замовчуванням).", "Використовується параметр за замовчуванням, а не ||."],
      starterFiles: [
        {
          id: "js-default-params-start",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<p id="output"></p>

<script>
  function getFinalPrice(price, rate) {
    const discountRate = rate || 0.1; // БАГ: 0 теж falsy
    return price - price * discountRate;
  }

  const result = getFinalPrice(1000, 0);
  document.querySelector("#output").textContent = "Ціна: " + result;
  // зараз показує "Ціна: 900" замість "Ціна: 1000"
</script>
`,
        },
      ],
      solutionFiles: [
        {
          id: "js-default-params-solution",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<p id="output"></p>

<script>
  function getFinalPrice(price, rate = 0.1) {
    return price - price * rate;
  }

  const result = getFinalPrice(1000, 0);
  document.querySelector("#output").textContent = "Ціна: " + result;
  // тепер "Ціна: 1000"
</script>
`,
          readOnly: true,
        },
      ],
      hints: ["rate || 0.1 підставляє 0.1, коли rate falsy — а 0 теж falsy.", "Заміни на параметр за замовчуванням: function getFinalPrice(price, rate = 0.1)."],
      expectedOutput: "\"Ціна: 1000\"",
    },
    microExercises: [
      { id: "js-default-param-predict", kind: "predict", prompt: "Що виведе цей код?", code: `function greet(name = "Гість") {\n  return "Привіт, " + name;\n}\nconsole.log(greet());\nconsole.log(greet("Марія"));`, solution: "\"Привіт, Гість\", потім \"Привіт, Марія\" — перший виклик без аргументу використовує замовчування, другий передає явне значення, яке перезаписує його." },
      { id: "js-or-default-find-bug", kind: "find-the-bug", prompt: "У чому проблема цього коду?", code: `function search(query) {\n  const q = query || "усі товари";\n  return q;\n}\nconsole.log(search(""));`, solution: "query || \"усі товари\" підставляє замовчування, коли query falsy — а порожній рядок \"\" (свідомо очищене поле пошуку) теж falsy. Результат — \"усі товари\" замість очікуваного порожнього рядка. Потрібен параметр за замовчуванням search(query = \"усі товари\"), який спрацює лише для undefined." },
      { id: "js-rest-params-choice", kind: "choice", prompt: "Де в списку параметрів функції може стояти rest-параметр (...args)?", options: ["На будь-якій позиції", "Лише першим", "Лише останнім", "Лише якщо він єдиний параметр"], correctAnswer: "Лише останнім", solution: "Rest-параметр збирає всі \"залишкові\" аргументи, тому синтаксично дозволено ставити його лише останнім у списку параметрів — інакше незрозуміло, скільки аргументів мають потрапити в кожен параметр." },
      { id: "js-nullish-vs-or-explain", kind: "explain", prompt: "Поясни різницю між value || default і value ?? default для параметра, що може дорівнювати 0.", solution: "value || default підставляє default для БУДЬ-ЯКОГО falsy значення value, включно з 0, \"\", false — тобто легітимний 0 буде замінено. value ?? default підставляє default лише коли value саме null чи undefined, тому легітимний 0 залишиться без змін." },
      { id: "js-rest-sum-rewrite", kind: "rewrite", prompt: "Перепиши функцію так, щоб вона приймала будь-яку кількість чисел через rest-параметр замість фіксованих a, b, c.", code: `function sumThree(a, b, c) {\n  return a + b + c;\n}`, solution: `function sum(...numbers) {\n  return numbers.reduce((total, n) => total + n, 0);\n}\n// тепер працює для будь-якої кількості аргументів: sum(1, 2), sum(1, 2, 3, 4)` },
    ],
    quiz: {
      id: "js-default-rest-params-quiz",
      title: "Швидка перевірка: Параметри та значення за замовчуванням",
      questions: [
        {
          id: "js-params-q1",
          type: "code",
          question: "Що виведе цей код?",
          codeSnippet: `function getPriceOld(base, taxRate) {\n  const rate = taxRate || 0.2;\n  return base + base * rate;\n}\nconsole.log(getPriceOld(1000, 0));`,
          options: ["1000", "1200", "0", "NaN"],
          correctAnswer: "1200",
          explanation: "taxRate || 0.2 підставляє 0.2, коли taxRate falsy — а 0 теж falsy, хоча це легітимна ставка. Тому явно передане 0 ігнорується, і результат — 1200 замість очікуваних 1000.",
        },
        {
          id: "js-params-q2",
          type: "single",
          question: "Коли підставляється значення параметра за замовчуванням (function f(a = 1))?",
          options: [
            "Коли аргумент falsy (0, \"\", false тощо)",
            "Коли аргумент не переданий узагалі або переданий як undefined",
            "Коли аргумент дорівнює null",
            "Завжди, незалежно від переданого аргументу",
          ],
          correctAnswer: "Коли аргумент не переданий узагалі або переданий як undefined",
          explanation: "Параметр за замовчуванням перевіряє САМЕ undefined — на відміну від value || default, що спрацьовує на будь-якому falsy значенні.",
        },
        {
          id: "js-params-q3",
          type: "true-false",
          question: "Rest-параметр (...args) можна поставити першим у списку параметрів функції.",
          options: ["Так", "Ні"],
          correctAnswer: false,
          explanation: "Rest-параметр збирає всі \"залишкові\" аргументи, тому синтаксично дозволено ставити його лише останнім у списку параметрів.",
        },
        {
          id: "js-params-q4",
          type: "single",
          question: "Чим value ?? default надійніший за value || default для параметра, що може дорівнювати 0?",
          options: [
            "?? підставляє default лише для null/undefined, а || — для будь-якого falsy значення, включно з 0",
            "?? працює швидше за ||",
            "?? — застаріла конструкція, а || сучасна",
            "Різниці немає, це синоніми",
          ],
          correctAnswer: "?? підставляє default лише для null/undefined, а || — для будь-якого falsy значення, включно з 0",
          explanation: "|| перевіряє truthy/falsy, тому 0 чи \"\" сприймаються як \"відсутні\". ?? перевіряє конкретно null/undefined, тому легітимний 0 залишиться без змін.",
        },
        {
          id: "js-params-q5",
          type: "code",
          question: "Що виведе цей код?",
          codeSnippet: `function sum(...numbers) {\n  return numbers.reduce((total, n) => total + n, 0);\n}\nconsole.log(sum(10, 20, 30));`,
          options: ["60", "[10, 20, 30]", "undefined", "0"],
          correctAnswer: "60",
          explanation: "...numbers збирає всі аргументи у справжній масив [10, 20, 30], на якому працює .reduce() — сума дорівнює 60.",
        },
      ],
    },
  },

  "Значення, що повертаються": {
    whatIsIt: "return негайно завершує виконання функції й передає вказане значення назад у місце виклику. Функція без return (чи з return без значення) повертає undefined. Функція може повернути лише ОДНЕ значення напряму — для кількох значень повертають обʼєкт чи масив.",
    whyUseIt: "Функції спілкуються з рештою коду через значення, що повертаються: результат обчислення, знайдений елемент, статус успіху чи помилки. Забутий return — одна з найтихіших помилок JavaScript: код не кидає помилку, просто мовчки повертає undefined там, де очікувалось реальне значення.",
    whenToUse: ["Функція обчислює значення, яке потрібне викликаючому коду — завжди повертай його явно через return.", "Рання return (guard-конструкція) для виходу з функції за невалідних умов.", "Повернення кількох повʼязаних значень через обʼєкт ({ min, max }) чи масив ([value, error])."],
    whenNotToUse: ["Не змішуй в одній функції \"чисте\" обчислення значення й побічні ефекти (запис у DOM, мережевий запит) без чіткої причини — це ускладнює тестування й повторне використання.", "Не повертай різні типи значень з різних гілок функції (то число, то null, то обʼєкт) без чіткої, документованої причини.", "Не забувай return у блоковому тілі стрілкової функції — implicit return працює лише без {}."],
    comparisonTable: {
      headers: ["Ситуація", "Що повертає функція"],
      rows: [
        ["return value;", "value — виконання одразу завершується"],
        ["return;", "undefined — вихід без значення"],
        ["немає return узагалі", "undefined — після виконання всього тіла"],
        ["(a) => a * 2", "a * 2 — implicit return без {}"],
        ["(a) => { a * 2 }", "undefined — {} вимагає явний return"],
      ],
    },
    codeWalkthroughs: [
      {
        before: "Забутий return — функція виконує обчислення, але не повертає результат:",
        code: `function calculateTotal(price, quantity) {
  const total = price * quantity; // забутий return!
}

const result = calculateTotal(100, 3);
console.log(result); // undefined — обчислення відбулось, але результат загублено`,
        lineNotes: ["total обчислюється всередині функції, але без return це значення НІКУДИ не передається — воно існує лише всередині виклику функції й одразу зникає.", "Функція без return завжди повертає undefined, незалежно від того, скільки корисної роботи виконано всередині."],
      },
      {
        before: "Класична пастка стрілкової функції: {} без явного return дає undefined:",
        code: `const double = (n) => { n * 2 }; // забутий return усередині {}

console.log(double(5)); // undefined — НЕ 10!

const doubleFixed = (n) => n * 2; // без {} — implicit return

console.log(doubleFixed(5)); // 10`,
        lineNotes: ["(n) => { n * 2 } має блокове тіло — {} вимикає implicit return, і без явного return вираз n * 2 просто обчислюється й одразу забувається.", "Прибравши {}, отримуємо implicit return — значення виразу автоматично стає результатом функції."],
        after: "Ця помилка особливо підступна, бо синтаксично код виглядає правильним — легко пропустити відсутність return усередині {}.",
      },
      {
        before: "Повернення кількох значень через обʼєкт:",
        code: `function getMinMax(numbers) {
  return {
    min: Math.min(...numbers),
    max: Math.max(...numbers),
  };
}

const { min, max } = getMinMax([5, 2, 9, 1]);
console.log(min, max); // 1 9`,
        lineNotes: ["Функція повертає ОДИН обʼєкт, що містить два повʼязаних значення — min і max.", "Деструктуризація { min, max } одразу розкладає обʼєкт на окремі змінні в місці виклику."],
      },
      {
        before: "Рання return (guard-конструкція) для виходу з невалідного стану:",
        code: `function getDiscountLabel(cartTotal) {
  if (cartTotal <= 0) return "Кошик порожній";

  if (cartTotal >= 2000) return "Знижка 20%";
  return "Знижка відсутня";
}

console.log(getDiscountLabel(0)); // "Кошик порожній"
console.log(getDiscountLabel(2500)); // "Знижка 20%"`,
        lineNotes: ["Перший return одразу завершує функцію для невалідного стану (cartTotal <= 0), не доходячи до решти перевірок.", "Кожен return завершує виконання функції одразу в тому місці, де він написаний — код нижче для цієї гілки не виконується."],
      },
    ],
    commonMistakes: ["Обчислення значення всередині функції без return — результат мовчки губиться (undefined).", "Забутий return усередині блокового тіла стрілкової функції ({} без явного return).", "Повернення різних типів значень з різних гілок без чіткої причини.", "Плутанина: return завершує ЛИШЕ найближчу функцію, а не весь скрипт чи зовнішню функцію."],
    dontDoThis: { code: `function getUserGreeting(name) {\n  if (name) {\n    \`Привіт, \${name}!\`; // забутий return — рядок обчислюється й одразу зникає\n  }\n}\n\nconsole.log(getUserGreeting("Іван")); // undefined, а не "Привіт, Іван!"`, explanation: "Рядок-шаблон обчислюється всередині if, але без return це значення нікуди не передається — функція завершується без явного return і повертає undefined. Правильно: if (name) return `Привіт, ${name}!`;." },
    bestPractices: ["Завжди явно повертай значення, яке функція має \"віддати\" викликаючому коду.", "Для стрілкових функцій із простим виразом уникай {} — так implicit return убереже від забутого return.", "Використовуй ранню return для guard-умов — код читається зверху вниз як список передумов.", "Документуй чи типізуй (у TypeScript), що саме повертає функція, особливо якщо тип може відрізнятись у різних гілках."],
    remember: ["Функція без return (чи з return без значення) завжди повертає undefined.", "return негайно завершує виконання функції — код після нього в цій гілці не виконується.", "Стрілкова функція з {} вимагає явний return; без {} — implicit return.", "Кілька значень повертай через обʼєкт чи масив, не намагайся повернути \"два значення напряму\"."],
    interviewQuestions: [
      { question: "Що поверне функція, якщо в ній немає жодного return?", answer: "undefined. Незалежно від того, скільки обчислень виконано всередині тіла функції, без явного return значення не передається назовні — виклик функції завжди дасть undefined." },
      { question: "Чому (n) => { n * 2 } повертає undefined, а (n) => n * 2 — ні?", answer: "Фігурні дужки {} після стрілки перетворюють тіло на блоковий код, який вимагає явного return для повернення значення — без нього n * 2 просто обчислюється і губиться. Без {} тіло — це вираз, і implicit return автоматично робить результат цього виразу значенням, що повертається." },
      { question: "Як повернути кілька значень з однієї функції?", answer: "JavaScript-функція технічно повертає лише одне значення, тому для кількох повʼязаних значень їх пакують в один обʼєкт ({ min, max }) чи масив ([value, error]), а в місці виклику розкладають через деструктуризацію." },
      { question: "Що робить return без значення (просто return;)?", answer: "Негайно завершує виконання функції, повертаючи undefined — так само, як і функція без return взагалі. Це часто використовують для ранньої guard-умови, коли немає сенсу продовжувати виконання, а конкретне значення повертати не потрібно." },
    ],
    summary: "Функція без явного return завжди повертає undefined, навіть якщо всередині виконано корисні обчислення. Стрілкова функція з блоковим тілом {} вимагає явний return — implicit return працює лише для однорядкового виразу без {}. Для кількох значень повертай обʼєкт чи масив, а рання return — надійний спосіб виходу з невалідних станів.",
    proTip: "Якщо функція раптово \"повертає undefined\" там, де очікувалось реальне значення — перше, що варто перевірити: чи не забутий return, особливо якщо це стрілкова функція з {}.",
    nextLessonNote: "Далі — чисті функції: як писати функції без побічних ефектів, які легко тестувати й переносити.",
    interactiveDemo: "return-value-demo",
    practiceTask: {
      title: "Виправ забутий return у розрахунку суми",
      description: "Функція розрахунку загальної суми кошика обчислює значення, але забуває його повернути — виклик функції завжди дає undefined. Знайди й виправ помилку.",
      checklist: ["Функція calculateTotal повертає реальне число.", "Результат коректно відображається на сторінці.", "Логіка обчислення (price * quantity) лишається без змін."],
      starterFiles: [
        {
          id: "js-return-value-start",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<p id="output"></p>

<script>
  function calculateTotal(price, quantity) {
    const total = price * quantity; // забутий return
  }

  const result = calculateTotal(150, 3);
  document.querySelector("#output").textContent = "Сума: " + result;
  // зараз показує "Сума: undefined"
</script>
`,
        },
      ],
      solutionFiles: [
        {
          id: "js-return-value-solution",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<p id="output"></p>

<script>
  function calculateTotal(price, quantity) {
    const total = price * quantity;
    return total;
  }

  const result = calculateTotal(150, 3);
  document.querySelector("#output").textContent = "Сума: " + result;
  // тепер "Сума: 450"
</script>
`,
          readOnly: true,
        },
      ],
      hints: ["total обчислюється, але функція не повертає це значення назовні.", "Додай return total; в кінці функції."],
      expectedOutput: "\"Сума: 450\"",
    },
    microExercises: [
      { id: "js-no-return-predict", kind: "predict", prompt: "Що виведе цей код?", code: `function multiply(a, b) {\n  a * b;\n}\nconsole.log(multiply(4, 5));`, solution: "undefined — функція обчислює a * b, але без return це значення не передається назовні." },
      { id: "js-arrow-block-find-bug", kind: "find-the-bug", prompt: "У чому проблема цього коду?", code: `const getFullName = (first, last) => {\n  \`\${first} \${last}\`;\n};\nconsole.log(getFullName("Іван", "Петренко"));`, solution: "Стрілкова функція має блокове тіло ({}), тому implicit return не працює — рядок-шаблон обчислюється й одразу забувається без return. Результат — undefined замість \"Іван Петренко\". Потрібно додати return перед рядком-шаблоном або прибрати {}." },
      { id: "js-return-multiple-choice", kind: "choice", prompt: "Як правильно повернути з функції одразу два повʼязаних значення (наприклад, ім'я та вік)?", options: ["return name, age;", "Повернути обʼєкт { name, age }", "Викликати return двічі", "Це неможливо в JavaScript"], correctAnswer: "Повернути обʼєкт { name, age }", solution: "Функція технічно повертає лише одне значення, тому для кількох повʼязаних значень їх пакують в один обʼєкт (чи масив), який потім розкладають через деструктуризацію в місці виклику." },
      { id: "js-early-return-explain", kind: "explain", prompt: "Поясни, як рання return допомагає уникнути глибокої вкладеності коду.", solution: "Рання return (guard-конструкція) одразу завершує функцію для невалідного чи крайнього стану на самому початку, без if/else — решта коду продовжує виконуватись на тому самому рівні вкладеності, без потреби обгортати \"основну\" логіку в додатковий блок else." },
      { id: "js-return-value-rewrite", kind: "rewrite", prompt: "Перепиши функцію, додавши забутий return.", code: `function getAverage(a, b) {\n  const sum = a + b;\n  const avg = sum / 2;\n}`, solution: `function getAverage(a, b) {\n  const sum = a + b;\n  const avg = sum / 2;\n  return avg;\n}\n// тепер функція реально повертає обчислене середнє значення` },
    ],
    quiz: {
      id: "js-return-values-quiz",
      title: "Швидка перевірка: Значення, що повертаються",
      questions: [
        {
          id: "js-return-q1",
          type: "code",
          question: "Що виведе цей код?",
          codeSnippet: `function calculateTotal(price, quantity) {\n  const total = price * quantity;\n}\nconsole.log(calculateTotal(100, 3));`,
          options: ["300", "undefined", "0", "NaN"],
          correctAnswer: "undefined",
          explanation: "total обчислюється всередині функції, але без явного return це значення нікуди не передається — функція завжди повертає undefined.",
        },
        {
          id: "js-return-q2",
          type: "single",
          question: "Чому (n) => { n * 2 } повертає undefined, а (n) => n * 2 — ні?",
          options: [
            "{} перетворює тіло на блокове, яке вимагає явного return; без {} — це вираз з implicit return",
            "Різниці немає, обидва варіанти однакові",
            "{} — синтаксична помилка в стрілкових функціях",
            "n * 2 усередині {} обчислюється двічі",
          ],
          correctAnswer: "{} перетворює тіло на блокове, яке вимагає явного return; без {} — це вираз з implicit return",
          explanation: "Фігурні дужки після стрілки вмикають блокове тіло, де return потрібен явно. Без {} тіло — це вираз, і його значення автоматично стає результатом (implicit return).",
        },
        {
          id: "js-return-q3",
          type: "true-false",
          question: "Функція в JavaScript може повернути напряму кілька значень одночасно через кілька return.",
          options: ["Так", "Ні"],
          correctAnswer: false,
          explanation: "Функція технічно повертає лише одне значення. Для кількох повʼязаних значень їх пакують в один обʼєкт ({ min, max }) чи масив і розкладають через деструктуризацію.",
        },
        {
          id: "js-return-q4",
          type: "single",
          question: "Що робить return усередині функції?",
          options: [
            "Завершує весь скрипт негайно",
            "Завершує виконання найближчої функції негайно й передає значення в місце виклику",
            "Лише позначає значення для логування, не завершуючи функцію",
            "Завершує лише поточний блок if/for, але функція продовжує виконуватись",
          ],
          correctAnswer: "Завершує виконання найближчої функції негайно й передає значення в місце виклику",
          explanation: "return негайно завершує виконання ЛИШЕ найближчої функції — код після нього в цій гілці не виконується, а вказане значення передається туди, звідки функцію викликали.",
        },
        {
          id: "js-return-q5",
          type: "code",
          question: "Що виведе цей код?",
          codeSnippet: `function getDiscountLabel(cartTotal) {\n  if (cartTotal <= 0) return "Кошик порожній";\n  if (cartTotal >= 2000) return "Знижка 20%";\n  return "Знижка відсутня";\n}\nconsole.log(getDiscountLabel(0));`,
          options: ["Кошик порожній", "Знижка 20%", "Знижка відсутня", "undefined"],
          correctAnswer: "Кошик порожній",
          explanation: "Перша умова cartTotal <= 0 істинна для 0, тому рання return одразу повертає \"Кошик порожній\", не доходячи до решти перевірок.",
        },
      ],
    },
  },

  "Область видимості та замикання": {
    whatIsIt: "Область видимості визначає, де в коді \"видно\" певну змінну. var має функціональну область видимості (ігнорує блоки if/for), а let/const — блокову (кожен {} — своя область). Замикання (closure) — це функція, що \"пам'ятає\" змінні зі своєї області визначення навіть після того, як зовнішня функція вже завершила роботу.",
    whyUseIt: "Різниця var/let напряму пояснює класичний баг: цикл, що створює кілька callback-ів (кнопки, таймери), де всі callback-и \"бачать\" одне й те саме останнє значення змінної замість очікуваних різних. Замикання — основний спосіб зробити стан приватним у JavaScript: змінна існує лише всередині функції, і ззовні до неї немає прямого доступу, лише через явно повернені функції.",
    whenToUse: ["let/const для лічильників циклів, які використовуються в callback-ах (обробники подій, таймери) — кожна ітерація отримує власну змінну.", "Замикання для приватного стану обʼєкта чи модуля (лічильник, кеш, конфігурація), доступного лише через явно надані функції.", "const за замовчуванням для змінних, які не повинні бути переприсвоєні; let — коли значення дійсно змінюється."],
    whenNotToUse: ["Не використовуй var у новому коді — його функціональна область видимості (ігнорування блоків) — джерело прихованих багів без жодної переваги над let/const.", "Не створюй замикання без потреби в приватному стані — якщо доступ до значення не критичний, простіша функція без замикання читається легше.", "Не покладайся на замикання для \"приховування\" даних, що насправді мають бути публічними властивостями обʼєкта — це ускладнює дебагінг і тестування без реальної потреби."],
    comparisonTable: {
      headers: ["Ключове слово", "Область видимості", "Поведінка в циклі з callback-ами"],
      rows: [
        ["var", "функціональна (ігнорує блоки if/for)", "усі callback-и діляться ОДНІЄЮ змінною"],
        ["let", "блокова (кожен {} — своя область)", "кожна ітерація отримує СВОЮ змінну"],
        ["const", "блокова, без переприсвоєння", "те саме, що let, але значення не можна змінити"],
      ],
    },
    codeWalkthroughs: [
      {
        before: "var \"витікає\" з блоку if — на відміну від let, він видимий і поза {}:",
        code: `if (true) {
  var leaked = "я тут";
  let blocked = "мене не видно ззовні";
}

console.log(leaked); // "я тут" — var ігнорує межі блоку if
console.log(blocked); // ReferenceError: blocked is not defined`,
        lineNotes: ["var має функціональну область видимості — межі if/for/while для нього не мають значення, лише межа функції (чи глобальна область).", "let/const мають блокову область видимості — значення blocked існує лише всередині {} блоку if, де воно оголошене."],
      },
      {
        before: "Перш ніж переходити до багів var/let, подивись на замикання в найпростішій можливій формі — функція, що повертає іншу функцію:",
        code: `function makeGreeter(name) {
  const greeting = "Привіт, " + name + "!"; // локальна змінна makeGreeter

  return function () {
    console.log(greeting); // ця функція "пам'ятає" greeting назавжди
  };
}

const greetOlya = makeGreeter("Оля"); // makeGreeter вже завершила роботу...
greetOlya(); // ...а greeting досі доступна тут — "Привіт, Оля!"`,
        lineNotes: ["makeGreeter(\"Оля\") виконується й одразу завершується — здавалося б, greeting мала б \"зникнути\" разом із нею.", "Але внутрішня функція, яку ми зберегли в greetOlya, була СТВОРЕНА всередині makeGreeter — тому вона \"забрала з собою\" доступ до greeting і памʼятає її значення назавжди.", "Це і є замикання (closure): функція + \"рюкзак\" зі змінними з того місця, де вона народилась."],
        after: "Саме цей механізм пояснює і баг var/let у циклах нижче, і приватний стан (createCounter) в кінці уроку.",
      },
      {
        before: "Класичний баг: var у циклі з callback-ами — усі \"бачать\" останнє значення:",
        code: `const callbacksVar = [];
for (var i = 0; i < 3; i++) {
  callbacksVar.push(() => i);
}

console.log(callbacksVar.map((fn) => fn())); // [3, 3, 3] — усі бачать фінальне i`,
        lineNotes: ["var i — ОДНА змінна на весь цикл, спільна для всіх трьох callback-ів.", "Коли цикл завершується, i дорівнює 3 — саме це значення бачать усі відкладені викликів callback-ів, незалежно від того, на якій ітерації вони були створені."],
      },
      {
        before: "let розв'язує той самий баг — кожна ітерація отримує власну змінну:",
        code: `const callbacksLet = [];
for (let i = 0; i < 3; i++) {
  callbacksLet.push(() => i);
}

console.log(callbacksLet.map((fn) => fn())); // [0, 1, 2] — кожен callback пам'ятає свою ітерацію`,
        lineNotes: ["let i — НОВА змінна для кожної ітерації циклу, тому кожен callback захоплює своє власне значення в замиканні.", "Це основна практична причина, чому let, а не var, — стандартний вибір для лічильників циклів у сучасному коді."],
        after: "Правило: якщо цикл створює callback-и (обробники подій, таймери), завжди використовуй let для лічильника.",
      },
      {
        before: "Замикання для приватного стану — ззовні немає прямого доступу до count:",
        code: `function createCounter(startAt) {
  let count = startAt; // приватна — існує лише в цьому замиканні
  return {
    increment: () => { count += 1; return count; },
    getValue: () => count,
  };
}

const counter = createCounter(0);
counter.increment();
counter.increment();
console.log(counter.getValue()); // 2
console.log(counter.count); // undefined — прямого доступу немає`,
        lineNotes: ["count оголошена всередині createCounter — вона доступна лише функціям, визначеним у тій самій області (increment, getValue), і більше ніде.", "counter.count не працює, бо count — це локальна змінна замикання, а не властивість повернутого обʼєкта."],
      },
    ],
    commonMistakes: ["var у циклі, що створює callback-и (обробники подій, setTimeout) — усі callback-и діляться однією фінальною змінною.", "Очікування, що var поводиться як блокова область видимості, як if чи for — це не так, лише функція обмежує var.", "Замикання, що тримає посилання на великий обʼєкт довше, ніж потрібно — потенційна витік пам'яті у довгоживучих застосунках.", "Плутанина між приватною змінною замикання (count у createCounter) і публічною властивістю обʼєкта."],
    dontDoThis: { code: `const container = document.querySelector("#buttons");\n\nfor (var i = 0; i < 3; i++) {\n  const button = document.createElement("button");\n  button.textContent = "Кнопка " + i;\n  button.addEventListener("click", function () {\n    alert("Це кнопка №" + i); // завжди 3, незалежно від натиснутої кнопки\n  });\n  container.appendChild(button);\n}`, explanation: "var i — одна спільна змінна для всіх трьох обробників кліку. Коли цикл завершується, i дорівнює 3, і саме це значення бачать усі три обробники незалежно від того, яку кнопку реально натиснули. Заміна var на let дає кожній ітерації власну змінну i, і кожен обробник запам'ятає саме своє значення (0, 1 чи 2)." },
    bestPractices: ["Використовуй let/const замість var у весь новий код — блокова область видимості передбачуваніша.", "У циклах, що створюють callback-и, завжди використовуй let для лічильника.", "Використовуй замикання свідомо — для приватного стану, а не як побічний ефект структури коду.", "Пам'ятай, що замикання тримає посилання на змінні, доки існує хоч одна функція, що їх використовує — не тримай непотрібні великі дані в довгоживучих замиканнях."],
    remember: ["var — функціональна область видимості, ігнорує блоки if/for; let/const — блокова.", "У циклі з callback-ами var дає всім одну спільну змінну, let — окрему на кожну ітерацію.", "Замикання — функція, що пам'ятає змінні зі своєї області визначення навіть після завершення зовнішньої функції.", "Замикання — основний спосіб зробити стан приватним у JavaScript."],
    interviewQuestions: [
      { question: "Чим відрізняється область видимості var від let?", answer: "var має функціональну область видимості — межі блоків if, for, while для нього не існують, лише межа функції (чи глобальна область, якщо оголошено поза функцією). let (і const) мають блокову область видимості — кожен {} створює нову, окрему область, і змінна недосяжна поза цим блоком." },
      { question: "Чому цикл for (var i = 0; ...) з callback-ами класично дає баг, а for (let i = 0; ...) — ні?", answer: "З var усі створені в циклі callback-и діляться ОДНІЄЮ змінною i — до моменту виклику callback-ів цикл уже завершився, і i містить своє фінальне значення. З let кожна ітерація циклу отримує власну, окрему змінну i, тому кожен callback захоплює те значення, яке було саме на \"його\" ітерації." },
      { question: "Що таке замикання (closure) своїми словами?", answer: "Замикання — це функція разом із \"збереженим\" доступом до змінних тієї області видимості, де вона була визначена, навіть якщо зовнішня функція вже завершила виконання. Функція буквально \"бере з собою\" оточення, у якому вона народилась." },
      { question: "Як замикання дозволяє реалізувати приватний стан у JavaScript?", answer: "Змінна, оголошена всередині функції (наприклад, count у createCounter), недосяжна ззовні напряму — до неї є доступ лише в тих функціях, які визначені в тій самій області й повернені назовні (increment, getValue). Це імітує \"приватність\" без спеціального синтаксису класу чи модифікаторів доступу." },
    ],
    summary: "var має функціональну область видимості й ігнорує блоки if/for, тоді як let/const — блокову. Це напряму пояснює класичний баг циклу з callback-ами: var дає всім один спільний лічильник, let — окремий на кожну ітерацію. Замикання — функція, що пам'ятає змінні зі своєї області визначення, — основний інструмент для приватного стану в JavaScript.",
    proTip: "Якщо в код-рев'ю бачиш var у циклі, що створює обробники подій чи таймери, — це майже завжди прихований баг. Заміна на let — перше, що варто перевірити.",
    nextLessonNote: "Далі, остання тема модуля — чисті функції: як писати функції без побічних ефектів, які легко тестувати й безпечно повторно використовувати.",
    interactiveDemo: "scope-closures-demo",
    practiceTask: {
      title: "Виправ кнопки, що всі показують один і той самий номер",
      description: "Кнопки створюються в циклі, і кожна має свій номер у обробнику кліку — але через var усі обробники показують те саме (останнє) число. Виправ, замінивши var на let.",
      checklist: ["Клік на кнопку 0 показує номер 0, на кнопку 1 — номер 1, на кнопку 2 — номер 2.", "Використано let замість var.", "Логіка створення кнопок лишається без змін."],
      starterFiles: [
        {
          id: "js-scope-closures-start",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<div id="buttons"></div>

<script>
  const container = document.querySelector("#buttons");

  for (var i = 0; i < 3; i++) {
    const button = document.createElement("button");
    button.textContent = "Кнопка " + i;
    button.addEventListener("click", function () {
      alert("Це кнопка №" + i); // завжди показує 3, незалежно від кліку
    });
    container.appendChild(button);
  }
</script>
`,
        },
      ],
      solutionFiles: [
        {
          id: "js-scope-closures-solution",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<div id="buttons"></div>

<script>
  const container = document.querySelector("#buttons");

  for (let i = 0; i < 3; i++) {
    const button = document.createElement("button");
    button.textContent = "Кнопка " + i;
    button.addEventListener("click", function () {
      alert("Це кнопка №" + i); // тепер показує саме той номер, що на кнопці
    });
    container.appendChild(button);
  }
</script>
`,
          readOnly: true,
        },
      ],
      hints: ["var i — одна спільна змінна для всіх трьох обробників кліку.", "Заміни var на let — кожна ітерація циклу отримає власну змінну i."],
      expectedOutput: "Клік на кнопку N показує \"Це кнопка №N\" з відповідним номером.",
    },
    microExercises: [
      { id: "js-var-leak-predict", kind: "predict", prompt: "Що виведе цей код?", code: `if (true) {\n  var x = 10;\n}\nconsole.log(x);`, solution: "10 — var має функціональну область видимості й ігнорує межі блоку if, тому x залишається доступним і після {}." },
      { id: "js-var-loop-find-bug", kind: "find-the-bug", prompt: "У чому проблема цього коду?", code: `const fns = [];\nfor (var i = 0; i < 3; i++) {\n  fns.push(() => i);\n}\nconsole.log(fns.map(fn => fn()));`, solution: "var i — одна спільна змінна для всіх трьох callback-ів у fns. Після завершення циклу i дорівнює 3, і саме це значення повертають усі callback-и: [3, 3, 3] замість очікуваних [0, 1, 2]. Заміна var на let дає кожній ітерації власну змінну." },
      { id: "js-scope-choice", kind: "choice", prompt: "Яке ключове слово має блокову область видимості (недосяжне поза {}, де оголошене)?", options: ["var", "let", "Обидва однаково", "Жодне"], correctAnswer: "let", solution: "let (і const) мають блокову область видимості — змінна існує лише всередині {} блоку, де вона оголошена. var, навпаки, має функціональну область видимості й ігнорує блоки if/for/while." },
      { id: "js-closure-explain", kind: "explain", prompt: "Поясни своїми словами, як createCounter() робить count приватною змінною.", solution: "count оголошена через let усередині функції createCounter — вона існує лише в цій області видимості. Повернені функції (increment, getValue) визначені в тій самій області, тому мають до count доступ через замикання, а будь-який код ЗА МЕЖАМИ createCounter не має способу звернутися до count напряму — лише через ці явно повернені функції." },
      { id: "js-var-to-let-rewrite", kind: "rewrite", prompt: "Перепиши цикл, замінивши var на let, щоб кожен callback запам'ятав свою ітерацію.", code: `const fns = [];\nfor (var i = 0; i < 3; i++) {\n  fns.push(() => i * 2);\n}`, solution: `const fns = [];\nfor (let i = 0; i < 3; i++) {\n  fns.push(() => i * 2);\n}\n// тепер fns.map(fn => fn()) дає [0, 2, 4] замість [6, 6, 6]` },
    ],
    quiz: {
      id: "js-scope-closures-quiz",
      title: "Швидка перевірка: Область видимості та замикання",
      questions: [
        {
          id: "js-scope-q1",
          type: "code",
          question: "Що виведе цей код?",
          codeSnippet: `const callbacksVar = [];\nfor (var i = 0; i < 3; i++) {\n  callbacksVar.push(() => i);\n}\nconsole.log(callbacksVar.map((fn) => fn()));`,
          options: ["[0, 1, 2]", "[3, 3, 3]", "[undefined, undefined, undefined]", "ReferenceError"],
          correctAnswer: "[3, 3, 3]",
          explanation: "var i — одна спільна змінна для всіх callback-ів. Після завершення циклу i дорівнює 3, і саме це значення бачать усі відкладені виклики.",
        },
        {
          id: "js-scope-q2",
          type: "true-false",
          question: "let має блокову область видимості — змінна недосяжна поза {}, де вона оголошена.",
          options: ["Так", "Ні"],
          correctAnswer: true,
          explanation: "let (і const) створюють нову область видимості для кожного {} — на відміну від var, чия область видимості обмежена лише функцією.",
        },
        {
          id: "js-scope-q3",
          type: "single",
          question: "Що таке замикання (closure)?",
          options: [
            "Функція, яка викликає сама себе рекурсивно",
            "Функція, що памʼятає змінні зі своєї області визначення навіть після завершення зовнішньої функції",
            "Спосіб заборонити виклик функції ззовні",
            "Синтаксис для обʼєднання кількох функцій в одну",
          ],
          correctAnswer: "Функція, що памʼятає змінні зі своєї області визначення навіть після завершення зовнішньої функції",
          explanation: "Замикання — це функція разом зі \"збереженим\" доступом до змінних тієї області, де вона була визначена, навіть якщо зовнішня функція вже завершила виконання.",
        },
        {
          id: "js-scope-q4",
          type: "single",
          question: "Як createCounter() робить count приватною змінною?",
          options: [
            "count позначена спеціальним ключовим словом private",
            "count оголошена всередині функції — доступ до неї мають лише функції, визначені в тій самій області й повернені назовні",
            "count автоматично захищена, бо вона число, а не обʼєкт",
            "Насправді count не приватна, до неї можна звернутись напряму через counter.count",
          ],
          correctAnswer: "count оголошена всередині функції — доступ до неї мають лише функції, визначені в тій самій області й повернені назовні",
          explanation: "count існує лише в замиканні createCounter. Ззовні прямого доступу немає (counter.count дає undefined) — лише через явно повернені increment/getValue.",
        },
        {
          id: "js-scope-q5",
          type: "code",
          question: "Що виведе цей код?",
          codeSnippet: `if (true) {\n  var leaked = "я тут";\n  let blocked = "мене не видно";\n}\nconsole.log(leaked);`,
          options: ["я тут", "ReferenceError", "undefined", "мене не видно"],
          correctAnswer: "я тут",
          explanation: "var має функціональну область видимості й ігнорує межі блоку if — leaked залишається доступним і поза {}. let, натомість, дав би ReferenceError.",
        },
      ],
    },
  },

  "Чисті функції": {
    whatIsIt: "Чиста функція для однакових аргументів завжди повертає однаковий результат і не має побічних ефектів — не мутує передані аргументи, не читає й не змінює зовнішній стан, не звертається до Math.random(), Date.now() чи мережі. Нечиста функція порушує хоча б одну з цих умов.",
    whyUseIt: "Чисті функції передбачувані: результат залежить лише від вхідних аргументів, тому їх легко тестувати (однаковий вхід — однаковий очікуваний вихід) і безпечно викликати повторно чи в будь-якому порядку. Нечисті функції, що мутують передані масиви/обʼєкти, — джерело прихованих багів: код деінде, що тримає посилання на той самий обʼєкт, раптово бачить змінені дані.",
    whenToUse: ["Функції розрахунку значень для відображення в інтерфейсі (суми, знижки, форматування) — тримай їх чистими, щоб UI-логіка була передбачуваною.", "Функції-трансформатори даних (map/filter/reduce callback-и) — повертай новий результат, не мутуй вхідний масив/обʼєкт.", "Reducer-и та selector-и в архітектурах на основі стану (Redux-подібні) — вимагають чистоти за визначенням."],
    whenNotToUse: ["Не намагайся зробити АБСОЛЮТНО все чистим — оновлення DOM, мережеві запити, запис у localStorage — це необхідні побічні ефекти реальних застосунків.", "Не плутай \"чисту функцію\" з \"функцією без аргументів\" — чистота стосується відсутності побічних ефектів і залежності лише від аргументів, а не кількості параметрів.", "Не забувай, що методи масивів sort(), reverse(), splice(), push() мутують масив НА МІСЦІ — використання їх усередині \"чистої\" на вигляд функції робить її нечистою."],
    comparisonTable: {
      headers: ["Критерій", "Чиста функція", "Нечиста функція"],
      rows: [
        ["Результат для тих самих аргументів", "завжди однаковий", "може відрізнятись"],
        ["Мутує передані аргументи", "ніколи", "можливо"],
        ["Читає/змінює зовнішній стан", "ніколи", "можливо"],
        ["Тестування", "просте — вхід визначає вихід", "потребує моків стану/часу/мережі"],
      ],
    },
    codeWalkthroughs: [
      {
        before: "Мутація переданого масиву — нечиста функція змінює оригінал:",
        code: `function addItemImpure(cart, price) {
  cart.push(price); // мутує оригінальний масив
  return cart;
}

const originalCart = [100, 250];
const result = addItemImpure(originalCart, 50);

console.log(originalCart); // [100, 250, 50] — оригінал змінився!`,
        lineNotes: ["cart.push(price) змінює масив, переданий за посиланням, — це та сама структура в пам'яті, що й originalCart.", "Будь-який інший код, що тримає посилання на originalCart, побачить цю зміну, навіть якщо він не викликав addItemImpure напряму."],
      },
      {
        before: "Чиста версія — повертає новий масив, оригінал незмінний:",
        code: `function addItemPure(cart, price) {
  return [...cart, price]; // новий масив
}

const originalCart = [100, 250];
const result = addItemPure(originalCart, 50);

console.log(originalCart); // [100, 250] — не змінився
console.log(result); // [100, 250, 50]`,
        lineNotes: ["Spread-синтаксис [...cart, price] створює НОВИЙ масив, що містить елементи cart плюс новий price.", "originalCart залишається повністю незмінним — результат живе окремо, як новий масив."],
        after: "Той самий підхід працює для обʼєктів: { ...original, updatedField } замість мутації original напряму.",
      },
      {
        before: ".sort() мутує масив на місці — класичний реальний footgun навіть у \"схожому на чисте\" коді:",
        code: `const prices = [300, 100, 200];

function renderList(list) {
  return list.map((p) => p + " грн").join(", ");
}

console.log(renderList(prices)); // "300 грн, 100 грн, 200 грн"

prices.sort((a, b) => a - b); // мутує prices НА МІСЦІ

console.log(renderList(prices)); // "100 грн, 200 грн, 300 грн" — той самий масив, інший порядок`,
        lineNotes: [".sort() (як і .reverse(), .splice(), .push(), .pop()) змінює масив, на якому викликаний, і повертає те саме посилання — це не \"новий відсортований масив\", а мутація оригіналу.", "Якщо prices використовується деінде в коді до сортування, той код побачить уже змінений порядок після виклику .sort()."],
      },
      {
        before: "Нечистота через недетермінізм — Math.random() усередині \"розрахункової\" функції:",
        code: `function getDiscountedPrice(price) {
  const randomBonus = Math.random() < 0.5 ? 0.05 : 0; // недетермінізм!
  return price * (1 - 0.1 - randomBonus);
}

console.log(getDiscountedPrice(1000)); // різний результат при кожному виклику з тим самим аргументом`,
        lineNotes: ["Навіть без явної мутації аргументів функція нечиста, якщо результат залежить від Math.random(), Date.now() чи будь-якого джерела, що змінюється поза контролем аргументів.", "Такі функції неможливо надійно протестувати простим порівнянням \"вхід -> очікуваний вихід\" без додаткових прийомів (мокання Math.random)."],
      },
    ],
    commonMistakes: ["Мутація переданого масиву/обʼєкта всередині функції, яка на вигляд мала лише \"розрахувати\" значення.", "Використання .sort()/.reverse()/.splice() там, де очікувалась чиста трансформація — усі троє мутують оригінал.", "Читання чи запис зовнішньої (глобальної, модульної) змінної замість передачі всього потрібного через аргументи.", "Викликання Math.random()/Date.now()/мережевого запиту всередині функції, яку код навколо вважає чистим розрахунком."],
    dontDoThis: { code: `const prices = [300, 100, 200];\n\nfunction renderList(id, list) {\n  document.querySelector(id).innerHTML = list.map((p) => \`<li>\${p} грн</li>\`).join("");\n}\n\nfunction getSortedPrices(list) {\n  return list.sort((a, b) => a - b); // мутує переданий масив!\n}\n\nrenderList("#original", prices);\nrenderList("#sorted", getSortedPrices(prices));\nrenderList("#original", prices); // тепер показує ВЖЕ відсортований список`, explanation: "getSortedPrices викликає list.sort(...), який мутує масив НА МІСЦІ й повертає те саме посилання — це не новий відсортований масив, а сам prices у зміненому порядку. Другий рендер #original show той самий (тепер уже відсортований) масив, хоча очікувалось, що оригінальний порядок збережеться. Правильно: return [...list].sort((a, b) => a - b); — копія перед сортуванням." },
    bestPractices: ["Використовуй spread ([...arr], {...obj}) чи .slice()/.map()/.filter() для копій замість мутуючих методів, коли потрібно зберегти оригінал.", "Тримай побічні ефекти (DOM, мережа, localStorage) у явно позначених, тонких \"нечистих\" функціях на межі застосунку, а основну логіку — чистою.", "Ніколи не мутуй аргументи, передані у функцію, якщо це не задокументована й очікувана поведінка (як у методах масиву).", "Памʼятай: .sort(), .reverse(), .splice(), .push(), .pop(), .shift(), .unshift() мутують масив на місці — використовуй їх свідомо."],
    remember: ["Чиста функція: однакові аргументи -> однаковий результат, без побічних ефектів.", ".sort()/.reverse()/.splice() мутують масив на місці, навіть якщо виглядають як \"розрахунок\".", "Math.random()/Date.now() усередині функції роблять її нечистою (недетермінованою).", "Копіюй перед зміною: [...arr] чи {...obj} замість мутації оригіналу."],
    interviewQuestions: [
      { question: "Що робить функцію \"чистою\"?", answer: "Дві умови: (1) для однакових вхідних аргументів функція завжди повертає однаковий результат, і (2) вона не має побічних ефектів — не мутує передані аргументи, не читає/змінює зовнішній стан, не залежить від недетермінованих джерел (Math.random, Date.now, мережа)." },
      { question: "Чому .sort() вважається \"пасткою\" для чистоти функцій?", answer: "На вигляд .sort() схожий на трансформацію (\"дай мені відсортовану версію\"), але насправді він мутує масив, на якому викликаний, НА МІСЦІ, і повертає те саме посилання — не новий масив. Функція, що використовує .sort() без попереднього копіювання, стає нечистою, навіть якщо це неочевидно з першого погляду." },
      { question: "Чи можна написати застосунок повністю без побічних ефектів?", answer: "Ні, і не варто намагатись — оновлення DOM, мережеві запити, збереження в localStorage — це необхідні побічні ефекти будь-якого реального застосунку. Мета не \"нуль побічних ефектів\", а ізолювати їх у явних, тонких межах, тримаючи основну логіку розрахунків і трансформацій чистою." },
      { question: "Чому чисті функції легше тестувати, ніж нечисті?", answer: "Тест чистої функції — це просто виклик з конкретними аргументами й перевірка результату: однаковий вхід завжди дає однаковий очікуваний вихід. Тест нечистої функції додатково вимагає підготовки (мокання) зовнішнього стану, часу, випадковості чи мережі, і результат може відрізнятись між запусками тесту." },
    ],
    summary: "Чиста функція для однакових аргументів завжди дає однаковий результат і не має побічних ефектів — не мутує аргументи, не читає й не змінює зовнішній стан. Методи масиву .sort(), .reverse(), .splice() мутують оригінал на місці — це поширена прихована причина нечистоти. Ціль — не усунути побічні ефекти повністю, а тримати основну логіку чистою й ізолювати DOM/мережу/час у явних межах.",
    proTip: "Якщо функція приймає масив чи обʼєкт як аргумент, перше запитання код-рев'ю: \"чи ця функція його змінює, чи повертає новий?\" Якщо відповідь не очевидна з коду за секунду — це кандидат на рефакторинг у бік чистоти.",
    nextLessonNote: "Модуль \"Функції\" завершено. Далі — масиви: створення масивів і доступ до елементів, перший крок модуля про перетворення списків даних для інтерфейсу.",
    interactiveDemo: "pure-function-demo",
    practiceTask: {
      title: "Виправ .sort(), що мутує оригінальний масив",
      description: "Функція getSortedPrices використовує .sort() без копіювання, тому перший рендер списку показує вже відсортовані ціни замість оригінального порядку. Виправ, скопіювавши масив перед сортуванням.",
      checklist: ["Оригінальний масив prices зберігає свій початковий порядок після виклику getSortedPrices.", "getSortedPrices повертає НОВИЙ відсортований масив, не мутуючи prices.", "Обидва списки (#original і #sorted) відображаються коректно."],
      starterFiles: [
        {
          id: "js-pure-fn-start",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<ul id="original"></ul>
<ul id="sorted"></ul>

<script>
  const prices = [300, 100, 200];

  function renderList(id, list) {
    document.querySelector(id).innerHTML = list.map((p) => \`<li>\${p} грн</li>\`).join("");
  }

  function getSortedPrices(list) {
    return list.sort((a, b) => a - b); // мутує переданий масив!
  }

  renderList("#original", prices);
  renderList("#sorted", getSortedPrices(prices));
  renderList("#original", prices);
  // #original показує вже відсортований список — оригінальний порядок втрачено
</script>
`,
        },
      ],
      solutionFiles: [
        {
          id: "js-pure-fn-solution",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<ul id="original"></ul>
<ul id="sorted"></ul>

<script>
  const prices = [300, 100, 200];

  function renderList(id, list) {
    document.querySelector(id).innerHTML = list.map((p) => \`<li>\${p} грн</li>\`).join("");
  }

  function getSortedPrices(list) {
    return [...list].sort((a, b) => a - b); // копія перед сортуванням
  }

  renderList("#original", prices);
  renderList("#sorted", getSortedPrices(prices));
  renderList("#original", prices);
  // #original коректно зберігає оригінальний порядок [300, 100, 200]
</script>
`,
          readOnly: true,
        },
      ],
      hints: [".sort() мутує масив, на якому викликаний, НА МІСЦІ — повертає те саме посилання, не новий масив.", "Створи копію перед сортуванням: [...list].sort(...)."],
      expectedOutput: "#original незмінно показує 300, 100, 200; #sorted показує 100, 200, 300.",
    },
    microExercises: [
      { id: "js-pure-mutation-predict", kind: "predict", prompt: "Що виведе цей код?", code: `const arr = [1, 2, 3];\nfunction double(list) {\n  return list.map(n => n * 2);\n}\ndouble(arr);\nconsole.log(arr);`, solution: "[1, 2, 3] — .map() завжди повертає НОВИЙ масив і не мутує оригінал, тому arr залишається незмінним." },
      { id: "js-sort-mutation-find-bug", kind: "find-the-bug", prompt: "У чому проблема цього коду?", code: `const scores = [50, 90, 70];\nfunction getTopScore(list) {\n  return list.sort((a, b) => b - a)[0];\n}\nconsole.log(getTopScore(scores));\nconsole.log(scores);`, solution: ".sort() мутує scores НА МІСЦІ, тому після виклику getTopScore масив scores змінює свій порядок на [90, 70, 50], хоча функція на вигляд мала лише \"прочитати\" найбільше значення. Потрібна копія: [...list].sort(...)[0]." },
      { id: "js-pure-fn-choice", kind: "choice", prompt: "Який з цих методів масиву НЕ мутує оригінальний масив?", options: [".push()", ".sort()", ".splice()", ".map()"], correctAnswer: ".map()", solution: ".map() завжди повертає новий масив, залишаючи оригінал незмінним. .push(), .sort() і .splice() усі мутують масив, на якому їх викликано." },
      { id: "js-pure-explain", kind: "explain", prompt: "Поясни, чому функція, що викликає Math.random() усередині, вважається нечистою, навіть якщо вона не мутує жодних аргументів.", solution: "Чистота вимагає, щоб однакові аргументи ЗАВЖДИ давали однаковий результат. Math.random() вносить недетермінізм — результат функції відрізняється між викликами навіть з тими самими аргументами, тому одна з умов чистоти (передбачуваність результату) порушується, попри відсутність мутації." },
      { id: "js-impure-to-pure-rewrite", kind: "rewrite", prompt: "Перепиши функцію так, щоб вона не мутувала переданий обʼєкт.", code: `function applyDiscount(product, percent) {\n  product.price = product.price * (1 - percent / 100);\n  return product;\n}`, solution: `function applyDiscount(product, percent) {\n  return { ...product, price: product.price * (1 - percent / 100) };\n}\n// повертає НОВИЙ обʼєкт замість мутації оригінального product` },
    ],
    quiz: {
      id: "js-pure-functions-quiz",
      title: "Швидка перевірка: Чисті функції",
      questions: [
        {
          id: "js-pure-q1",
          type: "single",
          question: "Що робить функцію \"чистою\"?",
          options: [
            "Вона не приймає жодних аргументів",
            "Для однакових аргументів вона завжди повертає однаковий результат і не має побічних ефектів",
            "Вона обов'язково коротша за 5 рядків",
            "Вона написана як стрілкова функція",
          ],
          correctAnswer: "Для однакових аргументів вона завжди повертає однаковий результат і не має побічних ефектів",
          explanation: "Чистота — це дві умови: детермінований результат (однакові аргументи -> однаковий вихід) і відсутність побічних ефектів (без мутації аргументів чи зовнішнього стану).",
        },
        {
          id: "js-pure-q2",
          type: "code",
          question: "Що виведе цей код?",
          codeSnippet: `const scores = [50, 90, 70];\nfunction getTopScore(list) {\n  return list.sort((a, b) => b - a)[0];\n}\ngetTopScore(scores);\nconsole.log(scores);`,
          options: ["[50, 90, 70]", "[90, 70, 50]", "[90]", "undefined"],
          correctAnswer: "[90, 70, 50]",
          explanation: ".sort() мутує масив НА МІСЦІ й повертає те саме посилання. Хоча функція виглядає як \"читання\" найбільшого значення, вона змінює порядок оригінального scores.",
        },
        {
          id: "js-pure-q3",
          type: "true-false",
          question: ".map() мутує оригінальний масив, на якому його викликали.",
          options: ["Так", "Ні"],
          correctAnswer: false,
          explanation: ".map() завжди повертає НОВИЙ масив, залишаючи оригінал незмінним — на відміну від .sort(), .splice(), .push(), які мутують масив на місці.",
        },
        {
          id: "js-pure-q4",
          type: "single",
          question: "Чому функція, що викликає Math.random() усередині, вважається нечистою?",
          options: [
            "Тому що Math.random() мутує глобальний обʼєкт",
            "Тому що результат стає недетермінованим — відрізняється між викликами навіть з тими самими аргументами",
            "Тому що Math.random() кидає помилку в строгому режимі",
            "Насправді Math.random() не впливає на чистоту функції",
          ],
          correctAnswer: "Тому що результат стає недетермінованим — відрізняється між викликами навіть з тими самими аргументами",
          explanation: "Чистота вимагає, щоб однакові аргументи завжди давали однаковий результат. Math.random() порушує цю умову, навіть без явної мутації аргументів.",
        },
        {
          id: "js-pure-q5",
          type: "multiple",
          question: "Які з цих методів масиву мутують оригінальний масив на місці?",
          options: [".sort()", ".map()", ".push()", ".filter()"],
          correctAnswer: [".sort()", ".push()"],
          explanation: ".sort() і .push() змінюють масив, на якому їх викликано, на місці. .map() і .filter() завжди повертають новий масив.",
          optionExplanations: {
            ".sort()": "Мутує масив на місці й повертає те саме посилання.",
            ".map()": "Повертає НОВИЙ масив, оригінал не змінюється.",
            ".push()": "Додає елемент в кінець масиву на місці, мутуючи оригінал.",
            ".filter()": "Повертає НОВИЙ масив із відфільтрованими елементами, оригінал не змінюється.",
          },
        },
      ],
    },
  },
};

export const jsFunctionsModuleQuiz: QuizData = {
  id: "js-functions-module-quiz",
  title: "Контрольний тест: Функції",
  questions: [
    {
      id: "js-fn-module-q1",
      type: "code",
      question: "Що виведе цей код?",
      codeSnippet: `console.log(getTax(1000));\n\nconst getTax = function (amount) {\n  return amount * 0.2;\n};`,
      options: ["200", "undefined", "ReferenceError: Cannot access 'getTax' before initialization", "NaN"],
      correctAnswer: "ReferenceError: Cannot access 'getTax' before initialization",
      explanation: "getTax — function-expression, присвоєна const. Вона піднімається лише як змінна в TDZ, без значення — виклик до рядка визначення кидає ReferenceError.",
    },
    {
      id: "js-fn-module-q2",
      type: "single",
      question: "Чому стрілкову функцію не можна використати як метод обʼєкта, якому потрібен this самого обʼєкта?",
      options: [
        "Стрілкові функції взагалі не можуть бути властивостями обʼєкта",
        "Стрілкова функція не має власного this — вона успадковує його із зовнішньої області визначення",
        "Стрілкові функції завжди повертають undefined",
        "Стрілкові функції працюють лише з числами",
      ],
      correctAnswer: "Стрілкова функція не має власного this — вона успадковує його із зовнішньої області визначення",
      explanation: "this у стрілковій функції береться лексично з коду навколо, а не з обʼєкта, у якому вона оголошена як метод.",
    },
    {
      id: "js-fn-module-q3",
      type: "code",
      question: "Що виведе цей код?",
      codeSnippet: `function getPrice(base, taxRate = 0.2) {\n  return base + base * taxRate;\n}\nconsole.log(getPrice(1000, 0));`,
      options: ["1200", "1000", "0", "NaN"],
      correctAnswer: "1000",
      explanation: "Параметр за замовчуванням підставляється ЛИШЕ для undefined. taxRate = 0 передано явно — це валідне значення, тож замовчування не спрацьовує.",
    },
    {
      id: "js-fn-module-q4",
      type: "true-false",
      question: "Функція без жодного return завжди повертає undefined, незалежно від того, скільки обчислень виконано всередині.",
      options: ["Так", "Ні"],
      correctAnswer: true,
      explanation: "Без явного return значення, обчислене всередині функції, нікуди не передається — виклик завжди дає undefined.",
    },
    {
      id: "js-fn-module-q5",
      type: "code",
      question: "Що виведе цей код?",
      codeSnippet: `const fns = [];\nfor (let i = 0; i < 3; i++) {\n  fns.push(() => i);\n}\nconsole.log(fns.map((fn) => fn()));`,
      options: ["[0, 1, 2]", "[3, 3, 3]", "[undefined, undefined, undefined]", "[2, 2, 2]"],
      correctAnswer: "[0, 1, 2]",
      explanation: "let дає кожній ітерації циклу власну змінну i, тому кожен callback захоплює в замиканні саме те значення, яке було на його ітерації.",
    },
    {
      id: "js-fn-module-q6",
      type: "multiple",
      question: "Які з цих тверджень про функції правильні?",
      options: [
        "function-declaration піднімається повністю з тілом і може бути викликана до визначення",
        "Стрілкова функція має власний обʼєкт arguments",
        ".sort() мутує масив, на якому його викликано",
        "value || default коректно обробляє легітимний 0 як \"передане\" значення",
      ],
      correctAnswer: [
        "function-declaration піднімається повністю з тілом і може бути викликана до визначення",
        ".sort() мутує масив, на якому його викликано",
      ],
      explanation: "Правильні твердження: hoisting function-declaration і мутуюча природа .sort(). Інші два — поширені помилкові уявлення про стрілкові функції та оператор ||.",
      optionExplanations: {
        "function-declaration піднімається повністю з тілом і може бути викликана до визначення": "Так — на відміну від function-expression, function-declaration піднімається цілком, з тілом.",
        "Стрілкова функція має власний обʼєкт arguments": "Неправильно — стрілкові функції не мають власного arguments, вони беруть його з найближчої звичайної function навколо (якщо є).",
        ".sort() мутує масив, на якому його викликано": "Так — .sort() (як і .reverse(), .splice(), .push()) змінює масив на місці й повертає те саме посилання.",
        "value || default коректно обробляє легітимний 0 як \"передане\" значення": "Неправильно — || перевіряє truthy/falsy, тому 0 сприймається як falsy й замінюється на default, що і є класичним багом цієї ідіоми.",
      },
    },
  ],
};
