import type { LessonOverride } from "./htmlFoundations";
import type { QuizData } from "../../../types/course";

/**
 * Module "Керування потоком" (js-control-flow). Second JavaScript module —
 * branching, loops, and error handling. Same deep cheat-sheet lesson format
 * as js-language-basics (whatIsIt/whyUseIt/whenToUse, comparisonTable,
 * multiple real-interface codeWalkthroughs, DOM-realistic bug-fix
 * practiceTask, genuine interactive demo, expanded microExercises).
 */
export const jsControlFlowOverrides: Record<string, LessonOverride> = {
  "Умовні оператори if": {
    whatIsIt: "if / else if / else обирає, який блок коду виконати, залежно від того, чи умова (вираз, що зводиться до true/false) істинна. JavaScript перевіряє гілки зверху вниз і виконує РІВНО одну — першу, чия умова true.",
    whyUseIt: "Кожна знижка за сумою кошика, кожне повідомлення про помилку у формі, кожен перемикач видимого/прихованого блоку інтерфейсу — це if. Розуміння порядку перевірки гілок і різниці між if(value) і if(value === true) запобігає прихованим багам: неправильний порядок умов дає хибний тариф, а забутий else залишає інтерфейс у невизначеному стані.",
    whenToUse: ["Перевірка одного чи кількох незалежних умов з різними діями для кожної.", "Валідація форми: якщо поле некоректне — показати помилку, інакше приховати.", "Тарифні пороги чи діапазони значень (сума кошика, вік, розмір файлу).", "Умовне увімкнення/вимкнення кнопки чи блоку залежно від стану (isLoggedIn, isLoading)."],
    whenNotToUse: ["Не пиши довгий ланцюжок else if для порівняння ОДНОГО значення з фіксованими варіантами — для цього краще switch (наступний урок).", "Не пиши глибоко вкладені if — виносити ранній вихід (guard-конструкції, окремий урок) читається набагато простіше.", "Не пиши if (value === true) для перевірки truthy-значення — booleanValue вже true/false, а для truthy-перевірки просто if (value).", "Не плутай = (присвоєння) з === (порівняння) в умові — if (isValid = true) завжди виконається, бо це присвоєння, що повертає true."],
    comparisonTable: {
      headers: ["Конструкція", "Коли виконується", "Приклад"],
      rows: [
        ["if", "умова true", "if (cartTotal > 0) { ... }"],
        ["else if", "попередні умови false, ця — true", "else if (cartTotal >= 1000) { ... }"],
        ["else", "жодна з умов вище не true", "else { ... }"],
        ["Порядок перевірки", "зверху вниз, зупиняється на першому true", "спочатку найвужча умова, потім ширші"],
      ],
    },
    codeWalkthroughs: [
      {
        before: "Реальний розрахунок знижки за сумою кошика — три тарифні пороги через if / else if / else:",
        code: `function getDiscount(cartTotal) {
  if (cartTotal >= 2000) {
    return 20;
  } else if (cartTotal >= 1000) {
    return 10;
  } else {
    return 0;
  }
}

console.log(getDiscount(2500)); // 20
console.log(getDiscount(1200)); // 10
console.log(getDiscount(300)); // 0`,
        lineNotes: ["Умова cartTotal >= 2000 стоїть ПЕРШОЮ — якщо поставити її останньою, сума 2500 спершу потрапила б у гілку >= 1000 і отримала б неправильну знижку 10%.", "else обробляє все, що лишилось — суми до 1000 грн без знижки."],
        after: "Порядок гілок від найвужчої (найбільша сума) до найширшої (else) — надійний патерн для будь-яких тарифних порогів.",
      },
      {
        before: "Реальна валідація форми: показати чи приховати повідомлення про помилку залежно від if:",
        code: `const emailInput = document.querySelector("#email");
const errorMessage = document.querySelector("#email-error");

function validateEmail() {
  if (emailInput.value.includes("@")) {
    errorMessage.hidden = true;
  } else {
    errorMessage.hidden = false;
  }
}`,
        lineNotes: ["if перевіряє, чи значення поля містить \"@\" — мінімальна, спрощена перевірка формату email.", "errorMessage.hidden = true/false у обох гілках — типова помилка забути одну з гілок і лишити повідомлення видимим назавжди."],
        after: "Забутий else — поширена причина повідомлень про помилку, які \"застрягли\" на екрані навіть після виправлення поля.",
      },
      {
        before: "Плоский else-if ланцюжок замість глибокої вкладеності — вартість доставки за вагою:",
        code: `function getShippingCost(weightKg) {
  if (weightKg <= 1) {
    return 50;
  } else if (weightKg <= 5) {
    return 100;
  } else if (weightKg <= 20) {
    return 200;
  } else {
    return 350;
  }
}

console.log(getShippingCost(3)); // 100`,
        lineNotes: ["Кожна умова перевіряє лише ВЕРХНЮ межу свого діапазону — до неї вже відсіяні менші ваги попередніми гілками.", "Плоский ланцюжок else if читається зверху вниз як таблиця тарифів, без вкладених дужок одна в одній."],
      },
      {
        before: "= (присвоєння) замість === (порівняння) в умові — одна з найпідступніших помилок JavaScript:",
        code: `let isValid = false;

if (isValid = true) { // мало бути ===, а не =
  console.log("Валідно"); // виконається ЗАВЖДИ, навіть якщо isValid мала бути false
}`,
        lineNotes: ["isValid = true — це ПРИСВОЄННЯ: воно записує true в isValid і саме як вираз повертає значення true.", "if(true) завжди виконує тіло — умова стає марною, а справжня логіка валідації губиться."],
        after: "ESLint-правило no-cond-assign ловить це автоматично — вартий увімкнути в будь-якому проєкті.",
      },
    ],
    commonMistakes: ["Неправильний порядок гілок (широка умова перед вузькою) — вужча гілка ніколи не спрацює.", "Забутий else, коли обидва стани (true і false) мають різну видиму поведінку.", "= замість === в умові (присвоєння замість порівняння).", "if (value === true) для truthy-перевірки замість простого if (value).", "Глибоко вкладені if замість плоского else-if ланцюжка чи раннього виходу.", "Дублювання логіки в кількох гілках замість винесення спільної частини за межі if."],
    dontDoThis: { code: `function checkAge(age) {\n  if (age >= 18) {\n    return "дорослий";\n  }\n  if (age < 18) {\n    return "неповнолітній";\n  }\n}`, explanation: "Два окремих if замість if/else — обидві умови перевіряються завжди, хоча друга є простим запереченням першої. Якщо age === undefined чи NaN, обидві умови false і функція поверне undefined — з else такого прогалини не було б: return age >= 18 ? \"дорослий\" : \"неповнолітній\"." },
    bestPractices: ["Став найвужчі, найспецифічніші умови першими в ланцюжку else if.", "Використовуй else, коли обидва стани (true/false) мають різну видиму поведінку — не залишай проміжний стан без обробки.", "Завжди === /!== в умовах, ніколи = (присвоєння).", "Для truthy-перевірки пиши просто if (value), а не if (value === true).", "Якщо else if ланцюжок стає довгим (5+ гілок) і порівнює ОДНЕ значення з фіксованими варіантами — розглянь switch."],
    remember: ["if/else if/else виконує РІВНО одну гілку — першу, чия умова true.", "Порядок гілок критичний для перекриваючихся діапазонів.", "= це присвоєння, === це порівняння — плутанина в умові ламає логіку тихо.", "if(value) вже truthy-перевірка, if(value === true) — зайве й неправильне для нечистих boolean значень."],
    interviewQuestions: [
      { question: "Що станеться, якщо в умові if написати = замість ===?", answer: "= — це присвоєння: воно запише нове значення у змінну і поверне саме це значення як результат виразу. Якщо присвоюється truthy-значення (наприклад, true чи непорожній рядок), умова if завжди буде true, незалежно від того, яким мало бути реальне порівняння — це підступна помилка, бо код не кидає синтаксичну помилку, а просто працює неправильно." },
      { question: "Чому порядок гілок else if важливий для перекриваючихся діапазонів?", answer: "JavaScript перевіряє умови зверху вниз і виконує ПЕРШУ, що дає true, ігноруючи решту. Якщо ширша умова (наприклад, cartTotal >= 1000) стоїть перед вужчою (cartTotal >= 2000), сума 2500 задовольнить першу ж умову і ніколи не дійде до перевірки на 2000 — потрібно розташовувати умови від найвужчої до найширшої." },
      { question: "Чим if (value) відрізняється від if (value === true)?", answer: "if (value) — це truthy-перевірка: вона виконає тіло для БУДЬ-ЯКОГО truthy значення (1, \"текст\", [], не лише true). if (value === true) спрацює ЛИШЕ якщо value буквально дорівнює true — якщо value truthy, але не сам boolean true (наприклад, число 1), ця умова буде false, хоча інтуїтивно очікується true." },
      { question: "Коли варто використовувати else, а коли можна обійтись без нього?", answer: "else потрібен, коли \"протилежний\" стан має власну, відмінну поведінку, яку важливо явно обробити (наприклад, показати/приховати помилку). Без else можна обійтись, якщо для false-випадку взагалі нічого робити не потрібно — зайвий порожній else лише додає шуму." },
    ],
    summary: "if / else if / else виконує рівно одну гілку — першу, чия умова істинна, тому порядок гілок критичний для перекриваючихся діапазонів. Найпідступніша помилка — = замість === в умові (присвоєння замість порівняння), яке робить умову завжди true. Для truthy-перевірки достатньо if(value), без === true.",
    proTip: "Увімкни ESLint-правило no-cond-assign — воно ловить = замість === в умовах на етапі лінтингу, ще до того, як баг потрапить у код-рев'ю чи, гірше, у продакшн.",
    nextLessonNote: "Далі — switch: зручніша альтернатива довгому else-if ланцюжку для порівняння одного значення з кількома варіантами.",
    interactiveDemo: "if-else-demo",
    practiceTask: {
      title: "Виправ межу знижки в кошику",
      description: "Функція розрахунку знижки має баг на межі: замовлення рівно на 1000 грн повинно отримувати знижку 10%, але зараз отримує 0%. Знайди й виправ помилку порівняння.",
      checklist: [
        "Сума рівно 1000 грн дає знижку 10%, а не 0%.",
        "Сума рівно 2000 грн дає знижку 20%, а не 10%.",
        "Порядок гілок лишається від найбільшої суми до найменшої.",
        "Менші суми (наприклад, 500 грн) як і раніше дають 0%.",
      ],
      starterFiles: [
        {
          id: "js-if-else-start",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<p id="result"></p>

<script>
  function getDiscount(cartTotal) {
    if (cartTotal > 2000) {
      return 20;
    } else if (cartTotal > 1000) {
      return 10;
    } else {
      return 0;
    }
  }

  document.querySelector("#result").textContent =
    "1000 грн -> " + getDiscount(1000) + "%, 2000 грн -> " + getDiscount(2000) + "%";
  // зараз показує "1000 грн -> 0%, 2000 грн -> 10%" — межі не враховані
</script>
`,
        },
      ],
      solutionFiles: [
        {
          id: "js-if-else-solution",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<p id="result"></p>

<script>
  function getDiscount(cartTotal) {
    if (cartTotal >= 2000) {
      return 20;
    } else if (cartTotal >= 1000) {
      return 10;
    } else {
      return 0;
    }
  }

  document.querySelector("#result").textContent =
    "1000 грн -> " + getDiscount(1000) + "%, 2000 грн -> " + getDiscount(2000) + "%";
  // тепер "1000 грн -> 10%, 2000 грн -> 20%"
</script>
`,
          readOnly: true,
        },
      ],
      hints: ["> виключає саме граничне значення, >= включає його — для \"від 1000 грн і вище\" потрібен >=.", "Заміни обидва порівняння (> 2000 і > 1000) на >= 2000 і >= 1000."],
      expectedOutput: "\"1000 грн -> 10%, 2000 грн -> 20%\"",
    },
    microExercises: [
      { id: "js-if-else-chain-predict", kind: "predict", prompt: "Що виведе цей код?", code: `function classify(n) {\n  if (n > 100) return "великий";\n  else if (n > 10) return "середній";\n  else return "малий";\n}\nconsole.log(classify(50));`, solution: "\"середній\" — n > 100 false, n > 10 true, тому виконується друга гілка." },
      { id: "js-assignment-in-condition-find-bug", kind: "find-the-bug", prompt: "У чому проблема цього коду?", code: `let isReady = false;\nif (isReady = true) {\n  console.log("Готово");\n}`, solution: "isReady = true — присвоєння, а не порівняння. Умова завжди отримає значення true, тому console.log виконається завжди, незалежно від того, що мало перевірятись. Потрібно isReady === true (або просто if (isReady))." },
      { id: "js-branch-order-choice", kind: "choice", prompt: "Чому в ланцюжку if/else if порядок умов для перекриваючихся діапазонів важливий?", options: ["Не важливий, JavaScript перевіряє всі умови", "JavaScript зупиняється на першій true умові, тому вузькі умови мають бути першими", "Останню умову завжди ігнорує", "Порядок впливає лише на швидкість виконання"], correctAnswer: "JavaScript зупиняється на першій true умові, тому вузькі умови мають бути першими", solution: "if/else if виконує рівно одну гілку — першу, що дає true. Якщо широка умова стоїть раніше вузької, вузька ніколи не спрацює для значень, що підходять під обидві." },
      { id: "js-truthy-if-explain", kind: "explain", prompt: "Поясни, чому if (value === true) гірше, ніж просто if (value), для перевірки truthy-значення.", solution: "if (value) виконує тіло для будь-якого truthy значення (1, \"текст\", непорожній масив тощо). if (value === true) спрацює лише якщо value буквально дорівнює boolean true — для truthy, але не буквально true значень (наприклад, число 1) ця умова несподівано дасть false, хоча логічно мала б вважатись \"так\"." },
      { id: "js-nested-if-rewrite", kind: "rewrite", prompt: "Перепиши цей код без дублювання: обидва if перевіряють протилежні умови.", code: `function checkAge(age) {\n  if (age >= 18) {\n    return "дорослий";\n  }\n  if (age < 18) {\n    return "неповнолітній";\n  }\n}`, solution: `function checkAge(age) {\n  if (age >= 18) {\n    return "дорослий";\n  } else {\n    return "неповнолітній";\n  }\n}\n// else явно обробляє протилежний випадок, без дублювання перевірки` },
    ],
    quiz: {
      id: "js-control-flow-if-else-quiz",
      title: "Швидка перевірка: Умовні оператори if",
      questions: [
        {
          id: "js-cf-q1-branch-order",
          type: "code",
          question: "Чому важливий порядок гілок у цьому коді?",
          codeSnippet: "function getDiscount(cartTotal) {\n  if (cartTotal >= 2000) {\n    return 20;\n  } else if (cartTotal >= 1000) {\n    return 10;\n  } else {\n    return 0;\n  }\n}",
          options: [
            "JavaScript зупиняється на першій true умові — якщо >= 1000 стояла б першою, сума 2500 отримала б неправильну знижку",
            "Порядок гілок ніколи не має значення",
            "else завжди виконується першим",
            "Це впливає лише на швидкість виконання функції",
          ],
          correctAnswer: "JavaScript зупиняється на першій true умові — якщо >= 1000 стояла б першою, сума 2500 отримала б неправильну знижку",
          explanation: "Для перекриваючихся діапазонів потрібно ставити найвужчу умову першою.",
        },
        {
          id: "js-cf-q2-assignment-bug",
          type: "code",
          question: "У чому проблема цього коду?",
          codeSnippet: 'let isReady = false;\nif (isReady = true) {\n  console.log("Готово");\n}',
          options: [
            "isReady = true — це присвоєння, а не порівняння; умова завжди true",
            "isReady потрібно оголосити через const",
            "console.log не можна викликати всередині if",
            "Це синтаксична помилка",
          ],
          correctAnswer: "isReady = true — це присвоєння, а не порівняння; умова завжди true",
          explanation: "= записує значення й повертає його як результат виразу. Потрібно === для порівняння.",
        },
        {
          id: "js-cf-q3-classify-predict",
          type: "code",
          question: "Що виведе цей код?",
          codeSnippet: 'function classify(n) {\n  if (n > 100) return "великий";\n  else if (n > 10) return "середній";\n  else return "малий";\n}\nconsole.log(classify(50));',
          options: ['"середній"', '"великий"', '"малий"', "undefined"],
          correctAnswer: '"середній"',
          explanation: "n > 100 false, n > 10 true, тому виконується друга гілка.",
        },
        {
          id: "js-cf-q4-truthy-vs-true",
          type: "single",
          question: "Чому if (value === true) гірше, ніж просто if (value), для перевірки truthy-значення?",
          options: [
            "if (value === true) дасть false для truthy значень, які не є буквально true (наприклад, число 1)",
            "if (value) взагалі не працює в JavaScript",
            "Різниці немає, це стилістичне питання",
            "if (value === true) швидший за виконанням",
          ],
          correctAnswer: "if (value === true) дасть false для truthy значень, які не є буквально true (наприклад, число 1)",
          explanation: "if (value) виконує тіло для будь-якого truthy значення, тоді як === true вимагає буквальної відповідності boolean true.",
        },
        {
          id: "js-cf-q5-duplicate-if-bug",
          type: "code",
          question: "У чому недолік цього коду?",
          codeSnippet: 'function checkAge(age) {\n  if (age >= 18) {\n    return "дорослий";\n  }\n  if (age < 18) {\n    return "неповнолітній";\n  }\n}',
          options: [
            "Якщо age NaN чи undefined, обидві умови false і функція поверне undefined",
            "Це найбільш ефективний спосіб написати перевірку",
            "Функція взагалі не компілюється",
            "age завжди має бути рядком",
          ],
          correctAnswer: "Якщо age NaN чи undefined, обидві умови false і функція поверне undefined",
          explanation: "Два окремих if замість if/else залишають прогалину для непередбачених значень — else гарантовано обробляє протилежний випадок.",
        },
      ],
    },
  },

  "Оператор switch": {
    whatIsIt: "switch порівнює одне значення з кількома case через строге порівняння (===) і виконує блок першого збігу. break (чи return) зупиняє виконання одразу після знайденого case; default обробляє все, що не збіглося з жодним case.",
    whyUseIt: "Бейдж статусу замовлення, іконка за типом файлу, текст повідомлення за кодом помилки — усе це порівняння ОДНОГО значення з набором фіксованих варіантів. switch читається як таблиця відповідностей \"значення -> дія\", тоді як довгий ланцюжок else if === === === швидко стає важким для сканування оком.",
    whenToUse: ["Порівняння одного значення з кількома фіксованими варіантами (статус, роль, тип файлу, код помилки).", "Коли кільком значенням потрібна та сама дія (навмисний fall-through без break між сусідніми case).", "Коли потрібен явний default для непередбаченого значення."],
    whenNotToUse: ["Не використовуй switch для порівняння діапазонів (>, <, >=) — він порівнює лише на точний збіг (===), для діапазонів залишайся на if/else if.", "Не забувай break (чи return) у кожному case — без нього виконання \"провалюється\" в наступний case.", "Не пиши багато рядків логіки прямо в одному case — виноси складну логіку в окрему функцію і виклич її."],
    comparisonTable: {
      headers: ["Ситуація", "Краще switch", "Краще if/else if"],
      rows: [
        ["Порівняння з фіксованими варіантами (статус, роль)", "так", "можливо, якщо варіантів мало"],
        ["Порівняння діапазонів (>, <)", "ні — switch не вміє", "так"],
        ["Кілька значень з однією дією", "так (fall-through)", "потрібен || в умові"],
        ["Складні комбіновані умови (&&, ||)", "незручно", "так"],
      ],
    },
    codeWalkthroughs: [
      {
        before: "Базовий switch для бейджа статусу замовлення — кожен case повертає свій текст і колір:",
        code: `function getBadge(status) {
  switch (status) {
    case "pending":
      return { text: "Очікує обробки", color: "#a16207" };
    case "shipped":
      return { text: "Відправлено", color: "#1d4ed8" };
    case "delivered":
      return { text: "Доставлено", color: "#15803d" };
    default:
      return { text: "Невідомий статус", color: "#6b7280" };
  }
}

console.log(getBadge("shipped")); // { text: "Відправлено", color: "#1d4ed8" }`,
        lineNotes: ["switch(status) порівнює status з кожним case через === зверху вниз.", "return одразу виходить з функції — тут він же виконує роль break, зупиняючи подальшу перевірку."],
      },
      {
        before: "Забутий break — виконання \"провалюється\" (fall-through) у наступний case:",
        code: `function logStatus(status) {
  switch (status) {
    case "pending":
      console.log("Очікує");
      // забутий break!
    case "shipped":
      console.log("Відправлено");
      break;
    default:
      console.log("Невідомо");
  }
}

logStatus("pending"); // виводить І "Очікує", І "Відправлено" — БАГ`,
        lineNotes: ["Без break після case \"pending\" виконання продовжується в наступний case \"shipped\", навіть якщо status не дорівнює \"shipped\".", "Правильно: додати break; одразу після console.log(\"Очікує\")."],
        after: "Забутий break — найчастіша причина \"дивної\" поведінки switch: код ніби правильний, а виводить зайве.",
      },
      {
        before: "Навмисний fall-through — кілька case, що поділяють одну дію, БЕЗ break між ними:",
        code: `function isWeekend(day) {
  switch (day) {
    case "Субота":
    case "Неділя":
      return true;
    default:
      return false;
  }
}

console.log(isWeekend("Субота")); // true
console.log(isWeekend("Понеділок")); // false`,
        lineNotes: ["case \"Субота\": без return/break одразу переходить до case \"Неділя\" — це навмисно, обидва дні мають повертати true.", "Такий навмисний fall-through варто коментувати в реальному коді, щоб колеги не подумали, що break забутий."],
      },
      {
        before: "default обробляє будь-яке непередбачене значення, навіть якщо жоден case не збігся:",
        code: `function getFileIcon(extension) {
  switch (extension) {
    case "pdf":
      return "📄";
    case "png":
    case "jpg":
      return "🖼️";
    default:
      return "📁";
  }
}

console.log(getFileIcon("docx")); // "📁" — немає такого case, спрацював default`,
        lineNotes: ["extension \"docx\" не збігається з жодним оголошеним case.", "default гарантує, що функція завжди поверне якесь значення, а не undefined для непередбаченого вводу."],
        after: "Без default непередбачене значення просто \"провалилося\" б без результату — завжди додавай default для зовнішніх даних (API, ввід користувача).",
      },
    ],
    commonMistakes: ["Забутий break (чи return) — виконання провалюється в наступний case.", "Відсутній default — непередбачене значення лишається необробленим.", "Спроба порівняти діапазон значень через case (switch порівнює лише на точний збіг).", "Великий блок логіки прямо в case замість виклику окремої функції.", "case з присвоєнням замість порівняння (плутанина, аналогічна = в if)."],
    dontDoThis: { code: `function getBadge(status) {\n  switch (status) {\n    case "pending":\n      return "Очікує";\n    case "shipped":\n      console.log("відправлено"); // забутий return/break\n    case "delivered":\n      return "Доставлено";\n  }\n}`, explanation: "Для status = \"shipped\" код провалюється в case \"delivered\" і поверне \"Доставлено\" замість очікуваного тексту для \"shipped\" — забутий return/break після console.log призводить до тихого, важко поміченого бага." },
    bestPractices: ["Завжди став break або return у кожному case, якщо навмисно не плануєш fall-through.", "Завжди додавай default — навіть якщо \"такого значення не буде\", дані ззовні (API, форми) можуть це спростувати.", "Коментуй навмисний fall-through (// навмисно без break), щоб відрізнити його від забутого.", "Виноси складну логіку кожного case в окрему функцію — сам switch має лишатись коротким диспетчером."],
    remember: ["switch порівнює через === — точний збіг, не діапазон.", "break/return зупиняє виконання; без нього — fall-through у наступний case.", "default обробляє все, що не збіглося.", "Кілька case підряд без break між ними — навмисний спільний обробник."],
    interviewQuestions: [
      { question: "Що станеться, якщо забути break у case?", answer: "Виконання \"провалюється\" (fall-through) у наступний case і виконує його код теж, незалежно від того, чи збігається його умова — це триває, доки не зустрінеться break, return, чи кінець switch. Це найчастіша причина несподіваної поведінки switch." },
      { question: "Чи можна використати switch для порівняння діапазонів (наприклад, age < 18)?", answer: "Ні, напряму не можна — switch порівнює значення через === (точний збіг), а не через нерівність. Для діапазонів потрібен if/else if, або (рідше) хитрий трюк switch(true) з булевими case, який менш читабельний і зазвичай не рекомендується." },
      { question: "Навіщо потрібен default у switch?", answer: "default обробляє будь-яке значення, що не збіглося з жодним оголошеним case — без нього непередбачений ввід (наприклад, з API чи форми) просто не отримає жодної обробки, і функція може повернути undefined замість осмисленого запасного значення." },
      { question: "Що таке навмисний fall-through і як його розпізнати в чужому коді?", answer: "Це кілька case підряд без break/return між ними, що навмисно виконують ОДНУ спільну дію для кількох значень (наприклад, case \"Субота\": case \"Неділя\": return true;). Якщо в коді немає коментаря, важко відрізнити навмисний fall-through від забутого break — тому гарна практика завжди коментувати навмисний випадок." },
    ],
    summary: "switch порівнює одне значення з кількома case через === і виконує перший збіг; break/return зупиняє виконання, інакше відбувається fall-through у наступний case. default ловить усе, що не збіглося. switch зручний для фіксованих варіантів (статус, роль, тип), але не підходить для порівняння діапазонів.",
    proTip: "Якщо ловиш себе на тому, що switch стає величезним з довгою логікою в кожному case — розглянь об'єкт-мапу (const BADGES = { pending: {...}, shipped: {...} }) замість switch. Це коротше і легше розширюється новими варіантами без зміни структури коду.",
    nextLessonNote: "Далі — truthy та falsy значення: що саме JavaScript вважає \"істинним\", коли перевіряє умову.",
    interactiveDemo: "switch-demo",
    practiceTask: {
      title: "Виправ провалля в бейджі статусу",
      description: "Функція рендерингу бейджа статусу замовлення має забутий break — статус \"shipped\" провалюється в наступний case і показує неправильний текст. Знайди й виправ помилку.",
      checklist: [
        "Кожен case має break (чи return), окрім навмисних випадків.",
        "Статус \"shipped\" показує саме \"Відправлено\", а не текст іншого статусу.",
        "default лишається на місці для непередбачених статусів.",
        "Інші статуси (pending, delivered) як і раніше працюють правильно.",
      ],
      starterFiles: [
        {
          id: "js-switch-start",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<p id="badge"></p>

<script>
  function getBadgeText(status) {
    switch (status) {
      case "pending":
        return "Очікує обробки";
      case "shipped":
        console.log("Статус: відправлено"); // забутий return!
      case "delivered":
        return "Доставлено";
      default:
        return "Невідомий статус";
    }
  }

  document.querySelector("#badge").textContent = getBadgeText("shipped");
  // зараз показує "Доставлено" замість "Відправлено"
</script>
`,
        },
      ],
      solutionFiles: [
        {
          id: "js-switch-solution",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<p id="badge"></p>

<script>
  function getBadgeText(status) {
    switch (status) {
      case "pending":
        return "Очікує обробки";
      case "shipped":
        return "Відправлено";
      case "delivered":
        return "Доставлено";
      default:
        return "Невідомий статус";
    }
  }

  document.querySelector("#badge").textContent = getBadgeText("shipped");
  // тепер "Відправлено"
</script>
`,
          readOnly: true,
        },
      ],
      hints: ["case \"shipped\" має return, а не console.log — саме тому виконання провалюється далі.", "Заміни console.log(...) на return \"Відправлено\";."],
      expectedOutput: "\"Відправлено\"",
    },
    microExercises: [
      { id: "js-switch-fallthrough-predict", kind: "predict", prompt: "Що виведе цей код?", code: `function log(x) {\n  switch (x) {\n    case 1:\n      console.log("один");\n    case 2:\n      console.log("два");\n      break;\n    default:\n      console.log("інше");\n  }\n}\nlog(1);`, solution: "\"один\", потім \"два\" — case 1 не має break, тому виконання провалюється в case 2, де вже є break, який зупиняє подальше виконання." },
      { id: "js-switch-missing-break-find-bug", kind: "find-the-bug", prompt: "У чому проблема цього коду?", code: `function getRole(code) {\n  switch (code) {\n    case "admin":\n      return "Адміністратор";\n    case "editor":\n      console.log(code);\n    case "viewer":\n      return "Переглядач";\n  }\n}`, solution: "case \"editor\" не має return/break — виконання провалюється в case \"viewer\" і повертає \"Переглядач\" замість правильної ролі для editor. Потрібно додати return \"Редактор\"; (чи подібне) у case \"editor\"." },
      { id: "js-switch-vs-if-choice", kind: "choice", prompt: "Що краще використати для перевірки age < 18 ? \"дитина\" : age < 65 ? \"дорослий\" : \"пенсіонер\"?", options: ["switch, бо це фіксовані варіанти", "if/else if, бо switch не порівнює діапазони", "Обидва однаково добре підходять", "Жодне з двох не підходить"], correctAnswer: "if/else if, бо switch не порівнює діапазони", solution: "switch порівнює лише на точний збіг (===), а тут потрібне порівняння діапазонів (<, >=) — для цього залишається if/else if." },
      { id: "js-default-explain", kind: "explain", prompt: "Поясни, чому default варто додавати навіть коли здається, що \"такого значення точно не буде\".", solution: "Дані ззовні (відповідь API, введення користувача, застаріла версія клієнта) можуть надіслати значення, якого немає в жодному case — без default функція мовчки поверне undefined замість осмисленого запасного результату, що може призвести до складних для діагностики багів у решті коду." },
      { id: "js-if-to-switch-rewrite", kind: "rewrite", prompt: "Перепиши цей ланцюжок else if на switch.", code: `function getIcon(type) {\n  if (type === "pdf") return "📄";\n  else if (type === "png" || type === "jpg") return "🖼️";\n  else return "📁";\n}`, solution: `function getIcon(type) {\n  switch (type) {\n    case "pdf":\n      return "📄";\n    case "png":\n    case "jpg":\n      return "🖼️";\n    default:\n      return "📁";\n  }\n}\n// case "png": case "jpg": ділять одну дію — навмисний fall-through` },
    ],
    quiz: {
      id: "js-control-flow-switch-quiz",
      title: "Швидка перевірка: Оператор switch",
      questions: [
        {
          id: "js-cf-q1-fallthrough-predict",
          type: "code",
          question: "Що виведе цей код?",
          codeSnippet: 'function log(x) {\n  switch (x) {\n    case 1:\n      console.log("один");\n    case 2:\n      console.log("два");\n      break;\n    default:\n      console.log("інше");\n  }\n}\nlog(1);',
          options: [
            '"один", потім "два"',
            'лише "один"',
            'лише "два"',
            '"інше"',
          ],
          correctAnswer: '"один", потім "два"',
          explanation: "case 1 не має break, тому виконання провалюється в case 2, де вже є break, який зупиняє подальше виконання.",
        },
        {
          id: "js-cf-q2-missing-break-bug",
          type: "code",
          question: "У чому проблема цього коду?",
          codeSnippet: 'function getRole(code) {\n  switch (code) {\n    case "admin":\n      return "Адміністратор";\n    case "editor":\n      console.log(code);\n    case "viewer":\n      return "Переглядач";\n  }\n}',
          options: [
            "case \"editor\" не має return/break — провалюється в case \"viewer\" і повертає неправильну роль",
            "switch не підтримує рядкові значення в case",
            "console.log не можна використовувати всередині switch",
            "Потрібен default для коректної роботи",
          ],
          correctAnswer: "case \"editor\" не має return/break — провалюється в case \"viewer\" і повертає неправильну роль",
          explanation: "Без return чи break виконання продовжується в наступний case незалежно від того, чи збігається його умова.",
        },
        {
          id: "js-cf-q3-switch-vs-if-ranges",
          type: "single",
          question: "Що краще використати для age < 18 ? \"дитина\" : age < 65 ? \"дорослий\" : \"пенсіонер\"?",
          options: [
            "if/else if, бо switch не порівнює діапазони",
            "switch, бо це фіксовані варіанти",
            "Обидва однаково добре підходять",
            "Жодне з двох не підходить",
          ],
          correctAnswer: "if/else if, бо switch не порівнює діапазони",
          explanation: "switch порівнює лише на точний збіг (===) — для порівняння діапазонів (<, >=) залишається if/else if.",
        },
        {
          id: "js-cf-q4-default-purpose",
          type: "single",
          question: "Навіщо default варто додавати навіть коли здається, що \"такого значення точно не буде\"?",
          options: [
            "Дані ззовні (API, форми) можуть надіслати значення, якого немає в жодному case",
            "default обов'язковий синтаксично для будь-якого switch",
            "default прискорює виконання switch",
            "Без default switch взагалі не компілюється",
          ],
          correctAnswer: "Дані ззовні (API, форми) можуть надіслати значення, якого немає в жодному case",
          explanation: "Без default непередбачений ввід мовчки поверне undefined замість осмисленого запасного результату.",
        },
        {
          id: "js-cf-q5-intentional-fallthrough",
          type: "code",
          question: "Що робить цей код?",
          codeSnippet: 'function isWeekend(day) {\n  switch (day) {\n    case "Субота":\n    case "Неділя":\n      return true;\n    default:\n      return false;\n  }\n}',
          options: [
            "Навмисний fall-through — обидва дні (Субота, Неділя) поділяють одну дію",
            "Це помилка — забутий break між case",
            "Функція завжди повертає true",
            "case \"Субота\" ігнорується повністю",
          ],
          correctAnswer: "Навмисний fall-through — обидва дні (Субота, Неділя) поділяють одну дію",
          explanation: "case без return/break між ними навмисно виконують одну спільну дію для кількох значень.",
        },
      ],
    },
  },

  "Truthy та falsy значення": {
    whatIsIt: "У логічному контексті (if, &&, ||, !!) JavaScript приводить будь-яке значення до true чи false. Falsy — лише 6 значень: false, 0, -0, 0n, \"\" (порожній рядок), null, undefined, NaN. Абсолютно все інше truthy — включно з \"0\", \" \", порожнім масивом [] і порожнім об'єктом {}.",
    whyUseIt: "if (value) — найчастіший вираз в інтерфейсах: чи є товари в кошику, чи заповнене поле, чи прийшли дані з мережі. Але саме тут ховається найпідступніший клас багів: порожній масив [] truthy (не falsy, як інтуїтивно очікується!), а легітимний 0 чи \"\" можуть помилково вважатись \"відсутніми\". Розуміння точного списку falsy-значень прибирає цю плутанину назавжди.",
    whenToUse: ["if (value) — швидка перевірка \"чи є значення взагалі\", коли null/undefined/0/\"\" усі мають вважатись \"порожньо\".", "!!value — явне перетворення будь-якого значення на точний boolean (наприклад, для збереження прапорця стану).", "Boolean(value) — те саме, що !!value, але явніше читається в публічному API функції."],
    whenNotToUse: ["Не перевіряй масив на \"порожній\" через if (array) — масив ЗАВЖДИ truthy, навіть порожній; потрібно if (array.length).", "Не використовуй if (value) для перевірки саме числа 0 чи рядка \"\" як легітимних даних — вони обидва falsy й будуть сприйняті як \"відсутні\".", "Не пиши if (value === true) для truthy-значень, які не є буквально true (наприклад, число 1)."],
    comparisonTable: {
      headers: ["Значення", "typeof чи вид", "truthy / falsy"],
      rows: [
        ["0", "число", "falsy"],
        ['""', "рядок", "falsy"],
        ["null", "null", "falsy"],
        ["undefined", "undefined", "falsy"],
        ["NaN", "число", "falsy"],
        ['"0"', "непорожній рядок", "truthy!"],
        ["[]", "порожній масив (об'єкт)", "truthy!"],
        ["{}", "порожній об'єкт", "truthy!"],
      ],
    },
    codeWalkthroughs: [
      {
        before: "Повний список falsy-значень — лише 6, усе інше truthy:",
        code: `console.log(Boolean(false)); // false
console.log(Boolean(0)); // false
console.log(Boolean("")); // false
console.log(Boolean(null)); // false
console.log(Boolean(undefined)); // false
console.log(Boolean(NaN)); // false

console.log(Boolean(1)); // true
console.log(Boolean("текст")); // true`,
        lineNotes: ["Це вичерпний список: false, 0, \"\", null, undefined, NaN (і рідкісні -0, 0n).", "Будь-яке інше значення — число, відмінне від 0, будь-який непорожній рядок — truthy."],
      },
      {
        before: "Найпідступніший gotcha: [] і {} truthy, навіть коли порожні, бо це об'єкти:",
        code: `if ([]) {
  console.log("Виконається!"); // так, [] truthy
}

if ({}) {
  console.log("Теж виконається!"); // так, {} truthy
}`,
        lineNotes: ["[] — це об'єкт (масив), а всі об'єкти truthy, незалежно від того, скільки в них елементів.", "Це єдина причина, чому \"перевірка на порожній масив\" через if(array) НЕ працює так, як інтуїтивно очікується."],
        after: "Це джерело одного з найчастіших багів у коді новачків: список товарів \"порожній\", але if(products) все одно true.",
      },
      {
        before: "Правильна перевірка порожнього кошика — через .length, а не через сам масив:",
        code: `const cart = [];

if (cart) {
  console.log("Це виконається, бо масив truthy — БАГ у логіці");
}

if (cart.length) {
  console.log("Це НЕ виконається — правильна перевірка");
} else {
  console.log("Кошик порожній"); // правильно виводиться це
}`,
        lineNotes: ["cart truthy незалежно від вмісту — перевірка if(cart) завжди пропустить цю гілку, навіть для порожнього кошика.", "cart.length — число (0 для порожнього масиву), і 0 falsy — саме це і потрібно для перевірки \"чи є товари\"."],
      },
      {
        before: "!!value — ідіома явного перетворення будь-якого значення на точний boolean:",
        code: `const searchQuery = "";

const hasQuery = !!searchQuery; // false
console.log(hasQuery); // false, явний boolean, а не порожній рядок

const isMenuOpen = !!document.querySelector("#menu.open");
console.log(typeof isMenuOpen); // "boolean"`,
        lineNotes: ["Перший ! перетворює значення на протилежний boolean (заперечення), другий ! повертає його назад — у результаті точний true/false замість оригінального типу.", "Корисно, коли потрібно зберегти саме boolean-прапорець (наприклад, у стані), а не оригінальне значення, яке лише truthy/falsy."],
      },
    ],
    commonMistakes: ["if (array) замість if (array.length) для перевірки \"чи масив порожній\".", "if (object) замість перевірки конкретної властивості для \"чи об'єкт має дані\".", "Сприйняття 0 чи \"\" як \"відсутніх\" даних, хоча вони можуть бути легітимними значеннями.", "if (value === true) замість простого if (value) для truthy-перевірки.", "Забування, що NaN falsy, але typeof NaN === \"number\" — виглядає як число, поводиться як falsy."],
    dontDoThis: { code: `function renderProducts(products) {\n  if (products) {\n    return products.map(p => p.name).join(", ");\n  }\n  return "Товарів немає";\n}\n\nconsole.log(renderProducts([])); // ""  — БАГ: мало бути "Товарів немає"`, explanation: "Порожній масив [] truthy, тому if(products) виконується, і .map() на порожньому масиві повертає порожній рядок замість очікуваного повідомлення \"Товарів немає\". Потрібно перевіряти products.length, а не сам масив." },
    bestPractices: ["Для масивів завжди перевіряй .length, ніколи сам масив напряму.", "Для об'єктів перевіряй конкретну властивість чи Object.keys(obj).length, а не сам об'єкт.", "Використовуй !!value чи Boolean(value), коли потрібно зберегти саме точний boolean, а не оригінальне truthy/falsy значення.", "Тримай в пам'яті точний список falsy: false, 0, \"\", null, undefined, NaN — усе решта truthy."],
    remember: ["Falsy лише 6 значень: false, 0, \"\", null, undefined, NaN.", "[] і {} truthy, навіть порожні — вони об'єкти.", "Для масивів перевіряй .length, не сам масив.", "!!value — ідіома явного перетворення на точний boolean."],
    interviewQuestions: [
      { question: "Перелічи всі falsy-значення в JavaScript.", answer: "false, 0 (і -0), 0n (BigInt нуль), порожній рядок \"\", null, undefined і NaN. Це вичерпний список — усе інше, включно з порожніми масивами й об'єктами, truthy." },
      { question: "Чому if ([]) виконує своє тіло, хоча масив порожній?", answer: "Порожній масив — це все одно об'єкт, а будь-який об'єкт у JavaScript truthy незалежно від його вмісту. truthy/falsy визначається типом значення й тим, чи це один із 6 falsy-варіантів, а не тим, \"скільки в ньому даних\"." },
      { question: "Як правильно перевірити, чи масив порожній?", answer: "Через array.length: порожній масив має length === 0, а 0 — falsy значення, тому if (array.length) коректно визначає \"є елементи чи ні\". Перевірка if (array) завжди дасть true, незалежно від вмісту." },
      { question: "Навіщо потрібна ідіома !!value?", answer: "Вона явно перетворює будь-яке значення (truthy чи falsy, будь-якого типу) на точний примітив boolean true/false. Це корисно, коли потрібно зберегти саме булевий прапорець (наприклад, у стані компонента), а не оригінальне значення, яке лише поводиться як truthy/falsy в умовах." },
    ],
    summary: "Falsy — вичерпний список із 6 значень: false, 0, \"\", null, undefined, NaN. Усе інше truthy, включно з порожніми масивами [] і об'єктами {} — це найчастіша прихована помилка при перевірці \"чи є дані\". Для масивів завжди перевіряй .length, а !!value/Boolean(value) використовуй, коли потрібен саме точний boolean.",
    proTip: "На код-рев'ю звертай увагу на кожен if (someArray) чи if (someObject) без .length чи перевірки конкретної властивості — це кандидат на приховану помилку \"порожній, але truthy\".",
    nextLessonNote: "Далі — цикли та ітерація: як повторювати дію для кожного елемента масиву чи поки умова true.",
    interactiveDemo: "truthy-falsy-demo",
    practiceTask: {
      title: "Виправ перевірку порожнього списку товарів",
      description: "Сторінка повинна показувати \"Товарів немає\" для порожнього масиву, але зараз показує порожній рядок через неправильну перевірку truthy. Знайди й виправ баг.",
      checklist: [
        "Порожній масив показує \"Товарів немає\".",
        "Непорожній масив показує список назв товарів через кому.",
        "Перевірка використовує products.length, а не сам масив.",
      ],
      starterFiles: [
        {
          id: "js-truthy-start",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<p id="output"></p>

<script>
  const products = [];

  function renderProducts(items) {
    if (items) {
      return items.map((item) => item.name).join(", ");
    }
    return "Товарів немає";
  }

  document.querySelector("#output").textContent = renderProducts(products);
  // зараз показує порожній рядок замість "Товарів немає"
</script>
`,
        },
      ],
      solutionFiles: [
        {
          id: "js-truthy-solution",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<p id="output"></p>

<script>
  const products = [];

  function renderProducts(items) {
    if (items.length) {
      return items.map((item) => item.name).join(", ");
    }
    return "Товарів немає";
  }

  document.querySelector("#output").textContent = renderProducts(products);
  // тепер "Товарів немає"
</script>
`,
          readOnly: true,
        },
      ],
      hints: ["Порожній масив [] truthy — if(items) завжди виконається, незалежно від вмісту.", "Заміни if (items) на if (items.length)."],
      expectedOutput: "\"Товарів немає\"",
    },
    microExercises: [
      { id: "js-empty-array-predict", kind: "predict", prompt: "Що виведе цей код?", code: `if ([]) {\n  console.log("truthy");\n} else {\n  console.log("falsy");\n}`, solution: "\"truthy\" — порожній масив все одно об'єкт, а об'єкти завжди truthy, незалежно від вмісту." },
      { id: "js-falsy-list-choice", kind: "choice", prompt: "Яке з цих значень НЕ входить у список falsy?", options: ["0", "\"\"", "\"0\"", "null"], correctAnswer: "\"0\"", solution: "\"0\" — непорожній рядок (містить символ \"0\"), тому truthy. Falsy лише сам примітив 0 (число), не рядок з текстом \"0\"." },
      { id: "js-empty-array-check-find-bug", kind: "find-the-bug", prompt: "У чому проблема цієї перевірки?", code: `const cart = [];\nif (cart) {\n  console.log("У кошику є товари");\n}`, solution: "cart truthy, бо це масив (об'єкт), незалежно від того, порожній він чи ні. Умова виконається навіть для порожнього кошика. Потрібно перевіряти cart.length, а не сам масив." },
      { id: "js-double-bang-explain", kind: "explain", prompt: "Поясни, як працює !!value і навіщо він потрібен.", solution: "Перший ! перетворює value на протилежний точний boolean (заперечення truthy/falsy). Другий ! перетворює його назад, отримуючи точний true/false, що відповідає початковій truthy/falsy оцінці value. Це зручно, коли потрібно зберегти саме булевий прапорець, а не оригінальне значення." },
      { id: "js-boolean-rewrite", kind: "rewrite", prompt: "Перепиши цю перевірку, використавши .length замість прямої перевірки масиву.", code: `function hasItems(list) {\n  return Boolean(list);\n}`, solution: `function hasItems(list) {\n  return list.length > 0;\n}\n// або return Boolean(list.length); — перевіряє саме кількість елементів, а не сам факт існування масиву` },
    ],
    quiz: {
      id: "js-control-flow-truthy-falsy-quiz",
      title: "Швидка перевірка: Truthy та falsy значення",
      questions: [
        {
          id: "js-cf-q1-empty-array-truthy",
          type: "code",
          question: "Що виведе цей код?",
          codeSnippet: 'if ([]) {\n  console.log("truthy");\n} else {\n  console.log("falsy");\n}',
          options: ['"truthy"', '"falsy"', "TypeError", "undefined"],
          correctAnswer: '"truthy"',
          explanation: "Порожній масив все одно об'єкт, а об'єкти завжди truthy, незалежно від вмісту.",
        },
        {
          id: "js-cf-q2-falsy-list",
          type: "single",
          question: "Яке з цих значень НЕ входить у список falsy?",
          options: ["0", '""', '"0"', "null"],
          correctAnswer: '"0"',
          explanation: '"0" — непорожній рядок (містить символ "0"), тому truthy. Falsy лише сам примітив 0 (число), не рядок з текстом "0".',
        },
        {
          id: "js-cf-q3-empty-array-check-bug",
          type: "code",
          question: "У чому проблема цієї перевірки?",
          codeSnippet: 'const cart = [];\nif (cart) {\n  console.log("У кошику є товари");\n}',
          options: [
            "cart truthy, бо це масив, незалежно від того, порожній він чи ні",
            "cart потрібно оголосити через let",
            "if не можна використовувати з масивами",
            "console.log поза функцією не працює",
          ],
          correctAnswer: "cart truthy, бо це масив, незалежно від того, порожній він чи ні",
          explanation: "Потрібно перевіряти cart.length, а не сам масив.",
        },
        {
          id: "js-cf-q4-double-bang",
          type: "single",
          question: "Як працює вираз !!value?",
          options: [
            "Перший ! заперечує truthy/falsy, другий ! повертає точний true/false",
            "Він завжди повертає true",
            "Він перевіряє, чи value є числом",
            "Це синтаксична помилка в JavaScript",
          ],
          correctAnswer: "Перший ! заперечує truthy/falsy, другий ! повертає точний true/false",
          explanation: "!!value — ідіома явного перетворення будь-якого значення на точний примітив boolean.",
        },
        {
          id: "js-cf-q5-falsy-count",
          type: "single",
          question: "Скільки всього значень у JavaScript вважаються falsy?",
          options: ["6", "3", "10", "Нескінченна кількість"],
          correctAnswer: "6",
          explanation: "false, 0, \"\", null, undefined, NaN (плюс рідкісні -0 і 0n) — це вичерпний список.",
        },
      ],
    },
  },

  "Цикли та ітерація": {
    whatIsIt: "Цикл повторює блок коду задану кількість разів або поки умова true. for — коли кількість ітерацій відома заздалегідь (за лічильником чи довжиною масиву); while — коли ітерацій невідомо, є лише умова продовження; for...of — проходить по ЗНАЧЕННЯХ ітерованого об'єкта (масив, рядок); for...in — проходить по КЛЮЧАХ (індексах чи властивостях) об'єкта.",
    whyUseIt: "Рендер списку товарів, підрахунок суми кошика, повторний запит поки не прийде відповідь — усе це цикли. Правильний вибір типу циклу і правильна межа (< чи <=) визначають, чи обробляться всі елементи рівно один раз, без пропусків і без зайвих ітерацій за межами масиву.",
    whenToUse: ["for...of — коли потрібні саме ЗНАЧЕННЯ елементів масиву чи рядка, без індексу.", "Класичний for — коли потрібен індекс елемента (наприклад, для порівняння із сусіднім) чи точний контроль межі.", "while — коли кількість ітерацій наперед невідома, є лише умова продовження (наприклад, \"поки в черзі є завдання\").", "do...while — коли тіло має виконатись хоча б ОДИН раз, навіть якщо умова одразу false."],
    whenNotToUse: ["Не використовуй for...in для масивів — він перебирає індекси як РЯДКИ і може захопити успадковані властивості; для масивів завжди for...of чи .forEach/.map.", "Не пиши цикл без чіткого умови завершення чи без інкременту лічильника — це пряма дорога до нескінченного циклу, що \"підвісить\" вкладку браузера.", "Не змінюй довжину масиву (push/splice) прямо всередині циклу, що його перебирає — індекси зсуваються, і легко пропустити чи двічі обробити елемент.", "Не використовуй <= для межі за .length — items[items.length] завжди undefined, це класичний off-by-one."],
    comparisonTable: {
      headers: ["Конструкція", "Коли зупиняється", "Дає"],
      rows: [
        ["for", "коли умова лічильника false", "індекс i, керуєш межами вручну"],
        ["while", "коли умова false", "лише умова, без вбудованого лічильника"],
        ["do...while", "коли умова false, ПІСЛЯ першого виконання", "тіло виконується мінімум 1 раз"],
        ["for...of", "коли перебрано всі значення", "саме значення елемента"],
        ["for...in", "коли перебрано всі ключі", "ключ (індекс чи ім'я властивості) як рядок"],
      ],
    },
    codeWalkthroughs: [
      {
        before: "Класичний for з чітким контролем меж — рендер пронумерованого списку товарів:",
        code: `const products = ["Ноутбук", "Мишка", "Клавіатура"];
let html = "";

for (let i = 0; i < products.length; i++) {
  html += \`\${i + 1}. \${products[i]}\\n\`;
}

console.log(html);
// 1. Ноутбук
// 2. Мишка
// 3. Клавіатура`,
        lineNotes: ["i < products.length — межа виключає products.length, бо останній валідний індекс на 1 менший за довжину масиву.", "i + 1 у виводі — індекси масиву від 0, а нумерація для людей зазвичай від 1."],
      },
      {
        before: "for...of — простіший запис, коли індекс не потрібен, лише самі значення:",
        code: `const cart = [{ name: "Книга", price: 300 }, { name: "Ручка", price: 20 }];
let total = 0;

for (const item of cart) {
  total += item.price;
}

console.log(total); // 320`,
        lineNotes: ["for...of дає ОДРАЗУ сам об'єкт item, без потреби писати cart[i].", "Немає ризику off-by-one — for...of сам гарантовано перебирає всі елементи рівно по одному разу."],
      },
      {
        before: "while — коли кількість ітерацій наперед невідома, лише умова продовження:",
        code: `let itemsInQueue = 5;

while (itemsInQueue > 0) {
  console.log(\`Обробка завдання, лишилось: \${itemsInQueue}\`);
  itemsInQueue--;
}

console.log("Черга порожня");`,
        lineNotes: ["Умова itemsInQueue > 0 перевіряється ПЕРЕД кожною ітерацією — якщо вона одразу false, тіло не виконається жодного разу.", "itemsInQueue-- обов'язковий — без зменшення лічильника цикл ніколи не завершиться."],
      },
      {
        before: "Off-by-one: <= замість < додає зайву ітерацію за межами масиву:",
        code: `const colors = ["червоний", "зелений", "синій"];

for (let i = 0; i <= colors.length; i++) {
  console.log(colors[i]);
}
// "червоний", "зелений", "синій", undefined — зайва ітерація!`,
        lineNotes: ["colors.length дорівнює 3, а останній валідний індекс — 2 (colors[2] = \"синій\").", "i <= 3 дозволяє i дійти до 3, а colors[3] не існує — виводиться undefined."],
        after: "Правило простеньке, але легко забути під тиском дедлайну: для .length завжди <, ніколи <=.",
      },
      {
        before: "do...while — єдиний цикл, що виконує тіло СПОЧАТКУ, а умову перевіряє лише ПІСЛЯ:",
        code: `let page = 1;
const totalPages = 3;

do {
  console.log(\`Показуємо сторінку \${page} з \${totalPages}\`);
  page++;
} while (page <= totalPages);

// "Показуємо сторінку 1 з 3"
// "Показуємо сторінку 2 з 3"
// "Показуємо сторінку 3 з 3"`,
        lineNotes: ["Тіло do { ... } виконується ОДИН раз ще ДО першої перевірки while (...) — на відміну від for/while, де умова перевіряється спершу.", "Навіть якби totalPages дорівнював 0 з самого початку, перша сторінка все одно показалась би хоча б раз — саме в цьому й полягає сенс do...while."],
        after: "Замінивши do...while на звичайний while (page <= totalPages) з totalPages = 0, тіло не виконалось би ЖОДНОГО разу — різниця між циклами саме в цьому одному запуску наперед.",
      },
      {
        before: "for...in — перебирає КЛЮЧІ звичайного об'єкта (не масиву!), а не значення:",
        code: `const prices = { хліб: 25, молоко: 40, яйця: 60 };

for (const key in prices) {
  console.log(\`\${key}: \${prices[key]} грн\`);
}
// "хліб: 25 грн"
// "молоко: 40 грн"
// "яйця: 60 грн"`,
        lineNotes: ["key на кожній ітерації — це РЯДОК з іменем властивості (\"хліб\", \"молоко\", \"яйця\"), а не саме число ціни.", "prices[key] — стандартний спосіб дістати значення властивості за її іменем-ключем усередині циклу.", "for...in створений саме для звичайних об'єктів {} — для масивів безпечніший for...of (дивись приклад і застереження вище)."],
      },
    ],
    commonMistakes: ["<= замість < при порівнянні з .length — зайва ітерація й undefined.", "Забутий інкремент лічильника (i++) — нескінченний цикл, що підвішує сторінку.", "for...in на масиві замість for...of — індекси як рядки, ризик захопити успадковані властивості.", "Зміна масиву (push/splice) прямо всередині циклу, що його перебирає.", "Оголошення лічильника без let/const (просто i = 0) — випадково створює глобальну змінну."],
    dontDoThis: { code: `const items = ["a", "b", "c"];\nfor (let i = 0; i <= items.length; i++) {\n  console.log(items[i].toUpperCase());\n}\n// TypeError: Cannot read properties of undefined`, explanation: "i <= items.length дозволяє i дійти до 3, а items[3] — undefined. Виклик .toUpperCase() на undefined кидає TypeError і зупиняє виконання скрипта. Мало бути i < items.length." },
    bestPractices: ["Для перебору значень масиву за замовчуванням бери for...of чи .forEach/.map, не класичний for.", "Класичний for лишай для випадків, коли справді потрібен індекс чи нестандартний крок (i += 2).", "Завжди перевіряй межу з < для .length, ніколи <=.", "Ніколи не змінюй масив, що зараз перебирається, — спочатку збери зміни в новий масив.", "Завжди оголошуй лічильник через let (для for) чи const (для for...of)."],
    remember: ["for...of дає значення, for...in дає ключі (і не годиться для масивів).", "< для .length, ніколи <= — off-by-one найчастіша помилка циклів.", "while перевіряє умову ПЕРЕД кожною ітерацією; do...while — виконує тіло хоча б раз.", "Забутий інкремент/зміна умови — пряма причина нескінченного циклу."],
    interviewQuestions: [
      { question: "Чим for...of відрізняється від for...in?", answer: "for...of перебирає ЗНАЧЕННЯ ітерованого об'єкта (елементи масиву, символи рядка) — for (const item of array). for...in перебирає КЛЮЧІ об'єкта (для масиву — індекси як рядки, для об'єкта — імена властивостей), включно з успадкованими через прототип, що робить його непридатним для масивів." },
      { question: "Що таке off-by-one помилка і як вона виникає в циклах?", answer: "Це помилка на межі циклу, коли він виконує на одну ітерацію більше чи менше, ніж потрібно — найчастіше через i <= array.length замість i < array.length. Оскільки останній валідний індекс масиву — length - 1, умова з <= дозволяє i дійти до length, а елемента з таким індексом не існує (undefined)." },
      { question: "У чому різниця між while і do...while?", answer: "while перевіряє умову ПЕРЕД кожним виконанням тіла — якщо умова одразу false, тіло не виконається жодного разу. do...while виконує тіло СПОЧАТКУ, а умову перевіряє ПІСЛЯ — тому тіло завжди виконається хоча б один раз, навіть якщо умова від початку false." },
      { question: "Чому for...in вважається небезпечним для масивів?", answer: "for...in перебирає всі перелічувані (enumerable) властивості об'єкта, включно з успадкованими через прототипний ланцюжок, а для масиву індекси повертаються як РЯДКИ (\"0\", \"1\"), а не числа. Це може призвести до неочікуваних додаткових ітерацій чи помилок при арифметичних операціях з індексом." },
    ],
    summary: "for — коли потрібен точний контроль межі чи індекс; for...of — простіший і безпечніший спосіб перебрати значення масиву; while — коли кількість ітерацій заздалегідь невідома. Найчастіша помилка циклів — off-by-one через <= замість < при порівнянні з .length; для масивів завжди перевага for...of над for...in.",
    proTip: "Якщо ловиш себе на написанні класичного for лише для того, щоб перебрати значення масиву без індексу — став for...of чи .forEach: коротше, читабельніше, і взагалі неможливо зробити off-by-one помилку.",
    nextLessonNote: "Далі — guard-конструкції: як позбутись глибокої вкладеності if через ранній вихід з функції.",
    interactiveDemo: "loop-demo",
    practiceTask: {
      title: "Виправ off-by-one помилку в списку кольорів",
      description: "Цикл повинен вивести рівно 3 кольори з масиву, але зараз виводить четвертий, неіснуючий елемент як undefined. Знайди й виправ помилку межі.",
      checklist: ["Виводяться рівно 3 кольори: червоний, зелений, синій.", "Немає рядка undefined у виводі.", "Межа циклу порівнюється з .length через <, а не <=."],
      starterFiles: [
        {
          id: "js-loop-start",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<p id="output"></p>

<script>
  const colors = ["червоний", "зелений", "синій"];
  let result = "";

  for (let i = 0; i <= colors.length; i++) {
    result += colors[i] + ", ";
  }

  document.querySelector("#output").textContent = result;
  // зараз показує "червоний, зелений, синій, undefined, "
</script>
`,
        },
      ],
      solutionFiles: [
        {
          id: "js-loop-solution",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<p id="output"></p>

<script>
  const colors = ["червоний", "зелений", "синій"];
  let result = "";

  for (let i = 0; i < colors.length; i++) {
    result += colors[i] + ", ";
  }

  document.querySelector("#output").textContent = result;
  // тепер "червоний, зелений, синій, "
</script>
`,
          readOnly: true,
        },
      ],
      hints: ["colors.length дорівнює 3, а останній валідний індекс — 2.", "Заміни <= colors.length на < colors.length."],
      expectedOutput: "\"червоний, зелений, синій, \"",
    },
    microExercises: [
      { id: "js-for-of-sum-predict", kind: "predict", prompt: "Що виведе цей код?", code: `const prices = [100, 200, 300];\nlet total = 0;\nfor (const price of prices) {\n  total += price;\n}\nconsole.log(total);`, solution: "600 — for...of дає саме числові значення масиву, і total коректно підсумовує всі три ціни." },
      { id: "js-for-in-array-find-bug", kind: "find-the-bug", prompt: "У чому проблема цього коду?", code: `const prices = [100, 200, 300];\nlet total = 0;\nfor (const i in prices) {\n  total += i;\n}\nconsole.log(total);`, solution: "for...in дає індекси як РЯДКИ (\"0\", \"1\", \"2\"), а не самі значення. total += i додає рядки до числа через приведення типів, тому результат — не сума цін (600), а рядок \"0012\", отриманий конкатенацією. Потрібно for...of prices (для значень) чи prices[i], а не сам індекс i." },
      { id: "js-loop-boundary-choice", kind: "choice", prompt: "Яка межа циклу for коректно перебирає ВСІ елементи масиву items без off-by-one помилки?", options: ["i <= items.length", "i < items.length", "i < items.length + 1", "i <= items.length + 1"], correctAnswer: "i < items.length", solution: "Останній валідний індекс масиву — items.length - 1, тому умова i < items.length зупиняє цикл рівно після обробки цього індексу, без зайвих ітерацій." },
      { id: "js-for-of-vs-in-explain", kind: "explain", prompt: "Поясни, чому for...of безпечніший за for...in для перебору масивів.", solution: "for...of перебирає САМІ значення елементів масиву напряму, гарантовано рівно по одному разу для кожного елемента. for...in перебирає перелічувані властивості об'єкта як рядкові ключі, включно з успадкованими через прототип, і для масивів дає індекси як рядки — це може призвести до неочікуваної поведінки чи помилок, яких for...of повністю уникає." },
      { id: "js-for-to-for-of-rewrite", kind: "rewrite", prompt: "Перепиши цей код, використавши for...of замість класичного for з невикористаним індексом.", code: `const names = ["Оля", "Максим", "Ірина"];\nlet greeting = "";\nfor (let i = 0; i < names.length; i++) {\n  greeting += "Привіт, " + names[i] + "! ";\n}`, solution: `const names = ["Оля", "Максим", "Ірина"];\nlet greeting = "";\nfor (const name of names) {\n  greeting += "Привіт, " + name + "! ";\n}\n// for...of — індекс не потрібен, лише самі значення` },
      { id: "js-do-while-predict", kind: "predict", prompt: "Скільки разів виведеться повідомлення в консоль?", code: `let tickets = 0;\n\ndo {\n  console.log("Видано квиток №" + (tickets + 1));\n  tickets++;\n} while (tickets < 0);`, solution: "1 раз — \"Видано квиток №1\". Умова tickets < 0 із самого початку false (0 < 0 — false), але do...while ВСЕ ОДНО виконує тіло один раз ДО першої перевірки умови — це і є головна відмінність do...while від звичайного while." },
    ],
    quiz: {
      id: "js-control-flow-loops-quiz",
      title: "Швидка перевірка: Цикли та ітерація",
      questions: [
        {
          id: "js-cf-q1-for-of-sum",
          type: "code",
          question: "Що виведе цей код?",
          codeSnippet: "const prices = [100, 200, 300];\nlet total = 0;\nfor (const price of prices) {\n  total += price;\n}\nconsole.log(total);",
          options: ["600", '"100200300"', "0", "undefined"],
          correctAnswer: "600",
          explanation: "for...of дає саме числові значення масиву, тому total коректно підсумовує всі три ціни.",
        },
        {
          id: "js-cf-q2-for-in-array-bug",
          type: "code",
          question: "У чому проблема цього коду?",
          codeSnippet: "const prices = [100, 200, 300];\nlet total = 0;\nfor (const i in prices) {\n  total += i;\n}",
          options: [
            "for...in дає індекси як рядки (\"0\", \"1\", \"2\"), а не самі значення",
            "for...in не можна використовувати з масивами синтаксично",
            "total має бути оголошена через const",
            "prices потрібно спочатку відсортувати",
          ],
          correctAnswer: "for...in дає індекси як рядки (\"0\", \"1\", \"2\"), а не самі значення",
          explanation: "total += i додає рядки-індекси до числа через приведення типів, а не реальні ціни. Потрібен for...of для значень масиву.",
        },
        {
          id: "js-cf-q3-off-by-one",
          type: "single",
          question: "Яка межа циклу for коректно перебирає всі елементи масиву items без off-by-one помилки?",
          options: ["i <= items.length", "i < items.length", "i < items.length + 1", "i <= items.length + 1"],
          correctAnswer: "i < items.length",
          explanation: "Останній валідний індекс масиву — items.length - 1, тому умова i < items.length зупиняє цикл рівно після цього індексу.",
        },
        {
          id: "js-cf-q4-for-of-vs-in-safety",
          type: "single",
          question: "Чому for...of безпечніший за for...in для перебору масивів?",
          options: [
            "for...in може захопити успадковані властивості й дає індекси як рядки",
            "for...of працює швидше на рівні виконання коду",
            "for...in взагалі не підтримується сучасними браузерами",
            "Різниці немає, обидва еквівалентні для масивів",
          ],
          correctAnswer: "for...in може захопити успадковані властивості й дає індекси як рядки",
          explanation: "for...of перебирає самі значення елементів гарантовано по одному разу, тоді як for...in створений для звичайних об'єктів, не масивів.",
        },
        {
          id: "js-cf-q5-do-while-runs-once",
          type: "code",
          question: "Скільки разів виведеться повідомлення в консоль?",
          codeSnippet: 'let tickets = 0;\ndo {\n  console.log("Видано квиток №" + (tickets + 1));\n  tickets++;\n} while (tickets < 0);',
          options: ["1 раз", "0 разів", "Нескінченно", "2 рази"],
          correctAnswer: "1 раз",
          explanation: "Умова tickets < 0 із самого початку false, але do...while все одно виконує тіло один раз ДО першої перевірки умови.",
        },
      ],
    },
  },

  "Guard-конструкції": {
    whatIsIt: "Guard-конструкція (early return / охоронний вираз) — це if на самому початку функції, що перевіряє невалідну чи крайню умову і одразу виходить (return, break, continue), не заглиблюючись у вкладені if. Основна логіка функції лишається на одному рівні вкладеності, без пірамід if усередині if усередині if.",
    whyUseIt: "Функції валідації форми, обробники замовлення, будь-яка логіка з кількома попередніми умовами (чи заповнене поле, чи авторизований користувач, чи є товари в кошику) швидко перетворюються на вкладені if у 3-4 рівні, які важко читати й тестувати. Guard-конструкції розвертають цю логіку: спочатку відсіюємо все \"не так\", а основний, \"щасливий\" шлях лишається чистим і на поверхні.",
    whenToUse: ["Валідація вхідних параметрів функції на самому початку (null, undefined, порожній рядок, від'ємне число).", "Обробники форм: перевірка кожного невалідного поля з return early перед основною логікою відправки.", "Усередині циклу — continue як guard, щоб пропустити невалідний елемент і продовжити з наступним.", "Функції з кількома незалежними передумовами, які всі мають бути виконані для основної дії."],
    whenNotToUse: ["Не перетворюй guard-конструкції на нескінченну стіну з 10+ ранніх return — якщо умов забагато, винеси перевірку в окрему функцію validate().", "Не використовуй ранній return замість повноцінної обробки помилки, коли користувачу потрібне зрозуміле повідомлення, а не тиха відмова.", "Не плутай guard-конструкцію (перевірка \"неправильного\" стану) з основною бізнес-логікою — guard завжди про ранній вихід, а не про обчислення результату."],
    comparisonTable: {
      headers: ["Підхід", "Рівень вкладеності", "Читабельність"],
      rows: [
        ["Вкладені if (піраміда)", "росте з кожною умовою", "важко читати, легко загубити дужку"],
        ["Guard-конструкції", "лишається на 1 рівні", "кожна умова — окремий, зрозумілий рядок"],
        ["Guard + основна логіка", "перевірки зверху, логіка знизу", "\"щасливий шлях\" видно одразу, без прокрутки"],
      ],
    },
    codeWalkthroughs: [
      {
        before: "Спершу найпростіший приклад на одну умову — guard-конструкція це просто \"якщо щось не так — вийди одразу\":",
        code: `function safeDivide(a, b) {
  if (b === 0) return "Ділити на нуль не можна"; // guard: перевіряємо "поганий" випадок і виходимо

  return a / b; // якщо дійшли сюди — b точно не 0, можна ділити спокійно
}

console.log(safeDivide(10, 2)); // 5
console.log(safeDivide(10, 0)); // "Ділити на нуль не можна"`,
        lineNotes: ["Один рядок if (b === 0) return ...; — це і є вся guard-конструкція: перевірка \"поганого\" випадку плюс негайний вихід через return.", "Другий рядок (return a / b;) — це \"основна\" робота функції, і вона зовсім не вкладена всередину if — вона просто йде далі, коли перша перевірка не спрацювала."],
        after: "Це і є весь принцип. У складніших функціях guard-умов буде кілька підряд — дивись наступний приклад із трьома.",
      },
      {
        before: "Функція з глибокою вкладеністю — три рівні if один усередині одного:",
        code: `function processOrder(cart, user) {
  if (cart.length > 0) {
    if (user.isLoggedIn) {
      if (user.address) {
        return "Замовлення оформлено!";
      } else {
        return "Вкажіть адресу доставки";
      }
    } else {
      return "Спочатку увійдіть в акаунт";
    }
  } else {
    return "Кошик порожній";
  }
}`,
        lineNotes: ["Три рівні вкладеності, щоб дістатись до \"щасливого\" шляху — код читається знизу вгору, важко одразу побачити основну дію.", "Кожен else дублює структуру if — легко переплутати, яка умова якому else відповідає."],
        after: "Та сама логіка через guard-конструкції — дивись наступний приклад.",
      },
      {
        before: "Та ж функція, переписана через guard-конструкції — рівно один рівень вкладеності:",
        code: `function processOrder(cart, user) {
  if (cart.length === 0) return "Кошик порожній";
  if (!user.isLoggedIn) return "Спочатку увійдіть в акаунт";
  if (!user.address) return "Вкажіть адресу доставки";

  return "Замовлення оформлено!";
}`,
        lineNotes: ["Кожна guard-умова перевіряє НЕВАЛІДНИЙ (протилежний) стан і одразу виходить — читається як список передумов.", "Основна дія (\"Замовлення оформлено!\") стоїть останньою, без вкладеності — це і є \"щасливий шлях\"."],
      },
      {
        before: "Guard-конструкція для валідації параметра функції — захист від некоректного вводу:",
        code: `function calculateDiscount(price) {
  if (typeof price !== "number" || price < 0) {
    return 0;
  }

  if (price >= 2000) return price * 0.2;
  if (price >= 1000) return price * 0.1;
  return 0;
}

console.log(calculateDiscount(-500)); // 0, а не NaN чи помилка`,
        lineNotes: ["Перша guard-умова відсіює некоректний ввід (не число чи від'ємне значення) ДО того, як почнеться основна логіка розрахунку.", "Без цієї перевірки calculateDiscount(-500) пройшла б у гілки нижче й повернула б 0 випадково, а не свідомо — а для рядка чи undefined результат був би NaN."],
      },
      {
        before: "continue як guard усередині циклу — пропускає невалідний елемент, не зупиняючи цикл:",
        code: `const emails = ["ivan@mail.com", "", "olena@mail.com", null];
const validEmails = [];

for (const email of emails) {
  if (!email) continue; // guard: пропускаємо порожні/відсутні значення

  validEmails.push(email);
}

console.log(validEmails); // ["ivan@mail.com", "olena@mail.com"]`,
        lineNotes: ["continue одразу переходить до наступної ітерації, минаючи решту тіла циклу для цього елемента.", "Без guard довелось би обгортати весь код циклу в if (email) { ... }, додаючи зайвий рівень вкладеності."],
      },
    ],
    commonMistakes: ["Guard-умова, що НЕ виходить (немає return/continue/break) — код продовжує виконуватись у \"невалідному\" стані.", "Занадто багато ранніх return (7+) в одній функції — сама стає важкою для читання, варто винести перевірки в окрему функцію.", "Ранній return без повідомлення про причину — користувач чи розробник не розуміє, чому нічого не відбулось.", "Guard-умова, що перевіряє позитивний випадок замість негативного (перевертає логіку і плутає читача)."],
    dontDoThis: { code: `function getShippingCost(weightKg) {\n  if (weightKg > 0) {\n  } // порожній guard — нічого не робить і не виходить\n\n  if (weightKg <= 1) return 50;\n  if (weightKg <= 5) return 100;\n  return 200;\n}\n\nconsole.log(getShippingCost(-3)); // 50 — БАГ: від'ємна вага не мала пройти взагалі`, explanation: "Перший if (weightKg > 0) має порожнє тіло й нічого не робить — це не guard, а марний код, що створює хибне враження перевірки. Функція мовчки обробляє некоректну (від'ємну) вагу як звичайну малу вагу. Справжня guard-конструкція мала б бути if (weightKg <= 0) return null; — з негативною умовою і реальним виходом." },
    bestPractices: ["Перевіряй \"невалідні\"/крайні стани ПЕРШИМИ, з негативною умовою (!isValid, === null тощо) і одразу виходь.", "Тримай основну (\"щасливу\") логіку останньою, без вкладеності, після всіх guard-умов.", "Кожна guard-умова — одна конкретна причина виходу, з зрозумілим значенням, що повертається.", "Якщо guard-умов стає більше 4-5 — виділи їх в окрему функцію validate(), що повертає перше знайдене повідомлення про помилку."],
    remember: ["Guard-конструкція = перевірка невалідного стану + негайний вихід (return/continue/break).", "Основна логіка лишається на найнижчому рівні вкладеності, без if-пірамід.", "continue в циклі — теж guard, лише для однієї ітерації, а не всієї функції.", "Порожня чи \"нічого не роблять\" guard-умова гірша за її відсутність — створює хибне відчуття перевірки."],
    interviewQuestions: [
      { question: "Що таке guard-конструкція і навіщо вона потрібна?", answer: "Це if на початку функції (чи ітерації циклу), що перевіряє невалідний чи крайній стан і одразу виходить через return, continue чи break, не заглиблюючись у вкладені else. Вона прибирає глибоку вкладеність if і робить основну \"щасливу\" логіку функції видимою одразу, без прокрутки через кілька рівнів дужок." },
      { question: "Чим guard-конструкції відрізняються від вкладених if/else?", answer: "У вкладених if/else кожна наступна перевірка додає ще один рівень вкладеності всередину попередньої, і основна дія опиняється в самому центрі \"піраміди\". Guard-конструкції розвертають це: усі перевірки на невалідність стоять на одному рівні на початку функції з негайним виходом, а основна логіка лишається останньою, без жодної додаткової вкладеності." },
      { question: "Чи можна зловживати guard-конструкціями? Як це виглядає?", answer: "Так — якщо функція починається з 8-10 послідовних ранніх return, вона стає такою ж важкою для читання, як і вкладені if, лише в іншій формі. У такому разі варто винести всі перевірки в окрему функцію validate(input), що повертає перше знайдене повідомлення про помилку чи null, якщо все гаразд." },
      { question: "Як guard-конструкція використовується всередині циклу?", answer: "Через continue: якщо поточний елемент не задовольняє умову, continue одразу переходить до наступної ітерації, минаючи решту тіла циклу для цього елемента — це уникає обгортання всього тіла циклу в додатковий if, зберігаючи один рівень вкладеності." },
    ],
    summary: "Guard-конструкції — це ранні return (чи continue/break) на початку функції для невалідних чи крайніх станів, що прибирають глибоку вкладеність if і роблять основну логіку помітною одразу. Головне правило: перевіряй негативний (невалідний) випадок і виходь одразу, а основну \"щасливу\" логіку лиши останньою, без вкладеності.",
    proTip: "На код-рев'ю: якщо бачиш функцію з if усередині if усередині if — запропонуй колезі перевернути кожну умову на протилежну (!isValid замість isValid) і додати ранній return. Майже завжди результат читається набагато легше.",
    nextLessonNote: "Далі — основи обробки помилок: try/catch/finally для ситуацій, коли код може \"впасти\" (некоректний JSON, відсутній елемент DOM).",
    interactiveDemo: "guard-clause-demo",
    practiceTask: {
      title: "Заміни вкладені if на guard-конструкції",
      description: "Функція перевірки можливості оформлення замовлення написана через три рівні вкладених if, і в ній прихована помилка — умова для порожньої адреси переплутана місцями. Перепиши через guard-конструкції і виправ помилку.",
      checklist: ["Порожній кошик повертає \"Кошик порожній\".", "Неавторизований користувач повертає \"Спочатку увійдіть в акаунт\".", "Відсутня адреса повертає \"Вкажіть адресу доставки\".", "Усі умови виконані -> \"Замовлення оформлено!\".", "Код використовує guard-конструкції (ранні return), без вкладених if."],
      starterFiles: [
        {
          id: "js-guard-start",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<p id="result"></p>

<script>
  function processOrder(cart, user) {
    if (cart.length > 0) {
      if (user.isLoggedIn) {
        if (user.address) {
          return "Вкажіть адресу доставки"; // переплутано місцями!
        } else {
          return "Замовлення оформлено!"; // переплутано місцями!
        }
      } else {
        return "Спочатку увійдіть в акаунт";
      }
    } else {
      return "Кошик порожній";
    }
  }

  const result = processOrder(["Книга"], { isLoggedIn: true, address: "вул. Шевченка, 1" });
  document.querySelector("#result").textContent = result;
  // зараз показує "Вкажіть адресу доставки" замість "Замовлення оформлено!"
</script>
`,
        },
      ],
      solutionFiles: [
        {
          id: "js-guard-solution",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<p id="result"></p>

<script>
  function processOrder(cart, user) {
    if (cart.length === 0) return "Кошик порожній";
    if (!user.isLoggedIn) return "Спочатку увійдіть в акаунт";
    if (!user.address) return "Вкажіть адресу доставки";

    return "Замовлення оформлено!";
  }

  const result = processOrder(["Книга"], { isLoggedIn: true, address: "вул. Шевченка, 1" });
  document.querySelector("#result").textContent = result;
  // тепер "Замовлення оформлено!"
</script>
`,
          readOnly: true,
        },
      ],
      hints: ["Онови кожну умову на протилежну (!user.address замість user.address) і одразу повертай відповідне повідомлення.", "Основна дія \"Замовлення оформлено!\" має бути ОСТАННІМ return, після всіх guard-умов."],
      expectedOutput: "\"Замовлення оформлено!\"",
    },
    microExercises: [
      { id: "js-guard-label-predict", kind: "predict", prompt: "Що виведе цей код?", code: `function getUserLabel(user) {\n  if (!user) return "Гість";\n  if (!user.name) return "Без імені";\n  return user.name;\n}\nconsole.log(getUserLabel({ name: "Марія" }));`, solution: "\"Марія\" — user існує (перша guard-умова false), user.name існує (друга guard-умова false), тому виконується останній return user.name." },
      { id: "js-guard-empty-body-find-bug", kind: "find-the-bug", prompt: "У чому проблема цього коду?", code: `function getDiscount(user) {\n  if (user.isPremium) {\n    // забутий return!\n  }\n  return 0;\n}`, solution: "Guard-умова if (user.isPremium) має порожнє тіло без return — навіть для преміум-користувача функція провалюється до return 0 в кінці. Потрібно повернути реальну знижку всередині if, наприклад return 0.2;." },
      { id: "js-guard-definition-choice", kind: "choice", prompt: "Що є ознакою справжньої guard-конструкції?", options: ["Вона завжди перевіряє позитивний (валідний) стан", "Вона перевіряє невалідний/крайній стан і одразу виходить (return/continue/break)", "Вона завжди розташована в кінці функції", "Вона ніколи не використовується в циклах"], correctAnswer: "Вона перевіряє невалідний/крайній стан і одразу виходить (return/continue/break)", solution: "Guard-конструкція — це рання перевірка \"поганого\" чи крайнього стану з негайним виходом, що дозволяє основній логіці лишитись чистою й без вкладеності." },
      { id: "js-guard-nesting-explain", kind: "explain", prompt: "Поясни, чому guard-конструкції зменшують рівень вкладеності коду порівняно з вкладеними if/else.", solution: "Кожна guard-умова перевіряє один невалідний стан і одразу виходить через return/continue/break — вона не потребує else, бо після виходу решта коду функції просто не виконується для цього випадку. Це дозволяє розташувати всі перевірки послідовно на ОДНОМУ рівні вкладеності, замість того щоб кожна наступна умова була вкладена всередину попередньої." },
      { id: "js-guard-vote-rewrite", kind: "rewrite", prompt: "Перепиши цей код без вкладених if, використавши guard-конструкції.", code: `function canVote(age, isCitizen) {\n  if (age >= 18) {\n    if (isCitizen) {\n      return true;\n    } else {\n      return false;\n    }\n  } else {\n    return false;\n  }\n}`, solution: `function canVote(age, isCitizen) {\n  if (age < 18) return false;\n  if (!isCitizen) return false;\n  return true;\n}\n// дві guard-умови для невалідних випадків, "щасливий" результат — останній return` },
    ],
    quiz: {
      id: "js-control-flow-guard-clauses-quiz",
      title: "Швидка перевірка: Guard-конструкції",
      questions: [
        {
          id: "js-cf-q1-guard-label-predict",
          type: "code",
          question: "Що виведе цей код?",
          codeSnippet: 'function getUserLabel(user) {\n  if (!user) return "Гість";\n  if (!user.name) return "Без імені";\n  return user.name;\n}\nconsole.log(getUserLabel({ name: "Марія" }));',
          options: ['"Марія"', '"Гість"', '"Без імені"', "undefined"],
          correctAnswer: '"Марія"',
          explanation: "user існує (перша guard-умова false), user.name існує (друга guard-умова false), тому виконується останній return user.name.",
        },
        {
          id: "js-cf-q2-empty-guard-bug",
          type: "code",
          question: "У чому проблема цього коду?",
          codeSnippet: 'function getDiscount(user) {\n  if (user.isPremium) {\n    // забутий return!\n  }\n  return 0;\n}',
          options: [
            "Guard-умова має порожнє тіло — навіть для преміум-користувача функція провалюється до return 0",
            "user.isPremium має бути функцією, а не властивістю",
            "Функція взагалі не компілюється",
            "getDiscount повинна приймати два параметри",
          ],
          correctAnswer: "Guard-умова має порожнє тіло — навіть для преміум-користувача функція провалюється до return 0",
          explanation: "Потрібно повернути реальну знижку всередині if, наприклад return 0.2;",
        },
        {
          id: "js-cf-q3-guard-definition",
          type: "single",
          question: "Що є ознакою справжньої guard-конструкції?",
          options: [
            "Вона перевіряє невалідний/крайній стан і одразу виходить (return/continue/break)",
            "Вона завжди перевіряє позитивний (валідний) стан",
            "Вона завжди розташована в кінці функції",
            "Вона ніколи не використовується в циклах",
          ],
          correctAnswer: "Вона перевіряє невалідний/крайній стан і одразу виходить (return/continue/break)",
          explanation: "Guard-конструкція — це рання перевірка \"поганого\" стану з негайним виходом.",
        },
        {
          id: "js-cf-q4-nesting-reduction",
          type: "single",
          question: "Чому guard-конструкції зменшують рівень вкладеності коду порівняно з вкладеними if/else?",
          options: [
            "Кожна guard-умова виходить одразу через return, тому не потребує else",
            "Guard-конструкції автоматично оптимізуються компілятором",
            "Вони працюють лише в стрілочних функціях",
            "Різниці немає, це лише стилістичне питання",
          ],
          correctAnswer: "Кожна guard-умова виходить одразу через return, тому не потребує else",
          explanation: "Це дозволяє розташувати всі перевірки на одному рівні вкладеності, замість того щоб кожна умова була вкладена в попередню.",
        },
        {
          id: "js-cf-q5-fake-guard-bug",
          type: "code",
          question: "У чому проблема цього коду?",
          codeSnippet: "function getShippingCost(weightKg) {\n  if (weightKg > 0) {\n  }\n\n  if (weightKg <= 1) return 50;\n  if (weightKg <= 5) return 100;\n  return 200;\n}",
          options: [
            "Перший if має порожнє тіло й нічого не робить — це не справжній guard, від'ємна вага обробляється як мала",
            "Функція має забагато return-виразів",
            "weightKg потрібно конвертувати в грами",
            "Це найкраща практика для guard-конструкцій",
          ],
          correctAnswer: "Перший if має порожнє тіло й нічого не робить — це не справжній guard, від'ємна вага обробляється як мала",
          explanation: "Справжня guard-конструкція мала б бути if (weightKg <= 0) return null; — з негативною умовою і реальним виходом.",
        },
      ],
    },
  },

  "Основи обробки помилок": {
    whatIsIt: "try/catch/finally — конструкція для обробки помилок (винятків), що виникають під час виконання коду. Код у try виконується як звичайно; якщо він кидає помилку (throw), виконання одразу переходить у catch, де можна її обробити; finally виконується ЗАВЖДИ — і після успіху, і після помилки.",
    whyUseIt: "JSON.parse на некоректному рядку, доступ до властивості елемента DOM, якого немає на сторінці, парсинг даних з localStorage чи відповіді сервера — усе це може \"впасти\" під час виконання. Без try/catch одна помилка зупиняє виконання всього скрипта; з try/catch можна показати користувачу зрозуміле повідомлення й дати застосунку жити далі.",
    whenToUse: ["Навколо JSON.parse при читанні даних з localStorage чи відповіді сервера, які можуть бути пошкоджені чи в неочікуваному форматі.", "Навколо коду, що звертається до зовнішніх ресурсів (мережа, файлова система, API браузера), результат яких не гарантований.", "Коли потрібен throw власної, змістовної помилки для сигналізації \"невалідного\" стану викликаючому коду.", "У finally — для гарантованого прибирання (приховати спінер завантаження, закрити з'єднання) незалежно від результату."],
    whenNotToUse: ["Не обгортай КОЖЕН рядок коду в try/catch \"про всяк випадок\" — це маскує реальні баги замість того, щоб дати їм проявитись під час розробки.", "Не використовуй try/catch для звичайної перевірки умов (наприклад, чи існує властивість) — для цього є if чи optional chaining (?.), а не throw/catch.", "Не залишай catch-блок порожнім — це \"проковтує\" помилку без жодного сліду, і знайти причину багу в проді стає майже неможливо."],
    comparisonTable: {
      headers: ["Блок", "Коли виконується", "Типове використання"],
      rows: [
        ["try", "завжди, першим", "код, що потенційно може кинути помилку"],
        ["catch", "лише якщо try кинув помилку", "обробка/логування помилки, запасне значення"],
        ["finally", "завжди — і після успіху, і після помилки", "прибирання: приховати спінер, закрити ресурс"],
        ["throw", "будь-де в коді", "свідомо \"кидає\" помилку для catch вище по стеку"],
      ],
    },
    codeWalkthroughs: [
      {
        before: "Спершу найпростіший можливий приклад — код, що свідомо кидає й ловить помилку, без жодних сторонніх API:",
        code: `try {
  console.log("Починаємо...");
  throw new Error("Щось пішло не так"); // ми самі свідомо "кидаємо" помилку
  console.log("Цей рядок НІКОЛИ не виконається"); // код після throw пропускається
} catch (error) {
  console.log("Спіймали помилку:", error.message); // "Спіймали помилку: Щось пішло не так"
}

console.log("Програма працює далі, як і раніше");`,
        lineNotes: ["throw негайно \"викидає\" помилку й перериває виконання try — усе, що написано в try ПІСЛЯ throw, просто не виконується.", "catch (error) ловить цю помилку в змінну error; error.message — текст, який ми самі передали в new Error(...).", "Найважливіше: помилка НЕ \"вбиває\" всю програму — рядок після всього try/catch виконується як звичайно."],
        after: "У реальному коді помилки частіше кидає сам JavaScript (наприклад, JSON.parse на зіпсованих даних), а не throw вручну — дивись наступний приклад.",
      },
      {
        before: "Базовий try/catch навколо JSON.parse даних з localStorage:",
        code: `function loadCart() {
  try {
    const raw = localStorage.getItem("cart");
    return JSON.parse(raw);
  } catch (error) {
    console.error("Не вдалось прочитати кошик:", error.message);
    return [];
  }
}`,
        lineNotes: ["Якщо raw === null (ключа немає) чи містить пошкоджений JSON, JSON.parse кидає помилку — виконання одразу переходить у catch.", "catch повертає безпечне запасне значення ([]) замість того, щоб дозволити помилці зупинити весь скрипт."],
      },
      {
        before: "throw власної помилки з осмисленим повідомленням — сигнал викликаючому коду:",
        code: `function withdrawMoney(balance, amount) {
  if (amount > balance) {
    throw new Error("Недостатньо коштів на рахунку");
  }
  return balance - amount;
}

try {
  withdrawMoney(100, 500);
} catch (error) {
  console.log(error.message); // "Недостатньо коштів на рахунку"
}`,
        lineNotes: ["throw new Error(...) створює об'єкт помилки з властивістю .message і негайно \"вилітає\" з функції.", "catch у місці виклику ловить саме цю помилку й читає error.message для показу користувачу."],
      },
      {
        before: "finally — гарантоване прибирання незалежно від успіху чи помилки:",
        code: `function loadUserData(id) {
  showSpinner();
  try {
    const data = parseUserResponse(id);
    return data;
  } catch (error) {
    console.error(error.message);
    return null;
  } finally {
    hideSpinner(); // виконається в БУДЬ-ЯКОМУ випадку
  }
}`,
        lineNotes: ["hideSpinner() у finally виконається і якщо parseUserResponse відпрацював успішно, і якщо кинув помилку — спінер ніколи не \"застрягне\" на екрані.", "Без finally довелось би дублювати hideSpinner() в кінці try І в catch — finally прибирає це дублювання."],
      },
      {
        before: "Порожній catch \"проковтує\" помилку без жодного сліду — так робити не варто:",
        code: `function riskyParse(text) {
  try {
    return JSON.parse(text);
  } catch (error) {
    // порожньо — помилка зникає безслідно
  }
}

console.log(riskyParse("{невалідний json")); // undefined, без жодного повідомлення чому`,
        lineNotes: ["Порожній catch означає, що помилка сталась, але ніхто про це не дізнається — ні розробник у консолі, ні користувач на екрані.", "Мінімум — console.error(error) всередині catch, щоб слід помилки лишався в консолі для діагностики."],
        after: "Правильно: навіть \"неважлива\" помилка заслуговує хоча б одного рядка логування.",
      },
    ],
    commonMistakes: ["Порожній catch-блок — помилка зникає без жодного сліду для діагностики.", "try/catch навколо всього файлу \"про всяк випадок\" замість конкретного ризикованого місця.", "throw рядка (throw \"помилка\") замість throw new Error(\"...\") — втрачається стек виклику і стандартний .message.", "Забутий finally для гарантованого прибирання (спінери, з'єднання) — воно виконується лише в success-гілці.", "Використання try/catch для звичайної перевірки існування властивості замість if чи ?."],
    dontDoThis: { code: `function getUserName(json) {\n  try {\n    return JSON.parse(json).name;\n  } catch (e) {}\n}\n\nconsole.log(getUserName("{зламаний}")); // undefined, без жодного пояснення чому`, explanation: "Порожній catch (e) {} повністю приховує факт помилки — функція мовчки повертає undefined, і ніхто (ні розробник, ні користувач) не дізнається, що саме пішло не так. Мінімальний правильний варіант: catch (e) { console.error(e.message); return null; } — хоча б слід у консолі." },
    bestPractices: ["Обгортай в try лише конкретний ризикований виклик (JSON.parse, звернення до API), а не весь блок коду підряд.", "Завжди щось роби в catch — хоча б console.error(error) для сліду в консолі.", "Використовуй throw new Error(\"опис\"), а не throw \"рядок\" — Error має стандартні .message і стек виклику.", "Використовуй finally для дій, що МАЮТЬ виконатись незалежно від результату (приховати спінер, закрити з'єднання)."],
    remember: ["try виконується завжди першим; catch — лише якщо try кинув помилку; finally — завжди.", "throw new Error(\"...\") — правильний спосіб \"кинути\" власну помилку з .message.", "Порожній catch гірший за відсутність try/catch — він приховує факт помилки.", "try/catch — не заміна звичайній перевірці умов (if, ?.) для очікуваних станів."],
    interviewQuestions: [
      { question: "Що робить блок finally і чим він відрізняється від catch?", answer: "finally виконується ЗАВЖДИ після try — незалежно від того, чи сталась помилка, і незалежно від того, чи catch її обробив. catch виконується ЛИШЕ якщо try кинув помилку. finally типово використовують для гарантованого прибирання (закрити з'єднання, приховати індикатор завантаження), яке має відбутись у будь-якому сценарії." },
      { question: "Чому throw new Error(\"...\") краще за throw \"просто рядок\"?", answer: "Error-об'єкт має стандартну властивість .message з текстом помилки і властивість .stack зі стеком викликів, що допомагає знайти, де саме сталась помилка. throw рядка не дає цієї інформації — catch отримає просто рядок без .message і без стека, що ускладнює діагностику." },
      { question: "Чому порожній catch-блок вважається поганою практикою?", answer: "Він \"проковтує\" помилку повністю безслідно — виконання коду продовжується так, ніби нічого не сталось, але результат може бути некоректним (undefined, null) без жодного пояснення причини. Це надзвичайно ускладнює діагностику багів, особливо в продакшні, де немає доступу до дебагера в реальному часі." },
      { question: "Коли варто використовувати try/catch, а коли краще звичайний if?", answer: "try/catch — для ситуацій, де сама операція МОЖЕ кинути помилку (JSON.parse на непередбачуваних даних, виклики API браузера, які документовано можуть throw). Для очікуваних, \"нормальних\" перевірок (чи існує властивість, чи порожній масив) варто використовувати if чи optional chaining (?.) — try/catch для цього повільніший і менш очевидний за намірами." },
    ],
    summary: "try виконується першим; якщо він кидає помилку, виконання переходить у catch; finally виконується завжди, незалежно від результату. throw new Error(\"опис\") — правильний спосіб сигналізувати про помилку зі змістовним .message. Порожній catch — найгірша практика: він приховує факт помилки замість того, щоб дати можливість її діагностувати.",
    proTip: "Онови команду для code review: якщо бачиш catch (error) {} без жодного рядка всередині — це майже завжди привід повернути код на доопрацювання. Мінімум — console.error(error) для сліду в консолі.",
    nextLessonNote: "Це завершує модуль \"Керування потоком\". Далі — функції: як групувати логіку в багаторазові, іменовані блоки коду.",
    interactiveDemo: "error-handling-demo",
    practiceTask: {
      title: "Виправ мовчазний catch, що приховує помилку",
      description: "Функція парсингу даних користувача з localStorage має порожній catch — коли дані пошкоджені, сторінка просто показує порожнє ім'я без жодного пояснення. Додай обробку помилки, щоб користувач бачив зрозуміле повідомлення.",
      checklist: ["Коректний JSON відображає ім'я користувача.", "Пошкоджений JSON показує повідомлення \"Помилка завантаження профілю\", а не порожній рядок.", "Помилка логується в консоль через console.error для діагностики."],
      starterFiles: [
        {
          id: "js-error-start",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<p id="output"></p>

<script>
  const rawUser = "{зламаний json"; // симуляція пошкоджених даних

  function getUserName(json) {
    try {
      return JSON.parse(json).name;
    } catch (error) {
      // порожньо — помилка мовчки зникає
    }
  }

  document.querySelector("#output").textContent = getUserName(rawUser);
  // зараз показує порожній рядок замість повідомлення про помилку
</script>
`,
        },
      ],
      solutionFiles: [
        {
          id: "js-error-solution",
          path: "index.html",
          language: "html",
          label: "index.html",
          code: `<p id="output"></p>

<script>
  const rawUser = "{зламаний json"; // симуляція пошкоджених даних

  function getUserName(json) {
    try {
      return JSON.parse(json).name;
    } catch (error) {
      console.error("Помилка парсингу профілю:", error.message);
      return "Помилка завантаження профілю";
    }
  }

  document.querySelector("#output").textContent = getUserName(rawUser);
  // тепер "Помилка завантаження профілю"
</script>
`,
          readOnly: true,
        },
      ],
      hints: ["catch-блок зараз порожній — додай console.error(error.message) і return з зрозумілим повідомленням.", "Пам'ятай: catch отримує сам об'єкт помилки, error.message — це текст причини."],
      expectedOutput: "\"Помилка завантаження профілю\"",
    },
    microExercises: [
      { id: "js-throw-catch-predict", kind: "predict", prompt: "Що виведе цей код?", code: `function safeDivide(a, b) {\n  try {\n    if (b === 0) throw new Error("Ділення на нуль");\n    return a / b;\n  } catch (error) {\n    return error.message;\n  }\n}\nconsole.log(safeDivide(10, 0));`, solution: "\"Ділення на нуль\" — b === 0, тому throw кидає нову помилку з цим повідомленням, catch ловить її і повертає error.message." },
      { id: "js-empty-catch-find-bug", kind: "find-the-bug", prompt: "У чому проблема цього коду?", code: `function parseConfig(json) {\n  try {\n    return JSON.parse(json);\n  } catch (e) {}\n  return null;\n}`, solution: "catch-блок порожній — якщо JSON.parse кидає помилку, вона повністю зникає без жодного логування, і функція мовчки повертає null, не даючи розробнику жодного сліду, що саме пішло не так. Треба хоча б console.error(e.message) всередині catch." },
      { id: "js-finally-choice", kind: "choice", prompt: "Коли виконується блок finally?", options: ["Лише якщо try успішний", "Лише якщо catch спрацював", "Завжди — і при успіху, і при помилці", "Ніколи, якщо є catch"], correctAnswer: "Завжди — і при успіху, і при помилці", solution: "finally виконується безумовно після try/catch, незалежно від того, чи була помилка і чи її обробив catch — це і робить його зручним для гарантованого прибирання." },
      { id: "js-error-object-explain", kind: "explain", prompt: "Поясни, чому throw new Error(\"текст\") краще, ніж throw \"текст\" без обгортки Error.", solution: "new Error(\"текст\") створює об'єкт з властивістю .message (сам текст) і .stack (стек викликів, що показує, де саме сталась помилка) — це стандартна форма, яку очікують усі catch-блоки й інструменти логування. throw просто рядка позбавляє catch цієї структури: доведеться перевіряти тип пійманого значення вручну, і стек викликів буде втрачено." },
      { id: "js-empty-catch-rewrite", kind: "rewrite", prompt: "Перепиши цю функцію, додавши правильну обробку помилки замість порожнього catch.", code: `function loadSettings(json) {\n  try {\n    return JSON.parse(json);\n  } catch (e) {}\n}`, solution: `function loadSettings(json) {\n  try {\n    return JSON.parse(json);\n  } catch (error) {\n    console.error("Не вдалось завантажити налаштування:", error.message);\n    return {};\n  }\n}\n// тепер помилка логується і функція повертає безпечне запасне значення {}` },
    ],
    quiz: {
      id: "js-control-flow-error-handling-quiz",
      title: "Швидка перевірка: Основи обробки помилок",
      questions: [
        {
          id: "js-cf-q1-throw-catch-predict",
          type: "code",
          question: "Що виведе цей код?",
          codeSnippet: 'function safeDivide(a, b) {\n  try {\n    if (b === 0) throw new Error("Ділення на нуль");\n    return a / b;\n  } catch (error) {\n    return error.message;\n  }\n}\nconsole.log(safeDivide(10, 0));',
          options: ['"Ділення на нуль"', "Infinity", "NaN", "TypeError"],
          correctAnswer: '"Ділення на нуль"',
          explanation: "b === 0, тому throw кидає нову помилку з цим повідомленням, catch ловить її і повертає error.message.",
        },
        {
          id: "js-cf-q2-empty-catch-bug",
          type: "code",
          question: "У чому проблема цього коду?",
          codeSnippet: "function parseConfig(json) {\n  try {\n    return JSON.parse(json);\n  } catch (e) {}\n  return null;\n}",
          options: [
            "catch-блок порожній — помилка зникає без жодного логування",
            "JSON.parse не можна обгортати в try/catch",
            "Потрібен finally для коректної роботи",
            "return null не можна писати після try/catch",
          ],
          correctAnswer: "catch-блок порожній — помилка зникає без жодного логування",
          explanation: "Функція мовчки повертає null, не даючи розробнику жодного сліду, що саме пішло не так. Треба хоча б console.error(e.message).",
        },
        {
          id: "js-cf-q3-finally-timing",
          type: "single",
          question: "Коли виконується блок finally?",
          options: [
            "Завжди — і при успіху, і при помилці",
            "Лише якщо try успішний",
            "Лише якщо catch спрацював",
            "Ніколи, якщо є catch",
          ],
          correctAnswer: "Завжди — і при успіху, і при помилці",
          explanation: "finally виконується безумовно після try/catch, незалежно від результату — це робить його зручним для гарантованого прибирання.",
        },
        {
          id: "js-cf-q4-error-object-benefit",
          type: "single",
          question: "Чому throw new Error(\"текст\") краще, ніж throw \"текст\" без обгортки Error?",
          options: [
            "new Error() дає стандартні .message і .stack (стек викликів)",
            "throw \"текст\" взагалі не працює в JavaScript",
            "new Error() виконується швидше",
            "Різниці немає, це стилістичне питання",
          ],
          correctAnswer: "new Error() дає стандартні .message і .stack (стек викликів)",
          explanation: "throw рядка позбавляє catch цієї структури — доведеться перевіряти тип вручну, а стек викликів буде втрачено.",
        },
        {
          id: "js-cf-q5-try-catch-vs-if",
          type: "single",
          question: "Коли варто використовувати try/catch, а коли краще звичайний if?",
          options: [
            "try/catch — для операцій, що МОЖУТЬ кинути помилку; if — для очікуваних, звичайних перевірок",
            "try/catch завжди краще за if для будь-якої перевірки",
            "if застарілий і його варто уникати",
            "Різниці немає, обидва підходи взаємозамінні",
          ],
          correctAnswer: "try/catch — для операцій, що МОЖУТЬ кинути помилку; if — для очікуваних, звичайних перевірок",
          explanation: "Для звичайних перевірок (чи існує властивість, чи порожній масив) if чи ?. ефективніші й очевидніші за наміром, ніж try/catch.",
        },
      ],
    },
  },
};

export const jsControlFlowModuleQuiz: QuizData = {
  id: "js-control-flow-module-quiz",
  title: "Контрольний тест: Керування потоком",
  questions: [
    {
      id: "js-cf-mod-q1-branch-order",
      type: "single",
      question: "Чому порядок гілок else if важливий для перекриваючихся діапазонів?",
      options: [
        "JavaScript виконує ПЕРШУ гілку, що дає true, і ігнорує решту",
        "Порядок гілок ніколи не впливає на результат",
        "else if завжди виконується останнім незалежно від порядку",
        "Це впливає лише на швидкість виконання коду",
      ],
      correctAnswer: "JavaScript виконує ПЕРШУ гілку, що дає true, і ігнорує решту",
      explanation: "Якщо ширша умова стоїть перед вужчою, вужча ніколи не спрацює для значень, що підходять під обидві.",
    },
    {
      id: "js-cf-mod-q2-switch-fallthrough",
      type: "code",
      question: "У чому причина того, що statuses \"pending\" виводить і \"Очікує\", і \"Відправлено\"?",
      codeSnippet: 'switch (status) {\n  case "pending":\n    console.log("Очікує");\n  case "shipped":\n    console.log("Відправлено");\n    break;\n}',
      options: [
        "Забутий break після case \"pending\" — виконання провалюється в наступний case",
        "console.log не можна використовувати в switch",
        "case має бути написаний з великої літери",
        "Це очікувана й правильна поведінка switch",
      ],
      correctAnswer: "Забутий break після case \"pending\" — виконання провалюється в наступний case",
      explanation: "Без break виконання продовжується в наступний case незалежно від того, чи збігається його умова.",
    },
    {
      id: "js-cf-mod-q3-empty-array-truthy",
      type: "true-false",
      question: "Порожній масив [] є falsy значенням в умові if.",
      options: ["Так", "Ні"],
      correctAnswer: false,
      explanation: "Масив — це об'єкт, а всі об'єкти truthy незалежно від вмісту. Для перевірки \"чи порожній\" потрібен array.length.",
    },
    {
      id: "js-cf-mod-q4-off-by-one",
      type: "single",
      question: "Яка межа циклу for коректно перебирає всі елементи масиву без off-by-one помилки?",
      options: ["i < items.length", "i <= items.length", "i < items.length + 1", "i <= items.length - 2"],
      correctAnswer: "i < items.length",
      explanation: "Останній валідний індекс масиву — items.length - 1, тому i < items.length зупиняє цикл рівно після цього індексу.",
    },
    {
      id: "js-cf-mod-q5-guard-clause-purpose",
      type: "single",
      question: "Що таке guard-конструкція?",
      options: [
        "if на початку функції, що перевіряє невалідний стан і одразу виходить",
        "Цикл, що виконується нескінченно",
        "Спеціальний тип змінної для валідації",
        "Синонім до switch",
      ],
      correctAnswer: "if на початку функції, що перевіряє невалідний стан і одразу виходить",
      explanation: "Guard-конструкції прибирають глибоку вкладеність if, залишаючи основну логіку на одному рівні.",
    },
    {
      id: "js-cf-mod-q6-true-statements",
      type: "multiple",
      question: "Які з тверджень про керування потоком правильні?",
      options: [
        "switch порівнює значення через === (точний збіг), а не через діапазони",
        "Порожній catch-блок вважається хорошою практикою, бо код не падає",
        "finally виконується завжди, незалежно від результату try/catch",
        "for...in — найкращий вибір для перебору значень масиву",
      ],
      correctAnswer: [
        "switch порівнює значення через === (точний збіг), а не через діапазони",
        "finally виконується завжди, незалежно від результату try/catch",
      ],
      explanation: "Порожній catch приховує помилку без жодного сліду — це погана практика. for...in призначений для об'єктів, для масивів безпечніший for...of.",
      optionExplanations: {
        "Порожній catch-блок вважається хорошою практикою, бо код не падає": "Невірно: порожній catch \"проковтує\" помилку без жодного сліду, що ускладнює діагностику багів.",
        "for...in — найкращий вибір для перебору значень масиву": "Невірно: for...in дає індекси як рядки і може захопити успадковані властивості — для масивів безпечніший for...of.",
      },
    },
  ],
};
