import type { LessonOverride } from "./htmlFoundations";

/**
 * Module "Архітектура і React" (css-architecture-react). Cheat-sheet format.
 * Bridges the finished café styles.css to how CSS is organized inside a
 * React app: CSS Modules, conditional classes, and the BEM/Modules/utility
 * comparison. Doesn't touch the café project file directly (this module is
 * about organizing CSS, not new visual features).
 */
export const cssArchitectureReactOverrides: Record<string, LessonOverride> = {
  "CSS Modules": {
    whatIsIt: "CSS Modules — спосіб писати звичайний CSS у файлі виду Button.module.css, де кожен клас автоматично отримує унікальне ім'я (наприклад, .button перетворюється на .Button_button_a1b2c). Це вирішує проблему конфлікту імен класів між компонентами.",
    whyUseIt: "У звичайному CSS усі класи глобальні — якщо два розробники в різних компонентах напишуть .card, останній підключений файл перепише стилі першого. CSS Modules гарантують, що стилі одного компонента ніколи випадково не зламають інший.",
    whenToUse: ["Кожен React-компонент має власний *.module.css файл поруч із собою.", "Імпортуй як об'єкт: import styles from \"./Button.module.css\", використовуй className={styles.button}."],
    whenNotToUse: ["Не використовуй CSS Modules для справді глобальних стилів (скидання браузера, змінні теми, шрифти) — для них підходить звичайний глобальний CSS-файл (наприклад, globals.css).", "Не намагайся звертатись до класу CSS Modules по імені з іншого файлу як до рядка ('button') — реальне ім'я класу згенероване й непередбачуване."],
    comparisonTable: {
      headers: ["", "Звичайний CSS", "CSS Modules"],
      rows: [
        ["Ім'я класу в браузері", ".card (як написано)", ".Card_card_x7f2a (згенероване)"],
        ["Конфлікт імен між компонентами", "Можливий", "Неможливий"],
        ["Як підключити", "<link> або import 'style.css'", "import styles from './X.module.css'"],
      ],
    },
    codeWalkthroughs: [
      {
        before: "Компонент кнопки з ізольованими стилями:",
        code: `/* Button.module.css */
.button {
  padding: 10px 18px;
  border-radius: 8px;
  background: var(--primary);
  color: white;
}`,
        lineNotes: ["Файл називається Button.module.css — суфікс .module.css вмикає ізоляцію імен класів.", "Клас .button тут не конфліктує з .button у будь-якому іншому файлі проєкту."],
        after: "У браузері цей клас матиме унікальне ім'я (наприклад, Button_button_a1b2c), тож стилі гарантовано застосуються лише до цієї кнопки.",
      },
      {
        before: "Використання в React-компоненті:",
        code: `import styles from "./Button.module.css";

export function Button({ children }: { children: React.ReactNode }) {
  return <button className={styles.button}>{children}</button>;
}`,
        lineNotes: ["styles — звичайний JS-об'єкт, де styles.button повертає рядок із реальним (згенерованим) ім'ям класу."],
      },
    ],
    commonMistakes: ["Написати className=\"button\" (рядком) замість className={styles.button} — рядок 'button' не існує в браузері, стилі не застосуються.", "Тримати змінні теми (кольори, шрифти) в CSS Modules замість глобального файлу — тоді кожен компонент дублює одні й ті самі значення."],
    dontDoThis: { code: `<button className="button">Купити</button>`, explanation: "Рядок \"button\" — це не те саме, що styles.button. CSS Modules генерують унікальне ім'я класу, і саме його потрібно підставляти через об'єкт styles, інакше стилі просто не застосуються." },
    bestPractices: ["Один компонент — один *.module.css файл поруч (Button.tsx + Button.module.css).", "Глобальні токени (кольори, шрифти, spacing) тримай в одному globals.css/variables.css, а не дублюй у кожному модулі."],
    remember: ["*.module.css вмикає автоматичну унікалізацію імен класів.", "import styles from './X.module.css' — styles.className, не рядок.", "Глобальні токени — окремо від CSS Modules компонентів."],
    interviewQuestions: [{ question: "Чим CSS Modules відрізняються від звичайного CSS-файлу?", answer: "Звичайний CSS глобальний — усі класи можуть конфліктувати між файлами. CSS Modules автоматично генерують унікальне ім'я для кожного класу під час збірки, тож стилі одного компонента ізольовані й не можуть випадково перезаписати стилі іншого." }],
    summary: "CSS Modules ізолюють класи на рівні компонента, вирішуючи проблему глобальних конфліктів імен — саме так організований весь цей навчальний застосунок.",
    nextLessonNote: "Далі — як умовно застосовувати класи в React (наприклад, активна вкладка чи стан помилки).",
    practiceTask: {
      title: "Ізоляція стилів кнопки",
      description: "Створи Button.module.css з класом .button і підключи його в компоненті через styles.button.",
      checklist: ["Файл названо *.module.css.", "Імпорт через import styles from.", "className={styles.button}, не рядок."],
      starterFiles: [{ id: "css-arch-start", path: "Button.tsx", language: "tsx", label: "Button.tsx", code: `export function Button() {\n  return <button className="button">Купити</button>;\n}` }],
      solutionFiles: [
        {
          id: "css-arch-solution",
          path: "Button.tsx",
          language: "tsx",
          label: "Button.tsx + Button.module.css",
          code: `// Button.module.css
.button {
  padding: 10px 18px;
  border-radius: 8px;
  background: var(--primary);
  color: white;
}

// Button.tsx
import styles from "./Button.module.css";

export function Button() {
  return <button className={styles.button}>Купити</button>;
}`,
          readOnly: true,
        },
      ],
      hints: ["Ім'я файлу з суфіксом .module.css — ключова умова ізоляції."],
      expectedOutput: "Клас .button застосовується лише до цієї кнопки, ніде більше в проєкті.",
    },
    microExercises: [
      { id: "css-modules-choice", kind: "choice", prompt: "Що станеться, якщо написати className=\"card\" замість className={styles.card} у файлі, що використовує CSS Modules?", options: ["Нічого, це те саме", "Стилі не застосуються — рядок \"card\" не існує в браузері", "Буде помилка збірки", "CSS Modules ігноруються автоматично"], correctAnswer: "Стилі не застосуються — рядок \"card\" не існує в браузері", solution: "CSS Modules генерують унікальне ім'я класу; звертатись потрібно через об'єкт styles, а не рядком." },
    ],
  },

  "Умовні класи в React": {
    whatIsIt: "Умовний клас — клас, який застосовується лише за певної умови (наприклад, .active лише для активної вкладки, .error лише за помилки валідації). У React це звичайний JavaScript-вираз усередині className.",
    whyUseIt: "Стан інтерфейсу (активна вкладка, відкрите меню, помилка форми) змінюється під час роботи застосунку — CSS сам по собі не знає про цей стан, тому потрібен спосіб передати його з React у className.",
    whenToUse: ["Шаблонний рядок: className={`${styles.tab} ${isActive ? styles.active : \"\"}`}.", "Кілька умовних класів одразу — краще винести в невелику функцію cx()/classNames() для читабельності."],
    whenNotToUse: ["Не пиши глибоко вкладені потрійні оператори в className напряму в JSX — це важко читати; винеси логіку у змінну перед return.", "Не дублюй стан і в className, і в inline style одночасно для того самого візуального ефекту — обери один підхід."],
    comparisonTable: {
      headers: ["Підхід", "Приклад", "Коли доречний"],
      rows: [
        ["Шаблонний рядок", "`${styles.tab} ${isActive ? styles.active : \"\"}`", "1-2 умовні класи"],
        ["Масив + filter/join", "[styles.tab, isActive && styles.active].filter(Boolean).join(\" \")", "3+ умовних класи"],
        ["Бібліотека clsx/classnames", "clsx(styles.tab, { [styles.active]: isActive })", "Складна логіка в багатьох місцях проєкту"],
      ],
    },
    codeWalkthroughs: [
      {
        before: "Вкладка, що підсвічується, коли активна:",
        code: `function Tab({ label, isActive }: { label: string; isActive: boolean }) {
  return (
    <button className={\`\${styles.tab} \${isActive ? styles.active : ""}\`}>
      {label}
    </button>
  );
}`,
        lineNotes: ["Шаблонний рядок (backticks) об'єднує базовий клас styles.tab з умовним styles.active.", "Коли isActive === false, додається порожній рядок — фінальний className лишається просто styles.tab."],
        after: "Активна вкладка отримує додатковий візуальний стан (наприклад, підкреслення чи інший фон) без будь-якого JavaScript, що напряму змінює стилі — лише перемикання класу.",
      },
    ],
    commonMistakes: ["Вкладені потрійні оператори прямо в JSX (className={a ? (b ? x : y) : z}) — важко читати й дебажити.", "Забутий пробіл між класами в шаблонному рядку (styles.taбstyles.active злипаються в один неіснуючий клас).", "Умовна логіка стилів розкидана по багатьох компонентах без єдиного підходу — одні місця використовують шаблонний рядок, інші — щось інше."],
    dontDoThis: { code: `className={\`\${styles.tab}\${isActive ? styles.active : ""}\`}`, explanation: "Без пробілу між styles.tab і наступним виразом два імені класів зливаються в один неіснуючий рядок — жоден зі стилів не застосується коректно." },
    bestPractices: ["Для 1-2 умовних класів шаблонного рядка достатньо; для складнішої логіки — винеси в змінну або функцію перед JSX.", "Тримай однаковий підхід до умовних класів у всьому проєкті — не змішуй три різні стилі запису."],
    remember: ["className приймає звичайний JS-рядок — умовна логіка це просто конкатенація рядків.", "Не забувай пробіл між базовим і умовним класом.", "Складна логіка → винеси в змінну, не пиши вкладені тернарники в JSX."],
    interviewQuestions: [{ question: "Як у React зробити так, щоб клас .active додавався лише коли вкладка активна?", answer: "className приймає звичайний рядок, тож можна побудувати його динамічно: className={`${styles.tab} ${isActive ? styles.active : \"\"}`} — коли isActive true, до базового класу додається styles.active, інакше додається порожній рядок." }],
    summary: "Умовні класи — це звичайна конкатенація рядків у className, керована станом React. Для простих випадків достатньо шаблонного рядка, для складних — функція на кшталт clsx.",
    nextLessonNote: "Далі — порівняння трьох підходів до організації CSS: БЕМ, CSS Modules, utility-first.",
    practiceTask: {
      title: "Активна вкладка меню кав'ярні",
      description: "Додай умовний клас .active до вкладки навігації, коли вона відповідає поточному розділу.",
      checklist: ["Базовий клас завжди застосований.", "Умовний клас додається лише коли isActive true.", "Пробіл між класами не загублено."],
      starterFiles: [{ id: "css-arch2-start", path: "Tab.tsx", language: "tsx", label: "Tab.tsx", code: `function Tab({ label }: { label: string }) {\n  return <button className={styles.tab}>{label}</button>;\n}` }],
      solutionFiles: [
        {
          id: "css-arch2-solution",
          path: "Tab.tsx",
          language: "tsx",
          label: "Tab.tsx",
          code: `function Tab({ label, isActive }: { label: string; isActive: boolean }) {
  return (
    <button className={\`\${styles.tab} \${isActive ? styles.active : ""}\`}>
      {label}
    </button>
  );
}`,
          readOnly: true,
        },
      ],
      hints: ["Шаблонний рядок (backticks) — найпростіший спосіб об'єднати базовий і умовний клас."],
      expectedOutput: "Активна вкладка навігації візуально виділяється серед інших.",
    },
    microExercises: [
      { id: "css-conditional-bug", kind: "find-the-bug", prompt: "Чому клас не застосовується?", code: `className={\`\${styles.tab}\${isActive ? styles.active : ""}\`}`, correctAnswer: "Немає пробілу між styles.tab і наступним виразом — класи зливаються в один неіснуючий рядок.", solution: "Потрібен пробіл: `${styles.tab} ${isActive ? styles.active : \"\"}`." },
    ],
  },

  "БЕМ проти CSS Modules проти utility-first": {
    whatIsIt: "Три популярні підходи до організації CSS у великому проєкті: БЕМ (Block-Element-Modifier, іменування класів на кшталт card__title--large), CSS Modules (автоматична ізоляція класів на рівні файлу) та utility-first (готові одноцільові класи на кшталт Tailwind: flex, p-4, text-lg).",
    whyUseIt: "Без узгодженого підходу CSS у великому проєкті швидко перетворюється на хаос: однакові класи в різних місцях, незрозуміло, який стиль звідки походить, страшно видаляти старий CSS \"а раптом воно десь використовується\".",
    whenToUse: ["БЕМ — коли проєкт без React/CSS Modules (просто HTML+CSS) і потрібна дисципліна іменування без інструментів збірки.", "CSS Modules — стандартний вибір для React-проєктів середнього й великого розміру (саме цей підхід використовує цей навчальний застосунок).", "Utility-first (Tailwind) — коли команда готова писати стилі прямо в розмітці й цінує швидкість написання над читабельністю JSX."],
    whenNotToUse: ["Не змішуй усі три підходи в одному проєкті без чіткої причини — це ускладнює онбординг нових розробників.", "Не обирай utility-first, якщо команді важлива компактність JSX — className з 15 utility-класами важко читати."],
    comparisonTable: {
      headers: ["", "БЕМ", "CSS Modules", "Utility-first"],
      rows: [
        ["Приклад класу", ".card__title--large", ".Card_title_x7f2a (авто)", "text-lg font-bold"],
        ["Потрібен інструмент збірки?", "Ні", "Так (Vite/Webpack)", "Так (Tailwind)"],
        ["Ізоляція від конфліктів", "Лише за дисципліною", "Гарантована автоматично", "Гарантована (одноцільові класи)"],
        ["Швидкість написання", "Повільніше (думаєш про іменування)", "Середня", "Швидко (готові класи)"],
      ],
    },
    codeWalkthroughs: [
      {
        before: "Той самий компонент картки трьома підходами:",
        code: `/* БЕМ */
<div class="card">
  <h3 class="card__title card__title--large">Латте</h3>
</div>

/* CSS Modules (цей проєкт) */
<div className={styles.card}>
  <h3 className={styles.titleLarge}>Латте</h3>
</div>

/* Utility-first */
<div class="rounded-lg shadow p-4">
  <h3 class="text-lg font-bold">Латте</h3>
</div>`,
        lineNotes: ["БЕМ кодує структуру й варіант прямо в імені класу (card__title--large).", "CSS Modules ізолює автоматично — ім'я класу може бути коротким (titleLarge), конфлікт неможливий.", "Utility-first взагалі не має власних CSS-файлів компонента — усі стилі як готові класи прямо в розмітці."],
      },
    ],
    commonMistakes: ["Використання БЕМ-іменування (card__title) разом із CSS Modules — це зайве: CSS Modules вже гарантують ізоляцію, довгі БЕМ-імена там не потрібні.", "Думка, що один підхід \"правильний\", а інші \"погані\" — усі три активно використовуються в реальних проєктах, вибір залежить від контексту команди й інструментів."],
    dontDoThis: { code: `/* CSS Modules файл, але з БЕМ-іменуванням */\n.card__title--large { }`, explanation: "CSS Modules вже ізолюють класи автоматично — довге БЕМ-ім'я тут не додає користі, лише ускладнює читання. Досить короткого .titleLarge." },
    bestPractices: ["У React-проєкті без встановленого Tailwind — CSS Modules найпростіший стандартний вибір (саме так організований цей застосунок).", "У чистому HTML/CSS проєкті без збірки — БЕМ дає дисципліну іменування без інструментів."],
    remember: ["БЕМ — дисципліна іменування вручну, без інструментів збірки.", "CSS Modules — автоматична ізоляція на рівні файлу, стандарт для React.", "Utility-first — готові одноцільові класи прямо в розмітці, компактний CSS, менш компактний JSX."],
    interviewQuestions: [{ question: "Чому в React-проєктах CSS Modules зазвичай популярніші за БЕМ?", answer: "БЕМ вирішує проблему конфлікту імен класів лише дисципліною розробника (довгі унікальні імена), а CSS Modules вирішують ту саму проблему автоматично на рівні збірки — менше зусиль, менше людських помилок, тому в React-екосистемі це частіше стандартний вибір." }],
    summary: "БЕМ, CSS Modules і utility-first — три різні відповіді на одну проблему (конфлікт імен класів і організація стилів). Цей курс і застосунок побудовані на CSS Modules — стандартному виборі для React-проєктів.",
    proTip: "Не існує \"єдиного правильного\" підходу — важливіше, щоб уся команда дотримувалась ОДНОГО підходу послідовно, ніж який саме підхід обрано.",
    nextLessonNote: "CSS-курс завершується фінальним проєктом — зберемо всі стилі кав'ярні в один завершений лендінг.",
    practiceTask: {
      title: "Порівняй три підходи",
      description: "Розпізнай, який із трьох підходів (БЕМ / CSS Modules / utility-first) використано в кожному фрагменті коду.",
      checklist: ["БЕМ розпізнано за подвійним підкресленням і подвійним дефісом.", "CSS Modules розпізнано за import styles.", "Utility-first розпізнано за одноцільовими класами прямо в розмітці."],
      starterFiles: [{ id: "css-arch3-start", path: "notes.md", language: "markdown", label: "notes.md", code: `1. <div class="btn btn--primary btn__icon">\n2. <div className={styles.btnPrimary}>\n3. <div class="px-4 py-2 rounded bg-blue-500">` }],
      solutionFiles: [
        {
          id: "css-arch3-solution",
          path: "notes.md",
          language: "markdown",
          label: "notes.md",
          code: `1. БЕМ (btn--primary, btn__icon)
2. CSS Modules (styles.btnPrimary, згенероване ім'я)
3. Utility-first (px-4, py-2, rounded, bg-blue-500 — готові одноцільові класи)`,
          readOnly: true,
        },
      ],
      hints: ["Подвійний дефіс і подвійне підкреслення — фірмові ознаки БЕМ."],
      expectedOutput: "Три підходи правильно розпізнані за характерним синтаксисом класів.",
    },
    microExercises: [
      { id: "css-approach-choice", kind: "choice", prompt: "Команда працює над React-проєктом на Vite без Tailwind. Який підхід найпростіше застосувати без додаткових інструментів?", options: ["БЕМ", "CSS Modules", "Utility-first (Tailwind)", "Inline-стилі для всього"], correctAnswer: "CSS Modules", solution: "Vite підтримує CSS Modules із коробки (файли *.module.css) — не потрібно встановлювати жодних додаткових інструментів." },
    ],
  },
};
