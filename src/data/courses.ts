import courseCatalog from "./content/courseCatalog.json";
import type { Course, CourseLevel, CodeWalkthrough, Lesson, LessonDifficulty, Module, ModuleProject, PlaygroundFile, PlaygroundLanguage, QuizData, TheoryStep } from "../types/course";
import { getLessonOverride } from "./content/handwritten";

interface CatalogCourse {
  id: string;
  title: string;
  description: string;
  level: CourseLevel;
  projectTitle: string;
  modules: CatalogModule[];
}

interface CatalogModule {
  id: string;
  title: string;
  description: string;
  lessons: string[];
}

// Lightweight structural validation (no external schema library needed for
// a catalog this size). Without this, a malformed courseCatalog.json entry
// (missing field, wrong type, duplicate id) would surface as a confusing
// crash deep inside makeLesson/makeModule instead of a clear message
// pointing at exactly which course/module/lesson is broken.
const validateCatalog = (input: unknown): CatalogCourse[] => {
  if (!Array.isArray(input)) {
    throw new Error("courseCatalog.json має бути масивом курсів.");
  }

  const errors: string[] = [];
  const seenCourseIds = new Set<string>();
  const validLevels: CourseLevel[] = ["Beginner", "Intermediate", "Advanced"];

  input.forEach((course: unknown, courseIndex: number) => {
    const label = `course[${courseIndex}]`;
    if (!course || typeof course !== "object") {
      errors.push(`${label}: очікувався обʼєкт курсу.`);
      return;
    }
    const c = course as Partial<CatalogCourse>;
    const courseName = c.id ?? "?";

    if (!c.id || typeof c.id !== "string") errors.push(`${label}: відсутній або некоректний "id".`);
    else if (seenCourseIds.has(c.id)) errors.push(`${label}: дублікат id курсу "${c.id}".`);
    else seenCourseIds.add(c.id);

    if (!c.title || typeof c.title !== "string") errors.push(`${label} (${courseName}): відсутній "title".`);
    if (!c.description || typeof c.description !== "string") errors.push(`${label} (${courseName}): відсутній "description".`);
    if (!c.projectTitle || typeof c.projectTitle !== "string") errors.push(`${label} (${courseName}): відсутній "projectTitle".`);
    if (!validLevels.includes(c.level as CourseLevel)) {
      errors.push(`${label} (${courseName}): "level" має бути одним із ${validLevels.join("/")}, отримано ${JSON.stringify(c.level)}.`);
    }
    if (!Array.isArray(c.modules) || c.modules.length === 0) {
      errors.push(`${label} (${courseName}): "modules" має бути непорожнім масивом.`);
      return;
    }

    const seenModuleIds = new Set<string>();
    c.modules.forEach((module: unknown, moduleIndex: number) => {
      const moduleLabel = `${label}.modules[${moduleIndex}]`;
      if (!module || typeof module !== "object") {
        errors.push(`${moduleLabel}: очікувався обʼєкт модуля.`);
        return;
      }
      const m = module as Partial<CatalogModule>;
      const moduleName = m.id ?? "?";

      if (!m.id || typeof m.id !== "string") errors.push(`${moduleLabel}: відсутній або некоректний "id".`);
      else if (seenModuleIds.has(m.id)) errors.push(`${moduleLabel}: дублікат id модуля "${m.id}" у курсі "${courseName}".`);
      else seenModuleIds.add(m.id);

      if (!m.title || typeof m.title !== "string") errors.push(`${moduleLabel} (${moduleName}): відсутній "title".`);
      if (!m.description || typeof m.description !== "string") errors.push(`${moduleLabel} (${moduleName}): відсутній "description".`);
      if (!Array.isArray(m.lessons) || m.lessons.length === 0) {
        errors.push(`${moduleLabel} (${moduleName}): "lessons" має бути непорожнім масивом заголовків.`);
        return;
      }

      const seenLessonTitles = new Set<string>();
      m.lessons.forEach((lessonTitle: unknown, lessonIndex: number) => {
        if (typeof lessonTitle !== "string" || !lessonTitle.trim()) {
          errors.push(`${moduleLabel}.lessons[${lessonIndex}]: заголовок уроку має бути непорожнім рядком.`);
          return;
        }
        if (seenLessonTitles.has(lessonTitle)) {
          errors.push(`${moduleLabel} (${moduleName}): дублікат заголовка уроку "${lessonTitle}" у межах одного модуля.`);
        } else {
          seenLessonTitles.add(lessonTitle);
        }
      });
    });
  });

  if (errors.length > 0) {
    throw new Error(`courseCatalog.json містить помилки:\n- ${errors.join("\n- ")}`);
  }

  return input as CatalogCourse[];
};

const catalog = validateCatalog(courseCatalog);

const resourceMap: Record<string, { label: string; url: string }[]> = {
  "vscode-setup": [
    { label: "VS Code Docs", url: "https://code.visualstudio.com/docs" },
    { label: "VS Code Tips and Tricks", url: "https://code.visualstudio.com/docs/getstarted/tips-and-tricks" },
  ],
  html: [
    { label: "MDN HTML", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
    { label: "WHATWG HTML Standard", url: "https://html.spec.whatwg.org/" },
  ],
  css: [
    { label: "MDN CSS", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
    { label: "web.dev Learn CSS", url: "https://web.dev/learn/css" },
  ],
  javascript: [
    { label: "MDN JavaScript", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
    { label: "javascript.info", url: "https://javascript.info/" },
  ],
  typescript: [
    { label: "TypeScript Handbook", url: "https://www.typescriptlang.org/docs/" },
    { label: "TypeScript Playground", url: "https://www.typescriptlang.org/play" },
  ],
  react: [
    { label: "React Docs", url: "https://react.dev/" },
    { label: "React Router Docs", url: "https://reactrouter.com/" },
  ],
  "node-basics": [
    { label: "Node.js Docs", url: "https://nodejs.org/en/learn" },
    { label: "Express Docs", url: "https://expressjs.com/" },
  ],
  git: [
    { label: "Git Book", url: "https://git-scm.com/book/en/v2" },
    { label: "GitHub Docs", url: "https://docs.github.com/" },
  ],
  browser: [
    { label: "Chrome DevTools", url: "https://developer.chrome.com/docs/devtools" },
    { label: "MDN Web APIs", url: "https://developer.mozilla.org/en-US/docs/Web/API" },
  ],
  accessibility: [
    { label: "WAI Tutorials", url: "https://www.w3.org/WAI/tutorials/" },
    { label: "ARIA Authoring Practices", url: "https://www.w3.org/WAI/ARIA/apg/" },
  ],
  performance: [
    { label: "web.dev Performance", url: "https://web.dev/learn/performance" },
    { label: "Core Web Vitals", url: "https://web.dev/vitals/" },
  ],
};

const contextMap: Record<string, string> = {
  "vscode-setup": "робоче середовище розробника: редактор коду, файлову структуру, термінал і базові інструменти",
  html: "структуру документа, доступність і розмітку, зручну для пошукових систем",
  css: "візуальний дизайн, адаптивний макет і масштабовану стилізацію",
  javascript: "інтерактивну поведінку, зміни стану та браузерні API",
  typescript: "типобезпечні моделі застосунку та безпечніший рефакторинг",
  react: "компонентно-орієнтований UI, роутинг, стан і потоки даних",
  "node-basics": "співпрацю з бекендом, контракти API та концепції середовища виконання",
  git: "контроль версій, співпрацю та безпечне відновлення роботи",
  browser: "внутрішній рендеринг, DevTools і вбудовані Web API",
  accessibility: "інклюзивні патерни взаємодії та підтримку допоміжних технологій",
  performance: "швидкість завантаження, чутливість під час роботи та вимірювання",
};

// Deterministic hash used to vary lesson copy without relying on Math.random
// (keeps content stable across reloads/tests) so lessons in the same module
// don't all read like the same paragraph with the title swapped out. Also
// used as a defensive fallback id below.
const hashString = (value: string): number => {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash;
};

// Standard Ukrainian -> Latin transliteration used only for building stable,
// readable slugs/ids. Without this, `slugify` would strip every Cyrillic
// character and titles like "Текстові елементи та ієрархія" (no ASCII
// letters at all) would collapse to an empty string — and two lessons in the
// same module with no Latin characters in their title would end up sharing
// the exact same id, silently corrupting progress tracking and routing.
const cyrillicToLatin: Record<string, string> = {
  а: "a", б: "b", в: "v", г: "h", ґ: "g", д: "d", е: "e", є: "ie", ж: "zh", з: "z",
  и: "y", і: "i", ї: "yi", й: "i", к: "k", л: "l", м: "m", н: "n", о: "o", п: "p",
  р: "r", с: "s", т: "t", у: "u", ф: "f", х: "kh", ц: "ts", ч: "ch", ш: "sh", щ: "shch",
  ь: "", ю: "iu", я: "ia", "'": "", "ʼ": "", "’": "",
};

const transliterate = (value: string) =>
  value
    .toLowerCase()
    .split("")
    .map((char) => cyrillicToLatin[char] ?? char)
    .join("");

const slugify = (value: string) => {
  const slug = transliterate(value)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  // Extremely defensive fallback: if a title still produces an empty slug
  // (e.g. punctuation-only), fall back to a short deterministic hash instead
  // of letting two lessons collide on the same id.
  return slug || `l${hashString(value).toString(36).slice(0, 6)}`;
};

const pickRotating = <T,>(pool: T[], seed: number, count: number): T[] => {
  // Defensive: normalize to non-negative before `%`, since a negative seed
  // (e.g. from a signed bit shift upstream) would otherwise index the pool
  // with a negative number and silently return `undefined` entries.
  const start = ((seed % pool.length) + pool.length) % pool.length;
  const result: T[] = [];
  for (let i = 0; i < count; i += 1) {
    result.push(pool[(start + i) % pool.length]);
  }
  return result;
};

type LessonPhraseCtx = { title: string; titleLower: string; course: CatalogCourse; module: CatalogModule; courseContext: string };

const contentVariants: ((c: LessonPhraseCtx) => string)[] = [
  ({ title, course, courseContext }) => `«${title}» розкриває практичну частину курсу «${course.title}»: ${courseContext}.`,
  ({ title, module, courseContext }) => `У межах етапу «${module.title}» тема «${title}» показує, як ${courseContext} працюють у щоденній роботі.`,
  ({ title, course, module }) => `Цей урок — частина етапу «${module.title}» курсу «${course.title}» і зосереджений на темі «${title}».`,
  ({ title, module }) => `«${title}» — один із кроків етапу «${module.title}»: ${module.description.toLowerCase()}`,
];

const descriptionVariants: ((c: LessonPhraseCtx) => string)[] = [
  ({ titleLower }) => `Дізнайся, як «${titleLower}» застосовується в реальній frontend-роботі, на які рішення це впливає і як перевірити свою реалізацію.`,
  ({ titleLower, module }) => `Розберись, як «${titleLower}» вписується в етап «${module.title}» і які практичні наслідки це має для готового інтерфейсу.`,
  ({ titleLower, course }) => `Практичний погляд на «${titleLower}»: де це зустрічається в курсі «${course.title}» і чому це впливає на якість результату.`,
  ({ titleLower }) => `Цей урок пояснює «${titleLower}» на прикладах, а не лише в теорії, і показує, як перевірити, що реалізація працює правильно.`,
];

const theoryVariants: ((c: LessonPhraseCtx) => string)[] = [
  ({ title }) =>
    `«${title}» важливе, бо продакшн frontend-робота — це не лише написання коду, який працює. Він має передавати намір, обробляти реальну поведінку користувача й залишатися зручним для підтримки, коли змінюються вимоги. У цьому уроці спочатку зосередься на ментальній моделі: яку проблему вирішує техніка, коли вона доречна і які ознаки свідчать про правильність реалізації.`,
  ({ title, module }) =>
    `У контексті етапу «${module.title}» тема «${title}» вирішує конкретну задачу: ${module.description.toLowerCase()} Перш ніж писати код, варто зрозуміти, чому саме такий підхід обрано і що станеться, якщо його пропустити.`,
  ({ title, course, courseContext }) =>
    `«${title}» — це один із будівельних блоків курсу «${course.title}», який підтримує ${courseContext}. Досвідчені розробники розпізнають цю техніку за контекстом застосування, а не за синтаксисом, тож варто вивчати саме логіку рішення.`,
  ({ title }) =>
    `Багато хто вивчає «${title}» поверхнево — запамʼятовує синтаксис, але не розуміє, коли це доречно застосовувати. Справжнє розуміння приходить тоді, коли ти можеш пояснити компроміс: що ти виграєш і чим жертвуєш, обираючи цей підхід.`,
  ({ title, course }) =>
    `На перший погляд «${title}» може здаватись деталлю, але в реальних проєктах курсу «${course.title}» саме такі деталі відрізняють крихкий код від надійного. Зверни увагу на межові випадки — саме там ховаються найчастіші помилки.`,
];

// Second, more concrete theory step shown under its own heading (via
// `theorySteps`) so every generated lesson gets a two-part explanation —
// "what and why" followed by "how it actually works step by step" — instead
// of a single short paragraph.
const mechanicsVariants: ((c: LessonPhraseCtx) => string)[] = [
  ({ title, courseContext }) =>
    `На практиці працюй у три кроки: спочатку зроби мінімальний варіант «${title.toLowerCase()}», який просто не ламається; потім перевір його на очевидному вхідному значенні; і лише після цього додавай нюанси. Такий порядок захищає від типової пастки — намагання одразу написати «ідеальний» код, який впливає на ${courseContext}, але ще жодного разу не запускався.`,
  ({ title, module }) =>
    `Технічно «${title}» складається з кількох частин, які легко переплутати під тиском: що є вхідними даними, що — результатом, і що саме перевіряє браузер чи середовище виконання. У межах етапу «${module.title}» корисно промовити ці три речі вголос перед тим, як писати код, — це займає 10 секунд і рятує від години дебагінгу.`,
  ({ title, course }) =>
    `Якщо розкласти «${title}» на кроки: спочатку визначаєш намір (що саме хочеш отримати), потім обираєш конкретний інструмент курсу «${course.title}», який це реалізує, і насамкінець перевіряєш результат на реальному прикладі, а не «на око». Пропуск останнього кроку — причина більшості багів, які помічають вже користувачі, а не розробник.`,
  ({ title, courseContext }) =>
    `Головна технічна деталь «${title}»: результат залежить не лише від того, що ти написав, а й від контексту виконання (стан сторінки, дані користувача, розмір екрана). Тому одного разу перевірити приклад недостатньо — уяви хоча б два різні сценарії використання, повʼязані з ${courseContext}, і подумки прогони обидва.`,
  ({ title, module, course }) =>
    `Розбираючи «${title}» покроково: (1) який мінімальний фрагмент коду взагалі демонструє цю ідею, (2) що зміниться, якщо прибрати одну деталь, (3) де в реальному проєкті курсу «${course.title}» це справді знадобиться. Такий трикроковий розбір — саме те, що відрізняє «я бачив цей приклад» від «я розумію, як це працює» в межах етапу «${module.title}».`,
];

// Narrative wrapper text for the generated code walkthrough (before/after the
// code block), so generated lessons get the same "explained code" structure
// that the hand-written module uses, instead of a bare, unexplained snippet.
const walkthroughBeforeVariants: ((c: LessonPhraseCtx) => string)[] = [
  ({ title }) => `Розглянь приклад нижче рядок за рядком — це робочий фрагмент, що демонструє «${title}» у мінімальному, але реалістичному вигляді.`,
  ({ title, module }) => `Ось як «${title}» виглядає в коді в контексті етапу «${module.title}». Перш ніж читати пояснення нижче, спробуй сам здогадатися, що робить кожен рядок.`,
  ({ title, course }) => `Приклад нижче навмисно короткий, щоб зосередитись саме на «${title}», а не губитись у деталях. У реальному проєкті курсу «${course.title}» цей фрагмент був би частиною більшого файлу.`,
];

const walkthroughAfterVariants: ((c: LessonPhraseCtx) => string)[] = [
  ({ title }) => `Якщо цей приклад запустити, результат буде передбачуваним і відтворюваним — саме це і є ознакою того, що «${title}» застосовано правильно, а не «випадково запрацювало».`,
  ({ title, courseContext }) => `Головне тут — не запамʼятати цей конкретний код, а зрозуміти принцип, який стоїть за «${title}» і впливає на ${courseContext}. Синтаксис можна підглянути, розуміння — ні.`,
  ({ title, module }) => `Спробуй змінити один рядок цього прикладу і передбач результат до запуску — це найшвидший спосіб перевірити, чи справді розумієш «${title}» у межах етапу «${module.title}».`,
];

// Per-course-family notes tied to what `codeFor` actually generates, so the
// line-by-line callouts stay technically accurate instead of being generic
// filler. Falls back to `default` for any course id not listed here.
const walkthroughNotesPool: Record<string, string[]> = {
  html: [
    "aria-labelledby на <section> звʼязує секцію з її заголовком для скрінрідерів.",
    "id на <h2> має бути унікальним на сторінці, інакше звʼязок aria-labelledby зламається.",
    "Порядок навмисний: спочатку структура (<h2>), потім пояснювальний текст (<p>).",
    "Семантичний <section> замість <div> одразу дає зрозумілу роль блоку без жодного JS.",
  ],
  accessibility: [
    "aria-labelledby звʼязує блок із заголовком — це основний патерн доступних секцій.",
    "id заголовка має бути унікальним на сторінці, інакше звʼязок ламається без помилки в консолі.",
    "Порядок «структура → пояснення» важливий і для скрінрідера, і для читання коду людиною.",
  ],
  css: [
    "clamp() задає адаптивний розмір без медіа-запитів: мінімум, бажане значення, максимум.",
    "gap у grid прибирає потребу в margin на дочірніх елементах і типові конфлікти подвійних відступів.",
    ":focus-within підсвічує контейнер, коли фокус потрапляє на будь-який елемент усередині нього.",
    "max-width обмежує розтягування на великих екранах, не заважаючи звужуватись на малих.",
  ],
  performance: [
    "clamp() уникає зайвого перерахунку стилів на резайзі порівняно з рядом медіа-запитів.",
    "gap замість margin зменшує кількість властивостей, які браузер перераховує під час layout.",
    ":focus-within — дешева псевдоклас-перевірка, яка не потребує JS-обробників.",
  ],
  react: [
    "Тип пропсів (LessonDemoProps) описаний окремо від компонента — простіше повторно використати й покрити тестами.",
    "aria-label на <article> дає скрінрідеру назву блоку, навіть якщо візуального заголовка немає.",
    "Умовний рендер completed ? ... : title — декларативний спосіб показати стан без if/else усередині JSX.",
  ],
  typescript: [
    "Тип пропсів винесено окремо (type LessonDemoProps) — це і документація, і перевірка одночасно.",
    "Поле completed напряму керує тим, що бачить користувач, — типобезпечно і без as any.",
    "Явна сигнатура функції компонента ловить помилки типів ще до рендеру, а не в рантаймі.",
  ],
  git: [
    "checkout -b одразу створює нову гілку і перемикається на неї — це один крок, а не два.",
    "git status перед add — звичка, яка запобігає випадковому комітуванню чужих чи тимчасових файлів.",
    "Повідомлення коміту описує «що» і «навіщо», а не просто «fix» чи «update».",
  ],
  "node-basics": [
    "express() створює застосунок, а сервер по-справжньому «оживає» лише після виклику listen().",
    "Маршрут /api/health — стандартна практика: за ним інші сервіси перевіряють, чи живий цей.",
    "res.json() сам виставляє правильний Content-Type — не треба робити це вручну.",
  ],
  browser: [
    "for...of ітерує саме значення масиву, а не індекси — зручно, коли індекс не потрібен.",
    "Шаблонні рядки (`${step}: ${lesson}`) читабельніші за конкатенацію через +.",
    "console.info семантично означає «інформація», а не помилку чи попередження — консоль браузера це враховує при фільтрації.",
  ],
  javascript: [
    "for...of ітерує значення масиву напряму, без потреби звертатись за індексом.",
    "Шаблонні рядки замість конкатенації через + легше читати й менше шансів на помилку.",
    "console.info — правильний вибір для інформаційних повідомлень, а console.error — лише для реальних помилок.",
  ],
  default: [
    "Читай приклад як послідовність рішень, а не як текст: чому саме така структура, а не інша.",
    "Спробуй подумки «виконати» приклад рядок за рядком, перш ніж дивитись на пояснення.",
    "Найкоротший шлях зрозуміти приклад — спробувати зламати його навмисно й побачити, що станеться.",
  ],
};

// "Де це реально застосовують" — filled in for every generated lesson so the
// "У реальних проєктах" section (previously only present in hand-written
// lessons) is populated platform-wide.
const realWorldUsagePool: ((c: LessonPhraseCtx) => string)[] = [
  ({ title, course }) => `У реальних проєктах на основі курсу «${course.title}» «${title.toLowerCase()}» найчастіше зустрічається там, де потрібно поєднати кілька вимог одночасно: зрозумілість для користувача, підтримуваність для команди і стабільність під навантаженням.`,
  ({ titleLower, courseContext }) => `Команди застосовують «${titleLower}» насамперед там, де є ${courseContext}, — тобто майже в кожному нетривіальному інтерфейсі, а не лише в навчальних прикладах.`,
  ({ title, module }) => `У командній розробці «${title}» зазвичай зʼявляється на етапі, подібному до «${module.title}»: коли базова версія вже працює і потрібно зробити її стійкою до реальних, а не ідеальних даних.`,
  ({ title }) => `Досвідчені розробники впізнають «${title}» у код-рев'ю за характерними ознаками — і саме тому цю тему варто вміти пояснити словами, а не лише відтворити по памʼяті.`,
  ({ title, course }) => `На технічних співбесідах і в тестових завданнях на позицію frontend-розробника «${title}» курсу «${course.title}» часто перевіряють непрямо: через якість обробки крайніх випадків, а не через сам факт використання техніки.`,
];

// Concrete variants, exceptions and edge cases per topic — rendered inside
// the "Best practices" section alongside straightforward advice, so learners
// see not just "how to do it" but also "when this doesn't apply."
const variantsAndExceptionsPool: ((c: LessonPhraseCtx) => string)[] = [
  ({ title }) => `Варіант, який варто знати: іноді «${title.toLowerCase()}» реалізують спрощено для швидкого прототипу — це нормально, якщо ти свідомо йдеш на компроміс, а не забуваєш, що спростив.`,
  ({ title, module }) => `Виняток із загального правила: у межах етапу «${module.title}» бувають ситуації, коли строге застосування «${title.toLowerCase()}» ускладнює код більше, ніж спрощує, — тоді варто обрати простіший підхід і залишити коментар чому.`,
  ({ title, course }) => `Ще один випадок застосування: «${title}» часто виглядає по-іншому в невеликому проєкті і у великій кодовій базі курсу «${course.title}» — у другому важливіша передбачуваність, навіть ціною трохи довшого коду.`,
  ({ title }) => `Крайній випадок, який легко пропустити: що станеться з «${title.toLowerCase()}», якщо вхідні дані порожні, надто великі або приходять у неочікуваному форматі? Хороше рішення явно обробляє це, а не покладається на «звичайну» поведінку.`,
  ({ title, courseContext }) => `Не кожна ситуація вимагає «${title.toLowerCase()}»: якщо задача не повʼязана з ${courseContext}, застосування цієї техніки «про всяк випадок» лише ускладнює код без реальної користі.`,
];

const examplePool: ((c: LessonPhraseCtx) => string)[] = [
  ({ course }) => `Почни з наданого фрагмента коду курсу «${course.title}» і визнач відповідальність кожного рядка.`,
  () => "Зміни одне припущення в прикладі — наприклад, довжину контенту, введення користувача чи розмір вікна — і поспостерігай за результатом.",
  ({ titleLower }) => `Знайди ще один приклад «${titleLower}» поза уроком (у реальному сайті чи бібліотеці) і порівняй підхід.`,
  () => "Навмисно зроби помилку в прикладі та подивись, яке повідомлення про помилку або поведінку це викличе.",
  ({ module }) => `Пов'яжи приклад із попереднім уроком етапу «${module.title}» — знайди спільну ідею між ними.`,
  () => "Спробуй пояснити приклад іншій людині (або вголос собі) у двох реченнях — це швидко виявляє прогалини в розумінні.",
];

const tipsPool: string[] = [
  "Обирай зрозумілість замість хитромудрості: майбутні розробники мають швидко зрозуміти рішення.",
  "Перевір найменший можливий приклад перед інтеграцією в більший інтерфейс.",
  "Називай змінні, класи й компоненти за їхньою роллю в продукті, а не за візуальними деталями.",
  "Перевір поведінку з клавіатурою, порожні стани та стани помилок перед тим, як вважати роботу завершеною.",
  "Постав собі запитання «що станеться, якщо дані відсутні або їх забагато?» ще до написання коду.",
  "Порівняй своє рішення з тим, як цю задачу вирішують у відомих відкритих проєктах.",
  "Не оптимізуй завчасно: спочатку зроби так, щоб працювало й було зрозуміло, потім покращуй.",
  "Залиш коротку нотатку про те, чому обрано саме такий підхід — вона знадобиться через місяць.",
];

const commonMistakesPool: string[] = [
  "Пропуск крайніх випадків: довгий текст, відсутні дані, повільна мережа або взаємодія лише з клавіатури.",
  "Змішування занадто багатьох нових концепцій в одному прикладі, що ускладнює дебагінг.",
  "Копіювання рішення без розуміння того, яку проблему воно вирішує.",
  "Ігнорування доступності: контраст, фокус і підписи для скрінрідерів додаються «пізніше», а потім забуваються.",
  "Передчасна оптимізація коду, який ще жодного разу не працював правильно.",
  "Тестування лише «щасливого шляху» без перевірки помилок і порожніх станів.",
];

const summaryVariants: ((c: LessonPhraseCtx) => string)[] = [
  ({ titleLower, courseContext }) => `Тепер ти маєш розуміти, як «${titleLower}» підтримує ${courseContext}, як реалізувати це на невеликому прикладі та яких помилок уникати.`,
  ({ titleLower, module }) => `Ти пройшов етап «${module.title}» у частині «${titleLower}»: розумієш і причину, і практичну реалізацію, і типові підводні камені.`,
  ({ titleLower, course }) => `«${titleLower}» тепер не просто термін із курсу «${course.title}» — ти бачив, як це працює на прикладі, і знаєш, на що звертати увагу.`,
];

const taskVariants: ((c: LessonPhraseCtx) => string)[] = [
  ({ titleLower, module }) => `Створи сфокусоване демо, що використовує «${titleLower}» у контексті модуля «${module.title}». Запиши, яку проблему це вирішує, та одне обмеження.`,
  ({ titleLower, course }) => `Реалізуй невеликий приклад «${titleLower}» так, ніби це частина реального продукту курсу «${course.title}». Обґрунтуй один свій вибір.`,
];

const getDifficulty = (course: CatalogCourse, lessonIndex: number): LessonDifficulty => {
  if (course.level === "Advanced" || lessonIndex % 7 === 0) return "Hard";
  if (course.level === "Intermediate" || lessonIndex % 3 === 0) return "Medium";
  return "Easy";
};

const getLessonType = (lessonIndex: number): Lesson["type"] => (lessonIndex % 3 === 2 ? "practice" : "theory");

// Each course family previously had exactly ONE code template with only the
// title swapped in, so every lesson in, say, the HTML course showed the
// literal same <main><section><h2><p> skeleton. That's the "той самий
// приклад скрізь" problem reported directly. Each family now has several
// genuinely different, realistic snippets (a form vs. a nav vs. a table vs.
// a card for HTML; a counter vs. a list vs. a custom hook for React, etc.),
// and the one shown is picked deterministically per lesson so it's stable
// across reloads but varies from lesson to lesson within the same course.
const htmlCodeVariants: ((title: string) => string)[] = [
  (title) => `<!-- ${title}: семантична секція зі заголовком -->\n<section aria-labelledby="${slugify(title)}-title">\n  <h2 id="${slugify(title)}-title">${title}</h2>\n  <p>Короткий, змістовний опис — не текст-заглушка, а реальне речення про те, що тут відбувається.</p>\n</section>`,
  (title) => `<!-- ${title}: доступна форма -->\n<form aria-labelledby="${slugify(title)}-form-title">\n  <h2 id="${slugify(title)}-form-title">${title}</h2>\n  <label for="${slugify(title)}-email">Електронна пошта</label>\n  <input id="${slugify(title)}-email" type="email" name="email" required autocomplete="email" />\n  <button type="submit">Надіслати</button>\n</form>`,
  (title) => `<!-- ${title}: навігація з позначеною поточною сторінкою -->\n<nav aria-label="${title}">\n  <ul>\n    <li><a href="/" aria-current="page">Головна</a></li>\n    <li><a href="/courses">Курси</a></li>\n    <li><a href="/profile">Профіль</a></li>\n  </ul>\n</nav>`,
  (title) => `<!-- ${title}: картка з правильною ієрархією тегів -->\n<article>\n  <h2>${title}</h2>\n  <img src="cover.jpg" alt="Обкладинка: ${title}" width="320" height="200" />\n  <p>Стисла характеристика картки, зрозуміла без додаткового контексту.</p>\n  <button type="button">Детальніше</button>\n</article>`,
  (title) => `<!-- ${title}: таблиця з підписом і заголовками стовпців -->\n<table>\n  <caption>${title}</caption>\n  <thead>\n    <tr><th scope="col">Параметр</th><th scope="col">Значення</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>Приклад</td><td>${title}</td></tr>\n  </tbody>\n</table>`,
];

const cssCodeVariants: ((title: string) => string)[] = [
  (title) => `/* ${title}: адаптивна сітка карток */\n.lesson-demo {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n  gap: 1rem;\n  padding: clamp(1rem, 2vw, 2rem);\n}\n\n.lesson-demo:focus-within {\n  outline: 3px solid var(--primary);\n}`,
  (title) => `/* ${title}: центрування flexbox без "magic numbers" */\n.lesson-demo {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 0.75rem;\n  flex-wrap: wrap;\n}`,
  (title) => `/* ${title}: адаптивна типографіка через clamp() */\n.lesson-demo {\n  --step: clamp(1rem, 0.85rem + 1vw, 1.5rem);\n  font-size: var(--step);\n  line-height: 1.5;\n  max-width: 60ch;\n}`,
  (title) => `/* ${title}: плавний перехід стану без різкого стрибка */\n.lesson-demo {\n  transition: transform 0.2s ease, box-shadow 0.2s ease;\n}\n\n.lesson-demo:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.12);\n}`,
  (title) => `/* ${title}: липкий заголовок секції під час прокрутки */\n.lesson-demo__header {\n  position: sticky;\n  top: 0;\n  backdrop-filter: blur(6px);\n  z-index: 1;\n}`,
];

const reactCodeVariants: ((title: string) => string)[] = [
  () => `type LessonDemoProps = {\n  title: string;\n  completed: boolean;\n};\n\nexport function LessonDemo({ title, completed }: LessonDemoProps) {\n  return <article aria-label={title}>{completed ? "Завершено" : title}</article>;\n}`,
  () => `import { useState } from "react";\n\nexport function Counter() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <button type="button" onClick={() => setCount((value) => value + 1)}>\n      Натиснуто: {count}\n    </button>\n  );\n}`,
  (title) => `type Item = { id: string; label: string };\n\nexport function LessonList({ items }: { items: Item[] }) {\n  return (\n    <ul aria-label="${title}">\n      {items.map((item) => (\n        <li key={item.id}>{item.label}</li>\n      ))}\n    </ul>\n  );\n}`,
  () => `import { useEffect, useState } from "react";\n\nfunction useOnlineStatus() {\n  const [isOnline, setIsOnline] = useState(navigator.onLine);\n\n  useEffect(() => {\n    const update = () => setIsOnline(navigator.onLine);\n    window.addEventListener("online", update);\n    window.addEventListener("offline", update);\n    return () => {\n      window.removeEventListener("online", update);\n      window.removeEventListener("offline", update);\n    };\n  }, []);\n\n  return isOnline;\n}`,
  (title) => `type CardProps = {\n  title: string;\n  children: React.ReactNode;\n};\n\nexport function Card({ title, children }: CardProps) {\n  return (\n    <section aria-label={title}>\n      <h3>{title}</h3>\n      {children}\n    </section>\n  );\n}\n// Приклад використання: <Card title="${title}">...</Card>`,
];

const gitCodeVariants: ((title: string) => string)[] = [
  (title) => `git checkout -b feature/${slugify(title)}\ngit status\ngit add .\ngit commit -m "Практика: ${title}"`,
  () => `# Тимчасово відкласти незавершені зміни\ngit stash push -m "wip: не готово до коміту"\ngit checkout main\ngit pull\ngit checkout -\ngit stash pop`,
  (title) => `# Переписати останні коміти гілки перед код-рев'ю\ngit fetch origin\ngit rebase origin/main\n# розв'яжи конфлікти, потім:\ngit add .\ngit rebase --continue\ngit push --force-with-lease origin feature/${slugify(title)}`,
  () => `# Скасувати останній коміт, зберігши зміни у робочій директорії\ngit reset --soft HEAD~1\n# Або повністю прибрати останній коміт, якщо він уже на віддаленому репозиторії:\ngit revert HEAD`,
  (title) => `# Порівняти дві гілки перед мерджем\ngit diff main...feature/${slugify(title)}\ngit log main..feature/${slugify(title)} --oneline`,
];

const nodeCodeVariants: ((title: string) => string)[] = [
  () => `import express from "express";\n\nconst app = express();\napp.get("/api/health", (_req, res) => res.json({ status: "ok" }));\napp.listen(3000);`,
  () => `import express from "express";\n\nconst app = express();\napp.get("/api/users/:id", (req, res) => {\n  const { id } = req.params;\n  res.json({ id, name: "Приклад користувача" });\n});\napp.listen(3000);`,
  (title) => `import express from "express";\n\nconst app = express();\n\nfunction logRequests(req, _res, next) {\n  console.info(\`[\${new Date().toISOString()}] \${req.method} \${req.path} — ${title}\`);\n  next();\n}\n\napp.use(logRequests);\napp.listen(3000);`,
  () => `import express from "express";\n\nconst app = express();\napp.use(express.json());\n\napp.post("/api/notes", (req, res) => {\n  const { text } = req.body;\n  if (!text) return res.status(400).json({ error: "text обовʼязковий" });\n  res.status(201).json({ id: Date.now(), text });\n});\napp.listen(3000);`,
  () => `import express from "express";\n\nconst app = express();\n\napp.get("/api/risky", (_req, res) => {\n  throw new Error("Щось пішло не так");\n});\n\n// Обробник помилок має чотири аргументи — це і робить його обробником помилок\napp.use((err, _req, res, _next) => {\n  console.error(err);\n  res.status(500).json({ error: "Внутрішня помилка сервера" });\n});\napp.listen(3000);`,
];

const defaultCodeVariants: ((title: string) => string)[] = [
  (title) => `const lesson = "${title}";\nconst checklist = ["зрозуміти", "попрактикувати", "переглянути"];\n\nfor (const step of checklist) {\n  console.info(\`\${step}: \${lesson}\`);\n}`,
  (title) => `const items = ["${title}", "приклад", "вправа"];\n\nconst summary = items\n  .map((item) => item.trim())\n  .filter((item) => item.length > 0)\n  .join(" → ");\n\nconsole.info(summary);`,
  () => `async function loadLessonData(url) {\n  const response = await fetch(url);\n  if (!response.ok) {\n    throw new Error(\`Не вдалося завантажити дані: \${response.status}\`);\n  }\n  return response.json();\n}`,
  () => `function debounce(fn, delay = 300) {\n  let timerId;\n  return (...args) => {\n    clearTimeout(timerId);\n    timerId = setTimeout(() => fn(...args), delay);\n  };\n}\n\nconst handleInput = debounce((value) => console.info("Пошук:", value));`,
  (title) => `const lessonMeta = { title: "${title}", completed: false, xp: 20 };\nconst { title: lessonTitle, ...rest } = lessonMeta;\n\nconsole.info(lessonTitle, rest);`,
];

const codeFor = (courseId: string, title: string) => {
  // Deterministic per-lesson pick (stable across reloads/tests), independent
  // of the content-variety `seed` used elsewhere so the two don't correlate.
  const pick = <T,>(pool: T[]): T => pool[hashString(`code::${courseId}::${title}`) % pool.length];

  if (courseId === "html" || courseId === "accessibility") return pick(htmlCodeVariants)(title);
  if (courseId === "css" || courseId === "performance") return pick(cssCodeVariants)(title);
  if (courseId === "react" || courseId === "typescript") return pick(reactCodeVariants)(title);
  if (courseId === "git") return pick(gitCodeVariants)(title);
  if (courseId === "node-basics") return pick(nodeCodeVariants)(title);
  return pick(defaultCodeVariants)(title);
};

const withFileMeta = (files: PlaygroundFile[]): PlaygroundFile[] =>
  files.map((file) => ({
    ...file,
    id: file.id ?? file.path ?? file.language,
    path: file.path ?? file.label.toLowerCase().replace(/[^a-z0-9]+/g, ".").replace(/^\.+|\.+$/g, ""),
  }));

const starterFilesFor = (courseId: string, title: string, codeExample: string): PlaygroundFile[] => {
  if (courseId === "react" || courseId === "typescript") {
    return withFileMeta([{ language: "tsx", label: "App.tsx", path: "App.tsx", code: codeExample }]);
  }

  if (courseId === "html" || courseId === "accessibility") {
    // Use the same varied snippet shown in the lesson's "Приклади" section
    // instead of a fixed "demo-card" skeleton repeated for every lesson.
    return withFileMeta([{ language: "html", label: "index.html", path: "index.html", code: codeExample }]);
  }

  if (courseId === "css" || courseId === "performance") {
    return withFileMeta([
      { language: "html", label: "index.html", path: "index.html", code: `<section class="lesson-demo">\n  <h2>${title}</h2>\n  <p>Демо-розмітка для стилю нижче.</p>\n  <button type="button">Кнопка</button>\n</section>` },
      { language: "css", label: "styles.css", path: "styles.css", code: codeExample },
    ]);
  }

  if (courseId === "git") {
    return withFileMeta([{ language: "bash", label: "commands.sh", path: "commands.sh", code: codeExample }]);
  }

  if (courseId === "node-basics") {
    return withFileMeta([
      { language: "javascript", label: "server.js", path: "server.js", code: codeExample },
      { language: "json", label: "package.json", path: "package.json", code: `{\n  "scripts": {\n    "dev": "node server.js"\n  }\n}` },
    ]);
  }

  return withFileMeta([{ language: "javascript", label: "script.js", path: "script.js", code: codeExample }]);
};

const solutionFilesFor = (courseId: string, title: string, codeExample: string): PlaygroundFile[] =>
  starterFilesFor(courseId, title, codeExample).map((file) => ({
    ...file,
    code: `${file.code}\n\n/* Примітка до рішення: перевір ${title}, протестувавши основний сценарій і один крайній випадок. */`,
    readOnly: true,
  }));

const primaryLanguageFor = (courseId: string): PlaygroundLanguage => {
  if (courseId === "react" || courseId === "typescript") return "tsx";
  if (courseId === "git") return "bash";
  if (courseId === "html") return "html";
  if (courseId === "css" || courseId === "accessibility" || courseId === "performance") return "css";
  return "javascript";
};

const makeLessonQuiz = (lessonId: string, title: string, course: CatalogCourse): QuizData => ({
  id: `${lessonId}-quick-check`,
  title: `${title}: швидка перевірка`,
  questions: [
    {
      id: `${lessonId}-purpose`,
      type: "single",
      question: `Яка головна мета вивчення теми «${title}»?`,
      options: [
        `Застосувати «${title.toLowerCase()}» у реальному робочому процесі курсу «${course.title}»`,
        "Завчити синтаксис, не застосовуючи його",
        "Пропустити практику й рухатись далі",
        "Не перевіряти результат",
      ],
      correctAnswer: `Застосувати «${title.toLowerCase()}» у реальному робочому процесі курсу «${course.title}»`,
      explanation: "Комерційна frontend-робота вимагає розуміння причини використання техніки та її застосування у зручному для підтримки інтерфейсі.",
      optionExplanations: {
        "Завчити синтаксис, не застосовуючи його": "Синтаксис без практики забувається за кілька днів — мозок запамʼятовує дію, а не текст.",
        "Пропустити практику й рухатись далі": "Без практики ти впізнаєш тему на слух, але не зможеш застосувати її під тиском реального завдання.",
        "Не перевіряти результат": "Без перевірки легко пропустити помилку, яка виявиться лише в продакшні — коли її буде дорожче виправляти.",
      },
    },
    {
      id: `${lessonId}-practice`,
      type: "true-false",
      question: "Короткої сфокусованої вправи достатньо, щоб зрозуміти, чи засвоєно концепцію.",
      options: ["Так", "Ні"],
      correctAnswer: true,
      explanation: "Невеликі вправи зменшують зайвий шум і швидко виявляють прогалини в розумінні.",
    },
    {
      id: `${lessonId}-review`,
      type: "multiple",
      question: "Які кроки перегляду корисні після цього уроку?",
      options: ["Запустити приклад", "Пояснити компроміс", "Ігнорувати помилки", "Записати короткі нотатки"],
      correctAnswer: ["Запустити приклад", "Пояснити компроміс", "Записати короткі нотатки"],
      explanation: "Хороший навчальний цикл включає запуск коду, пояснення рішень і фіксацію нотаток.",
      optionExplanations: {
        "Ігнорувати помилки": "Помилка, яку проігнорували на етапі навчання, повториться в реальному проєкті — тільки там її буде складніше знайти.",
      },
    },
    {
      id: `${lessonId}-code`,
      type: "code",
      question: "На що варто звертати увагу, читаючи цей приклад?",
      options: ["Відповідальність кожного рядка", "Лише назву файлу", "Колір редактора", "Ні на що, бо приклади завжди правильні"],
      correctAnswer: "Відповідальність кожного рядка",
      explanation: "Активне читання коду означає розуміння того, навіщо існує кожен рядок і що зламається, якщо його змінити.",
      optionExplanations: {
        "Лише назву файлу": "Назва файлу нічого не каже про логіку всередині — вона лише орієнтир для навігації.",
        "Колір редактора": "Підсвітка синтаксису — це косметика IDE, вона не впливає на те, чи правильний код.",
        "Ні на що, бо приклади завжди правильні": "Навіть у навчальних прикладах трапляються спрощення чи помилки — критичне читання коду це звичка, а не виняток.",
      },
      codeSnippet: codeFor(course.id, title),
    },
    {
      id: `${lessonId}-quality`,
      type: "single",
      question: "Коли цей урок дійсно завершено?",
      options: ["Одразу після відкриття", "Після теорії, практики та самоперевірки", "До написання коду", "Лише після перегляду відео"],
      correctAnswer: "Після теорії, практики та самоперевірки",
      explanation: "Завершення має відображати практичне розуміння, а не пасивний перегляд сторінки.",
      optionExplanations: {
        "Одразу після відкриття": "Відкрити урок — це початок, а не кінець; сам факт перегляду не означає розуміння.",
        "До написання коду": "Без практики теорія залишається абстрактною й швидко забувається.",
        "Лише після перегляду відео": "У цьому курсі немає відео — і навіть якби було, пасивний перегляд не замінює власну практику.",
      },
    },
  ],
});

const makeModuleQuiz = (module: CatalogModule, course: CatalogCourse): QuizData => ({
  id: `${module.id}-quiz`,
  title: `${module.title}: контрольний тест`,
  questions: [
    {
      id: `${module.id}-concept`,
      type: "single",
      question: `Яке твердження найкраще описує модуль «${module.title}»?`,
      options: [
        module.description,
        "Це не має стосунку до frontend-розробки.",
        "Це важливо лише для backend-систем.",
        "Це варто завчити напам'ять без прикладів.",
      ],
      correctAnswer: module.description,
      explanation: `Модуль «${module.title}» цінний, бо підтримує ${contextMap[course.id] ?? "щоденну frontend-роботу"}.`,
      optionExplanations: {
        "Це не має стосунку до frontend-розробки.": "Кожен модуль курсу підібраний саме тому, що впливає на щоденну frontend-роботу.",
        "Це важливо лише для backend-систем.": "Тема належить до frontend-курсу — вона впливає на те, що бачить і робить користувач у браузері.",
        "Це варто завчити напам'ять без прикладів.": "Запамʼятовування без прикладів не переноситься на реальні задачі — розуміння приходить через практику.",
      },
    },
    {
      id: `${module.id}-workflow`,
      type: "multiple",
      question: "Які звички полегшують застосування цього модуля на практиці?",
      options: ["Створити невеликий приклад", "Перевірити крайні випадки", "Задокументувати рішення", "Ігнорувати зворотний звʼязок"],
      correctAnswer: ["Створити невеликий приклад", "Перевірити крайні випадки", "Задокументувати рішення"],
      explanation: "Професійне навчання ітеративне: створюй, тестуй, пояснюй і покращуй.",
      optionExplanations: {
        "Ігнорувати зворотний звʼязок": "Зворотний звʼязок (від коду, тестів чи колег) — це найшвидший спосіб побачити, де реальність розходиться з очікуваннями.",
      },
    },
    {
      id: `${module.id}-practice`,
      type: "true-false",
      question: "Проєкт модуля має обʼєднувати більше ніж один урок із цього модуля.",
      options: ["Так", "Ні"],
      correctAnswer: true,
      explanation: "Проєкт модуля доводить, що повʼязані концепції можна використовувати разом.",
    },
    {
      id: `${module.id}-debug`,
      type: "single",
      question: "Який найкращий перший крок, коли вправа модуля не працює?",
      options: ["Прочитати помилку й ізолювати найменший випадок, що відтворює проблему", "Переписати весь застосунок", "Ігнорувати проблему", "Видалити вправу"],
      correctAnswer: "Прочитати помилку й ізолювати найменший випадок, що відтворює проблему",
      explanation: "Дебагінг починається зі зменшення невизначеності й перевірки одного припущення за раз.",
      optionExplanations: {
        "Переписати весь застосунок": "Повне переписування ховає справжню причину помилки й забирає значно більше часу, ніж локальний дебагінг.",
        "Ігнорувати проблему": "Проігнорована помилка рідко зникає сама — натомість вона зазвичай зʼявляється знову, у гіршому місці.",
        "Видалити вправу": "Видалення прибирає симптом, але не дає зрозуміти, чому щось не працювало.",
      },
    },
    {
      id: `${module.id}-production`,
      type: "single",
      question: "Що робить фінальне рішення готовим до продакшну?",
      options: ["Читабельний код, доступний інтерфейс і перевірені крайні випадки", "Хитрий трюк", "Відсутність будь-яких коментарів", "Підтримка лише десктопу"],
      correctAnswer: "Читабельний код, доступний інтерфейс і перевірені крайні випадки",
      explanation: "Продакшн-код зручний для підтримки, інклюзивний і стійкий до збоїв.",
      optionExplanations: {
        "Хитрий трюк": "Розумний, але незрозумілий трюк ускладнює підтримку коду для всієї команди в майбутньому.",
        "Відсутність будь-яких коментарів": "Відсутність пояснень там, де рішення неочевидне, ускладнює підтримку для інших розробників (і для тебе через півроку).",
        "Підтримка лише десктопу": "Більшість користувачів заходять з різних пристроїв — підтримка лише десктопу відсікає значну частину аудиторії.",
      },
    },
  ],
});

const makeProject = (course: CatalogCourse, module: CatalogModule): ModuleProject => ({
  id: `${module.id}-project`,
  title: `${course.projectTitle}: ${module.title}`,
  description: `Створи реалістичний міні-проєкт курсу «${course.title}», що демонструє ${module.description.toLowerCase()}`,
  estimatedTime: 120 + module.lessons.length * 20,
  requirements: [
    `Використай щонайменше три концепції з модуля «${module.title}».`,
    "Додай чіткий опис своїх рішень у стилі README.",
    "Обробляй порожні стани, помилки або крайні випадки, де це доречно.",
    "Перевір зручність із клавіатурою та на мобільних перед завершенням.",
  ],
  checklist: [
    "Проєкт має чітку, зрозумілу користувачу мету.",
    "Реалізація розділена на читабельні секції.",
    "Результат працює як на мобільній, так і на десктопній ширині.",
    "Фінальна версія перевірена відповідно до тесту модуля.",
  ],
  evaluationCriteria: ["Коректність", "Доступність", "Зручність підтримки", "Адаптивна поведінка", "Довершеність, як у реальному продукті"],
});

const makeLesson = (course: CatalogCourse, module: CatalogModule, title: string, lessonIndex: number): Lesson => {
  const lessonId = `${module.id}-${slugify(title)}`;
  const type = getLessonType(lessonIndex);
  const difficulty = getDifficulty(course, lessonIndex);
  const estimatedTime = difficulty === "Hard" ? 32 : difficulty === "Medium" ? 26 : 20;
  const codeExample = codeFor(course.id, title);
  const courseContext = contextMap[course.id] ?? "щоденну frontend-роботу";
  const starterFiles = starterFilesFor(course.id, title, codeExample);
  const solutionFiles = solutionFilesFor(course.id, title, codeExample);
  const previewEnabled = starterFiles.some((file) => file.language === "html");

  const phraseCtx: LessonPhraseCtx = { title, titleLower: title.toLowerCase(), course, module, courseContext };
  const seed = hashString(lessonId);
  // NOTE: use `>>>` (unsigned right shift), not `>>`. `seed` comes from
  // hashString()'s `>>> 0`, so it can be as large as 2^32-1. A signed shift
  // (`>>`) first reinterprets any value >= 2^31 as negative (ToInt32), which
  // produced negative array indices here and crashed with
  // "descriptionVariants[...] is not a function" for roughly half of all
  // lessons depending on their title's hash.
  const content = contentVariants[seed % contentVariants.length](phraseCtx);
  const description = descriptionVariants[(seed >>> 2) % descriptionVariants.length](phraseCtx);
  const theory = theoryVariants[(seed >>> 4) % theoryVariants.length](phraseCtx);
  // Two-step theory (what/why, then how it works in practice) instead of one
  // short paragraph — same structure the hand-written lessons use.
  const theorySteps: TheoryStep[] = [
    { heading: "Що це і навіщо", body: theory },
    { heading: "Як це працює на практиці", body: mechanicsVariants[(seed >>> 6) % mechanicsVariants.length](phraseCtx) },
  ];
  // Narrated code example (before -> code -> line notes -> after) instead of
  // a bare snippet, plus a separate "try it yourself" list of concrete
  // variations so learners get several angles on the same topic, not one.
  const codeWalkthroughs: CodeWalkthrough[] = [
    {
      before: walkthroughBeforeVariants[seed % walkthroughBeforeVariants.length](phraseCtx),
      code: codeExample,
      after: walkthroughAfterVariants[(seed >>> 7) % walkthroughAfterVariants.length](phraseCtx),
      lineNotes: pickRotating(walkthroughNotesPool[course.id] ?? walkthroughNotesPool.default, seed >>> 8, 3),
    },
  ];
  const examples = pickRotating(examplePool, seed, 3).map((fn) => fn(phraseCtx));
  const tips = pickRotating(tipsPool, seed >>> 1, 4);
  const commonMistakes = [
    `Використання «${title.toLowerCase()}» лише тому, що це виглядає знайомо, без перевірки, чи вирішує це реальну проблему.`,
    ...pickRotating(commonMistakesPool, seed >>> 3, 3),
  ];
  // Real-world usage and concrete variants/exceptions — previously only
  // present on hand-written lessons, now populated for every lesson so
  // "де це застосовують" and "коли це не працює/виняток" answers exist
  // everywhere, not just in one flagship module.
  const realWorldUsage = pickRotating(realWorldUsagePool, seed >>> 9, 3).map((fn) => fn(phraseCtx));
  const bestPractices = [
    ...pickRotating(tipsPool, seed >>> 10, 2),
    ...pickRotating(variantsAndExceptionsPool, seed >>> 11, 3).map((fn) => fn(phraseCtx)),
  ];
  const summary = summaryVariants[(seed >>> 5) % summaryVariants.length](phraseCtx);
  const task = taskVariants[seed % taskVariants.length](phraseCtx);
  // Hand-written, mentor-style content (see data/content/handwritten) always
  // wins over the generated fields above when it exists for this lesson.
  const override = getLessonOverride(module.id, title);

  const generated: Lesson = {
    id: lessonId,
    title,
    type,
    duration: `${estimatedTime} хв`,
    estimatedTime,
    difficulty,
    tags: [course.id, course.title.toLowerCase(), module.title.toLowerCase(), title.toLowerCase(), type],
    status: "not-started",
    content,
    description,
    learningObjectives: [
      `Пояснити призначення «${title.toLowerCase()}» у курсі «${course.title}».`,
      `Застосувати «${title.toLowerCase()}» у невеликому реалістичному прикладі.`,
      "Визначити один компроміс, крайній випадок або ризик якості.",
      "Переглянути результат щодо читабельності та зручності підтримки.",
    ],
    requirements: [
      `Базове знайомство з курсом «${course.title}».`,
      `Уміння читати короткий приклад із курсу «${course.title}».`,
      "Браузер, редактор і бажання тестувати невеликі зміни.",
    ],
    theory,
    theorySteps,
    examples,
    codeWalkthroughs,
    tips,
    commonMistakes,
    realWorldUsage,
    bestPractices,
    codeExample,
    task,
    practiceTask: {
      title: `${title}: прикладна вправа`,
      description: `Створи невеликий приклад у стилі продакшн-коду, що демонструє «${title.toLowerCase()}» з реалістичним контентом і щонайменше одним крайнім випадком.`,
      checklist: [
        "У прикладі є змістовний контент замість тексту-заглушки.",
        "Реалізація читабельна та розділена на чіткі секції.",
        "Протестовано й задокументовано один крайній випадок.",
        "Результат перевірено у вузькому вікні перегляду та, де доречно, з навігацією клавіатурою.",
      ],
      starterFiles,
      solutionFiles,
      hints: [
        `Спочатку визнач, за що відповідає «${title.toLowerCase()}».`,
        "Зроби найменшу можливу зміну і запусти перегляд, перш ніж додавати більше коду.",
        "Порівняй свій результат із чеклістом та очікуваним результатом.",
      ],
      expectedOutput: `Робочий приклад курсу «${course.title}», що демонструє «${title.toLowerCase()}» з реалістичним контентом.`,
    },
    resources: resourceMap[course.id] ?? resourceMap.javascript,
    summary,
    nextSteps: [
      "Заверши прикладну вправу.",
      "Дай відповіді на швидку перевірку уроку.",
      `Перейди до наступного уроку модуля «${module.title}».`,
    ],
    playgroundMode: course.id === "react" || course.id === "typescript" ? "tsx" : "web",
    supportsPlayground: true,
    language: primaryLanguageFor(course.id),
    starterCode: starterFiles,
    solutionCode: solutionFiles,
    previewEnabled,
    consoleEnabled: true,
    quiz: makeLessonQuiz(lessonId, title, course),
  };

  return override ? { ...generated, ...override } : generated;
};

const makeModule = (course: CatalogCourse, module: CatalogModule): Module => ({
  id: module.id,
  title: module.title,
  description: module.description,
  lessons: module.lessons.map((lessonTitle, index) => makeLesson(course, module, lessonTitle, index)),
  quiz: makeModuleQuiz(module, course),
  project: makeProject(course, module),
});

export const courses: Course[] = catalog.map((course) => ({
  id: course.id,
  title: course.title,
  description: course.description,
  level: course.level,
  modules: course.modules.map((module) => makeModule(course, module)),
}));
