import type { LessonOverride } from "./htmlFoundations";

/**
 * Module "Основи мови" (js-language-basics). First JavaScript module —
 * variables, primitive types, and operators/expressions. Same cheat-sheet
 * lesson format as the HTML/CSS courses (whatIsIt/whyUseIt/whenToUse,
 * comparisonTable, codeWalkthroughs, practiceTask), just with a
 * `language: "javascript"` playground instead of html/css.
 */
export const jsLanguageBasicsOverrides: Record<string, LessonOverride> = {
  "Змінні з let і const": {
    whatIsIt: "let і const оголошують змінні з блочною областю видимості (block scope): вони існують лише всередині { } , де оголошені. const створює незмінне посилання на значення, let дозволяє перепризначення.",
    whyUseIt: "Стара var має function-scope замість block-scope і \"спливає\" за межі if/for — це джерело важких для пошуку багів. let/const прибирають цей клас помилок і одразу показують намір: \"це значення зміниться\" чи \"це значення сталe\".",
    whenToUse: ["const за замовчуванням — завжди, доки не з'явиться причина перепризначити.", "let — коли значення справді змінюється: лічильник циклу, акумулятор, стан, що оновлюється.", "const для масивів/об'єктів, вміст яких можна змінювати методами (push, властивості) — незмінне тут лише саме посилання."],
    whenNotToUse: ["Не використовуй var у новому коді — немає жодної причини, є тільки ризики.", "Не оголошуй let, якщо значення ніколи не перепризначається — це const.", "Не перевикористовуй одну змінну для двох різних значень в одній функції — заведи другу з іншим ім'ям."],
    comparisonTable: {
      headers: ["", "var", "let", "const"],
      rows: [
        ["Область видимості", "функція", "блок { }", "блок { }"],
        ["Перепризначення", "так", "так", "ні"],
        ["Повторне оголошення", "так (тихо)", "ні (помилка)", "ні (помилка)"],
        ["До оголошення", "undefined (hoisting)", "ReferenceError", "ReferenceError"],
      ],
    },
    codeWalkthroughs: [
      {
        before: "var \"витікає\" за межі if-блоку, let — ні:",
        code: `if (true) {
  var a = 1;
  let b = 2;
}

console.log(a); // 1 — var видно зовні блоку
console.log(b); // ReferenceError: b is not defined`,
        lineNotes: ["var a оголошена всередині if, але доступна й зовні — це і є \"витік\" за межі блоку.", "let b існує лише всередині { }, тому звернення зовні кидає помилку — саме так і має поводитись змінна циклу чи умови."],
        after: "Це найчастіше джерело багів зі старим var: змінна з циклу чи if випадково \"живе\" далі, ніж мала.",
      },
      {
        before: "const забороняє перепризначення посилання, але не \"заморожує\" вміст об'єкта чи масиву:",
        code: `const cart = ["Кава"];
cart.push("Круасан"); // OK — змінюємо вміст масиву
console.log(cart); // ["Кава", "Круасан"]

cart = ["Чай"]; // TypeError: Assignment to constant variable.`,
        lineNotes: ["cart.push() змінює вміст масиву, а не саме посилання cart — це дозволено.", "cart = [...] намагається присвоїти НОВЕ посилання змінній cart — це і заборонено const."],
        after: "const означає \"це посилання не зміниться\", а не \"це значення незмінне\" — для масивів/об'єктів різниця критична.",
      },
    ],
    commonMistakes: ["var замість let/const у новому коді.", "let там, де значення ніколи не перепризначається (мало б бути const).", "Очікування, що const заморожує вміст масиву/об'єкта.", "Оголошення змінної без ключового слова (case = випадковий global).", "Повторне оголошення let з тим самим іменем в одному блоці."],
    dontDoThis: { code: `var total = 0;\nfor (var i = 0; i < items.length; i++) {\n  var total = total + items[i].price;\n}`, explanation: "var i та var total у циклі можна випадково \"перевизначити\" деінде у функції без жодної помилки — з let одразу побачиш SyntaxError при спробі оголосити те саме ім'я двічі в одному блоці." },
    bestPractices: ["Пиши const скрізь, де можеш, і переходь на let лише коли компілятор/лінтер справді вимагає перепризначення.", "Ніколи не залишай var у новому коді — навіть у чернетці.", "Давай змінним конкретні назви (cartTotal, а не total), щоб не було спокуси перевикористати ім'я."],
    remember: ["let і const — блочна область видимості, var — функціональна.", "const — незмінне посилання, не незмінний вміст.", "За замовчуванням обирай const; let лише для того, що дійсно перепризначається.", "var не використовуй у новому коді ніколи."],
    interviewQuestions: [
      { question: "Чим let відрізняється від var?", answer: "let має блочну область видимості (існує лише всередині { }, де оголошена) і не дозволяє повторне оголошення в тому самому блоці; var має область видимості на рівні функції і \"спливає\" за межі блоків, у яких оголошена." },
      { question: "Чи можна змінити властивість об'єкта, оголошеного через const?", answer: "Так — const забороняє лише перепризначення самого посилання (const obj = {...}), але дозволяє змінювати властивості чи вміст масиву/об'єкта, на який це посилання вказує." },
    ],
    summary: "let і const мають блочну область видимості й не \"спливають\" за межі { }, на відміну від застарілої var. const створює незмінне посилання (перепризначити не можна, а вміст масиву/об'єкта — можна), let дозволяє перепризначення. За замовчуванням обирай const.",
    proTip: "Якщо лінтер (ESLint prefer-const) підказує замінити let на const — це варто робити майже завжди: менше змінних, які можуть непередбачувано змінитися, легше читати код через рік.",
    nextLessonNote: "Далі — примітивні типи: що саме можна покласти в змінну.",
    practiceTask: {
      title: "Порахуй суму кошика",
      description: "Напиши функцію, яка рахує загальну суму товарів у кошику, використовуючи const для того, що не змінюється, і let лише для акумулятора.",
      checklist: [
        "Масив товарів оголошений через const (сам масив не перепризначається).",
        "Акумулятор суми — let, бо перепризначається в циклі.",
        "Жодного var у коді.",
        "Функція повертає правильну суму цін усіх товарів.",
      ],
      starterFiles: [
        {
          id: "js-variables-start",
          path: "cart.js",
          language: "javascript",
          label: "cart.js",
          code: `const cart = [
  { name: "Кава", price: 65 },
  { name: "Круасан", price: 45 },
  { name: "Чай", price: 55 },
];

function getCartTotal(items) {
  // порахуй суму price усіх товарів
}

console.log(getCartTotal(cart)); // очікується 165
`,
        },
      ],
      solutionFiles: [
        {
          id: "js-variables-solution",
          path: "cart.js",
          language: "javascript",
          label: "cart.js",
          code: `const cart = [
  { name: "Кава", price: 65 },
  { name: "Круасан", price: 45 },
  { name: "Чай", price: 55 },
];

function getCartTotal(items) {
  let total = 0;
  for (const item of items) {
    total = total + item.price;
  }
  return total;
}

console.log(getCartTotal(cart)); // 165
`,
          readOnly: true,
        },
      ],
      hints: ["total має починатися з 0 і оголошуватись через let — воно перепризначається на кожній ітерації.", "items і кожен окремий item можна тримати через const усередині циклу for...of — вони самі не перепризначаються."],
      expectedOutput: "165",
    },
    microExercises: [
      { id: "js-var-let-predict", kind: "predict", prompt: "Що виведе цей код?", code: `if (true) {\n  let x = 5;\n}\nconsole.log(x);`, solution: "ReferenceError: x is not defined — let має блочну область видимості, x не існує зовні if." },
      { id: "js-const-choice", kind: "choice", prompt: "Яке ключове слово обрати для змінної-лічильника циклу, що збільшується на кожній ітерації?", options: ["var", "let", "const"], correctAnswer: "let", solution: "Лічильник перепризначається на кожній ітерації, тому потрібен let, а не const." },
    ],
  },

  "Примітивні типи": {
    whatIsIt: "JavaScript має 7 примітивних типів: string, number, boolean, undefined, null, symbol і bigint. Примітиви незмінні (immutable) і порівнюються за значенням, а не за посиланням, на відміну від об'єктів і масивів.",
    whyUseIt: "Розуміння примітивів пояснює поведінку, яка інакше виглядає як \"дивна\": чому typeof null дає \"object\", чому NaN !== NaN, чому дві однакові рядкові змінні рівні через ===, а два однакові масиви — ні.",
    whenToUse: ["string — будь-який текст, завжди в лапках чи бектіках.", "number — усі числа, і цілі, і дробові: окремого типу int/float немає.", "boolean — true/false, стан \"так/ні\".", "null — навмисна, свідома відсутність значення (\"я явно очистив це поле\").", "undefined — значення, яке ще не було встановлено (не присвоюй його вручну, воно з'являється саме)."],
    whenNotToUse: ["Не створюй обгортки new String()/new Number()/new Boolean() — це об'єкти, а не примітиви, і вони поводяться несподівано в порівняннях.", "Не покладайся на typeof для перевірки null — він завжди поверне \"object\".", "Не порівнюй числа з NaN через ===, він ніколи не дорівнює нічому, навіть собі."],
    comparisonTable: {
      headers: ["Тип", "typeof", "Приклад"],
      rows: [
        ["string", "\"string\"", "\"Кава\", `Ціна: ${price}`"],
        ["number", "\"number\"", "65, 3.14, NaN"],
        ["boolean", "\"boolean\"", "true, false"],
        ["undefined", "\"undefined\"", "let x; // x === undefined"],
        ["null", "\"object\" (історичний баг мови)", "let x = null;"],
        ["bigint", "\"bigint\"", "123456789012345678901234n"],
      ],
    },
    codeWalkthroughs: [
      {
        before: "typeof null повертає \"object\" — це відомий, задокументований баг у самій мові, який лишили заради зворотної сумісності:",
        code: `console.log(typeof null); // "object"
console.log(typeof undefined); // "undefined"
console.log(null === undefined); // false
console.log(null == undefined); // true`,
        lineNotes: ["typeof null === \"object\" — не помилка твого коду, а особливість мови ще з 1995 року.", "null === undefined дає false (різні типи), а null == undefined дає true (нестрога рівність ігнорує тип) — саме тому варто уникати ==."],
      },
      {
        before: "NaN (\"Not a Number\") — єдине значення в JavaScript, яке не дорівнює самому собі:",
        code: `console.log(NaN === NaN); // false
console.log(Number.isNaN(NaN)); // true

const result = Number("abc"); // NaN
if (Number.isNaN(result)) {
  console.log("Некоректне число");
}`,
        lineNotes: ["NaN === NaN завжди false — не можна перевірити \"чи це NaN\" через ===.", "Number.isNaN() — правильний, надійний спосіб перевірити саме NaN."],
        after: "Забутий Number.isNaN() і порівняння через === — типова причина тихих багів у формах з введенням чисел.",
      },
    ],
    commonMistakes: ["typeof value === \"object\" для перевірки null (завжди true для null, і для об'єктів теж).", "value === NaN замість Number.isNaN(value).", "new String(\"текст\") замість просто \"текст\".", "Плутанина null (свідомо порожньо) і undefined (ще не встановлено)."],
    dontDoThis: { code: `const price = new Number(65);\nif (price === 65) {\n  console.log("Ціна збігається");\n}`, explanation: "new Number(65) створює ОБ'ЄКТ-обгортку, а не примітив — price === 65 буде false, бо об'єкт ніколи не дорівнює примітиву через строге порівняння. Правильно: const price = 65." },
    bestPractices: ["Завжди пиши примітивні літерали (65, \"текст\", true), ніколи new Number()/new String()/new Boolean().", "Для перевірки на NaN використовуй лише Number.isNaN().", "Використовуй null, коли навмисно позначаєш \"значення відсутнє\" (наприклад, ще не вибраний товар), а undefined лишай мові — не присвоюй вручну."],
    remember: ["7 примітивів: string, number, boolean, undefined, null, symbol, bigint.", "Примітиви порівнюються за значенням, незмінні.", "typeof null === \"object\" — історичний баг, а не логіка.", "NaN !== NaN — перевіряй через Number.isNaN()."],
    interviewQuestions: [
      { question: "Чому typeof null дорівнює 'object'?", answer: "Це історична помилка в перших версіях JavaScript (1995 рік): null мав внутрішній тег типу, що збігався з тегом об'єктів. Виправити це зараз означало б зламати мільйони існуючих сайтів, тому баг лишили навмисно." },
      { question: "Чим null відрізняється від undefined?", answer: "undefined означає \"значення ще не встановлено\" — так виглядає неініціалізована змінна чи відсутній параметр функції. null — це свідоме, навмисне позначення \"тут немає значення\", яке встановлює сам розробник." },
    ],
    summary: "У JavaScript 7 примітивних типів: string, number, boolean, undefined, null, symbol, bigint. Вони порівнюються за значенням і незмінні. typeof null повертає \"object\" через історичний баг мови, а NaN ніколи не дорівнює самому собі — перевіряй через Number.isNaN().",
    proTip: "Якщо потрібно перевірити, чи значення \"порожнє\" (і null, і undefined одночасно), пиши value == null — це єдиний випадок, коли нестрога рівність вважається прийнятною практикою, бо порівнює саме ці два значення між собою і нічого більше.",
    nextLessonNote: "Далі — оператори та вирази: як комбінувати ці значення в логіку.",
    practiceTask: {
      title: "Перевір форму реєстрації",
      description: "Напиши функцію, яка перевіряє введений вік користувача: він має бути числом (не NaN) і не порожнім (не null/undefined).",
      checklist: [
        "Функція повертає false, якщо значення null або undefined.",
        "Функція повертає false, якщо Number(value) дає NaN.",
        "Функція повертає true лише для коректного числа.",
        "Перевірка NaN зроблена через Number.isNaN(), не через ===.",
      ],
      starterFiles: [
        {
          id: "js-primitives-start",
          path: "validateAge.js",
          language: "javascript",
          label: "validateAge.js",
          code: `function isValidAge(value) {
  // поверни false для null/undefined і для NaN, інакше true
}

console.log(isValidAge("25")); // true
console.log(isValidAge("abc")); // false
console.log(isValidAge(null)); // false
console.log(isValidAge(undefined)); // false
`,
        },
      ],
      solutionFiles: [
        {
          id: "js-primitives-solution",
          path: "validateAge.js",
          language: "javascript",
          label: "validateAge.js",
          code: `function isValidAge(value) {
  if (value === null || value === undefined) {
    return false;
  }
  const age = Number(value);
  return !Number.isNaN(age);
}

console.log(isValidAge("25")); // true
console.log(isValidAge("abc")); // false
console.log(isValidAge(null)); // false
console.log(isValidAge(undefined)); // false
`,
          readOnly: true,
        },
      ],
      hints: ["Спочатку відсічи null/undefined окремою перевіркою — вони не проходять через Number() передбачувано.", "Number(\"25\") дає 25, Number(\"abc\") дає NaN — саме тому потрібен Number.isNaN, а не порівняння з NaN."],
      expectedOutput: "true, false, false, false",
    },
    microExercises: [
      { id: "js-typeof-null-predict", kind: "predict", prompt: "Що виведе console.log(typeof null)?", code: `console.log(typeof null);`, solution: "\"object\" — відомий історичний баг самої мови JavaScript, а не помилка коду." },
      { id: "js-nan-find-bug", kind: "find-the-bug", prompt: "У чому проблема цієї перевірки?", code: `if (result === NaN) {\n  console.log("Некоректне число");\n}`, solution: "NaN ніколи не дорівнює нічому, навіть самому собі — result === NaN завжди false. Потрібно Number.isNaN(result)." },
    ],
  },

  "Оператори та вирази": {
    whatIsIt: "Оператори комбінують значення у вирази: арифметичні (+ - * / % **), порівняння (=== !== < > <= >=), логічні (&& || !), присвоєння (= += ??=), а також ?? (nullish coalescing) і ?. (optional chaining).",
    whyUseIt: "Вибір правильного оператора запобігає прихованим багам: == замість === пропускає невідповідність типів, || замість ?? випадково замінює 0 чи порожній рядок на значення за замовчуванням, а відсутній ?. кидає TypeError на вкладеному undefined.",
    whenToUse: ["=== / !== — завжди для порівняння, ніколи == / !=.", "?? — значення за замовчуванням лише коли оригінал null/undefined (кількість, що може легітимно бути 0).", "|| — значення за замовчуванням, коли 0/\"\"/false теж мають вважатись \"порожніми\".", "?. — доступ до вкладеної властивості, яка може не існувати (user?.address?.city)."],
    whenNotToUse: ["Не використовуй == чи != — нестрога рівність робить неявні перетворення типів, які важко передбачити.", "Не використовуй || для значень за замовчуванням, якщо 0 чи \"\" — легітимні дані (кількість товару, порожній коментар).", "Не будуй довгі ланцюжки вкладених тернарних операторів — вони важко читаються, використай if/else чи ранній вихід."],
    comparisonTable: {
      headers: ["Оператор", "Призначення", "Приклад"],
      rows: [
        ["===", "строга рівність (без перетворення типів)", "5 === \"5\" // false"],
        ["==", "нестрога рівність (з перетворенням, уникай)", "5 == \"5\" // true"],
        ["??", "значення за замовчуванням лише для null/undefined", "count ?? 0"],
        ["||", "значення за замовчуванням для будь-якого falsy", "name || \"Гість\""],
        ["?.", "безпечний доступ до можливо відсутньої властивості", "user?.address?.city"],
        ["&&", "виконати праву частину лише якщо ліва truthy", "isLoggedIn && renderProfile()"],
      ],
    },
    codeWalkthroughs: [
      {
        before: "|| замінює будь-яке falsy-значення (включно з 0), ?? — лише null/undefined:",
        code: `const quantity = 0;

const withOr = quantity || 1;
console.log(withOr); // 1 — 0 вважається "порожнім", це БАГ

const withNullish = quantity ?? 1;
console.log(withNullish); // 0 — правильно, 0 це коректна кількість`,
        lineNotes: ["quantity || 1 замінює 0 на 1, хоча 0 — цілком легітимна кількість товару (наприклад, \"немає в кошику\").", "quantity ?? 1 замінює значення лише якщо воно справді null або undefined, тому 0 лишається 0."],
        after: "Це одна з найпоширеніших прихованих помилок при переході з || на значення за замовчуванням — ?? з'явився в мові саме для цього випадку.",
      },
      {
        before: "?. запобігає TypeError при зверненні до властивості неіснуючого об'єкта:",
        code: `const user = { name: "Ірина" };

console.log(user.address.city); // TypeError: Cannot read properties of undefined
console.log(user.address?.city); // undefined, без помилки`,
        lineNotes: ["user.address — undefined, бо такої властивості немає; звернення .city до undefined кидає помилку.", "user.address?.city перевіряє address на null/undefined ПЕРЕД спробою прочитати .city і повертає undefined замість помилки."],
        after: "?. рятує від найчастішої причини \"білого екрана\" в застосунках — звернення до властивості даних, які ще не завантажились.",
      },
    ],
    commonMistakes: ["== / != замість === / !==.", "|| для значень за замовчуванням там, де 0 чи \"\" — валідні дані.", "Відсутній ?. при зверненні до вкладених, можливо відсутніх даних (API-відповіді).", "Довгі ланцюжки вкладених тернарних операторів замість if/else."],
    dontDoThis: { code: `function getDiscount(user) {\n  return user.discount || 0;\n}\n\ngetDiscount({ discount: 0 }); // 0 замінюється на... 0, ОК тут,\n// але getDiscount({ comment: "" }).comment || "немає" замінить легітимний порожній рядок`, explanation: "|| замінює БУДЬ-ЯКЕ falsy-значення (0, \"\", false, null, undefined) на запасний варіант — якщо 0 чи \"\" можуть бути справжніми даними, потрібен ?? замість ||." },
    bestPractices: ["Порівнюй завжди через === / !==, без винятків.", "Обирай ?? за замовчуванням для запасних значень; || лише коли усвідомлено потрібно замінити й 0/\"\"/false теж.", "Став ?. на кожному кроці доступу до даних, які могли ще не завантажитись з мережі."],
    remember: ["=== / !== завжди, == / != ніколи.", "?? — лише null/undefined; || — будь-яке falsy.", "?. — безпечний доступ до можливо відсутньої властивості.", "&& — умовне виконання правої частини."],
    interviewQuestions: [
      { question: "Чим ?? відрізняється від ||?", answer: "?? (nullish coalescing) замінює значення на запасне лише якщо воно null або undefined. || замінює будь-яке falsy-значення, включно з 0, порожнім рядком і false — це різниця, критична для полів на кшталт кількості чи ціни, де 0 є валідним значенням." },
      { question: "Навіщо потрібен оператор ?. (optional chaining)?", answer: "Він дозволяє безпечно звертатись до вкладеної властивості об'єкта, який може бути null/undefined, повертаючи undefined замість того, щоб кинути TypeError — особливо корисно для даних, що прийшли з мережевого запиту й можуть бути не повністю завантажені." },
    ],
    summary: "=== / !== порівнюють без неявного перетворення типів і завжди кращі за == / !=. ?? підставляє запасне значення лише для null/undefined, тоді як || робить це для будь-якого falsy — вибір залежить від того, чи 0/\"\" є валідними даними. ?. безпечно читає вкладені властивості, що можуть бути відсутні.",
    proTip: "Увімкни ESLint-правило eqeqeq (забороняє == / !=) і no-unsafe-optional-chaining — більшість команд роблять це стандартом лінтера з першого дня проєкту.",
    nextLessonNote: "Далі — перетворення типів: що відбувається \"під капотом\", коли типи змішуються.",
    practiceTask: {
      title: "Виправ логіку кошика",
      description: "Функція показує запасну назву товару і кількість, але має прихований баг з || — виправ його на ??, зберігши бажану поведінку тільки там, де це справді потрібно.",
      checklist: [
        "Кількість 0 залишається 0 (не замінюється на запасне значення).",
        "Відсутня назва (null/undefined) замінюється на \"Товар без назви\".",
        "Використано ?? там, де 0 має лишитись 0.",
        "Порівняння через === / !==, без == / !=.",
      ],
      starterFiles: [
        {
          id: "js-operators-start",
          path: "cartItem.js",
          language: "javascript",
          label: "cartItem.js",
          code: `function describeItem(item) {
  const name = item.name || "Товар без назви";
  const quantity = item.quantity || 1;
  return \`\${name}: \${quantity} шт.\`;
}

console.log(describeItem({ name: "Кава", quantity: 0 }));
// зараз виводить "Кава: 1 шт." — має бути "Кава: 0 шт."
`,
        },
      ],
      solutionFiles: [
        {
          id: "js-operators-solution",
          path: "cartItem.js",
          language: "javascript",
          label: "cartItem.js",
          code: `function describeItem(item) {
  const name = item.name || "Товар без назви";
  const quantity = item.quantity ?? 1;
  return \`\${name}: \${quantity} шт.\`;
}

console.log(describeItem({ name: "Кава", quantity: 0 }));
// "Кава: 0 шт."
`,
          readOnly: true,
        },
      ],
      hints: ["name варто лишити на ||, бо порожній рядок як назва товару справді небажаний.", "quantity потребує ?? — 0 тут легітимна кількість, яку не можна плутати з відсутністю значення."],
      expectedOutput: "Кава: 0 шт.",
    },
    microExercises: [
      { id: "js-nullish-vs-or-predict", kind: "predict", prompt: "Що виведе цей код?", code: `const stock = 0;\nconsole.log(stock || 10);\nconsole.log(stock ?? 10);`, solution: "10, потім 0 — || замінює будь-яке falsy (0 включно), ?? замінює лише null/undefined." },
      { id: "js-optional-chaining-choice", kind: "choice", prompt: "Який оператор безпечно прочитає user.profile.avatar, якщо profile може бути відсутнім?", options: ["user.profile.avatar", "user?.profile?.avatar", "user && profile.avatar", "user == profile.avatar"], correctAnswer: "user?.profile?.avatar", solution: "?. перевіряє кожен рівень на null/undefined перед тим, як читати далі, і безпечно повертає undefined замість помилки." },
    ],
  },
};
