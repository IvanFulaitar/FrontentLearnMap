import type { LessonOverride } from "./htmlFoundations";

/**
 * Module "Обʼєкти" (js-objects). Fifth JavaScript module — modeling
 * structured data with object literals, reading/writing properties safely,
 * destructuring, and spread syntax. Same deep cheat-sheet lesson format as
 * js-arrays and js-functions. First 4 of 6 lessons.
 */
export const jsObjectsOverrides: Record<string, LessonOverride> = {
  "Обʼєктні літерали": {
    whatIsIt: "Обʼєктний літерал — спосіб створити обʼєкт напряму через фігурні дужки { }, де кожна властивість записується як ключ: значення. Значенням може бути будь-що: число, рядок, масив, функція чи навіть інший обʼєкт (вкладена структура). Скорочений синтаксис властивостей ({ name }) і методів ({ greet() {} }) дозволяє писати менше коду для типових випадків.",
    whyUseIt: "Майже всі реальні дані — товар, користувач, налаштування — це набір повʼязаних властивостей з різними іменами (не просто впорядкований список, як масив). Обʼєктний літерал — найпростіший і найпоширеніший спосіб змоделювати таку структуру безпосередньо в коді.",
    whenToUse: ["Дані з іменованими полями різного типу (товар: name, price, inStock).", "Групування повʼязаних значень в одну сутність замість окремих змінних.", "Конфігурація/налаштування функції чи компонента (options-обʼєкт)."],
    whenNotToUse: ["Не використовуй обʼєкт для впорядкованої однотипної колекції — для цього краще масив.", "Не створюй обʼєкт лише з одним примітивним значенням там, де підійшла б звичайна змінна — це зайва складність.", "Не плутай обʼєктний літерал { } з блоком коду { } — контекст (після = чи return) визначає, що це саме значення."],
    comparisonTable: {
      headers: ["Синтаксис", "Приклад"],
      rows: [
        ["Звичайна властивість", "{ name: \"Книга\" }"],
        ["Скорочена властивість", "{ name } — коли змінна вже називається name"],
        ["Метод (скорочено)", "{ greet() { return \"Привіт\"; } }"],
        ["Обчислюваний ключ", "{ [dynamicKey]: value }"],
      ],
    },
    codeWalkthroughs: [
      {
        before: "Базовий обʼєктний літерал з властивостями різних типів:",
        code: `const product = {
  name: "Книга",
  price: 300,
  inStock: true,
  tags: ["новинка", "бестселер"],
};

console.log(product.name); // "Книга"
console.log(product.tags[0]); // "новинка"`,
        lineNotes: ["Кожна властивість — пара ключ: значення, розділені комою; значенням може бути число, рядок, булеве значення чи навіть масив.", "product.tags[0] — спочатку читаємо властивість tags (масив), потім індексуємо в цьому масиві."],
      },
      {
        before: "Скорочений синтаксис властивостей — коли імʼя змінної збігається з іменем ключа:",
        code: `const name = "Ручка";
const price = 20;

// Довгий варіант
const item1 = { name: name, price: price };

// Скорочений варіант — те саме значення
const item2 = { name, price };

console.log(item2); // { name: "Ручка", price: 20 }`,
        lineNotes: ["{ name, price } — це скорочення для { name: name, price: price }, коли змінна і ключ мають однакове імʼя.", "Обидва варіанти дають ідентичний результат — скорочений просто менш многослівний."],
      },
      {
        before: "Метод обʼєкта — функція як властивість, зі скороченим синтаксисом:",
        code: `const cart = {
  items: ["Книга", "Ручка"],
  getCount() {
    return this.items.length;
  },
};

console.log(cart.getCount()); // 2`,
        lineNotes: ["getCount() {...} — скорочений синтаксис методу, еквівалентний getCount: function() {...}.", "this.items всередині методу посилається на сам обʼєкт cart, на якому метод був викликаний."],
      },
      {
        before: "Обчислюваний ключ — імʼя властивості визначається виразом у квадратних дужках:",
        code: `const fieldName = "category";
const product = {
  name: "Зошит",
  [fieldName]: "Канцелярія", // ключ = значення змінної fieldName
};

console.log(product); // { name: "Зошит", category: "Канцелярія" }`,
        lineNotes: ["[fieldName] в літералі обʼєкта обчислює вираз усередині дужок і використовує РЕЗУЛЬТАТ як імʼя ключа — тут це рядок \"category\".", "Без квадратних дужок fieldName: ... створило би властивість з буквальним іменем \"fieldName\", а не \"category\"."],
        after: "Обчислювані ключі корисні, коли імʼя властивості відоме лише під час виконання програми (наприклад, з даних форми чи API).",
      },
    ],
    commonMistakes: ["Плутати обʼєктний літерал { } з JSON — JSON вимагає лапки навколо ВСІХ ключів, звичайний JS-обʼєкт цього не вимагає.", "Забувати кому між властивостями обʼєкта — синтаксична помилка.", "Писати fieldName: value замість [fieldName]: value, коли потрібен саме обчислюваний ключ — це створює властивість з буквальним іменем \"fieldName\".", "Плутати this всередині методу-скорочення з this у звичайній стрілочній функції — стрілочні функції як методи НЕ мають власного this."],
    dontDoThis: { code: `const dynamicField = "price";\nconst product = {\n  name: "Книга",\n  dynamicField: 300, // БАГ: створює властивість "dynamicField", а не "price"\n};\n\nconsole.log(product.price); // undefined!`, explanation: "Без квадратних дужок dynamicField: 300 створює властивість з буквальним іменем \"dynamicField\" — рядок сприймається як просте імʼя ключа, а не як змінну для обчислення. Щоб імʼя ключа бралось зі значення змінної dynamicField (тобто \"price\"), потрібен синтаксис [dynamicField]: 300." },
    bestPractices: ["Використовуй скорочений синтаксис властивостей ({ name }), коли імʼя змінної й ключа збігаються — менше повторень.", "Використовуй скорочений синтаксис методів ({ method() {} }) замість { method: function() {} }.", "Для динамічних імен ключів завжди застосовуй квадратні дужки: [key]: value.", "Групуй повʼязані примітивні значення в один обʼєкт замість декількох окремих змінних — легше передавати як єдиний аргумент."],
    remember: ["Обʼєктний літерал { } створює обʼєкт з парами ключ: значення, розділеними комою.", "Скорочений синтаксис { name } еквівалентний { name: name }, коли значення й ключ однаково називаються.", "Квадратні дужки [expr]: value обчислюють вираз і використовують результат як імʼя ключа — без дужок імʼя ключа буде буквальним текстом.", "Значенням властивості може бути будь-що: число, рядок, масив, функція (метод) чи інший обʼєкт."],
    interviewQuestions: [
      { question: "Що робить скорочений синтаксис властивостей { name } в обʼєктному літералі?", answer: "Це скорочення для { name: name } — коли в поточному скоупі вже є змінна з тим самим іменем, що й потрібний ключ, можна написати лише імʼя один раз, і JavaScript автоматично використає значення цієї змінної для властивості з тим самим ключем." },
      { question: "У чому різниця між { key: value } і { [key]: value }?", answer: "{ key: value } створює властивість з БУКВАЛЬНИМ іменем \"key\". { [key]: value } обчислює вираз key (наприклад, значення змінної) і використовує РЕЗУЛЬТАТ цього обчислення як імʼя властивості — це називається обчислюваним ключем (computed property name)." },
      { question: "Як записати метод обʼєкта скороченим синтаксисом?", answer: "Замість greet: function() { ... } можна написати просто greet() { ... } всередині обʼєктного літерала — обидва варіанти створюють ідентичний метод, скорочений просто менш многослівний." },
      { question: "Чи можна зберігати функцію як значення властивості обʼєкта?", answer: "Так. Властивість обʼєкта може мати будь-яке значення, включно з функцією — така властивість зазвичай називається методом обʼєкта і викликається як obj.methodName()." },
    ],
    summary: "Обʼєктний літерал { } моделює структуровані дані через пари ключ: значення. Скорочений синтаксис ({ name }, { method() {} }) зменшує повторення коду, а квадратні дужки [expr]: value дозволяють використовувати обчислене значення як імʼя ключа замість буквального тексту.",
    proTip: "Якщо бачиш властивість з буквальним іменем змінної (dynamicField: value) там, де очікується динамічний ключ — це майже завжди пропущені квадратні дужки: [dynamicField]: value.",
    nextLessonNote: "Далі — читання та запис властивостей: крапкова нотація проти дужкової, безпечний доступ через опціональний ланцюжок (?.) і видалення властивостей.",
    interactiveDemo: "object-literal-demo",
    practiceTask: {
      title: "Виправ обчислюваний ключ у профілі користувача",
      description: "Функція createField створює властивість з буквальним іменем \"fieldName\" замість використання значення параметра fieldName як імені ключа. Додай квадратні дужки.",
      checklist: ["createField створює властивість з іменем, що дорівнює значенню параметра fieldName.", "Використано синтаксис [fieldName]: value.", "Функція коректно працює для будь-якого імені поля."],
      starterFiles: [
        {
          id: "js-object-literal-start",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<p id="output"></p>

<script>
  function createField(fieldName, value) {
    return { fieldName: value }; // БАГ: ключ буквально "fieldName"
  }

  const result = createField("email", "test@example.com");
  document.querySelector("#output").textContent = JSON.stringify(result);
  // зараз показує {"fieldName":"test@example.com"}
</script>
`,
        },
      ],
      solutionFiles: [
        {
          id: "js-object-literal-solution",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<p id="output"></p>

<script>
  function createField(fieldName, value) {
    return { [fieldName]: value };
  }

  const result = createField("email", "test@example.com");
  document.querySelector("#output").textContent = JSON.stringify(result);
  // тепер {"email":"test@example.com"}
</script>
`,
          readOnly: true,
        },
      ],
      hints: ["Без квадратних дужок fieldName сприймається як буквальне імʼя ключа, а не як змінна.", "[fieldName]: value обчислює значення змінної fieldName і використовує його як імʼя властивості."],
      expectedOutput: "{\"email\":\"test@example.com\"}",
    },
    microExercises: [
      { id: "js-object-shorthand-predict", kind: "predict", prompt: "Що виведе цей код?", code: `const price = 50;\nconst item = { price };\nconsole.log(item);`, solution: "{ price: 50 } — скорочений синтаксис { price } еквівалентний { price: price }, тому створюється властивість price зі значенням змінної price (50)." },
      { id: "js-object-computed-find-bug", kind: "find-the-bug", prompt: "У чому проблема цього коду?", code: `const key = "category";\nconst product = { key: "Книги" };\nconsole.log(product.category);`, solution: "Без квадратних дужок key: \"Книги\" створює властивість з буквальним іменем \"key\", а не \"category\". product.category повертає undefined, бо такої властивості немає — потрібно [key]: \"Книги\"." },
      { id: "js-object-method-choice", kind: "choice", prompt: "Який варіант є скороченим синтаксисом методу обʼєкта?", options: ["greet: () => {}", "greet: function() {}", "greet() {}", "const greet = {}"], correctAnswer: "greet() {}", solution: "greet() { ... } всередині обʼєктного літерала — це скорочений синтаксис методу, еквівалентний greet: function() { ... }." },
      { id: "js-object-literal-explain", kind: "explain", prompt: "Поясни різницю між { status: status } і { status }.", solution: "Це два ідентичні за результатом записи. { status } — скорочений синтаксис, який JavaScript автоматично розгортає в { status: status }, беручи значення змінної status зі поточного скоупу для властивості з тим самим іменем. Різниця лише у кількості символів, поведінка однакова." },
      { id: "js-object-literal-rewrite", kind: "rewrite", prompt: "Перепиши обʼєкт, використовуючи скорочений синтаксис властивостей і методу, де це можливо.", code: `const name = "Марія";\nconst age = 28;\nconst user = {\n  name: name,\n  age: age,\n  greet: function() {\n    return "Привіт, " + name;\n  },\n};`, solution: `const name = "Марія";\nconst age = 28;\nconst user = {\n  name,\n  age,\n  greet() {\n    return "Привіт, " + name;\n  },\n};\n// той самий результат, менше повторень` },
    ],
  },

  "Читання та запис властивостей": {
    whatIsIt: "Властивості обʼєкта читаються і записуються двома способами: крапковою нотацією (obj.name) для статичних, наперед відомих імен, і дужковою нотацією (obj[\"name\"] чи obj[variable]) для динамічних імен чи ключів з пробілами/спецсимволами. Опціональний ланцюжок (?.) дозволяє безпечно читати вкладені властивості без помилки, якщо проміжна ланка ланцюжка — undefined чи null.",
    whyUseIt: "Реальні дані рідко ідеально структуровані — властивість може бути відсутньою, вкладеність може бути глибокою, а ключ іноді потрібно обчислити динамічно (наприклад, з введення користувача). Правильний вибір між крапковою й дужковою нотацією, плюс опціональний ланцюжок, рятує від помилок TypeError: Cannot read properties of undefined.",
    whenToUse: ["Крапкова нотація — коли імʼя властивості наперед відоме і є валідним ідентифікатором (без пробілів/дефісів/цифр на початку).", "Дужкова нотація — коли ключ динамічний (у змінній) чи містить символи, недопустимі для крапкової нотації.", "Опціональний ланцюжок (?.) — коли проміжна властивість у вкладеному шляху МОЖЕ бути відсутньою."],
    whenNotToUse: ["Не використовуй дужкову нотацію там, де ключ статичний і валідний — крапкова нотація читається чіткіше.", "Не додавай ?. всюди \"на про всяк випадок\" — якщо властивість гарантовано існує, зайвий ?. лише приховує реальні помилки в даних.", "Не намагайся використати крапкову нотацію для ключа з пробілом чи що починається з цифри — це синтаксична помилка, потрібні дужки."],
    comparisonTable: {
      headers: ["Спосіб доступу", "Коли використовувати"],
      rows: [
        ["obj.name", "Статичне, валідне імʼя властивості"],
        ["obj[\"user-name\"]", "Ключ з дефісом/пробілом — крапкова нотація неможлива"],
        ["obj[variable]", "Динамічний ключ, що зберігається в змінній"],
        ["obj?.address?.city", "Безпечне читання, коли address МОЖЕ бути undefined/null"],
      ],
    },
    codeWalkthroughs: [
      {
        before: "Крапкова нотація проти дужкової для одного й того ж значення:",
        code: `const user = { name: "Олена", "favorite-color": "синій" };

console.log(user.name); // "Олена" — крапкова, валідне імʼя
console.log(user["favorite-color"]); // "синій" — дужкова, бо ключ з дефісом
// user.favorite-color викликав би синтаксичну помилку (сприймається як віднімання)`,
        lineNotes: ["user.name працює, бо \"name\" — валідний ідентифікатор.", "user[\"favorite-color\"] обов'язковий, бо дефіс у крапковій нотації сприймається як оператор віднімання, а не частина імені властивості."],
      },
      {
        before: "Дужкова нотація з динамічним ключем зі змінної:",
        code: `const product = { name: "Книга", price: 300, category: "Книги" };
const fieldToRead = "price";

console.log(product[fieldToRead]); // 300 — читає властивість, чиє імʼя зберігається в fieldToRead
console.log(product.fieldToRead); // undefined! шукає властивість з буквальним іменем "fieldToRead"`,
        lineNotes: ["product[fieldToRead] обчислює значення fieldToRead (\"price\") і використовує його як імʼя властивості для читання.", "product.fieldToRead — поширена плутанина: крапкова нотація завжди шукає властивість з БУКВАЛЬНИМ іменем після крапки, ігноруючи значення однойменної змінної."],
      },
      {
        before: "Безпечне читання вкладеної властивості через опціональний ланцюжок:",
        code: `const userA = { name: "Іван", address: { city: "Київ" } };
const userB = { name: "Петро" }; // немає address

console.log(userA.address?.city); // "Київ"
console.log(userB.address?.city); // undefined — без помилки
console.log(userB.address.city); // TypeError: Cannot read properties of undefined`,
        lineNotes: ["userA.address?.city безпечно читає city, бо address існує.", "userB.address?.city повертає undefined замість кидання помилки, бо ?. перевіряє address ПЕРЕД спробою прочитати .city на ньому.", "Без ?. те саме звернення (userB.address.city) кидає справжній TypeError, бо намагається прочитати .city з undefined."],
        after: "?. \"коротко замикає\" весь подальший ланцюжок і повертає undefined одразу, щойно якась ланка виявляється null/undefined.",
      },
      {
        before: "Додавання нової властивості й видалення існуючої:",
        code: `const settings = { theme: "dark" };

settings.fontSize = 16; // додає нову властивість
console.log(settings); // { theme: "dark", fontSize: 16 }

delete settings.theme; // видаляє властивість
console.log(settings); // { fontSize: 16 }`,
        lineNotes: ["Просте присвоєння settings.fontSize = 16 додає властивість, якщо вона ще не існувала — жодного спеціального синтаксису не потрібно.", "delete settings.theme повністю видаляє властивість theme з обʼєкта (на відміну від settings.theme = undefined, яке лишає властивість, лише зі значенням undefined)."],
      },
    ],
    commonMistakes: ["Використовувати obj.variableName замість obj[variableName], очікуючи динамічного доступу за значенням змінної.", "Забувати ?. на потенційно відсутній ланці вкладеного шляху й отримувати TypeError у production.", "Плутати delete obj.prop (властивість зникає повністю) з obj.prop = undefined (властивість лишається, лише порожня).", "Намагатись використати крапкову нотацію для ключів з пробілами, дефісами чи що починаються з цифри."],
    dontDoThis: { code: `function getCity(user) {\n  return user.address.city; // БАГ: припускає, що address ЗАВЖДИ існує\n}\n\nconst userWithoutAddress = { name: "Оксана" };\nconsole.log(getCity(userWithoutAddress)); // TypeError!`, explanation: "Функція читає user.address.city без перевірки, чи існує address взагалі. Для userWithoutAddress властивості address немає, тому user.address дорівнює undefined, а спроба прочитати .city з undefined кидає TypeError: Cannot read properties of undefined. Потрібен опціональний ланцюжок: user.address?.city." },
    bestPractices: ["Використовуй крапкову нотацію за умовчанням; переходь на дужкову лише для динамічних ключів чи невалідних ідентифікаторів.", "Додавай ?. саме на тих ланках вкладеного шляху, які РЕАЛЬНО можуть бути відсутні за даними — не механічно на кожному кроці.", "Для видалення властивості використовуй delete obj.prop, а не obj.prop = undefined, якщо потрібно, щоб властивість зникла з обʼєкта повністю (наприклад, для Object.keys()).", "Комбінуй ?. з ?? для значення за умовчанням: const city = user.address?.city ?? \"Невідомо\"."],
    remember: ["Крапкова нотація — для статичних валідних імен; дужкова — для динамічних ключів чи ключів з пробілами/дефісами.", "obj.variableName ЗАВЖДИ шукає буквальну властивість \"variableName\", а не значення змінної — для цього потрібна дужкова нотація obj[variableName].", "?. безпечно повертає undefined, якщо ланка ланцюжка перед ним null/undefined, замість кидання TypeError.", "delete obj.prop видаляє властивість повністю; obj.prop = undefined лише очищає значення, залишаючи властивість."],
    interviewQuestions: [
      { question: "Коли потрібна дужкова нотація замість крапкової для доступу до властивості?", answer: "Коли імʼя властивості динамічне (зберігається в змінній: obj[key]) або коли ключ містить символи, недопустимі для крапкової нотації — пробіли, дефіси, або починається з цифри. Крапкова нотація obj.key завжди шукає буквальне імʼя \"key\", ігноруючи значення однойменної змінної." },
      { question: "Що робить оператор опціонального ланцюжка (?.)?", answer: "?. перевіряє, чи значення ПЕРЕД ним не null/undefined, перед тим як продовжити читання наступної властивості. Якщо значення null/undefined, весь подальший ланцюжок \"коротко замикається\", і вираз повертає undefined замість кидання TypeError." },
      { question: "У чому різниця між delete obj.prop і obj.prop = undefined?", answer: "delete obj.prop повністю видаляє властивість з обʼєкта — вона більше не зʼявиться в Object.keys(obj) чи for...in. obj.prop = undefined залишає властивість НА МІСЦІ, просто присвоює їй значення undefined — властивість все ще існує й буде видима в Object.keys(obj)." },
      { question: "Чому obj.dynamicKey не працює для читання властивості за значенням змінної dynamicKey?", answer: "Крапкова нотація завжди інтерпретує текст після крапки як буквальне, статичне імʼя властивості — вона не обчислює вирази. obj.dynamicKey шукає властивість, чиє імʼя буквально \"dynamicKey\", а не значення змінної dynamicKey. Для доступу за значенням змінної потрібна дужкова нотація: obj[dynamicKey]." },
    ],
    summary: "Крапкова нотація obj.key — для статичних валідних імен; дужкова obj[key] — для динамічних ключів чи невалідних ідентифікаторів. Опціональний ланцюжок ?. безпечно читає вкладені властивості, повертаючи undefined замість TypeError, коли проміжна ланка відсутня.",
    proTip: "Якщо в коді бачиш глибокий вкладений доступ (a.b.c.d) без жодної перевірки — це кандидат на TypeError у production. Додай ?. хоча б на ланках, які реально можуть бути відсутні за даними з API.",
    nextLessonNote: "Далі — деструктуризація: як дістати кілька властивостей обʼєкта в окремі змінні за один вираз, включно з перейменуванням і значеннями за умовчанням.",
    interactiveDemo: "property-access-demo",
    practiceTask: {
      title: "Виправ TypeError при читанні вкладеної адреси",
      description: "Функція getCity читає user.address.city без перевірки — якщо у користувача немає address, викидається TypeError. Додай опціональний ланцюжок.",
      checklist: ["getCity повертає назву міста, якщо address існує.", "getCity повертає значення за умовчанням (\"Невідомо\"), якщо address відсутній, а не кидає помилку.", "Використано ?. та ?? замість необробленого доступу."],
      starterFiles: [
        {
          id: "js-property-access-start",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<p id="output"></p>

<script>
  function getCity(user) {
    return user.address.city; // БАГ: немає перевірки на відсутній address
  }

  const userWithoutAddress = { name: "Оксана" };
  try {
    document.querySelector("#output").textContent = getCity(userWithoutAddress);
  } catch (err) {
    document.querySelector("#output").textContent = "Помилка: " + err.message;
  }
</script>
`,
        },
      ],
      solutionFiles: [
        {
          id: "js-property-access-solution",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<p id="output"></p>

<script>
  function getCity(user) {
    return user.address?.city ?? "Невідомо";
  }

  const userWithoutAddress = { name: "Оксана" };
  document.querySelector("#output").textContent = getCity(userWithoutAddress);
  // тепер "Невідомо", без помилки
</script>
`,
          readOnly: true,
        },
      ],
      hints: ["user.address може бути undefined — пряме user.address.city кидає TypeError у цьому випадку.", "user.address?.city ?? \"Невідомо\" безпечно читає city і дає значення за умовчанням."],
      expectedOutput: "\"Невідомо\"",
    },
    microExercises: [
      { id: "js-property-dot-predict", kind: "predict", prompt: "Що виведе цей код?", code: `const key = "price";\nconst item = { price: 100 };\nconsole.log(item.key);\nconsole.log(item[key]);`, solution: "undefined, потім 100 — item.key шукає буквальну властивість \"key\" (немає такої), а item[key] обчислює значення змінної key (\"price\") і читає item.price." },
      { id: "js-property-chain-find-bug", kind: "find-the-bug", prompt: "У чому проблема цього коду?", code: `function getEmail(user) {\n  return user.contact.email;\n}\nconsole.log(getEmail({ name: "Тарас" }));`, solution: "Обʼєкт { name: \"Тарас\" } не має властивості contact, тому user.contact дорівнює undefined, а спроба прочитати .email з undefined кидає TypeError. Потрібен опціональний ланцюжок: user.contact?.email." },
      { id: "js-property-delete-choice", kind: "choice", prompt: "Який спосіб повністю видаляє властивість з обʼєкта (а не лише очищає її значення)?", options: ["obj.prop = null", "obj.prop = undefined", "delete obj.prop", "obj.prop = \"\""], correctAnswer: "delete obj.prop", solution: "delete obj.prop видаляє властивість з обʼєкта повністю — вона більше не зʼявиться в Object.keys(). Присвоєння null/undefined/\"\" лише змінює значення, властивість продовжує існувати." },
      { id: "js-property-bracket-explain", kind: "explain", prompt: "Поясни, чому obj[\"user-name\"] потрібен, а obj.user-name не спрацює.", solution: "У крапковій нотації текст після крапки інтерпретується як послідовність токенів JavaScript, а дефіс — це оператор віднімання. obj.user-name JavaScript прочитав би як \"obj.user\" мінус змінна \"name\" — синтаксично невірно й не те, що малось на увазі. Дужкова нотація obj[\"user-name\"] передає весь рядок \"user-name\" як єдине імʼя ключа, без інтерпретації дефіса як оператора." },
      { id: "js-property-optional-rewrite", kind: "rewrite", prompt: "Перепиши функцію так, щоб вона безпечно повертала поштовий індекс або \"—\", якщо його немає.", code: `function getZip(user) {\n  return user.address.zip;\n}`, solution: `function getZip(user) {\n  return user.address?.zip ?? "—";\n}\n// ?. запобігає TypeError, якщо address відсутній; ?? дає значення за умовчанням, якщо результат undefined/null` },
    ],
  },

  "Деструктуризація": {
    whatIsIt: "Деструктуризація — синтаксис, що дістає кілька властивостей обʼєкта в окремі змінні за ОДИН вираз: const { name, price } = product замінює два окремих присвоєння. Підтримує перейменування (const { name: productName } = product), значення за умовчанням (const { discount = 0 } = product) і вкладену деструктуризацію для глибших структур.",
    whyUseIt: "Функції часто отримують обʼєкт з даними, з якого потрібні лише кілька конкретних полів — деструктуризація в параметрах функції одразу показує, ЯКІ поля використовуються, без ланцюжка obj.field1, obj.field2 по всьому тілу функції. Пізніше, у курсі React, цей самий прийом буде трапитись майже в кожному компоненті — там дані, що передаються компоненту (їх називають \"props\"), майже завжди деструктуризують одразу в параметрах.",
    whenToUse: ["Потрібно дістати кілька властивостей обʼєкта в окремі іменовані змінні.", "Параметри функції — обʼєкт-конфігурація, з якого функція реально використовує лише частину полів.", "Значення за умовчанням для властивостей, які можуть бути відсутні (discount = 0)."],
    whenNotToUse: ["Не деструктуризуй, якщо потрібен ЦІЛИЙ обʼєкт як єдине значення — деструктуризація розбиває його на частини.", "Не переускладнюй глибоко вкладену деструктуризацію (3+ рівні) в одному виразі — це важко читати; краще розбити на кілька кроків чи проміжних змінних.", "Не деструктуризуй властивість, яка МОЖЕ бути відсутньою, без значення за умовчанням — отримаєш undefined без явного сигналу про це."],
    comparisonTable: {
      headers: ["Синтаксис", "Результат"],
      rows: [
        ["const { name } = product", "name = product.name"],
        ["const { name: title } = product", "title = product.name (перейменовано)"],
        ["const { discount = 0 } = product", "discount = product.discount, або 0, якщо undefined"],
        ["const { address: { city } } = user", "city = user.address.city (вкладено)"],
      ],
    },
    codeWalkthroughs: [
      {
        before: "Базова деструктуризація — заміна декількох присвоєнь одним виразом:",
        code: `const product = { name: "Книга", price: 300, inStock: true };

// Без деструктуризації
const name1 = product.name;
const price1 = product.price;

// З деструктуризацією — той самий результат
const { name, price } = product;

console.log(name, price); // "Книга" 300`,
        lineNotes: ["const { name, price } = product одразу створює ДВІ змінні, name і price, зі значеннями відповідних властивостей product.", "Порядок імен у { } не повʼязаний з порядком властивостей у самому обʼєкті — деструктуризація шукає за іменем, а не за позицією (на відміну від масивів)."],
      },
      {
        before: "Перейменування при деструктуризації — коли назва змінної не має збігатись з іменем ключа:",
        code: `const apiResponse = { usr_name: "Олена", usr_id: 42 };

const { usr_name: userName, usr_id: userId } = apiResponse;

console.log(userName, userId); // "Олена" 42`,
        lineNotes: ["{ usr_name: userName } означає \"дістань властивість usr_name, але назви нову змінну userName\" — корисно, коли назва властивості з API не збігається зі стилем коду.", "Оригінальна властивість apiResponse.usr_name лишається незміненою — це вплинуло лише на назву НОВОЇ локальної змінної."],
      },
      {
        before: "Значення за умовчанням — коли властивість може бути відсутньою:",
        code: `const product1 = { name: "Книга", price: 300, discount: 10 };
const product2 = { name: "Ручка", price: 20 }; // немає discount

function getFinalPrice({ price, discount = 0 }) {
  return price - price * (discount / 100);
}

console.log(getFinalPrice(product1)); // 270
console.log(getFinalPrice(product2)); // 20 — discount за умовчанням 0`,
        lineNotes: ["discount = 0 в деструктуризації параметра означає: якщо product.discount дорівнює undefined, використай 0 замість undefined.", "Деструктуризація прямо в параметрах функції ({ price, discount = 0 }) одразу показує, ЯКІ поля функція очікує від переданого обʼєкта."],
      },
      {
        before: "Вкладена деструктуризація для глибших структур даних:",
        code: `const user = {
  name: "Іван",
  address: { city: "Львів", zip: "79000" },
};

const { name, address: { city, zip } } = user;

console.log(name, city, zip); // "Іван" "Львів" "79000"`,
        lineNotes: ["address: { city, zip } занурюється у вкладений обʼєкт address і дістає з нього city та zip НАПРЯМУ, без створення проміжної змінної address.", "Якщо user.address взагалі відсутній (undefined), цей вираз кидає TypeError — вкладена деструктуризація без перевірки НЕ безпечна для відсутніх проміжних обʼєктів."],
        after: "Для потенційно відсутнього address варто спершу дати значення за умовчанням: const { address: { city } = {} } = user.",
      },
    ],
    commonMistakes: ["Очікувати, що деструктуризація { a, b } = obj працює за ПОЗИЦІЄЮ, як для масивів — вона завжди працює за ІМЕНЕМ ключа.", "Забувати значення за умовчанням для властивості, яка може бути відсутньою, й отримувати \"тихий\" undefined замість явного значення.", "Вкладена деструктуризація без урахування, що проміжний обʼєкт може бути повністю відсутнім — кидає TypeError, а не дає undefined.", "Плутати перейменування { key: newName } з встановленням значення за умовчанням { key = default } — це різний синтаксис для різних цілей (можна комбінувати: { key: newName = default })."],
    dontDoThis: { code: `function showAddress(user) {\n  const { city, zip } = user.address; // БАГ: якщо address немає — TypeError\n  return city + ", " + zip;\n}\n\nconsole.log(showAddress({ name: "Марія" })); // TypeError: Cannot destructure property...`, explanation: "user.address дорівнює undefined для обʼєкта без цієї властивості. Спроба деструктуризувати { city, zip } з undefined кидає TypeError — деструктуризація вимагає, щоб праворуч від = було щось, з чого МОЖНА дістати властивості (обʼєкт чи масив), а не undefined/null." },
    bestPractices: ["Використовуй деструктуризацію параметрів функції, щоб одразу показати, ЯКІ поля обʼєкта функція реально використовує.", "Завжди додавай значення за умовчанням для властивостей, які можуть бути відсутні: { discount = 0 }.", "Для вкладеної деструктуризації потенційно відсутнього обʼєкта додавай запасний обʼєкт: { address: { city } = {} }.", "Перейменовуй властивості з незручними/неконсистентними іменами (з API, старого коду) одразу при деструктуризації."],
    remember: ["Деструктуризація обʼєкта завжди працює ЗА ІМЕНЕМ ключа, а не за позицією (на відміну від масивів).", "{ key: newName } перейменовує змінну; { key = default } задає значення за умовчанням; можна комбінувати: { key: newName = default }.", "Деструктуризація undefined/null кидає TypeError — переконайся, що обʼєкт справді існує, перед деструктуризацією.", "Деструктуризація параметрів функції ({ a, b }) документує, ЯКІ поля функція очікує, прямо в сигнатурі."],
    interviewQuestions: [
      { question: "За чим деструктуризація обʼєкта підбирає значення — за позицією чи за іменем ключа?", answer: "За іменем ключа. const { b, a } = { a: 1, b: 2 } дає b = 2, a = 1 — порядок імен у { } зліва не впливає на результат, важливий лише збіг з іменами властивостей праворуч. Це відрізняється від деструктуризації масивів, де порядок має значення." },
      { question: "Як задати значення за умовчанням при деструктуризації властивості, яка може бути відсутньою?", answer: "Синтаксисом { propertyName = defaultValue } = obj. Якщо obj.propertyName дорівнює саме undefined (не будь-яке falsy-значення, а конкретно undefined), змінна propertyName отримає defaultValue замість undefined." },
      { question: "Що станеться, якщо спробувати деструктуризувати властивості з undefined?", answer: "JavaScript кидає TypeError: Cannot destructure property '...' of 'undefined' as it is undefined. Деструктуризація вимагає, щоб значення праворуч від = дозволяло читання властивостей — undefined і null не підходять." },
      { question: "Як одночасно перейменувати властивість і задати їй значення за умовчанням при деструктуризації?", answer: "Комбінуючи обидва синтаксиси: const { originalName: newName = defaultValue } = obj. Це читає властивість originalName, зберігає її (або defaultValue, якщо вона undefined) у нову змінну з іменем newName." },
    ],
    summary: "Деструктуризація { a, b } = obj дістає властивості за ІМЕНЕМ (не позицією) в окремі змінні за один вираз, підтримуючи перейменування ({ a: newA }) і значення за умовчанням ({ a = 0 }). Деструктуризація undefined/null кидає TypeError, тому вкладені чи потенційно відсутні поля потребують запасних значень.",
    proTip: "Деструктуризуй прямо в параметрах функції ({ name, price }) замість того, щоб приймати весь обʼєкт і потім писати obj.name, obj.price по тілу функції — сигнатура функції одразу стає документацією того, що їй реально потрібно.",
    nextLessonNote: "Далі — синтаксис spread для обʼєктів: як скопіювати чи обʼєднати обʼєкти незмінно, зберігаючи оригінал недоторканим.",
    interactiveDemo: "destructuring-demo",
    practiceTask: {
      title: "Виправ деструктуризацію без значення за умовчанням",
      description: "Функція getDiscountedPrice деструктуризує discount без значення за умовчанням, тому для товарів без знижки результат стає NaN. Додай значення за умовчанням 0.",
      checklist: ["getDiscountedPrice повертає коректну ціну для товарів БЕЗ знижки (discount відсутній).", "Використано { price, discount = 0 } замість { price, discount }.", "Функція коректно працює і для товарів ЗІ знижкою."],
      starterFiles: [
        {
          id: "js-destructure-start",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<p id="output"></p>

<script>
  function getDiscountedPrice({ price, discount }) {
    return price - price * (discount / 100); // БАГ: discount може бути undefined
  }

  const productNoDiscount = { name: "Зошит", price: 45 };
  document.querySelector("#output").textContent = "Ціна: " + getDiscountedPrice(productNoDiscount);
  // зараз показує "Ціна: NaN"
</script>
`,
        },
      ],
      solutionFiles: [
        {
          id: "js-destructure-solution",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<p id="output"></p>

<script>
  function getDiscountedPrice({ price, discount = 0 }) {
    return price - price * (discount / 100);
  }

  const productNoDiscount = { name: "Зошит", price: 45 };
  document.querySelector("#output").textContent = "Ціна: " + getDiscountedPrice(productNoDiscount);
  // тепер "Ціна: 45"
</script>
`,
          readOnly: true,
        },
      ],
      hints: ["Без значення за умовчанням discount дорівнює undefined для товарів без знижки, а undefined / 100 дає NaN.", "{ discount = 0 } дає 0 замість undefined, коли властивість відсутня."],
      expectedOutput: "\"Ціна: 45\"",
    },
    microExercises: [
      { id: "js-destructure-basic-predict", kind: "predict", prompt: "Що виведе цей код?", code: `const { b, a } = { a: 1, b: 2 };\nconsole.log(a, b);`, solution: "1 2 — деструктуризація підбирає значення за іменем ключа (a і b), а не за порядком запису в { }, тому a завжди отримає 1, а b — 2, незалежно від порядку в лівій частині." },
      { id: "js-destructure-undefined-find-bug", kind: "find-the-bug", prompt: "У чому проблема цього коду?", code: `function greet(user) {\n  const { name } = user;\n  return "Привіт, " + name;\n}\nconsole.log(greet(undefined));`, solution: "greet отримує undefined як user, а спроба деструктуризувати { name } з undefined кидає TypeError: Cannot destructure property 'name' of 'undefined'. Потрібна перевірка перед деструктуризацією чи значення за умовчанням для самого параметра: function greet(user = {})." },
      { id: "js-destructure-default-choice", kind: "choice", prompt: "Що поверне { count = 10 } = {}?", options: ["undefined", "10", "0", "TypeError"], correctAnswer: "10", solution: "Обʼєкт {} не має властивості count, тому вона дорівнює undefined — значення за умовчанням 10 застосовується саме в цьому випадку (тільки коли значення точно undefined), тому count отримає 10." },
      { id: "js-destructure-rename-explain", kind: "explain", prompt: "Поясни, що робить вираз const { id: userId } = response.", solution: "Цей вираз дістає властивість id з обʼєкта response, але зберігає її значення у ЗМІННУ З ІНШИМ ІМЕНЕМ — userId, а не id. Це перейменування корисне, коли назва властивості з зовнішнього джерела (API) не збігається з бажаним стилем найменування коду, або щоб уникнути конфлікту імен з іншою змінною id в тому самому скоупі." },
      { id: "js-destructure-nested-rewrite", kind: "rewrite", prompt: "Перепиши функцію, використовуючи деструктуризацію параметра замість звернень через крапку.", code: `function formatUser(user) {\n  return user.name + " (" + user.email + ")";\n}`, solution: `function formatUser({ name, email }) {\n  return name + " (" + email + ")";\n}\n// сигнатура функції одразу показує, які поля вона очікує від переданого обʼєкта` },
    ],
  },

  "Синтаксис spread": {
    whatIsIt: "Spread-синтаксис ({ ...obj }) розгортає всі власні перелічувані властивості обʼєкта в НОВИЙ обʼєктний літерал. Найчастіше використовується для поверхневого копіювання ({ ...original }) і обʼєднання декількох обʼєктів в один ({ ...defaults, ...overrides }), де властивості з ПІЗНІШОГО спреду перезаписують однойменні з РАНІШОГО.",
    whyUseIt: "Пряма мутація обʼєкта (obj.field = x) змінює обʼєкт \"на місці\" — посилання на нього (адреса в памʼяті, за якою JavaScript його знаходить) залишається тим самим, змінюється лише вміст. Це небезпечно, якщо той самий обʼєкт використовується десь ще: зміна в одному місці непомітно \"просочується\" в інше. Spread { ...obj, field: x } натомість створює ЦІЛКОМ НОВИЙ обʼєкт з новим посиланням — оригінал лишається незмінним. Пізніше, у курсі React, ти побачиш, що це критично важливо: React визначає, чи змінились дані, порівнюючи саме посилання (старе з новим), а не вміст обʼєкта — тому пряма мутація там непомітно \"ламає\" оновлення екрана.",
    whenToUse: ["Поверхневе копіювання обʼєкта перед його зміною, щоб не мутувати оригінал.", "Обʼєднання значень за умовчанням з користувацькими налаштуваннями: { ...defaults, ...userOptions }.", "Незмінне оновлення однієї-двох властивостей обʼєкта: { ...obj, field: newValue } — цей самий прийом ти регулярно побачиш пізніше в курсі React."],
    whenNotToUse: ["Не покладайся на spread для ГЛИБОКОГО копіювання — він копіює лише ПЕРШИЙ рівень; вкладені обʼєкти/масиви залишаються тими самими посиланнями.", "Не використовуй spread для обʼєднання ДУЖЕ великої кількості великих обʼєктів у гарячому циклі без потреби — кожен spread створює новий обʼєкт.", "Не забувай про ПОРЯДОК у { ...a, ...b } — останній спред \"переможе\" при конфлікті однойменних властивостей."],
    comparisonTable: {
      headers: ["Вираз", "Результат"],
      rows: [
        ["{ ...original }", "поверхнева копія original"],
        ["{ ...a, ...b }", "обʼєднання; властивості b перезаписують однойменні з a"],
        ["{ ...obj, field: x }", "копія obj зі зміненим (чи доданим) field"],
        ["Object.assign({}, a, b)", "старий еквівалент { ...a, ...b } до появи spread"],
      ],
    },
    codeWalkthroughs: [
      {
        before: "Поверхнева копія обʼєкта — оригінал не змінюється:",
        code: `const original = { name: "Книга", price: 300 };
const copy = { ...original };

copy.price = 350;

console.log(original.price); // 300 — оригінал не змінився
console.log(copy.price); // 350
console.log(original === copy); // false — різні обʼєкти в памʼяті`,
        lineNotes: ["{ ...original } розгортає всі властивості original у НОВИЙ обʼєктний літерал copy — це окремий обʼєкт у памʼяті.", "original === copy дає false, хоча вміст спочатку однаковий — це РІЗНІ посилання, зміна однієї копії не впливає на іншу."],
      },
      {
        before: "Обʼєднання значень за умовчанням з користувацькими налаштуваннями — порядок вирішує все:",
        code: `const defaults = { theme: "light", fontSize: 14 };
const userOptions = { fontSize: 18 };

const settings = { ...defaults, ...userOptions };
console.log(settings); // { theme: "light", fontSize: 18 } — fontSize перезаписано`,
        lineNotes: ["Спочатку розгортаються defaults, потім userOptions — оскільки userOptions йде ДРУГИМ, його fontSize: 18 перезаписує fontSize: 14 з defaults.", "theme залишається з defaults, бо userOptions не містить такої властивості взагалі."],
      },
      {
        before: "Object.assign() — старий (до spread) спосіб зробити те саме обʼєднання:",
        code: `const defaults = { theme: "light", fontSize: 14 };
const userOptions = { fontSize: 18 };

const viaAssign = Object.assign({}, defaults, userOptions);
const viaSpread = { ...defaults, ...userOptions };

console.log(viaAssign); // { theme: "light", fontSize: 18 }
console.log(viaSpread); // { theme: "light", fontSize: 18 } — той самий результат`,
        lineNotes: ["Перший аргумент {} — порожній обʼєкт-\"приймач\": Object.assign копіює властивості НАСТУПНИХ аргументів у нього по черзі (пізніший аргумент перезаписує однойменні властивості з ранішого — той самий принцип, що й у spread).", "Якщо забути {} першим аргументом і написати Object.assign(defaults, userOptions) — сам defaults мутується напряму, що майже завжди небажано.", "У сучасному коді spread ({ ...a, ...b }) читається коротше й безпечніше, тому Object.assign трапляється здебільшого в старішому коді."],
      },
      {
        before: "Незмінне оновлення однієї властивості — реальний React-подібний шаблон:",
        code: `const state = { count: 0, name: "Лічильник" };

// Незмінно: новий обʼєкт з оновленим count, все інше збережено
const nextState = { ...state, count: state.count + 1 };

console.log(state); // { count: 0, name: "Лічильник" } — не змінився
console.log(nextState); // { count: 1, name: "Лічильник" }`,
        lineNotes: ["{ ...state, count: state.count + 1 } спочатку копіює ВСІ властивості state, а потім перезаписує ЛИШЕ count новим значенням — name копіюється автоматично, без явного згадування.", "Порядок важливий: якщо count: ... написати ПЕРЕД ...state, оригінальне state.count перезаписало б нове значення — властивість, вказана ПІСЛЯ спреду, завжди перемагає."],
      },
      {
        before: "Пастка поверхневого копіювання — вкладені обʼєкти залишаються тим самим посиланням:",
        code: `const user = { name: "Іван", address: { city: "Київ" } };
const copy = { ...user };

copy.address.city = "Львів"; // мутує ВКЛАДЕНИЙ обʼєкт напряму

console.log(user.address.city); // "Львів" — оригінал теж змінився!
console.log(user.address === copy.address); // true — те саме посилання`,
        lineNotes: ["{ ...user } копіює лише ПЕРШИЙ рівень — властивість address у копії посилається на ТОЙ САМИЙ вкладений обʼєкт, що й в оригіналі.", "Мутація copy.address.city напряму змінює загальний вкладений обʼєкт, тому \"оригінальний\" user.address.city теж бачить зміну — це не справжня незалежна копія на глибшому рівні."],
        after: "Для справжньої незалежності на всіх рівнях потрібне ГЛИБОКЕ копіювання: { ...user, address: { ...user.address } } чи structuredClone(user) для довільної глибини.",
      },
    ],
    commonMistakes: ["Вважати { ...obj } глибокою копією — це лише поверхнева копія; вкладені обʼєкти/масиви залишаються спільними посиланнями.", "Писати { field: newValue, ...obj } замість { ...obj, field: newValue } — порядок ВАЖЛИВИЙ, спред ПІСЛЯ поля перезаписує його оригінальним значенням з obj.", "Забувати, що при обʼєднанні кількох спредів ({ ...a, ...b, ...c }) кожен наступний перезаписує однойменні властивості попередніх.", "Мутувати вкладений обʼєкт після поверхневого копіювання, думаючи, що оригінал захищений."],
    dontDoThis: { code: `function updateTheme(settings, newTheme) {\n  return { theme: newTheme, ...settings }; // БАГ: порядок неправильний!\n}\n\nconst settings = { theme: "dark", fontSize: 14 };\nconsole.log(updateTheme(settings, "light")); // { theme: "dark", fontSize: 14 } — theme НЕ змінився!`, explanation: "{ theme: newTheme, ...settings } спочатку задає theme: newTheme, але ПОТІМ розгортає ...settings, чия властивість theme (\"dark\") перезаписує щойно встановлене значення newTheme (\"light\"). Правильний порядок: { ...settings, theme: newTheme } — спред ПЕРШИМ, конкретне поле ПІСЛЯ нього, щоб воно \"перемогло\"." },
    bestPractices: ["Для оновлення однієї-двох властивостей завжди пиши спред ПЕРШИМ, конкретні поля — ПІСЛЯ: { ...obj, field: newValue }.", "Для обʼєднання значень за умовчанням з користувацькими налаштуваннями розташовуй їх у порядку зростання пріоритету: { ...defaults, ...userOptions }.", "Якщо потрібно змінити вкладену властивість незмінно, копіюй і вкладений рівень явно: { ...obj, nested: { ...obj.nested, field: x } }.", "Для повністю незалежної копії довільної глибини використовуй structuredClone(obj) замість поверхневого spread."],
    remember: ["{ ...obj } створює ПОВЕРХНЕВУ копію — лише перший рівень властивостей, вкладені обʼєкти залишаються спільними посиланнями.", "У { ...a, ...b } властивості b перезаписують однойменні з a, бо b розгортається ПІЗНІШЕ.", "Для оновлення конкретного поля пиши спред ПЕРШИМ: { ...obj, field: newValue } — інакше поле може бути перезаписане назад оригінальним значенням.", "structuredClone(obj) чи ручне вкладене копіювання потрібні для справжньої незалежності на глибших рівнях."],
    interviewQuestions: [
      { question: "Що робить { ...obj } всередині нового обʼєктного літерала?", answer: "Розгортає всі власні перелічувані властивості obj у новий обʼєктний літерал, створюючи ПОВЕРХНЕВУ копію — новий обʼєкт з тими самими значеннями властивостей верхнього рівня, але окреме посилання в памʼяті від оригіналу." },
      { question: "Що станеться при обʼєднанні { ...a, ...b }, якщо a і b мають однойменну властивість?", answer: "Властивість з b (розгорнутого ПІЗНІШЕ) перезапише однойменну властивість з a. Порядок спредів визначає пріоритет: останній спред \"переможе\" при конфлікті ключів." },
      { question: "Чи { ...obj } робить глибоку копію обʼєкта?", answer: "Ні, лише поверхневу. Значення властивостей верхнього рівня копіюються, але якщо значення саме обʼєкт чи масив, у копії опиниться ТЕ САМЕ посилання на нього — мутація цього вкладеного значення в копії вплине і на оригінал." },
      { question: "Чому { field: value, ...obj } може дати неочікуваний результат при спробі оновити field?", answer: "Тому що spread, розташований ПІСЛЯ поля, розгортається пізніше й може перезаписати вже встановлене значення field оригінальним значенням з obj (якщо там така властивість є). Щоб field гарантовано \"переміг\", спред має йти ПЕРШИМ: { ...obj, field: value }." },
    ],
    summary: "{ ...obj } створює поверхневу копію обʼєкта — лише верхній рівень, вкладені структури залишаються спільними посиланнями. У { ...a, ...b } властивості з b перезаписують однойменні з a; для гарантованого оновлення конкретного поля спред має йти ПЕРШИМ: { ...obj, field: newValue }.",
    proTip: "Якщо оновлення поля через spread \"не працює\" — перевір порядок: { field: x, ...obj } майже завжди неправильно, правильно { ...obj, field: x }.",
    nextLessonNote: "Далі — вкладені дані: як безпечно читати й незмінно оновлювати глибоко вкладені структури обʼєктів і масивів разом.",
    interactiveDemo: "object-spread-demo",
    practiceTask: {
      title: "Виправ порядок spread при оновленні теми",
      description: "Функція updateTheme розташовує оновлюване поле theme ПЕРЕД спредом ...settings, через що спред перезаписує його назад оригінальним значенням. Поміняй порядок.",
      checklist: ["updateTheme повертає новий обʼєкт з оновленим значенням theme.", "Усі інші властивості settings (наприклад fontSize) зберігаються без змін.", "Спред ...settings розташований ПЕРШИМ, поле theme — ПІСЛЯ нього."],
      starterFiles: [
        {
          id: "js-object-spread-start",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<p id="output"></p>

<script>
  function updateTheme(settings, newTheme) {
    return { theme: newTheme, ...settings }; // БАГ: неправильний порядок
  }

  const settings = { theme: "dark", fontSize: 14 };
  const result = updateTheme(settings, "light");
  document.querySelector("#output").textContent = JSON.stringify(result);
  // зараз показує {"theme":"dark","fontSize":14} — theme не змінився
</script>
`,
        },
      ],
      solutionFiles: [
        {
          id: "js-object-spread-solution",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<p id="output"></p>

<script>
  function updateTheme(settings, newTheme) {
    return { ...settings, theme: newTheme };
  }

  const settings = { theme: "dark", fontSize: 14 };
  const result = updateTheme(settings, "light");
  document.querySelector("#output").textContent = JSON.stringify(result);
  // тепер {"theme":"light","fontSize":14}
</script>
`,
          readOnly: true,
        },
      ],
      hints: ["Властивість, вказана ПІСЛЯ спреду, перезаписує однойменну з нього — а не навпаки.", "Правильний порядок: { ...settings, theme: newTheme }."],
      expectedOutput: "{\"theme\":\"light\",\"fontSize\":14}",
    },
    microExercises: [
      { id: "js-spread-merge-predict", kind: "predict", prompt: "Що виведе цей код?", code: `const a = { x: 1, y: 2 };\nconst b = { y: 99 };\nconsole.log({ ...a, ...b });`, solution: "{ x: 1, y: 99 } — b розгортається ПІСЛЯ a, тому його y (99) перезаписує y з a (2); x залишається з a, бо b не має такої властивості." },
      { id: "js-spread-shallow-find-bug", kind: "find-the-bug", prompt: "У чому проблема цього коду?", code: `const user = { name: "Іван", settings: { theme: "dark" } };\nconst copy = { ...user };\ncopy.settings.theme = "light";\nconsole.log(user.settings.theme);`, solution: "{ ...user } — поверхнева копія: властивість settings у copy посилається на ТОЙ САМИЙ вкладений обʼєкт, що і в user. Мутація copy.settings.theme змінює загальний вкладений обʼєкт, тому user.settings.theme теж стає \"light\", хоча copy мала бути окремою копією." },
      { id: "js-spread-order-choice", kind: "choice", prompt: "Який вираз ГАРАНТОВАНО поверне обʼєкт з полем count, рівним 5, незалежно від того, що зберігається в obj.count?", options: ["{ count: 5, ...obj }", "{ ...obj, count: 5 }", "{ ...obj }", "obj.count = 5, потім { ...obj }"], correctAnswer: "{ ...obj, count: 5 }", solution: "{ ...obj, count: 5 } розгортає obj ПЕРШИМ, а потім явно перезаписує count значенням 5 — незалежно від того, що було в obj.count. { count: 5, ...obj } навпаки: якщо obj має властивість count, вона перезапише щойно встановлене 5." },
      { id: "js-spread-immutable-explain", kind: "explain", prompt: "Поясни, чому { ...state, count: state.count + 1 } вважається незмінним оновленням, а state.count++ — ні.", solution: "{ ...state, count: state.count + 1 } створює ЗОВСІМ НОВИЙ обʼєкт: копіює всі властивості state, а потім задає нове значення count, залишаючи оригінальний state абсолютно недоторканим (нове посилання в памʼяті). state.count++ мутує ІСНУЮЧИЙ обʼєкт state напряму — посилання на state залишається тим самим, тільки внутрішнє значення змінюється, що \"невидиме\" для систем (як React), які визначають зміни через порівняння посилань." },
      { id: "js-spread-deep-rewrite", kind: "rewrite", prompt: "Перепиши код так, щоб зміна вкладеної властивості theme НЕ впливала на оригінальний обʼєкт settings.", code: `const settings = { fontSize: 14, appearance: { theme: "dark" } };\nconst updated = { ...settings };\nupdated.appearance.theme = "light";`, solution: `const settings = { fontSize: 14, appearance: { theme: "dark" } };\nconst updated = { ...settings, appearance: { ...settings.appearance, theme: "light" } };\n// вкладений appearance теж копіюється явно, тому оригінал settings.appearance.theme залишається "dark"` },
    ],
  },
  "Вкладені дані": {
    whatIsIt: "Вкладені дані — це обʼєкти, що містять масиви, і масиви, що містять обʼєкти, довільної глибини: { user: { name, orders: [{ id, items: [...] }] } }. Реальні дані з API майже завжди мають таку форму. Читання глибоко вкладеного значення поєднує крапкову/дужкову нотацію з індексацією масиву й опціональним ланцюжком; незмінне ОНОВЛЕННЯ вкладеної структури вимагає копіювання КОЖНОГО рівня на шляху до зміненого значення, а не лише верхнього.",
    whyUseIt: "Товар з масивом відгуків, користувач зі списком замовлень, замовлення зі списком товарів — реальні предметні області рідко пласкі. Вміння безпечно читати й, головне, ПРАВИЛЬНО незмінно оновлювати глибоко вкладені дані — це те, що відрізняє робочий код на реальному проєкті від навчального прикладу з одним рівнем властивостей.",
    whenToUse: ["Дані природно мають ієрархію: користувач → замовлення → товари в замовленні.", "Потрібно оновити ОДНЕ значення глибоко всередині великої структури, зберігаючи решту незмінною.", "Читання даних з реального API, де вкладеність і відсутність окремих полів — норма, а не виняток."],
    whenNotToUse: ["Не роби структуру глибшою, ніж потрібно, \"на майбутнє\" — кожен рівень вкладеності ускладнює і читання, і незмінне оновлення.", "Не намагайся оновлювати глибоко вкладене значення прямою мутацією (obj.a.b.c = x) в даних, де важливо зберегти старий обʼєкт незмінним (наприклад, пізніше в курсі React це буде стан компонента) — потрібне повне незмінне копіювання шляху.", "Не забувай про ?. на кожній потенційно відсутній ланці при глибокому читанні — інакше один відсутній проміжний рівень ламає весь вираз."],
    comparisonTable: {
      headers: ["Дія", "Правильний підхід"],
      rows: [
        ["Прочитати глибоко вкладене значення", "a?.b?.[0]?.c — ?. на кожній потенційно відсутній ланці"],
        ["Оновити властивість на 1 рівні", "{ ...obj, field: x }"],
        ["Оновити властивість на 2+ рівнях", "{ ...obj, nested: { ...obj.nested, field: x } } — копія КОЖНОГО рівня"],
        ["Оновити елемент масиву всередині обʼєкта", "{ ...obj, list: obj.list.map((item, i) => i === idx ? {...item, ...} : item) }"],
      ],
    },
    codeWalkthroughs: [
      {
        before: "Спершу найпростіший можливий випадок вкладеності — лише ОДИН додатковий рівень, перш ніж переходити до складнішої структури:",
        code: `const user = {
  name: "Олена",
  address: { city: "Київ", street: "Хрещатик" },
};

console.log(user.address.city); // "Київ"`,
        lineNotes: ["user.address — це обʼєкт, вкладений усередину іншого обʼєкта user.", "user.address.city — просто два крапкових звернення підряд: спочатку дістаємось до address, потім до його city."],
        after: "Реальні дані рідко такі прості — часто замість одного вкладеного обʼєкта є масив вкладених обʼєктів, і так у кілька рівнів. Дивись наступний приклад.",
      },
      {
        before: "Реальна вкладена структура: користувач з масивом замовлень, кожне замовлення з масивом товарів:",
        code: `const user = {
  name: "Олена",
  orders: [
    { id: 1, items: [{ name: "Книга", price: 300 }] },
    { id: 2, items: [{ name: "Ручка", price: 20 }, { name: "Зошит", price: 45 }] },
  ],
};

console.log(user.orders[1].items[0].name); // "Ручка"
console.log(user.orders.length); // 2`,
        lineNotes: ["user.orders[1].items[0].name — крапкова нотація для властивостей, квадратні дужки з індексом для елементів масиву, чергуються на кожному рівні вкладеності.", "Кожен .orders[1] крок повертає ОДИН обʼєкт замовлення, з якого далі читається .items — глибина шляху дорівнює кількості рівнів вкладеності в даних."],
      },
      {
        before: "Безпечне читання, коли проміжний рівень може бути відсутнім чи масив може бути порожнім:",
        code: `const userA = { name: "Іван", orders: [{ id: 1, items: [] }] };
const userB = { name: "Петро" }; // немає orders взагалі

console.log(userA.orders[0]?.items[0]?.name); // undefined — items порожній, безпечно
console.log(userB.orders?.[0]?.items[0]?.name); // undefined — orders відсутній, безпечно
console.log(userB.orders[0]); // TypeError — orders взагалі undefined, без ?. перед [0]`,
        lineNotes: ["orders?.[0] — опціональний ланцюжок ПЕРЕД дужковою індексацією масиву захищає саме той крок, де orders може бути undefined.", "items[0]?.name захищає читання .name від того, що items[0] може бути undefined (масив порожній чи індекс поза межами)."],
        after: "Кожна ланка ланцюжка, яка МОЖЕ бути відсутньою за реальними даними, потребує власного ?. — пропуск хоча б однієї ланки повертає ситуацію до звичайного TypeError.",
      },
      {
        before: "Незмінне оновлення властивості на ДРУГОМУ рівні вкладеності:",
        code: `const settings = {
  fontSize: 14,
  appearance: { theme: "dark", contrast: "normal" },
};

// Незмінно: оновити ЛИШЕ theme, зберігши contrast і fontSize
const updated = {
  ...settings,
  appearance: { ...settings.appearance, theme: "light" },
};

console.log(settings.appearance.theme); // "dark" — оригінал не змінився
console.log(updated.appearance); // { theme: "light", contrast: "normal" }`,
        lineNotes: ["Копіювання ЛИШЕ { ...settings } НЕДОСТАТНЬО — властивість appearance у копії посилалась би на той самий вкладений обʼєкт, що і в оригіналі.", "{ ...settings.appearance, theme: \"light\" } копіює й вкладений рівень, тому зміна theme не впливає на оригінальний settings.appearance."],
      },
      {
        before: "Незмінне оновлення елемента масиву всередині обʼєкта — комбінація spread і map:",
        code: `const cart = {
  items: [
    { name: "Книга", qty: 1 },
    { name: "Ручка", qty: 3 },
  ],
};

// Незмінно: збільшити qty товару з індексом 1, залишивши решту без змін
const updatedCart = {
  ...cart,
  items: cart.items.map((item, index) =>
    index === 1 ? { ...item, qty: item.qty + 1 } : item
  ),
};

console.log(cart.items[1].qty); // 3 — оригінал не змінився
console.log(updatedCart.items[1].qty); // 4`,
        lineNotes: ["items: cart.items.map(...) створює НОВИЙ масив items для updatedCart, залишаючи cart.items недоторканим.", "{ ...item, qty: item.qty + 1 } всередині map створює НОВИЙ обʼєкт товару для зміненого елемента — інші елементи повертаються без змін (те саме посилання, і це нормально, бо вони не змінювались)."],
      },
    ],
    commonMistakes: ["Копіювати лише верхній рівень ({ ...obj }) і вважати ВСЮ структуру захищеною від мутації — вкладені рівні лишаються спільними посиланнями.", "Пропускати ?. на одній з кількох потенційно відсутніх ланок глибокого шляху — досить одного пропуску, щоб отримати TypeError.", "Мутувати елемент масиву всередині обʼєкта напряму (obj.list[i].field = x) замість map + spread — це змінює оригінал, навіть якщо зовнішній обʼєкт скопійований.", "Робити структуру даних глибшою, ніж реально потрібно для задачі — ускладнює і читання, і кожне майбутнє оновлення."],
    dontDoThis: { code: `function updateCity(user, newCity) {\n  const updated = { ...user }; // копія лише ВЕРХНЬОГО рівня\n  updated.address.city = newCity; // БАГ: мутує ВКЛАДЕНИЙ обʼєкт напряму\n  return updated;\n}\n\nconst user = { name: "Ярина", address: { city: "Одеса" } };\nconst updated = updateCity(user, "Харків");\nconsole.log(user.address.city); // "Харків" — оригінал теж змінився!`, explanation: "{ ...user } копіює лише властивості ВЕРХНЬОГО рівня — властивість address у updated посилається на ТОЙ САМИЙ вкладений обʼєкт, що і в user. updated.address.city = newCity мутує цей спільний вкладений обʼєкт напряму, тому зміна \"випливає\" в оригінальний user, хоча ззовні здається, що updated — незалежна копія." },
    bestPractices: ["Копіюй КОЖЕН рівень вкладеності на шляху до зміненого значення: { ...obj, nested: { ...obj.nested, field: x } }.", "Для оновлення елемента масиву всередині обʼєкта комбінуй spread (для обʼєкта) з map (для масиву), а не мутацію за індексом.", "Додавай ?. на кожній потенційно відсутній ланці глибокого шляху читання, а не лише на першій.", "Тримай структуру даних настільки пласкою, наскільки це розумно для задачі — глибша вкладеність = складніші оновлення."],
    remember: ["Незмінне оновлення вкладеної структури вимагає копіювання КОЖНОГО рівня на шляху до зміненої властивості, а не лише верхнього.", "a?.b?.[0]?.c — ?. потрібен на кожній ланці, яка окремо може бути null/undefined.", "Оновлення елемента масиву всередині обʼєкта = spread обʼєкта + map масиву, а НЕ мутація за індексом.", "Глибина вкладеності даних напряму впливає на складність КОЖНОГО майбутнього незмінного оновлення цих даних."],
    interviewQuestions: [
      { question: "Чому { ...obj } недостатньо для незмінного оновлення властивості на ДРУГОМУ рівні вкладеності?", answer: "{ ...obj } копіює лише властивості ВЕРХНЬОГО рівня. Якщо значення властивості саме обʼєкт (вкладена структура), у копії опиниться ТЕ САМЕ посилання на нього. Щоб справді незалежно оновити вкладену властивість, потрібно скопіювати і вкладений рівень: { ...obj, nested: { ...obj.nested, field: x } }." },
      { question: "Як незмінно оновити один елемент масиву, що зберігається як властивість обʼєкта?", answer: "Комбінацією spread для зовнішнього обʼєкта і map для масиву: { ...obj, list: obj.list.map((item, i) => i === targetIndex ? { ...item, field: newValue } : item) }. map створює новий масив, а spread всередині нього створює новий обʼєкт лише для зміненого елемента." },
      { question: "Що станеться, якщо в довгому ланцюжку a.b.c.d пропустити ?. на одній із ланок, яка МОЖЕ бути відсутньою?", answer: "Якщо саме ця ланка виявиться undefined/null за реальними даними, JavaScript кидає TypeError: Cannot read properties of undefined (reading '...'), навіть якщо всі ІНШІ ланки ланцюжка захищені через ?. — достатньо ОДНОГО незахищеного кроку, щоб отримати помилку." },
      { question: "Чому глибока вкладеність даних ускладнює підтримку коду?", answer: "Кожен додатковий рівень вкладеності означає, що і читання (потрібен довший ланцюжок, більше потенційних ?. ), і незмінне оновлення (потрібно копіювати КОЖЕН рівень на шляху) стають складнішими й більш громіздкими. Це особливо помітно при частих оновленнях глибоко вкладеного стану в React." },
    ],
    summary: "Вкладені дані поєднують обʼєкти й масиви на кількох рівнях. Незмінне оновлення вимагає копіювання КОЖНОГО рівня на шляху до зміненого значення ({ ...obj, nested: { ...obj.nested, field: x } }), а безпечне читання — ?. на КОЖНІЙ потенційно відсутній ланці. Оновлення елемента масиву всередині обʼєкта — це spread обʼєкта разом з map масиву.",
    proTip: "Якщо оновлення глибоко вкладеного поля виглядає громіздким (багато {...} поспіль) — це нормально й очікувано для незмінних оновлень; спокуса \"спростити\" через пряму мутацію майже завжди призводить саме до багу зі спільним посиланням.",
    nextLessonNote: "Далі — методи обʼєктів: Object.keys(), Object.values(), Object.entries() для перебору властивостей і Object.freeze() для захисту від мутації.",
    interactiveDemo: "nested-data-demo",
    practiceTask: {
      title: "Виправ незмінне оновлення вкладеної адреси",
      description: "Функція updateCity копіює лише верхній рівень обʼєкта user через { ...user }, а потім мутує вкладений address напряму. Виправ так, щоб оновлення було повністю незмінним.",
      checklist: ["updateCity повертає новий обʼєкт з оновленим city.", "Оригінальний обʼєкт user (включно з user.address) залишається повністю незміненим.", "Вкладений address теж скопійований через spread перед зміною city."],
      starterFiles: [
        {
          id: "js-nested-data-start",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<p id="output"></p>

<script>
  function updateCity(user, newCity) {
    const updated = { ...user };
    updated.address.city = newCity; // БАГ: мутує вкладений обʼєкт напряму
    return updated;
  }

  const user = { name: "Ярина", address: { city: "Одеса" } };
  const updated = updateCity(user, "Харків");

  document.querySelector("#output").textContent =
    "Оригінал: " + user.address.city + " | Новий: " + updated.address.city;
  // зараз показує "Оригінал: Харків | Новий: Харків" — оригінал теж змінився
</script>
`,
        },
      ],
      solutionFiles: [
        {
          id: "js-nested-data-solution",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<p id="output"></p>

<script>
  function updateCity(user, newCity) {
    return {
      ...user,
      address: { ...user.address, city: newCity },
    };
  }

  const user = { name: "Ярина", address: { city: "Одеса" } };
  const updated = updateCity(user, "Харків");

  document.querySelector("#output").textContent =
    "Оригінал: " + user.address.city + " | Новий: " + updated.address.city;
  // тепер "Оригінал: Одеса | Новий: Харків"
</script>
`,
          readOnly: true,
        },
      ],
      hints: ["{ ...user } копіює лише верхній рівень — address лишається спільним посиланням з оригіналом.", "Потрібно скопіювати і вкладений address: { ...user, address: { ...user.address, city: newCity } }."],
      expectedOutput: "\"Оригінал: Одеса | Новий: Харків\"",
    },
    microExercises: [
      { id: "js-nested-read-predict", kind: "predict", prompt: "Що виведе цей код?", code: `const data = { user: { orders: [{ id: 1 }, { id: 2 }] } };\nconsole.log(data.user.orders[1].id);`, solution: "2 — data.user.orders[1] читає ДРУГЕ замовлення (індекс 1) з масиву orders, а .id читає його властивість id, яка дорівнює 2." },
      { id: "js-nested-shallow-find-bug", kind: "find-the-bug", prompt: "У чому проблема цього коду?", code: `const config = { theme: { color: "blue" }, version: 1 };\nconst updated = { ...config };\nupdated.theme.color = "red";\nconsole.log(config.theme.color);`, solution: "{ ...config } копіює лише верхній рівень — властивість theme у updated посилається на ТОЙ САМИЙ вкладений обʼєкт, що і в config. Мутація updated.theme.color змінює цей спільний обʼєкт, тому config.theme.color теж стає \"red\"." },
      { id: "js-nested-chain-choice", kind: "choice", prompt: "Який вираз безпечно прочитає перший товар першого замовлення, навіть якщо orders може бути відсутнім?", options: ["user.orders[0].items[0]", "user.orders?.[0]?.items[0]", "user?.orders[0].items[0]", "user.orders?.[0].items?.[0]"], correctAnswer: "user.orders?.[0]?.items[0]", solution: "user.orders?.[0]?.items[0] захищає саме ту ланку, де orders може бути undefined (перед індексацією [0]) і ланку, де orders[0] може бути undefined (перед .items) — обидві потенційно проблемні точки покриті ?." },
      { id: "js-nested-immutable-explain", kind: "explain", prompt: "Поясни, чому { ...obj, nested: { ...obj.nested, field: x } } вважається повністю незмінним оновленням, а { ...obj, nested: obj.nested } — ні.", solution: "{ ...obj, nested: { ...obj.nested, field: x } } створює НОВИЙ обʼєкт і для зовнішнього рівня, і для вкладеного nested — обидва рівні незалежні від оригіналу. { ...obj, nested: obj.nested } копіює зовнішній рівень, але явно ЗБЕРІГАЄ те саме посилання на nested замість копіювання — це технічно теж \"оновлення\" (якщо інші поля змінились), але саме nested лишається спільним посиланням і його подальша мутація вплине на оригінал." },
      { id: "js-nested-array-rewrite", kind: "rewrite", prompt: "Перепиши функцію, щоб вона незмінно позначала товар з вказаним id як виконаний (done: true), не мутуючи оригінальний масив todos.", code: `function markDone(todos, id) {\n  const todo = todos.find((t) => t.id === id);\n  todo.done = true;\n  return todos;\n}`, solution: `function markDone(todos, id) {\n  return todos.map((t) => t.id === id ? { ...t, done: true } : t);\n}\n// map створює новий масив; spread створює новий обʼєкт лише для зміненого елемента` },
    ],
  },

  "Методи обʼєктів": {
    whatIsIt: "Вбудовані статичні методи Object дозволяють перебирати й трансформувати властивості обʼєкта без ручного for...in. Object.keys(obj) повертає масив ключів, Object.values(obj) — масив значень, Object.entries(obj) — масив пар [ключ, значення], зручний для map/filter чи for...of. Object.freeze(obj) робить обʼєкт незмінним на ПЕРШОМУ рівні — подальші спроби мутації тихо ігноруються (чи кидають помилку в strict mode).",
    whyUseIt: "Object.keys/values/entries перетворюють обʼєкт у масив, даючи доступ до всієї потужності масивних методів (.map, .filter, .reduce) для роботи з властивостями — наприклад, підрахувати кількість полів, відфільтрувати за значенням чи вивести список у інтерфейсі. Object.freeze() — простий спосіб технічно гарантувати незмінність важливих даних (наприклад, конфігурації) під час розробки.",
    whenToUse: ["Потрібно перебрати ВСІ властивості обʼєкта в циклі чи трансформувати їх через масивні методи.", "Підрахунок кількості властивостей: Object.keys(obj).length.", "Object.freeze() для обʼєктів-констант/конфігурацій, які НЕ повинні змінюватись під час виконання."],
    whenNotToUse: ["Не використовуй for...in для перебору власних властивостей обʼєкта — він також перебирає УСПАДКОВАНІ властивості; Object.keys() дає лише власні.", "Не покладайся на Object.freeze() як на ГЛИБОКИЙ захист — він заморожує лише ПЕРШИЙ рівень, вкладені обʼєкти залишаються мутабельними.", "Не перетворюй обʼєкт у масив через Object.entries(), якщо простіше й чіткіше просто звернутись до конкретної властивості напряму."],
    comparisonTable: {
      headers: ["Метод", "Що повертає"],
      rows: [
        ["Object.keys(obj)", "масив ключів: [\"name\", \"price\"]"],
        ["Object.values(obj)", "масив значень: [\"Книга\", 300]"],
        ["Object.entries(obj)", "масив пар: [[\"name\", \"Книга\"], [\"price\", 300]]"],
        ["Object.freeze(obj)", "той самий обʼєкт, тепер захищений від мутації на 1 рівні"],
      ],
    },
    codeWalkthroughs: [
      {
        before: "Object.keys(), Object.values() і Object.entries() на одному обʼєкті:",
        code: `const product = { name: "Книга", price: 300, inStock: true };

console.log(Object.keys(product)); // ["name", "price", "inStock"]
console.log(Object.values(product)); // ["Книга", 300, true]
console.log(Object.entries(product)); // [["name","Книга"], ["price",300], ["inStock",true]]`,
        lineNotes: ["Усі три методи повертають масиви В ОДНАКОВОМУ порядку — Object.keys()[0] відповідає Object.values()[0].", "Object.entries() дає масив пар [ключ, значення] — зручно для деструктуризації в циклі: for (const [key, value] of Object.entries(obj))."],
      },
      {
        before: "Перебір властивостей через Object.entries() і деструктуризацію в циклі:",
        code: `const scores = { math: 90, physics: 85, art: 95 };

for (const [subject, score] of Object.entries(scores)) {
  console.log(subject + ": " + score);
}
// "math: 90"
// "physics: 85"
// "art: 95"`,
        lineNotes: ["const [subject, score] деструктуризує кожну пару [ключ, значення] з масиву, що повертає Object.entries(), прямо в заголовку for...of.", "Це чіткіша альтернатива for...in + obj[key] для читання й ключа, і значення одночасно."],
      },
      {
        before: "Object.keys() + масивні методи для підрахунку й трансформації властивостей:",
        code: `const inventory = { apples: 5, bananas: 0, oranges: 12 };

const totalItems = Object.values(inventory).reduce((sum, qty) => sum + qty, 0);
const inStockCount = Object.entries(inventory).filter(([, qty]) => qty > 0).length;

console.log(totalItems); // 17
console.log(inStockCount); // 2 — apples і oranges, bananas виключено (0)`,
        lineNotes: ["Object.values(inventory).reduce(...) підсумовує всі значення властивостей — потужність масивних методів застосована до даних обʼєкта.", "filter(([, qty]) => qty > 0) деструктуризує пару, ігноруючи ключ (порожня позиція перед комою) і перевіряючи лише значення qty."],
      },
      {
        before: "Object.freeze() захищає обʼєкт від мутації на ПЕРШОМУ рівні, але не глибше:",
        code: `const config = Object.freeze({ apiUrl: "https://api.example.com", limits: { maxItems: 10 } });

config.apiUrl = "https://hacked.com"; // тихо ігнорується (не strict) — рівень 1 захищений
console.log(config.apiUrl); // "https://api.example.com" — не змінилось

config.limits.maxItems = 999; // ПРАЦЮЄ! рівень 2 (вкладений) НЕ захищений
console.log(config.limits.maxItems); // 999 — змінилось!`,
        lineNotes: ["Object.freeze(config) захищає лише ВЛАСТИВОСТІ САМОГО config (apiUrl, limits як посилання) — спроба їх перезаписати ігнорується.", "config.limits — це окремий обʼєкт, який Object.freeze() НЕ заморозив; його властивості (maxItems) залишаються повністю мутабельними."],
        after: "Для глибокого заморожування знадобився б рекурсивний виклик Object.freeze() на кожному вкладеному обʼєкті окремо.",
      },
    ],
    commonMistakes: ["Використовувати for...in для власних властивостей — він також перебирає УСПАДКОВАНІ, що рідко буває бажаним; Object.keys()/entries() безпечніші.", "Вважати Object.freeze() глибоким захистом — він заморожує лише ПЕРШИЙ рівень, вкладені обʼєкти лишаються мутабельними.", "Забувати, що Object.freeze() у нестрогому режимі ТИХО ігнорує спробу мутації, без помилки — легко не помітити, що оновлення \"не спрацювало\".", "Плутати порядок деструктуризації пари в Object.entries(): [key, value], а не [value, key]."],
    dontDoThis: { code: `const settings = Object.freeze({ theme: "dark", limits: { maxUsers: 5 } });\n\nfunction increaseLimit(settings) {\n  settings.limits.maxUsers += 1; // "працює", бо вкладений обʼєкт НЕ заморожений\n  return settings;\n}\n\nincreaseLimit(settings);\nconsole.log(settings.limits.maxUsers); // 6 — "заморожений" обʼєкт все одно змінився!`, explanation: "Object.freeze(settings) заморожує лише ВЛАСТИВОСТІ settings на верхньому рівні (theme, посилання limits) — сам вкладений обʼєкт limits залишається звичайним, повністю мутабельним обʼєктом. settings.limits.maxUsers += 1 змінює цей вкладений обʼєкт напряму, і ця зміна проходить успішно, попри те, що зовнішній settings технічно \"заморожений\"." },
    bestPractices: ["Використовуй Object.keys()/values()/entries() замість for...in для перебору власних властивостей обʼєкта.", "Комбінуй Object.entries() з деструктуризацією ([key, value]) для чіткого коду в циклах і масивних методах.", "Якщо потрібен справжній глибокий захист від мутації, заморожуй КОЖЕН вкладений обʼєкт окремо (рекурсивно) чи використовуй готову бібліотечну утиліту для глибокого freeze.", "Object.keys(obj).length — простий і читабельний спосіб підрахувати кількість властивостей обʼєкта."],
    remember: ["Object.keys(obj) → масив ключів; Object.values(obj) → масив значень; Object.entries(obj) → масив пар [ключ, значення] — усі в однаковому порядку.", "for...in перебирає УСПАДКОВАНІ властивості також; Object.keys()/entries() дають лише власні — зазвичай саме це й потрібно.", "Object.freeze(obj) захищає лише ПЕРШИЙ рівень обʼєкта — вкладені обʼєкти залишаються повністю мутабельними.", "У нестрогому режимі спроба мутації замороженого обʼєкта тихо ігнорується, без явної помилки."],
    interviewQuestions: [
      { question: "У чому різниця між Object.keys(), Object.values() і Object.entries()?", answer: "Object.keys(obj) повертає масив імен усіх власних перелічуваних властивостей. Object.values(obj) повертає масив ЗНАЧЕНЬ тих самих властивостей у тому самому порядку. Object.entries(obj) повертає масив пар [ключ, значення] — по суті, обʼєднання результатів keys і values у пари." },
      { question: "Чому Object.keys() зазвичай надійніший для перебору властивостей, ніж for...in?", answer: "У JavaScript кожен обʼєкт \"звʼязаний\" з іншим обʼєктом-\"батьком\" (прототипом), від якого може автоматично отримувати додаткові властивості й методи — цей ланцюжок звʼязків від обʼєкта до його прототипу, і далі до прототипу прототипу, і називають прототипним ланцюжком. for...in перебирає не лише ВЛАСНІ властивості обʼєкта, а й ці УСПАДКОВАНІ через прототипний ланцюжок — це може призвести до обробки властивостей, які програміст не очікував побачити. Object.keys() (та values/entries) повертають лише власні перелічувані властивості самого обʼєкта." },
      { question: "Object.freeze() робить обʼєкт повністю незмінним на всіх рівнях?", answer: "Ні, лише на ПЕРШОМУ рівні. Властивості самого замороженого обʼєкта не можна перезаписати чи видалити, але якщо значенням властивості є ІНШИЙ обʼєкт (вкладена структура), той вкладений обʼєкт залишається повністю мутабельним, якщо не заморозити його окремо." },
      { question: "Як зручно перебрати пари ключ-значення обʼєкта в циклі з деструктуризацією?", answer: "for (const [key, value] of Object.entries(obj)) { ... } — Object.entries() перетворює обʼєкт у масив пар [ключ, значення], а деструктуризація [key, value] прямо в заголовку циклу дає доступ і до ключа, і до значення на кожній ітерації без додаткового obj[key]." },
    ],
    summary: "Object.keys()/values()/entries() перетворюють властивості обʼєкта в масиви для перебору й трансформації масивними методами, повертаючи лише ВЛАСНІ властивості (на відміну від for...in). Object.freeze() захищає обʼєкт від мутації лише на ПЕРШОМУ рівні — вкладені обʼєкти залишаються повністю мутабельними, якщо їх не заморозити окремо.",
    proTip: "Якщо \"заморожений\" обʼєкт все одно якимось чином змінюється — перевір, чи це не мутація ВКЛАДЕНОГО обʼєкта, який Object.freeze() не торкнувся, оскільки заморожування не рекурсивне.",
    nextLessonNote: "Це завершує модуль \"Обʼєкти\" — далі DOM: як безпечно читати й оновлювати реальні елементи сторінки з JavaScript.",
    interactiveDemo: "object-methods-demo",
    practiceTask: {
      title: "Виправ підрахунок товарів у наявності через некоректну деструктуризацію",
      description: "Функція countInStock неправильно деструктуризує пари з Object.entries(), переплутавши порядок [ключ, значення], через що фільтрація за кількістю не працює. Виправ порядок.",
      checklist: ["countInStock повертає кількість товарів зі значенням більше 0.", "Деструктуризація пари використовує правильний порядок [key, qty], а не [qty, key].", "Функція коректно працює для будь-якого набору товарів."],
      starterFiles: [
        {
          id: "js-object-methods-start",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<p id="output"></p>

<script>
  function countInStock(inventory) {
    return Object.entries(inventory).filter(([qty, key]) => qty > 0).length; // БАГ: переплутано порядок
  }

  const inventory = { apples: 5, bananas: 0, oranges: 12 };
  document.querySelector("#output").textContent = "У наявності: " + countInStock(inventory);
  // зараз результат неправильний, бо qty і key переплутані
</script>
`,
        },
      ],
      solutionFiles: [
        {
          id: "js-object-methods-solution",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<p id="output"></p>

<script>
  function countInStock(inventory) {
    return Object.entries(inventory).filter(([key, qty]) => qty > 0).length;
  }

  const inventory = { apples: 5, bananas: 0, oranges: 12 };
  document.querySelector("#output").textContent = "У наявності: " + countInStock(inventory);
  // тепер "У наявності: 2"
</script>
`,
          readOnly: true,
        },
      ],
      hints: ["Object.entries() повертає пари у порядку [ключ, значення], а не [значення, ключ].", "Правильна деструктуризація: ([key, qty]) => qty > 0."],
      expectedOutput: "\"У наявності: 2\"",
    },
    microExercises: [
      { id: "js-object-methods-keys-predict", kind: "predict", prompt: "Що виведе цей код?", code: `const item = { name: "Ручка", price: 20 };\nconsole.log(Object.keys(item));\nconsole.log(Object.values(item));`, solution: "[\"name\", \"price\"], потім [\"Ручка\", 20] — Object.keys() дає масив імен властивостей, Object.values() дає масив їхніх значень у тому самому порядку." },
      { id: "js-object-methods-freeze-find-bug", kind: "find-the-bug", prompt: "У чому проблема цього коду?", code: `const config = Object.freeze({ limits: { max: 10 } });\nconfig.limits.max = 999;\nconsole.log(config.limits.max);`, solution: "Object.freeze(config) захищає лише ВЛАСТИВОСТІ config на верхньому рівні — сам вкладений обʼєкт limits НЕ заморожений і залишається повністю мутабельним. config.limits.max = 999 успішно змінює його, тому console.log виведе 999, а не 10, попри те що config технічно \"заморожений\"." },
      { id: "js-object-methods-entries-choice", kind: "choice", prompt: "Що повертає Object.entries({ a: 1, b: 2 })?", options: ["[\"a\", \"b\"]", "[1, 2]", "[[\"a\", 1], [\"b\", 2]]", "{ a: 1, b: 2 }"], correctAnswer: "[[\"a\", 1], [\"b\", 2]]", solution: "Object.entries() повертає масив пар [ключ, значення] для кожної власної властивості — тому результат [[\"a\", 1], [\"b\", 2]], а не окремо ключі чи окремо значення." },
      { id: "js-object-methods-forin-explain", kind: "explain", prompt: "Поясни, чому Object.keys(obj) зазвичай безпечніший для перебору властивостей, ніж for...in.", solution: "for...in перебирає ВСІ перелічувані властивості обʼєкта, включно з успадкованими через прототипний ланцюжок — якщо прототип обʼєкта (чи його клас) додав якісь властивості чи методи, вони теж потраплять у перебір, що часто небажано. Object.keys(obj) повертає лише ВЛАСНІ перелічувані властивості самого obj, ігноруючи все успадковане — це передбачуваніше в переважній більшості реальних задач." },
      { id: "js-object-methods-sum-rewrite", kind: "rewrite", prompt: "Перепиши функцію підрахунку суми значень обʼєкта, використовуючи Object.values() і reduce замість ручного циклу for...in.", code: `function sumValues(obj) {\n  let total = 0;\n  for (const key in obj) {\n    total += obj[key];\n  }\n  return total;\n}`, solution: `function sumValues(obj) {\n  return Object.values(obj).reduce((sum, value) => sum + value, 0);\n}\n// той самий результат, без ризику зачепити успадковані властивості через for...in` },
    ],
  },
};
