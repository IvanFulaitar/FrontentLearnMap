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
    whatIsIt: "Змінна — місце, де JavaScript зберігає значення (ім'я користувача, кількість товарів у кошику, чи відкрите меню). let і const оголошують змінні з блочною областю видимості (block scope): вони існують лише всередині { } , де оголошені. const створює незмінне посилання на значення, let дозволяє перепризначення.",
    whyUseIt: "Frontend — це не лише розмітка, а й поведінка: клік по кнопці міняє кількість у кошику, клік по бургеру відкриває меню, ввід у полі показує помилку. Усі ці зміни інтерфейс тримає саме у змінних. Стара var має function-scope замість block-scope і \"спливає\" за межі if/for — джерело важких для пошуку багів. let/const прибирають цей клас помилок і одразу показують намір: \"це значення зміниться\" (let) чи \"це значення сталe\" (const) — а разом вони описують, що саме в інтерфейсі є станом, а що — незмінним посиланням на DOM-елемент.",
    whenToUse: ["const за замовчуванням — завжди, доки не з'явиться причина перепризначити.", "const для DOM-елементів, знайдених через querySelector — кнопка чи блок на сторінці не змінюється, навіть якщо змінюється те, що всередині нього.", "let — коли значення справді змінюється: лічильник кошика, стан \"відкрито/закрито\", активний таб, акумулятор у циклі.", "const для масивів/об'єктів, вміст яких можна змінювати методами (push, властивості) — незмінне тут лише саме посилання."],
    whenNotToUse: ["Не використовуй var у новому коді — немає жодної причини, є тільки ризики.", "Не оголошуй let, якщо значення ніколи не перепризначається — це const.", "Не думай, що const \"заморожує\" масив чи об'єкт — вона забороняє лише перепризначення самого посилання.", "Не оголошуй змінну без ключового слова (value = 5 без let/const створює випадкову глобальну змінну).", "Не перевикористовуй одну змінну для різних сенсів (let value спочатку число, потім рядок) — заведи окремі змінні з описовими іменами.", "Не називай змінні однією літерою без причини (x, y, z) — cartCount читається набагато швидше, ніж c."],
    comparisonTable: {
      headers: ["", "var", "let", "const"],
      rows: [
        ["Область видимості", "функція", "блок { }", "блок { }"],
        ["Перепризначення", "так", "так", "ні"],
        ["Повторне оголошення", "так (тихо)", "ні (помилка)", "ні (помилка)"],
        ["До оголошення", "undefined (hoisting)", "ReferenceError", "ReferenceError"],
        ["Типове використання", "старий код", "стан, що змінюється", "DOM-елементи, дані"],
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
      {
        before: "Реальний лічильник кошика: DOM-елементи — const (знайдені один раз), кількість — let (змінюється після кожного кліку):",
        code: `const countElement = document.querySelector("#cart-count");
const addButton = document.querySelector("#add-button");
let cartCount = 0;

addButton.addEventListener("click", () => {
  cartCount = cartCount + 1;
  countElement.textContent = cartCount;
});`,
        lineNotes: ["countElement і addButton — const: ми знайшли ці елементи один раз і більше не перепризначаємо змінні на інші елементи.", "cartCount — let: після кожного кліку значення перепризначається (cartCount = cartCount + 1)."],
        after: "Якби cartCount був const, другий клік кинув би TypeError — саме тому вибір між let/const тут не \"стиль\", а питання працездатності кнопки.",
      },
      {
        before: "Перемикач меню — той самий патерн let/const, плюс aria-expanded для доступності:",
        code: `const menuButton = document.querySelector("#menu-button");
const menu = document.querySelector("#menu");
let isMenuOpen = false;

menuButton.addEventListener("click", () => {
  isMenuOpen = !isMenuOpen;
  menu.hidden = !isMenuOpen;
  menuButton.setAttribute("aria-expanded", String(isMenuOpen));
});`,
        lineNotes: ["isMenuOpen — let: перемикається між true/false на кожному кліку (! означає \"навпаки\").", "aria-expanded повідомляє скрінрідеру поточний стан меню — те саме isMenuOpen, яке керує видимістю, керує й доступністю."],
      },
    ],
    commonMistakes: ["var замість let/const у новому коді.", "let там, де значення ніколи не перепризначається (мало б бути const).", "Очікування, що const заморожує вміст масиву/об'єкта.", "Оголошення змінної без ключового слова (case = випадковий global).", "Повторне оголошення let з тим самим іменем в одному блоці.", "Перевикористання однієї змінної для різних, не пов'язаних значень.", "Однолітерні імена змінних там, де опис (cartCount) читається набагато швидше."],
    dontDoThis: { code: `const clickCount = 0;\nbutton.addEventListener("click", () => {\n  clickCount = clickCount + 1; // TypeError: Assignment to constant variable.\n});`, explanation: "clickCount оголошено через const, але кожен клік намагається його перепризначити — це кидає помилку одразу після першого кліку. Лічильник, що змінюється, завжди потребує let." },
    bestPractices: ["Пиши const скрізь, де можеш, і переходь на let лише коли справді потрібне перепризначення.", "Ніколи не залишай var у новому коді — навіть у чернетці.", "Давай змінним конкретні назви (cartCount, а не count чи c), щоб не було спокуси перевикористати ім'я для іншого сенсу.", "DOM-елементи, знайдені через querySelector, тримай у const; стан, що змінюється (лічильники, прапорці відкрито/закрито, активний таб) — у let.", "Якщо лінтер (ESLint prefer-const) підказує замінити let на const — зроби це: менше змінних, які можуть непередбачувано змінитися."],
    remember: ["let і const — блочна область видимості, var — функціональна.", "const — незмінне посилання, не незмінний вміст.", "За замовчуванням обирай const; let лише для того, що дійсно перепризначається.", "var не використовуй у новому коді ніколи.", "DOM-елемент на сторінці — const; лічильник, прапорець чи активний таб, що змінюється, — let."],
    interviewQuestions: [
      { question: "Чим let відрізняється від var?", answer: "let має блочну область видимості (існує лише всередині { }, де оголошена) і не дозволяє повторне оголошення в тому самому блоці; var має область видимості на рівні функції і \"спливає\" за межі блоків, у яких оголошена." },
      { question: "Чи можна змінити властивість об'єкта, оголошеного через const?", answer: "Так — const забороняє лише перепризначення самого посилання (const obj = {...}), але дозволяє змінювати властивості чи вміст масиву/об'єкта, на який це посилання вказує." },
      { question: "Що краще використовувати за замовчуванням: let чи const?", answer: "const. Якщо згодом стане зрозуміло, що значення треба перепризначати, замінити на let — це простіше, ніж навпаки шукати місця, де const випадково забороняє потрібне перепризначення." },
      { question: "Чому DOM-елементи зазвичай зберігають у const, навіть у застосунку з великою кількістю інтерактивності?", answer: "Тому що сам DOM-елемент (кнопка, поле, контейнер), знайдений через querySelector, не змінюється — змінюється лише те, що показано всередині нього чи його атрибути. Змінна-посилання на елемент залишається тим самим протягом усього часу роботи з ним." },
      { question: "Що станеться, якщо оголосити змінну без let, const чи var?", answer: "JavaScript у неCуворому режимі (без \"use strict\") створить її як глобальну змінну, доступну практично всюди в застосунку — це небезпечно у великих проєктах, бо таку змінну може випадково змінити код в іншому місці." },
    ],
    summary: "let і const мають блочну область видимості й не \"спливають\" за межі { }, на відміну від застарілої var. const створює незмінне посилання (перепризначити не можна, а вміст масиву/об'єкта — можна), let дозволяє перепризначення. У реальному інтерфейсі DOM-елементи, знайдені один раз, тримають у const, а стан, що змінюється після кліку чи вводу (лічильник, прапорець відкрито/закрито, активний таб), — у let.",
    proTip: "Якщо лінтер (ESLint prefer-const) підказує замінити let на const — це варто робити майже завжди: менше змінних, які можуть непередбачувано змінитися, легше читати код через рік. На код-рев'ю колеги теж звертають увагу саме на це: let там, де очевидно нічого не перепризначається, — перший сигнал перечитати логіку уважніше.",
    nextLessonNote: "Далі — примітивні типи: що саме можна покласти в змінну.",
    interactiveDemo: "variable-state-demo",
    practiceTask: {
      title: "Знайди і виправ баг лічильника кліків",
      description: "У коді нижче лічильник кліків оголошений через const, хоча має збільшуватись після кожного натискання кнопки. Запусти код, подивись помилку в консолі й виправ оголошення.",
      checklist: [
        "Знайдено, яка змінна оголошена неправильно (const замість let).",
        "clickCount перепризначається на кожному кліку без помилки.",
        "countElement і clickButton лишились через const (вони не перепризначаються).",
        "Після виправлення кнопка коректно рахує кліки в textContent.",
      ],
      starterFiles: [
        {
          id: "js-variables-start",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<p>Кліків: <strong id="click-count">0</strong></p>
<button id="click-button" type="button">Натисни мене</button>

<script>
  const countElement = document.querySelector("#click-count");
  const clickButton = document.querySelector("#click-button");
  const clickCount = 0; // тут баг

  clickButton.addEventListener("click", () => {
    clickCount = clickCount + 1;
    countElement.textContent = clickCount;
  });
</script>
`,
        },
      ],
      solutionFiles: [
        {
          id: "js-variables-solution",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<p>Кліків: <strong id="click-count">0</strong></p>
<button id="click-button" type="button">Натисни мене</button>

<script>
  const countElement = document.querySelector("#click-count");
  const clickButton = document.querySelector("#click-button");
  let clickCount = 0;

  clickButton.addEventListener("click", () => {
    clickCount = clickCount + 1;
    countElement.textContent = clickCount;
  });
</script>
`,
          readOnly: true,
        },
      ],
      hints: ["Відкрий консоль браузера — після першого кліку там буде TypeError: Assignment to constant variable.", "clickCount перепризначається на кожному кліку, тому це let; countElement і clickButton не перепризначаються — вони лишаються const."],
      expectedOutput: "Після кожного кліку число в #click-count збільшується на 1, без помилок у консолі.",
    },
    microExercises: [
      { id: "js-var-let-predict", kind: "predict", prompt: "Що виведе цей код?", code: `if (true) {\n  let x = 5;\n}\nconsole.log(x);`, solution: "ReferenceError: x is not defined — let має блочну область видимості, x не існує зовні if." },
      { id: "js-const-choice", kind: "choice", prompt: "Яке ключове слово обрати для змінної-лічильника циклу, що збільшується на кожній ітерації?", options: ["var", "let", "const"], correctAnswer: "let", solution: "Лічильник перепризначається на кожній ітерації, тому потрібен let, а не const." },
      { id: "js-const-array-predict", kind: "predict", prompt: "Що виведе цей код?", code: `const cart = ["Кава"];\ncart.push("Чай");\nconsole.log(cart);`, solution: "[\"Кава\", \"Чай\"] — push() змінює вміст масиву, а не саме посилання cart, тому const це дозволяє." },
      { id: "js-dom-const-explain", kind: "explain", prompt: "Поясни, чому DOM-елемент, знайдений через querySelector, зазвичай зберігають у const, навіть якщо інтерфейс дуже інтерактивний.", solution: "Сам DOM-елемент (кнопка, блок, поле) не змінюється — змінна завжди посилається на той самий елемент. Змінюється лише вміст усередині нього (textContent, класи, атрибути), а не сам факт, який елемент це є." },
      { id: "js-global-leak-find-bug", kind: "find-the-bug", prompt: "У чому проблема цього коду?", code: `function addToCart() {\n  cartTotal = cartTotal + 65;\n}`, solution: "cartTotal оголошена без let/const/var — це створює випадкову глобальну змінну, яку може непередбачувано змінити код в іншому місці застосунку. Потрібно let cartTotal (оголошене заздалегідь) або const/let усередині функції." },
    ],
  },

  "Примітивні типи": {
    whatIsIt: "JavaScript має 7 примітивних типів: string, number, boolean, undefined, null, symbol і bigint. Примітиви незмінні (immutable) і порівнюються за значенням, а не за посиланням, на відміну від об'єктів і масивів.",
    whyUseIt: "Кожне поле форми, кожен прапорець стану інтерфейсу (завантажується/готово, відкрито/закрито) і кожна ціна чи кількість — це примітив. Розуміння того, як вони порівнюються і перетворюються, пояснює поведінку, яка інакше виглядає \"дивною\": чому typeof null дає \"object\", чому NaN !== NaN, чому валідація віку може тихо пропустити некоректне значення, якщо перевірка написана недбало.",
    whenToUse: ["string — будь-який текст: ім'я користувача, значення поля вводу, назва товару.", "number — усі числа: ціна, кількість, індекс активного таба, відсоток завантаження.", "boolean — стан \"так/ні\": isMenuOpen, isLoading, isFormValid.", "null — навмисна, свідома відсутність значення (\"товар ще не обраний\", \"користувач ще не авторизований\").", "undefined — значення, яке ще не було встановлено (не присвоюй його вручну, воно з'являється само — неініціалізована змінна, відсутній параметр, відсутня властивість об'єкта)."],
    whenNotToUse: ["Не створюй обгортки new String()/new Number()/new Boolean() — це об'єкти, а не примітиви, і вони поводяться несподівано в порівняннях і навіть в if.", "Не покладайся на typeof для перевірки null — він завжди поверне \"object\".", "Не порівнюй числа з NaN через ===, він ніколи не дорівнює нічому, навіть собі.", "Не плутай null (свідомо очищене поле) з undefined (поле, яке ще ніхто не торкався) — різна семантика для форм і API."],
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
      {
        before: "new Boolean(false) — об'єкт, і об'єкт завжди truthy, навіть коли всередині false:",
        code: `if (new Boolean(false)) {
  console.log("Виконається — і це пастка");
}

if (false) {
  console.log("Не виконається — очікувана поведінка");
}`,
        lineNotes: ["new Boolean(false) створює об'єкт-обгортку — об'єкти завжди truthy в умові if, незалежно від значення всередині.", "Звичайний примітив false поводиться передбачувано."],
        after: "Це ще одна причина ніколи не створювати обгортки new Boolean()/new Number()/new String() — вони ламають найпростіші перевірки truthy.",
      },
    ],
    commonMistakes: ["typeof value === \"object\" для перевірки null (завжди true для null, і для об'єктів теж).", "value === NaN замість Number.isNaN(value).", "new String(\"текст\") замість просто \"текст\".", "new Boolean(false) в умові if — об'єкт завжди truthy, навіть з false усередині.", "Плутанина null (свідомо порожньо) і undefined (ще не встановлено)."],
    dontDoThis: { code: `const price = new Number(65);\nif (price === 65) {\n  console.log("Ціна збігається");\n}`, explanation: "new Number(65) створює ОБ'ЄКТ-обгортку, а не примітив — price === 65 буде false, бо об'єкт ніколи не дорівнює примітиву через строге порівняння. Правильно: const price = 65." },
    bestPractices: ["Завжди пиши примітивні літерали (65, \"текст\", true), ніколи new Number()/new String()/new Boolean().", "Для перевірки на NaN використовуй лише Number.isNaN().", "Використовуй null, коли навмисно позначаєш \"значення відсутнє\" (наприклад, ще не вибраний товар), а undefined лишай мові — не присвоюй вручну.", "У валідації форм перевіряй порожнє поле і некоректний формат окремими, явними умовами — не покладайся на неявне приведення типів."],
    remember: ["7 примітивів: string, number, boolean, undefined, null, symbol, bigint.", "Примітиви порівнюються за значенням, незмінні.", "typeof null === \"object\" — історичний баг, а не логіка.", "NaN !== NaN — перевіряй через Number.isNaN().", "new Boolean(false) — truthy об'єкт, а не falsy примітив."],
    interviewQuestions: [
      { question: "Чому typeof null дорівнює 'object'?", answer: "Це історична помилка в перших версіях JavaScript (1995 рік): null мав внутрішній тег типу, що збігався з тегом об'єктів. Виправити це зараз означало б зламати мільйони існуючих сайтів, тому баг лишили навмисно." },
      { question: "Чим null відрізняється від undefined?", answer: "undefined означає \"значення ще не встановлено\" — так виглядає неініціалізована змінна чи відсутній параметр функції. null — це свідоме, навмисне позначення \"тут немає значення\", яке встановлює сам розробник." },
      { question: "Чому new Boolean(false) в умові if виконується, хоча всередині лежить false?", answer: "new Boolean(false) створює об'єкт-обгортку, а не примітив boolean. Будь-який об'єкт у JavaScript truthy в логічному контексті, незалежно від того, яке значення він \"обгортає\" — тому потрібно завжди використовувати примітивний літерал false, а не new Boolean()." },
      { question: "Як правильно перевірити, чи є значення NaN?", answer: "Через Number.isNaN(value) — це єдиний надійний спосіб, оскільки NaN === NaN завжди повертає false. Порівняння value === NaN ніколи не спрацює, навіть якщо value справді NaN." },
    ],
    summary: "У JavaScript 7 примітивних типів: string, number, boolean, undefined, null, symbol, bigint. Вони порівнюються за значенням і незмінні. typeof null повертає \"object\" через історичний баг мови, NaN ніколи не дорівнює самому собі (перевіряй через Number.isNaN()), а обгортки new Boolean()/new Number()/new String() створюють об'єкти, які поводяться несподівано навіть у найпростіших перевірках truthy.",
    proTip: "Якщо потрібно перевірити, чи значення \"порожнє\" (і null, і undefined одночасно), пиши value == null — це єдиний випадок, коли нестрога рівність вважається прийнятною практикою, бо порівнює саме ці два значення між собою і нічого більше.",
    nextLessonNote: "Далі — оператори та вирази: як комбінувати ці значення в логіку.",
    practiceTask: {
      title: "Перевір вік у формі реєстрації",
      description: "Форма показує повідомлення про помилку, якщо вік некоректний. Допиши функцію перевірки: вік має бути числом (не NaN) і не порожнім (не null/undefined) — і підключи її до реального поля вводу.",
      checklist: [
        "Функція повертає false, якщо значення null, undefined чи порожній рядок.",
        "Функція повертає false, якщо Number(value) дає NaN.",
        "Функція повертає true лише для коректного числа.",
        "Перевірка NaN зроблена через Number.isNaN(), не через ===.",
        "Клік по кнопці показує правильне повідомлення для введеного значення.",
      ],
      starterFiles: [
        {
          id: "js-primitives-start",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<label for="age">Вік</label>
<input id="age" type="text" />
<button id="check" type="button">Перевірити</button>
<p id="result"></p>

<script>
  function isValidAge(value) {
    // поверни false для null/undefined/"" і для NaN, інакше true
  }

  const input = document.querySelector("#age");
  const result = document.querySelector("#result");

  document.querySelector("#check").addEventListener("click", () => {
    result.textContent = isValidAge(input.value) ? "Вік коректний" : "Введи коректний вік";
  });
</script>
`,
        },
      ],
      solutionFiles: [
        {
          id: "js-primitives-solution",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<label for="age">Вік</label>
<input id="age" type="text" />
<button id="check" type="button">Перевірити</button>
<p id="result"></p>

<script>
  function isValidAge(value) {
    if (value === null || value === undefined || value === "") {
      return false;
    }
    const age = Number(value);
    return !Number.isNaN(age);
  }

  const input = document.querySelector("#age");
  const result = document.querySelector("#result");

  document.querySelector("#check").addEventListener("click", () => {
    result.textContent = isValidAge(input.value) ? "Вік коректний" : "Введи коректний вік";
  });
</script>
`,
          readOnly: true,
        },
      ],
      hints: ["input.value завжди рядок, навіть якщо поле порожнє — тому порожній рядок теж треба відсіяти окремо.", "Number(\"25\") дає 25, Number(\"abc\") дає NaN — саме тому потрібен Number.isNaN, а не порівняння з NaN."],
      expectedOutput: "\"Вік коректний\" для 25, \"Введи коректний вік\" для порожнього поля чи тексту.",
    },
    microExercises: [
      { id: "js-typeof-null-predict", kind: "predict", prompt: "Що виведе console.log(typeof null)?", code: `console.log(typeof null);`, solution: "\"object\" — відомий історичний баг самої мови JavaScript, а не помилка коду." },
      { id: "js-nan-find-bug", kind: "find-the-bug", prompt: "У чому проблема цієї перевірки?", code: `if (result === NaN) {\n  console.log("Некоректне число");\n}`, solution: "NaN ніколи не дорівнює нічому, навіть самому собі — result === NaN завжди false. Потрібно Number.isNaN(result)." },
      { id: "js-new-boolean-predict", kind: "predict", prompt: "Що виведе цей код?", code: `if (new Boolean(false)) {\n  console.log("truthy");\n} else {\n  console.log("falsy");\n}`, solution: "\"truthy\" — new Boolean(false) створює об'єкт, а будь-який об'єкт truthy в if, незалежно від значення всередині." },
      { id: "js-null-undefined-choice", kind: "choice", prompt: "Користувач ще не обрав жоден товар з випадаючого списку — яке значення найкраще позначає це навмисно?", options: ["undefined", "null", "0", "\"\""], correctAnswer: "null", solution: "null — свідоме, навмисне позначення \"значення відсутнє\", яке встановлює сам розробник, на відміну від undefined, що з'являється саме." },
      { id: "js-primitive-compare-explain", kind: "explain", prompt: "Поясни, чому дві однакові рядкові змінні рівні через ===, а два масиви з однаковим вмістом — ні.", solution: "Примітиви (string, number, boolean тощо) порівнюються за значенням — два однакові рядки завжди рівні. Масиви й об'єкти порівнюються за посиланням: навіть з однаковим вмістом це різні об'єкти в пам'яті, тому === повертає false, якщо це не той самий масив." },
    ],
  },

  "Оператори та вирази": {
    whatIsIt: "Оператори комбінують значення у вирази: арифметичні (+ - * / % **), порівняння (=== !== < > <= >=), логічні (&& || !), присвоєння (= += ??=), а також ?? (nullish coalescing) і ?. (optional chaining).",
    whyUseIt: "Кожен лічильник товарів у кошику, кожен бейдж \"нових повідомлень\", кожне запасне ім'я користувача в інтерфейсі будується операторами. Вибір правильного оператора запобігає прихованим багам: == замість === пропускає невідповідність типів, || замість ?? випадково замінює 0 чи порожній рядок на значення за замовчуванням (найчастіша причина \"зникаючого нуля\" в лічильниках), а відсутній ?. кидає TypeError на вкладеному undefined і ламає весь рендер сторінки.",
    whenToUse: ["=== / !== — завжди для порівняння, ніколи == / !=.", "?? — значення за замовчуванням лише коли оригінал null/undefined (кількість, що може легітимно бути 0).", "|| — значення за замовчуванням, коли 0/\"\"/false теж мають вважатись \"порожніми\".", "?. — доступ до вкладеної властивості, яка може не існувати (user?.address?.city, дані з мережевого запиту)."],
    whenNotToUse: ["Не використовуй == чи != — нестрога рівність робить неявні перетворення типів, які важко передбачити.", "Не використовуй || для значень за замовчуванням, якщо 0 чи \"\" — легітимні дані (кількість товару, порожній коментар).", "Не будуй довгі ланцюжки вкладених тернарних операторів — вони важко читаються, використай if/else чи ранній вихід.", "Не забувай ?. на кожному кроці ланцюжка властивостей, якщо будь-яка з них може прийти null/undefined з API — одна пропущена крапка ламає весь рендер."],
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
      {
        before: "Реальний бейдж кількості товарів у кошику: без ?? нуль товарів помилково показує запасне значення:",
        code: `function renderCartBadge(cartCount) {
  const displayCount = cartCount ?? 0;
  return displayCount === 0 ? "Кошик порожній" : \`Товарів: \${displayCount}\`;
}

console.log(renderCartBadge(0)); // "Кошик порожній" — правильно
console.log(renderCartBadge(undefined)); // "Кошик порожній" — теж правильно, бо ?? спрацював`,
        lineNotes: ["cartCount ?? 0 підставляє 0 лише якщо cartCount справді null/undefined — сам 0 лишається 0.", "Якби тут стояв ||, поведінка для cartCount = 0 і cartCount = undefined була б однаковою (обидва дали б 0) — тут це навіть не помітно як баг, але в лічильнику, який просто виводиться напряму, || зіпсував би 0."],
      },
      {
        before: "Реальне читання даних з мережевого запиту: аватар користувача, вкладений на кілька рівнів:",
        code: `const response = { user: { name: "Ірина" } };

const avatarUrl = response.user?.profile?.avatarUrl ?? "/default-avatar.png";
console.log(avatarUrl); // "/default-avatar.png" — profile відсутній, але помилки немає`,
        lineNotes: ["response.user існує, але response.user.profile — немає; без ?. звернення .avatarUrl кинуло б TypeError.", "?? одразу після ланцюжка ?. дає зручний, безпечний запасний варіант для UI, замість того, щоб показувати undefined чи ламати рендер."],
        after: "Це типовий патерн для будь-яких даних, що прийшли з API: ?. на кожному кроці, ?? в кінці для запасного значення.",
      },
    ],
    commonMistakes: ["== / != замість === / !==.", "|| для значень за замовчуванням там, де 0 чи \"\" — валідні дані.", "Відсутній ?. при зверненні до вкладених, можливо відсутніх даних (API-відповіді).", "Довгі ланцюжки вкладених тернарних операторів замість if/else.", "?. використаний там, де відсутність значення насправді помилка програми, яку варто побачити одразу, а не тихо замаскувати undefined.", "Забутий ?? після ?. — ланцюжок стає безпечним від помилок, але UI все одно показує голий undefined."],
    dontDoThis: { code: `function getDiscount(user) {\n  return user.discount || 0;\n}\n\ngetDiscount({ discount: 0 }); // 0 замінюється на... 0, ОК тут,\n// але getDiscount({ comment: "" }).comment || "немає" замінить легітимний порожній рядок`, explanation: "|| замінює БУДЬ-ЯКЕ falsy-значення (0, \"\", false, null, undefined) на запасний варіант — якщо 0 чи \"\" можуть бути справжніми даними, потрібен ?? замість ||." },
    bestPractices: ["Порівнюй завжди через === / !==, без винятків.", "Обирай ?? за замовчуванням для запасних значень; || лише коли усвідомлено потрібно замінити й 0/\"\"/false теж.", "Став ?. на кожному кроці доступу до даних, які могли ще не завантажитись з мережі.", "Комбінуй ?. і ?? разом для даних з API: response.data?.items ?? [] — безпечний доступ плюс зрозумілий запасний варіант.", "У код-рев'ю звертай окрему увагу на кожен ||, що працює з числами чи булевими значеннями — це найчастіше місце прихованого бага."],
    remember: ["=== / !== завжди, == / != ніколи.", "?? — лише null/undefined; || — будь-яке falsy.", "?. — безпечний доступ до можливо відсутньої властивості.", "&& — умовне виконання правої частини.", "?. і ?? часто йдуть в парі: безпечний доступ + зрозуміле запасне значення."],
    interviewQuestions: [
      { question: "Чим ?? відрізняється від ||?", answer: "?? (nullish coalescing) замінює значення на запасне лише якщо воно null або undefined. || замінює будь-яке falsy-значення, включно з 0, порожнім рядком і false — це різниця, критична для полів на кшталт кількості чи ціни, де 0 є валідним значенням." },
      { question: "Навіщо потрібен оператор ?. (optional chaining)?", answer: "Він дозволяє безпечно звертатись до вкладеної властивості об'єкта, який може бути null/undefined, повертаючи undefined замість того, щоб кинути TypeError — особливо корисно для даних, що прийшли з мережевого запиту й можуть бути не повністю завантажені." },
      { question: "Чому у виразі count || 0 може ховатись баг, а в count ?? 0 — ні?", answer: "Якщо count дорівнює 0 (легітимне значення), || все одно вважає його falsy і замінює на 0 з правого боку — на перший погляд непомітно, бо результат той самий (0), але якщо праворуч стоїть інше число, наприклад count || 10, то count = 0 стане 10, хоча мало лишитись 0. ?? замінює значення лише якщо воно точно null/undefined, тому 0 завжди лишається 0." },
      { question: "Що станеться, якщо прибрати ?. з ланцюжка response.user?.profile?.avatarUrl?", answer: "Якщо будь-яка проміжна властивість (user чи profile) виявиться null/undefined, звернення до наступної властивості без ?. кине TypeError: Cannot read properties of undefined — і якщо це не обгорнуто в try/catch, застосунок може повністю впасти замість того, щоб показати запасне значення." },
      { question: "Чи можна поєднати ?. і ?? в одному виразі, і навіщо?", answer: "Так, це поширений і рекомендований патерн: response.data?.items ?? [] — ?. безпечно доходить до items навіть якщо data відсутній, а ?? гарантує, що результат ніколи не буде null/undefined, а завжди масивом, з яким безпечно продовжувати роботу (наприклад, викликати .map())." },
    ],
    summary: "=== / !== порівнюють без неявного перетворення типів і завжди кращі за == / !=. ?? підставляє запасне значення лише для null/undefined, тоді як || робить це для будь-якого falsy — вибір залежить від того, чи 0/\"\" є валідними даними. ?. безпечно читає вкладені властивості, що можуть бути відсутні, і часто працює в парі з ?? для зрозумілого запасного значення.",
    proTip: "Увімкни ESLint-правило eqeqeq (забороняє == / !=) і no-unsafe-optional-chaining — більшість команд роблять це стандартом лінтера з першого дня проєкту. На код-рев'ю окремо перевіряй кожен || поруч з числами чи лічильниками: це найчастіше місце, де ховається саме той баг, що ?? був створений вирішити.",
    nextLessonNote: "Далі — перетворення типів: що відбувається \"під капотом\", коли типи змішуються.",
    interactiveDemo: "nullish-vs-or-demo",
    practiceTask: {
      title: "Знайди і виправ баг лічильника товарів на складі",
      description: "Сторінка товару показує кількість на складі, але коли товару 0 (розпродано), лічильник помилково показує запасне значення замість чесного нуля. Знайди й виправ баг у реальній HTML-сторінці.",
      checklist: [
        "Кількість 0 залишається 0, а не замінюється на запасне значення.",
        "Відсутня (null/undefined) назва товару замінюється на \"Товар без назви\".",
        "Використано ?? там, де 0 має лишитись 0.",
        "Порівняння через === / !==, без == / !=.",
      ],
      starterFiles: [
        {
          id: "js-operators-start",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<h2 id="product-name"></h2>
<p id="stock-count"></p>

<script>
  const product = { name: "Навушники", stock: 0 };

  function describeStock(item) {
    const name = item.name || "Товар без назви";
    const stock = item.stock || "немає в наявності";
    return { name, stock };
  }

  const { name, stock } = describeStock(product);
  document.querySelector("#product-name").textContent = name;
  document.querySelector("#stock-count").textContent = "На складі: " + stock;
  // зараз показує "На складі: немає в наявності" для 0 товарів,
  // хоча склад міг мати рівно 0 штук — це не те саме, що "дані відсутні"
</script>
`,
        },
      ],
      solutionFiles: [
        {
          id: "js-operators-solution",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<h2 id="product-name"></h2>
<p id="stock-count"></p>

<script>
  const product = { name: "Навушники", stock: 0 };

  function describeStock(item) {
    const name = item.name || "Товар без назви";
    const stock = item.stock ?? "немає даних";
    return { name, stock };
  }

  const { name, stock } = describeStock(product);
  document.querySelector("#product-name").textContent = name;
  document.querySelector("#stock-count").textContent = "На складі: " + stock;
  // тепер "На складі: 0" — чесний нуль замість підміни
</script>
`,
          readOnly: true,
        },
      ],
      hints: ["name варто лишити на ||, бо порожній рядок як назва товару справді небажаний.", "stock потребує ?? — 0 тут легітимна кількість, яку не можна плутати з відсутністю даних."],
      expectedOutput: "\"На складі: 0\" замість \"На складі: немає в наявності\".",
    },
    microExercises: [
      { id: "js-nullish-vs-or-predict", kind: "predict", prompt: "Що виведе цей код?", code: `const stock = 0;\nconsole.log(stock || 10);\nconsole.log(stock ?? 10);`, solution: "10, потім 0 — || замінює будь-яке falsy (0 включно), ?? замінює лише null/undefined." },
      { id: "js-optional-chaining-choice", kind: "choice", prompt: "Який оператор безпечно прочитає user.profile.avatar, якщо profile може бути відсутнім?", options: ["user.profile.avatar", "user?.profile?.avatar", "user && profile.avatar", "user == profile.avatar"], correctAnswer: "user?.profile?.avatar", solution: "?. перевіряє кожен рівень на null/undefined перед тим, як читати далі, і безпечно повертає undefined замість помилки." },
      { id: "js-strict-equality-find-bug", kind: "find-the-bug", prompt: "У чому проблема цієї перевірки?", code: `const userId = "42";\nif (userId == 42) {\n  console.log("Знайдено");\n}`, solution: "== порівнює з неявним перетворенням типів — рядок \"42\" і число 42 вважаються рівними, хоча це різні типи. Якщо userId прийшов з іншого джерела як інший тип, == може дати хибнопозитивний результат. Правильно: userId === 42 або явно привести типи перед порівнянням." },
      { id: "js-optional-chain-nullish-rewrite", kind: "rewrite", prompt: "Перепиши цей код, додавши ?. і ?? там, де потрібно, щоб він безпечно повертав масив товарів навіть якщо response.data відсутній.", code: `function getItems(response) {\n  return response.data.items;\n}`, solution: `function getItems(response) {\n  return response.data?.items ?? [];\n}\n// ?. запобігає TypeError, якщо data відсутній; ?? гарантує масив замість undefined.` },
      { id: "js-and-operator-explain", kind: "explain", prompt: "Поясни, як працює isLoggedIn && renderProfile() і чому це поширений патерн в інтерфейсах.", solution: "&& виконує праву частину лише якщо ліва truthy. Якщо isLoggedIn — false, JavaScript навіть не викличе renderProfile() (коротке замикання) — це компактний спосіб умовно виконати дію чи показати елемент інтерфейсу без повного if/else." },
    ],
  },

  "Перетворення типів": {
    whatIsIt: "JavaScript перетворює типи двома способами: неявно (coercion) — сам, під час операцій на кшталт + чи ==; і явно — коли розробник свідомо викликає String(), Number(), Boolean() чи parseInt()/parseFloat().",
    whyUseIt: "Неявне перетворення — джерело найвідоміших \"дивних\" прикладів JS (\"1\" + 1 === \"11\", але \"5\" - 1 === 4). Явне перетворення прибирає цю двозначність і робить код передбачуваним, особливо коли дані приходять як рядки (форми, URL, localStorage, JSON).",
    whenToUse: ["Number(value) чи parseFloat(value) — коли рядок з форми чи localStorage треба перетворити на число.", "String(value) — коли явно потрібен рядок (а не просто вивід у шаблонний рядок, де це відбувається само).", "Boolean(value) — коли треба явно перевірити truthy/falsy без побічних if.", "parseInt(value, 10) — коли рядок може містити зайвий текст після числа (\"42px\")."],
    whenNotToUse: ["Не покладайся на + для конвертації рядка в число — якщо один з операндів рядок, + завжди зводить обидва до конкатенації рядків.", "Не викликай parseInt без другого аргументу (радикса) — parseInt(\"08\") у старих рушіях міг дати неочікуваний результат.", "Не порівнюй через == сподіваючись на \"розумне\" перетворення — правила == заплутані навіть для досвідчених розробників."],
    comparisonTable: {
      headers: ["Функція", "Вхід", "Результат"],
      rows: [
        ["Number(\"42\")", "рядок з числом", "42"],
        ["Number(\"42px\")", "рядок зі сміттям після числа", "NaN"],
        ["parseInt(\"42px\", 10)", "рядок зі сміттям після числа", "42"],
        ["String(42)", "число", "\"42\""],
        ["Boolean(0)", "falsy-число", "false"],
        ["Boolean(\"0\")", "непорожній рядок (навіть \"0\")", "true"],
      ],
    },
    codeWalkthroughs: [
      {
        before: "+ поводиться по-різному залежно від типів операндів — це найчастіше джерело сюрпризів:",
        code: `console.log("1" + 1); // "11" — число перетворюється на рядок, це конкатенація
console.log("5" - 1); // 4 — мінус завжди означає віднімання, обидва боки стають числами
console.log(1 + 1 + "1"); // "21" — зліва направо: 1+1=2 (числа), потім 2+"1"="21"`,
        lineNotes: ["+ з рядком хоч на одному боці завжди означає конкатенацію.", "- завжди означає віднімання — інших операторів для рядків немає, тому обидва боки примусово стають числами.", "Порядок обчислення зліва направо критично впливає на результат зі змішаними типами."],
        after: "Саме тому в реальному коді краще явно писати Number(value) + Number(other), а не покладатись на те, що + \"здогадається\" правильно.",
      },
      {
        before: "parseInt без радикса і Number() поводяться по-різному з \"зайвим\" текстом після числа:",
        code: `console.log(Number("42px")); // NaN — весь рядок має бути валідним числом
console.log(parseInt("42px", 10)); // 42 — parseInt читає число, поки може, і зупиняється
console.log(parseInt("px42", 10)); // NaN — з тексту, що не починається цифрою, нічого не прочитати`,
        lineNotes: ["Number() вимагає, щоб УВЕСЬ рядок був числом, інакше NaN.", "parseInt() читає цифри зліва направо, доки вони є, і ігнорує решту — корисно для \"42px\", небезпечно, якщо очікуєш строгу валідацію."],
        after: "Обирай Number() для строгої перевірки (форма має містити ЛИШЕ число) і parseInt() лише коли свідомо очікуєш одиниці виміру чи інший текст після числа.",
      },
    ],
    commonMistakes: ["parseInt(value) без другого аргументу-радикса.", "Очікування, що + конвертує рядок у число так само, як -.", "Порівняння через == замість явного перетворення й ===.", "Boolean(\"false\") — рядок \"false\" є truthy, бо це непорожній рядок!"],
    dontDoThis: { code: `const input = "0";\nif (input) {\n  console.log("Є значення");\n}`, explanation: "input — рядок \"0\", а будь-який непорожній рядок truthy, навіть \"0\" чи \"false\". Якщо потрібно перевірити саме число 0, спочатку явно конвертуй: Number(input) !== 0." },
    bestPractices: ["Завжди явно конвертуй дані з форм/URL/localStorage через Number()/String() одразу після отримання, а не десь посередині логіки.", "Для parseInt завжди передавай радикс 10 другим аргументом.", "Обирай Number() для строгої перевірки, parseInt()/parseFloat() лише коли текст свідомо може містити щось після числа."],
    remember: ["+ з рядком — завжди конкатенація; -, *, / — завжди приводять до чисел.", "Number() вимагає весь рядок валідним числом, parseInt() читає, доки може.", "Завжди передавай радикс 10 у parseInt.", "Рядок \"0\" і \"false\" — truthy значення, це не те саме, що число 0 чи boolean false."],
    interviewQuestions: [
      { question: "Чому \"1\" + 1 дає \"11\", а \"5\" - 1 дає 4?", answer: "Оператор + перевантажений: якщо хоч один операнд рядок, він виконує конкатенацію рядків. Усі інші арифметичні оператори (-, *, /) не мають рядкового значення, тому JavaScript завжди приводить обидва операнди до чисел." },
      { question: "Чим відрізняються Number(\"42px\") і parseInt(\"42px\", 10)?", answer: "Number() вимагає, щоб рядок повністю був валідним числом, інакше повертає NaN. parseInt() читає цифри зліва направо, доки вони є, і повертає прочитане число, ігноруючи залишок рядка — тому parseInt(\"42px\", 10) дає 42, а Number(\"42px\") дає NaN." },
    ],
    summary: "JavaScript неявно перетворює типи в операторах (+ означає конкатенацію, якщо є рядок; -, *, / завжди приводять до чисел), що часто дає неочікувані результати. Явне перетворення через Number()/String()/Boolean()/parseInt(value, 10) прибирає цю неоднозначність і має стати звичкою для будь-яких даних, що приходять як рядки.",
    proTip: "Якщо лінтер підтримує правило radix (ESLint), увімкни його — воно змушує завжди писати другий аргумент у parseInt і рятує від рідкісних, але реальних багів у старих браузерних рушіях.",
    nextLessonNote: "Далі — шаблонні рядки: зручніший спосіб будувати текст зі змінними, ніж конкатенація через +.",
    practiceTask: {
      title: "Безпечно перетвори ціну з форми",
      description: "Форма повертає ціну як рядок. Напиши функцію, яка явно конвертує її в число і повертає 0 як запасне значення, якщо рядок не є коректним числом.",
      checklist: [
        "Використано Number(), не покладання на неявне +.",
        "Number.isNaN() перевіряє результат конвертації.",
        "Некоректний рядок дає 0, а не NaN, що зіпсує подальші розрахунки.",
        "Коректний рядок дає правильне число.",
      ],
      starterFiles: [
        {
          id: "js-conversion-start",
          path: "parsePrice.js",
          language: "javascript",
          label: "parsePrice.js",
          code: `function parsePrice(rawValue) {
  // поверни Number(rawValue), або 0 якщо результат NaN
}

console.log(parsePrice("65")); // 65
console.log(parsePrice("abc")); // 0
console.log(parsePrice("")); // 0
`,
        },
      ],
      solutionFiles: [
        {
          id: "js-conversion-solution",
          path: "parsePrice.js",
          language: "javascript",
          label: "parsePrice.js",
          code: `function parsePrice(rawValue) {
  const value = Number(rawValue);
  return Number.isNaN(value) ? 0 : value;
}

console.log(parsePrice("65")); // 65
console.log(parsePrice("abc")); // 0
console.log(parsePrice("")); // 0
`,
          readOnly: true,
        },
      ],
      hints: ["Number(\"\") насправді дає 0, а не NaN — тому цей випадок автоматично спрацює правильно, тестуй усе одно.", "Number(\"abc\") дає NaN — саме на цьому кейсі перевіряється твій фолбек."],
      expectedOutput: "65, 0, 0",
    },
    microExercises: [
      { id: "js-plus-concat-predict", kind: "predict", prompt: "Що виведе цей код?", code: `console.log(1 + "2" + 3);`, solution: "\"123\" — зліва направо: 1 + \"2\" = \"12\" (конкатенація, бо є рядок), потім \"12\" + 3 = \"123\"." },
      { id: "js-parseint-radix-choice", kind: "choice", prompt: "Що варто завжди передавати другим аргументом у parseInt?", options: ["true", "10 (радикс)", "NaN", "нічого, другий аргумент не потрібен"], correctAnswer: "10 (радикс)", solution: "Радикс 10 явно каже \"це десяткова система числення\" і убезпечує від неочікуваної поведінки в різних рушіях." },
    ],
  },

  "Шаблонні рядки": {
    whatIsIt: "Шаблонні рядки (template literals) — рядки в бектіках (`) із вбудованою інтерполяцією ${вираз} і підтримкою багаторядковості без спеціальних символів.",
    whyUseIt: "Конкатенація через + з великою кількістю змінних важко читається і легко ламається зайвим пробілом. ${} вставляє будь-який вираз прямо в рядок, а багаторядковість прибирає потребу в \\n і зайвій конкатенації.",
    whenToUse: ["Будь-який рядок, що містить змінні чи вирази — завжди template literal замість +.", "Багаторядковий текст (лист, HTML-фрагмент, повідомлення) — без \\n, просто перенос рядка в самому коді.", "Вкладені вирази прямо в ${}: ${price * quantity}, ${items.length} товарів."],
    whenNotToUse: ["Не будуй HTML з даними користувача через template literal для прямого вставлення в innerHTML — це ризик XSS, якщо дані не екрановані.", "Не заглиблюй складну логіку (тернарні оператори з кількома умовами) всередину ${} — вона стає нечитабельною, обчисли заздалегідь у змінну."],
    comparisonTable: {
      headers: ["Через +", "Через шаблонний рядок"],
      rows: [
        ['"Привіт, " + name + "!"', "`Привіт, ${name}!`"],
        ['"Сума: " + (price * qty) + " грн"', "`Сума: ${price * qty} грн`"],
        ['"Рядок1\\nРядок2"', "`Рядок1\\nРядок2` (буквальний перенос рядка в коді)"],
      ],
    },
    codeWalkthroughs: [
      {
        before: "Інтерполяція приймає будь-який вираз, не лише змінну:",
        code: `const name = "Ірина";
const cartCount = 3;

console.log(\`Привіт, \${name}! У кошику \${cartCount} \${cartCount === 1 ? "товар" : "товари"}.\`);
// "Привіт, Ірина! У кошику 3 товари."`,
        lineNotes: ["${name} вставляє значення змінної напряму.", "${cartCount === 1 ? ... : ...} — усередині ${} можна писати будь-який валідний JS-вираз, включно з тернарним оператором."],
      },
      {
        before: "Багаторядковість без \\n — просто перенос рядка в самому шаблоні:",
        code: `const receipt = \`Чек:
- Кава: 65 грн
- Круасан: 45 грн
Разом: 110 грн\`;

console.log(receipt);`,
        lineNotes: ["Перенос рядка всередині бектіків стає реальним переносом рядка в результаті — без жодного \\n.", "Це особливо зручно для листів, повідомлень чи фрагментів розмітки."],
        after: "Із звичайним рядком у лапках довелося б писати \"Чек:\\n- Кава: 65 грн\\n...\" — набагато важче читати й редагувати.",
      },
    ],
    commonMistakes: ["Забуті бектіки замість звичайних лапок (шаблонний рядок працює лише з ` `, не з \" чи ').", "Складна логіка з кількома вкладеними тернарними операторами всередині ${}.", "Пряме вставлення необробленого вводу користувача в HTML через template literal і innerHTML (XSS)."],
    dontDoThis: { code: `const comment = getUserInput(); // може містити <script>...\ncontainer.innerHTML = \`<p>\${comment}</p>\`;`, explanation: "Якщо comment містить HTML/JS від користувача, він виконається в чужому браузері (XSS) — для вставки тексту користувача використовуй textContent, а не innerHTML з необробленими даними." },
    bestPractices: ["Обирай template literal замість + завжди, коли в рядку є хоч одна змінна.", "Виноси складні вирази в окрему змінну перед ${}, а не пиши логіку прямо всередині фігурних дужок.", "Для вставки даних користувача в DOM використовуй textContent, а не innerHTML із шаблонним рядком."],
    remember: ["Бектіки (`) для template literals, не звичайні лапки.", "${вираз} приймає будь-який валідний JS-вираз.", "Перенос рядка всередині бектіків — реальний перенос, без \\n.", "Ніколи не вставляй необроблений ввід користувача через innerHTML."],
    interviewQuestions: [
      { question: "Чим шаблонні рядки кращі за конкатенацію через +?", answer: "Вони підтримують інтерполяцію будь-якого виразу через ${}, читаються лінійно (як фінальний текст, а не збірка з шматочків) і дозволяють багаторядковість без \\n — усе це робить код коротшим і менш крихким при змінах." },
      { question: "Чому пряме вставлення тексту користувача в шаблонний рядок, який потім іде в innerHTML, небезпечне?", answer: "Якщо текст користувача містить HTML-теги чи <script>, вони будуть виконані в браузері як реальна розмітка — це класична XSS-вразливість. Для безпечної вставки тексту слід використовувати textContent, який трактує вміст як звичайний текст, а не розмітку." },
    ],
    summary: "Шаблонні рядки (в бектіках) підтримують інтерполяцію ${вираз} і багаторядковість без \\n, що робить побудову тексту з даними набагато читабельнішою за конкатенацію через +. Вони не захищають від XSS самі по собі — для вставки даних користувача в DOM усе одно потрібен textContent, а не innerHTML.",
    proTip: "У VS Code і більшості редакторів автоматичне перетворення '...' на `...` спрацьовує, щойно ти додаєш перший ${ — не бійся почати писати звичайний рядок і \"апгрейднути\" його до шаблонного просто додавши інтерполяцію.",
    nextLessonNote: "Далі — дебагінг у DevTools: як знаходити помилки в коді, який щойно написав.",
    practiceTask: {
      title: "Сформуй чек покупки",
      description: "Перепиши побудову чека з конкатенації через + на шаблонний рядок з інтерполяцією і багаторядковістю.",
      checklist: [
        "Використано бектіки замість +.",
        "Сума рахується прямо всередині ${}.",
        "Чек багаторядковий (кожен товар на своєму рядку) без жодного \\n.",
      ],
      starterFiles: [
        {
          id: "js-templates-start",
          path: "receipt.js",
          language: "javascript",
          label: "receipt.js",
          code: `function buildReceipt(name, price, quantity) {
  return "Товар: " + name + "\\n" + "Ціна: " + price + " грн\\n" + "Кількість: " + quantity + "\\n" + "Разом: " + (price * quantity) + " грн";
}

console.log(buildReceipt("Кава", 65, 2));
`,
        },
      ],
      solutionFiles: [
        {
          id: "js-templates-solution",
          path: "receipt.js",
          language: "javascript",
          label: "receipt.js",
          code: `function buildReceipt(name, price, quantity) {
  return \`Товар: \${name}
Ціна: \${price} грн
Кількість: \${quantity}
Разом: \${price * quantity} грн\`;
}

console.log(buildReceipt("Кава", 65, 2));
`,
          readOnly: true,
        },
      ],
      hints: ["Перенос рядка всередині бектіків замінює кожен \\n у старому коді.", "price * quantity можна порахувати прямо всередині ${}, без окремої змінної."],
      expectedOutput: "Товар: Кава\nЦіна: 65 грн\nКількість: 2\nРазом: 130 грн",
    },
    microExercises: [
      { id: "js-template-literal-predict", kind: "predict", prompt: "Що виведе цей код?", code: `const qty = 3;\nconsole.log(\`У кошику \${qty * 2} шт.\`);`, solution: "\"У кошику 6 шт.\" — вираз qty * 2 обчислюється всередині ${} перед вставкою в рядок." },
      { id: "js-xss-find-bug", kind: "find-the-bug", prompt: "У чому небезпека цього коду?", code: `const comment = getUserInput();\nbox.innerHTML = \`<p>\${comment}</p>\`;`, solution: "Якщо comment містить HTML/скрипт від користувача, він виконається в браузері — це XSS-вразливість. Потрібен box.textContent замість innerHTML для необробленого користувацького тексту." },
    ],
  },

  "Дебагінг у DevTools": {
    whatIsIt: "DevTools браузера — панель Console (console.log/warn/error/table) і панель Sources з точками зупину (breakpoints), де можна поставити виконання коду на паузу й оглянути змінні в точному моменті.",
    whyUseIt: "console.log розкидані по коду показують лише те, що ти вирішив вивести заздалегідь. Breakpoint зупиняє виконання насправді, і ти бачиш УСІ змінні в цій точці, стек викликів і можеш виконувати код покроково — це на порядок швидше для складних багів.",
    whenToUse: ["console.log(value) — швидко перевірити одне значення під час розробки.", "console.table(arrayOfObjects) — коли потрібно побачити масив об'єктів як читабельну таблицю.", "console.error()/console.warn() — коли важливість повідомлення відрізняється від звичайного логу.", "Breakpoint у Sources (клік на номер рядка) чи ключове слово debugger — коли треба покроково простежити складну логіку."],
    whenNotToUse: ["Не залишай console.log у коді, який іде в продакшн — це шум і потенційний витік даних.", "Не використовуй alert() для дебагінгу — він блокує виконання і незручний для перевірки кількох значень.", "Не став breakpoint на кожен рядок поспіль — став туди, де підозрюєш проблему, і йди звідти step-by-step."],
    comparisonTable: {
      headers: ["Інструмент", "Коли використовувати"],
      rows: [
        ["console.log()", "Швидко подивитись одне-два значення"],
        ["console.table()", "Масив об'єктів — рядки/товари/користувачі"],
        ["console.error() / console.warn()", "Позначити рівень важливості повідомлення"],
        ["debugger / breakpoint", "Покрокове виконання складної логіки з переглядом усіх змінних"],
      ],
    },
    codeWalkthroughs: [
      {
        before: "console.table перетворює масив об'єктів на читабельну таблицю замість нечитаного вкладеного об'єкта в консолі:",
        code: `const cart = [
  { name: "Кава", price: 65, quantity: 2 },
  { name: "Круасан", price: 45, quantity: 1 },
];

console.log(cart); // розгорнутий вкладений об'єкт, важко читати рядок за рядком
console.table(cart); // акуратна таблиця з колонками name/price/quantity`,
        lineNotes: ["console.log(cart) виводить масив як є — доводиться розгортати кожен об'єкт вручну.", "console.table(cart) одразу малює таблицю з колонками за ключами об'єктів — весь кошик видно одним поглядом."],
      },
      {
        before: "Ключове слово debugger зупиняє виконання коду точно в цьому рядку, якщо відкриті DevTools:",
        code: `function getCartTotal(items) {
  let total = 0;
  for (const item of items) {
    debugger; // виконання зупиниться тут на кожній ітерації
    total += item.price * item.quantity;
  }
  return total;
}`,
        lineNotes: ["debugger; працює як точка зупину, вписана прямо в код — зручно, коли швидше додати рядок, ніж клікати в Sources.", "На паузі видно поточні значення item, total і можна виконати код по кроках (Step Over/Step Into)."],
        after: "Прибери debugger; перед комітом — залишений у коді, він зупиняє виконання в будь-кого, хто відкриє DevTools.",
      },
    ],
    commonMistakes: ["Залишені console.log/debugger у коді, який іде в комміт.", "alert() замість console.log для дебагінгу.", "console.log(складний об'єкт) замість console.table для масивів об'єктів.", "Дебагінг \"на очі\" без жодного breakpoint у справді заплутаній логіці."],
    dontDoThis: { code: `function calculateTotal(items) {\n  debugger;\n  console.log("тест", items);\n  // ...логіка\n}`, explanation: "debugger і console.log, залишені в комітнутому коді — це шум для колег і потенційна зупинка виконання в них у браузері. Прибирай усі тимчасові дебаг-інструменти перед комітом." },
    bestPractices: ["Онови звичку: замість console.log(item) для масиву об'єктів одразу тягнись до console.table(items).", "Став точки зупину прямо в Sources (клік на номер рядка) для повторюваного дебагінгу — це зручніше, ніж редагувати код заради debugger;.", "Перед комітом шукай і прибирай усі тимчасові console.log/debugger — грепни \"console.log\" і \"debugger\" у діффі."],
    remember: ["console.table() — для масивів об'єктів, а не console.log().", "debugger; чи breakpoint у Sources зупиняють виконання насправді, на відміну від console.log.", "console.error/warn позначають рівень важливості, а не лише текст.", "Прибирай усі тимчасові дебаг-інструменти перед комітом."],
    interviewQuestions: [
      { question: "Чим breakpoint кращий за console.log для складних багів?", answer: "console.log показує лише те значення, яке ти вирішив вивести заздалегідь, і в той момент, коли код до нього дійшов. Breakpoint зупиняє виконання насправді: видно ВСІ змінні в поточній області видимості, стек викликів, і можна виконувати код по кроках, змінюючи розуміння того, що дивитись, на льоту." },
      { question: "Для чого потрібен console.table?", answer: "Він перетворює масив об'єктів (наприклад, товари в кошику чи список користувачів) на читабельну таблицю з колонками за ключами об'єктів, замість розгорнутого вкладеного виводу console.log, який важко сканувати оком." },
    ],
    summary: "DevTools дають два основні інструменти дебагінгу: консоль (console.log/warn/error/table для виводу значень) і breakpoints у Sources (чи ключове слово debugger) для реальної зупинки виконання з переглядом усіх змінних і покроковим виконанням. console.table особливо корисний для масивів об'єктів. Усі тимчасові дебаг-інструменти прибирай перед комітом.",
    proTip: "У Chrome DevTools можна поставити conditional breakpoint (правий клік на номер рядка → Add conditional breakpoint) — виконання зупиниться лише коли умова true, це рятує, коли баг стається на 500-й ітерації циклу, а не на першій.",
    nextLessonNote: "Модуль \"Основи мови\" завершено. Далі — \"Керування потоком\": умовні оператори, цикли й обробка помилок.",
    practiceTask: {
      title: "Знайди баг за допомогою console.table",
      description: "Функція рахує суму кошика неправильно. Додай console.table для перевірки вхідних даних і виправ знайдену помилку.",
      checklist: [
        "console.table використаний для перегляду масиву items.",
        "Знайдено і виправлено причину неправильної суми.",
        "Функція повертає коректний результат після виправлення.",
        "Тимчасовий console.table прибраний з фінального рішення (або замінений на коментар).",
      ],
      starterFiles: [
        {
          id: "js-debugging-start",
          path: "cartTotal.js",
          language: "javascript",
          label: "cartTotal.js",
          code: `const items = [
  { name: "Кава", price: 65, quantity: 2 },
  { name: "Круасан", price: 45, quantity: 1 },
];

function getCartTotal(items) {
  let total = 0;
  for (const item of items) {
    total += item.price; // баг: не враховує quantity
  }
  return total;
}

console.log(getCartTotal(items)); // виводить 110, очікується 175
`,
        },
      ],
      solutionFiles: [
        {
          id: "js-debugging-solution",
          path: "cartTotal.js",
          language: "javascript",
          label: "cartTotal.js",
          code: `const items = [
  { name: "Кава", price: 65, quantity: 2 },
  { name: "Круасан", price: 45, quantity: 1 },
];

function getCartTotal(items) {
  console.table(items); // видно колонку quantity, яку функція ігнорувала
  let total = 0;
  for (const item of items) {
    total += item.price * item.quantity;
  }
  return total;
}

console.log(getCartTotal(items)); // 175
`,
          readOnly: true,
        },
      ],
      hints: ["console.table(items) одразу покаже колонку quantity — і стане видно, що вона ніде не використовується в розрахунку.", "Кожен товар має рахуватись як price * quantity, а не просто price."],
      expectedOutput: "175",
    },
    microExercises: [
      { id: "js-console-table-choice", kind: "choice", prompt: "Який метод консолі найкраще підходить для перегляду масиву товарів кошика?", options: ["console.log", "console.table", "console.warn", "alert"], correctAnswer: "console.table", solution: "console.table малює масив об'єктів як таблицю з колонками — набагато зручніше за розгорнутий console.log чи блокуючий alert." },
      { id: "js-debugger-explain", kind: "explain", prompt: "Поясни, чому не можна лишати debugger; у коді, який іде в комміт.", solution: "debugger; зупиняє виконання коду для будь-кого, хто відкриє DevTools у браузері під час роботи з цією сторінкою — у продакшн-коді це неочікувано \"заморожує\" сторінку для звичайних користувачів із відкритою консоллю." },
    ],
  },
};
