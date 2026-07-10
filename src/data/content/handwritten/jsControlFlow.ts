import type { LessonOverride } from "./htmlFoundations";

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
  },
};
