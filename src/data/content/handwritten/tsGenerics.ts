import type { LessonOverride } from "./htmlFoundations";

/**
 * Module "Дженерики та утилітні типи" (ts-generics). Fourth TypeScript
 * module — builds on ts-basics/ts-objects/ts-functions. Focus: generic
 * functions and constraints, keyof, built-in utility types, honestly
 * typing external API data (unknown + real guards, not blind `as`), and
 * layered form models. Per the prompt: no generics before basic types are
 * solid, no keyof before confident object-type understanding, no
 * conditional/mapped types in this base course. Same beginner rules apply.
 */
export const tsGenericsOverrides: Record<string, LessonOverride> = {
  "Дженерик-функції": {
    interactiveDemo: "generic-function-demo",
    whatIsIt:
      "Дженерик-функція — це функція з параметром типу: місце-заповнювачем для типу, який компілятор підставляє РЕАЛЬНИМ типом аргументу окремо для кожного виклику. function firstItem<T>(items: T[]): T | undefined — тут <T> одразу після назви функції оголошує параметр типу T; він використовується в типах параметрів (items: T[]) і в типі повернення (T | undefined). Коли викликаєш firstItem([\"а\", \"б\"]), T стає string; коли викликаєш firstItem([1, 2]), T стає number — той самий код функції, різна підстановка T для різних викликів.",
    whyUseIt:
      "Без дженериків довелось би або написати окрему функцію для кожного типу масиву (firstString, firstNumber, firstBoolean — і так для будь-якого нового типу), або типізувати параметр як unknown чи any (\"будь-що\"), втративши інформацію про те, що конкретно повертає функція для конкретного виклику. Дженерик дозволяє написати ОДНУ функцію, яка працює з будь-яким типом масиву, зберігаючи при цьому точний тип результату: для string[] компілятор знає, що результат — string | undefined, а не просто unknown.",
    whenToUse: [
      "Функції, логіка яких однакова незалежно від типу даних (перший елемент, останній елемент, перевертання масиву) — форма роботи одна, тип даних може бути будь-яким.",
      "Коли важливо зберегти звʼязок між типом вхідних даних і типом результату (масив T дає T, а не втрачений unknown).",
      "Замість дублювання однієї й тієї самої функції окремо для кожного конкретного типу.",
    ],
    whenNotToUse: [
      "Не роби функцію дженериком, якщо вона реально працює лише з одним конкретним типом даних, — зайва абстракція без користі.",
      "Не плутай дженерик із union-типом (T — це один конкретний тип для КОЖНОГО окремого виклику, а не кілька дозволених типів одночасно, як у string | number).",
      "Не використовуй any замість дженерика там, де насправді потрібно зберегти звʼязок типів між входом і виходом функції.",
    ],
    comparisonTable: {
      headers: ["Підхід", "Тип результату для firstItem([65, 60, 50])"],
      rows: [
        ["function firstItem(items: any[]): any", "any — інформація про реальний тип елементів масиву втрачена"],
        ["function firstItem<T>(items: T[]): T | undefined", "number | undefined — тип точно збережений із реального типу аргументу"],
      ],
    },
    codeWalkthroughs: [
      {
        before: "Одна дженерик-функція для будь-якого типу масиву:",
        code: `function firstItem<T>(items: T[]): T | undefined {
  return items[0];
}

const firstDrink = firstItem(["Латте", "Капучино"]); // T = string
const firstPrice = firstItem([65, 60, 50]); // T = number`,
        lineNotes: [
          "<T> оголошує параметр типу одразу після назви функції.",
          "items: T[] означає: параметр — масив ЕЛЕМЕНТІВ ТОГО САМОГО типу T.",
          "Для першого виклику T виводиться як string; для другого — як number. Функція одна, підстановка T — різна для кожного виклику.",
        ],
      },
    ],
    commonMistakes: [
      "Плутати параметр типу <T> зі звичайним значенням чи змінною — T існує лише на етапі компіляції, це не значення в рантаймі.",
      "Робити функцію дженериком без реальної потреби зберігати звʼязок типів між входом і виходом.",
      "Використовувати any там, де дженерик зберіг би точний тип результату.",
    ],
    dontDoThis: {
      code: `function firstItem(items: any[]): any {\n  return items[0];\n}\n\nconst firstPrice = firstItem([65, 60, 50]);\nconsole.log(firstPrice.toFixed(2));`,
      explanation:
        "Код технічно компілюється — any дозволяє геть будь-яку операцію, включно з .toFixed(2). Але це саме та проблема, яку any створює: якщо колись firstItem викличуть на масиві РЯДКІВ, а не чисел, .toFixed(2) все одно \"пройде\" компілятор без жодної помилки, бо any вимикає перевірку типів повністю для цього значення, — і реальна помилка (\"firstPrice.toFixed is not a function\") станеться лише під час виконання. Виправлення: замінити any[] на дженерик <T>(items: T[]): T | undefined — тепер компілятор знає точний тип результату для кожного конкретного виклику, і .toFixed(2) дозволений лише тоді, коли T реально виводиться як number. Перевірити можна, замінивши any на дженерик і спробувавши викликати .toFixed(2) на результаті виклику з масивом рядків — компілятор одразу це заборонить.",
    },
    bestPractices: [
      "Обирай дженерик, коли логіка функції однакова для будь-якого типу, а звʼязок між типом входу й виходу важливо зберегти.",
      "Давай параметру типу коротке, стандартне імʼя (T, U, K) — це загальноприйнята конвенція для дженериків.",
      "Уникай any там, де дженерик міг би зберегти точний тип результату без утрати інформації.",
    ],
    remember: [
      "<T> після назви функції оголошує параметр типу — місце-заповнювач, який компілятор підставляє реальним типом окремо для кожного виклику.",
      "Дженерик зберігає звʼязок між типом вхідних даних і типом результату, на відміну від any, яке цей звʼязок повністю втрачає.",
      "Та сама функція, той самий код — але T підставляється по-різному для різних викликів.",
    ],
    interviewQuestions: [
      { question: "Що таке дженерик-функція?", answer: "Функція з параметром типу (наприклад, <T>), який компілятор підставляє реальним типом аргументу окремо для кожного виклику — це дозволяє одній функції працювати з будь-яким типом даних, зберігаючи точний звʼязок між типом входу й типом результату." },
      { question: "Чим дженерик <T> відрізняється від any?", answer: "any повністю вимикає перевірку типів для значення — компілятор дозволить будь-яку операцію, навіть неправильну для реального типу даних. Дженерик <T> зберігає реальний тип аргументу для кожного конкретного виклику, тому компілятор точно знає, які операції безпечні для результату." },
    ],
    summary:
      "Дженерик-функція (function name<T>(...)) має параметр типу T, який компілятор підставляє реальним типом аргументу окремо для кожного виклику. Це дозволяє одній функції працювати з будь-яким типом даних, зберігаючи точний звʼязок між типом входу і типом результату — на відміну від any, яке цей звʼязок повністю втрачає.",
    nextLessonNote: "Далі — обмеження дженериків: як дозволити дженерику лише типи з конкретними властивостями.",
    practiceTask: {
      title: "Напиши дженерик-функцію останнього елемента",
      description: "Створи дженерик-функцію lastItem<T>(items: T[]): T | undefined, що повертає останній елемент масиву будь-якого типу.",
      checklist: [
        "Функція lastItem має параметр типу <T>.",
        "Параметр items типізований як T[].",
        "Тип повернення — T | undefined.",
      ],
      starterFiles: [
        {
          id: "ts-generics-function-start",
          path: "index.ts",
          language: "typescript",
          label: "index.ts",
          code: `// Напиши дженерик-функцію lastItem<T>(items: T[]): T | undefined\n\nconst lastDrink = lastItem(["Латте", "Капучино", "Американо"]);\nconsole.log(lastDrink?.toUpperCase());`,
        },
      ],
      solutionFiles: [
        {
          id: "ts-generics-function-solution",
          path: "index.ts",
          language: "typescript",
          label: "index.ts",
          code: `function lastItem<T>(items: T[]): T | undefined {\n  return items[items.length - 1];\n}\n\nconst lastDrink = lastItem(["Латте", "Капучино", "Американо"]);\nconsole.log(lastDrink?.toUpperCase());`,
          readOnly: true,
        },
      ],
      hints: ["items[items.length - 1] реально повертає останній елемент масиву будь-якої довжини."],
      expectedOutput: 'lastDrink типізується як string | undefined, виводить "АМЕРИКАНО".',
    },
    microExercises: [
      { id: "ts-generic-fn-predict", kind: "predict", prompt: "function wrap<T>(value: T): T[] { return [value]; } const result = wrap(65); — який тип у result?", solution: "number[]. T виводиться як number з аргументу 65, тому результат — масив із одного числа, типізований як number[]." },
      { id: "ts-generic-fn-explain", kind: "explain", prompt: "Поясни, чому firstItem<T>(items: T[]): T | undefined краще за firstItem(items: any[]): any для реального коду.", solution: "Дженерик зберігає точний тип результату для кожного конкретного виклику (наприклад, number | undefined для масиву чисел), тому компілятор і далі перевіряє, які операції безпечні для цього результату. any повністю вимикає цю перевірку, дозволяючи будь-яку операцію навіть для неправильного типу — помилка виявиться лише під час виконання." },
    ],
  },

  "Обмеження дженериків": {
    interactiveDemo: "generic-constraint-demo",
    whatIsIt:
      "Обмеження дженерика — це запис <T extends ФормаТипу>, який звужує \"будь-який тип\" до \"будь-якого типу, що відповідає конкретній формі\". function getLength<T extends { length: number }>(item: T): number означає: T усе ще може бути БУДЬ-ЯКИМ типом — але лише таким, що реально має властивість length типу number. Слово extends тут не означає спадкування класів (класи в цьому курсі не розглядаються) — воно означає \"T повинен відповідати щонайменше цій формі\".",
    whyUseIt:
      "Без обмеження компілятор не дозволив би всередині функції звертатись до item.length — адже T без обмежень може бути буквально будь-яким типом, включно з тими, у яких length взагалі не існує (наприклад, number). Обмеження <T extends { length: number }> гарантує компілятору: незалежно від конкретного типу, який підставлять у T для якогось виклику, властивість length там точно буде — і це дозволяє безпечно використовувати item.length усередині функції.",
    whenToUse: [
      "Коли дженерик-функції всередині потрібно звернутись до конкретної властивості чи методу переданого значення.",
      "Коли хочеш дозволити кілька різних типів (рядки, масиви — усе, що має length), але заборонити типи, яким цієї властивості бракує (числа, булеві значення).",
      "Коли обмеження реально відповідає тому, що функція робить усередині, — а не додається \"про всяк випадок\".",
    ],
    whenNotToUse: [
      "Не додавай обмеження, якщо функція всередині не звертається до жодної властивості T, — тоді дженерик без обмежень (як у попередньому уроці) достатній.",
      "Не плутай обмеження дженерика з union-типом параметра — extends обмежує, ЯКІ типи можуть підставлятись у T, а не перелічує конкретні дозволені варіанти.",
      "Не роби обмеження надто вузьким (конкретний єдиний тип) — тоді дженерик втрачає сенс, простіше типізувати параметр напряму.",
    ],
    comparisonTable: {
      headers: ["Оголошення", "Що дозволено підставити в T"],
      rows: [
        ["<T>(item: T)", "Будь-який тип — усередині функції недоступні жодні властивості, специфічні для конкретного типу"],
        ["<T extends { length: number }>(item: T)", "Будь-який тип із реальною властивістю length: number (рядки, масиви, власні типи з length)"],
      ],
    },
    codeWalkthroughs: [
      {
        before: "Дженерик з обмеженням на властивість length:",
        code: `function getLength<T extends { length: number }>(item: T): number {
  return item.length;
}

getLength("Латте"); // 5 — рядки мають length
getLength([65, 60, 50]); // 3 — масиви мають length`,
        lineNotes: [
          "<T extends { length: number }> дозволяє в T лише типи з реальною властивістю length типу number.",
          "Рядки й масиви відповідають цій формі за своєю природою — виклики дозволені.",
          "item.length усередині функції безпечний, бо обмеження гарантує наявність цієї властивості для будь-якого підставленого T.",
        ],
      },
      {
        before: "Порушення обмеження:",
        code: `getLength(65);
// Помилка компілятора:
// Argument of type 'number' does not satisfy the constraint '{ length: number }'.`,
        lineNotes: [
          "number не має жодної властивості length — не відповідає обмеженню extends { length: number }.",
          "Компілятор забороняє виклик ще до запуску, а не дозволяє коду впасти на спробі прочитати неіснуючу властивість під час виконання.",
        ],
      },
    ],
    commonMistakes: [
      "Забувати додати обмеження й намагатись звернутись до властивості, яка не гарантована для будь-якого T.",
      "Плутати extends дженерика зі спадкуванням класів — тут це просто \"відповідає щонайменше цій формі\".",
      "Робити обмеження надто широким чи надто вузьким відносно того, що функція реально використовує всередині.",
    ],
    dontDoThis: {
      code: `function getLength<T>(item: T): number {\n  return item.length;\n}`,
      explanation:
        "Компілятор одразу підкреслює item.length червоним. Причина в тому, що T без жодного обмеження може бути буквально будь-яким типом — включно з number, boolean, чи будь-яким власним типом без властивості length. Компілятор не може дозволити звернення до .length, доки не матиме гарантії, що ця властивість реально існує для будь-якого можливого T. Без цієї перевірки виклик getLength(65) технічно \"пройшов\" би компіляцію (якби перевірки не було), але реально впав би під час виконання з помилкою на кшталт \"Cannot read properties of undefined\", бо в числа 65 просто немає властивості length. Виправлення: додати обмеження <T extends { length: number }> — тепер компілятор гарантує наявність length для будь-якого підставленого T. Перевірити можна, додавши це обмеження, — помилка на item.length одразу зникає, а виклик getLength(65) натомість стає помилкою (що й правильно).",
    },
    bestPractices: [
      "Додавай обмеження рівно такої форми, яка реально потрібна функції всередині — не більше й не менше.",
      "Використовуй обмеження, коли хочеш дозволити кілька різних типів, обʼєднаних спільною властивістю чи методом.",
      "Перевіряй, чи справді потрібен дженерик з обмеженням, чи достатньо простого union-типу для конкретного, обмеженого набору варіантів.",
    ],
    remember: [
      "<T extends ФормаТипу> обмежує, які типи можуть підставлятись у T — лише ті, що відповідають цій формі.",
      "extends тут означає \"відповідає щонайменше цій формі\", а не спадкування класів.",
      "Обмеження дозволяє безпечно використовувати властивості цієї форми всередині дженерик-функції.",
    ],
    interviewQuestions: [
      { question: "Що робить обмеження дженерика (<T extends ФормаТипу>)?", answer: "Звужує, які типи можуть підставлятись у параметр типу T, — лише ті, що реально відповідають вказаній формі. Це дозволяє безпечно звертатись до властивостей цієї форми всередині дженерик-функції, залишаючись гнучким щодо конкретного типу." },
      { question: "Чому <T extends { length: number }>(item: T) дозволяє звертатись до item.length, а просто <T>(item: T) — ні?", answer: "Без обмеження T може бути будь-яким типом, включно з тими, де length взагалі не існує, тому компілятор забороняє звернення до цієї властивості. Обмеження гарантує, що будь-який тип, підставлений у T, реально має властивість length — це і дозволяє безпечний доступ усередині функції." },
    ],
    summary:
      "Обмеження дженерика (<T extends ФормаТипу>) звужує \"будь-який тип\" до \"будь-якого типу, що відповідає конкретній формі\" — це дозволяє безпечно використовувати властивості цієї форми всередині дженерик-функції, залишаючись гнучким щодо того, який саме конкретний тип буде підставлений у T для кожного виклику.",
    nextLessonNote: "Далі — keyof: як безпечно типізувати доступ до властивостей обʼєкта за їхньою реальною назвою.",
    practiceTask: {
      title: "Обмеж дженерик функції порівняння цін",
      description: "Створи дженерик-функцію isMoreExpensive<T extends { price: number }>(a: T, b: T): boolean, яка порівнює ціни двох обʼєктів будь-якої форми, що мають властивість price.",
      checklist: [
        "Функція має обмеження <T extends { price: number }>.",
        "Функція повертає true, якщо price першого обʼєкта більший.",
        "Виклик із обʼєктами без price викликає помилку компілятора.",
      ],
      starterFiles: [
        {
          id: "ts-generics-constraint-start",
          path: "index.ts",
          language: "typescript",
          label: "index.ts",
          code: `// Додай обмеження <T extends { price: number }> до цієї функції\nfunction isMoreExpensive<T>(a: T, b: T): boolean {\n  return a.price > b.price;\n}\n\nisMoreExpensive({ price: 65 }, { price: 60 });`,
        },
      ],
      solutionFiles: [
        {
          id: "ts-generics-constraint-solution",
          path: "index.ts",
          language: "typescript",
          label: "index.ts",
          code: `function isMoreExpensive<T extends { price: number }>(a: T, b: T): boolean {\n  return a.price > b.price;\n}\n\nisMoreExpensive({ price: 65 }, { price: 60 });`,
          readOnly: true,
        },
      ],
      hints: ["extends { price: number } пишеться одразу після T, перед дужками параметрів."],
      expectedOutput: "isMoreExpensive повертає true; виклик без властивості price викликає помилку компілятора.",
    },
    microExercises: [
      { id: "ts-constraint-find-bug", kind: "find-the-bug", prompt: "function getTitle<T extends { title: string }>(item: T): string { return item.title; } getTitle(65); — у чому проблема?", solution: "65 (число) не має властивості title — не відповідає обмеженню extends { title: string }. Компілятор забороняє цей виклик ще до запуску." },
    ],
  },

  "Основи keyof": {
    interactiveDemo: "keyof-demo",
    whatIsIt:
      "keyof — це оператор типу, що перетворює всі назви властивостей типу T на union рядкових літералів (детальніше про union і літеральні типи — у модулі ts-basics). Для interface Product { title: string; price: number; inStock: boolean; } keyof Product дорівнює буквально \"title\" | \"price\" | \"inStock\" — рівно ті три назви властивостей, які реально є в Product, і жодної вигаданої чи зайвої.",
    whyUseIt:
      "Функція, що читає довільну властивість обʼєкта за назвою (наприклад, getProperty(product, \"price\")), без keyof мусила б типізувати параметр назви властивості як звичайний string — а це дозволило б передати будь-який рядок, включно з назвою неіснуючої властивості (\"weight\"), і отримати undefined без жодного попередження компілятора. K extends keyof T обмежує допустимі назви властивостей лише реальними полями конкретного типу T — компілятор ловить одруківку чи неіснуючу назву ще до запуску.",
    whenToUse: [
      "Функції, що приймають назву властивості обʼєкта як окремий аргумент і повинні перевіряти, що ця назва реально існує в типі обʼєкта.",
      "Коли потрібно точно типізувати результат доступу до властивості за динамічною назвою: T[K] — це тип значення саме цієї конкретної властивості.",
      "Разом з обмеженням дженерика (з попереднього уроку): K extends keyof T.",
    ],
    whenNotToUse: [
      "Не використовуй keyof там, де назва властивості й так відома заздалегідь напряму в коді (product.price) — це потрібно лише для ДИНАМІЧНОГО доступу за змінною назвою.",
      "Не плутай keyof T (список НАЗВ властивостей типу T) з T[K] (тип ЗНАЧЕННЯ конкретної властивості K) — це різні речі, що часто використовуються разом.",
      "Не забувай, що keyof працює з типами (на етапі компіляції), а не з реальними обʼєктами під час виконання, — це не те саме, що Object.keys().",
    ],
    comparisonTable: {
      headers: ["Вираз", "Значення"],
      rows: [
        ["keyof Product", '"title" | "price" | "inStock"'],
        ["Product[\"price\"]", "number — тип значення властивості price"],
        ["function getProperty<T, K extends keyof T>(obj: T, key: K): T[K]", "K обмежений реальними назвами властивостей T; результат — тип значення саме цієї властивості"],
      ],
    },
    codeWalkthroughs: [
      {
        before: "keyof перетворює властивості інтерфейсу на перевірюваний union назв:",
        code: `interface Product {
  title: string;
  price: number;
  inStock: boolean;
}

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const product: Product = { title: "Латте", price: 65, inStock: true };
getProperty(product, "price"); // 65, тип number`,
        lineNotes: [
          "keyof Product — це \"title\" | \"price\" | \"inStock\", список реальних назв властивостей.",
          "K extends keyof T обмежує параметр key лише цими трьома дозволеними назвами.",
          "T[K] — тип значення властивості з назвою K; для key = \"price\" це number.",
        ],
      },
      {
        before: "Спроба звернутись до неіснуючої властивості:",
        code: `getProperty(product, "weight");
// Помилка компілятора:
// Argument of type '"weight"' is not assignable to parameter of type
// '"title" | "price" | "inStock"'.`,
        lineNotes: [
          "\"weight\" не входить до keyof Product — цієї властивості реально немає в Product.",
          "Компілятор ловить це одразу, замість того щоб дозволити product[\"weight\"] повернути undefined без попередження.",
        ],
      },
    ],
    commonMistakes: [
      "Плутати keyof T (назви властивостей) з T[K] (тип значення конкретної властивості).",
      "Використовувати звичайний string замість K extends keyof T для параметра назви властивості — це втрачає всю перевірку.",
      "Забувати, що keyof стосується типів на етапі компіляції, а не реального переліку ключів обʼєкта під час виконання.",
    ],
    dontDoThis: {
      code: `interface Product {\n  title: string;\n  price: number;\n}\n\nfunction getProperty(obj: Product, key: string) {\n  return obj[key as keyof Product];\n}\n\ngetProperty({ title: "Латте", price: 65 }, "weight");`,
      explanation:
        "Код компілюється без жодної помилки — as keyof Product тут ПРИМУШУЄ компілятор повірити, що key реально одна з властивостей Product, замість того щоб компілятор сам це перевірив. Але \"weight\" реально не входить до keyof Product, і під час виконання obj[\"weight\"] поверне undefined — тиха, непомітна помилка, яку компілятор міг би впіймати сам, якби не примусове приведення типу as. Виправлення: прибрати параметр key: string і as keyof Product, замінивши на дженерик K extends keyof T — тоді компілятор сам перевірить кожен реальний виклик, а не повірить приведенню типу на слово. Перевірити можна, замінивши сигнатуру на дженерик і спробувавши викликати getProperty(product, \"weight\") — тепер це стає помилкою компілятора.",
    },
    bestPractices: [
      "Використовуй K extends keyof T разом із дженериком, коли пишеш функцію динамічного доступу до властивості за назвою.",
      "Уникай as keyof T для примусового приведення довільного рядка — це вимикає саме ту перевірку, яку keyof покликаний забезпечити.",
      "Тримай у голові різницю: keyof T — назви властивостей; T[K] — тип значення конкретної властивості K.",
    ],
    remember: [
      "keyof T перетворює назви властивостей типу T на union рядкових літералів.",
      "K extends keyof T обмежує параметр лише реальними назвами властивостей T.",
      "T[K] — тип значення властивості з назвою K, точний для кожного конкретного ключа.",
    ],
    interviewQuestions: [
      { question: "Що робить оператор keyof?", answer: "Перетворює всі назви властивостей типу T на union рядкових літералів — наприклад, keyof Product для { title: string; price: number } дорівнює \"title\" | \"price\"." },
      { question: "Навіщо потрібне K extends keyof T у дженерик-функції динамічного доступу до властивості?", answer: "Це обмежує параметр назви властивості лише реальними полями типу T — компілятор забороняє передати назву неіснуючої властивості ще до запуску, замість того щоб дозволити obj[key] тихо повернути undefined для неправильної назви." },
      { question: "Чим keyof T відрізняється від T[K]?", answer: "keyof T — це union назв усіх властивостей типу T. T[K] — тип значення КОНКРЕТНОЇ властивості з назвою K (наприклад, Product[\"price\"] — це number). Вони часто використовуються разом: K extends keyof T обмежує допустимі ключі, а T[K] дає точний тип значення для обраного ключа." },
    ],
    summary:
      "keyof T перетворює назви властивостей типу T на перевірюваний union рядкових літералів. У поєднанні з обмеженням дженерика (K extends keyof T) це дозволяє написати функцію динамічного доступу до властивості, яку компілятор перевіряє на реальні назви полів обʼєкта, а T[K] дає точний тип значення для обраного ключа — без потреби в небезпечному as keyof T.",
    nextLessonNote: "Далі — утилітні типи: готові, вбудовані інструменти для перетворення вже існуючих типів (Partial, Pick, Omit).",
    practiceTask: {
      title: "Напиши безпечний getProperty для замовлення",
      description: "Створи дженерик-функцію getOrderField<T, K extends keyof T>(order: T, field: K): T[K], яка безпечно читає будь-яке поле обʼєкта замовлення за реальною назвою.",
      checklist: [
        "Функція має два параметри типу: T і K extends keyof T.",
        "Тип повернення — T[K].",
        "Виклик із неіснуючою назвою поля викликає помилку компілятора.",
      ],
      starterFiles: [
        {
          id: "ts-generics-keyof-start",
          path: "index.ts",
          language: "typescript",
          label: "index.ts",
          code: `interface Order {\n  id: number;\n  drink: string;\n}\n\n// Напиши getOrderField<T, K extends keyof T>(order: T, field: K): T[K]\n\nconst order: Order = { id: 1, drink: "Латте" };\ngetOrderField(order, "drink");`,
        },
      ],
      solutionFiles: [
        {
          id: "ts-generics-keyof-solution",
          path: "index.ts",
          language: "typescript",
          label: "index.ts",
          code: `interface Order {\n  id: number;\n  drink: string;\n}\n\nfunction getOrderField<T, K extends keyof T>(order: T, field: K): T[K] {\n  return order[field];\n}\n\nconst order: Order = { id: 1, drink: "Латте" };\ngetOrderField(order, "drink");`,
          readOnly: true,
        },
      ],
      hints: ["Тіло функції ідентичне getProperty із уроку — лише назви параметрів інші."],
      expectedOutput: 'getOrderField(order, "drink") типізується як string; getOrderField(order, "weight") — помилка компілятора.',
    },
    microExercises: [
      { id: "ts-keyof-predict", kind: "predict", prompt: "interface Item { name: string; qty: number; } — чому дорівнює keyof Item?", solution: '"name" | "qty" — union рядкових літералів із реальних назв обох властивостей інтерфейсу Item.' },
    ],
  },

  "Утилітні типи": {
    interactiveDemo: "utility-types-demo",
    whatIsIt:
      "Утилітні типи — це готові, вбудовані в TypeScript інструменти для перетворення вже існуючих типів без потреби переписувати їх вручну. Partial<Product> робить УСІ властивості Product необовʼязковими (детальніше про необовʼязкові властивості — у модулі ts-objects). Pick<Product, \"title\" | \"price\"> створює новий тип лише з переліченими властивостями. Omit<Product, \"inStock\"> створює новий тип з усіма властивостями, КРІМ перелічених.",
    whyUseIt:
      "Реальні застосунки часто потребують кількох дещо різних варіантів однієї й тієї самої форми даних: повний Product для показу картки товару, часткове оновлення (лише ціна змінилась) для форми редагування, короткий підсумок (лише назва й ціна) для списку. Без утилітних типів довелось би вручнуописувати кожен із цих варіантів окремим interface, дублюючи спільні властивості й ризикуючи розсинхронізувати їх, коли Product зміниться. Утилітні типи створюють ці варіанти автоматично НА ОСНОВІ вже існуючого Product — зміниш Product, і всі похідні типи оновляться самі.",
    whenToUse: [
      "Partial<T> — для обʼєкта часткового оновлення, де можна змінити лише деякі поля.",
      "Pick<T, Keys> — для короткого підсумку чи публічного інтерфейсу з обмеженим набором полів.",
      "Omit<T, Keys> — щоб приховати внутрішні чи чутливі поля (наприклад, службовий inStock) від зовнішнього використання.",
    ],
    whenNotToUse: [
      "Не переписуй утилітний тип вручну як окремий interface — саме для уникнення цього дублювання вони й існують.",
      "Не використовуй Partial<T> там, де насправді потрібні ВСІ властивості, — це прибере перевірку на повноту обʼєкта.",
      "Не забувай, що Pick і Omit працюють із реальними назвами властивостей вихідного типу (перевіряються через keyof, з попереднього уроку) — вигадану назву передати не можна.",
    ],
    comparisonTable: {
      headers: ["Утилітний тип", "Результат для Product { title: string; price: number; inStock: boolean }"],
      rows: [
        ["Partial<Product>", "{ title?: string; price?: number; inStock?: boolean }"],
        ['Pick<Product, "title" | "price">', "{ title: string; price: number }"],
        ['Omit<Product, "inStock">', "{ title: string; price: number }"],
      ],
    },
    codeWalkthroughs: [
      {
        before: "Три утилітні типи на основі одного інтерфейсу Product:",
        code: `interface Product {
  title: string;
  price: number;
  inStock: boolean;
}

function updatePrice(update: Partial<Product>): void {
  console.log(update.price);
}

updatePrice({ price: 70 }); // дозволено — усі поля Partial необовʼязкові`,
        lineNotes: [
          "Partial<Product> робить title, price та inStock необовʼязковими одночасно.",
          "updatePrice({ price: 70 }) не потребує title чи inStock — Partial це дозволяє.",
        ],
      },
      {
        before: "Pick і Omit для двох різних, вужчих варіантів Product:",
        code: `function renderSummary(product: Pick<Product, "title" | "price">): string {
  return \`\${product.title} — \${product.price} грн\`;
}

function toPublicView(product: Product): Omit<Product, "inStock"> {
  const { title, price } = product;
  return { title, price };
}`,
        lineNotes: [
          "Pick<Product, \"title\" | \"price\"> залишає лише ці дві властивості — inStock тут узагалі не існує.",
          "Omit<Product, \"inStock\"> залишає все, КРІМ inStock — протилежний до Pick підхід.",
        ],
        after: "Обидва похідні типи автоматично оновляться, якщо змінити оригінальний interface Product.",
      },
    ],
    commonMistakes: [
      "Переписувати вручну варіант типу, який утилітний тип уже створює автоматично.",
      "Плутати Pick (залишити ЛИШЕ перелічене) з Omit (залишити все, КРІМ перелічене).",
      "Забувати, що Partial<T> необовʼязковим робить кожну властивість — і тому доступ до значення потребує перевірки на undefined (детальніше — у модулі ts-objects).",
    ],
    dontDoThis: {
      code: `interface Product {\n  title: string;\n  price: number;\n  inStock: boolean;\n}\n\ninterface ProductUpdate {\n  title?: string;\n  price?: number;\n  inStock?: boolean;\n}`,
      explanation:
        "Це технічно не помилка компілятора — ProductUpdate працює. Але це точне дублювання того, що Partial<Product> дає автоматично, і головна проблема виявиться пізніше: якщо до Product додадуть нову властивість (наприклад, category: string), ProductUpdate доведеться оновлювати вручну в окремому місці, і легко забути про це — два типи розійдуться, і ProductUpdate буде застарілим, не відображаючи реальну форму Product. Виправлення: замінити ручний ProductUpdate на type ProductUpdate = Partial<Product> — тепер він автоматично слідує за будь-якою зміною в Product. Перевірити можна, додавши нову властивість у Product і побачивши, що Partial<Product> одразу підхоплює її, а ручний дубльований варіант — ні.",
    },
    bestPractices: [
      "Використовуй Partial/Pick/Omit замість ручного дублювання варіантів типу — вони автоматично слідують за оригіналом.",
      "Давай похідному типу через утилітний тип власне, змістовне імʼя (type ProductUpdate = Partial<Product>) для зручності читання коду.",
      "Комбінуй утилітні типи, коли потрібно (наприклад, Partial<Pick<Product, \"title\" | \"price\">>), але не зловживай надмірним ускладненням.",
    ],
    remember: [
      "Partial<T> — усі властивості T стають необовʼязковими.",
      "Pick<T, Keys> — залишає лише перелічені властивості.",
      "Omit<T, Keys> — залишає всі властивості, КРІМ перелічених.",
      "Усі три автоматично слідують за змінами оригінального типу T.",
    ],
    interviewQuestions: [
      { question: "Що робить Partial<T>?", answer: "Створює новий тип на основі T, де кожна властивість стає необовʼязковою (додається ? до кожного поля) — корисно для обʼєктів часткового оновлення." },
      { question: "Чим Pick<T, Keys> відрізняється від Omit<T, Keys>?", answer: "Pick залишає лише перелічені властивості типу T, прибираючи решту. Omit робить протилежне: залишає всі властивості T, крім перелічених." },
      { question: "Чому краще використовувати Partial<Product> замість ручного дублювання типу з тими самими полями, але необовʼязковими?", answer: "Partial<Product> автоматично слідує за оригінальним типом Product — якщо Product зміниться (додасться чи видалиться поле), Partial<Product> одразу відобразить цю зміну. Ручний дубльований тип довелось би оновлювати окремо, і легко забути, що призведе до розсинхронізації двох типів." },
    ],
    summary:
      "Утилітні типи (Partial, Pick, Omit) — це вбудовані інструменти TypeScript для створення похідних варіантів уже існуючого типу без ручного дублювання. Partial<T> робить усі властивості необовʼязковими, Pick<T, Keys> залишає лише перелічені поля, Omit<T, Keys> залишає все, крім перелічених. Усі три автоматично слідують за змінами оригінального типу.",
    nextLessonNote: "Далі — типізовані відповіді API: як чесно типізувати дані, що приходять ззовні програми.",
    practiceTask: {
      title: "Створи три варіанти типу замовлення",
      description: "На основі interface Order створи ProductOrderUpdate (Partial), OrderSummary (Pick лише id і drink) і PublicOrder (Omit customerNote).",
      checklist: [
        "type OrderUpdate = Partial<Order>.",
        'type OrderSummary = Pick<Order, "id" | "drink">.',
        'type PublicOrder = Omit<Order, "customerNote">.',
      ],
      starterFiles: [
        {
          id: "ts-generics-utility-start",
          path: "index.ts",
          language: "typescript",
          label: "index.ts",
          code: `interface Order {\n  id: number;\n  drink: string;\n  customerNote: string;\n}\n\n// Створи OrderUpdate, OrderSummary і PublicOrder за допомогою утилітних типів`,
        },
      ],
      solutionFiles: [
        {
          id: "ts-generics-utility-solution",
          path: "index.ts",
          language: "typescript",
          label: "index.ts",
          code: `interface Order {\n  id: number;\n  drink: string;\n  customerNote: string;\n}\n\ntype OrderUpdate = Partial<Order>;\ntype OrderSummary = Pick<Order, "id" | "drink">;\ntype PublicOrder = Omit<Order, "customerNote">;`,
          readOnly: true,
        },
      ],
      hints: ["Кожен утилітний тип приймає оригінальний тип першим аргументом, а Pick/Omit — ще й union назв властивостей другим."],
      expectedOutput: "Три нові типи, кожен побудований на основі Order без ручного дублювання полів.",
    },
    microExercises: [
      { id: "ts-utility-choice", kind: "choice", prompt: "Який утилітний тип залишить лише поле email з interface User { name: string; email: string; age: number }?", options: ['Partial<User>', 'Pick<User, "email">', 'Omit<User, "email">', "Жоден із них"], correctAnswer: 'Pick<User, "email">', solution: 'Pick<User, "email"> залишає лише перелічену властивість email, прибираючи решту.' },
    ],
  },

  "Типізовані відповіді API": {
    interactiveDemo: "typed-api-response-demo",
    whatIsIt:
      "Дані, що прийшли з fetch чи JSON.parse, чесно мають тип unknown (детальніше про unknown — у модулі ts-basics): компілятор не може знати заздалегідь, якої вони форми, бо це дані ЗЗОВНІ програми — від сервера, який теоретично може повернути що завгодно. Типізована відповідь API — це підхід, коли такі дані спочатку типізують як unknown, а потім реально перевіряють функцією-предикатом (детальніше про предикати — у модулі ts-functions), перш ніж довіряти їхній формі.",
    whyUseIt:
      "Найпоширеніша, але небезпечна альтернатива — приведення as Product одразу після fetch: const data = (await response.json()) as Product. Це приведення НІЧОГО реально не перевіряє — це лише обіцянка розробника компілятору, у якій компілятор змушений повірити на слово. Якщо сервер поверне іншу форму даних (через баг, зміну API чи помилку мережі), as Product однаково \"спрацює\" на етапі типів, і реальна помилка станеться значно глибше в коді, де саме той факт, що дані неправильної форми, вже важко буде відстежити до джерела.",
    whenToUse: [
      "Будь-які дані, що приходять із fetch, JSON.parse чи іншого зовнішнього джерела, якому програма не може повністю довіряти.",
      "Коли форма даних критична для подальшої роботи (наприклад, ціна товару для розрахунків) — краще впіймати неправильну форму одразу, ніж отримати зіпсований результат далі.",
      "У парі з функцією-предикатом (value is Тип), яка реально перевіряє потрібні поля й типи.",
    ],
    whenNotToUse: [
      "Не використовуй as Тип одразу після отримання зовнішніх даних без жодної реальної перевірки — це лише приховує потенційну проблему, а не вирішує її.",
      "Не роби перевірку предиката поверхневою (лише typeof value === \"object\") — перевіряй конкретні поля й типи, які реально потрібні коду.",
      "Не забувай обробити випадок, коли предикат повернув false, — це реальна, очікувана ситуація (сервер повернув щось не те), а не виняткова помилка.",
    ],
    comparisonTable: {
      headers: ["Підхід", "Що реально перевіряється"],
      rows: [
        ["const data = (await response.json()) as Product;", "Нічого — це лише обіцянка розробника, компілятор довіряє їй без жодної перевірки"],
        ["const data: unknown = await response.json(); if (isProduct(data)) { ... }", "Реальна форма обʼєкта: чи є title (string) і price (number) насправді"],
      ],
    },
    codeWalkthroughs: [
      {
        before: "Функція-предикат, що реально перевіряє форму даних із мережі:",
        code: `interface Product {
  title: string;
  price: number;
}

function isProduct(value: unknown): value is Product {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const candidate = value as Record<string, unknown>;
  return typeof candidate.title === "string" && typeof candidate.price === "number";
}`,
        lineNotes: [
          "value: unknown — чесний тип для даних, форма яких ще не перевірена.",
          "typeof value !== \"object\" || value === null — спочатку відсіює все, що взагалі не може бути обʼєктом.",
          "typeof candidate.title === \"string\" && typeof candidate.price === \"number\" — реальна перевірка конкретних полів і типів.",
        ],
      },
      {
        before: "Використання предиката для безпечної обробки відповіді:",
        code: `async function loadProduct(url: string): Promise<Product | null> {
  const data: unknown = await fetch(url).then((response) => response.json());

  if (isProduct(data)) {
    return data;
  }

  return null;
}`,
        lineNotes: [
          "data типізований як unknown одразу — жодного передчасного as Product.",
          "if (isProduct(data)) реально перевіряє форму й звужує тип до Product лише після успішної перевірки.",
          "Якщо перевірка не пройшла, функція повертає null — виклик далі повинен обробити цей випадок, а не сподіватись на удачу.",
        ],
        after: "Код чесно визнає можливість неправильної форми даних і обробляє її як реальний, очікуваний сценарій.",
      },
    ],
    commonMistakes: [
      "Приводити дані з мережі до типу через as одразу, без реальної перевірки форми.",
      "Робити перевірку предиката занадто поверхневою й пропускати конкретні поля.",
      "Ігнорувати випадок, коли предикат повернув false, — не обробляти реальну можливість неправильних даних.",
    ],
    dontDoThis: {
      code: `interface Product {\n  title: string;\n  price: number;\n}\n\nasync function loadProduct(url: string): Promise<Product> {\n  const response = await fetch(url);\n  const data = (await response.json()) as Product;\n  return data;\n}`,
      explanation:
        "Компілятор не бачить тут жодної проблеми — as Product просто наказує йому вважати data цим типом, без будь-якої реальної перевірки. Але response.json() насправді повертає значення, форма якого нікому заздалегідь не відома, — компілятор просто ВІРИТЬ приведенню типу. Якщо сервер поверне, наприклад, {} (порожній обʼєкт) через тимчасову помилку, data.title і data.price все одно матимуть тип string і number за типами компілятора — хоча реально там undefined. Подальший код, що працює з data.price (наприклад, price.toFixed(2)), впаде під час виконання далеко від справжнього джерела проблеми. Виправлення: типізувати результат response.json() як unknown і реально перевірити форму функцією-предикатом isProduct перед поверненням, обробивши випадок невдалої перевірки окремо. Перевірити можна, замінивши as Product на unknown + перевірку isProduct і подивившись, як тепер компілятор і код чесно обробляють можливість неправильної форми.",
    },
    bestPractices: [
      "Типізуй результат fetch/JSON.parse як unknown одразу, не поспішаючи з as.",
      "Пиши окрему функцію-предикат для кожної форми даних, яку реально очікуєш отримати ззовні.",
      "Завжди обробляй випадок, коли предикат повернув false, — це реальний сценарій, а не виняток.",
    ],
    remember: [
      "Дані з мережі чесно типізуються як unknown — компілятор не може знати їхню реальну форму заздалегідь.",
      "as Тип — це лише обіцянка компілятору, без жодної реальної перевірки.",
      "Функція-предикат (value is Тип) реально перевіряє форму даних перед тим, як довіряти їй.",
    ],
    interviewQuestions: [
      { question: "Чому дані, отримані через fetch, варто типізувати як unknown, а не одразу приводити через as до очікуваного типу?", answer: "as лише наказує компілятору вважати значення певним типом, не перевіряючи це реально. unknown чесно визнає, що форма даних ззовні програми невідома, і змушує реально перевірити форму (наприклад, функцією-предикатом) перед використанням." },
      { question: "Що робить функція-предикат isProduct у контексті типізованих відповідей API?", answer: "Реально перевіряє, чи значення невідомої форми (unknown) справді має потрібні поля правильних типів (наприклад, title: string і price: number), і лише після успішної перевірки компілятор звужує тип значення до Product." },
    ],
    summary:
      "Дані з мережі (fetch, JSON.parse) чесно типізуються як unknown — їхня реальна форма невідома компілятору заздалегідь. Замість небезпечного as Тип, який нічого не перевіряє, варто написати функцію-предикат, що реально перевіряє потрібні поля й типи, і обробити обидва випадки: коли форма підтвердилась і коли ні.",
    proTip: "Якщо ловиш себе на написанні as ОдразуПісляFetch, це сигнал зупинитись і написати функцію-предикат замість цього — приведення типу без перевірки лише відкладає момент, коли неправильні дані реально зламають код.",
    nextLessonNote: "Далі — багаторазові моделі форм: як типізувати дані форми через кілька шарів, від сирих рядків до готового, перевіреного результату.",
    practiceTask: {
      title: "Напиши предикат для відповіді про користувача",
      description: "Створи функцію-предикат isUser(value: unknown): value is User для перевірки форми { name: string; age: number }, отриманої з мережі.",
      checklist: [
        "Функція isUser має тип повернення value is User.",
        "Перевіряє typeof value === \"object\" && value !== null.",
        "Перевіряє реальні типи властивостей name і age.",
      ],
      starterFiles: [
        {
          id: "ts-generics-api-start",
          path: "index.ts",
          language: "typescript",
          label: "index.ts",
          code: `interface User {\n  name: string;\n  age: number;\n}\n\n// Напиши isUser(value: unknown): value is User\n\nconst raw: unknown = { name: "Іван", age: "тридцять" };\nconsole.log(isUser(raw));`,
        },
      ],
      solutionFiles: [
        {
          id: "ts-generics-api-solution",
          path: "index.ts",
          language: "typescript",
          label: "index.ts",
          code: `interface User {\n  name: string;\n  age: number;\n}\n\nfunction isUser(value: unknown): value is User {\n  if (typeof value !== "object" || value === null) {\n    return false;\n  }\n  const candidate = value as Record<string, unknown>;\n  return typeof candidate.name === "string" && typeof candidate.age === "number";\n}\n\nconst raw: unknown = { name: "Іван", age: "тридцять" };\nconsole.log(isUser(raw));`,
          readOnly: true,
        },
      ],
      hints: ["age: \"тридцять\" — рядок, а не число, тому isUser повинен повернути false для цього прикладу."],
      expectedOutput: "isUser(raw) повертає false, бо age реально є рядком, а не числом.",
    },
    microExercises: [
      { id: "ts-api-explain", kind: "explain", prompt: "Поясни, чому const data = json as Product небезпечніше, ніж const data: unknown = json; if (isProduct(data)) { ... }.", solution: "as Product нічого реально не перевіряє — це просто обіцянка компілятору, якій він змушений повірити. unknown + isProduct реально перевіряє форму даних (конкретні поля й типи) перед тим, як дозволити подальшому коду вважати значення типом Product, тому неправильні дані виявляються одразу, а не десь глибше в коді." },
    ],
  },

  "Багаторазові моделі форм": {
    interactiveDemo: "form-model-demo",
    whatIsIt:
      "Модель форми через кілька шарів типів — це підхід, коли дані форми проходять три послідовні шари: сирі значення полів (завжди рядки — детальніше про це в курсі JavaScript, значення будь-якого поля вводу завжди string), функція валідації, що реально перевіряє й перетворює ці рядки, і типізований результат (ValidationResult<T> — дискримінована спілка з попереднього модуля ts-functions), який містить або готові, перевірені дані, або список помилок.",
    whyUseIt:
      "Значення з реальних полів форми (input, select) — ЗАВЖДИ рядки, навіть коли поле виглядає як число чи виглядає обовʼязковим. Без окремого шару валідації код, що працює з даними форми далі (наприклад, розрахунок суми замовлення), отримав би рядки там, де потрібні реальні числа, — і арифметика зламалась би чи дала NaN. Розділення на три шари (сирі рядки → перевірка й перетворення → готові типізовані дані) робить кожен крок явним: ProductForm завжди рядки, ValidationResult<OrderData> примушує обробити і успіх, і невдачу, а OrderData — це вже дані, яким справді можна довіряти.",
    whenToUse: [
      "Будь-яка форма, дані якої підуть далі в код, що очікує реальні типи (числа, дати), а не рядки.",
      "Коли валідація реально складна (кілька полів, кілька умов) і виправдовує окрему, повторно використовувану функцію.",
      "Коли хочеш, щоб компілятор змушував обробити обидва випадки — і успішну валідацію, і помилку — перш ніж дозволити доступ до готових даних.",
    ],
    whenNotToUse: [
      "Не пропускай шар валідації для форм, де точність даних критична, — навіть проста форма з одним числовим полем варта реальної перевірки.",
      "Не типізуй сирі значення форми одразу як number чи Date — вони завжди приходять як рядки з реальних полів вводу.",
      "Не забувай, що ValidationResult<T> потребує звуження за полем-перемикачем (valid) перед доступом до data чи errors — так само, як Result<T> з модуля ts-functions.",
    ],
    comparisonTable: {
      headers: ["Шар", "Тип", "Що там реально є"],
      rows: [
        ["1. Сирі значення форми", "OrderFormValues { quantity: string; email: string }", "Завжди рядки — те, що реально прийшло з полів вводу"],
        ["2. Функція валідації", "validateOrderForm(values): ValidationResult<OrderData>", "Реально перевіряє й перетворює рядки"],
        ["3. Готовий результат", "ValidationResult<OrderData> = { valid: true; data: OrderData } | { valid: false; errors: string[] }", "Або перевірені дані з реальними типами, або список помилок"],
      ],
    },
    codeWalkthroughs: [
      {
        before: "Три шари типів для форми замовлення:",
        code: `interface OrderFormValues {
  quantity: string;
  email: string;
}

interface OrderData {
  quantity: number;
  email: string;
}

type ValidationResult<T> = { valid: true; data: T } | { valid: false; errors: string[] };`,
        lineNotes: [
          "OrderFormValues — сирі значення форми, quantity тут рядок, хоч і виглядає як число.",
          "OrderData — вже перевірені дані з реальним типом number для quantity.",
          "ValidationResult<T> — дискримінована спілка з полем valid як перемикачем (детальніше — у модулі ts-functions).",
        ],
      },
      {
        before: "Функція валідації, що реально перевіряє й перетворює сирі значення:",
        code: `function validateOrderForm(values: OrderFormValues): ValidationResult<OrderData> {
  const errors: string[] = [];
  const quantity = Number(values.quantity);

  if (values.quantity.trim() === "" || Number.isNaN(quantity) || quantity <= 0) {
    errors.push("Кількість повинна бути додатним числом");
  }
  if (!values.email.includes("@")) {
    errors.push("Некоректна email-адреса");
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }
  return { valid: true, data: { quantity, email: values.email } };
}`,
        lineNotes: [
          "Number(values.quantity) реально перетворює рядок на число — і реально перевіряється на NaN і додатність.",
          "values.email.includes(\"@\") — проста, але реальна перевірка формату email.",
          "Функція повертає ValidationResult<OrderData>: або список помилок, або готові типізовані дані.",
        ],
      },
      {
        before: "Використання результату через звуження за полем valid:",
        code: `const result = validateOrderForm({ quantity: "абв", email: "ivan@example.com" });

if (result.valid) {
  console.log(result.data.quantity); // доступний лише тут
} else {
  console.log(result.errors); // доступний лише тут
}`,
        lineNotes: [
          "if (result.valid) звужує тип до { valid: true; data: OrderData } — .data доступний.",
          "У протилежній гілці — { valid: false; errors: string[] } — .errors доступний, а .data там узагалі не існує.",
        ],
        after: "Компілятор не дозволить прочитати result.data без попередньої перевірки result.valid — забути обробку помилки неможливо непомітно.",
      },
    ],
    commonMistakes: [
      "Типізувати сирі значення форми одразу як число чи дату, забуваючи, що реальні поля вводу завжди дають рядки.",
      "Пропускати перевірку result.valid і намагатись одразу читати result.data.",
      "Робити валідацію поверхневою (лише перевірка на порожній рядок) там, де реально потрібна перевірка формату чи діапазону значень.",
    ],
    dontDoThis: {
      code: `interface OrderFormValues {\n  quantity: string;\n}\n\nfunction getTotal(values: OrderFormValues, price: number): number {\n  return Number(values.quantity) * price;\n}\n\ngetTotal({ quantity: "абв" }, 65);`,
      explanation:
        "Код компілюється й навіть виконується без падіння програми — Number(\"абв\") реально повертає NaN, а не помилку, і NaN * 65 теж дає NaN, без жодного винятку. Проблема в тому, що функція getTotal довіряє values.quantity без будь-якої реальної перевірки: NaN мовчки протікає далі в код, який, можливо, показує цю суму користувачу як \"NaN грн\" — зіпсований результат без жодного попередження на етапі, де його було б легко перехопити. Виправлення: додати реальну валідацію перед перетворенням (перевірку на NaN і на додатність) і повернути ValidationResult<number> замість того, щоб сліпо довіряти Number(values.quantity). Перевірити можна, додавши перевірку Number.isNaN(quantity) одразу після перетворення й обробивши цей випадок окремо, а не дозволяючи NaN просочитись у подальші розрахунки.",
    },
    bestPractices: [
      "Завжди типізуй сирі значення форми як рядки — це чесно відображає, що реально приходить із полів вводу.",
      "Виконуй реальну перевірку (не лише перевірку на порожній рядок) для кожного поля, чия точність важлива для подальшого коду.",
      "Повертай ValidationResult<T> замість того, щоб довіряти сирим значенням напряму, — це змушує обробити обидва можливі випадки.",
    ],
    remember: [
      "Сирі значення форми завжди рядки — навіть якщо поле виглядає як число.",
      "Функція валідації реально перевіряє й перетворює ці рядки в готові, типізовані дані.",
      "ValidationResult<T> (дискримінована спілка) змушує явно обробити і успіх, і невдачу перед доступом до готових даних.",
    ],
    interviewQuestions: [
      { question: "Чому значення полів форми завжди типізуються як рядки, навіть коли поле явно призначене для чисел?", answer: "Реальні HTML-поля вводу завжди повертають рядки — це поведінка самого браузера, а не рішення розробника. Тому чесна типізація сирих значень форми — завжди string, а перетворення в реальний тип (number, Date) відбувається окремим, явним кроком валідації." },
      { question: "Навіщо потрібен окремий шар ValidationResult<T> між сирими значеннями форми й готовими даними?", answer: "Він явно моделює, що валідація може завершитись успіхом (готові, типізовані дані) або невдачею (список помилок) — і компілятор, через звуження за полем-перемикачем (valid), не дозволяє доступ до готових даних без явної перевірки, чи валідація взагалі пройшла успішно." },
    ],
    summary:
      "Форма проходить три шари типів: сирі значення полів (завжди рядки), функція валідації, що реально перевіряє й перетворює ці рядки, і ValidationResult<T> — дискримінована спілка, що містить або готові, типізовані дані, або список помилок. Компілятор, через звуження за полем valid, не дозволяє доступ до готових даних без явної перевірки результату валідації.",
    nextLessonNote: "Модуль про дженерики й утилітні типи завершено — це остання суто теоретична частина курсу. Далі — TypeScript у React: типізація пропсів, children, подій, useState і власних хуків, як міст між уже вивченим TypeScript і React, який передбачає базове знання React.",
    practiceTask: {
      title: "Змодель валідацію форми реєстрації на дегустацію",
      description: "Створи три шари типів для форми запису на дегустацію кави: сирі значення (імʼя, кількість місць), OrderData з реальними типами, і функцію валідації, що повертає ValidationResult<TastingData>.",
      checklist: [
        "interface TastingFormValues має name: string, seats: string.",
        "interface TastingData має name: string, seats: number.",
        "Функція validateTastingForm повертає ValidationResult<TastingData>.",
        "Валідація реально перевіряє, що seats — додатне число, а name не порожній.",
      ],
      starterFiles: [
        {
          id: "ts-generics-form-start",
          path: "index.ts",
          language: "typescript",
          label: "index.ts",
          code: `type ValidationResult<T> = { valid: true; data: T } | { valid: false; errors: string[] };\n\ninterface TastingFormValues {\n  name: string;\n  seats: string;\n}\n\n// Опиши TastingData і функцію validateTastingForm\n\nconst result = validateTastingForm({ name: "", seats: "2" });`,
        },
      ],
      solutionFiles: [
        {
          id: "ts-generics-form-solution",
          path: "index.ts",
          language: "typescript",
          label: "index.ts",
          code: `type ValidationResult<T> = { valid: true; data: T } | { valid: false; errors: string[] };\n\ninterface TastingFormValues {\n  name: string;\n  seats: string;\n}\n\ninterface TastingData {\n  name: string;\n  seats: number;\n}\n\nfunction validateTastingForm(values: TastingFormValues): ValidationResult<TastingData> {\n  const errors: string[] = [];\n  const seats = Number(values.seats);\n\n  if (values.name.trim() === "") {\n    errors.push("Імʼя обовʼязкове");\n  }\n  if (Number.isNaN(seats) || seats <= 0) {\n    errors.push("Кількість місць повинна бути додатним числом");\n  }\n\n  if (errors.length > 0) {\n    return { valid: false, errors };\n  }\n  return { valid: true, data: { name: values.name, seats } };\n}\n\nconst result = validateTastingForm({ name: "", seats: "2" });`,
          readOnly: true,
        },
      ],
      hints: ["Порожнє імʼя і коректна кількість місць повинні дати результат valid: false з одним повідомленням про помилку в errors."],
      expectedOutput: 'Для { name: "", seats: "2" } result.valid дорівнює false, а result.errors містить повідомлення про порожнє імʼя.',
    },
    microExercises: [
      { id: "ts-form-model-predict", kind: "predict", prompt: "validateOrderForm({ quantity: \"3\", email: \"без-емейлу\" }) — яким буде result.valid?", solution: "false. quantity коректний (\"3\" перетвориться на додатне число 3), але email не містить символу @, тому errors міститиме повідомлення про некоректну email-адресу, і valid буде false." },
      { id: "ts-form-model-explain", kind: "explain", prompt: "Поясни, чому OrderFormValues типізує quantity як string, а не number, хоча кількість — це явно число.", solution: "Реальні поля форми (input) завжди повертають рядки як значення, незалежно від того, що логічно там очікується число, — це поведінка браузера. Тому чесна типізація сирих значень форми завжди string; перетворення в number відбувається окремим, явним кроком у функції валідації." },
    ],
  },
};
