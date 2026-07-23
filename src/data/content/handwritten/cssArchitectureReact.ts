import type { LessonOverride } from "./htmlFoundations";
import type { QuizData } from "../../../types/course";

/**
 * Module "Архітектура і React" (css-architecture-react). Cheat-sheet format.
 * Bridges the finished café styles.css to how CSS is organized inside a
 * React app: CSS Modules, conditional classes, and the BEM/Modules/utility
 * comparison. Doesn't touch the café project file directly (this module is
 * about organizing CSS, not new visual features).
 */
export const cssArchitectureReactOverrides: Record<string, LessonOverride> = {
  "CSS Modules": {
    interactiveDemo: "css-modules-demo",
    whatIsIt: "У попередньому модулі ми додали анімації до вже готового styles.css кав'ярні — одного великого файлу для всього сайту. У React-проєктах CSS частіше організований інакше: не один спільний файл, а окремі стилі для кожного компонента.\n\nCSS Modules — спосіб писати звичайний CSS у файлі виду Button.module.css, де кожен клас автоматично отримує унікальне ім'я (наприклад, .button перетворюється на .Button_button_a1b2c). Це вирішує проблему конфлікту імен класів між компонентами.",
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
    dontDoThis: { code: `<button className="button">Купити</button>`, explanation: "Код виглядає цілком нормально, і в редакторі жодної помилки чи попередження не видно — компонент рендериться, кнопка з'являється на сторінці. Але вона виглядає геть неоформленою: жодного padding, кольору чи border-radius з Button.module.css не застосувалось. Причина в тому, що рядок \"button\" — це буквально текст \"button\", а не те саме, що реальне, згенероване CSS Modules ім'я класу (щось на кшталт Button_button_a1b2c); клас .button у файлі стилів існує в браузері саме під цим згенерованим ім'ям, а не під тим, що написано в CSS-файлі. Виправлення: замінити className=\"button\" на className={styles.button} — тоді React підставить реальне, згенероване ім'я класу, яке справді існує в застосованому CSS. Перевірити можна в DevTools: подивись на реальний атрибут class кнопки в HTML — з правильним підходом там буде згенероване ім'я типу Button_button_xxxxx, а не просто button." },
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
      { id: "css-modules-globals-choice", kind: "choice", prompt: "Де правильно тримати CSS-змінні теми (--color-primary, --space-md), спільні для всього застосунку?", options: ["У кожному *.module.css компонента окремо", "В одному глобальному globals.css/variables.css", "У styles-об'єкті кожного компонента", "У атрибуті style напряму на елементах"], correctAnswer: "В одному глобальному globals.css/variables.css", solution: "CSS Modules призначені для ізоляції стилів КОМПОНЕНТА, а не для глобальних токенів дизайну — токени, спільні для всього застосунку, тримають в одному глобальному файлі, щоб не дублювати значення в кожному модулі." },
    ],
    quiz: {
      id: "css-architecture-react-css-modules-quiz",
      title: "Швидка перевірка: CSS Modules",
      questions: [
        {
          id: "css-arch-q1-classname-string-bug",
          type: "code",
          question: "У чому проблема цього коду в проєкті з CSS Modules?",
          codeSnippet: '<button className="button">Купити</button>',
          options: [
            "Рядок \"button\" не збігається зі згенерованим CSS Modules ім'ям класу — стилі не застосуються",
            "className взагалі не можна використовувати з рядком",
            "Потрібен ще атрибут id",
            "button не може бути класом кнопки",
          ],
          correctAnswer: "Рядок \"button\" не збігається зі згенерованим CSS Modules ім'ям класу — стилі не застосуються",
          explanation: "CSS Modules генерують унікальне ім'я класу (наприклад, Button_button_a1b2c). Потрібен className={styles.button}, щоб React підставив реальне згенероване ім'я.",
        },
        {
          id: "css-arch-q2-conflict-isolation",
          type: "single",
          question: "Чим CSS Modules відрізняються від звичайного CSS-файлу щодо конфлікту класів?",
          options: [
            "CSS Modules гарантовано ізолюють класи компонента — конфлікт неможливий",
            "Різниці немає, обидва підходи глобальні",
            "CSS Modules працюють лише з inline-стилями",
            "Звичайний CSS автоматично ізолює класи так само",
          ],
          correctAnswer: "CSS Modules гарантовано ізолюють класи компонента — конфлікт неможливий",
          explanation: "У звичайному CSS усі класи глобальні й можуть конфліктувати між файлами. CSS Modules автоматично генерують унікальне ім'я під час збірки.",
        },
        {
          id: "css-arch-q3-globals-placement",
          type: "single",
          question: "Де правильно тримати CSS-змінні теми (--color-primary, --space-md), спільні для всього застосунку?",
          options: [
            "У кожному *.module.css компонента окремо",
            "В одному глобальному globals.css/variables.css",
            "У styles-об'єкті кожного компонента",
            "У атрибуті style напряму на елементах",
          ],
          correctAnswer: "В одному глобальному globals.css/variables.css",
          explanation: "CSS Modules призначені для ізоляції стилів компонента, а не для глобальних токенів — токени тримають в одному файлі, щоб не дублювати значення.",
        },
        {
          id: "css-arch-q4-module-css-suffix",
          type: "true-false",
          question: "Суфікс .module.css у назві файлу вмикає автоматичну ізоляцію (унікалізацію) імен класів.",
          options: ["Так", "Ні"],
          correctAnswer: true,
          explanation: "Саме суфікс .module.css сигналізує збірнику (Vite/Webpack), що файл потрібно обробити як CSS Modules з генерацією унікальних імен класів.",
        },
        {
          id: "css-arch-q5-styles-object",
          type: "single",
          question: "Що таке styles у import styles from \"./Button.module.css\"?",
          options: [
            "Звичайний JS-об'єкт, де кожен ключ — це назва класу, а значення — реальне згенероване ім'я",
            "Рядок з усім вмістом CSS-файлу",
            "React-компонент",
            "Масив усіх класів файлу",
          ],
          correctAnswer: "Звичайний JS-об'єкт, де кожен ключ — це назва класу, а значення — реальне згенероване ім'я",
          explanation: "styles.button повертає рядок з реальним, унікальним ім'ям класу, яке справді існує в застосованому CSS.",
        },
      ],
    },
  },

  "Умовні класи в React": {
    interactiveDemo: "conditional-classes-demo",
    whatIsIt: "У попередньому уроці кожен клас у CSS Modules мав фіксоване, наперед визначене призначення. Але деякі класи мають з'являтись лише ІНОДІ — залежно від того, що зараз відбувається в застосунку (яка вкладка активна, чи є помилка у формі).\n\nУмовний клас — клас, який застосовується лише за певної умови (наприклад, .active лише для активної вкладки, .error лише за помилки валідації). У React це звичайний JavaScript-вираз усередині className.",
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
    dontDoThis: { code: `className={\`\${styles.tab}\${isActive ? styles.active : ""}\`}`, explanation: "Синтаксично код правильний — жодної помилки в консолі немає, шаблонний рядок обчислюється успішно. Але вкладка все одно виглядає \"звичайною\", навіть коли isActive точно true, — активний стиль ніби ігнорується. Причина в тому, що між ${styles.tab} і наступним виразом немає пробілу: два реальні імена класів (наприклад, Tab_tab_x1 і Tab_active_y2) склеюються в один суцільний рядок \"Tab_tab_x1Tab_active_y2\", якого не існує в застосованому CSS — className отримує один неіснуючий \"клас\" замість двох реальних. Виправлення: додати пробіл усередині шаблонного рядка — className={`${styles.tab} ${isActive ? styles.active : \"\"}`}, тепер там завжди рівно один пробіл між базовим і умовним класом. Перевірити можна в DevTools: подивись на атрибут class активної вкладки — з пробілом там два окремі слова-класи, без нього — одне довге склеєне слово." },
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
      { id: "css-conditional-approach-choice", kind: "choice", prompt: "Компонент картки товару має 4 незалежні умовні класи (обраний, у наявності, зі знижкою, новинка). Який підхід читабельніший за шаблонний рядок із чотирма тернарниками?", options: ["Ще довший шаблонний рядок з усіма 4 умовами", "Масив + filter(Boolean).join(\" \") або бібліотека clsx", "Inline style замість класів", "Окремий компонент для кожної комбінації станів"], correctAnswer: "Масив + filter(Boolean).join(\" \") або бібліотека clsx", solution: "Для 3+ умовних класів шаблонний рядок стає важким для читання; масив з filter/join чи clsx() масштабується набагато чистіше." },
    ],
    quiz: {
      id: "css-architecture-react-conditional-classes-quiz",
      title: "Швидка перевірка: Умовні класи в React",
      questions: [
        {
          id: "css-arch-q1-missing-space-bug",
          type: "code",
          question: "Клас .active не застосовується, навіть коли isActive true. У чому причина?",
          codeSnippet: 'className={`${styles.tab}${isActive ? styles.active : ""}`}',
          options: [
            "Немає пробілу між styles.tab і наступним виразом — класи зливаються в один неіснуючий рядок",
            "Потрійний оператор не можна використовувати в шаблонному рядку",
            "styles.active не існує в CSS Modules",
            "backticks не підтримуються в className",
          ],
          correctAnswer: "Немає пробілу між styles.tab і наступним виразом — класи зливаються в один неіснуючий рядок",
          explanation: "Без пробілу два реальні класи склеюються в один суцільний рядок, якого немає в застосованому CSS.",
        },
        {
          id: "css-arch-q2-conditional-mechanism",
          type: "single",
          question: "Як у React зробити так, щоб клас .active додавався лише коли вкладка активна?",
          options: [
            "className приймає звичайний рядок — можна побудувати його динамічно через шаблонний рядок з умовою",
            "Потрібен окремий CSS-файл для кожного стану",
            "React сам визначає активний стан за назвою пропса",
            "Це можливо лише через inline style",
          ],
          correctAnswer: "className приймає звичайний рядок — можна побудувати його динамічно через шаблонний рядок з умовою",
          explanation: "className={`${styles.tab} ${isActive ? styles.active : \"\"}`} — коли isActive true, додається styles.active, інакше порожній рядок.",
        },
        {
          id: "css-arch-q3-many-conditions",
          type: "single",
          question: "Компонент картки товару має 4 незалежні умовні класи. Який підхід читабельніший за шаблонний рядок із чотирма тернарниками?",
          options: [
            "Ще довший шаблонний рядок з усіма 4 умовами",
            "Масив + filter(Boolean).join(\" \") або бібліотека clsx",
            "Inline style замість класів",
            "Окремий компонент для кожної комбінації станів",
          ],
          correctAnswer: "Масив + filter(Boolean).join(\" \") або бібліотека clsx",
          explanation: "Для 3+ умовних класів шаблонний рядок стає важким для читання; масив з filter/join чи clsx() масштабується чистіше.",
        },
        {
          id: "css-arch-q4-nested-ternary",
          type: "true-false",
          question: "Глибоко вкладені потрійні оператори прямо в className у JSX вважаються хорошою практикою.",
          options: ["Так", "Ні"],
          correctAnswer: false,
          explanation: "Вкладені тернарники важко читати й дебажити — логіку варто винести в змінну чи функцію перед return.",
        },
        {
          id: "css-arch-q5-className-is-string",
          type: "single",
          question: "Що по суті є className у React?",
          options: [
            "Звичайний JS-рядок — умовна логіка це просто конкатенація рядків",
            "Спеціальний React-об'єкт зі своїм API",
            "Функція, яка викликається браузером",
            "Масив CSS-правил",
          ],
          correctAnswer: "Звичайний JS-рядок — умовна логіка це просто конкатенація рядків",
          explanation: "className приймає звичайний рядок, тому будь-яка умовна логіка (тернарники, шаблонні рядки, clsx) зрештою просто будує потрібний рядок класів.",
        },
      ],
    },
  },

  "БЕМ проти CSS Modules проти utility-first": {
    interactiveDemo: "naming-approach-demo",
    whatIsIt: "У попередніх двох уроках ми познайомились із CSS Modules і умовними класами — це один конкретний підхід до організації CSS у React. Але це не єдиний спосіб; варто знати, з чим його порівнюють, щоб розуміти, чому саме він обраний для цього курсу.\n\nТри популярні підходи до організації CSS у великому проєкті: БЕМ (Block-Element-Modifier, іменування класів на кшталт card__title--large), CSS Modules (автоматична ізоляція класів на рівні файлу) та utility-first (готові одноцільові класи на кшталт Tailwind: flex, p-4, text-lg).",
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
    dontDoThis: { code: `/* CSS Modules файл, але з БЕМ-іменуванням */\n.card__title--large { }`, explanation: "Стилі застосовуються коректно — конфлікту немає, картка виглядає правильно. Але з часом код починає виглядати надлишково: кожен клас у файлі, що вже гарантовано ізольований CSS Modules, додатково носить довге БЕМ-ім'я (card__title--large), яке в цьому контексті нічого не захищає, лише подовжує кожен рядок і ускладнює читання. Причина в тому, що БЕМ і CSS Modules вирішують ту саму проблему (конфлікт імен класів) двома різними способами — БЕМ дисципліною довгих унікальних імен, CSS Modules автоматичною ізоляцією на рівні збірки; використовувати їх одночасно означає платити подвійну складність за захист, який уже й так є. Виправлення: у файлі з CSS Modules достатньо короткого, простого імені (.titleLarge) — сама ізоляція вже гарантована суфіксом .module.css, БЕМ-префікси й модифікатори стають зайвими. Перевірити можна, порівнявши довжину й читабельність файлу з обома підходами: короткі імена в CSS Modules читаються швидше, не втрачаючи жодного захисту від конфліктів." },
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
      { id: "css-approach-bem-html-choice", kind: "choice", prompt: "Простий лендінг на чистому HTML+CSS, без збірки, без React. Який із трьох підходів підходить без жодних додаткових інструментів?", options: ["CSS Modules", "БЕМ", "Utility-first (Tailwind)", "Жоден не підходить без збірки"], correctAnswer: "БЕМ", solution: "БЕМ — це лише дисципліна іменування класів вручну, без потреби в інструментах збірки; CSS Modules і Tailwind у своєму стандартному вигляді потребують збірки (Vite/Webpack) чи власного інструментарію." },
    ],
    quiz: {
      id: "css-architecture-react-naming-approach-quiz",
      title: "Швидка перевірка: БЕМ проти CSS Modules проти utility-first",
      questions: [
        {
          id: "css-arch-q1-vite-no-tailwind",
          type: "single",
          question: "Команда працює над React-проєктом на Vite без Tailwind. Який підхід найпростіше застосувати без додаткових інструментів?",
          options: ["БЕМ", "CSS Modules", "Utility-first (Tailwind)", "Inline-стилі для всього"],
          correctAnswer: "CSS Modules",
          explanation: "Vite підтримує CSS Modules із коробки (файли *.module.css) — не потрібно встановлювати жодних додаткових інструментів.",
        },
        {
          id: "css-arch-q2-plain-html-no-build",
          type: "single",
          question: "Простий лендінг на чистому HTML+CSS, без збірки, без React. Який підхід підходить без жодних додаткових інструментів?",
          options: ["CSS Modules", "БЕМ", "Utility-first (Tailwind)", "Жоден не підходить без збірки"],
          correctAnswer: "БЕМ",
          explanation: "БЕМ — це лише дисципліна іменування класів вручну, без потреби в інструментах збірки. CSS Modules і Tailwind потребують збірки чи власного інструментарію.",
        },
        {
          id: "css-arch-q3-redundant-bem-in-modules",
          type: "code",
          question: "У чому недолік цього підходу?",
          codeSnippet: "/* CSS Modules файл */\n.card__title--large { }",
          options: [
            "БЕМ-іменування зайве всередині CSS Modules — ізоляція вже гарантована суфіксом .module.css",
            "БЕМ і CSS Modules технічно несумісні й викличуть помилку",
            "Подвійне підкреслення не можна використовувати в CSS-класах",
            "Це найкраща практика для React-проєктів",
          ],
          correctAnswer: "БЕМ-іменування зайве всередині CSS Modules — ізоляція вже гарантована суфіксом .module.css",
          explanation: "БЕМ і CSS Modules вирішують ту саму проблему (конфлікт імен) двома різними способами. Використовувати обидва одночасно — платити подвійну складність за вже наявний захист.",
        },
        {
          id: "css-arch-q4-no-single-correct",
          type: "true-false",
          question: "Один із трьох підходів (БЕМ, CSS Modules, utility-first) вважається завжди правильним, а решта — поганими практиками.",
          options: ["Так", "Ні"],
          correctAnswer: false,
          explanation: "Усі три активно використовуються в реальних проєктах — вибір залежить від контексту команди й інструментів, а не від того, який підхід \"правильний\".",
        },
        {
          id: "css-arch-q5-why-modules-popular-react",
          type: "single",
          question: "Чому в React-проєктах CSS Modules зазвичай популярніші за БЕМ?",
          options: [
            "CSS Modules вирішують конфлікт імен автоматично на рівні збірки, а не дисципліною розробника",
            "БЕМ технічно несумісний з React",
            "CSS Modules швидші за БЕМ у продуктивності рендерингу",
            "БЕМ застарів і більше не підтримується браузерами",
          ],
          correctAnswer: "CSS Modules вирішують конфлікт імен автоматично на рівні збірки, а не дисципліною розробника",
          explanation: "БЕМ вирішує проблему конфлікту імен лише дисципліною (довгі унікальні імена), а CSS Modules — автоматично, з меншою кількістю людських помилок.",
        },
      ],
    },
  },
};

export const cssArchitectureReactModuleQuiz: QuizData = {
  id: "css-architecture-react-module-quiz",
  title: "Контрольний тест: Архітектура і React",
  questions: [
    {
      id: "css-arch-mod-q1-modules-purpose",
      type: "single",
      question: "Яку проблему вирішують CSS Modules?",
      options: [
        "Конфлікт імен класів між компонентами",
        "Повільне завантаження сторінки",
        "Відсутність підтримки flexbox у старих браузерах",
        "Необхідність писати JavaScript замість CSS",
      ],
      correctAnswer: "Конфлікт імен класів між компонентами",
      explanation: "У звичайному CSS усі класи глобальні й можуть конфліктувати. CSS Modules автоматично генерують унікальне ім'я для кожного класу.",
    },
    {
      id: "css-arch-mod-q2-string-classname-bug",
      type: "code",
      question: "Чому стилі не застосовуються до цієї кнопки в проєкті з CSS Modules?",
      codeSnippet: '<button className="button">Купити</button>',
      options: [
        "Рядок \"button\" не збігається зі згенерованим ім'ям класу — потрібен className={styles.button}",
        "button — зарезервоване слово в React",
        "Потрібна ще властивість style",
        "CSS Modules не підтримують кнопки",
      ],
      correctAnswer: "Рядок \"button\" не збігається зі згенерованим ім'ям класу — потрібен className={styles.button}",
      explanation: "CSS Modules генерують унікальне ім'я класу (наприклад, Button_button_a1b2c), яке не збігається з буквальним рядком \"button\".",
    },
    {
      id: "css-arch-mod-q3-space-bug",
      type: "true-false",
      question: "У шаблонному рядку className={`${styles.tab}${isActive ? styles.active : \"\"}`} відсутність пробілу між виразами не впливає на результат.",
      options: ["Так", "Ні"],
      correctAnswer: false,
      explanation: "Без пробілу два реальні класи склеюються в один суцільний неіснуючий рядок класу.",
    },
    {
      id: "css-arch-mod-q4-bem-no-build",
      type: "single",
      question: "Який підхід до організації CSS підходить для простого HTML+CSS лендінгу без жодного інструменту збірки?",
      options: ["БЕМ", "CSS Modules", "Utility-first (Tailwind) у стандартному вигляді", "Жоден без збірки"],
      correctAnswer: "БЕМ",
      explanation: "БЕМ — це дисципліна іменування класів вручну, без потреби в інструментах збірки на кшталт Vite чи Webpack.",
    },
    {
      id: "css-arch-mod-q5-globals-vs-modules",
      type: "single",
      question: "Де правильно тримати CSS-змінні теми, спільні для всього застосунку (--color-primary тощо)?",
      options: [
        "В одному глобальному globals.css/variables.css",
        "У кожному *.module.css компонента окремо",
        "У styles-об'єкті кожного компонента",
        "Безпосередньо в атрибуті style кожного елемента",
      ],
      correctAnswer: "В одному глобальному globals.css/variables.css",
      explanation: "CSS Modules призначені для ізоляції стилів компонента, а не глобальних токенів дизайну — токени тримають в одному місці, щоб не дублювати.",
    },
    {
      id: "css-arch-mod-q6-true-statements",
      type: "multiple",
      question: "Які з тверджень про організацію CSS у React правильні?",
      options: [
        "CSS Modules гарантують ізоляцію класів автоматично на рівні збірки",
        "Вкладені потрійні оператори прямо в className вважаються найчитабельнішим підходом для 4+ умовних класів",
        "БЕМ вирішує конфлікт імен дисципліною іменування, а не інструментами збірки",
        "Один із трьох підходів (БЕМ/CSS Modules/utility-first) завжди правильний, решта — помилка",
      ],
      correctAnswer: [
        "CSS Modules гарантують ізоляцію класів автоматично на рівні збірки",
        "БЕМ вирішує конфлікт імен дисципліною іменування, а не інструментами збірки",
      ],
      explanation: "Для 4+ умовних класів масив з filter/join чи clsx читабельніший за вкладені тернарники. Вибір підходу до CSS залежить від контексту команди, а не від абсолютної \"правильності\" одного з них.",
      optionExplanations: {
        "Вкладені потрійні оператори прямо в className вважаються найчитабельнішим підходом для 4+ умовних класів": "Навпаки: для 3+ умовних класів шаблонний рядок з тернарниками стає важким для читання — масив + filter/join чи clsx() масштабується чистіше.",
        "Один із трьох підходів (БЕМ/CSS Modules/utility-first) завжди правильний, решта — помилка": "Невірно: усі три активно використовуються в реальних проєктах, вибір залежить від контексту команди й інструментів.",
      },
    },
  ],
};
