import type { LessonOverride } from "./htmlFoundations";

/**
 * Module "TypeScript у React" (ts-react). Fifth and final TypeScript
 * module — a bridge module gated on having finished BOTH basic TypeScript
 * (ts-basics through ts-generics) AND basic React (assumed already known
 * from a separate React course). Per the prompt, this module does NOT
 * re-teach React itself — it teaches how to apply already-learned
 * TypeScript concepts (interfaces, optional properties, union/literal
 * types, generics, discriminated unions) to already-known React concepts
 * (props, children, events, useState, custom hooks). No new TypeScript
 * concepts are introduced here beyond what earlier modules covered.
 */
export const tsReactOverrides: Record<string, LessonOverride> = {
  "Типізація пропсів компонента": {
    interactiveDemo: "component-props-demo",
    whatIsIt:
      "Пропси компонента — це звичайний обʼєкт, який компонент отримує як єдиний параметр функції, тому типізуються вони так само, як будь-який інший обʼєкт-параметр (детальніше про це — у модулі ts-functions): через interface чи type alias, застосований до цього параметра. interface PriceTagProps { title: string; price: number; discountPercent?: number; } описує форму пропсів для компонента PriceTag — обовʼязкові title і price, необовʼязковий discountPercent (детальніше про необовʼязкові властивості — у модулі ts-objects).",
    whyUseIt:
      "Без типізації пропсів компонент прийняв би будь-які пропси взагалі — забутий обовʼязковий пропс чи неправильний тип значення виявились би лише тоді, коли компонент спробував би використати ці дані під час рендеру (наприклад, price.toFixed() на рядку замість числа). Типізація пропсів через interface дозволяє компілятору перевірити КОЖЕН виклик компонента (кожен &lt;PriceTag ... /&gt; у коді) ще до запуску — так само, як перевіряється звичайний виклик функції.",
    whenToUse: [
      "Для кожного компонента, що приймає пропси, — це стандартна, обовʼязкова практика в TypeScript+React проєктах.",
      "Обовʼязкові пропси без ? — коли компонент реально не може відрендеритись правильно без цього значення.",
      "Необовʼязкові пропси з ? — коли є розумне значення поведінки за замовчуванням, якщо проп не передали.",
    ],
    whenNotToUse: [
      "Не роби всі пропси необовʼязковими \"про всяк випадок\" — це прибирає перевірку на реально обовʼязкові дані.",
      "Не використовуй any для типу пропсів — це вимикає всю перевірку, яку типізація покликана забезпечити.",
      "Не плутай типізацію пропсів із самим React — тут працюють ті самі правила interface/type, що й для будь-якого іншого обʼєкта в TypeScript.",
    ],
    comparisonTable: {
      headers: ["Виклик компонента", "Реакція компілятора"],
      rows: [
        ['<PriceTag title="Латте" price={65} discountPercent={10} />', "Дозволено — усі обовʼязкові поля присутні, типи правильні"],
        ['<PriceTag price={65} />', "Помилка — бракує обовʼязкової властивості title"],
        ['<PriceTag title="Латте" price="65" />', "Помилка — price повинен бути number, а не рядок"],
      ],
    },
    codeWalkthroughs: [
      {
        before: "Типізований компонент із обовʼязковими й необовʼязковими пропсами:",
        code: `interface PriceTagProps {
  title: string;
  price: number;
  discountPercent?: number;
}

function PriceTag({ title, price, discountPercent }: PriceTagProps) {
  const finalPrice = discountPercent ? price * (1 - discountPercent / 100) : price;
  return <div>{title}: {finalPrice.toFixed(0)} грн</div>;
}`,
        lineNotes: [
          "interface PriceTagProps описує форму пропсів так само, як будь-який інший обʼєкт (детальніше — у модулі ts-objects).",
          "{ title, price, discountPercent }: PriceTagProps — деструктуризація параметра з анотацією типу, як у звичайній функції.",
          "discountPercent ? ... : ... безпечно обробляє необовʼязковий проп через перевірку на falsy-значення.",
        ],
      },
      {
        before: "Порушення контракту пропсів:",
        code: `<PriceTag price={65} />
// Помилка компілятора:
// Property 'title' is missing in type '{ price: number; }' but required in type 'PriceTagProps'.`,
        lineNotes: [
          "Компілятор перевіряє JSX-виклик <PriceTag ... /> так само, як звичайний виклик функції з обʼєктом-аргументом.",
          "Бракує обовʼязкового title — помилка видна одразу в редакторі, до спроби відрендерити компонент.",
        ],
      },
    ],
    commonMistakes: [
      "Забувати типізувати пропси взагалі й покладатись на неявний any для параметра компонента.",
      "Робити всі пропси необовʼязковими незалежно від того, чи компонент справді може без них коректно відрендеритись.",
      "Плутати проп зі значенням за замовчуванням (детальніше про параметри функцій — у модулі ts-functions) із необовʼязковим пропом.",
    ],
    dontDoThis: {
      code: `function PriceTag(props) {\n  return <div>{props.title}: {props.price.toFixed(0)} грн</div>;\n}\n\n<PriceTag price={65} />;`,
      explanation:
        "Без типізації props компілятор не бачить жодної проблеми у виклику <PriceTag price={65} /> — параметр props мовчки отримав тип any, тому props.title теж any, і спроба відрендерити undefined замість назви товару не викликає жодної помилки компілятора. Реальна проблема проявиться лише на екрані: користувач побачить порожнє місце там, де мала бути назва напою, — і причину доведеться шукати вручну, переглядаючи, звідки саме прийшов цей PriceTag виклик. Виправлення: додати interface PriceTagProps { title: string; price: number } і анотацію (props: PriceTagProps) — тепер виклик <PriceTag price={65} /> одразу стає помилкою компілятора. Перевірити можна, додавши цю типізацію, — помилка про відсутній title зʼявиться миттєво.",
    },
    bestPractices: [
      "Завжди типізуй пропси компонента через interface чи type — це стандартна практика в будь-якому TypeScript+React проєкті.",
      "Позначай необовʼязковими лише ті пропси, для яких справді існує розумна поведінка за замовчуванням.",
      "Давай типу пропсів імʼя за конвенцією ІмʼяКомпонентаProps (PriceTagProps для компонента PriceTag).",
    ],
    remember: [
      "Пропси — звичайний обʼєкт-параметр, типізується interface/type так само, як будь-який інший обʼєкт.",
      "Компілятор перевіряє кожен JSX-виклик компонента так само, як звичайний виклик функції.",
      "Необовʼязкові пропси (?) — для полів із розумним значенням за замовчуванням; обовʼязкові — для критичних для рендеру даних.",
    ],
    interviewQuestions: [
      { question: "Як типізуються пропси React-компонента?", answer: "Через interface чи type alias, застосований до параметра функції компонента, — так само, як типізується будь-який інший обʼєкт-параметр. Компілятор перевіряє кожен виклик компонента (JSX-тег) проти цього типу." },
      { question: "Чому важливо типізувати пропси, а не покладатись на неявний any?", answer: "Без типізації забутий обовʼязковий проп чи неправильний тип значення не викликають жодної помилки компілятора — проблема проявиться лише на екрані під час реального рендеру, і причину доведеться шукати вручну. Типізація ловить це одразу в редакторі, для кожного виклику компонента в проєкті." },
    ],
    summary:
      "Пропси React-компонента типізуються через interface чи type alias, застосований до параметра функції компонента — так само, як типізується будь-який інший обʼєкт (правила з модуля ts-objects тут повністю застосовні). Компілятор перевіряє кожен JSX-виклик компонента проти цього типу, ловлячи забуті обовʼязкові пропси й неправильні типи значень ще до рендеру.",
    nextLessonNote: "Далі — типізація children: як типізувати вміст, переданий між відкриваючим і закриваючим тегом компонента.",
    practiceTask: {
      title: "Типізуй компонент картки товару",
      description: "Створи interface ProductCardProps для компонента, що приймає назву товару (обовʼязково), ціну (обовʼязково) і опис (необовʼязково), і виправ виклик, якому бракує обовʼязкового пропа.",
      checklist: [
        "interface ProductCardProps має title: string, price: number.",
        "description позначений необовʼязковим: description?: string.",
        "Усі виклики компонента передають обовʼязкові пропси.",
      ],
      starterFiles: [
        {
          id: "ts-react-props-start",
          path: "index.tsx",
          language: "tsx",
          label: "index.tsx",
          code: `function ProductCard(props) {\n  return <div>{props.title} — {props.price} грн</div>;\n}\n\n<ProductCard price={65} />;`,
        },
      ],
      solutionFiles: [
        {
          id: "ts-react-props-solution",
          path: "index.tsx",
          language: "tsx",
          label: "index.tsx",
          code: `interface ProductCardProps {\n  title: string;\n  price: number;\n  description?: string;\n}\n\nfunction ProductCard({ title, price, description }: ProductCardProps) {\n  return (\n    <div>\n      {title} — {price} грн\n      {description ? <p>{description}</p> : null}\n    </div>\n  );\n}\n\n<ProductCard title="Латте" price={65} />;`,
          readOnly: true,
        },
      ],
      hints: ["Компілятор одразу підкреслить <ProductCard price={65} /> як помилку, щойно title стане обовʼязковим полем інтерфейсу."],
      expectedOutput: "Виклик без title стає помилкою компілятора; виклик з title і price працює без помилок.",
    },
    microExercises: [
      { id: "ts-react-props-predict", kind: "predict", prompt: "interface ButtonProps { label: string; disabled?: boolean } — чи можна викликати <Button label=\"Ок\" />, не передаючи disabled?", solution: "Так. disabled позначений необовʼязковим (?), тому компонент можна викликати без нього — disabled усередині компонента буде undefined." },
      { id: "ts-react-props-find-bug", kind: "find-the-bug", prompt: "interface CardProps { title: string } function Card(props: CardProps) { return <div>{props.subtitle}</div>; } — у чому проблема?", solution: "CardProps не має властивості subtitle взагалі — компілятор покаже помилку Property 'subtitle' does not exist on type 'CardProps' на рядку props.subtitle." },
    ],
  },

  "Типізація children": {
    interactiveDemo: "children-props-demo",
    whatIsIt:
      "children — це спеціальний проп, що містить усе, що передане між відкриваючим і закриваючим тегом компонента (&lt;Card&gt;ось тут&lt;/Card&gt;). Правильний тип для нього — ReactNode: вбудований у типи React union, що охоплює все, що компонент реально МОЖЕ повернути чи прийняти як вміст — рядок, число, JSX-елемент, масив елементів, null, undefined, boolean.",
    whyUseIt:
      "children може бути значно ширшим за просте \"текст\", ніж здається спочатку: не лише рядок, а й число, готовий JSX-елемент, масив елементів чи навіть null (коли контент умовно не рендериться). Якби типізувати children вужче — наприклад, просто string, — це одразу заборонило б абсолютно нормальні й часті випадки використання, на кшталт &lt;Card&gt;{count}&lt;/Card&gt; (де count — число) чи &lt;Card&gt;&lt;strong&gt;Латте&lt;/strong&gt;&lt;/Card&gt; (де вміст — сам JSX-елемент).",
    whenToUse: [
      "Для будь-якого компонента-обгортки, що просто рендерить те, що йому передали між тегами (картки, контейнери, модальні вікна).",
      "children: ReactNode — стандартний, найширший і найбезпечніший вибір для звичайного вмісту.",
      "Якщо компонент реально приймає лише текст (наприклад, для заголовка), можна звузити тип до string — але це осмислений вибір, а не типовий.",
    ],
    whenNotToUse: [
      "Не типізуй children як string там, де компонент реально повинен приймати довільний JSX-вміст, — це заборонить нормальні випадки використання.",
      "Не плутай children із звичайним пропом — це той самий механізм типізації пропсів (interface { children: ReactNode }), просто з особливим синтаксисом JSX-вкладення.",
      "Не забувай, що children необовʼязковий лише тоді, коли компонент справді може бути порожнім (&lt;Card /&gt; без вмісту) — інакше залиш його обовʼязковим полем.",
    ],
    comparisonTable: {
      headers: ["Тип children", "Що дозволено передати між тегами"],
      rows: [
        ["children: string", "Лише рядок — число, JSX-елемент чи масив стануть помилкою"],
        ["children: ReactNode", "Рядок, число, JSX-елемент, масив елементів, null, undefined, boolean"],
      ],
    },
    codeWalkthroughs: [
      {
        before: "Компонент-картка з правильно типізованими children:",
        code: `import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
}

function Card({ children }: CardProps) {
  return <div className="card">{children}</div>;
}

<Card>Латте — 65 грн</Card>;
<Card>{65}</Card>;
<Card><strong>Латте</strong> — 65 грн</Card>;`,
        lineNotes: [
          "children: ReactNode дозволяє всі три виклики нижче — рядок, число, JSX-елемент.",
          "import type { ReactNode } from \"react\" — тип імпортується з бібліотеки React, це не власний тип проєкту.",
        ],
      },
    ],
    commonMistakes: [
      "Типізувати children вужче (string), ніж дозволяє реальне використання компонента.",
      "Забувати імпортувати тип ReactNode з react перед використанням.",
      "Робити children обовʼязковим для компонента, який насправді повинен вміти рендеритись і без вмісту.",
    ],
    dontDoThis: {
      code: `interface CardProps {\n  children: string;\n}\n\nfunction Card({ children }: CardProps) {\n  return <div>{children}</div>;\n}\n\n<Card><strong>Латте</strong></Card>;`,
      explanation:
        "Компілятор одразу підкреслює <Card><strong>Латте</strong></Card> червоним. Причина в тому, що children: string дозволяє передати лише звичайний рядок, а &lt;strong&gt;Латте&lt;/strong&gt; — це JSX-елемент, а не рядок, навіть якщо в підсумку він рендерить текст. Це показує типову помилку заниження типу children: розробник хотів дозволити \"будь-який текстовий вміст\", але типізував вужче, ніж реально потрібно, — і тепер компонент технічно не приймає жодного форматованого вмісту (жирний текст, посилання, вкладені елементи), хоча в React це абсолютно нормальний і частий випадок використання. Виправлення: замінити children: string на children: ReactNode. Перевірити можна, зробивши цю заміну, — виклик із &lt;strong&gt; одразу перестає бути помилкою.",
    },
    bestPractices: [
      "Обирай children: ReactNode за замовчуванням для будь-якого компонента-обгортки — це найширший, найбезпечніший вибір.",
      "Звужуй тип children (наприклад, до string) лише коли є справжня, обґрунтована причина обмежити вміст.",
      "Роби children необовʼязковим (children?: ReactNode) лише тоді, коли компонент реально повинен уміти рендеритись порожнім.",
    ],
    remember: [
      "children — спеціальний проп для вмісту між відкриваючим і закриваючим тегом компонента.",
      "ReactNode — стандартний, найширший тип для children: рядок, число, JSX-елемент, масив, null, undefined, boolean.",
      "Типізація children — той самий interface/type-механізм, що й для будь-якого іншого пропа.",
    ],
    interviewQuestions: [
      { question: "Що таке ReactNode і чому його зазвичай використовують для типізації children?", answer: "ReactNode — вбудований у типи React union, що охоплює все, що компонент реально може прийняти чи повернути як вміст: рядки, числа, JSX-елементи, масиви елементів, null, undefined, boolean. Це найширший і найбезпечніший вибір для children, бо не забороняє жоден із реально поширених способів використання компонента." },
      { question: "Чому типізація children: string часто є помилкою?", answer: "Вона забороняє передати JSX-елементи (наприклад, &lt;strong&gt;текст&lt;/strong&gt;), числа чи масиви елементів як вміст компонента — усе це абсолютно нормальні, часті випадки використання в React, які children: ReactNode дозволяє, а children: string помилково забороняє." },
    ],
    summary:
      "children — спеціальний проп для вмісту між тегами компонента, типізується так само, як будь-який інший проп, але зазвичай через тип ReactNode — найширший union, що охоплює рядки, числа, JSX-елементи, масиви, null, undefined і boolean. Вужчі типи (string) майже завжди помилково забороняють щось, що React реально вміє коректно відрендерити.",
    nextLessonNote: "Далі — типізація подій: реальні типи подій React (ChangeEvent, FormEvent) для обробників у формах.",
    practiceTask: {
      title: "Типізуй компонент панелі сповіщень",
      description: "Створи interface NotificationPanelProps із children: ReactNode і перевір, що компонент приймає і текст, і довільні JSX-елементи.",
      checklist: [
        "interface NotificationPanelProps має children: ReactNode.",
        "ReactNode імпортований з react.",
        "Компонент коректно рендерить і рядок, і JSX-елемент як children.",
      ],
      starterFiles: [
        {
          id: "ts-react-children-start",
          path: "index.tsx",
          language: "tsx",
          label: "index.tsx",
          code: `interface NotificationPanelProps {\n  children: string;\n}\n\nfunction NotificationPanel({ children }: NotificationPanelProps) {\n  return <div className="notification">{children}</div>;\n}\n\n<NotificationPanel><strong>Увага!</strong> Замовлення готове</NotificationPanel>;`,
        },
      ],
      solutionFiles: [
        {
          id: "ts-react-children-solution",
          path: "index.tsx",
          language: "tsx",
          label: "index.tsx",
          code: `import type { ReactNode } from "react";\n\ninterface NotificationPanelProps {\n  children: ReactNode;\n}\n\nfunction NotificationPanel({ children }: NotificationPanelProps) {\n  return <div className="notification">{children}</div>;\n}\n\n<NotificationPanel><strong>Увага!</strong> Замовлення готове</NotificationPanel>;`,
          readOnly: true,
        },
      ],
      hints: ["Заміни children: string на children: ReactNode і додай import type { ReactNode } from \"react\"."],
      expectedOutput: "Компонент коректно приймає JSX-елемент <strong> як частину children без помилок компілятора.",
    },
    microExercises: [
      { id: "ts-react-children-choice", kind: "choice", prompt: "Який тип найкраще підходить для children компонента-обгортки, що може приймати будь-який вміст?", options: ["string", "ReactNode", "object", "any"], correctAnswer: "ReactNode", solution: "ReactNode — стандартний, найширший тип, що охоплює всі реальні варіанти вмісту React-компонента, не вимикаючи при цьому перевірку типів (на відміну від any)." },
    ],
  },

  "Типізація подій": {
    interactiveDemo: "event-typing-demo",
    whatIsIt:
      "React надає власні типи подій — ChangeEvent, FormEvent, MouseEvent (з бібліотеки react, а не вбудовані типи чистого DOM) — які типізують саме той обʼєкт події, що його React реально передає обробнику. function handleChange(event: ChangeEvent&lt;HTMLInputElement&gt;): void типізує обробник onChange для конкретно input-елемента: event.target тут типізований як HTMLInputElement, тому event.target.value — реальний, доступний рядок.",
    whyUseIt:
      "Без явного типу параметр обробника події отримав би тип any, і event.target.value технічно \"працював\" би, але без жодної перевірки компілятора: якщо десь у коді помилково звернутись до властивості, якої в HTMLInputElement немає (наприклад, event.target.checked на текстовому полі — це властивість чекбоксів), компілятор про це не попередить. Типізований ChangeEvent&lt;HTMLInputElement&gt; гарантує, що event.target — саме HTMLInputElement, і дозволяє лише ті властивості й методи, які реально в нього є.",
    whenToUse: [
      "onChange для input/textarea/select: ChangeEvent<HTMLInputElement> (чи відповідний елемент).",
      "onSubmit для form: FormEvent<HTMLFormElement>, з реальним event.preventDefault().",
      "onClick для button: MouseEvent<HTMLButtonElement> — коли всередині обробника реально потрібні деталі події (координати кліку тощо).",
    ],
    whenNotToUse: [
      "Не використовуй звичайний Event із чистого DOM для обробників React — React типи (ChangeEvent, FormEvent) точніше відображають, що саме React передає обробнику.",
      "Не типізуй параметр обробника як any — це вимикає всю перевірку властивостей event.target.",
      "Не забувай про правильний елемент у дженерику: ChangeEvent<HTMLInputElement> і ChangeEvent<HTMLSelectElement> — різні типи з різними реальними властивостями target.",
    ],
    comparisonTable: {
      headers: ["Обробник", "Тип параметра події"],
      rows: [
        ["onChange для <input>", "ChangeEvent<HTMLInputElement>"],
        ["onSubmit для <form>", "FormEvent<HTMLFormElement>"],
        ["onClick для <button>", "MouseEvent<HTMLButtonElement>"],
      ],
    },
    codeWalkthroughs: [
      {
        before: "Типізований обробник onChange для текстового поля:",
        code: `import type { ChangeEvent } from "react";

function handleChange(event: ChangeEvent<HTMLInputElement>): void {
  console.log(event.target.value);
}

<input type="text" onChange={handleChange} />;`,
        lineNotes: [
          "ChangeEvent<HTMLInputElement> типізує event.target саме як HTMLInputElement.",
          "event.target.value реально доступний і типізований як string — саме те, що потрібно для контрольованого поля.",
        ],
      },
      {
        before: "Типізований обробник onSubmit форми:",
        code: `import type { FormEvent } from "react";

function handleSubmit(event: FormEvent<HTMLFormElement>): void {
  event.preventDefault();
  console.log("Форму надіслано");
}

<form onSubmit={handleSubmit}>...</form>;`,
        lineNotes: [
          "FormEvent<HTMLFormElement> типізує подію onSubmit форми.",
          "event.preventDefault() — реальний метод, що справді зупиняє типове перезавантаження сторінки браузером.",
        ],
      },
    ],
    commonMistakes: [
      "Типізувати параметр обробника як any замість конкретного типу події React.",
      "Плутати ChangeEvent<HTMLInputElement> з ChangeEvent<HTMLSelectElement> для різних типів елементів.",
      "Забувати виклик event.preventDefault() у onSubmit, через що форма реально перезавантажує сторінку.",
    ],
    dontDoThis: {
      code: `function handleChange(event) {\n  console.log(event.target.value);\n}\n\n<input type="text" onChange={handleChange} />;`,
      explanation:
        "Код технічно працює — event.target.value реально повертає значення поля під час виконання. Але параметр event без типу отримав неявний any, тому компілятор не перевіряє, чи event.target реально має властивість value, чи чи існує метод, який десь далі спробують викликати. Якщо хтось помилково додасть event.target.checked (властивість чекбоксів, якої немає в текстового поля) чи іншу неіснуючу властивість, компілятор про це не попередить — помилка виявиться лише під час виконання, коли ця властивість реально виявиться undefined. Виправлення: додати анотацію event: ChangeEvent<HTMLInputElement> і імпортувати ChangeEvent з react. Перевірити можна, додавши цю анотацію й спробувавши звернутись до неіснуючої властивості — компілятор одразу це заборонить.",
    },
    bestPractices: [
      "Завжди типізуй параметр обробника події конкретним типом React (ChangeEvent, FormEvent, MouseEvent), а не any.",
      "Обирай правильний елемент у дженерику типу події (HTMLInputElement, HTMLFormElement) відповідно до реального елемента.",
      "Викликай event.preventDefault() у onSubmit, коли форма обробляється через JavaScript, а не типове перезавантаження сторінки.",
    ],
    remember: [
      "React надає власні типи подій (ChangeEvent, FormEvent, MouseEvent) — вони типізують реальний обʼєкт події, який React передає обробнику.",
      "ChangeEvent<HTMLInputElement> типізує event.target саме як HTMLInputElement, тому .value реально доступний і типізований.",
      "Тип дженерика (елемент усередині &lt;...&gt;) повинен відповідати реальному елементу, на якому подія відбувається.",
    ],
    interviewQuestions: [
      { question: "Чому для обробників подій у React використовують ChangeEvent, FormEvent замість звичайних DOM-типів Event?", answer: "React-типи (ChangeEvent, FormEvent з бібліотеки react) точно відображають той обʼєкт події, який React реально передає обробнику, і дозволяють вказати конкретний елемент (наприклад, HTMLInputElement) через дженерик — це дає точний тип event.target із реальними властивостями саме цього елемента." },
      { question: "Що станеться, якщо типізувати event.target у обробнику ChangeEvent<HTMLInputElement> і звернутись до event.target.checked?", answer: "Компілятор покаже помилку — checked не існує в типі HTMLInputElement для загального текстового поля так само, як value; для чекбоксів це реальна властивість, але компілятор перевіряє точну відповідність типу елемента, вказаного в дженерику ChangeEvent." },
    ],
    summary:
      "React надає власні типи подій — ChangeEvent<HTMLInputElement>, FormEvent<HTMLFormElement>, MouseEvent<HTMLButtonElement> — які точно типізують обʼєкт події, реально переданий обробнику, включно з правильним типом event.target для конкретного елемента. Це дозволяє безпечно звертатись до event.target.value чи викликати event.preventDefault(), з перевіркою компілятора на кожному кроці.",
    nextLessonNote: "Далі — типізація useState: коли потрібен явний параметр типу, а коли досить виведення.",
    practiceTask: {
      title: "Типізуй обробники форми пошуку",
      description: "Додай правильні типи React-подій для обробника зміни поля пошуку й обробника відправки форми.",
      checklist: [
        "handleSearchChange приймає ChangeEvent<HTMLInputElement>.",
        "handleSearchSubmit приймає FormEvent<HTMLFormElement> і викликає preventDefault().",
        "Немає жодного параметра з неявним any.",
      ],
      starterFiles: [
        {
          id: "ts-react-events-start",
          path: "index.tsx",
          language: "tsx",
          label: "index.tsx",
          code: `function handleSearchChange(event) {\n  console.log(event.target.value);\n}\n\nfunction handleSearchSubmit(event) {\n  console.log("Пошук виконано");\n}`,
        },
      ],
      solutionFiles: [
        {
          id: "ts-react-events-solution",
          path: "index.tsx",
          language: "tsx",
          label: "index.tsx",
          code: `import type { ChangeEvent, FormEvent } from "react";\n\nfunction handleSearchChange(event: ChangeEvent<HTMLInputElement>): void {\n  console.log(event.target.value);\n}\n\nfunction handleSearchSubmit(event: FormEvent<HTMLFormElement>): void {\n  event.preventDefault();\n  console.log("Пошук виконано");\n}`,
          readOnly: true,
        },
      ],
      hints: ["Не забудь event.preventDefault() у handleSearchSubmit, інакше сторінка типово перезавантажиться."],
      expectedOutput: "Обидва обробники повністю типізовані, жодного неявного any.",
    },
    microExercises: [
      { id: "ts-react-events-find-bug", kind: "find-the-bug", prompt: "function handleChange(event: ChangeEvent<HTMLSelectElement>) { console.log(event.target.value); } — використовується для <input type=\"text\" onChange={handleChange} />. У чому проблема?", solution: "Тип дженерика не відповідає реальному елементу — input, а не select. Слід використати ChangeEvent<HTMLInputElement>, інакше типізація не відображає реальний елемент, хоча .value технічно існує в обох." },
    ],
  },

  "Типізація useState": {
    interactiveDemo: "use-state-typing-demo",
    whatIsIt:
      "useState автоматично виводить тип стану з початкового значення (детальніше про виведення типів — у модулі ts-basics): useState(0) дає стан типу number, useState(\"\") — типу string. Але коли початкове значення не описує всі майбутні можливі стани — найчастіше useState(null), де стан пізніше повинен містити реальні дані, — потрібен явний параметр типу: useState&lt;SelectedDrink | null&gt;(null).",
    whyUseIt:
      "useState(null) без явного параметра типу вивів би тип стану як просто null — назавжди, для всього життя компонента, бо компілятор бачить лише це єдине початкове значення й не має підстав вважати, що там колись зʼявиться щось інше. Явний параметр типу &lt;SelectedDrink | null&gt; каже компілятору: цей стан МОЖЕ містити SelectedDrink, навіть якщо початкове значення — null, — це той самий принцип, що й з анотацією змінної (детальніше — у модулі ts-basics), застосований до useState.",
    whenToUse: [
      "Коли початкове значення useState — null чи undefined, але стан пізніше повинен містити реальні дані.",
      "Коли стан — union кількох конкретних варіантів (наприклад, статус: \"idle\" | \"loading\" | \"success\" | \"error\"), і початкове значення саме собою не показує весь union.",
      "Дозволяй виведення типу без явного параметра, коли початкове значення й так однозначно показує майбутній тип (useState(0), useState(\"\")).",
    ],
    whenNotToUse: [
      "Не пиши useState<number>(0), коли 0 уже й так однозначно виводить number, — це зайва, непотрібна анотація (детальніше про виведення типів — у модулі ts-basics).",
      "Не забувай про необхідну перевірку на null/undefined перед використанням значення стану — union із null потребує звуження, як і будь-який інший union-тип.",
      "Не типізуй стан ширше, ніж реально потрібно (наприклад, any замість конкретного union чи interface).",
    ],
    comparisonTable: {
      headers: ["Оголошення", "Виведений/явний тип стану"],
      rows: [
        ["useState(0)", "number — виведено з початкового значення"],
        ["useState(null)", "null — і назавжди лише null, без явного параметра"],
        ["useState<SelectedDrink | null>(null)", "SelectedDrink | null — явно дозволяє обидва майбутні стани"],
      ],
    },
    codeWalkthroughs: [
      {
        before: "useState з явним параметром типу для стану, що починається з null:",
        code: `interface SelectedDrink {
  title: string;
  price: number;
}

const [selected, setSelected] = useState<SelectedDrink | null>(null);

function selectDrink(drink: SelectedDrink): void {
  setSelected(drink);
}`,
        lineNotes: [
          "useState<SelectedDrink | null>(null) явно дозволяє стану бути АБО SelectedDrink, АБО null.",
          "setSelected(drink) дозволений, бо SelectedDrink — один із двох варіантів явно вказаного типу.",
        ],
      },
      {
        before: "Безпечний доступ до стану через звуження:",
        code: `if (selected === null) {
  console.log("Нічого не обрано");
} else {
  console.log(\`\${selected.title}: \${selected.price} грн\`);
}`,
        lineNotes: [
          "if (selected === null) звужує тип для решти коду в кожній гілці (детальніше про звуження — у модулі ts-basics).",
          "У протилежній гілці selected гарантовано SelectedDrink — доступ до .title і .price безпечний.",
        ],
      },
    ],
    commonMistakes: [
      "Викликати useState(null) без явного параметра типу там, де стан пізніше повинен містити реальні дані.",
      "Забувати про перевірку на null перед доступом до властивостей стану.",
      "Додавати зайву явну анотацію там, де тип і так однозначно виводиться з початкового значення.",
    ],
    dontDoThis: {
      code: `const [selected, setSelected] = useState(null);\n\nfunction selectDrink(drink) {\n  setSelected(drink);\n}`,
      explanation:
        "useState(null) без явного параметра типу виводить тип стану як просто null — компілятор бачить лише це одне початкове значення й вважає, що стан НАЗАВЖДИ буде null. Тому setSelected(drink) стає помилкою компілятора: drink не є null, а стан типізований так, що приймає лише null. Причина в тому, що null саме по собі не описує майбутні можливі стани — так само, як із анотаціями звичайних змінних (детальніше — у модулі ts-basics). Виправлення: додати явний параметр типу useState<SelectedDrink | null>(null), який дозволяє стану бути або SelectedDrink, або null. Перевірити можна, додавши цей параметр типу, — виклик setSelected(drink) одразу перестає бути помилкою.",
    },
    bestPractices: [
      "Додавай явний параметр типу useState<Тип | null>(null), коли початкове значення — null/undefined, а стан пізніше повинен містити реальні дані.",
      "Дозволяй виведення типу без явного параметра для простих, однозначних початкових значень (0, \"\", true).",
      "Перевіряй стан на null через звуження (if / === null) перед доступом до властивостей, замість необережного припущення, що дані вже там.",
    ],
    remember: [
      "useState виводить тип із початкового значення — так само, як звичайне присвоєння змінної.",
      "useState(null) без явного параметра типу назавжди звужує стан до null.",
      "useState<Тип | null>(null) явно дозволяє стану бути або реальними даними, або null.",
    ],
    interviewQuestions: [
      { question: "Чому useState(null) не дозволить пізніше записати в стан реальний обʼєкт без явного параметра типу?", answer: "Без явного параметра компілятор виводить тип стану лише з початкового значення null — і вважає, що стан завжди буде null. Щоб дозволити стану пізніше містити реальні дані, потрібен явний параметр типу: useState<Тип | null>(null)." },
      { question: "Коли варто додавати явний параметр типу для useState, а коли достатньо виведення?", answer: "Явний параметр потрібен, коли початкове значення (null, undefined чи порожній масив) не описує всі майбутні можливі стани. Якщо початкове значення однозначно показує майбутній тип (0 для number, \"\" для string), виведення типу достатнє, і зайва анотація не потрібна." },
    ],
    summary:
      "useState виводить тип стану з початкового значення, як і звичайне присвоєння змінної (детальніше — у модулі ts-basics). Коли початкове значення (найчастіше null) не описує майбутні можливі стани, потрібен явний параметр типу: useState<Тип | null>(null) — це дозволяє стану пізніше містити реальні дані, а не назавжди залишатись звуженим до null.",
    nextLessonNote: "Далі — типізація власних хуків: параметри й тип повернення функції, чиє імʼя починається з use.",
    practiceTask: {
      title: "Типізуй стан вибраного товару кошика",
      description: "Виправ useState для стану вибраного товару кошика, який починається з null, але пізніше повинен містити реальний обʼєкт CartItem.",
      checklist: [
        "interface CartItem має title: string, price: number.",
        "useState отримує явний параметр типу CartItem | null.",
        "Доступ до властивостей стану захищений перевіркою на null.",
      ],
      starterFiles: [
        {
          id: "ts-react-usestate-start",
          path: "index.tsx",
          language: "tsx",
          label: "index.tsx",
          code: `interface CartItem {\n  title: string;\n  price: number;\n}\n\nconst [item, setItem] = useState(null);\n\nfunction selectItem(newItem: CartItem) {\n  setItem(newItem);\n}`,
        },
      ],
      solutionFiles: [
        {
          id: "ts-react-usestate-solution",
          path: "index.tsx",
          language: "tsx",
          label: "index.tsx",
          code: `interface CartItem {\n  title: string;\n  price: number;\n}\n\nconst [item, setItem] = useState<CartItem | null>(null);\n\nfunction selectItem(newItem: CartItem) {\n  setItem(newItem);\n}\n\nfunction describeItem(): string {\n  if (item === null) {\n    return "Товар не обрано";\n  }\n  return \`\${item.title}: \${item.price} грн\`;\n}`,
          readOnly: true,
        },
      ],
      hints: ["useState<CartItem | null>(null) — параметр типу пишеться в кутових дужках одразу перед круглими."],
      expectedOutput: "setItem(newItem) більше не викликає помилку компілятора; доступ до item.title захищений перевіркою на null.",
    },
    microExercises: [
      { id: "ts-react-usestate-predict", kind: "predict", prompt: "const [count, setCount] = useState(0); — чи потрібен тут явний параметр типу?", solution: "Ні. Початкове значення 0 однозначно виводить тип number — явний параметр useState<number>(0) був би зайвим і нічого не додав би." },
    ],
  },

  "Типізація власних хуків": {
    interactiveDemo: "custom-hook-typing-demo",
    whatIsIt:
      "Власний хук — це звичайна функція (її назва за конвенцією починається з use), тому типізується так само, як будь-яка інша функція (детальніше — у модулі ts-functions): параметри й тип повернення. function useCounter(initial: number): UseCounterResult, де UseCounterResult — interface, що описує форму обʼєкта результату (детальніше про interface — у модулі ts-objects): count: number і кілька функцій без параметрів, що нічого не повертають (() =&gt; void).",
    whyUseIt:
      "Без явного типу повернення компілятор технічно вивів би тип результату власного хука сам, але явний interface (UseCounterResult) документує контракт хука так само, як типізовані пропси документують контракт компонента: будь-хто, хто використовує useCounter, одразу бачить у визначенні типу, що саме повертає хук, без потреби читати всю реалізацію. Компілятор далі перевіряє, що деструктуризація результату (наприклад, { count, increment } = useCounter(0)) отримує правильні типи для кожного поля.",
    whenToUse: [
      "Для будь-якого власного хука, що повертає більше одного значення чи функції.",
      "Явний тип повернення (interface чи type) — коли форма результату хука досить складна, щоб виграти від документування.",
      "Типізовані параметри хука — так само обовʼязково, як і для звичайної функції (детальніше — у модулі ts-functions).",
    ],
    whenNotToUse: [
      "Не думай, що хуки потребують якихось спеціальних, нових правил типізації, — це звичайні функції, і типізуються вони так само.",
      "Не забувай типізувати параметри хука — без анотації вони так само отримають неявний any, як і в будь-якій іншій функції.",
      "Не роби тип результату хука занадто широким (any чи Record<string, unknown>) там, де конкретний interface точніше й безпечніше документує реальну форму.",
    ],
    comparisonTable: {
      headers: ["Елемент хука", "Як типізується"],
      rows: [
        ["Параметри useCounter(initial: number)", "Так само, як параметри будь-якої функції (детальніше — у модулі ts-functions)"],
        ["Тип повернення UseCounterResult", "Interface, що описує форму обʼєкта результату (детальніше — у модулі ts-objects)"],
        ["Внутрішній useState", "Так само, як у будь-якому компоненті (детальніше — у попередньому уроці цього модуля)"],
      ],
    },
    codeWalkthroughs: [
      {
        before: "Власний хук із явним типом параметра й типом повернення:",
        code: `interface UseCounterResult {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

function useCounter(initial: number): UseCounterResult {
  const [count, setCount] = useState(initial);

  return {
    count,
    increment: () => setCount((current) => current + 1),
    decrement: () => setCount((current) => current - 1),
    reset: () => setCount(initial),
  };
}`,
        lineNotes: [
          "initial: number — типізований параметр, так само, як у звичайній функції.",
          ": UseCounterResult — явний тип повернення документує форму результату хука.",
          "Кожна функція в результаті типізована як () => void — без параметрів, нічого не повертає.",
        ],
      },
      {
        before: "Використання типізованого хука в компоненті:",
        code: `function CounterButton() {
  const { count, increment } = useCounter(0);

  return <button onClick={increment}>Клікнуто: {count}</button>;
}`,
        lineNotes: [
          "Деструктуризація { count, increment } отримує правильні типи (number і () => void) з UseCounterResult.",
          "onClick={increment} дозволений, бо increment реально має тип () => void, який очікує onClick.",
        ],
      },
    ],
    commonMistakes: [
      "Забувати типізувати параметри власного хука, покладаючись на неявний any.",
      "Не документувати форму результату хука явним типом, коли вона складна (кілька полів і функцій).",
      "Думати, що хуки потребують якихось особливих правил типізації, відмінних від звичайних функцій.",
    ],
    dontDoThis: {
      code: `function useCounter(initial) {\n  const [count, setCount] = useState(initial);\n  return { count, increment: () => setCount(count + 1) };\n}\n\nconst { count, increment } = useCounter(0);\nincrement.toUpperCase();`,
      explanation:
        "Без типізації параметра initial і без явного типу повернення хука результат useCounter(0) технічно все одно якось виводиться, але без interface, що документує форму, легко випадково звернутись до неіснуючого чи неправильно використаного поля — наприклад, increment.toUpperCase() (метод рядків, а не функцій) не буде впіймано компілятором так надійно, як із явним типом UseCounterResult, де increment чітко типізований як () => void, що не має методу .toUpperCase(). Виправлення: додати параметр initial: number і явний тип повернення UseCounterResult — тепер increment.toUpperCase() одразу стає помилкою компілятора, бо у функцій () => void немає такого методу. Перевірити можна, додавши ці типи, — помилка на .toUpperCase() зʼявиться миттєво.",
    },
    bestPractices: [
      "Типізуй параметри власного хука так само уважно, як параметри будь-якої іншої функції.",
      "Пиши явний interface для результату хука, коли він повертає більше одного значення чи функції.",
      "Давай типу результату хука імʼя за конвенцією UseІмʼяХукаResult (UseCounterResult для useCounter).",
    ],
    remember: [
      "Власний хук — звичайна функція, типізується так само: параметри й тип повернення.",
      "Явний interface для результату хука документує контракт так само, як типізовані пропси документують контракт компонента.",
      "Немає жодних нових, спеціальних для хуків правил типізації понад те, що вже вивчено про функції та обʼєкти.",
    ],
    interviewQuestions: [
      { question: "Чим типізація власного хука відрізняється від типізації звичайної функції?", answer: "Нічим принципово — власний хук це звичайна функція (з назвою, що за конвенцією починається з use), і типізується так само: типізовані параметри й, зазвичай, явний тип повернення (часто interface, що описує форму обʼєкта результату)." },
      { question: "Навіщо писати явний interface для результату власного хука, а не покладатись на виведення типу?", answer: "Явний interface документує контракт хука — будь-хто, хто його використовує, одразу бачить у визначенні типу, що саме хук повертає, без потреби читати реалізацію. Це особливо корисно, коли хук повертає кілька полів чи функцій." },
    ],
    summary:
      "Власний хук — звичайна функція, і типізується так само, як будь-яка інша: параметри й тип повернення (детальніше — у модулі ts-functions). Явний interface для результату хука (UseCounterResult) документує форму обʼєкта, який хук реально повертає, так само, як типізовані пропси документують контракт компонента. Жодних нових правил типізації, специфічних для хуків, не існує.",
    nextLessonNote: "Далі — дискриміновані стани інтерфейсу: типізація складних UI-станів (завантаження/успіх/помилка) через одну дискриміновану спілку замість окремих прапорців.",
    practiceTask: {
      title: "Типізуй хук перемикача видимості",
      description: "Створи власний хук useToggle(initial: boolean): UseToggleResult, що повертає поточне значення й функцію перемикання.",
      checklist: [
        "interface UseToggleResult має value: boolean, toggle: () => void.",
        "Параметр initial хука типізований як boolean.",
        "Хук повертає обʼєкт саме форми UseToggleResult.",
      ],
      starterFiles: [
        {
          id: "ts-react-hook-start",
          path: "index.tsx",
          language: "tsx",
          label: "index.tsx",
          code: `// Напиши useToggle(initial: boolean): UseToggleResult\n\nfunction VisibilityDemo() {\n  const { value, toggle } = useToggle(false);\n  return <button onClick={toggle}>{value ? "Приховати" : "Показати"}</button>;\n}`,
        },
      ],
      solutionFiles: [
        {
          id: "ts-react-hook-solution",
          path: "index.tsx",
          language: "tsx",
          label: "index.tsx",
          code: `interface UseToggleResult {\n  value: boolean;\n  toggle: () => void;\n}\n\nfunction useToggle(initial: boolean): UseToggleResult {\n  const [value, setValue] = useState(initial);\n  return { value, toggle: () => setValue((current) => !current) };\n}\n\nfunction VisibilityDemo() {\n  const { value, toggle } = useToggle(false);\n  return <button onClick={toggle}>{value ? "Приховати" : "Показати"}</button>;\n}`,
          readOnly: true,
        },
      ],
      hints: ["setValue((current) => !current) — реальне перемикання булевого значення через функцію-оновлювач."],
      expectedOutput: "useToggle повністю типізований: параметр і тип повернення документовані, кнопка перемикає значення.",
    },
    microExercises: [
      { id: "ts-react-hook-explain", kind: "explain", prompt: "Поясни, чому власний хук useCounter типізується так само, як звичайна функція, а не якимось особливим способом.", solution: "Хук — це просто функція JavaScript із конвенцією іменування (починається з use); React не додає жодного спеціального механізму типізації для хуків. Тому параметри й тип повернення хука типізуються за тими самими правилами, що й для будь-якої іншої функції." },
    ],
  },

  "Дискриміновані стани інтерфейсу": {
    interactiveDemo: "ui-state-demo",
    whatIsIt:
      "Дискримінований стан інтерфейсу — це застосування дискримінованої спілки (детальніше — у модулі ts-functions, де вона вперше зустрілась як Result<T>) до типового UI-сценарію: компонент, що завантажує дані, може перебувати в одному з кількох взаємовиключних станів. type UiState<T> = { status: \"idle\" } | { status: \"loading\" } | { status: \"success\"; data: T } | { status: \"error\"; message: string } описує чотири такі стани через спільне поле-перемикач status.",
    whyUseIt:
      "Альтернативний, поширений підхід — кілька окремих булевих прапорців (isLoading, hasError, data) — технічно дозволяє неможливі комбінації: isLoading: true разом із заповненим data, чи hasError: true одночасно з isLoading: true. Жодна з цих комбінацій не має сенсу для реального інтерфейсу, але компілятор ніяк не забороняє їх, якщо стан описаний окремими прапорцями. Дискримінований UiState<T> робить неможливі комбінації буквально неможливими на рівні типів: стан може бути ЛИШЕ одним із чотирьох варіантів одночасно, і switch (state.status) звужує тип у кожній гілці окремо (детальніше про звуження — у модулі ts-basics).",
    whenToUse: [
      "Стан завантаження даних: idle (ще не почали) → loading → success (з даними) або error (з повідомленням).",
      "Будь-який UI-стан, де кілька окремих прапорців реально описують взаємовиключні, а не незалежні одна від одної ситуації.",
      "Разом з exhaustiveness-перевіркою (const _exhaustive: never = state) — щоб не забути обробити новий статус, якщо його колись додадуть.",
    ],
    whenNotToUse: [
      "Не використовуй дискримінований стан там, де кілька прапорців реально незалежні одна від одної (наприклад, isDarkMode і isMuted можуть бути true одночасно, не суперечачи одна одній).",
      "Не забувай додавати case для КОЖНОГО варіанту status у switch — саме для цього й потрібна exhaustiveness-перевірка через never.",
      "Не змішуй old-style окремі прапорці (isLoading, hasError) з новим дискримінованим підходом у тому самому компоненті — обери один спосіб.",
    ],
    comparisonTable: {
      headers: ["Підхід", "Чи можлива неможлива комбінація"],
      rows: [
        ["isLoading: boolean; hasError: boolean; data: Product | null", "Так — isLoading: true і data одночасно заповнений технічно дозволено типами"],
        ["UiState<Product> (дискримінована спілка)", "Ні — стан завжди рівно один із чотирьох варіантів, кожен зі своїм набором полів"],
      ],
    },
    codeWalkthroughs: [
      {
        before: "Дискримінований тип стану завантаження товару:",
        code: `interface Product {
  title: string;
  price: number;
}

type UiState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; message: string };`,
        lineNotes: [
          "status — спільне поле-перемикач для всіх чотирьох форм.",
          "Лише варіант success реально має поле data; лише error має message — компілятор гарантує, що доступ до них можливий лише у відповідній гілці.",
        ],
      },
      {
        before: "switch (state.status) звужує тип у кожній гілці, з перевіркою на повноту:",
        code: `function renderProductState(state: UiState<Product>): string {
  switch (state.status) {
    case "idle":
      return "Ще не почали завантаження";
    case "loading":
      return "Завантаження…";
    case "success":
      return \`\${state.data.title} — \${state.data.price} грн\`;
    case "error":
      return \`Помилка: \${state.message}\`;
    default: {
      const _exhaustive: never = state;
      return _exhaustive;
    }
  }
}`,
        lineNotes: [
          "case \"success\": state.data доступний лише тут — компілятор звузив тип до варіанту з полем data.",
          "case \"error\": state.message доступний лише тут, аналогічно.",
          "default із const _exhaustive: never = state — якщо колись додати пʼятий статус і забути обробити його вище, це присвоєння перестане компілюватись, бо state там більше не буде never.",
        ],
        after: "Компілятор гарантує, що КОЖЕН можливий статус реально оброблений — забути новий варіант неможливо непомітно.",
      },
    ],
    commonMistakes: [
      "Використовувати окремі незалежні прапорці (isLoading, hasError, data) там, де реальні стани взаємовиключні.",
      "Забувати exhaustiveness-перевірку (never) — без неї забутий новий case не викличе помилки компілятора.",
      "Звертатись до поля одного варіанта (data) поза відповідним case, де компілятор не звузив тип до потрібної форми.",
    ],
    dontDoThis: {
      code: `interface ProductLoadState {\n  isLoading: boolean;\n  hasError: boolean;\n  errorMessage: string;\n  data: Product | null;\n}\n\nconst state: ProductLoadState = {\n  isLoading: true,\n  hasError: true,\n  errorMessage: "Товар не знайдено",\n  data: { title: "Латте", price: 65 },\n};`,
      explanation:
        "Компілятор не бачить тут жодної помилки — кожне окреме поле (isLoading, hasError, errorMessage, data) має правильний тип за своєю власною анотацією. Але сама КОМБІНАЦІЯ значень безглузда: стан одночасно \"ще завантажується\" (isLoading: true), \"стався збій\" (hasError: true) і \"дані вже є\" (data заповнений) — на практиці інтерфейс не може одночасно показувати спінер завантаження, повідомлення про помилку й готові дані. Причина в тому, що окремі булеві прапорці типологічно незалежні одне від одного — типи дозволяють будь-яку комбінацію значень, навіть логічно неможливу для реального інтерфейсу. Виправлення: замінити на дискримінований UiState<Product> — тепер стан може бути ЛИШЕ одним із чотирьох конкретних, взаємовиключних варіантів, і неможлива комбінація просто не існує на рівні типів. Перевірити можна, спробувавши створити стан із status: \"loading\" і полем data одночасно — компілятор одразу це заборонить.",
    },
    bestPractices: [
      "Обирай дискриміновану спілку для будь-якого UI-стану, де кілька прапорців реально взаємовиключні.",
      "Завжди додавай exhaustiveness-перевірку (const _exhaustive: never = state) у default-гілку switch за станом.",
      "Давай кожному варіанту стану змістовну назву статусу (idle/loading/success/error), а не абстрактні числа чи прапорці.",
    ],
    remember: [
      "Дискримінований стан UI — union кількох форм зі спільним полем-перемикачем (найчастіше status).",
      "switch (state.status) звужує тип у кожній гілці — доступ до полів конкретного варіанта можливий лише там, де тип звужений саме до нього.",
      "Exhaustiveness-перевірка через never у default-гілці гарантує, що новий статус неможливо забути обробити непомітно.",
    ],
    interviewQuestions: [
      { question: "Чому дискримінована спілка (UiState<T>) краща за окремі булеві прапорці (isLoading, hasError, data) для стану завантаження?", answer: "Окремі прапорці типологічно незалежні одне від одного — типи дозволяють будь-яку їхню комбінацію, навіть логічно неможливу (наприклад, isLoading: true разом із заповненим data). Дискримінована спілка робить стан рівно одним із перелічених взаємовиключних варіантів, тому неможливі комбінації просто не існують на рівні типів." },
      { question: "Що робить exhaustiveness-перевірка (const _exhaustive: never = state) у default-гілці switch?", answer: "Гарантує, що всі можливі варіанти дискримінованої спілки реально оброблені вище в switch. Якщо колись додати новий статус до UiState<T> і забути обробити його окремим case, компілятор покаже помилку саме на цьому рядку, бо state там більше не матиме типу never." },
    ],
    summary:
      "Дискримінована спілка (UiState<T> зі спільним полем status) — природний спосіб типізувати взаємовиключні стани інтерфейсу (idle/loading/success/error), на відміну від окремих булевих прапорців, які дозволяють логічно неможливі комбінації. switch (state.status) звужує тип у кожній гілці, а exhaustiveness-перевірка через never гарантує обробку кожного можливого варіанту.",
    proTip: "Якщо ловиш себе на написанні кількох незалежних булевих прапорців для опису стану одного компонента (isLoading, hasError, hasData) — це майже завжди сигнал переписати їх як одну дискриміновану спілку зі спільним полем-перемикачем.",
    nextLessonNote: "Це останній урок курсу TypeScript. Разом п'ять модулів охоплюють основи типів, обʼєкти, функції, дженерики й застосування всього цього в React — цього достатньо для впевненої, типобезпечної роботи в реальних TypeScript+React проєктах.",
    practiceTask: {
      title: "Опиши дискримінований стан форми відправки",
      description: "Створи type SubmitState зі станами idle/submitting/success/error для форми відправки замовлення, і напиши функцію, що повертає текст кнопки для кожного стану.",
      checklist: [
        "type SubmitState має чотири варіанти зі спільним полем status.",
        "Варіант success має поле orderId: number; варіант error має поле message: string.",
        "Функція getButtonText обробляє всі чотири варіанти через switch з exhaustiveness-перевіркою.",
      ],
      starterFiles: [
        {
          id: "ts-react-uistate-start",
          path: "index.tsx",
          language: "tsx",
          label: "index.tsx",
          code: `// Опиши type SubmitState з варіантами idle/submitting/success/error\n\nfunction getButtonText(state: SubmitState): string {\n  // Напиши switch (state.status) з обробкою всіх варіантів і exhaustiveness-перевіркою\n}`,
        },
      ],
      solutionFiles: [
        {
          id: "ts-react-uistate-solution",
          path: "index.tsx",
          language: "tsx",
          label: "index.tsx",
          code: `type SubmitState =\n  | { status: "idle" }\n  | { status: "submitting" }\n  | { status: "success"; orderId: number }\n  | { status: "error"; message: string };\n\nfunction getButtonText(state: SubmitState): string {\n  switch (state.status) {\n    case "idle":\n      return "Надіслати";\n    case "submitting":\n      return "Надсилаємо…";\n    case "success":\n      return \`Готово! Замовлення #\${state.orderId}\`;\n    case "error":\n      return \`Помилка: \${state.message}\`;\n    default: {\n      const _exhaustive: never = state;\n      return _exhaustive;\n    }\n  }\n}`,
          readOnly: true,
        },
      ],
      hints: ["Кожен варіант SubmitState — окремий обʼєктний тип у union, звʼязаний спільним полем status."],
      expectedOutput: "getButtonText повертає правильний текст для кожного з чотирьох станів, компілятор гарантує повноту обробки.",
    },
    microExercises: [
      { id: "ts-uistate-predict", kind: "predict", prompt: "type State = { status: \"success\"; data: string } | { status: \"error\"; message: string }; function render(state: State) { if (state.status === \"success\") return state.data; return state.error; } — компілятор покаже помилку. Де?", solution: "На state.error — у варіанті \"error\" поле реально називається message, а не error. Компілятор ловить це, бо в звуженому до status: \"error\" типі властивості error просто не існує." },
      { id: "ts-uistate-explain", kind: "explain", prompt: "Поясни, чому потрібна exhaustiveness-перевірка (never), якщо TypeScript і так перевіряє типи в switch.", solution: "Без явної перевірки switch може просто не мати default-гілки взагалі, і якщо додати новий варіант стану (наприклад, status: \"cancelled\"), забутий case ніяк не позначиться помилкою компіляції — функція просто поверне undefined для цього випадку під час виконання. const _exhaustive: never = state у default гарантує помилку компіляції саме в момент, коли з'являється необроблений варіант, а не залишає це на волю випадку під час виконання." },
    ],
  },
};
